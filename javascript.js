const apiKey = "0GTATbGP8FCwxI2gKlTaEEmmNrvDQseL";
const queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apiKey}`;

const results = document.getElementById("search-results");

document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault();

    const length = parseInt(document.getElementById("length").value);
    const queryTerm = document.getElementById("queryTerm").value.trim();
    const beginYear = document.getElementById("beginYear").value.trim();
    const endYear = document.getElementById("endYear").value.trim();
    getNyData(queryTerm, length, beginYear, endYear);
})

document.getElementById("clear").addEventListener("click", function (event) {
    event.preventDefault();
    results.innerHTML = "";
})

function getNyData(queryTerm, length, beginYear, endYear) {
    if (length > 10) return alert("please choose a number between 1 and 10");
    if (queryTerm === "") return alert("no search term given!!!");
    let beginYearTerm = "";
    let endYearTerm = "";
    console.log(length)
    if (beginYear !== "") beginYearTerm = `&begin_date=${beginYear}0101`;
    if (endYear !== "") endYearTerm = `&end_date=${endYear}1231`;
    const newQueryURL = `${queryURL}&q=${queryTerm}${beginYearTerm}${endYearTerm}`;
    console.log(newQueryURL);
    fetch(newQueryURL)
        .then(response => {
            return response.json();
        })
        .then(responseJson => {
            const data = responseJson.response.docs;
            for (let i = 0; i < length; i++) {
                //do make div's function
                console.log(i)
                floopin(data[i].headline.main, data[i].pub_date, data[i].snippet, data[i].web_url)

                // results.appendChild(/* foo */)
            }
        })
}

function floopin(head, date, snippet, url) {
    const column = document.createElement("div");
    column.classList.add("card-deck", "col-lg-6", "col-md-12");

    const resultDiv = document.createElement("div");
    resultDiv.classList.add("card", "mb-4", "border", "border-primary");
    column.append(resultDiv);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    resultDiv.append(cardBody)

    const resultHead = document.createElement("h5");
    resultHead.classList.add("card-title");
    resultHead.textContent = head;
    cardBody.append(resultHead);

    const resultSub = document.createElement("h6");
    resultSub.classList.add("card-subtitle", "mb-2", "text-muted");
    resultSub.textContent = date.substring(0, 10);
    cardBody.append(resultSub);

    const resultP = document.createElement("p");
    resultP.classList.add("card-text");
    resultP.textContent = snippet;
    cardBody.append(resultP);

    const resultLink = document.createElement("a");
    resultLink.classList.add("card-link");
    resultLink.setAttribute("href", url);
    resultLink.innerText = "View Article";
    cardBody.append(resultLink);
    document.getElementById("search-results").append(column);
}