import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { NewsLine } from '../models/NewsLine';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsLinesService {
  articlesUrl:string = '../../assets/mock.data/articles.json'
  constructor(private http:HttpClient) { }

  getArticles():Observable<NewsLine[]> {
    return this.http.get<NewsLine[]>(this.articlesUrl)
  }
}
