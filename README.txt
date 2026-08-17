⚠️ SECURITY & BUG FIX UPDATE (this update):
- 🔒 FIXED: stored XSS via student "Doubts". Doubt questions (and other
  Firestore-sourced text) are now HTML-escaped everywhere they're rendered,
  in both admin.html and student.html. Previously, a student's raw doubt
  text was inserted directly into the page — a malicious `<script>`/`onerror`
  payload typed into "Ask a Doubt" could have run inside the TEACHER's
  authenticated admin session the moment they opened the Doubt Box. This is
  the most important fix in this update.
  ⚠️ ACTION NEEDED: no rules change for this one, but re-upload admin.html,
  student.html and effects.js.
- 🔒 FIXED: firestore.rules now validates the three fields students can
  self-update on their own profile (avatarData/bookmarks/streak) server-side
  — size limits and basic type/format checks. Previously these were only
  checked in the browser UI (e.g. "avatar must be under 150KB"), so a student
  could bypass them entirely via devtools/direct Firestore calls. Doubt
  question length is now also capped server-side.
  ⚠️ ACTION NEEDED: RE-PUBLISH firestore.rules (Firebase Console -> Firestore
  Database -> Rules -> paste the new firestore.rules -> Publish), or this
  protection won't be active.
- 🐛 FIXED: a student whose account signup failed cleanup (e.g. network drop
  right after an invalid/uninvited signup attempt) could get permanently
  locked out with "email already in use," even though no real account was
  ever finished. Signup now retries cleanup and, on a later attempt, safely
  recovers from this orphaned-account state instead of blocking the student
  forever.
- 🐛 FIXED: admin's bulk test importer required the `ANSWER:` line to be an
  exact single letter ("A"), while the student practice-quiz parser already
  accepted "A)" / "A." etc. Both now use the same lenient first-letter match,
  so AI-generated import blocks are less likely to be silently rejected.
- 🧹 CLEANUP: removed a leftover duplicate click-handler for the practice
  test's "Copy AI Prompt" button in student.html (two handlers were bound to
  the same button; only the second ever ran, so the first was dead code).
FILES CHANGED: admin.html, student.html, index.html, effects.js,
firestore.rules (re-upload all of these — and re-publish firestore.rules).


- 🐛 ROOT CAUSE FOUND: student.html was missing one closing `</div>` tag for
  the page's outer `.wrap` container (an HTML mistake, not something you
  did). Browsers silently "fix" this by auto-closing it at the very end of
  the page, which can shift/break spacing and alignment across the whole
  page in some browsers. Fixed — the tag is now properly closed.
- 🐛 REAL FIX for "Start Practice / Final Submit / Logout not responding":
  all three pages load an optional decorative file, effects.js (confetti,
  sound, sparkle). It was wired as a hard dependency — if that ONE file
  ever failed to load (not uploaded, blocked, slow network, etc.), the
  ENTIRE script on the page stopped running, which silently killed EVERY
  button on the page, including totally unrelated ones like Logout and
  Final Submit. This is why it looked random. Now that import is wrapped
  in a try/catch with safe fallbacks: if effects.js loads, you keep all
  the sound/confetti/sparkle polish; if it doesn't load for any reason, the
  page still works 100% normally, just without the decorative extras.
  This makes the whole site far more robust against this entire class of
  bug in the future.
- Also double-checked every page for other missing tags / mismatched IDs —
  everything else was already correct.
FILES CHANGED: index.html, admin.html, student.html (effects.js and
style.css unchanged — no need to re-touch them, but re-upload everything
together as one batch is always the safest habit). No firestore.rules
change needed.
- ⚠️ IMPORTANT DEPLOY CHECK: make sure effects.js is actually sitting in
  your GitHub repo root next to index.html/admin.html/student.html. If it's
  missing there, that alone can explain widespread "nothing happens when I
  click" symptoms — with this fix the site will still work without it, but
  you'll lose the confetti/sound/sparkle effects until it's uploaded.

⚠️ V7 UPDATE (this update):
- Colour theme changed from Emerald & Gold to a "Study Blue" theme (royal
  blue/indigo + academic gold accents), across every page — same layout,
  cards, hero, pills etc., just re-coloured. No firestore.rules change.
- 🖨️ NEW: "Download Question Paper" — after a student submits a test, a
  button appears to download/print the FULL set of questions + options for
  that test as one clean, print-ready sheet (2-column compact layout, fits
  on a single A4 page for a typical test). Also added next to every entry
  in Test History (Progress tab), so a question paper can be reprinted for
  any past test at any time. The answer key is intentionally NOT included
  on this sheet (correct answers are teacher-only data, kept out of the
  student app for exam integrity) — it's the question paper only, meant
  for offline revision/print.
FILES CHANGED: style.css, effects.js, index.html, admin.html, student.html
(re-upload all six files together so nothing gets out of sync).

⚠️ V8 UPDATE (this update, bug fixes + new features):
- 🐛 FIXED: "Copy AI Prompt & Open ChatGPT" was unreliable (practice test,
  note "Explain with ChatGPT", and admin's Import Test AI helper) — on many
  mobile browsers the ChatGPT tab was getting silently popup-blocked because
  it was opened AFTER an `await` on the clipboard copy, which breaks the
  browser's "this was a direct click" permission. Now the tab opens FIRST,
  synchronously, inside the click — then the prompt is copied. Much more
  reliable, and if a pop-up still gets blocked you now get a clear on-screen
  warning instead of nothing happening.
- 🤖 NEW: every "weak area" row in the student Progress tab now has an
  "Ask ChatGPT" button. It opens ChatGPT with a ready-made prompt asking it
  to teach exactly that topic (using the student's live accuracy % on it) —
  and the prompt is auto-written in Bengali or English depending on the
  language the topic/class name is in, so it matches how the student
  actually studies.
- 🎨 Colour refresh: background is now a warm "cream" tone instead of cool
  white (cards, inputs, nav etc. all warmed to match), while the hero /
  pop-up gradient got MUCH more vivid — a multi-colour indigo → electric
  blue → violet → gold "aurora" gradient instead of the flatter blue/gold
  one, plus a soft shimmer sweep and a few twinkling sparkle stars drifting
  across every hero card, a livelier bouncy glow animation on toast pop-ups,
  and an extra floating background blob for more colour variety. Same
  layout everywhere — just noticeably more colourful, energetic and
  "premium-magical" looking.
FILES CHANGED: style.css, effects.js, index.html, admin.html, student.html
(re-upload all six files together so nothing gets out of sync). No
firestore.rules change needed.

STUDENT LEARNING HUB — SETUP

⚠️ V6 UPDATE (this update): brand-new premium "Emerald & Gold" colour theme
(previous version was violet/pink/amber) across every page, plus new
features — none of this needs a firestore.rules change, same as the last
update.
NEW FEATURES IN V6:
- 🔊 Sound toggle (top-right, next to the theme switch on student.html) —
  short synth chimes on test results, doubt replies and Pomodoro timers.
  No audio files, pure Web Audio, and fully mutable/remembered per device.
- 🏆 Perfect Score trophy badge + a bigger confetti/chime celebration when a
  student scores 100% on a test.
- 💎👑 Two new streak badge tiers: 60-day and a gold "100-day Legend" badge.
- 🎮 Three more XP levels (Scholar Elite, Master Mind, Hub Champion) so
  long-term students keep levelling up.
- 💬 "Quote of the Day" card on the student Home tab — a rotating daily
  motivational quote, purely client-side, nothing saved to Firebase.
- 🖨️ "Print Full Report" button on the student Progress tab — one click
  builds a clean printable page combining subject accuracy, weak topics and
  full test history (use the browser's Save-as-PDF in the print dialog).
- 🔔 Toast pop-up confirmations across the Teacher Admin panel (note
  published, test published, notice/assignment published, reply sent, etc.)
  instead of only small text messages.
- ⬇️ "Export CSV" button in Admin -> Live Results — downloads every
  student's test attempts (name, test, score, %, status) as a spreadsheet
  file, entirely client-side from data already loaded, no extra reads.
- 📊 Two new Teacher Dashboard stats: Class Average % and Top Performer,
  computed live from submitted/graded attempts.
- 🔍 Search boxes added to Admin -> Students, Notes, Tests and Live Results
  lists, to quickly filter long lists by name/title.
FILES CHANGED: style.css, effects.js, index.html, student.html, admin.html
(all six files should be re-uploaded together so nothing gets out of sync).

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
FINAL SUBMIT FIX — REVISION 2
=============================
This package is intentionally different from the earlier fixed package.

Final Submit now:
1. uses a direct click event listener;
2. immediately displays that the click was detected;
3. cannot be blocked by a failed background autosave;
4. sends the complete current answers again in the final Firestore update;
5. reports permission, offline, or other errors under the button;
6. stays above decorative layers and remains touch/click enabled.

Replace every hosted file with the files from this folder. Deploy the included
firestore.rules as well. Do not mix this package with older files.
