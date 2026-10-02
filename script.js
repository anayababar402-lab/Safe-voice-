// ============================================================================
// SafeVoice — script.js
// Welcome → Nickname → Country → Quiz → Main Site → Chat
// ============================================================================

document.addEventListener("DOMContentLoaded", () => {
  initEntryFlow();
});

function initEntryFlow() {
  const welcomeScreen = document.getElementById("welcomeScreen");
  const nicknameScreen = document.getElementById("nicknameScreen");
  const countryScreen = document.getElementById("countryScreen");
  const quizScreen = document.getElementById("quizScreen");
  const mainSite = document.getElementById("mainSite");
  if (!welcomeScreen || !nicknameScreen || !countryScreen || !quizScreen || !mainSite) return;

  let nickname = sessionStorage.getItem("safevoice_nickname");
  let country = sessionStorage.getItem("safevoice_country");
  const quizDone = nickname && sessionStorage.getItem("safevoice_quiz_done_" + nickname) === "yes";

  if (nickname && country && quizDone) {
    hideAllScreens();
    mainSite.hidden = false;
    initMainSite(nickname, country);
    return;
  }
  if (nickname && !country) {
    hideAllScreens();
    countryScreen.hidden = false;
    populateCountryDropdown();
    attachCountryEvents(nickname);
    return;
  }
  if (nickname && country && !quizDone) {
    hideAllScreens();
    quizScreen.hidden = false;
    startQuiz(nickname, country);
    return;
  }

  hideAllScreens();
  welcomeScreen.hidden = false;

  const welcomeEnterBtn = document.getElementById("welcomeEnterBtn");
  const nicknameContinueBtn = document.getElementById("nicknameContinueBtn");
  const nicknameInput = document.getElementById("nicknameInput");
  const nicknameHint = document.getElementById("nicknameHint");

  if (welcomeEnterBtn) {
    welcomeEnterBtn.onclick = () => {
      hideAllScreens();
      nicknameScreen.hidden = false;
      setTimeout(() => nicknameInput && nicknameInput.focus(), 300);
    };
  }

  function continueWithNickname() {
    const nick = (nicknameInput?.value || "").trim();
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
    sessionStorage.setItem("safevoice_nickname", nick);
    nickname = nick;
    hideAllScreens();
    countryScreen.hidden = false;
    populateCountryDropdown();
    attachCountryEvents(nickname);
  }

  if (nicknameContinueBtn) nicknameContinueBtn.onclick = continueWithNickname;
  if (nicknameInput) {
    nicknameInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        continueWithNickname();
      }
    });
  }
}

function hideAllScreens() {
  ["welcomeScreen", "nicknameScreen", "countryScreen", "quizScreen"].forEach((id) => {
    const element = document.getElementById(id);
    if (element) element.hidden = true;
  });
}

function populateCountryDropdown() {
  const select = document.getElementById("countrySelect");
  if (!select || select.dataset.filled === "yes" || typeof HELPLINES === "undefined") return;
  Object.keys(HELPLINES)
    .sort((a, b) => {
      if (a === "OTHER") return 1;
      if (b === "OTHER") return -1;
      return HELPLINES[a].name.localeCompare(HELPLINES[b].name);
    })
    .forEach((key) => {
      const option = document.createElement("option");
      option.value = key;
      option.textContent = HELPLINES[key].flag + "  " + HELPLINES[key].name;
      select.appendChild(option);
    });
  select.dataset.filled = "yes";
}

function attachCountryEvents(nickname) {
  const select = document.getElementById("countrySelect");
  const button = document.getElementById("countryContinueBtn");
  const hint = document.getElementById("countryHint");
  if (!select || !button || !hint) return;
  button.onclick = () => {
    const country = select.value;
    if (!country) {
      hint.textContent = "Please select a country to continue.";
      hint.style.color = "#fb7185";
      return;
    }
    sessionStorage.setItem("safevoice_country", country);
    document.getElementById("countryScreen").hidden = true;
    document.getElementById("quizScreen").hidden = false;
    startQuiz(nickname, country);
  };
}

let QUIZ_STATE = { answers: {}, step: 0, nickname: "", country: "" };

function startQuiz(nickname, country) {
  QUIZ_STATE = { answers: {}, step: 0, nickname, country };
  renderQuizStep();
}

function renderQuizStep() {
  const body = document.getElementById("quizBody");
  const stepLabel = document.getElementById("quizStep");
  const progressFill = document.getElementById("quizProgressFill");
  const skipButton = document.getElementById("quizSkipBtn");
  if (!body || !stepLabel || !progressFill || !skipButton) return;

  skipButton.onclick = () => finishQuiz({ skipped: true });

  const selfQuestions = [
    { label: "Question 2", progress: "25%", question: "Where is this happening?", key: "q2", options: [["home", "🏠 At home"], ["school", "🏫 At school"], ["online", "📱 Online / on my phone"], ["unsure", "🤷 Somewhere else / not sure"]] },
    { label: "Question 3", progress: "40%", question: "How long has this been happening?", key: "q3", options: [["just", "📅 Just started"], ["weeks", "⏳ A few weeks"], ["months", "📆 Months"], ["long", "🕰️ A long time"]] },
    { label: "Question 4", progress: "55%", question: "How much is this affecting you?", key: "q4", options: [["very", "😟 It’s a lot — I’m scared"], ["serious", "😔 It’s really affecting me"], ["unsure", "😕 Not sure — I just know something’s wrong"], ["low", "😶 It’s not too serious — I just want to talk"]] },
    { label: "Question 5", progress: "70%", question: "Are you safe right now, in this moment?", key: "q5", options: [["safe", "✅ Yes, I’m okay right now"], ["unsafe", "⚠️ No, I’m scared right now"], ["notsure", "🤔 I’m not sure"]] },
    { label: "Question 6", progress: "82%", question: "Have you reached out to anyone before — a helpline, a teacher, or a trusted adult?", key: "q6", options: [["yes", "✅ Yes, I’ve told someone"], ["no", "❌ No, I haven’t told anyone"], ["tried", "🤔 I tried but nothing changed"]] },
    { label: "Question 7", progress: "95%", question: "Would you like help contacting someone who can protect you?", key: "q7", last: true, options: [["yes", "✅ Yes, show me who I can contact"], ["maybe", "💬 Maybe — let me think"], ["no", "❌ No — I just want to talk for now"]] }
  ];
  const otherQuestions = [
    { label: "Question 2", progress: "25%", question: "Who is this person to you?", key: "q2", options: [["friend", "👫 A friend"], ["sibling", "👨‍👩‍👧 A sibling"], ["student", "👦 A student"], ["otherperson", "🧑 Someone else"]] },
    { label: "Question 3", progress: "40%", question: "How serious does this feel?", key: "q3", options: [["very", "😟 Very serious — I’m worried about their safety"], ["serious", "😔 Serious — it’s really affecting them"], ["unsure", "😕 Not sure — I just noticed something wrong"]] },
    { label: "Question 4", progress: "55%", question: "Do you know if they’re safe right now?", key: "q4", options: [["safe", "✅ Yes, they’re safe"], ["unsafe", "⚠️ No, I’m worried about them"], ["notsure", "🤔 I don’t know"]] },
    { label: "Question 5", progress: "72%", question: "Have they told you what’s happening?", key: "q5", options: [["yes", "✅ Yes, they told me"], ["no", "❌ No, I just noticed something"], ["notsure", "🤔 I’m not sure"]] },
    { label: "Question 6", progress: "95%", question: "Would you like to know how to help them safely or contact a helpline on their behalf?", key: "q6", last: true, options: [["yes", "✅ Yes, please"], ["maybe", "💬 Maybe later"], ["no", "❌ No, I just want to talk"]] }
  ];

  if (QUIZ_STATE.step === 0) {
    stepLabel.textContent = "Question 1";
    progressFill.style.width = "10%";
    renderOptions(body, "Who needs help right now?", [["self", "🫂 Me — I’m being hurt or scared"], ["other", "👥 Someone I know"], ["talk", "💬 I just need to talk"]], (value) => {
      QUIZ_STATE.answers.q1 = value;
      if (value === "talk") finishQuiz(QUIZ_STATE.answers);
      else {
        QUIZ_STATE.step = 1;
        renderQuizStep();
      }
    });
    return;
  }

  const questions = QUIZ_STATE.answers.q1 === "self" ? selfQuestions : otherQuestions;
  const question = questions[QUIZ_STATE.step - 1];
  if (!question) return;
  stepLabel.textContent = question.label;
  progressFill.style.width = question.progress;
  renderOptions(body, question.question, question.options, (value) => {
    QUIZ_STATE.answers[question.key] = value;
    if (question.last) finishQuiz(QUIZ_STATE.answers);
    else {
      QUIZ_STATE.step += 1;
      renderQuizStep();
    }
  });
}

function renderOptions(container, question, options, onSelect) {
  container.textContent = "";
  const heading = document.createElement("div");
  heading.className = "quiz-question";
  heading.textContent = question;
  const list = document.createElement("div");
  list.className = "quiz-options";
  options.forEach(([value, label]) => {
    const button = document.createElement("button");
    button.className = "quiz-option";
    button.type = "button";
    button.textContent = label;
    button.onclick = () => onSelect(value);
    list.appendChild(button);
  });
  container.append(heading, list);
}

function finishQuiz(answers) {
  sessionStorage.setItem("safevoice_quiz_done_" + QUIZ_STATE.nickname, "yes");
  sessionStorage.setItem("safevoice_quiz_answers_" + QUIZ_STATE.nickname, JSON.stringify(answers));
  document.getElementById("quizScreen").hidden = true;
  document.getElementById("mainSite").hidden = false;
  initMainSite(QUIZ_STATE.nickname, QUIZ_STATE.country);
}

function initMainSite(nickname, countryKey) {
  initQuickExit();
  initGrounding();
  renderHelplines(countryKey);
  initChatWidget(nickname, countryKey);
}

function initQuickExit() {
  const button = document.getElementById("quickExitBtn");
  if (!button) return;
  button.onclick = () => window.location.replace("https://www.google.com");
}

function initGrounding() {
  const startButton = document.getElementById("startGroundingBtn");
  const resetButton = document.getElementById("resetGroundingBtn");
  const circle = document.getElementById("groundingCircle");
  const instruction = document.getElementById("groundingInstruction");
  if (!startButton || !resetButton || !circle || !instruction) return;
  const steps = [
    ["Breathe in slowly through your nose…", "inhale", 4000],
    ["Hold gently…", "inhale", 3000],
    ["Breathe out slowly through your mouth…", "exhale", 5000],
    ["Notice one thing you can see around you.", "", 3500],
    ["Notice one thing you can hear right now.", "", 3500]
  ];
  let running = false;
  startButton.onclick = async () => {
    running = true;
    startButton.disabled = true;
    resetButton.disabled = false;
    for (const [text, className, duration] of steps) {
      if (!running) return;
      instruction.textContent = text;
      circle.classList.remove("inhale", "exhale");
      if (className) circle.classList.add(className);
      await new Promise((resolve) => setTimeout(resolve, duration));
    }
    if (!running) return;
    instruction.textContent = "You made it through the exercise. You can start again anytime.";
    circle.classList.remove("inhale", "exhale");
    startButton.disabled = false;
  };
  resetButton.onclick = () => {
    running = false;
    circle.classList.remove("inhale", "exhale");
    instruction.textContent = "Click below to start a 5-step guided calming exercise.";
    startButton.disabled = false;
    resetButton.disabled = true;
  };
}

function renderHelplines(countryKey) {
  const grid = document.getElementById("helplinesGrid");
  const subtitle = document.getElementById("helplinesSubtitle");
  if (!grid || typeof HELPLINES === "undefined") return;
  const data = HELPLINES[countryKey] || HELPLINES.OTHER;
  if (subtitle) subtitle.textContent = "Helplines for " + data.flag + " " + data.name + ". Check official provider information before relying on a number.";
  grid.textContent = "";
  data.lines.forEach((line) => {
    const card = document.createElement("article");
    card.className = "helpline-card";
    const title = document.createElement("h4");
    title.textContent = line.label;
    const link = document.createElement("a");
    link.className = "helpline-number";
    link.textContent = line.number;
    const isUrl = line.number.includes(".") || line.number.includes("/");
    if (isUrl) {
      link.href = "https://" + line.number;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    } else {
      link.href = "tel:" + line.number.replace(/[^0-9+]/g, "");
    }
    const note = document.createElement("small");
    note.textContent = line.note;
    card.append(title, link, note);
    grid.appendChild(card);
  });
}

function initChatWidget(nickname, countryKey) {
  const launcher = document.getElementById("chatToggleLauncher");
  const navOpenButton = document.getElementById("navOpenChatBtn");
  const heroOpenButton = document.getElementById("heroOpenChatBtn");
  const chatWindow = document.getElementById("chatWindow");
  const closeButton = document.getElementById("chatCloseBtn");
  const clearButton = document.getElementById("chatClearBtn");
  const form = document.getElementById("chatMessageForm");
  const input = document.getElementById("chatTextInput");
  const messagesList = document.getElementById("chatMessagesList");
  const chatGreeting = document.getElementById("chatGreeting");
  if (!chatWindow || !form || !input || !messagesList) return;

  const endpoint = "https://safevoice-server-59yy.onrender.com/api/chat";
  const storageKey = "safevoice_history_" + nickname;
  if (chatGreeting) chatGreeting.textContent = "Hi, " + nickname + " • Automated support";
  let conversation = [];
  try { conversation = JSON.parse(sessionStorage.getItem(storageKey) || "[]"); } catch (_) { conversation = []; }

  const save = () => {
    try { sessionStorage.setItem(storageKey, JSON.stringify(conversation)); } catch (_) {}
  };
  const now = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  function addBubble(text, sender) {
    const bubble = document.createElement("div");
    bubble.className = "chat-bubble " + (sender === "user" ? "user-bubble" : "bot-bubble");
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    const time = document.createElement("time");
    time.className = "bubble-time";
    time.textContent = now();
    bubble.append(paragraph, time);
    messagesList.appendChild(bubble);
    messagesList.scrollTop = messagesList.scrollHeight;
    return bubble;
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
  if (launcher) launcher.onclick = openChat;
  if (navOpenButton) navOpenButton.onclick = openChat;
  if (heroOpenButton) heroOpenButton.onclick = openChat;
  if (closeButton) closeButton.onclick = closeChat;

  const data = (typeof HELPLINES !== "undefined" && (HELPLINES[countryKey] || HELPLINES.OTHER));
  const helplinesText = data ? "Contacts for " + data.flag + " " + data.name + ": " + data.lines.map((line) => line.label + ": " + line.number).join(" • ") + "." : "Please contact local emergency services or a trusted adult if you are in immediate danger.";
  function fallback(text) {
    const value = text.toLowerCase();
    const crisisWords = ["abuse", "hurt", "hit", "beat", "scared", "afraid", "threat", "blackmail", "sextortion", "suicide", "kill myself", "die", "end my life", "self-harm", "cutting", "unsafe"];
    const supportWords = ["sad", "lonely", "anxious", "depressed", "stress", "worried", "cry", "bully", "bullied", "bullying"];
    if (crisisWords.some((word) => value.includes(word))) return "I’m sorry you’re going through this. You do not deserve to be hurt or threatened. I’m automated and not an emergency service. If you can, tell a trusted adult now and contact emergency services if there is immediate danger. " + helplinesText;
    if (supportWords.some((word) => value.includes(word))) return "Thank you for sharing that. Your feelings matter. I’m automated and cannot replace a qualified counselor, but a trusted adult or support service may be able to help. " + helplinesText;
    return "I’m having trouble reaching the automated assistant right now. I cannot handle emergencies. If you feel unsafe, contact a trusted adult, local emergency services, or a support line. " + helplinesText;
  }
  function welcomeMessage() {
    const savedQuiz = sessionStorage.getItem("safevoice_quiz_answers_" + nickname);
    if (savedQuiz) {
      try {
        const answers = JSON.parse(savedQuiz);
        if (answers.q4 === "very" || answers.q5 === "unsafe") return "Hi " + nickname + ". Based on options selected earlier in this browser, things may feel serious right now. Would you like to view helplines for your country, or would you prefer to talk?";
        if (answers.q7 === "yes" || answers.q6 === "yes") return "Hi " + nickname + ". You selected earlier that you may want help reaching out. We can go slowly. What is happening?";
        if (answers.q1 === "talk") return "Hi " + nickname + ". No questions and no pressure. What is on your mind?";
      } catch (_) {}
    }
    return "Hi " + nickname + ". I’m an automated assistant, not a human counsellor or emergency service. Please do not share your real name, address, school, phone number, passwords, location, or private images. What would you like support with?";
  }
  function startFreshChat() {
    messagesList.textContent = "";
    const message = welcomeMessage();
    addBubble(message, "bot");
    conversation = [{ role: "assistant", content: message }];
    save();
  }
  if (conversation.length) conversation.forEach((message) => addBubble(message.content, message.role === "user" ? "user" : "bot"));
  else startFreshChat();

  if (clearButton) {
    clearButton.onclick = () => {
      conversation = [];
      sessionStorage.removeItem(storageKey);
      startFreshChat();
    };
  }

  form.onsubmit = async (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    addBubble(text, "user");
    conversation.push({ role: "user", content: text });
    save();
    input.value = "";
    input.disabled = true;
    const typing = addBubble("Thinking…", "bot");
    try {
      const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: conversation }) });
      const payload = await response.json();
      if (!response.ok || !payload.reply) throw new Error("Chat request failed.");
      typing.querySelector("p").textContent = payload.reply;
      conversation.push({ role: "assistant", content: payload.reply });
      save();
    } catch (error) {
      const reply = fallback(text);
      typing.querySelector("p").textContent = reply;
      conversation.push({ role: "assistant", content: reply });
      save();
    } finally {
      input.disabled = false;
      input.focus();
    }
  };
}
