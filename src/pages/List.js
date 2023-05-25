import { useState, useEffect } from "react";
import axios from "axios";

function List() {
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [showData, setShowData] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/users");
      setUserData(res.data);
      setFilteredData(res.data);
      setShowData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRadioChange = (e) => {
    let tempUserData = [];

    if (e.target.value === "true") {
      tempUserData = userData.filter((i) => {
        return i.native === "true";
      });
      setFilteredData(tempUserData);
    } else if (e.target.value === "false") {
      tempUserData = userData.filter((i) => {
        return i.native === "false";
      });
      setFilteredData(tempUserData);
    } else {
      setFilteredData(userData);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setShowData(filteredData);
    let tempData = filteredData.filter((i) => {
      return i.name.toLowerCase().includes(search.toLowerCase());
    });

    setShowData(tempData);
  }, [search, filteredData]);

  return (
    <div>
      <h1 className="text-center mb-3">User List</h1>
      <div className="row d-flex justify-content-between">
        <fieldset className="col-6 row mb-3">
          <legend className="col-form-label col-sm-2 pt-0">Native</legend>
          <div className="col-sm-10 d-flex">
            <div className="form-check mx-3">
              <input
                className="form-check-input"
                type="radio"
                name="native"
                id="allNative"
                value="all"
                onChange={handleRadioChange}
                defaultChecked
              />
              <label className="form-check-label" htmlFor="allNative">
                All
              </label>
            </div>
            <div className="form-check mx-3">
              <input
                className="form-check-input"
                type="radio"
                name="native"
                id="isNative"
                value="true"
                onChange={handleRadioChange}
              />
              <label className="form-check-label" htmlFor="isNative">
                Yes
              </label>
            </div>
            <div className="form-check mx-3">
              <input
                className="form-check-input"
                type="radio"
                name="native"
                id="isNotNative"
                value="false"
                onChange={handleRadioChange}
              />
              <label className="form-check-label" htmlFor="isNotNative">
                No
              </label>
            </div>
          </div>
        </fieldset>
        <div className="col-6 row">
          <input
            type="text"
            className="col-6 ms-auto rounded"
            id="search"
            name="search"
            placeholder="Search"
            value={search}
            onChange={handleSearchChange}
            required
          />
        </div>
      </div>
      <table className="table mt-5">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Birthday</th>
            <th scope="col">Native</th>
            <th scope="col">Age</th>
            <th scope="col">Address</th>
          </tr>
        </thead>
        <tbody>
          {showData.map((i) => {
            return (
              <tr key={i.id}>
                <td>{i.name}</td>
                <td>{i.birthday}</td>
                <td>{i.native === "true" ? "Yes" : "No"}</td>
                <td>{i.age}</td>
                <td>{i.address}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default List;
