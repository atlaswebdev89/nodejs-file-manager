// Parser args argumentov cli. Get username
const getUsernameFromArgs = async () => {
    const arg = process.argv.slice(2);
    const username = arg.reduce((acc, value, index, array) => {
        if (value.startsWith("--username=")) {
            acc = value.replace("--username=", "");
            return acc;
        }
        return acc;
    }, "");
    return username;
};

const username = await getUsernameFromArgs();
const WelcomeMessage = `Welcome to the File Manager, ${username}!\n`;
const ExitMessage = `\nThank you for using File Manager, ${username}, goodbye!\n`;
process.stdout.write(WelcomeMessage);

// cheker command .exit
const checkerEndProgramCommand = (data) => {
    if(data.toString().trim() == ".exit") {
        process.stdout.write(ExitMessage);
        process.exit();
    }
}

process.stdin.on("data", (data) => {
    checkerEndProgramCommand (data);
    process.stdout.write(data);
});

// handler ctrl+c
process.on("SIGINT", (data) => {
    process.exit();
});
// handler ctrl+c
process.on("exit", (data) => {
    process.stdout.write(ExitMessage);
});


