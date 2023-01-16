import type { App } from 'vue';
import ChooseArea from './ChooseArea';
import ChooseIcon from './ChooseIcon';
import Trend from './Trend';
import Table from './Table';
const components = [
  ChooseArea,
  ChooseIcon,
  Trend,
  Table
]

export default { 
  install(app: App) {
    components.map(item => {
      app.use(item)
    })
  }
}