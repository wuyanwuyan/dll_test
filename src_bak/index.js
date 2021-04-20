import path from 'path'
import ffi from 'ffi'
import ref from 'ref'
import {generateBuffer, buffer2String} from './util'

// int authorization (const char* usr, const char* pwd, char* errmsg);
// int business_handle(char *inputvalue, int outputlen ,char *outputdata, char *errmsg);

const lib = ffi.Library(path.join(__dirname, './dll/sieafstandard.dll'), {
    authorization: [ref.types.int, [ref.types.CString, ref.types.CString, ref.types.CString]],
    business_handle: [ref.types.int, [ref.types.CString, ref.types.int, ref.types.CString, ref.types.CString]]
})

let ret

// let theStringBuffer = generateBuffer(1024)
//
// ret = lib.authorization('username', 'sssss', theStringBuffer)
//
// console.log("authorization: ",buffer2String(theStringBuffer), ret)


let outputdata = generateBuffer()
let errmsg = generateBuffer()

ret = lib.business_handle('{"funid": "12"}', 20000, outputdata, errmsg)


console.log(buffer2String(outputdata))
console.log(buffer2String(errmsg))

