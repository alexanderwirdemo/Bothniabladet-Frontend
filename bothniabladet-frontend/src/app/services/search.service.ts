import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {


  private searchResultBig = new BehaviorSubject<any>({});
  private searchTerm = new BehaviorSubject<any>({});
  rawResultBig = this.searchResultBig.asObservable();
  enteredTerm = this.searchTerm.asObservable();


  public setSearchResultBig(value){
      this.searchResultBig.next(value);
  }

  public setSearchTerm(value){
    this.searchTerm.next(value);
  }


  constructor() { }
}
