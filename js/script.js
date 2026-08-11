/* ===== Shri Pashupatinath Dham — scripts ===== */
(function () {
  "use strict";

  /* ---- Full journey gallery: land -> brick -> plaster -> finished dham ---- */
  var making = [
    { src: "assets/gallery/img-01.jpg", cap: "The original sacred spot in open land" },
    { src: "assets/gallery/img-02.jpg", cap: "The land being prepared" },
    { src: "assets/gallery/img-03.jpg", cap: "Work begins at the site" },
    { src: "assets/gallery/img-04.jpg", cap: "A senior sewak blesses the karya" },
    { src: "assets/gallery/img-05.jpg", cap: "Material and shelter at the site" },
    { src: "assets/gallery/img-06.jpg", cap: "The team at the dham grounds" },
    { src: "assets/gallery/img-07.jpg", cap: "The brick sanctum takes shape" },
    { src: "assets/gallery/img-08.jpg", cap: "The shikhara being raised" },
    { src: "assets/gallery/img-09.jpg", cap: "The temple takes form in brick" },
    { src: "assets/gallery/img-10.jpg", cap: "The shikhara over the sanctum" },
    { src: "assets/gallery/img-11.jpg", cap: "Close view of the brick shikhara" },
    { src: "assets/gallery/img-12.jpg", cap: "The completed brick shikhara" },
    { src: "assets/gallery/img-13.jpg", cap: "Timber scaffolding within the sanctum" },
    { src: "assets/gallery/img-14.jpg", cap: "The timber roof framework" },
    { src: "assets/gallery/img-15.jpg", cap: "Inside the rising walls" },
    { src: "assets/gallery/img-16.jpg", cap: "Interior of the shrine in progress" },
    { src: "assets/gallery/img-17.jpg", cap: "The roof structure from within" },
    { src: "assets/gallery/img-18.jpg", cap: "Hand-laid brick walls" },
    { src: "assets/gallery/img-19.jpg", cap: "The sanctum doorway" },
    { src: "assets/gallery/img-20.jpg", cap: "The sacred sarovar beside the dham" },
    { src: "assets/gallery/img-21.jpg", cap: "Plastering complete — sewaks visit" },
    { src: "assets/gallery/img-22.jpg", cap: "The roof edge painted maroon" },
    { src: "assets/gallery/img-23.jpg", cap: "Tiling the Shivling base within" },
    { src: "assets/gallery/img-24.jpg", cap: "The sanctum & Shivling within" },
    { src: "assets/gallery/img-25.jpg", cap: "The finished temple entrance" },
    { src: "assets/gallery/img-26.jpg", cap: "Darshan at the dham" },
    { src: "assets/gallery/img-27.jpg", cap: "The dham at golden hour" },
    { src: "assets/gallery/img-28.jpg", cap: "The finished dham in its grove" },
    { src: "assets/gallery/img-29.jpg", cap: "Shri Pashupatinath Dham today" }
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
    var label = toggle.querySelector(".a-label");
    var wantOn = true; // play by default

    function setUI(on) {
      if (icon) icon.textContent = on ? "🔊" : "🔇";
      if (label) label.textContent = on ? "Mantra" : "Muted";
      toggle.classList.toggle("playing", on);
      toggle.classList.toggle("muted", !on);
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
