// Toast system
export const toast = {
  ok: (message) => showToast(message, "ok"),
  err: (error) => {
    const msg = typeof error === "string" ? error : error?.message || "Error";
    showToast(msg, "err");
  }
};

function showToast(message, type = "ok") {
  // Create container if not exists
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
    Object.assign(container.style, {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      zIndex: "9999",
    });
  }

  // Create toast element
  const el = document.createElement("div");
  el.className = `toast toast-${type}`;
  el.textContent = message;
  Object.assign(el.style, {
    padding: "16px 24px",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "500",
    background: "#fff",
    color: type === "ok" ? "#2e7d32" : "#c62828",
    border: `2px solid ${type === "ok" ? "#2e7d32" : "#c62828"}`,
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    opacity: "0",
    transform: "translateY(30px)",
    transition: "all 0.35s ease",
    maxWidth: "280px",
    wordBreak: "break-word"
  });

  container.appendChild(el);

  // Trigger animation
  requestAnimationFrame(() => {
    el.style.opacity = "1";
    el.style.transform = "translateY(0)";
  });

  // Auto remove after 3.5s
  setTimeout(() => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    setTimeout(() => el.remove(), 350);
  }, 3500);
}
