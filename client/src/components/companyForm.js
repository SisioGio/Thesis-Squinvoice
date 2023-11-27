import { useEffect, useState } from "react";
import apiService from "../services/apiService";
import { Link } from "react-router-dom";

function CompanyForm({ company, getCompanies }) {
  const [edit, setEdit] = useState(company ? false : true);
  const [data, setData] = useState({
    id: company?.id ?? "",
    name: company?.name ?? "",
    identificator: company?.identificator ?? "",
    country: company?.address?.country ?? "",
    postcode: company?.address?.postcode ?? "",
    city: company?.address?.city ?? "",
    street: company?.address?.street ?? "",
    streetNo: company?.address?.streetNo ?? "",
    addressId: company?.address?.id ?? "",
    token: company?.token ?? "",
  });

  function handleChange(event) {
    const { value, name } = event.target;

    setData((prevNote) => ({
      ...prevNote,

      [name]: value,
    }));
  }
  const submitForm = async (event) => {
    event.preventDefault();
    delete data.token;

    try {
      data.userId = apiService.getUser().id;
      if (company) {
        await apiService.updateCompany(data);
        setEdit(false);

        console.log("Success");
      } else {
        delete data.addressId;
        delete data.id;
        await apiService.createCompany(data);
        console.log("Success");
      }

      getCompanies();
    } catch (err) {
      console.log(err);
    }
  };

  const generateAccessToken = async (event) => {
    event.preventDefault();

    try {
      const companyId = company.id;

      await apiService.generateAccessTokenForCompany(companyId);
      console.log("Success");

      getCompanies();
    } catch (err) {
      console.log(err);
    }
  };
  const copyAccessToken = async (event) => {
    event.preventDefault();
    navigator.clipboard
      .writeText(company.token)
      .then(() => {
        alert("Text copied to clipboard!");
      })
      .catch((err) => {
        console.error("Unable to copy to clipboard: ", err);
      });
  };
  useEffect(() => {}, [edit]);
  useEffect(() => {
    console.log("COMPANY CHANGED!");
    console.log(company);
    setData({
      id: company?.id ?? "",
      name: company?.name ?? "",
      identificator: company?.identificator ?? "",
      country: company?.address?.country ?? "",
      postcode: company?.address?.postcode ?? "",
      city: company?.address?.city ?? "",
      street: company?.address?.street ?? "",
      streetNo: company?.address?.streetNo ?? "",
      addressId: company?.address?.id ?? "",
      token: company?.token ?? "",
    });
  }, [company]);
  return (
    <form className=" p-3 rounded my-2">
      <h3 className="text-center">New Company</h3>
      <div class="row py-2">
        <div class="col-12 col-sm-6">
          <label for="exampleInputEmail1">Name</label>
          <input
            disabled={!edit}
            onChange={handleChange}
            value={data.name}
            name="name"
            type="text"
            class="form-control"
            placeholder="Company Name"
          ></input>
        </div>
        <div class="col-12 col-sm-6">
          <label for="exampleInputEmail1">Identificator</label>
          <input
            disabled={!edit}
            onChange={handleChange}
            value={data.identificator}
            name="identificator"
            type="text"
            class="form-control"
            placeholder="Identificator"
          ></input>
        </div>
      </div>

      <div class="row py-2">
        <div class="col-8 col-sm-6">
          <label for="exampleInputEmail1">Country</label>
          <input
            disabled={!edit}
            onChange={handleChange}
            value={data.country}
            name="country"
            type="text"
            class="form-control"
            placeholder="Country"
          ></input>
        </div>

        <div class="col-4 col-sm-6">
          <label for="exampleInputEmail1">Post Code</label>
          <input
            disabled={!edit}
            onChange={handleChange}
            value={data.postcode}
            name="postcode"
            type="text"
            class="form-control"
            placeholder="Post Code"
          ></input>
        </div>
        <div class="col-12 col-sm-6">
          <label for="exampleInputEmail1">City</label>
          <input
            disabled={!edit}
            onChange={handleChange}
            value={data.city}
            name="city"
            type="text"
            class="form-control"
            placeholder="City"
          ></input>
        </div>

        <div class="col-8 col-sm-6">
          <label for="exampleInputEmail1">Street</label>
          <input
            disabled={!edit}
            onChange={handleChange}
            value={data.street}
            name="street"
            type="text"
            class="form-control"
            placeholder="Street"
          ></input>
        </div>

        <div class="col-4 col-sm-6">
          <label for="exampleInputEmail1">Street No.</label>
          <input
            disabled={!edit}
            onChange={handleChange}
            value={data.streetNo}
            name="streetNo"
            type="text"
            class="form-control"
            placeholder="Street No."
          ></input>
        </div>
      </div>

      <div className="row py-2 d-flex justify-content-between">
        {company ? (
          <div className="col">
            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <div className="d-flex">
                  <a
                    className="btn btn-warning mr-2 text-white"
                    onClick={(event) => generateAccessToken(event)}
                  >
                    Generate Access Token
                  </a>
                  <a
                    className="btn btn-success w-25 mr-2 text-white"
                    onClick={(event) => copyAccessToken(event)}
                  >
                    Copy
                  </a>
                </div>
              </div>

              <input
                type="password"
                value={data.token ?? ""}
                class="form-control"
                id="inlineFormInputGroup"
                placeholder="Access Token"
              ></input>

              <Link
                to={`/invoices?company=${company.id}`}
                className="btn btn-warning mx-2 text-white"
              >
                Invoices
              </Link>
            </div>
          </div>
        ) : (
          <span className="col">
            Before genering a token, the company must be created
          </span>
        )}
        <div className="col d-flex justify-content-end">
          {edit ? (
            <button
              className="btn btn-success "
              onClick={(event) => submitForm(event)}
            >
              Submit
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-info "
              onClick={(event) => (event.preventDefault(), setEdit(true))}
            >
              Update
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

export default CompanyForm;
