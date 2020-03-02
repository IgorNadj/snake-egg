import { Generator } from './generator/Generator';
import { writeFile } from "fs";

const generator = new Generator();

generator.generate(5, 5, 4);













// writeFile('./polyominos.js', JSON.stringify(data), function (err) {
//   if (err) {
//     return console.log(err);
//   }
//   console.log('Done\n');
// });
