import { Injectable } from "@angular/core";
import { Category } from "../../models/category.model";
import { IBaseMapping } from "../interfaces/base-mapping.interface";
import { Paginated } from "../../models/paginated.model";

export interface CategoryRaw{
    id:string
    label:string
}

@Injectable({
    providedIn: 'root'
})
export class CategoriesRepositoryJSONService implements IBaseMapping<Category> {
    getPaginated(page: number, pageSize: number, pages: number, data: CategoryRaw[]): Paginated<Category> {
        return {page:page, pageSize:pageSize, pages:pages, data:data.map<Category>((c:CategoryRaw)=>{
            return this.getOne(c)
        })};
    }
    
    getOne(data: CategoryRaw): Category {
        return {
            id:data.id,
            label:data.label,
            picture:(data as any)["picture"]?{
                url:(data as any)["picture"].url,
                small:(data as any)["picture"].large,
                medium:(data as any)["picture"].medium,
                large:(data as any)["picture"].large,
                thumbnail:(data as any)["picture"].thumbnail
            }:undefined
        };
    }
}