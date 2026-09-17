// ============================================================================
// SafeVoice — script.js
// Powers: Quick Exit, Grounding/breathing tool, and the SafeVoice Assistant
// (rule-based — no external API, no data storage, no login).
// ============================================================================

document.addEventListener("DOMContentLoaded", () => {
  initQuickExit();
  initGrounding();
  initChatWidget();
});

// ----------------------------------------------------------------------------
// QUICK EXIT
// Immediately leaves the page. This is a best-effort browser-side action —
// it cannot erase entries already saved in the device's browser history,
// but it replaces the current page so the back button does not return here,
// and it does not leave anything typed in the chat visible behind it.
// ----------------------------------------------------------------------------
function initQuickExit() {
  const exitBtn = document.getElementById("quickExitBtn");
  if (!exitBtn) return;

  exitBtn.addEventListener("click", () => {
    // Push an extra history entry so a single "back" press lands on the
    // safe site instead of returning to SafeVoice.
    try {
      window.history.replaceState(null, "", "https://www.google.com");
    } catch (e) {
      // Ignore — some browsers restrict cross-origin history writes.
    }
    window.location.replace("https://www.google.com");
  });
}

// ----------------------------------------------------------------------------
// GROUNDING / "EXIST" BREATHING TOOL
// A simple 5-step guided breathing cycle using the existing pulse-circle.
// ----------------------------------------------------------------------------
function initGrounding() {
  const startBtn = document.getElementById("startGroundingBtn");
  const resetBtn = document.getElementById("resetGroundingBtn");
  const circle = document.getElementById("groundingCircle");
  const instruction = document.getElementById("groundingInstruction");

  if (!startBtn || !resetBtn || !circle || !instruction) return;

  const steps = [
    { text: "Breathe in slowly through your nose...", cls: "inhale", duration: 4000 },
    { text: "Hold gently...", cls: "inhale", duration: 3000 },
    { text: "Breathe out slowly through your mouth...", cls: "exhale", duration: 5000 },
    { text: "Notice one thing you can see around you.", cls: "", duration: 3500 },
    { text: "Notice one thing you can hear right now.", cls: "", duration: 3500 }
  ];

  let running = false;

  async function runGroundingSequence() {
    running = true;
    startBtn.disabled = true;
    resetBtn.disabled = false;

    for (const step of steps) {
      if (!running) return;
      instruction.textContent = step.text;
      circle.classList.remove("inhale", "exhale");
      if (step.cls) circle.classList.add(step.cls);
      await new Promise((resolve) => setTimeout(resolve, step.duration));
    }

    if (!running) return;
    instruction.textContent = "You made it through the exercise. You can start again anytime, or reach out to the SafeVoice assistant.";
    circle.classList.remove("inhale", "exhale");
    startBtn.disabled = false;
  }

  startBtn.addEventListener("click", runGroundingSequence);

  resetBtn.addEventListener("click", () => {
    running = false;
    circle.classList.remove("inhale", "exhale");
    instruction.textContent = "Click below to start a 5-step guided calming exercise.";
    startBtn.disabled = false;
    resetBtn.disabled = true;
  });
}

// ----------------------------------------------------------------------------
// SAFEVOICE ASSISTANT (rule-based chat — no external API, nothing stored)
// ----------------------------------------------------------------------------
function initChatWidget() {
  const launcher = document.getElementById("chatToggleLauncher");
  const navOpenBtn = document.getElementById("navOpenChatBtn");
  const heroOpenBtn = document.getElementById("heroOpenChatBtn");
  const chatWindow = document.getElementById("chatWindow");
  const closeBtn = document.getElementById("chatCloseBtn");
  const form = document.getElementById("chatMessageForm");
  const input = document.getElementById("chatTextInput");
  const messagesList = document.getElementById("chatMessagesList");

  if (!chatWindow || !form || !input || !messagesList) return;

  function openChat() {
    chatWindow.hidden = false;
    if (launcher) launcher.hidden = true;
    input.focus();
  }

  function closeChat() {
    chatWindow.hidden = true;
    if (launcher) launcher.hidden = false;
  }

  if (launcher) launcher.addEventListener("click", openChat);
  if (navOpenBtn) navOpenBtn.addEventListener("click", openChat);
  if (heroOpenBtn) heroOpenBtn.addEventListener("click", openChat);
  if (closeBtn) closeBtn.addEventListener("click", closeChat);

  function currentTime() {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  function addBubble(text, sender) {
    const bubble = document.createElement("div");
    bubble.className = "chat-bubble " + (sender === "user" ? "user-bubble" : "bot-bubble");

    const p = document.createElement("p");
    p.textContent = text;

    const time = document.createElement("time");
    time.className = "bubble-time";
    time.textContent = currentTime();

    bubble.appendChild(p);
    bubble.appendChild(time);
    messagesList.appendChild(bubble);
    messagesList.scrollTop = messagesList.scrollHeight;
    return bubble;
  }

  const HELPLINES_TEXT =
    "Verified helplines (Pakistan): Police Emergency 15 • FIA Cyber Crime 1991 • Umang Mental Health 0311-7786264 • Child Protection Bureau 1121.";

  const CRISIS_KEYWORDS = [
    "abuse", "hurt", "hit", "beat", "scared", "afraid", "threat", "blackmail",
    "sextortion", "nude", "video", "police", "run away", "suicide",
    "kill myself", "die", "no hope", "end my life", "self-harm", "cutting"
  ];

  const SUPPORT_KEYWORDS = [
    "sad", "lonely", "anxious", "depressed", "stress", "worried", "cry",
    "bully", "bullied", "bullying"
  ];

  function detectIntent(text) {
    const t = text.toLowerCase();
    if (CRISIS_KEYWORDS.some((w) => t.includes(w))) return "crisis";
    if (SUPPORT_KEYWORDS.some((w) => t.includes(w))) return "support";
    return "general";
  }

  function getReply(rawText) {
    const intent = detectIntent(rawText);

    if (intent === "crisis") {
      return (
        "I'm really sorry you're going through this. You don't deserve to be hurt or threatened. " +
        "I'm not a human and not an emergency service, but your safety matters. If you can, please tell a " +
        "trusted adult (parent, relative, teacher, counselor) what is happening. " + HELPLINES_TEXT +
        " You are not alone, and it's brave to reach out."
      );
    }

    if (intent === "support") {
      return (
        "Thank you for sharing how you feel — that took courage. Many people go through hard times, and your " +
        "feelings are valid. I'm automated, not a replacement for a counselor, but you deserve support. " +
        "If possible, try to talk to a trusted adult too. " + HELPLINES_TEXT
      );
    }

    return (
      "Thanks for messaging SafeVoice. I'm an automated assistant, not a human, and I can't handle emergencies. " +
      "I can share general safety information and a listening ear. If you ever feel unsafe or in crisis, please " +
      "contact a trusted adult or a helpline. " + HELPLINES_TEXT
    );
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = input.value.trim();
    if (!text) return;

    addBubble(text, "user");
    input.value = "";
    input.disabled = true;

    setTimeout(() => {
      addBubble(getReply(text), "bot");
      input.disabled = false;
      input.focus();
    }, 450);
  });
}
