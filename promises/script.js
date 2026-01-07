// // promises

// const promise = new Promise((resolve, rejecet) => {
//     let success = true

//     if (success) {
//         resolve('success')
//     } else {
//         rejecet('fail')
//     }

// })

// // console.log(promise); 




// // promise state: pending
// // promise state: fulfilled
// // promise state: rejecet


// // block: then, catch, finally


// // promise.then((result) => {
// //     console.log(result);
// // }).catch((error) => {
// //     console.log(error);
// // }).finally(() => {
// //     console.log('finally block');
// // })


// const myPromise = new Promise((res, rej) => {
//     const students = ['farman', 'elmira', 'elmir', 'maryam']
//     // students.length = 0
//     if (students.length > 0) {
//         res(students)
//     } else {
//         rej('no student')
//     }
// })

// myPromise.then((result) => {
//     result.pop()
//     return result
// }).
//     then((data) => {
//         return data.push('murad')
//     }).
//       then((data) => {
//         console.log(data);
//     }).
//     catch((err) => {
//         console.log(err);
//     })


// fetch api

// HTTP request methods: GET, DELETE, POST, PUT(PATCH)

// const API_URL = 'https://northwind.vercel.app/api/suppliers'
// const BASE_URL ='https://northwind.vercel.app/api'


// fetch('https://northwind.vercel.app/api/elmir').then((response) => {
//     // console.log(response.json());
//     console.log(response);

//     if (!response.ok) {
//         throw new Error(`Error occured! status:${response.status}`)
//     }

//     return response.json()
// })
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((err) => {
//         console.log(err);
//     })

// fetch(URL, options)
//   .then((response) => {
//       if (!response.ok) {
//           throw new Error(response.status);
//       }
//       return response.json();
//   })
//   .then((data) => {
//       // data ilə iş
//   })
//   .catch((error) => {
//       // error ilə iş
//   });

// fetch(URL, options)
//     .then((response) => {
//         if (!response.ok) {
//             throw new Error(response.status);
//         }
//         return response.json();
//     })
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((error) => {
//         console.log(error);
//     })


// const URL = "https://fakestoreapi.com/products";

// // fetch(URL)
// //   .then((response) => {
// //       if (!response.ok) {
// //           throw new Error(response.status);
// //       }
// //       return response.json();
// //   })
// //   .then((data) => {
// //       console.log(data); // bütün users
// //   })
// //   .catch((error) => {
// //       console.log("Error:", error);
// //   });


// const url = "https://fakestoreapi.com/products"

// fetch(url)
//     .then((response) => {
//         if (!response.ok) {
//             throw new Error(response.status);
//         }
//         return response.json();
//     })
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((error) => {
//         console.log(error);
//     })


// const url = 'https://fakestoreapi.com/products'

// fetch(url)
//     .then((response) => {
//         if (!response.ok) {
//             throw new Error(response.status);
//         }
//         return response.json();
//     })
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((error) => {
//         console.log(error);
//     })























