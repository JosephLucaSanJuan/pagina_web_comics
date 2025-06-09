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
    //tematica:string
    comentarios:string
    cover:{
        url: string
        small: string
        medium: string
        large: string
        thumbnail: string
    }
}

@Injectable({
    providedIn: 'root'
})
export class ComicsRepositoryLocalStorage implements IBaseMapping<Comic> {
    getPaginated(page: number, pageSize: number, pages: number, data: ComicRaw[]): Paginated<Comic> {
        return {page:page, pageSize:pageSize, pages:pages, data:data.map<Comic>((c:ComicRaw)=>{
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
            //categories:data.tematica,
            comentaries:data.comentarios,
            cover:{
                url: data.cover.url,
                small: data.cover.small,
                medium: data.cover.medium,
                large: data.cover.large,
                thumbnail: data.cover.thumbnail
            }
        };
    }
}