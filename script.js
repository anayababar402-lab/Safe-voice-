document.addEventListener("DOMContentLoaded", () => {
  initQuickExit();
  initGrounding();
  initChatWidget();
});

function initQuickExit() {
  const exitBtn = document.getElementById("quickExitBtn");
  if (!exitBtn) return;
  exitBtn.addEventListener("click", () => {
    try {
      localStorage.removeItem("safevoice_history");
      sessionStorage.clear();
      window.history.replaceState(null, "", "https://www.google.com");
    } catch (error) {
      console.warn("Could not clear local session data.", error);
    }
    window.location.replace("https://www.google.com");
  });
}

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

  const AI_CHAT_API_ENDPOINT = "https://safevoice-server-59yy.onrender.com/api/chat";
  const STORAGE_KEY = "safevoice_history";
  const WELCOME = "Hi, I'm the SafeVoice assistant. I can share general safety information and calming ideas, but I am not an emergency service. What's on your mind?";
  let conversation = [];

  try {
    conversation = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (!Array.isArray(conversation)) conversation = [];
  } catch (error) {
    conversation = [];
  }

  function saveConversation() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(conversation)); } catch (error) { console.warn("Could not save chat history.", error); }
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

  function currentTime() { return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); }
  function addBubble(text, sender, savedTime) {
    const bubble = document.createElement("div");
    bubble.className = "chat-bubble " + (sender === "user" ? "user-bubble" : "bot-bubble");
    const p = document.createElement("p");
    p.textContent = text;
    const time = document.createElement("time");
    time.className = "bubble-time";
    time.textContent = savedTime || currentTime();
    bubble.append(p, time);
    messagesList.appendChild(bubble);
    messagesList.scrollTop = messagesList.scrollHeight;
    return bubble;
  }

  const HELPLINES_TEXT = "For immediate support in Pakistan: Police Emergency 15; FIA Cyber Crime 1991; Umang Mental Health 0311-7786264; Child Protection 1121.";
  const CRISIS_KEYWORDS = ["abuse", "hurt", "hit", "beat", "scared", "afraid", "threat", "blackmail", "sextortion", "nude", "video", "police", "run away", "suicide", "kill myself", "die", "no hope", "end my life", "self-harm", "cutting"];
  const SUPPORT_KEYWORDS = ["sad", "lonely", "anxious", "depressed", "stress", "worried", "cry", "bully", "bullied", "bullying"];
  function detectIntent(text) {
    const value = text.toLowerCase();
    if (CRISIS_KEYWORDS.some((term) => value.includes(term))) return "crisis";
    if (SUPPORT_KEYWORDS.some((term) => value.includes(term))) return "support";
    return "general";
  }
  function getFallbackReply(rawText) {
    const intent = detectIntent(rawText);
    if (intent === "crisis") return "I'm sorry this is happening. You do not deserve to be hurt, threatened, or blackmailed. I am not an emergency service, but if there is immediate danger, call emergency services now or move to a safer place with a trusted adult. Please tell a trusted adult, teacher, counselor, or family member what is happening. " + HELPLINES_TEXT;
    if (intent === "support") return "Thank you for sharing that. Your feelings matter, and you deserve support. I am an automated tool, not a counselor, but it may help to tell a trusted adult, teacher, counselor, or family member. " + HELPLINES_TEXT;
    return "Thanks for messaging SafeVoice. I cannot reach the full assistant right now. I can’t handle emergencies; if you feel unsafe, contact a trusted adult or emergency support. " + HELPLINES_TEXT;
  }

  if (conversation.length > 0) {
    conversation.forEach((message) => addBubble(message.content, message.role === "user" ? "user" : "bot"));
  } else {
    addBubble(WELCOME, "bot");
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (isComposing) await new Promise((resolve) => setTimeout(resolve, 150));
    const text = input.value.trim();
    if (!text) return;
    addBubble(text, "user");
    conversation.push({ role: "user", content: text });
    saveConversation();
    input.value = "";
    input.disabled = true;
    const sendBtn = document.getElementById("chatSendBtn");
    if (sendBtn) sendBtn.disabled = true;
    const typingBubble = addBubble("Thinking...", "bot");

    try {
      const response = await fetch(AI_CHAT_API_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: conversation }) });
      const data = await response.json();
      if (!response.ok || typeof data.reply !== "string") throw new Error(data.error || "Chat request failed.");
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
      if (sendBtn) sendBtn.disabled = false;
      input.focus();
    }
  });
}
