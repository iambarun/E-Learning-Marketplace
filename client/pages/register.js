import { useState } from 'react';
import axios from 'axios';


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.table({ name, email, password });
    const {data} = await axios.post('http://localhost:8000/api/register', { name, email, password });
    console.log('REGISTER RESPONSE', data);
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