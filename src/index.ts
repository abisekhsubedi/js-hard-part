// If you use "NodeNext" as a moduleResolution you need to provide explicit file extension for your local import whereas this is not the case when importing from node_modules.
// With "NodeNext" moduleResolution you can import .cjs files along with .js files.
// Basically, "NodeNext" moduleResolution gives us better interop between cjs and esm modules.

// ./helper.ts
import { hello } from "./helper.js"
console.log(hey);

// fs from node_modules
import {read} from "fs";
console.log(read)

// ./example.cjs
import hey from "./example.cjs"
console.log(hey)
