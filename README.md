# StockFlow Low-Stock Alerts API

## Overview
Simple Express.js API that returns low-stock alerts for inventory management.

## Business Rules
- Alerts only for products below threshold
- Only products with recent sales activity
- Filters by company and warehouse
- Includes supplier info for reordering

## Setup
```bash
npm init -y
npm install express
```

## Run
```bash
node server.js
```

## Test Endpoint
```bash
# Get alerts for company 1
GET http://localhost:3000/api/companies/1/alerts/low-stock

# No alerts (different company)
GET http://localhost:3000/api/companies/2/alerts/low-stock
```

## Response Format
```json
{
  "alerts": [
    {
      "product_id": 101,
      "product_name": "Widget A",
      "sku": "WID-001",
      "warehouse_id": 1,
      "warehouse_name": "Main Warehouse",
      "current_stock": 5,
      "threshold": 20,
      "days_until_stockout": 12,
      "supplier": {
        "id": 201,
        "name": "Supplier Corp",
        "contact_email": "orders@supplier.com"
      }
    }
  ],
  "total_alerts": 1
}
```
## Tesing with Postman

### Test Case 1: Valid Alert (Company 1)
**Request:**
```
GET http://localhost:3000/api/companies/1/alerts/low-stock
```
**Response:** 1 alert returned (Widget A is low stock)

## Implementation Notes
- Static data for demonstration
- Checks: company match, recent sales, stock < threshold
- Ready for database integration
