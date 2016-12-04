import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {RestService} from "../app.restservice";

@Injectable()
export class ArticleService extends RestService {
  constructor(private http: Http) {
    super(http, "articles");
  }
}
