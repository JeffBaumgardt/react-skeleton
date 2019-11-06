import {getToken} from 'lib/auth'
import {API_ROOT} from 'appConfig'
import {baseRequest, defaultRequestInit} from './baseRequest'
import {resolvePath} from './resolvePath'
import {UseRequestProps, RequestResponse} from './types'
import NetworkError from './networkError'

export default async function request<TData, TRequestBody, TQueryParams>(
    props: UseRequestProps<TData, TRequestBody, TQueryParams>,
    signal?: AbortSignal,
): Promise<RequestResponse | undefined> {
    const {base = API_ROOT, path, queryParams = {}, body} = props

    // Read jwt from local storage and add auth header
    const token = getToken()
    if (token) {
        ;(defaultRequestInit.headers as Headers).append('Authorization', `Bearer ${token}`)
    }

    const requestOptions =
        (typeof props.requestOptions === 'function' ? props.requestOptions() : props.requestOptions) || {}
    const requestInit = {
        ...defaultRequestInit,
        ...requestOptions,
        signal,
    }

    if (requestInit.method && ['GET', 'POST', 'PUT', 'PATCH'].includes(requestInit.method)) {
        requestInit.body = typeof body === 'object' ? JSON.stringify(body) : ((body as unknown) as string)
    }

    return await baseRequest(resolvePath(base, path, {...queryParams}), requestInit)
}

export {useRequest} from './useRequest'
