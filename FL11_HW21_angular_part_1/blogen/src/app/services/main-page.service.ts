import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Source } from '../models/Source';
import { NewsLine } from '../models/NewsLine';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainPageService {
  sourcesUrl:string = '../../assets/mock.data/sources.json';
  articlesUrl:string = '../../assets/mock.data/articles.json';

  constructor(private http:HttpClient) { }

  getSources():Observable<Source[]> {
    return this.http.get<Source[]>(this.sourcesUrl)
  }

  getArticles():Observable<NewsLine[]> {
    return this.http.get<NewsLine[]>(this.articlesUrl)
  }
}
