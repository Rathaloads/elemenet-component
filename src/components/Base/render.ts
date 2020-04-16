import { VNode, CreateElement, default as Vue } from 'vue'

export interface RenderFunction<T = any> {
  (h: CreateElement, params: T): VNode
}

export default Vue.extend({
  name: 'Render',

  functional: true,

  props: {
    render: Function,
    
    params: {
      type: Object,
      default: () => ({}),
    },
  },

  render: (h: CreateElement, ctx: any): VNode => {
    const params = ctx.props.params
    return ctx.props.render(h, params)
  },
})