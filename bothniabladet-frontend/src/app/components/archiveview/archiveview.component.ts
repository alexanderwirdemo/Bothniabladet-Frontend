import { Component, OnInit } from '@angular/core';
import { Options } from './optionsinterface';
import { OPTIONS } from './searchoptions';

@Component({
  selector: 'app-archiveview',
  templateUrl: './archiveview.component.html',
  styleUrls: ['./archiveview.component.css']
})
export class ArchiveviewComponent implements OnInit {

  options = OPTIONS;

  constructor() { }

  choice?: Options;
  onSelect(option: Options): void {
  this.choice = option;
}


  test = 'Hej';

  ngOnInit(): void {
  }

}
