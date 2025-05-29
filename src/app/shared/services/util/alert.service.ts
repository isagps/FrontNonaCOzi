import { Injectable } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class AlertService {
  constructor(private readonly toast: MessageService, private readonly confirm: ConfirmationService) {}

  showSuccess(detail: string, summary: string = 'Sucesso') {
    this.toast.add({ severity: 'success', summary, detail });
  }

  showError(detail: string, summary: string = 'Erro') {
    this.toast.add({ severity: 'error', summary, detail });
  }

  showInfo(detail: string, summary: string = 'Info') {
    this.toast.add({ severity: 'info', summary, detail });
  }

  showWarn(detail: string, summary: string = 'Aviso') {
    this.toast.add({ severity: 'warn', summary, detail });
  }

  confirmDialog(message: string, accept: () => void, reject?: () => void) {
    this.confirm.confirm({
      message,
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept,
      reject,
    });
  }
}