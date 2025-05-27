import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceitasRoutingModule } from './receitas-routing.module';
import { ReceitasComponent } from './receitas.component';
import { ListaComponent } from './lista/lista.component';
import { FormularioComponent } from './formulario/formulario.component';


@NgModule({
  declarations: [
    ReceitasComponent,
    ListaComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    ReceitasRoutingModule
  ]
})
export class ReceitasModule { }
