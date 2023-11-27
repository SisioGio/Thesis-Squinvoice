import { useEffect, useState } from "react";
import apiService from "../services/apiService";

function PersonalData() {
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState({
    id: "",
    name: "",
    surname: "",
    email: "",
    password: "",
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

    try {
      const res = await apiService.updateUser(data);

      apiService.setUser(res.data);
      setEdit(false);

      console.log("Success");

      setEdit(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const userData = apiService.getUser();
    setData({
      id: userData.id,
      name: userData.name,
      surname: userData.surname,
      email: userData.email,
      password: userData.password,
    });
  }, []);

  return (
    <div className="text-white  rounded">
      <div className="d-flex justify-content-between">
        <h3 className="text-start  ">Personal Data</h3>

        <a href="#" className="btn " onClick={() => setEdit(!edit)}>
          {!edit ? "Show Personal  Data" : "Close"}
        </a>
      </div>
      {edit && (
        <div className="form ">
          <div className="d-flex py-2   flex-gap justify-content-between">
            <div className="col-12 col-sm-5 d-flex flex-column ">
              <label for="exampleInputEmail1">Name</label>

              <input
                class=""
                type="text"
                disabled={!edit}
                onChange={handleChange}
                value={data.name}
                name="name"
              />
            </div>

            <div className="col-12 col-sm-5  d-flex flex-column ">
              <label for="exampleInputEmail1">Surname</label>

              <input
                class=""
                type="text"
                disabled={!edit}
                onChange={handleChange}
                value={data.surname}
                name="surname"
              />
            </div>

            <div className="col-12 col-sm-5  d-flex flex-column ">
              <label for="exampleInputEmail1">Email</label>
              <input
                class=""
                type="email"
                disabled={!edit}
                onChange={handleChange}
                value={data.email}
                name="email"
              />
            </div>

            <div className="col-12 col-sm-5  d-flex flex-column ">
              <label for="exampleInputEmail1">Password</label>
              <input
                class=""
                type="password"
                disabled={!edit}
                onChange={handleChange}
                value={data.password}
                name="password"
              />
            </div>
          </div>
          <div className="d-flex justify-content-end">
            {edit ? (
              <button
                className="btn btn-success py-2"
                onClick={(event) => submitForm(event)}
              >
                Save
              </button>
            ) : (
              <button
                className="btn btn-info py-2"
                onClick={() => setEdit(true)}
              >
                Update
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default PersonalData;
