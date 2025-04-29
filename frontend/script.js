async function fetchOrders() {
  try {
    const response = await fetch('https://smart-fit-rexp.onrender.com/orders');
    const orders = await response.json();

    const ordersContainer = document.getElementById('ordersContainer');
    ordersContainer.innerHTML = '';

    if (orders.length === 0) {
      ordersContainer.innerHTML = '<p>No orders found.</p>';
      return;
    }

    orders.forEach(order => {
      const div = document.createElement('div');
      div.className = 'order';

      div.innerHTML = `
        <h3>${order.name}</h3>
        <p><strong>Phone:</strong> ${order.phone}</p>
        <p><strong>Design:</strong> ${order.design}</p>
        <p><strong>Measurements:</strong></p>
        <ul>
          <li>Bust: ${order.bust || order.measurements?.bust || 'N/A'}</li>
          <li>Waist: ${order.waist || order.measurements?.waist || 'N/A'}</li>
          <li>Hips: ${order.hips || order.measurements?.hips || 'N/A'}</li>
          <li>Length: ${order.length || order.measurements?.length || 'N/A'}</li>
          <li>Sleeve: ${order.sleeve || order.measurements?.sleeve || 'N/A'}</li>
        </ul>
      `;

      ordersContainer.appendChild(div);
    });
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    const ordersContainer = document.getElementById('ordersContainer');
    ordersContainer.innerHTML = '<p style="color: red;">Unable to load orders, please try again later.</p>';
  }
}

// Only run fetchOrders if we're on the orders page
if (window.location.pathname.includes('orders.html')) {
  document.addEventListener('DOMContentLoaded', fetchOrders);
}

