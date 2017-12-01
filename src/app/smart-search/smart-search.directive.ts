import { Directive, Input } from '@angular/core';
import { SmartSearchConfig, SmartSearchKey } from './smart-search-config.model';
import { OnChanges, SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Directive({
  selector: '[slSmartSearch]'
})
export class SmartSearchDirective implements OnChanges {

  @Input('smartValue') public value: string;
  @Input('smartConfiguration') public configuration: SmartSearchConfig;

  private isComplete: boolean = false;

  constructor() { alert('In it') }

  ngOnChanges(changes: SimpleChanges) {
    if (changes != null && changes['value'] != null && changes['value'].currentValue != changes['value'].previousValue) {
      this.isComplete = false;
      this.execute(changes['value'].currentValue);
    }
  }

  private execute(val: string) {
    let result = this.sliceString("", val, this.configuration.keys);
    if (result != null) {
      if (this.isComplete)
        alert(result);
    }
  }

  private sliceString(action: string, val: string, keys: Array<SmartSearchKey>): string {

    // Check if the string contains something
    if (val == null || val == '')
      return action;

    keys.forEach(config => {
      let key = config.keys.find(key => val.substr(0, key.length) != null);
      if (key != null) {
        action = (action != '' ? ' ' : '') + config.action;
        if (!config.isLast)
          action = this.sliceString(action, val.substr(key.length - 1), config.followings);
        else {
          this.isComplete = true;
          return action;
        }
      }
    });
    return action;
  }
}
