import { useState } from "react";
import { useLocation } from "react-router-dom";
import apiService from "../services/apiService";
import InvoiceLine from "./invoiceLine";

function Invoices() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const companyId = params.get("company");
  const [purchaseInvoices, setPurchaseInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [filters, setFilters] = useState({});

  const [showFilters, setShowFilters] = useState(false);
  const getPurchaseInvoices = async () => {
    try {
      var res = await apiService.getPurchaseInvoices(companyId);

      setPurchaseInvoices(res.data);
      setFilteredInvoices(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const filterData = (event) => {
    console.log(event.target.name);
    const filter_value = event.target.value;
    const filter_name = event.target.name;
    const filter_type = event.target.type;
    if (filter_type == "number") {
      console.log(event.target.attributes.amounttype.value);
    }
    if (filter_type == "number") {
      var amountType = event.target.attributes.amounttype.value;
      filters[filter_name] = {};
      filters[filter_name][amountType] = filter_value;
    } else if (filter_type == "date") {
      var dateType = event.target.attributes.datetype.value;
      filters[filter_name] = {};
      filters[filter_name][dateType] = filter_value;
    } else {
      filters[filter_name] = filter_value;
    }

    var output = purchaseInvoices;

    for (const [key, value] of Object.entries(filters)) {
      if (key == "vendor" || key == "customer") {
        output = output.filter((row) =>
          row[key]["name"].toUpperCase().includes(value.toUpperCase())
        );
      } else if (
        key == "netAmount" ||
        key == "freightCharge" ||
        key == "priceRounding" ||
        key == "taxAmount" ||
        key == "totalAmount"
      ) {
        for (const [rangeKey, rangeValue] of Object.entries(value)) {
          if (rangeKey == "min" && rangeValue != "") {
            output = output.filter(
              (row) => Number(row[key]) > Number(rangeValue)
            );
          } else if (rangeKey == "max" && rangeValue != "") {
            output = output.filter(
              (row) => Number(row[key]) < Number(rangeValue)
            );
          }
        }
        console.log(value);
      } else if (key == "documentDate" || key == "dueDate") {
        for (const [rangeKey, rangeValue] of Object.entries(value)) {
          if (rangeKey == "from" && rangeValue != "") {
            output = output.filter(
              (row) => new Date(row[key]) > new Date(rangeValue)
            );
          } else if (rangeKey == "to" && rangeValue != "") {
            output = output.filter(
              (row) => new Date(row[key]) < new Date(rangeValue)
            );
          }
        }
        console.log(value);
      } else {
        output = output.filter((row) =>
          row[key].toUpperCase().includes(value.toUpperCase())
        );
      }
    }

    setFilteredInvoices(output);
  };
  useState(() => {
    getPurchaseInvoices();
  }, []);
  return (
    <div>
      <div className="purchase-invoices">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">
                <a href="#" onClick={() => setShowFilters(!showFilters)}>
                  Filters
                </a>
              </th>
              <th scope="col">
                Type
                {showFilters && (
                  <input
                    type="text"
                    name="type"
                    className="form-control form-control-sm"
                    onChange={(event) => filterData(event)}
                  />
                )}
              </th>
              <th scope="col">
                Vendor
                {showFilters && (
                  <input
                    type="text"
                    name="vendor"
                    className="form-control form-control-sm"
                    onChange={(event) => filterData(event)}
                  />
                )}
              </th>
              <th scope="col">
                Customer
                {showFilters && (
                  <input
                    type="text"
                    name="customer"
                    className="form-control form-control-sm"
                    onChange={(event) => filterData(event)}
                  />
                )}
              </th>
              <th scope="col">
                Date
                {showFilters && (
                  <div className="d-flex">
                    <input
                      type="date"
                      name="documentDate"
                      dateType="from"
                      className="form-control form-control-sm"
                      placeholder="From"
                      onChange={(event) => filterData(event)}
                    />
                    <input
                      type="date"
                      name="documentDate"
                      dateType="to"
                      placeholder="To"
                      className="form-control form-control-sm"
                      onChange={(event) => filterData(event)}
                    />
                  </div>
                )}
              </th>
              <th scope="col">
                Document No
                {showFilters && (
                  <input
                    type="text"
                    name="documentNo"
                    className="form-control form-control-sm"
                    onChange={(event) => filterData(event)}
                  />
                )}
              </th>
              <th scope="col">
                Due Date
                {showFilters && (
                  <div className="d-flex">
                    <input
                      type="date"
                      name="dueDate"
                      dateType="from"
                      className="form-control form-control-sm"
                      placeholder="From"
                      onChange={(event) => filterData(event)}
                    />
                    <input
                      type="date"
                      name="dueDate"
                      dateType="to"
                      placeholder="To"
                      className="form-control form-control-sm"
                      onChange={(event) => filterData(event)}
                    />
                  </div>
                )}
              </th>
              <th scope="col">
                Net Amount
                {showFilters && (
                  <div className="d-flex">
                    <input
                      type="number"
                      name="netAmount"
                      amountType="min"
                      className="form-control form-control-sm"
                      placeholder="Min"
                      onChange={(event) => filterData(event)}
                    />
                    <input
                      type="number"
                      name="netAmount"
                      amountType="max"
                      placeholder="Max"
                      className="form-control form-control-sm"
                      onChange={(event) => filterData(event)}
                    />
                  </div>
                )}
              </th>
              <th scope="col">
                {" "}
                Freight Charge
                {showFilters && (
                  <div className="d-flex">
                    <input
                      type="number"
                      name="freightCharge"
                      amountType="min"
                      placeholder="Min"
                      className="form-control form-control-sm"
                      onChange={(event) => filterData(event)}
                    />
                    <input
                      type="number"
                      name="freightCharge"
                      amountType="max"
                      placeholder="Max"
                      className="form-control form-control-sm"
                      onChange={(event) => filterData(event)}
                    />
                  </div>
                )}
              </th>
              <th scope="col">
                Tax Amount
                {showFilters && (
                  <div className="d-flex">
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      name="taxAmount"
                      amountType="min"
                      placeholder="Min"
                      onChange={(event) => filterData(event)}
                    />
                    <input
                      type="number"
                      name="taxAmount"
                      className="form-control form-control-sm"
                      amountType="max"
                      placeholder="Max"
                      onChange={(event) => filterData(event)}
                    />
                  </div>
                )}
              </th>
              <th scope="col">
                Price Rounding
                {showFilters && (
                  <div className="d-flex">
                    <input
                      type="number"
                      name="priceRounding"
                      amountType="min"
                      className="form-control form-control-sm"
                      placeholder="Min"
                      onChange={(event) => filterData(event)}
                    />
                    <input
                      type="number"
                      name="priceRounding"
                      amountType="max"
                      className="form-control form-control-sm"
                      placeholder="Max"
                      onChange={(event) => filterData(event)}
                    />
                  </div>
                )}
              </th>
              <th scope="col">
                Total Amount
                {showFilters && (
                  <div className="d-flex">
                    <input
                      type="number"
                      name="totalAmount"
                      className="form-control form-control-sm"
                      amountType="min"
                      placeholder="Min"
                      onChange={(event) => filterData(event)}
                    />
                    <input
                      type="number"
                      name="totalAmount"
                      className="form-control form-control-sm"
                      amountType="max"
                      placeholder="Max"
                      onChange={(event) => filterData(event)}
                    />
                  </div>
                )}
              </th>
              <th scope="col">
                Delivery Note
                {showFilters && (
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="deliveryNote"
                    onChange={(event) => filterData(event)}
                  />
                )}
              </th>
              <th scope="col">
                PO
                {showFilters && (
                  <input
                    className="form-control form-control-sm"
                    type="text"
                    name="purchaseOrder"
                    onChange={(event) => filterData(event)}
                  />
                )}
              </th>
              <th scope="col">Line Items</th>
              <th scope="col">Tax Lines</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map((invoice, index) => {
              return <InvoiceLine invoice={invoice} index={index} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Invoices;
