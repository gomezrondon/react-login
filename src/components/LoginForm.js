import React from 'react';

function LoginForm(props) {

    const onSubmit = async (e)=> {
        e.preventDefault();

        alert("ON onSubmit")
    }

    return (
        <div className={"login-container"}>
            <form className="form" onSubmit={onSubmit}>
                <p>Please Login:</p>
                <input type="text" placeholder={"username"}/>
                <input type="password" placeholder={"password"} autoComplete={"new-password"}/>
                <button className="submit" type={"submit"}>
                    Log in
                </button>
            </form>
        </div>
    );
}

export default LoginForm;
