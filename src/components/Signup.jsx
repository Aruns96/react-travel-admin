import React,{useState} from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { Link } from "react-router-dom";


const Signup = () => {
    const history = useHistory()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const submitHandler = (e) => {
   // console.log("env",import.meta.env.VITE_WEB_API)
    e.preventDefault();
    if(password===confirmPassword){
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${import.meta.env.VITE_WEB_API}`;
        fetch(url, {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: confirmPassword,
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
            console.log("data", data);
            console.log("user sucessfully registered");
            history.push('/login')
          })
          .catch((e) => alert(e.message));
    
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    }else{
        alert("passwords not matching")
    }
   
  };
  return (
    
    <div className="flex items-center justify-center h-screen">
        
    <div className="bg-white p-8 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={e=>setEmail(e.target.value)}
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
            value={password}
            onChange={e=>setPassword(e.target.value)}
            className="border border-gray-300 rounded w-full py-2 px-4 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={e=>setConfirmPassword(e.target.value)}
            className="border border-gray-300 rounded w-full py-2 px-4 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className='flex flex-col'>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3"
        >
          Signup
        </button>
        <Link to="/login">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Have an Account? Log In?</button>
        </Link>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Signup