import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';

interface Receita {
  id: number;
  nome: string;
  descricao: string;
  imagemUrl: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CardModule,
    ButtonModule,
    AutoCompleteModule,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  ingredientesBuscaArray: string[] = [];
  sugestoesIngredientes: string[] = [];

  
  ingredientesPopulares: string[] = [
    'Arroz', 'Feijão', 'Macarrão', 'Batata', 'Cebola', 'Alho', 'Tomate', 'Cenoura', 'Abobrinha', 'Berinjela',
    'Pimentão', 'Milho', 'Ervilha', 'Palmito', 'Champignon',
    'Frango (Peito)', 'Frango (Coxa/Sobrecoxa)', 'Carne Bovina (Patinho)', 'Carne Bovina (Acém)', 'Carne Suína (Lombo)', 'Linguiça', 'Bacon', 'Peixe (Tilápia)', 'Atum Enlatado', 'Sardinha Enlatada',
    'Ovo', 'Leite', 'Creme de Leite', 'Leite Condensado', 'Queijo Mussarela', 'Queijo Parmesão', 'Queijo Prato', 'Requeijão',
    'Farinha de Trigo', 'Farinha de Rosca', 'Farinha de Mandioca', 'Amido de Milho', 'Açúcar', 'Sal', 'Pimenta do Reino', 'Orégano', 'Salsinha', 'Cebolinha', 'Coentro', 'Louro',
    'Azeite de Oliva', 'Óleo de Soja', 'Vinagre', 'Limão', 'Laranja', 'Banana', 'Maçã', 'Morango', 'Manjericão',
    'Chocolate em Pó', 'Fermento em Pó'
  ].sort((a, b) => a.localeCompare(b));

  
  receitasFavoritas: Receita[] = [
    {
      id: 1,
      nome: 'Pão de Queijo da Vó',
      descricao: 'Crocante por fora e macio por dentro.',
      imagemUrl: 'assets/images/pao-de-queijo.jpg'
    },
    {
      id: 2,
      nome: 'Sopa de Legumes',
      descricao: 'Conforto em forma de comida.',
      imagemUrl: 'assets/images/sopa-de-legumes.jpg'
    },
    {
      id: 3,
      nome: 'Arroz de Forno Cremoso',
      descricao: 'Perfeito para reaproveitar sobras.',
      imagemUrl: 'assets/images/arroz-de-forno-cremoso.jpg'
    },
  ];

  constructor(private readonly router: Router) {}

  
  buscarReceitas(): void {
    if (this.ingredientesBuscaArray.length > 0) {
      const ingredientesQuery = this.ingredientesBuscaArray.join(',');
      this.router.navigate(['/receita'], {
        queryParams: { ingredientes: ingredientesQuery },
      });
    } else {
      this.router.navigate(['/receita']);
    }
  }

  
  sugerirIngredientes(event: { query: string }): void {
    const query = event.query.toLowerCase().trim();
    this.sugestoesIngredientes = this.ingredientesPopulares
      .filter(ingrediente =>
        ingrediente.toLowerCase().includes(query) &&
        !this.ingredientesBuscaArray.some(sel => sel.toLowerCase() === ingrediente.toLowerCase())
      )
      .slice(0, 10);
  }
}