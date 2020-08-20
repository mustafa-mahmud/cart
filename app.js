window.addEventListener("DOMContentLoaded", () => {

	const addBtns = document.querySelectorAll(".add");


	//events=====================
	addBtns.forEach(addBtn => {
		addBtn.addEventListener("click", addProduct);
	});

	//add product==================
	function addProduct(e) {
		const target = e.target;
		const parent = target.parentElement;
		console.log(parent);
	}

	//remove product==================
	function removeProduct() {}

	//calculated price===============
	function calcPrice() {}

	//calculated total product=============
	function calcTotalProduct() {}

});