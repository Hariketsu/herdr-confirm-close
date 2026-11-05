# Confirm Close

A confirm dialog before cmd-w closes a pane or cmd-shift-w closes a tab. Enter to close, Esc to cancel.

![Confirm Close](preview.png)

## Ask about the keys first

`keys.json` swaps Herdr's defaults:

| Key | Herdr default | This mod |
| --- | --- | --- |
| `cmd-w` | close tab | confirm, then close pane |
| `cmd-shift-w` | close pane | confirm, then close tab |

Ask the person which they want:

- Swapped keys: merge `keys.json` as is.
- Dialog only: `"cmd-w": "mod.open:ask-close-tab"`, `"cmd-shift-w": "mod.open:ask-close-pane"`.

## The dialog

Herdr's shipped `confirm` mod, the one behind "Close space?":

```js
openOverlay({ mod: "confirm", kind: "dialog", width: 380, height: 150,
  props: { title, detail, command: { name, args } } })
```

- **Close pane?** `<name> — <folder>`, e.g. `fish — herdr-confirm-close`. Name: the program's name for a shell or an agent, else the terminal's title, else the program's name, else `pane`. Folder: last part of `cwd`, dropped if none.
- **Close tab?** `<tab name> — <N> panes`.
- **Close space?** Instead of either, when the pane is the space's only pane or the tab its only tab: `<space name> — 1 tabs, <N> terminals`, as Herdr writes it. Confirm runs `space.close { id, confirmed: true }`.

It closes what was focused when the key was pressed. Nothing focused: no dialog.

## Files

- `mods/ask-close-pane/`, `mods/ask-close-tab/`: `main.js` and `mod.json` = `{ "place": "none", "overlay": { "kind": "dialog", "width": 1, "height": 1 } }`.
- Each `init` closes its own overlay, reads `focused()` with `panes()` or `spaces()[].tabs`, and opens `confirm` with `pane.close { pane }` or `tab.close { id }`. `render` returns `div()`.
- `keys.json`: `global` → `"cmd-w": "mod.open:ask-close-pane"`, `"cmd-shift-w": "mod.open:ask-close-tab"`.

## Gotchas

- `herdr-app check` runs `init` with `props()` null: use `props()?.overlay`.
- `mod.open` takes no arguments, so one mod per key.
- Fish sets the title to the folder; use the program's name for shells.
- A second line of detail scrolls at 150px. Keep it to one.
- The `×` buttons and the command palette don't ask.
- Herdr won't close a space's last pane with `pane.close`, and `tab.close` on its last tab asks "Close space?" again. Ask "Close space?" once instead.
- Herdr stops adding new default keys to an edited `keys.json`.

## Done when

- `herdr-app check` passes for both folders.
- On a fish pane: "Close pane?", `fish — <folder>` on one line. Esc keeps it, Enter closes it.
- "Close tab?", `<tab> — <N> panes`. Confirm closes the tab.
- On a space's only pane or only tab, both keys ask "Close space?" once; Confirm closes the space.
- Same size and style as Herdr's "Close space?".
