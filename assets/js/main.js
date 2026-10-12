(function () {
  'use strict';

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Theme toggle (remembers choice)
  var root = document.documentElement;
  var themeBtn = document.getElementById('themeToggle');
  var icon = themeBtn.querySelector('i');
  function setTheme(t) {
    root.setAttribute('data-theme', t);
    icon.className = t === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
    try { localStorage.setItem('theme', t); } catch (e) {}
  }
  var saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}
  setTheme(saved || 'dark');
  themeBtn.addEventListener('click', function () {
    setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  // Typing effect
  var words = ['Web Development', 'Artificial Intelligence', 'Machine Learning', 'Building Projects'];
  var el = document.getElementById('typed');
  var w = 0, c = 0, del = false;
  function type() {
    var word = words[w];
    el.textContent = word.substring(0, c);
    if (!del && c < word.length) { c++; setTimeout(type, 90); }
    else if (!del) { del = true; setTimeout(type, 1400); }
    else if (c > 0) { c--; setTimeout(type, 45); }
    else { del = false; w = (w + 1) % words.length; setTimeout(type, 300); }
  }
  type();

  // Scroll reveal + skill bars
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        e.target.querySelectorAll('.bar div').forEach(function (b) {
          b.style.width = b.getAttribute('data-w') + '%';
        });
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('[data-reveal]').forEach(function (n) { io.observe(n); });

  // Project filter
  var filters = document.querySelectorAll('.filter');
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filters.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.getAttribute('data-f');
      document.querySelectorAll('.project').forEach(function (p) {
        p.classList.toggle('hide', f !== 'all' && p.getAttribute('data-cat') !== f);
      });
    });
  });

  // Close mobile menu after clicking a link
  var nav = document.getElementById('nav');
  nav.querySelectorAll('.nav-link').forEach(function (l) {
    l.addEventListener('click', function () {
      if (nav.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(nav).hide();
    });
  });

  // Back-to-top button
  var top = document.getElementById('toTop');
  window.addEventListener('scroll', function () {
    top.classList.toggle('show', window.scrollY > 400);
  });

  // Contact form -> opens email client
  document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('cName').value;
    var email = document.getElementById('cEmail').value;
    var subject = document.getElementById('cSubject').value;
    var msg = document.getElementById('cMsg').value;
    var body = 'Name: ' + name + '\nEmail: ' + email + '\n\n' + msg;
    window.location.href = 'mailto:Ashlokjha9@gmail.com?subject=' +
      encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });
})();
