import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../header/header.service';
import {SharedData} from '../shared-service';
import { Router} from '@angular/router';
import { RfpService } from '../rfps/single-rfp/rfp.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {
  wrfp;
  message;
  constructor(private _nav: Router,private _serv: HeaderService,public _shareData: SharedData,private _serv1: RfpService) { }

  ngOnInit() {
    this._shareData.currentMessage.subscribe(message => this.wrfp = message)
    this. watchlist();
    this.check_login();
  }
  watchlist(){
    this._serv.Watchlist().subscribe(
     
      data => {
        this.wrfp = data['result'];
        this.message=data.message
        console.log( this.wrfp);
      },
      error => {
        // console.log(error);
      });
  }
  // delallatchlist(){
  //   this._serv.deleteallWatchlist().subscribe(
     
  //     data => {
  //       this.watchlist()
  //     },
  //     error => {
  //       // console.log(error);
  //     });
  // }
  id;
  title;
  get(id,title){
    this.id=id;
    this.title=title
  }
  deletewatchlist(){
    this._serv.deleteWatchlist(this.id).subscribe(

      data => {
        this.watchlist();
      
      },
      error => {
        // console.log(error);
      });
  }
  All_deletewatchlist(){
    this._serv.AlldeleteWatchlist().subscribe(

      data => {
        this.watchlist();
      
      },
      error => {
        // console.log(error);
      });
  }
  singlerfp(query) {
    let sth = 'rfp/'+query;
    this._nav.navigate([sth]);
  }
  local;
  uname;
  subscribe;
  check_login() {
    if (localStorage.getItem('currentUser')) {
      this.local = localStorage.getItem('currentUser');
     let pars = JSON.parse(this.local) ;
     this.uname = pars.username
    this._serv1.usersubscribe(this.uname).subscribe(
        data =>{
        //   console.log(data.Response);
          if(data.Response == "Subscribe user"){
             this.subscribe = data.Response
            return false
          }
        },
        error =>{
        // console.log(error);
        });
     
    }
    else {
      return true
    }
  }

}
