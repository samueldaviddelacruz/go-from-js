const ref = require("ref");
const ffi = require("ffi");

const Struct = require("ref-struct")
const ArrayType = require("ref-array")
const LongArray = ArrayType(ref.types.longlong);
const GoSlice = Struct({
  data: LongArray,
  len:  "longlong",
  cap: "longlong"
});

const cb = ffi.Function('void', ['int']);
var test = ffi.Library("./test.so", {
 
    //Test: ["longlong", [GoSlice]],
    Test: ['void',[cb]]
  
});
/*
const numbers = [12,54,0,423,9]
LongsArray = LongArray(numbers);
var slice = new GoSlice();
slice["data"] = LongsArray;
slice["len"] = numbers.length;
slice["cap"] = numbers.length;
*/

//Aqui es la vaina
test.Test(function(results){
    console.log("onSuccess !",results)
})
