import { Component } from '@angular/core';
import { Auth } from './auth/auth';
import { Header } from './header/header';

@Component({
  selector: 'app-root',
  imports: [Auth, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'ProjetoFinal';
}
