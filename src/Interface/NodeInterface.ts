import Ensure from "../Base/Ensure";
import GrimoireInterface from "../GrimoireInterface";
import XMLReader from "../Base/XMLReader";
import GomlParser from "../Node/GomlParser";
import Attribute from "../Node/Attribute";
import NSIdentity from "../Base/NSIdentity";
import Component from "../Node/Component";
import INodeInterfaceBase from "./INodeInterfaceBase";
import ComponentInterface from "./ComponentInterface";
import IComponentInterface from "./IComponentInterface";
import GomlNode from "../Node/GomlNode";


/**
 * 複数のノードを対象とした操作を提供するインタフェース
 */
class NodeInterface implements INodeInterfaceBase {
  constructor(public nodes: GomlNode[][]) {
    if (!nodes) {
      throw new Error("nodes is null");
    }
  }
  public queryFunc(query: string): IComponentInterface {
    return new ComponentInterface(this._queryComponents(query));
  }

  private _queryComponents(query: string): Component[][][] {
    return this.nodes.map((nodes) => {
      return nodes.map((node) => {
        const componentElements = node.componentsElement.querySelectorAll(query);
        const components: Component[] = [];
        for (let i = 0; i < componentElements.length; i++) {
          const elem = componentElements[i];
          const component = GrimoireInterface.componentDictionary[elem.getAttribute("x-gr-id")];
          if (component) {
            components.push(component);
          }
        }
        return components;
      });
    });
  }
  public isEmpty(): boolean {
    return this.count() === 0;
  }

  public get<T extends GomlNode>(): T;
  public get<T extends GomlNode>(nodeIndex: number): T;
  public get<T extends GomlNode>(treeIndex: number, nodeIndex: number): T;
  public get<T extends GomlNode>(i1?: number, i2?: number): T {
    if (i1 === void 0) {
      if (this.isEmpty()) {
        throw new Error("this NodeInterface is empty.");
      } else {
        return this.nodes[0][0] as T;
      }
    } else if (i2 === void 0) {
      if (this.count() <= i1) {
        throw new Error("index out of range.");
      } else {
        let c = i1;
        let returnNode: GomlNode = null;
        this.forEach(node => {
          if (c === 0) {
            returnNode = node
          }
          c--;
        })
        return returnNode as T;
      }
    } else {
      if (this.nodes.length <= i1 || this.nodes[i1].length <= i2) {
        throw new Error("index out of range.");
      } else {
        return this.nodes[i1][i2] as T;
      }
    }
  }
  public getAttribute(attrName: string | NSIdentity): any {
    if (this.nodes.length > 0 && this.nodes[0].length > 0) {
      throw new Error("this NodeInterface is empty.");
    }
    return this.get().attributes.get(Ensure.ensureTobeNSIdentity(attrName)).Value;
  }
  public setAttribute(attrName: string | NSIdentity, value: any): void {
    this.forEach((node) => {
      node.setAttribute(attrName, value);
    });
  }

  /**
   * 対象ノードにイベントリスナを追加します。
   * @param {string}   eventName [description]
   * @param {Function} listener  [description]
   */
  public on(eventName: string, listener: Function): NodeInterface {
    this.forEach((node) => {
      node.on(eventName, listener);
    });
    return this;
  }

  /**
   * 対象ノードに指定したイベントリスナが登録されていれば削除します
   * @param {string}   eventName [description]
   * @param {Function} listener  [description]
   */
  public off(eventName: string, listener: Function): NodeInterface {
    this.forEach((node) => {
      node.removeListener(eventName, listener);
    });
    return this;
  }

  /**
   * このノードインタフェースが対象とするノードそれぞれに、
   * タグで指定したノードを子要素として追加します。
   * @param {string} tag [description]
   */
  public append(tag: string): NodeInterface {
    this.forEach((node) => {
      const elems = XMLReader.parseXML(tag);
      elems.forEach((elem) => {
        let child = GomlParser.parse(elem, null, null);
        node.addChild(child);
      });
    });
    return this;
  }

  /**
   * このノードインタフェースが対象とするノードの子に、
   * 指定されたノードが存在すれば削除します。
   * @param {GomlNode} child [description]
   */
  public remove(): NodeInterface {
    this.forEach((node) => {
      node.delete()
    });
    return this;
  }

  /**
   * このノードインタフェースが対象とするノードに対して反復処理を行います
   * @param  {GomlNode} callback [description]
   * @return {[type]}            [description]
   */
  public forEach(callback: ((node: GomlNode, gomlIndex: number, nodeIndex: number) => void)): NodeInterface {
    this.nodes.forEach((array, gomlIndex) => {
      array.forEach((node, nodeIndex) => {
        callback(node, gomlIndex, nodeIndex);
      });
    });
    return this;
  }

  /**
   * このノードインタフェースが対象とするノードを有効、または無効にします。
   * @param {boolean} enable [description]
   */
  public setEnable(enable: boolean): NodeInterface {
    this.forEach((node) => {
      node.enabled = !!enable;
    });
    return this;
  }

  /**
   * このノードインタフェースにアタッチされたコンポーネントをセレクタで検索します。
   * @pram  {string}      query [description]
   * @return {Component[]}       [description]
   */
  public find(query: string): Component[] {
    console.warn("'find' is obsolate.use componentInterface instead.")
    const allComponents: Component[] = [];
    this._queryComponents(query).forEach((gomlComps) => {
      gomlComps.forEach((nodeComps) => {
        nodeComps.forEach((comp) => {
          allComponents.push(comp);
        });
      });
    });
    return allComponents;
  }

  /**
   * このノードインタフェースが対象とするノードのそれぞれの子ノードを対象とする、
   * 新しいノードインタフェースを取得します。
   * @return {NodeInterface} [description]
   */
  public children(): NodeInterface {
    const children = this.nodes.map((nodes) => {
      return nodes.map((node) => {
        return node.children;
      }).reduce((pre, cur) => {
        return pre.concat(cur);
      });
    });
    return new NodeInterface(children);
  }

  /**
   * 対象ノードにコンポーネントをアタッチします。
   * @param {Component} component [description]
   */
  public addComponent(componentId: string | NSIdentity, attributes: { [key: string]: any } = {}): NodeInterface {
    this.forEach((node) => {
      node.addComponent(componentId, attributes);
    });
    return this;
  }

  /**
   * 最初の対象ノードを取得する
   * @return {GomlNode} [description]
   */
  public first(): GomlNode {
    if (this.count() === 0) {
      return null;
    }
    return this.nodes[0][0];
  }

  /**
   * 対象となる唯一のノードを取得する。
   * 対象が存在しない、あるいは複数存在するときは例外を投げる。
   * @return {GomlNode} [description]
   */
  public single(): GomlNode {
    if (this.count() !== 1) {
      throw new Error("this nodeInterface is not single.");
    }
    return this.first();
  }

  /**
   * 対象となるノードの個数を取得する
   * @return {number} [description]
   */
  public count(): number {
    if (this.nodes.length === 0) {
      return 0;
    }
    const counts = this.nodes.map(nodes => nodes.length);
    return counts.reduce((total, current) => total + current, 0);
  }
}


export default NodeInterface;