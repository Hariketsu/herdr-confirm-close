// cmd-shift-w: ask before closing the shown tab, via the shipped confirm dialog.
import { View, div } from "gpui-kit";
import { focused, panes, spaces, props, openOverlay, closeOverlay } from "herdr";

export default class AskCloseTab extends View {
  init() {
    const own = props()?.overlay;
    if (own) closeOverlay(own);
    const f = focused();
    if (!f?.tab) return;
    const s = spaces().find((x) => x.id === f.space);
    const tab = spaces().flatMap((x) => x.tabs ?? []).find((t) => t.id === f.tab);
    // Closing a space's last tab closes the space, and Herdr would ask again: ask that once, as Herdr does.
    if (s?.tabs.length === 1) {
      openOverlay({
        mod: "confirm", kind: "dialog", width: 380, height: 150,
        props: {
          title: "Close space?",
          detail: `${s.name} — 1 tabs, ${panes().filter((p) => p.tab === f.tab && p.terminal).length} terminals`,
          command: { name: "space.close", args: { id: s.id, confirmed: true } },
        },
      });
      return;
    }
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
