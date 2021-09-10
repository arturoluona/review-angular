import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  public headers: HttpHeaders;
  public readonly url: string = environment.api;

  constructor(public http: HttpClient,
              private router: Router,
              private toastr: ToastrService) {
  }

  showToast = (text = '', title = '') => {
    try {
      this.toastr.info(text, title);
    } catch (e) {
      return 422;
    }
  }

  parseHeader = () => {
    const header = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    return new HttpHeaders(header);
  }

  post(path = '', body = {}, toast = true): Observable<any> {
    try {
      return this.http
        .post(`${this.url}/${path}`, body, {headers: this.parseHeader()})
        .pipe(
          catchError((e: any) => {
            if (toast) {
              this.showToast('Se ha notificado al Administrador', 'ERROR');
            }
            return throwError({
              status: e.status,
              statusText: e.statusText,
            });
          })
        );
    } catch (e) {
      return null;
    }
  }

  //
  patch(path = '', body = {}, toast = true): Observable<any> {
    try {
      return this.http
        .patch(`${this.url}/${path}`, body, {headers: this.parseHeader()})
        .pipe(
          catchError((e: any) => {
            if (toast) {
              this.showToast('Se ha notificado al Administrador', 'ERROR');
            }
            return throwError({
              status: e.status,
              statusText: e.statusText,
            });
          })
        );
    } catch (e) {
    }
  }

  delete(path = '', toast = true): Observable<any> {
    try {
      return this.http
        .delete(`${this.url}/${path}`, {headers: this.parseHeader()})
        .pipe(
          catchError((e: any) => {
            if (toast) {
              this.showToast('Se ha notificado al Administrador', 'ERROR');
            }
            return throwError({
              status: e.status,
              statusText: e.statusText,
            });
          })
        );
    } catch (e) {
    }
  }

  get(path = '', toast = true): Observable<any> {
    try {
      return this.http
        .get(`${this.url}/${path}`, {headers: this.parseHeader()})
        .pipe(
          catchError((e: any) => {
            if (toast) {
              this.showToast('Se ha notificado al Administrador', 'ERROR');
            }
            return throwError({
              status: e.status,
              statusText: e.statusText,
            });
          })
        );
    } catch (e) {
    }
  }
}
