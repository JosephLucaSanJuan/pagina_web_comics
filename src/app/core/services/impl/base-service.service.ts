import { Inject, Injectable } from '@angular/core';
import { REPOSITORY_TOKEN } from '../../repositories/repository.tokens';
import { IBaseRepository } from '../../repositories/interfaces/Base-repository.interface';
import { IBaseService } from '../interfaces/base.interface';
import { Observable } from 'rxjs';
import { Model } from '../../models/base.model';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T extends Model> implements IBaseService<T> {

  constructor(
    @Inject(REPOSITORY_TOKEN) protected repository: IBaseRepository<T>
  ) { }

  getAll(): Observable<T[]> {
    return this.getAll();
  }
  getById(id: string): Observable<T | null> {
    return this.repository.getById(id);
  }
}
