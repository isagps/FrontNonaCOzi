import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';

import { ReceitaService } from 'app/shared/services/api/receita.service';
import { ReceitaCriarRequest, ReceitaAtualizarRequest, ReceitaResponse, ReceitaFiltroRequest } from 'app/shared/interface/receita.interface';
import { AlertService } from 'app/shared/services/util/alert.service';

@Component({
  selector: 'app-receitas',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    DialogModule,
    FormsModule,
    InputTextModule,
    TableModule,
    ToastModule,
  ],
  templateUrl: './receitas.page.html',
})
export class ReceitasPage implements OnInit {
  receitas: ReceitaResponse[] = [];
  totalRegistros = 0;
  pagina = 0;
  tamanhoPagina = 10;
  carregando = false;

  dialogAberto = false;
  receitaEditando: ReceitaCriarRequest | ReceitaAtualizarRequest = { nome: '', descricao: '' };
  idEditando?: number;

  filterForm: FormGroup;

  constructor(
    private readonly receitaService: ReceitaService,
    private readonly alert: AlertService,
    private readonly fb: FormBuilder,
  ) {
    this.filterForm = this.fb.group({
      nome: [''],
      ingrediente: [''],
      tempoPreparoMinutos: [null]
    });
  }

  ngOnInit() {
    this.carregarReceitas();
  }

  carregarReceitas() {
    this.carregando = true;

    const valores = this.filterForm.value;
    const filtro: ReceitaFiltroRequest = {
      page: this.pagina,
      size: this.tamanhoPagina,
      nome: valores.nome ?? undefined,
      ingrediente: valores.ingrediente ?? undefined,
      tempoPreparoMinutos: valores.tempoPreparoMinutos ?? undefined
    };

    this.receitaService.listar(filtro)
      .subscribe({
        next: ({ content, totalElements }) => {
          this.receitas = content;
          this.totalRegistros = totalElements;
        },
        complete: () => (this.carregando = false),
        error: () => {
          this.carregando = false;
          this.alert.showError('Não foi possível carregar as receitas.');
        }
      });
  }

  abrirDialogNova() {
    this.idEditando = undefined;
    this.receitaEditando = { nome: '', descricao: '' };
    this.dialogAberto = true;
  }

  editarReceita(r: ReceitaResponse) {
    this.idEditando = r.id;
    this.receitaEditando = { nome: r.nome, descricao: r.descricao };
    this.dialogAberto = true;
  }

  salvar() {
    const operacao$ = this.idEditando
      ? this.receitaService.atualizar(this.idEditando, this.receitaEditando as ReceitaAtualizarRequest)
      : this.receitaService.criar(this.receitaEditando as ReceitaCriarRequest);

    operacao$.subscribe({
      next: () => {
        this.dialogAberto = false;
        this.alert.showSuccess('Receita salva com sucesso');
        this.carregarReceitas();
      },
      error: () => {
        this.alert.showError('Erro ao salvar receita.');
      }
    });
  }

  excluirReceita(id: number) {
    this.alert.confirmDialog(
      'Deseja realmente excluir esta receita?',
      () => {
        this.receitaService.deletar(id).subscribe({
          next: () => {
            this.alert.showSuccess('Receita excluída com sucesso');
            this.carregarReceitas();
          },
          error: () => {
            this.alert.showError('Erro ao excluir receita.');
          }
        });
      }
    );
  }

  mudarPagina(event: TableLazyLoadEvent) {
    const first = event.first ?? 0;
    const rows = event.rows ?? this.tamanhoPagina;

    this.pagina = first / rows;
    this.tamanhoPagina = rows;
    this.carregarReceitas();
  }

  aplicarFiltro() {
    this.pagina = 0;
    this.carregarReceitas();
  }

  limparFiltro() {
    this.filterForm.reset({ nome: '', ingrediente: '', tempoPreparoMinutos: null });
    this.aplicarFiltro();
  }
}