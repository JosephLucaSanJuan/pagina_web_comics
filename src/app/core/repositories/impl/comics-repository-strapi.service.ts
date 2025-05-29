import { Injectable } from "@angular/core";
import { IBaseMapping } from "../interfaces/base-mapping.interface";
import { Comic } from "../../models/comic.model";
import { Paginated } from "../../models/paginated.model";
import { StrapiMedia } from "../../services/impl/strapi-media.service";

interface MediaRaw {
    data: StrapiMedia
}

interface ComicRaw {
    data:Data,
    meta:Meta
}

/*interface ComicData{
    data: ComicAttributes
}

interface ComicAttributes {
}*/

interface Data {
    id:number
    title:string
    autor:string
    fechaPublicación:Date
    tematica:string
    comentarios:string
    cover: MediaRaw | number | null
    //attributes:ComicAttributes
}

interface Meta {}

@Injectable({
    providedIn: 'root'
})
export class ComicsRepositoryStrapiService implements IBaseMapping<Comic> {
    getPaginated(page: number, pageSize: number, pages: number, data: Data[]): Paginated<Comic> {
        return {page:page, pageSize:pageSize, pages:pages, data:data.map<Comic>((d:Data)=>{
            return this.getOne(d)
        })};
    }
    getOne(data: Data | ComicRaw): Comic {
        const isComicRaw = (data:Data | ComicRaw): data is ComicRaw => 'meta' in data
        const id = isComicRaw(data) ? data.data.id : data.id
        const attributes = isComicRaw(data) ? data.data : data
        return {
            id:id.toString(),
            title:attributes.title,
            author:attributes.autor,
            publishing_date:attributes.fechaPublicación,
            categories:attributes.tematica,
            comentaries:attributes.comentarios,
            cover:typeof attributes.cover === 'object'?{
                url:attributes.cover?.data?.attributes.url,
                small:attributes.cover?.data?.attributes.url,
                medium:attributes.cover?.data?.attributes.url,
                large:attributes.cover?.data?.attributes.url,
                thumbnail:attributes.cover?.data?.attributes.url
            }:undefined
        };
    }
}