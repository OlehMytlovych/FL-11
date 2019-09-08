import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NewsLinesComponent } from './components/news-lines/news-lines.component'
import { CreatePageComponent } from './components/create-page/create-page.component'
import { ArticleComponent } from './components/article/article.component'

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'main-page', component: MainPageComponent },
  { path: 'create-page', component: CreatePageComponent},
  { path: 'article/:articleId', component: ArticleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
