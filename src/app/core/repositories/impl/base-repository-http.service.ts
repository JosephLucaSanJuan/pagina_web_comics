import { Inject, Injectable } from '@angular/core';
import { IBaseRepository, SearchParams } from '../interfaces/Base-repository.interface';
import { Observable } from 'rxjs';
import { API_URL_TOKEN, NAME_RESOURCE_TOKEN, REPOSITORY_MAPPING_TOKEN } from '../repository.tokens';
import { Paginated } from '../../models/paginated.model';
import { IBaseMapping } from '../interfaces/base-mapping.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpBaseRespositoryService<T> implements IBaseRepository<T> {

  constructor(
    @Inject(NAME_RESOURCE_TOKEN) protected resource: string,
    @Inject(API_URL_TOKEN) protected apiUrl: string,
    @Inject(REPOSITORY_MAPPING_TOKEN) protected mapping: IBaseMapping<T>
  ) { }

  getAll(page: number, pageSize: number, filters:SearchParams = {}): Observable<Paginated<T>|T[]> {
    throw new Error('Method not implemented.');
  }

  getById(id: string): Observable<T> {
    throw new Error('Method not implemented.');
  }
}
