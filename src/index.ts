import { vdom } from "./components/types.js";

function getKeyValue(key: string, obj: Record<string, any>) {
  return obj[key];
}

export default class fluxus {
  private vdomErr: vdom = {tag: "h1", props: {"style": "font-size: 40px"}, children: "Error!"}
  vdom: vdom | undefined;
  el: HTMLElement | undefined | null;


  constructor(VirtualDOM?: vdom, parent?: HTMLElement | null) {
    this.vdom = VirtualDOM;
    this.el = parent;
  }

  render(vdom?: vdom, container?: HTMLElement | null | undefined | ParentNode) {
    if (!vdom && !container) {
      this.mount(this.vdom || this.vdomErr, this.el);
    }
    if (!vdom && container) {
      this.mount(this.vdom || this.vdomErr, container);
    }
    if (vdom && !container) {
      this.mount(vdom, this.el);
    }
    if (vdom && container) {
      this.mount(vdom, container);
    }
  }

  private mount(vnode: vdom, container: HTMLElement | null | undefined | ParentNode) {
    const el = document.createElement(vnode.tag);

    for(const key in vnode.props) {
      el.setAttribute(key, getKeyValue(key, vnode.props));
    }

    if(typeof vnode.children === "string"){
      el.textContent = vnode.children;
    } else {
      vnode.children.forEach(child => {
        this.mount(child, el)
      });
    }

    container?.appendChild(el)

    vnode.$el = el;
  }
  private unmount(vnode: vdom) {
    vnode.$el?.parentNode?.removeChild(vnode.$el);
  }
  patch(n1: vdom, n2: vdom) {
    if(n1.tag !== n2.tag) {
      this.mount(n2, n1.$el?.parentNode);
      this.unmount(n1)
    } else {
      n2.$el = n1.$el

      if(typeof n2.children === "string") {
        n2.$el!.textContent = n2.children
      } else {
        while(n2.$el?.attributes.length! > 0) {
          n2.$el?.removeAttribute(n2.$el.attributes[0]?.name!)
        }
        for(const key in n2.props){
          n2.$el?.setAttribute(key, getKeyValue(key, n2.props))
        }

        if(typeof n1.children === "string") {
          n2.$el!.textContent = null;
          n2.children.forEach(child => {
            this.mount(child, n2.$el)
          })
        } else {
          const commonLenght = Math.min(n1.children.length, n2.children.length);

          for(var i = 0;i< commonLenght; i++) {
            this.patch(n1.children[i]!, n2.children[i]!)
          }

          if(n1.children.length > n2.children.length) {
            n1.children.slice(n2.children.length).forEach(child => this.unmount(child))
          } else if(n2.children.length > n1.children.length) {
            n2.children.slice(n2.children.length).forEach(child => this.mount(child, child.$el))
          }
        }
      }
    }
  }
}
