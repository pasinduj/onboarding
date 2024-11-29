import './ViewCustomer.css';

function ViewCustomer() {

  const items = ["New York","Colombo","London","Tokyo"];
    return (
         
       
      <table className="table table-striped" aria-labelledby="tableLabel">
     <thead>
         <tr>
             <th >Id</th>
             <th >Name</th>
             <th></th>
             <th></th>
         </tr>
     </thead>
     <tbody>
        
      { items.map((item) => (
        <li> {item} </li>
      ) )


      }


     </tbody>
 </table>
        
  
        
    )
  }
  
  export default ViewCustomer