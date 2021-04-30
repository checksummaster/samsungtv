var tv = require('./tv');
var keycode = require('keycode');


var m_tv = new tv();
var ip = process.env.SAMSUNGTV; //'172.20.144.35'
var name = process.env.SAMSUNGTVNAME
if (ip) {
    m_tv.connect(ip,name,function(){
        
        var ioHook = require('iohook');
        const CTRL = 29;
        const ALT = 56;
        const F1 = 59;
        const F2 = 60;
        const F7 = 65;
        ioHook.start();
        console.log([keycode("ctrl"), keycode("f1")]);
        ioHook.registerShortcut([29, 59], (keys) => {
            m_tv.sendCommand('KEY_HDMI');
        },()=>{}); 

    });
}
else {
    console.log("Set your tv IP : \"set SAMSUNGTV=x.x.x.x\"");
    process.exit(-1);
}

