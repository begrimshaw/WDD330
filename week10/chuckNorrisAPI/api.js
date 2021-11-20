// https://api.chucknorris.io/
function getNewJoke() {
  fetch("https://api.chucknorris.io/jokes/random")
    .then((response) => {
      data = response.json();
      return data;
    })
    .then((data) => {
      console.log(data);
      document.getElementById("joke").innerHTML = data.value;
      // document.getElementById("picture").src = data.icon_url;
    });
}
