import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Injectable} from '@angular/core';
import {Headers , Response} from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import { HttpService } from './../serv/http-service';

@Injectable()
export class partnershipservice {    
constructor(private _http5: HttpService ) {}
fun_insert_value(name,email,company_name,des) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http5.post('https://jsonplaceholder.typicode.com/posts',
      {
        // 'id':var_useryid,
      }).map((res: Response) => console.log(res)) 
  }
}