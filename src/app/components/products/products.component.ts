import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  ngOnInit(): void {
    this.getData();
  }
  products: any = [];
  latestId = 0;
  editableId = 0;
  async getData() {
    const response = await fetch('http://localhost:3000/products');
    const products = await response.json();
    this.products = products;
    this.latestId = this.products[this.products.length - 1].id + 1;
  }

  editData(id: any) {
    this.editableId = id;
    const name = this.products[id].name;
    const category = this.products[id].category;
    const price = this.products[id].price;
    const date = this.products[id].date;
    (document.getElementById('name') as HTMLInputElement).value = name;
    (document.getElementById('category') as HTMLSelectElement).value = category;
    (document.getElementById('price') as HTMLInputElement).value = price;
    (document.getElementById('date') as HTMLDataElement).value = date;
  }

  async saveData() {
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const category = (document.getElementById('category') as HTMLSelectElement)
      .value;
    const price = (document.getElementById('price') as HTMLInputElement).value;
    const date = (document.getElementById('date') as HTMLDataElement).value;
    await fetch('http://localhost:3000/products/' + this.editableId, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        category: category,
        price: price,
        date: date,
      }),
    });
    window.alert('Nryshimi juaj eshte ruajtur!');
    this.getData();
  }

  async deleteData(id: any) {
    await fetch('http://localhost:3000/products/' + id, {
      method: 'DELETE',
    }).then((response) => {
      if (response.ok) {
        window.alert('Produkti u fshi me sukses!');
      } else {
        window.alert('Produkti nuk u fshi. Ka ndodhur nje gabim!');
      }
    });
    this.getData();
  }

  async addData() {
    const name = (document.getElementById('nameA') as HTMLInputElement).value;
    const category = (document.getElementById('categoryA') as HTMLSelectElement).value;
    const price = (document.getElementById('priceA') as HTMLInputElement).value;
    const date = (document.getElementById('dateA') as HTMLDataElement).value;
    await fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.latestId + 1,
        name: name,
        category: category,
        price: price,
        date: date,
      }),
    });
    (document.getElementById('nameA') as HTMLInputElement).value = "";
    (document.getElementById('categoryA') as HTMLSelectElement).value = "default";
    (document.getElementById('priceA') as HTMLInputElement).value = "";
    (document.getElementById('dateA') as HTMLDataElement).value = "";
    window.alert('Produkti eshte shtuar me sukses!');
    this.getData();
  }
}
