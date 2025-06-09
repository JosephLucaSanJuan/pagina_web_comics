import { Injectable } from "@angular/core";
import { IBaseMapping } from "../interfaces/base-mapping.interface";
import { Comic } from "../../models/comic.model";
import { Paginated } from "../../models/paginated.model";

export interface ComicRaw {
    id:string
    title:string
    autor:string
    synopsis:string
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
            title:data.title,
            author:data.autor,
            synopsis:data.synopsis,
            publishing_date:data.fechaPublicacion,
            categories:(data as any)["tematica"].tematica??'',
            comentaries:data.comentarios,
            cover:(data as any)["cover"]?{
                url:(data as any)["cover"].url,
                small:(data as any)["cover"].large,
                medium:(data as any)["cover"].medium,
                large:(data as any)["cover"].large,
                thumbnail:(data as any)["cover"].thumbnail
            }:undefined
        };
    }
}