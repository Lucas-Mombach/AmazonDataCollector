let form = document.getElementById("search-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  let keyword = document.getElementById("search-input");
  let resultElement = document.getElementById('result');

  if (keyword.value == "") {
    alert("Ensure you input a value in the fields");
  } else {
    // perform operation with form input
    alert("Our complicated algorithm is working, please wait");
  }
  
  keyword.value = "";
});
