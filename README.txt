STUDENT LEARNING HUB V2.1 (PREMIUM DESIGN + PROFILE PICTURE) — SETUP

WHAT'S NEW IN THIS UPDATE
- Full visual redesign: richer violet/gold color theme, Poppins + Hind Siliguri
  fonts, glass-style nav, nicer cards, buttons and subject tiles.
- Students can now upload a small profile picture (under 150 KB) from the
  Home tab of student.html. It is stored directly on their user document.
- firestore.rules was updated so a signed-in student can ONLY update their
  own "avatarData" field on their own user doc — every other field is still
  teacher-only. YOU MUST RE-PUBLISH firestore.rules for this to work.


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
