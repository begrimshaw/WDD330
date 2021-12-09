let stocks = [];

input = document.getElementById("symbolInput");
input.addEventListener("click", () => {
  console.log("in event listner");
});

/**GET SUMMARY **/
window.addEventListener("load", getCharts);

function getCharts(event) {
  const url =
    "https://yh-finance.p.rapidapi.com/market/get-trending-tickers?region=US";
  fetch(url, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "yh-finance.p.rapidapi.com",
      "x-rapidapi-key": "9089f186e4msh301e53d77d7456fp1ae47bjsn49d49881865c",
    },
  })
    .then((response) => {
      console.log("get summary: ", response);
      data = response.json();
      return data;
    })
    .then((data) => {
      console.log("data", data);
      const summaryHtml = document.getElementById("summary");
      // Add summary data to page
      for (i = 0; i < 10; i++) {
        summaryHtml.innerHTML += `
        <div
        class="
        column
        is-one-quarter  
        is-justify-content-center
        has-text-centered
        card
        has-background-dark has-text-white
        mt-3
        ml-2
        mr-2
        
      "
      >
      <div class="symbol is-inline-flex card-header">    
      <p class="card-header-title has-text-white" ></p>
      <p class="company " id="company">${data.finance.result[0].quotes[i].shortName}</p>
      </div>

      <div class="card-content has-text-centered">
      <div class="displayTesla" id="displayTesla">

        <div class="displayCurrentPrice is-flex">
          
          <p>Current Price: </p>
          <p class="currentPrice pl-3 has-text-primary"  id="currentPrice">$${data.finance.result[0].quotes[i].regularMarketPrice}</p>
          <br />
        </div>
        <div class="displayPreviousClose is-flex">
          
          <p>Previous Close:  </p>
          <p class="previousClose pl-3 has-text-info" id="previousClose">$${data.finance.result[0].quotes[i].regularMarketPreviousClose}</p>
        </div>
      </div>
    </div>
  </div>`;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

/*********************
 *Retrieve Single Stock Data
 *********************/
function getStock(event) {
  if (validateForm()) {
    document.getElementById("symbolBtn").classList.add("is-loading");
    document.getElementById("symbolInput").classList.remove("is-danger");
    const symbol = document.getElementById("symbolInput").value;
    const url = `https://yh-finance.p.rapidapi.com/stock/v2/get-statistics?symbol=${symbol}&region=US`;

    fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "yh-finance.p.rapidapi.com",
        "x-rapidapi-key": "9089f186e4msh301e53d77d7456fp1ae47bjsn49d49881865c",
      },
    })
      .then((response) => {
        console.log("In function", response);
        data = response.json();
        return data;
      })
      .then((data) => {
        console.log("in second then: ", data);
        // call display function instead
        extractData(data);
        const cardWrapper = document.getElementById("card-wrapper");
        cardWrapper.innerHTML = "";
        stocks.forEach((stock) => {
          displayStock(stock);
        });
        //   Save the previously looked at stocks
        //   saveStock(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //Clear the input field
  document.getElementById("symbolInput").value = "";
  event.preventDefault();
}

function extractData(data) {
  const currentPrice = data.financialData.currentPrice.fmt;
  const company = data.symbol;
  const previousClose = data.summaryDetail.previousClose.fmt;

  //Save stock info
  stocks.push({
    company: company,
    currentPrice: currentPrice,
    previousClose: previousClose,
  });
  console.log("saved: ", stocks);
}

/**************************
 *Display Single Stock Card
 **************************/
function displayStock(stock) {
  console.log("stock in display: ", stocks);
  const cardWrapper = document.getElementById("card-wrapper");

  //add card
  console.log("In for loop");
  cardWrapper.innerHTML += `
    <div
      class="
        is-justify-content-center
        has-text-centered
        card
        has-background-dark has-text-white
        mt-3
      "
      >
      <div class="symbol is-inline-flex card-header">    
      <p class="card-header-title has-text-white" ></p>
      <p class="company" id="company">${stock.company}</p>
      </div>

      <div class="card-content has-text-centered">
      <div class="displayTesla" id="displayTesla">

        <div class="displayCurrentPrice is-flex">
          
          <p>Current Price: </p>
          <p class="currentPrice pl-3 has-text-primary"  id="currentPrice">$${stock.currentPrice}</p>
          <br />
        </div>
        <div class="displayPreviousClose is-flex">
          
          <p>Previous Close:  </p>
          <p class="previousClose pl-3 has-text-info" id="previousClose">$${stock.previousClose}</p>
        </div>
      </div>
    </div>
  </div>
    `;

  // deactivate loading button
  document.getElementById("symbolBtn").classList.remove("is-loading");
}

/****************
 *Validate Form
 ****************/
function validateForm() {
  let x = document.getElementById("symbolInput").value;
  if (x == "") {
    alert("You must insert a stock");
    let element = document.getElementById("symbolInput");
    element.classList.add("is-danger");

    return false;
  }
  return true;
}
