import { createAction, props } from '@ngrx/store';
import { products } from './products';
 
export const invokeproductsAPI = createAction(
  '[products API] Invoke products Fetch API'
);
 
export const productsFetchAPISuccess = createAction(
  '[products API] Fetch API Success',
  props<{ allproducts: products[] }>()
);
export const invokeSaveNewProductAPI = createAction(
  '[products API] Inovke save new Product api',
  props<{ newProduct: products }>()
);
 
export const saveNewProductAPISucess = createAction(
  '[products API] save new Product api success',
  props<{ newProduct: products }>()
);

export const invokeUpdateProductAPI = createAction(
  '[products API] Inovke update Product api',
  props<{ updateProduct: products }>()
);
 
export const updateProductAPISucess = createAction(
  '[products API] update  Product api success',
  props<{ updateProduct: products }>()
);

//Delete record
export const invokeDeleteProductAPI = createAction(
  '[products API] Inovke delete Product api',
  props<{id:number}>()
);
 
export const deleteProductAPISuccess = createAction(
  '[products API] deleted Product api success',
  props<{id:number}>()
);