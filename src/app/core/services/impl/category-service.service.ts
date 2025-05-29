import { Injectable, Inject } from "@angular/core";
import { Category } from "../../models/category.model";
import { IBaseRepository } from "../../repositories/interfaces/base-repository.interface";
import { CATEGORIES_REPOSITORY_TOKEN } from "../../repositories/repository.tokens";
import { BaseService } from "./base-service.service";

@Injectable({
    providedIn: 'root'
})
export class CategoryService extends BaseService<Category> {
    constructor(
        @Inject(CATEGORIES_REPOSITORY_TOKEN) repository: IBaseRepository<Category>
    ) {
        super(repository)
    }
}