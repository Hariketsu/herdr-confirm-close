# Confirm Close

[English](README.md) · 中文

这个 mod 让 Herdr 先问一句，用快捷键关 pane 或 tab 之前，先弹一个确认框。Enter 关闭，Esc 取消。

![Confirm Close](preview.png)

Herdr 按下快捷键会直接关 pane 和 tab，只有在关 space 的最后一个 tab 时才会问。要是手滑按一下 cmd-w，正在跑的 agent 就没了。

## 快捷键是对调的

| 快捷键 | Herdr 默认 | 装了这个 mod |
| --- | --- | --- |
| `cmd-w` | 关 tab | 确认后关 pane |
| `cmd-shift-w` | 关 pane | 确认后关 tab |

`cmd-w` 关 pane 是多数终端的习惯。想保留 Herdr 原来的键位，就只装确认框（见下）。

## 安装

跟你的 Herdr agent 说：

```
Read ~/.config/herdr-app/AGENTS.md, then add this mod: https://github.com/Hariketsu/herdr-confirm-close/tree/main
```

它会问你要对调键位，还是只要确认框。

手动安装：

1. 把 `mods/ask-close-pane` 和 `mods/ask-close-tab` 复制到 `~/.config/herdr-app/mods/`。
2. 在 `~/.config/herdr-app/keys.json` 的 `global` 里加上其中一组：
   - 对调键位（跟本仓库的 `keys.json` 一样）：`"cmd-w": "mod.open:ask-close-pane"`、`"cmd-shift-w": "mod.open:ask-close-tab"`
   - 只要确认框：`"cmd-w": "mod.open:ask-close-tab"`、`"cmd-shift-w": "mod.open:ask-close-pane"`
3. 对两个文件夹分别跑一次 `herdr-app check`。

改过 `keys.json` 之后，Herdr 升级时不会再往里加新的默认快捷键。

## 已知限制

- 点 tab 或 pane 标题栏上的 `×`、在命令面板里执行关闭，不会弹确认框。
- 关 space 里最后一个 pane 或 tab 时，问的是 "Close space?"，因为关掉它就是关掉整个 space。

## 它会做什么

只读取当前聚焦的 pane 或 tab，你确认后执行 `pane.close` 或 `tab.close`。

## 卸载

删掉两个文件夹，把快捷键改回去：`"cmd-w": "tab.close"`、`"cmd-shift-w": "pane.close"`。
