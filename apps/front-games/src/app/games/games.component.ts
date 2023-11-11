import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../components/card/card.component';

@Component({
  selector: 'catholic-games-games',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent {}
