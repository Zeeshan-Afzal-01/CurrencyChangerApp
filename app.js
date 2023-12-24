const API_BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const currencySelectors = document.querySelectorAll(".dropdown select");
const calculateButton = document.querySelector("form button");
const fromCurrencySelector = document.querySelector(".from select");
const toCurrencySelector = document.querySelector(".to select");
const resultMessage = document.querySelector(".msg");

for (let select of currencySelectors) {
  for (let currencyCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currencyCode;
    newOption.value = currencyCode;
    if (select.name === "from" && currencyCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currencyCode === "CAD") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlagImage(evt.target);
  });
}

const fetchAndUpdateExchangeRate = async () => {
  let amountInput = document.querySelector(".amount input");
  let amountValue = amountInput.value;
  if (amountValue === "" || amountValue < 1) {
    amountValue = 1;
    amountInput.value = "1";
  }
  const exchangeRateURL = `${API_BASE_URL}/${fromCurrencySelector.value.toLowerCase()}/${toCurrencySelector.value.toLowerCase()}.json`;
  let response = await fetch(exchangeRateURL);
  let data = await response.json();
  let rate = data[toCurrencySelector.value.toLowerCase()];

  let finalAmount = amountValue * rate;
  resultMessage.innerText = `${amountValue} ${fromCurrencySelector.value} = ${finalAmount} ${toCurrencySelector.value}`;
};

const updateFlagImage = (element) => {
  let currencyCode = element.value;
  let countryCode = countryList[currencyCode];
  let newFlagSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let flagImage = element.parentElement.querySelector("img");
  flagImage.src = newFlagSrc;
};

calculateButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  fetchAndUpdateExchangeRate();
});

window.addEventListener("load", () => {
  fetchAndUpdateExchangeRate();
});
