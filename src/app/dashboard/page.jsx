// pages/dashboard.jsx

"use client";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Dashboard Content */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside className="w-64 bg-base-200">
          <ul className="menu p-4 overflow-y-auto w-full text-base-content">
            <li>
              <a className="font-bold">Dashboard</a>
            </li>
            <li>
              <a>Appointment</a>
            </li>
            <li>
              <a>Notification</a>
            </li>
            <li>
              <a className="bg-blue-500 text-white">Order Lists</a>
            </li>
            <li>
              <a>Reports</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-grow p-6 bg-base-100">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Order Lists</h2>
            <button className="btn btn-outline">Reset Filter</button>
          </div>

          {/* Filters */}
          <div className="flex space-x-4 my-4">
            <select className="select select-bordered">
              <option>Filter By</option>
              <option>14 Feb 2019</option>
            </select>
            <select className="select select-bordered">
              <option>Order Type</option>
            </select>
            <select className="select select-bordered">
              <option>Order Status</option>
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table w-full">
              {/* Head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Rentals/Tour</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {/* Order Rows */}
                {orders.map((order) => (
                  <tr key={order.id}>
                    <span>
                      <th>
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </th>
                    </span>
                    <td>{order.name}</td>
                    <td>{order.address}</td>
                    <td>{order.date}</td>
                    <td>{order.type}</td>
                    <td>
                      <span
                        className={`badge ${
                          order.status === "Completed"
                            ? "badge-success"
                            : order.status === "Processing"
                            ? "badge-warning"
                            : "badge-error"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

// Sample data for the table
const orders = [
  {
    id: "00001",
    name: "Christine Brooks",
    address: "089 Kutch Green Apt. 448",
    date: "14 Feb 2019",
    type: "Electric",
    status: "Completed",
  },
  {
    id: "00002",
    name: "Rosie Pearson",
    address: "979 Immanuel Ferry Suite 526",
    date: "14 Feb 2019",
    type: "Book",
    status: "Processing",
  },
  {
    id: "00003",
    name: "Darrell Caldwell",
    address: "8587 Frida Ports",
    date: "14 Feb 2019",
    type: "Medicine",
    status: "Rejected",
  },
  {
    id: "00004",
    name: "Gilbert Johnston",
    address: "768 Destiny Lake Suite 600",
    date: "14 Feb 2019",
    type: "Mobile",
    status: "Completed",
  },
  {
    id: "00005",
    name: "Alan Cain",
    address: "042 Mylene Throughway",
    date: "14 Feb 2019",
    type: "Watch",
    status: "Processing",
  },
  {
    id: "00006",
    name: "Alfred Murray",
    address: "543 Weinmann Mountain",
    date: "14 Feb 2019",
    type: "Medicine",
    status: "Completed",
  },
];

export default Dashboard;
