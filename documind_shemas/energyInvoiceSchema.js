const energyInvoiceSchema = [
    {
      name: "supplier",
      type: "string",
      description: "Name of the energy supplier company"
    },
    {
      name: "invoiceDate",
      type: "string",
      description: "Date when the invoice was issued"
    },
    {
      name: "billingPeriod",
      type: "object",
      description: "Start and end date of the billing period",
      children: [
        { name: "startDate", type: "string", description: "Billing start date" },
        { name: "endDate", type: "string", description: "Billing end date" }
      ]
    },
    {
      name: "contractDetails",
      type: "object",
      description: "Details about the contracted power and tariff",
      children: [
        { name: "contractedPower", type: "string", description: "Contracted power in kVA" },
        { name: "tariffType", type: "string", description: "Type of tariff (e.g., Simple, Bi-hourly)" }
      ]
    },
    {
      name: "energyConsumption",
      type: "object",
      description: "Electricity consumption and cost details",
      children: [
        { name: "totalConsumption", type: "number", description: "Total energy consumed in kWh" },
        { name: "pricePerKwh", type: "number", description: "Cost per kWh in Euros" },
        { name: "energyCharge", type: "number", description: "Total energy cost excluding network charges and taxes" }
      ]
    },
    {
      name: "networkCharges",
      type: "object",
      description: "Network charges details",
      children: [
        { name: "powerAccessCharge", type: "number", description: "Fixed network access charge" },
        { name: "energyAccessCharge", type: "number", description: "Variable network access charge" }
      ]
    },
    {
      name: "taxesAndFees",
      type: "object",
      description: "Taxes and additional fees",
      children: [
        { name: "electricityConsumptionTax", type: "number", description: "IEC tax amount" },
        { name: "dgegFee", type: "number", description: "DGEG regulatory fee" },
        { name: "audiovisualTax", type: "number", description: "Contribution to audiovisual" }
      ]
    },
    {
      name: "totals",
      type: "object",
      description: "Invoice financial summary",
      children: [
        { name: "subtotalPreTax", type: "number", description: "Subtotal before VAT" },
        { name: "vatAmount", type: "number", description: "VAT amount" },
        { name: "totalAmountDue", type: "number", description: "Final amount due including VAT" }
      ]
    },
    {
      name: "paymentInfo",
      type: "object",
      description: "Payment information",
      children: [
        { name: "paymentDueDate", type: "string", description: "Due date for payment" },
        { name: "paymentMethod", type: "string", description: "Method of payment (e.g., debit)" }
      ]
    }
  ];

  export default energyInvoiceSchema;
  