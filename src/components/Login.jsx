import React,{useRef} from 'react'
import { useHistory, Link } from "react-router-dom";


const Login = () => {
    const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;



    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${import.meta.env.VITE_WEB_API}`;

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "some error occured..";
            if (data && data.error && data.error.errors[0].message) {
              errorMessage = data.error.errors[0].message;
            }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        // console.log("token",data)
        localStorage.setItem("token", data.idToken);
       // localStorage.setItem("userID", data.localId);
        localStorage.setItem("email", data.email);
        //localStorage.setItem("email",enteredEmail)
        alert("login success");
        history.replace("/admin");
        //dispatch(authActions.setLogin(true));
        
      })
      .catch((e) => alert(e.message));

    emailRef.current.value = "";
    passwordRef.current.value = "";
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              ref={emailRef}
              className="border border-gray-300 rounded w-full py-2 px-4 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              ref={passwordRef}
              className="border border-gray-300 rounded w-full py-2 px-4 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="flex flex-col">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mb-3"
          >
            Login
          </button>
          <button><Link to="/"  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">create new accout</Link></button>
          </div>
          
        </form>
      </div>
    </div>
  )
}

export default Login