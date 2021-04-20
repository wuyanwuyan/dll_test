const iconv = require("iconv-lite");


exports.generateBuffer = (maxStringLength = 20000) => {
    return Buffer.alloc(maxStringLength, 0)
}

exports.buffer2String = (buff) => {

    var theString = iconv.decode(buff, 'GBK');

    var terminatingNullPos = theString.indexOf('\u0000');
    if (terminatingNullPos >= 0) {
        theString = theString.substr(0, terminatingNullPos);
    }

    // console.log('theString ', theString, theString.length)

    return theString
}