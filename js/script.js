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
    { src: "assets/gallery/img-29.jpg", cap: "Shri Pashupatinath Dham today" },
    { src: "assets/gallery/img-35.jpg", cap: "Havan during the Pran Pratishtha" },
    { src: "assets/gallery/img-30.jpg", cap: "The Saini family offering worship" },
    { src: "assets/gallery/img-31.jpg", cap: "The family with trishuls at the dham" },
    { src: "assets/gallery/img-32.jpg", cap: "Elders of the family at the ceremony" },
    { src: "assets/gallery/img-33.jpg", cap: "Dr. Kamlesh Kumar Saini with family" }
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
    // Wire up static images (poster, ceremony, Kathmandu, progress) to the lightbox
    document.querySelectorAll(".prat-poster img, .prat-photos figure img, .kath-photo img, .progress-imgs figure img").forEach(function (im) {
      im.style.cursor = "zoom-in";
      im.addEventListener("click", function () { openLightbox(im.src, im.alt); });
    });
  }

  /* ---- Homepage slideshow ---- */
  var ss = document.getElementById("slideshow");
  if (ss) {
    var slides = [].slice.call(ss.querySelectorAll(".slide"));
    var dotsWrap = document.getElementById("slideDots");
    var heroEl = document.getElementById("home");
    var cur = 0, ssTimer;
    slides.forEach(function (sl, i) {
      var d = document.createElement("button");
      d.setAttribute("aria-label", "Go to slide " + (i + 1));
      d.addEventListener("click", function () { showSlide(i); restartSS(); });
      dotsWrap.appendChild(d);
      var im = sl.querySelector("img");
      // Only the poster opens full-size (hero photos stay as background)
      if (im && sl.classList.contains("poster-slide")) {
        im.addEventListener("click", function () { openLightbox(im.src, im.alt); });
      }
    });
    var dots = [].slice.call(dotsWrap.children);
    function showSlide(i) {
      cur = (i + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle("active", k === cur); });
      dots.forEach(function (d, k) { d.classList.toggle("active", k === cur); });
      if (heroEl) heroEl.classList.toggle("show-poster", slides[cur].classList.contains("poster-slide"));
    }
    function nextSS() { showSlide(cur + 1); }
    function restartSS() { clearInterval(ssTimer); ssTimer = setInterval(nextSS, 4500); }
    var pv = document.getElementById("slidePrev"), nx = document.getElementById("slideNext");
    if (pv) pv.addEventListener("click", function () { showSlide(cur - 1); restartSS(); });
    if (nx) nx.addEventListener("click", function () { showSlide(cur + 1); restartSS(); });
    ss.addEventListener("mouseenter", function () { clearInterval(ssTimer); });
    ss.addEventListener("mouseleave", restartSS);
    showSlide(0);
    restartSS();
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

  /* ---- Countdown to next Bhandara (from now until 30 Nov 2026) ---- */
  var cd = document.getElementById("countdown");
  if (cd) {
    var target = new Date(cd.getAttribute("data-target") || "2026-11-30T09:00:00").getTime();
    var elD = document.getElementById("cd-days"),
        elH = document.getElementById("cd-hours"),
        elM = document.getElementById("cd-mins"),
        elS = document.getElementById("cd-secs");
    var pad = function (n) { return (n < 10 ? "0" : "") + n; };
    var tick = function () {
      var diff = target - Date.now();
      if (diff <= 0) {
        if (elD) elD.textContent = "0";
        if (elH) elH.textContent = "00";
        if (elM) elM.textContent = "00";
        if (elS) elS.textContent = "00";
        var h3 = cd.querySelector("h3");
        if (h3) h3.textContent = "🙏 The Bhandara is here — Sabka swagat hai!";
        return;
      }
      var d = Math.floor(diff / 86400000);
      var h = Math.floor((diff % 86400000) / 3600000);
      var m = Math.floor((diff % 3600000) / 60000);
      var s = Math.floor((diff % 60000) / 1000);
      if (elD) elD.textContent = d;
      if (elH) elH.textContent = pad(h);
      if (elM) elM.textContent = pad(m);
      if (elS) elS.textContent = pad(s);
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ---- Visit counter (global via CountAPI, with local fallback) ---- */
  var vc = document.getElementById("visitCount");
  if (vc) {
    var BASE = 100000; // start the count from 1 lakh
    var fmt = function (n) { return Number(n).toLocaleString("en-IN"); };
    var localBump = function () {
      var n = parseInt(localStorage.getItem("spd_visits") || "0", 10);
      if (!sessionStorage.getItem("spd_counted_session")) {
        n += 1;
        localStorage.setItem("spd_visits", String(n));
        sessionStorage.setItem("spd_counted_session", "1");
      }
      vc.textContent = fmt(BASE + n);
    };
    // Try a global counter first; fall back to local if unavailable
    var done = false;
    var timer = setTimeout(function () { if (!done) { done = true; localBump(); } }, 3500);
    fetch("https://api.counterapi.dev/v1/shripashupatinath-com/visits/up")
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (done) return; done = true; clearTimeout(timer);
        var count = data && (data.count != null ? data.count : (data.value != null ? data.value : null));
        if (count != null) vc.textContent = fmt(BASE + Number(count)); else localBump();
      })
      .catch(function () { if (done) return; done = true; clearTimeout(timer); localBump(); });
  }

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
