var button_space = document.getElementById("button_space");
var register = document.getElementById("register");
var take_service_section = document.getElementById('take_service_section');

const give = () =>{
    button_space.style.display = "none";
    register.style.display = "block";
}
const take = () =>{
    button_space.style.display = "none";
    take_service_section.style.display ="block";
}