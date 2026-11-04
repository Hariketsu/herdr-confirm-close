# herdr-confirm-close

[English](README.md) · 中文

![Confirm Close](preview.png)

Herdr App 的两个小 mod：用快捷键关闭 pane 或 tab 前先弹出确认框。Herdr 自带的 `pane.close` / `tab.close` 不会确认，只有关掉 space 的最后一个 tab 时才问。

| 快捷键 | 确认框 | 确认后 |
| --- | --- | --- |
| `cmd-w` | Close pane?（`程序名 — 文件夹`） | `pane.close` |
| `cmd-shift-w` | Close tab?（`tab 名 — N panes`） | `tab.close` |

对话框用的是 Herdr 自带的 `confirm` mod，尺寸和文案格式跟 Herdr 自己的 "Close space?" 一致。Enter 确认，Esc 取消。

## 安装

让你的 Herdr agent 添加 `herdr.dev/mods/Hariketsu/herdr-confirm-close`，或者手动安装：

1. 把 `mods/ask-close-pane`、`mods/ask-close-tab` 复制到 `~/.config/herdr-app/mods/`。
2. 把 `keys.json` 里的两行合并进 `~/.config/herdr-app/keys.json` 的 `global`（替换 Herdr 默认的 `cmd-w` / `cmd-shift-w`）。
3. `herdr-app check ~/.config/herdr-app/mods/ask-close-pane`，`ask-close-tab` 同样。

## 没覆盖到的

- 鼠标点 pane 标题栏或 tab 上的 `×`、命令面板直接执行 `pane.close` / `tab.close`，仍不确认。
- Herdr 不允许关掉 space 的最后一个 pane，这时确认后没反应；关 space 用 `cmd-shift-w`，Herdr 会再问一次 "Close space?"。

## 卸载

删掉两个 mod 文件夹，把 `keys.json` 里两行改回 `"cmd-w": "tab.close"`、`"cmd-shift-w": "pane.close"`（Herdr 默认）。
