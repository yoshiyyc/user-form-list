import { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

function List() {
  const [userData, setUserData] = useState([]);
  const [categorizedData, setCategorizedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [resultData, setResultData] = useState([]);

  // Pagination-related variables
  const [currentItems, setCurrentItems] = useState([]);
  const [itemsPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemOffset, setItemOffset] = useState(0); // ItemOffset is the index of the first item of the current page

  // Show data
  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/users");
      setUserData(res.data);
      setCategorizedData(res.data);
      setResultData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Filter Section
  const handleRadioChange = (e) => {
    resetPage();

    let tempUserData = [];

    if (e.target.value === "true") {
      tempUserData = userData.filter((i) => {
        return i.native === "true";
      });
      setCategorizedData(tempUserData);
    } else if (e.target.value === "false") {
      tempUserData = userData.filter((i) => {
        return i.native === "false";
      });
      setCategorizedData(tempUserData);
    } else {
      setCategorizedData(userData);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    resetPage();

    setResultData(categorizedData);

    let tempData = categorizedData.filter((i) => {
      return i.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setResultData(tempData);
  }, [searchTerm, categorizedData]);

  // Page related actions
  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % resultData.length;
    setItemOffset(newOffset);
    setCurrentPage(e.selected);
  };

  const resetPage = () => {
    setItemOffset(0);
    setCurrentPage(0);
  };

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(resultData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(resultData.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, resultData]);

  return (
    <div className="container">
      <h1 className="text-center mb-3">User List</h1>
      <div className="row d-flex flex-column flex-md-row justify-content-sm-between align-items-center">
        <fieldset className="col col-md-6 row mb-3 mb-md-0">
          <legend className="col-form-label col-sm-2 p-0">Native</legend>
          <div className="col-sm-10 d-flex">
            <div className="form-check me-3 mx-md-3">
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
        <div className="col col-md-6 row">
          <input
            type="text"
            className="col col-md-6 ms-md-auto rounded"
            id="search"
            name="search"
            placeholder="Search"
            value={searchTerm}
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
          {currentItems.map((i) => {
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
      <div className="d-flex justify-content-center my-5">
        <ReactPaginate
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="<"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          forcePage={currentPage}
        />
      </div>
    </div>
  );
}

export default List;
