/**
 * JIROBUCKS (ジロバックス) - Main Application Script
 * Ramen Jiro Call & Starbucks Order Spell Generator
 * © 2026 c1t0d0s0
 */

// ==========================================================================
// 1. Google Analytics / GTM Initialization
// ==========================================================================
function initAnalytics() {
  try {
    if (typeof GTM_ID !== 'undefined' && GTM_ID && typeof GTM_ID === 'string') {
      const trimmedId = GTM_ID.trim();
      if (!trimmedId) return;

      if (trimmedId.startsWith('G-')) {
        // Google Analytics 4 (GA4) Tag
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(trimmedId)}`;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        function gtag() {
          window.dataLayer.push(arguments);
        }
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', trimmedId);
      } else if (trimmedId.startsWith('GTM-')) {
        // Google Tag Manager (GTM)
        (function (w, d, s, l, i) {
          w[l] = w[l] || [];
          w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
          const f = d.getElementsByTagName(s)[0];
          const j = d.createElement(s);
          const dl = l !== 'dataLayer' ? '&l=' + l : '';
          j.async = true;
          j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
          f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', trimmedId);
      }
    }
  } catch (err) {
    console.warn('Analytics initialization skipped:', err);
  }
}

// ==========================================================================
// 2. Internationalization (i18n) Dictionary & Setup
// ==========================================================================
const I18N = {
  ja: {
    appSubtitle: '二郎 & スタバ 呪文コールジェネレーター',
    modeJiro: 'ラーメン二郎',
    modeStarbucks: 'スターバックス',
    jiroBadge: 'ニンニク入れますか？',
    jiroHeading: '二郎コールの緊張から解放',
    jiroDesc: '好みをタップするだけで瞬時に完璧なコールを生成。店員に見せるモードで初心者も安心！',
    bucksBadge: 'バリスタへのオーダー呪文',
    bucksHeading: 'スタバの呪文もサクッと完成',
    bucksDesc: 'サイズやミルク、シロップなどの複雑なカスタム呪文をレジでそのまま読める形に整理！',
    btnRandom: 'おまかせ生成',
    btnReset: 'リセット',
    presetsTitle: 'クイック定番プリセット',
    tagJiroCall: '二郎コール呪文',
    tagBucksOrder: 'スタバ注文呪文',
    tipJiroTitle: '唱えるタイミング',
    tipJiroText: '丼が提供される直前に店員さんから「ニンニク入れますか？」と聞かれたら、そのまま唱えましょう！',
    tipBucksTitle: '注文のポイント',
    tipBucksText: 'レジでこのまま読み上げるか、「店員に見せる」ボタンを押して画面をバリスタに見せればOKです！',
    btnShowStaff: '店員に見せる (巨大文字)',
    btnCopy: 'コピー',
    btnCopied: 'コピー完了！',
    btnSpeak: '読み上げ',
    btnShare: 'シェア',
    btnViewSpell: '呪文を見る',
    btnDismissSpell: '▼ 閉じて選択に戻る',
    metricCalorieLabel: '推定カロリー:',
    guideTitleJiro: '【初心者必読】ラーメン二郎の入店・注文ルールとマナー',
    guideTitleBucks: '【スタバ初心者向け】サイズ一覧とカスタムの基礎知識',
    modalBadge: '店員さんにお見せください',
    modalSubJiro: '【ラーメン二郎 コール】',
    modalSubBucks: '【スターバックス カスタム注文】',
    modalNote: '※画面の明るさを上げてそのままスタッフにお見せください',
    modalBtnDismiss: '閉じる',
    footerTagline: '二郎とスタバをもっと身近に',
    footerDisclaimer: '当サイトはファンメイドの非公式コール・注文ジェネレーターです。各店舗の公式サービスとは一切関係ありません。',

    // Jiro field labels & options
    jiroTimingTicket: '① 食券提出時',
    jiroTicketTitle: '麺の量 & 硬さ',
    jiroTicketHint: '※着席時に食券を置く際、店員さんに伝える',
    labelNoodleAmount: '麺の量',
    optNoodleNormal: '普通 (約300g~)',
    optNoodleLess: '少なめ',
    optNoodleHalf: '半分',
    optNoodleThird: '1/3',
    labelNoodleFirmness: '麺の硬さ',
    optFirmNormal: '普通',
    optFirmKatame: 'カタメ (硬め)',
    optFirmBarikata: 'バリカタ',
    optFirmYawame: 'ヤワメ (柔らかめ)',
    jiroTimingCall: '② トッピングコール',
    jiroCallTitle: '「ニンニク入れますか？」へのコール',
    jiroCallHint: '※丼が完成する直前に店員さんから聞かれます！',
    labelGarlic: 'ニンニク (Garlic)',
    descGarlic: '刻み生ニンニクの有無と量',
    optGarlicNone: '抜き (なし)',
    optGarlicLess: '少なめ',
    optGarlicNormal: 'ニンニク (標準)',
    optGarlicMashi: 'マシ',
    optGarlicMashimashi: 'マシマシ',
    labelYasai: 'ヤサイ (Vegetables)',
    descYasai: 'もやし＆キャベツの山盛り加減',
    optYasaiNone: '抜き',
    optYasaiLess: '少なめ',
    optYasaiNormal: 'そのまま (標準)',
    optYasaiMashi: 'マシ',
    optYasaiMashimashi: 'マシマシ',
    labelAbura: 'アブラ (Pork Fat)',
    descAbura: '背脂の量・甘みとコクが増加',
    optAburaNone: '抜き',
    optAburaLess: '少なめ',
    optAburaNormal: 'そのまま (標準)',
    optAburaMashi: 'マシ',
    optAburaMashimashi: 'マシマシ',
    labelKarame: 'カラメ (Soy Sauce Tare)',
    descKarame: '醤油ダレの濃さ・味の濃さ',
    optKarameNormal: 'そのまま (標準)',
    optKarameMashi: 'カラメ (濃いめ)',
    optKarameKarakara: 'カラカラ (超濃いめ)',
    labelJiroAbbreviate: 'まとめて短縮コール（全マシ・全マシマシ等）を有効にする',
    descJiroAbbreviate: 'オフにすると「ニンニクマシヤサイマシアブラマシカラメ」のようにすべて言葉にして唱えます',

    // Starbucks field labels & options
    bucksStep1: 'Step 1',
    bucksTitleDrink: 'ベースドリンクを選択',
    labelDrinkCategory: 'カテゴリー',
    catEspresso: 'エスプレッソ',
    catFrappuccino: 'フラペチーノ',
    catTea: 'ティー・その他',
    labelDrinkName: 'ドリンク名',
    bucksStep2: 'Step 2',
    bucksTitleSize: 'サイズ & 温度',
    labelTemp: '温度',
    optTempHot: '🔥 ホット (HOT)',
    optTempIced: '🧊 アイス (ICED)',
    labelSize: 'サイズ',
    optSizeShort: 'Short (ショート 240ml)',
    optSizeTall: 'Tall (トール 350ml)',
    optSizeGrande: 'Grande (グランデ 470ml)',
    optSizeVenti: 'Venti® (ベンティ 590ml)',
    bucksStep3: 'Step 3',
    bucksTitleCustom: 'ミルク & エスプレッソ・カスタム',
    labelMilk: 'ミルクの種類',
    optMilkRegular: '通常ミルク',
    optMilkLowFat: '低脂肪タイプ (無料)',
    optMilkNonFat: '無脂肪乳 (ノンファット/無料)',
    optMilkSoy: 'ソイミルク (調整豆乳/+55円)',
    optMilkAlmond: 'アーモンドミルク (+55円)',
    optMilkOat: 'オーツミルク (+55円)',
    optMilkBreve: 'ブレベ (生クリーム5:牛乳5/+55円)',
    labelShots: 'エスプレッソ ショット',
    optShotsStandard: '標準量',
    optShotsNone: 'ショット抜き (なし)',
    optShotsSingle: '+1 ショット追加 (ソロ/+55円)',
    optShotsDouble: '+2 ショット追加 (ディオ/+110円)',
    optShotsTriple: 'トリプル (3ショット)',
    optShotsQuad: 'クアッド (4ショット)',
    labelBeans: '豆・カフェイン変更',
    optBeansStandard: '標準エスプレッソ',
    optBeansDecaf: 'ディカフェ変更 (カフェインレス/+55円)',
    optBeansBlonde: 'ブロンド エスプレッソ変更 (軽やか/無料)',
    optBeansRistretto: 'リストレット (短時間抽出・甘み/無料)',
    bucksStep4: 'Step 4',
    bucksTitleTopping: 'シロップ・ホイップ・トッピング',
    labelSyrup: 'シロップ',
    optSyrupDefault: '標準のまま',
    optSyrupVanilla: 'バニラシロップ追加 (+55円)',
    optSyrupCaramel: 'キャラメルシロップ追加 (+55円)',
    optSyrupWhiteMocha: 'ホワイトモカシロップ追加 (+55円)',
    optSyrupExtra: 'シロップ多め (エクストラシロップ/無料)',
    optSyrupLight: 'シロップ少なめ (ライトシロップ/無料)',
    optSyrupNone: 'ノンシロップ (シロップ抜き/無料)',
    labelWhip: 'ホイップクリーム',
    optWhipDefault: '標準 (元々入っていればあり)',
    optWhipExtra: '多め (エクストラホイップ/無料)',
    optWhipLight: '少なめ (ライトホイップ/無料)',
    optWhipNone: 'ホイップなし (ノンホイップ/無料)',
    optWhipAdd: 'ホイップ追加 (+55円)',
    labelDrizzle: 'ソース (無料トッピング)',
    optDrizzleNone: 'なし',
    optDrizzleCaramel: 'キャラメルソース追加 (無料)',
    optDrizzleChocolate: 'チョコソース追加 (無料)',
    optDrizzleBoth: 'キャラメル & チョコ両方追加 (Wソース/無料)',
    optDrizzleHoney: 'はちみつ追加 (無料)',
    labelIceMilk: '氷 & ミルクの配分 (アイス時)',
    optIceMilkDefault: '標準',
    optIceMilkLightExtra: '氷少なめ & ミルク多め (ライトアイス・エクストラミルク)',
    optIceMilkNoIce: '氷なし (ノンアイス)',
    optIceMilkExtraIce: '氷多め (エクストラアイス)',
    labelFrapCustom: 'フラペチーノ専用カスタム',
    optFrapNone: 'なし',
    optFrapExtraPowder: 'パウダー多め (エクストラパウダー/無料)',
    optFrapChocChip: 'チョコチップ追加 (+55円)',
    optFrapAll: 'パウダー多め & チップ追加'
  },
  en: {
    appSubtitle: 'Jiro & Starbucks Order Spell Generator',
    modeJiro: 'Ramen Jiro',
    modeStarbucks: 'Starbucks',
    jiroBadge: 'Do you want garlic? (Ninniku Iremasuka?)',
    jiroHeading: 'Conquer the Jiro Call with Zero Stress',
    jiroDesc: 'Tap your preferences to generate the perfect ordering spell instantly. Show the screen to the chef with ease!',
    bucksBadge: 'Barista Order Spell Builder',
    bucksHeading: 'Master Complex Starbucks Orders',
    bucksDesc: 'Assemble sizes, milk alternatives, and custom syrups into a fluent barista-ready order spell!',
    btnRandom: 'Random Combo',
    btnReset: 'Reset',
    presetsTitle: 'Popular Quick Presets',
    tagJiroCall: 'Jiro Call Spell',
    tagBucksOrder: 'Starbucks Order Spell',
    tipJiroTitle: 'When to say the call',
    tipJiroText: 'Right before your bowl is served, the chef will ask "Ninniku iremasuka?". Reply with this call!',
    tipBucksTitle: 'How to order',
    tipBucksText: 'Read this spell at the register, or tap "Show to Staff" to present your screen to the barista!',
    btnShowStaff: 'Show to Staff (Big Text)',
    btnCopy: 'Copy Spell',
    btnCopied: 'Copied!',
    btnSpeak: 'Read Aloud',
    btnShare: 'Share',
    btnViewSpell: 'View Spell',
    btnDismissSpell: '▼ Close (Back to options)',
    metricCalorieLabel: 'Est. Calories:',
    guideTitleJiro: '【Beginner Guide】Ramen Jiro Etiquette & Ordering Rules',
    guideTitleBucks: '【Beginner Guide】Starbucks Sizes & Customization Basics',
    modalBadge: 'Please show this screen to the staff',
    modalSubJiro: '【Ramen Jiro Call】',
    modalSubBucks: '【Starbucks Custom Order】',
    modalNote: '※ Turn up your screen brightness and present this to the staff across the counter.',
    modalBtnDismiss: 'Close',
    footerTagline: 'Bringing Jiro and Starbucks closer to everyone',
    footerDisclaimer: 'This is an unofficial fan-made utility. Not affiliated with Ramen Jiro or Starbucks Corporation.',

    // Jiro field labels & options
    jiroTimingTicket: '① Handing in Ticket',
    jiroTicketTitle: 'Noodle Amount & Firmness',
    jiroTicketHint: '※ Tell the chef when placing your plastic ticket on the counter',
    labelNoodleAmount: 'Noodle Amount',
    optNoodleNormal: 'Normal (~300g+)',
    optNoodleLess: 'Less (Sukuname)',
    optNoodleHalf: 'Half (Hanbun)',
    optNoodleThird: '1/3 (Sanbun-no-ichi)',
    labelNoodleFirmness: 'Noodle Firmness',
    optFirmNormal: 'Normal',
    optFirmKatame: 'Firm (Katame)',
    optFirmBarikata: 'Extra Firm (Barikata)',
    optFirmYawame: 'Soft (Yawame)',
    jiroTimingCall: '② Free Topping Call',
    jiroCallTitle: 'Response to "Ninniku Iremasuka?"',
    jiroCallHint: '※ The chef asks right before plating your bowl!',
    labelGarlic: 'Garlic (Ninniku)',
    descGarlic: 'Minced raw garlic portion',
    optGarlicNone: 'No Garlic (Nuki)',
    optGarlicLess: 'A Little (Sukuname)',
    optGarlicNormal: 'Normal (Ninniku)',
    optGarlicMashi: 'Extra (Mashi)',
    optGarlicMashimashi: 'Double Extra (Mashimashi)',
    labelYasai: 'Vegetables (Yasai)',
    descYasai: 'Mountain of bean sprouts & cabbage',
    optYasaiNone: 'None (Nuki)',
    optYasaiLess: 'Less (Sukuname)',
    optYasaiNormal: 'Standard (Sonomama)',
    optYasaiMashi: 'Extra (Mashi)',
    optYasaiMashimashi: 'Double Extra (Mashimashi)',
    labelAbura: 'Pork Fat (Abura)',
    descAbura: 'Sweet seasoned pork back fat',
    optAburaNone: 'None (Nuki)',
    optAburaLess: 'Less (Sukuname)',
    optAburaNormal: 'Standard (Sonomama)',
    optAburaMashi: 'Extra (Mashi)',
    optAburaMashimashi: 'Double Extra (Mashimashi)',
    labelKarame: 'Soy Sauce Tare (Karame)',
    descKarame: 'Strength of rich soy seasoning',
    optKarameNormal: 'Standard (Sonomama)',
    optKarameMashi: 'Stronger (Karame)',
    optKarameKarakara: 'Extra Strong (Karakara)',
    labelJiroAbbreviate: 'Enable combo abbreviations (Zen-mashi, Zen-mashimashi)',
    descJiroAbbreviate: 'When disabled, every topping will be pronounced in full sequence',

    // Starbucks field labels & options
    bucksStep1: 'Step 1',
    bucksTitleDrink: 'Select Base Drink',
    labelDrinkCategory: 'Category',
    catEspresso: 'Espresso',
    catFrappuccino: 'Frappuccino',
    catTea: 'Tea & Others',
    labelDrinkName: 'Beverage Name',
    bucksStep2: 'Step 2',
    bucksTitleSize: 'Size & Temperature',
    labelTemp: 'Temperature',
    optTempHot: '🔥 Hot',
    optTempIced: '🧊 Iced',
    labelSize: 'Size',
    optSizeShort: 'Short (240ml)',
    optSizeTall: 'Tall (350ml)',
    optSizeGrande: 'Grande (470ml)',
    optSizeVenti: 'Venti® (590ml)',
    bucksStep3: 'Step 3',
    bucksTitleCustom: 'Milk & Espresso Customizations',
    labelMilk: 'Milk Options',
    optMilkRegular: 'Regular Milk',
    optMilkLowFat: 'Low-Fat (Free)',
    optMilkNonFat: 'Non-Fat Milk (Free)',
    optMilkSoy: 'Soy Milk (+¥55)',
    optMilkAlmond: 'Almond Milk (+¥55)',
    optMilkOat: 'Oat Milk (+¥55)',
    optMilkBreve: 'Breve (Cream & Milk/+¥55)',
    labelShots: 'Espresso Shots',
    optShotsStandard: 'Standard Shot',
    optShotsNone: 'No Espresso Shot',
    optShotsSingle: '+1 Extra Shot (Solo/+¥55)',
    optShotsDouble: '+2 Extra Shots (Doppio/+¥110)',
    optShotsTriple: 'Triple (3 Shots)',
    optShotsQuad: 'Quad (4 Shots)',
    labelBeans: 'Beans & Decaf',
    optBeansStandard: 'Standard Roast',
    optBeansDecaf: 'Decaf (+¥55)',
    optBeansBlonde: 'Blonde Roast (Free)',
    optBeansRistretto: 'Ristretto (Free)',
    bucksStep4: 'Step 4',
    bucksTitleTopping: 'Syrups, Whip & Toppings',
    labelSyrup: 'Syrups',
    optSyrupDefault: 'Default',
    optSyrupVanilla: 'Add Vanilla Syrup (+¥55)',
    optSyrupCaramel: 'Add Caramel Syrup (+¥55)',
    optSyrupWhiteMocha: 'Add White Mocha Syrup (+¥55)',
    optSyrupExtra: 'Extra Syrup (Free)',
    optSyrupLight: 'Light Syrup (Free)',
    optSyrupNone: 'No Syrup (Free)',
    labelWhip: 'Whipped Cream',
    optWhipDefault: 'Standard',
    optWhipExtra: 'Extra Whip (Free)',
    optWhipLight: 'Light Whip (Free)',
    optWhipNone: 'No Whip (Free)',
    optWhipAdd: 'Add Whip (+¥55)',
    labelDrizzle: 'Drizzle / Sauce (Free Topping)',
    optDrizzleNone: 'None',
    optDrizzleCaramel: 'Add Caramel Sauce (Free)',
    optDrizzleChocolate: 'Add Chocolate Sauce (Free)',
    optDrizzleBoth: 'Double Sauce (Caramel & Choc/Free)',
    optDrizzleHoney: 'Add Honey (Free)',
    labelIceMilk: 'Ice & Milk Ratio (Iced only)',
    optIceMilkDefault: 'Standard',
    optIceMilkLightExtra: 'Light Ice & Extra Milk (Free)',
    optIceMilkNoIce: 'No Ice',
    optIceMilkExtraIce: 'Extra Ice',
    labelFrapCustom: 'Frappuccino Exclusive Custom',
    optFrapNone: 'None',
    optFrapExtraPowder: 'Extra Powder (Free)',
    optFrapChocChip: 'Add Chocolate Chips (+¥55)',
    optFrapAll: 'Extra Powder & Chocolate Chips'
  }
};

// ==========================================================================
// 3. Drink Catalog for Starbucks
// ==========================================================================
const STARBUCKS_DRINKS = [
  // Espresso
  { id: 'starbucks_latte', category: 'espresso', ja: 'スターバックス ラテ', en: 'Starbucks Latte', defaultHotIce: 'both', hasWhip: false, hasSyrup: false, hasEspresso: true },
  { id: 'cappuccino', category: 'espresso', ja: 'カプチーノ', en: 'Cappuccino', defaultHotIce: 'hot', hasWhip: false, hasSyrup: false, hasEspresso: true },
  { id: 'caffe_americano', category: 'espresso', ja: 'カフェ アメリカーノ', en: 'Caffè Americano', defaultHotIce: 'both', hasWhip: false, hasSyrup: false, hasEspresso: true },
  { id: 'caramel_macchiato', category: 'espresso', ja: 'キャラメル マキアート', en: 'Caramel Macchiato', defaultHotIce: 'both', hasWhip: false, hasSyrup: true, hasEspresso: true },
  { id: 'caffe_mocha', category: 'espresso', ja: 'カフェ モカ', en: 'Caffè Mocha', defaultHotIce: 'both', hasWhip: true, hasSyrup: true, hasEspresso: true },
  { id: 'white_mocha', category: 'espresso', ja: 'ホワイト モカ', en: 'White Mocha', defaultHotIce: 'both', hasWhip: true, hasSyrup: true, hasEspresso: true },

  // Frappuccino
  { id: 'dark_mocha_frap', category: 'frappuccino', ja: 'ダーク モカ チップ フラペチーノ', en: 'Dark Mocha Chip Frappuccino', defaultHotIce: 'iced', hasWhip: true, hasSyrup: true, hasEspresso: false },
  { id: 'matcha_frap', category: 'frappuccino', ja: '抹茶 クリーム フラペチーノ', en: 'Matcha Cream Frappuccino', defaultHotIce: 'iced', hasWhip: true, hasSyrup: true, hasEspresso: false },
  { id: 'caramel_frap', category: 'frappuccino', ja: 'キャラメル フラペチーノ', en: 'Caramel Frappuccino', defaultHotIce: 'iced', hasWhip: true, hasSyrup: true, hasEspresso: false },
  { id: 'vanilla_frap', category: 'frappuccino', ja: 'バニラ クリーム フラペチーノ', en: 'Vanilla Cream Frappuccino', defaultHotIce: 'iced', hasWhip: true, hasSyrup: true, hasEspresso: false },

  // Tea & Others
  { id: 'chai_tea_latte', category: 'tea', ja: 'チャイ ティー ラテ', en: 'Chai Tea Latte', defaultHotIce: 'both', hasWhip: false, hasSyrup: true, hasEspresso: false },
  { id: 'hojicha_tea_latte', category: 'tea', ja: 'ほうじ茶 ティー ラテ', en: 'Hojicha Tea Latte', defaultHotIce: 'both', hasWhip: false, hasSyrup: true, hasEspresso: false },
  { id: 'drip_coffee', category: 'tea', ja: 'ドリップ コーヒー', en: 'Drip Coffee', defaultHotIce: 'both', hasWhip: false, hasSyrup: false, hasEspresso: false }
];

// ==========================================================================
// 4. Presets Catalog
// ==========================================================================
const JIRO_PRESETS = [
  {
    id: 'zenmashi',
    emoji: '🔥',
    ja: '全マシ (人気No.1)',
    en: 'Zen-mashi (All Extra)',
    state: { noodleAmount: 'normal', noodleFirmness: 'normal', garlic: 'mashi', yasai: 'mashi', abura: 'mashi', karame: 'karame', abbreviate: true }
  },
  {
    id: 'classic',
    emoji: '🍜',
    ja: '王道二郎 (ニンニクマシヤサイ)',
    en: 'The Classic Jiro',
    state: { noodleAmount: 'normal', noodleFirmness: 'normal', garlic: 'mashi', yasai: 'mashi', abura: 'normal', karame: 'normal', abbreviate: true }
  },
  {
    id: 'beginner',
    emoji: '🔰',
    ja: '初心者安心 (麺少なめ・ニンニク少なめ)',
    en: 'Beginner Safe',
    state: { noodleAmount: 'less', noodleFirmness: 'normal', garlic: 'less', yasai: 'normal', abura: 'normal', karame: 'normal', abbreviate: true }
  },
  {
    id: 'mashimashi',
    emoji: '⛰️',
    ja: 'チョモランマ (全マシマシ)',
    en: 'Chomolungma (All Double Extra)',
    state: { noodleAmount: 'normal', noodleFirmness: 'katame', garlic: 'mashimashi', yasai: 'mashimashi', abura: 'mashimashi', karame: 'karakara', abbreviate: true }
  },
  {
    id: 'guiltfree',
    emoji: '🥗',
    ja: 'ギルティ回避 (麺半分・ヤサイ・脂抜き)',
    en: 'Guilt-Free (Half noodle, No fat)',
    state: { noodleAmount: 'half', noodleFirmness: 'normal', garlic: 'less', yasai: 'mashi', abura: 'none', karame: 'normal', abbreviate: true }
  },
  {
    id: 'heavy',
    emoji: '💥',
    ja: 'アブラカラメ特化 (カタメアブラカラカラ)',
    en: 'Heavy & Salty Specialist',
    state: { noodleAmount: 'normal', noodleFirmness: 'katame', garlic: 'normal', yasai: 'less', abura: 'mashimashi', karame: 'karakara', abbreviate: false }
  }
];

const STARBUCKS_PRESETS = [
  {
    id: 'classic_latte',
    emoji: '☕',
    ja: '王道スタバラテ (トール ホット)',
    en: 'Classic Tall Latte',
    state: { category: 'espresso', drinkId: 'starbucks_latte', temp: 'hot', size: 'tall', milk: 'regular', shots: 'standard', beans: 'standard', syrup: 'default', whip: 'default', drizzle: 'none', icemilk: 'default', frapcustom: 'none' }
  },
  {
    id: 'triple_grande_latte',
    emoji: '⚡',
    ja: 'トリプル・グランデ・ラテ',
    en: 'Triple Grande Latte',
    state: { category: 'espresso', drinkId: 'starbucks_latte', temp: 'hot', size: 'grande', milk: 'regular', shots: 'triple', beans: 'standard', syrup: 'default', whip: 'default', drizzle: 'none', icemilk: 'default', frapcustom: 'none' }
  },
  {
    id: 'healthy_whitemocha',
    emoji: '🌿',
    ja: 'トール・ホワイトモカ・ノンファット・ディカフェ',
    en: 'Tall White Mocha Non-fat Decaf',
    state: { category: 'espresso', drinkId: 'white_mocha', temp: 'hot', size: 'tall', milk: 'nonfat', shots: 'standard', beans: 'decaf', syrup: 'default', whip: 'light', drizzle: 'none', icemilk: 'default', frapcustom: 'none' }
  },
  {
    id: 'devil_matcha',
    emoji: '😈',
    ja: '悪魔の抹茶フラペチーノ',
    en: "Devil's Matcha Frappuccino",
    state: { category: 'frappuccino', drinkId: 'matcha_frap', temp: 'iced', size: 'tall', milk: 'breve', shots: 'standard', beans: 'standard', syrup: 'default', whip: 'extra', drizzle: 'chocolate', icemilk: 'default', frapcustom: 'allcustom' }
  },
  {
    id: 'indulgent_caramel',
    emoji: '🍮',
    ja: '濃厚ご褒美キャラメルマキアート',
    en: 'Rich Caramel Macchiato',
    state: { category: 'espresso', drinkId: 'caramel_macchiato', temp: 'iced', size: 'grande', milk: 'oat', shots: 'single', beans: 'standard', syrup: 'caramel', whip: 'add', drizzle: 'both', icemilk: 'lightice-extramilk', frapcustom: 'none' }
  },
  {
    id: 'diet_soy',
    emoji: '🌱',
    ja: 'ソイ・ディカフェ・アメリカーノ',
    en: 'Soy Decaf Americano',
    state: { category: 'espresso', drinkId: 'caffe_americano', temp: 'iced', size: 'grande', milk: 'soy', shots: 'standard', beans: 'decaf', syrup: 'none', whip: 'none', drizzle: 'none', icemilk: 'default', frapcustom: 'none' }
  }
];

// ==========================================================================
// 5. Application State
// ==========================================================================
const state = {
  mode: 'jiro', // 'jiro' | 'starbucks'
  lang: 'ja',   // 'ja' | 'en'

  jiro: {
    noodleAmount: 'normal',
    noodleFirmness: 'normal',
    garlic: 'normal',
    yasai: 'normal',
    abura: 'normal',
    karame: 'normal',
    abbreviate: true
  },

  starbucks: {
    category: 'espresso',
    drinkId: 'starbucks_latte',
    temp: 'hot',
    size: 'tall',
    milk: 'regular',
    shots: 'standard',
    beans: 'standard',
    syrup: 'default',
    whip: 'default',
    drizzle: 'none',
    icemilk: 'default',
    frapcustom: 'none'
  }
};

// ==========================================================================
// 6. Spell Generation Engine
// ==========================================================================

/**
 * Calculate Jiro Calories & Guilty Level
 */
function calculateJiroMetrics(jiroState, isJa) {
  let calories = 1550;

  // Noodle amount
  if (jiroState.noodleAmount === 'less') calories -= 180;
  else if (jiroState.noodleAmount === 'half') calories -= 320;
  else if (jiroState.noodleAmount === 'third') calories -= 420;

  // Garlic
  if (jiroState.garlic === 'none') calories -= 15;
  else if (jiroState.garlic === 'less') calories += 10;
  else if (jiroState.garlic === 'normal') calories += 20;
  else if (jiroState.garlic === 'mashi') calories += 45;
  else if (jiroState.garlic === 'mashimashi') calories += 80;

  // Yasai
  if (jiroState.yasai === 'none') calories -= 35;
  else if (jiroState.yasai === 'less') calories -= 20;
  else if (jiroState.yasai === 'mashi') calories += 35;
  else if (jiroState.yasai === 'mashimashi') calories += 70;

  // Abura (Pork fat)
  if (jiroState.abura === 'none') calories -= 180;
  else if (jiroState.abura === 'less') calories -= 90;
  else if (jiroState.abura === 'mashi') calories += 240;
  else if (jiroState.abura === 'mashimashi') calories += 480;

  // Karame
  if (jiroState.karame === 'karame') calories += 25;
  else if (jiroState.karame === 'karakara') calories += 50;

  calories = Math.round(calories / 10) * 10;

  let stars = '★★★☆☆';
  let desc = isJa ? '本格二郎' : 'Authentic Jiro';
  let icon = '😈';

  if (calories < 1150) {
    stars = '★☆☆☆☆';
    desc = isJa ? '天使の二郎' : 'Angelic Light';
    icon = '😇';
  } else if (calories <= 1450) {
    stars = '★★☆☆☆';
    desc = isJa ? 'ギルティ控えめ' : 'Mild Guilty';
    icon = '🙂';
  } else if (calories <= 1750) {
    stars = '★★★☆☆';
    desc = isJa ? '本格二郎' : 'Authentic Jiro';
    icon = '😈';
  } else if (calories <= 2050) {
    stars = '★★★★☆';
    desc = isJa ? '本格ギルティ' : 'Heavy Guilty';
    icon = '🔥';
  } else {
    stars = '★★★★★';
    desc = isJa ? 'ギルティ限界突破' : 'Max Transcendence';
    icon = '💥';
  }

  return {
    calories,
    calorieText: isJa ? `約 ${calories.toLocaleString()} kcal` : `~${calories.toLocaleString()} kcal`,
    indexTitle: isJa ? 'ギルティ度:' : 'Guilty Level:',
    indexValue: stars,
    indexDesc: `(${desc})`,
    indexIcon: icon
  };
}

/**
 * Calculate Starbucks Calories & Diet Index
 */
function calculateStarbucksMetrics(sbState, isJa) {
  const drink = STARBUCKS_DRINKS.find(d => d.id === sbState.drinkId) || STARBUCKS_DRINKS[0];

  const baseMap = {
    starbucks_latte: { hot: 223, iced: 125 },
    cappuccino: { hot: 113, iced: 113 },
    caffe_americano: { hot: 11, iced: 11 },
    caramel_macchiato: { hot: 208, iced: 200 },
    caffe_mocha: { hot: 391, iced: 250 },
    white_mocha: { hot: 401, iced: 260 },
    dark_mocha_frap: { iced: 341 },
    matcha_frap: { iced: 322 },
    caramel_frap: { iced: 302 },
    vanilla_frap: { iced: 255 },
    chai_tea_latte: { hot: 220, iced: 198 },
    hojicha_tea_latte: { hot: 162, iced: 140 },
    drip_coffee: { hot: 18, iced: 10 }
  };

  const drinkCal = baseMap[drink.id] || { hot: 180, iced: 150 };
  let cal = (sbState.temp === 'iced' || drink.defaultHotIce === 'iced') ? (drinkCal.iced || drinkCal.hot) : (drinkCal.hot || drinkCal.iced);

  const sizeMult = { short: 0.72, tall: 1.0, grande: 1.35, venti: 1.70 }[sbState.size] || 1.0;
  cal = cal * sizeMult;

  const hasMilk = drink.id !== 'drip_coffee' && (drink.id !== 'caffe_americano' || sbState.milk !== 'regular');
  if (hasMilk && sbState.milk !== 'regular') {
    const milkDelta = {
      lowfat: -30,
      nonfat: -60,
      soy: -12,
      almond: -65,
      oat: -18,
      breve: 340
    }[sbState.milk] || 0;
    cal += milkDelta * sizeMult;
  }

  if (sbState.shots === 'none' && drink.hasEspresso) cal -= 5;
  else if (sbState.shots === 'single') cal += 5;
  else if (sbState.shots === 'double') cal += 10;
  else if (sbState.shots === 'triple') cal += 15;
  else if (sbState.shots === 'quad') cal += 20;

  if (sbState.syrup === 'vanilla' || sbState.syrup === 'caramel') cal += 20;
  else if (sbState.syrup === 'whitemocha') cal += 50;
  else if (sbState.syrup === 'extra') cal += 35;
  else if (sbState.syrup === 'light') cal -= 20;
  else if (sbState.syrup === 'none' && drink.hasSyrup) cal -= 50;

  if (drink.hasWhip) {
    if (sbState.whip === 'none') cal -= 82;
    else if (sbState.whip === 'light') cal -= 40;
    else if (sbState.whip === 'extra') cal += 45;
  } else {
    if (sbState.whip === 'add') cal += 82;
    else if (sbState.whip === 'extra') cal += 125;
    else if (sbState.whip === 'light') cal += 40;
  }

  if (sbState.drizzle === 'caramel' || sbState.drizzle === 'chocolate') cal += 15;
  else if (sbState.drizzle === 'both') cal += 30;
  else if (sbState.drizzle === 'honey') cal += 20;

  if (sbState.temp === 'iced' && drink.category !== 'frappuccino') {
    if (sbState.icemilk === 'lightice-extramilk') cal += 25;
    else if (sbState.icemilk === 'noice') cal += 40;
    else if (sbState.icemilk === 'extraice') cal -= 15;
  }

  if (drink.category === 'frappuccino') {
    if (sbState.frapcustom === 'extrapowder') cal += 15;
    else if (sbState.frapcustom === 'chocolatechip') cal += 80;
    else if (sbState.frapcustom === 'allcustom') cal += 95;
  }

  cal = Math.max(5, Math.round(cal));

  let stars = '★★★☆☆';
  let desc = isJa ? 'バランス良好' : 'Balanced';
  let icon = '☕';

  if (cal <= 80) {
    stars = '★★★★★';
    desc = isJa ? '超ヘルシー' : 'Ultra Light';
    icon = '🥗';
  } else if (cal <= 175) {
    stars = '★★★★☆';
    desc = isJa ? 'すっきり軽やか' : 'Clean & Light';
    icon = '🌿';
  } else if (cal <= 285) {
    stars = '★★★☆☆';
    desc = isJa ? 'バランス良好' : 'Balanced';
    icon = '☕';
  } else if (cal <= 420) {
    stars = '★★☆☆☆';
    desc = isJa ? 'ちょっぴりご褒美' : 'Sweet Treat';
    icon = '🍮';
  } else {
    stars = '★☆☆☆☆';
    desc = isJa ? '悪魔的リッチ' : 'Devilishly Rich';
    icon = '🍰';
  }

  return {
    calories: cal,
    calorieText: isJa ? `約 ${cal.toLocaleString()} kcal` : `~${cal.toLocaleString()} kcal`,
    indexTitle: isJa ? 'ダイエット指数:' : 'Diet Index:',
    indexValue: stars,
    indexDesc: `(${desc})`,
    indexIcon: icon
  };
}

/**
 * Build Jiro Call
 */
function compileJiroSpell() {
  const { noodleAmount, noodleFirmness, garlic, yasai, abura, karame, abbreviate } = state.jiro;
  const isJa = state.lang === 'ja';

  // 1. Ticket info
  let ticketPartsJa = [];
  let ticketPartsEn = [];

  if (noodleAmount === 'less') {
    ticketPartsJa.push('麺少なめ');
    ticketPartsEn.push('Less noodles');
  } else if (noodleAmount === 'half') {
    ticketPartsJa.push('麺半分');
    ticketPartsEn.push('Half noodles');
  } else if (noodleAmount === 'third') {
    ticketPartsJa.push('麺1/3');
    ticketPartsEn.push('1/3 noodles');
  }

  if (noodleFirmness === 'katame') {
    ticketPartsJa.push('カタメ');
    ticketPartsEn.push('Firm noodles (Katame)');
  } else if (noodleFirmness === 'barikata') {
    ticketPartsJa.push('バリカタ');
    ticketPartsEn.push('Extra firm (Barikata)');
  } else if (noodleFirmness === 'yawame') {
    ticketPartsJa.push('ヤワメ');
    ticketPartsEn.push('Soft noodles (Yawame)');
  }

  const ticketStrJa = ticketPartsJa.length ? ticketPartsJa.join('・') : '普通（申請なし）';
  const ticketStrEn = ticketPartsEn.length ? ticketPartsEn.join(', ') : 'Standard (No request needed)';

  // 2. Call info (When asked "ニンニク入れますか？")
  let callJa = '';
  let callPhonetic = '';
  let callBreakdown = [];

  // Check abbreviation: 全マシ / 全マシマシ
  const isZenMashi = (garlic === 'mashi' && yasai === 'mashi' && abura === 'mashi' && karame === 'karame');
  const isZenMashimashi = (garlic === 'mashimashi' && yasai === 'mashimashi' && abura === 'mashimashi' && karame === 'karakara');

  if (abbreviate && isZenMashimashi) {
    callJa = '全マシマシ';
    callPhonetic = 'Zen-mashimashi';
    callBreakdown = [
      { label: isJa ? '🧄 ニンニクマシマシ' : 'Double Garlic', hl: true },
      { label: isJa ? '🥬 ヤサイマシマシ' : 'Double Vegetables', hl: true },
      { label: isJa ? '🥩 アブラマシマシ' : 'Double Pork Fat', hl: true },
      { label: isJa ? '🧂 カラカラ' : 'Double Tare Sauce', hl: true }
    ];
  } else if (abbreviate && isZenMashi) {
    callJa = '全マシ';
    callPhonetic = 'Zen-mashi';
    callBreakdown = [
      { label: isJa ? '🧄 ニンニクマシ' : 'Extra Garlic', hl: true },
      { label: isJa ? '🥬 ヤサイマシ' : 'Extra Vegetables', hl: true },
      { label: isJa ? '🥩 アブラマシ' : 'Extra Pork Fat', hl: true },
      { label: isJa ? '🧂 カラメ' : 'Extra Tare Sauce', hl: true }
    ];
  } else {
    const parts = [];
    const phonetics = [];

    // Garlic
    if (garlic === 'none') {
      parts.push('ニンニクなし');
      phonetics.push('Ninniku-nashi');
      callBreakdown.push({ label: isJa ? '🧄 ニンニク抜き' : 'No Garlic', hl: false });
    } else if (garlic === 'less') {
      parts.push('ニンニク少なめ');
      phonetics.push('Ninniku-sukuname');
      callBreakdown.push({ label: isJa ? '🧄 ニンニク少なめ' : 'A Little Garlic', hl: false });
    } else if (garlic === 'normal') {
      parts.push('ニンニク');
      phonetics.push('Ninniku');
      callBreakdown.push({ label: isJa ? '🧄 ニンニク標準' : 'Normal Garlic', hl: false });
    } else if (garlic === 'mashi') {
      parts.push('ニンニクマシ');
      phonetics.push('Ninniku-mashi');
      callBreakdown.push({ label: isJa ? '🧄 ニンニクマシ' : 'Extra Garlic', hl: true });
    } else if (garlic === 'mashimashi') {
      parts.push('ニンニクマシマシ');
      phonetics.push('Ninniku-mashimashi');
      callBreakdown.push({ label: isJa ? '🧄 ニンニクマシマシ' : 'Double Extra Garlic', hl: true });
    }

    // Yasai
    if (yasai === 'none') {
      parts.push('ヤサイ抜き');
      phonetics.push('Yasai-nuki');
      callBreakdown.push({ label: isJa ? '🥬 ヤサイ抜き' : 'No Vegetables', hl: false });
    } else if (yasai === 'less') {
      parts.push('ヤサイ少なめ');
      phonetics.push('Yasai-sukuname');
      callBreakdown.push({ label: isJa ? '🥬 ヤサイ少なめ' : 'Less Vegetables', hl: false });
    } else if (yasai === 'mashi') {
      parts.push('ヤサイマシ');
      phonetics.push('Yasai-mashi');
      callBreakdown.push({ label: isJa ? '🥬 ヤサイマシ' : 'Extra Vegetables', hl: true });
    } else if (yasai === 'mashimashi') {
      parts.push('ヤサイマシマシ');
      phonetics.push('Yasai-mashimashi');
      callBreakdown.push({ label: isJa ? '🥬 ヤサイマシマシ' : 'Double Extra Vegetables', hl: true });
    }

    // Abura
    if (abura === 'none') {
      parts.push('アブラ抜き');
      phonetics.push('Abura-nuki');
      callBreakdown.push({ label: isJa ? '🥩 アブラ抜き' : 'No Pork Fat', hl: false });
    } else if (abura === 'less') {
      parts.push('アブラ少なめ');
      phonetics.push('Abura-sukuname');
      callBreakdown.push({ label: isJa ? '🥩 アブラ少なめ' : 'Less Pork Fat', hl: false });
    } else if (abura === 'mashi') {
      parts.push('アブラマシ');
      phonetics.push('Abura-mashi');
      callBreakdown.push({ label: isJa ? '🥩 アブラマシ' : 'Extra Pork Fat', hl: true });
    } else if (abura === 'mashimashi') {
      parts.push('アブラマシマシ');
      phonetics.push('Abura-mashimashi');
      callBreakdown.push({ label: isJa ? '🥩 アブラマシマシ' : 'Double Extra Pork Fat', hl: true });
    }

    // Karame
    if (karame === 'karame') {
      parts.push('カラメ');
      phonetics.push('Karame');
      callBreakdown.push({ label: isJa ? '🧂 カラメ' : 'Extra Tare', hl: true });
    } else if (karame === 'karakara') {
      parts.push('カラカラ');
      phonetics.push('Karakara');
      callBreakdown.push({ label: isJa ? '🧂 カラカラ' : 'Double Tare', hl: true });
    }

    // Default if only normal toppings
    if (parts.length === 1 && parts[0] === 'ニンニクなし') {
      callJa = 'そのままで';
      callPhonetic = 'Sonomama-de (Plain)';
    } else if (parts.length === 1 && parts[0] === 'ニンニク') {
      callJa = 'ニンニクで';
      callPhonetic = 'Ninniku-de';
    } else {
      callJa = parts.join(' ');
      callPhonetic = phonetics.join(' ');
    }
  }

  // Add noodle note if specified
  if (ticketPartsJa.length > 0) {
    callBreakdown.unshift({
      label: isJa ? `🎫 食券時: ${ticketStrJa}` : `🎫 Ticket: ${ticketStrEn}`,
      hl: false
    });
  }

  return {
    mainSpell: callJa,
    phonetic: callPhonetic,
    ticketText: isJa ? ticketStrJa : ticketStrEn,
    breakdown: callBreakdown,
    metrics: calculateJiroMetrics(state.jiro, isJa)
  };
}

/**
 * Build Starbucks Order Spell
 */
function compileStarbucksSpell() {
  const sb = state.starbucks;
  const isJa = state.lang === 'ja';
  const drink = STARBUCKS_DRINKS.find(d => d.id === sb.drinkId) || STARBUCKS_DRINKS[0];

  const terms = [];
  const termsEn = [];
  const breakdown = [];

  // 1. Temperature (if applicable)
  if (drink.defaultHotIce === 'both') {
    if (sb.temp === 'hot') {
      terms.push('ホット');
      termsEn.push('Hot');
      breakdown.push({ label: isJa ? '🔥 ホット' : 'Hot', hl: false });
    } else {
      terms.push('アイス');
      termsEn.push('Iced');
      breakdown.push({ label: isJa ? '🧊 アイス' : 'Iced', hl: false });
    }
  }

  // 2. Shot count prefix (e.g. トリプル / クアッド or ソロ / ダブル)
  if (drink.hasEspresso) {
    if (sb.shots === 'triple') {
      terms.push('トリプル');
      termsEn.push('Triple');
      breakdown.push({ label: isJa ? '☕ 3ショット (トリプル)' : 'Triple Shot', hl: true });
    } else if (sb.shots === 'quad') {
      terms.push('クアッド');
      termsEn.push('Quad');
      breakdown.push({ label: isJa ? '☕ 4ショット (クアッド)' : 'Quad Shot', hl: true });
    }
  }

  // 3. Size
  const sizeMap = {
    short: { ja: 'ショート', en: 'Short' },
    tall: { ja: 'トール', en: 'Tall' },
    grande: { ja: 'グランデ', en: 'Grande' },
    venti: { ja: 'ベンティ', en: 'Venti' }
  };
  terms.push(sizeMap[sb.size].ja);
  termsEn.push(sizeMap[sb.size].en);
  breakdown.push({ label: `📏 ${isJa ? sizeMap[sb.size].ja : sizeMap[sb.size].en}`, hl: false });

  // 4. Custom Milk
  if (sb.milk !== 'regular') {
    const milkMap = {
      lowfat: { ja: '低脂肪タイプ', en: 'Low-Fat Milk' },
      nonfat: { ja: 'ノンファット', en: 'Non-Fat Milk' },
      soy: { ja: 'ソイミルク変更', en: 'Soy Milk' },
      almond: { ja: 'アーモンドミルク変更', en: 'Almond Milk' },
      oat: { ja: 'オーツミルク変更', en: 'Oat Milk' },
      breve: { ja: 'ブレベミルク変更', en: 'Breve Milk' }
    };
    terms.push(milkMap[sb.milk].ja);
    termsEn.push(milkMap[sb.milk].en);
    breakdown.push({ label: `🥛 ${isJa ? milkMap[sb.milk].ja : milkMap[sb.milk].en}`, hl: true });
  }

  // 5. Decaf / Roast
  if (drink.hasEspresso || sb.shots !== 'none') {
    if (sb.beans === 'decaf') {
      terms.push('ディカフェ');
      termsEn.push('Decaf');
      breakdown.push({ label: isJa ? '🌱 ディカフェ (カフェインレス)' : 'Decaf', hl: true });
    } else if (sb.beans === 'blonde') {
      terms.push('ブロンド');
      termsEn.push('Blonde Roast');
      breakdown.push({ label: isJa ? '🌾 ブロンドロースト' : 'Blonde Roast', hl: false });
    } else if (sb.beans === 'ristretto') {
      terms.push('リストレット');
      termsEn.push('Ristretto');
      breakdown.push({ label: isJa ? '☕ リストレット抽出' : 'Ristretto', hl: false });
    }
  }

  // 6. Single or Double Shot addition (when not triple/quad)
  if (drink.hasEspresso) {
    if (sb.shots === 'none') {
      terms.push('ショット抜き');
      termsEn.push('No Espresso Shot');
      breakdown.push({ label: isJa ? '🚫 ショット抜き' : 'No Shot', hl: false });
    } else if (sb.shots === 'single') {
      terms.push('ワンショット追加');
      termsEn.push('Add 1 Shot');
      breakdown.push({ label: isJa ? '☕ +1ショット追加' : '+1 Shot', hl: true });
    } else if (sb.shots === 'double') {
      terms.push('ダブルショット追加');
      termsEn.push('Add 2 Shots (Doppio)');
      breakdown.push({ label: isJa ? '☕ +2ショット追加' : '+2 Shots', hl: true });
    }
  }

  // 7. Syrups
  if (sb.syrup !== 'default') {
    const syrupMap = {
      vanilla: { ja: 'バニラシロップ追加', en: 'Add Vanilla Syrup' },
      caramel: { ja: 'キャラメルシロップ追加', en: 'Add Caramel Syrup' },
      whitemocha: { ja: 'ホワイトモカシロップ追加', en: 'Add White Mocha Syrup' },
      extra: { ja: 'エクストラシロップ', en: 'Extra Syrup' },
      light: { ja: 'ライトシロップ', en: 'Light Syrup' },
      none: { ja: 'ノンシロップ', en: 'No Syrup' }
    };
    terms.push(syrupMap[sb.syrup].ja);
    termsEn.push(syrupMap[sb.syrup].en);
    breakdown.push({ label: `🍯 ${isJa ? syrupMap[sb.syrup].ja : syrupMap[sb.syrup].en}`, hl: true });
  }

  // 8. Drink Base Name
  terms.push(drink.ja);
  termsEn.push(drink.en);
  breakdown.push({ label: `☕ ${isJa ? drink.ja : drink.en}`, hl: false });

  // 9. Whipped cream
  if (sb.whip !== 'default') {
    const whipMap = {
      extra: { ja: 'エクストラホイップ', en: 'Extra Whip' },
      light: { ja: 'ライトホイップ', en: 'Light Whip' },
      none: { ja: 'ノンホイップ', en: 'No Whip' },
      add: { ja: 'ホイップ追加', en: 'Add Whipped Cream' }
    };
    terms.push(whipMap[sb.whip].ja);
    termsEn.push(whipMap[sb.whip].en);
    breakdown.push({ label: `🍦 ${isJa ? whipMap[sb.whip].ja : whipMap[sb.whip].en}`, hl: true });
  }

  // 10. Drizzle / Sauce
  if (sb.drizzle !== 'none') {
    const drizzleMap = {
      caramel: { ja: 'キャラメルソース追加', en: 'Caramel Drizzle' },
      chocolate: { ja: 'チョコソース追加', en: 'Chocolate Drizzle' },
      both: { ja: 'キャラメル & チョコWソース追加', en: 'Double Drizzle (Caramel & Chocolate)' },
      honey: { ja: 'はちみつ追加', en: 'Add Honey' }
    };
    terms.push(drizzleMap[sb.drizzle].ja);
    termsEn.push(drizzleMap[sb.drizzle].en);
    breakdown.push({ label: `✨ ${isJa ? drizzleMap[sb.drizzle].ja : drizzleMap[sb.drizzle].en}`, hl: true });
  }

  // 11. Ice / Milk Ratio (Iced drinks only)
  if (sb.temp === 'iced' && drink.defaultHotIce !== 'hot') {
    if (sb.icemilk === 'lightice-extramilk') {
      terms.push('ライトアイス エクストラミルク');
      termsEn.push('Light Ice & Extra Milk');
      breakdown.push({ label: isJa ? '🧊 ライトアイス・エクストラミルク' : 'Light Ice & Extra Milk', hl: true });
    } else if (sb.icemilk === 'noice') {
      terms.push('ノンアイス');
      termsEn.push('No Ice');
      breakdown.push({ label: isJa ? '🚫 ノンアイス (氷なし)' : 'No Ice', hl: false });
    } else if (sb.icemilk === 'extraice') {
      terms.push('エクストラアイス');
      termsEn.push('Extra Ice');
      breakdown.push({ label: isJa ? '🧊 エクストラアイス (氷多め)' : 'Extra Ice', hl: false });
    }
  }

  // 12. Frappuccino custom
  if (drink.category === 'frappuccino') {
    if (sb.frapcustom === 'extrapowder') {
      terms.push('エクストラパウダー');
      termsEn.push('Extra Powder');
      breakdown.push({ label: isJa ? '🍵 エクストラパウダー' : 'Extra Powder', hl: true });
    } else if (sb.frapcustom === 'chocolatechip') {
      terms.push('チョコチップ追加');
      termsEn.push('Add Chocolate Chips');
      breakdown.push({ label: isJa ? '🍫 チョコチップ追加' : 'Add Choc Chips', hl: true });
    } else if (sb.frapcustom === 'allcustom') {
      terms.push('エクストラパウダー チョコチップ追加');
      termsEn.push('Extra Powder & Choc Chips');
      breakdown.push({ label: isJa ? '🍫 エクストラパウダー & チョコチップ追加' : 'Extra Powder & Choc Chips', hl: true });
    }
  }

  const mainSpellJa = terms.join(' ');
  const mainSpellEn = termsEn.join(' ');

  return {
    mainSpell: isJa ? mainSpellJa : mainSpellEn,
    phonetic: isJa ? mainSpellJa : `Japanese: 「${mainSpellJa}」`,
    ticketText: '',
    breakdown: breakdown,
    metrics: calculateStarbucksMetrics(state.starbucks, isJa)
  };
}

// ==========================================================================
// 7. Render & UI Updates
// ==========================================================================

/**
 * Apply Internationalization strings to DOM elements
 */
function updateLanguageUI() {
  const dict = I18N[state.lang];
  document.documentElement.lang = state.lang;
  document.body.setAttribute('data-lang', state.lang);

  // Update static data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  // Language button label
  const langLabel = document.getElementById('lang-current-label');
  if (langLabel) {
    langLabel.textContent = state.lang === 'ja' ? '日本語' : 'English';
  }

  // Render dynamic presets
  renderPresets();

  // Render Starbucks drinks grid
  renderStarbucksDrinks();

  // Render Beginner Guide
  renderBeginnerGuide();

  // Update dynamic hero & spells
  updateModeView();
}

/**
 * Switch Mode (Jiro <-> Starbucks)
 */
function switchMode(newMode) {
  state.mode = newMode;
  document.body.setAttribute('data-mode', newMode);

  // Update tab styles & aria
  const tabJiro = document.getElementById('tab-jiro');
  const tabSb = document.getElementById('tab-starbucks');
  if (newMode === 'jiro') {
    tabJiro.classList.add('active');
    tabJiro.setAttribute('aria-selected', 'true');
    tabSb.classList.remove('active');
    tabSb.setAttribute('aria-selected', 'false');
    document.getElementById('jiro-controls').classList.add('active');
    document.getElementById('starbucks-controls').classList.remove('active');
  } else {
    tabSb.classList.add('active');
    tabSb.setAttribute('aria-selected', 'true');
    tabJiro.classList.remove('active');
    tabJiro.setAttribute('aria-selected', 'false');
    document.getElementById('starbucks-controls').classList.add('active');
    document.getElementById('jiro-controls').classList.remove('active');
  }

  updateModeView();
  renderPresets();
  renderBeginnerGuide();
}

/**
 * Update Header/Hero text and Spell Card based on Mode
 */
function updateModeView() {
  const dict = I18N[state.lang];
  const heroBadge = document.getElementById('hero-badge');
  const heroHeading = document.getElementById('hero-heading');
  const heroDesc = document.getElementById('hero-desc');
  const spellTag = document.getElementById('spell-type-tag');
  const tipTitle = document.getElementById('tip-title');
  const tipText = document.getElementById('tip-text');
  const modalSub = document.getElementById('modal-sub-label');

  if (state.mode === 'jiro') {
    heroBadge.textContent = dict.jiroBadge;
    heroHeading.textContent = dict.jiroHeading;
    heroDesc.textContent = dict.jiroDesc;
    spellTag.textContent = dict.tagJiroCall;
    tipTitle.textContent = dict.tipJiroTitle;
    tipText.textContent = dict.tipJiroText;
    modalSub.textContent = dict.modalSubJiro;
  } else {
    heroBadge.textContent = dict.bucksBadge;
    heroHeading.textContent = dict.bucksHeading;
    heroDesc.textContent = dict.bucksDesc;
    spellTag.textContent = dict.tagBucksOrder;
    tipTitle.textContent = dict.tipBucksTitle;
    tipText.textContent = dict.tipBucksText;
    modalSub.textContent = dict.modalSubBucks;
  }

  updateSpellDisplay();
}

/**
 * Render Presets Bar
 */
function renderPresets() {
  const container = document.getElementById('presets-list');
  if (!container) return;

  container.innerHTML = '';
  const presets = state.mode === 'jiro' ? JIRO_PRESETS : STARBUCKS_PRESETS;
  const isJa = state.lang === 'ja';

  presets.forEach(p => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'preset-chip';
    btn.innerHTML = `<span class="preset-emoji">${p.emoji}</span><span>${isJa ? p.ja : p.en}</span>`;
    btn.addEventListener('click', () => applyPreset(p));
    container.appendChild(btn);
  });
}

/**
 * Apply Preset
 */
function applyPreset(preset) {
  if (state.mode === 'jiro') {
    state.jiro = { ...state.jiro, ...preset.state };
    syncJiroChips();
  } else {
    state.starbucks = { ...state.starbucks, ...preset.state };
    syncStarbucksChips();
  }
  updateSpellDisplay();
  showToast(state.lang === 'ja' ? `「${preset.ja}」を適用しました` : `Applied: ${preset.en}`);
}

/**
 * Render Starbucks drinks grid
 */
function renderStarbucksDrinks() {
  const grid = document.getElementById('sb-drink-grid');
  if (!grid) return;

  grid.innerHTML = '';
  const currentCat = state.starbucks.category;
  const filtered = STARBUCKS_DRINKS.filter(d => d.category === currentCat);
  const isJa = state.lang === 'ja';

  filtered.forEach(drink => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `drink-chip ${drink.id === state.starbucks.drinkId ? 'active' : ''}`;
    btn.setAttribute('data-drink-id', drink.id);
    
    if (isJa) {
      btn.innerHTML = `
        <span class="drink-primary">${drink.ja}</span>
        <span class="drink-secondary">${drink.en}</span>
      `;
    } else {
      btn.innerHTML = `
        <span class="drink-primary">${drink.en}</span>
      `;
    }

    btn.addEventListener('click', () => {
      state.starbucks.drinkId = drink.id;
      // Adjust visibility of frappe/ice controls
      adjustStarbucksVisibility(drink);
      syncStarbucksChips();
      updateSpellDisplay();
    });
    grid.appendChild(btn);
  });
}

/**
 * Adjust visibility of conditional Starbucks controls (e.g. Frappuccino specific, Ice specific)
 */
function adjustStarbucksVisibility(drink) {
  const frapField = document.getElementById('sb-frap-field');
  const tempField = document.getElementById('sb-temp-field');
  const iceField = document.getElementById('sb-ice-field');
  const milkField = document.getElementById('sb-milk-field');

  if (drink.category === 'frappuccino') {
    frapField.style.display = 'block';
    tempField.style.display = 'none';
    iceField.style.display = 'none';
    state.starbucks.temp = 'iced';
  } else {
    frapField.style.display = 'none';
    tempField.style.display = 'block';
    iceField.style.display = state.starbucks.temp === 'iced' ? 'block' : 'none';
  }

  // Drip coffee doesn't have milk/shots by default unless customized
  if (drink.id === 'drip_coffee') {
    milkField.style.display = 'none';
  } else {
    milkField.style.display = 'block';
  }
}

/**
 * Sync Jiro UI chips with state
 */
function syncJiroChips() {
  const j = state.jiro;
  document.querySelectorAll('#jiro-controls .chip-group').forEach(group => {
    const param = group.getAttribute('data-param');
    const val = j[param];
    group.querySelectorAll('.chip').forEach(c => {
      if (c.getAttribute('data-val') === val) {
        c.classList.add('active');
      } else {
        c.classList.remove('active');
      }
    });
  });

  const abbrevToggle = document.getElementById('jiro-abbreviate-toggle');
  if (abbrevToggle) {
    abbrevToggle.checked = j.abbreviate;
  }
}

/**
 * Sync Starbucks UI chips with state
 */
function syncStarbucksChips() {
  const sb = state.starbucks;
  
  // Category chips
  document.querySelectorAll('#sb-category-chips .chip').forEach(c => {
    if (c.getAttribute('data-cat') === sb.category) {
      c.classList.add('active');
    } else {
      c.classList.remove('active');
    }
  });

  // Drink chips
  document.querySelectorAll('#sb-drink-grid .drink-chip').forEach(c => {
    if (c.getAttribute('data-drink-id') === sb.drinkId) {
      c.classList.add('active');
    } else {
      c.classList.remove('active');
    }
  });

  // Param chips
  document.querySelectorAll('#starbucks-controls [data-sb-param]').forEach(group => {
    const param = group.getAttribute('data-sb-param');
    const val = sb[param];
    group.querySelectorAll('.chip').forEach(c => {
      if (c.getAttribute('data-val') === val) {
        c.classList.add('active');
      } else {
        c.classList.remove('active');
      }
    });
  });

  const currentDrink = STARBUCKS_DRINKS.find(d => d.id === sb.drinkId) || STARBUCKS_DRINKS[0];
  adjustStarbucksVisibility(currentDrink);
}

/**
 * Update the Live Spell Box and Modal content
 */
function updateSpellDisplay() {
  const spellData = state.mode === 'jiro' ? compileJiroSpell() : compileStarbucksSpell();

  const phoneticEl = document.getElementById('spell-phonetic');
  const mainTextEl = document.getElementById('spell-main-text');
  const breakdownEl = document.getElementById('spell-breakdown');
  const modalTextEl = document.getElementById('modal-spell-text');
  const modalDetailsEl = document.getElementById('modal-details');

  // Live Card
  phoneticEl.textContent = spellData.phonetic;
  mainTextEl.textContent = `「${spellData.mainSpell}」`;

  // Breakdown Badges
  breakdownEl.innerHTML = '';
  spellData.breakdown.forEach(item => {
    const span = document.createElement('span');
    span.className = `breakdown-badge ${item.hl ? 'highlight' : ''}`;
    span.textContent = item.label;
    breakdownEl.appendChild(span);
  });

  // Update Live Card Metrics Panel
  const calorieValEl = document.getElementById('metric-calorie-val');
  const indexTitleEl = document.getElementById('metric-index-title');
  const indexValEl = document.getElementById('metric-index-val');
  const indexDescEl = document.getElementById('metric-index-desc');
  const indexIconEl = document.getElementById('metric-index-icon');

  if (calorieValEl && spellData.metrics) {
    calorieValEl.textContent = spellData.metrics.calorieText;
  }
  if (indexTitleEl && spellData.metrics) {
    indexTitleEl.textContent = spellData.metrics.indexTitle;
  }
  if (indexValEl && spellData.metrics) {
    indexValEl.textContent = spellData.metrics.indexValue;
  }
  if (indexDescEl && spellData.metrics) {
    indexDescEl.textContent = spellData.metrics.indexDesc;
  }
  if (indexIconEl && spellData.metrics) {
    indexIconEl.textContent = spellData.metrics.indexIcon;
  }

  // Modal
  modalTextEl.textContent = spellData.mainSpell;
  modalDetailsEl.innerHTML = '';
  
  if (state.mode === 'jiro' && spellData.ticketText) {
    const ticketRow = document.createElement('div');
    ticketRow.className = 'modal-detail-row';
    ticketRow.innerHTML = `<span>${state.lang === 'ja' ? '食券提出時' : 'Ticket Hand-in'}:</span><span>${spellData.ticketText}</span>`;
    modalDetailsEl.appendChild(ticketRow);
  }

  // Add Calorie and Index to modal details
  if (spellData.metrics) {
    const calRow = document.createElement('div');
    calRow.className = 'modal-detail-row';
    calRow.innerHTML = `<span>🔥 ${state.lang === 'ja' ? '推定エネルギー' : 'Est. Calories'}:</span><span style="font-weight:900;">${spellData.metrics.calorieText}</span>`;
    modalDetailsEl.appendChild(calRow);

    const idxRow = document.createElement('div');
    idxRow.className = 'modal-detail-row';
    idxRow.innerHTML = `<span>${spellData.metrics.indexIcon} ${spellData.metrics.indexTitle}</span><span style="font-weight:900;">${spellData.metrics.indexValue} ${spellData.metrics.indexDesc}</span>`;
    modalDetailsEl.appendChild(idxRow);
  }

  spellData.breakdown.forEach(item => {
    const row = document.createElement('div');
    row.className = 'modal-detail-row';
    row.innerHTML = `<span>${item.label}</span>`;
    modalDetailsEl.appendChild(row);
  });

  // Mobile Bottom Dock preview update
  const dockTag = document.getElementById('dock-tag');
  const dockText = document.getElementById('dock-text');
  if (dockTag) {
    dockTag.textContent = state.mode === 'jiro' 
      ? (state.lang === 'ja' ? '二郎コール' : 'Jiro Call') 
      : (state.lang === 'ja' ? 'スタバ注文呪文' : 'Starbucks Order');
  }
  if (dockText) {
    const calSnippet = spellData.metrics ? ` (${spellData.metrics.calorieText})` : '';
    dockText.textContent = `「${spellData.mainSpell}」${calSnippet}`;
  }
}

/**
 * Render Beginner Guide / Etiquette Accordion
 */
function renderBeginnerGuide() {
  const guideBody = document.getElementById('guide-content-body');
  const summaryTitle = document.getElementById('guide-summary-title');
  const isJa = state.lang === 'ja';

  if (!guideBody || !summaryTitle) return;

  if (state.mode === 'jiro') {
    summaryTitle.textContent = isJa 
      ? '【初心者必読】ラーメン二郎の入店・注文ルールとマナー' 
      : '【Beginner Guide】Ramen Jiro Etiquette & Ordering Rules';

    guideBody.innerHTML = isJa ? `
      <h4>1. 食券の購入と並び方</h4>
      <p>お店のルール（先に食券を買うか並んでから買うか）を確認しましょう。店内に入る際は静かに並び、割り込みは厳禁です。</p>
      <h4>2. 食券提出時の注文（麺少なめ・カタメ）</h4>
      <p>席に着いて食券をカウンター上段に置く際、「麺少なめ」や「半分」を希望する場合はこのタイミングで伝えます。二郎の普通盛りは一般的なラーメンの2倍以上（約300g~350g）あるため、初心者は「麺少なめ」を強く推奨します！</p>
      <h4>3. トッピングコール（「ニンニク入れますか？」）</h4>
      <p>ラーメンが仕上がる直前、店主さんから「〇番の方、ニンニク入れますか？」と聞かれます。ここで当ジェネレーターで作成したコール（呪文）をハキハキと唱えましょう。</p>
      <div class="guide-callout">
        <strong>⚠️ コール時の注意点：</strong><br>
        「野菜多めで」「油を少し」のような日常会話ではなく、「ヤサイマシ」「アブラ少なめ」といった決まった単語で伝えると店員さんにも即座に伝わります。恥ずかしいときは「店員に見せる」ボタンでスマホ画面を見せれば確実です！
      </div>
      <h4>4. 食事中と退店マナー</h4>
      <ul>
        <li>二郎は「ロット（麺を茹でる一巡）」という単位で進行します。スマホを見ながらのダラダラ食いは避け、食べることに集中しましょう。</li>
        <li>食べ終わったら丼とコップをカウンター上段に上げ、備え付けの布巾でテーブルを拭いて「ごちそうさま」と挨拶して退店するのがスマートなマナーです。</li>
      </ul>
    ` : `
      <h4>1. Purchasing Tickets & Queueing</h4>
      <p>Always check store etiquette on whether to buy your ticket before joining the line. Keep the line orderly without cutting in.</p>
      <h4>2. Handing in Tickets (Noodle size & firmness)</h4>
      <p>Standard Jiro bowls pack over 300g~350g of hearty noodles (twice a normal ramen bowl). If it's your first time, request "Men Sukuname" (Less noodles) right as you place your plastic ticket on the counter.</p>
      <h4>3. The Free Topping Call ("Ninniku iremasuka?")</h4>
      <p>Right before serving, the chef will ask "Ninniku iremasuka?" (Do you want garlic?). Clearly reply with the generated spell.</p>
      <div class="guide-callout">
        <strong>⚠️ Pro Tip:</strong><br>
        Use concise keywords like "Ninniku Mashi Yasai" rather than full Japanese sentences. If you feel nervous, tap "Show to Staff" to present your phone screen directly to the chef!
      </div>
      <h4>4. Dining Etiquette</h4>
      <ul>
        <li>Ramen Jiro operates in batches ("lots"). Avoid phone-gazing while eating so you finish at a respectful pace.</li>
        <li>When finished, place your empty bowl and water cup on the top counter shelf, wipe down your table spot with the towel provided, say "Gochisousama", and exit gracefully.</li>
      </ul>
    `;
  } else {
    summaryTitle.textContent = isJa 
      ? '【スタバ初心者向け】サイズ一覧とカスタムの基礎知識' 
      : '【Starbucks Guide】Cup Sizes & Customization Rules';

    guideBody.innerHTML = isJa ? `
      <h4>1. カップのサイズ一覧</h4>
      <ul>
        <li><strong>Short (ショート 240ml):</strong> 最も小ぶり。温かい飲み物でサクッと飲みたい時に。</li>
        <li><strong>Tall (トール 350ml):</strong> スタバの標準サイズ。マグカップ約1杯半。迷ったらこれ！</li>
        <li><strong>Grande (グランデ 470ml):</strong> たっぷり飲みたい時。アイスやフラペチーノに人気。</li>
        <li><strong>Venti® (ベンティ 590ml):</strong> 最大サイズ（イタリア語で20）。グランデよりさらに大容量。</li>
      </ul>
      <h4>2. 無料カスタム vs 有料カスタム</h4>
      <ul>
        <li><strong>無料カスタム:</strong> 低脂肪乳 / 無脂肪乳変更、ソース追加（キャラメル / チョコレート / はちみつ）、ホイップ多め・少なめ、シロップ多め・少なめ、氷少なめ＆ミルク多め、パウダー多め</li>
        <li><strong>有料カスタム (+55円〜):</strong> 豆乳(ソイ)変更、アーモンドミルク変更、オーツミルク変更、ブレベ変更、ディカフェ変更、エスプレッソショット追加、シロップ追加、チョコチップ追加</li>
      </ul>
      <h4>3. レジでの注文順序</h4>
      <p>スタバのバリスタが聞き取りやすい理想の順序は「①温度（ホット/アイス） → ②サイズ → ③カスタム内容 → ④ドリンク名」です。当ジェネレーターはその順序通りに呪文を生成します！</p>
    ` : `
      <h4>1. Cup Sizes Guide</h4>
      <ul>
        <li><strong>Short (240ml):</strong> The smallest size, perfect for a quick espresso or hot tea.</li>
        <li><strong>Tall (350ml):</strong> The standard size in Japan. Great baseline choice!</li>
        <li><strong>Grande (470ml):</strong> Great for longer stays, iced beverages, and Frappuccinos.</li>
        <li><strong>Venti® (590ml):</strong> The largest cup (Italian for 20oz). Maximizes value and indulgence.</li>
      </ul>
      <h4>2. Free vs Paid Customizations</h4>
      <ul>
        <li><strong>Free:</strong> Low-Fat / Non-Fat milk, Drizzles (Caramel, Chocolate, Honey), Extra/Light whipped cream, Extra/Light syrup, Light ice with extra milk.</li>
        <li><strong>Paid (+¥55~):</strong> Plant-based milks (Soy, Almond, Oat), Breve cream milk, Decaf espresso swap, Extra espresso shots, Additional syrup types, Chocolate chips.</li>
      </ul>
      <h4>3. Ideal Order Phrasing</h4>
      <p>Baristas prefer: "Temperature → Size → Customizations → Drink Name". Our spell generator formats your order perfectly in this sequence!</p>
    `;
  }
}

// ==========================================================================
// 8. Event Handlers & Interactivity
// ==========================================================================

/**
 * Toast Notification Utility
 */
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toast-message');
  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2400);
}

/**
 * Clipboard Copy
 */
function copySpellToClipboard() {
  const spellData = state.mode === 'jiro' ? compileJiroSpell() : compileStarbucksSpell();
  let textToCopy = spellData.mainSpell;

  if (state.mode === 'jiro' && spellData.ticketText && spellData.ticketText !== '普通（申請なし）' && spellData.ticketText !== 'Standard (No request needed)') {
    textToCopy = `【食券時】${spellData.ticketText}\n【コール】${spellData.mainSpell}`;
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(textToCopy).then(() => {
      showToast(state.lang === 'ja' ? '呪文をコピーしました！📋' : 'Spell copied to clipboard! 📋');
    }).catch(() => {
      fallbackCopy(textToCopy);
    });
  } else {
    fallbackCopy(textToCopy);
  }
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.left = '-9999px';
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
  showToast(state.lang === 'ja' ? '呪文をコピーしました！📋' : 'Spell copied to clipboard! 📋');
}

/**
 * Speech Synthesis (Web Speech API)
 */
function speakSpell() {
  if (!('speechSynthesis' in window)) {
    showToast(state.lang === 'ja' ? 'お使いのブラウザは音声読み上げに対応していません' : 'Speech synthesis not supported in this browser');
    return;
  }

  window.speechSynthesis.cancel(); // Stop any active speech

  const spellData = state.mode === 'jiro' ? compileJiroSpell() : compileStarbucksSpell();
  const utterance = new SpeechSynthesisUtterance(spellData.mainSpell);

  utterance.lang = 'ja-JP';
  utterance.rate = 1.0;
  utterance.pitch = 1.0;

  // Prefer natural Japanese voice if available
  const voices = window.speechSynthesis.getVoices();
  const jaVoice = voices.find(v => v.lang === 'ja-JP' || v.lang === 'ja_JP');
  if (jaVoice) {
    utterance.voice = jaVoice;
  }

  window.speechSynthesis.speak(utterance);
  showToast(state.lang === 'ja' ? '読み上げ中... 🔊' : 'Speaking... 🔊');
}

/**
 * Social Share / Web Share API
 */
function shareSpell() {
  const spellData = state.mode === 'jiro' ? compileJiroSpell() : compileStarbucksSpell();
  const isJiro = state.mode === 'jiro';
  const title = isJiro ? '私の二郎コール呪文' : '私のスタバ注文呪文';
  const text = isJiro 
    ? `ラーメン二郎のコールは「${spellData.mainSpell}」に決めた！🍜 #JIROBUCKS #ラーメン二郎 #コール呪文`
    : `スタバのカスタム呪文「${spellData.mainSpell}」を作成！☕ #JIROBUCKS #スタバ #スタバカスタム`;
  const url = window.location.href;

  if (navigator.share) {
    navigator.share({
      title: title,
      text: text,
      url: url
    }).catch(() => {});
  } else {
    // Open Twitter / X Web Intent
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  }
}

/**
 * Random Gacha / Generator
 */
function generateRandomSpell() {
  if (state.mode === 'jiro') {
    const amounts = ['normal', 'normal', 'less', 'half'];
    const firmnesses = ['normal', 'normal', 'katame', 'barikata'];
    const garlics = ['less', 'normal', 'mashi', 'mashimashi', 'none'];
    const yasais = ['normal', 'mashi', 'mashimashi', 'less'];
    const aburas = ['normal', 'mashi', 'mashimashi', 'none'];
    const karames = ['normal', 'karame', 'karakara'];

    state.jiro.noodleAmount = amounts[Math.floor(Math.random() * amounts.length)];
    state.jiro.noodleFirmness = firmnesses[Math.floor(Math.random() * firmnesses.length)];
    state.jiro.garlic = garlics[Math.floor(Math.random() * garlics.length)];
    state.jiro.yasai = yasais[Math.floor(Math.random() * yasais.length)];
    state.jiro.abura = aburas[Math.floor(Math.random() * aburas.length)];
    state.jiro.karame = karames[Math.floor(Math.random() * karames.length)];

    syncJiroChips();
  } else {
    const randomDrink = STARBUCKS_DRINKS[Math.floor(Math.random() * STARBUCKS_DRINKS.length)];
    state.starbucks.category = randomDrink.category;
    state.starbucks.drinkId = randomDrink.id;
    state.starbucks.temp = randomDrink.defaultHotIce === 'iced' ? 'iced' : (Math.random() > 0.5 ? 'hot' : 'iced');
    
    const sizes = ['tall', 'grande', 'venti'];
    state.starbucks.size = sizes[Math.floor(Math.random() * sizes.length)];

    const milks = ['regular', 'nonfat', 'soy', 'oat', 'almond', 'breve'];
    state.starbucks.milk = milks[Math.floor(Math.random() * milks.length)];

    const shots = ['standard', 'single', 'double', 'triple'];
    state.starbucks.shots = randomDrink.hasEspresso ? shots[Math.floor(Math.random() * shots.length)] : 'standard';

    const beans = ['standard', 'decaf', 'blonde'];
    state.starbucks.beans = beans[Math.floor(Math.random() * beans.length)];

    const syrups = ['default', 'vanilla', 'caramel', 'whitemocha', 'extra'];
    state.starbucks.syrup = syrups[Math.floor(Math.random() * syrups.length)];

    const whips = ['default', 'extra', 'none', 'add'];
    state.starbucks.whip = whips[Math.floor(Math.random() * whips.length)];

    const drizzles = ['none', 'caramel', 'chocolate', 'both', 'honey'];
    state.starbucks.drizzle = drizzles[Math.floor(Math.random() * drizzles.length)];

    renderStarbucksDrinks();
    syncStarbucksChips();
  }

  updateSpellDisplay();
  showToast(state.lang === 'ja' ? '🎲 おまかせ呪文を生成しました！' : '🎲 Generated a random spell!');
}

/**
 * Reset Current Mode to Default
 */
function resetSpell() {
  if (state.mode === 'jiro') {
    state.jiro = {
      noodleAmount: 'normal',
      noodleFirmness: 'normal',
      garlic: 'normal',
      yasai: 'normal',
      abura: 'normal',
      karame: 'normal',
      abbreviate: true
    };
    syncJiroChips();
  } else {
    state.starbucks = {
      category: 'espresso',
      drinkId: 'starbucks_latte',
      temp: 'hot',
      size: 'tall',
      milk: 'regular',
      shots: 'standard',
      beans: 'standard',
      syrup: 'default',
      whip: 'default',
      drizzle: 'none',
      icemilk: 'default',
      frapcustom: 'none'
    };
    renderStarbucksDrinks();
    syncStarbucksChips();
  }

  updateSpellDisplay();
  showToast(state.lang === 'ja' ? '初期設定にリセットしました' : 'Reset to default');
}

/**
 * Modal Controller
 */
function setupModal() {
  const modal = document.getElementById('staff-modal');
  const btnShow = document.getElementById('btn-show-staff');
  const btnClose = document.getElementById('btn-close-modal');
  const btnDismiss = document.getElementById('btn-modal-dismiss');
  const backdrop = document.getElementById('modal-backdrop');

  function openModal() {
    updateSpellDisplay();
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  btnShow.addEventListener('click', openModal);
  btnClose.addEventListener('click', closeModal);
  btnDismiss.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/**
 * Mobile Drawer Controller
 */
function setupMobileDrawer() {
  const drawer = document.getElementById('spell-column');
  const backdrop = document.getElementById('spell-backdrop');
  const btnOpen = document.getElementById('btn-open-mobile-spell');
  const dockPreview = document.getElementById('dock-preview');
  const btnClose = document.getElementById('btn-close-spell');
  const btnDismiss = document.getElementById('btn-spell-card-dismiss');

  function openDrawer() {
    updateSpellDisplay();
    if (drawer) drawer.classList.add('open-drawer');
    if (backdrop) {
      backdrop.classList.add('active');
      backdrop.setAttribute('aria-hidden', 'false');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (drawer) drawer.classList.remove('open-drawer');
    if (backdrop) {
      backdrop.classList.remove('active');
      backdrop.setAttribute('aria-hidden', 'true');
    }
    document.body.style.overflow = '';
  }

  if (btnOpen) btnOpen.addEventListener('click', openDrawer);
  if (dockPreview) dockPreview.addEventListener('click', openDrawer);
  if (btnClose) btnClose.addEventListener('click', closeDrawer);
  if (btnDismiss) btnDismiss.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer && drawer.classList.contains('open-drawer')) {
      closeDrawer();
    }
  });

  // When Show to Staff modal opens, close the drawer so it doesn't overlap
  const btnShowStaff = document.getElementById('btn-show-staff');
  if (btnShowStaff) {
    btnShowStaff.addEventListener('click', () => {
      if (drawer) drawer.classList.remove('open-drawer');
      if (backdrop) {
        backdrop.classList.remove('active');
        backdrop.setAttribute('aria-hidden', 'true');
      }
    });
  }
}

/**
 * Initialize Click Listeners for Options Chips
 */
function setupOptionListeners() {
  // Jiro Chips
  document.querySelectorAll('#jiro-controls .chip-group').forEach(group => {
    const param = group.getAttribute('data-param');
    group.querySelectorAll('.chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const val = chip.getAttribute('data-val');
        state.jiro[param] = val;
        group.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        updateSpellDisplay();
      });
    });
  });

  // Jiro Abbreviation Toggle
  const abbrevToggle = document.getElementById('jiro-abbreviate-toggle');
  if (abbrevToggle) {
    abbrevToggle.addEventListener('change', (e) => {
      state.jiro.abbreviate = e.target.checked;
      updateSpellDisplay();
    });
  }

  // Starbucks Category Chips
  document.querySelectorAll('#sb-category-chips .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const cat = chip.getAttribute('data-cat');
      state.starbucks.category = cat;
      document.querySelectorAll('#sb-category-chips .chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      // Pick first drink in this category
      const firstInCat = STARBUCKS_DRINKS.find(d => d.category === cat);
      if (firstInCat) {
        state.starbucks.drinkId = firstInCat.id;
      }
      renderStarbucksDrinks();
      syncStarbucksChips();
      updateSpellDisplay();
    });
  });

  // Starbucks Param Chips
  document.querySelectorAll('#starbucks-controls [data-sb-param]').forEach(group => {
    const param = group.getAttribute('data-sb-param');
    group.querySelectorAll('.chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const val = chip.getAttribute('data-val');
        state.starbucks[param] = val;
        group.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        // If temperature changed, adjust ice field
        if (param === 'temp') {
          const iceField = document.getElementById('sb-ice-field');
          if (iceField) {
            iceField.style.display = val === 'iced' ? 'block' : 'none';
          }
        }

        updateSpellDisplay();
      });
    });
  });

  // Mode Switch Tabs
  document.getElementById('tab-jiro').addEventListener('click', () => switchMode('jiro'));
  document.getElementById('tab-starbucks').addEventListener('click', () => switchMode('starbucks'));

  // Language Toggle Button
  document.getElementById('lang-toggle-btn').addEventListener('click', () => {
    state.lang = state.lang === 'ja' ? 'en' : 'ja';
    localStorage.setItem('jirobucks_lang', state.lang);
    updateLanguageUI();
  });

  // Quick Action Buttons
  document.getElementById('btn-random').addEventListener('click', generateRandomSpell);
  document.getElementById('btn-reset').addEventListener('click', resetSpell);

  // Spell Card Buttons
  document.getElementById('btn-copy').addEventListener('click', copySpellToClipboard);
  document.getElementById('btn-speak').addEventListener('click', speakSpell);
  document.getElementById('btn-share').addEventListener('click', shareSpell);
}

// ==========================================================================
// 9. Application Bootstrap
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // 1. Language auto-detect or restore from localStorage
  const savedLang = localStorage.getItem('jirobucks_lang');
  if (savedLang && (savedLang === 'ja' || savedLang === 'en')) {
    state.lang = savedLang;
  } else {
    const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
    state.lang = browserLang.startsWith('ja') ? 'ja' : 'en';
  }

  // 2. Initialize Analytics tag
  initAnalytics();

  // 3. Setup UI & Listeners
  setupOptionListeners();
  setupModal();
  setupMobileDrawer();
  updateLanguageUI();
  syncJiroChips();
  syncStarbucksChips();
  updateSpellDisplay();

  // Ensure speech voices are loaded
  if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  }

  // Expose JIROBUCKS for debugging & testing
  window.JIROBUCKS = {
    state,
    I18N,
    compileJiroSpell,
    compileStarbucksSpell,
    switchMode,
    applyPreset,
    initAnalytics
  };
});
