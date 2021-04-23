import { HttpClient } from '@angular/common/http';
import { Component, HostListener, Inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { INews } from './news';
import { NewsService } from './news.service';
import * as signalR from "@microsoft/signalr";
import { SignalRService } from '../signalr.data.service';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { runInThisContext } from 'vm';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html'

})
export class NewsComponent implements OnInit, OnDestroy {
  private _baseUrl;
  title = 'app';
  // news: INews[] = [];
  // filteredNews: INews[] = [];
  sub!: Subscription;
  errorMessage: string = '';
  pageTitle: string = 'News'
  public isAuthenticated: Observable<boolean>;

  constructor(private newsService: NewsService,
    @Inject('BASE_URL') baseUrl: string,
    public signalrService: SignalRService,
    private authorizeService: AuthorizeService) {
    this._baseUrl = baseUrl;
  }
  ngOnInit(): void {
    this.isAuthenticated = this.authorizeService.isAuthenticated();
    // this.sub = this.newsService.getNews().subscribe({
    //   next: news => {
    //     this.news = news;
    //     this.filteredNews = this.news;
    //   },
    //   error: err => this.errorMessage = err
    // });
    if (!this.signalrService.connected) {
      this.signalrService.buildConncetion();
    }
    this.signalrService.dataUpdateListener();
  }
  @HostListener("window:beforeunload")
  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }
  // public news:INews[] = this.signalrService.data;

  performFilter(filterBy: string): INews[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.news.filter((n: INews) =>
      n.title.toLocaleLowerCase().includes(filterBy)
    );
  }

  get news(): INews[] {
    return this.signalrService.data;
  }

  public _filteredNews: INews[];
  get filteredNews(): INews[] {
    if (this._listFilter == '') {
      return this.news;
    }
    else {
      let temp = this._listFilter.toLocaleLowerCase();
      return this.news.filter((n: INews) =>
        n.title.toLocaleLowerCase().includes(temp)
      );
    }
    //return this._filteredNews? this._filteredNews: this.news;
  }

  private _listFilter: string = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    console.log('In setter: ', value);
    this._filteredNews = this.performFilter(value);
  }

  onDelete(n: INews): void {
    this.signalrService.dataUpdateExcuter(n, "D");
  }
}
