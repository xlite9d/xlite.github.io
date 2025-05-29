window.addEventListener("load", () => {
  const statusBox = document.getElementById("connection-status");
  const statusText = document.getElementById("status-text");
  const spinner = document.getElementById("spinner");

  if (!statusBox || !statusText || !spinner) return;

  const unlock = (text, colorClass) => {
    statusText.textContent = text;
    statusText.className = colorClass;
    if (spinner.parentElement) spinner.remove();
  };

  statusText.textContent = "Connecting...";
  let unlocked = false;

  setTimeout(() => {
    fetch("https://blocksi.agmlabs.com/kitty/", {
      method: "HEAD",
      mode: "no-cors"
    })
      .then(() => {
        if (!unlocked) {
          unlocked = true;
          unlock("Connected", "green");
          statusBox.classList.add("fade-out");
        }
      })
      .catch(() => {
        if (!unlocked) {
          unlocked = true;
          unlock("Failed to Connect", "red");
        }
      });

    setTimeout(() => {
      if (!unlocked) {
        unlocked = true;
        unlock("Failed to Connect", "red");
      }
    }, 5000);
  }, 1250); // delay to start checking after page loads
});
