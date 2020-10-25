import axios from 'axios';

// const REACT_APP_BASE_URL = 'http://localhost:8080';
const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;


export async function login({username, password}){
    return new Promise((resolve, reject) =>{
        setTimeout( () => {
            if (username.trim() && password.trim()){

                let loginData = {
                    "username": username,
                    "password" : password
                }

  //              console.log(loginData);
                axios
                    .post(REACT_APP_BASE_URL+'/validate/credential', loginData)
                    .then(res => res.data)
                    .then(data => {
                    //    console.log(data)
                        if (data) {
                            console.log("paso 1");
                            resolve(); // What is this? need to investigate!!
                        } else {
                            console.log("paso 2")
                             reject();
                        }
                    })
                    .catch(err => {
                        console.warn(err)
                        reject();
                    });

            }else {
                console.log("paso 3")
                reject();
            }
        }, 1000);
    });
}