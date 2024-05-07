import { defineComponent, useAttrs, type PropType } from "vue";
import type { MenuItem } from "./types";
import { transToKeyBase } from "@/utils";

export default defineComponent({
  props: {
    data: {
      type: Array as PropType<MenuItem[]>,
      required: true
    },
    defaultActive: {
      type: String,
      default: '1'
    },
    router: {
      type: Boolean,
      default: false
    }
  },
  setup(props, ctx) {
    // 渲染无限层级菜单的方法
    let renderMenu = (data: MenuItem[]) => {
      return data.map((item: MenuItem) => {
        // 每个菜单的图标
        item.icons = `el-icon-${transToKeyBase(item.icon!)}`
        // 处理插槽
        let slots = {
          title: () => {
            return <>
              <item.icons />
              <span>{ item.name }</span>
            </>
          }
        }
        // 递归渲染children
        if (item.children && item.children.length) {
          return (
            <el-sub-menu index={item.index} v-slots={slots}>
              { renderMenu(item.children) }
            </el-sub-menu>
          )
        }
        return (
          <el-menu-item index={item.index}>
            <item.icons />
            <span>{ item.name }</span>
          </el-menu-item>
        )
      })
    }
    let attrs = useAttrs()
    return () => {
      return (
        <el-menu
          default-active={props.defaultActive}
          router={props.router}
          {...attrs}
        >
          { renderMenu(props.data) }
        </el-menu>
      )
    }
  },
})