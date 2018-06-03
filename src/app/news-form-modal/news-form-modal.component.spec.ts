import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsFormModalComponent } from './news-form-modal.component';

describe('NewsFormModalComponent', () => {
  let component: NewsFormModalComponent;
  let fixture: ComponentFixture<NewsFormModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsFormModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
