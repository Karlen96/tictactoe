const x = document.querySelector(".x");
const o = document.querySelector(".o");
const start__form = document.querySelector(".start__form");
const game__body = document.querySelector(".game__body");
const victory = document.querySelector(".victory");
const victoryp = document.querySelector(".victory p");
const play = document.querySelector(".play");

let j, countDrow = 0,
	sizeTable = prompt("enter any sizes for tables"),
	sizeTableBombination;
const calls = [],
	arroptions = [];


function createTable() { // создает масив получая значения из инпута
	let table = document.createElement("table");
	game__body.appendChild(table);
	for (let i = 0; i < sizeTable; i++) {
		calls[i] = [];
		let tr = document.createElement("tr");
		table.appendChild(tr);
		for (let j = 0; j < sizeTable; j++) {
			let td = document.createElement("td");
			tr.appendChild(td);
			calls[i][j] = td;
			calls[i][j].onclick = writeText;
		}
	}
}

x.onclick = function x() { //  выбирает кто играет первым тут Х первые
	game__body.style.display = "flex"
	start__form.style.display = "none";
	j = 0;
	createTable();
	combinationsVictory();
}
o.onclick = function o() { // выбирает кто играет первым тут О первые
	game__body.style.display = "flex"
	start__form.style.display = "none";
	j = 1;
	createTable();
	combinationsVictory();
}

function writeText() { // ставит Х или О завысимости кто играет первым
	if (this.innerHTML.length == 0 && j % 2 == 0) {
		this.innerHTML = "X";
	} else if (this.innerHTML.length == 0 && j % 2 != 0) {
		this.innerHTML = "O";
	}
	j++;
	countDrow++;
	if (countDrow > sizeTable - 1) {
		checkVictory();
	}
}


function combinationsVictory() {
	sizeTableBombination = parseInt(sizeTable) * 2 + 2;
	for (let i = 0; i < sizeTableBombination; i++) {
		arroptions.push([]);
	}
	allCombinationRow();
	allCombinationColl();
	allCombinationDiagonal();
	allCombinationDiagonalTwo();
}

let i = 0;

function allCombinationRow() {
	for (let j = 0; j < sizeTable; j++) {
		arroptions[i].push(calls[i][j])
	}
	i++;
	if (i < sizeTable) {
		allCombinationRow();
	}
}

let l = sizeTable;
let k = 0;

function allCombinationColl() {
	for (let i = 0; i < sizeTable; i++) {
		arroptions[l].push(calls[i][k])
	}
	l++;
	k++;
	if (l < sizeTable * 2) {
		allCombinationColl();
	}
}

let f = sizeTable * 2;

function allCombinationDiagonal() {
	for (let i = 0; i < sizeTable; i++) {
		let j = i;
		arroptions[f].push(calls[i][j]);
	}
}

let h = sizeTable - 1;
let t = 0;
let d = sizeTable * 2 + 1;

function allCombinationDiagonalTwo() {
	while (h >= 0) {
		arroptions[d].push(calls[t][h]);
		h--;
		t++;
	}
}

let victoriCountRowX = 0;
let victoriCountRowO = 0;


function checkVictory() { //проверяет совпадение и находит победителя
	for (let i = 0; i < sizeTable; i++) {
		for (let j = 0; j < sizeTable; j++) {
			if (arroptions[i][j].innerHTML == "X") {
				victoriCountRowX++;
				if (victoriCountRowX == sizeTable) {
					victory.style.display = "flex";
					victoryp.innerHTML = "VictoryX";
					play.onclick = () => location.reload();
				}
			} else {
				victoriCountRowX = 0;
			}
			if (arroptions[i][j].innerHTML == "O") {
				victoriCountRowO++;
				if (victoriCountRowO == sizeTable) {
					victory.style.display = "flex";
					victoryp.innerHTML = "VictoryO";
					play.onclick = () => location.reload();
				}
			} else {
				victoriCountRowO = 0;
			}
		}
	}

	for (let i = 0; i < sizeTable; i++) {
		if (arroptions[i][i].innerHTML == "X") {
			victoriCountRowX++;
			if (victoriCountRowX == sizeTable) {
				victory.style.display = "flex";
				victoryp.innerHTML = "VictoryX";
				play.onclick = () => location.reload();
			}
		} else {
			victoriCountRowX = 0;
		}
		if (arroptions[i][i].innerHTML == "O") {
			victoriCountRowO++;
			if (victoriCountRowO == sizeTable) {
				victory.style.display = "flex";
				victoryp.innerHTML = "VictoryO";
				play.onclick = () => location.reload();
			}
		} else {
			victoriCountRowO = 0;
		}
	}



	if (countDrow == Math.pow(sizeTable, 2)) { // если ничья
		victory.style.display = "flex";
		victoryp.innerHTML = "draw";
		play.onclick = () => location.reload();
	}
}