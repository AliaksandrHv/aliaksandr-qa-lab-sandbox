// ---------- LOGIN ----------

const email = document.querySelector('[data-testid="login-email"]');
const password = document.querySelector('[data-testid="login-password"]');
const loginBtn = document.querySelector('[data-testid="login-submit"]');
const loginStatus = document.querySelector('[data-testid="login-status"]');
const bugFlakyLogin = document.querySelector('[data-testid="bug-flaky-login"]');

const VALID = { email: "qa@example.com", password: "Pass123!" };

loginBtn.addEventListener("click", () => {
  const e = email.value.trim();
  const p = password.value.trim();

  // Flaky login bug is enabled only when the toggle is checked.
  if (bugFlakyLogin && bugFlakyLogin.checked && Math.random() < 0.3) {
    loginStatus.textContent = "Server error, try again";
    return;
  }

  if (e === VALID.email && p === VALID.password) {
    loginStatus.textContent = "Logged in";
  } else {
    loginStatus.textContent = "Invalid credentials";
  }
});


// ---------- SEARCH ----------

const search = document.querySelector('[data-testid="search-input"]');
const searchStatus = document.querySelector('[data-testid="search-status"]');

search.addEventListener("input", () => {
  searchStatus.textContent = `Typing: ${search.value}`;
});


// ---------- TABLE DATA ----------

const data = [
  { id: 1, name: "Hammer", category: "tool" },
  { id: 2, name: "Screwdriver", category: "tool" },
  { id: 3, name: "Laptop", category: "device" },
  { id: 4, name: "Phone", category: "device" },
  { id: 5, name: "Wrench", category: "tool" },
  { id: 6, name: "Tablet", category: "device" }
];

const tableBody = document.querySelector('[data-testid="table-body"]');
const categorySelect = document.querySelector('[data-testid="category-select"]');
const prevBtn = document.querySelector('[data-testid="prev-page"]');
const nextBtn = document.querySelector('[data-testid="next-page"]');
const pageInfo = document.querySelector('[data-testid="page-info"]');

const tableLoading = document.querySelector('[data-testid="table-loading"]');
const bugSlowNetwork = document.querySelector('[data-testid="bug-slow-network"]');
const bugTableError = document.querySelector('[data-testid="bug-table-error"]');
let page = 1;
const pageSize = 2;


// ---------- HELPERS ----------

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// ---------- PERSIST BUG TOGGLES (localStorage) ----------

// Load saved checkbox states from localStorage
function loadBugToggles() {
  const toggles = document.querySelectorAll('input[type="checkbox"][data-testid^="bug-"]');

  toggles.forEach((cb) => {
    const key = cb.dataset.testid; // e.g. "bug-slow-network"
    const saved = localStorage.getItem(key);

    if (saved !== null) {
      cb.checked = saved === "true";
    }
  });
}

// Save checkbox state when user changes it
function bindBugTogglePersistence() {
  const toggles = document.querySelectorAll('input[type="checkbox"][data-testid^="bug-"]');

  toggles.forEach((cb) => {
    cb.addEventListener("change", () => {
      const key = cb.dataset.testid;
      localStorage.setItem(key, String(cb.checked));
    });
  });
}
function setLoading(on) {
  if (!tableLoading) return;
  tableLoading.style.display = on ? "block" : "none";
}


// ---------- RENDER TABLE ----------

async function renderTable() {

  //  turn ON loader
  setLoading(true);

  // FIX: prevent from going below 1
  if (page < 1) page = 1;

  // Simulate Slow network - wait
  if (bugSlowNetwork && bugSlowNetwork.checked) {
    await sleep(1200);
  }
  // Simulate server error
  if (bugTableError && bugTableError.checked) {
    tableBody.innerHTML =
      '<tr><td colspan="3" style="color:red">Server error (500)</td></tr>';
    pageInfo.textContent = "";
    setLoading(false);
    return;
  }

  const category = categorySelect.value;

  let filtered = data;
  if (category !== "all") {
    filtered = data.filter(item => item.category === category);
  }

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;

  if (page > totalPages) page = totalPages;

  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);

  tableBody.innerHTML = items.map(i =>
    `<tr><td>${i.id}</td><td>${i.name}</td><td>${i.category}</td></tr>`
  ).join("");

  pageInfo.textContent = `Page ${page} of ${totalPages}`;

  // turn off loader
  setLoading(false);
}


// ---------- EVENTS ----------

categorySelect.addEventListener("change", async () => {
  page = 1;
  await renderTable();
});

prevBtn.addEventListener("click", async () => {
  page--;
  await renderTable();
});

nextBtn.addEventListener("click", async () => {
  page++;
  await renderTable();
});


// ---------- INIT ----------

loadBugToggles();
bindBugTogglePersistence();
renderTable();


// ---------- MODAL + TOAST ----------

const modal = document.getElementById("modal");
const openModalBtn = document.querySelector('[data-testid="open-modal"]');
const closeModalBtn = document.querySelector('[data-testid="close-modal"]');
const confirmBtn = document.querySelector('[data-testid="confirm-btn"]');
const toast = document.querySelector('[data-testid="toast"]');

function showModal() {
  modal.style.display = "block";
}

function hideModal() {
  modal.style.display = "none";
}

function showToast(message) {
  toast.textContent = message;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 1500);
}

openModalBtn.addEventListener("click", showModal);
closeModalBtn.addEventListener("click", hideModal);

modal.addEventListener("click", e => {
  if (e.target === modal) hideModal();
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") hideModal();
});

confirmBtn.addEventListener("click", () => {
  showToast("Confirmed \u2705");
  hideModal();
});
