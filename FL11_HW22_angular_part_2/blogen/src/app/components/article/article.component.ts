import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { NewsLine } from '../../models/NewsLine';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  article:NewsLine;
  id:string;

  constructor(private route: ActivatedRoute, public articleService: ArticleService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let id = params['params']['articleId'];

      this.articleService.getExactArticle(this, id);
    });
  }
}
