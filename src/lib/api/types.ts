import { APIProviderProps } from 'context/api'

export interface UseRequestProps<TData, TRequestBody, TQueryParams> {
    path: string;
    queryParams?: TQueryParams;
    requestOptions?: APIProviderProps['requestOptions'];
    resolve?: (data: any) => TData;
    base?: APIProviderProps['basePath'];
    method?: 'POST' | 'GET' | 'DELETE' | 'PATCH';
    body?: TRequestBody;
}

export interface RequestError<TError> {
    message: string;
    data: TError | string;
    status?: Response['status'];
}

export interface RequestState<TData, TError> {
    data: TData | null;
    error: RequestError<TError> | null;
    loading: boolean;
}

export interface UseRequestReturn<TData, TError> extends RequestState<TData, TError> {
    cancel: () => void;
}

export interface Cancelable {
    cancel: () => void;
    flush: () => void;
}

export type RequestOptions = Partial<RequestInit>

export interface RequestResponse<TResponseContent> {
    status: Response['status'];
    statusText: Response['statusText'];
    headers: Headers;
    content: TResponseContent;
}
