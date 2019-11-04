import * as React from 'react'
import {APIContext, APIProviderProps} from 'context/api'
import {resolvePath} from './resolvePath'
import {request, defaultRequestInit, isCancellable} from './request'
import {getToken} from 'lib/auth'
import {UseRequestProps, RequestState, UseRequestReturn, Cancelable} from './types'

async function fetchData<TData, TRequestBody, TError, TQueryParams>(
    props: UseRequestProps<TData, TRequestBody, TQueryParams>,
    state: RequestState<TData, TError>,
    setState: (newState: RequestState<TData, TError>) => void,
    context: APIProviderProps,
    abortController: React.MutableRefObject<AbortController>
) {
    const {
        base = context.basePath,
        path,
        resolve = (d: any) => d as TData,
        queryParams = {},
        body
    } = props

    if (state.loading) {
        abortController.current.abort()
        abortController.current = new AbortController()
    }
    const signal = abortController.current.signal

    if (state.error || !state.loading) {
        setState({...state, error: null, loading: true})
    }

    const requestOptions = (typeof props.requestOptions === 'function' ? props.requestOptions() : props.requestOptions) || {}
    const contextRequestOptions = (typeof context.requestOptions === 'function' ? context.requestOptions() : context.requestOptions) || {}

    const token = getToken()

    if (token) {
        (defaultRequestInit.headers as Headers).append('Authorization', `Bearer ${token}`)
    }

    const requestInit = {
        ...defaultRequestInit,
        ...contextRequestOptions,
        ...requestOptions,
        signal
    }

    if (requestInit.method && ['GET', 'POST', 'PUT', 'PATCH'].includes(requestInit.method)) {
        requestInit.body = typeof body === 'object' ? JSON.stringify(body) : ((body as unknown) as string)
    }

    try {
        const response = await request(resolvePath(base, path, {...queryParams}), requestInit)
        const {content} = response

        if (signal.aborted) {
            return
        }

        setState({...state, error: null, loading: false, data: resolve(content)})
    } catch (err) {
        const error = {
            message: `Failed to fetch: ${err.message}`,
            data: err.message
        }
        setState({...state, loading: false, error})
    }
}

type FetchData = typeof fetchData
type CancellableFetchData = FetchData | (FetchData & Cancelable)

export function useRequest<TData = any, TError = any, TQueryParams = {[key: string]: any}, TRequestBody = any>(
    props: UseRequestProps<TData, TRequestBody, TQueryParams>
): UseRequestReturn<TData, TError> {
    const context = React.useContext(APIContext)

    const requestData = React.useCallback<CancellableFetchData>(fetchData, [])

    React.useEffect(() => (isCancellable(requestData) ? () => requestData.cancel() : undefined), [requestData])

    const [state, setState] = React.useState<RequestState<TData, TError>>({
        data: null,
        loading: true,
        error: null
    })

    const abortController = React.useRef(new AbortController())

    React.useEffect(() => {
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
        }
    }
}