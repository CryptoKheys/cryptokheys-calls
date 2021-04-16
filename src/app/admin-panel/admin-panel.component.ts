import { Component, OnInit } from '@angular/core';
import { CallsService } from '../services/calls.service';
import { MatDialog } from '@angular/material/dialog';
import { AdminAddCallComponent } from '../admin-add-call/admin-add-call.component';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent implements OnInit {
  constructor(public callsService: CallsService, public dialog: MatDialog) {}

  ngOnInit(): void {
    if (this.callsService.callsList.length === 0) {
      this.getCalls();
    }
  }

  getCalls(): void {
    this.callsService.getCalls();
  }

  openDialog() {
    const dialogRef = this.dialog.open(AdminAddCallComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
