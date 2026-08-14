Firebase Live Test V1

1) Firebase Authentication -> Sign-in method
   Enable Email/Password
   Enable Anonymous

2) Authentication -> Users
   Create your teacher email/password.

3) Firestore -> Rules
   Open firestore.rules
   Replace YOUR_TEACHER_EMAIL@gmail.com with the exact teacher email.
   Paste all rules and Publish.
   IMPORTANT: do not keep public Test Mode rules.

4) Hosting
   Upload all HTML files to an HTTPS static host such as Firebase Hosting, GitHub Pages, or Netlify.
   Then open index.html.

5) Authentication -> Settings -> Authorized domains
   Add your hosting domain if it is not already there.

What V1 does
- Student anonymous sign-in
- Name + roll
- Live autosave after each answer
- Live progress in teacher dashboard
- Final score only shown on teacher dashboard after submission
- Topic-wise analysis
- CSV export

Security note
This is appropriate for normal classroom/tuition tests, not a high-stakes proctored exam.
