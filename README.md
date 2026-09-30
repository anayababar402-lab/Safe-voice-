# SafeVoice

SafeVoice is a youth-support website prototype with a calming grounding exercise, general cyber-safety guidance, support-contact cards, and an AI chat interface.

## Features

- Responsive dark navy, slate, and cyan design
- Quick Exit button that redirects to a neutral page
- Guided five-step breathing and grounding exercise
- Pakistan-focused support and emergency contact cards
- Chat interface connected to a separate AI API endpoint
- Fallback support messages when the chat server cannot be reached
- Mobile-friendly full-screen chat view

## Project files

| File | Purpose |
|---|---|
| `index.html` | The page structure and content |
| `style.css` | Colours, layout, responsive design, and chat appearance |
| `script.js` | Quick Exit, grounding tool, chat controls, and API requests |
| `README.md` | Project information and setup notes |

## Run locally

1. Download or clone this repository.
2. Keep `index.html`, `style.css`, and `script.js` in the same folder.
3. Open `index.html` in a web browser, or use a local server such as VS Code Live Server.

## Deploy with GitHub Pages

1. Open the repository's **Settings** tab.
2. Open **Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Select the `main` branch and the `/ (root)` folder.
5. Save the settings and wait for GitHub to provide the public site link.

## Chat API

The front end sends chat messages to the endpoint configured in `script.js`:

```js
const AI_CHAT_API_ENDPOINT = "https://safevoice-server-59yy.onrender.com/api/chat";
```

The backend should accept a `POST` request containing a JSON `messages` array and return JSON in this form:

```json
{ "reply": "Hello — how can I help?" }
```

## Safety and privacy

- SafeVoice provides general educational guidance and calming tools. It is not an emergency service, medical provider, or replacement for professional support.
- If someone is in immediate danger, contact local emergency services or a trusted adult.
- Chat messages may be stored locally in the visitor's browser. The Quick Exit feature cannot erase browser history, network records, or data stored outside the site.
- Verify all helpline contact information with official sources before public deployment, as services and availability may change.
- Never place private API keys, tokens, passwords, or `.env` files in a public GitHub repository.

## Technology

- HTML5
- CSS3
- Vanilla JavaScript
- Google Fonts: Plus Jakarta Sans

## License

No license has been selected yet. Add a license before allowing others to reuse or distribute this project.
