import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-review-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './review-input.html',
  styleUrls: ['./review-input.scss'],
})
export class ReviewInputComponent {
  @Input() control!: FormControl;
  @Input() label = '';
  maxLength = 1000;
}
