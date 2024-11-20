import './Header.css';
import viewCustomers from '../viewCustomer/ViewCustomer';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';


function Header() {

     // Define the functions for each button click
    const handleCustomersClick = () => {
      navigate('/viewCustomer'); // Replace with your route for the ViewCustomer page
  };





    return (
      <div className="flex-container">
          
          <div> <Button variant="contained" href="#text-buttons">Customers</Button>      </div>
          <div> <Button variant="contained" href="#text-buttons">Products</Button>    </div>
            <div><Button variant="contained" href="#text-buttons">Stores</Button> </div>
            <div> <Button variant="contained" href="#text-buttons">Sales</Button> </div>
         
         </div>
          
        
      )
  }
  
  export default Header;