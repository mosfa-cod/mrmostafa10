 // main.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, getDoc, query, orderBy } 
  from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBMvIzV131KdAjuHS8B6tCUBsmaGgloLUY",
  authDomain: "mostafa-acdemy-2645a.firebaseapp.com",
  projectId: "mostafa-acdemy-2645a",
  storageBucket: "mostafa-acdemy-2645a.firebasestorage.app",
  messagingSenderId: "371101699494",
  appId: "1:371101699494:web:3e79c870941afef5179367"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function renderStars(rating) {
  let stars = "";
  for (let i = 1; i <= 5; i++) stars += i <= rating ? "★" : "☆";
  return stars;
}

// 1) جلب المواد التعليمية
async function loadSubjects() {
  const grid = document.getElementById("subjects-grid");
  if (!grid) return;
  try {
    const q = query(collection(db, "subjects"), orderBy("order", "asc"));
    const snap = await getDocs(q);
    grid.innerHTML = "";
    snap.forEach((docSnap) => {
      const s = docSnap.data();
      grid.innerHTML += `
        <div class="subject-card">
          <div class="subject-icon">${s.icon || "📚"}</div>
          <h3 class="subject-title">${s.title}</h3>
          <p>${s.description || ""}</p>
          <div class="subject-stats">
            <span>📖 ${s.lessonsCount ?? 0} درس</span>
            <span>📕 ${s.storiesCount ?? 0} قصة</span>
          </div>
        </div>`;
    });
  } catch (e) { console.error("خطأ في جلب المواد:", e); }
}

// 2) جلب تحدي اليوم
async function loadChallenge() {
  const card = document.getElementById("challenge-card");
  if (!card) return;
  try {
    const snap = await getDoc(doc(db, "challenges", "today"));
    if (snap.exists()) {
      const c = snap.data();
      if (c.active === false) { card.style.display = "none"; return; }
      card.innerHTML = `
        <h3>${c.title || "تحدي اليوم"}</h3>
        <p>${c.description || ""}</p>
        <div class="challenge-points">+${c.points ?? 0} نقطة</div>`;
    }
  } catch (e) { console.error("خطأ في جلب التحدي:", e); }
}

// 3) جلب الآراء
async function loadTestimonials() {
  const grid = document.getElementById("testimonials-grid");
  if (!grid) return;
  try {
    const q = query(collection(db, "testimonials"), orderBy("order", "asc"));
    const snap = await getDocs(q);
    grid.innerHTML = "";
    snap.forEach((docSnap) => {
      const t = docSnap.data();
      const initial = (t.name || "؟").trim().charAt(0);
      grid.innerHTML += `
        <div class="testimonial-card">
          <div class="testimonial-stars">${renderStars(t.rating || 5)}</div>
          <p>${t.text || ""}</p>
          <div class="testimonial-author">
            <div class="author-avatar" style="background:${t.avatarColor || '#7c3aed'}">${initial}</div>
            <div class="author-info">
              <span class="author-name">${t.name || ""}</span>
              <span class="author-role">${t.role || ""}</span>
            </div>
          </div>
        </div>`;
    });
  } catch (e) { console.error("خطأ في جلب الآراء:", e); }
}

// ===== الوضع الداكن + ثيمات الألوان =====
const root = document.documentElement;
const savedMode = localStorage.getItem("siteMode") || "light";
const savedTheme = localStorage.getItem("siteTheme") || "purple";
root.setAttribute("data-mode", savedMode);
root.setAttribute("data-theme", savedTheme);

// تشغيل كل شيء عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
  loadSubjects();
  loadChallenge();
  loadTestimonials();

  const toggle = document.getElementById("modeToggle");
  if (toggle) {
    toggle.textContent = savedMode === "dark" ? "☀️" : "🌙";
    toggle.addEventListener("click", () => {
      const newMode = root.getAttribute("data-mode") === "dark" ? "light" : "dark";
      root.setAttribute("data-mode", newMode);
      localStorage.setItem("siteMode", newMode);
      toggle.textContent = newMode === "dark" ? "☀️" : "🌙";
    });
  }

  document.querySelectorAll(".color-dot").forEach(dot => {
    dot.addEventListener("click", () => {
      const theme = dot.getAttribute("data-theme");
      root.setAttribute("data-theme", theme);
      localStorage.setItem("siteTheme", theme);
    });
  });
});
