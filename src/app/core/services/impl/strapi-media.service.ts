import { HttpClient } from "@angular/common/http"
import { BaseMediaService } from "./base-media.service"
import { Observable } from "rxjs"

export interface ProvideMetaData {
    public_id: string,
    resource_type: string
}

export interface Thumbnail {
    ext: string
    url: string
    hash: string
    mime: string
    name: string
    path: any
    size: number
    width: number
    height: number
    provider_metadata: ProvideMetaData
}

export interface Small {
    ext: string
    url: string
    hash: string
    mime: string
    name: string
    path: any
    size: number
    width: number
    height: number
    provider_metadata: ProvideMetaData
}

export interface Medium {
    ext: string
    url: string
    hash: string
    mime: string
    name: string
    path: any
    size: number
    width: number
    height: number
    provider_metadata: ProvideMetaData
}

export interface Large {
    ext: string
    url: string
    hash: string
    mime: string
    name: string
    path: any
    size: number
    width: number
    height: number
    provider_metadata: ProvideMetaData
}

export interface Formats {
    small: Small
    medium: Medium
    large: Large
    thumbnail: Thumbnail
}

export interface StrapiMediaData {
    id: number
    name: string
    altText: any
    caption: any
    width: number
    height: number
    formats: Formats
    ext: string
    url: string
    hash: string
    mime: string
    size: number
    previewUrl: any
    provider: string
    provider_metadata: ProvideMetaData
    createdAt:string
    updatedAt:string
}

export interface StrapiMedia {
    id:number
    attributes:StrapiMediaData
}

export type StrapiUploadResponse = StrapiMediaData[]

export class StrapiMediaService extends BaseMediaService {
    
    constructor(
        private httpClient:HttpClient
    ) {
        super()
    }

    public override upload(blob: Blob): Observable<number[]> {
        throw new Error("Method not implemented.")
    }
}