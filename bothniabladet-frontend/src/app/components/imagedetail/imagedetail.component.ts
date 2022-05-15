import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchService } from 'src/app/services/search.service';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';


interface Categories {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-imagedetail',
  templateUrl: './imagedetail.component.html',
  styleUrls: ['./imagedetail.component.css']
})

export class ImagedetailComponent implements OnInit {
  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  
  searchTerm: any;

/*   categoriesOptions: Categories[] = [
    { value: 'Nyheter', viewValue: 'Nyheter' },
    { value: 'Sport', viewValue: 'Sport' },
    { value: 'Nöje', viewValue: 'Nöje' },
    { value: 'Kultur', viewValue: 'Kultur' },
    { value: 'Ekonomi', viewValue: 'Ekonomi' },
  ];
  
  selectedCategories = this.categoriesOptions[0].value; */

  imageUpdateForm = this.formBuilder.group({
    // category: '',
    // subcategory: '',
    // keywords: '',
    description: '',
    price: '', 
    // publication_dates: '', 
    // restrictions: '', 
    // reviewed: '', 
  });
  imageUpdate_fields: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private searchService: SearchService,
    private _apiService: ApiService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.searchService.enteredTerm.subscribe((termoutput) => {
      this.searchTerm = termoutput;
    });
    this.imageUpdate_fields = this.formBuilder.group({
    category: this.searchTerm.category,
    subcategory: this.searchTerm.subcategory,
    //keywords: this.searchTerm.keywords,
    description: this.searchTerm.description,
    price: this.searchTerm.price, 
    publication_dates: this.searchTerm.publication_dates, 
  });
  }

  goBack() {
    this._router.navigate(['/searchresults']);
  }
  onSubmit() {

    console.dir(this.imageUpdate_fields.value.price)

    var updateForm = this.imageUpdate_fields.value;
    
    console.dir(updateForm);
    console.dir(updateForm.price);

    const body = {
      _id: this.searchTerm._id,
      price: updateForm.price,
      description: updateForm.description,
    };
    this._apiService.putTypeRequest('images/reviewed/update/'+this.searchTerm._id, body).subscribe(response => {
      console.log(response);
      alert('Ändring godkänd');
    }, er => {
      console.log(er);
      alert(er.error.error);
  });

  }


}
export class imageUpdate_fields {
  public category: Array<string>;
  public subcategory: Array<string>; 
  // keywords: this.searchTerm.keywords,
  public price: number; 
  public description: string; 
  // public publication_dates: Array<string>; 

  constructor(category: Array<string>, price:number, description: string) {
    this.category = category;
    this.price = price;
    this.description=description;
  }

  /* constructor(category: string, subcategory: string, price: number, publication_dates: Array<string> ) {

    this.category = category;
    this.subcategory = subcategory; 
    this.price = price; 
    this.publication_dates = publication_dates; 

  } */
}
