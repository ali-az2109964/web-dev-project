import customersFunc from "./functionalities/customers-func.js";

const loginBtn = document.querySelector("#loginBtn");

window.addEventListener("load", async () => {
	if (await customersFunc.isLoggedIn(localStorage.custCookie)) {
		loginBtn.textContent = "Logout";
		document.querySelector("#purchaseLI").classList.toggle("hidden", false);
	}
});

loginBtn.addEventListener("click", async () => {
	if (loginBtn.textContent === "Login") {
		if (!(await customersFunc.isLoggedIn(localStorage.custCookie))) {
			window.location.href = "/login-type.html";
		} else {
			loginBtn.textContent = "Login";
			document.querySelector("#purchaseLI").classList.toggle("hidden", true);
		}
	} else {
		customersFunc.logout(localStorage.custCookie);
		loginBtn.textContent = "Login";
		document.querySelector("#purchaseLI").classList.toggle("hidden", true);
	}
});
