var tv = require('./tv');


var m_tv = new tv();
var ip = process.env.SAMSUNGTV; //'172.20.144.35'
var name = process.env.SAMSUNGTVNAME
if (ip) {
    m_tv.connect(ip,name,function(){

        const readline = require('readline');
        readline.emitKeypressEvents(process.stdin);
        process.stdin.setRawMode(true);
        process.stdin.on('keypress', (str, key) => {
            if (key.ctrl && key.shift && key.name === 'q') {
                m_tv.sendCommand('KEY_HDMI');
            } 

            else if (key.ctrl && key.name === 'c') {
                process.exit();
            }

            else {
                console.log(`You pressed the "${str}" key`);
    console.log();
    console.log(key);
    console.log();
            }
                   
        }); 
    });   
}
else {
    console.log("Set your tv IP : \"set SAMSUNGTV=x.x.x.x\"");
    process.exit(-1);
}
console.log("ctrl-shift-q to switch HDMI, ctrl-c to quit");

