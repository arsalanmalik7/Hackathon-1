import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
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




const createPost = document.querySelector("#createPost");
createPost.addEventListener("submit", async (event) => {
    event.preventDefault();

    let postTitle = event.target[0].value;
    let postText = event.target[1].value;

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date().toLocaleString('en-US', options);

    try {
        const docRef = await addDoc(
            collection(db, "posts"),
            {
                postTitle: postTitle,
                postText: postText,
                createdAt: formattedDate
            });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }

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
        const reversedSnapshot = querySnapshot.docs.reverse(); // Reverse the order of documents

        querySnapshot.forEach((doc) => {


            let data = doc.data()
            console.log("doc.data(): ", doc.id);

            allPosts.innerHTML += `
                <div class="post" id="post${doc.id}">
                    <h1 id="postTitle">${data.postTitle}</h1>
                    <p id="postText">${data.postText}</p>
                    <p>${firstName} ${lastName} </p>

                    <button onclick="deletePost('${doc.id}')" class="btn btn-danger">Delete</button>
                    <button class="btn btn-primary" onclick="editPost('${doc.id}', '${data.postTitle}', '${data.postText}')">Edit</button>

                </div>
                `;
        });



    })

    window.editPost = async (docId, postTitle, postText) => {
        console.log("editBook function called: ", docId, postTitle, postText);



        let popup = document.createElement('div');
        popup.innerHTML +=
            `<form class="form_main"  onsubmit="submitBook(event, '${docId}')">
        <span id="corss" onclick="hide()">&#10006;</span>
        <p class="heading">Edit Book</p>
        <div class="inputContainer">
            <input
                placeholder="Book name"
                id="book-name"
                class="inputField"
                type="text"
                value="${postTitle}"
            >
        </div>
        <div class="inputContainer">
            <input
                placeholder="Author name"
                id="author-name"
                class="inputField"
                type="text"
                value="${postText}"
            >
        </div>
       
        <button id="button" >Update Post</button>
    </form>`
        popup.setAttribute('id', 'popupOverlay');
        popup.style.display = 'flex';
        let parent = createPost.parentNode.parentNode;
        parent.appendChild(popup);
        parent.style.overflow = 'hidden';

        window.hide = () => {
            parent.style.overflow = 'auto';
            popup.remove();
        }
    }
    window.submitBook = async (e, docId) => {
        e.preventDefault();
        let parent = createPost.parentNode.parentNode;
        let last = parent.lastChild

        last.remove();
        parent.style.overflow = 'auto';
        
        await updateDoc(doc(db, 'books', docId), {
            bookName: e.target[0].value,
            authorName: e.target[1].value,
            genre: e.target[2].value,
        });

    }
    window.deletePost = async (docId) => {
        console.log("deletePost function called: ", docId);

        await deleteDoc(doc(db, "posts", docId));
    }
})

let signout = document.querySelector(".signout");
signout.addEventListener('click', () => {


    signOut(auth).then(() => {
        console.log('signout successfully');
        window.location.href = './login.html';
    }).catch((error) => {
        console.log(error);
    });
})