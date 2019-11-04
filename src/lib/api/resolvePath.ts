import queryString from 'query-string'

export type ResolvePath = ReturnType<typeof resolvePath>

export function resolvePath<TQueryParams>(base: string, path: string, queryParams: TQueryParams) {
    const augmentedPath = Object.keys(queryParams).length ? `${path}?${queryString.stringify(queryParams)}` : path

    return new URL(augmentedPath, base).toJSON() // Outputs a string not an object, just incase toJSON is not confusing at all.
}