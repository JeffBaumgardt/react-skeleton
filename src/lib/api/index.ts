import {getToken} from 'lib/auth'
import {API_ROOT} from 'appConfig'
import {request, defaultRequestInit} from './request'
import {resolvePath} from './resolvePath'
import {UseRequestProps} from './types'

export {useRequest} from './useRequest'

export default async function<TData, TRequestBody, TQueryParams>(
    props: UseRequestProps<TData, TRequestBody, TQueryParams>,
    signal?: AbortSignal
) {
    const {
        base = API_ROOT,
        path,
        queryParams = {},
        resolve = (d: any) => d as TData,
        body
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

    if (requestInit.method && ['GET', 'POST', 'PUT', 'PATCH'].includes(requestInit.method)) {
        requestInit.body = typeof body === 'object' ? JSON.stringify(body) : ((body as unknown) as string)
    }

    const response = await request(resolvePath(base, path, {...queryParams}), requestInit)
    const {content} = response

    if (signal && signal.aborted) {
        return null
    }

    return resolve(content)
}