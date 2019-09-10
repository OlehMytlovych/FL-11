import { Component, OnInit } from '@angular/core';
import { Source } from '../../models/Source';
import { NewsLine } from '../../models/NewsLine'
import { MainPageService } from '../../services/main-page.service'

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})

export class MainPageComponent implements OnInit {
  public sources:Source[];
  public articles:NewsLine[];

  public sourceArticles:NewsLine[];
  public filterValue:string;

  public setSourceArticles: Function;
  public changeFilterValue: Function;

  constructor(private mainPageService:MainPageService) { }

  ngOnInit() {
    this.setSourceArticles = this.localSetArticles.bind(this);
    this.changeFilterValue = this.localChangeFilterValue.bind(this);

    this.sources = this.mainPageService.getSources();
    this.articles = this.mainPageService.getArticles();
  }

  public localSetArticles (sourceId) {
    if (sourceId) {
      this.sourceArticles = this.articles.filter(article => {
        return article.sourceId === sourceId;
      })
    } else {
      this.sourceArticles = this.articles;
    }
    
  }

  public localChangeFilterValue(newFilterValue) {
    this.filterValue = newFilterValue
  }
}
