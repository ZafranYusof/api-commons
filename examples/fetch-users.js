const { get, post, success, error } = require('../src');

// Example: fetch data from API
async function fetchUsers() {
  try {
    const data = await get('https://jsonplaceholder.typicode.com/users');
    const users = JSON.parse(data);
    console.log(success(users.slice(0, 3)));
  } catch (err) {
    console.log(error(err.message, 500));
  }
}

fetchUsers();