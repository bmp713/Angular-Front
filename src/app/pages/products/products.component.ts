import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
    // products: Products[] = productsData;
    products: any = null;
    productsCount: number = 10;
    productByName: any = "";

    color: string = "";
    name: string = "";
    type: string = "";
    id: string = "";

    constructor( private router: Router, public route: ActivatedRoute ){
        console.log(this.products);
        try{
          fetch("http://localhost:4000/read")
              .then( response => response.json() )
              .then( data => {
                  this.products = data;
                  console.log("products.json => ", this.products)
              });
        }catch(error){}
    }

    ngOnInit(): void {
    }

    loadMore = () => {
      this.productsCount = this.productsCount + 10;
    }

    clearSearch(){
        this.color = "";
        this.name = "";
        this.type = "";
    }

    // Deletes product by id in Rest API
    deleteProduct = async (id:string) => {
        try{
            await fetch(`http://localhost:4000/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json' ,
                },
                body: JSON.stringify({
                    id: this.id,
                })
            });
            this.router.navigate(['/products']);

            }catch(err){
                console.error(err);
        }
    }

    // Returns specfic product object
    searchProduct = async (name:string) => {
        console.log("searchProduct");
        console.log("name =>", name);

        let productByName = this.products.find( product => {
            return product.name === name;
        });

        console.log("productByName", productByName);
        productByName ? true : false;
    }

}



