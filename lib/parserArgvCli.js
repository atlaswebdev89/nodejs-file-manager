// Parser args argumentov cli. Get username
export const getUsernameFromArgs = async () => {
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