import { Component, HostListener, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { INews } from "./news";
import { NewsService } from "./news.service";
import * as signalR from "@microsoft/signalr";
import { SignalRService } from "../signalr.data.service";
import { runInThisContext } from "vm";
import { InMemoryWebStorage } from "oidc-client";

@Component({
    selector: 'app-news-add',
    templateUrl: './news.edit.component.html',
    styleUrls: ['./news.edit.component.css']
})
export class NewsAddComponent implements OnInit {
    pageTitle = 'Create News';
    errorMessage = '';
    n: INews | undefined;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private signalrService: SignalRService) {
    }
    ngOnInit(): void {
        // const param = this.route.snapshot.paramMap.get('id');
        // if (param) {
        //     const id = +param;
        //     this.getOneNews(id);
        // }
        if (!this.signalrService.connected) {
            this.signalrService.buildConncetion();
        }
        this.signalrService.dataUpdateListener();
        this.n = {
            id:0,
            title:"",
            description:"",
            imageUrl:"",
            content:"",
            published:false
        };
    }
    @HostListener("window:beforeunload")
    // getOneNews(id: number): void {
    //     // this.newsService.getOneNews(id).subscribe({
    //     //     next: n => this.n = n,
    //     //     error: err => this.errorMessage = err
    //     // });
    //     this.n = this.signalrService.data.filter(f => f.id === id)[0];
    // }

    onBack(): void {
        this.router.navigate(['/news-list']);
    }

    onSave(): void {
        // let temp = [...this.signalrService.data];
        // let tempIndex = temp.findIndex(f=>f.id===this.n.id);
        // temp[tempIndex]=this.n;
        
        // this.signalrService.data=temp;
        this.n.id=0;
        this.signalrService.dataUpdateExcuter(this.n, "C");
        
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