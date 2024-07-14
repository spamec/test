import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { environmemt } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  getDocument(id: string): Observable<any> {
    console.log(id);
    return !!id ? this.http.get(`${environmemt.apiUrl}/documents/${id}`).pipe(
      catchError(error => {
        if (error?.status === 404) {
          return of(null)
        } else {
          throw Error(error);
        }
      })
    ) : of(null);
  }
}
