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
  - **☕ Starbucks Mode**: Customize size, temperature, milk alternatives, decaf/espresso shots, syrups, whipped cream, drizzles, and Frappuccino toppings. Formats naturally into authentic barista-preferred order sequences.
- **🔥 Estimated Calories & Mode-Specific Index**:
  - Automatically calculates real-time estimated calories (`~1,570 kcal`) based on selected toppings or syrup/milk ratios.
  - **Jiro Mode**: Evaluates guilt level (`Guilty Level: ★★★☆☆ (Authentic Jiro)` to `★★★★★ (Guilt Overload)`).
  - **Starbucks Mode**: Evaluates healthiness (`Diet Index: ★★★★☆ (Light & Clean)` to `★☆☆☆☆ (Decadent Treat)`).
- **📱 "Show to Staff" Fullscreen Mode (店員に見せる)**:
  - Displays your order in ultra-large, high-contrast text on a clean card. Perfect for showing your smartphone screen across the counter without speaking!
- **⚡ 1-Tap Quick Presets**:
  - Instantly load popular combinations like *Zen-mashi*, *The Classic*, *Beginner Safe*, *Chomolungma*, *Triple Grande Latte*, or *Devil's Matcha Frappuccino*.
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
├── config.js         # Analytics configuration (GTM_ID)
├── README.md         # English documentation
├── README.ja.md      # Japanese documentation
├── LICENSE           # MIT License (© 2026 c1t0d0s0)
└── MEMO.txt          # Requirements specification
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

To enable Google Analytics 4 (GA4) or Google Tag Manager (GTM), set your ID in `config.js`:

```javascript
const GTM_ID = 'G-XXXXXXXXXX'; // or 'GTM-XXXXXXX'
```

If `config.js` is omitted or `GTM_ID` is empty, analytics tracking is safely skipped without errors.

---

## 📄 License

MIT License. Copyright (c) 2026 **c1t0d0s0**. See [LICENSE](LICENSE) for details.

*Disclaimer: Jirobucks is an independent, fan-made educational utility. It is not affiliated with, endorsed by, or associated with Ramen Jiro or Starbucks Corporation.*
