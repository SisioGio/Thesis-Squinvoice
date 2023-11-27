import { useEffect, useState } from "react";
import CompanyForm from "./companyForm";
import apiService from "../services/apiService";
import PersonalData from "./personalData";
import "./../style/account.css";
function Account() {
  const [companies, setCompanies] = useState([]);
  const [newForm, setNewForm] = useState(false);
  const getCompanies = async () => {
    try {
      const userId = apiService.getUser().id;
      var res = await apiService.getCompanies(userId);

      setCompanies(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    // alert("Getting companies");
    getCompanies();
  }, []);
  return (
    <div className="container-fluid border mx-auto  account d-flex justify-content-center ">
      <div className="col-12 col-sm-10 col-md-8 col-xl-6">
        {/* <PersonalData /> */}
        {/* Companies data */}
        {/* <div className="py-2 companies"> */}
        {/* <div className="d-flex justify-content-between">
          <h3>Companies</h3>

          <a href="#" className="btn" onClick={() => setNewForm(!newForm)}>
            {newForm ? "Close Company Form" : "New Company"}
          </a>
        </div>
        {newForm && <CompanyForm getCompanies={getCompanies} company={null} />}
        <div className="company-list">
          {/* Single company data */}
        {companies.map((company) => {
          return (
            <CompanyForm
              setCompanies={setCompanies}
              getCompanies={getCompanies}
              company={company}
            />
          );
        })}

        {/* End of single company data */}
        {/* </div> */}
        {/* </div> */}
        {/* End of companies data */}
      </div>
    </div>
  );
}

export default Account;
