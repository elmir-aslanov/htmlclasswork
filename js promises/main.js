// //promises

// // const promise = new Promise((resolve, reject) => {

// //     let success = false
// //     if (success) {
// //         resolve('success')
// //     } else {
// //         reject('fail')
// //     }
// // })

// // console.log(promise);


// // resolve - hell olunmaq(handle olunmaq  musbet imtinanin eksi)
// // reject - imtina

// // const promise = ((rejecet, resolve)=>{

// // })

// // console.log(promise);


// // resolve ve reject de ozu bir function sayilir

// // promise status : pending ( gozleme hali )
// // promise status : fulfilled (sucess case ugurlu emliyyat yeni )
// // promise status : rejected (imtina hali)




// // blocks : then, catch, finally

// // then - sucess fulfilled neticesini thenle tuturam
// // catch - rejected error yeni (catchin menasi tutmaq)
// // finally - netice ne olursa olsun ister ugurlu, ister de ugursuz finallly blocke isleyir her zaman


// // promise.then((result) => {
// //     console.log(result);
// // }).catch((error) => {
// //     console.log(error);
// // }).finally(() => {
// //     console.log('finally block');
// // })


// const myPromise = new Promise((res, rej) => {
//     const students = ['farman', 'elmira', 'elmir', 'maryam']
//     // students.length = 0`

//     if (students.length > 0) {
//         res(students)
//     } else {
//         rej('no students')
//     }
// })

// // promise chaing -zencirvari 

// myPromise.then((result) => {
//     result.pop()
//     return result 
// }).then((data)=>{
// console.log(data);
// })
// .catch((err) => {
//     console.log(err);
// })






// fetch api        


// HTTP requst methods: GET, DELETE, POST, PUT(PATCH)

// const API_URL = 'https://northwind.vercel.app/api/suppliers'
// const BASE_URl ='https://northwind.vercel.app/api'

fetch('https://northwind.vercel.app/api/suppliers').then((response) => {
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);

    }
    return response.json()

}).then((data) => {
    console.log('suppliers', data);
})

    .catch((err) => {
        console.log(err);
    })

fetch('https://northwind.vercel.app/api/categories').then((response) => {
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);

    }
    return response.json()

}).then((data) => {
    console.log('categories', data);
})

    .catch((err) => {
        console.log(err);
    })