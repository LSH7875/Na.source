require('dotenv').config()
const crypto = require('crypto')

module.exports = (req,res,next)=>{
    let {AccessToken} = req.cookies // 클라이언트의 cookie.accesstoken
    if(AccessToken == undefined){
        console.log('로그인을 진행해주세요')
        // res.redirect('/?msg=로그인을 진행해주세요')
        res.json({result:false, msg:'로그인이 필요합니다.'})
        //json객체를 string으로 보내짐. 
        //이렇게 보내도 express가 알아서 string으로 바꿔서 보내줌.
        return
    }

    let [header,payload,sign] = AccessToken.split('.')
    let signature = getSignature(header,payload)

    if(sign != signature){
        console.log('부적절한 토큰')
        res.clearCookie('AccessToken')
        res.json({result:false, msg:'부적절한 토큰입니다'})
        return
    }
    let {userid,exp} = JSON.parse(Buffer.from(payload,'base64').toString())

    let nexttime = new Date().getTime();
    if(nexttime > exp){
        console.log('토큰 만료')
        res.clearCookie('AccessToken')
        res.json({result:false, msg:'만료된 토큰입니다'})
        return
    }
    req.userid = userid;
    next()
}

function getSignature(header,payload){
    const signature = crypto.createHmac('sha256',Buffer.from(process.env.salt))
                                            .update(header+"."+payload)
                                            .digest('base64')
                                            .replace('==','')
                                            .replace('=','')
    return signature
}
