import { Component, HostListener, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { INews } from "./news";
import { NewsService } from "./news.service";
import * as signalR from "@microsoft/signalr";
import { SignalRService } from "../signalr.data.service";
import { runInThisContext } from "vm";

@Component({
    selector: 'app-news-edit',
    templateUrl: './news.edit.component.html',
    styleUrls: ['./news.edit.component.css']
})
export class NewsEditComponent implements OnInit {
    pageTitle = 'News Edit';
    errorMessage = '';
    n: INews | undefined;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private newsService: NewsService,
        private signalrService: SignalRService) {
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
        this.n = this.signalrService.data.filter(f => f.id === id)[0];
    }

    onBack(): void {
        this.router.navigate(['/news-list']);
    }

    onSave(): void {
        let temp = [...this.signalrService.data];
        let tempIndex = temp.findIndex(f=>f.id===this.n.id);
        temp[tempIndex]=this.n;
        //this.signalrService.data.filter(f => f.id === this.n.id)[0] = this.n;
        this.signalrService.data=temp;
        this.signalrService.dataUpdateExcuter(this.n, "U");
        
        this.router.navigate(['/news-list']);
    }

    private _title: string = '';
    get title(): string {
        return this.n.title;
    }
    set title(value: string) {
        this.n.title = value;
    }

    private _description: string = '';
    get description(): string {
        return this.n.description;
    }
    set description(value: string) {
        this.n.description = value;
    }

    private _content: string = '';
    get content(): string {
        return this.n.content;
    }
    set content(value: string) {
        this.n.content = value;
    }

    private _imageUrl: string = '';
    get imageUrl(): string {
        return this.n.imageUrl;
    }
    set imageUrl(value: string) {
        this.n.imageUrl = value;
    }

    private _published: boolean = false;
    get published(): boolean {
        return this.n.published;
    }
    set published(value: boolean) {
        this.n.published = value;
    }
}