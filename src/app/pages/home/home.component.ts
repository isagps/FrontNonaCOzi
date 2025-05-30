import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule, // ⬅️ Importe isso aqui
    CardModule,
    ButtonModule,
    InputTextModule
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  ingredientesBusca = '';

  receitasFavoritas = [
    {
      id: 1,
      nome: 'Pão de Queijo da Vó',
      descricao: 'Crocante por fora e macio por dentro.',
    },
    {
      id: 2,
      nome: 'Sopa de Legumes',
      descricao: 'Conforto em forma de comida.',
    },
    {
      id: 3,
      nome: 'Arroz de Forno Cremoso',
      descricao: 'Perfeito para reaproveitar sobras.',
    },
  ];

  constructor(private readonly router: Router) {} // <- opcional, mas corrige o warning do SonarLint

  buscarPorIngredientes() {
    const ingredientes = this.ingredientesBusca.trim();
    if (ingredientes) {
      this.router.navigate(['/receita'], {
        queryParams: { ingredientes },
      });
    }
  }
}
