import { Component } from '@angular/core';
import { CardComponent } from '../components/card/card.component';

@Component({
  selector: 'catholic-games-games',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent {}
