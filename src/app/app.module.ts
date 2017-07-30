import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { CompanyService } from './services/company.service';
import { ProductService } from './services/product.service';
import { ProductTreeService } from './services/product-tree.service';

import { AppComponent } from './app.component';
import { NodeCardComponent } from './components/node-card/node-card.component';
import { CategoriesHomeComponent } from './components/categories-home/categories-home.component';

@NgModule({
  declarations: [
    AppComponent,
    NodeCardComponent,
    CategoriesHomeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
    CompanyService,
    ProductService,
    ProductTreeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
