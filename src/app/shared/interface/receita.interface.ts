export interface ReceitaResponse {
  id: number;
  nome: string;
  descricao: string;
  modoPreparo: string;
  tempoPreparoMinutos: number;
  ingredientes: string[];
  porcoes: number;
}

export interface ReceitaCriarRequest {
  nome: string;
  descricao: string;
  modoPreparo: string;
  tempoPreparoMinutos: number;
  ingredientes: string[];
  porcoes: number;
}

export interface ReceitaAtualizarRequest extends Partial<ReceitaCriarRequest> {}

export interface ReceitaFiltroRequest {
  nome?: string;
  ingrediente?: string;
  tempoPreparoMinutos?: number;
  page: number;
  size: number;
}