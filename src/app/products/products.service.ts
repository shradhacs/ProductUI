import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { products } from './store/products';

@Injectable({
  providedIn: 'root'
})
export class productsService {

  constructor(private http: HttpClient) {}
  get() {
    return this.http.get<products[]>('https://localhost:7274/api/product/GetProduct');
  }
  create(payload: products) {
    return this.http.post<products>('https://localhost:7274/api/product/Addproducts', payload);
  }
  update(payload: products) {
    return this.http.put<products>(
      `https://localhost:7274/api/product/update`,
      payload
    );
    }
    delete(id: number) {
      return this.http.delete(`https://localhost:7274/api/product/Delete/${id}`);
    }
}
