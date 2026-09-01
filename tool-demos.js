(function(){
  "use strict";

  const SINO_WORDS = Array.isArray(window.HuToolDemoTerms) ? window.HuToolDemoTerms : [];
  const MAX_WORD_EXAMPLES = 2000;

  // These examples contain polyphonic characters. Keep their word-specific
  // Sino readings separate from the character-level dictionary entries.
  const WORD_CONTEXT_SINO_READINGS = Object.freeze({
    "社會": ["sáh", "hwàei"],
    "學校": ["haek", "hiàew"],
    "科學": ["kwa", "haek"],
    "教育": ["gàw", "yuk"],
    "經濟": ["geng", "zì"],
    "政治": ["zhìng", "zhỳ"],
    "數學": ["shù", "haek"],
    "銀行": ["in", "haeng"],
    "大學": ["dàei", "haek"],
    "中央": ["zhung", "'iang"],
    "井中之蛙": ["jíng", "zhung", "zhi", "'wa"],
    "馬耳東風": ["má", "ýr", "dung", "fung"],
    "切磋琢磨": ["cit", "caa", "zhak", "ma"],
    "同床異夢": ["dueng", "sang", "ỳ", "mùng"],
    "朝三暮四": ["zhew", "sam", "mò", "sì"],
    "四面楚歌": ["sì", "mèn", "chúh", "gaa"],
    "百發百中": ["baak", "fat", "baak", "zhung"],
    "千載一遇": ["cin", "záy", "'it", "ù"],
    "電光石火": ["dỳn", "gwang", "sik", "hwá"],
    "起死回生": ["kí", "sí", "hwaey", "shaang"],
    "大同小異": ["dàei", "dueng", "séu", "ỳ"],
    "自給自足": ["zì", "gip", "zì", "zoch"],
    "一網打盡": ["'it", "wáng", "dáang", "jín"],
    "四通八達": ["sì", "tung", "baat", "dats"]
  });

  const WORD_CONTEXT_MC = Object.freeze({
    "教育": { characterIndex: 0, initialMu: "見", rimeName: "肴", tone: "去" }
  });

  const TYPE_DELAY = 74;
  const DELETE_DELAY = 38;
  const INPUT_HOLD = 420;
  const OUTPUT_HOLD = 1900;

  function getReadingDetails(core, dictionary, char){
    return core.getCharReadingDetails(dictionary, char);
  }

  function pickPureReading(core, dictionary, char){
    const details = getReadingDetails(core, dictionary, char);
    return details.find((detail) => detail.readingType === core.READING_TYPE_PURE) || null;
  }

  function pickSinoReading(core, dictionary, char, preferredReading = ""){
    const details = getReadingDetails(core, dictionary, char)
      .filter((detail) => detail.readingType === core.READING_TYPE_SINO);
    if (preferredReading) return details.find((detail) => detail.reading === preferredReading) || details[0] || null;
    return details.length === 1 ? details[0] : null;
  }

  function randomInt(max){
    if (!Number.isInteger(max) || max < 1) return 0;
    if (window.crypto && typeof window.crypto.getRandomValues === "function") {
      const limit = Math.floor(0x100000000 / max) * max;
      const values = new Uint32Array(1);
      do {
        window.crypto.getRandomValues(values);
      } while (values[0] >= limit);
      return values[0] % max;
    }
    return Math.floor(Math.random() * max);
  }

  function shuffle(items){
    for (let index = items.length - 1; index > 0; index -= 1){
      const swapIndex = randomInt(index + 1);
      [items[index], items[swapIndex]] = [items[swapIndex], items[index]];
    }
    return items;
  }

  function sampleWordExamples(examples){
    const pool = shuffle([...examples]);
    if (pool.length <= MAX_WORD_EXAMPLES) return pool;
    return pool.slice(0, MAX_WORD_EXAMPLES);
  }

  function makeWordExamples(core, dictionary){
    const examples = SINO_WORDS.map((word) => {
      const chars = Array.from(word);
      const contextualReadings = WORD_CONTEXT_SINO_READINGS[word] || [];
      const sinoDetails = chars.map((char, index) =>
        pickSinoReading(core, dictionary, char, contextualReadings[index])
      );
      const displayDetails = chars.map((char, index) => {
        const pureReading = pickPureReading(core, dictionary, char);
        if (pureReading) return pureReading;
        if (contextualReadings[index]) {
          return { reading: contextualReadings[index], readingType: core.READING_TYPE_SINO };
        }
        return sinoDetails[index];
      });
      if (displayDetails.some((detail) => !detail) || sinoDetails.some((detail) => !detail)) return null;

      const mcIndex = chars.findIndex((char, index) => core.getCharacterEntries(dictionary, char)
        .some((entry) => entry && entry.mc && entry.reading === sinoDetails[index].reading));
      const mcOverride = WORD_CONTEXT_MC[word];
      const targetIndex = mcOverride ? mcOverride.characterIndex : (mcIndex === -1 ? 0 : mcIndex);
      const targetChar = chars[targetIndex];
      const targetReading = sinoDetails[targetIndex];
      const mcEntry = core.getCharacterEntries(dictionary, targetChar)
        .find((entry) => entry && entry.mc && entry.reading === targetReading.reading)
        || core.getCharacterEntries(dictionary, targetChar).find((entry) => entry && entry.mc);

      const mc = mcOverride || (mcEntry && mcEntry.mc);
      if (!mc) return null;

      const reading = displayDetails.map((detail) => detail.reading).join("");

      return {
        word,
        reading,
        targetChar,
        mc
      };
    }).filter(Boolean);

    return sampleWordExamples(examples);
  }

  function makeExamplePicker(examples){
    let deck = [];
    let previousIndex = -1;

    return () => {
      if (!deck.length) {
        deck = shuffle(examples.map((_, index) => index));
        // The next full cycle never begins with the example just shown.
        if (deck.length > 1 && deck[deck.length - 1] === previousIndex) {
          const swapIndex = randomInt(deck.length - 1);
          [deck[deck.length - 1], deck[swapIndex]] = [deck[swapIndex], deck[deck.length - 1]];
        }
      }
      previousIndex = deck.pop();
      return examples[previousIndex];
    };
  }

  function getDemoContent(kind, example, nextExample){

    if (kind === "reading") {
      return { input: example.reading, output: example.word };
    }

    if (kind === "mc") {
      return {
        input: `${example.mc.initialMu} / ${example.mc.rimeName} / ${example.mc.tone}`,
        output: example.targetChar
      };
    }

    if (kind === "text") {
      return {
        input: `${example.word}・${nextExample.word}`,
        output: `${example.reading} ・ ${nextExample.reading}`
      };
    }

    return { input: example.word, output: example.reading };
  }

  function startDemo(demo, examples){
    const kind = demo.dataset.toolDemo || "char";
    const inputEl = demo.querySelector("[data-demo-input]");
    const outputEl = demo.querySelector("[data-demo-output]");
    if (!inputEl || !outputEl || !examples.length) return;

    let timerId = null;
    const pickExample = makeExamplePicker(examples);
    let example = pickExample();
    let nextExample = kind === "text" ? pickExample() : example;
    let phase = "typeInput";
    let position = 0;
    let content = getDemoContent(kind, example, nextExample);

    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      inputEl.textContent = content.input;
      outputEl.textContent = content.output;
      demo.classList.add("is-static");
      return;
    }

    const schedule = (callback, delay) => {
      timerId = window.setTimeout(callback, delay);
    };

    const tick = () => {
      const inputChars = Array.from(content.input);
      const outputChars = Array.from(content.output);

      if (phase === "typeInput") {
        inputEl.textContent = inputChars.slice(0, position).join("");
        if (position < inputChars.length) {
          position += 1;
          schedule(tick, TYPE_DELAY + Math.random() * 24);
          return;
        }
        phase = "holdInput";
        schedule(tick, INPUT_HOLD);
        return;
      }

      if (phase === "holdInput") {
        phase = "typeOutput";
        position = 0;
        schedule(tick, TYPE_DELAY);
        return;
      }

      if (phase === "typeOutput") {
        outputEl.textContent = outputChars.slice(0, position).join("");
        if (position < outputChars.length) {
          position += 1;
          schedule(tick, TYPE_DELAY * 0.68);
          return;
        }
        phase = "holdOutput";
        schedule(tick, OUTPUT_HOLD);
        return;
      }

      if (phase === "holdOutput") {
        phase = "delete";
        position = Math.max(inputChars.length, outputChars.length);
        schedule(tick, DELETE_DELAY);
        return;
      }

      inputEl.textContent = inputChars.slice(0, Math.min(position, inputChars.length)).join("");
      outputEl.textContent = outputChars.slice(0, Math.min(position, outputChars.length)).join("");
      if (position > 0) {
        position -= 1;
        schedule(tick, DELETE_DELAY);
        return;
      }

      example = pickExample();
      nextExample = kind === "text" ? pickExample() : example;
      content = getDemoContent(kind, example, nextExample);
      phase = "typeInput";
      schedule(tick, TYPE_DELAY * 2);
    };

    demo.classList.add("is-playing");
    tick();

    window.addEventListener("pagehide", () => {
      if (timerId) window.clearTimeout(timerId);
    }, { once: true });
  }

  function start(dictionary){
    const demo = document.querySelector("[data-tool-demo]");
    const core = window.HuDictionaryCore;
    if (!demo || demo.dataset.demoReady === "true" || !core || !dictionary) return;

    const examples = makeWordExamples(core, dictionary);
    if (!examples.length) return;

    demo.dataset.demoReady = "true";
    startDemo(demo, examples);
  }

  window.HuToolDemos = { start };
})();
