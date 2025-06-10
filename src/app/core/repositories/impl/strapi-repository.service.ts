import { Inject, Injectable } from "@angular/core";
import { Model } from "../../models/base.model";
import { HttpBaseRepositoryService } from "./base-repository-http.service";
import { HttpClient } from "@angular/common/http";
import { API_URL_TOKEN, IMAGE_RESOURCE_TOKEN, NAME_RESOURCE_TOKEN, REPOSITORY_MAPPING_TOKEN } from "../repository.tokens";
import { IBaseMapping } from "../interfaces/base-mapping.interface";
import { map, Observable } from "rxjs";
import { Paginated } from "../../models/paginated.model";
import { SearchParams } from "../interfaces/base-repository.interface";

export interface Data<T> {
    id:number
    attributes:T
}

export interface Pagination {
    pages:number
    pageSize:number
    pageCount:number
    total:number
}

export interface Meta {
    pagination: Pagination
}

export interface PaginatedRaw<T> {
    data:Data<T>[]
    meta:Meta
}

@Injectable({
    providedIn: 'root'
})
export class StrapiRepositoryService<T extends Model> extends HttpBaseRepositoryService<T> {

    constructor(
        protected override http: HttpClient,
        @Inject(API_URL_TOKEN) protected override apiUrl:string,
        @Inject(NAME_RESOURCE_TOKEN) protected override resource:string,
        @Inject(IMAGE_RESOURCE_TOKEN) protected image: string,
        @Inject(REPOSITORY_MAPPING_TOKEN) protected override mapping:IBaseMapping<T>
    ) {
        super(http, apiUrl, resource, mapping);
    }
    
    override getById(id: string): Observable<T> {
        return this.http.get<T>(`${this.apiUrl}/${this.resource}/${id}`).pipe(map(res=>this.mapping.getOne(res)));
    }

    override getAll(page: number, pageSize: number, filters: SearchParams = {}): Observable<Paginated<T> | T[]> {
        let search: string = Object.entries(filters)
            .map(([k, v]) => `filters[${k}]=${v}`)
            .reduce((p, v) => `${p}${v}`, "")
        if (page!=-1) {
            return this.http.get<PaginatedRaw<T>>(
                `${this.apiUrl}/${this.resource}?pagination[page]=${page}&pagination[pageSize]=${pageSize}&${search}&populate=${this.image}`
            ).pipe(map(res=>{
                if (res.meta) {
                    return this.mapping.getPaginated(page, pageSize, res.meta.pagination.total, res.data)
                } else {
                    return (res as any).map((comic:Data<T>)=>this.mapping.getOne(comic))
                }
            }))
        } else {
            return this.http.get<PaginatedRaw<T>>(
                `${this.apiUrl}/${this.resource}?`
            ).pipe(map((res:PaginatedRaw<T>)=>res.data.map((comic:Data<T>)=>this.mapping.getOne(comic))))
        }
    }
}