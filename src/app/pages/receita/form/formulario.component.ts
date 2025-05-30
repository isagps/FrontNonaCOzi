import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ChipsModule } from 'primeng/chips';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { RouterModule } from '@angular/router';
import {
  ReceitaResponse,
  ReceitaCriarRequest,
  ReceitaAtualizarRequest
} from 'app/shared/interface/receita.interface';

@Component({
  selector: 'app-formulario-receita',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    ChipsModule,
    CardModule,
    AutoCompleteModule,
    ButtonModule,
    RouterModule
  ],
  templateUrl: './formulario.component.html'
})
export class FormularioReceitaComponent implements OnInit {
  @Input() receita!: ReceitaCriarRequest | ReceitaAtualizarRequest | ReceitaResponse;

  @Output() cancelar = new EventEmitter<void>();
  @Output() salvar = new EventEmitter<void>();

  ingredientesBusca: string[] = [];

  tempos = [5, 10, 15, 20, 30, 45, 60];
  porcoes = [1, 2, 4, 6, 8];

  receitasFavoritas: ReceitaResponse[] = [];

  
  hoverSalvar: boolean = false;
  hoverCancelar: boolean = false;

  ngOnInit(): void {
    if ('id' in this.receita) {
      console.log('Editando receita ID:', this.receita.id);
    }
  }

  buscarPorIngredientes() {
    const ingredientes = this.ingredientesBusca
      .map(i => i.toLowerCase().trim())
      .filter(i => i);

    console.log('Buscando receitas com ingredientes:', ingredientes);
   
  }

  filtrarTempos(event: any) {
    this.tempos = [5, 10, 15, 20, 30, 45, 60].filter(t =>
      t.toString().includes(event.query)
    );
  }

  filtrarPorcoes(event: any) {
    this.porcoes = [1, 2, 4, 6, 8].filter(p =>
      p.toString().includes(event.query)
    );
  }
}
