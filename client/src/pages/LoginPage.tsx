import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    return (
        <> 
            <div><span>Email</span><input value={email} onChange={e => setEmail(e.target.value)}></input></div>
            <div><span>Password</span><input value={password} onChange={e => setPassword(e.target.value)}></input></div>
            <button onClick={() => loginClick()}>Login</button>
        </>
    )

    function loginClick() {
        const csrfToken = Cookies.get('csrfToken');
        console.log('csrfToken', csrfToken);
        fetch('/loginReq', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json',
            },

        }).then(res=>{
            if(res.ok)
                navigate('/');
        });
    }
}

export default Login;
