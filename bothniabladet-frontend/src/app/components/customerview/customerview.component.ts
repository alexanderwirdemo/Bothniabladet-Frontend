import { Component, OnInit } from '@angular/core';
import { Image } from '../../images';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-customerview',
  templateUrl: './customerview.component.html',
  styleUrls: ['./customerview.component.css']
})
export class CustomerviewComponent implements OnInit {
  public imagesData: Array<ImageData> = [];
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
          this.imagesToReview.allImagesToReview[imageIndex]._id,
          "http://localhost:3001/uploaded_images/"+this.imagesToReview.allImagesToReview[imageIndex].title,
          this.imagesToReview.allImagesToReview[imageIndex].photographer,
        );
        this.imagesData.push(imageData);
      }
      console.dir(this.imagesData);
         
      }, err => {
      console.log(err);

      });
    
  }

  approveImage(image: ImageData){
    console.dir(image);
    const body = {
      _id: image.id,
      reviewed: true
    };
    this._api.putTypeRequest('images/reviewed/update/'+image.id, body).subscribe(response => {
        console.log(response);
        this.removeElementFromObjectArray(image.id);
        alert('Godkänd!');
      }, er => {
        console.log(er);
        alert(er.error.error);
      });
    
  }

  removeElementFromObjectArray(_id: String) {
    this.imagesData.forEach((image,index)=>{
        if(image.id===_id) this.imagesData.splice(index,1);
    });
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
