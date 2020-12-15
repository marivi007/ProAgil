import { Component, OnInit, TemplateRef } from '@angular/core';
import { EventoService } from '../_services/evento.service';
import { Evento } from '../_models/Evento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { defineLocale, BsLocaleService, ptBrLocale } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr'; 

defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  titulo = 'Eventos';

  eventosFiltrados: Evento[];

  eventos: Evento[];


  evento: Evento;
  modoSalvar = 'post';
  imagemLargura=50;
  imagemMargem=2;
  mostrarImagem=false;
 
  registerForm:FormGroup;
  bodyDeletarEvento='';
  
  _filtroLista : string = '';

  constructor(private eventoService : EventoService
              ,private modalService: BsModalService
              ,private fb: FormBuilder
              ,private localeService : BsLocaleService
              ,private toastr : ToastrService

  ) { 
    this.localeService.use('pt-br');
  }

  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;    
  }

  
  editarEvento(evento:Evento,template:any){
    this.modoSalvar = 'put';
    this.openModal(template)
    this.evento = evento;
    this.registerForm.patchValue(evento);

  }

 

  novoEvento(template: any){
    this.modoSalvar = 'post';
    this.openModal(template)
  }

 
  openModal(template: any){
    this.registerForm.reset();
    template.show(template)
  }

  ngOnInit() {
    this.validation();
    this.getEventos();
    
  }

  filtrarEventos(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }
  alternarImagem(){
    this.mostrarImagem = !this.mostrarImagem;
  }

  validation(){
    this.registerForm =this.fb.group({
      tema:['',[Validators.required,Validators.minLength(4),Validators.maxLength(50)]],
      local:['',[Validators.required]],
      dataEvento:['',[Validators.required]],
      qtdPessoas:['',[Validators.required,Validators.max(12000)]],
      telefone:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      imagemURL:['',[Validators.required]],


    })
  }

  salvarAlteracao(template:any){
    if(this.registerForm.valid){
      if(this.modoSalvar === 'post'){
        this.evento = Object.assign({},this.registerForm.value);
        this.eventoService.postEvento(this.evento).subscribe(
          (novoEvento:Evento)=>{
            console.log(novoEvento);
            template.hide();
            this.getEventos();
            this.toastr.success('Inserido com Sucesso!');
          },error=>{
            this.toastr.error('Error ao Inserir!');
            console.log(error)
          }
        );
      }else{
        this.evento = Object.assign({id: this.evento.id},this.registerForm.value);//concatenação de objeto
        this.eventoService.putEvento(this.evento).subscribe(
          (novoEvento:Evento)=>{
            console.log(novoEvento);
            template.hide();
            this.getEventos();
            this.toastr.success('Editado com Sucesso!');
          },error=>{
            this.toastr.error('Error ao Editar!');
            console.log(error)
          }
        );
      }
      
    }
  }

  getEventos() {
    this.eventoService.getAllEvento().subscribe(
      (_eventos : Evento[]) => {
         this.eventos = _eventos; 
         this.eventosFiltrados = this.eventos;
        },
      error => { 
        this.toastr.error('Erro ao tentyar carregar Eventos!');
        console.log(error);
       }
     
    );
  }

  excluirEvento(evento: Evento, template: any) {
  
    this.openModal(template);
    this.evento = evento;
    this.bodyDeletarEvento = `Tem certeza que deseja excluir o Evento: ${evento.tema}, Código: ${evento.tema}`;
  }
  
  confirmeDelete(template: any) {
    this.eventoService.deleteEvento(this.evento.id).subscribe(
      () => {
          template.hide();
          this.getEventos();
          this.toastr.success("Deletado com sucesso!");
        }, error => {
          this.toastr.error('Erro ao tentar Deletar!');
          console.log(error);

        }
    );
  }
}