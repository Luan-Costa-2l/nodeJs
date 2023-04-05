import { sumAB, subt, mult } from './NewCalc';
// const Calc = require('./Calc');

let n1: number = 10;
let n2: number  = 2;
// with require
// console.log(`Soma: ${Calc.sumAB(n1, n2)}`);
// console.log(`Subtração: ${Calc.subt(n1, n2)}`);
// console.log(`Multiplicação: ${Calc.mult(n1, n2)}`);

console.log(`Soma: ${sumAB(n1, n2)}`);
console.log(`Subtração: ${subt(n1, n2)}`);
console.log(`Multiplicação: ${mult(n1, n2)}`);