import { Inject, Injectable } from '@angular/core';
import { REPOSITORY_TOKEN } from '../../repositories/repository.tokens';
import { IBaseRepository, SearchParams } from '../../repositories/interfaces/base-repository.interface';
import { IBaseService } from '../interfaces/base.interface';
import { Observable } from 'rxjs';
import { Model } from '../../models/base.model';
import { Paginated } from '../../models/paginated.model';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T extends Model> implements IBaseService<T> {

  constructor(
    @Inject(REPOSITORY_TOKEN) protected repository: IBaseRepository<T>
  ) { }

  getAll(): Observable<T[]>

  getAll(page:number, pageSize:number): Observable<Paginated<T>>

  getAll(page:number, pageSize:number, filters:SearchParams): Observable<Paginated<T>>

  getAll(page?:number, pageSize?:number, filters?:SearchParams): Observable<Paginated<T>|T[]> {
    if (page == undefined || pageSize == undefined) {
      return this.repository.getAll(1, 25, {})
    } else {
      return this.repository.getAll(page, pageSize, filters??{})
    };
  }
  getById(id: string): Observable<T | null> {
    return this.repository.getById(id);
  }
}
