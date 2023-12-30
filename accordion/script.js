const accordion = document.getElementById("accordion-group");
const buttons = document.querySelectorAll("button");
const pre = document.querySelector("pre");

buttons.forEach((button) =>
  button.addEventListener("click", buttonClickHandler)
);

accordion.addEventListener("keydown", buttonKeydownHandler);

function buttonClickHandler(event) {
  const button = event.target;

  const panelId = button.getAttribute("aria-controls");

  const panel = document.getElementById(panelId);
  panel.classList.toggle("open");

  const span = button.querySelector("span");

  if (panel.classList.contains("open")) {
    span.textContent = "-";

    button.setAttribute("aria-expanded", "true");
    panel.setAttribute("aria-hidden", "false");
  } else {
    span.textContent = "+";

    button.setAttribute("aria-expanded", "false");
    panel.setAttribute("aria-hidden", "true");
  }

  updatePreData();
}

function buttonKeydownHandler(event) {
  const button = event.target;
  const buttonsArray = Array.from(buttons);
  const buttonIndex = buttonsArray.findIndex((btn) => btn.id === button.id);
  const key = event.key;

  switch (key) {
    case "ArrowDown":
      {
        if (buttonIndex < buttons.length - 1) {
          buttonsArray[buttonIndex + 1].focus();
        } else {
          buttonsArray[0].focus();
        }
      }
      break;
    case "ArrowUp":
      {
        if (buttonIndex > 0) {
          buttonsArray[buttonIndex - 1].focus();
        } else {
          buttonsArray[buttonsArray.length - 1].focus();
        }
      }
      break;
  }

  updatePreData();
}

function updatePreData() {
  const buttonsArray = Array.from(buttons);

  pre.innerHTML = `
  ${buttonsArray
    .map((button) => {
      const panelId = button.getAttribute("aria-controls");
      const panel = document.getElementById(panelId);

      return `
    <b>Button</b>
    id            = ${button.id}
    aria-controls = ${button.getAttribute("aria-controls")}
    aria-expanded = <span class="${
      button.getAttribute("aria-expanded") === "true" ? "green" : "red"
    }">${button.getAttribute("aria-expanded")}</span>
      <b>Panel</b>
      id              = ${panel.id}
      aria-hidden     = <span class="${
        panel.getAttribute("aria-hidden") === "true" ? "green" : "red"
      }">${panel.getAttribute("aria-hidden")}</span>
      aria-labelledby = ${panel.getAttribute("aria-labelledby")}
      classList       = ${panel.classList}
    `;
    })
    .join("")}
  `;
}

updatePreData();
