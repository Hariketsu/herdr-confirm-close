// cmd-shift-w: ask before closing the shown tab, via the shipped confirm dialog.
import { View, div } from "gpui-kit";
import { focused, spaces, props, openOverlay, closeOverlay } from "herdr";

export default class AskCloseTab extends View {
  init() {
    const own = props()?.overlay;
    if (own) closeOverlay(own);
    const f = focused();
    if (!f?.tab) return;
    const tab = spaces().flatMap((s) => s.tabs ?? []).find((t) => t.id === f.tab);
    openOverlay({
      mod: "confirm", kind: "dialog", width: 380, height: 150,
      props: {
        title: "Close tab?",
        detail: `${tab?.name ?? "tab"} — ${tab?.panes ?? 1} panes`,
        command: { name: "tab.close", args: { id: f.tab } },
      },
    });
  }
  render() { return div(); }
}
