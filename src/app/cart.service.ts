import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  map = new Map<number,number>();

  constructor(
    private http: HttpClient) { }

  addProductToCart(funcId) {
    console.log('Start of CartService addProductToCart ' + funcId);
    if(this.map == null){
      this.map = new Map();
    }
    let value = this.map.get(funcId);
    if(value == null){
      value = 0;
    }
    value++;
    this.map.set(funcId,value);
    console.log('Added : [' + funcId + ',' + this.map.get(funcId) + ']');
    console.log('End of CartService addProductToCart ' + funcId);
  }

  getNumberOfItems(){
    if(this.map !== null && this.map.size > 0){
      let sum = 0;
      for (let value of this.map.values()) {
        sum += value;
      }
      return sum;
    }
    return 0;
  }

  getFuncIdSet(){
    console.log('Start of CartService getFuncIdSet()');
    let funcIdSet = new Set();
    if(this.map !== null && this.map.size > 0){
      console.log('Map has ' + this.map.size + ' elements !');
      this.map.forEach((value: number, key: number) => {
        console.log('Key to add : ' + key);
        console.log('Avoided value : ' + value);
        funcIdSet.add(key);
      });
    }
    console.log('End of CartService getFuncIdSet()');
    return funcIdSet;
  }

  clearCart() {
    this.map.clear();
  }

  removeProductFromCart(funcId){
    if(this.map == null){
      this.map = new Map();
    }
    let value = this.map.get(funcId);
    if(value !== null && value > 0){
      value--;
      if(value > 0){
        this.map.set(funcId,value);
      }
      else{
        this.map.delete(funcId);
      }
    }
    return this.getFuncIdSet();
  }

  getShippingPrices() {
    return this.http.get('/assets/shipping.json');
  }

}