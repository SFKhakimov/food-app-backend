export interface ResponsePaginationInterface<T> {
    count: number
    limit: number
    page: number
    items: T[]
}
