//feature1
import React, { Component } from 'react';
import './App.css';
import data from './data.json';
import Products from './components/Products'
import Filter from './components/Filter';

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: ""

    };
  }

  sortProducts = (event) => {
  console.log(event.target.value);
  const sort = event.target.value;
  this.setState( (state) => ({
    sort: sort,
    products: this.state.products.slice().sort((a,b) =>(
      sort === "lowest" ? ((a.price > b.price) ? 1: -1) :
      sort === "highest" ? ((a.price < b.price) ? 1: -1) :
      ((a.id < b.id) ? 1 : -1)
    ))
  }))
  }
  filterProducts = (event) => {

    if( event.target.value === '') {
      this.setState({size:event.target.value, product : data.products})
    }
    else {
      this.setState({
        size: event.target.value,
        products: data.products.filter( 
          (product) => product.availableSizes.indexOf(event.target.value) >=0 )
      })
    }
   

  }

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>

        <main>
          <div className="content">
            <div className="main">
              <Filter  count= {this.state.products.length} size={this.state.size} sort={this.state.sort}
              filterproducts={this.filterProducts}
              sortproducts={this.sortProducts}
              />
              <Products products={this.state.products}/> 
              </div>
            <div className="sidebar">Cart items</div>
          </div>
        </main>

        <footer>
          All right is reserved
        </footer>
      </div>
    );
  }
}

export default App;
