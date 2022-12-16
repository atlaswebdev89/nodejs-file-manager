import fs from "node:fs";
import { open, stat, writeFile, unlink, rename } from "node:fs/promises";
import path from "node:path";
import messageOutput from "../lib/colorTextConsole.js";

// delete from array null elements
export const deleteEmptyArray = (arr) => arr.filter((elem) => elem !== "");

export const validator = (argv) => {

    const result = deleteEmptyArray(argv);

    if (result.length !== 2) {
        throw new Error("ERROR: Invalid input\n");
    }
    return result;
};

export const validatorRename = (data) => {

    const result = deleteEmptyArray(data);

    if (result.length !== 3) {
        throw new Error("ERROR: Invalid input\n");
    }
    return result;
}

export const readStream = async (file) => {
    try {
        file = validator(file);
        const pathFile = path.resolve(file[1]);
        const stream = fs.createReadStream(pathFile);
        // handler error
        stream.on("error", (err) => {
            messageOutput(err.message, 'red');
        });
        stream.on("end", () => {
            process.stdout.write('\n');
        })
        stream.pipe(process.stdout);
    } catch (err) {
        messageOutput(err.message, "red");
    }
};

// function exist files
const fileExists = async (file) => {
    try {
        await stat(file);
        return true;
    } catch (err) {
        return false;
    }
};

// CASE on fs.open.. 
// export const createFile = async (data) => {
//     let fd;
//     try {
//         data = validator(data);
//         if (!(await fileExists(data[1]))) {
//             fd = await open(data[1], "w");
//             await fd.close();
//             messageOutput(`File ${data[1]} create`, "green");
//         } else {
//             messageOutput(`File ${data[1]} already exists!!`, "green");
//         }
//     } catch (err) {
//         messageOutput(err.message, "red");
//     }
// };

// create files
export const createFile = async (data) => {
    try {
        data = validator(data);
        await writeFile(data[1], '', { flag: 'wx' });
        messageOutput(`File ${data[1]} create`, "green");
    } catch (err) {
        messageOutput(err.message, "red");
    }
};

export const deleteFile = async (data) => {
    try {
        data = validator(data);
        await unlink(data[1]);
        messageOutput(`File ${data[1]} delete`, "green");
    } catch (err) {
        messageOutput(err.message, "red");
    }
}

export const renameFile = async (data) => {
    try {
        data = validatorRename(data);
        await rename(data[1], data[2]);
        messageOutput(`File ${data[1]} rename in ${data[2]}`, "green");
    } catch (err) {
        messageOutput(err.message, "red");
    }
}

export const copyFile = async (data) => {
    try {
        data = validatorRename(data);
        const readStream = fs.createReadStream(data[1]);
        const writeStream = fs.createWriteStream(data[2]);

        readStream.pipe(writeStream).on('error', (err) => {
            messageOutput(err, "red");
        });

        writeStream.on('finish', () => {
            messageOutput(`File ${data[1]} copy in file ${data[2]} success`, "green");
        })

    } catch (err) {
        messageOutput(err.message, "red");
    }
}

export const moveFile = async (data) => {
    try {
        data = validatorRename(data);
        const readStream = fs.createReadStream(data[1]);
        const writeStream = fs.createWriteStream(data[2]);
        readStream.pipe(writeStream);

        readStream.on('close', async () => {
            await unlink(data[1]);
            messageOutput(`File ${data[1]} move ${data[2]}`, "green");
        });

        writeStream.on('error', (err) => {
            messageOutput(err.message, "red");
        })

    } catch (err) {
        messageOutput(err.message, "red");
    }
}