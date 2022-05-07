import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchResult = new BehaviorSubject<any>({});
  private searchTerm = new BehaviorSubject<any>({});
  rawResult = this.searchResult.asObservable();
  enteredTerm = this.searchTerm.asObservable();


  public setSearchResult(value){
      this.searchResult.next(value);
  }

  public setSearchTerm(value){
    this.searchResult.next(value);
  }


  constructor() { }
}
