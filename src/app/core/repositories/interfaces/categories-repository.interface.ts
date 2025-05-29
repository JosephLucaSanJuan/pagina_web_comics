import { Category } from "../../models/category.model";
import { IBaseRepository } from "./base-repository.interface";

export interface ICategoryRepository extends IBaseRepository<Category> {}