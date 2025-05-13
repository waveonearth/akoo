import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-storage.js";

// 🔐 Firebase 설정
const firebaseConfig = {
    apiKey: "AIzaSyBhwO39QcKN_aiQSNZH8Q6CwbY_PWOA6kE",
    authDomain: "khunternews-552f4.firebaseapp.com",
    projectId: "khunternews-552f4",
    storageBucket: "khunternews-552f4.appspot.com",
    messagingSenderId: "387777217028",
    appId: "1:387777217028:web:413e36ecdb8483b95e6b51",
    measurementId: "G-K5B13765FC"
    };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// URL에서 category 파라미터 읽기
const params = new URLSearchParams(window.location.search);
const category = params.get("category") || "미지정";
document.getElementById("category-label").textContent += category;

// CKEditor 초기화
let editorInstance;

ClassicEditor
    .create(document.querySelector('#editor'), {
        ckfinder: {
        uploadUrl: '' // 커스터마이징 시 서버 연동 가능
        }
    })
    .then(editor => {
        editorInstance = editor;
    })
    .catch(error => {
        console.error("CKEditor 초기화 실패:", error);
    });

// 등록 버튼 클릭
window.submitPost = async function () {
    const title = document.getElementById("title").value.trim();
    const content = editorInstance.getData();
    const subhead = document.querySelector('input[name="subhead"]:checked').value;
    const tags = document.getElementById("tags").value.split(',').map(tag => tag.trim()).filter(Boolean);
    const schedule = document.getElementById("scheduleTime").value;
    const scheduledDate = schedule ? new Date(schedule) : null;

    if (!title || !content) {
        alert("제목과 내용을 입력해주세요.");
        return;
    }

    try {
        await addDoc(collection(db, "posts"), {
        title,
        content,
        category,
        subhead,
        tags,
        scheduledAt: scheduledDate,
        createdAt: serverTimestamp(),
        views: 0
        });

        alert("게시글이 등록되었습니다.");
        window.location.href = "index.html";
    } catch (err) {
        console.error("업로드 실패:", err);
        alert("업로드 중 오류가 발생했습니다.");
    }
};