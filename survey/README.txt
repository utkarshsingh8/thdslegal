THDSLEGAL SURVEY — GitHub Pages setup
=====================================

WHAT TO REPLACE (placeholder files are inside)
----------------------------------------------
1. assets/song.mp3  <- YOUR SONG.
      MP3 -> name it song.mp3, replace the file.
      M4A -> name it song.m4a, ADD it, and DELETE assets/song.mp3
             (page checks song.mp3 first, then song.m4a).

2. assets/photos/   <- EXACTLY SIX PHOTOS, named 1.jpg .. 6.jpg
      (JPG or PNG). Delete the dummy 1/2/3.jpg first.
      THE PAGE HAS 6 FIXED SLOTS — photo N always appears here:

        1.jpg -> SLOT 1  top-left      (tilted left)   caption "us 🤍"
        2.jpg -> SLOT 2  top-right     (tilted right)  caption "my favourite ✨"
        3.jpg -> SLOT 3  middle-right  (tilted left)   caption "always this 🎀"
        4.jpg -> SLOT 4  bottom-left   (tilted right)  caption "you 🥺"
        5.jpg -> SLOT 5  bottom-centre (tilted right)  caption "💚"
        6.jpg -> SLOT 6  middle-left   (tilted left)   caption "✨"

      Pick in this order: slot 1-2 = your best two as a couple,
      slot 3-4 = her solo / candid, slot 5-6 = fun ones.
      Fewer than 6 -> unused slots stay hidden. More than 6 -> ignored.
      Photos auto-crop to fit; portrait shots look best.

DO NOT RENAME index.html. Do not move the assets folder.

GITHUB PAGES (free)
-------------------
1. Create a new repo (suggested name: thdslegal-survey).
   NOTE: on free GitHub the repo must be PUBLIC for Pages.
2. Upload index.html + the assets folder, keeping this exact structure:
     index.html
     assets/song.mp3
     assets/photos/1.jpg ... 6.jpg
3. Repo Settings -> Pages -> Source: Deploy from a branch ->
   Branch: main, Folder: / (root) -> Save.
4. Your link (appears in ~1 min):
     https://<your-username>.github.io/thdslegal-survey/
5. Test once with the LINK, not the local file.
   Re-test shortcut: add ?s=5 to the URL to jump to the surprise
   screen. NEVER send her the ?s=5 link.

WHAT SHE SEES
-------------
Boring law survey -> "Welcome, Nayshha" -> 2 questions ->
audio/preload gate -> glitch -> surprise -> WhatsApp buttons.
