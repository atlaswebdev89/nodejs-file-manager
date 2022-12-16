import os from 'node:os';
import { validator } from './filesOperations.js';
import messageOutput from "../lib/colorTextConsole.js";

// Checker send argument Need start with '--'
const parser = async (data) => {
    if(data.startsWith('--')) {
        return data.replace('--', '');
    }else {
        throw new Error("ERROR: Invalid input\n");
    }
}

export const system = async (data) => {
    try {
        data = validator(data);
        const cmd = await parser(data[1]);
        router(cmd);
    }catch (err) {
        messageOutput(err.message, "red");
    }
}

const router = async (path) => {
    try {
        switch (path) {
            case "EOL":
                await EOL();
                break;
            case "cpus":
                await cpus();
                break;
            case "homedir":
                await homedir();
                break;
            case "username":
                await username();
                break;
            case "architecture":
                await architecture();
                break;
            default:
                throw new Error("ERROR: Invalid input\n");
        }
    }catch (err) {
        messageOutput(err.message, "red");
    }
}

const EOL = async () => {
    messageOutput(JSON.stringify(os.EOL), "green");
}

const homedir = async () => {
    messageOutput(`Homedir - ${JSON.stringify(os.homedir())}`, "green");
}

const architecture = async () => {
    messageOutput(`Architecture - ${JSON.stringify(os.arch())}`, "green");
}

const username = async () => {
    messageOutput(`Current user - ${JSON.stringify(os.userInfo().username)}`, "green");
}

const cpus = async () => {
    const countCpus = os.cpus().length;
    const infoCpus = os.cpus();

    const result = os.cpus().map((elem) => {
            const {times, ...result} = elem;
        return result;
    })

    messageOutput(`Count proccessors - ${countCpus}\nInfoCpus:`, "green");
    result.forEach((value) => {
        messageOutput(`${JSON.stringify(value)}`, "green");
    });
    console.log('\n');
}