import { Inject, Injectable } from "@angular/core";
import { Comic } from "../../models/comic.model";
import { COMICS_REPOSITORY_TOKEN } from "../../repositories/repository.tokens";
import { IBaseRepository } from "../../repositories/interfaces/base-repository.interface";
import { BaseService } from "./base-service.service";

@Injectable({
    providedIn: 'root'
})
export class ComicService extends BaseService<Comic> {
    constructor(
        @Inject(COMICS_REPOSITORY_TOKEN) repository: IBaseRepository<Comic>
    ) {
        super(repository)
    }
}