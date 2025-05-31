import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ThemeService } from 'app/shared/services/util/theme.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, ButtonModule],
    template: `
   <header style="background-color:#D96C3E;" class="text-white p-3 flex align-items-center justify-content-between">

        <h1 class="text-lg font-bold m-0">🍳 NonaCozi</h1>
        <button 
            pButton
            type="button"
            [icon]="(themeService.isDarkMode()) ? 'pi pi-sun' : 'pi pi-moon'"
            [label]="(themeService.isDarkMode()) ? 'Modo Claro' : 'Modo Escuro'"
            class="p-button-sm p-button-text text-white"
            (click)="toggleTheme()"
        ></button>
    </header>
  `,
    styles: [`
    button.p-button-text.text-white:hover {
      background-color: rgba(255, 255, 255, 0.1) !important;
    }
  `]
})
export class HeaderComponent {
    constructor(public readonly themeService: ThemeService) { }

    toggleTheme(): void {
        this.themeService.toggle();
    }
}