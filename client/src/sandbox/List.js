import React from 'react';

function List() {
  // Sample data
  const listData = [
    'Item 1',
    'Item 2',
    'Item 3',
  ];

  return (
    <section className="bg-white p-4 mt-4">
      <h2>List</h2>
      <ul>
        {listData.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export default List;