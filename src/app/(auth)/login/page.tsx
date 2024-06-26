// pages/login.js
import React from 'react';

const Login = () => {
  return (
    <main className="" style={{ marginLeft: "500px" }}>
      <div className="container mt-5">
        <div className="card p-4">
          <div className="mb-3 row">
            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
              <input 
                placeholder='Enter email' 
                type='email' 
                className="form-control" 
                style={{ width: '50%', height: '40px', border: '1px solid #ccc', borderRadius: '10px',marginTop:"20px" }}
              />
            </div>
          </div>
          <div className="mb-3 row"style={{ marginTop:"20px" }} >
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
              <input 
                type="password" 
                placeholder='Enter password'
                className="form-control" 
                id="inputPassword" 
                style={{ width: '50%', height: '40px', border: '1px solid #ccc', borderRadius: '10px', marginTop:"20px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
