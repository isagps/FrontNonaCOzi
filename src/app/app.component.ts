import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { Component } from "@angular/core";
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { SidebarComponent } from "./layout/sidebar.component";
import { HeaderComponent } from "./layout/header.component";
import { FooterComponent } from "./layout/footer.component";

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="flex flex-column min-h-screen">
      <app-header></app-header>

      <div class="flex flex-1">
        <app-sidebar></app-sidebar>

        <main class="flex-1 p-4 bg-surface-50">
          <router-outlet></router-outlet>
        </main>
      </div>

      <app-footer></app-footer>

      <p-toast></p-toast>
      <p-confirmDialog></p-confirmDialog>
    </div>
  `,
  imports: [ CommonModule, RouterOutlet, SidebarComponent, HeaderComponent, FooterComponent, ToastModule, ConfirmDialogModule ],
})
export class AppComponent {
  constructor() { }
}