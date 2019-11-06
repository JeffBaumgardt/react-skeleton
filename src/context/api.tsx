import * as React from 'react'

export interface APIProviderProps {
    basePath: string;
    requestOptions?: (() => Partial<RequestInit>) | Partial<RequestInit>;
}

export const APIContext = React.createContext<Required<APIProviderProps>>({
    basePath: '',
    requestOptions: {},
})

export const APIProvider: React.FC<APIProviderProps> = ({children, ...value}) => {
    return (
        <APIContext.Provider
            value={{
                basePath: '',
                requestOptions: {},
                ...value,
            }}
        >
            {children}
        </APIContext.Provider>
    )
}
