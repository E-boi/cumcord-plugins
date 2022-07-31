import { React, FluxDispatcher } from "@cumcord/modules/common";
import modules from "./modules";
import css from "./style.scss";
import Settings from "./components/Settings";
import { updateDmList } from "./utils";

const patches = {};

export default () => {
  Object.keys(modules).forEach((m) => {
    patches[m] = [];
    modules[m] = modules[m].bind({ injections: patches[m] });
  });

  return {
    onLoad() {
      Object.keys(modules).forEach((m) => modules[m]());
      patches["css"] = [css()];
    },
    onUnload() {
      Object.keys(modules).forEach((m) => {
        patches[m].forEach((unpatch) => unpatch?.());
      });
      patches["css"][0]?.();
      updateDmList();
      FluxDispatcher.dirtyDispatch({
        type: "PDM_GUILDLIST_REMOVE",
        removeAll: true,
      });
    },
    settings: React.createElement(Settings),
  };
};
