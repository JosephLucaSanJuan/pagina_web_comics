import { Injectable } from "@angular/core";
import { Category } from "../../models/category.model";
import { IBaseMapping } from "../interfaces/base-mapping.interface";
import { Paginated } from "../../models/paginated.model";
import { StrapiMedia } from "../../services/impl/strapi-media.service";

interface MediaRaw {
    data: StrapiMedia
}

interface CategoryRaw {
    data:Data,
    meta:Meta
}

interface Data {
    id:number
    label:string
    picture: MediaRaw | number | null
}

interface Meta {}

@Injectable({
    providedIn: 'root'
})
export class CategoriesRepositoryStrapiServerService implements IBaseMapping<Category> {
    getPaginated(page: number, pageSize: number, pages: number, data: Data[]): Paginated<Category> {
        return {page:page, pageSize:pageSize, pages:pages, data:data.map<Category>((d:Data)=>{
            return this.getOne(d)
        })};
    }
    getOne(data: Data | CategoryRaw): Category {
        const isCategoryRaw = (data:Data | CategoryRaw): data is CategoryRaw => 'meta' in data
        const id = isCategoryRaw(data) ? data.data.id : data.id
        const attributes = isCategoryRaw(data) ? data.data : data
        return {
            id:id.toString(),
            label:attributes.label,
            picture:typeof attributes.picture === 'object'?{
                url:attributes.picture?.data?.attributes.url,
                small:attributes.picture?.data?.attributes.url,
                medium:attributes.picture?.data?.attributes.url,
                large:attributes.picture?.data?.attributes.url,
                thumbnail:attributes.picture?.data?.attributes.url
            }:undefined
        };
    }
}