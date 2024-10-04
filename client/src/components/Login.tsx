import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: any ): void => {
    if (username.trim() && password.trim()) {
      e.preventDefault();
      console.log({ username, password });
      setPassword("");
      setUsername("");
    }
  };

  return (
    <main className='login'>
      <form className='flex flex-col items-center' onSubmit={handleSubmit}>
        <h2 className='text-2xl font-bold'>Log into your account</h2>
        <label htmlFor='username' className='mt-4 mb-2'>Username</label>
        <input
          id='username'
          name='username'
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='border border-gray-500 w-1/3'
        />
        <label htmlFor='password' className='mt-4 mb-2'>Password</label>
        <input
          id='password'
          type='password'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='border border-gray-500 w-1/3'
        />
        <button className='text-xl mt-4'>LOG IN</button>
        <p className='mt-8'>
          Don't have an account?{" "}
          <Link className='link' to='/register'>
            Create one
          </Link>
        </p>
      </form>
    </main>
  );
};

export default Login;
