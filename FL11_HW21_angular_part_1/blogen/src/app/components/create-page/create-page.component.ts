import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  heading: string;
  shortDescription: string;
  content: string;
  date: string;
  author: string;
  sourceURL: string;


  onSubmit() {
    let savedData = {
      heading: this.heading,
      shortDescription: this.shortDescription,
      content: this.content,
      date: this.date,
      author: this.author,
      sourceURL: this.sourceURL,
    }
    console.log(savedData);
  }
  constructor() { }

  ngOnInit() {
  }

}
