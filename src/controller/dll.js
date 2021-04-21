import {resReturn} from "../lib/utils";
import path from 'path'
import ffi from 'ffi'
import ref from 'ref'
import {generateBuffer, buffer2String, maxStringLength} from '../lib'
import fs from "fs"

// int authorization (const char* usr, const char* pwd, char* errmsg);
// int business_handle(char *inputvalue, int outputlen ,char *outputdata, char *errmsg);

// require('fs').writeFileSync('./loggg.txt', `${__dirname} , ${process.cwd()}`);

const lib = ffi.Library(path.join(process.cwd(), './dll/sieafstandard.dll'), {
    authorization: [ref.types.int, [ref.types.CString, ref.types.CString, ref.types.CString]],
    business_handle: [ref.types.int, [ref.types.CString, ref.types.int, ref.types.CString, ref.types.CString]],
    read_cardnum: [ref.types.int, [ref.types.CString, ref.types.CString]],
    read_cardnum_and_name: [ref.types.int, [ref.types.CString, ref.types.CString, ref.types.CString]],
})

export default class {
    static async check_avalaible(ctx) {
        ctx.body = resReturn()
    }

    static async authorization(ctx) {
        let errmsgBuffer = generateBuffer(1024)

        const body = ctx.request.body

        let ret = lib.authorization(body.usr, body.pwd, errmsgBuffer)

        if (ret == 0) {
            ctx.body = resReturn(null, ret, buffer2String(errmsgBuffer))
        } else {
            throw new Error(buffer2String(errmsgBuffer))
        }
    }

    static async business_handle(ctx) {
        let outputdataBuffer = generateBuffer()
        let errmsgBuffer = generateBuffer(1024)

        const body = ctx.request.body
        let ret = lib.business_handle(body.inputvalue, maxStringLength, outputdataBuffer, errmsgBuffer)

        if (ret == 0) {
            ctx.body = resReturn(buffer2String(outputdataBuffer), ret, buffer2String(errmsgBuffer))
        } else {
            throw new Error(buffer2String(errmsgBuffer))
        }

    }

    static async read_cardnum(ctx) {
        let cardnumBuffer = generateBuffer(1024)
        let errmsgBuffer = generateBuffer(1024)

        let ret = lib.read_cardnum(cardnumBuffer, errmsgBuffer)

        if (ret == 0) {
            ctx.body = resReturn(buffer2String(cardnumBuffer), ret, buffer2String(errmsgBuffer))
        } else {
            throw new Error(buffer2String(errmsgBuffer))
        }
    }

    static async read_cardnum_and_name(ctx) {
        let cardnumBuffer = generateBuffer(1024)
        let nameBuffer = generateBuffer(1024)
        let errmsgBuffer = generateBuffer(1024)

        let ret = lib.read_cardnum_and_name(cardnumBuffer, nameBuffer, errmsgBuffer)

        if (ret == 0) {
            ctx.body = resReturn({
                    cardnum: buffer2String(cardnumBuffer),
                    name: buffer2String(nameBuffer)
                },
                ret,
                buffer2String(errmsgBuffer)
            )
        } else {
            throw new Error(buffer2String(errmsgBuffer))
        }
    }
}
