
export type vdom = {
  tag: string,
  props: {
    class?: string,
    title?: string,
    src?: string,
    style?: string,
    onClick?: {}
  },
  children: vdom[] | string,
  $el?: HTMLElement
}
