

$(document).ready(function(){
  
  

});

$(document).ready(function(){ 
  function getBalance() {
    return parseFloat($("#balance").html());
  }

  let balance = getBalance();
  let wins = 0;
  let loss = 0;
  let winBTC = parseFloat('0.00000000');
  let lostBTC = parseFloat('0.00000000');
  let totalBet = 0;

  let storedObj = JSON.parse(localStorage.getItem("AUTOPLAY-OBJ"));
  if(!storedObj) {
    storedObj = {
      currentBetAmount: (parseInt(document.getElementById("PLAY-STARTING-BET").value) / 100000000).toFixed(8),
      currentRatio: 10.00,
      incrementAmount: (parseInt(document.getElementById("PLAY-INCREMENT-BET").value) / 100000000).toFixed(8),
      autoGamesCount: parseInt(document.getElementById("AUTO-GAME-COUNT"))

    };
    localStorage.setItem("AUTOPLAY-OBJ", JSON.stringify(storedObj));
  }

  let currentBetAmount = storedObj.currentBetAmount;
  let currentRatio = storedObj.currentRatio;
  let incrementAmount = storedObj.incrementAmount;
  let autoGames = storedObj.autoGamesCount;

  document.getElementById("PLAY-STARTING-BET").value = currentBetAmount * 100000000;
  document.getElementById("PLAY-RATIO").value = currentRatio;
  document.getElementById("PLAY-INCREMENT-BET").value = incrementAmount * 100000000;
  document.getElementById("AUTO-GAME-COUNT").value = autoGames;


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
      won: document.getElementById("double_your_btc_bet_win").style.display === "block",
      lost: document.getElementById("double_your_btc_bet_lose").style.display === "block",
    };

    if(!result.won && !result.lost) {
      setTimeout(() => { checkGame(); }, 250);
      return;
    } else {
      if (result.won) {
        wins++;
        winBTC += parseFloat(document.getElementById('double_your_btc_bet_win').innerText.replace('You BET HI so you win ', '').replace(' BTC!', ''));
        const startingBetAmount = (parseInt(document.getElementById("PLAY-STARTING-BET").value) / 100000000).toFixed(8);
        currentBetAmount = parseFloat(startingBetAmount).toFixed(8);
        setBetAmount(startingBetAmount);
      } else {
        loss++;
        lostBTC += parseFloat(document.getElementById('double_your_btc_bet_lose').innerText.replace('You BET HI so you lose ', '').replace(' BTC', ''));
        currentBetAmount = (parseFloat(currentBetAmount) + parseFloat(storedObj.incrementAmount)).toFixed(8);
        setBetAmount(currentBetAmount);
      }
      updateText();
      setTimeout(() => {
        document.getElementById("double_your_btc_bet_win").style.display = 'none';
        document.getElementById("double_your_btc_bet_lose").style.display = 'none';
        document.getElementsByClassName('top-bar-section')[0].style.display = 'block';
        loopGame();
      }, 500);
    }

    
    return result;
  }

  function updateText() {        
    document.getElementById("totalBet").innerText = totalBet.toFixed(8);
    document.getElementById("game-wins").innerText = wins;

    let perct = {};
    if (wins > loss) {
      perct.win = ((loss / wins) * 100).toFixed(2);
      perct.loss = (100 - (loss / wins) * 100).toFixed(2);
    } else if (loss > wins) {
      perct.win = ((wins / loss) * 100).toFixed(2);
      perct.loss = (100 - (wins / loss) * 100).toFixed(2);
    } else {
      perct.win = 0;
      perct.loss = 0;
    }

    document.getElementById("game-wins-p").innerText = perct.win + '%';
    document.getElementById("game-loss-p").innerText = perct.loss + '%';
    document.getElementById("game-loss").innerText = loss;
    document.getElementById("game-total").innerText = wins + loss;
    document.getElementById("btc-won").innerText = parseFloat(winBTC).toFixed(8);
    document.getElementById("btc-lost").innerText = parseFloat(lostBTC).toFixed(8);
    document.getElementById("btc-profit").innerText = (parseFloat(winBTC) - parseFloat(lostBTC)).toFixed(8);
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
  
  updateText();
  loopGame();

  function playAutoGamesCheck() {
    const result = {
      won: document.getElementById("double_your_btc_bet_win").style.display !== "none",
      lost: document.getElementById("double_your_btc_bet_lose").style.display !== "none",
    };

    if(!result.won && !result.lost) {
      setTimeout(() => { playAutoGamesCheck(); }, 50);
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
        currentBetAmount = (parseFloat(currentBetAmount) + parseFloat(incrementAmount)).toFixed(8);
        setBetAmount(currentBetAmount);
      }
      updateText();
      setTimeout(() => {
        playAutoGames();
      }, 200);
    }
  }

  function playAutoGames() {
    if (autoGames > 0) {
      autoGames--;
      currentRatio = parseFloat(document.getElementById('PLAY-RATIO').value);
      setRatio(currentRatio.toString());
      totalBet += parseFloat(currentBetAmount);
      playGame();
      playAutoGamesCheck();
    } else {
      $('.free_play_link').click();
    }
  }
  
  function testBtnClicked() {
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
        testBtnClicked();
    }
  );

  document.getElementById("TOGGLE-PANEL-VISIBILITY").addEventListener(
    "click",
    function() {
        const currentStyle = document.getElementsByClassName('MY-PANEL')[0].style.transform;
        if (currentStyle === 'translateX(-10px)') {
          document.getElementById("TOGGLE-PANEL-VISIBILITY").innerText = '⬅';
          document.getElementsByClassName('MY-PANEL')[0].style.transform = 'translateX(300px)';
        } else {
          document.getElementById("TOGGLE-PANEL-VISIBILITY").innerText = '➡';
          document.getElementsByClassName('MY-PANEL')[0].style.transform = 'translateX(-10px)';
        }
    }
  );

  document.getElementById("TOGGLE-PLAY-SETTINGS").addEventListener(
    "click",
    function() {
        if ($('.MY-PANEL-SETTINGS').hasClass('ACTIVE')) {
          document.getElementById("TOGGLE-PLAY-SETTINGS").innerText = '⚙';
          $('.MY-PANEL-SETTINGS').removeClass('ACTIVE');
        } else {
          document.getElementById("TOGGLE-PLAY-SETTINGS").innerText = '✖';
          $('.MY-PANEL-SETTINGS').addClass('ACTIVE');
        }
    }
  );

  document.getElementById("SAVE-AUTO-PLAY-SETTINGS").addEventListener(
    "click",
    function() {
      storedObj = {
        currentBetAmount: (parseInt(document.getElementById("PLAY-STARTING-BET").value) / 100000000).toFixed(8),
        currentRatio: parseFloat(document.getElementById('PLAY-RATIO').value),
        incrementAmount: (parseInt(document.getElementById("PLAY-INCREMENT-BET").value) / 100000000).toFixed(8),
        autoGamesCount: parseInt(document.getElementById("AUTO-GAME-COUNT").value)

      };
      localStorage.setItem("AUTOPLAY-OBJ", JSON.stringify(storedObj));
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
            playAutoGames();
          }
        }, 5000);
      } else {
        console.log('No Roll');
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