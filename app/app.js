import { getUsernameFromArgs } from "../lib/parserArgvCli.js";
import messageOutput from "../lib/colorTextConsole.js";
import { router } from "./router.js";

const username = await getUsernameFromArgs();

const WelcomeMessage = `Welcome to the File Manager, ${username}!\n`;
const ExitMessage = `\nThank you for using File Manager, ${username}, goodbye!\n`;

messageOutput(WelcomeMessage, "green");
messageOutput(`You are currently in ${process.cwd()}`, "green");

process.stdin.on("data", async (data) => {
    await router(data);
    messageOutput(`You are currently in ${process.cwd()}`, "green");
});

// handler ctrl+c
process.on("SIGINT", (data) => {
    process.exit();
});
// handler ctrl+c
process.on("exit", (data) => {
    messageOutput(ExitMessage, "green");
});
