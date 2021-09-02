//Spinner function
const toggleSpinner = (displaySpinner) => {
  document.getElementById("spinner").style.display = displaySpinner;
};

const searchResult = document.getElementById("search-result");

const searchBook = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  console.log(searchText);
  toggleSpinner("block"); //spinner visible after clicking search

  //clear searchbox
  searchField.value = "";

  //check if search keyword is inserted
  if (searchText === "") {
    //display error message
    const searchResult = document.getElementById("search-result");
    searchResult.textContent = "";
    const resultAmount = document.getElementById("result-amount");
    resultAmount.textContent = "";
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
        <div class="card h-100 mb-3 bg-danger text-white">
          <h3>Please Enter a Keyword! </h3>
          </div>
        </div>
    `;
    //setting spinner invisible and showing warning
    toggleSpinner("none");
    searchResult.appendChild(div);
  }
  //results are found
  else {
    //load data from api
    const searchResult = document.getElementById("search-result");
    searchResult.textContent = "";
    const url = `http://openlibrary.org/search.json?q=${searchText}`;
    console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => displaySearchResult(data));
  }
};

//displaying fetched data
const displaySearchResult = (data) => {
  const books = data.docs;
  //   console.log(books);
  searchResult.textContent = "";
  if (books.length === 0) {
    searchResult.textContent = "";
    const resultAmount = document.getElementById("result-amount");
    resultAmount.textContent = "";
    //show no result found
    const div = document.createElement("div");
    // div.classList.add("col");
    div.innerHTML = `
        <div class="card h-100 mb-3 bg-danger">
          <h3>No Result Found! Please Try Another Keyword! </h3>
          </div>
        </div>
    `;
    toggleSpinner("none");
    searchResult.appendChild(div);
  } else {
    // Number of Search Result
    const resultAmount = document.getElementById("result-amount");
    resultAmount.textContent = "";
    const p = document.createElement("p");
    p.classList.add("font-weight-bold");
    p.innerHTML = `
      <p>Total ${data.numFound} Results Found! </p>
      `;
    resultAmount.appendChild(p);
    //

    console.log(searchResult);
    books.forEach((book) => {
      console.log(book);
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
        <div class="card h-100 mb-3">
          <div class="card-body">
           <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" alt=""></img>
            <h5 class="card-title">${book.title}</h5>
            <p class="card-text">
            Author: ${book.author_name}
            </p>
            <p class="card-text">
             Pulish Date : ${book.first_publish_year}
            </p>
            <p class="card-text">
             Pulisher : ${book.publisher}
            </p>
          </div>
        </div>
    `;
      // }
      toggleSpinner("none");
      searchResult.appendChild(div);
    });
  }
};
