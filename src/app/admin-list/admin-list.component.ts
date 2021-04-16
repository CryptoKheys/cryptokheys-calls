import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CallsService } from '../services/calls.service';
import { CallDTO } from '../models/call';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss'],
})
export class AdminListComponent implements OnInit, OnDestroy {
  @Input() call!: CallDTO;

  constructor(
    private callsService: CallsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}
  ngOnDestroy(): void {}

  deleteCall(index: string): void {
    this.callsService.deleteCallfromDB(index);
  }

  closeCall(): void {}

  readyToSave(): boolean {
    return !(this.call[1].closedDate && this.call[1].closedPrice);
  }

  openSnackBar(message: string, action: string): void {
    const snackRef = this._openSnackBar(message, action);
    snackRef.onAction().subscribe(() => {
      console.log(`Ah, c'est annulé`);
    });
    snackRef.afterDismissed().subscribe(() => {
      console.log('Dismiss automatique ?');
    });
  }

  private _openSnackBar(message: string, action: string): MatSnackBarRef<any> {
    return this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
  onSubmit(): void {}
}
