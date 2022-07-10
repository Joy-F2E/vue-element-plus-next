import type { App } from "vue";
import ChooseIcon from "./src/index.vue";

export default {
  install(app: App) {
    app.component('m-choose-icon', ChooseIcon)
  }
}