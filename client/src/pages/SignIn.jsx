import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signInStart,signInSucess, signInFailure } from "../Redux/user/userSlice";
import OAuth from "../component/OAuth.jsx";

function SignUp() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Sending Value to the backend of the application
  const handleSubmit = async (e) => {
    e.preventDefault(); // It's prevent react to refresh the page when we do submit the page.
    try {
      dispatch(signInStart())
      const res = await fetch('/api/auth/signin',
      {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.sucess === false) {
          dispatch(signInFailure(data.message))
          return;
      }
      console.log("called");
      dispatch(signInSucess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  };

  return (
    <div className="m-5 mt-24">
      <h1 className="text-3xl text-center text-orange-400 font-semibold my-7">
        SignIn
      </h1>
      <form className="flex flex-col items-center h-1/2" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="m-2 p-3 w-1/3 rounded-2xl text-orange-400 text-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Password"
          className="m-2 p-3 w-1/3 rounded-2xl text-orange-400 text-lg"
          id="password"
          onChange={handleChange}
        />
        <button 
        className="border-orange-400 border-2 w-1/3 p-3 m-2 rounded-2xl text-xl text-orange-400 hover:bg-orange-400 hover:text-black transition-all ease-in-out duration-300"
        >
          {loading ? 'Loading':'SignIn'}
        </button>
        <OAuth/>
        <div className="flex gap-2 mt-5">
          <span className="text-xl">Not a user?</span>
          <Link to={"/sign-up"}>
            <span className="text-orange-300 ml-2 underline text-xl">SignUp</span>
          </Link>
        </div>
        <div className="text-orange-400 text-xl mt-2">
            {error}
        </div>
      </form>
    </div>
  );
}

export default SignUp;
// Redux Persist