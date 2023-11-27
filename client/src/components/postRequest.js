const postRequestExample = {
  vendorName: "String: Vendor name",
  vendorIdentificator: "String: A unique value used to identify the vendor",
  type: "CREDIT NOTE | INVOICE", // CREDIT NOTE or INVOICE
  documentNo: "Document Number", // String
  documentDate: "Document date YYYY.MM.DD", // Date
  dueDate: "Due date YYYY.MM.DD", // Date
  netAmount: "Float", // Float
  taxAmount: "Float", // Float
  totalAmount: "Float", // Float
  freightCharge: "Float", // Float
  priceRounding: "Float", // Float
  purchaseOrder: "Purchase Order Number",
  deliveryNote: "Delivery note number",
  shippingAddress: {
    country: "String",
    city: "String",
    street: "String",
    streetNo: "String",
    postcode: "String",
  },
  lineItems: [
    {
      articleCode: "Article code",
      description: "Article description",
      purchaseOrder: "Purchase order line item",
      deliveryNote: "Delivery note line item",
      unitOfMeasure: "Unite of measure",
      quantity: "Float", // Float
      netAmount: "Float", // Float
      taxAmount: "Float", // Float
      totalAmount: "Float", // Float
      taxPercentage: "Float", // Float
      unitPrice: "Float", // Float
    },
  ],

  taxLines: [
    {
      taxDescription: "Tax code description",
      taxPercentage: "Float",
      netAmount: "Float",
      taxAmount: "Float",
    },
  ],
};

export default postRequestExample;
