import * as React from 'react'
import {APIContext, APIProviderProps} from 'context/api'
import {useDeepCompareEffect} from 'utils'
import {resolvePath} from './resolvePath'
import NetworkError from './networkError'
import {defaultRequestInit} from './baseRequest'
import {isCancellable} from './isCancellable'
import {UseRequestProps, RequestState, UseRequestReturn, Cancelable} from './types'
import request from './index'

// eslint-disable-next-line complexity
async function fetchData<TData, TRequestBody, TError, TQueryParams>(
    props: UseRequestProps<TData, TRequestBody, TQueryParams>,
    state: RequestState<TData, TError>,
    setState: (newState: RequestState<TData, TError>) => void,
    context: APIProviderProps,
    abortController: React.MutableRefObject<AbortController>,
): Promise<void> {
    const {base = context.basePath, path, resolve = (d: any) => d as TData, queryParams = {}, body} = props

    if (state.loading) {
        abortController.current.abort()
        abortController.current = new AbortController()
    }
    const signal = abortController.current.signal

    if (state.error || !state.loading) {
        setState({...state, error: null, loading: true})
    }

    try {
        const response = await request({...props, base}, signal)
        const content = response && response.content

        if (signal.aborted) {
            return
        }

        setState({...state, error: null, loading: false, data: resolve(content)})
    } catch (err) {
        // If there is an error that was caused by an abort then don't set state
        if (err instanceof NetworkError && err.network.reason === 'abort') {
            return
        }
        const error = {
            message: `Failed to fetch: ${err.message}`,
            data: err.message,
        }
        setState({...state, loading: false, error})
    }
}

type FetchData = typeof fetchData
type CancellableFetchData = FetchData | (FetchData & Cancelable)

export function useRequest<TData = any, TError = any, TQueryParams = {[key: string]: any}, TRequestBody = any>(
    props: UseRequestProps<TData, TRequestBody, TQueryParams>,
): UseRequestReturn<TData, TError> {
    const context = React.useContext(APIContext)

    const requestData = React.useCallback<CancellableFetchData>(fetchData, [])

    React.useEffect(() => (isCancellable(requestData) ? () => requestData.cancel() : undefined), [requestData])

    const [state, setState] = React.useState<RequestState<TData, TError>>({
        data: null,
        loading: true,
        error: null,
    })

    const abortController = React.useRef(new AbortController())

    useDeepCompareEffect(() => {
        requestData(props, state, setState, context, abortController)

        return () => {
            abortController.current.abort()
            abortController.current = new AbortController()
        }
    }, [props.path, props.base, props.resolve, props.queryParams, props.requestOptions])

    return {
        ...state,
        cancel: () => {
            setState({...state, loading: false})
            abortController.current.abort()
            abortController.current = new AbortController()
        },
    }
}
