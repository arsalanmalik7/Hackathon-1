import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-auth.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-storage.js"
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
const storage = getStorage(app);
const storageRef = ref(storage);

let signupForm = document.querySelector("#signupForm");
signupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const firstName = event.target[0].value;
    const lastName = event.target[1].value;
    updateProfile(auth.currentUser, {
        firstName: firstName,
        lastName: lastName

    }).then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log(error)
    });

    let email = event.target[2].value;
    let password = event.target[3].value;
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            let popup = `<div class="popup-container" id="popupContainer">
        <div class="popup-content">
        <h2>Signup Successful!</h2>
        <p>Thank you for signing up.</p>
        </div>
            </div>`;
            let parent = event.target.parentNode.parentNode;
            let sibling = parent.lastChild.previousSibling;
            console.log(sibling);
            console.log(parent);

            setTimeout(() => {
                let popupContainer = document.querySelector("#popupContainer");
                popupContainer.style.display = 'none';
                window.location.href = './login.html';

            }, 2000);

            let tempElement = document.createElement("div");
            tempElement.innerHTML = popup;
            let newPopupContainer = tempElement.firstChild;
            parent.insertBefore(newPopupContainer, sibling);
            let firstName = event.target[0].value;
            let lastName = event.target[1].value;
            let uid = user.uid;
            localStorage.setItem('firstName', firstName);
            localStorage.setItem('lastName', lastName);

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            let errorMsg = document.querySelector(".errorMsg");
            errorMsg.style.display = 'block';
            errorMsg.innerHTML = errorMessage.slice(errorMessage.indexOf('/') + 1, errorMessage.indexOf(')'));


            // ..
        })



})


