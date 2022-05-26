//https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&origin=*&srlimit=25&utf8=&format=json&srsearch=${query}

const elForm = document.querySelector(".search-form");

const submitFunction = (event) => {
  event.preventDefault();
  const elInput = document.querySelector(".search-input").value;
  let query = elInput.trim();
  getResults(query);
};

elForm.addEventListener("submit", submitFunction);

const getResults = (query) => {
  const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&origin=*&srlimit=25&utf8=&format=json&srsearch=${query}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      addResults(data.query.search);
    })
    .catch((err) => console.error("Error:" + err));
};

const addResults = (sResults) => {
  const elSearchResult = document.querySelector(".results");
  elSearchResult.innerHTML = null;

  sResults.forEach((result) => {
    const url = `https://en.wikipedia.org/?curid=${result.pageid}`;

    elSearchResult.insertAdjacentHTML(
      "afterbegin",
      `<div class="card">
          <h3 class="cardTitle">
            <a href="${url}" target="_blank">${result.title}</a>
          </h3>

          <a href="${url}" class="cardLink" target="_blank">${url}</a>
          <br />
          <span class="cardSnippet">${result.snippet}</span>
      </div>`
    );
  });
};
