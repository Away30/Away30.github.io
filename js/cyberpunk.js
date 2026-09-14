/* global document, window */

(function () {
  'use strict';

  function normalizePath(path) {
    var clean = (path || '/').split('?')[0].split('#')[0];
    clean = clean.replace(/index\.html$/, '').replace(/\/+$/, '');
    return clean || '/';
  }

  function initCyberLayer() {
    var body = document.body;
    if (!body) return;

    if (document.querySelector('.index-card')) {
      body.classList.add('cyber-home');
    } else {
      body.classList.add('cyber-inner');
    }

    if (document.querySelector('.post-content')) {
      body.classList.add('cyber-post');
    }

    var currentPath = normalizePath(window.location.pathname);
    var navLinks = document.querySelectorAll('#navbar .nav-link[href]');
    for (var i = 0; i < navLinks.length; i += 1) {
      var linkPath = normalizePath(navLinks[i].getAttribute('href'));
      if (linkPath === currentPath || (linkPath !== '/' && currentPath.indexOf(linkPath + '/') === 0)) {
        var item = navLinks[i].closest('.nav-item');
        if (item) item.classList.add('cyber-active');
      }
    }

    var progress = document.createElement('div');
    progress.className = 'cyber-scroll-progress';
    progress.setAttribute('aria-hidden', 'true');
    body.appendChild(progress);

    function updateProgress() {
      var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      var ratio = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      progress.style.transform = 'scaleX(' + Math.max(0, Math.min(1, ratio)) + ')';
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    updateProgress();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCyberLayer);
  } else {
    initCyberLayer();
  }
}());
