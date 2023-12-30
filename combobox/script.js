const input = document.getElementById("selectInput");
const button = document.getElementById("selectButton");
const options = document.getElementById("custom-options");
const form = document.querySelector("form");
const output = document.getElementById("output");
const pre = document.querySelector("pre");

optionsItems = options.querySelectorAll("li");

input.addEventListener("focus", optionsHandler);
button.addEventListener("click", buttonClickHandler);
optionsItems.forEach((option) =>
  option.addEventListener("focus", () => {
    Array.from(optionsItems).forEach((option) =>
      option.setAttribute("aria-selected", "false")
    );
    option.setAttribute("aria-selected", "true");

    updatePreData();
  })
);
optionsItems.forEach((option) =>
  option.addEventListener("keydown", optionsItemHandler)
);

optionsItems.forEach((option) =>
  option.addEventListener("click", optionsItemClickHandler)
);

form.addEventListener("submit", submitHandler);

function optionsHandler() {
  openOptions();

  input.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") optionsItems[0].focus();
    if (event.key === "Tab") closeOptions();
    if (event.key === "Enter") event.preventDefault();
  });
}

function buttonClickHandler() {
  const isOptionsHidden = options.getAttribute("aria-hidden") === "true";

  isOptionsHidden ? openOptions() : closeOptions();
}

function optionsItemHandler(event) {
  const itemsArray = Array.from(optionsItems);
  const selectedOptionIndex = itemsArray.findIndex(
    (option) => option === document.activeElement
  );

  switch (event.key) {
    case "Enter":
      {
        input.value = event.target.textContent;
        closeOptions();
        updatePreData();
      }
      break;
    case "ArrowDown":
      {
        if (selectedOptionIndex < itemsArray.length - 1) {
          itemsArray[selectedOptionIndex + 1].focus();
          updatePreData();
        } else {
          itemsArray[0].focus();
        }
      }
      break;
    case "ArrowUp":
      {
        if (selectedOptionIndex > 0) {
          itemsArray[selectedOptionIndex - 1].focus();
          updatePreData();
        } else {
          itemsArray[itemsArray.length - 1].focus();
        }
      }
      break;
    case "Escape":
      {
        closeOptions();
        updatePreData();
      }
      break;
  }
}

function optionsItemClickHandler(event) {
  input.value = event.target.textContent;
  closeOptions();
  updatePreData();
}

function openOptions() {
  options.style.display = "block";
  input.setAttribute("aria-expanded", "true");
  options.setAttribute("aria-hidden", "false");

  updatePreData();
}

function closeOptions() {
  options.style.display = "none";
  input.setAttribute("aria-expanded", "false");
  options.setAttribute("aria-hidden", "true");

  Array.from(optionsItems).forEach((option) =>
    option.setAttribute("aria-selected", "false")
  );

  updatePreData();
}

function submitHandler(event) {
  event.preventDefault();
  output.textContent = input.value;

  closeOptions();

  updatePreData();
  form.reset();
}

function updatePreData() {
  const inputAriaExpanded = input.getAttribute("aria-expanded");
  const ulAriaHidden = options.getAttribute("aria-hidden");
  const itemsArray = Array.from(optionsItems);

  pre.innerHTML = `
  <b>Input:</b>
  role          = combobox
  aria-owns     = custom-options
  aria-expanded = <span class="${
    inputAriaExpanded === "true" ? "green" : "red"
  }">${inputAriaExpanded}</span>

  <b>Button:</b>
  tabindex      = -1

  <b>Ul:</b> 
  id            = custom-options
  role          = listbox
  aria-hidden   = <span class="${
    ulAriaHidden === "true" ? "green" : "red"
  }">${ulAriaHidden}</span>

  <b>Li:</b>
  ${itemsArray
    .map((option) => {
      return `
    textContent   = ${option.textContent}
    tabindex      = ${option.getAttribute("tabindex")}
    role          = ${option.getAttribute("role")}
    aria-selected = <span class="${
      option.getAttribute("aria-selected") === "true" ? "green" : "red"
    }">${option.getAttribute("aria-selected")}</span>
    `;
    })
    .join("")}
  `;
}

updatePreData();
