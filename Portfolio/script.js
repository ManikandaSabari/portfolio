// ── SKILLS DATA ──
const skillData = [
  { name: "C", icon: "devicon-c-plain colored" },
  { name: "C++", icon: "devicon-cplusplus-plain colored" },
  { name: "Java", icon: "devicon-java-plain colored" },
  { name: "Python", icon: "devicon-python-plain colored" },
  { name: "JavaScript", icon: "devicon-javascript-plain colored" },
  { name: "HTML5", icon: "devicon-html5-plain colored" },
  { name: "CSS3", icon: "devicon-css3-plain colored" },
  { name: "React", icon: "devicon-react-original colored" },
  { name: "Node.js", icon: "devicon-nodejs-plain colored" },
  { name: "TensorFlow", icon: "devicon-tensorflow-original colored" },
  { name: "Pandas", icon: "devicon-pandas-original colored" },
  { name: "NumPy", icon: "devicon-numpy-original colored" },
  { name: "OpenCV", icon: "devicon-opencv-plain colored" },
  { name: "MySQL", icon: "devicon-mysql-plain colored" },
  { name: "Git", icon: "devicon-git-plain colored" },
  { name: "GitHub", icon: "devicon-github-original" },
  { name: "VS Code", icon: "devicon-vscode-plain colored" }
];

function renderSkills() {
  const c = document.getElementById("skills-container");
  if (!c) return;
  c.innerHTML = `
    <div class="skills-grid">
      ${skillData.map(s => `
        <div class="icon-card">
          <i class="${s.icon}"></i>
          <span class="icon-name">${s.name}</span>
        </div>
      `).join('')}
    </div>
  `;
}
renderSkills();

// ── PARTICLE CANVAS ──
const canvas = document.getElementById("heroCanvas");
const ctx = canvas.getContext("2d");
let W,
  H,
  particles = [],
  t = 0;
function resize() {
  const hero = document.getElementById("hero");
  W = canvas.width = hero.offsetWidth;
  H = canvas.height = hero.offsetHeight;
  particles = [];
  for (let i = 0; i < 90; i++)
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2 + 0.4,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      a: Math.random() * 0.5 + 0.1,
      p: Math.random() * Math.PI * 2,
    });
}
function draw() {
  t += 0.016;
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, W, H);
  const gr = ctx.createRadialGradient(
    W * 0.65,
    H * 0.4,
    0,
    W * 0.65,
    H * 0.4,
    Math.min(W, H) * 0.5,
  );
  gr.addColorStop(0, "rgba(255, 255, 255, 0.07)");
  gr.addColorStop(1, "transparent");
  ctx.fillStyle = gr;
  ctx.fillRect(0, 0, W, H);
  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0) p.x = W;
    if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H;
    if (p.y > H) p.y = 0;
    const pulse = 0.5 + 0.5 * Math.sin(t * 1.4 + p.p);
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r * (0.8 + 0.4 * pulse), 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${p.a * pulse})`;
    ctx.fill();
  });
  for (let i = 0; i < particles.length; i++)
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x,
        dy = particles[i].y - particles[j].y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 130) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - d / 130) * 0.14})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  requestAnimationFrame(draw);
}
window.addEventListener("resize", resize);
resize();
draw();

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute("href"));
    if (t) t.scrollIntoView({ behavior: "smooth" });
  });
});

// ── EMAILJS SETUP ──
// SETUP: Go to https://emailjs.com → sign up free → connect Gmail → get IDs below
const EMAILJS_PUBLIC_KEY = "PBaS2ne8tgnS84EAJ";
const EMAILJS_SERVICE_ID = "service_ls9gijw";
const EMAILJS_TEMPLATE_ID = "template_jla78bj";

emailjs.init({ publicKey: "PBaS2ne8tgnS84EAJ" });

function sendEmail() {
  const btn = document.getElementById("csub");
  const status = document.getElementById("form-status");
  const name = document.getElementById("from_name").value.trim();
  const email = document.getElementById("from_email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();
  if (!name || !email || !message) {
    status.style.display = "block";
    status.style.color = "#f87171";
    status.textContent = "⚠ Please fill in your name, email and message.";
    return;
  }
  btn.textContent = "Sending...";
  btn.disabled = true;
  btn.style.opacity = "0.7";
  status.style.display = "none";
  emailjs
    .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      from_name: name,
      from_email: email,
      subject: subject || "Message from Portfolio",
      message: message,
      name: name,
      title: subject || "Message from Portfolio",
      to_email: "sabarisenthil06@gmail.com",
    })
    .then(() => {
      btn.textContent = "✓ Message Sent!";
      btn.style.background = "#ffffff";
      btn.style.opacity = "1";
      status.style.display = "block";
      status.style.color = "#86efac";
      status.textContent =
        "✅ Your message was delivered to Manikanda's inbox!";
      ["from_name", "from_email", "subject", "message"].forEach(
        (id) => (document.getElementById(id).value = ""),
      );
      setTimeout(() => {
        btn.textContent = "Send Message →";
        btn.style.background = "";
        btn.disabled = false;
      }, 4000);
    })
    .catch((err) => {
      btn.textContent = "Send Message →";
      btn.disabled = false;
      btn.style.opacity = "1";
      status.style.display = "block";
      status.style.color = "#f87171";
      const errMsg = err.text || err.message || JSON.stringify(err);
      status.textContent = "❌ Error: " + errMsg;
      console.error("EmailJS error:", err);
    });
}

// ── CERTIFICATE MODAL ──
function openCert(url) {
  const modal = document.getElementById("cert-modal");
  const viewer = document.getElementById("cert-viewer");
  viewer.src = url;
  modal.classList.add("active");
  document.body.style.overflow = "hidden"; // Prevent background scroll
}

function closeCert() {
  const modal = document.getElementById("cert-modal");
  const viewer = document.getElementById("cert-viewer");
  modal.classList.remove("active");
  setTimeout(() => {
    viewer.src = ""; // Clear src AFTER animation
    document.body.style.overflow = "auto";
  }, 300);
}

// Close on Escape key
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeCert();
});
