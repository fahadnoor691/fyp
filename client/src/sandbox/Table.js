import React from 'react';

function Table() {
  // Sample data
  const tableData = [
    { id: 1, name: 'Item 1', price: '$10' },
    { id: 2, name: 'Item 2', price: '$15' },
    { id: 3, name: 'Item 3', price: '$20' },
  ];

  return (
    <section className="bg-white p-4 mt-4">
      <h2>Table</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Table;