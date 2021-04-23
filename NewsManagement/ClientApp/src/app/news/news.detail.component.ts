import { Component, HostListener, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { INews } from "./news";
import { NewsService } from "./news.service";
import * as signalR from "@microsoft/signalr";
import { SignalRService } from "../signalr.data.service";

@Component({
    selector: 'app-news-detail',
    templateUrl: './news.detail.component.html'
})
export class NewsDetailComponent implements OnInit {
    pageTitle = 'News Detail';
    errorMessage = '';
    public _n: INews | undefined;
    constructor(private route: ActivatedRoute,
        private router: Router,
        private newsService: NewsService,
        private signalrService:SignalRService) {
    }
    ngOnInit(): void {
        const param = this.route.snapshot.paramMap.get('id');
        if (param) {
            const id = +param;
            this.getOneNews(id);
        }
        if (!this.signalrService.connected) {
            this.signalrService.buildConncetion();
        }
        this.signalrService.dataUpdateListener();
    }
    @HostListener("window:beforeunload")
    getOneNews(id: number): void {
        // this.newsService.getOneNews(id).subscribe({
        //     next: n => this.n = n,
        //     error: err => this.errorMessage = err
        // });
        this._n = this.signalrService.data.filter(f => f.id === id)[0];
    }
    get n(): INews {
        return this.signalrService.data.filter(f => f.id === this._n.id)[0];
      }

    onBack(): void {
        this.router.navigate(['/news-list']);
    }

}