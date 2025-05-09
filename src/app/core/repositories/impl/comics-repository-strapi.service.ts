import { Injectable } from "@angular/core";
import { IBaseMapping } from "../interfaces/base-mapping.interface";
import { Comic } from "../../models/comic.model";
import { Paginated } from "../../models/paginated.model";

interface ComicRaw {
    data:Data,
    meta:Meta
}

interface ComicData{
    data: ComicAttributes
}

interface ComicAttributes {
    titulo:string
    autor:string
    fechaPublicación:Date
    tematica:string
    comentarios:string
}

interface Data {
    id:number
    attributes:ComicAttributes
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
        const attributes = isComicRaw(data) ? data.data.attributes : data.attributes
        return {
            id:id.toString(),
            titulo:attributes.titulo,
            autor:attributes.autor,
            fechaPublicacion:attributes.fechaPublicación,
            etiquetas:attributes.tematica,
            comentarios:attributes.comentarios
        };
    }
}