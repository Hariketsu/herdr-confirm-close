// cmd-w: ask before closing the focused pane, via the shipped confirm dialog.
import { View, div } from "gpui-kit";
import { focused, panes, spaces, props, openOverlay, closeOverlay } from "herdr";

export default class AskClosePane extends View {
  init() {
    const own = props()?.overlay;
    if (own) closeOverlay(own);
    const f = focused();
    const id = f?.pane;
    if (!id) return;
    const p = panes().find((x) => x.pane === id);
    // Herdr won't close a space's last pane: closing it means closing the space, so ask that, as Herdr does.
    const s = spaces().find((x) => x.id === f.space);
    if (s && s.tabs.reduce((n, t) => n + t.panes, 0) === 1) {
      openOverlay({
        mod: "confirm", kind: "dialog", width: 380, height: 150,
        props: {
          title: "Close space?",
          detail: `${s.name} — 1 tabs, ${p?.terminal ? 1 : 0} terminals`,
          command: { name: "space.close", args: { id: s.id, confirmed: true } },
        },
      });
      return;
    }
    // Same name rule as the shipped pane header; the folder by its last part, to keep one line.
    const name = ((p?.program?.agent || p?.program?.shell) && p.program.name) || p?.title || p?.program?.name || "pane";
    const dir = p?.cwd?.replace(/\/+$/, "").split("/").pop() || p?.cwd;
    openOverlay({
      mod: "confirm", kind: "dialog", width: 380, height: 150,
      props: {
        title: "Close pane?",
        detail: `${name}${dir ? ` — ${dir}` : ""}`,
        command: { name: "pane.close", args: { pane: id } },
      },
    });
  }
  render() { return div(); }
}
