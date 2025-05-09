import { Inject, Injectable } from '@angular/core';
import { IBaseRepository, SearchParams } from '../interfaces/base-repository.interface';
import { map, Observable } from 'rxjs';
import { API_URL_TOKEN, NAME_RESOURCE_TOKEN, REPOSITORY_MAPPING_TOKEN } from '../repository.tokens';
import { Paginated } from '../../models/paginated.model';
import { IBaseMapping } from '../interfaces/base-mapping.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpBaseRepositoryService<T> implements IBaseRepository<T> {

  constructor(
    protected http: HttpClient,
    @Inject(NAME_RESOURCE_TOKEN) protected resource: string,
    @Inject(API_URL_TOKEN) protected apiUrl: string,
    @Inject(REPOSITORY_MAPPING_TOKEN) protected mapping: IBaseMapping<T>
  ) { }

  getAll(page: number, pageSize: number, filters:SearchParams = {}): Observable<Paginated<T>|T[]> {
    return this.http.get<T[]>(`${this.apiUrl}/${this.resource}`).pipe(map(res=>this.mapping.getPaginated(page, pageSize, 0 , res)));
  }

  getById(id: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${this.resource}/${id}`).pipe(map(res=>this.mapping.getOne(res)));
  }
}
