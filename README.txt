STUDENT LEARNING HUB V3 (PREMIUM DESIGN + FULL FEATURE SET) — SETUP

V3.4 UPDATE
- Latest 3 Exam Leaderboards: separate top-10 ranking for each of the newest
  three published tests, including tie-aware ranks and the current student.
- Weak-topic ChatGPT Help: topics below 60% now generate and copy a personalized
  Bengali learning prompt, then open ChatGPT. No API key or paid API is used.
- Premium Motion: subtle page/card entrances, medal glow, loading skeletons and
  toast messages, with prefers-reduced-motion support.
- Privacy fix: students can no longer read classmates' complete attempts.
  Leaderboards use the sanitized leaderboardEntries collection instead.

IMPORTANT AFTER UPDATING
Publish the included firestore.rules again. Then open admin.html and log in once;
the admin dashboard will create sanitized leaderboard entries for existing
graded attempts as well as all newly graded attempts.

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

DATA MODEL ADDITIONS (for your reference, no action needed)
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
