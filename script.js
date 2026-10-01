// ============================================================================
// SafeVoice — script.js
// Welcome → Nickname → Main Site → Chat
// ============================================================================

document.addEventListener("DOMContentLoaded", () => {
  initEntryFlow();
});

// ----------------------------------------------------------------------------
// ENTRY FLOW — Welcome → Nickname → Main Site
// ----------------------------------------------------------------------------
function initEntryFlow() {
  const welcomeScreen = document.getElementById("welcomeScreen");
  const nicknameScreen = document.getElementById("nicknameScreen");
  const mainSite = document.getElementById("mainSite");
  const welcomeEnterBtn = document.getElementById("welcomeEnterBtn");
  const nicknameInput = document.getElementById("nicknameInput");
  const nicknameContinueBtn = document.getElementById("nicknameContinueBtn");
  const nicknameHint = document.getElementById("nicknameHint");

  if (!welcomeScreen || !nicknameScreen || !mainSite) return;

  const savedNickname = localStorage.getItem("safevoice_nickname");

  if (savedNickname) {
    welcomeScreen.hidden = true;
    nicknameScreen.hidden = true;
    mainSite.hidden = false;
    initMainSite(savedNickname);
    return;
  }

  welcomeScreen.hidden = false;
  nicknameScreen.hidden = true;
  mainSite.hidden = true;

  if (welcomeEnterBtn) {
    welcomeEnterBtn.addEventListener("click", () => {
      welcomeScreen.hidden = true;
      nicknameScreen.hidden = false;
      setTimeout(() => nicknameInput && nicknameInput.focus(), 300);
    });
  }

  function saveNickname() {
    const nick = (nicknameInput.value || "").trim();

    if (nick.length < 2) {
      nicknameHint.textContent = "Please enter at least 2 characters.";
      nicknameHint.style.color = "#fb7185";
      return;
    }

    if (nick.length > 20) {
      nicknameHint.textContent = "Please use 20 characters or less.";
      nicknameHint.style.color = "#fb7185";
      return;
    }

    localStorage.setItem("safevoice_nickname", nick);
    nicknameScreen.hidden = true;
    mainSite.hidden = false;
    initMainSite(nick);
  }

  if (nicknameContinueBtn) {
    nicknameContinueBtn.addEventListener("click", saveNickname);
  }

  if (nicknameInput) {
    nicknameInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        saveNickname();
      }
    });
  }
}

// ----------------------------------------------------------------------------
// MAIN SITE — only runs after nickname is set
// ----------------------------------------------------------------------------
function initMainSite(nickname) {
  initQuickExit();
  initGrounding();
  initChatWidget(nickname);
}

// ----------------------------------------------------------------------------
// QUICK EXIT
// ----------------------------------------------------------------------------
function initQuickExit() {
  const exitBtn = document.getElementById("quickExitBtn");
  if (!exitBtn) return;

  exitBtn.addEventListener("click", () => {
    try {
      window.history.replaceState(null, "", "https://www.google.com");
    } catch (e) {}
    window.location.replace("https://www.google.com");
  });
}

// ----------------------------------------------------------------------------
// GROUNDING TOOL
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
    instruction.textContent = "You made it through the exercise. You can start again anytime.";
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
// CHAT WIDGET
// ----------------------------------------------------------------------------
function initChatWidget(nickname) {
  const launcher = document.getElementById("chatToggleLauncher");
  const navOpenBtn = document.getElementById("navOpenChatBtn");
  const heroOpenBtn = document.getElementById("heroOpenChatBtn");
  const chatWindow = document.getElementById("chatWindow");
  const closeBtn = document.getElementById("chatCloseBtn");
  const form = document.getElementById("chatMessageForm");
  const input = document.getElementById("chatTextInput");
  const messagesList = document.getElementById("chatMessagesList");
  const chatGreeting = document.getElementById("chatGreeting");

  if (!chatWindow || !form || !input || !messagesList) return;

  const AI_CHAT_API_ENDPOINT = "https://safevoice-server-59yy.onrender.com/api/chat";
  const STORAGE_KEY = "safevoice_history_" + nickname;

  if (chatGreeting) {
    chatGreeting.textContent = "Hi, " + nickname + " • Private";
  }

  let conversation = [];
  try {
    conversation = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch (e) {
    conversation = [];
  }

  function saveConversation() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(conversation));
    } catch (e) {}
  }

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

  let isComposing = false;
  input.addEventListener("compositionstart", () => { isComposing = true; });
  input.addEventListener("compositionend", () => { isComposing = false; });

  function currentTime() {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  function addBubble(text, sender, saveTime) {
    const bubble = document.createElement("div");
    bubble.className = "chat-bubble " + (sender === "user" ? "user-bubble" : "bot-bubble");

    const p = document.createElement("p");
    p.textContent = text;

    const time = document.createElement("time");
    time.className = "bubble-time";
    time.textContent = saveTime || currentTime();

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

  function getFallbackReply(rawText) {
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
      "Thanks for messaging SafeVoice. I'm having trouble reaching my full assistant right now, so here's a " +
      "general note instead: I can't handle emergencies. If you ever feel unsafe or in crisis, please contact " +
      "a trusted adult or a helpline. " + HELPLINES_TEXT
    );
  }

  if (conversation.length > 0) {
    conversation.forEach((msg) => {
      addBubble(msg.content, msg.role === "user" ? "user" : "bot");
    });
  } else {
    const welcome =
      "Hi " + nickname + " 👋 I'm the SafeVoice assistant. I'm here to listen, share safety tips, and guide you through difficult moments. Nothing you say here is linked to your real identity. What's on your mind?";
    addBubble(welcome, "bot");
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (isComposing) {
      await new Promise((resolve) => setTimeout(resolve, 150));
    }

    const text = input.value.trim();
    if (!text) return;

    addBubble(text, "user");
    conversation.push({ role: "user", content: text });
    saveConversation();

    input.value = "";
    input.disabled = true;

    const typingBubble = addBubble("Thinking...", "bot");

    try {
      const response = await fetch(AI_CHAT_API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conversation })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Chat request failed.");
      }

      typingBubble.querySelector("p").textContent = data.reply;
      conversation.push({ role: "assistant", content: data.reply });
      saveConversation();
    } catch (error) {
      console.error(error);
      const fallback = getFallbackReply(text);
      typingBubble.querySelector("p").textContent = fallback;
      conversation.push({ role: "assistant", content: fallback });
      saveConversation();
    } finally {
      input.disabled = false;
      input.focus();
    }
  });
}
