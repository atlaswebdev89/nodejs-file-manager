import path from "node:path";
import process from "node:process";
import os from "node:os";
import messageOutput from "../lib/colorTextConsole.js";

// change working folder
const rootFolder = os.homedir();
process.chdir(rootFolder);

// validator data
const validator = (array) => {
    if (array.length !== 2) {
        throw new Error("ERROR: Invalid input\n");
    }
    return true;
};

const changedir = async (folder) => {
    try {
        if (validator(folder)) {
            folder = folder[1];
        }
        // get absolutely path
        if (!path.isAbsolute(folder)) {
            folder = path.resolve(folder);
        }

        if (folder.startsWith(rootFolder)) {
            try {
                process.chdir(folder);
            } catch (err) {
                throw new Error(`Operation failed: ${err.message}\n\n`, "red");
            }
        } else {
            throw new Error(`Operation failed: Chroot dir "${rootFolder}" don\`t change!!!\n\n`, "red");
        }
    } catch (err) {
        messageOutput(err.message, "red");
    }
};

const backfolder = async () => {
    const currentFolder = process.cwd();
    const targetFolder = path.dirname(currentFolder);
    if (targetFolder.startsWith(rootFolder)) {
        try {
            process.chdir(targetFolder);
        } catch (err) {
            process.stdout.write(err.message);
        }
    } else {
        messageOutput(`Operation failed: Chroot dir "${rootFolder}" don\`t change!!!\n\n`, "red");
    }
};

export default {
    changedir,
    backfolder,
};
