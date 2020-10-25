import React, {useEffect, useReducer, useState} from 'react';
import {login} from "./Utils";


function loginReducer(state, action) {

    switch (action.type) {
        case 'field': {
            return {
                ...state,
                [action.field]: action.value
            }
        }
        case 'login': {
            return {
                ...state,
                isLoading: true,
                error: ''
            }
        }
        case 'success': {
            return {
                ...state,
                isLoggedIn: true
            }
        }
        case 'logout': {
            return {
                ...state,
                isLoggedIn: false,
                username: '',
                password: ''
            }
        }

        case 'error': {
            return {
                ...state,
                error: 'Incorrect username or password',
                isLoading: false,
                isLoggedIn: false,
                username: '',
                password: ''
            }
        }
        default:
            break;
    }

    return state;

}


const initialState =  {
    username: '',
    password: '',
    isLoading: false,
    error: '',
    isLoggedIn: false
}

function LoginForm(props) {

    const [state, dispatch] = useReducer(loginReducer, initialState);

    const {username, password, isLoading, error, isLoggedIn} = state;


    const onSubmit = async (e)=> {
        e.preventDefault();

        dispatch({type: 'login'});

        try{
            await login({username, password});
            dispatch({type: 'success'});
        }catch (e) {
            dispatch({type: 'error'});

        }

    }

    const dispatchSetVal= (field, value)=>{
        dispatch({type: 'field', field: field, value: value});

    }


    return (
        <div className={"login-container"}>
            {
                isLoggedIn ? (
                    <>
                        <h1>Hola {username}</h1>
                        <button onClick={()=> dispatch({type: 'logout'})}> Log out</button>
                    </>
                ):(
                    <form className="form" onSubmit={onSubmit}>
                        {error && <p className={"error"}>{error}</p>}
                        <p >Please Login:</p>
                        <input
                            type="text"
                            placeholder={"username"}
                            value={username}  //default value set
                            onChange={event => dispatchSetVal('username',event.currentTarget.value)}
                        />
                        <input
                            type="password"
                            placeholder={"password"}
                            value={password}
                            autoComplete={"new-password"}
                            onChange={event => dispatchSetVal('password',event.currentTarget.value)}
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
