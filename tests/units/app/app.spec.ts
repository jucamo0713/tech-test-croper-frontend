import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { App } from '../../../src/app/app';
import { AuthFacade } from '../../../src/app/contexts/auth/application/facades/auth.facade';
import { APP_CONFIG, AppConfig } from '../../../src/app/core/config';
import { FlowbiteService } from '../../../src/app/core/utils';

const testAppConfig: AppConfig = {
  appName: 'Croper',
  apiBaseUrl: 'http://localhost:3000',
  defaultLocale: 'es-CO',
  logLevel: 'silent',
  nodeEnv: 'test',
  requestTimeoutMs: 5000,
  accessTokenAutoRefreshBeforeExpirationMs: 180000,
  accessTokenRequestRefreshBeforeExpirationMs: 300000,
};

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        { provide: APP_CONFIG, useValue: testAppConfig },
        { provide: FlowbiteService, useValue: { init: () => undefined } },
        {
          provide: AuthFacade,
          useValue: {
            authenticated$: of(false),
            logout: () => undefined,
          },
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the route outlet', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});
