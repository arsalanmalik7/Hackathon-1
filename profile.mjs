import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, updatePassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCOB12Lf0lqtanqj-HQt8DNZqhRfHTCA2g",
    authDomain: "blogging-app-8.firebaseapp.com",
    projectId: "blogging-app-8",
    storageBucket: "blogging-app-8.appspot.com",
    messagingSenderId: "924509823713",
    appId: "1:924509823713:web:c20c544d233e871b268da0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let signout = document.querySelector(".signout");
signout.addEventListener('click', () => {

    signOut(auth).then(() => {
        console.log('signout successfully');
        window.location.href = './login.html';
    }).catch((error) => {
        console.log(error);
    });
})

let name = document.querySelector("#myName");

let firstName = localStorage.getItem('firstName');
let lastName = localStorage.getItem('lastName');

name.innerHTML = `${firstName} ${lastName}`;

let editName = document.querySelector("#edit");

editName.addEventListener("click", () => {
    editName.innerHTML = ` <input type="password" placeholder="Old Password" id="oldPassword"> `
    editInput.setAttribute("type", "text");
    editInput.value = editName.innerText;

    editName.appendChild(editInput);

    editInput.focus();

    editInput.addEventListener("blur", () => {
        // Get the updated value from the input field
        const updatedValue = editInput.value;

        // Update the content of editName with the new value
        editName.innerHTML = updatedValue;

        // Clean up event listeners
        editInput.removeEventListener("blur", onBlurHandler);
    });
})

const user = auth.currentUser;
console.log(user)

let newPassword = document.querySelector("#newPassword").value;

// updatePassword(user, newPassword)
//     .then(() => {
//         console.log("Password changed successfully.");
//     })
//     .catch((error) => {
//         console.error("Error changing password:", error);
//     });