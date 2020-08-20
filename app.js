window.addEventListener("DOMContentLoaded", () => {

	//start line*************

	const addBtns = document.querySelectorAll(".add");
	const showSpan = document.querySelector("#show");
	const productInfoContainer = document.querySelector(".product-info__container");
	const productInfo = document.querySelector(".product-info");
	const countProductSpan = document.querySelector(".countProduct");
	const priceSpan = document.querySelector(".totalPrice");
	const purchase = document.querySelector(".purchase");
	const showPurchase = document.querySelector(".showPurchase");
	const close = document.querySelector(".close");

	//events=====================
	showSpan.addEventListener("click", showHide);
	purchase.addEventListener("click", purchaseFunc);
	close.addEventListener("click", () => {
		showPurchase.classList.remove("purchaseActive");
		showPurchase.querySelector(".showProducts").innerHTML = "0";
		showPurchase.querySelector(".showPrices").innerHTML = "$0";

	});

	addBtns.forEach(addBtn => {
		addBtn.addEventListener("click", addProduct);
		addBtn.addEventListener("click", changeBtn);
	});

	//fix input increase/decrease 
	function fixInput(e) {
		let input = e.target;
		let value = +input.value;
		if (value <= 1) {
			e.target.value = 1;
			calcTotalProduct();
			calcPrice();
			return;
		}
	}

	//add event+func
	function addEvent(element, event, func) {
		element.forEach(item => {
			item.addEventListener(event, func);
		})
	}

	//show/hide product menu
	function showHide() {
		productInfoContainer.classList.toggle("active");
	}

	//add product==================
	function addProduct(e) {
		const target = e.target;
		const parent = target.parentElement.parentElement;
		const img = parent.querySelector("img").src;
		const title = parent.querySelector(".name").innerText;
		const price = parent.querySelector(".price").innerText;

		const div = document.createElement("div");
		div.classList.add("product-info__box");
		div.innerHTML = `<div>
			<img src="${img}" alt="">
			<p class="name">${title}</p>
			<div>
			<span class="price">${price}</span>
			<input type="number" id="inputPrice" value="1">
			</div>
		</div>
		<button class="remove">Remove</button>
		`;
		productInfo.appendChild(div);
		addEvent(document.querySelectorAll(".remove"), "click", removeProduct);
		addEvent(document.querySelectorAll("#inputPrice"), "change", calcTotalProduct);
		addEvent(document.querySelectorAll("#inputPrice"), "change", calcPrice);
		addEvent(document.querySelectorAll("#inputPrice"), "change", fixInput);

		calcTotalProduct();
		calcPrice();
	}

	//remove product==================
	function removeProduct(event) {
		const target = event.target;
		target.parentElement.remove();

		calcTotalProduct();
		calcPrice();
		changeBtn2(target)
	}

	//calculated price===============
	function calcPrice() {
		let totalPrices = 0;
		const productInfo = document.querySelectorAll(".product-info__box");
		productInfo.forEach(item => {
			const price = item.querySelector(".price").innerHTML;
			const priceWithoutDoller = +price.replace("$", "");
			const quantity = +item.querySelector("#inputPrice").value;
			totalPrices += priceWithoutDoller * quantity;
		});
		priceSpan.innerText = `$${totalPrices.toFixed(2)}`;
	}

	//calculated total product=============
	function calcTotalProduct() {
		let totalQuantity = 0;
		const inputPrice = document.querySelectorAll("#inputPrice");
		inputPrice.forEach(price => {
			totalQuantity += +price.value;
		});
		const totalProduct = document.querySelector(".totalProduct");
		totalProduct.innerText = totalQuantity;
		countProductSpan.innerText = totalQuantity;
	}

	//change text of 'ADD TO CART'
	function changeBtn(e) {
		e.target.parentElement.classList.add("notActive");
		e.target.innerText = "ADDED ALREADY";
	}

	//change text of "ADDED ALREADY"
	function changeBtn2(target) {
		const itemBoxes = document.querySelectorAll(".item__box");
		const title = target.parentElement.querySelector(".name").innerHTML;
		itemBoxes.forEach(item => {
			const name = item.querySelector(".name").innerHTML;
			if (name === title) {
				item.querySelector(".addBtn").classList.remove("notActive");
				item.querySelector(".add").innerHTML = "ADD TO CART";
			}
		})
	}

	//purchase
	function purchaseFunc(e) {
		const target = e.target;
		const product = target.parentElement.querySelector(".totalProduct").innerHTML;
		const prices = target.parentElement.querySelector(".totalPrice").innerHTML;

		showPurchase.querySelector(".showProducts").innerHTML = product;
		showPurchase.querySelector(".showPrices").innerHTML = `${prices}`;
		showPurchase.classList.add("purchaseActive");
		e.target.parentElement.querySelector(".totalProduct").innerHTML = 0;
		e.target.parentElement.querySelector(".totalPrice").innerHTML = "$0";
		productInfo.innerHTML = "";
		countProductSpan.innerHTML = "0";

		const itemBoxes = document.querySelectorAll(".item__box");
		itemBoxes.forEach(item => {
			const ckBtns = item.querySelector(".addBtn").classList.contains("notActive");
			if (ckBtns) {
				item.querySelector(".addBtn").classList.remove("notActive");
			}
		});

	}

	//end line************* 

});