var nav = document.getElementById('nav');
window.addEventListener('scroll', function() {
  nav.classList.toggle('scrolled', window.scrollY > 24);
}, { passive: true });

function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
}

function closeNav() {
  document.getElementById('navLinks').classList.remove('open');
}

var roles = [
  'ML Engineering Intern @FlyRank',
  'AI/ML Enthusiast',
  'Researcher',
  'Full-Stack Software Developer',
  'Sub-Executive @NSU ACM Student Chapter ',
  'CSE Graduate @NSU'
];

var ri = 0;
var ci = 0;
var del = false;
var tw = document.getElementById('tw');

function type() {
  var cur = roles[ri];
  tw.textContent = del ? cur.slice(0, --ci) : cur.slice(0, ++ci);
  if (!del && ci === cur.length) {
    del = true;
    setTimeout(type, 1800);
    return;
  }
  if (del && ci === 0) {
    del = false;
    ri = (ri + 1) % roles.length;
  }
  setTimeout(type, del ? 42 : 78);
}

type();

var cvs = document.getElementById('hero-canvas');
var ctx = cvs.getContext('2d');
var pts = [];
var N = 65;
var D = 150;

function resize() {
  cvs.width = cvs.offsetWidth;
  cvs.height = cvs.offsetHeight;
}

resize();
window.addEventListener('resize', resize, { passive: true });

function P() {
  this.x = Math.random() * cvs.width;
  this.y = Math.random() * cvs.height;
  this.vx = (Math.random() - 0.5) * 0.38;
  this.vy = (Math.random() - 0.5) * 0.38;
  this.r = Math.random() * 1.6 + 0.8;
}

P.prototype.step = function() {
  this.x += this.vx;
  this.y += this.vy;
  if (this.x < 0 || this.x > cvs.width) this.vx *= -1;
  if (this.y < 0 || this.y > cvs.height) this.vy *= -1;
};

P.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(99,102,241,.75)';
  ctx.fill();
};

for (var i = 0; i < N; i++) {
  pts.push(new P());
}

(function loop() {
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  for (var i = 0; i < N; i++) {
    for (var j = i + 1; j < N; j++) {
      var dx = pts[i].x - pts[j].x;
      var dy = pts[i].y - pts[j].y;
      var d = Math.sqrt(dx * dx + dy * dy);
      if (d < D) {
        ctx.beginPath();
        ctx.moveTo(pts[i].x, pts[i].y);
        ctx.lineTo(pts[j].x, pts[j].y);
        ctx.strokeStyle = 'rgba(99,102,241,' + ((1 - d / D) * 0.32) + ')';
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }
    }
  }
  for (var k = 0; k < pts.length; k++) {
    pts[k].step();
    pts[k].draw();
  }
  requestAnimationFrame(loop);
})();

var obs = new IntersectionObserver(function(entries) {
  entries.forEach(function(e, i) {
    if (e.isIntersecting) {
      setTimeout(function() {
        e.target.classList.add('vis');
      }, i * 90);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fi').forEach(function(el) {
  obs.observe(el);
});