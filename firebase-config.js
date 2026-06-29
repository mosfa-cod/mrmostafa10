 // إعدادات الفايربيس الكلاسيكية المتوافقة مع الموقع ولوحة التحكم
const firebaseConfig = {
    apiKey: "AIzaSyBMvIZv131KdAjuH58B6tCUBSmaGgLoLUY",
    authDomain: "://firebaseapp.com",
    databaseURL: "https://firebaseio.com",
    projectId: "mostafa-academy-2645a",
    storageBucket: "://appspot.com",
    messagingSenderId: "371101699494",
    appId: "1:371101699494:web:3e79c870941afef5179367"
};

// تهيئة الفايربيس
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// تعريف المتغيرات للاستخدام في ملف main.js
const db = firebase.database();
const auth = firebase.auth();
