import { createReducer, on } from '@ngrx/store';
import { products } from './products';
import { productsFetchAPISuccess, deleteProductAPISuccess, saveNewProductAPISucess, updateProductAPISucess } from './products.action';
 
export const initialState: ReadonlyArray<products> = [];
 
export const productReducer = createReducer(
  initialState,
  on(productsFetchAPISuccess, (state, { allproducts }) => {
    return allproducts;
  }),

on(saveNewProductAPISucess, (state, { newProduct }) => {
  let newState = [...state];
  newState.unshift(newProduct);
  return {...state,...newState};
}),

on(updateProductAPISucess, (state, { updateProduct }) => {
  let newState = state.filter((_) => _.id != updateProduct.id);
  newState.unshift(updateProduct);
  return {...state,...newState};
}),
//delete
on(deleteProductAPISuccess, (state, { id }) => {
  let newState =state.filter((_) => _.id != id);
  return newState;
})
);