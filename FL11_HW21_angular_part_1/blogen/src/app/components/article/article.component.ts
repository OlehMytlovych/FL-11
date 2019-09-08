import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainPageService } from 'src/app/services/main-page.service';
import { NewsLine } from '../../models/NewsLine'

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  article:NewsLine[] = [];

  constructor(private route: ActivatedRoute, public mainPageService: MainPageService) {
    this.mainPageService.getArticles().subscribe(articles => {
      this.determineArticle(articles);
    });
   }

  ngOnInit() {
  }

  determineArticle(articles) { 
    this.route.paramMap.subscribe(params => {
      articles.forEach((p) => {
        if (p.articleId == params['params']['articleId']) {
          this.article = p;
        }
      });
    });
  }
}
