import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Livro } from './livro';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  url = "http://localhost:3000/livros";

  constructor(private http: HttpClient) { }

  getLivros() : Observable<Livro[]> {
    return this.http.get<Livro[]>(this.url);
  }

  deleteLivros(livro:Livro): Observable<void> {
    return this.http.delete<void>(`${this.url}/${livro.id}`);
  }
}
