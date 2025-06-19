import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chip',
  imports: [CommonModule],
  templateUrl: './chip.html',
  styleUrl: './chip.scss',
})
export class Chip {
  @Input() genre = 'Aventura';
}
