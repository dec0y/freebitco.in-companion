function drawUI() {

  const myStyle = document.createElement("link");
  script.rel = "stylesheet";
  script.src = "https://dec0y.github.io/freebitco.in-companion/main.1f558348.css"


  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src= "https://dec0y.github.io/freebitco.in-companion/main.835e0943.js";


  const myDiv = document.createElement("div");
  myDiv.id = "SCRIPT_PANEL";
  myDiv.style.cssText = `position:fixed;top:50px;right:16px;z-index:1000;`;
  myDiv.innerHTML = `
    <my-component></my-component>
  `;
  document.body.appendChild(script)
  document.body.appendChild(myStyle)
  setTimeout(() => {
    document.body.appendChild(myDiv);
  }, 1000);
}
drawUI();


