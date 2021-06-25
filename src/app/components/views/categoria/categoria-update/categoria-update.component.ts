import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from './../categoria.service';
import { Categoria, CategoriaUpdate } from './../categoria.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categoria-update',
  templateUrl: './categoria-update.component.html',
  styleUrls: ['./categoria-update.component.css']
})
export class CategoriaUpdateComponent implements OnInit {

  categoria: Categoria = {
    id: '',
    nome: '',
    desc: ''
  }

  categoriaUp: CategoriaUpdate = {
    id: '',
    nome: '',
    descricao: ''
  }

  constructor(
    private service: CategoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.categoria.id = this.route.snapshot.paramMap.get('id')!
    this.categoriaUp.id = this.route.snapshot.paramMap.get('id')!
    this.findById();
    this.findDesc();
  }

  findById(): void {
    this.service.findByIdUp(this.categoriaUp.id!).subscribe(resp => {
      this.categoriaUp.nome = resp.nome;
    })
  }

  findDesc(): void {
    this.service.findById(this.categoria.id!).subscribe(resp => {
      const descricao = resp.desc
      this.categoriaUp.descricao = descricao
    })
  }

  update(): void {
    this.service.update(this.categoriaUp).subscribe(resp => {
      this.router.navigate(["categorias"])
      this.service.mensagem('Categoria atualizada com sucesso!');
    }, err => {
      for (let erro of err.error.errors) {
        this.service.mensagem(erro.message)
      }
    })
  }

}
