import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, TooltipModule, ModalModule, BsDatepickerModule, TabsModule } from 'ngx-bootstrap';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule } from 'ngx-mask';
import { NgxCurrencyModule } from 'ngx-currency';
import { ToastrModule } from 'ngx-toastr';

import { EventoService } from './_services/evento.service';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { EventosComponent } from './eventos/eventos.component';
import {PalestrantesComponent} from './palestrantes/palestrantes.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ContatosComponent} from './contatos/contatos.component';


import { DateTimeFormatPipe } from './_helps/DateTimeFormatPipe.pipe';
import { TituloComponent } from './_shared/titulo/titulo.component';



@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      EventosComponent,
      PalestrantesComponent,
      ContatosComponent,
      DashboardComponent, 
      DateTimeFormatPipe, 
      TituloComponent, 
   ],
   imports: [
      BrowserModule,
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(),
      TooltipModule.forRoot(),
      ModalModule.forRoot(),
      TabsModule.forRoot(),
      NgxMaskModule.forRoot(),
      NgxCurrencyModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot({
         timeOut: 3000,
         preventDuplicates: true,
         progressBar: true
      }),
     
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      AppRoutingModule
   ],
   providers: [EventoService],
  bootstrap: [AppComponent]
  
})
export class AppModule { }