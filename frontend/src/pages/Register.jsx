import axios from '../config/axios';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

      const {setUser} = useContext(UserContext)

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('/user/register',{email, password}).then((res) => {
            console.log(res.data);
            setUser(res.data.user)
            navigate("/");
        }).catch((err) => {
            console.log(err.response.data);
        })
    };

    return (
        <div className='bg-slate-900 h-screen w-screen flex  justify-center items-center'>

            <div className='pb-16 text- flex flex-col justify-center items-center'>


                <div className=' bg-slate-300 px-10 py-14 rounded-lg shadow-md  m-auto cursor-pointer '>
                    <h1 className="text-4xl font-semibold text-neutral-800 pt-2 mb-10 md:-16">Register</h1>
                    <form onSubmit={submitHandler} className="flex flex-col gap-3  min-w-[22vw]">
                        <label htmlFor="">Email</label>
                        <input
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                            type="text"
                            placeholder="Email"
                            className="bg-zinc-100  rounded-md p-4 "
                        />
                        <label htmlFor="">Password</label>
                        <input
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            placeholder="Password"
                            className="bg-zinc-100 rounded-md p-4 "
                        />

                        <button className="font-semibold bg-black text-white mt-4 p-3 text-center rounded-full">
                            Continue
                        </button>
                    </form>
                    <p className='mt-5'>Already have an account? <Link to='/login' className='text-blue-400'>Login</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Register