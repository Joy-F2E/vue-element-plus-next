import type { App } from 'vue';
import ChooseArea from './ChooseArea';
import ChooseIcon from './ChooseIcon';
import Trend from './Trend';
const components = [
  ChooseArea,
  ChooseIcon,
  Trend
]

export default { 
  install(app: App) {
    components.map(item => {
      app.use(item)
    })
  }
}