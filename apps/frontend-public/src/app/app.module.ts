import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FrontendToolsModule } from '@family-calendar-v2/frontend-tools'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FrontendToolsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
