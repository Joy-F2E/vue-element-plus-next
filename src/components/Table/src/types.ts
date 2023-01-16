/**
 * 定义表格需要的类型
 */

export interface TableOptions {
  // 表头
  label: string,
  // 字段名称
  prop?: string,
  // 列宽度
  width?: number | string,
  // 对齐方式
  align?: 'left' | 'center' | 'right',
  // 自定义列表模板名称
  slot?: string,
  // 是否代表操作性
  action?: boolean
}