import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly darkClass = 'my-app-dark';
  private readonly storageKey = 'theme-dark-mode';

  constructor(@Inject(DOCUMENT) private readonly document: Document) {
    const isDark = this.getStoredPreference();
    if (isDark) {
      this.enableDarkMode();
    } else {
      this.disableDarkMode();
    }
  }

  /**
   * Alterna entre tema claro e escuro
   */
  toggle(): void {
    const htmlEl = this.document.documentElement;
    htmlEl.classList.toggle(this.darkClass);
    const nowDark = htmlEl.classList.contains(this.darkClass);
    this.storePreference(nowDark);
  }

  /**
   * Ativa o tema escuro
   */
  enableDarkMode(): void {
    this.document.documentElement.classList.add(this.darkClass);
    this.storePreference(true);
  }

  /**
   * Desativa o tema escuro (usa tema claro)
   */
  disableDarkMode(): void {
    this.document.documentElement.classList.remove(this.darkClass);
    this.storePreference(false);
  }

  /**
   * Verifica se o tema escuro está ativo
   */
  isDarkMode(): boolean {
    return this.document.documentElement.classList.contains(this.darkClass);
  }

  /**
   * Armazena preferência no localStorage
   */
  private storePreference(isDark: boolean): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(isDark));
    } catch (e) {
      console.warn('Não foi possível salvar preferência de tema:', e);
    }
  }

  /**
   * Lê preferência do localStorage
   */
  private getStoredPreference(): boolean {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : false;
    } catch (e) {
      console.warn('Erro ao ler preferência de tema:', e);
      return false;
    }
  }
}