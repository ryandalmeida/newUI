import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { LogoutComponent } from './logout.component';
import { AuthenticationGuard } from '../common/guards/authentication-guard';
import { Adal6Service, Adal6HTTPService } from 'adal-angular6';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoutComponent ],
      imports: [RouterModule],
      providers: [AuthenticationGuard, Adal6Service, {
        provide: Adal6HTTPService,
        useFactory: Adal6HTTPService.factory,
        deps: [Adal6Service]
      }]
      })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
