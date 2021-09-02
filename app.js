//Spinner function
const toggleSpinner = (displaySpinner) => {
  document.getElementById("spinner").style.display = displaySpinner;
};

//Cleaing all textcontents
const clearElements = () => {
  const searchResult = document.getElementById("search-result");
  searchResult.textContent = "";
  const resultAmount = document.getElementById("result-amount");
  resultAmount.textContent = "";
};

const searchResult = document.getElementById("search-result");
const resultAmount = document.getElementById("result-amount");

const searchBook = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  console.log(searchText);
  searchField.value = "";
  toggleSpinner("block"); //spinner visible after clicking search

  //check if search keyword is inserted
  if (searchText === "") {
    //display error message
    clearElements();
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="h-100 p-2 mb-3 text-danger">
          <h4>Please Enter a Keyword! </h4>
          </div>
        </div>
    `;
    toggleSpinner("none");
    resultAmount.appendChild(div);
  }

  //results are fetched
  else {
    //load data from api
    clearElements();
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => displaySearchResult(data));
  }
};

//displaying fetched data
const displaySearchResult = (data) => {
  const books = data.docs;
  clearElements();
  if (books.length === 0) {
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="h-100 p-2 mb-3 text-danger">
          <h3>No Result Found! Please Try Another Keyword! </h3>
          </div>
        </div>
    `;
    toggleSpinner("none");
    resultAmount.appendChild(div);
  }

  //When results are found
  else {
    // Number of Search Result
    const p = document.createElement("p");
    p.innerHTML = `
      <h4>Total ${data.numFound} Results Found! </h4>
      `;
    resultAmount.appendChild(p);

    //Show Books
    books.forEach((book) => {
      console.log(book);
      const div = document.createElement("div");
      div.classList.add("col");

      div.innerHTML = `
        <div class="card h-100 mb-3">
          <div class="card-body">
           <img class="img-fixed" src="https://covers.openlibrary.org/b/id/${
             book.cover_i ? book.cover_i : 10909258
           }-M.jpg" alt=""></img>
            <h5 class="card-title">${book.title}</h5>
            <p class="card-text">
            Author: ${book.author_name}
            </p>
            <p class="card-text">
             Pulish Date : ${book.first_publish_year}
            </p>
            <p class="card-text">
             Publisher : ${book.publisher}
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
