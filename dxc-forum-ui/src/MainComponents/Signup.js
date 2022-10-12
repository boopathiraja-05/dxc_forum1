import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { useState } from "react";


const Signup=()=> {
    const[userName,setuserName]=useState("");
    const[userFirstName,setuserFirstName]=useState("");
    const[userLastName,setuserLastName]=useState("");
    const[userPassword,setuserPassword]=useState("");
    
    const collectData= async()=>{
      console.warn(userName,userFirstName,userLastName,userPassword);
      let result = await fetch("http://localhost:9090/registerNewUser",{
          method:"POST",
          body: JSON.stringify({userName,userFirstName,userLastName,userPassword}),
          headers:{
              'Content-Type':'application/json'
          }
      });
      result = await result.json();
      console.warn(result);
      localStorage.setItem('user',JSON.stringify(result.user))
      
  }
  return (
    <>
      <Navbar />
      <div class="col main pt-5 mt-3">
        <div class="content-container">
          <div class="row mt-5">
            <div class="col-md-6 offset-md-3">
              <div class="container-fluid">
                {/* <div class="jumbotron">
                  <div class="card shadow-sm">
                    <div className="card-body"> */}
                <div class="container text-center">
                  <img
                    src={require("../images/dxc_logo_purple.png")}
                    alt=""
                    height="60"
                    width="80%"
                  />
                </div>
                <h4 class="text-center">Register here</h4>
                <hr />
                <form class="mt-4">
                  <div class="form-group">
                    {/* <label for=""></label> */}
                    <input
                      type="text"
                      class="form-control shadow-sm"
                      placeholder="UserName"
                      onChange={(e) => setuserName(e.target.value)}
                    ></input>
                  </div>
                  <div class="form-group">
                    {/* <label for=""></label> */}
                    <input
                      type="text"
                      class="form-control shadow-sm"
                      placeholder="UserFirstName"
                      required
                      onChange={(e) => setuserFirstName(e.target.value)}
                    ></input>
                  </div>
                  {/* <div class="form-group">
                    {<label for=""></label>}
                    <input
                      type="email"
                      class="form-control shadow-sm"
                      placeholder="UserEmail"
                      onChange={(e) => setuserEmail(e.target.value)}
                    ></input>
                  </div> */}
                  <div class="form-group">
                    {/* <label for=""></label> */}
                    <input
                      type="text"
                      class="form-control shadow-sm"
                      placeholder="UserLastName"
                      required
                      onChange={(e) => setuserLastName(e.target.value)}
                    ></input>
                    </div>
                  <div class="form-group">
                    {/* <label for=""></label> */}
                    <input
                      type="password"
                      class="form-control shadow-sm"
                      placeholder="UserPassword"
                      onChange={(e) => setuserPassword(e.target.value)}
                    ></input>
                  </div>
                  <button class="btn btn-dark text-light"  onClick={collectData}>Signup</button>
                </form>
                <div class="mt-2">
                  <span style={{ fontSize: 15 }}>
                    Already Register ?&nbsp;
                    <a href="/login" class="text-danger">
                      Login Here
                    </a>
                  </span>
                </div>
                {/* </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
