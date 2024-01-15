const moment = require("moment");
var fs = require("fs");

// function Coba() {
//   let total = 100;
//   let sisa = 1;

//   const hasil = (total - sisa)
//   console.log(hasil)
// }

// Coba();

// function Coba1() {
//   const fruits = [];
//   const data = 10 - 4
//   fruits.push(data);
//   console.log(fruits);
// }

// Coba1();

// include node fs module

// delete file named 'sample.txt' Synchronously
// fs.unlinkSync('coba.sh');
// console.log('File deleted!');

function CobaProgress() {
  const t = 560000000;
  const b = 180000000

  const progress = (b / t) * 100;
  const pembulatan = Math.round(progress);
  console.log(progress, "progres");
  console.log(pembulatan, "pembulatan");
  // console.log(t/2)
}

CobaProgress();
