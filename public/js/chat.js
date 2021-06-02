const chatBtn = document.querySelector('#chatBtn');
const chatRoom = document.querySelector('#chatRoom');

chatBtn.addEventListener('click',async()=>{
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
    
    }   
    }
);

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