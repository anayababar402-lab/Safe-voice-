// SafeVoice SafeChat — simple rule-based helper (NOT a human, NOT emergency)

const SAFECHAT_KEYWORDS = {
  crisis: [
    "abuse", "hurt", "hit", "beat", "scared", "afraid", "threat", "blackmail",
    "sextortion", "nude", "image", "video", "police", "run away", "suicide",
    "kill myself", "die", "no hope", "end my life", "self-harm", "cutting"
  ],
  support: [
    "sad", "lonely", "anxious", "depressed", "stress", "worried", "cry", "help"
  ]
};

const HELPLINES = `
<strong>If you are in immediate danger, call your local emergency number.</strong><br>
Pakistan:<br>
- Child protection helpline: <strong>1121</strong><br>
- Emergency: <strong>112</strong><br>
- FIA Cyber Crime: <strong>1991</strong><br>
- Digital Rights Foundation Helpline: <strong>0800-39393</strong><br>
`;

function detectIntent(text) {
  const t = text.toLowerCase();
  for (const w of SAFECHAT_KEYWORDS.crisis) {
    if (t.includes(w)) return "crisis";
  }
  for (const w of SAFECHAT_KEYWORDS.support) {
    if (t.includes(w)) return "support";
  }
  return "general";
}

function botReply(text) {
  const intent = detectIntent(text);

  if (intent === "crisis") {
    return (
      "I'm really sorry you're going through this. You don't deserve to be hurt or threatened. " +
      "This chat is not a human and not an emergency service, but your safety matters. " +
      "If you can, please tell a trusted adult (parent, relative, teacher, counselor) what is happening. " +
      "You can also contact a helpline:<br><br>" +
      HELPLINES +
      "You are not alone, and it's brave to reach out."
    );
  }

  if (intent === "support") {
    return (
      "Thank you for sharing how you feel. Many people go through hard times, and your feelings are valid. " +
      "This chat is automated and not a replacement for a counselor, but you deserve support. " +
      "If possible, try to talk to a trusted adult or a mental-health helpline:<br><br>" +
      HELPLINES +
      "If you'd like, you can tell me a bit more about what's on your mind."
    );
  }

  // General / non-crisis
  return (
    "Thanks for messaging SafeVoice. This is an automated helper, not a human. " +
    "I can share general safety information, but I can't handle emergencies. " +
    "If you ever feel unsafe or in crisis, please contact a trusted adult or a helpline:<br><br>" +
    HELPLINES +
    "You can ask me things like: 'What is abuse?', 'How can I stay safe online?', or 'Where can I get help?'"
  );
}

function initSafeChat() {
  const form = document.getElementById("safechat-form");
  const input = document.getElementById("safechat-input");
  const messagesBox = document.getElementById("safechat-messages");

  function addMessage(text, isUser = false) {
    const div = document.createElement("div");
    div.className = "safechat-message " + (isUser ? "user" : "bot");
    div.innerHTML = text;
    messagesBox.appendChild(div);
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, true);
    const reply = botReply(text);
    setTimeout(() => addMessage(reply, false), 300);
    input.value = "";
  });

  // Welcome message
  addMessage(
    "Hi, I'm the SafeVoice helper. I'm not a human and not an emergency service. " +
    "You can ask me about safety, support, or tell me what's on your mind. " +
    "If you're in danger, please contact a trusted adult or a helpline."
  );
}

document.addEventListener("DOMContentLoaded", initSafeChat);
