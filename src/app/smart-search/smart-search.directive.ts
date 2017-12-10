import { Directive, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import { SmartSearchConfig, SmartSearchKey }                                from './smart-search-config.model';

@Directive({
  selector: '[slSmartSearch]'
})
export class SmartSearchDirective implements OnChanges {

  @Input('smartValue') public value: string;
  @Input('smartConfiguration') public configuration: SmartSearchConfig;

  @Output() onResult = new EventEmitter();

  private showAs: string = "";
  private isComplete: boolean = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes != null && changes['value'] != null && changes['value'].currentValue != changes['value'].previousValue) {
      this.showAs = "";
      this.isComplete = false;

      this.execute(changes['value'].currentValue);
    }
  }

  private execute(val: string) {
    let result = this.sliceString("", val, this.configuration.keys);
    if (result != null) {
      if (this.isComplete)
        this.onResult.emit({ action: result, showAs: this.showAs });
    }
  }

  private sliceString(action: string, val: string, keys: Array<SmartSearchKey>): string {

    // Check if the string contains something
    if (val == null || val == '')
      return action;

    // Remove extr spaces
    val = val.replace(/\s+/g,' ').trim();
    if (val[0] == ' ') val = val.substr(1);

    keys.forEach(config => {

      // Find a matching key
      let key = config.keys.find(key => this.evaluate(key, val) > -1);
      if (key != null) {
        // Save the action related
        action += this.evaluateAction(key, val, config.action, config.followings);

        let remaining = val.substr(key.length);
        if (config.isLast)
          this.isComplete = true;

          if (config.showAs != null && config.showAs.length > 0)
            this.showAs = this.getShowType(config.showAs, val);
          
        if (config.followings != null && config.followings.length > 0)
          action = this.sliceString(action, remaining, config.followings);
      }
    });
    return action;
  }

  private evaluate(key: string, value: string) {

    let result = value.toLowerCase().indexOf(key.toLowerCase());
    if (result == -1 && key.indexOf("##") != -1) {
      let newKey = key.replace('##', '').replace(/\s+/g,' ').trim();
      result = this.evaluate(newKey, value);
    }
    return result;
  }

  private evaluateAction(key: string, val: string, action: string, followings: Array<SmartSearchKey> = []) {

    let nbrIndex = key.indexOf('##');
    if (nbrIndex > -1) {

      let end = -1;

      for (let x = 0; x < followings.length; x++) { let following = followings[x];

        for (let y = 0; y < following.keys.length; y++) { let followKey = following.keys[y];

          end = this.evaluate(followKey, val);
          if (end != -1) { end = end - nbrIndex; break; }
        }

        if (end != -1) break;
      }

      if (end == -1) end = val.substr(nbrIndex).length;

      return action.replace('##', val.substr(nbrIndex, end));
    }
    return action;
  }

  private getShowType(showAs: Array<string>, val: string): string {

    for (let x = 0; x <= showAs.length - 1; x++) {
      let showType = showAs[x];
      if (val.toLowerCase().indexOf("in a " + showType) > -1)
        return showType;
    }
    return showAs[0];
  }
}
