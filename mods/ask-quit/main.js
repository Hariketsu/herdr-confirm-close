// cmd-q: ask before quitting, via the shipped confirm dialog.
import { View, div } from "gpui-kit";
import { panes, spaces, props, openOverlay, closeOverlay } from "herdr";

export default class AskQuit extends View {
  init() {
    const own = props()?.overlay;
    if (own) closeOverlay(own);
    // Quitting only closes the window: the terminals and their agents keep running, so say so.
    openOverlay({
      mod: "confirm", kind: "dialog", width: 380, height: 150,
      props: {
        title: "Quit Herdr?",
        detail: `${spaces().length} spaces, ${panes().filter((p) => p.terminal).length} terminals — they keep running`,
        command: { name: "app.quit", args: {} },
      },
    });
  }
  render() { return div(); }
}
