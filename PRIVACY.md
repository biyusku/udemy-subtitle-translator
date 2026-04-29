# Privacy

## Summary

This extension reads subtitle or transcript text that is already visible or available on supported Udemy lecture pages.

It then sends that text to the configured translation provider so the translated result can be shown as an overlay.

## What the extension accesses

- Udemy lecture page content needed to detect:
  - video captions
  - transcript lines
  - fullscreen player state
- Local extension settings stored with `chrome.storage.sync`

## What may be sent to third parties

- Caption or transcript text selected for translation
- The selected target language

By default, translations use the `Google GTX` route configured in the extension.

If you switch to `LibreTranslate`, the caption or transcript text is sent to the endpoint you configure.

## What is not intentionally collected

- Udemy account credentials
- Payment information
- Full browsing history
- Analytics or ad tracking identifiers

## Local storage

The extension stores only its own settings, such as:

- whether the extension is enabled
- the default target language
- onboarding completion state
- provider preferences

## Important note for public releases

Before publishing broadly, review the default translation provider choice and make sure the public README clearly explains where subtitle text is sent.
