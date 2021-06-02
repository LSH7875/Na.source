let cookie = 'AccessToken=eyJ0cHkiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyaWQiOiJhYWEiLCJleHAiOjE2MjI2MDU3NjUzNDJ9.syNK4qcYuYCm7sAdRf3Azh1jB2yy57FTOtzCuA8NV5c; fffffaaa=dafadsfads.asdfjioef32l.30fadsfasd; toekn=dafadsf.adsfasdfadsf.afdasdfasdfadadsfadsfasdfawefdsf';

let cookieAccess=cookie.split(';');//특정 string을 split ㅔ 있는 단위로 끊어서 배열 형태로 반환해준다.
console.log(cookieAccess);

cookieAccess.forEach(v=>{
    let [name,value] = v.split('=');
    if(name.trim()== 'AccessToken'){
        let jwt = value.split('.');
        console.log(jwt[0],jwt[1],jwt[2]);
        let payload = Buffer.from(jwt[1],'base64').toString();
        let {userid} = JSON.parse(payload);
        //console.log(userid);
        console.log('첫번째 방법:',userid)
    };
})


//trim은 공백을 제거해주는 함수


//두번째 방법
// let [userid] = 
// cookie.split(';').filter(v=>v.indexof('AccessToken')==0)
// .map(v=>{
//     let [name,value] = v.split('=');
// return JSON.parse(Buffer.from(value.split('.')[1],'base64').toString().userid                                
//                             })

// console.log('두번째방법:',userid);