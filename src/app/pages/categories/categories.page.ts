import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from 'src/app/core/models/category.model';
import { Paginated } from 'src/app/core/models/paginated.model';
import { CategoryService } from 'src/app/core/services/impl/category-service.service';

@Component({
  selector: 'app-categories',
  standalone: false,
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  _categories:BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([])
  categories$:Observable<Category[]> = this._categories.asObservable()

  constructor(
    private categorySVC: CategoryService,
    private router: Router,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.getCategories()
  }
  
  pick:any = null
  page:number = 1
  pages:number = 0
  pageSize:number = 25

  getCategories(notify:HTMLIonInfiniteScrollElement|null=null) {
    this.categorySVC.getAll(this.page, this.pageSize).subscribe({
      next:(response:Paginated<Category>)=>{
        this._categories.next([...this._categories.value, ...response.data])
        this.page++
        notify?.complete()
      }
    })
  }

  seeComics(id:string) {
    this.router.navigateByUrl('/comics/'+id)
  }

}
