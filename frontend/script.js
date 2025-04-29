async function fetchOrders() {
  const container = document.getElementById('ordersContainer');
  // Show a loading state
  container.innerHTML = '<p>Loading orders…</p>';

  try {
    const response = await fetch('https://smart-fit-rexp.onrender.com/orders');
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const orders = await response.json();
    container.innerHTML = '';  // Clear loading text

    if (!orders.length) {
      container.innerHTML = '<p>No orders found.</p>';
      return;
    }

    orders.forEach(order => {
      const card = document.createElement('div');
      card.classList.add('order-card');  // define this in CSS

      card.innerHTML = `
        <h3>${order.name}</h3>
        <p><strong>Phone:</strong> ${order.phone}</p>
        <p><strong>Design:</strong> ${order.design}</p>
        <p><strong>Measurements:</strong></p>
        <ul class="measurements-list">  <!-- define styling in CSS -->
          <li>Bust: ${order.bust || 'N/A'}</li>
          <li>Waist: ${order.waist || 'N/A'}</li>
          <li>Hips: ${order.hips || 'N/A'}</li>
          <li>Length: ${order.length || 'N/A'}</li>
          <li>Sleeve: ${order.sleeve || 'N/A'}</li>
        </ul>
      `;

      container.appendChild(card);
    });

  } catch (err) {
    console.error('Failed to fetch orders:', err);
    container.innerHTML = '<p class="error">Unable to load orders. Please try again later.</p>';
  }
}

// Only run fetchOrders on the orders page
if (window.location.pathname.endsWith('orders.html')) {
  document.addEventListener('DOMContentLoaded', fetchOrders);
}
