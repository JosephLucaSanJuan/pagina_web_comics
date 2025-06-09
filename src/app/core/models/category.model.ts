import { Model } from "./base.model";

export interface Category extends Model {
    label:string,
    comic?:string[]
    picture?:{
        url:string | undefined,
        small:string | undefined,
        medium:string | undefined,
        large:string | undefined,
        thumbnail:string | undefined
    }
}