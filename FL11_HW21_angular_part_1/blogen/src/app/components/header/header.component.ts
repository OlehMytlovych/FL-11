import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() sources: any;
  @Input() articles: any;
  @Input() setSourceArticles: Function;
  @Input() changeFilterValue: Function;
  public heading:string;
  public currentArticles:any;
  searchStr = '';

  constructor() {
    this.heading = 'Source Name'
  }

  public showCurrent(event, source) {
    if (source) {
      this.heading = source.source;
      this.setSourceArticles(source.sourceId);
    } else {
      this.heading = 'All Sources';
      this.setSourceArticles();
    }
  }

  ngOnInit() {
    
  }

}
