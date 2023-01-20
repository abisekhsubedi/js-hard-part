// // If you use "NodeNext" as a moduleResolution you need to provide explicit file extension for your local import whereas this is not the case when importing from node_modules.
// // With "NodeNext" moduleResolution you can import .cjs files along with .js files.
// // Basically, "NodeNext" moduleResolution gives us better interop between cjs and esm modules.

// // // ./helper.ts
// // import { hello } from "./helper.js"
// // console.log(hey, hello);

// // // fs from node_modules
// // import {read} from "fs";
// // console.log(read)

// // // ./example.cjs
// // import hey from "./example.cjs"
// // console.log(hey)


// // let's learn about map function

// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// // in-line callback function
// /* map() function creates new array with the results of calling a provided fucntion on every element in the calling array.
//  * map(callbackfn(element, index, array), thisArg)
// */
// const newArray = arr.map(function (element, index, array) {
//     // console.log(index, ...array);
//     return element * 2;
// }, this)

// // spread parameter
// console.log(...newArray);

// // Create a Car contructor
// function Car(make, model, year) {
//     this.make = make;
//     this.model = model;
//     this.year = year;
//     this.color = undefined;
//     // Add a method to change color of the car
//     this.changeColor = function (color) {
//         this.color = color;
//     }
//     // Add a method to get the car's description
//     this.getDescription = function () {
//         return `${this.year} ${this.make} ${this.model} ${this.color}`;
//     }
// }
// setTimeout(() => {
//     console.log('\nresult value after 0 second', result);

// }
//     , 0);
// // make a car object
// const myCar = new Car('Honda', 'Civic', 2019);
// console.log(myCar?.color);
// myCar.changeColor('red')
// console.log(myCar?.color);
// console.log(myCar.getDescription());

// // Create a new object with buyer details
// const Buyer = {
//     name: 'John',
//     age: 30,
//     address: {
//         street: '123 Main St',
//         city: 'New York',
//         state: 'NY'
//     },
// }

// // Spread myCar object into new Buyer object
// const newBuyer = { ...Buyer, ...myCar };
// console.log(newBuyer);

// // Convert myCar object into an array
// const myCarArray = Object.entries(myCar);
// console.log(myCarArray);

// // loop through myCarArray
// for (let [key, value] of myCarArray) {
//     console.log(`${key}: ${value}`);
// }

// // filter myCarArray to get only the methods, don't use arrow function here
// const myCarMethods = myCarArray.filter(function ([key, value]) {
//     return typeof value === 'function';
// }
// );
// console.log(myCarMethods);

// // Give an example reduce function
// const myCarReduce = myCarArray.reduce(function (acc, [key, value]) {
//     acc[key] = value;
//     return acc;
// }
//     , {});
// console.log(myCarReduce);

// const arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// const result = arr2.reduce((acc, curr) => acc + curr)
// console.log(result);

// const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
// const data = await response.json()
// console.log(data.id);

// async function getData() {
//     // fetch pokemon data
//     const response = await fetch('https://pokeapi.co/api/v2/pokemon/ho-oh');
//     const data = await response.json();
//     console.log(data.moves.reduce((acc, curr) => acc + curr.move.name + ', ', '').split(', ').sort((a, b) => a.localeCompare(b)));
// }
// getData();

// const express = require('express');
import path from "path";
import url from "url";
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import session from 'express-session'
import mongoose from 'mongoose';
import connectMongoDbSession from 'connect-mongodb-session';
// Access to all CRUD operation on this model
import UserModel from "./models/user.js";

const app = express();

mongoose.connect(process.env.mongodb, {
    // @ts-ignore
    // no longer needed in mongoose 5.7.1
    // useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
}).then((res) => {
    console.log('\nconnected to database');
})

const MongoDbStore = connectMongoDbSession(session);
const store = new MongoDbStore({
    uri: process.env.mongodb,
    collection: 'mySessions',
},
(err) => {
    console.log(err);
})
const __dirname = path.resolve("./", url.fileURLToPath(import.meta.url));
console.log(__dirname);

// app.set('views', path.join(import.meta.url))
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false}))

app.use(session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store
}))
app.get("/", (req, res) => {
    // @ts-ignore
    req.session.info = {
        'page': 'homepage',
        'why':'to learn nodejs'
    }
    // console.log(req.session);
    // console.log(req.session.id);
    // res.send('<h1>hello world</h1>');
    res.render("homepage")
})

app.listen(3030, 'localhost', () => {
    console.log('server is running on port 3030');
    console.log('\nhttp://localhost:3030');

})
