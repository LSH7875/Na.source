const chatBtn = document.querySelector('#chatBtn');
const chatRoom = document.querySelector('#chatRoom');


let socket = io();


let flag = undefined;


chatBtn.addEventListener('click',()=>{
    switch(flag){
        case true:
            //열린 상태서 다시 누를 때>> 닫히는 기능 
            flag = false;
            chatRoom.style.display = 'none';
            
        break;
        case false:
            flag = true;
            //처음 제외하고 다시 열릴때
            chatRoom.style.display = "block";
            chatBtn.innerHTML = '채팅';
            chatBtn.dataset.value = 0;
            
        break;
        case undefined:
            //음으로 이 버튼을 눌렀을 때
            flag = true;
            getChatRoom();

        break;
    }
});

async function getChatRoom(){
    let url = "http://localhost:3000/chat";
    let options = {
        method:"get"
    }
    let response = await fetch(url,options);//결과값:promise=>await
    //GET /chat HTTP 1.1
    let result = await response.text();//응답메세지를 text로 바꿈
    //result 값이 실패시는 json인데 성공시에는 html즉 text로 온다.
    //사실 말도 안되는 내용이다.
    if(isJson(result)){
       //로그인 실패시
       let json = JSON.parse(result);
       if(json.result == false) alert(json.msg);
        return
    }else{
        chatRoom.innerHTML = result;
        //로그인 처리가 잘 되었을때
        socketChat();
    }   
}

function send(){
    const msg = document.querySelector('#msg');
    console.log(msg.value);
    socket.emit(`send`,msg.value);
    addCard(msg.value,'my')
    msg.value='';
}

 
function addCard(text,type,id){
    //type:my | you
    const chat = document.querySelector('#chat');
    const div = document.createElement('div');
    const span = document.createElement('span');
    if(id){span.innerHTML = `<div>id:${id}</div><div>${text}</div>`;}
    else{span.innerHTML = `${text}`;}
    span.classList.add(type);
    div.appendChild(span);
    chat.appendChild(div);
    chat.scrollTop=chat.scrollHeight;
}

function socketChat(){
    socket.on('connect',()=>{});
    
    socket.on('msg',(data,id)=>{
        chatBtn.dataset.value =parseInt(chatBtn.dataset.value)+1;
        //dataset.
        if(flag == false){
            //창이 닫혀있을 때 작업
            chatBtn.innerHTML=`채팅<span style="color:red; padding:2px">${chatBtn.dataset.value}</span>`
        }
        addCard(data,'you',id)
    })

}

function isJson(str){
    try{
        let json = JSON.parse(str)
        return (typeof json == 'object');
    }catch(e){
        //json으로 변환할 수 없는 텍스트이면 false반환
        return false;
    }
}

//로그인을 한 사람에게만 채팅을 허용하게 하려함....
//토큰을 갖고 있지 않으면 버튼 누를때 안내창 뜨게 함...
//아니면 로그인된 페이지에서만 보여지게끔