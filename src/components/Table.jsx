import { useContext, useState } from "react";
import "./Table.css";
import { UserContext } from "../context/UserContext";

export const Table = ({ setSelectedUser, isVisible, setIsVisible }) => {
  const { users, deleteUser } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const keys = [
    "firstName",
    "lastName",
    "age",
    "phone",
    "city",
    "state",
    "country",
    "pincode",
    "school",
  ];
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = (key) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };

  const sortedData = [...users].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    if (sortOrder === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return bValue < aValue ? -1 : bValue > aValue ? 1 : 0;
    }
  });

  const filteredData = sortedData.filter((item) =>
    keys.some((key) => item[key]?.toString().toLowerCase().includes(search))
  );

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 3;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = filteredData.slice(firstIndex, lastIndex);
  const npage = Math.ceil(filteredData.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }

  function changePage(id) {
    setCurrentPage(id);
  }

  return (
    <>
      <h1 className="text-3xl font-bold mt-2 mb-2 text-center text-blue-500">
        User Table
      </h1>
      {/* <div className="w-auto px-20 sm:px-40 space-y-3 mb-5 flex justify-center align-items-center">
        <div>
          <label
            htmlFor="hs-trailing-button-add-on-with-icon-and-button"
            className="sr-only"
          >
            Label
          </label>
          <div className="relative flex rounded-lg w-auto">
            <input
              type="text"
              id="hs-trailing-button-add-on-with-icon-and-button"
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
              name="hs-trailing-button-add-on-with-icon-and-button"
              className="py-2.5 sm:py-3 px-57 lg:ps-11 block w-full border-1 border-blue-600 rounded-lg text-blue-500 focus:z-10 focus:border-blue-600 focus:ring-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:border-blue-600 dark:focus:ring-blue-600"
            />
            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
              <svg
                className="shrink-0 size-4 text-blue-600 dark:text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </div>
          </div>
        </div>
      </div> */}
      <div className="grid mb-6 md:grid-cols-1 px-20">
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-900">Search</label>
      <div className="relative grid place-items-center">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" onChange={(e) => setSearch(e.target.value.toLowerCase())} id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-blue-600 dark:placeholder-gray-400 dark:text-blue-600 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
      </div>
      </div>
      <div className="relative overflow-x-auto px-20 mb-2">
        <table
          name="table"
          className="w-full text-sm text-left rtl:text-right text-black-500 dark:text-black-400 mb-5 border border-blue-500"
        >
          <thead className="text-xs text-black-700 border-1 uppercase bg-gray-50 dark:bg-white-700 dark:text-black-400 text-blue-500">
            <tr>
              <th className="px-6 py-3" onClick={() => handleSort("id")}>
                Id {sortBy === "id" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th className="px-6 py-3" onClick={() => handleSort("firstName")}>
                FirstName{" "}
                {sortBy === "firstName" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th className="px-6 py-3" onClick={() => handleSort("lastName")}>
                LastName{" "}
                {sortBy === "lastName" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th className="px-6 py-3" onClick={() => handleSort("age")}>
                Age {sortBy === "age" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th className="px-6 py-3" onClick={() => handleSort("phone")}>
                Phone {sortBy === "phone" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th className="px-6 py-3" onClick={() => handleSort("city")}>
                City {sortBy === "city" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th className="px-6 py-3" onClick={() => handleSort("state")}>
                State {sortBy === "state" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th className="px-6 py-3" onClick={() => handleSort("country")}>
                Country{" "}
                {sortBy === "country" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th className="px-6 py-3" onClick={() => handleSort("pincode")}>
                Pincode{" "}
                {sortBy === "pincode" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th className="px-6 py-3" onClick={() => handleSort("school")}>
                School{" "}
                {sortBy === "school" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              filteredData.length > 0 ? (
                records.map((user, index) => (
                  <tr
                    key={index}
                    className="bg-white dark:bg-white-800 hover:bg-beige-100 hover:text-blue-500 dark:hover:bg-gray-200 border-b"
                  >
                    <td className="px-6 py-4">{user.id}</td>
                    <td className="px-6 py-4">{user.firstName}</td>
                    <td className="px-6 py-4">{user.lastName}</td>
                    <td className="px-6 py-4">{user.age}</td>
                    <td className="px-6 py-4">{user.phone}</td>
                    <td className="px-6 py-4">{user.city}</td>
                    <td className="px-6 py-4">{user.state}</td>
                    <td className="px-6 py-4">{user.country}</td>
                    <td className="px-6 py-4">{user.pincode}</td>
                    <td className="px-6 py-4">{user.school}</td>
                    <td className="px-6 py-4">
                      {isVisible !== user.id && (
                        <button
                          type="button"
                          onClick={() => deleteUser(user.id)}
                          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        >
                          Delete
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => (
                          setSelectedUser(user), setIsVisible(user.id)
                        )}
                        className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="11"
                    className="text-center pb-5 pt-5 font-medium text-3xl text-red-600"
                  >
                    Oops! No results found with {search} keyword !!
                  </td>
                </tr>
              )
            ) : (
              <tr>
                <td
                  colSpan="11"
                  className="text-center font-medium pb-5 pt-5 text-3xl text-red-600"
                >
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <nav
        aria-label="Page navigation example"
        className="flex justify-center align-items-center mb-5"
      >
        <ul className="inline-flex -space-x-px text-base h-10">
          <li>
            <a
              href="#table"
              className="flex text-decoration-none items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-white-800 dark:border-gray-300 dark:text-blue-500 dark:hover:bg-gray-300 dark:hover:text-blue-800"
              onClick={prePage}
            >
              Prev
            </a>
          </li>
          {numbers.map((n, id) => (
            <li
              className={`page-item ${
                currentPage === n ? "active" : ""
              } flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-white-800 dark:border-gray-300 dark:text-blue-500 dark:hover:bg-gray-300 dark:hover:text-blue-800`}
              key={id}
            >
              <a
                href="#table"
                className="page-link"
                onClick={() => changePage(n)}
              >
                {n}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#table"
              className="flex text-decoration-none items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-white-800 dark:border-gray-300 dark:text-blue-500 dark:hover:bg-gray-300 dark:hover:text-blue-800"
              onClick={nextPage}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};
