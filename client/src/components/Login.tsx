import React, {useEffect, useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import {firebaseAuth, googleProvider} from '../firebase/BaseConfig';
import {signInWithPopup} from 'firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth';

const Login = () => {
  const [user] = useAuthState(firebaseAuth);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(firebaseAuth, googleProvider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleLogout = () => {
    firebaseAuth.signOut();
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <main className='flex items-center h-screen bg-white dark:bg-gray-600'>
      {user ? (
        <>
          <h1>Hello, {user?.displayName}</h1>
          <button onClick={handleLogout}>Log out</button>
        </>
      ) : (
        <>
          <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div className="flex justify-center mx-auto">
              <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt=""/>
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>

              <a href="#" className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">
                Login
              </a>

              <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
            </div>

            <div className="flex items-center mt-6 -mx-2">
              <button type="button"
                      onClick={signInWithGoogle}
                      className="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:bg-blue-400 focus:outline-none">
                <svg className="w-4 h-4 mx-2 fill-current" viewBox="0 0 24 24">
                  <path
                    d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z">
                  </path>
                </svg>

                <span className="hidden mx-2 sm:inline">Sign in with Google</span>
              </button>

            </div>

          </div>
        </>

      )}
    </main>
  );
};

export default Login;
