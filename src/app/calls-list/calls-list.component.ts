import { Component, OnInit } from '@angular/core';
import { CallsService } from '../services/calls.service';

@Component({
  selector: 'app-calls-list',
  templateUrl: './calls-list.component.html',
  styleUrls: ['./calls-list.component.scss'],
})
export class CallsListComponent implements OnInit {
  constructor(public callsService: CallsService) {}

  ngOnInit(): void {
    if (this.callsService.callsList.length === 0) {
      this.getCalls();
    }
  }

  getCalls(): void {
    this.callsService.getCalls();
  }
}
