# Confirm Close

English · [中文](README.zh-CN.md)

Makes Herdr ask first: a confirm dialog before a key closes a pane or a tab. Enter to close, Esc to cancel.

![Confirm Close](preview.png)

Herdr closes panes and tabs the moment you press the key, and only asks on a space's last tab. One stray cmd-w and your running agent is gone.

## The keys are swapped

| Key | Herdr default | With this mod |
| --- | --- | --- |
| `cmd-w` | close tab | confirm, then close pane |
| `cmd-shift-w` | close pane | confirm, then close tab |

`cmd-w` closing the pane is what most terminals do. To keep Herdr's keys, install the dialog only (below).

## Install

Tell your Herdr agent:

```
Read ~/.config/herdr-app/AGENTS.md, then add this mod: https://github.com/Hariketsu/herdr-confirm-close/tree/main
```

It will ask whether you want the swapped keys or the dialog only.

By hand:

1. Copy `mods/ask-close-pane` and `mods/ask-close-tab` into `~/.config/herdr-app/mods/`.
2. In the `global` section of `~/.config/herdr-app/keys.json`, add one of:
   - swapped keys (same as this repo's `keys.json`): `"cmd-w": "mod.open:ask-close-pane"`, `"cmd-shift-w": "mod.open:ask-close-tab"`
   - dialog only: `"cmd-w": "mod.open:ask-close-tab"`, `"cmd-shift-w": "mod.open:ask-close-pane"`
3. Run `herdr-app check` on both folders.

Once you edit `keys.json`, Herdr stops adding new default keys to it on upgrade.

## Limits

- Clicking `×` on a tab or pane header, or closing from the command palette, shows no dialog.
- Closing a space's last pane or last tab asks "Close space?", since that closes the whole space.

## What it does

It only reads the focused pane or tab, and runs `pane.close` or `tab.close` after you confirm.

## Uninstall

Delete the two folders and set the keys back: `"cmd-w": "tab.close"`, `"cmd-shift-w": "pane.close"`.
