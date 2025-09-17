import React, { useState, useEffect } from 'react';
import "../Components/Component_css/Dashboard.css";
import { format } from 'date-fns';
import DashIcon from "../images/dashboard.png";
import dasboardusers from "../images/dasboard-users.png";
import dasboardsales from "../images/dasboard-sales.png";

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        totalUsers: 0,
        totalSales: 0,
        activeUsers: 0,
    });

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchSalesData = async () => {
            const loggedInEmail = localStorage.getItem('loggedInEmail');
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/sales-table/provider?email=${loggedInEmail}`, {
                    credentials: "include" // if your backend uses sessions or cookies
                  });                  
                const sales = await response.json();
                console.log(sales);
                
                // Sum serviceCost and count
                const totalSales = sales.reduce((sum, item) => sum + (item.serviceCost || 0), 0);
                const totalEntries = sales.length;
    
                setDashboardData(prev => ({
                    ...prev,
                    totalSales,
                    activeUsers: totalEntries // assuming activeUsers == entries for now
                }));
    
                // Optional: convert to order format if needed
                const formattedOrders = sales.map((item, index) => ({
                    orderId: `#${1 + index}`,
                    orderDate: item.joiningdate ? format(new Date(item.joiningdate), 'dd-MM-yyyy') :'N/A',
                    customerName: item.name,
                    customerEmail: item.loggedInEmail,
                    status: 'Successful',
                    amount: item.serviceCost,
                }));
    
                setOrders(formattedOrders);
            } catch (err) {
                console.error("Error fetching sales data", err);
            }
        };
    
        fetchSalesData();
    }, []);
    

    return (
        <div className='dashboard-container' style={{ marginTop: "9vh" }}>
            <div className="dashboard-header">
                {/* <img src={DashIcon} alt="Dashboard Icon" /> */}
                <h2>Dashboard Overview</h2>
            </div>

            <div className="cards-container">
                <div className="card">
                    <div className="partition">
                        <h3>Total Users</h3>
                        <img className="total-users" src={dasboardusers} alt='Users Icon' />
                    </div>

                    <p>Active Users: {dashboardData.activeUsers}</p>
                    <div className='growth'>
                        <span>+10%</span>
                        <span>Last Month</span>
                    </div>
                </div>

                <div className="card">
                    <div className="partition">
                        <h3>Total Sales</h3>
                        <img src={dasboardsales} alt='Sales Icon' />
                    </div>

                    <p>Total Sales: ₹{dashboardData.totalSales}</p>
                    <div className='growth'>
                        <span>+18%</span>
                        <span>Last Month</span>
                    </div>
                </div>
            </div>

            <div className='order-details'>
                <h3>Order Details</h3>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Order Id</th>
                            <th>Order Date</th>
                            <th>Customer Name</th>
                            <th>Customer Email</th>
                            <th>Payment Status</th>
                            <th>Payment Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={index}>
                                <td>{order.orderId}</td>
                                <td>{order.orderDate}</td>
                                <td>{order.customerName}</td>
                                <td>{order.customerEmail}</td>
                                <td>{order.status}</td>
                                <td>{order.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
