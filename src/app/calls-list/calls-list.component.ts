import { Component, OnInit } from '@angular/core';
import { CallsService } from '../services/calls.service';
import {MatDialog} from "@angular/material/dialog";
import {CallCardComponent} from "../call-card/call-card.component";
import {CallDTO} from "../models/call";

@Component({
  selector: 'app-calls-list',
  templateUrl: './calls-list.component.html',
  styleUrls: ['./calls-list.component.scss'],
})
export class CallsListComponent implements OnInit {
  constructor(public callsService: CallsService, public dialog: MatDialog) {}

  ngOnInit(): void {
    if (this.callsService.callsList.length === 0) {
      this.callsService.getCalls();
    }
    if(this.callsService.coinsList.length === 0) {
      this.callsService.getCoinsList()
    }
  }

  openDialog(argCall: CallDTO): void {
    const dialogRef = this.dialog.open(CallCardComponent, {
      data: { ...argCall }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
