import fs from "node:fs";
import path from "node:path";

export default function () {
  // read list files and folder in current directory
  const list = fs.readdirSync(process.cwd());

  // function sort array objects of the
  const sortName = (a, b) => {
    const firstName = a.Name.startsWith(".")
      ? a.Name.split("").slice(1).join("").toLowerCase()
      : a.Name.toLowerCase();
    const SecondName = b.Name.startsWith(".")
      ? b.Name.split("").slice(1).join("").toLowerCase()
      : b.Name.toLowerCase();
    if (firstName < SecondName) return -1;
    if (firstName > SecondName) return 1;
    return 0;
  };

  const arrDirs = list
    .filter((elem) => fs.statSync(path.resolve(elem)).isDirectory())
    .map((elem) => {
      return {
        Name: `${elem}`,
        Type: "directory",
      };
    })
    .sort(sortName);
  const arrFiles = list
    .filter((elem) => fs.statSync(path.resolve(elem)).isFile())
    .map((elem) => {
      return {
        Name: `${elem}`,
        Type: "file",
      };
    })
    .sort(sortName);
  console.table([...arrDirs, ...arrFiles]);
}
