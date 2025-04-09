import { Observable } from "rxjs";
import { Paginated } from "../../models/paginated.model";

export interface SearchParams {
    [key: string]: string
}

export interface IBaseRepository<T> {
    getAll(page:number, pageSize:number, filters:SearchParams):Observable<Paginated<T>|T[]>
    getById(id:string):Observable<T>
}