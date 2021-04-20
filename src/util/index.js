import iconv from "iconv-lite"


export const generateBuffer = (maxStringLength = 20000) => {
    return Buffer.alloc(maxStringLength, 0)
}

export const buffer2String = (buff) => {

    var theString = iconv.decode(buff, 'GBK');

    var terminatingNullPos = theString.indexOf('\u0000');
    if (terminatingNullPos >= 0) {
        theString = theString.substr(0, terminatingNullPos);
    }

    // console.log('theString ', theString, theString.length)

    return theString
}