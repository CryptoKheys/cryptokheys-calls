import {Component, Inject, Input, OnInit} from '@angular/core';
import {CallDTO} from '../models/call';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
    selector: 'app-call-card',
    templateUrl: './call-card.component.html',
    styleUrls: ['./call-card.component.scss'],
})
export class CallCardComponent implements OnInit {
    @Input() call?: CallDTO | undefined;
    collapsed: boolean;

    constructor(@Inject(MAT_DIALOG_DATA) public data: CallDTO) {
        this.collapsed = true;
    }

    ngOnInit(): void {
        if (!this.call && this.data) {
            this.call = this.data
            this.collapsed = false;
        }
    }

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
