import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
import { SmartSearchDirective } from './smart-search.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ SmartSearchDirective ],
  exports: [ SmartSearchDirective ]
})
export class SmartSearchModule { }
