import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';
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
    private route: ActivatedRoute,
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
        console.log(response)
      }
    })
  }

  seeComics(id:string) {
    this.router.navigateByUrl('/categories/'+id)
  }

  private async presentModalCategory(category: Category | undefined = undefined) {
    const modal = await this.modalCtrl.create({
      component: CategoriesPage
    });
    modal.onDidDismiss().then(async (response: any) => {
      if (category) {
        this.categorySVC.getById(category.id).subscribe({
          next: (response) => {
            this.getCategories()
          },
          error: err => {}
        });
      }
    });
    await modal.present();
  }

  onIonInfinite(ev:InfiniteScrollCustomEvent) {
    this.getCategories(ev.target)
  }

}
