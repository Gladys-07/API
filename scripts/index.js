//
const boton= document.getElementById("btnLogin");
const username= document.getElementById("username");
const password= document.getElementById("password");

const login =async()=> {
    //validar credenciales
    const credentials ={username:username.value, password:password.value};
    const data= await fetch("htpp://localhost:5000/login",
        {
        method:"POST",    
        headers:{"content-type": "application/json"},
        body: JSON.stringify(user),
    } );
    const user =await data.json();
    console.log(username.value+""+password.value);

    if(res.isLogin){

    sessionStorage.setItem ("name",  res.user.name),
    sessionStorage.setItem ("id", res.user.name);   
    window.location="./pages/profile.html";
    }
    console.log("credenciales incorrectas");
};
boton.addEventListener("click", login);