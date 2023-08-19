import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-auth.js";

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

let loginForm = document.querySelector("#loginForm");
loginForm.addEventListener('submit', (event) => {
    const auth = getAuth();
    event.preventDefault();
    let email = event.target[0].value;
    let password = event.target[1].value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            let popup = `<div class="popup-container" id="popupContainer">
              <div class="popup-content">
                <h2>Login Successfully!</h2>
              </div>
            </div>`;
            let parent = event.target.parentNode.parentNode;
            let sibling = parent.lastChild.previousSibling;
            console.log(sibling);
            console.log(parent);

            let tempElement = document.createElement("div");
            tempElement.innerHTML = popup;
            let newPopupContainer = tempElement.firstChild;
            parent.insertBefore(newPopupContainer, sibling);



            setTimeout(function () {
                let popupContainer = document.getElementById("popupContainer");
                popupContainer.style.opacity = "1";
                popupContainer.style.opacity = "0";
                popupContainer.style.pointerEvents = "none";

                if (user) {
                    window.location.href = './dashboard.html';
                }
            }, 1000);

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            let errorMsg = document.querySelector(".errorMsg");
            errorMsg.style.display = 'block';
            errorMsg.innerHTML = errorMessage.slice(errorMessage.indexOf('/') + 1, errorMessage.indexOf(')'));
        });
})