import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { Comic } from 'src/app/core/models/comic.model';
import { ComicService } from 'src/app/core/services/impl/comic-service.service';

@Component({
  selector: 'app-comic-profile',
  standalone: false,
  templateUrl: './comic-profile.page.html',
  styleUrls: ['./comic-profile.page.scss'],
})
export class ComicProfilePage implements OnInit {

  comic:Comic|undefined

  constructor(
    private comicSVC: ComicService,
    private router: Router,
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }

}
