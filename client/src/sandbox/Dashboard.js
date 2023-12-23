import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Stats from './Stats';
import Table from './Table';
import Calendar from './Calendar';
import List from './List';

function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          {/* Stats Section */}
          <Stats />

          {/* Table Section */}
          <Table />
        </main>
      </div>

      {/* Right Side */}
      <div className="w-1/4 bg-white overflow-y-auto">
        {/* Calendar */}
        <Calendar />

        {/* List */}
        <List />
      </div>
    </div>
  );
}

export default Dashboard;
