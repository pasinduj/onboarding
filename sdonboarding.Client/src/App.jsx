import React, { useState } from "react";
import './App.css'
import CustomerName from './components/customer/CustomerName';
import CustomerList from './components/customerlist/CustomerList';
import ProductName from './components/product/ProductName';
import ProductList from './components/productlist/ProductList';
import StoreName from './components/store/StoreName';
import StoreList from './components/storelist/StoreList';
import SaleName from './components/sale/SaleName';
import SaleList from './components/salelist/SaleList';

import Header from './components/header/Header';
import Button from '@mui/material/Button';


function App() {

  const [activeSection, setActiveSection] = useState("customers"); // Default to "customers"
  

  return (
     
    
    <div className="App">

<div className="flex-container">
          
          <div> <Button  onClick={() => setActiveSection("customers")}  >Customers</Button>      </div>
          <div> <Button onClick={() => setActiveSection("products")} >Products</Button>    </div>
            <div><Button  onClick={() => setActiveSection("stores")} >Stores</Button> </div>
            <div> <Button  onClick={() => setActiveSection("sales")} > Sales</Button> </div>
         
         </div>


     
         {activeSection === "customers" && (
        <>
          
          <CustomerList />
        </>
      )}

      {activeSection === "products" && (
        <>
          
          <ProductList />
        </>
      )}


{activeSection === "stores" && (
        <>
         
          <StoreList />
        </>
      )}

{
activeSection === "sales" && (
        <>
          
          <SaleList />
        </>
      )}

  </div>



  )
}

export default App
