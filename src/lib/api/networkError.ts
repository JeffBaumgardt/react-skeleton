interface NetworkResponse extends Partial<Response> {
    content?: any;
}

interface Network extends Partial<RequestInit> {
    reason: string;
    response?: NetworkResponse;
}

class NetworkError extends Error {
    network: Network

    constructor(reason: string, options: Partial<RequestInit>, response?: NetworkResponse) {
        let message = `${reason} using ${options.method}`
        if (response) {
            message += ` with response ${response.status} ${response.statusText}`
        }

        super(message)

        this.message = message
        this.name = 'NetworkError'
        this.network = {...options, reason, ...response}

        Object.setPrototypeOf(this, NetworkError.prototype)
    }
}

export default NetworkError
