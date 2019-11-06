import nock from 'nock'
import {baseRequest} from '../baseRequest'
import NetworkError from '../networkError'

describe('API - baseRequest', () => {
    afterEach(() => {
        nock.cleanAll()
    })

    test('Standard useage', async () => {
        nock('http://server.fakeapi.com')
            .get('/')
            .reply(200, {echo: 'hello'})

        const url = 'http://server.fakeapi.com/'
        const response = await baseRequest(url, {})

        expect(response.content).toEqual({echo: 'hello'})
    })

    test('Should throw a network error on any status > 400', async () => {
        nock('http://server.fakeapi.com')
            .get('/')
            .reply(401, {})

        const url = 'http://server.fakeapi.com/'

        await expect(baseRequest(url, {})).rejects.toThrow(NetworkError)
    })

    test('Should recieve headers from the response', async () => {
        nock('http://server.fakeapi.com')
            .defaultReplyHeaders({
                'Content-Type': 'application/json',
            })
            .post('/path', {cookie: 'monster'})
            .reply(200, {})

        const url = 'http://server.fakeapi.com/path'

        const requestInit = {
            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }),
            method: 'POST',
            body: JSON.stringify({cookie: 'monster'}),
        }

        const response = await baseRequest(url, requestInit)
        expect(response.statusText).toBe('OK')
        expect(response.headers.get('Content-Type')).toBe('application/json')
    })

    test('Should be able to add headers to the request', async () => {
        const scope = nock('http://server.fakeapi.com', {
            reqheaders: {
                Authorization: 'Bearer 1a2b3c',
            },
        })
            .get('/')
            .reply(200, {})

        const url = 'http://server.fakeapi.com/'
        const requestInit = {
            headers: new Headers({
                Authorization: 'Bearer 1a2b3c',
            }),
        }

        await baseRequest(url, requestInit)

        expect(scope.isDone()).toBeTruthy()
    })
})
