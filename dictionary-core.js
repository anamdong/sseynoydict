(function(){
  const root = typeof window !== "undefined" ? window : globalThis;

  const LOCAL_SOURCE_NAME = "Kuankhiunn0704.txt";
  const LOCAL_BUNDLE_NAME = "Kuankhiunn0704.txt.js";
  const COMB_ACUTE = "\u0301";
  const COMB_GRAVE = "\u0300";
  const READING_TYPE_SINO = "sino";
  const READING_TYPE_PURE = "pure";
  const PURE_READING_LABEL = "純胡文";
  const FREQUENCY_READING_OVERRIDES = root.__HU_FREQUENCY_READING_OVERRIDES__ || Object.freeze({});
  const EXTRA_CHARACTER_READINGS = {
    "㖇": [{ reading: "ne", readingType: READING_TYPE_PURE, label: PURE_READING_LABEL }],
    "此": [{ reading: "ca", readingType: READING_TYPE_PURE, label: PURE_READING_LABEL }],
    "何": [{ reading: "ka", readingType: READING_TYPE_PURE, label: PURE_READING_LABEL }],
    "令": [{ reading: "lhỳnh", readingType: READING_TYPE_PURE, label: PURE_READING_LABEL }],
    "麼": [{ reading: "keo", readingType: READING_TYPE_PURE, label: PURE_READING_LABEL }],
    "我": [{ reading: "tsòi", readingType: READING_TYPE_PURE, label: PURE_READING_LABEL }],
    "碎": [{ reading: "tsòi", readingType: READING_TYPE_PURE, label: PURE_READING_LABEL }],
    "汝": [{ reading: "zzhi", readingType: READING_TYPE_PURE, label: PURE_READING_LABEL }],
    "既": [{ reading: "gé", readingType: READING_TYPE_PURE, label: PURE_READING_LABEL }],
    "海": [{ reading: "pa", readingType: READING_TYPE_PURE, label: PURE_READING_LABEL }],
    "龍": [{ reading: "la", readingType: READING_TYPE_PURE, label: PURE_READING_LABEL }],
    "語": [{ reading: "nòy", readingType: READING_TYPE_PURE, label: PURE_READING_LABEL }],
    "話": [
      { reading: "nòy", readingType: READING_TYPE_PURE, label: PURE_READING_LABEL },
      { reading: "hwàe", readingType: READING_TYPE_PURE, label: PURE_READING_LABEL }
    ],
    "呐": [{ reading: "nòy", readingType: READING_TYPE_PURE, label: PURE_READING_LABEL }],
    "去": [{ reading: "xàng", readingType: READING_TYPE_PURE, label: PURE_READING_LABEL }],
    "向": [{ reading: "xàng", readingType: READING_TYPE_PURE, label: PURE_READING_LABEL }],
    "對": [{ reading: "dùy", readingType: READING_TYPE_PURE, label: PURE_READING_LABEL }],
    "中": [{ reading: "cheng", readingType: READING_TYPE_PURE, label: PURE_READING_LABEL }],
    "朝": [{ reading: "sshin", readingType: READING_TYPE_PURE, label: PURE_READING_LABEL }],
    "晨": [{ reading: "sshin", readingType: READING_TYPE_PURE, label: PURE_READING_LABEL }],
    "之": [{ reading: "shé", readingType: READING_TYPE_PURE, label: PURE_READING_LABEL }],
    "至": [{ reading: "chyt", readingType: READING_TYPE_PURE, label: PURE_READING_LABEL }],
    "也": [{ reading: "yeo", readingType: READING_TYPE_PURE, label: PURE_READING_LABEL }],
    "十": [{ reading: "shov", readingType: READING_TYPE_PURE, label: PURE_READING_LABEL }],
    "二": [{ reading: "nìr", readingType: READING_TYPE_PURE, label: PURE_READING_LABEL }],
    "四": [{ reading: "sàe", readingType: READING_TYPE_PURE, label: PURE_READING_LABEL }],
    "水": [{ reading: "coy", readingType: READING_TYPE_PURE, label: PURE_READING_LABEL }],
    "社": [{ reading: "xá", readingType: READING_TYPE_PURE, label: PURE_READING_LABEL }],
    "會": [{ reading: "hwì", readingType: READING_TYPE_PURE, label: PURE_READING_LABEL }],
    "字": [{ reading: "zìr", readingType: READING_TYPE_PURE, label: PURE_READING_LABEL }],
    "胡": [{ reading: "ssey", readingType: READING_TYPE_PURE, label: PURE_READING_LABEL }],
    "蝴": [{ reading: "ssey", readingType: READING_TYPE_PURE, label: PURE_READING_LABEL }]
  };

  // The Guangyun source uses its own mixture of historical, Japanese, and
  // modern glyph choices.  Keep lookup aliases here (rather than in a page)
  // so that character lookup and the text reader behave the same way.
  // A value may contain more than one source form when a modern form merges
  // characters that have separate historical readings.
  const CHARACTER_VARIANT_ALIASES = Object.freeze({
    // Forms explicitly annotated in the source data.
    "高": ["髙"], "虛": ["虚"], "污": ["汚"], "別": ["别"],
    "已": ["巳"], "衛": ["衞"], "沒": ["没"], "世": ["丗"],
    "內": ["内"], "慎": ["愼"], "胖": ["肨"], "真": ["眞"],
    "截": ["𢧵"], "恆": ["恒"], "呂": ["吕"], "乘": ["乗", "椉"],
    "菑": ["葘", "甾"], "甯": ["寗"], "丌": ["朞"], "佘": ["余"],
    "銭": ["錢"], "呉": ["吳"], "厳": ["嚴"], "喩": ["喻"],
    "兪": ["俞"], "楽": ["樂"], "斉": ["齊"],

    // Japanese shinjitai and their simplified-Chinese counterparts.
    "亜": ["亞"], "悪": ["惡"], "圧": ["壓"], "囲": ["圍"],
    "為": ["爲"], "医": ["醫"], "壱": ["壹"], "稲": ["稻"],
    "隠": ["隱"], "栄": ["榮"], "駅": ["驛"], "円": ["圓"],
    "縁": ["緣"], "塩": ["鹽"], "奥": ["奧"], "応": ["應"],
    "横": ["橫"], "欧": ["歐"], "殴": ["毆"], "穏": ["穩"],
    "仮": ["假"], "価": ["價"], "画": ["畫"], "会": ["會"],
    "壊": ["壞"], "懐": ["懷"], "絵": ["繪"], "拡": ["擴"],
    "殻": ["殼"], "覚": ["覺"], "学": ["學"], "岳": ["嶽"],
    "楽": ["樂"], "渇": ["渴"], "巻": ["卷"], "寛": ["寬"],
    "勧": ["勸"], "関": ["關"], "観": ["觀"], "気": ["氣"],
    "帰": ["歸"], "亀": ["龜"], "偽": ["僞"], "戯": ["戲"],
    "犠": ["犧"], "旧": ["舊"], "拠": ["據"], "挙": ["擧"],
    "峡": ["峽"], "狭": ["狹"], "郷": ["鄕"], "尭": ["堯"],
    "暁": ["曉"], "区": ["區"], "駆": ["驅"], "勲": ["勳"],
    "径": ["徑"], "恵": ["惠"], "渓": ["溪"], "経": ["經"],
    "継": ["繼"], "茎": ["莖"], "蛍": ["螢"], "軽": ["輕"],
    "鶏": ["鷄"], "芸": ["藝"], "県": ["縣"], "倹": ["儉"],
    "剣": ["劍"], "圏": ["圈"], "検": ["檢"], "権": ["權"],
    "献": ["獻"], "顕": ["顯"], "厳": ["嚴"], "広": ["廣"],
    "鉱": ["鑛"], "号": ["號"], "国": ["國"], "黒": ["黑"],
    "済": ["濟"], "砕": ["碎"], "斎": ["齋"], "剤": ["劑"],
    "桜": ["櫻"], "雑": ["雜"], "参": ["參"], "惨": ["慘"],
    "桟": ["棧"], "蚕": ["蠶"], "賛": ["贊"], "残": ["殘"],
    "児": ["兒"], "辞": ["辭"], "湿": ["濕"], "実": ["實"],
    "舎": ["舍"], "写": ["寫"], "釈": ["釋"], "寿": ["壽"],
    "収": ["收"], "従": ["從"], "渋": ["澁"], "獣": ["獸"],
    "縦": ["縱"], "粛": ["肅"], "処": ["處"], "叙": ["敍"],
    "奨": ["獎"], "将": ["將"], "焼": ["燒"], "証": ["證"],
    "乗": ["乗", "椉"], "剰": ["剩"], "壌": ["壤"], "嬢": ["孃"],
    "条": ["條"], "状": ["狀"], "畳": ["疊"], "穣": ["穰"],
    "譲": ["讓"], "醸": ["釀"], "嘱": ["囑"], "触": ["觸"],
    "寝": ["寢"], "尽": ["盡"], "図": ["圖"], "粋": ["粹"],
    "酔": ["醉"], "穂": ["穗"], "随": ["隨"], "髄": ["髓"],
    "枢": ["樞"], "数": ["數"], "声": ["聲"], "静": ["靜"],
    "斉": ["齊"], "摂": ["攝"], "専": ["專"], "戦": ["戰"],
    "浅": ["淺"], "潜": ["潛"], "繊": ["纖"], "禅": ["禪"],
    "双": ["雙"], "壮": ["壯"], "捜": ["搜"], "挿": ["插"],
    "巣": ["巢"], "争": ["爭"], "痩": ["瘦"], "総": ["總"],
    "騒": ["騷"], "増": ["增"], "蔵": ["藏"], "臓": ["臟"],
    "即": ["卽"], "帯": ["帶"], "滞": ["滯"], "対": ["對"],
    "体": ["體"], "滝": ["瀧"], "単": ["單"], "担": ["擔"],
    "胆": ["膽"], "団": ["團"], "断": ["斷"], "弾": ["彈"],
    "遅": ["遲"], "痴": ["癡"], "昼": ["晝"], "虫": ["蟲"],
    "鋳": ["鑄"], "庁": ["廳"], "聴": ["聽"], "鉄": ["鐵"],
    "転": ["轉"], "点": ["點"], "伝": ["傳"], "灯": ["燈"],
    "当": ["當"], "党": ["黨"], "盗": ["盜"], "闘": ["鬥"],
    "徳": ["德"], "独": ["獨"], "読": ["讀"], "届": ["屆"],
    "縄": ["繩"], "弐": ["貳"],

    // Common simplified Chinese forms.  Where a form is historically merged,
    // the lookup shows every matching source character instead of guessing.
    "万": ["萬"], "与": ["與"], "丑": ["醜"], "业": ["業"],
    "东": ["東"], "丝": ["絲"], "丢": ["丟"], "两": ["兩"],
    "严": ["嚴"], "丧": ["喪"], "个": ["個"], "丰": ["豐"],
    "临": ["臨"], "为": ["爲"], "丽": ["麗"], "举": ["擧"],
    "么": ["麼"], "义": ["義"], "乌": ["烏"], "乐": ["樂"],
    "乔": ["喬"], "习": ["習"], "乡": ["鄉"], "书": ["書"],
    "买": ["買"], "乱": ["亂"], "争": ["爭"], "于": ["於"],
    "亏": ["虧"], "云": ["雲"], "亚": ["亞"], "产": ["產"],
    "亩": ["畝"], "亲": ["親"], "亿": ["億"], "仅": ["僅"],
    "从": ["從"], "仑": ["侖"], "仓": ["倉"], "仪": ["儀"],
    "们": ["們"], "优": ["優"], "会": ["會"], "伞": ["傘"],
    "伟": ["偉"], "传": ["傳"], "伤": ["傷"], "伦": ["倫"],
    "伪": ["偽"], "体": ["體"], "余": ["餘"], "佣": ["傭"],
    "侠": ["俠"], "侣": ["侶"], "侥": ["僥"], "侧": ["側"],
    "侦": ["偵"], "侨": ["僑"], "债": ["債"], "倾": ["傾"],
    "储": ["儲"], "儿": ["兒"], "党": ["黨"], "兰": ["蘭"],
    "关": ["關"], "兴": ["興"], "养": ["養"], "兽": ["獸"],
    "冈": ["岡"], "册": ["冊"], "写": ["寫"], "军": ["軍"],
    "农": ["農"], "冲": ["衝"], "决": ["決"], "况": ["況"],
    "冻": ["凍"], "净": ["淨"], "凉": ["涼"], "减": ["減"],
    "凤": ["鳳"], "凭": ["憑"], "凯": ["凱"], "击": ["擊"],
    "划": ["劃"], "刘": ["劉"], "则": ["則"], "刚": ["剛"],
    "创": ["創"], "删": ["刪"], "别": ["别"], "刹": ["剎"],
    "剂": ["劑"], "剑": ["劍"], "剧": ["劇"], "办": ["辦"],
    "务": ["務"], "动": ["動"], "励": ["勵"], "劳": ["勞"],
    "势": ["勢"], "勋": ["勳"], "华": ["華"], "协": ["協"],
    "单": ["單"], "卖": ["賣"], "卫": ["衞"], "卤": ["鹵"],
    "厅": ["廳"], "历": ["歷"], "厉": ["厲"], "压": ["壓"],
    "厦": ["廈"], "厨": ["廚"], "县": ["縣"], "双": ["雙"],
    "发": ["發", "髮"], "变": ["變"], "叙": ["敍"], "叶": ["葉"],
    "号": ["號"], "叹": ["嘆"], "吕": ["吕"], "吗": ["嗎"],
    "听": ["聽"], "启": ["啟"], "吴": ["吳"], "呐": ["納"],
    "员": ["員"], "呜": ["嗚"], "周": ["週"], "响": ["響"],
    "哑": ["啞"], "哗": ["嘩"], "唤": ["喚"], "喷": ["噴"],
    "严": ["嚴"], "团": ["團"], "园": ["園"], "围": ["圍"],
    "国": ["國"], "图": ["圖"], "圆": ["圓"], "圣": ["聖"],
    "场": ["場"], "坏": ["壞"], "块": ["塊"], "坚": ["堅"],
    "坛": ["壇"], "坟": ["墳"], "坠": ["墜"], "垄": ["壟"],
    "垦": ["墾"], "埙": ["塤"], "堑": ["塹"], "墙": ["牆"],
    "壮": ["壯"], "声": ["聲"], "壳": ["殼"], "处": ["處"],
    "备": ["備"], "够": ["夠"], "头": ["頭"], "夹": ["夾"],
    "夺": ["奪"], "奋": ["奮"], "奥": ["奧"], "奖": ["獎"],
    "妈": ["媽"], "妇": ["婦"], "娄": ["婁"], "婴": ["嬰"],
    "宁": ["寧"], "宝": ["寶"], "实": ["實"], "审": ["審"],
    "宫": ["宮"], "宽": ["寬"], "宾": ["賓"], "寝": ["寢"],
    "对": ["對"], "寻": ["尋"], "导": ["導"], "寿": ["壽"],
    "将": ["將"], "尔": ["爾"], "尘": ["塵"], "尝": ["嘗"],
    "层": ["層"], "届": ["屆"], "属": ["屬"], "冈": ["岡"],
    "岛": ["島"], "岭": ["嶺"], "峡": ["峽"], "币": ["幣"],
    "帮": ["幫"], "干": ["乾", "幹"], "并": ["並"], "广": ["廣"],
    "庄": ["莊"], "庆": ["慶"], "庐": ["廬"], "库": ["庫"],
    "应": ["應"], "庙": ["廟"], "废": ["廢"], "开": ["開"],
    "异": ["異"], "弃": ["棄"], "张": ["張"], "弥": ["彌"],
    "弹": ["彈"], "强": ["強"], "归": ["歸"], "当": ["當"],
    "录": ["錄"], "径": ["徑"], "彻": ["徹"], "忆": ["憶"],
    "怀": ["懷"], "态": ["態"], "总": ["總"], "恒": ["恒"],
    "恳": ["懇"], "恶": ["惡"], "惊": ["驚"], "惧": ["懼"],
    "惨": ["慘"], "惩": ["懲"], "爱": ["愛"], "惯": ["慣"],
    "愿": ["願"], "懒": ["懶"], "战": ["戰"], "戏": ["戲"],
    "户": ["戶"], "执": ["執"], "扩": ["擴"], "扫": ["掃"],
    "扬": ["揚"], "扰": ["擾"], "抚": ["撫"], "抛": ["拋"],
    "抢": ["搶"], "护": ["護"], "报": ["報"], "担": ["擔"],
    "拟": ["擬"], "拢": ["攏"], "拥": ["擁"], "择": ["擇"],
    "挂": ["掛"], "挥": ["揮"], "损": ["損"], "换": ["換"],
    "摇": ["搖"], "摄": ["攝"], "摊": ["攤"], "撵": ["攆"],
    "敌": ["敵"], "数": ["數"], "斋": ["齋"], "断": ["斷"],
    "无": ["無"], "旧": ["舊"], "时": ["時"], "旷": ["曠"],
    "显": ["顯"], "晋": ["晉"], "晓": ["曉"], "晕": ["暈"],
    "暂": ["暫"], "术": ["術"], "机": ["機"], "杀": ["殺"],
    "杂": ["雜"], "权": ["權"], "条": ["條"], "来": ["來"],
    "杨": ["楊"], "极": ["極"], "构": ["構"], "枣": ["棗"],
    "枪": ["槍"], "栅": ["柵"], "标": ["標"], "栏": ["欄"],
    "树": ["樹"], "样": ["樣"], "栈": ["棧"], "桥": ["橋"],
    "检": ["檢"], "楼": ["樓"], "横": ["橫"], "档": ["檔"],
    "梦": ["夢"], "森": ["森"], "椭": ["橢"], "楼": ["樓"],
    "欢": ["歡"], "欧": ["歐"], "欲": ["欲"], "毁": ["毀"],
    "气": ["氣"], "汉": ["漢"], "汤": ["湯"], "沟": ["溝"],
    "没": ["没"], "泪": ["淚"], "泻": ["瀉"], "泽": ["澤"],
    "洁": ["潔"], "浅": ["淺"], "浇": ["澆"], "济": ["濟"],
    "浓": ["濃"], "浊": ["濁"], "涛": ["濤"], "涌": ["湧"],
    "润": ["潤"], "涨": ["漲"], "涩": ["澀"], "渊": ["淵"],
    "渐": ["漸"], "渔": ["漁"], "湿": ["濕"], "湾": ["灣"],
    "灭": ["滅"], "灯": ["燈"], "灵": ["靈"], "灾": ["災"],
    "炉": ["爐"], "点": ["點"], "炼": ["煉"], "烟": ["煙"],
    "热": ["熱"], "营": ["營"], "爷": ["爺"], "爱": ["愛"],
    "牵": ["牽"], "犹": ["猶"], "独": ["獨"], "狭": ["狹"],
    "猎": ["獵"], "猫": ["貓"], "献": ["獻"], "玛": ["瑪"],
    "环": ["環"], "现": ["現"], "玺": ["璽"], "电": ["電"],
    "画": ["畫"], "畅": ["暢"], "疗": ["療"], "疮": ["瘡"],
    "疯": ["瘋"], "痒": ["癢"], "瘾": ["癮"], "盐": ["鹽"],
    "盗": ["盜"], "盘": ["盤"], "众": ["眾"], "睁": ["睜"],
    "着": ["著"], "矫": ["矯"], "矿": ["礦"], "码": ["碼"],
    "礼": ["禮"], "祸": ["禍"], "离": ["離"], "种": ["種"],
    "积": ["積"], "称": ["稱"], "稳": ["穩"], "穷": ["窮"],
    "窑": ["窯"], "窜": ["竄"], "竞": ["競"], "笔": ["筆"],
    "筑": ["築"], "简": ["簡"], "签": ["簽"], "篮": ["籃"],
    "粮": ["糧"], "纠": ["糾"], "纪": ["紀"], "约": ["約"],
    "级": ["級"], "红": ["紅"], "纸": ["紙"], "纹": ["紋"],
    "练": ["練"], "组": ["組"], "细": ["細"], "织": ["織"],
    "终": ["終"], "绅": ["紳"], "绍": ["紹"], "经": ["經"],
    "绑": ["綁"], "结": ["結"], "绕": ["繞"], "绘": ["繪"],
    "绝": ["絕"], "统": ["統"], "继": ["繼"], "续": ["續"],
    "绳": ["繩"], "维": ["維"], "纲": ["綱"], "网": ["網"],
    "罗": ["羅"], "罚": ["罰"], "聋": ["聾"], "职": ["職"],
    "联": ["聯"], "听": ["聽"], "肃": ["肅"], "肠": ["腸"],
    "肤": ["膚"], "胆": ["膽"], "胜": ["勝"], "胀": ["脹"],
    "脑": ["腦"], "脚": ["腳"], "脱": ["脫"], "脸": ["臉"],
    "舆": ["輿"], "舍": ["舍"], "舰": ["艦"], "艰": ["艱"],
    "艺": ["藝"], "节": ["節"], "华": ["華"], "万": ["萬"],
    "叶": ["葉"], "苏": ["蘇"], "药": ["藥"], "蓝": ["藍"],
    "藏": ["藏"], "虑": ["慮"], "虚": ["虚"], "虽": ["雖"],
    "蚀": ["蝕"], "补": ["補"], "装": ["裝"], "里": ["裡"],
    "裤": ["褲"], "见": ["見"], "观": ["觀"], "规": ["規"],
    "视": ["視"], "览": ["覽"], "觉": ["覺"], "触": ["觸"],
    "订": ["訂"], "计": ["計"], "讯": ["訊"], "讨": ["討"],
    "让": ["讓"], "训": ["訓"], "议": ["議"], "记": ["記"],
    "讲": ["講"], "讳": ["諱"], "讶": ["訝"], "许": ["許"],
    "论": ["論"], "设": ["設"], "访": ["訪"], "证": ["證"],
    "评": ["評"], "识": ["識"], "诈": ["詐"], "诉": ["訴"],
    "诊": ["診"], "词": ["詞"], "译": ["譯"], "试": ["試"],
    "诗": ["詩"], "诚": ["誠"], "话": ["話"], "诞": ["誕"],
    "询": ["詢"], "该": ["該"], "详": ["詳"], "语": ["語"],
    "误": ["誤"], "说": ["說"], "谁": ["誰"], "课": ["課"],
    "调": ["調"], "谈": ["談"], "谋": ["謀"], "谊": ["誼"],
    "请": ["請"], "诸": ["諸"], "诺": ["諾"], "读": ["讀"],
    "谢": ["謝"], "谣": ["謠"], "谜": ["謎"], "谷": ["谷"],
    "贝": ["貝"], "贞": ["貞"], "负": ["負"], "贡": ["貢"],
    "财": ["財"], "责": ["責"], "贤": ["賢"], "败": ["敗"],
    "账": ["賬"], "货": ["貨"], "质": ["質"], "贩": ["販"],
    "贫": ["貧"], "贬": ["貶"], "购": ["購"], "贮": ["貯"],
    "贯": ["貫"], "贱": ["賤"], "贴": ["貼"], "贵": ["貴"],
    "贷": ["貸"], "费": ["費"], "贺": ["賀"], "贼": ["賊"],
    "贿": ["賄"], "赂": ["賂"], "赃": ["贓"], "资": ["資"],
    "赋": ["賦"], "赌": ["賭"], "赎": ["贖"], "赏": ["賞"],
    "赐": ["賜"], "赔": ["賠"], "赖": ["賴"], "赘": ["贅"],
    "赞": ["贊"], "赠": ["贈"], "赶": ["趕"], "赵": ["趙"],
    "跃": ["躍"], "践": ["踐"], "车": ["車"], "轨": ["軌"],
    "轩": ["軒"], "转": ["轉"], "轮": ["輪"], "软": ["軟"],
    "轻": ["輕"], "载": ["載"], "较": ["較"], "辅": ["輔"],
    "辆": ["輛"], "辈": ["輩"], "边": ["邊"], "辽": ["遼"],
    "达": ["達"], "迁": ["遷"], "过": ["過"], "运": ["運"],
    "还": ["還"], "这": ["這"], "进": ["進"], "远": ["遠"],
    "违": ["違"], "连": ["連"], "迟": ["遲"], "适": ["適"],
    "选": ["選"], "遗": ["遺"], "邮": ["郵"], "邻": ["鄰"],
    "郑": ["鄭"], "酝": ["醞"], "酱": ["醬"], "酿": ["釀"],
    "释": ["釋"], "里": ["裡"], "钞": ["鈔"], "钟": ["鐘"],
    "钢": ["鋼"], "钦": ["欽"], "钱": ["錢"], "铁": ["鐵"],
    "铃": ["鈴"], "铅": ["鉛"], "银": ["銀"], "铜": ["銅"],
    "铭": ["銘"], "铸": ["鑄"], "铺": ["鋪"], "链": ["鏈"],
    "锁": ["鎖"], "锅": ["鍋"], "锈": ["鏽"], "镇": ["鎮"],
    "镜": ["鏡"], "长": ["長"], "门": ["門"], "闪": ["閃"],
    "闭": ["閉"], "问": ["問"], "间": ["間"], "闷": ["悶"],
    "闻": ["聞"], "阁": ["閣"], "阅": ["閱"], "阀": ["閥"],
    "阔": ["闊"], "队": ["隊"], "阳": ["陽"], "阴": ["陰"],
    "阵": ["陣"], "阶": ["階"], "际": ["際"], "陆": ["陸"],
    "随": ["隨"], "隐": ["隱"], "难": ["難"], "杂": ["雜"],
    "雾": ["霧"], "霉": ["黴"], "静": ["靜"], "顶": ["頂"],
    "顷": ["頃"], "项": ["項"], "顺": ["順"], "须": ["須"],
    "顿": ["頓"], "颂": ["頌"], "预": ["預"], "领": ["領"],
    "颇": ["頗"], "颗": ["顆"], "题": ["題"], "颜": ["顏"],
    "额": ["額"], "风": ["風"], "飞": ["飛"], "饥": ["飢"],
    "饭": ["飯"], "饮": ["飲"], "饰": ["飾"], "饱": ["飽"],
    "饲": ["飼"], "饼": ["餅"], "饿": ["餓"], "馆": ["館"],
    "马": ["馬"], "驭": ["馭"], "驰": ["馳"], "驱": ["驅"],
    "驾": ["駕"], "骗": ["騙"], "骚": ["騷"], "骤": ["驟"],
    "鱼": ["魚"], "鲁": ["魯"], "鲜": ["鮮"], "鲸": ["鯨"],
    "鸟": ["鳥"], "鸣": ["鳴"], "鸡": ["雞"], "鹤": ["鶴"],
    "丽": ["麗"], "麦": ["麥"], "黄": ["黃"], "齐": ["齊"],
    "齿": ["齒"], "龙": ["龍"], "龟": ["龜"]
  });

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
    return (cp >= 0x3400 && cp <= 0x9FFF)
      || (cp >= 0xF900 && cp <= 0xFAFF)
      || (cp >= 0x20000 && cp <= 0x2EBEF)
      || (cp >= 0x2F800 && cp <= 0x2FA1F);
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

  // Site-wide spelling decisions. Apply these before building either lookup
  // index so every tool exposes the same reading inventory.
  function normalizeSharedReadingSpelling(reading){
    let normalized = String(reading || "").normalize("NFC");
    if (foldReading(normalized) === "cwon") normalized = normalized.replace(/^cw/, "c");
    if (foldReading(normalized) === "hwon") normalized = normalized.replace(/^hw/, "h");
    if (normalized.startsWith("nw")) normalized = normalized.slice(0, 1) + normalized.slice(2);
    const segmental = foldReading(normalized);
    if (segmental.startsWith("xy") && extractNucleus(segmental).nucleus === "y") {
      const replacement = "xi" + segmental.slice(2);
      const decomposed = normalized.normalize("NFD");
      const tone = decomposed.includes(COMB_ACUTE) ? "上" : (decomposed.includes(COMB_GRAVE) ? "去" : "");
      normalized = addToneMarkToNucleus(replacement, extractNucleus(replacement).start, tone);
    }
    return normalized;
  }

  function applyFrequencyReadingOverride(entry){
    if (!entry || typeof entry.reading !== "string" || !entry.reading) return;
    const bySourceReading = FREQUENCY_READING_OVERRIDES[entry.char];
    if (!bySourceReading) return;
    const tone = entry.mc && typeof entry.mc.tone === "string" ? entry.mc.tone : "";
    const visited = new Set();
    for (let step = 0; step < 8; step += 1) {
      const source = foldReading(entry.reading);
      if (visited.has(source)) break;
      visited.add(source);
      const replacement = bySourceReading[source];
      if (typeof replacement !== "string" || !replacement) break;
      entry.reading = addToneMarkToNucleus(replacement, extractNucleus(replacement).start, tone);
      entry.readingOverride = replacement;
    }
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
    if (base === "buek") return "fuek";
    if (base === "foet") return "boet";
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
      entry.reading = normalizeSharedReadingSpelling(entry.reading);
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

  function getEntryReadingType(entry){
    return entry && entry.readingType === READING_TYPE_PURE ? READING_TYPE_PURE : READING_TYPE_SINO;
  }

  function getEntryReadingLabel(entry){
    return entry && typeof entry.readingLabel === "string" ? entry.readingLabel : "";
  }

  function normalizeSupplementalReading(value){
    return normalizeSharedReadingSpelling(String(value || "").trim());
  }

  function injectSupplementalReadings(charIndex, allEntries){
    for (const [char, specs] of Object.entries(EXTRA_CHARACTER_READINGS)){
      for (const spec of specs){
        const reading = normalizeSupplementalReading(spec && spec.reading);
        if (!reading) continue;
        const entry = {
          char,
          xiaoyun: "",
          mc: null,
          reading,
          readingType: spec.readingType === READING_TYPE_PURE ? READING_TYPE_PURE : READING_TYPE_SINO,
          readingLabel: typeof spec.label === "string" ? spec.label : "",
          conv: null,
          isSupplemental: true
        };
        addToListMap(charIndex, char, entry);
        allEntries.push(entry);
      }
    }
  }

  function addCharacterVariantAliases(charIndex){
    // Keep a snapshot of the source entries.  Aliases must be made from this
    // snapshot so an alias never recursively inherits another alias.
    const sourceIndex = new Map(charIndex);
    const aliases = new Map();

    function addAlias(lookupChar, sourceChar){
      if (!lookupChar || !sourceChar || lookupChar === sourceChar) return;
      if (!aliases.has(lookupChar)) aliases.set(lookupChar, new Set());
      aliases.get(lookupChar).add(sourceChar);
    }

    for (const [lookupChar, sourceChars] of Object.entries(CHARACTER_VARIANT_ALIASES)){
      for (const sourceChar of sourceChars) addAlias(lookupChar, sourceChar);
    }

    // Unicode compatibility ideographs (for example, forms in the CJK
    // Compatibility Ideographs block) can be resolved automatically.
    for (const sourceChar of sourceIndex.keys()){
      const normalized = sourceChar.normalize("NFKC");
      addAlias(normalized, sourceChar);
    }

    for (const [lookupChar, sourceChars] of aliases){
      const entries = charIndex.get(lookupChar) || [];
      const presentSourceEntries = new Set(entries.map(entry => entry.variantSourceEntry || entry));

      for (const sourceChar of sourceChars){
        for (const sourceEntry of sourceIndex.get(sourceChar) || []){
          if (presentSourceEntries.has(sourceEntry)) continue;
          entries.push({
            ...sourceEntry,
            char: lookupChar,
            variantSourceEntry: sourceEntry,
            variantSourceChar: sourceChar
          });
          presentSourceEntries.add(sourceEntry);
        }
      }

      if (entries.length > 0) charIndex.set(lookupChar, entries);
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
        const entry = { char: ch, xiaoyun, mc, readingType: READING_TYPE_SINO, readingLabel: "" };
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
    for (const entry of allEntries) applyFrequencyReadingOverride(entry);
    injectSupplementalReadings(charIndex, allEntries);
    addCharacterVariantAliases(charIndex);

    for (const entry of allEntries){
      if (typeof entry.reading !== "string" || entry.reading.length === 0) continue;
      const reverseEntry = {
        char: entry.char,
        xiaoyun: entry.xiaoyun || "",
        mc: entry.mc || null,
        reading: entry.reading,
        readingType: getEntryReadingType(entry),
        readingLabel: getEntryReadingLabel(entry),
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

  function compareReadingDetails(a, b){
    const typeDiff = (a.readingType === READING_TYPE_PURE ? 1 : 0) - (b.readingType === READING_TYPE_PURE ? 1 : 0);
    if (typeDiff) return typeDiff;
    const readingDiff = sortReadings(a.reading, b.reading);
    if (readingDiff) return readingDiff;
    return String(a.label || "").localeCompare(String(b.label || ""), "ja");
  }

  function getCharacterEntries(dictionary, char){
    if (!dictionary || !dictionary.charIndex || typeof char !== "string") return [];
    const directEntries = dictionary.charIndex.get(char) || [];
    if (directEntries.length > 0) return directEntries;

    // Some Japanese glyphs use a CJK Compatibility Ideograph code point.
    // Their NFKC form is the ordinary unified ideograph used by the index.
    const normalized = char.normalize("NFKC");
    return normalized === char ? [] : (dictionary.charIndex.get(normalized) || []);
  }

  function getCharReadingDetails(dictionary, char){
    const entries = getCharacterEntries(dictionary, char);
    const details = [];
    const seen = new Set();

    for (const entry of entries){
      if (typeof entry.reading !== "string" || entry.reading.length === 0) continue;
      const detail = {
        reading: entry.reading,
        readingType: getEntryReadingType(entry),
        label: getEntryReadingLabel(entry)
      };
      const key = `${detail.readingType}\u0000${detail.reading}\u0000${detail.label}`;
      if (seen.has(key)) continue;
      seen.add(key);
      details.push(detail);
    }

    return details.sort(compareReadingDetails);
  }

  function getCharReadings(dictionary, char){
    return Array.from(new Set(
      getCharReadingDetails(dictionary, char).map(detail => detail.reading)
    ));
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
      if (typeof entry.xiaoyun === "string" && entry.xiaoyun.length > 0) item.xiaoyun.add(entry.xiaoyun);
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
    return `${entry.char}\u0000${entry.reading}\u0000${entry.xiaoyun || ""}\u0000${entry.readingType || READING_TYPE_SINO}\u0000${entry.readingLabel || ""}`;
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

  function makeCharacterMatchItems(dictionary, entries){
    const byChar = new Map();

    for (const entry of entries){
      if (!entry || typeof entry.char !== "string" || entry.char.length === 0) continue;
      if (!byChar.has(entry.char)) {
        byChar.set(entry.char, {
          char: entry.char,
          matchCount: 0,
          xiaoyun: new Set(),
          initialMus: new Set(),
          rimeNames: new Set(),
          tones: new Set()
        });
      }

      const item = byChar.get(entry.char);
      item.matchCount += 1;
      if (typeof entry.xiaoyun === "string" && entry.xiaoyun.length > 0) item.xiaoyun.add(entry.xiaoyun);
      if (entry.mc && entry.mc.initialMu) item.initialMus.add(entry.mc.initialMu);
      if (entry.mc && entry.mc.rimeName) item.rimeNames.add(entry.mc.rimeName);
      if (entry.mc && entry.mc.tone) item.tones.add(entry.mc.tone);
    }

    return Array.from(byChar.values()).map(item => {
      const readingDetails = getCharReadingDetails(dictionary, item.char);
      return {
        char: item.char,
        matchCount: item.matchCount,
        readings: readingDetails.map(detail => detail.reading),
        readingDetails,
        xiaoyun: Array.from(item.xiaoyun).sort(),
        initialMus: Array.from(item.initialMus).sort((a, b) => a.localeCompare(b, "ja")),
        rimeNames: Array.from(item.rimeNames).sort((a, b) => a.localeCompare(b, "ja")),
        tones: Array.from(item.tones).sort(compareTone)
      };
    }).sort((a, b) => a.char.localeCompare(b.char, "ja"));
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
      if (!entry.mc) return false;
      if (initialSet.size && !initialSet.has(entry.mc.initialMu)) return false;
      if (rimeSet.size && !rimeSet.has(entry.mc.rimeName)) return false;
      if (toneSet.size && !toneSet.has(entry.mc.tone)) return false;
      return true;
    });

    return {
      initialMus,
      rimeNames,
      tones,
      items: makeCharacterMatchItems(dictionary, matched),
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
    getCharacterEntries,
    getCharReadingDetails,
    getCharReadings,
    searchByReading,
    searchByReadings,
    searchByMcFilters,
    transcribeText,
    foldReading,
    READING_TYPE_PURE,
    READING_TYPE_SINO,
    PURE_READING_LABEL
  };
})();
