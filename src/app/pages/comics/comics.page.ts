import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from 'src/app/core/models/category.model';
import { Comic } from 'src/app/core/models/comic.model';
import { Paginated } from 'src/app/core/models/paginated.model';
import { CategoryService } from 'src/app/core/services/impl/category-service.service';
import { ComicService } from 'src/app/core/services/impl/comic-service.service';

@Component({
  selector: 'app-comics',
  standalone: false,
  templateUrl: './comics.page.html',
  styleUrls: ['./comics.page.scss'],
})
export class ComicsPage implements OnInit {

  category:Category|undefined
  _comics:BehaviorSubject<Comic[]> = new BehaviorSubject<Comic[]>([])
  comic$:Observable<Comic[]> = this._comics.asObservable()

  constructor(
    private comicSVC: ComicService,
    private categorySVC: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let categoryID = params.get('id')
      /*this.category = params['category']
      this.getComics()*/
      if (categoryID) {
        this.categorySVC.getById(categoryID).subscribe({
          next: response => {
            this.category = response ?? undefined;
            this.getComics(this.category);
          },
          error:(error:any)=>{
            console.log(error)
          }
        })
      } else {
        this.getComics()
      }
    })
  }
  
  pick:any = null
  page:number = 1
  pages:number = 0
  pageSize:number = 25

  getComics(category?:Category){
    if (category && category?.id) {
      this.comicSVC.getAll(this.page, this.pageSize, {category: category.id}).subscribe({
        next:(response:Paginated<Comic>)=>{
          this._comics.next([...this._comics.value, ...response.data])
          this.page++
          this.pages = response.pages
          console.log(response)
        }
      })
    } else {
      this.comicSVC.getAll(this.page, this.pageSize).subscribe({
        next:(response:Paginated<Comic>)=>{
          this._comics.next([...this._comics.value, ...response.data])
          this.page++
          this.pages = response.pages
          console.log(response)
        }
      })
    }
  }

  getMoreComics(notify:HTMLIonInfiniteScrollElement|null=null){
    this.comicSVC.getAll(this.page, this.pageSize).subscribe({
      next:(response:Paginated<Comic>)=>{
        this._comics.next([...this._comics.value, ...response.data])
        this.page++
        notify?.complete()
      }
    })
  }

  seeComic(id:string){
    this.router.navigate(['/comics', id])
  }

  onIonInfinite(ev:InfiniteScrollCustomEvent) {
    this.getMoreComics(ev.target)
  }

}
