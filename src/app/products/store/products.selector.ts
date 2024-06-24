import { createFeatureSelector, createSelector } from '@ngrx/store';
import { products } from './products';
 
export const selectproducts = createFeatureSelector<products[]>('myproducts');

export const selectproductById = (productId: number) =>
  createSelector(selectproducts, (products: products[]) => {
    var productbyId = products.filter((x) => x.id == productId);
    if (productbyId.length == 0) {
      return null;
    }
    return productbyId[0];
  });