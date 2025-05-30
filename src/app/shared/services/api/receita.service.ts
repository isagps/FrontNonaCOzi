import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Page } from 'app/shared/interface/page.interface';
import { ReceitaAtualizarRequest, ReceitaCriarRequest, ReceitaFiltroRequest, ReceitaResponse } from 'app/shared/interface/receita.interface';

@Injectable({ providedIn: 'root' })
export class ReceitaService {
  private readonly api = 'http://localhost:8080/receitas';

  constructor(private readonly http: HttpClient) { }

  listar(filtro: ReceitaFiltroRequest) {
    let params = new HttpParams()
      .set('page', filtro.page.toString())
      .set('size', filtro.size.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }
    if (filtro.ingrediente) {
      params = params.set('ingrediente', filtro.ingrediente);
    }
    if (filtro.tempoPreparoMinutos != null) {
      params = params.set('tempoPreparoMinutos', filtro.tempoPreparoMinutos.toString());
    }

    return this.http.get<Page<ReceitaResponse>>(this.api, { params });
  }

  buscarPorId(id: number) {
    return this.http.get<ReceitaResponse>(`${this.api}/${id}`);
  }

  criar(request: ReceitaCriarRequest) {
    return this.http.post<ReceitaResponse>(this.api, request);
  }

  atualizar(id: number, request: ReceitaAtualizarRequest) {
    return this.http.patch<ReceitaResponse>(`${this.api}/${id}`, request);
  }

  deletar(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}

export type { ReceitaResponse };

