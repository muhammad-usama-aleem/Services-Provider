var root = document.getElementById("root");
    var isPaused = false;

var rootref = firebase.database().ref().child("Services");

rootref.on("child_added", snap =>{
    var name = snap.child("name").val();
    var image = snap.child("image").val();
    var num = 0;

    const count_num = async (name) =>{
        var refer = firebase.database().ref(name);
        let snapshot = await refer.once("value")
        let chi_dren = snapshot.numChildren()
        return chi_dren;
    }

    const render = async () =>{
        
        num = await count_num(name);
            
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
                            <p class="services_num">Services available: ${num} </p>        
                        </div>
                    </div>
            `;

            root.appendChild(div);
    }


    render();
    

});
