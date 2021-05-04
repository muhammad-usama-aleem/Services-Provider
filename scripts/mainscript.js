var root = document.getElementById("root");

var rootref = firebase.database().ref().child("Services");

rootref.on("child_added", snap =>{
    var name = snap.child("name").val();
    var image = snap.child("img").val();

    let div = document.createElement('div');
    div.className = 'card-h col-md-3';
    div.innerHTML = `
            <div  id="thumbnail" class="card-thumbnail">
                <img id="card_main_img" class="card-main-image" src=${image}>
            </div>
            <div class="card-body">
                <div class="card-text-header">
                    <div id="card_title_space" class="card_title">
                        <a href="../pages/${name}.html" class="box-title">${name}</a>
                    </div>   
                    
                    <div class="break"></div> 
                    <p class="services_num">Services available: 0 </p>        
                </div>
            </div>
    `;


    root.appendChild(div);
});