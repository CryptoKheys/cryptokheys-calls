import {Component, Inject, Input, OnInit} from '@angular/core';
import {CallDTO} from '../models/call';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
    selector: 'app-call-card',
    templateUrl: './call-card.component.html',
    styleUrls: ['./call-card.component.scss'],
})
export class CallCardComponent implements OnInit {
    @Input() call?: CallDTO;
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

    pourcentage(): any {
        if (this.call![2]) {
            let res = {
                value: 0,
                color: '#fff'
            }

            res.value = (this.call![2].current_price - this.call![1].callPrice) / this.call![1].callPrice

            if (res.value > 0) {
                res.color = 'bg-green-'
            } else {
                res.color = 'bg-red-'
            }

            let tmp = Math.abs(res.value*10)
            tmp = Math.floor(tmp)
            // TODO : Elle pue du cul cette coloration, va falloir reprendre le truc
            if (tmp > 500) {
                tmp = 500
            }
            if (tmp < 100) {
                tmp = 100
            }
            res.color += '400'
            res.value *= 100;
            return res
        }
    }
}
