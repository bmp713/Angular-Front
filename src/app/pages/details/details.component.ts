import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
    products: any;
    productInfo: any;
    id: any;
    sku: any;
    name: any;
    type: any;
    description: any;
    color: any;
    price: any;

    error: string = "";

    ngOnInit(): void {}

    constructor( private router: Router, public route: ActivatedRoute ){
          console.log(this.products);
          try{
            fetch("http://localhost:4000/read")
                .then( response => response.json() )
                .then( data => {
                    this.products = data;
                    console.log("products.json => ", this.products);

                    this.productInfo = this.products.find( (product:any ) => {
                        return product.id === this.id;
                    });
                    this.sku = this.productInfo.sku;
                    this.name = this.productInfo.name;
                    this.type = this.productInfo.type;
                    this.color = this.productInfo.color;
                    this.price = this.productInfo.price;
                    this.description = this.productInfo.description;
                });
        }catch(error){}

        this.id = this.route.snapshot.paramMap.get('id');
    }

    // Update individual products with Node API
    updateProduct = async (name:string, type:string, color:string, price:string, description:string,) => {

        if( !price || !color || !description || !type ){
            this.error = "*Type, price, description, and color are required";
            return;
        }
        else if( color.length >= 56 || type.length >= 56 ){
            this.error = "*Type, price, and color must be less than 56 characters";
            return;
        }
        else if( description.length >= 200 ){
          this.error = "*Description must be less than 200 characters";
          return;
      }
        else if( parseInt(price) <= 0 ){
            this.error = "*Price must be greater than 0";
            return;
        }
        this.error = "";

        try{
            await fetch(`http://localhost:4000/update/${this.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' ,
                },
                body: JSON.stringify({
                    id: this.id,
                    sku: this.sku,
                    name: name,
                    type: type,
                    description: description,
                    color: color,
                    price: price
                })
            });
            this.router.navigate(['/products']);

            }catch(err){
              console.error(err);
        }
    }

    deleteProduct = async (id:string) => {

        try{
          await fetch(`http://localhost:4000/delete/${this.id}`, {
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
}



