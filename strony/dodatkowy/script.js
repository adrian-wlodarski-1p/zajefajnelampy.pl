let table = document.getElementById("orders");
document.getElementById("wrapper").style.width = table.offsetWidth + "px";

let count = 911610;
const shop_items = {"IPhone 14 256Gb Gray": 999, "Samsung S22 Black": 756, "Camera C430 W 4k": 699, "MacBook Pro": 2699, "Smartwatch 5.0 LTE Wifi": 199, "Game Console Controller": 22, "Sony PlayStation 5 With CD": 850};

if(typeof(Storage) !== "undefined") {
	let orders = sessionStorage.getItem("orders");

	if(orders !== null) {
		table.replaceChildren(...[
		   orders.map(node => node.cloneNode(true))
		]);
	}
}

let sum_td = document.querySelector("#sum td");
sum_td.classList.add("sum-even");
updateSum();

function addRow() {
    let row = document.createElement("tr");
	function addCell(content) {
		let cell = document.createElement("td");
		cell.textContent = content;
		row.appendChild(cell);
	}
	const randInt = (n) => Math.floor(Math.random() * n);
	
	addCell(new Date().toLocaleString("sv-SE").slice(0, -3));
	addCell(++count);
	let keys = Object.keys(shop_items);
	let item = keys[randInt(keys.length)];
	let price = shop_items[item];
	addCell(item);
	addCell(price+"$");
	let n = randInt(5);
	n = n == 4 ? 6 : (n % 2 + 1);
	addCell(n);
	addCell((price * n)+"$");
	
	sum_td.classList.toggle("sum-even");
	table.appendChild(row);
	
	updateSum();
}

function removeRow() {
	let elem = document.querySelector("#orders tr:last-child:has(td)");
	if(elem !== null) elem.remove();
	updateSum();
}

function cancelAll() {
	let saved = document.querySelector("#orders tr:first-child");
	table.innerHTML = "";
	table.appendChild(saved);
	updateSum();
}

function checkout() {
	updateSum();
	window.location.href = './payment.html';
}

function updateSum() {	
	let sum = 0;
	let bills = document.querySelectorAll("#orders td:last-child");
	for(let i = 0; i < bills.length; i++) {
		sum += Number(bills[i].textContent.slice(0, -1));
	}
	sum_td.textContent = sum+"$";
	
	if(typeof(Storage) !== "undefined") {
		sessionStorage.orders = ...table.childNodes;
		sessionStorage.sum = sum;
	}
}
