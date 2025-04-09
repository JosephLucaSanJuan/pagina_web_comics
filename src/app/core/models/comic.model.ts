import { Model } from "./base.model";

export interface Comic extends Model {
    titulo:string,
    autor:string,
    etiquetas:string,
    fechaPublicacion:Date,
    comentarios:string,
}