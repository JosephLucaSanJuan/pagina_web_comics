import { Model } from "./base.model";

export interface Comic extends Model {
    title:string,
    author:string,
    categories:string,
    publishing_date:Date,
    comentaries:string,
    cover?:{
        url:string | undefined,
        small:string | undefined,
        medium:string | undefined,
        large:string | undefined,
        thumbnail:string | undefined
    }
}