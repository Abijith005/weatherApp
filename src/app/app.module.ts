import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';
import { ImagePipe } from './pipes/image.pipe';
import {
  NgxAwesomePopupModule,
  ToastNotificationConfigModule,
} from '@costlydeveloper/ngx-awesome-popup';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    ImagePipe
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxAwesomePopupModule.forRoot(),
    ToastNotificationConfigModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
