import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogContent } from '@angular/material/dialog';
import { BothniaImage } from '../imageview/imageview.component';





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


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}


  onFormSubmit(){


  }


  ngOnInit(): void {



  }

  getRestrictions(): any {
    return this.data.restrictions;
  }

  addVariant():void {
    console.log("adding variant");
  }

  public close() {
    this.dialogRef.close();
}


}

