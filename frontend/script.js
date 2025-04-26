document.getElementById("orderForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
      fullName: document.getElementById("fullName").value,
      phone:    document.getElementById("phone").value,
      style:    document.getElementById("style").value,
      measurements: document.getElementById("measurements").value,
      dueDate:  document.getElementById("dueDate").value
    };
    try {
      const res = await fetch("http://localhost:5000/submit-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (res.ok) {
        document.getElementById("message").textContent =
          `Thanks, ${result.order.fullName}! Your order is received.`;
        document.getElementById("orderForm").reset();
      } else {
        document.getElementById("message").textContent = result.error;
      }
    } catch (err) {
      document.getElementById("message").textContent =
        "Server error. Try again later.";
    }
});
