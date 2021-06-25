import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-update',
  templateUrl: './livro-update.component.html',
  styleUrls: ['./livro-update.component.css']
})
export class LivroUpdateComponent implements OnInit {

  id_cat: String = ''

  livro: Livro = {
    id: '',
    titulo: '',
    nome_autor: '',
    texto: ''
  }

  titulo = new FormControl("", [Validators.minLength(3)]);
  nome_autor = new FormControl("", [Validators.minLength(3)]);
  texto = new FormControl("", [Validators.minLength(10)]);

  constructor(
    private service: LivroService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!
    this.livro.id = this.route.snapshot.paramMap.get('id')!
    this.findById();
  }

  update(): void {
    this.service.update(this.livro).subscribe(resp => {
      this.router.navigate([`categorias/${this.id_cat}/livros`])
      this.service.mensagem("Livro atualizado com sucesso!")
    }, err => {
      this.router.navigate([`categorias/${this.id_cat}/livros`])
      this.service.mensagem("Falha ao atualizar livro! Tente novamente mais tarde")
    })
  }

  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`])
  }

  findById(): void {
    this.service.findById(this.livro.id!).subscribe(resp => {
      this.livro = resp;
    })
  }

  getMessageTitle() {
    if (this.titulo.invalid)
      return "O campo titulo deve conter entre 3 a 50 caracteres";
    
    return false
  }

  getMessageNome() {
    if (this.nome_autor.invalid) 
      return "O campo nome deve conter entre 3 a 50 caracteres";
      
    return false; 
  }

  getMessageTexto() {
    if (this.texto.invalid)
      return "O campo texto deve conter entre 10 a 2.000.000 de caracteres";
      
    return false;
  }

  getButtonDisabled() {
    if (this.getMessageTitle() || this.getMessageNome() || this.getMessageTexto()) return true
    return false
  }

}
