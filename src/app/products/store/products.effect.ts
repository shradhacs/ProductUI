import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs';
import { productsService } from '../products.service';
import { productsFetchAPISuccess, invokeproductsAPI,invokeSaveNewProductAPI,saveNewProductAPISucess ,invokeUpdateProductAPI,updateProductAPISucess, invokeDeleteProductAPI, deleteProductAPISuccess} from './products.action';
import { selectproducts } from './products.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { Router } from '@angular/router';
 
@Injectable()
export class productsEffect {
  constructor(
    private actions$: Actions,
    private productsService: productsService,
    private store: Store,
    private appStore: Store<Appstate>,
    private router: Router
  ) {}
 
  loadAllproducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeproductsAPI),
      withLatestFrom(this.store.pipe(select(selectproducts))),
      mergeMap(([, productformStore]) => {
        if (productformStore.length > 0) {
          return EMPTY;
        }
        return this.productsService
          .get()
          .pipe(map((data) => productsFetchAPISuccess({ allproducts: data })));
      })
    )
  );

saveNewproduct$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(invokeSaveNewProductAPI),
    switchMap((action) => {
      this.appStore.dispatch(
        setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
      );
      return this.productsService.create(action.newProduct).pipe(
        tap(()=>{this.router.navigateByUrl('/');}),
        map((data) => {
          this.appStore.dispatch(
            setAPIStatus({
              apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
            })
          );
          return saveNewProductAPISucess({ newProduct: data });
        })
      );
    })
  );
});

// existing code hidden for display purpose
 
updateproductAPI$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(invokeUpdateProductAPI),
    switchMap((action) => {
      this.appStore.dispatch(
        setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
      );
      return this.productsService.update(action.updateProduct).pipe(
        tap(()=>{this.router.navigateByUrl('/');}),
        map((data) => {
          this.appStore.dispatch(
            setAPIStatus({
              apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
            })
          );
          return updateProductAPISucess({ updateProduct: data });
        })
      );
    })
  );
});

deleteproductsAPI$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(invokeDeleteProductAPI),
    switchMap((actions) => {
      this.appStore.dispatch(
        setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
      );
      return this.productsService.delete(actions.id).pipe(
        map(() => {
          this.appStore.dispatch(
            setAPIStatus({
              apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
            })
          );
          return deleteProductAPISuccess({ id: actions.id });
        })
      );
    })
  );
});

}