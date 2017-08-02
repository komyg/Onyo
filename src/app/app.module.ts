import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

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
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { NodeAccordionComponent } from './components/node-accordion/node-accordion.component';

import { productTreeReducer } from './reducers/product-tree.reducer';
import { ProductTreeEffect } from './effects/product-tree.effect';

@NgModule({
  declarations: [
    AppComponent,
    NodeCardComponent,
    CategoriesHomeComponent,
    TreeComponent,
    TreeNodePlacementPipe,
    SidebarComponent,
    PageTopComponent,
    ProductEditComponent,
    NodeAccordionComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgbModule.forRoot(),
    StoreModule.forRoot({ productTree: productTreeReducer }),
    EffectsModule.forRoot([ProductTreeEffect])
  ],
  providers: [
    CompanyService,
    ProductService,
    ProductTreeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
