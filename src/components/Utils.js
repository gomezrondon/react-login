

export async function login({username, password}){
    return new Promise((resolve, reject) =>{
        setTimeout(() => {
            if (username.trim() === "javier" && password.trim() === 'gomez'){
                resolve(); // What is this? need to investigate!!
            }else {
                reject();
            }
        }, 1000);
    });
}