import NetworkError from './networkError'
import {ResolvePath} from './resolvePath'
import {RequestOptions, RequestResponse} from './types'

const requestHeaders = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json'
})

export const defaultRequestInit: Partial<RequestInit> = {
    headers: requestHeaders,
    method: 'GET',
}

export const baseRequest = async (url: ResolvePath, requestInit: RequestOptions): Promise<RequestResponse> => {
    const thisRequest = new Request(url, requestInit)

    try {
        const response = await fetch(thisRequest)
        const content = await response.json()

        if (response.status > 400 || response.status < 100) {
            throw new NetworkError('status', requestInit, response)
        }

        return {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            content
        }
	} catch (err) {
        if (err.name === 'AbortError' || (requestInit.signal && requestInit.signal.aborted)) {
            throw new NetworkError('abort', requestInit)
        }
        throw err
    }
}
