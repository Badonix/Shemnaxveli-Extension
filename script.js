let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("Shenaxvebi"));
const tabBtn = document.getElementById("tab-btn");
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}
tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("Shenaxvebi", JSON.stringify(myLeads));
    render(myLeads);
  });
});
deleteBtn.addEventListener("click", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});
inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("Shenaxvebi", JSON.stringify(myLeads));
  render(myLeads);
  console.log(localStorage.getItem("Shenaxvebi"));
});
function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
                  <li>
                      <a target='_blank' href='${leads[i]}'>${leads[i]}</a>
                  </li>
                  `;
  }
  ulEl.innerHTML = listItems;
}
