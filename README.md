# JIROBUCKS (ジローバックス)

> **Effortless Order Spell & Call Generator for Ramen Jiro and Starbucks**  
> Generate intimidation-free ordering calls for Ramen Jiro and fluent customization spells for Starbucks in one clean, bright, accessible web app.

---

## 🍜 Concept & Background

Both **Ramen Jiro (ラーメン二郎)** and **Starbucks (スターバックス)** are famously known for their intimidating ordering lingo—often referred to as **"Spells" (呪文 / Jumon)** or **"Calls" (コール)** in Japan:
- In Ramen Jiro, beginners often panic when the chef abruptly asks *"Ninniku iremasuka?"* ("Do you want garlic?"). Calling out complex preferences like *Yasai-mashimashi Abura-karame* in seconds can be daunting.
- In Starbucks, ordering a customized beverage like *"Triple Grande Non-fat Decaf White Mocha with Extra Whipped Cream and Caramel Drizzle"* can feel like reciting ancient incantations.

**JIROBUCKS** solves this by letting anyone assemble their ideal order with a few intuitive taps.

---

## ✨ Features

- **Dual-Mode System**:
  - **🍜 Ramen Jiro Mode**: Customize noodle firmness & amount (at ticket presentation) and toppings (garlic, veggies, pork fat, soy tare). Supports abbreviations like *Zen-mashi* and *Zen-mashimashi*.
  - **☕ Starbucks Mode**:
    - Base drinks across Coffee, Espresso, Frappuccino, and Tea & Others
    - Size (Short / Tall / Grande / Venti®) & temperature (Hot / Iced). Short is hot-only, and hot-only drinks (Cappuccino, Caffè Misto) lock the temperature automatically
    - Milk changes (low-fat, non-fat, soy, almond, oat, breve)
    - Espresso customizations: decaf, blonde, ristretto, and +1 to +4 extra shots (+¥55 per shot), added on top of each drink's base shots (e.g. Venti latte-type drinks: 2 shots hot / 3 shots iced)
    - Syrups, whipped cream, sauces, and Frappuccino-only toppings
    - Combinations that can't actually be ordered are hidden automatically (e.g. an Americano without shots, extra powder on a Caramel Frappuccino, Short for iced drinks)
    - Formats naturally into barista-style order sequences using short call names (e.g. "Latte", "Mocha")
- **🏷️ Starbucks Nickname Detection**:
  - Recognizes well-known combinations and secret-menu drinks and shows their nickname: *Red Eye / Black Eye / Green Eye / Eye of the Tiger*, *Dirty Chai / Dirty Matcha*, *Oreo Frappuccino*, *Super Cream Frappuccino*, *Tuxedo Mocha*, *The Nutella*, and *French Vanilla*.
- **🔥 Estimated Calories & Mode-Specific Index**:
  - Automatically calculates real-time estimated calories (`~1,570 kcal`) based on selected toppings or syrup/milk ratios.
  - **Jiro Mode**: Evaluates guilt level (`Guilty Level: ★☆☆☆☆ (Angelic Light)` to `★★★★★ (Max Transcendence)`).
  - **Starbucks Mode**: Evaluates healthiness (`Diet Index: ★★★★★ (Ultra Light)` to `★☆☆☆☆ (Devilishly Rich)`).
- **📱 "Show to Staff" Fullscreen Mode**:
  - Displays your order in ultra-large, high-contrast text on a clean card. Perfect for showing your smartphone screen across the counter without speaking!
- **⚡ 1-Tap Quick Presets**:
  - Instantly load popular combinations like *Zen-mashi*, *The Classic*, *Beginner Safe*, *Chomolungma*, *Triple Grande Latte*, *Devil's Matcha Frappuccino*, *Red Eye*, *Dirty Chai*, or *Oreo Frappuccino*.
- **🌐 Automatic Bilingual Support (JA / EN)**:
  - Automatically loads in Japanese for Japanese browser environments and English for all other locales. Includes a manual toggle button in the header.
- **🔊 Speech Synthesis (Web Speech API)**:
  - Listen to natural Japanese audio pronunciation to practice your call before reaching the front of the line.
- **📋 1-Click Clipboard Copy & Social Share**:
  - Copy your customized spell or share it to X (Twitter) with one click.
- **🎲 Random Combo (Gacha)**:
  - Generate exciting, valid combinations on the fly.
- **📖 Beginner Etiquette Guide**:
  - Built-in accordion explaining Jiro counter etiquette (lot system, bowl cleanup) and Starbucks cup sizing & free customization tips.
- **📊 Google Analytics Integration**:
  - Automatically embeds Google Analytics (GA4) tag when `GTM_ID` is present in `config.js`.

---

## 🛠️ Project Structure

```text
jirobucks/
├── index.html        # Semantic HTML5 markup
├── style.css         # Responsive styling with Jiro & Starbucks themes
├── script.js         # Generator logic, i18n, speech synthesis, analytics
├── config.example.js # Template for config.js
├── config.js         # Analytics configuration (GTM_ID, git-ignored)
├── README.md         # English documentation
├── README.ja.md      # Japanese documentation
├── LICENSE           # MIT License (© 2026 c1t0d0s0)
└── MEMO.txt          # Requirements specification (git-ignored)
```

---

## 🚀 How to Run Locally

Because Jirobucks is built with vanilla HTML5, CSS3, and JavaScript, no complex build tools or dependencies are required.

### Using Python:
```bash
# In the project directory:
python3 -m http.server 8080
```
Open `http://localhost:8080` in your web browser.

### Using Node.js (npx):
```bash
npx serve .
```

---

## ⚙️ Configuration (`config.js`)

To enable Google Analytics 4 (GA4) or Google Tag Manager (GTM), copy the template and set your ID in `config.js`:

```bash
cp config.example.js config.js
```

```javascript
const GTM_ID = 'G-XXXXXXXXXX'; // or 'GTM-XXXXXXX'
```

If `config.js` is omitted or `GTM_ID` is empty, analytics tracking is safely skipped without errors.

---

## 📄 License

MIT License. Copyright (c) 2026 **c1t0d0s0**. See [LICENSE](LICENSE) for details.

*Disclaimer: Jirobucks is an independent, fan-made educational utility. It is not affiliated with, endorsed by, or associated with Ramen Jiro or Starbucks Corporation.*
