var success = document.getElementById('success');
var register = document.getElementById('register');

var formref = firebase.database().ref('Engineer');
function submitform(event){
    event.preventDefault();
    
    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;

    // console.log("name", name);
    // console.log("phone", phone);
    // console.log("email", email);
    // console.log("message", message);
    savedata(name, phone, email, message)
}

const savedata = (name, phone, email, message) =>{
    var newref = formref.push();
    newref.set({
        name: name,
        phone: phone,
        email: email,
        message: message,
        rating: '5'
    })
    .then(function() {
        console.log('Synchronization succeeded');
        success.style.display = "block";
        register.style.display = "none";
    })
    .catch(function(error) {
        console.log('Synchronization failed');
    });
}

var rootref = firebase.database().ref().child("Engineer");


rootref.on("child_added", snap =>{
    var name = snap.child("name").val();
    var email = snap.child("email").val();
    var phone = snap.child("phone").val();
    var message = snap.child("message").val();
    console.log(name, email, phone, message);
});