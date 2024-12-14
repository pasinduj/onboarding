import './Header.css';
import viewCustomers from '../viewCustomer/ViewCustomer';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';


function Header() {

     // Define the functions for each button click
    function handleCustomersClick() {
      console.log('called');
      navigate('/viewCustomer'); // Replace with your route for the ViewCustomer page
  };





    return (
      <div className="flex-container">
          
          <div> <Button variant="contained"  >Customers</Button>      </div>
          <div> <Button variant="contained">Products</Button>    </div>
            <div><Button variant="contained" href="#text-buttons">Stores</Button> </div>
            <div> <Button variant="contained" href="#text-buttons">Sales</Button> </div>
         
         </div>
          
        
      )
  }
  
  export default Header;