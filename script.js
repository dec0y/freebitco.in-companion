function drawUI() {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.innerHTML = `
    $(document).ready(function(){ 
      function getBalance() {
        return parseFloat($("#balance").html());
      }

      let balance = getBalance();
      let wins = 0;
      let loss = 0;
      let winBTC = 0.00000000;
      let lostBTC = 0.00000000;
      let totalBet = 0;

      let currentBetAmount = parseFloat(0.00000001).toFixed(8);
      let currentRatio = 10.00;

      let override = false;

      function setRatio(value) {
        document.getElementById("double_your_btc_payout_multiplier").value = value;
      }

      function setBetAmount(amount) {
        document.getElementById("double_your_btc_stake").value = amount;
      }

      function playGame()  {
        document.getElementById("double_your_btc_bet_hi_button").click();
      }

      function checkGame() {
        const result = {
          won: document.getElementById("double_your_btc_bet_win").style.display !== "none",
          lost: document.getElementById("double_your_btc_bet_lose").style.display !== "none",
        };

        if(!result.won && !result.lost) {
          setTimeout(() => { checkGame(); }, 50);
        } else {
          document.getElementById("double_your_btc_bet_win").style.display = 'none';
          document.getElementById("double_your_btc_bet_lose").style.display = 'none';
          if (result.won) {
            wins++;
            winBTC += currentBetAmount * (currentRatio - 1);

            const startingBetAmount = (parseInt(document.getElementById("PLAY-STARTING-BET").value) / 100000000).toFixed(8);

            currentBetAmount = parseFloat(startingBetAmount).toFixed(8);

            setBetAmount(startingBetAmount);
          } else {
            loss++;
            lostBTC += parseFloat(currentBetAmount);
            currentBetAmount = (parseFloat(currentBetAmount) + 0.00000001).toFixed(8);
            setBetAmount(currentBetAmount);
          }
          updateText();
          setTimeout(() => {
            loopGame();
          }, 100);
        }

        
        return result;
      }

      function updateText() {        
        document.getElementById("totalBet").innerText = totalBet.toFixed(8);
        document.getElementById("game-wins").innerText = wins;
        document.getElementById("game-loss").innerText = loss;
        document.getElementById("game-total").innerText = wins + loss;
        document.getElementById("btc-won").innerText = winBTC.toFixed(8);
        document.getElementById("btc-lost").innerText = lostBTC.toFixed(8);
        document.getElementById("btc-profit").innerText = (winBTC - lostBTC).toFixed(8);
      }

      function loopGame() {
        if (window && window.PLAY_MULTIPLY_BTC) {
          currentRatio = parseFloat(document.getElementById('PLAY-RATIO').value);
          setRatio(currentRatio.toString());
          totalBet += parseFloat(currentBetAmount);
          playGame();
          checkGame();
        } else {
          setTimeout(() => {
            loopGame();
          }, 50);
        } 
      }
      
      loopGame();
      
      function TestBtnClicked() {
        window.PLAY_MULTIPLY_BTC = !window.PLAY_MULTIPLY_BTC;
          if (window.PLAY_MULTIPLY_BTC) {
            $('.MY-PANEL').addClass('MY-PANEL-ACTIVE');
            $('.double_your_btc_link').click();
            document.getElementById("test-btn").innerText = "Stop MultiplyBTC";
          } else {
            $('.MY-PANEL').removeClass('MY-PANEL-ACTIVE');
            document.getElementById("test-btn").innerText = "Start MultiplyBTC";
          }
      }

      document.getElementById("test-btn").addEventListener(
        "click",
        function() {
            TestBtnClicked();
        }
      );

      document.getElementById("AUTO-PLAY-BTN").addEventListener(
        "click",
        function () {
          localStorage.setItem("AUTOPLAY_MULTIPLY_BTC", !JSON.parse(localStorage.getItem("AUTOPLAY_MULTIPLY_BTC")));
          if (JSON.parse(localStorage.getItem("AUTOPLAY_MULTIPLY_BTC"))) {
            document.getElementById("AUTO-PLAY-BTN").innerText = "AutoPlay (ON)";
          } else {
            document.getElementById("AUTO-PLAY-BTN").innerText = "AutoPlay (OFF)";
          }
        }
      );
      
      function clickRoll() {
        window.scrollTo({ top: 1000, behavior: 'smooth' });
        const timing = Math.floor(Math.random() * 10) * 1000;
        console.log("Rolling in " + timing / 1000 + "s");
        setTimeout(function () {
          var button = document.getElementById("free_play_form_button");
          if (button.style.display !== 'none') {
            try {
              button.click();
            } catch (e) { }
            console.log("Rolled");
            setTimeout(function () {
              closeModal();
              if (JSON.parse(localStorage.getItem("AUTOPLAY_MULTIPLY_BTC"))) {
                TestBtnClicked();
              }
            }, 5000);
          } else {
            console.log('No Roll');
            if (JSON.parse(localStorage.getItem("AUTOPLAY_MULTIPLY_BTC"))) {
              TestBtnClicked();
            }
          }
      
        }, timing);
      }

      function closeModal() {
        try {
          document.getElementsByClassName('pushpad_deny_button')[0].click();
        } catch (e) { }
        var c = document.getElementsByClassName('reveal-modal');
        Array.from(c).map(function (d) {
          if (d.classList.contains('open')) {
            const e = d.getElementsByClassName('close-reveal-modal')[0];
            console.log('Modal closed');
            try { e.click(); } catch (e) { }
          }
        })
        const elements = document.getElementsByClassName('reveal-modal');
        let elementsI = elements.length;
        while (elementsI--) {
          elements[elementsI].style.display = 'none';
        }
        clickRoll()
      }
      function start() {
        const baseTiming = Math.floor(((Math.random() * 30) + 1) * 1000);
        console.log("Cleaning in " + baseTiming / 1000 + "s");
        setTimeout(function () {
          closeModal();
        }, baseTiming);
      }
      
      start();

      if (JSON.parse(localStorage.getItem("AUTOPLAY_MULTIPLY_BTC"))) {
        document.getElementById("AUTO-PLAY-BTN").innerText = "AutoPlay (ON)";
      } else {
        document.getElementById("AUTO-PLAY-BTN").innerText = "AutoPlay (OFF)";
      }

    }); 
  `

  const myStyle = document.createElement("style");
  myStyle.innerHTML = `
    .MY-PANEL:hover { opacity: 1 !important;; }
    .MY-PANEL-ACTIVE { opacity: 1 !important; }
  `

  const myDiv = document.createElement("div");
  myDiv.id = "SCRIPT_PANEL";
  myDiv.style.cssText = `position:fixed;top:50px;right:16px;z-index:1000;`;
  myDiv.innerHTML = `
    <div class="MY-PANEL" style="background-color:white;border-radius:6px;width:350px;overflow-y:hidden;opacity:0.5;">
    <div style="text-align:center;padding:12px;margin-bottom:6px;background-color:#008F8C;"><h5 style="color:white;margin:0px;">🚀 BTC</h5></div>
    <div style="padding:5px 12px 8px 12px;display:flex;justify-content:center;">
      <button id="test-btn" style="font-size:12px;background-color:#015958;padding:6px 16px; border:0px;border-radius:7px;margin-right:8px">Start MultiplyBTC</button>
      <button id="AUTO-PLAY-BTN" style="font-size:12px;background-color:#015958;padding:6px 16px; border:0px;border-radius:7px;"></button>
    </div>
    <div style="padding:12px;display:flex;flex-wrap:nowrap;font-size:12px;">
      <div style="display:flex;align-items:center;width:50%;">
        <div style="margin-right:4px">Odds</div>
        <input style="margin:0px" id="PLAY-RATIO" value="10.00" type="number" />
      </div>
      <div style="display:flex;align-items:center;width:50%;padding-left:4px">
        <div style="margin-right:4px">Bet</div>
        <input style="margin:0px" id="PLAY-STARTING-BET" value="1" type="number" />
      </div>
    </div>
    <div style="padding:0px 12px;">
      <table style="width:100%;">
        <tr><th colspan="2">Stats</th></tr>
        <tr>
          <td>Wins/Lost/Total</td>
          <td>
            <span id="game-wins"></span>/<span id="game-loss"></span>/<span id="game-total"></span>
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
    </div>
  `;
  document.body.appendChild(myStyle);
  document.body.appendChild(myDiv);
  setTimeout(() => {
    document.body.appendChild(script)
  }, 500);
}
drawUI();


