import { Component }  from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SmartSearchConfig, SmartSearchKey } from './smart-search/smart-search-config.model';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public value: string;
  public configuration: SmartSearchConfig;

  public showAs: string;
  public result: string;
  
  constructor(private http: HttpClient) {
    this.configuration = new SmartSearchConfig();
    this.configuration.keys = [];

    let self = this;
    this.http.get('assets/config.json').subscribe(res => 
      this.configuration = <SmartSearchConfig>res
    );
  }

  public getResult(event) {
    this.result = event.action;
    if (event.showAs)
      this.showAs = event.showAs;
  }
}
