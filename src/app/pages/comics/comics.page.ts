import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Comic } from 'src/app/core/models/comic.model';
import { Paginated } from 'src/app/core/models/paginated.model';
import { ComicService } from 'src/app/core/services/impl/comic-service.service';

@Component({
  selector: 'app-comics',
  standalone: false,
  templateUrl: './comics.page.html',
  styleUrls: ['./comics.page.scss'],
})
export class ComicsPage implements OnInit {

  _comics:BehaviorSubject<Comic[]> = new BehaviorSubject<Comic[]>([])
  comic$:Observable<Comic[]> = this._comics.asObservable()

  constructor(
    private comicSVC: ComicService,
    private router: Router,
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }
  
  pick:any = null
  page:number = 1
  pages:number = 0
  pageSize:number = 25

  getComics(notify:HTMLIonInfiniteScrollElement|null=null){
    this.comicSVC.getAll().subscribe({
      next:(response:Paginated<Comic>)=>{
        this._comics.next([...this._comics.value, ...response.data])
        this.page++
        notify?.complete()
      }
    })
  }

}
