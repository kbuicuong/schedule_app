import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import { handleRegister } from "../utils/resource";

const Signup = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e:any):void => {
    e.preventDefault();
    if (username.trim() && password.trim() && email.trim()) {
      console.log(email, username, password);
      setPassword("");
      setUsername("");
      setEmail("");
    }
  };

  return (
    <main className='signup'>
      <form className='flex flex-col items-center' onSubmit={handleSubmit}>
        <h2 className='text-2xl font-bold'>Create an account</h2>
        <label htmlFor='email'>Email Address</label>
        <input
          id='email'
          name='email'
          type='email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='border border-gray-500 w-1/3'
        />
        <label htmlFor='username'>Username</label>
        <input
          id='username'
          name='username'
          required
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='border border-gray-500 w-1/3'
        />
        <label htmlFor='password'>Password</label>
        <input
          id='password'
          type='password'
          name='password'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='border border-gray-500 w-1/3'
        />
        <button className='text-xl mt-4'>REGISTER</button>
        <p className='mt-8'>
          Already have an account?{" "}
          <Link className='link' to='/'>
            Sign in
          </Link>
        </p>
      </form>
    </main>
  );
};

export default Signup;
