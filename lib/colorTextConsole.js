export default async function (message, color) {
  switch (color) {
    case "green":
      process.stdout.write(`\x1b[32m${message}\n\x1b[0m`);
      break;
    case "red":
      process.stdout.write(`\x1b[31m${message}\n\x1b[0m`);
      break;
    case "blue":
      process.stdout.write(`\x1b[34m${message}\n\x1b[0m`);
      break;
    case "yellow":
      process.stdout.write(`\x1b[33m${message}\n\x1b[0m`);
      break;
    case "magenta":
      process.stdout.write(`\x1b[35m${message}\n\x1b[0m`);
      break;
    default:
      process.stdout.write(`${message}`);
  }
}
