import { UtilityService } from './../../../services/utility.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-media-full-size',
  templateUrl: './media-full-size.component.html',
  styleUrls: ['./media-full-size.component.scss']
})
export class MediaFullSizeComponent implements OnInit {
  public imgApi:string = environment.imgApi;
  constructor(public UtilityService:UtilityService) { }

  ngOnInit(): void {
    
  }

}
