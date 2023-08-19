import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { collection, addDoc, query, onSnapshot, serverTimestamp, orderBy, deleteDoc, updateDoc, doc, setDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

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
const db = getFirestore(app);


let signup = document.querySelector("#signup");
let login = document.querySelector("#signin");

signup.addEventListener("click", () => {
    window.location.href = './signup.html'
})


login.addEventListener("click", () => {
    window.location.href = './login.html'
})

document.addEventListener("readystatechange", (event) => {
    console.log(`readystate: ${document.readyState}`)
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        if (querySnapshot.size === 0) {
            let allPosts = document.querySelector("#allPosts");
            allPosts.innerHTML = `<div>No Posts found</div>`
        }

        let allPosts = document.querySelector("#allPosts");
        allPosts.innerHTML += '';
        let firstName = localStorage.getItem("firstName");
        let lastName = localStorage.getItem("lastName");
        querySnapshot.forEach((doc) => {

            let allPosts = document.querySelector("#allPosts");

            let data = doc.data()
            console.log("doc.data(): ", doc.id);

            allPosts.innerHTML += `
                <div class="post" id="post${doc.id}">
                <h1 id="postTitle">${data.postTitle}</h1>
                <p id="postText">${data.postText}</p>
                <p>${firstName} ${lastName} </p>

                </div>
                `;
        });



    })
})