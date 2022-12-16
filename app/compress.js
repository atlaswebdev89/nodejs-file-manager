import zlib from 'node:zlib';
import fs from 'node:fs';
import { resolve } from 'node:path';
import { validatorRename as validatorZlib } from './filesOperations.js';
import messageOutput from "../lib/colorTextConsole.js";
import { pipeline } from 'node:stream/promises';
import path from 'node:path';

export const compress = async (data) => {
    try {
        data = validatorZlib(data);
        const readStream = fs.createReadStream(path.resolve(data[1]));
        const writeStream = fs.createWriteStream(path.resolve(data[2]));
        const zlibBrotli = zlib.createBrotliCompress();
        await pipeline(
            readStream,
            zlibBrotli,
            writeStream
        );
        messageOutput(`File ${data[1]} compress in ${data[2]} success!`, 'green');
    } catch (err) {
        messageOutput(err.message, 'red');
    }
}

export const decompress = async (data) => {
    try {
        data = validatorZlib(data);
        const readStream = fs.createReadStream(path.resolve(data[1]));
        const writeStream = fs.createWriteStream(path.resolve(data[2]));
        const zlibBrotli = zlib.createBrotliDecompress();
        await pipeline(
            readStream,
            zlibBrotli,
            writeStream
        );
        messageOutput(`File ${data[1]} decompress in ${data[2]} success!`, 'green');
    } catch (err) {
        messageOutput(err.message, 'red');
    }
}