/* eslint-disable */
import { VNode, CreateElement } from 'vue'

export default {
  name: 'Comp',

  functional: true,

  props: {
    render: Function,
    params: {
      type: Object,
      default: () => ({})
    }
  },

  render: (h: CreateElement, ctx: any): VNode => {
    const params = ctx.props.params
    return ctx.props.render(h, params)
  }
}
