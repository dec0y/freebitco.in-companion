const arr = [];

function getTable() {
  const table = document.getElementsByClassName("multiply_bet_history_table_row");

  $.makeArray(table).map(el => {
    const row = $(el).contents()[0];

    const linkCell = $(row).contents()[8];
    const link = $(linkCell).children('a').attr('href');
    const linkSplit = $(linkCell).children('a').attr('href').split('?')[1].split('&')
    const linkResult = {
      server_seed: linkSplit.find(l => l.includes('server_seed=')).split('=')[1],
      server_seed_hash: linkSplit.find(l => l.includes('server_seed_hash=')).split('=')[1],
      client_seed: linkSplit.find(l => l.includes('client_seed=')).split('=')[1],
      nonce: linkSplit.find(l => l.includes('nonce=')).split('=')[1],
      ver: link,
    }

    const result = {
      time: $(row).contents()[0].innerText,
      game: $(row).contents()[1].innerText,
      bet: $(row).contents()[2].innerText,
      roll: $(row).contents()[3].innerText,
      stake: $(row).contents()[4].innerText,
      mult: $(row).contents()[5].innerText,
      profit: $(row).contents()[6].innerText,
      _seed: linkResult

    }
    arr.push(result);
  })

  $('#older_bet_history').click();

  setTimeout(() => {
    window.TABLEARR = arr;
    if (arr.length < 1500) {
      console.log(arr.length);
      getTable();
    } else {
      console.log('all done');
    }
  }, 2500);
}

getTable();