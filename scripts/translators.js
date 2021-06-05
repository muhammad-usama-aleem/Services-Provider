var root = document.getElementById("take_service_section");
var sibling_id = document.getElementById('siblings');
var success = document.getElementById('success');
var register = document.getElementById('register');
var upload_img = document.getElementById('upload_img');
var rating_given = 0;
var parent_node = null;
var current_id = 0;
var ImgName, ImgUrl;
var files = []
var readers

var rootref = firebase.database().ref().child("translators");


rootref.on("child_added", snap =>{
    var name = snap.child("name").val();
    var email = snap.child("email").val();
    var phone = snap.child("phone").val();
    var message = snap.child("message").val();
    var code = snap.child("code").val();
    var rating = snap.child("rating").val();
    var images = snap.child("img").val();


    let div = document.createElement('div');
    div.innerHTML = `
    <table id=${Math.random() * 7689785}>
            <tr>
                <div class="rating_block" id="rating_block" style="display: none;">
                <!-- Rating Stars Box -->
                    <div class='rating-stars text-center'>
                        <ul id='stars'>
                        <li class='star' title='Poor' data-value='1'>
                            <i class='fa fa-star fa-fw'></i>
                        </li>
                        <li class='star' title='Fair' data-value='2'>
                            <i class='fa fa-star fa-fw'></i>
                        </li>
                        <li class='star' title='Good' data-value='3'>
                            <i class='fa fa-star fa-fw'></i>
                        </li>
                        <li class='star' title='Excellent' data-value='4'>
                            <i class='fa fa-star fa-fw'></i>
                        </li>
                        <li class='star' title='WOW!!!' data-value='5'>
                            <i class='fa fa-star fa-fw'></i>
                        </li>
                        </ul>
                    </div>
                    <div class='success-box'>
                        <div class='clearfix'></div>
                        <div class='text-message'></div>
                        <div class='clearfix'></div>
                    </div>
                    <p class="close_button" onclick="close_rating('rating_block', '${code}')">
                        Close
                    </p>
                </div>

                <td colspan="3">
                    <div class="img_placeholder">
                        <img src="https://firebasestorage.googleapis.com/v0/b/services-7d3d2.appspot.com/o/images%2F${images}?alt=media&token=b75a3f38-b4fb-4b94-aea0-7d0d05b1d63c">
                    </div>
                    <div class="giver_name">
                        <div class="title_name_sec">
                            <p class="take_name">${name}</p>
                            <p class="hide_show" id="hide_show" 
                            onclick="toggle_visibility(
                                ['take_phone', 'take_mobile', 'take_email', 'phone_alias', 'mobile_alias', 'email_alias', 'hide_rate']
                                )">Show Details</p>

                                <p class="hide_show" id="hide_rate" style="display: none;" onclick="hide_rating('rating_block')">
                                    Give Rating
                                </p>
                        </div>
                        <div class="star_space">
                            <p class="review__rating">${rating}</p> 
                            <i class="fas fa-star"></i>
                        </div>
                    </div>
                </td>
            </tr>
            <tr class="body_tr">
                <td class="details-td">
                    <div class="label">Phone :</div>
                    <div class="take_phone" id="take_phone" style="display: none;">
                        ${phone}
                    </div>
                    <div class="phone_alias alias" style="display: block;" id="phone_alias">
                        *** **** *** ***
                    </div>
                    <br><div class="label">Mobile :</div> 
                    <div class="take_mobile" id="take_mobile" style="display: none;">
                        ${phone}
                    </div>
                    <div class="mobile_alias alias" style="display: block;" id="mobile_alias">
                        *** **** *** ***
                    </div>
                    <br><div class="label">Email :</div> 
                    <div class="take_email" id="take_email" style="display: none;">
                        ${email}
                    </div>
                    <div class="email_alias alias" style="display: block;" id="email_alias">
                        ********@****.com
                    </div>
                </td>
                <td class="description-td">
                    <div class="description" spellcheck="false">${message}</div>
                    
                    <input type="button" value="Update" class="update">
                </td>
            </tr>
            
            <tr class="sliding_sec">
                <p class="slide_text" style="opacity: 0 ;" id="slide_text">Please save this code to provide the rating to the service provider:  "${code}"</p>
            </tr>

        </table>
    `

    root.appendChild(div);

});

    let usersRef2 = firebase.database().ref('Services/translators');
    usersRef2.orderByValue().on("value", function(snapshot) {
        current_id = snapshot.val().id;
        // console.log(current_id);
    })

    let usersRef = firebase.database().ref('Services');
    usersRef.orderByValue().on("value", function(snapshot) {
        // console.log("I am here" ,snapshot.val());
        // current_id = snapshot.val().translators.id;
        snapshot.forEach(function(data) {
            var data_id = data.val().id;
            // console.log(data.val())
            var all_data = data.val();
            // if(data.val().name !== "translators"){
            // console.log("i ma here")

            // }
            
            if(current_id === data_id && data.val().name !== "translators"){
                let div = document.createElement('div');
                div.className = 'card-h col-md-3';
                div.innerHTML = `
                    <div  id="thumbnail" class="card-thumbnail">
                        <img id="card_main_img" class="card-main-image" src=${all_data.image}>
                    </div>
                    <div class="card-body">
                        <div class="card-text-header">
                            <div id="card_title_space" class="card_title">
                                <a href="../pages/${all_data.name}.html" class="box-title">${all_data.name}</a>
                            </div>        
                        </div>
                    </div>
                    `;
                sibling_id.appendChild(div);

            }

        });
    });


// ------------------------------testing img upload-------------------------------------
upload_img.onchange = (e) => {
    files = e.target.files
    // console.log(files[0])
    reader = new FileReader();
}
 
var formref = firebase.database().ref('translators');
function submitform(event){
    event.preventDefault();
    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;
    var ImgName = upload_img.value;

    var rating_code = makeid();
    

    savedata(name, phone, email, message, rating_code, ImgName);
}

const makeid = () => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 7; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

const savedata = (name, phone, email, message, rating_code, ImgName) =>{


// name is stored in the node, whole url of all the images is same except the name of the image in storage, we can use this 


const ana = () => {
    // console.log(ImgName)
    var uploadtask = firebase.storage().ref('images/'+ files[0].name).put(files[0])
    .then(snapshot => {
        return snapshot.ref.getDownloadURL();
        
    })
    // console.log(uploadtask)
    // ImgUrl = 
    
    // snapshot.ref.getDownloadURL().then(function(url){
    //     console.log(url)
    //     ImgUrl = url
    // })
}
ana()

// console.log(ImgUrl, "url here")

    var newref = formref.push();
    newref.set({
        name: name,
        phone: phone,
        email: email,
        message: message,
        rating: '5',
        code: rating_code,
        img: files[0].name
    })
    .then(function() {
        success.style.display = "block";
        register.style.display = "none";
    })
    .catch(function(error) {
        console.log('Synchronization failed');
    });
}


const hide_rating = (rating_block) =>{
    star_rating();
    rating_id = document.getElementById(rating_block);
    rating_id.style.display = 'block';
}


const close_rating = (rating_block, code_arrived) =>{
    rating_id = document.getElementById(rating_block);
    rating_id.style.display = 'none';
    // console.log("rating_given", rating_given);
    // console.log(code_arrived);

    var ref = firebase.database().ref('translators');
    console.log(ref);
    ref.on("child_added", (snapshot) => {

    if(snapshot.val().code === code_arrived){
        console.log(snapshot.key, "key");
        userId = snapshot.key; 
        var code_send = snapshot.val().code;
        var email_send = snapshot.val().email;
        var message_send = snapshot.val().message;
        var name_send = snapshot.val().name;
        var phone_send = snapshot.val().phone;
        var img_send = snapshot.val().img;
        var rating_test = snapshot.val().rating;
        console.log('rating_test', rating_test);
        var av = Number(rating_given) + Number(rating_test);
        console.log('rating_given', rating_given);
        console.log('av', av);
        var avg = (av / 2);
        console.log('avg', avg)
        var orignal = avg.toFixed(1)
        console.log(orignal);
    
    writeUserData(userId ,code_send, email_send, message_send, name_send, phone_send, orignal, img_send);
    }
    });

}

const writeUserData = (userId ,code_send, email_send, message_send, name_send, phone_send, orignal, img_send) => {
    firebase.database().ref(`translators/${userId}`).set({

        code : code_send,
        email : email_send,
        message : message_send,
        name : name_send,
        phone : phone_send,
        rating : orignal,
        img: img_send
    });
  }
 

const star_rating = () => {
$(document).ready(function(){
    console.log("object")
    /* 1. Visualizing things on Hover - See next part for action on click */
    $('#stars li').on('mouseover', function(){
        var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on
        
        // Now highlight all the stars that's not after the current hovered star
        $(this).parent().children('li.star').each(function(e){
        if (e < onStar) {
            $(this).addClass('hover');
        }
        else {
            $(this).removeClass('hover');
        }
        });
  
    }).on('mouseout', function(){
        $(this).parent().children('li.star').each(function(e){
        $(this).removeClass('hover');
        });
    });
    
    
    /* 2. Action to perform on click */
    $('#stars li').on('click', function(){
        var onStar = parseInt($(this).data('value'), 10); // The star currently selected
        var stars = $(this).parent().children('li.star');
        
        for (i = 0; i < stars.length; i++) {
        $(stars[i]).removeClass('selected');
        }
        
        for (i = 0; i < onStar; i++) {
        $(stars[i]).addClass('selected');
        }
        
        // JUST RESPONSE (Not needed)
        var ratingValue = parseInt($('#stars li.selected').last().data('value'), 10);
        rating_given = ratingValue;
        var msg = "";
        if (ratingValue > 0) {
            msg = "Thanks! You rated this " + ratingValue + " stars.";
        }
        // else {
        //     msg = "We will improve ourselves. You rated this " + ratingValue + " stars.";
        // }
        responseMessage(msg);

        
    });
    
    
    });
    
    
    function responseMessage(msg) {
    $('.success-box').fadeIn(200);  
    $('.success-box div.text-message').html("<span>" + msg + "</span>");
    }
}

