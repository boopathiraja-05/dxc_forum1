import { useEffect, useState } from "react";
import MentoringService from "../Services/MentoringService";
import { Link, useNavigate } from "react-router-dom";
import "jquery/dist/jquery.min.js";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
const Mentoring = () => {
  const navigate = useNavigate();
  //Get All Data
  const [mentors, setMentor] = useState([]);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    MentoringService.getAll()
      .then((response) => {
        setMentor(response.data);
        console.log("Mentor", response.data);
      })
      .catch((error) => {
        console.log("Something Went wrong", error);
      });
  };

  //Delete Record

  const handleDelete = (id) => {
    MentoringService.deleteById(id)
      .then((response) => {
        console.log("Data Deleted Successfully");
        init();
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });
  };

  const goRouteId = (id) => {
    navigate(`/mentoring/view_mentoring/${id}`);
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div class="col main pt-5 mt-3">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Mentoring
            </li>
          </ol>
        </nav>

        <div class="container">
          <div class="row">
            <div class="col-md-10">
              {/* <i class="fa-solid fa-users fa-2x d-inline mr-2"></i> */}
              <h1 class="d-inline">Mentoring</h1>
            </div>
            <div class="col-md-2 mt-2">
              <a
                href="/mentoring/add-mentoring"
                class="btn btn-md btn-secondary d-inline text-light"
              >
                Add Data
              </a>
            </div>
          </div>
        </div>
        <div class="content-container">
          <div class="container-fluid">
            {/* <div class="card shadow-sm mb-5">
              <div className="card-body"> */}
            <table id="" class="table table-striped table-bordered mt-3 mb-5">
              <thead class="thead-light">
                <tr>
                  <th>Batch</th>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>HE Score</th>
                  <th>Project Allotment</th>
                  <th>Project Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {mentors.map((mentor) => (
                  <tr>
                    <td class="rfp-row" onClick={() => goRouteId(mentor.id)}>
                      {mentor.batch}
                    </td>
                    <td class="rfp-row" onClick={() => goRouteId(mentor.id)}>
                      <b>{mentor.empId}</b>
                    </td>
                    <td class="rfp-row" onClick={() => goRouteId(mentor.id)}>
                      {mentor.name}
                    </td>
                    <td class="rfp-row" onClick={() => goRouteId(mentor.id)}>
                      <b>{mentor.email}</b>
                    </td>
                    <td class="rfp-row" onClick={() => goRouteId(mentor.id)}>
                      {mentor.heScore}
                    </td>
                    <td class="rfp-row" onClick={() => goRouteId(mentor.id)}>
                      {mentor.project}
                    </td>
                    <td class="rfp-row" onClick={() => goRouteId(mentor.id)}>
                      {mentor.projectStatus}
                    </td>
                    <td>
                      <div class="dropdown">
                        <span class="btn btn-sm btn-secondary d-inline">
                          Action&nbsp;
                          <i class="fas fa-caret-down d-inline"></i>
                        </span>
                        <div class="dropdown-content">
                          <Link to={`/mentoring/${mentor.id}`}>Edit</Link>
                          {/* <Link
                                to={`/mentoring/view_mentoring/${mentor.id}`}
                              >
                                View
                              </Link> */}
                          <a
                            class="text-dark"
                            onClick={(e) => {
                              handleDelete(mentor.id);
                            }}
                          >
                            Delete
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Mentoring;
