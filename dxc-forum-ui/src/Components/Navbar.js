import React from "react";

export const Navbar = () => {
  const logout=()=>{
        localStorage.clear();
        window.location.href='/login'
        console.log("logout successfull")
  }
  return (
    <nav class="navbar fixed-top navbar-expand-md navbar-dark bg-dark mb-3">
      <div class="flex-row d-flex">
        <button
          type="button"
          class="navbar-toggler mr-2 "
          data-toggle="offcanvas"
          title="Toggle responsive left sidebar"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand" href="/" title="">
          <img
            src={require("../images/dxc_logo.png")}
            class=""
            alt="Dxc logo"
            width={200}
            height={40}
          ></img>
        </a>
      </div>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#collapsingNavbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-collapse collapse" id="collapsingNavbar">
        {/* <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" href="#">
              Home <span class="sr-only">Home</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="//www.codeply.com">
              Link
            </a>
          </li>
        </ul> */}
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" href="/login" data-toggle="collapse">
              Login
            </a>
          </li>
          <li class="nav-item">
            <button
              class="nav-link"
              data-target="#myModal"
              data-toggle="modal"
              onClick={(e)=>logout(e)}
            >
              Logout
            </button>
          </li>
          {/* <li class="nav-item">
            <a class="nav-link waves-effect waves-light text-white">
              <i class="fab fa-google-plus-g"></i>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link waves-effect waves-light text-white">
              <i class="fas fa-envelope-open-text"></i>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link waves-effect waves-light text-white">
              <i class="fas fa-align-justify"></i>
            </a>
          </li> */}
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
