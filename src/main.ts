// main.ts — the entry point loaded by index.html.
//
// This file used to be an inline <script> tag in index.html.
// Now it's a proper TypeScript file that imports the Game class.
//
// "as HTMLButtonElement" is a TypeScript "type assertion" — it tells TypeScript
// "I know this element is a button", so we get button-specific properties like .disabled.

import { Game } from './game/Game';

const runButton = document.getElementById('runButton') as HTMLButtonElement;

runButton.addEventListener('click', () => {
  const game = new Game();
  game.start();
  runButton.disabled = true;
});
