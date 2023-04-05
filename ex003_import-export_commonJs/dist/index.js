"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NewCalc_1 = require("./NewCalc");
// const Calc = require('./Calc');
let n1 = 10;
let n2 = 2;
// with require
// console.log(`Soma: ${Calc.sumAB(n1, n2)}`);
// console.log(`Subtração: ${Calc.subt(n1, n2)}`);
// console.log(`Multiplicação: ${Calc.mult(n1, n2)}`);
console.log(`Soma: ${(0, NewCalc_1.sumAB)(n1, n2)}`);
console.log(`Subtração: ${(0, NewCalc_1.subt)(n1, n2)}`);
console.log(`Multiplicação: ${(0, NewCalc_1.mult)(n1, n2)}`);
