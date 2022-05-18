import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import * as _ from 'lodash';
import { SearchService } from 'src/app/services/search.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { BothniaImage } from '../imageview/imageview.component';
import { HttpClient } from '@angular/common/http';
import { __importDefault } from 'tslib';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from "../../services/user.service";



export interface DialogData {
  photographer: any;
  image_filepath: any;
  price: any;
  restrictions: any;
  remaining_publications: any;
  description: any;
  date_added: any;
  gps: any;
  city: any;
  country: any;
  place: any;
  region: any;
}

export interface Tile {
  _id: any;
  title: any;
  photographer: any;
}

@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.css']
})
export class SearchresultsComponent implements OnInit {


  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;

  //Till Dialog
  photographer: any;
  image_filepath: any;
  price: any;
  restrictions: any;
  remaining_publications: any;
  description: any;
  date_added: any;
  gps: any;
  city: any;
  country: any;
  place: any;
  region: any;
  tiles: Tile[];

  rawSearch: any;
  value;
  firstLayer: string;
  secondLayer: string;
  finalLayer: string;
  searchTerm: string;
  resultsAmount;
  public imagesData: Array<BothniaImage> = [];
  heightValue: string;
  widthValue: string;
  keywords: Array<string> = [];
  resultLength: any;

  loadedRole: any;


  simplesearch_data: FormGroup;

  searchString: string;
  combined: string;
  results: string;
  baseUrl: string;
  myfilename: string;
  uploadVariantForm: FormGroup;
  fileInputLabel: string;

  constructor(

    private _router: Router,
    private formBuilder: FormBuilder,
    private searchService: SearchService,
    private _api: ApiService,
    public dialog: MatDialog,
    private http: HttpClient,
    private cartService: CartService,
    private _user: UserService,
 
  ) { }

  ngOnInit(): void {

    this.uploadVariantForm = this.formBuilder.group({
      uploadedImage: ['']
    });

    //console.dir
    
    this.searchService.rawResultBig.subscribe((searchoutput) => {
      
      this.rawSearch = searchoutput;

    });

    this.searchService.enteredTerm.subscribe((termoutput) => {
      
      this.searchTerm = JSON.stringify(termoutput);

    });



    this.displayResults();

    console.dir(this.imagesData);

    
    
    this.simplesearch_data = this.formBuilder.group({
      simple_searchString: '',
    });

  }

  onFileSelect(event) {
    const file = event.target.files[0];
    this.myfilename = '';
    Array.from(event.target.files).forEach(async (file: File) => {
      console.log(file);
      this.myfilename += file.name;
    });

    const URL = window.URL || window.webkitURL;
    const Img = new Image();
    Img.src = URL.createObjectURL(file);

    Img.onload = (e: any) => {
      console.dir(e.path[0]);
  }

    console.log('file:');
    console.dir(file);
    this.fileInputLabel = file.name;
    console.log(this.fileInputLabel);
    this.uploadVariantForm.get('uploadedImage').setValue(file);
  }

  uploadVariant(image: any) {
    console.log(image);

    if (!this.uploadVariantForm.get('uploadedImage').value) {
      alert('Please fill valid details!');
      return false;
    }
  
  const formData = new FormData();
    formData.append('uploadedImage', this.uploadVariantForm.get('uploadedImage').value);
    console.dir(this.uploadVariantForm.get('uploadedImage').value);
    console.dir(formData);

    this.http
      .post<any>('http://localhost:3001/uploadfilevariant', formData).subscribe(async response => {
        console.log(response);
        //this.filepath = 'http://localhost:3001/'+response.uploadedFile.path;

  const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth()+1;
    const day = today.getDate();
    const title = response.uploadedFile.filename;
    const filepath = "http://localhost:3001/uploaded_images_variants/"+title;

    var variants: Array<String> = image.variants;
    variants.push(filepath);

    const data = {
      id: image._id,
      variants: variants
    }



    this._api.putTypeRequest('images/addvariant', data).subscribe((res: any) => {
      console.dir(res);
      if (res.success) {
      console.log(res)
      } else {
      console.log(res)
      alert('Bild tillagd!');
      }
      }, err => {
      console.log(err);
      });


        if (response.statusCode === 200) {
          this.uploadFileInput.nativeElement.value = "";
          this.fileInputLabel = undefined;
        }
      }, er => {
        console.log(er);
        alert(er.error.error);
      });

    //});  
  }

  changePicture(imageNumber:string, imageVariant:string){
    const imageId = 'image_'+imageNumber;
    console.log(imageId, imageVariant);
    (document.getElementById(imageId) as HTMLImageElement).src = imageVariant;
  }

  onFormSubmit() {
    console.log('simple search string:');
    console.dir(this.simplesearch_data.value);
    this.makeSearch();


  }

  getUserRole(): any {
    return this._user.getuserRole();
  }

  makeSearch(){

    this.baseUrl = "images/keywords/"
    this.searchString = (<HTMLInputElement>document.getElementById("simple_searchBar")).value;
    this.combined = this.baseUrl.concat(this.searchString.toString())

    this._api.getTypeRequest(this.combined).subscribe((res: any) => {
      {
        this.searchService.setSearchResultBig(res)
        this.ngOnInit();
        
      }}, err => {
      console.log(err);
      alert("Något gick fel")

      });
  }

  displayResults(){

    this.imagesData = [];

    for(var imageIndex=0; imageIndex<this.rawSearch.allImages.length; imageIndex++){
      let imageData = this.rawSearch.allImages[imageIndex];
      console.dir(imageData);
      /*let imageData = new ImageData(
        this.rawSearch.allImages[imageIndex]._id,
        "http://localhost:3001/uploaded_images/"+this.rawSearch.allImages[imageIndex].title,
        this.rawSearch.allImages[imageIndex].photographer
      ); */
      this.imagesData.push(imageData);
    }

    console.dir(this.imagesData)

    if(this.imagesData.length>0){

      this.resultLength = this.imagesData.length;

    } else {

      this.resultLength = "inga"

    }

  }

  addToCart(pictureData){
    this.cartService.addToCart(pictureData)
    // alert(pictureData.filepath)
    console.dir(pictureData);
  }

  imagedetail(image){
    this.searchService.setSearchTerm(image);
    this._router.navigate(['/imagedetail']);
  }

  openDialog(image: any): void {

    console.dir(image);
    this.image_filepath = image.variants[0];
    this.photographer = image.photographer;
    this.price = image.price;
    this.restrictions = image.restrictions;
    this.remaining_publications = image.remaining_publications;
    this.description = image.description;
    this.date_added = image.date;
    this.gps = image.Location.GPSCoordinates;
    this.city = image.Location.city;
    this.country = image.Location.country;
    this.place = image.Location.place;
    this.region = image.Location.region;

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '700px',
      height: '500px',

      data: { photographer: this.photographer, image_filepath: this.image_filepath , price: this.price, restrictions: this.restrictions, remaining_publications: this.remaining_publications, description: this.description, date: this.date_added, gps: this.gps, city: this.city, country: this.country, place: this.place, region: this.region},

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialogen stängdes')
    })
    };
  }

  



export class simplesearch_data {
  public simple_searchString: String;

  constructor(simple_searchString: String) {
    this.simple_searchString = simple_searchString;
  }
}

export class ImageData{
  public id: String;
  public filepath: String;
  public photographer: String;

  constructor(id: String, filepath: String, photographer: String){
    this.id = id;
    this.filepath = filepath;
    this.photographer = photographer;
  }
}

@Component({

  selector: 'app-dialog',
  templateUrl: '../dialog/dialog.component.html'
})

export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }
}
