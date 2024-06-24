import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { productReducer } from './store/products.reducer';
import { productsRoutingModule } from './products-routing.module';
import { HomeComponent } from './home/home.component';
import { EffectsModule } from '@ngrx/effects';
import { productsEffect } from './store/products.effect';
import { AddComponent } from './add/add.component';
import { FormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    HomeComponent,
    AddComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    productsRoutingModule,
    StoreModule.forFeature('myproducts', productReducer),
    EffectsModule.forFeature([productsEffect]),
    FormsModule
  ]
})
export class productsModule { }
