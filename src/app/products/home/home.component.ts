import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { invokeproductsAPI, invokeDeleteProductAPI } from '../store/products.action';
import { selectproducts } from '../store/products.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { window } from 'rxjs';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
 
})
export class HomeComponent implements OnInit {
  appStore: any;
  constructor(private store: Store) {}
  products$: any;
  deleteModal: any;
  idToDelete: number = 0;
  
  ngOnInit(): void {
    this.store.dispatch(invokeproductsAPI());
    this.products$ = this.store.pipe(select(selectproducts));
  }
  displayStyle = "none"; 
  
  openPopup(id:number) { 
    this.idToDelete = id;
    this.displayStyle = "block"; 
  } 
  closePopup() { 
    this.displayStyle = "none"; 
  } 

 
  deleterecord() {
    this.store.dispatch(invokeDeleteProductAPI({
        id: this.idToDelete,
      })
    );
    this.displayStyle = "none"; 
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState: any) => {
      if (apState.apiStatus == 'success') {
         this.displayStyle = "none"; 
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
      }
    });
  }

}
