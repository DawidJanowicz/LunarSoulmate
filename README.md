# Lunar Soulmate

A lightweight, client-side web application that calculates the exact Moon phase and zodiac placements for any birth date, and compares two lunar discs to evaluate relationship compatibility.

*Built with vanilla HTML, CSS, and JavaScript. No frameworks, build tools, or external paid APIs are required.*

---

## Features

* **Birth Moon Calculator** — Computes the lunar phase, disc illumination percentage, lunar cycle age, Sun sign, and Moon sign based on astronomical algorithms (*ELP-2000 periodic terms*).
* **Moon Compatibility (Synastry)** — Compares two birth dates, animates the merging of both lunar discs on screen, and generates a compatibility score and analysis.
* **Story Card Export** — Renders a high-resolution (`1080x1920`) PNG summary card directly via HTML5 Canvas, ready to download and share.
* **Automatic Language Detection** — Detects the browser's preferred language on load (*defaults to English, switches to Polish when detected*) with a manual toggle in the header.

---

## Project Structure

```text
LunarSoulmate/
├── index.html          # Main markup and layout
├── style.css           # Responsive styles and theme variables
└── js/
    ├── translations.js # Language dictionaries and localization logic
    ├── astronomy.js    # Lunar phase, ephemeris, and compatibility calculations
    └── app.js          # Canvas rendering, UI events, and PNG export
```

---

## Running Locally

Because the app runs entirely in the browser without external dependencies, you can open `index.html` directly or serve the folder using any static HTTP server:

```bash
# Example using Python
python -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

---

## How the Compatibility Algorithm Works

The compatibility score (ranging from **30%** to **99%**) is calculated in `analyzeMoonCompatibility()` inside `js/astronomy.js`. Instead of relying on random numbers, the script evaluates the geometry of both lunar discs and their astrological elements:

1. **Combined Illumination (`illumSum`)**
   The algorithm adds the illumination percentages of both birth dates (`m1.illumination + m2.illumination`) and measures how close the total is to a complete `100%` Full Moon (`fullnessDiff = Math.abs(100 - illumSum)`).

2. **Phase Geometry & Special Alignments**
   The code evaluates conditions in a top-down hierarchy:
   * **Complementary Full Moon (`90% – 99%`)** — Triggered when the combined illumination is close to `100%` (`fullnessDiff <= 14`) and the phases sit on opposite sides of the lunar cycle (`oppositeDiff <= 0.14`), meaning a waxing disc and a waning disc fit together like puzzle pieces.
   * **Twin Full Moons (`88% – 94%`)** — Both individuals have at least `85%` disc illumination.
   * **Twin New Moons (`86% – 92%`)** — Both individuals have `15%` or less disc illumination.
   * **Mirror Phase (`81% – 86%`)** — Both individuals were born at nearly the exact same point in the lunar cycle (`samePhaseDiff <= 0.08`).
   * **Cosmic Harmony (`64% – 78%`)** — Combined illumination falls within `75% – 125%` (`fullnessDiff <= 25`), scored via `Math.round(78 - fullnessDiff * 0.55)`.
   * **Dance of Contrasts (`30% – 60%`)** — All remaining combinations where the discs either leave too much shadow or overlap heavily, scored via `Math.max(30, Math.round(75 - fullnessDiff * 0.78))`.

3. **Elemental Bonuses**
   After calculating the base phase score, the script checks zodiac elements (*Fire, Earth, Air, Water*):
   * Matching **Moon Sign** element adds **`+4%`**.
   * Matching **Sun Sign** element adds **`+2%`**.

4. **Low-Score Disclaimer**
   Any final score below **`60%`** automatically appends a friendly note reminding users that astrology has no scientific backing and is meant purely for fun.

---

## Example Test Pairs

You can use these date pairs (`dd.mm.yyyy`) to test different score thresholds in the compatibility tab:

| Score | Alignment Category | Person 1 | Person 2 | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **99%** | *Complementary Full Moon* | `12.10.2001` *(21%)* | `12.07.2000` *(79%)* | Forms a complete 100% disc |
| **69%** | *Cosmic Harmony* | `12.10.2001` *(21%)* | `04.07.2006` *(62%)* | 83% combined illumination |
| **30%** | *Dance of Contrasts* | `28.07.1999` *(100%)* | `10.07.2000` *(68%)* | Heavy overlap (`168%`), different elements |

---

## Contributing: Adding a New Language

Contributions are welcome. If you speak another language (such as Russian, Spanish, German, or French) and would like to add support for it, you only need to edit two files:

1. **Add the translation object in `js/translations.js`**
   Open `js/translations.js` and add a new key inside the `I18N` object using the standard two-letter ISO language code (for example, `ru` for Russian or `es` for Spanish). Copy the structure of the `en` object and translate all strings, zodiac names, phase descriptions, and compatibility texts.

2. **Update automatic language detection in `js/translations.js`**
   In the `detectDeviceLanguage()` function, add a check for your language prefix so users with matching system settings get it automatically:

   ```javascript
   if (lang.toLowerCase().startsWith('ru')) {
       return 'ru';
   }
   ```

3. **Update `setLanguage()` in `js/translations.js` and add a button in `index.html`**
   Allow `setLanguage(lang)` to accept the new language code, and add a corresponding button inside `.lang-switcher` in `index.html`:

   ```html
   <button type="button" id="lang-btn-ru" class="lang-btn" onclick="setLanguage('ru')">RU</button>
   ```

4. **Submit a Pull Request**
   Test your changes locally (*including the Story PNG export to make sure text fits properly*) and open a pull request.

> **Important note on translations:** Please do not use AI or machine translators for languages you do not speak. I only speak 2 languages and cannot verify the quality of unfamiliar translations, so please contribute only to languages that you know really well.

---

## License

This project is open source and available under the **MIT License**.