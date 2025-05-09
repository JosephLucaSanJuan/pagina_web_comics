import { Comic } from "../../models/comic.model";
import { IBaseService } from "./base.interface";

export interface IComicService extends IBaseService<Comic> {}