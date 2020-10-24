import React, {useEffect, useState} from 'react';
import {login} from "./Utils";

function LoginForm(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
//   console.log("isLoggedIn "+isLoggedIn)
    }, [isLoading]);



    const onSubmit = async (e)=> {
        e.preventDefault();

        setIsLoading(true);
        setError('');
        try{
            await login({username, password});
            setIsLoggedIn(true);
        }catch (e) {
            setError('Incorrect username or password');
        }
        setIsLoading(false);

       // alert("ON onSubmit "+ username+" "+password)
    }



    return (
        <div className={"login-container"}>
            {
                isLoggedIn ? (
                    <>
                        <h1>Hola {username}</h1>
                    </>
                ):(
                    <form className="form" onSubmit={onSubmit}>
                        {error && <p className={"error"}>{error}</p>}
                        <p >Please Login:</p>
                        <input
                            type="text"
                            placeholder={"username"}
                            value={username}  //default value set
                            onChange={event => setUsername(event.currentTarget.value)}
                        />
                        <input
                            type="password"
                            placeholder={"password"}
                            value={password}
                            autoComplete={"new-password"}
                            onChange={event => setPassword(event.currentTarget.value)}
                            disabled={isLoading}
                            //   style={{color: 'red'}} // how to set style directly
                            //  style={{display: "none"}} // asi se esconde un componente JS style
                        />
                        <button className="submit"
                                type={"submit"}
                                disabled={isLoading}
                        >
                            {isLoading ? 'Loggin in...' : 'Log in'}
                        </button>
                    </form>
                )
            }

        </div>
    );
}

export default LoginForm;
