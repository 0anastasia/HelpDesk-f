/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/functionGetTicket.js
function getTicket(ticket, ticketsContainer) {
  const ticketHtml = `
<div data-id="${ticket.id}" class="ticket-wrapper">
  <div class="ticket-body">
    <div data-status="${ticket.status}" class="ticket-status">
    <span class="ticket-status-checkbox hidden">&#10004;</span>
    </div>
    <div class="ticket-name"><p>${ticket.name}</p></div>
    <div class="ticket-timestamp">
      <span>${ticket.created}</span>
    </div>
    <div class="ticket-edit-button">
    <span>&#9998;</span>
    </div>
    <div class="ticket-remove-button">
      <span>&#10006;</span>
    </div>
  </div>
  <div class="ticket-description hidden"><p></p></div>
</div>
 `;
  ticketsContainer.insertAdjacentHTML("beforeEnd", ticketHtml);
}
;// CONCATENATED MODULE: ./src/js/removeTicketWidget.js
function removeTicketCancelButtonHandler(mainContainer) {
  if (!mainContainer) return;
  const widgetRemoveTicket = mainContainer.querySelector("[data-widget=removeTicket]");
  const removeTicketCancelButton = widgetRemoveTicket.querySelector("[data-id=cancel]");
  removeTicketCancelButton.addEventListener("click", () => {
    widgetRemoveTicket.remove();
  });
}
function removeTicketOkButtonHandler(mainContainer, currentTicket, serverUrl) {
  if (!mainContainer) return;
  const widgetRemoveTicket = mainContainer.querySelector("[data-widget=removeTicket]");
  const removeTicketOkButton = widgetRemoveTicket.querySelector("[data-id=ok]");
  removeTicketOkButton.addEventListener("click", () => {
    const formData = new FormData();
    formData.append("id", currentTicket.dataset.id);
    const requestRemoveTicketUrl = `${serverUrl}/?method=removeTicket`;
    const xhrRemoveTicket = new XMLHttpRequest();
    xhrRemoveTicket.open("POST", requestRemoveTicketUrl);
    document.body.style.cursor = "wait";
    xhrRemoveTicket.addEventListener("load", () => {
      if (xhrRemoveTicket.status >= 200 && xhrRemoveTicket.status < 300) {
        try {
          setTimeout(() => {
            document.body.style.cursor = "";
            document.location.reload();
          }, 1000);
        } catch (e) {
          console.error(e);
        }
      }
    });
    widgetRemoveTicket.remove();
    xhrRemoveTicket.send(formData);
  });
}
function getRemoveTicketWidget(mainContainer, currentTicket, serverUrl) {
  if (mainContainer.querySelector(".modal")) return;
  const widgetRemoveTicketHtml = `
      <div data-widget="removeTicket" class="modal widget-remove">
        <h2>Удалить тикет?</h2>  
        <div class="widget-form">
          <p class="widget-remove-text">Вы уверены, что хотите удалить тикет? Это действие необратимо.</p>
          <div class="widget-form-controls">
            <button data-id="cancel" class="widget-button">Отмена</button>  
            <button data-id="ok" class="widget-button">Ок</button> 
          </div> 
        </div>
      </div>
      `;
  mainContainer.insertAdjacentHTML("beforeEnd", widgetRemoveTicketHtml);
  removeTicketCancelButtonHandler(mainContainer);
  removeTicketOkButtonHandler(mainContainer, currentTicket, serverUrl);
}
;// CONCATENATED MODULE: ./src/js/addTicketWidget.js
function addTicketCancelButtonHandler(mainContainer) {
  if (!mainContainer) return;
  const widgetAddTicket = mainContainer.querySelector("[data-widget=addTicket]");
  const addTicketForm = widgetAddTicket.querySelector("[data-id=addTicket-form]");
  const addTicketCancelButton = widgetAddTicket.querySelector("[data-id=cancel]");
  addTicketCancelButton.addEventListener("click", () => {
    addTicketForm.reset();
    widgetAddTicket.remove();
  });
}
function addTicketSubmitHandler(mainContainer, serverUrl) {
  if (!mainContainer) return;
  const widgetAddTicket = mainContainer.querySelector("[data-widget=addTicket]");
  const addTicketForm = widgetAddTicket.querySelector("[data-id=addTicket-form]");
  addTicketForm.addEventListener("submit", event => {
    event.preventDefault();
    const inputName = addTicketForm.name.value.trim();
    const inputDescription = addTicketForm.description.value.trim();
    if (inputName === "") return;
    const formData = new FormData();
    formData.append("id", null);
    formData.append("name", inputName);
    formData.append("description", inputDescription);
    formData.append("status", false);
    formData.append("created", new Date().toLocaleString());
    const requestCreateTicketUrl = `${serverUrl}/?method=createTicket`;
    const xhrAddTicket = new XMLHttpRequest();
    xhrAddTicket.open("POST", requestCreateTicketUrl);
    document.body.style.cursor = "wait";
    widgetAddTicket.style.cursor = "wait";
    xhrAddTicket.addEventListener("load", () => {
      if (xhrAddTicket.status >= 200 && xhrAddTicket.status < 300) {
        try {
          setTimeout(() => {
            document.body.style.cursor = "";
            widgetAddTicket.style.cursor = "";
            document.location.reload();
          }, 1000);
        } catch (e) {
          console.error(e);
        }
      }
    });
    xhrAddTicket.send(formData);
    addTicketForm.reset();
    widgetAddTicket.remove();
  });
}
function getAddTicketWidget(mainContainer, serverUrl) {
  if (mainContainer.querySelector(".modal")) return;
  const widgetAddTicketHtml = `
    <div data-widget="addTicket" class="modal widget-add">
    <h2>Добавить тикет</h2>  
    <form data-id="addTicket-form" class="widget-form">
      <label>
        Краткое описание
          <textarea rows=1 data-id="name" name="name" required class="widget-input"></textarea>
      </label>
      <label>
        Подробное описание
          <textarea rows=3 data-id="description" name="description" class="widget-input"></textarea>
      </label>
      <div class="widget-form-controls">
        <button data-id="cancel" class="widget-button">Отмена</button>  
        <button type="submit" data-id="ok" class="widget-button">Ок</button> 
      </div>     
    </form>
    </div>
    `;
  mainContainer.insertAdjacentHTML("beforeEnd", widgetAddTicketHtml);
  addTicketCancelButtonHandler(mainContainer);
  addTicketSubmitHandler(mainContainer, serverUrl);
}
;// CONCATENATED MODULE: ./src/js/editTicketWidget.js
function editTicketCancelButtonHandler(mainContainer) {
  if (!mainContainer) return;
  const widgetEditTicket = mainContainer.querySelector("[data-widget=editTicket]");
  const editTicketForm = widgetEditTicket.querySelector("[data-id=editTicket-form]");
  const editTicketCancelButton = widgetEditTicket.querySelector("[data-id=cancel]");
  editTicketCancelButton.addEventListener("click", () => {
    editTicketForm.reset();
    widgetEditTicket.remove();
  });
}
function editTicketSubmitHandler(mainContainer, ticketEdit, serverUrl) {
  if (!mainContainer) return;
  const widgetEditTicket = mainContainer.querySelector("[data-widget=editTicket]");
  const editTicketForm = widgetEditTicket.querySelector("[data-id=editTicket-form]");
  const editTicketNameInput = widgetEditTicket.querySelector("[data-id=name]");
  const editingTicketID = ticketEdit.closest(".ticket-wrapper").dataset.id;
  const editingTicketName = ticketEdit.closest(".ticket-wrapper").querySelector(".ticket-name").textContent;
  const editingTicketStatus = ticketEdit.closest(".ticket-wrapper").querySelector(".ticket-status").dataset.status;
  editTicketNameInput.value = editingTicketName;
  editTicketForm.addEventListener("submit", event => {
    event.preventDefault();
    const inputName = editTicketForm.name.value.trim();
    const inputDescription = editTicketForm.description.value.trim();
    if (inputName === "") return;
    const formData = new FormData();
    formData.append("id", editingTicketID);
    formData.append("name", inputName);
    formData.append("description", inputDescription);
    formData.append("status", editingTicketStatus);
    formData.append("created", new Date().toLocaleString());
    const requestEditTicketUrl = `${serverUrl}/?method=editTicket`;
    const xhrEditTicket = new XMLHttpRequest();
    xhrEditTicket.open("POST", requestEditTicketUrl);
    document.body.style.cursor = "wait";
    widgetEditTicket.style.cursor = "wait";
    xhrEditTicket.addEventListener("load", () => {
      if (xhrEditTicket.status >= 200 && xhrEditTicket.status < 300) {
        try {
          setTimeout(() => {
            document.body.style.cursor = "";
            widgetEditTicket.style.cursor = "";
            document.location.reload();
          }, 1000);
        } catch (e) {
          console.error(e);
        }
      }
    });
    editTicketForm.reset();
    widgetEditTicket.remove();
    xhrEditTicket.send(formData);
  });
}
function createRequestTicketDescription(mainContainer, currentTicket, serverUrl) {
  if (!mainContainer) return;
  const widgetEditTicket = mainContainer.querySelector("[data-widget=editTicket]");
  const editTicketDescriptionInput = widgetEditTicket.querySelector("[data-id=description]");
  const requestGetTicketDescriptionUrl = `${serverUrl}/?method=ticketById&id=${currentTicket.dataset.id}`;
  const xhrGetDescription = new XMLHttpRequest();
  xhrGetDescription.open("GET", requestGetTicketDescriptionUrl);
  xhrGetDescription.addEventListener("load", () => {
    if (xhrGetDescription.status >= 200 && xhrGetDescription.status < 300) {
      try {
        const responsedDescription = xhrGetDescription.response;
        if (!responsedDescription) return;
        editTicketDescriptionInput.value = responsedDescription;
      } catch (e) {
        console.error(e);
      }
    }
  });
  xhrGetDescription.send();
}
function getEditTicketWidget(mainContainer, currentTicket, ticketEdit, serverUrl) {
  if (mainContainer.querySelector(".modal")) return;
  const widgetEditTicketHtml = `
    <div data-widget="editTicket" class="modal widget-edit">
    <h2>Редактировать тикет</h2>  
    <form data-id="editTicket-form" class="widget-form">
      <label>
        Краткое описание
          <textarea rows=1 data-id="name" name="name" required class="widget-input"></textarea>
      </label>
      <label>
        Подробное описание
          <textarea rows=3 data-id="description" name="description" class="widget-input"></textarea>
      </label>
      <div class="widget-form-controls">
        <button data-id="cancel" class="widget-button">Отмена</button>  
        <button type="submit" data-id="ok" class="widget-button">Ок</button> 
      </div>     
    </form>
    </div>
    `;
  mainContainer.insertAdjacentHTML("beforeEnd", widgetEditTicketHtml);
  createRequestTicketDescription(mainContainer, currentTicket, serverUrl);
  editTicketCancelButtonHandler(mainContainer);
  editTicketSubmitHandler(mainContainer, ticketEdit, serverUrl);
}
;// CONCATENATED MODULE: ./src/js/functionChangeTicketStatus.js
function changeTicketStatus(mainContainer, currentTicket, ticketStatus, ticketStatusCheckbox, serverUrl) {
  if (mainContainer.querySelector(".modal")) return;
  ticketStatusCheckbox.classList.toggle("hidden");
  let {
    status
  } = ticketStatus.dataset;
  const isHidden = ticketStatusCheckbox.classList.contains("hidden");
  if (isHidden) status = false;
  if (!isHidden) status = true;
  const formData = new FormData();
  formData.append("id", currentTicket.dataset.id);
  formData.append("status", status);
  const requestChangeTicketStatusUrl = `${serverUrl}/?method=changeTicketStatus`;
  const xhrChangeTicketStatus = new XMLHttpRequest();
  xhrChangeTicketStatus.open("POST", requestChangeTicketStatusUrl);
  document.body.style.cursor = "wait";
  xhrChangeTicketStatus.addEventListener("load", () => {
    if (xhrChangeTicketStatus.status >= 200 && xhrChangeTicketStatus.status < 300) {
      try {
        setTimeout(() => {
          document.body.style.cursor = "";
        }, 500);
      } catch (e) {
        console.error(e);
      }
    }
  });
  xhrChangeTicketStatus.send(formData);
}
;// CONCATENATED MODULE: ./src/js/functionShowTicketDescription.js
function showTicketDescription(mainContainer, currentTicket, ticketName, serverUrl) {
  if (mainContainer.querySelector(".modal")) return;
  const ticketDescriptionElement = ticketName.closest(".ticket-wrapper").querySelector(".ticket-description");
  if (!ticketDescriptionElement.classList.contains("hidden")) {
    ticketDescriptionElement.classList.add("hidden");
    return;
  }
  const requestGetTicketDescriptionUrl = `${serverUrl}/?method=ticketById&id=${currentTicket.dataset.id}`;
  const xhrGetDescription = new XMLHttpRequest();
  xhrGetDescription.open("GET", requestGetTicketDescriptionUrl);
  document.body.style.cursor = "wait";
  xhrGetDescription.addEventListener("load", () => {
    if (xhrGetDescription.status >= 200 && xhrGetDescription.status < 300) {
      try {
        // console.log('description recieved');
        const responsedDescription = xhrGetDescription.response;
        // console.log('xhrGetDescription.response: ', responsedDescription);
        setTimeout(() => {
          document.body.style.cursor = "";
        }, 1000);
        if (!responsedDescription) return;
        ticketDescriptionElement.textContent = responsedDescription;
        ticketDescriptionElement.classList.toggle("hidden");
      } catch (e) {
        console.error(e);
        // throw e;
      }
    }
  });

  xhrGetDescription.send();
}
;// CONCATENATED MODULE: ./src/js/app.js






const serverUrl = "https://ahj-hw-http.herokuapp.com/";
const mainContainer = document.querySelector(".container");
const ticketsContainer = document.querySelector(".tickets-container");
const addTicketButton = document.querySelector(".add-ticket-button");
document.addEventListener("DOMContentLoaded", () => {
  const xhrLoadTickets = new XMLHttpRequest();
  xhrLoadTickets.open("GET", `${serverUrl}/?method=allTickets`);
  xhrLoadTickets.responseType = "json";
  xhrLoadTickets.addEventListener("load", () => {
    if (xhrLoadTickets.status >= 200 && xhrLoadTickets.status < 300) {
      try {
        const responsedTickets = xhrLoadTickets.response;
        if (!responsedTickets.length) return;
        responsedTickets.forEach(ticket => {
          getTicket(ticket, ticketsContainer);
          const currentTicket = ticketsContainer.lastElementChild;
          const ticketStatus = currentTicket.querySelector(".ticket-status");
          const ticketStatusCheckbox = ticketStatus.querySelector(".ticket-status-checkbox");
          if (ticketStatus.dataset.status === "true") ticketStatusCheckbox.classList.remove("hidden");
          const ticketName = currentTicket.querySelector(".ticket-name");
          const ticketEdit = currentTicket.querySelector(".ticket-edit-button");
          const ticketRemove = currentTicket.querySelector(".ticket-remove-button");
          ticketStatus.addEventListener("click", () => {
            changeTicketStatus(mainContainer, currentTicket, ticketStatus, ticketStatusCheckbox, serverUrl);
          });
          ticketName.addEventListener("click", () => {
            showTicketDescription(mainContainer, currentTicket, ticketName, serverUrl);
          });
          ticketEdit.addEventListener("click", () => {
            getEditTicketWidget(mainContainer, currentTicket, ticketEdit, serverUrl);
          });
          ticketRemove.addEventListener("click", () => {
            getRemoveTicketWidget(mainContainer, currentTicket, serverUrl);
          });
        });
      } catch (e) {
        console.error(e);
      }
    }
  });
  xhrLoadTickets.send();
  addTicketButton.addEventListener("click", () => {
    getAddTicketWidget(mainContainer, serverUrl);
  });
});
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;
//# sourceMappingURL=main.js.map