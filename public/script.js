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

      // Iterate over the data array and create HTML for each item
      data.forEach(item => {
        let { title, rating, numberOfReviews, imageUrl } = item;

        let newResult = `
          <div class="result-item">
            <h2>Title: ${title}</h2>
            <p>Rating: ${rating}</p>
            <p>Number of Reviews: ${numberOfReviews}</p>
            <p>Image URL: ${imageUrl} </p>
            <br>
          </div>
        `;

        resultElement.innerHTML += newResult;
      });
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
