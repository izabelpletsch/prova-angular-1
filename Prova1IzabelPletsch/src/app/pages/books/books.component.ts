import { Component, OnInit } from '@angular/core';
import { Livro } from '../../services/livro';
import { LivroService } from '../../services/livro.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent implements OnInit {
  livros: Livro[] = [];

  ngOnInit(): void {
    this.loadLivros();
  }

  constructor(
    private service: LivroService,
  ) {}

  loadLivros() {
    this.service.getLivros().subscribe({
      next: (data) => (this.livros = data),
    })
  }
}
