const link = document.createElement('a')

link.textContent = 'github.com'
link.setAttribute('href','https://github.com/elmiraslan661')
link.setAttribute('target','_blank')
document.body.appendChild(link)



const header =document.querySelector('header')
const loginBtn = document.createElement('button')
loginBtn.textContent = 'login'




loginBtn.style.color = 'white'
loginBtn.style.backgroundColor = 'teal'
loginBtn.style.border ='2px solid teal'


header.appendChild(loginBtn)
