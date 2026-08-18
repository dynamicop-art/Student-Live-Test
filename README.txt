EXAM SUITE — SETUP GUIDE
=========================

WHAT'S INCLUDED
---------------
- index.html    Login / Sign up (student or teacher)
- student.html  Take exams, view results, see correct/wrong answers, leaderboard, ChatGPT tutor prompts
- admin.html    Teacher dashboard: create/publish tests, auto-grading, leaderboard data
- style.css     All styling (crazy gradient effects, animations)
- effects.js    Confetti, sound chimes, toast notifications, background blobs
- config.js     ⚠️ YOU MUST EDIT THIS — put your own Firebase project config here
- firestore.rules   Security rules — deploy these to your Firebase project

STEP 1 — CREATE A FIREBASE PROJECT
-----------------------------------
1. Go to https://console.firebase.google.com → Create a project (free tier is fine).
2. In the project, go to Build → Authentication → Sign-in method → enable "Email/Password".
3. Go to Build → Firestore Database → Create database (start in production mode, pick any region).
4. Go to Project settings (gear icon) → General → scroll to "Your apps" → click the web icon (</>)
   → register an app → copy the firebaseConfig object it gives you.

STEP 2 — FILL IN config.js
----------------------------
Open config.js and paste your real values in place of the YOUR_... placeholders.

STEP 3 — DEPLOY FIRESTORE RULES
---------------------------------
Firebase Console → Firestore Database → Rules tab → paste the entire contents of
firestore.rules → Publish.
(Or via Firebase CLI: `firebase deploy --only firestore:rules`)

STEP 4 — HOST THE FILES
-------------------------
Easiest: Firebase Hosting.
  1. Install the CLI: npm install -g firebase-tools
  2. firebase login
  3. firebase init hosting   (point the public directory at the folder with these files)
  4. firebase deploy

Or upload all files (keeping them in the same folder together) to any static host
(Netlify, Vercel, GitHub Pages, etc.) — no build step needed, they're plain HTML/JS.

STEP 5 — CREATE ACCOUNTS
--------------------------
Open index.html (your hosted URL) → Sign Up tab.
- Create ONE teacher account (role = "আমি একজন Teacher") — use the SAME "Class" name
  you'll use for your students, e.g. "Class X".
- Have students sign up with role = "আমি একজন Student", same Class name.

STEP 6 — CREATE A TEST (as teacher)
--------------------------------------
Login as teacher → "➕ নতুন Test" tab → fill in title, Class ID (must exactly match
students' class), subject, duration → add questions (each needs 4 options + which one
is correct + an optional Topic label, used later in the review screen) → Publish.

STEP 7 — GRADING
------------------
Grading happens automatically in the BROWSER while admin.html is open — there's no
server/Cloud Function. Keep the teacher's "✅ Grading" tab open (in any browser tab)
around the time students are submitting, so their attempts get graded promptly. Once
graded, students see their score, and a green/red correct-vs-wrong review, instantly.

HOW STUDENTS USE IT
---------------------
1. Login → "📝 Tests" tab → Start Test → answer → Final Submit (in-app confirm popup,
   not a browser dialog — works reliably even inside wrapped/WebView apps).
2. The question screen disappears immediately after a successful submit — the exam is
   "finished" and only the result card remains.
3. Once graded: score, a mini leaderboard for that test, a full green/red
   "which answers were right/wrong" review, and a "🤖 ChatGPT দিয়ে দুর্বল topic শেখো"
   button that builds a ready-to-paste tutoring prompt (auto-copies + opens ChatGPT).
4. "🏆 Leaderboard" tab shows class-wide ranking by average score.

IMPORTANT LIMITATIONS (by design, since this is a pure static-hosting app with no
backend/Cloud Functions)
--------------------------------------------------------------------------------
- Grading requires a teacher's browser tab to be open (admin.html). For always-on
  automatic grading you'd need Cloud Functions, which is a paid-tier Firebase feature
  and beyond a client-only app.
- The class leaderboard reads other students' SUBMITTED attempt documents directly
  (see firestore.rules) so it can be computed without a server. In-progress attempts
  stay private to their owner, but once a student submits, classmates' code (not just
  the app UI) could technically read their raw answer choices for that test via
  browser dev tools. This is a normal tradeoff for backend-less class apps; if you
  need stricter privacy, that requires a server-side grading function.

TROUBLESHOOTING
-----------------
- If Final Submit or any button seems to do nothing: look for a red banner at the
  very top of the screen — this app shows a visible error banner instead of failing
  silently. Screenshot it; that message tells you exactly what broke.
- "Permission denied" errors almost always mean firestore.rules hasn't been deployed,
  or a student's Class ID doesn't exactly match the test's Class ID.
- After deploying updates, hard-refresh (clear cache) or add ?v=2 to the URL — hosted
  sites cache aggressively and a plain refresh can still show the old version.
