# Contributing

## Local Development

1. Open `chrome://extensions`.
2. Enable `Developer mode`.
3. Load the `extension/` folder with `Load unpacked`.
4. After each change, click `Reload` on the extension card.

## Project Principles

- Keep the extension no-build and easy to inspect.
- Prefer lightweight content scripts and background translation work.
- Avoid changes that can block or degrade the Udemy lecture player.
- Keep new UI additions simple and readable inside the popup.

## Before Opening a PR

- Run:
  - `node --check extension\\background.js`
  - `node --check extension\\content.js`
  - `node --check extension\\popup.js`
- Test on a real Udemy lecture page with captions or an open transcript panel.
- If you change popup copy or setup flow, update `README.md` and `CHANGELOG.md`.
