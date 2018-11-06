import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { HeaderService } from '../header/header.service';
import swal from 'sweetalert2';
import {SharedData} from '../shared-service';
import { AuthService, SocialUser } from "angular4-social-login";
@Component({
  selector: 'app-allnotification',
  templateUrl: './allnotification.component.html',
  styleUrls: ['./allnotification.component.scss']
})
export class AllnotificationComponent implements OnInit {

  constructor( private _nav: Router,public _shareData: SharedData,private _serv: HeaderService,) { }

  ngOnInit() {
    this.notification();
    this._shareData.notification.subscribe(message => this.notificate = message)

  }
  notificate;
  unread;
  total_notification;
  deletenofication(id){
    this._serv.deletenotify(id).subscribe(

      data => {
    
      this.notification();
      },
      error => {
        // console.log(error);
      });
  }
  updatenofication(id){
    this._serv.Updatenotify(id).subscribe(

      data => {
    
      this.notification();
      },
      error => {
        // console.log(error);
      });
  }
  single(query) {
    let sth = 'rfp/'+query;
    this._nav.navigate([sth]);
  }
  notification(){
    this._serv.notify().subscribe(

      data => {
        this.notificate = data['notifications'];
        this._shareData.notifyInfo(this.notificate );
this.unread=data.unread;
console.log(data.unreador);
      //  this.total_notification=data.total
      
      },
      error => {
        // console.log(error);
      });
  }
    deleteallnotification(){
    this._serv.deleteallnotify().subscribe(
     
      data => {
        this.notification()
      },
      error => {
        // console.log(error);
      });
  }
}
