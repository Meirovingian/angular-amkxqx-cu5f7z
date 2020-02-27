import { Component, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';

import { products } from '../products';

import { CartService } from '../cart.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {

  itemSet = new Set();
  checkoutForm;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private formBuilder: FormBuilder
  ) { 
    this.checkoutForm = this.formBuilder.group({
      name: '',
      address: ''
    });
  }

  ngOnInit() {
    this.itemSet = this.productService.getProducts(this.cartService.getFuncIdSet());
  }

  onSubmit(customerData) {
    // Process checkout data here
    this.cartService.clearCart();
    this.itemSet.clear();
    this.checkoutForm.reset();

    console.warn('Your order has been submitted', customerData);
  }

  removeItemFromCart(funcId){
    this.itemSet = this.productService.getProducts(this.cartService.removeProductFromCart(funcId));
  }

}