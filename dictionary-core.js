(function(){
  const root = typeof window !== "undefined" ? window : globalThis;

  const LOCAL_SOURCE_NAME = "Kuankhiunn0704.txt";
  const LOCAL_BUNDLE_NAME = "Kuankhiunn0704.txt.js";
  const COMB_ACUTE = "\u0301";
  const COMB_GRAVE = "\u0300";

  let bundledLocalTextCache = null;

  function escapeHtml(s){
    return String(s).replace(/[&<>"']/g, c => ({
      "&":"&amp;",
      "<":"&lt;",
      ">":"&gt;",
      "\"":"&quot;",
      "'":"&#39;"
    }[c]));
  }

  function normalizeTextUrl(url){
    const m = String(url).match(/^https:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\/([^/]+)\/(.+)$/);
    if (m){
      const [, user, repo, branch, path] = m;
      return `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${path}`;
    }
    return url;
  }

  function getBundledLocalText(){
    if (typeof root.__KUANKHIUNN_TEXT__ === "string" && root.__KUANKHIUNN_TEXT__.length > 0) {
      return root.__KUANKHIUNN_TEXT__;
    }
    if (typeof bundledLocalTextCache === "string") return bundledLocalTextCache;
    if (typeof root.__KUANKHIUNN_TEXT_BASE64__ !== "string" || root.__KUANKHIUNN_TEXT_BASE64__.length === 0) {
      return null;
    }
    try{
      const binary = atob(root.__KUANKHIUNN_TEXT_BASE64__);
      const bytes = Uint8Array.from(binary, ch => ch.charCodeAt(0));
      bundledLocalTextCache = new TextDecoder("utf-8").decode(bytes);
      return bundledLocalTextCache;
    }catch(_err){
      return null;
    }
  }

  function isBundledLocalSource(rawUrl){
    const trimmed = String(rawUrl || "").trim();
    if (!trimmed) return true;
    if (/^(?:https?|blob|data):/i.test(trimmed)) return false;
    try{
      const resolved = new URL(trimmed, root.location ? root.location.href : "file:///");
      const pathname = decodeURIComponent(resolved.pathname || "");
      return pathname.endsWith(`/${LOCAL_SOURCE_NAME}`) || pathname === LOCAL_SOURCE_NAME;
    }catch(_err){
      return /(^|\/)Kuankhiunn0704\.txt$/i.test(trimmed);
    }
  }

  async function loadTextFromSource(rawUrl){
    const trimmed = String(rawUrl || "").trim();
    if (!trimmed) throw new Error("URLが空です。");

    const normalizedUrl = normalizeTextUrl(trimmed);
    const isFileProtocol = !!(root.location && root.location.protocol === "file:");
    const canUseBundled = isFileProtocol && isBundledLocalSource(trimmed);

    if (canUseBundled){
      const bundledText = getBundledLocalText();
      if (typeof bundledText === "string") {
        return { text: bundledText, sourceType: "bundled", url: LOCAL_BUNDLE_NAME };
      }
    }

    const response = await fetch(normalizedUrl, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`);
    const text = await response.text();
    return { text, sourceType: "fetch", url: normalizedUrl };
  }

  function stripBracketNotes(s){
    return (s || "")
      .replace(/\[[^\]]*\]/g, "")
      .replace(/\{[^}]*\}/g, "")
      .replace(/\([^)]*\)/g, "")
      .replace(/\s+/g, "");
  }

  function isCjkIdeograph(ch){
    const cp = ch.codePointAt(0);
    return (cp >= 0x3400 && cp <= 0x9FFF) || (cp >= 0x20000 && cp <= 0x2EBEF);
  }

  function splitIdeographs(s){
    const cleaned = stripBracketNotes(s);
    return Array.from(cleaned).filter(isCjkIdeograph);
  }

  function parseLine(line){
    if (!line || !line.includes("|")) return null;
    const parts = line.split("|").map(s => (s ?? "").trim());
    for (let i=0; i<parts.length; i++){
      const tok = parts[i];
      if (tok === "開" || tok === "合"){
        const initial = parts[i-1];
        const deng = parts[i+1];
        const rime = parts[i+2];
        const tone = parts[i+3];
        if (["一","二","三","四"].includes(deng) && ["平","上","去","入"].includes(tone) && initial){
          return {
            fanqie: parts[2] || "",
            charsRaw: parts[3] || "",
            initialMu: initial,
            kaihe: tok,
            deng,
            rimeName: rime,
            tone
          };
        }
      }
    }
    return null;
  }

  const INITIAL_ROMAN = {
    "幫":"b","滂":"p","並":"b","明":"m",
    "非":"f","敷":"f","奉":"f","微":"w",
    "端":"d","透":"t","定":"d","泥":"n",
    "知":"zh","徹":"ch","澄":"zh","娘":"nh",
    "精":"z","清":"c","從":"z","心":"s","邪":"x",
    "照":"zh","穿":"ch","牀":"s",
    "莊":"zh","初":"ch","崇":"s",
    "章":"zh","昌":"ch","常":"s",
    "審":"sh","禅":"sh",
    "生":"sh","俟":"sh",
    "書":"sh","船":"sh",
    "見":"g","溪":"k","群":"g","疑":"",
    "影":"'", "曉":"h","匣":"h","云":"",
    "以":"y","喩":"y",
    "來":"l","日":"r"
  };

  const VOICED_MU = new Set(["並","奉","定","澄","従","邪","牀","禅","群","匣"]);

  const MASTER_RIME_ROMAN = {
    "東一":"ung","屋一":"uk","東三":"iung","屋三":"iuk",
    "冬一":"ong","沃":"ok","鍾三":"iong","燭":"iok",
    "江二":"ang","覺":"ak",
    "唐一":"ang","鐸":"ak","唐一合":"wang","鐸合":"wak",
    "陽三":"iang","藥":"iak","陽三合":"yang","藥合":"yak",
    "庚二":"aang","陌二":"aak","庚二合":"waang","陌二合":"waak","庚三":"iaang","陌三":"iaak","庚三合":"uaang","陌三合":"uaak",
    "耕二":"ang","麥":"ak","耕二合":"wang","麥合":"wak",
    "清三":"ing","昔":"ik","清三合":"ing","昔合":"ik",
    "青四":"eng","錫":"ek","青四合":"yeng","錫合":"yek",
    "登一":"ung","德":"uk","登一合":"wung","德合":"wuk",
    "蒸三":"ing","職":"ik","蒸三合":"wing","職合":"ik",
    "眞A三":"in","質A":"it",
    "眞B三":"in","質B":"it",
    "眞B三合":"uin","質B合":"uit",
    "臻三":"ien","櫛":"iet",
    "諄三合":"un","術":"ut",
    "痕一":"on",
    "魂一合":"won","沒":"wot",
    "欣三":"un","迄":"ut",
    "文三合":"un","物":"ut",
    "寒一開":"an","曷":"at",
    "桓一合":"wan","末":"wat",
    "元三":"ian","月":"iat","元三合":"uan","月合":"uat",
    "刪二":"an","黠":"at","刪二合":"wan","黠合":"wat",
    "山二":"aan","鎋":"aat","山二合":"waan","鎋合":"waat",
    "仙A三":"en","薛A":"et","仙A三合":"uen","薛A合":"uet",
    "仙B三":"ien","薛B":"iet","仙B三合":"uen","薛B合":"uet",
    "先四":"in","屑":"it","先四合":"uin","屑合":"uit",
    "侵A三":"im","緝A":"ip",
    "侵B三":"im","緝B":"ip",
    "談一":"am","盍":"ap",
    "嚴三":"iem","業":"iep",
    "凡三合":"yom","乏":"yop",
    "銜二":"aam","狎":"aap",
    "咸二":"em","洽":"ep",
    "鹽A三":"im","葉A":"ip",
    "鹽B三":"iem","葉B":"iep",
    "添四":"im","怗":"ip",
    "覃一":"am","合":"ap",
    "歌一":"aa",
    "戈一合":"wa","戈三":"ia","戈三合":"ua",
    "麻二":"a","麻二合":"wa","麻三":"ia",
    "支A三":"i","支A三合":"wi",
    "支B三":"i","支B三合":"wi",
    "脂A三":"i","脂A三合":"wi",
    "脂B三":"i","脂B三合":"wi",
    "之三":"i",
    "微三":"ey","微三合":"wey",
    "魚三":"iu",
    "模一":"o",
    "虞三合":"u",
    "泰一":"ai","泰一合":"wai",
    "廢三":"iay","廢三合":"yay",
    "夬二":"ai","夬二合":"wai",
    "佳二":"aay","佳二合":"waay",
    "皆二":"ay","皆二合":"way",
    "祭A三":"ie","祭A三合":"ue",
    "祭B三":"ie","祭B三合":"ue",
    "齊四":"i","齊四合":"wi",
    "咍一":"ay","灰一合":"way",
    "豪一":"aw",
    "肴二":"iaw",
    "宵A三":"ieu",
    "宵B三":"iew",
    "蕭四":"iau",
    "尤三":"iou",
    "侯一":"ow",
    "幽三":"iu"
  };

  const RU_RIME_MAP = {
    "東":"屋","冬":"沃","鍾":"燭","江":"覺","唐":"鐸","陽":"藥",
    "庚":"陌","耕":"麥","清":"昔","青":"錫","登":"德","蒸":"職",
    "眞A":"質A","眞B":"質B","臻":"櫛","諄":"術","魂":"沒","欣":"迄","文":"物",
    "寒":"曷","桓":"末","元":"月","刪":"黠","山":"鎋",
    "仙A":"薛A","仙B":"薛B","先":"屑",
    "侵A":"緝A","侵B":"緝B","談":"盍","嚴":"業","凡":"乏","銜":"狎","咸":"洽","鹽A":"葉A","鹽B":"葉B","添":"怗","覃":"合"
  };

  function makeRimeKey(rimeName, deng, kaihe, tone){
    let base = rimeName;
    if (tone === "入") base = RU_RIME_MAP[rimeName] || rimeName;
    if (base === "寒" && deng === "一" && kaihe === "開" && tone !== "入") return "寒一開";
    const key = base + deng + (kaihe === "合" ? "合" : "");
    if (MASTER_RIME_ROMAN[key]) return key;
    if (MASTER_RIME_ROMAN[base]) return base;
    const key2 = base + deng;
    if (MASTER_RIME_ROMAN[key2]) return key2;
    return key;
  }

  function initialGroup(mu){
    const dorsal = new Set(["見","溪","群","疑"]);
    const retroflex = new Set(["知","徹","澄","娘"]);
    const dental = new Set(["精","清","從","心","邪","照","穿","牀","莊","初","崇","章","昌","常","審","禅","生","俟","書","船"]);
    if (dorsal.has(mu)) return "dorsal";
    if (retroflex.has(mu)) return "coronal";
    if (dental.has(mu)) return "coronal";
    const labial = new Set(["幫","滂","並","明","非","敷","奉","微"]);
    if (labial.has(mu)) return "labial";
    return "other";
  }

  function extractNucleus(r){
    const isVowel = c => ["a","e","i","o","u","y"].includes(c);
    for (let j=0; j<r.length; j++){
      if (r.slice(j, j+2) === "aa") return { nucleus: "aa", start: j, len: 2 };
      const c = r[j];
      if (c === "w") continue;
      if (c === "a" || c === "e" || c === "o") return { nucleus: c, start: j, len: 1 };
      if (c === "i" || c === "u" || c === "y"){
        const nxt = r[j+1];
        if (nxt && isVowel(nxt)) continue;
        return { nucleus: c, start: j, len: 1 };
      }
    }
    return { nucleus: r[0] || "", start: 0, len: 1 };
  }

  function hasPalatalGlide(r){
    const nuc = extractNucleus(r);
    return (r.startsWith("i") || r.startsWith("y")) && nuc.start > 0;
  }

  function dropLeadingPalatalGlide(r){
    if (r.startsWith("i") || r.startsWith("y")) return r.slice(1);
    return r;
  }

  function isOpenSyllable(r){
    return /[aeiouy]$/.test(r);
  }

  function applyBTypeCodaMutation(r){
    if (r.endsWith("ng")) return r.slice(0, -2) + "nh";
    if (r.endsWith("k")) return r.slice(0, -1) + "ch";
    if (r.endsWith("m")) return r.slice(0, -1) + "mh";
    if (r.endsWith("p")) return r.slice(0, -1) + "v";
    if (r.endsWith("n")) return r.slice(0, -1) + "nn";
    if (r.endsWith("t")) return r.slice(0, -1) + "ts";
    if (isOpenSyllable(r)) return r + "h";
    return r;
  }

  function yinToYang(n){
    if (n === "aa") return "ae";
    if (n === "a") return "ae";
    if (n === "e") return "eo";
    if (n === "i") return "y";
    if (n === "o") return "oe";
    if (n === "u") return "ue";
    return n;
  }

  function replaceAt(str, start, len, repl){
    return str.slice(0, start) + repl + str.slice(start + len);
  }

  function addToneMarkToNucleus(syl, nucleusStart, tone){
    if (tone !== "上" && tone !== "去") return syl;
    const mark = tone === "上" ? COMB_ACUTE : COMB_GRAVE;
    let idx = nucleusStart;
    if (idx > 0){
      const pair = syl.slice(idx - 1, idx + 1);
      if (pair === "ae" || pair === "eo" || pair === "oe" || pair === "ue") idx = idx - 1;
    }
    const ch = syl[idx];
    return (syl.slice(0, idx) + ch + mark + syl.slice(idx + 1)).normalize("NFC");
  }

  function postProcess(initialRoman, rimeRoman){
    const hasVowel = s => /[aeiouy]/.test(s);
    const nuc = extractNucleus(rimeRoman);
    const hasIGlide = rimeRoman.startsWith("i") && nuc.start > 0;
    const hasYGlide = rimeRoman.startsWith("y") && nuc.start > 0;

    if (!initialRoman && hasIGlide) rimeRoman = "y" + rimeRoman.slice(1);
    if (initialRoman === "x" && hasYGlide) rimeRoman = rimeRoman.slice(1);
    if (["zh","ch","sh"].includes(initialRoman) && hasIGlide) rimeRoman = rimeRoman.slice(1);

    if (["b","p","m","f"].includes(initialRoman)) {
      const skipIY = initialRoman === "m";
      while (true){
        if (rimeRoman.startsWith("w")) {
          if (!hasVowel(rimeRoman.slice(1))) break;
          rimeRoman = rimeRoman.slice(1);
          continue;
        }
        const nuc0 = extractNucleus(rimeRoman);
        if (!skipIY && rimeRoman.startsWith("y") && nuc0.start > 0) {
          if (!hasVowel(rimeRoman.slice(1))) break;
          rimeRoman = rimeRoman.slice(1);
          continue;
        }
        if (!skipIY && rimeRoman.startsWith("i") && nuc0.start > 0) {
          if (!hasVowel(rimeRoman.slice(1))) break;
          rimeRoman = rimeRoman.slice(1);
          continue;
        }
        if (rimeRoman.startsWith("u") && nuc0.start > 0) {
          if (!hasVowel(rimeRoman.slice(1))) break;
          rimeRoman = rimeRoman.slice(1);
          continue;
        }
        break;
      }
    }

    if (initialRoman === "w" || initialRoman === "f") {
      const nucY = extractNucleus(rimeRoman);
      const hasYGlide2 = rimeRoman.startsWith("y") && nucY.start > 0;
      if (hasYGlide2 && hasVowel(rimeRoman.slice(1))) rimeRoman = rimeRoman.slice(1);
    }

    if (initialRoman === "w" && rimeRoman.startsWith("u")) {
      const nucU = extractNucleus(rimeRoman);
      if (nucU.start > 0 && hasVowel(rimeRoman.slice(1))) rimeRoman = rimeRoman.slice(1);
    }

    if (initialRoman === "y" && rimeRoman.startsWith("i")) {
      const nucI = extractNucleus(rimeRoman);
      if (nucI.start > 0 && hasVowel(rimeRoman.slice(1))) rimeRoman = rimeRoman.slice(1);
    }

    if (initialRoman === "l" && rimeRoman.startsWith("w")) {
      const tmp = rimeRoman.slice(1);
      const nuc2 = extractNucleus(tmp).nucleus;
      if (["a","aa","o","u","oe","ue"].includes(nuc2)) rimeRoman = tmp;
    }

    return rimeRoman;
  }

  function rewriteWholeSyllableBase(base, mu, rimeKey){
    if (base.startsWith("beo")) return "byeo" + base.slice(3);
    if (base.startsWith("be")) return "bie" + base.slice(2);
    if (base === "ri") return "yr";
    if (base === "yi") return "y";
    if (base === "naa") return "nae";
    if (base === "nai") return "naay";
    if (base === "taa") return "ta";
    if (base === "tai") return "tay";
    if (base === "dai") return "day";
    if (base === "zwon") return "zon";
    if (base === "swon") return "son";
    if (base === "dwoet") return "dot";
    if (base === "dwoen") return "don";
    if (base.startsWith("dwo")) return `do${base.slice(3)}`;
    if (base === "daet") return "dats";
    if (base === "miaang") return "myng";
    if (base === "myang") return "wang";
    if (base === "'wang") return "vong";
    if (base === "guyn") return "gwyn";
    if (base === "huyn") return "hwyn";
    if (base === "goeuh") return "giu";
    if (base === "gouh") return "giw";
    if (base === "cway") return "cwy";
    if (base === "zway") return "zwy";
    if (base === "sway") return "swy";
    if (base === "zwai") return "zuy";
    if (base === "ats") return "wat";
    if (mu === "云" && rimeKey === "陽三合" && base === "yang") return "vang";
    if (mu === "云" && rimeKey === "月" && base === "yat") return "vat";
    if (mu === "心" && rimeKey === "齊四" && base === "si") return "sy";
    if (mu === "幫" && rimeKey === "東三" && base === "bung") return "fung";
    if (mu === "並" && rimeKey === "蒸三" && base === "byng") return "fyng";
    if (mu === "並" && rimeKey === "東三" && base === "bueng") return "fueng";
    if (mu === "並" && rimeKey === "庚三" && base === "baeng") return "byng";
    if (
      ((mu === "精" && rimeKey === "清三") || ((mu === "從" || mu === "従") && rimeKey === "眞A三")) &&
      base.startsWith("zi")
    ) {
      return "j" + base.slice(1);
    }
    return base;
  }

  function convertOne(mc, rimeRomanMap){
    const mu = (mc.initialMu || "").trim();
    const tone = (mc.tone || "").trim();
    const rimeKey = (mc.rimeKey || "").trim();

    let initialRoman = INITIAL_ROMAN[mu] !== undefined ? INITIAL_ROMAN[mu] : "";
    let shiftedLabial = false;

    if ((mc.kaihe || "").trim() === "合") {
      if (mu === "幫" || mu === "滂" || mu === "並") {
        initialRoman = "f";
        shiftedLabial = true;
      }
    }

    let rimeRoman = rimeRomanMap[rimeKey];
    if (typeof rimeRoman !== "string" || rimeRoman.length === 0) return { ok: false, error: `韻キー未対応：${rimeKey}` };

    if (shiftedLabial && rimeRoman.startsWith("w")) rimeRoman = rimeRoman.slice(1);

    const grp = initialGroup(mu);
    let isB = false;

    if ((grp === "dorsal" || grp === "coronal") && hasPalatalGlide(rimeRoman)) {
      isB = true;
      rimeRoman = dropLeadingPalatalGlide(rimeRoman);
      rimeRoman = applyBTypeCodaMutation(rimeRoman);
    }

    rimeRoman = postProcess(initialRoman, rimeRoman);

    if (initialRoman === "y" && rimeRoman.startsWith("w")) {
      const nucW = extractNucleus(rimeRoman);
      if (nucW.start > 0) {
        initialRoman = "ue";
        rimeRoman = rimeRoman.slice(1);
      }
    }

    const voiced = VOICED_MU.has(mu);
    if (voiced){
      const nuc3 = extractNucleus(rimeRoman);
      rimeRoman = replaceAt(rimeRoman, nuc3.start, nuc3.len, yinToYang(nuc3.nucleus));
    }

    if (initialRoman === "r" && rimeRoman.startsWith("i")) {
      const nucR = extractNucleus(rimeRoman);
      if (nucR.start > 0) {
        if (rimeRoman.startsWith("iaa")) rimeRoman = "ae" + rimeRoman.slice(3);
        else if (rimeRoman.startsWith("iae")) rimeRoman = "ae" + rimeRoman.slice(3);
        else if (rimeRoman.startsWith("ia")) rimeRoman = "ae" + rimeRoman.slice(2);
        else if (rimeRoman.startsWith("ieo")) rimeRoman = "eo" + rimeRoman.slice(3);
        else if (rimeRoman.startsWith("ie")) rimeRoman = "eo" + rimeRoman.slice(2);
        else if (rimeRoman.startsWith("ii")) rimeRoman = "y" + rimeRoman.slice(2);
        else if (rimeRoman.startsWith("iy")) rimeRoman = "y" + rimeRoman.slice(2);
        else if (rimeRoman.startsWith("ioe")) rimeRoman = "oe" + rimeRoman.slice(3);
        else if (rimeRoman.startsWith("io")) rimeRoman = "oe" + rimeRoman.slice(2);
        else if (rimeRoman.startsWith("iue")) rimeRoman = "ue" + rimeRoman.slice(3);
        else if (rimeRoman.startsWith("iu")) rimeRoman = "ue" + rimeRoman.slice(2);
      }
    }

    if (!initialRoman && rimeRoman.startsWith("u")) {
      const nucU0 = extractNucleus(rimeRoman);
      if (nucU0.start > 0) rimeRoman = "v" + rimeRoman.slice(1);
    }

    if (initialRoman === "r" && rimeRoman === "i") {
      initialRoman = "";
      rimeRoman = "yr";
    }

    if (mu === "云") {
      if (initialRoman === "w") {
        initialRoman = "v";
      } else if (!initialRoman && rimeRoman.startsWith("w")) {
        rimeRoman = "v" + rimeRoman.slice(1);
      }
    }

    if (initialRoman === "m" && rimeRoman.startsWith("i")) {
      const nucM0 = extractNucleus(rimeRoman);
      if (nucM0.start > 0) {
        const tail = rimeRoman.slice(1);
        const nucT = extractNucleus(tail);
        const tailIsUe = tail.startsWith("ue") && nucT.nucleus === "e";
        if (nucT.nucleus === "u" || nucT.nucleus === "o" || tailIsUe) {
          rimeRoman = tail;
        }
      }
    }

    const base = rewriteWholeSyllableBase(initialRoman + rimeRoman, mu, rimeKey);
    const nucleusStart = extractNucleus(base).start;
    const withTone = addToneMarkToNucleus(base, nucleusStart, tone);
    let reading = withTone;

    return { ok: true, reading, debug: { initialRoman, rimeRoman, voiced, isB, grp } };
  }

  function addToListMap(map, key, value){
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(value);
  }

  function normalizeInventoryReadings(entries){
    const readable = entries.filter(entry => typeof entry.reading === "string" && entry.reading.length > 0);

    for (const entry of readable){
      const segmental = foldReading(entry.reading);
      if (segmental.endsWith("nh")) entry.reading = entry.reading.slice(0, -2) + "ng";
    }

    const segmentals = new Set(readable.map(entry => foldReading(entry.reading)));

    for (const entry of readable){
      const segmental = foldReading(entry.reading);
      if (segmental.endsWith("h") && !segmental.endsWith("nh") && !segmental.endsWith("ch") && !segmentals.has(segmental.slice(0, -1))) {
        entry.reading = entry.reading.slice(0, -1);
      }
    }
  }

  function buildDictionary(text){
    const lines = text.split(/\r?\n/);
    const charIndex = new Map();
    const readingIndex = new Map();
    const looseReadingIndex = new Map();
    const foldedReadingIndex = new Map();
    const looseFoldedReadingIndex = new Map();
    const initialMuSet = new Set();
    const rimeNameSet = new Set();
    const keySet = new Set();
    const missing = new Set();
    const allEntries = [];

    for (const line of lines){
      const p = parseLine(line);
      if (!p) continue;
      const chars = splitIdeographs(p.charsRaw);
      if (chars.length === 0) continue;

      initialMuSet.add(p.initialMu);
      rimeNameSet.add(p.rimeName);

      const xiaoyun = `${p.fanqie}${chars[0] ? `（${chars[0]}）` : ""}`;
      const rimeKey = makeRimeKey(p.rimeName, p.deng, p.kaihe, p.tone);
      keySet.add(rimeKey);

      const mc = {
        initialMu: p.initialMu,
        kaihe: p.kaihe,
        deng: p.deng,
        rimeName: p.rimeName,
        tone: p.tone,
        rimeKey
      };

      for (const ch of chars){
        const entry = { char: ch, xiaoyun, mc };
        addToListMap(charIndex, ch, entry);
        allEntries.push(entry);
      }
    }

    const rimeRoman = {};
    for (const k of keySet){
      if (MASTER_RIME_ROMAN[k]) rimeRoman[k] = MASTER_RIME_ROMAN[k];
      else missing.add(k);
    }

    for (const entry of allEntries){
      const conv = convertOne(entry.mc, rimeRoman);
      entry.conv = conv;
      if (!conv.ok) continue;
      entry.reading = conv.reading.normalize("NFC");
    }

    normalizeInventoryReadings(allEntries);

    for (const entry of allEntries){
      if (typeof entry.reading !== "string" || entry.reading.length === 0) continue;
      const reverseEntry = {
        char: entry.char,
        xiaoyun: entry.xiaoyun,
        mc: entry.mc,
        reading: entry.reading,
        debug: entry.conv ? entry.conv.debug : {}
      };
      addToListMap(readingIndex, entry.reading, reverseEntry);
      addToListMap(looseReadingIndex, stripReadingApostrophes(entry.reading), reverseEntry);
      addToListMap(foldedReadingIndex, foldReading(entry.reading), reverseEntry);
      addToListMap(looseFoldedReadingIndex, foldReadingLoose(entry.reading), reverseEntry);
    }

    return {
      entries: allEntries,
      charIndex,
      readingIndex,
      looseReadingIndex,
      foldedReadingIndex,
      looseFoldedReadingIndex,
      initialMus: Array.from(initialMuSet).sort((a, b) => a.localeCompare(b, "ja")),
      rimeNames: Array.from(rimeNameSet).sort(),
      missingKeys: Array.from(missing).sort(),
      stats: {
        charCount: charIndex.size,
        readingCount: readingIndex.size,
        totalEntries: allEntries.length,
        missingCount: missing.size
      }
    };
  }

  function normalizeReadingInput(value){
    return String(value || "").trim().toLowerCase().replace(/[’ʼ]/g, "'").replace(/\s+/g, "").normalize("NFC");
  }

  function stripReadingApostrophes(value){
    return normalizeReadingInput(value).replace(/'/g, "");
  }

  function foldReading(value){
    return normalizeReadingInput(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function foldReadingLoose(value){
    return stripReadingApostrophes(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function hasToneMarks(value){
    return /[\u0300-\u036f]/.test(normalizeReadingInput(value).normalize("NFD"));
  }

  function toneWeight(reading){
    const nfd = reading.normalize("NFD");
    if (nfd.includes(COMB_ACUTE)) return 1;
    if (nfd.includes(COMB_GRAVE)) return 2;
    return 0;
  }

  function sortReadings(a, b){
    const foldedA = foldReading(a);
    const foldedB = foldReading(b);
    if (foldedA !== foldedB) return foldedA.localeCompare(foldedB);
    const toneDiff = toneWeight(a) - toneWeight(b);
    if (toneDiff) return toneDiff;
    return a.localeCompare(b);
  }

  function getCharReadings(dictionary, char){
    const entries = dictionary && dictionary.charIndex ? (dictionary.charIndex.get(char) || []) : [];
    return Array.from(new Set(
      entries
        .map(entry => entry.reading)
        .filter(reading => typeof reading === "string" && reading.length > 0)
    )).sort(sortReadings);
  }

  function makeReadingGroup(reading, entries){
    const byChar = new Map();
    for (const entry of entries){
      if (!byChar.has(entry.char)) {
        byChar.set(entry.char, {
          char: entry.char,
          matchCount: 0,
          xiaoyun: new Set()
        });
      }
      const item = byChar.get(entry.char);
      item.matchCount += 1;
      item.xiaoyun.add(entry.xiaoyun);
    }

    const items = Array.from(byChar.values()).map(item => ({
      char: item.char,
      matchCount: item.matchCount,
      xiaoyun: Array.from(item.xiaoyun).sort()
    })).sort((a, b) => a.char.localeCompare(b.char, "ja"));

    return {
      reading,
      count: items.length,
      items
    };
  }

  function makeReverseEntryKey(entry){
    return `${entry.char}\u0000${entry.reading}\u0000${entry.xiaoyun}`;
  }

  function buildReadingGroups(entries){
    const grouped = new Map();
    const seen = new Set();

    for (const entry of entries){
      if (!entry || typeof entry.reading !== "string" || entry.reading.length === 0) continue;
      const key = makeReverseEntryKey(entry);
      if (seen.has(key)) continue;
      seen.add(key);
      addToListMap(grouped, entry.reading, entry);
    }

    return Array.from(grouped.entries())
      .sort((a, b) => sortReadings(a[0], b[0]))
      .map(([reading, list]) => makeReadingGroup(reading, list));
  }

  function splitReadingQueries(rawInput){
    return Array.from(new Set(
      String(rawInput || "")
        .split(/[\s,、]+/)
        .map(normalizeReadingInput)
        .filter(Boolean)
    ));
  }

  function searchEntriesByReading(dictionary, rawInput){
    const query = normalizeReadingInput(rawInput);
    if (!query) return { query, exact: false, entries: [] };

    if (hasToneMarks(query)) {
      if (query.includes("'")) {
        return { query, exact: true, entries: dictionary.readingIndex.get(query) || [] };
      }
      return { query, exact: true, entries: dictionary.looseReadingIndex.get(stripReadingApostrophes(query)) || [] };
    }

    if (query.includes("'")) {
      const folded = foldReading(query);
      return { query, exact: false, entries: dictionary.foldedReadingIndex.get(folded) || [] };
    }

    const folded = foldReadingLoose(query);
    return { query, exact: false, entries: dictionary.looseFoldedReadingIndex.get(folded) || [] };
  }

  function searchByReading(dictionary, rawInput){
    const result = searchEntriesByReading(dictionary, rawInput);
    return {
      query: result.query,
      exact: result.exact,
      groups: buildReadingGroups(result.entries)
    };
  }

  function searchByReadings(dictionary, rawInput){
    const tokens = splitReadingQueries(rawInput);
    if (!tokens.length) {
      return {
        query: String(rawInput || "").trim(),
        exact: false,
        groups: [],
        tokens: [],
        hasExact: false,
        hasFolded: false,
        missingTokens: []
      };
    }

    const tokenResults = tokens.map((token) => {
      const result = searchEntriesByReading(dictionary, token);
      return {
        query: result.query,
        exact: result.exact,
        entries: result.entries
      };
    });

    return {
      query: String(rawInput || "").trim(),
      exact: tokens.length === 1 ? tokenResults[0].exact : false,
      groups: buildReadingGroups(tokenResults.flatMap((result) => result.entries)),
      tokens: tokenResults.map((result) => ({
        query: result.query,
        exact: result.exact,
        count: buildReadingGroups(result.entries).length
      })),
      hasExact: tokenResults.some((result) => result.exact),
      hasFolded: tokenResults.some((result) => !result.exact),
      missingTokens: tokenResults.filter((result) => result.entries.length === 0).map((result) => result.query)
    };
  }

  function normalizeSelectionList(values){
    if (!Array.isArray(values)) return [];
    return Array.from(new Set(
      values.map(value => String(value || "").trim()).filter(Boolean)
    ));
  }

  function compareTone(a, b){
    const order = ["平", "上", "去", "入"];
    return order.indexOf(a) - order.indexOf(b);
  }

  function makeCharacterMatchItems(entries){
    const byChar = new Map();

    for (const entry of entries){
      if (!entry || typeof entry.char !== "string" || entry.char.length === 0) continue;
      if (!byChar.has(entry.char)) {
        byChar.set(entry.char, {
          char: entry.char,
          matchCount: 0,
          readings: new Set(),
          xiaoyun: new Set(),
          initialMus: new Set(),
          rimeNames: new Set(),
          tones: new Set()
        });
      }

      const item = byChar.get(entry.char);
      item.matchCount += 1;
      if (typeof entry.reading === "string" && entry.reading.length > 0) item.readings.add(entry.reading);
      if (typeof entry.xiaoyun === "string" && entry.xiaoyun.length > 0) item.xiaoyun.add(entry.xiaoyun);
      if (entry.mc && entry.mc.initialMu) item.initialMus.add(entry.mc.initialMu);
      if (entry.mc && entry.mc.rimeName) item.rimeNames.add(entry.mc.rimeName);
      if (entry.mc && entry.mc.tone) item.tones.add(entry.mc.tone);
    }

    return Array.from(byChar.values()).map(item => ({
      char: item.char,
      matchCount: item.matchCount,
      readings: Array.from(item.readings).sort(sortReadings),
      xiaoyun: Array.from(item.xiaoyun).sort(),
      initialMus: Array.from(item.initialMus).sort((a, b) => a.localeCompare(b, "ja")),
      rimeNames: Array.from(item.rimeNames).sort((a, b) => a.localeCompare(b, "ja")),
      tones: Array.from(item.tones).sort(compareTone)
    })).sort((a, b) => a.char.localeCompare(b.char, "ja"));
  }

  function searchByMcFilters(dictionary, filters){
    const initialMus = normalizeSelectionList(filters && filters.initialMus);
    const rimeNames = normalizeSelectionList(filters && filters.rimeNames);
    const tones = normalizeSelectionList(filters && filters.tones);
    const initialSet = new Set(initialMus);
    const rimeSet = new Set(rimeNames);
    const toneSet = new Set(tones);

    if (!initialSet.size && !rimeSet.size && !toneSet.size) {
      return {
        initialMus,
        rimeNames,
        tones,
        items: [],
        entryCount: 0
      };
    }

    const items = dictionary && Array.isArray(dictionary.entries) ? dictionary.entries : [];
    const matched = items.filter(entry => {
      if (typeof entry.reading !== "string" || entry.reading.length === 0) return false;
      if (initialSet.size && !initialSet.has(entry.mc.initialMu)) return false;
      if (rimeSet.size && !rimeSet.has(entry.mc.rimeName)) return false;
      if (toneSet.size && !toneSet.has(entry.mc.tone)) return false;
      return true;
    });

    return {
      initialMus,
      rimeNames,
      tones,
      items: makeCharacterMatchItems(matched),
      entryCount: matched.length
    };
  }

  function transcribeText(dictionary, rawText){
    const text = String(rawText || "");
    let output = "";
    let prevWasToken = false;
    const missingChars = new Set();

    for (const ch of Array.from(text)){
      if (!isCjkIdeograph(ch)) {
        output += ch;
        prevWasToken = false;
        continue;
      }

      const readings = getCharReadings(dictionary, ch);
      const token = readings.length === 0
        ? ch
        : (readings.length === 1 ? readings[0] : `(${readings.join(" / ")})`);

      if (prevWasToken) output += " ";
      output += token;
      prevWasToken = true;

      if (!readings.length) missingChars.add(ch);
    }

    return {
      text,
      output,
      missingChars: Array.from(missingChars)
    };
  }

  async function loadDictionaryFromUrl(rawUrl){
    const source = await loadTextFromSource(rawUrl);
    return {
      ...source,
      dictionary: buildDictionary(source.text)
    };
  }

  root.HuDictionaryCore = {
    LOCAL_SOURCE_NAME,
    LOCAL_BUNDLE_NAME,
    escapeHtml,
    normalizeTextUrl,
    isBundledLocalSource,
    getBundledLocalText,
    loadTextFromSource,
    loadDictionaryFromUrl,
    buildDictionary,
    isCjkIdeograph,
    getCharReadings,
    searchByReading,
    searchByReadings,
    searchByMcFilters,
    transcribeText,
    foldReading
  };
})();
