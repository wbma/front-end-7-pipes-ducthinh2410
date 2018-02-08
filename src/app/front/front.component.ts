import {Component, OnInit} from '@angular/core';
import {MediaService} from '../services/media.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.scss'],
})
export class FrontComponent implements OnInit {

  title = '';
  description = '';
  file: File;
  mediaFiles: any;

  constructor(private mediaService: MediaService, private router: Router) {
  }

  ngOnInit() {

    // Auth Guard
    if (localStorage.getItem('token') !== null) {
      this.mediaService.getUserData().subscribe(response => {
        console.log('Welcome ' + response['full_name']);
      }, (error: HttpErrorResponse) => {
        console.log(error);
        this.router.navigate(['login']);
      });
    } else {
      this.router.navigate(['login']);
    }

    // Query media files
    this.mediaService.getNewFiles().subscribe(res => {
      this.mediaFiles = res;
      console.log(this.mediaFiles);
  });
  }

  setFile(event) {
    this.file = event.target.files[0];
  }

  upload() {
    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('title', this.title);
    formData.append('description', this.description);

    this.mediaService.upload(formData).subscribe(data => {
      console.log(data);
    },(e:HttpErrorResponse) => {
      console.log(e);
    });
  }
}
