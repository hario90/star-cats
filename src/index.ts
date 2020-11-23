const rootEl = document.createElement("div");
const newContent = document.createTextNode("Hi there and greetings!");
rootEl.appendChild(newContent);
const bodyEl = document.getElementsByTagName("body")[0];
bodyEl.appendChild(rootEl);



