import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { catchError, tap ,map} from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import {INews} from "./news";

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private _baseUrl;
  constructor(private http: HttpClient,@Inject('BASE_URL') baseUrl: string) {
    this._baseUrl=baseUrl+ 'news';
  }
  getNews(): Observable<INews[]> {
    return this.http.get<INews[]>(this._baseUrl).pipe(
      tap(data => console.log('all', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
  getOneNews(id:number):Observable<INews|undefined>{
    return this.getNews().pipe(
      map((news:INews[])=>news.find(n=>n.id===id))
    );
  }
  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.error.message}`;

    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);

  }

  
}
