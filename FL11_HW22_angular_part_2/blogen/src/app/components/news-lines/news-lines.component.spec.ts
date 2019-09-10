import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsLinesComponent } from './news-lines.component';

describe('NewsLinesComponent', () => {
  let component: NewsLinesComponent;
  let fixture: ComponentFixture<NewsLinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsLinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
