import { Component} from '@angular/core';
import { FooterService } from './footer.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import swal from 'sweetalert2';


const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
    selector: 'app-footer-cmp',
    templateUrl: 'footer.component.html'
})

export class FooterComponent {
    test: Date = new Date();

    constructor(private _serv: FooterService) { }
    form;
    ngOnInit() {
        this.form = new FormGroup({
            email: new FormControl("", Validators.compose([
                Validators.required,
                Validators.pattern(EMAIL_REGEX)
            ]))
        });
    }

    onSubmit(email) {
        this._serv.subcribe(email).subscribe(
            data => {
                swal({
                    type: 'success',
                    title: 'Successfully subscribed!',
                    showConfirmButton: false,
                    timer: 1500
                });
            },
            error => {
                swal(
                    'Sorry',
                    'You already subscribed!',
                    'error'
                )
            })
    }
}
