class ColumnarTranspositionCipher {
    constructor() {
        this.alphabet = "aąbcćdeęfghijklłmnńoópqrsśtuwxyzźż"
    }

    encrypt(msg, keyWord) {


        //initialization of array which will store order of columns
        var columns = this.calculateOrder(keyWord);

        //fill table with message 
        // 2d array - keyword length x ceil(msg length / keyword length)
        //when we end fill array with letters from msg then - place empty string in all free cells
        let letterCount = 0;
        let level = Math.ceil(msg.length / keyWord.length)
        var encryptionTable = new Array(level);
        for (let i = 0; i < level; i++) {
            encryptionTable[i] = new Array(keyWord.length);
            for (let j = 0; j < keyWord.length; j++) {
                if (letterCount < msg.length) {
                    encryptionTable[i][j] = msg[letterCount];
                    letterCount++;
                }
                else {
                    encryptionTable[i][j] = '';
                }
            }
        }
        //encrypt message - add letter one by one 
        var encryptedMsg = '';
        for (let i = 0; i < keyWord.length; i++) {
            let index = columns.indexOf(i);
            for (let j = 0; j < level; j++) {
                if (encryptionTable[j][index] != undefined && encryptionTable[j][index] != '') { }
                encryptedMsg += encryptionTable[j][index]
            }
        }
        output.innerText = encryptedMsg;

    }

    decrypt(encMsg, key) {
       
        //init array with order of columns defined by key
        var columns = this.calculateOrder(key);

        //init table with encrypted message - fill proper columns based on key
        let letterCount = 0;
        let level = Math.ceil(encMsg.length / key.length)
        var decryptionTable = new Array(key.length);
        for (let i = 0; i < key.length; i++) {
            decryptionTable[i] = new Array(level);
            for (let j = 0; j < level; j++) {
                if( (j * key.length) + columns.indexOf(i) < encMsg.length){
                    decryptionTable[i][j] = encMsg[letterCount];
                    letterCount++;
                }
                else{
                    decryptionTable[i][j] =''
                }
            }
        }

        //read encrypted message by chosing right letter from each column in order based on key
        var decryptedMsg = "";
        for(let j =0; j<level;j++)
        for(let i =0;i<key.length;i++){
            let index = columns[i]
            decryptedMsg += decryptionTable[index][j];
        }

        output.innerText = decryptedMsg;
    }


    calculateOrder(keyWord) {
        //make keyword all lower case 
        keyWord = keyWord.toLowerCase();

        //initialization of array which will store order of columns
        var columns = new Array(keyWord.length);

        //set order for letter in keyword
        let counter = 0;
        for (let i = 0; i < this.alphabet.length; i++) {
            for (let j = 0; j < keyWord.length; j++) {
                if (keyWord[j] == this.alphabet[i]) {
                    columns[j] = counter;
                    counter++;
                }
            }
        }
        return columns;
    }
}