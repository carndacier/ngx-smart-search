import { Component } from '@angular/core';
import { SmartSearchConfig, SmartSearchKey } from './smart-search/smart-search-config.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public value: string;
  public configuration: SmartSearchConfig;

  constructor() {
    this.configuration = new SmartSearchConfig();
    this.configuration.keys = [];

    this.configuration.keys.push({
      action: "YAY",
      followings: [],
      isLast: true,
      keys: [ "get", "retrieve", "show me", "show" ]
    })
  }
}
