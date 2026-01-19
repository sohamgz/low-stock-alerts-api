const express = require('express');
const app = express();
app.use(express.json());

// Product Data
const warehouse = { id: 1, name: 'Main Warehouse', company_id: 1 };

const product = { 
  id: 101, 
  name: 'Widget A', 
  sku: 'WID-001', 
  low_stock_threshold: 20, 
  supplier: { id: 201, name: 'Supplier Corp', contact_email: 'orders@supplier.com' } 
};

const inventory = { product_id: 101, warehouse_id: 1, quantity: 5, recent_sales: true };

//Low-stock Alerts Endpoint
app.get('/api/companies/:company_id/alerts/low-stock', (req, res) => {
  const company_id = parseInt(req.params.company_id);

  // Only return alert if warehouse belongs to company & product has recent sales & is low-stock
  if (company_id === warehouse.company_id && inventory.recent_sales && inventory.quantity < product.low_stock_threshold) {
    const alert = {
      product_id: product.id,
      product_name: product.name,
      sku: product.sku,
      warehouse_id: warehouse.id,
      warehouse_name: warehouse.name,
      current_stock: inventory.quantity,
      threshold: product.low_stock_threshold,
      days_until_stockout: 12,
      supplier: product.supplier
    };

    res.json({ alerts: [alert], total_alerts: 1 });
  } else {
    res.json({ alerts: [], total_alerts: 0 });
  }
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
