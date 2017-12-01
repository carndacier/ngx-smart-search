import { NgModule }           from '@angular/core';
import { FormsModule }        from '@angular/forms';
import { BrowserModule }      from '@angular/platform-browser';

import { AppComponent }       from './app.component';

import { SmartSearchModule }  from './smart-search/smart-search.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,

    SmartSearchModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
