import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherSettingsComponent } from './weather-settings.component';

describe('WeatherSettingsComponent', () => {
  let component: WeatherSettingsComponent;
  let fixture: ComponentFixture<WeatherSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
