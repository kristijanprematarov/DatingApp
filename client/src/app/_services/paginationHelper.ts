import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { PaginatedResult } from "../_models/pagination";

export function getPaginatedResult<T>(url, params, httpClient: HttpClient) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
    //when we observe the response we get the full response, so we have to get the body ourselves
    return httpClient.get<T>(url, { observe: 'response', params }).pipe(
        map(response => {
            paginatedResult.result = response.body; //members array is here
            if (response.headers.get('Pagination') !== null) {
                paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
            }

            return paginatedResult;
        })
    );
}

export function getPaginationHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams();

    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    return params;
}