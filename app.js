const dropdownlist = document.querySelectorAll(".select-container select");
let baseurl =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
let getexrate = document.querySelector("#getexrate");
let from = document.getElementById("fromdropdown");
let to = document.getElementById("todropdown");
let amt = document.getElementById("amt");
let msg = document.querySelector(".msg");

const flagupdate = async (element) => {
  let countcode = countryList[element.value];
  let newsrc = `https://flagsapi.com/${countcode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newsrc;
};

const loaddefault = () =>{
  msg.innerText="Enter amount to get the exchange rate";
}


const updexrate = async () => {
  const URL = `${baseurl}/${from.value.toLowerCase()}/${to.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let exrate = data[to.value.toLowerCase()];
  let finalamt = amt.value * exrate;
  msg.innerText = `${amt.value} ${from.value} = ${finalamt} ${to.value}`;
};

for (let select of dropdownlist) {
  for (currcode in countryList) {
    let newoption = document.createElement("option");
    newoption.value = currcode;
    newoption.innerText = currcode;

    if (select.name == "from" && currcode == "USD") {
      newoption.selected = "selected";
    } else if (select.name == "to" && currcode == "INR") {
      newoption.selected = "selected";
    }
    select.append(newoption);

    select.addEventListener("change", (evt) => {
      flagupdate(evt.target);
    });
  }
}

window.addEventListener("load", async () => {
  flagupdate();
  loaddefault();
});

getexrate.addEventListener("click", (evt) => {
  evt.preventDefault();
  updexrate();
});
