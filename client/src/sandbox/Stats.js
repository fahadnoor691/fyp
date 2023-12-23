import React from 'react';

function Stats() {
  // Sample data
  const statsData = [
    { label: 'Users', value: 100 },
    { label: 'Orders', value: 500 },
    { label: 'Revenue', value: '$10,000' },
  ];

  return (
    <section className="bg-white p-4">
      <h2>Stats</h2>
      <ul>
        {statsData.map((item, index) => (
          <li key={index}>
            <strong>{item.label}:</strong> {item.value}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Stats;