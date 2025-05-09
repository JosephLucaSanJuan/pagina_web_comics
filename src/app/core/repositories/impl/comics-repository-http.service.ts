import { Injectable } from "@angular/core";
import { IBaseMapping } from "../interfaces/base-mapping.interface";
import { Comic } from "../../models/comic.model";
import { Paginated } from "../../models/paginated.model";

export interface ComicRaw {
    id:string
    title:string
    autor:string
    fechaPublicacion:Date
    tematica:string
    comentarios:string
}

@Injectable({
    providedIn: 'root'
})
export class ComicsRepositoryHttpService implements IBaseMapping<Comic> {
    getPaginated(page: number, pageSize: number, pages: number, data: ComicRaw[]): Paginated<Comic> {
        return {page:page, pageSize, pages:pages, data:data.map<Comic>((c:ComicRaw)=>{
            return this.getOne(c)
        })};
    }

    getOne(data: ComicRaw): Comic {
        return {
            id:data.id,
            titulo:data.title,
            autor:data.autor,
            fechaPublicacion:data.fechaPublicacion,
            etiquetas:data.tematica,
            comentarios:data.comentarios
        };
    }
}