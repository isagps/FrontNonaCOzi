import { MenuItem } from "primeng/api";

export const ITENS_MENU_SIDEBAR: MenuItem[] = [
    { label: 'Início', icon: 'pi pi-home', routerLink: [''] },
    { separator: true },
    { label: 'Receitas', icon: 'pi pi-book', routerLink: ['/receita'] },
];