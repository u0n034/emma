const SAVE_KEY = 'ema-english-quest-v2';

const state = {
  screen: 'home',
  stageIndex: 0,
  missionIndex: 0,
  missions: [],
  stats: null,
  selected: null,
  result: null,
  feedback: '',
  audioStatus: '',
  progress: loadProgress(),
};

let preferredVoice = null;
let currentAudio = null;

function loadVoices() {
  const voices = speechSynthesis.getVoices();
  const englishVoices = voices.filter((voice) => voice.lang.startsWith('en'));
  preferredVoice =
    englishVoices.find((voice) => /samantha|ava|karen|serena|female|child|kid/i.test(voice.name)) ||
    englishVoices.find((voice) => voice.lang === 'en-US') ||
    englishVoices[0] ||
    null;
}

if ('speechSynthesis' in window) {
  loadVoices();
  speechSynthesis.onvoiceschanged = loadVoices;
}

function audioId(text) {
  let hash = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
}

function playAudioFile(text) {
  window.emaAudioStatus = { text, status: 'loading' };
  state.audioStatus = '音をじゅんび中';
  updateAudioStatus();
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
  const audio = document.createElement('audio');
  audio.src = `audio/${audioId(text)}.m4a`;
  audio.preload = 'auto';
  audio.volume = 1;
  audio.onplaying = () => {
    window.emaAudioStatus = { text, status: 'playing', src: audio.currentSrc };
    state.audioStatus = '音をさいせい中';
    updateAudioStatus();
  };
  audio.onended = () => {
    window.emaAudioStatus = { text, status: 'ended', src: audio.currentSrc };
    state.audioStatus = '';
    updateAudioStatus();
  };
  audio.onerror = () => {
    window.emaAudioStatus = { text, status: 'error', src: audio.currentSrc };
    state.audioStatus = '音をさいせいできません';
    updateAudioStatus();
  };
  currentAudio = audio;
  return audio.play();
}

function speak(text, rate = 0.78) {
  const firstLine = text.split('\n').map((line) => line.trim()).find(Boolean);
  if (firstLine) {
    try {
      playAudioFile(firstLine).catch(() => {
        state.audioStatus = '音をさいせいできません';
        updateAudioStatus();
        speakWithBrowser(text, rate);
      });
    } catch {
      state.audioStatus = '音をさいせいできません';
      updateAudioStatus();
      speakWithBrowser(text, rate);
    }
    return;
  }
  speakWithBrowser(text, rate);
}

function updateAudioStatus() {
  const status = document.getElementById('audio-status');
  if (status) status.textContent = state.audioStatus;
}

function speakWithBrowser(text, rate = 0.78) {
  if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) return;
  speechSynthesis.cancel();
  speechSynthesis.resume();
  text.split('\n').filter(Boolean).forEach((line, index) => {
    const utterance = new SpeechSynthesisUtterance(line.trim());
    utterance.lang = 'en-US';
    utterance.rate = rate;
    utterance.pitch = 1.08;
    if (preferredVoice) utterance.voice = preferredVoice;
    if (index > 0) utterance.rate = rate * 0.96;
    speechSynthesis.speak(utterance);
  });
}

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(SAVE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveProgress() {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state.progress));
}

function $(selector, root = document) {
  return root.querySelector(selector);
}

function clean(text) {
  return text.replace(/[?.!]/g, '').replace(/,/g, '').trim();
}

function shuffle(items) {
  const copy = items.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function sample(items, count, avoid = []) {
  const blocked = new Set(avoid);
  return shuffle([...new Set(items)].filter((item) => !blocked.has(item))).slice(0, count);
}

function wordLabel(key) {
  return WORDS[key]?.say || key;
}

function wordInfo(key) {
  return WORDS[key] || { ja: key, icon: '✨', type: 'word' };
}

function wordsForOptions(correctKey) {
  const correct = wordInfo(correctKey);
  const pool = Object.keys(WORDS).filter((key) => WORDS[key].type === correct.type);
  return shuffle([correctKey, ...sample(pool, 3, [correctKey])]);
}

function phraseOptions(line, stageLines) {
  return shuffle([line, ...sample(stageLines, 3, [line])]);
}

function phraseJa(line) {
  const text = clean(line);
  const lower = text.toLowerCase();
  const replacements = [
    [/^I like (.+)$/i, (_, obj) => `わたしは${jaWord(obj)}がすき`],
    [/^I drink (.+)$/i, (_, obj) => `わたしは${jaWord(obj)}をのむ`],
    [/^I eat (.+)$/i, (_, obj) => `わたしは${jaWords(obj)}をたべる`],
    [/^I cook (.+)$/i, (_, obj) => `わたしは${jaWord(obj)}をつくる`],
    [/^I play (.+)$/i, (_, obj) => `わたしは${jaWord(obj)}をする`],
    [/^I watch (.+)$/i, (_, obj) => `わたしは${jaWord(obj)}をみる`],
    [/^I teach (.+)$/i, (_, obj) => `わたしは${jaWord(obj)}をおしえる`],
    [/^I study (.+)$/i, (_, obj) => `わたしは${jaWord(obj)}をべんきょうする`],
    [/^I want a (.+)$/i, (_, obj) => `わたしは${jaWord(obj)}がほしい`],
    [/^I want the (.+)$/i, (_, obj) => `わたしは${jaWord(obj === 'watch' ? 'watchNoun' : obj)}がほしい`],
    [/^I want (.+)$/i, (_, obj) => `わたしは${jaWord(obj)}がほしい`],
    [/^I drive a (.+)$/i, (_, obj) => `わたしは${jaWord(obj)}をうんてんする`],
    [/^I have (.+)$/i, (_, obj) => `わたしは${jaWords(obj)}をもっている`],
    [/^I read in the (.+)$/i, (_, place) => `わたしは${jaWord(place)}でよむ`],
    [/^I sing in the (.+)$/i, (_, place) => `わたしは${jaWord(place)}でうたう`],
    [/^I play in the (.+)$/i, (_, place) => `わたしは${jaWord(place)}であそぶ`],
    [/^I live in (.+)$/i, (_, place) => `わたしは${jaWord(place)}にすんでいる`],
    [/^I swim after (.+)$/i, (_, time) => `わたしは${jaWord(time)}のあとにおよぐ`],
    [/^I run after (.+)$/i, (_, time) => `わたしは${jaWord(time)}のあとにはしる`],
    [/^I study before (.+)$/i, (_, time) => `わたしは${jaWord(time)}のまえにべんきょうする`],
    [/^I eat at (.+)$/i, (_, time) => `わたしは${jaWord(time)}にたべる`],
    [/^Do you drive a (.+)$/i, (_, obj) => `あなたは${jaWord(obj)}をうんてんする？`],
    [/^Do you play (.+)$/i, (_, obj) => `あなたは${jaWord(obj)}をする？`],
    [/^Do you eat (.+)$/i, (_, obj) => `あなたは${jaWord(obj)}をたべる？`],
  ];
  const fixed = {
    'yes i do': 'うん、するよ',
    "no i don't": 'ううん、しないよ',
    'which do you want': 'どっちがほしい？',
    'what color do you want': 'なにいろがほしい？',
    'what animal do you like': 'なんのどうぶつがすき？',
    'where do you play': 'どこであそぶ？',
    'where do you live': 'どこにすんでいる？',
    'when do you study': 'いつべんきょうする？',
    'when do you eat dinner': 'いつばんごはんをたべる？',
    'do you live here': 'ここにすんでいるの？',
    'yes come in': 'うん、はいって！',
    'are you hungry': 'おなかすいた？',
    'yes i am': 'うん、すいたよ',
    "let's eat dinner": 'ばんごはんをたべよう！',
    'what juice do you want': 'なんのジュースがほしい？',
    'i want apple juice': 'りんごジュースがほしい',
    'yummy': 'おいしい！',
    'run': 'はしって！',
  };
  if (fixed[lower]) return fixed[lower];
  for (const [pattern, make] of replacements) {
    const match = text.match(pattern);
    if (match) return make(...match);
  }
  return line;
}

function jaWord(raw) {
  const key = raw.trim();
  return wordInfo(key).ja;
}

function jaWords(raw) {
  return raw.split(' ').map((part) => jaWord(part)).join('');
}

function iconForLine(line) {
  const parts = clean(line).split(' ');
  const hit = [...parts].reverse().find((part) => WORDS[part] || (part === 'watch' && line.includes('the watch')));
  if (line.includes('apple juice')) return wordInfo('apple juice').icon;
  if (line.includes('the watch')) return wordInfo('watchNoun').icon;
  return hit ? wordInfo(hit).icon : '✨';
}

function buildMissions(stage) {
  const wordMissions = stage.words.map((key) => ({
    kind: 'word',
    id: `word:${key}`,
    key,
    choices: wordsForOptions(key),
  }));
  const uniqueStageLines = [...new Set(stage.lines)];
  const phraseMissions = uniqueStageLines.map((line) => ({
    kind: 'meaning',
    id: `meaning:${line}`,
    line,
    choices: phraseOptions(line, uniqueStageLines),
  }));
  const translateMissions = uniqueStageLines.map((line) => ({
    kind: 'translate',
    id: `translate:${line}`,
    line,
    choices: phraseOptions(line, uniqueStageLines),
  }));
  const speakMissions = stage.lines.map((line) => ({
    kind: 'say',
    id: `say:${line}`,
    line,
  }));
  return [...wordMissions, ...phraseMissions, ...translateMissions, ...speakMissions];
}

function freshStats(missions) {
  return {
    baseTotal: missions.length,
    score: 0,
    streak: 0,
    bestStreak: 0,
    correct: 0,
    wrong: 0,
  };
}

function startStage(index) {
  const missions = buildMissions(STAGES[index]);
  state.stageIndex = index;
  state.missionIndex = 0;
  state.selected = null;
  state.result = null;
  state.feedback = '';
  state.missions = missions;
  state.stats = freshStats(missions);
  state.screen = 'play';
  render();
}

function completeMission() {
  const stage = STAGES[state.stageIndex];
  state.selected = null;
  state.result = null;
  state.feedback = '';
  state.missionIndex += 1;
  if (state.missionIndex >= state.missions.length) {
    const stars = stageStars();
    state.progress[stage.id] = Math.max(state.progress[stage.id] || 0, stars);
    saveProgress();
    state.screen = 'stageDone';
  }
  render();
}

function stageStars() {
  if (!state.stats || state.stats.wrong === 0) return 3;
  if (state.stats.wrong <= 2) return 2;
  return 1;
}

function addRetry(mission) {
  const retry = {
    ...mission,
    choices: mission.choices ? shuffle(mission.choices) : mission.choices,
    retryCount: (mission.retryCount || 0) + 1,
  };
  const insertAt = Math.min(state.missions.length, state.missionIndex + 4);
  state.missions.splice(insertAt, 0, retry);
}

function answerMission(isCorrect, correctSpeech, wrongSpeech) {
  if (state.result) return;
  if (isCorrect) {
    const bonus = 10 + Math.min(state.stats.streak, 5);
    state.stats.score += bonus;
    state.stats.streak += 1;
    state.stats.bestStreak = Math.max(state.stats.bestStreak, state.stats.streak);
    state.stats.correct += 1;
    state.result = {
      status: 'right',
      title: 'せいかい！',
      message: `+${bonus} てん`,
    };
    if (correctSpeech) speak(correctSpeech, 0.74);
  } else {
    state.stats.wrong += 1;
    state.stats.streak = 0;
    addRetry(state.missions[state.missionIndex]);
    state.result = {
      status: 'wrong',
      title: 'もういちど あとででるよ',
      message: `こたえ: ${wrongSpeech}`,
    };
    if (wrongSpeech) speak(wrongSpeech, 0.74);
  }
  render();
}

function render() {
  const app = document.getElementById('app');
  app.innerHTML = '';
  if (state.screen === 'home') app.appendChild(renderHome());
  if (state.screen === 'play') app.appendChild(renderPlay());
  if (state.screen === 'stageDone') app.appendChild(renderStageDone());
}

function renderHome() {
  const root = document.createElement('main');
  root.className = 'screen home';
  const done = STAGES.filter((stage) => state.progress[stage.id]).length;
  root.innerHTML = `
    <section class="hero">
      <div class="hero-kicker">Ema English Quest</div>
      <h1>えまちゃんの<br>えいごクエスト</h1>
      <div class="hero-progress">
        <span>${done}/${STAGES.length}</span>
        <div><i style="width:${(done / STAGES.length) * 100}%"></i></div>
      </div>
    </section>
    <section class="stage-list"></section>
  `;
  const list = $('.stage-list', root);
  STAGES.forEach((stage, index) => {
    const stars = state.progress[stage.id] || 0;
    const button = document.createElement('button');
    button.className = `stage-card ${stars ? 'done' : ''}`;
    button.innerHTML = `
      <span class="stage-number">${index + 1}</span>
      <span class="stage-badge">${stage.badge}</span>
      <span class="stage-title">${stage.title}</span>
      <span class="stage-stars">${'★'.repeat(stars)}${'☆'.repeat(3 - stars)}</span>
    `;
    button.onclick = () => startStage(index);
    list.appendChild(button);
  });
  return root;
}

function renderPlay() {
  const stage = STAGES[state.stageIndex];
  const mission = state.missions[state.missionIndex];
  const root = document.createElement('main');
  const percent = Math.round((state.missionIndex / state.missions.length) * 100);
  root.className = `screen play ${mission.kind}`;
  root.innerHTML = `
    <header class="topbar">
      <button class="icon-btn" id="home" aria-label="ホームへ">⌂</button>
      <div class="stage-chip"><span>${stage.badge}</span>${stage.title}</div>
      <div class="mini-count">${state.missionIndex + 1}/${state.missions.length}</div>
    </header>
    <div class="scoreline">
      <span>⭐ ${state.stats.score}</span>
      <span>🔥 ${state.stats.streak}</span>
      <span>💎 ${state.stats.correct}</span>
      <span>🔁 ${state.stats.wrong}</span>
    </div>
    <div class="audio-status" id="audio-status">${state.audioStatus}</div>
    <div class="bar"><i style="width:${percent}%"></i></div>
    <section class="mission"></section>
  `;
  $('#home', root).onclick = () => {
    state.screen = 'home';
    render();
  };
  $('.mission', root).appendChild(
    mission.kind === 'word' ? renderWordMission(mission) :
    mission.kind === 'meaning' ? renderMeaningMission(mission) :
    mission.kind === 'translate' ? renderTranslateMission(mission) :
    renderSayMission(mission)
  );
  return root;
}

function choiceClass(isCorrect, isSelected, extra = '') {
  const resultClass = state.result && isCorrect ? 'right' : '';
  const selectedClass = state.result && isSelected && !isCorrect ? 'wrong' : '';
  return ['choice-row', extra, resultClass, selectedClass].filter(Boolean).join(' ');
}

function renderResult() {
  if (!state.result) return '';
  return `
    <div class="result ${state.result.status}">
      <strong>${state.result.title}</strong>
      <span>${state.result.message}</span>
      <button class="next-btn" id="next">つぎへ</button>
    </div>
  `;
}

function bindResult(root) {
  const next = $('#next', root);
  if (next) next.onclick = completeMission;
}

function renderWordMission(mission) {
  const root = document.createElement('div');
  const info = wordInfo(mission.key);
  const spoken = wordLabel(mission.key);
  root.className = 'mission-inner';
  root.innerHTML = `
    <div class="mode-label">ことば</div>
    <button class="sound-orb" id="listen">${info.icon}</button>
    <button class="listen-btn small" id="listen-word">きく</button>
    <h2>${info.ja}</h2>
    <div class="choice-grid"></div>
    ${renderResult()}
  `;
  $('#listen', root).onclick = () => speak(spoken, 0.72);
  $('#listen-word', root).onclick = () => speak(spoken, 0.72);
  const grid = $('.choice-grid', root);
  mission.choices.forEach((key) => {
    const option = document.createElement('div');
    option.className = choiceClass(key === mission.key, state.selected === key);
    option.innerHTML = `
      <button class="choice-text" type="button">${wordLabel(key)}</button>
      <button class="choice-sound" type="button" aria-label="${wordLabel(key)}をきく">▶</button>
    `;
    $('.choice-sound', option).onclick = (event) => {
      event.stopPropagation();
      speak(wordLabel(key), 0.72);
    };
    const choose = () => {
      if (state.result) return;
      state.selected = key;
      answerMission(key === mission.key, wordLabel(mission.key), wordLabel(mission.key));
    };
    option.onclick = choose;
    $('.choice-text', option).onclick = choose;
    grid.appendChild(option);
  });
  bindResult(root);
  return root;
}

function renderMeaningMission(mission) {
  const root = document.createElement('div');
  root.className = 'mission-inner';
  root.innerHTML = `
    <div class="mode-label">いみ</div>
    <button class="sound-orb" id="listen">${iconForLine(mission.line)}</button>
    <button class="listen-btn small" id="listen-line">きく</button>
    <div class="english-line">${mission.line}</div>
    <div class="choice-grid meanings"></div>
    ${renderResult()}
  `;
  $('#listen', root).onclick = () => speak(mission.line);
  $('#listen-line', root).onclick = () => speak(mission.line);
  const grid = $('.choice-grid', root);
  mission.choices.forEach((line) => {
    const option = document.createElement('div');
    option.className = choiceClass(line === mission.line, state.selected === line, 'meaning');
    option.innerHTML = `
      <button class="choice-text" type="button">${phraseJa(line)}</button>
      <button class="choice-sound" type="button" aria-label="${line}をきく">▶</button>
    `;
    $('.choice-sound', option).onclick = (event) => {
      event.stopPropagation();
      speak(line, 0.76);
    };
    const choose = () => {
      if (state.result) return;
      state.selected = line;
      answerMission(line === mission.line, mission.line, mission.line);
    };
    option.onclick = choose;
    $('.choice-text', option).onclick = choose;
    grid.appendChild(option);
  });
  window.setTimeout(() => speak(mission.line), 120);
  bindResult(root);
  return root;
}

function renderTranslateMission(mission) {
  const root = document.createElement('div');
  root.className = 'mission-inner';
  root.innerHTML = `
    <div class="mode-label">にほんご → えいご</div>
    <div class="big-icon">${iconForLine(mission.line)}</div>
    <div class="ja-line prompt">${phraseJa(mission.line)}</div>
    <div class="choice-grid meanings"></div>
    ${renderResult()}
  `;
  const grid = $('.choice-grid', root);
  mission.choices.forEach((line) => {
    const option = document.createElement('div');
    option.className = choiceClass(line === mission.line, state.selected === line, 'meaning english-choice');
    option.innerHTML = `
      <button class="choice-text" type="button">${line}</button>
      <button class="choice-sound" type="button" aria-label="${line}をきく">▶</button>
    `;
    $('.choice-sound', option).onclick = (event) => {
      event.stopPropagation();
      speak(line, 0.76);
    };
    const choose = () => {
      if (state.result) return;
      state.selected = line;
      answerMission(line === mission.line, mission.line, mission.line);
    };
    option.onclick = choose;
    $('.choice-text', option).onclick = choose;
    grid.appendChild(option);
  });
  bindResult(root);
  return root;
}

function renderSayMission(mission) {
  const root = document.createElement('div');
  root.className = 'mission-inner say-box';
  root.innerHTML = `
    <div class="mode-label">まねしていう</div>
    <div class="big-icon">${iconForLine(mission.line)}</div>
    <div class="ja-line">${phraseJa(mission.line)}</div>
    <div class="say-line">${mission.line}</div>
    <button class="listen-btn" id="listen">きく</button>
    <div class="say-actions">
      <button class="soft-btn" id="again">あとで もういっかい</button>
      <button class="main-btn" id="done">いえた！</button>
    </div>
    ${renderResult()}
  `;
  $('#listen', root).onclick = () => speak(mission.line, 0.72);
  $('#done', root).onclick = () => answerMission(true, mission.line, mission.line);
  $('#again', root).onclick = () => answerMission(false, mission.line, mission.line);
  window.setTimeout(() => speak(mission.line, 0.72), 120);
  bindResult(root);
  return root;
}

function renderStageDone() {
  const stage = STAGES[state.stageIndex];
  const nextIndex = Math.min(state.stageIndex + 1, STAGES.length - 1);
  const stars = stageStars();
  const root = document.createElement('main');
  root.className = 'screen done';
  root.innerHTML = `
    <div class="done-badge">${stage.badge}</div>
    <h1>ステージクリア！</h1>
    <p>${stage.title}</p>
    <div class="stars">${'★'.repeat(stars)}${'☆'.repeat(3 - stars)}</div>
    <div class="done-stats">
      <span>⭐ ${state.stats.score}てん</span>
      <span>🔥 ${state.stats.bestStreak}れんぞく</span>
      <span>🔁 ${state.stats.wrong}かい</span>
    </div>
    <button class="main-btn" id="next">${state.stageIndex === STAGES.length - 1 ? 'もういちど' : 'つぎへ'}</button>
    <button class="soft-btn" id="home">ステージをえらぶ</button>
  `;
  $('#next', root).onclick = () => startStage(state.stageIndex === STAGES.length - 1 ? state.stageIndex : nextIndex);
  $('#home', root).onclick = () => {
    state.screen = 'home';
    render();
  };
  return root;
}

document.addEventListener('DOMContentLoaded', render);
