import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../component/OAuth";

function SignUp() {
  const [formData, setFormData] = useState({});
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");
  const navigate = useNavigate()

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
      setLoading(true);
      const res = await fetch('/api/auth/signup',
      {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.sucess === false) {
          setError(data.message);
          setLoading(false);
          console.log(error);
          return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setError(error.message)
      setLoading(false);
    }
  };

  return (
    <div className="m-5 mt-24">
      <h1 className="text-3xl text-center text-orange-400 font-semibold my-7">
        SignUp
      </h1>
      <form className="flex flex-col items-center h-1/2" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          className="m-2 p-3 w-1/3 rounded-2xl text-orange-400 text-lg font-semibold"
          id="username"
          onChange={handleChange}
        />
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
          {loading ? 'Loading':'SignUp'}
        </button>
        <OAuth/>
        <div className="flex gap-2 mt-5">
          <span className="text-xl">Already have an account?</span>
          <Link to={"/sign-in"}>
            <span className="text-orange-300 ml-2 underline text-xl">SignIn</span>
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
