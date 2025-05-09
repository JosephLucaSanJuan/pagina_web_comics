import { FactoryProvider } from "@angular/core";
import { BACK_END_TOKEN, COMIC_NAME_RESOURCE_TOKEN, COMICS_API_URL_TOKEN, COMICS_REPOSITORY_MAPPING_TOKEN, COMICS_REPOSITORY_TOKEN } from "./repository.tokens";
import { HttpClient } from "@angular/common/http";
import { Comic } from "../models/comic.model";
import { IBaseMapping } from "./interfaces/base-mapping.interface";
import { HttpBaseRepositoryService } from "./impl/base-repository-http.service";
import { LocalStorageBaseRepositoryService } from "./impl/base-repository-local-storage.service";
import { StrapiRepositoryService } from "./impl/strapi-repository.service";
import { ComicsRepositoryHttpService } from "./impl/comics-repository-http.service";
import { ComicsRepositoryLocalStorage } from "./impl/comics-repository-local-storage.service";
import { ComicsRepositoryStrapiService } from "./impl/comics-repository-strapi.service";

export const ComicsRepositoryFactory:FactoryProvider = {
    provide: COMICS_REPOSITORY_TOKEN,
    useFactory: (backend:string, http:HttpClient, apiURL:string, resource:string, mapping:IBaseMapping<Comic>) => {
        switch(backend) {
            case 'http':
                return new HttpBaseRepositoryService<Comic>(http, apiURL, resource, mapping)
                break;
                
            case 'local-storage':
                return new LocalStorageBaseRepositoryService<Comic>(resource, mapping)
                break;
                
            case 'strapi':
                return new StrapiRepositoryService<Comic>(http, apiURL, resource, mapping)
                break;
                
            /*case 'json':
                return new HttpBaseRepositoryService<Comic>(http, apiURL, resource, mapping)
                break;*/
        
            default:
                throw new Error("BACKEND NOT IMPLEMENTED")
                break;
        }
    },
    deps: [BACK_END_TOKEN, HttpClient, COMICS_API_URL_TOKEN, COMIC_NAME_RESOURCE_TOKEN, COMICS_REPOSITORY_MAPPING_TOKEN]
}

export const ComicsMappingFactory:FactoryProvider = {
    provide: COMICS_REPOSITORY_MAPPING_TOKEN,
    useFactory: (backend:string) => {
        switch (backend) {
            case 'http':
                return new ComicsRepositoryHttpService()
                break;
        
            case 'local-storage':
                return new ComicsRepositoryLocalStorage()
                break;
                
            case 'strapi':
                return new ComicsRepositoryStrapiService()
                break;

            default:
                throw new Error("BACKEND NOT IMPLEMENTED")
                break;
        }
    },
    deps: [BACK_END_TOKEN]
}