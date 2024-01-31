const moment = require("moment");
var fs = require("fs");
const _ = require("lodash");

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

// function CobaProgress() {
//   const t = 560000000;
//   const b = 180000000

//   const progress = (b / t) * 100;
//   const pembulatan = Math.round(progress);
//   console.log(progress, "progres");
//   console.log(pembulatan, "pembulatan");
//   // console.log(t/2)
// }

// CobaProgress();

// function randomNumberPerSecond(){
//   let lower = 0;
//   let upper = 100;

//   // Printing 5 random values
//   // in range 2 and 11
//   for (let i = 0; i < 1; i++) {
//     setInterval(() => console.log("Hello" + " " + _.random(lower, upper)), 1000);
//   }
// }

// randomNumberPerSecond()

function CobaTanggal() {
  const tgl = "2024-01-25T12:00:24.008Z";
  const i = _.random(0, 100);
  // setInterval(() => console.log("hello" + i), 1000);
  const waktu = Date.now()
const dt = moment(waktu).locale("fr").format()
  console.log(dt)
  
}

CobaTanggal();
