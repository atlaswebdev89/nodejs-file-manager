import { createHash } from 'node:crypto';
import fs from 'node:fs';
import { resolve } from 'node:path';
import { validator } from './filesOperations.js';
import messageOutput from "../lib/colorTextConsole.js";

export const hash = async (data) => {
    data = validator(data);
    const readStream = fs.createReadStream(resolve(data[1]));
    const hash = createHash('sha256');
    readStream.on('error', (err) => {
        messageOutput(err.message, "red");
    });
    readStream.on('data', (data) => {
        hash.update(data);
    });
    readStream.on('end', () => {
        console.log(`Hash ${hash.digest('hex')} from ${data[1]}`);
    })
}