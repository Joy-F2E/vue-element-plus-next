export interface MenuItem {
  // 导航图标
  icon?: string,
  // 处理后的图标
  icons?: any,
  // 导航名称
  name: string,
  // 唯一标识
  index: string,
  // 子菜单
  children?: MenuItem[]
}