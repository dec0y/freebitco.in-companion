function drawUI() {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src= "https://dec0y.github.io/freebitco.in-companion/main.d988035a.js";


  const myDiv = document.createElement("div");
  myDiv.id = "SCRIPT_PANEL";
  myDiv.style.cssText = `position:fixed;top:50px;right:16px;z-index:1000;`;
  myDiv.innerHTML = `
    <my-component></my-component>
  `;
  document.body.appendChild(script)
  setTimeout(() => {
    document.body.appendChild(myDiv);
  }, 1000);
}
drawUI();


