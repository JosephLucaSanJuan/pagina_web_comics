import { Injectable } from "@angular/core";
import { IBaseMapping } from "../interfaces/base-mapping.interface";
import { Comic } from "../../models/comic.model";
import { Paginated } from "../../models/paginated.model";
import { StrapiMedia } from "../../services/impl/strapi-media.service";

interface MediaRaw {
    data: StrapiMedia
}

interface CategoryRaw {
    data:CategoryData
    meta:Meta
}

interface CategoryData {
    id:number
    label:string
    comics: ComicRaw[] | number[] | null
    picture:MediaRaw | number | null
}

interface ComicRaw {
    data:ComicData,
    meta:Meta
}

/*interface ComicData{
    data: ComicAttributes
}

interface ComicAttributes {
}*/

interface ComicData {
    id:number
    title:string
    autor:string
    synopsis:string
    fechaPublicación:Date
    tematica: CategoryRaw[] | number[] | null
    comentarios:string
    cover: MediaRaw | number | null
    //attributes:ComicAttributes
}

interface Meta {}

@Injectable({
    providedIn: 'root'
})
export class ComicsRepositoryStrapiService implements IBaseMapping<Comic> {
    getPaginated(page: number, pageSize: number, pages: number, data: ComicData[]): Paginated<Comic> {
        return {page:page, pageSize:pageSize, pages:pages, data:data.map<Comic>((d:ComicData)=>{
            return this.getOne(d)
        })};
    }
    getOne(data: ComicData | ComicRaw): Comic {
        const isComicRaw = (data:ComicData | ComicRaw): data is ComicRaw => 'meta' in data
        const id = isComicRaw(data) ? data.data.id : data.id
        const attributes = isComicRaw(data) ? data.data : data
        return {
            id:id.toString(),
            title:attributes.title,
            author:attributes.autor,
            synopsis: attributes.synopsis,
            publishing_date: attributes.fechaPublicación,
            categories: Array.isArray(attributes.tematica)
                ? attributes.tematica.map((cat: any) =>
                    typeof cat === 'object' && cat !== null && 'id' in cat
                        ? cat.id.toString() : typeof cat === 'number'
                        ? cat.toString() : ''
                ).filter((c: string) => c !== '') : undefined,
            comentaries: attributes.comentarios,
            cover: typeof attributes.cover === 'object' && attributes.cover !== null && 'data' in attributes.cover
            ? {
                url: (attributes.cover as any).data?.attributes?.url,
                small: (attributes.cover as any).data?.attributes?.url,
                medium:(attributes.cover as any).data?.attributes.url,
                large:(attributes.cover as any).data?.attributes.url,
                thumbnail:(attributes.cover as any).data?.attributes.url
            }:undefined
        };
    }
}