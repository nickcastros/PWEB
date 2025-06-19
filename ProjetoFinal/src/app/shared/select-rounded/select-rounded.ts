import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select-rounded',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './select-rounded.html',
  styleUrls: ['./select-rounded.scss'],
})
export class SelectRoundedComponent {
  @Input() label = '';
  @Input() options: { value: string | number, label: string }[] = [];
  @Input() control!: FormControl;
  @Input() id = '';
  @Input() icon = '';
}