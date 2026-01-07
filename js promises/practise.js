const BASE_URL = 'https://northwind.vercel.app/api'
const tBody = document.querySelector('tbody')

fetch(`${BASE_URL}/categories`).then((res) => {
    if (!res.ok) {
        throw new Error('Error status', res.status)
    }

    return res.json()
})
    .then((data) => {
        console.log(data);

        data.forEach((c) => {
            const trElem = document.createElement('tr')
            trElem.innerHTML = ` 

<td>${c.id}</td>
<td>${c.name}</td>
<td>${c.description}</td>
<td>
<button class ="details">details</button>
<button class ="delete">delete</button>
</td>


            `

            const detailsBtn = trElem.querySelector('.details')
            detailsBtn.addEventListener('click', () => {

                fetch(`${BASE_URL}/categories/${c.id}`
                    .then((res) => {
                      return.json
                    })
                )

            })




            console.log(trElem);
            tBody.appendChild(trElem)
        })






    })

    .catch((err) => {
        console.log(err);
    })