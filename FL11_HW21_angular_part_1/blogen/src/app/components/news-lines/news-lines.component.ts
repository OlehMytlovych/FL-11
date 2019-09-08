import { Component, OnInit, Input } from '@angular/core';
import { NewsLine } from '../../models/NewsLine';
//import { NewsLinesService } from '../../services/news-lines.service';

@Component({
  selector: 'app-news-lines',
  templateUrl: './news-lines.component.html',
  styleUrls: ['./news-lines.component.scss']
})

export class NewsLinesComponent implements OnInit {
  @Input('articles') articles:NewsLine[];
  @Input('searchStr') searchStr:string;
  filteredArticles:NewsLine[];
  
  constructor() { }

  ngOnInit() {
  }

}
