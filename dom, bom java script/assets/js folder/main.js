//DOM - Document Object Model



// console.log(window);// global object

// console.log(alert("hello"));

// console.log(document);
console.log(document.head);
console.log(document.body);




const heading = document.getElementById('first')
const secondHeading = document.getElementById('second')

console.log(secondHeading);// null

console.log(heading);


const languageInputs = document.getElementsByName('language')

console.log(languageInputs[0]);//Node List

const allParagElems = document.getElementsByTagName('p')
console.log(allParagElems);// Html Collection

const btn = document.querySelector('button')
const allBtns = document.querySelectorAll('button')

console.log(allBtns);

// allBtns.forEach((btn) => {
//     console.log(btn);
// })

// allParagElems.forEach((p) => {
//     console.log(p);
// })

Array.from(allParagElems).forEach((p) => {
    console.log(p);
})


const note = document.querySelector('#main')