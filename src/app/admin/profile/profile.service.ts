import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpService } from '../../serv/http-service';
@Injectable()
export class ProfileService {
    currentUser;
    constructor(private _http5: HttpService, private _http1: Http) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    zipcode(zip) {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http1.get('https://apis.rfpgurus.com/zipcode/' + zip + '/',
            { headers: headers }).map((response: Response) => response.json());

    }
    loaded: boolean = false;
    get_profile(uid) {

        let headers = new Headers({ 'Authorization': 'JWT ' + this.currentUser.token });
        headers.append('Content-Type', 'application/json');
        return this._http5.get('https://apis.rfpgurus.com/user_information/' + uid + '/',
            { headers: headers }).map((response: Response) => response.json());

    }
    ProfileUpdate(obj, catlist, nulllist) {
        let userlist: any = [];
        let emplist;
        let jsonlist = {};
        if (catlist.length == 0) {
            emplist = null
            jsonlist = {
                "zipcode": obj.zipcode,
                "city": obj.city,
                "address": obj.address,
                "company": obj.companyname,
                "country": obj.country,
                "state": obj.state,
                "phone": obj.phone,
                "email": obj.email,
                "first_name": obj.firstname,
                "last_name": obj.lastname,
                "username": obj.username,
                "newsletter": obj.newsletter,
                "usercat": null,
            }
        }
        else {
            userlist == catlist;
            jsonlist = {
                "zipcode": obj.zipcode,
                "city": obj.city,
                "address": obj.address,
                "company": obj.companyname,
                "country": obj.country,
                "state": obj.state,
                "phone": obj.phone,
                "email": obj.email,
                "first_name": obj.firstname,
                "last_name": obj.lastname,
                "username": obj.username,
                "newsletter": obj.newsletter,
                "usercat": catlist,
            }
        }
        console.log(userlist)
        let headers = new Headers({ 'Authorization': 'JWT ' + this.currentUser.token });
        headers.append('Content-Type', 'application/json');
        return this._http5.put('https://apis.rfpgurus.com/profile_update/' + obj.username + '/',
            JSON.stringify(jsonlist),
            { headers: headers }).map((data: Response) => data.json());
    }
    email_exist(email) {
        return this._http1.post('https://apis.rfpgurus.com/email_exist/', {
            'email': email
        }).map((res: Response) => res.json())
    }
    username_exist(username) {
        return this._http1.post('https://apis.rfpgurus.com/user_name_exist/', {
            'username': username
        }).map((res: Response) => res.json())
    }
}