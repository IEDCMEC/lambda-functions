const axios = require("axios");

const getTodo = async (getAll = false) => {
  let url = "https://jsonplaceholder.typicode.com/todos/1";
  if (getAll) {
    url = "https://jsonplaceholder.typicode.com/todos";
  }

  const todo = await axios.get(url);
  return todo.data;
};

module.exports = getTodo;
