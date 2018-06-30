import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoistComponent } from './todoist.component';

describe('TodoistComponent', () => {
  let component: TodoistComponent;
  let fixture: ComponentFixture<TodoistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
