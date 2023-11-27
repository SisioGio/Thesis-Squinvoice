import { useState } from "react";

function InvoiceLine({ invoice, index }) {
  const [showLines, setShowLines] = useState(false);
  const [showTaxLines, setShowTaxLines] = useState(false);
  return (
    <tr className="position-relative">
      <th scope="row">{index}</th>
      <td>{invoice.type}</td>
      <td>{invoice.vendor.name}</td>
      <td>{invoice.customer.name}</td>
      <td>{invoice.documentDate}</td>
      <td>{invoice.documentNo}</td>
      <td>{invoice.dueDate}</td>
      <td>{invoice.netAmount}</td>
      <td>{invoice.freightCharge}</td>
      <td>{invoice.taxAmount}</td>
      <td>{invoice.priceRounding}</td>
      <td>{invoice.totalAmount}</td>
      <td>{invoice.deliveryNote}</td>
      <td>{invoice.purchaseOrder}</td>
      <td>
        <a
          href="#"
          onClick={() => (setShowTaxLines(false), setShowLines(!showLines))}
        >
          {invoice.invoiceLines.length}
        </a>
      </td>
      <td>
        <a
          href="#"
          onClick={() => (setShowLines(false), setShowTaxLines(!showTaxLines))}
        >
          {invoice.taxLines.length}
        </a>
      </td>

      {showLines ? (
        <div className="lineItems">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Description</th>
                <th scope="col">Article Code</th>

                <th scope="col">Purchase Order</th>
                <th scope="col">Delivery Note</th>
                <th scope="col">Quantity</th>
                <th scope="col">Unit of Measure</th>
                <th scope="col">Unit Price</th>
                <th scope="col">Net Amount</th>
                <th scope="col">Tax Rate</th>
                <th scope="col">Tax Amount</th>

                <th scope="col">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.invoiceLines.map((line, index) => {
                return (
                  <tr>
                    <th scope="row">{index}</th>
                    <td>{line.description}</td>
                    <td>{line.articleCode}</td>
                    <td>{line.purchaseOrder}</td>
                    <td>{line.deliveryNote}</td>

                    <td>{line.quantity}</td>
                    <td>{line.unitOfMeasure}</td>
                    <td>{line.unitPrice}</td>
                    <td>{line.netAmount}</td>
                    <td>{line.taxPercentage}</td>
                    <td>{line.taxAmount}</td>
                    <td>{line.totalAmount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}

      {showTaxLines ? (
        <div className="lineItems">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Description</th>
                <th scope="col">Net Amount</th>
                <th scope="col">Tax Rate</th>
                <th scope="col">Tax Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.taxLines.map((line, index) => {
                return (
                  <tr>
                    <th scope="row">{index}</th>
                    <td>{line.taxDescription}</td>
                    <td>{line.netAmount}</td>
                    <td>{line.taxPercentage}</td>
                    <td>{line.taxAmount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}
    </tr>
  );
}

export default InvoiceLine;
