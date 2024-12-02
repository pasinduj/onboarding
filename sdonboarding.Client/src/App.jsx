import React, { useState } from "react";
import './App.css'
import CustomerName from './components/customer/CustomerName';
import CustomerList from './components/customerlist/CustomerList';
import ProductName from './components/product/ProductName';
import ProductList from './components/productlist/ProductList';

import Header from './components/header/Header';
import Button from '@mui/material/Button';


function App() {

  const [activeSection, setActiveSection] = useState("customers"); // Default to "customers"
  

  return (
     
    
    <div className="App">

<div className="flex-container">
          
          <div> <Button  onClick={() => setActiveSection("customers")}  >Customers</Button>      </div>
          <div> <Button onClick={() => setActiveSection("products")} >Products</Button>    </div>
            <div><Button  href="#text-buttons">Stores</Button> </div>
            <div> <Button  href="#text-buttons">Sales</Button> </div>
         
         </div>


     
         {activeSection === "customers" && (
        <>
          <CustomerName />
          <CustomerList />
        </>
      )}

      {activeSection === "products" && (
        <>
          <ProductName />
          <ProductList />
        </>
      )}

  </div>



  )
}

export default App
