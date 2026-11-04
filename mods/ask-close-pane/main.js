// cmd-w: ask before closing the focused pane, via the shipped confirm dialog.
import { View, div } from "gpui-kit";
import { focused, panes, props, openOverlay, closeOverlay } from "herdr";

export default class AskClosePane extends View {
  init() {
    const own = props()?.overlay;
    if (own) closeOverlay(own);
    const id = focused()?.pane;
    if (!id) return;
    const p = panes().find((x) => x.pane === id);
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
