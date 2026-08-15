STUDENT LEARNING HUB V2.2 (BUGFIX UPDATE) — SETUP

WHAT'S FIXED IN THIS UPDATE
1) Tests weren't showing up for students ("Available Tests" was empty).
   Cause: the student page asked Firestore for tests by class only, but
   the security rule also requires published==true — Firestore rejects
   a whole list query if it isn't explicitly filtered to match every
   condition the rule checks, not just the ones that happen to be true.
   Fix: the student query now also filters by published==true, exactly
   matching the rule. Notes worked before because that query already
   matched its rule; tests didn't, because it didn't.

2) Logout wasn't working (both for students and for you as admin).
   Fix: the Logout button now stops any live listeners first, signs out,
   and ALWAYS sends the browser back to the login page even if something
   goes wrong — so it can no longer look like it "did nothing." This
   should also fix the "other students can't log in" reports if those
   happened on a shared computer: if the previous student's session
   couldn't be signed out, the next student would still see the first
   student's account instead of a fresh login screen.

3) Create Account / Login error messages were raw Firebase text.
   Fix: they now show plain Bengali explanations (wrong password, email
   already registered, no account yet, etc.), and if an account was
   half-created by an earlier attempt (Auth account exists but the
   profile document doesn't), signing up again now repairs it instead
   of getting stuck on "email already in use."

4) Admin actions (Add Student, Add Subject) gave no feedback and had no
   error handling, so a failed save looked identical to a successful one.
   Fix: both now show a clear ✅ success or ❌ error message, and the
   input fields clear themselves after a successful add.

5) Test Import (Copy-Paste) was fragile: ChatGPT output with slightly
   different dashes, blank lines, or field wording (e.g. "Ans:" instead
   of "ANSWER:") would fail the whole preview with no useful detail, and
   the pasted text was never cleared after publishing.
   Fix: the parser now accepts any 3+ dash separator line with blank
   lines around it, accepts a few common field-name variants, reports
   exactly which field is missing per question instead of a generic
   error, shows a live "N questions detected" counter as you paste, and
   clears the box automatically after a successful publish.

6) AI Help ("Explain with ChatGPT") now generates a different tutoring
   prompt depending on the student's class: a simple plain-English
   style for Class 7 and below, and the detailed Bengali-medium style
   (with English technical terms kept) for Class 8 and above.

NO FIRESTORE RULES CHANGE THIS TIME
firestore.rules is unchanged from your working V2.1 setup — you do NOT
need to republish it. Only the HTML/JS files changed.


FILES TO UPLOAD TO YOUR GITHUB PAGES REPOSITORY ROOT
- index.html
- admin.html
- student.html
- style.css
- config.js

OTHER FILES (do NOT need to be public for website operation)
- firestore.rules   (unchanged — already published, no action needed)
- TEST_IMPORT_TEMPLATE.txt
- README.txt

FIRST, KEEP A BACKUP OF YOUR WORKING V2.1.

DEPLOY STEPS
1) Upload index.html, admin.html, student.html, style.css and config.js
   to the ROOT of your GitHub Pages repository (overwrite the existing
   files with the same names).
2) Commit changes. GitHub Pages updates automatically within a minute
   or two.
3) That's it — Firestore rules and your Teacher email are unchanged.

HOW TO START
Teacher:
- Open /admin.html, log in.
- Students tab: add student name, email, Class ID and display class.
  Recommended IDs:
    class5 / Class V
    class12 / Class XII
- Student uses that exact email on the home page -> First-time Student
  Setup -> creates password.

Subjects:
- Add subject + Class ID.
- After adding, copy the SUBJECT ID shown in the Subjects list.
- Use that ID when publishing notes/tests.

FAST TEST CREATION (RECOMMENDED)
- Ask ChatGPT for a test in your website import format (see
  TEST_IMPORT_TEMPLATE.txt for the exact fields — Bengali or English
  content both work).
- Admin -> Import Test
- Paste the whole block
- Preview Import (now tells you exactly which question/field is wrong,
  if anything)
- Publish Imported Test (the box clears itself when done)

NOTES
- Text notes are easiest and safest.
- Optional PDF/image attachment is limited in this app to 80 KB because
  it is stored inside a Firestore document.
- For larger files, do not use this method.

DATA MINIMIZATION
- Student profile, subjects, notes and tests remain because the site
  needs them.
- Submitted test attempts/results can be removed from Admin -> Live
  Results -> Delete all submitted attempt data.

AI HELP
- No OpenAI API key is stored in the website.
- Student notes have "Explain with ChatGPT" — the prompt style adapts
  automatically to the student's class (simple English for Class 7 and
  below, detailed Bengali-medium for Class 8 and above).
- It creates and copies a learning prompt and opens ChatGPT.
- AI Help is not placed inside the active test screen.

IMPORTANT FREE-TIER DESIGN
- GitHub Pages for hosting
- Firebase Authentication
- Cloud Firestore
- No custom backend
- No Firebase Storage
- No paid OpenAI API integration

LIMITATION
Grading happens when the teacher Admin dashboard is open, because
answer keys are teacher-only and this free static architecture has no
server-side grading function.

ABOUT MORE FREE STORAGE (Google Drive etc.)
Linking Google Drive for bigger note attachments is possible, but it
needs Google Cloud OAuth setup (Drive API, consent screen, picker)
which is a separate, more involved integration than a simple file swap
— happy to build it as a next step if you want it. For now, small text
notes plus attachments under 80 KB keep everything on Firebase's free
tier with zero extra setup.
