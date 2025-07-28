import { useState } from 'react';


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    console.table({ name, email, password });
  }
  return (
    <>
        <h1 className="jumbotron text-center py-5 mb-4">Register</h1>
        
        <div className="container col-md-4 offset-md-4 pb-5">
          <form onSubmit={handleSubmit}>
            <input type="text" className="form-control mb-4 p-3" value={name} onChange={(e) => setName(e.target.value)} placeholder='userName' required />
            <input type="email" className="form-control mb-4 p-3" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />
            <input type="password" className="form-control mb-4 p-3" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />

            <br />
            <button type='submit' className="btn w-50 btn-primary p-3">Submit</button>
            <button type='cancel' className="btn w-50 btn-error p-3">Cancel</button>
          </form>
        </div>
    </>
  );
}
export default Register;