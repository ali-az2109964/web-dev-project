import customersFunc from "./functionalities/customers-func.js";

const buyerDetailsForm = document.querySelector("#buyerDetailsForm");
const addOrder = document.querySelector("#addOrder");

document.addEventListener("DOMContentLoaded", showBuyerDetailsForm);

// On placing an order do the necessary server-side actions to complete the purchase
buyerDetailsForm.addEventListener("submit", async (event) => {
	event.preventDefault();

	// creating the purchase object
	const purchaseDetails = {
		orderNo: Math.floor(Math.random() * 1000000),
		itemId: parseInt(localStorage.itemID),
		shippingAddress: buyerDetailsForm.querySelector("#shippingAddress").value,
		quantity: parseInt(buyerDetailsForm.querySelector("#quantity").value),
		date: new Date(Date.now()).toISOString(),
		shippingType: buyerDetailsForm.querySelector("#shippingType").value,
		customerId: parseInt(localStorage.custCookie.split(":")[0])
	};

	const quantity = parseInt(buyerDetailsForm.querySelector("#quantity").value);
	const customerId = parseInt(localStorage.custCookie.split(":")[0]);
	const itemId = parseInt(localStorage.itemID);
	const result = await customersFunc.purchaseItem(customerId, itemId, quantity, purchaseDetails);
	console.log(result);

	switch (result) {
		case "item purchased successfully":
			alert("Order placed successfully");
			window.location.href = "/home.html";
			break;
		case "not enough stock for this item":
			alert("Not enough stock for this item, please try again later");
			break;
		case "customer has insufficient balance":
			alert("Insufficient balance, please try again later");
			break;
		case "there was an error purchasing this item":
			alert("There was an error purchasing this item");
			break;
	}
});

async function showBuyerDetailsForm() {
	// if the customer is logged in
	if (await customersFunc.isLoggedIn(localStorage.custCookie)) {
		const itemData = await fetch(`/api/items?id=${localStorage.itemID}`);
		const item = await itemData.json();
		buyerDetailsForm.innerHTML = buyersDetailsFormToHTML(item);
	} else {
		alert("Please login to buy items");
		window.location.href = "/customers-login.html";
	}
}

function buyersDetailsFormToHTML(item) {
	return `<h1>Buy Now!</h1>
          <label>Item: ${item.title}</label>
          <label for="shippingAddress">Shipping Address: </label>
          <input type="text" id="shippingAddress" required/>
          <label for="quantity">Quantity: </label>
          <input type="number" name="quantity" id="quantity" required/>
          <label for="shippingType">Shipping Type: </label>
          <select name="shippingType" id="shippingType">
            <option value="Standard">Standard</option>
            <option value="Express">Express</option>
            <option value="Priority Mail">Priority Mail</option>
          </select>
          <label id="price">Price: $${item.price}</label>
          <button type="submit" id="addOrder">Place Order</button>`;
}
