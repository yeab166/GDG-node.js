const axios = require('axios');

const api_url = 'https://jsonplaceholder.typicode.com/posts/1';

axios.get(api_url)
    .then(response => {
        console.log('Data fetched:', response.data);
    })
    .catch(error => {
        console.error('Error fetching data:', error.message);
    });
