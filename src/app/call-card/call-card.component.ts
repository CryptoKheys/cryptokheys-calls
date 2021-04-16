import { Component, Input, OnInit } from '@angular/core';
import { CallDTO } from '../models/call';

@Component({
  selector: 'app-call-card',
  templateUrl: './call-card.component.html',
  styleUrls: ['./call-card.component.scss'],
})
export class CallCardComponent implements OnInit {
  @Input() call: CallDTO | undefined;

  constructor() {}

  ngOnInit(): void {}

  mcapRefactor(): number {
    if (this.call) {
      let refinedMcap = this.call[2].market_cap;
      let counter = 0;
      const arrOG: string[] = ['k', 'm', 'T'];

      while (refinedMcap > 1) {
        refinedMcap /= 10;
        counter++;
      }

      return Math.floor(counter / 3);
    } else {
      return 0;
    }
  }
}
