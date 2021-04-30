const WebSocket = require('ws');
const fs = require('fs');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

function tv() {

  this.connection = undefined;

  this.sendCommand = function(input) {
    if (input) {
      this.connection.send(JSON.stringify({
        method: 'ms.remote.control',
        params: {
          Cmd: 'Click',
          DataOfCmd: input,
          Option: 'false',
          TypeOfRemote: 'SendRemoteKey'
        }
      }));
    }
  };

  this.connect = function(address,name,cb) {
    var add = `wss://${address}:8002/api/v2/channels/samsung.remote.control`;
    add += "?name=" + (name.toString('base64'));
    var tokenfind = false;
    try {
      data = JSON.parse(fs.readFileSync("id.json"));
      add += "&token=" + data.data.token;
      tokenfind = true;
    }
    catch(e) {

    }
    this.connection = new WebSocket(add);
    this.connection.on('open', () => {
    });

    this.connection.on('message', (message) => {
      const data = JSON.parse(message);
      if (data.event === 'ms.channel.connect') {
        if (tokenfind === false) {
          fs.writeFileSync("id.json",JSON.stringify(data));
        }
        cb(this);
      }
    });
  };

  this.disconnect = function() {
    if (this.connection) {
      this.connection.close();
      this.connection = undefined;
    }
  };
}

module.exports = tv;
