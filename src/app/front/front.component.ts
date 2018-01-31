import { Component, OnInit } from '@angular/core';
import {MediaService} from '../services/media.service';

@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.scss']
})
export class FrontComponent implements OnInit {

  constructor(private mediaService: MediaService) { }

  ngOnInit() {
    this.mediaService.getUserInfo();
  }

}
