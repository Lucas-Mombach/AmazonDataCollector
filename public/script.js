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
  
  try {
    fetch('/api/scrape', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ searchInput: keyword.value })    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Clear the previous results
      resultElement.innerHTML = '';

    })
    .catch(error => {
      console.error('Error:', error);
      resultElement.textContent = 'An error occurred. Please try again.';
    });
  
  } catch (error) {
    console.log(error);
  }
  
  keyword.value = "";
});
