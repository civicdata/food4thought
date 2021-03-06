import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { MapService } from './../map.service';
import { UniFeature } from '../models/uniFeature';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent implements OnInit {
  featureSet: UniFeature[] = [];

  constructor(private _http: Http, private _mService: MapService ) { }

  ngOnInit(): void {

    this._http.get(`https://api.mapbox.com/datasets/v1/vicagbasi/${this._mService.datasetToken}/features?access_token=${this._mService.mapToken}`)
      .subscribe(sites => {
        console.log(sites.json().features);
        this.featureSet = this.dataFormat(sites.json().features);
        
      });
    } // ends ngOnInit //

  dataFormat(data : any[] ){
    let newData: any[] = [];
    for (let x = 0; x < data.length; x++){
      let new_obj = {};
      let data_obj = data[x];
      new_obj['id' ] = data_obj['id'];

      let keys = Object.keys(data_obj['properties']);
      for (let j = 0; j < keys.length; j++) {
        new_obj[keys[j]] = data_obj['properties'][keys[j]];
      }
      newData.push(new_obj);
    }

    console.log("This is newData: ", newData);
    return newData;
  }
}
