# New Year Resolution Planner

A premium, minimalist web app that lets you turn a single resolution into a beautifully structured 12‑month calendar plan using your own LLM API key.

## Features
- No sign‑up or login required – just enter your resolution.
- Choose between Gemini, OpenAI (GPT‑4), or DeepSeek providers.
- Instant generation of a month‑by‑month plan with themes and actionable items.
- Elegant vertical scrollable calendar UI with subtle animations.
- All data stays in memory; your API key is never stored.

## Tech Stack
- **Framework**: React + Vite
- **Styling**: Vanilla CSS with custom design tokens for a calm, premium look.
- **Animations**: Framer Motion for smooth UI transitions.
- **Icons**: Lucide‑React.
- **LLM Integration**: Simple fetch calls to the selected provider using the supplied API key.

## Getting Started
```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```
Open http://localhost:5173 in your browser.

## Building for Production
```bash
npm run build
```
The production files will be output to the `dist/` directory.

## License
MIT – feel free to fork and customize!

