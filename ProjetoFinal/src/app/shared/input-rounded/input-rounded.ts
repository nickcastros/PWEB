import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-rounded',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './input-rounded.html',
  styleUrls: ['./input-rounded.scss'],
})
export class InputRoundedComponent {
  @Input() label = '';
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() control!: FormControl;
  @Input() id = '';
  @Input() icon = ''; // Exemplo: 'ph-user' ou 'ph-envelope'
}