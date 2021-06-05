var button_space = document.getElementById("button_space");
var register = document.getElementById("register");
var take_service_section = document.getElementById('take_service_section');
var extra_big = document.getElementById('extra_big');
var chat_body = document.getElementById('chat_body');

const give = () =>{
    button_space.style.display = "none";
    register.style.display = "block";
}
const take = () =>{
    button_space.style.display = "none";
    take_service_section.style.display ="block";
    extra_big.style.display ="block";
}


// var num = [];

function toggle_visibility(id) {

    var make_visible = document.getElementById('slide_text');
    if(make_visible.style.opacity === '0'){
        make_visible.style.opacity = '1';
        make_visible.style.marginTop = '-35px';
    }
    else{
        make_visible.style.opacity = '0';
        make_visible.style.marginTop = '0px';
    }

    var e = document.getElementById(id[3]);
    if(e.style.display == 'block')
       {e.style.display = 'none';}
    else
       {e.style.display = 'block';}

    var e = document.getElementById(id[4]);
    if(e.style.display == 'block')
        {e.style.display = 'none';}
    else
        {e.style.display = 'block';}

    var e = document.getElementById(id[5]);
    if(e.style.display == 'block')
        {e.style.display = 'none';}
    else
        {e.style.display = 'block';}

    var e = document.getElementById(id[6]);
    if(e.style.display == 'none')
        {e.style.display = 'block';}
    else
        {e.style.display = 'none';}
    
    var e = document.getElementById(id[0]);
    if(e.style.display == 'none')
        {e.style.display = 'block';}
    else
        {e.style.display = 'none';}

    var e = document.getElementById(id[1]);
    if(e.style.display == 'none')
        {e.style.display = 'block';}
    else
        {e.style.display = 'none';}

    var e = document.getElementById(id[2]);
    if(e.style.display == 'none')
        {e.style.display = 'block';}
    else
        {e.style.display = 'none';}
}

const chat_out = (id) => {
    var e = document.getElementById(id);
    var input_val =  e.value
    // console.log(input_val);
    if(input_val !== ''){
        let div = document.createElement('div');
        div.className = 'chat-bubble me';
        input_val = input_val.toLowerCase()
        div.innerText = input_val;
        chat_body.appendChild(div);
        if(input_val === 'hello' || input_val === 'hi'){
            let div2 = document.createElement('div');
            div2.className = 'chat-bubble you';
            div2.innerText = 'Hello! How can I help you?';
            chat_body.appendChild(div2);
           }
        else if(input_val.includes('website')){
                let div3 = document.createElement('div');
                div3.className = 'chat-bubble you';
                div3.innerText = 'We provide services that are given in the front page.';
                chat_body.appendChild(div3);
            }
        else if(input_val.includes('field') || input_val.includes('service')){
                let div4 = document.createElement('div');
                div4.className = 'chat-bubble you';
                div4.innerText = 'These are the only field available, you can browse them.';
                chat_body.appendChild(div4);
            }
        else{
                let div3 = document.createElement('div');
                div3.className = 'chat-bubble you';
                div3.innerText = 'I am sorry, I am unable to answer you question, please contact the operator, contact details are available in contact us page';
                chat_body.appendChild(div3);
            }
    }


    document.getElementById(id).value = '';
}




