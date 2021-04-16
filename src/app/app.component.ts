import { Component, OnInit } from '@angular/core';
import {CallsService} from "./services/calls.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ckcalls';

  constructor(private callsService: CallsService) {
  }

  ngOnInit() {
    this.callsService.getCalls()
    this.callsService.getCoinsList()
  }

}
