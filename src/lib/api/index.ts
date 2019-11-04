import {getToken} from 'lib/auth'
import {request, defaultRequestInit} from './request'
import {resolvePath} from './resolvePath'
import {UseRequestProps} from './types'
import {API_ROOT} from 'config'

export {useRequest} from './useRequest'

export default async function<TData, TQueryParams>(
    props: UseRequestProps<TData, TQueryParams>,
    signal?: AbortSignal
) {
    const {
        base = API_ROOT,
        path,
        queryParams = {},
        resolve = (d: any) => d as TData
    } = props

    // Read jwt from local storage and add auth header
    const token = getToken()
    if (token) {
        (defaultRequestInit.headers as Headers).append('Authorization', `Bearer ${token}`)
    }

    const requestOptions = (typeof props.requestOptions === 'function' ? props.requestOptions() : props.requestOptions) || {}
    const requestInit = {
        ...defaultRequestInit,
        ...requestOptions,
        signal
    }

    try {
        const response = await request(resolvePath(base, path, {...queryParams}), requestInit)
        const {content} = response

        if (signal && signal.aborted) {
            return
        }

        return resolve(content)
    } catch (err) {
        throw err
    }
}