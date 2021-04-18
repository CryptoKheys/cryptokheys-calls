import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ActivatedRoute, Data, Router } from "@angular/router";
import { takeWhile } from "rxjs/operators";
import { BaseComponent } from "src/app/components/base/base.component";
import { ConfirmDialogComponent } from "src/app/components/confirm-dialog/confirm-dialog.component";
import { Call } from "../../model/call.model";
import { CallService } from "../../services/call.service";
import { CallModel } from "./call.model";

@Component({
    selector: "app-call",
    templateUrl: "./call.component.html",
    styleUrls: ["./call.component.scss"],
})
export class CallComponent extends BaseComponent implements OnInit {
    public pm: CallModel;

    constructor(
        private readonly _route: ActivatedRoute,
        private readonly _router: Router,
        private readonly _callService: CallService,
        private readonly _dialog: MatDialog
    ) {
        super();
    }

    public ngOnInit(): void {
        this._route.data.subscribe((data: Data) => {
            this.pm = data.pm;
        });
    }

    public percentage(call: Call): any {
        if (call) {
            let res = {
                value: 0,
                color: "#fff",
            };

            res.value = (call.currentPrice - call.callPrice) / call.callPrice;

            if (res.value > 0) {
                res.color = "bg-green-";
            } else {
                res.color = "bg-red-";
            }

            let tmp = Math.abs(res.value * 10);
            tmp = Math.floor(tmp);
            // TODO : Elle pue du cul cette coloration, va falloir reprendre le truc
            if (tmp > 500) {
                tmp = 500;
            }
            if (tmp < 100) {
                tmp = 100;
            }
            res.color += "400";
            res.value *= 100;
            return res;
        }
    }

    public deleteCall(call: Call): void {
        let dialogRef: MatDialogRef<ConfirmDialogComponent> = this._dialog.open(
            ConfirmDialogComponent
        );
        dialogRef
            .afterClosed()
            .pipe(takeWhile(() => dialogRef !== null))
            .subscribe(() => {
                dialogRef = null;
            });

        dialogRef.componentInstance.onConfirm
            .pipe(takeWhile(() => dialogRef !== null))
            .subscribe(() => {
                this._callService.deleteCallfromDB(call.id).subscribe(() => {
                    this._callService.getCalls().subscribe((calls: Call[]) => {
                        this.pm.calls = calls;
                    });
                });
            });
    }

    public createCall(): void {
        this._router.navigate(["add"], { relativeTo: this._route });
    }
}
