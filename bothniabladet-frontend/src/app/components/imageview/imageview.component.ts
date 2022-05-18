import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation  } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { UserService } from 'src/app/services/user.service';
import * as _ from 'lodash';
import exifr from 'exifr';
//const EXIF = require('exif-js');


interface Subcategories {
  value: string;
  viewValue: string;
}

interface SubcategoriesGroup {
  disabled?: boolean;
  name: string;
  subCategory: Subcategories[];
}


@Component({
  selector: 'app-imageview',
  templateUrl: './imageview.component.html',
  styleUrls: ['./imageview.component.css'],

  encapsulation: ViewEncapsulation.None,
})
export class ImageviewComponent implements OnInit {


  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  fileUploadForm: FormGroup;
  image_data: FormGroup;
  location: FormGroup;
  technical_data: FormGroup;
  fileInputLabel: string;
  myfilename = 'Välj fil';
  filepath = '';
  userAdmin: any;

  categoriesOptions: string[] = ['Nyheter', 'Sport', 'Nöje', 'Ekonomi', 'Övrigt'];

  subCategoriesGroups: SubcategoriesGroup[] = [
    {
      name: 'Nyheter',
      subCategory: [
        { value: 'Utrikes', viewValue: 'Utrikes' },
        { value: 'Inrikes', viewValue: 'Inrikes' },
        { value: 'Lokalt', viewValue: 'Lokalt' },
        { value: 'Politik', viewValue: 'Politik' },
        { value: 'Övrigt', viewValue: 'Övrigt' },
      ],
    },
    {
      name: 'Sport',
      subCategory: [
        { value: 'Ishockey', viewValue: 'Ishockey' },
        { value: 'Motorsport', viewValue: 'Motorsport' },
        { value: 'Fotboll', viewValue: 'Fotboll' },
        { value: 'Övrigt', viewValue: 'Övrigt' },
      ],
    },
    {
      name: 'Nöje',
      subCategory: [
        { value: 'Musik', viewValue: 'Musik' },
        { value: 'TV', viewValue: 'TV' },
        { value: 'Teater', viewValue: 'Teater' },
        { value: 'Film', viewValue: 'Film' },
        { value: 'Uteliv', viewValue: 'Uteliv' },
        { value: 'Övrigt', viewValue: 'Övrigt' },
      ],
    },
    {
      name: 'Ekonomi',
      subCategory: [
        { value: 'Börs', viewValue: 'Börs' },
        { value: 'Finans', viewValue: 'Finans' },
        { value: 'Näringsliv', viewValue: 'Näringsliv' },
        { value: 'Övrigt', viewValue: 'Övrigt' },
      ],
    },
  ];

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private _api: ApiService,
    private _userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userAdmin = this._userService.getuserRole();
    this.fileUploadForm = this.formBuilder.group({
      uploadedImage: ['']
    });
    this.location = this.formBuilder.group({
      GPS: "0,0",
      place: 'Scandinavium',
      city: 'Göteborg',
      region: 'Västra Götaland',
      country: 'Sverige'
    });
    this.technical_data = this.formBuilder.group({
      format:'',
      version:'Original',
      height: 0,
      width: 0,
      image_size: 0,
      resolution: 0,
      camera: 'Leica'
    });
    const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth()+1;
      const day = today.getDate();
      const datestring = year + '-' + month + '-' + day;
    this.image_data = this.formBuilder.group({
      date: datestring,
      photographer:this._userService.currentUser[0].name,
      category:'',
      subcategory:'',
      description:'',
      keywords:'',
      restrictions:'None',
      publications: 5,
    })
  }

  onFileSelect(event) {

    
    
    const file = event.target.files[0];

    this.myfilename = '';
    Array.from(event.target.files).forEach(async (file: File) => {
      console.log(file);
      this.myfilename += file.name;
    });
     
 
    

    const fileExtension = file.name.replace(/^.*\./, '');
    console.log(fileExtension);
    this.technical_data.get('format').setValue(fileExtension);

    const size = file.size/1000000;
    console.log(size);
    this.technical_data.get('image_size').setValue(size);

    const URL = window.URL || window.webkitURL;
    const Img = new Image();
    Img.src = URL.createObjectURL(file);

    Img.onload = (e: any) => {
      console.dir(e.path[0]);
      const height = e.path[0].height;
      const width = e.path[0].width;
      const resolution = height*width;

      this.technical_data.get('height').setValue(height);
      this.technical_data.get('width').setValue(width);
      this.technical_data.get('resolution').setValue(resolution);

      console.log(height,width, resolution);
  }

    console.log('file:');
    console.dir(file);
    this.fileInputLabel = file.name;
    console.log(this.fileInputLabel);
    this.fileUploadForm.get('uploadedImage').setValue(file);
  }


  onFormSubmit() {
    console.log('image data form:');
    console.dir(this.image_data.value);
    console.log('location form:');
    console.dir(this.location.value);
    console.log('technical data form:');
    console.dir(this.technical_data.value);

    if (!this.fileUploadForm.get('uploadedImage').value) {
      alert('Please fill valid details!');
      return false;
    }
  

  const formData = new FormData();
    formData.append('uploadedImage', this.fileUploadForm.get('uploadedImage').value);
    console.dir(this.fileUploadForm.get('uploadedImage').value);

    




    this.http
      .post<any>('http://localhost:3001/uploadfile', formData).subscribe(async response => {
        console.log(response);
        this.filepath = 'http://localhost:3001/'+response.uploadedFile.path;

        // fancy async syntax
        // older promise syntax
      exifr.gps(this.filepath).then(gps => {
  //console.log(gps.latitude, gps.longitude)
  if(gps===undefined){
    gps={latitude:0, longitude:0}
  }
  this.location.get('GPS').setValue(gps.latitude +","+gps.longitude);
  // Add to database
  var locationForm = this.location.value;
  let location = new Location(locationForm.GPS, locationForm.place, locationForm.city, locationForm.region, locationForm.country);
  console.log('location:');
  console.dir(location);

  var technicalDataForm = this.technical_data.value;
  var technical_data = new Technical_data(technicalDataForm.format, technicalDataForm.height, technicalDataForm.width, technicalDataForm.image_size, technicalDataForm.resolution, technicalDataForm.camera);
  console.log('technical data');
  console.dir(technical_data);

  const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth()+1;
    const day = today.getDate();
    const title = response.uploadedFile.filename;
    const filepath = "http://localhost:3001/uploaded_images/"+title;
    const variants: Array<String> = [filepath];

  var imageDataForm = this.image_data.value;
  const keywords = imageDataForm.keywords.split(',');
  console.log(keywords);
  const price: number = 199;
  const reviewed: Boolean = false;
  const restrictions = imageDataForm.restrictions;
  const publications = imageDataForm.publications;
  const description = imageDataForm.description;
  const publication_dates: Array<Date> = [];

  var imageData = new BothniaImage(title, filepath, imageDataForm.date, imageDataForm.photographer, imageDataForm.category, imageDataForm.subcategory, location, technical_data, description, keywords, restrictions, publications, publication_dates, price, reviewed, variants);
  
  console.log('image data');
  console.dir(imageData);

    this._api.postTypeRequest('images/add', imageData).subscribe((res: any) => {
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
})

        if (response.statusCode === 200) {

          
          
          //let {latitude, longitude} = await exifr.gps(this.filepath);
          
       

        
          // Reset the file input
          this.uploadFileInput.nativeElement.value = "";
          this.fileInputLabel = undefined;
        }
      }, er => {
        console.log(er);
        alert(er.error.error);
      });

      
  }

  resetForm() {
    this.myfilename= '';
    this.fileUploadForm = this.formBuilder.group({
      uploadedImage: ['']
    });
    this.location = this.formBuilder.group({
      GPS: 0,
      place: '',
      city: '',
      region: '',
      country: ''
    });
    this.technical_data = this.formBuilder.group({
      format: '',
      version: '',
      height: 0,
      width: 0,
      image_size: 0,
      resolution: 0,
      camera: ''
    });
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const datestring = year + '-' + month + '-' + day;
    this.image_data = this.formBuilder.group({
      date: datestring,
      photographer: '',
      category: '',
      subcategory: '',
      keywords: '',
      restrictions: ''
    })

  }

}


export class BothniaImage{
  public _id: String; 
  public title: String;
  public filepath: String;
  public date: Date;
  public photographer: String;
  public category: Array<String>;
  public subcategory: Array<String>;
  public Location: Location;
  public Technical_data: Technical_data;
  public description: String;
  public keywords: Array<String>;
  public restrictions: String;
  public remaining_publications: number;
  public publication_dates: Array<Date>
  public price: number;
  public reviewed: Boolean;
  public variants: Array<String>;

  constructor(title: String, filepath: String, date: Date, photographer: String, category: Array<String>, subcategory: Array<String>, Location: Location, Technical_data: Technical_data, description: String, keywords: Array<String>, restrictions: String, remaining_publications: number, publication_dates: Array<Date>, price: number, reviewed: Boolean, variants: Array<String>){
    this.title = title;
    this.filepath = filepath;
    this.date = date;
    this.photographer = photographer;
    this.category = category;
    this.subcategory = subcategory;
    this.Location = Location;
    this.Technical_data = Technical_data;
    this.description = description;
    this.keywords = keywords;
    this.restrictions = restrictions;
    this.remaining_publications = remaining_publications;
    this.publication_dates = publication_dates;
    this.price = price;
    this.reviewed = reviewed;
    this.variants = variants;
  }

}

export class Location{
  public GPSCoordinates: Number;
  public place: String;
  public city: String;
  public region: String;
  public country: String;

  constructor(GPSCoordinates: Number, place: String, city: String, region: String, country: String){
    this.GPSCoordinates = GPSCoordinates;
    this.place = place;
    this.city = city;
    this.region = region;
    this.country = country;
  }
}

export class Technical_data{
  public format: String;
  public height: Number;
  public width: Number;
  public image_size: String;
  public resolution: String;
  public camera: String;

  constructor(format: String, height: Number, width: Number, image_size: String, resolution: String, camera: String){
    this.format = format;
    this.height = height;
    this.width = width;
    this.image_size = image_size;
    this.resolution = resolution;
    this.camera = camera;
  }
}
