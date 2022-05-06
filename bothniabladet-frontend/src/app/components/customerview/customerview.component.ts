import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-customerview',
  templateUrl: './customerview.component.html',
  styleUrls: ['./customerview.component.css']
})
export class CustomerviewComponent implements OnInit {
  private imagesData: Array<ImageData> = [];
  private imagesToReview: any;

  constructor(
    private _api: ApiService,
  ) { }

  ngOnInit(): void {
    this._api.getTypeRequest('images/toreview').subscribe(images => {
      console.dir(images);
      this.imagesToReview = images;
      for(var imageIndex=0; imageIndex<this.imagesToReview.allImagesToReview.length; imageIndex++){
        console.dir(this.imagesToReview.allImagesToReview[imageIndex]);
        let imageData = new ImageData(
          'http://localhost:3001/uploaded_images/'+this.imagesToReview.allImagesToReview[imageIndex].title,
          this.imagesToReview.allImagesToReview[imageIndex].photographer,
        );
        this.imagesData.push(imageData);
      }
      console.dir(this.imagesData);
         
      }, err => {
      console.log(err);

      });
    
  }

}

export class ImageData{
  public filepath: String;
  public photographer: String;

  constructor(filepath: String, photographer: String){
    this.filepath = filepath;
    this.photographer = photographer;
  }
}