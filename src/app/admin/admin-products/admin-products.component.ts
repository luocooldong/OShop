import { number } from 'ng2-validation/dist/number';
import { Product } from '../../models/product';
import { Subscription } from 'rxjs/Rx';
import { ProductService } from '../../product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: Product[];
  filteredProducts: any[];
  subscription: Subscription;

  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;

  constructor(
    private productService: ProductService
  ) {
    this.subscription = this.productService.getAll()
      .subscribe(products => {
        this.filteredProducts = this.products = products;
        this.initializeTable(products);
      }
    );
    // this.products$ = this.productService.getAll();
  }

  private initializeTable(products: Product[]) {
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);
    this.tableResource.count()
        .then(count => this.itemCount = count);
  }

  reloadItems(params) {
    if (!this.tableResource) {
      return;
    }
    this.tableResource.query(params)
      .then(items => this.items = items);
  }

  filter(query: string) {
    console.log(query);
    this.filteredProducts = (query) ?
       this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
       this.products;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }
}
