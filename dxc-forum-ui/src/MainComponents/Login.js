
// import React from "react";
// import { useState } from "react";
// import { useRef } from "react";
// import { useNavigate } from "react-router";
// import AuthService from "../Services/auth.service";

// const Login = () =>{
//   let navigate = useNavigate();

//   const form = useRef();
//   const checkBtn = useRef();

//   const [userName,setuserName] = useState(" ");
//   const[userPassword,setuserPassword]=useState(" ");
//   const[loading, setLoading] = useState(false);
//   const[message, setMessage] = useState("");

//   const onChangeuserName = (e) =>{
//     const userName = e.target.value;
//     setuserName(userName);
//   };

//   const onChangeuserPassword = (e) =>{
//     const userPassword = e.target.value;
//     setuserPassword(userPassword);
//   };

//   const handleLogin =(e)=>{
//     e.preventDefault();

//     setMessage("");
//     setLoading(true);
//   }

//   if(checkBtn.current.context._errors.length == 0){
//     AuthService.login(userName, userPassword).then(
//       ()=>{
//         navigate("/");
//         window.location.reload();
//       },
//       (error)=>{
//         const resMessage = 
//         (error.response && 
//           error.response.data &&
//           error.response.data.message) ||
//           error.message ||
//           error.toString();

//           setLoading(false);
//           setMessage(resMessage);
//       }
//     );
//   }else{
//     setLoading(false);
//   }
// return (
//   <div className="col-md-12">
//     <div className="card card-container">
//       <img
//         src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
//         alt="profile-img"
//         className="profile-img-card"
//       />

//       <form onSubmit={handleLogin} ref={form}>
//         <div className="form-group">
//           <label htmlFor="username">Username</label>
//           <input
//             type="text"
//             className="form-control"
//             name="username"
//             value={userName}
//             onChange={onChangeuserName}
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             className="form-control"
//             name="password"
//             value={userPassword}
//             onChange={onChangeuserPassword}
            
//           />
//         </div>

//         <div className="form-group">
//           <button className="btn btn-primary btn-block" disabled={loading}>
//             {loading && (
//               <span className="spinner-border spinner-border-sm"></span>
//             )}
//             <span>Login</span>
//           </button>
//         </div>

//         {message && (
//           <div className="form-group">
//             <div className="alert alert-danger" role="alert">
//               {message}
//             </div>
//           </div>
//         )}
//         <button style={{ display: "none" }} ref={checkBtn} />
//       </form>
//     </div>
//   </div>
// );
//         };

// export default Login;






import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Authenticate from "../Services/auth.service";

const Login=()=> {
  const [userName,setuserName] = useState(" ");
  const[userPassword,setuserPassword]=useState(" ");
  const navigate = useNavigate();

  useEffect(() => {
    forUser();
    
  }, [])
  

  
  const handleLogin = async () =>{
      let result = await fetch('http://localhost:9090/authenticate',{
          method:'post',
          body:JSON.stringify({userName,userPassword}),
          headers:{
              'Content-Type':'application/json'
          }
      });
      result = await result.json();
      console.log(result.json)
      if(result.jwtToken){
        navigate('/')
       localStorage.setItem('user',JSON.stringify(result.user));
       localStorage.setItem('token',JSON.stringify(result.jwtToken))
       alert(result.jwtToken)
      
      
      }else{
        alert("Please enter correct details")
      }
      // forUser();
      
  }
  const forUser = async()=>{
    let result = await fetch("http://localhost:9090/forUser",{
      headers:{
        "Authorization":"Bearer " + JSON.parse(localStorage.getItem('token'))
      }
      
    });
    result = await result.json();
    if(result){
     window.location.href='/'
    }else{
      alert("something wrong")
    }
    

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
                <h4 class="text-center">Login here</h4>
                <hr />
                <form class="mt-4">
                  <div class="form-group">
                    {/* <label for=""></label> */}
                    <input
                      type="userName"
                      class="form-control shadow-sm"
                      placeholder="username"
                      onChange={(e)=>setuserName(e.target.value)}
                    ></input>
                  </div>
                  <div class="form-group">
                    {/* <label for=""></label> */}
                    <input
                      type="password"
                      class="form-control shadow-sm"
                      placeholder="Password"
                      onChange={(e)=>setuserPassword(e.target.value)}
                    ></input>
                  </div>
                  <button class="btn btn-dark text-light" href="/" onClick={handleLogin}>Login</button>
                </form>
                <div class="mt-2">
                  <span style={{ fontSize: 15 }}>
                    New User ?&nbsp;
                    <a href="/signup" class="text-danger">
                      Register Here
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
};


export default Login;
