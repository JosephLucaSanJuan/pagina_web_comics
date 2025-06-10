import { InjectionToken } from "@angular/core";
import { IBaseRepository } from "./interfaces/base-repository.interface";
import { IBaseMapping } from "./interfaces/base-mapping.interface";

export const NAME_RESOURCE_TOKEN = new InjectionToken<string>('NameResource')
export const COMIC_NAME_RESOURCE_TOKEN = new InjectionToken<string>('ComicNameResource')
export const CATEGORY_NAME_RESOURCE_TOKEN = new InjectionToken<string>('CategoryNameResource')
export const COMIC_PROFILE_NAME_RESOURCE_TOKEN = new InjectionToken<string>('ComicProfileNameResource')
export const IMAGE_RESOURCE_TOKEN = new InjectionToken<string>('ResourceImage')
export const COMIC_COVER_RESOURCE_TOKEN = new InjectionToken<string>('ComicCoverResource')

export const API_URL_TOKEN = new InjectionToken<string>('ApiUrl')
export const COMICS_API_URL_TOKEN = new InjectionToken<string>('ComicsApiUrl')
export const CATEGORIES_API_URL_TOKEN = new InjectionToken<string>('CategoriesApiUrl')
export const COMIC_PROFILE_API_URL_TOKEN = new InjectionToken<string>('ComicProfileApiUrl')

export const REPOSITORY_TOKEN = new InjectionToken<IBaseRepository<any>>('REPOSITORY_TOKEN')
export const COMICS_REPOSITORY_TOKEN = new InjectionToken<IBaseRepository<any>>('COMICS_REPOSITORY_TOKEN')
export const CATEGORIES_REPOSITORY_TOKEN = new InjectionToken<IBaseRepository<any>>('CATEGORIES_REPOSITORY_TOKEN')

export const REPOSITORY_MAPPING_TOKEN = new InjectionToken<IBaseMapping<any>>('IBaseRepositoryMapping')
export const COMICS_REPOSITORY_MAPPING_TOKEN = new InjectionToken<IBaseMapping<any>>('IComicsRepositoryMapping')
export const CATEGORIES_REPOSITORY_MAPPING_TOKEN = new InjectionToken<IBaseMapping<any>>('ICategoriesRepositoryMapping')
export const BACK_END_TOKEN = new InjectionToken<string>('BackEnd')