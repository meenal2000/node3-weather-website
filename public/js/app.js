//import fetch from 'cross-fetch';
console.log(' the client side js ')
const weatherForm = document.querySelector('form'); // used to select HTML elements
const search = document.querySelector('input');
const messageone = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit' , (e) => {
    e.preventDefault(); // prevents the default action of browser refreshing to the new page from server
    const location = search.value;
    messageone.textContent = 'Loading....'
    messagetwo.textContent = ''
    fetch('http://localhost:3000/weather?address='+location).then( (response)=>{
        
    response.json().then( (data) => {
        if(data.error)
        messageone.textContent = (data.error)
        else
        {
            messageone.textContent = data.location
            messagetwo.textContent = data.forecast
        }
    })
})
})