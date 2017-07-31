import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { CompanyService } from './services/company.service';
import { ProductService } from './services/product.service';
import { ProductTreeService } from './services/product-tree.service';

import { AppComponent } from './app.component';
import { NodeCardComponent } from './components/node-card/node-card.component';
import { CategoriesHomeComponent } from './components/categories-home/categories-home.component';
import { TreeComponent } from './components/tree/tree.component';
import { TreeNodePlacementPipe } from './pipes/tree-node-placement.pipe';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PageTopComponent } from './components/page-top/page-top.component';

@NgModule({
  declarations: [
    AppComponent,
    NodeCardComponent,
    CategoriesHomeComponent,
    TreeComponent,
    TreeNodePlacementPipe,
    SidebarComponent,
    PageTopComponent
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
