export enum StatusType {
    Idle = 0,
    InProgress = 1,
    Succeeded = 2,
    Failed = 3,
}

export type QueryPaginationParams = {
    page?: number
    limit?: number
    order?: 'asc' | 'desc'
    start: number
    end: number
}