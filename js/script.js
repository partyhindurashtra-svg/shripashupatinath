/* ===== Shri Pashupatinath Dham — scripts ===== */
(function () {
  "use strict";

  /* ---- Curated darshan gallery (main / completed dham) ---- */
  var darshan = [
    { src: "assets/gallery/temple-14.jpg", cap: "Shri Pashupatinath Dham amid the sacred grove" },
    { src: "assets/gallery/temple-05.jpg", cap: "The dham standing at Hassangarh" },
    { src: "assets/gallery/temple-19.jpg", cap: "The shikhara rising over the sanctum" },
    { src: "assets/gallery/temple-01.jpg", cap: "The sanctum (garbhagriha) of Mahadev" },
    { src: "assets/gallery/temple-24.jpg", cap: "Close view of the shikhara" },
    { src: "assets/gallery/temple-10.jpg", cap: "The dham in the golden light of dawn" },
    { src: "assets/gallery/temple-03.jpg", cap: "The sacred path to the temple" },
    { src: "assets/gallery/temple-08.jpg", cap: "The sacred sarovar beside the dham" },
    { src: "assets/gallery/temple-11.jpg", cap: "Holy waters near the dham" },
    { src: "assets/gallery/temple-23.jpg", cap: "Serene sarovar at Hassangarh" }
  ];

  /* ---- Construction gallery (during the making) ---- */
  var making = [
    { src: "assets/gallery/temple-02.jpg", cap: "The brick sanctum takes shape" },
    { src: "assets/gallery/temple-04.jpg", cap: "The shikhara being raised" },
    { src: "assets/gallery/temple-07.jpg", cap: "Devotees and workers at the site" },
    { src: "assets/gallery/temple-09.jpg", cap: "A senior sewak blesses the karya" },
    { src: "assets/gallery/temple-06.jpg", cap: "Timber scaffolding within the sanctum" },
    { src: "assets/gallery/temple-16.jpg", cap: "The wooden roof framework" },
    { src: "assets/gallery/temple-17.jpg", cap: "Inside the rising walls" },
    { src: "assets/gallery/temple-25.jpg", cap: "Support posts hold the structure" },
    { src: "assets/gallery/temple-26.jpg", cap: "The sanctum doorway under work" },
    { src: "assets/gallery/temple-29.jpg", cap: "Brickwork of the inner shrine" },
    { src: "assets/gallery/temple-30.jpg", cap: "The roof structure from within" },
    { src: "assets/gallery/temple-15.jpg", cap: "Hand-laid brick walls" },
    { src: "assets/gallery/temple-13.jpg", cap: "Material and shelter at the site" },
    { src: "assets/gallery/temple-18.jpg", cap: "Materials gathered for construction" },
    { src: "assets/gallery/temple-21.jpg", cap: "The team at the dham grounds" },
    { src: "assets/gallery/temple-20.jpg", cap: "The land being prepared" },
    { src: "assets/gallery/temple-12.jpg", cap: "Rising brick walls of the shrine" },
    { src: "assets/gallery/temple-22.jpg", cap: "The completed brick shikhara" },
    { src: "assets/gallery/temple-27.jpg", cap: "Interior of the shrine in progress" },
    { src: "assets/gallery/temple-28.jpg", cap: "Beams and brick of the sanctum" }
  ];

  function buildGallery(grid, list) {
    if (!grid) return;
    var frag = document.createDocumentFragment();
    list.forEach(function (it) {
      var fig = document.createElement("figure");
      var img = document.createElement("img");
      img.src = it.src;
      img.alt = it.cap;
      img.loading = "lazy";
      var cap = document.createElement("figcaption");
      cap.textContent = it.cap;
      fig.appendChild(img);
      fig.appendChild(cap);
      fig.addEventListener("click", function () { openLightbox(it.src, it.cap); });
      frag.appendChild(fig);
    });
    grid.appendChild(frag);
  }

  buildGallery(document.getElementById("galleryGrid"), darshan);
  buildGallery(document.getElementById("makingGrid"), making);

  /* ---- Lightbox ---- */
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var lbClose = document.getElementById("lbClose");
  function openLightbox(src, cap) {
    if (!lb) return;
    lbImg.src = src; lbImg.alt = cap || "Darshan";
    lb.classList.add("open");
  }
  function closeLightbox() { if (lb) lb.classList.remove("open"); }
  if (lb) {
    lbClose.addEventListener("click", closeLightbox);
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLightbox(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeLightbox(); });
  }

  /* ---- Mobile nav ---- */
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () { navLinks.classList.toggle("open"); });
    navLinks.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { navLinks.classList.remove("open"); });
    });
  }

  /* ---- Footer year ---- */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---- Looping mantra audio ---- */
  var audio = document.getElementById("mantraAudio");
  var toggle = document.getElementById("audioToggle");
  if (audio && toggle) {
    audio.volume = 0.55;
    var icon = toggle.querySelector(".a-icon");
    var wantOn = true; // play by default

    function setUI(on) {
      if (icon) icon.textContent = on ? "🔊" : "🔇";
      toggle.classList.toggle("playing", on);
      toggle.title = on ? "Mantra playing — tap to mute" : "Tap to play mantra";
    }

    function tryPlay() {
      if (!wantOn) return;
      var p = audio.play();
      if (p && p.catch) { p.then(function(){ setUI(true); }).catch(function () { /* blocked; wait for gesture */ }); }
    }

    // First user interaction unlocks autoplay in most browsers
    var unlock = function () {
      if (wantOn && audio.paused) tryPlay();
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("scroll", unlock);
    };
    window.addEventListener("pointerdown", unlock, { passive: true });
    window.addEventListener("keydown", unlock);
    window.addEventListener("scroll", unlock, { passive: true });

    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      if (audio.paused) { wantOn = true; audio.play(); setUI(true); }
      else { wantOn = false; audio.pause(); setUI(false); }
    });

    audio.addEventListener("play", function () { setUI(true); });
    audio.addEventListener("pause", function () { if (!wantOn) setUI(false); });

    setUI(true);
    // attempt immediate autoplay (may be blocked until first gesture)
    window.addEventListener("load", tryPlay);
    tryPlay();
  }
})();
