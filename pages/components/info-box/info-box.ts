import { Component, Input } from '@angular/core';
@Component({
  selector: 'info-box',
  templateUrl: './info-box.html',
  styleUrls:['info-box.scss']
})
export class InfoBoxComponent {


  @Input () infoBoxClass:string  = null;
  @Input () iconclass:string  = null;
  @Input () iClass:string = 'fa-gear fa-3x';
  @Input () textClass:string  = null;
  @Input () titleClass:string  = null;
  @Input () contentClass:string  = null;


  @Input () titleInnerHTML:string  = 'Title';
  @Input () contentInnerHTML:string  = 'Content';


  constructor( ){

  }
}
