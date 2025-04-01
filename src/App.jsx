import { useState } from 'react'
import './App.css'

function App() {
  const [customerList, setCustomerList] = useState([]);
  
  const addCustomer = (customer) => {
    const emailExists = customerList.some((c) => c.Email.toLowerCase() === customer.Email.toLowerCase());
    if (emailExists) {
      alert("Email already exists.");
    }else {
      setCustomerList((prevList) => [...prevList, customer]);
    }
  };

  const removeCustomer = (customerId) => {
    setCustomerList((prevList) => prevList.filter((c) => c.Id !== customerId));
  };

  const searchCustomer = (searchTerm) => {
    return customerList.find(
      (c) =>
        c.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.Email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  
  const updateCustomer = (customerId, newName, newEmail) => {
    setCustomerList((prevList) =>
      prevList.map((c) =>
        c.Id === customerId
          ? { ...c, Name: newName, Email: newEmail }
          : c
      )
    );
  };
  return (
    <>
      <h1>Customers</h1>
      
        <h2>Add Customer</h2>


        <form
          onSubmit={(e) => {
            e.preventDefault();
            const name = e.target.name.value;
            const email = e.target.email.value;
            const id = Date.now();
            addCustomer({ 
              Id: id, 
              Name: name, 
              Email: email 
            });
            e.target.reset();
            }}
          >
            <input type="text" name="name" placeholder="Name" required />
            <input type="email" name="email" placeholder="Email" required />
            <button type="submit">Add</button>
          </form>





          <h2>Customer List</h2>
          <ul>
            {customerList.map((customer) => (
            <li key={customer.Id}>
              {customer.Name} ({customer.Email}){" "}
              <button onClick={() => removeCustomer(customer.Id)}>
              Delete
              </button>
              <button
              onClick={() => {
                const newName = prompt("Name:", customer.Name);
                const newEmail = prompt("Email:", customer.Email);
                if (newName && newEmail) {
                updateCustomer(customer.Id, newName, newEmail);
                }
              }}
              >
              Edit
              </button>
            </li>
            ))}
          </ul>

          <h2>Search Customer</h2>
          <form
            onSubmit={(e) => {
            e.preventDefault();
            const searchTerm = e.target.search.value;
            const result = searchCustomer(searchTerm);
            if (result) {
              alert(`Found: ${result.Name} (${result.Email})`);
            } else {
              alert("Not found.");
            }
            e.target.reset();
          }}
        >
          <input type="text" name="search" placeholder="Search by Name or Email" required />
          <button type="submit">Search</button>
        </form>

    </>
  )
}

export default App
