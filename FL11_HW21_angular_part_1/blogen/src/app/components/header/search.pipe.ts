import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform{
  transform(articles, inputValue) {
    if (articles) {
      inputValue = inputValue ? inputValue : ''
      return articles.filter(article => {
        return article.shortDescription.includes(inputValue);
    })
    }
  }
}