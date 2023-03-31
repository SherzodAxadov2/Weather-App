fetch("https://api.giphy.com/v1/stickers/random")
  .then((response) => response.json())
  .then((data) => console.log(data));
