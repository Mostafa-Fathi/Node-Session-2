console.log("module 1 start ");
// console.log(exports);
exports.name = "Mostafa";
exports.age = 20;
// console.log(exports);
exports.obj = { name: "ahmed", age: 20 }
module.exports = function () {
    console.log('log from deafult exports ');
} // export deafult 
module.exports.obj = { name: "ahmed", age: 20 }
// console.log(exports);
