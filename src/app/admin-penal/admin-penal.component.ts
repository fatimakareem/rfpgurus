import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { SharedData } from './../shared-service';
import { PagerService } from './../rfps/rfp/paginator.service';
import { AllRfpsService } from '../all/all-rfps/all-rfps.service';
declare const $: any;
import {  Compiler } from '@angular/core';
import * as moment from 'moment';
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";

@Component({
  selector: 'app-admin-penal',
  templateUrl: './admin-penal.component.html',
  providers: [PagerService, AllRfpsService, SharedData]

})
export class AdminPanelComponent implements OnInit {
    item;
    state;
    record: any = [];
    currentUser;
    length = 0;
    constructor(private _compiler: Compiler,private pagerService: PagerService, public _shareData: SharedData, private _nav: Router, private _serv: AllRfpsService, private route: ActivatedRoute,private http: HttpClient) {  }
   formats = [
        moment.ISO_8601,
        "YYYY/MM/DD"
    ];
    // MatPaginator Inputs
    // length
    pageSize = "10";
    matpageSizeOptions = [10, 20, 35, 50];
    pager: any = {};
    end;
    status;
    local;
    uname;
    url: any = 'JPG, GIF, PNG';

    subscribe;date;
    // MatPaginator Output
    // pageEvent: PageEvent;
    // endRequest;
    // setPageSizeOptions(setPageSizeOptionsInput: string) {
    //     this.matpageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);

    // }
    check(date){
       
           this.date= moment(date, this.formats, true).isValid()
            
           return this.date;
          
        
    }
    page(pageSize) {
        if (pageSize) {
            console.log(pageSize);
            this.pageSize = pageSize;
            this.setPage(1);
        }
        else {
            console.log()
            delete this.pageSize;
            console.log(this.pageSize)
        }
    }
    enter:any=[];
    setPage(page: number) {
        this._serv.latestrfpecord(this.pageSize, page).subscribe(
            data => {

                this.record = data.results;
                // for(var i of data.results){
                //     this.date= moment(i.date_entered, this.formats, true).isValid()
                //     if(this.date==true){
                //         // this.enter= i.date_entered
                //     }
                //     console.log(this.date)
                //     if(this.date==false){
                //         this.enter='';
                //     }
                    
                //     console.log(this.enter)
                //    return this.enter;
                   
                // }
                this.item = data.totalItems;
                // this.length = this.item;
                console.log(this.record, 'jjjjjjjjjjjjjjj');
                console.log(data.totalItems);
                this.pager = this.pagerService.getPager(this.item, page,this.pageSize);
                console.log(this.pager)
            },
            error => {
                this.record.splice(0, this.record.length);
                //   console.log(error);
            });
            // this._compiler.clearCache()
    }
    download(info) {
        this._serv.downloadFile(info).subscribe(
            data => {
                if (data.status = "200") {
                    swal(
                        'File Downloaded Successfully!',
                        '',
                        'success'
                    )
                }
            },
            error => {
            });
    }
    ngOnInit() {
        this.setPage(1);
        this.check_login()
        
    }
    single(query) {
        let sth = 'rfp/' + query;
        this._nav.navigate([sth]);
    }
    paginator(pageEvent) { }
    check_login() {
        if (localStorage.getItem('currentUser')) {
            this.local = localStorage.getItem('currentUser');
            let pars = JSON.parse(this.local);
            this.uname = pars.username
            this._serv.usersubscribe(this.uname).subscribe(
                data => {
                    if (data.Response == "Subscribe user") {
                        this.subscribe = data.Response
                        return false
                    }
                },
                error => {
                    // console.log(error);
                });
        }
        else {
            return true
        }
    }
    onChange(event: EventTarget) {
        this.web_info = new FormData();
  const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
  const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
  this.web_info.append('fileToUpload', target.files[0]);
      }
    
    //   readUrl(event: any) {
    //     if (event.target.files && event.target.files[0]) {
    //       const reader = new FileReader();
    
    //       reader.onload = (e: any) => {
    //         this.url = e.target.result;
    //         console.log(this.url);
    //       };
        
    //       reader.readAsDataURL(event.target.files[0]);
    //     }
    //   }
      
    rfpkey='';
    rfp_number='';
    title='';
    descriptionTag='';
    states='';
    agency='';id;
    date_entered='';due_date='';web_info;rfp_reference='';
    btnEditClick(id,rfpkey,rfp_number,title,descriptionTag,state,agency,date_entered,due_date,web_info,rfp_reference){
this.rfpkey=rfpkey;
this.rfp_number=rfp_number;
this.title=title;
this.descriptionTag=descriptionTag;
this.state=state;
this.agency=agency;
this.date_entered=date_entered;
this.due_date=due_date;
this.web_info=web_info;
this.rfp_reference=rfp_reference;
this.id=id;
    }
    
    editClick(updatedtitle,updatedrfp_number,uprfpkey,updateddescriptionTag,updatedstates,updatedagency,updateddate_entered,updateddue_date,updatedrfp_reference){
        if(this.web_info){
        this.http.post(
            'https://storage.rfpgurus.com/bplrfpgurus/',
          this.web_info, { responseType: 'text' }).subscribe(data => {
          
    
              
              console.log(data);
              alert(data);
              this.web_info = data;
            
            
            
          });}
        this._serv.update_rfp(this.id,updatedtitle,updatedrfp_number,uprfpkey,updateddescriptionTag,updatedstates,updatedagency,updateddate_entered,updateddue_date,this.web_info,updatedrfp_reference).subscribe(
            data => {
                
            });
    }
}

