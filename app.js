const searchBook = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  console.log(searchText);

  //clear data
  searchField.value = "";

  if (searchText === "") {
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
      .then((data) => displaySearchResult(data));
  }
};
const displaySearchResult = (data) => {
  const books = data.docs;
  //   console.log(books);
  const searchResult = document.getElementById("search-result");
  searchResult.textContent = "";
  if (books.length === 0) {
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
    // console.log(searchResult);
    books.forEach((book) => {
      console.log(book);
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
        <div class="card h-100 mb-3">
          <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <p class="card-text">
            Author:  ${book.author_name}
            </p>
            <p class="card-text">
             Pulish Date : ${book.first_publish_year}
            </p>
          </div>
        </div>
    `;
      searchResult.appendChild(div);
    });
  }
};
