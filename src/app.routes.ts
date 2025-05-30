import { Routes } from '@angular/router';
import { HomeComponent } from 'app/pages/home/home.component';
import { ReceitasPage } from 'app/pages/receita/receitas.page';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: HomeComponent },
  { path: 'receita', component: ReceitasPage }
];
