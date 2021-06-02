function avante(){
    setTimeout(()=>{
        let a = "아반떼";
        console.log('아반떼1 hi');
        return a;
    },1000)
}


// 함수명만 치면 함수가 나오고
// 함수() 하면 함수가실행이 된다.


function 아반떼1(callback){
    //callback();
    setTimeout(()=>{
        console.log('아반떼1 hi')
    },1000);
}


function 소나타1(callback){
    callback();
    setTimeout(()=>{
        console.log('소나타1 hi')
    },2000);
}


function 그랜저1(callback){
    callback();
    setTimeout(()=>{
        console.log('그랜저1 hi')
    },3000);
}



/*callback hell
아반떼1(()=>{
    소나타1(()=>{
        그랜저1()
    })
})

=

*/


const pr = new Promise((resolve,reject)=>{
    resolve('안녕하세요.');//우리가 resolve인지 reject인지 상태를 정해주는 것임
})
.then((data=>{
    console.log(data);
}))


function 아반떼2(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            reject('실패했습니다.')//우리가 값을 정해줌
        },3000)
    })
}
//fetch랑 비슷함....
// 아반떼2()
// .then((data)=>{console.log(data)})
// .catch((error)=>{console.log(error)});
//new 붙으면 객체

// async await: 성공만 처리하겠다.
async function result(){
    let rst = await 아반떼2();//성공한 promise 안의 값을 던져줌. 
    //let rst = 아반떼2(); >>promise 객체를 던져줌
    console.log(rst);
}


//promise객체 안에 promise 객체가 있는 경우
function 아반떼3(){
    return new Promise((resolve,reject)=>{
        resolve(new Promise((resolve,reject)=>{
            resolve('이걸 꺼내보세요.')
        }))
    })
}
async function fff(){
    let result = await 아반떼3()
    .then(console.log(result))   
    }

async function rst2(){
    let rst = await 아반떼3();
    console.log(rst);
}



function 제발(){
    return new Promise( (resolve,reject)=>{
        resolve(꺼내줘1());
    })
}

function 꺼내줘1(){
        const pr = new Promise ( (resolve, reject)=>{
            resolve('꺼내줘')
        })
        const obj={
            text:function(){
                return pr;
            }
        }
        return obj;
    
}

// async function ccc(){
//     let result = await 제발()
//     .then(data=>{
//         console.log(data.text());
//     })
// }

async function ccc(){
    let result = await 제발()
    .then(data=>{
        return data.text()})//promise객체
    .then(text=>
        console.log(text))
}

async function ccc1(){
    let result = 꺼내줘1()
    console.log(result.text);
}


// async function ccc(){
//     let result = await 제발()
//     .then((data)=>{
//         return data;
//     }).then(data=>{
//         let result = await data.text()
//         .then(rst =>{
//             console.log(rst);
//         })
//     })
// }


ccc();