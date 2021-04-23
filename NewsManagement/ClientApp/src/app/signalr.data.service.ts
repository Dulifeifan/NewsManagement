import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import * as signalR from "@microsoft/signalr";
import { throwError } from "rxjs";
import { INews } from "./news/news";
@Injectable({
    providedIn: 'root'
})
export class SignalRService {
    private _baseUrl;
    public data: INews[];
    public connected: boolean;
    private connection: signalR.HubConnection;

    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this._baseUrl = baseUrl;
        this.connected = false;

    }
    public buildConncetion= ()=> {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl("/newsHub")
            .build();
            
        this.connection.start().then(() => {
            this.connected = true;
            this.getInitData();
        }).catch(err=>console.log(err));
        
    }

    public dataUpdateListener(): void {
        this.connection.on("dataUpdated", (data) => {
            this.data = data;
            console.log(this.data);
        });
    }

    public dataUpdateExcuter(n: INews, method: string): void {
        this.connection.invoke("UpdateData", n.id, n.title, n.description, n.content, n.imageUrl, n.published, method)
            .catch(err => console.log(err));

    }

    public dataUpdateExcuterWithNull(): void {
        this.connection.invoke("UpdateDataWithNull")
            .catch(err => console.log(err));
    }
    public getInitData = () => {
        this.http.get("/news").subscribe((res) => {
          console.log("Initial request", res);
        });
      };
}