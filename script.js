function drawUI() {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.innerText = `
    $(document).ready(function(){ 
      function getBalance() {
        return parseFloat($("#balance").html());
      }

      let balance = getBalance();
      let amounts = ["0.00000001", (balance * .05).toFixed(8), (balance * .2).toFixed(8)];

      let wins = 0;
      let loss = 0;
      let winBTC = 0.00000000;
      let lostBTC = 0.00000000;

      let currentBetAmount = null;
      let currentRatio = null;

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
        return {
          won: document.getElementById("double_your_btc_bet_win").style.display !== "none",
          lost: document.getElementById("double_your_btc_bet_lose").style.display !== "none",
        };
      }

      function updateText() {
        balance = getBalance();
        
        document.getElementById("amount-2").innerText = amounts[1];
        document.getElementById("winning-2").innerText = parseFloat(amounts[1] * .07).toFixed(8);
        document.getElementById("amount-3").innerText = amounts[2];
        document.getElementById("winning-3").innerText = parseFloat(amounts[2] * .07).toFixed(8);
        document.getElementById("game-wins").innerText = wins;
        document.getElementById("game-loss").innerText = loss;
        document.getElementById("game-total").innerText = wins + loss;
        document.getElementById("btc-won").innerText = winBTC.toFixed(8);
        document.getElementById("btc-lost").innerText = lostBTC.toFixed(8);
        document.getElementById("btc-profit").innerText = (winBTC - lostBTC).toFixed(8);
      }

      function loopGame(streak, maxStreak, resetStreak) {
        if(window && window.PLAY_MULTIPLY_BTC){
          let override = false;
          const checkG = checkGame();
          if (checkG.won) {
            wins++;
            winBTC += currentBetAmount * (currentRatio - 1);
          } else if (checkG.lost) {
            loss++;
            lostBTC += parseFloat(currentBetAmount);
            override = true;
            currentRatio = 1.07;
            currentBetAmount = amounts[2];
            setRatio("1.07");
            setBetAmount(amounts[2]);
            playGame();
          }
      
          if (!override) {
            if (streak < maxStreak) {
              streak++;
              currentRatio = 1.07;
              currentBetAmount = amounts[1];
              setRatio("1.07");
              setBetAmount(amounts[1]);
              playGame();
            } else if (streak < (maxStreak + resetStreak)) {
              streak++;
              currentRatio = 1.07;
              currentBetAmount = amounts[0];
              setRatio("1.07");
              setBetAmount(amounts[0]);
              playGame();
            } else {
              streak = 0;
            }
          }
        } 
        setTimeout(function() { 
          updateText();
          loopGame(streak, maxStreak, resetStreak); 
        }, streak === 0 ? 100 : 1500);
      }
      
      loopGame(0, 999999999, 4);
      document.getElementById("test-btn").addEventListener(
        "click",
        function() {
          window.PLAY_MULTIPLY_BTC = !window.PLAY_MULTIPLY_BTC;
          if (window.PLAY_MULTIPLY_BTC) {
            $('.double_your_btc_link').click();
            document.getElementById("test-btn").innerText = "Stop MultiplyBTC";
          } else {
            document.getElementById("test-btn").innerText = "Start MultiplyBTC";
          }
        }
      );
    }); 
  `
  const myDiv = document.createElement("div");
  myDiv.id = "SCRIPT_PANEL";
  myDiv.style.cssText = `position:fixed;top:10vh;right:16px;z-index:1000;`;
  myDiv.innerHTML = `
    <div style="background-color:white;border-radius:6px;width:350px;overflow-y:hidden;">
    <div style="text-align:center;padding:12px;margin-bottom:6px;background-color:#008F8C;"><h5 style="color:white;margin:0px;">🚀 BTC</h5></div>
    <div style="padding:5px 12px 8px 12px;display:flex;justify-content:center;">
      <button id="test-btn" style="font-size:12px;background-color:#015958;padding:6px 16px; border:0px;border-radius:7px;">Start MultiplyBTC</button>
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
        
      </table>
    </div>
    <div style="padding:0px 12px;">
      <table style="width:100%;">
        <tr>
          <th colspan="2">Bet Amounts</th>
        </tr>
        <tr>
          <td id="amount-2"></td>
          <td id="amount-3"></td>
        </tr>
        <tr>
          <th colspan="2">If Won</th>
        </tr>
        <tr>
          <td id="winning-2"></td>
          <td id="winning-3"></td>
        </tr>
      </table>
    </div>
    </div>
  `;
  document.body.appendChild(myDiv);
  setTimeout(() => {
    document.body.appendChild(script)
  }, 500);
}
drawUI();
function clickRoll() {
  window.scrollTo({ top: 1000, behavior: 'smooth' })
  const timing = Math.floor(Math.random() * 10) * 1000;
  console.log(`Rolling in ${timing / 1000}s`);
  setTimeout(function () {
    var button = document.getElementById("free_play_form_button");
    if (button.style.display !== 'none') {
      try {
        button.click()
      } catch (e) { }
      console.log(`Rolled`)
      setTimeout(function () { closeModal(); }, 5000);
    } else {
      console.log('No Roll')
    }
  }, timing);
}
function closeModal() {
  try {
    document.getElementsByClassName('pushpad_deny_button')[0].click();
  } catch (e) { }
  var c = document.getElementsByClassName('reveal-modal')
  Array.from(c).map(d => {
    if (d.classList.contains('open')) {
      const e = d.getElementsByClassName('close-reveal-modal')[0]
      console.log('Modal closed')
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
  console.log(`Cleaning in ${baseTiming / 1000}s`)
  setTimeout(function () {
    closeModal();
  }, baseTiming);
}

start();