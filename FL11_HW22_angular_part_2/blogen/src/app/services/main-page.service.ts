import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Source } from '../models/Source';
import { NewsLine } from '../models/NewsLine';
import { Observable } from 'rxjs';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class MainPageService {

  sources: Source[];
  articles: NewsLine[];

  constructor(private db: AngularFireDatabase) {

  }

  ngOnInit() {
    
  }

  getSources() {
    let sources:Source[] = [];
    let s = this.db.list('sources');
    s.snapshotChanges().subscribe(item => {
      item.forEach(element => {
        let y = element.payload.toJSON();
        sources.push(y as Source);
      })
    })
    return sources
  }
  
  getArticles() {
    let articles:NewsLine[] = [];
    let a = this.db.list('articles');
    a.snapshotChanges().subscribe(item => {
      item.forEach(element => {
        let y = element.payload.toJSON();
        articles.push(y as NewsLine);
      })
    })
    return articles
  }
}
