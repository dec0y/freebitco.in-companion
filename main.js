function drawUI() {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src="https://dec0y.github.io/freebitco.in-companion/index.js";

  const myStyle = document.createElement("style");
  myStyle.innerHTML = `
    .MY-PANEL:hover { opacity: 1 !important;; }
    .MY-PANEL-ACTIVE { opacity: 1 !important; }
    .MY-PANEL-SETTINGS { display:none; }
    .MY-PANEL-SETTINGS.ACTIVE { display: flex; }
  `

  const myDiv = document.createElement("div");
  myDiv.id = "SCRIPT_PANEL";
  myDiv.style.cssText = `position:fixed;top:50px;right:16px;z-index:1000;`;
  myDiv.innerHTML = `
    <div class="MY-PANEL" style="background-color:white;border-radius:6px;width:350px;overflow-y:hidden;opacity:0.5;transform:translateX(300px);">
    <div style="text-align:center;padding:12px;margin-bottom:6px;background-color:#008F8C;position:relative">
      <h5 style="color:white;margin:0px;">🚀 BTC 🚀</h5>
      <div style="position:absolute;top:0px;left:0px;width:100%;height:100%;display:flex;padding-left:12px;align-items:center;">
      <div>
      <button id="TOGGLE-PANEL-VISIBILITY" style="font-size:12px;background-color:#015958;padding:6px 16px; border:0px;border-radius:7px;">⬅</button>
      </div>
      </div>
    </div>
    <div style="padding:5px 12px 8px 12px;display:flex;justify-content:center;">
      <button id="test-btn" style="font-size:12px;background-color:#015958;padding:6px 16px; border:0px;border-radius:7px;margin-right:8px">Start MultiplyBTC</button>
      <button id="AUTO-PLAY-BTN" style="font-size:12px;background-color:#015958;padding:6px 16px; border:0px;border-radius:7px;margin-right:8px"></button>
      <button id="TOGGLE-PLAY-SETTINGS" style="font-size:12px;background-color:#015958;padding:6px 16px; border:0px;border-radius:7px;">⚙</button>
    </div>
    
    <div style="padding:12px;">
      <table style="width:100%;margin:0px;">
        <tr><th colspan="2">Stats</th></tr>
        <tr>
          <td>Wins/Lost/Total</td>
          <td>
            <span id="game-wins"></span>/<span id="game-loss"></span>/<span id="game-total"></span>
          </td>
        </tr>
        <tr>
          <td>Wins/Loss %</td>
          <td>
            <span id="game-wins-p"></span>/<span id="game-loss-p"></span>
          </td>
        </tr>
        <tr>
          <td>BTC Won</td>
          <td id="btc-won"></td>
        </tr>
        <tr>
          <td>BTC Lost</td>
          <td id="btc-lost"></td>
        </tr>
        <tr>
          <td>BTC Profit</td>
          <td id="btc-profit"></td>
        </tr>
        <tr>
          <td>Total Bet</td>
          <td id="totalBet"></td>
        </tr>
        
      </table>
    </div>
    <div class="MY-PANEL-SETTINGS" style="padding:12px;flex-wrap:nowrap;font-size:12px;padding-top:0px;">
    <table style="width:100%;margin:0px;">
        <tr><th colspan="2">Settings</th></tr>
        <tr>
          <td style="text-align:right;">Odds</td>
          <td>
            <input style="margin:0px;width:100px;" id="PLAY-RATIO" value="10.00" type="number" />
          </td>
        </tr>
        <tr>
          <td style="text-align:right;">Start</td>
          <td>
            <input style="margin:0px;width:100px;" id="PLAY-STARTING-BET" value="1" type="number" />
          </td>
        </tr>
        <tr>
          <td style="text-align:right;">Increment</td>
          <td>
          <input style="margin:0px;width:100px;" id="PLAY-INCREMENT-BET" value="1" type="number" />
          </td>
        </tr>
        <tr>
          <td style="text-align:right;">AutoPlay #</td>
          <td>
          <input style="margin:0px;width:100px;" id="AUTO-GAME-COUNT" value="30" type="number" />
          </td>
        </tr>
        <tr>
          <th colspan="2">
          <div style="display:flex;align-items:center;padding-left: 4px;justify-content:flex-end;flex:1 1 auto;">
            <button id="SAVE-AUTO-PLAY-SETTINGS" style="font-size:12px;background-color:#015958;padding:6px 16px; border:0px;border-radius:7px;">Save</button>
          </div>
          </th>
        </tr>
        
      </table>

      
    </div>
    </div>
  `;
  document.body.appendChild(myStyle);
  document.body.appendChild(myDiv);
  setTimeout(() => {
    document.body.appendChild(script)
  }, 500);
}
drawUI();


