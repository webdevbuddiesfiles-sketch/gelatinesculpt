// gelatine-sculpt.com: reveal-on-scroll (progressive enhancement), "Where to?" panel, ingredient tiles, habit planner, sticky order bar.
(function () {
  var root = document.documentElement;
  var els = [].slice.call(document.querySelectorAll(".gsc-rise,.gsc-perday2,.gsc-rater,.gsc-dial2,.gsc-chartx,.gsc-dose,.gsc-donutx"));
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function show(el) { el.classList.add("is-in"); }
  if (reduce || !("IntersectionObserver" in window)) { els.forEach(show); }
  else {
    root.classList.add("gsc-live2");
    var io = new IntersectionObserver(function (list) {
      list.forEach(function (e) { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } });
    }, { rootMargin: "200px 0px -5% 0px", threshold: 0 });
    els.forEach(function (el) { io.observe(el); });
    var sweep = function () {
      var vh = innerHeight;
      els.forEach(function (el) { if (!el.classList.contains("is-in") && el.getBoundingClientRect().top < vh * 0.92) show(el); });
    };
    addEventListener("scroll", sweep, { passive: true });
    addEventListener("load", function () { sweep(); [400, 1200, 2500].forEach(function (t) { setTimeout(sweep, t); }); });
    sweep();
    setTimeout(function () { els.forEach(show); }, 3500);
  }

  var btn = document.querySelector(".gsc-menubtn"), panel = document.getElementById("gsc-megamenu");
  if (btn && panel) {
    var set = function (on) {
      if (on) panel.setAttribute("data-open", ""); else panel.removeAttribute("data-open");
      btn.setAttribute("aria-expanded", on ? "true" : "false");
    };
    btn.addEventListener("click", function (e) { e.stopPropagation(); set(!panel.hasAttribute("data-open")); });
    panel.addEventListener("click", function (e) { if (e.target.closest("a")) set(false); e.stopPropagation(); });
    document.addEventListener("click", function () { set(false); });
    addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
  }

  var tiles = [].slice.call(document.querySelectorAll(".gsc-chip6"));
  if (tiles.length) {
    var stories = [].slice.call(document.querySelectorAll(".gsc-focus"));
    tiles.forEach(function (t) {
      t.addEventListener("click", function () {
        var id = t.getAttribute("data-s");
        tiles.forEach(function (x) { x.setAttribute("aria-selected", x === t ? "true" : "false"); });
        stories.forEach(function (s) { s.hidden = s.id !== id; });
      });
    });
  }

  var moments = [].slice.call(document.querySelectorAll(".gsc-whenb")), label = document.getElementById("gsc-moment");
  moments.forEach(function (m) {
    m.addEventListener("click", function () {
      moments.forEach(function (x) { x.setAttribute("aria-pressed", x === m ? "true" : "false"); });
      if (label) label.textContent = m.textContent.toLowerCase();
    });
  });
  [].slice.call(document.querySelectorAll(".gsc-daysbtn")).forEach(function (d) {
    d.addEventListener("click", function () { d.setAttribute("aria-pressed", d.getAttribute("aria-pressed") === "true" ? "false" : "true"); });
  });

  var bar = document.querySelector(".gsc-sticky2"), foot = document.querySelector(".gsc-base2");
  if (bar) {
    var upd = function () {
      if (scrollY > 620) bar.setAttribute("data-up", ""); else bar.removeAttribute("data-up");
      var hide = false;
      if (foot) hide = foot.getBoundingClientRect().top < innerHeight - 40;
      if (hide) bar.setAttribute("data-hide", ""); else bar.removeAttribute("data-hide");
    };
    addEventListener("scroll", upd, { passive: true }); addEventListener("resize", upd); upd();
  }
})();

/* hero metabolism canvas: a ring of connected nodes with a travelling pulse and inward-spiralling particles */
(function(){var c=document.getElementById('gsc-flow');if(!c||!c.getContext)return;var x=c.getContext('2d'),W=c.width,H=c.height,reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches,t=0,run=true,i,j,cx=W/2,cy=H/2,R=78,n=14,nodes=[];
for(i=0;i<n;i++){var a=i/n*Math.PI*2-Math.PI/2;nodes.push([cx+Math.cos(a)*R*1.45,cy+Math.sin(a)*R*0.95])}
var parts=[];for(i=0;i<44;i++){parts.push({a:Math.random()*6.283,r:0.4+Math.random()*0.9,s:0.004+Math.random()*0.006})}
function frame(){t+=0.016;x.clearRect(0,0,W,H);
x.lineWidth=1;x.strokeStyle='rgba(214,51,138,.3)';x.beginPath();for(i=0;i<=n;i++){var q=nodes[i%n];if(i)x.lineTo(q[0],q[1]);else x.moveTo(q[0],q[1])}x.stroke();
x.strokeStyle='rgba(214,51,138,.12)';for(i=0;i<n;i++){for(j=i+3;j<n;j+=5){x.beginPath();x.moveTo(nodes[i][0],nodes[i][1]);x.lineTo(nodes[j][0],nodes[j][1]);x.stroke()}x.beginPath();x.moveTo(nodes[i][0],nodes[i][1]);x.lineTo(cx,cy);x.stroke()}
var ph=(t*0.5)%1,head=ph*n;
for(i=0;i<n;i++){var d=Math.abs(((i-head)+n*1.5)%n-n/2);var near=Math.max(0,1-Math.min(d,n-d)/2.2);x.beginPath();x.arc(nodes[i][0],nodes[i][1],3.4+4*near,0,6.283);x.fillStyle=near>0.05?'rgba(201,138,43,'+(0.5+0.5*near)+')':(i%2?'rgba(214,51,138,.85)':'rgba(163,32,95,.8)');x.fill()}
var pu=1+0.12*Math.sin(t*2.2);x.beginPath();x.arc(cx,cy,9*pu,0,6.283);x.fillStyle='rgba(214,51,138,.85)';x.fill();x.beginPath();x.arc(cx,cy,15*pu,0,6.283);x.strokeStyle='rgba(214,51,138,.3)';x.lineWidth=2;x.stroke();
for(i=0;i<parts.length;i++){var p=parts[i];if(!reduce){p.a+=p.s*2;p.r-=0.0016;if(p.r<0.08)p.r=1.1}var px=cx+Math.cos(p.a)*R*1.45*p.r,py=cy+Math.sin(p.a)*R*0.95*p.r;x.beginPath();x.arc(px,py,2,0,6.283);x.fillStyle='rgba(201,138,43,'+(0.15+0.55*(1-p.r/1.1))+')';x.fill()}
if(run&&!reduce)requestAnimationFrame(frame)}
frame();
if('IntersectionObserver' in window){new IntersectionObserver(function(e){var v=e[0].isIntersecting;if(v&&!run&&!reduce){run=true;frame()}else if(!v){run=false}},{threshold:0}).observe(c)}
})();
