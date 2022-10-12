
import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import CertificationService from "../Services/CertificationService";
import JavaFactoryService from "../Services/JavaFactoryService";
import MentoringService from "../Services/MentoringService";
import trainingService from "../Services/trainingService";
import CertificationPieChart from "./ChildComponents/CertificationPieChart";
import MentoringBarChart from "./ChildComponents/MentoringBarChart";
import PieChart from "./ChildComponents/PieChart";
import SessionBarChart from "./ChildComponents/sessionBarChart";
const Dashboard = () => {
  const [cert, setCert] = useState([]);
  const [totalQuestion, setTotalQuestion] = useState([]);
  const [totalEmployee, setTotalEmployee] = useState([]);
  const [totalSession, setTotalSession] = useState([]);
  useEffect(() => {
    init();
    question();
    employee();
    training();

  }, []);
 
  
   
 
  const init = () => {
    CertificationService.totalCertificate()
      .then((response) => {
        console.log(response.data);
        setCert(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const question = () => {
    JavaFactoryService.totalQuestion()
      .then((response) => {
        console.log("question", response.data);
        setTotalQuestion(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const employee = () => {
    MentoringService.totalEmployee()
      .then((response) => {
        console.log("Employee", response.data);
        setTotalEmployee(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const training = () => {
    trainingService
      .totalSession()
      .then((response) => {
        console.log("Total Session", response.data);
        setTotalSession(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Navbar />
      <Sidebar />
      <div class="col main pt-5 mt-3">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item active" aria-current="page">
              Home
            </li>
          </ol>
        </nav>
        {/* <p class="lead d-none d-sm-block">Add Employee Details and Records</p> */}

        <div
          class="alert alert-warning fade collapse"
          role="alert"
          id="myAlert"
        >
          <button
            type="button"
            class="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
            <span class="sr-only">Close</span>
          </button>
          <strong>Data and Records</strong> Learn more about employee
        </div>
        <div class="row mb-3">
          <div class="col-xl-3 col-sm-6 py-2">
            <div class="card bg-success text-white h-100">
              <div
                class="card-body bg-success"
                style={{ backgroundColor: "#57b960" }}
              >
                <div class="rotate">
                  <i class="fa-solid fa-certificate fa-4x"></i>
                </div>
                <h6 class="text-uppercase">Certificate</h6>
                <h1 class="display-4">{cert}</h1>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6 py-2">
            <div class="card text-white bg-danger h-100">
              <div class="card-body bg-danger">
                <div class="rotate">
                  <i class="fa-solid fa-paper-plane fa-4x"></i>
                </div>
                <h6 class="text-uppercase">Training</h6>
                <h1 class="display-4">{totalSession}</h1>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6 py-2">
            <div class="card text-white bg-info h-100">
              <div class="card-body bg-info">
                <div class="rotate">
                  <i class="far fa-user fa-4x"></i>
                </div>
                <h6 class="text-uppercase">DECP</h6>
                <h1 class="display-4">{totalEmployee}</h1>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6 py-2">
            <div class="card text-white bg-warning h-100">
              <div class="card-body">
                <div class="rotate">
                  <i class="fa fa-question fa-4x"></i>
                </div>
                <h6 class="text-uppercase">Question</h6>
                <h1 class="display-4">{totalQuestion}</h1>
              </div>
            </div>
          </div>
        </div>

        <hr />
        <div class="row mb-5">
          <div class="col-lg-6 col-md-6 col-sm-12">
            <h5 class="mt-3 mb-3 text-secondary">DECP Certificate Status</h5>
            <div>
              <CertificationPieChart />
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-sm-offset-5 ">
            <h4 className="title mt-3 mb-3 text-center text-secondary">
              DECP HackerEarth Score & Rank
            </h4>
            <div>
              <MentoringBarChart />
            </div>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-12 mt-5">
            <h5 class="mt-3 mb-3 text-secondary">DECP Training Bar Chart</h5>
            <div>
              <SessionBarChart />
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-sm-offset-5 mt-5">
            <h4 className="title mt-3 mb-3 text-center text-secondary">
              DECP Training Pie Chart
            </h4>
            <div>
              <PieChart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
