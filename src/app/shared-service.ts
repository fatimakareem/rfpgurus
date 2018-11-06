import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class SharedData {
  currentProducts;
  categorySubject = new BehaviorSubject<any>('');
  stateSubject = new BehaviorSubject<any>('');
  agencySubject =new BehaviorSubject<any>('');
  searchSubject = new BehaviorSubject<any>('');
  watchSubject=new BehaviorSubject<any>('');
  watchtotalSubject=new BehaviorSubject<any>('');
  currentMessage = this.watchSubject.asObservable();
  notiSubject=new BehaviorSubject<any>('');
  currentMessagetotal = this.watchtotalSubject.asObservable();
  notification = this.notiSubject.asObservable();

  constructor() {
 
  }
  notifyInfo(message) {
    this.notiSubject.next(message)
  }
  watchtotal(message) {
    this.watchtotalSubject.next(message)
  }
  watchInfo(message) {
    this.watchSubject.next(message)
  }
  returnCategory(){
    return this.categorySubject;
  }
  
  categoryInfo(data){
    this.categorySubject.next(data);
  }

    returnCat(){
        return this.categorySubject;
    }

    catInfo(data){
        this.categorySubject.next(data);
    }
  //   returnwatch(){
  //     return this.watchSubject;
  // }

  // watchInfo(data){
  //     this.watchSubject.next(data);
  // }
  returnState(){
return this.stateSubject;
  }
  
  stateInfo(path){
  this.stateSubject.next(path)

  }

  returnSearch(){
    return this.searchSubject;
      }
  searchInfo(data){
      this.searchSubject.next(data)
    
  }

    agencyInfo(path){
        this.agencySubject.next(path)

    }
    returnagency(){
        return this.agencySubject;
    }

}