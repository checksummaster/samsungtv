const WebSocket = require('ws');
var stringify = require('json-stringify-safe');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

const tvIP = '172.20.144.35';
const ws = new WebSocket(`wss://${tvIP}:8002/api/v2/channels/samsung.remote.control`);

ws.onerror = (a) => console.log('error ' + stringify(a,null,2));
ws.onopen = () => console.log('opened.');
ws.onclose = () => console.log('closed.');
ws.onmessage = message => {
  console.log('<--', message.data);
  const data = JSON.parse(message.data);
  if (data.event === 'ms.channel.connect') {
    ws.send(JSON.stringify({
      method: 'ms.remote.control',
      params: {
        TypeOfRemote: 'SendRemoteKey',
        Cmd: 'Click',
        Option: 'false',
        DataOfCmd: 'KEY_MUTE',
      }
    }));
    setTimeout(() => ws.close(), 1000);
  }
};