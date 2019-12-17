var table = new Array(3);
for (let row = 0; row < table.length; row++) {
    table[row] = new Array(3);
}
clearTable();

function clearTable() {
    for (let row = 0; row < table.length; row++) {
        for (let col = 0; col < table[row].length; col++) {
            table[row][col] = "";
            document.getElementById('c' + row + '' + col).innerText = "";
        }
    }
}

function isTableFull() {
    full = true;
    for (let row = 0; row < table.length; row++) {
        for (let col = 0; col < table[row].length; col++) {
            if (table[row][col] == "") full = false;
        }
    }
    return full;
}

function won(J) {
    var w = false;
    var chwin = "XXX";
    if (J == "O") chwin = "OOO";
    var chl3 = "";
    var chl4 = "";
    for (var i = 0; i < 3; i++) {
        chl3 += table[i][i];
        chl4 += table[i][2 - i];
        var chl1 = "";
        var chl2 = "";
        for (var j = 0; j < 3; j++) {
            chl1 += table[i][j];
            chl2 += table[j][i];
        }
        if (chl1 == chwin || chl2 == chwin) w = true;
        console.log(chl1 == chwin);
        console.log(chl2 == chwin);
    }
    if (chl3 == chwin || chl4 == chwin) w = true;
    console.log(chl3 == chwin);
    console.log(chl4 == chwin);
    return w;
}
J = "X";
var XScore = 0;
var OScore = 0;

function clicked(row, col) {
    if (table[row][col] == "") {
        document.getElementById('currentPlayer').innerText = J;
        if (J == "X") J = "O";
        else J = "X";
        table[row][col] = J;
        // console.log(J);
        console.log(table);
        document.getElementById('c' + row + '' + col).innerText = J;
        var Score = 0;
        setInterval(playAgain, 100);
        // console.log(won());
    }


    function playAgain() {
        if (won(J)) {
            if (J == "X") {

                Score = ++XScore;
            } else {

                Score = ++OScore;
            }
            alert('Pelaaja ' + J + ' voitti pelin!');
            clearTable();
            document.getElementById(J + 'Score').innerText = Score;
        } else {
            if (isTableFull()) {
                alert('Tasapeli!');
                clearTable();
                document.getElementById(J + 'Score').innerText = Score;
                document.getElementById(J + 'Score').innerText = Score;
            }
        }
    }
}