import iconv from "iconv-lite"


export const maxStringLength = 20000

export const generateBuffer = (size = maxStringLength) => {
    return Buffer.alloc(size, 0)
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