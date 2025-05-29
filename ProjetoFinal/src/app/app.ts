import { Component } from '@angular/core';
import { Auth } from './auth/auth';

@Component({
  selector: 'app-root',
  imports: [Auth],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'ProjetoFinal';
}
