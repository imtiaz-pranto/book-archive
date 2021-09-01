const searchBook = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  console.log(searchText);

  //clear data
  searchField.value = "";

  if (searchText == "") {
    //display error message
    const searchResult = document.getElementById("search-result");
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
        <div class="card h-100 mb-3 bg-danger text-white">
          <h3>No Result Found! Please Try Another Keyword! </h3>
          </div>
        </div>
    `;
    searchResult.appendChild(div);
  } else {
    //load data
    const url = `http://openlibrary.org/search.json?q=${searchText}`;
    console.log(url);

    fetch(url)
      .then((res) => res.json())
      .then((data) => displaySearchResult(data.books));
  }
};
const displaySearchResult = (books) => {
  const searchResult = document.getElementById("search-result");
  searchResult.textContent = "";
  if (books.length == 0) {
    //show no result found
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
        <div class="card h-100 mb-3 bg-danger">
          <h3>No Result Found! Please Try Another Keyword! </h3>
          </div>
        </div>
    `;
    searchResult.appendChild(div);
  } else {
    console.log(searchResult);
    books.forEach((book) => {
      console.log(book);
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
        <div onclick="loadbookDetail(${book.idbook})" class="card h-100 mb-3">
          <img src="${book.strbookThumb}" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">${book.strbook}</h5>
            <p class="card-text">
              ${book.strInstructions.slice(0, 200)}
            </p>
          </div>
        </div>
    `;
      searchResult.appendChild(div);
    });
  }
};

const loadbookDetail = (bookId) => {
  console.log(bookId);
  const url = `https://www.thebookdb.com/api/json/v1/1/lookup.php?i=${bookId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displaybookDetail(data.books[0]));
};

const displaybookDetail = (book) => {
  console.log(book);
  const bookDetails = document.getElementById("book-details");
  bookDetails.textContent = "";
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
      <div class="card">
        <img src="${book.strbookThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${book.strbook}</h5>
          <p class="card-text">${book.strInstructions.slice(0, 150)}</p>
          <a href="${
            book.strYoutube
          }" class="btn btn-primary w-25 mx-auto">Visit Youtube</a>
        </div>
      </div>
`;
  bookDetails.appendChild(div);
};
