import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import './User.css';

function User() {

    const [token,setToken] = useCookies(['auth'])

  useEffect(() => {
    //   chech if user is already login
      if(token['auth']) document.location.href = "/";

    //   some JS 
      const container = document.querySelector(".container"), 
      pwShowHide = document.querySelectorAll(".showHidePw"),
      pwFields = document.querySelectorAll(".password"),
      signup = document.querySelector(".signup-link"),
      login = document.querySelector(".login-link");

      pwShowHide.forEach(eyeIcon => {
          eyeIcon.addEventListener("click", () => {
              pwFields.forEach(pwField => {
                  if(pwField.type === "password") {
                      pwField.type = "text";

                      pwShowHide.forEach(icon => {
                        icon.classList.replace("uil-eye-slash", "uil-eye");
                      })
                    }else {
                        pwField.type = "password";

                        pwShowHide.forEach(icon => {
                            icon.classList.replace("uil-eye", "uil-eye-slash");
                        })
                    }
              })
          })
      })

      signup.addEventListener("click", () => {
          container.classList.add("active");
      })

      login.addEventListener("click", () => {
        container.classList.remove("active");
    })
  },[token])

// for Login
  const Login = () =>{
    var username = document.getElementById("loginuser").value
    var password = document.getElementById("loginpass").value
    fetch(`${process.env.REACT_APP_API_URL}/login/`, {
        method: "POST",
        headers: {"Content-type": "application/json",},
        body: JSON.stringify({'username':username,'password':password}),
    })
    .then((resp) => resp.json())
    .then((res) => setToken('auth',res.token))
    .catch( error => console.log(error))

  }
//   For signup
  const Signup = () =>{
    var username = document.getElementById("signupuser").value
    var password = document.getElementById("signuppass").value
    fetch(`${process.env.REACT_APP_API_URL}/api/signup/`, {
        method: "POST",
        headers: {"Content-type": "application/json",},
        body: JSON.stringify({'username':username,'password':password}),
    })
    .then((resp) => resp.json())
    .then((res) => setToken('auth',res))
    .catch( error => console.log(error))
  }

  return (
      <div class="container">
        <div class="forms">
            <div class="form login">
                <span class="title">Login</span>

                <form action="#">
                    <div class="input-field">
                        <input type="text" id="loginuser" placeholder="Enter your Username" required/>
                        <i class="uil uil-envelope"></i>
                    </div>

                    <div class="input-field">
                        <input type="password" id="loginpass" class="password" placeholder="Enter your password" required/>
                        <i class="uil uil-lock icon"></i>
                        <i class="uil uil-eye-slash showHidePw"></i>
                    </div>

                    <div class="input-field button">
                        <input type="button" value="Login Now" onClick={() =>Login()}/>
                    </div>
                </form>

                <div class="login-signup">
                    <span class="text">Not a member?
                        <a href="#" class="text signup-link">Signup now</a>
                    </span>
                </div>
            </div>


            <div class="form signup">
                <span class="title">Registration</span>

                <form action="#">
                    <div class="input-field">
                        <input type="text" placeholder="Enter your name" required/>
                        <i class="uil uil-user"></i>
                    </div>
                    <div class="input-field">
                        <input type="text" id="signupuser" placeholder="Enter your Username" required/>
                        <i class="uil uil-envelope"></i>
                    </div>

                    <div class="input-field">
                        <input type="password" id="signuppass" placeholder="Create a password" required/>
                        <i class="uil uil-lock icon"></i>
                    </div>

                    <div class="input-field button">
                        <input type="button" value="Register Now" onClick={() =>Signup()}/>
                    </div>
                </form>

                <div class="login-signup">
                    <span class="text">Already have an account?
                        <a href="#" class="text login-link">Login now</a>
                    </span>
                </div>
            </div>
        </div>
    </div>
  );
}

export default User;
