import { Component, OnInit } from '@angular/core';
import { Livro } from '../../services/livro';
import { LivroService } from '../../services/livro.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent implements OnInit {
  livros: Livro[] = [];
  formLivro: FormGroup;
  submitted: boolean = false;

  ngOnInit(): void {
    this.loadLivros();
  }

  constructor(
    private service: LivroService,
    private formBuilder: FormBuilder,
  ) {
    this.formLivro = formBuilder.group({
      tituloLivro: ['', Validators.required],
      autorLivro: [''],
      editoraLivro: [''],
      precoLivro: ['']
    })
  }

  loadLivros() {
    this.service.getLivros().subscribe({
      next: (data) => (this.livros = data),
    })
  }

  delete(livro: Livro) {
    this.service.deleteLivros(livro).subscribe({
      next: () => this.loadLivros(),
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.formLivro.valid) {
      this.service.postLivros(this.formLivro.value).subscribe({
        next: (data) => {
          this.livros.push(data);
          this.submitted = false;
          this.formLivro.reset();
          this.loadLivros();
        },
      })
    }
  }

  get tituloLivro(): any {
    return this.formLivro.get("tituloLivro");
  }
}
