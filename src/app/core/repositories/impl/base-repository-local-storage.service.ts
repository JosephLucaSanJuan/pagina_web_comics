import { Inject, Injectable } from '@angular/core';
import { IBaseRepository, SearchParams } from '../interfaces/Base-repository.interface';
import { Observable, of } from 'rxjs';
import { NAME_RESOURCE_TOKEN, REPOSITORY_MAPPING_TOKEN } from '../repository.tokens';
import { IBaseMapping } from '../interfaces/base-mapping.interface';
import { Paginated } from '../../models/paginated.model';
import { Model } from '../../models/base.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageBaseRepositoryService<T extends Model> implements IBaseRepository<T> {

  _content:T[] = []
  constructor(
    @Inject(NAME_RESOURCE_TOKEN) protected resource:string,
    @Inject(REPOSITORY_MAPPING_TOKEN) protected mapping:IBaseMapping<T>
  ) { }

  getAll(page: number, pageSize: number, filters:SearchParams = {}): Observable<Paginated<T>|T[]> {
    return of(
      this.mapping.getPaginated(page, pageSize, Math.ceil(this._content.length / pageSize),
        this._content.slice(
          page*pageSize,
          Math.min(
            (page+1)*pageSize,
            this._content.length
          )
        )
      )
    );
  }
  
  getById(id: string): Observable<T> {
    return of(this.mapping.getOne(this._content.find(item=>item.id == id) ?? null));
  }
}
