import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [filterdata, setFilterData] = useState('');
  const [order, setOrder] = useState('ase');

  // Fetching the data
  async function fetchData() {
    try {
      let response = await axios.get('https://fakestoreapi.com/products');
      setData(response.data);
    } catch (error) {
      console.log('error', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Filtering and sorting the data
  const fiterthedata = data
    .filter((item) =>
      item.category.toLowerCase().includes(filterdata.toLowerCase())
    )
    .sort((a, b) => {
      if (order === 'ase') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

  // Handle sorting
  const handleSorting = (value) => {
    setOrder(value);
  };

  return (
    <div>
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <input
          value={filterdata}
          placeholder="Enter the category"
          onChange={(e) => setFilterData(e.target.value)}
        />
        <select onChange={(e) => handleSorting(e.target.value)}>
          <option>Select</option>
          <option value="ase">Low to High</option>
          <option value="dse">High to Low</option>
        </select>
      </div>
      <div className="container">
        {fiterthedata.map((item) => (
          <div key={item.id} className="items">
            <img src={item.image} alt={item.title} />
            <h3>Title: {item.title}</h3>
            <p>Description: {item.description}</p>
            <p>Category: {item.category}</p>
            <p>Price: ${item.price.toFixed(2)}</p>
            <p>Rate: {item.rating.rate}</p>
            <p>Count: {item.rating.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
