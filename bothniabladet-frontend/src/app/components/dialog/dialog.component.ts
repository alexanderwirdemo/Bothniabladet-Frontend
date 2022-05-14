
import { Component, OnInit, Inject, NgModule } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BothniaImage } from '../imageview/imageview.component';
import { CommonModule } from '@angular/common';


/*
export interface DialogData {
  animal: string;
  name: string;
}*/

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  //public data: BothniaImage;
  public variants: Array<String>;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BothniaImage,
  ) { 
    this.variants = data.variants;
  }

  ngOnInit(): void {
    console.dir(this.data);
    console.dir(MAT_DIALOG_DATA);
    console.dir(this.dialogRef);
    //this.image= this.image;
  }

  addVariant():void {
    console.log("adding variant");
  }

  public close() {
    this.dialogRef.close();
}

}

