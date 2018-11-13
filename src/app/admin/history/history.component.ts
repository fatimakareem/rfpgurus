import { Component, OnInit, OnDestroy } from '@angular/core';
import { MainService } from '../../serv/main.service'
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from "angular4-social-login";
declare const $: any;
@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss'],
    providers: [AuthService, MainService]
})
export class HistoryComponent implements OnInit, OnDestroy {
    record = {};
    endRequest;
    nofound: boolean = false;
    pkgList = {};
    result: boolean = false;
    today: number = Date.now();
    pkg_detail = {};
    pkgsub = false;
    public mask = [/\d/, /\d/, /\d/, /\d/];
    public mask1 = [/[a-zA-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
        /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
        /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
        /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
        /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
        /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
        /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
        /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
        /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/];
    cardnumber1;
    cardnumber2;
    cardnumber3;
    cardnumber4;
    cardholdername;
    expmonth;
    options: FormGroup;
    expyear;
    ccv;
    local;
    uname;
    plan;
    flipclass = 'credit-card-box';
    shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
    constructor(private authService: AuthService, private _nav: Router, private datePipe: DatePipe, private formBuilder: FormBuilder, private _serv: MainService) {

        if (localStorage.getItem('currentUser')) {
            this.local = localStorage.getItem('currentUser');
            let pars = JSON.parse(this.local);
            this.uname = pars.username
            console.log("zain", this.uname)
        }
        this.options = formBuilder.group({
            bottom: 0,
            fixed: false,
            top: 0
        });
    }
    mainFunction() {
        this.endRequest = this._serv.purchaseHistory().subscribe(
            data => {
                this.record = data;
                this.pkgList = data.pkg_fk;
                this.result = true;
                var enddate = this.record['end_date'].toString();
                var date = new Date();
                var currentDate = this.datePipe.transform(date, "yyyy-MM-dd").toString()

                console.log(this.datePipe.transform(date, "yyyy-MM-dd"), this.today, this.record['end_date'])
            },
            error => {
                // alert(error.status)
                if (error.status = 404) {
                    this.nofound = true;
                }
                console.log(error)
            })
    }
    next_stepdetail(event: any) {
        //     console.log(""+event.target.value)
        if (event.target.value == "BM") {
            this.prv_stepdetail("B", "M")

        } else if (event.target.value == "PY") {
            this.prv_stepdetail("P", "Y")
        }
    }
    prv_stepdetail(type, dur) {
        this.pkg_detail['type'] = type
        this.pkg_detail['dur'] = dur
        this.pkgsub = true;
    }
    proceed() {

        this.pkg_detail['credit'] = this.cardnumber1 + this.cardnumber2 +
            this.cardnumber3 + this.cardnumber4
        this.pkg_detail['ccv'] = this.ccv
        this.pkg_detail['expdate'] = this.expmonth + '/' + this.expyear
        this.endRequest = this._serv.packageUpdate(this.pkg_detail).subscribe(
            data => {
                swal(
                    'Your payment has been transferred',
                    '',
                    'success'
                )
                let url = 'find-bids';
                this._nav.navigate([url]);
            },
            error => {
                console.log(error);
                swal(
                    'Oops...',
                    'Something went wrong!',
                    'error'
                )
            });
    }
    ngOnInit() {
        this.mainFunction()
        $('#click_advance').click(function () {
            $("i", this).toggleClass("fa-arrow-left fa-arrow-right");
        });
    }
    logout() {
        this.authService.signOut();
        localStorage.clear();
        swal({
            type: 'success',
            title: 'Successfully Logged out',
            showConfirmButton: false,
            timer: 1500
        });
        this._nav.navigate(['/']);
    }
    ngOnDestroy() {
    }
}