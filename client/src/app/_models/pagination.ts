export interface Pagination {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
}

export class PaginatedResult<T> {
    result: T;//array of members at first but we can use it for everything
    pagination: Pagination;//pagination info
}