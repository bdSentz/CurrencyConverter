// Map that stores currency as key and value relative to USD as the value
let exchangeRates = new Map();

function getExchangeRates(){
    fetch('https://api.exchangeratesapi.io/latest?base=USD')
        .then(res => res.json())
        .then(data => {
            for(let rate in data.rates) {
                exchangeRates.set(rate, data.rates[rate]);
            }
            populateCurrencySelection();
        })
}

function populateCurrencySelection(){
    let keysIterator = exchangeRates.keys();
    let select1 = document.getElementById("selectCurrency1");
    let select2 = document.getElementById("selectCurrency2");
    for(let i = 0; i < exchangeRates.size; i++) {
        let key = keysIterator.next().value;
        let option1 = document.createElement("option");
        let option2 = document.createElement("option");
        option1.text = key;
        option2.text = key;
        select1.add(option1);
        select2.add(option2);
    }
}

getExchangeRates();

function convert(num){
    let selectedCurrency1 = document.getElementById("selectCurrency1").value;
    let selectedCurrency2 = document.getElementById("selectCurrency2").value;
    if (num == 1){
        let currencyValue = document.getElementById("currencyValue1").value;
        document.getElementById("currencyValue2").value = calculate(currencyValue, exchangeRates.get(selectedCurrency1), exchangeRates.get(selectedCurrency2));
    }
    else{
        let currencyValue = document.getElementById("currencyValue2").value;
        document.getElementById("currencyValue1").value = calculate(currencyValue, exchangeRates.get(selectedCurrency2), exchangeRates.get(selectedCurrency1));
    }
}

function calculate(currencyValue, rate1, rate2){
    return (currencyValue * (rate2/rate1)).toFixed(2);
}
