import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthFacade } from './contexts/auth/application/facades/auth.facade';
import { FlowbiteService } from './core/utils';
import { AuthSessionService } from './shared/auth';
import { LanguageSelector } from './shared/components';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe, RouterLink, RouterOutlet, LanguageSelector],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private readonly flowbite = inject(FlowbiteService);
  private readonly session = inject(AuthSessionService);
  protected readonly auth = inject(AuthFacade);

  ngOnInit(): void {
    this.flowbite.init();
    this.session.startAutoRefresh();
  }
}
