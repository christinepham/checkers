// TODO:
// Jump over opponent, doesn't remove opponent in one direction, math still needs work
// If you can jump, you have to

var board;
var turn = 0;
var redSelected;
var whiteSelected;
var moving = {
	i: -1, 
	j: -1
};

setupBoard();

function startMove(i, j){
	if(isReadyToMove(i,j)){
		document.getElementById("cell" + i + j).className += " highlight";
	  moving.i = i; 
	  moving.j = j;
	  redSelected = $('div').hasClass('redoccupied');
		whiteSelected = $('div').hasClass('whiteoccupied');
	}
	else{
		alert("I can't move yet! Gotta wait for my turn!!");
	}
}

function move(i, j){
	if(isValidMove(moving.i, moving.j, i, j)){
	  //if jumped over opponent
	  if(i - moving.i == 2){
	  	if(board[moving.i + 1][moving.j + 1] == board[moving.i][moving.j] * -1){
	    	board[moving.i + 1][moving.j + 1] = 0;
	    }
		}
	  if(i - moving.i == -2){
	  	if(board[moving.i - 1][moving.j -1] == board[moving.i][moving.j] * -1){
	    	board[moving.i - 1][moving.j -1] = 0;
	    }
	  }
		board[i][j] = board[moving.i][moving.j];
	  board[moving.i][moving.j] = 0;
	  turn++;
	  moving.i = -1;
	  moving.j = -1;
	  renderBoard();
	}
}

//have old code that only checks for one way but not if it's a valid jump
function isValidMove(iFrom, jFrom, iTo, jTo) {
	var black = $('td').hasClass('black');
	// if (black) {
	// 	if (redSelected && (iFrom - iTo == 1) && (jTo - jFrom == 1)) {
	//   	return true;
	//   } else if (whiteSelected && (iTo - iFrom == 1) && (jFrom - jTo == 1)) {
	//   	return true;
	//   }
	// }
	// return false;
	return true;
}

function isReadyToMove(i,j) {
	//if there is already a move
	if(moving.i != -1){
		return false;
	}
	//is it player's turn
	if(turn%2 === 0 && board[i][j] == -1) {
	 	 return true;
	}
	if(turn%2 === 1 && board[i][j] == 1) {
	 	 return true;
	} 
	return false;
}

// 0 is empty cell, -1 is cell taken by reds, 1 is taken by whites
function setupBoard() {
	board = new Array(8);
	for (var i = 1; i < 9; i++) {
	  board[i] = new Array(8);
	  for (var j = 1; j < 9; j++) {
	    if (i % 2 != j % 2 && i < 4) {
	      board[i][j] = 1;
	    } else if (i % 2 != j % 2 && i > 5) {
	      board[i][j] = -1;
	    } else {
	      board[i][j] = 0;
	    }
	  }
	}
	renderBoard();
}

function renderBoard() {
	if(document.getElementById("board")) {
		document.getElementById("board").remove();
	}
	var table = document.createElement("table");
	table.id = "board";
	for (var i = 1; i < 9; i++) {
	  var tr = document.createElement('tr');
	  for (var j = 1; j < 9; j++) {
	    var td = document.createElement('td');
	    if (i % 2 == j % 2) {
	      td.className = "white";
	    } else {
	      td.className = "black";
	     	if(board[i][j] == 0){
	    		td.onclick = function(ii,jj){ return function() { move(ii,jj); } }(i,j);
	    	}
	      else{
	      	td.onclick = function(ii,jj){ return function() { startMove(ii,jj); } }(i,j);
	      }
	    }
	    td.id = "cell" + i + j;
	    if(board[i][j] != 0){
	    	var checker = document.createElement('div');
				if(board[i][j] == 1){
	      	checker.className = "whiteoccupied";
	      }
	      else{
	         checker.className = "redoccupied";
	      }
	      checker.id = "checker" + i + j;
	      td.appendChild(checker);
	    }
	    tr.appendChild(td);
	  }
	  table.appendChild(tr);
	}
	document.body.appendChild(table);
}
