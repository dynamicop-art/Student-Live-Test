STUDENT LEARNING HUB — SETUP

⚠️ VISUAL REFRESH (this update): vibrant gradient theme, animated floating
background blobs, glowing hero, gradient buttons/headings, a new XP/Level
gamification card on the student Home tab (computed from existing streak +
test + bookmark data — nothing new saved to Firebase, no rules change), and
a confetti celebration when a test result lands with 40%+. A landing-page
feature showcase and stats strip were also added to index.html.
NO firestore.rules change is needed for this update.
ONE EXTRA FILE TO UPLOAD: effects.js (alongside index.html/admin.html/
student.html/style.css/config.js) — index.html, student.html and admin.html
all import it for the background blobs / confetti. If you skip uploading
it, those pages will fail to load (a missing-module error) until it's added.

STUDENT LEARNING HUB V3 (PREMIUM DESIGN + FULL FEATURE SET) — SETUP

⚠️ IMPORTANT: RE-PUBLISH firestore.rules AGAIN
This update adds new collections (announcements, assignments, assignmentStatus,
doubts) and changes attempt/user permissions. Go to
Firebase Console -> Firestore Database -> Rules -> paste the new firestore.rules
-> Publish, or NONE of the new features below will work.

WHAT'S NEW IN V2.1
- Full visual redesign: richer violet/gold theme, Poppins + Hind Siliguri fonts,
  glass-style nav, nicer cards, buttons and subject tiles.
- Student profile picture (under 150 KB), stored on the user doc.

WHAT'S NEW IN V3.3
- Fixed: a student who was already logged in did NOT see a test/note/notice/
  assignment the teacher published afterward, until they logged out and back
  in. Notes, Tests, Notices and Assignments now update LIVE on the student's
  screen the moment the teacher publishes — no reload or re-login needed.

WHAT'S NEW IN V3
Student side (student.html):
- 🏠 Home: Notice board, study streak with badges (3/7/14/30-day), a Pomodoro
  study timer (25/5/15 min presets).
- 📝 Notes: search box, chapter filter dropdown, bookmark (star) any note,
  "Bookmarked only" filter, and a Flashcard revision mode (front = title,
  tap to flip to the note content, shuffle/prev/next).
- 🧪 Tests: search box added on top of the existing live-test flow.
- 📌 Assignments (new tab): homework list with due-date tags (Due soon /
  Overdue), tick-box to mark done — saved per student.
- 📊 Progress (new tab): subject-wise accuracy bars, topic-wise weak-area
  bars (built from each test's per-question "TOPIC"), a class leaderboard
  (average % per student, own row highlighted), and a Test History list
  with a "Print / Save as PDF" button per result (uses the browser's print
  dialog — choose "Save as PDF" there, no extra library needed).
- 💬 Doubts (new tab): ask the teacher a subject-tagged question, see your
  own question list with "Waiting" / "Answered" status and the reply.
- 🌙 Dark mode toggle (top-right on every page), remembered per device.

Teacher side (admin.html):
- 📣 Notices tab: publish a notice to a class; shows on students' Home tab.
- 📌 Assignments tab: publish homework with title/description/due date;
  Dashboard shows an assignment count.
- 💬 Doubts tab: see every student's question live, type a reply once —
  it's saved and marked "answered" automatically. Dashboard shows an open-
  doubts count.
- Notes now have an optional Chapter field (used for the student chapter
  filter above).
- Grading now also computes per-topic correctness (topicStats) on each
  attempt, which powers the student's "weak areas" chart — this happens
  automatically, no extra step needed.

WHAT'S NEW IN V4 (no firestore.rules change needed — same as before)
Teacher side (admin.html):
- 📈 Student Progress tab: pick any one student from a dropdown and see THEIR
  subject-wise accuracy, topic-wise weak areas, and full test history —
  exactly like the student sees it themselves, but for whichever student
  you choose.
- 🤖 Free AI Prompt Helper (Import Test tab): fill in Class/Subject/Chapter/
  Topic/question count, click the button — a ready-to-use ChatGPT prompt is
  copied and ChatGPT opens in a new tab. Paste ChatGPT's answer back into the
  import box.
- Multi-test batch import: you can now paste SEVERAL "TEST: ..." blocks in
  one go (just start each new one with a line beginning "TEST:") and hit
  Preview — all valid ones publish together with one click. Ask the AI
  prompt helper for "How many tests" > 1 and it'll ask ChatGPT to generate
  several at once.

Student side (student.html):
- 🏆 Recent Test Leaderboards, now on the Home tab: shows the last 3
  published tests, each with a mini top-5 leaderboard (updates as
  classmates submit).
- 🎯 My Practice Test (Tests tab): a free, ChatGPT-prompt-assisted personal
  quiz. Nothing is saved to Firebase — it runs and grades entirely in the
  browser, so it costs nothing and needs no extra setup.

ABOUT "AUTOMATIC" AI TEST GENERATION (you asked, here's the honest answer)
- Fully automatic (you type one instruction and a real test appears with NO
  copy-pasting) needs a paid AI API key wired into the website — Firebase's
  free "Spark" plan cannot call OpenAI/Anthropic for free at any real volume,
  and scheduled/recurring auto-generation additionally needs Cloud Functions,
  which requires the paid "Blaze" plan (still has a generous free quota, but
  needs a billing card on file).
- What IS free and now built in: the "Copy AI Prompt" buttons above. You (or
  a student, for their own practice) click once, ChatGPT opens with the
  right prompt already copied, you paste the answer back — 30 seconds, zero
  cost. Multi-test batch import makes this fast even for a whole month of
  tests at once.
- If later you're fine paying a few cents per generated test, real one-click
  automatic generation (no copy-paste at all) becomes possible — just say so
  and I'll wire it up.

IDEAS YOU HAVEN'T ADDED YET (free, easy to build when you want them)
- Attendance/login log for parents to see engagement.
- Weekly auto-summary notice ("this week: 3 tests, avg 72%") posted to Home.
- Export a student's full report as a Word/PDF file to send to parents.
- Simple parent view-only login (read-only version of student portal).
- announcements/{id}: title, content, classId
- assignments/{id}: title, description, classId, subjectId, dueDate
- assignmentStatus/{assignmentId_uid}: uid, assignmentId, classId, done
- doubts/{id}: uid, studentName, classId, subjectId, question, status,
  answer, answeredAt
- users/{uid} gained: avatarData, bookmarks (array of note IDs),
  streak {count, lastDate} — students may ONLY self-update these 3 fields,
  enforced by firestore.rules.
- attempts/{id} gained: topicStats — and classmates can now read each
  other's SUBMITTED attempts (name + score only) so the leaderboard works.
  If you'd rather NOT expose scores to classmates, tell me and I'll remove
  the leaderboard + restrict that read rule back to owner-only.


FILES TO UPLOAD TO YOUR GITHUB PAGES REPOSITORY ROOT
- index.html
- admin.html
- student.html
- style.css
- config.js
- effects.js

OTHER FILES (do NOT need to be public for website operation)
- firestore.rules
- TEST_IMPORT_TEMPLATE.txt
- README.txt

FIRST, KEEP A BACKUP OF YOUR WORKING V1.

ONE-TIME SETUP
1) Teacher email is already configured as:
   arpanalaps64@gmail.com

2) Firestore Rules:
   Firebase Console -> Firestore Database -> Rules -> replace all with firestore.rules -> Publish.

3) Firebase Authentication:
   Email/Password must be enabled.
   (Anonymous is no longer needed for this V2, but it can remain enabled.)

4) Upload index.html, admin.html, student.html, style.css and config.js to the ROOT of the same GitHub repository.
   Commit changes.
   GitHub Pages updates automatically.

HOW TO START
Teacher:
- Open /admin.html
- Login
- Students tab: add student name, email, Class ID and display class
  Recommended IDs:
    class5 / Class V
    class12 / Class XII
- Student uses that exact email on the home page -> First-time Student Setup -> creates password.

Subjects:
- Add subject + Class ID.
- After adding, copy the SUBJECT ID shown in the Subjects list.
- Use that ID when publishing notes/tests.

FAST TEST CREATION (RECOMMENDED)
- Ask ChatGPT for a test in your website import format.
- Admin -> Import Test
- Paste the whole block
- Preview Import
- Publish Imported Test

Required format:
TEST: ...
CLASS: class12
SUBJECT_ID: ...
CHAPTER: ...
DURATION: 30

---
Q: ...
A: ...
B: ...
C: ...
D: ...
ANSWER: B
TOPIC: ...

NOTES
- Text notes are easiest and safest.
- Optional PDF/image attachment is limited in this app to 80 KB because it is stored inside a Firestore document.
- For larger files, do not use this method.

DATA MINIMIZATION
- Student profile, subjects, notes and tests remain because the site needs them.
- Submitted test attempts/results can be removed from Admin -> Live Results -> Delete all submitted attempt data.

AI HELP
- No OpenAI API key is stored in the website.
- Student notes have “Explain with ChatGPT”.
- It creates and copies a Bengali learning prompt and opens ChatGPT.
- AI Help is not placed inside the active test screen.

IMPORTANT V2 FREE-TIER DESIGN
- GitHub Pages for hosting
- Firebase Authentication
- Cloud Firestore
- No custom backend
- No Firebase Storage
- No paid OpenAI API integration

LIMITATION
Grading happens when the teacher Admin dashboard is open, because answer keys are teacher-only and this free static architecture has no server-side grading function.

ABOUT MORE FREE STORAGE (Google Drive etc.)
Linking Google Drive for bigger note attachments is possible, but it needs
Google Cloud OAuth setup (Drive API, consent screen, picker) which is a
separate, more involved integration than a simple file swap — happy to build
it as a next step if you want it. For now, small text notes plus attachments
under 80 KB keep everything on Firebase's free tier with zero extra setup.
