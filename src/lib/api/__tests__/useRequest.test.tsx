import React from 'react'
import nock from 'nock'
import {render, wait, waitForElement} from '@testing-library/react'

import {APIProvider} from 'context/api'
import {useRequest} from '../'

describe('API - useRequest hook', () => {
    afterEach(() => {
        nock.cleanAll()
    })

    test('Should have a loading state on mount', () => {
        nock('http://server.fakeapi.com')
            .get('/')
            .reply(200, {
                echo: 'hello world',
            })

        const LoadingComponent = () => {
            const {data, loading} = useRequest<{echo: string}>({path: '/'})

            return loading ? <span>Loading...</span> : <span>{data && data.echo}</span>
        }

        const {getByText} = render(
            <APIProvider basePath="http://server.fakeapi.com">
                <LoadingComponent />
            </APIProvider>,
        )

        expect(getByText('Loading...')).toBeInTheDocument()
    })

    test('Should have data after the request', async () => {
        nock('http://server.fakeapi.com')
            .get('/')
            .reply(200, {
                echo: 'hello world',
            })

        const DataComponent = () => {
            const {data, loading} = useRequest<{echo: string}>({path: '/'})

            return loading ? <span>Loading...</span> : <span>{data && data.echo}</span>
        }

        const {getByText} = render(
            <APIProvider basePath="http://server.fakeapi.com">
                <DataComponent />
            </APIProvider>,
        )

        await waitForElement(() => getByText('hello world'))

        expect(getByText('hello world')).toBeInTheDocument()
	})

	test('Should not resolve after component unmounts', async () => {
		let requestResolves = () => {}
		const pendingRequestFinishes = new Promise(resolvePromise => {
			requestResolves = resolvePromise
		})

		nock('http://server.fakeapi.com').get('/').reply(200, () => pendingRequestFinishes)

		const resolve = jest.fn(val => val)

		const MountedComponent = () => {
			const { data, loading } = useRequest<{ echo: string }>({ path: '/', resolve })

			return loading ? <span>Loading...</span> : <span>{data && data.echo}</span>
		}

		const { unmount } = render(
			<APIProvider basePath='http://server.fakeapi.com'>
				<MountedComponent />
			</APIProvider>
		)

		unmount()
		requestResolves()
		await wait(() => expect(resolve).not.toHaveBeenCalled())
	})

	test('Should set the `error` object on error', async () => {
		nock('http://server.fakeapi.com').get('/').reply(401, {})

		const FakeComponent = () => {
			const { data, loading, error } = useRequest<{ echo: string }>({ path: '/' })

			if (error) {
				return <span>error: {error.message}</span>
			}
			return loading ? <span>Loading...</span> : <span>{data && data.echo}</span>
		}

		const {getByText} = render(
            <APIProvider basePath="http://server.fakeapi.com">
                <FakeComponent />
            </APIProvider>,
		)

		await waitForElement(() => getByText(/error/))

		expect(getByText(/error/)).toHaveTextContent(/401 Unauthorized/)
	})

	test('Should handle network error', async () => {
		nock('http://server.fakeapi.com').get('/').replyWithError({ message: 'server error' })

		const FakeComponent = () => {
            const {data, loading, error} = useRequest<{echo: string}>({path: '/'})

            if (error) {
                return <span>error: {error.message}</span>
            }
            return loading ? <span>Loading...</span> : <span>{data && data.echo}</span>
        }

        const {getByText} = render(
            <APIProvider basePath="http://server.fakeapi.com">
                <FakeComponent />
            </APIProvider>,
		)

		await waitForElement(() => getByText(/error/))

		expect(getByText(/error/)).toHaveTextContent(/request to http:\/\/server.fakeapi.com\/ failed, reason: server error/)
	})

	test('Should handle an alternate base url ignoring the basePath from context', async () => {
		nock('http://server.fakeapi.com').get('/foo').reply(200, { bar: 'hello' })

		const CallOutsideComponent = () => {
			const { data, loading } = useRequest<{ bar: string }>({ path: '/foo', base: 'http://server.fakeapi.com' })

			return loading ? <span>Loading...</span> : <span>{data && data.bar}</span>
		}

		const {getByText} = render(
            <APIProvider basePath="http://other.fakeserver.org">
                <CallOutsideComponent />
            </APIProvider>,
		)

		await waitForElement(() => getByText('hello'))
		expect(getByText('hello')).toHaveTextContent('hello')
	})

	test('Should refetch when the path changes', async () => {
		const firstCall = nock('http://server.fakeapi.com').get('/').reply(200, { id: 1 })
		const secondCall = nock('http://server.fakeapi.com').get('/next').reply(200, { id: 2 })

		const PathComponent = ({ path }: {path: string}) => {
			const { data, loading } = useRequest<{ id: number }>({ path })

			return loading ? <span>Loading...</span> : <span>ID: {data && data.id}</span>
		}

		const {rerender, getByText} = render(
            <APIProvider basePath="http://server.fakeapi.com">
                <PathComponent path='' />
            </APIProvider>,
		)

		await waitForElement(() => getByText(/ID:/))
		expect(getByText(/ID:/)).toHaveTextContent('ID: 1')

		rerender(
            <APIProvider basePath="http://server.fakeapi.com">
                <PathComponent path="/next" />
            </APIProvider>,
		)

		await waitForElement(() => getByText(/ID:/))
		expect(getByText(/ID:/)).toHaveTextContent('ID: 2')

		expect(firstCall.isDone()).toBeTruthy()
		expect(secondCall.isDone()).toBeTruthy()
	})

	test('Should not refetch if the path doesn\'t change', async () => {
		let apiCalls = 0
		const scope = nock('http://server.fakeapi.com').get('/').reply(200, () => ++apiCalls).persist()

		const PathComponent = ({path}: {path: string}) => {
            const {data, loading} = useRequest<{id: number}>({path})

            return loading ? <span>Loading...</span> : <span>ID: {data && data.id}</span>
		}

		const {rerender, getByText} = render(
            <APIProvider basePath="http://server.fakeapi.com">
                <PathComponent path="" />
            </APIProvider>,
		)

		rerender(
            <APIProvider basePath="http://server.fakeapi.com">
                <PathComponent path="" />
            </APIProvider>,
		)

		expect(apiCalls).toBe(1)
		scope.persist(false)
	})

	test('Should refetch when the queryParam changes', async () => {
		nock('http://server.fakeapi.com').get('/').reply(200, { id: 1 })
		nock('http://server.fakeapi.com')
            .get('/')
            .query({page: 2})
			.reply(200, {id: 2})

		const children = jest.fn().mockReturnValue(<div />)

		const PagingComponent = ({ queryParams }: {queryParams: {page: number}}) => {
			const params = useRequest<{ id: number }, any, { page: number }>({ path: '', queryParams })
			return children(params)
		}

		const { rerender } = render(
			<APIProvider basePath="http://server.fakeapi.com">
				<PagingComponent queryParams={{page: 1}} />
			</APIProvider>
		)

		rerender(
            <APIProvider basePath="http://server.fakeapi.com">
                <PagingComponent queryParams={{page: 2}} />
            </APIProvider>,
		)

		await wait(() => expect(children).toBeCalledTimes(3))
		expect(children.mock.calls[2][0].loading).toBeFalsy()
		expect(children.mock.calls[2][0].data).toEqual({id: 2})
	})

	test('Should not refetch when the queryParams does not change', () => {
		let apiCalls = 0
        const scope = nock('http://server.fakeapi.com')
			.get('/')
			.query({page: 1})
            .reply(200, () => ++apiCalls)
			.persist()

		const children = jest.fn().mockReturnValue(<div />)

		const PagingComponent = ({queryParams}: {queryParams: {page: number}}) => {
            const params = useRequest<{id: number}, any, {page: number}>({path: '', queryParams})
            return children(params)
        }

		const {rerender} = render(
            <APIProvider basePath="http://server.fakeapi.com">
                <PagingComponent queryParams={{page: 1}} />
            </APIProvider>,
        )

		rerender(
            <APIProvider basePath="http://server.fakeapi.com">
                <PagingComponent queryParams={{page: 1}} />
            </APIProvider>,
        )

		expect(apiCalls).toBe(1)
		scope.persist(false)
	})
})
