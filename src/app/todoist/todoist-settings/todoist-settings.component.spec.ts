import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoistSettingsComponent } from './todoist-settings.component';

describe('TodoistSettingsComponent', () => {
  let component: TodoistSettingsComponent;
  let fixture: ComponentFixture<TodoistSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoistSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoistSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
