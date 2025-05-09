import { Comic } from "../../models/comic.model";
import { IBaseRepository } from "./base-repository.interface";

export interface IComicRepository extends IBaseRepository<Comic>{}