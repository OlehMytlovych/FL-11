import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private db: AngularFireDatabase) { }

  getExactArticle(articleThis, articleId){
    let a = this.db.list('articles');
    a.snapshotChanges().subscribe(item => {
      item.forEach(element => {
        let y = element.payload.toJSON();
        if (y['articleId'] == articleId ) {
          articleThis.article = y;
        }
      })
    })
  }
}
