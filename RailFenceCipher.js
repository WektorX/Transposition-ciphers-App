class RailFenceCipher {
    constructor() { }

    encrypt(msg, rail) {
        //get msg length and create an array
        let msgLength = msg.length;
        let encryptionTable = new Array(rail);
        //create 2d Array and fill with empty string
        for (let i = 0; i < rail; i++) {
            encryptionTable[i] = new Array(msgLength);
            for (let j = 0; j < msgLength; j++) {
                encryptionTable[i][j] = '';
            }
        }

        //set next letters on appropriate place in array (in shape VVV)
        let pong = 1;
        let step = 0;
        for (let i = 0; i < msgLength; i++) {
            encryptionTable[step][i] = msg.charAt(i);
            step += pong;
            if (step == rail || step == -1) {
                pong *= -1;
                step += pong * 2;
            }
        }

        //read letter by letter from array - final encrypted message
        var encryptedMsg = '';
        for (let i = 0; i < rail; i++) {
            for (let j = 0; j < msgLength; j++) {
                encryptedMsg += encryptionTable[i][j];
            }
        }
        output.innerText = encryptedMsg;
    }

    decrypt(encMsg, rail){

        //init variables (table and get encrypted message length)
        var decryptionTable = new Array(rail)
        var encdMsgLength = encMsg.length
        //set array to 2d and fill with empty strings
        for (let i = 0; i < rail; i++) {
            decryptionTable[i] = new Array(encdMsgLength);
            for (let j = 0; j < encdMsgLength; j++) {
                decryptionTable[i][j] = ''
            }
        }
    
        //set letter 'x' on place where should be letter in encryption table
        var pong = 1;
        let step = 0;
        for (let i = 0; i < encdMsgLength; i++) {
            decryptionTable[step][i] = "+";
            step += pong;
            if (step == rail || step == -1) {
                pong *= -1;
                step += pong * 2;
            }
        }
    
        //replace each letter 'x' with next letter in encrypted message
        var counter = 0;
        for (let i = 0; i < rail; i++) {
            for (let j = 0; j < encdMsgLength; j++) {
                if (decryptionTable[i][j] == "+") {
                    decryptionTable[i][j] = encMsg.charAt(counter);
                    counter += 1;
                }
            }
        }
        // read each next letter and merge it to original message
        var message = '';
        for (let i = 0; i < encdMsgLength; i++) {
            for (let j = 0; j < rail; j++) {
                if (decryptionTable[j][i] != '') {
                    message += decryptionTable[j][i]
                }
            }
        }

        output.innerText = message;
    }

}




