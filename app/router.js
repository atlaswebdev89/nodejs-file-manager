import messageOutput from "../lib/colorTextConsole.js";
import list from "./listfiles.js";
import change from "./changefolder.js";
import { readStream, createFile, deleteFile, renameFile, copyFile, moveFile } from './filesOperations.js';
import { hash } from './hash.js';
import { compress, decompress } from './compress.js';
import { system } from './os.js';

export const router = async (command) => {
    const paths = command.toString().trim().split(" ");

    //console.log(paths);
    try {
        switch (paths[0]) {
            case "up":
                await change.backfolder();
                break;
            case "cd":
                await change.changedir(paths);
                break;
            case "ls":
                await list();
                break;
            case "cat":
                await readStream(paths);
                break;
            case "add":
                await createFile(paths);
                break;
            case "rm":
                await deleteFile(paths);
                break;
            case "rn":
                await renameFile(paths);
                break;
            case "cp":
                await copyFile(paths);
                break;
            case "mv":
                await moveFile(paths);
                break;
            case "hash":
                await hash(paths);
                break;
            case "compress":
                compress(paths);
                break;
            case "decompress":
                await decompress(paths);
                break;
            case "os":
                await system(paths);
                break;
            case ".exit":
                process.exit();
                break;
            default:
                throw new Error("ERROR: Invalid input\n");
        }
    } catch (err) {
        messageOutput(err.message, "red");
    }
};