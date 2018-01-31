import {Injectable} from '@angular/core';
import {
  HttpClient, HttpErrorResponse, HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable()
export class MediaService {

  username: string;
  password: string;
  status: string;

  apiUrl = 'http://media.mw.metropolia.fi/wbma';

  constructor(private http: HttpClient, private router: Router) {
  }

  public login() {
    console.log('uname: ' + this.username);
    console.log('pwd: ' + this.password);

    const body = {
      username: this.username,
      password: this.password,
    };

    const settings = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };

    this.http.post(this.apiUrl + '/login', body, settings).
        subscribe(response => {
          console.log(response['token']);
          localStorage.setItem('token', response['token']);
          this.router.navigate(['front']);
        }, (error: HttpErrorResponse) => {
          this.status = error.statusText;
        });
  }

  getUserInfo() {
    const settings = {
      headers: new HttpHeaders().set('x-access-token',
          localStorage.getItem('token')),
    };
    this.http.get(this.apiUrl + '/users/user', settings).
        subscribe(response => {
          console.log(response);
          localStorage.setItem('user', JSON.stringify(response));
          this.router.navigate(['front']);
        }, (error: HttpErrorResponse) => {
          this.status = error.statusText;
          this.router.navigate(['login']);
        });
  }

}
