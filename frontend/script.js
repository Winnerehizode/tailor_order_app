document.getElementById('orderForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const order = {
    name: document.getElementById('name').value,
    phone: document.getElementById('phone').value,
    measurements: {
      bust: document.getElementById('bust').value,
      waist: document.getElementById('waist').value,
      hips: document.getElementById('hips').value,
      length: document.getElementById('length').value,
      sleeve: document.getElementById('sleeve').value,
    },
    design: document.getElementById('design').value
  };

  try {
    const response = await fetch('https://smart-fit-rexp.onrender.com/orders',
      {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    });

    if (response.ok) {
      alert('Order submitted successfully!');
      document.getElementById('orderForm').reset();
    } else {
      alert('Server error. Try again later.');
    }
  } catch (error) {
    console.error(error);
    alert('Network error. Please try again.');
  }
});
