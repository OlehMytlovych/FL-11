import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NewsLinesComponent } from './components/news-lines/news-lines.component';
import { FormsModule } from '@angular/forms'
import { SearchPipe } from './components/header/search.pipe';
import { CreatePageComponent } from './components/create-page/create-page.component';
import { ArticleComponent } from './components/article/article.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainPageComponent,
    NewsLinesComponent,
    SearchPipe,
    CreatePageComponent,
    ArticleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
