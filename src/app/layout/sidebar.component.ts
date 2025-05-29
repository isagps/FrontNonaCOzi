import { Component, OnInit, OnDestroy, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { StyleClassModule } from 'primeng/styleclass';
import { ITENS_MENU_SIDEBAR } from 'app/config/itens-menu.config';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, TooltipModule, StyleClassModule],
  template: `
    <div
      class="app-sidebar-container flex flex-column h-full surface-b border-right-1 surface-border"
      [class.efetivamente-recolhida]="recolhida"
      [class.efetivamente-expandida]="!recolhida"
      (mouseenter)="onMouseEnter()"
      (mouseleave)="onMouseLeave()"
    >
      <div
        class="sidebar-cabecalho p-3 flex align-items-center"
        [ngClass]="recolhida ? 'justify-content-center' : 'justify-content-between'"
      >
        <span *ngIf="!recolhida" class="font-bold text-lg ml-2 text-primary">NonaCozi</span>
        <p-button
          type="button"
          [icon]="recolhidaPersistente ? 'pi pi-align-right' : 'pi pi-align-left'"
          (click)="toggleSidebar()"
          styleClass="p-button-text p-button-secondary"
          [pTooltip]="recolhidaPersistente ? 'Expandir Menu' : 'Recolher Menu'"
          tooltipPosition="right"
          [attr.aria-label]="recolhidaPersistente ? 'Expandir menu' : 'Recolher menu'"
        ></p-button>
      </div>

      <div class="menu-itens flex-grow-1 overflow-y-auto p-2">
        <ul class="list-none p-0 m-0">
          <li
            *ngFor="let item of itensMenu; let i = index"
            [ngClass]="{ 'mt-2 pt-2 border-top-1 surface-border': item.separator && i !== 0, 'mb-1': !item.separator }"
          >
            <ng-container *ngIf="!item.separator">
              <a
                [routerLink]="item.routerLink"
                routerLinkActive="active-menu-link"
                [routerLinkActiveOptions]="item.routerLinkActiveOptions || { exact: true }"
                class="item-menu flex align-items-center p-3 border-round text-color no-underline transition-colors transition-duration-150"
                [ngClass]="{ 'justify-content-center': recolhida }"
                [pTooltip]="recolhida && item.label ? item.label : ''"
                tooltipPosition="right"
                [tooltipDisabled]="!recolhida || !item.label"
                (click)="onItemClick(item, $event)"
              >
                <i
                  [class]="item.icon || ''"
                  class="icone-item-menu text-xl"
                  [ngClass]="{ 'mr-0': recolhida, 'mr-3': !recolhida }"
                ></i>
                <span
                  class="rotulo-item-menu white-space-nowrap overflow-hidden text-overflow-ellipsis"
                  *ngIf="!recolhida"
                >{{ item.label }}</span>
              </a>
            </ng-container>
          </li>
        </ul>
      </div>

      <div class="sidebar-rodape mt-auto p-3 text-center border-top-1 surface-border" *ngIf="!recolhida">
        <small class="text-color-secondary">NonaCozi &copy; {{ anoAtual }}</small>
      </div>
    </div>
  `,
})
export class SidebarComponent implements OnInit, OnDestroy {
  recolhidaPersistente = false;
  expandidaPorHover = false;
  usuarioTocouBotaoToggle = false;
  usuarioEmTelaPequena = false;
  anoAtual = new Date().getFullYear();
  itensMenu: MenuItem[] = ITENS_MENU_SIDEBAR;

  private hoverTimeout: any;

  constructor(private readonly el: ElementRef) {}

  get recolhida(): boolean {
    return this.recolhidaPersistente && !this.expandidaPorHover;
  }

  ngOnInit(): void {
    this.atualizarComBaseNaLargura();
  }

  ngOnDestroy(): void {
    clearTimeout(this.hoverTimeout);
  }

  @HostListener('window:resize')
  onResize(): void {
    this.atualizarComBaseNaLargura();
  }

  private atualizarComBaseNaLargura(): void {
    const pequena = window.innerWidth < 1024;

    if (pequena && !this.usuarioEmTelaPequena && !this.recolhidaPersistente) {
      this.recolhidaPersistente = true;
    } else if (!pequena && this.recolhidaPersistente && !this.usuarioTocouBotaoToggle) {
      this.recolhidaPersistente = false;
    }

    this.usuarioEmTelaPequena = pequena;
    if (!this.recolhidaPersistente && this.expandidaPorHover) {
      this.expandidaPorHover = false;
    }
  }

  toggleSidebar(): void {
    this.recolhidaPersistente = !this.recolhidaPersistente;
    this.expandidaPorHover = false;
    this.usuarioTocouBotaoToggle = true;

    this.usuarioEmTelaPequena = window.innerWidth < 1024 && this.recolhidaPersistente;
  }

  onMouseEnter(): void {
    if (this.recolhidaPersistente) {
      clearTimeout(this.hoverTimeout);
      this.expandidaPorHover = true;
    }
  }

  onMouseLeave(): void {
    if (this.expandidaPorHover) {
      this.hoverTimeout = setTimeout(() => {
        this.expandidaPorHover = false;
      }, 200);
    }
  }

  onItemClick(item: MenuItem, event: Event): void {
    if (item.command) {
      item.command({ originalEvent: event, item });
    }
  }
}