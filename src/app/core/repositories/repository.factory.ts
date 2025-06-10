import { FactoryProvider } from "@angular/core";
import { BACK_END_TOKEN, CATEGORIES_API_URL_TOKEN, CATEGORIES_REPOSITORY_MAPPING_TOKEN, CATEGORIES_REPOSITORY_TOKEN, CATEGORY_NAME_RESOURCE_TOKEN, COMIC_COVER_RESOURCE_TOKEN, COMIC_NAME_RESOURCE_TOKEN, COMICS_API_URL_TOKEN, COMICS_REPOSITORY_MAPPING_TOKEN, COMICS_REPOSITORY_TOKEN, IMAGE_RESOURCE_TOKEN } from "./repository.tokens";
import { HttpClient } from "@angular/common/http";
import { Comic } from "../models/comic.model";
import { IBaseMapping } from "./interfaces/base-mapping.interface";
import { HttpBaseRepositoryService } from "./impl/base-repository-http.service";
import { LocalStorageBaseRepositoryService } from "./impl/base-repository-local-storage.service";
import { StrapiRepositoryService } from "./impl/strapi-repository.service";
import { ComicsRepositoryHttpService } from "./impl/comics-repository-http.service";
import { ComicsRepositoryLocalStorage } from "./impl/comics-repository-local-storage.service";
import { ComicsRepositoryStrapiService } from "./impl/comics-repository-strapi.service";
import { CategoriesRepositoryJSONService } from "./impl/categories-repository-json.service";
import { CategoriesRepositoryStrapiServerService } from "./impl/categories-repository-strapi-server.service";

export const ComicsRepositoryFactory:FactoryProvider = {
    provide: COMICS_REPOSITORY_TOKEN,
    useFactory: (backend:string, http:HttpClient, apiURL:string, resource:string, image:string, mapping:IBaseMapping<Comic>) => {
        switch(backend) {
            case 'http':
                return new HttpBaseRepositoryService<Comic>(http, apiURL, resource, mapping)
                break;
                
            case 'local-storage':
                return new LocalStorageBaseRepositoryService<Comic>(resource, mapping)
                break;
                
            case 'strapi':
                return new StrapiRepositoryService<Comic>(http, apiURL, resource, image, mapping)
                break;
                
            /*case 'json':
                return new HttpBaseRepositoryService<Comic>(http, apiURL, resource, mapping)
                break;*/
        
            default:
                throw new Error("BACKEND NOT IMPLEMENTED")
                break;
        }
    },
    deps: [BACK_END_TOKEN, HttpClient, COMICS_API_URL_TOKEN, COMIC_NAME_RESOURCE_TOKEN, COMIC_COVER_RESOURCE_TOKEN, COMICS_REPOSITORY_MAPPING_TOKEN]
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

export const CategoryRepositoryFactory:FactoryProvider = {
    provide: CATEGORIES_REPOSITORY_TOKEN,
    useFactory: (backend:string, http:HttpClient, apiURL:string, resource:string, image:string, mapping:IBaseMapping<Comic>) => {
        switch(backend) {
            case 'http':
                return new HttpBaseRepositoryService<Comic>(http, apiURL, resource, mapping)
                break;
                
            case 'local-storage':
                return new LocalStorageBaseRepositoryService<Comic>(resource, mapping)
                break;
                
            case 'strapi':
                return new StrapiRepositoryService<Comic>(http, apiURL, resource, image, mapping)
                break;
                
            /*case 'json':
                return new HttpBaseRepositoryService<Comic>(http, apiURL, resource, mapping)
                break;*/
        
            default:
                throw new Error("BACKEND NOT IMPLEMENTED")
                break;
        }
    },
    deps: [BACK_END_TOKEN, HttpClient, CATEGORIES_API_URL_TOKEN, CATEGORY_NAME_RESOURCE_TOKEN, IMAGE_RESOURCE_TOKEN, CATEGORIES_REPOSITORY_MAPPING_TOKEN]
}

export const CategoryMappingFactory:FactoryProvider = {
    provide: CATEGORIES_REPOSITORY_MAPPING_TOKEN,
    useFactory: (backend:string) => {
        switch (backend) {
            case 'http':
                return new CategoriesRepositoryJSONService()
                break;
        
            case 'local-storage':
                throw new Error("BACKEND NOT IMPLEMENTED")
                break;
                
            case 'strapi':
                return new CategoriesRepositoryStrapiServerService()
                break;

            default:
                throw new Error("BACKEND NOT IMPLEMENTED")
                break;
        }
    },
    deps: [BACK_END_TOKEN]
}