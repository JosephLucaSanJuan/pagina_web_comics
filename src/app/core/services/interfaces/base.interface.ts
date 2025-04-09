import { Observable } from "rxjs"
import { Paginated } from "../../models/paginated.model"
import { SearchParams } from "../../repositories/interfaces/Base-repository.interface"

export interface IBaseService<T> {
    getAll():Observable<T[]>
    getAll(page:number, pageSize:number): Observable<Paginated<T>>
    getAll(page?:number, pageSize?:number, filters?:SearchParams): Observable<Paginated<T>|T[]>
    getById(id:string):Observable<T|null>
}