import EEObject from "./Base/EEObject";
import IAttributeConverterDeclaration from "./Declaration/IAttributeConverterDeclaration";
import GomlLoader from "./Node/GomlLoader";
import EnumConverter from "./Converters/EnumConverter";
import NumberArrayConverter from "./Converters/NumberArrayConverter";
import ComponentConverter from "./Converters/ComponentConverter";
import NumberConverter from "./Converters/NumberConverter";
import ObjectConverter from "./Converters/ObjectConverter";
import ArrayConverter from "./Converters/ArrayConverter";
import NodeInterface from "./Interface/NodeInterface";
import Utility from "./Base/Utility";
import GomlInterfaceImpl from "./Interface/GomlInterfaceImpl";
import BooleanConverter from "./Converters/BooleanConverter";
import GrimoireComponent from "./Components/GrimoireComponent";
import StringArrayConverter from "./Converters/StringArrayConverter";
import StringConverter from "./Converters/StringConverter";
import Attribute from "./Node/Attribute";
import Constants from "./Base/Constants";
import ITreeInitializedInfo from "./Node/ITreeInitializedInfo";
import GomlNode from "./Node/GomlNode";
import ComponentDeclaration from "./Node/ComponentDeclaration";
import Component from "./Node/Component";
import IAttributeDeclaration from "./Node/IAttributeDeclaration";
import NSSet from "./Base/NSSet";
import NodeDeclaration from "./Node/NodeDeclaration";
import NSIdentity from "./Base/NSIdentity";
import NSDictionary from "./Base/NSDictionary";
import Ensure from "./Base/Ensure";
import {Name} from "./Base/Types";


export default class GrimoireInterfaceImpl extends EEObject {

  public nodeDeclarations: NSDictionary<NodeDeclaration> = new NSDictionary<NodeDeclaration>();

  public converters: NSDictionary<IAttributeConverterDeclaration> = new NSDictionary<IAttributeConverterDeclaration>();

  public componentDeclarations: NSDictionary<ComponentDeclaration> = new NSDictionary<ComponentDeclaration>();

  public rootNodes: { [rootNodeId: string]: GomlNode } = {};

  public loadTasks: ({ ns: string, task: (interf: GrimoireInterfaceImpl) => Promise<void> })[] = [];

  public lib: {
    [key: string]: {
      __VERSION__: string;
      __NAME__: string;
      [key: string]: any;
    }
  } = {};

  public nodeDictionary: { [nodeId: string]: GomlNode } = {};
  public componentDictionary: { [componentId: string]: Component } = {};
  public debug = true;

  /**
   * The object assigned to gr before loading grimoire.js
   * @type {any}
   */
  public noConflictPreserve: any;

  private _registeringPluginNamespace: string;
  private _registrationContext: string = Constants.defaultNamespace;

  public get initializedEventHandler(): ((scriptTags: HTMLScriptElement[]) => void)[] {
    return GomlLoader.initializedEventHandlers;
  }

  /**
   * Generate namespace helper function
   * @param  {string} ns namespace URI to be used
   * @return {[type]}    the namespaced identity
   */
  public ns(ns: string): (name: string) => NSIdentity {
    return (name: string) => NSIdentity.from(ns, name);
  }

  public initialize(): void {
    this.registerConverter("String", StringConverter);
    this.registerConverter("StringArray", StringArrayConverter);
    this.registerConverter("Boolean", BooleanConverter);
    this.registerConverter(ArrayConverter);
    this.registerConverter("Object", ObjectConverter);
    this.registerConverter(EnumConverter);
    this.registerConverter("Number", NumberConverter);
    this.registerConverter(ComponentConverter);
    this.registerConverter("NumberArray", NumberArrayConverter);
    this.registerComponent("GrimoireComponent", GrimoireComponent);
    this.registerNode("grimoire-node-base", ["GrimoireComponent"]);
  }

  /**
   * Register plugins
   * @param  {(}      loadTask [description]
   * @return {[type]}          [description]
   */
  public register(loadTask: (inf: GrimoireInterfaceImpl) => Promise<void>): void {
    this.loadTasks.push({ ns: this._registeringPluginNamespace, task: loadTask });
    this._registeringPluginNamespace = Constants.defaultNamespace;
  }

  public async resolvePlugins(): Promise<void> {
    for (let i = 0; i < this.loadTasks.length; i++) {
      const obj = this.loadTasks[i];
      this._registrationContext = obj.ns;
      try {
        await obj.task(this);
      } catch (e) {
        console.error(`Error: loadTask of plugin '${obj.ns}' is failed.`);
        console.error(e);
      }
    }
    this._registrationContext = Constants.defaultNamespace;
  }

  /**
   * register custom component
   * @param  {string                |   NSIdentity} name          [description]
   * @param  {IAttributeDeclaration }} attributes           [description]
   * @param  {Object                |   (new                 (}           obj           [description]
   * @return {[type]}                       [description]
   */
  public registerComponent(name: Name, obj: Object | (new () => Component), superComponent?: Name | (new () => Component)): ComponentDeclaration {
    name = this._ensureTobeNSIdentityOnRegister(name);
    if (this.componentDeclarations.get(name)) {
      throw new Error(`component ${name.fqn} is already registerd.`);
    }
    if (this.debug && !Utility.isCamelCase(name.name)) {
      console.warn(`component ${name.name} is registerd. but,it should be 'CamelCase'.`);
    }

    let superCtor;
    if (superComponent) {
      superCtor = this._ensureNameTobeConstructor(superComponent);
      if (!superCtor) {
        throw new Error(`${superComponent} is not exist.`);
      }
    }
    obj = this._ensureTobeComponentConstructor(obj, superCtor);
    let ctor = this._ensureTobeComponentConstructor(obj, superCtor);
    const attrs = ctor["attributes"] as { [name: string]: IAttributeDeclaration } || {};
    for (let key in attrs) {
      if (attrs[key].default === void 0) {
        throw new Error(`default value of attribute ${key} in ${name.fqn} must be not 'undefined'.`);
      }
    }
    const dec = new ComponentDeclaration(name as NSIdentity, attrs, ctor);
    this.componentDeclarations.set(name as NSIdentity, dec);
    return dec;
  }

  public registerNode(name: Name,
    requiredComponents: (Name)[],
    defaults?: { [key: string]: any } | NSDictionary<any>,
    superNode?: Name, freezeAttributes?: string[]): void {
    name = this._ensureTobeNSIdentityOnRegister(name);
    if (this.nodeDeclarations.get(name)) {
      throw new Error(`gomlnode ${name.fqn} is already registerd.`);
    }
    if (this.debug && !Utility.isSnakeCase(name.name)) {
      console.warn(`node ${name.name} is registerd. but,it should be 'snake-case'.`);
    }
    requiredComponents = Ensure.tobeNSIdentityArray(requiredComponents);
    defaults = Ensure.tobeNSDictionary(defaults);
    superNode = Ensure.tobeNSIdentity(superNode); // TODO: lazy evaluate ?
    this.nodeDeclarations.set(name as NSIdentity,
      new NodeDeclaration(name as NSIdentity,
        NSSet.fromArray(requiredComponents as NSIdentity[]),
        defaults as NSDictionary<any>,
        superNode as NSIdentity, freezeAttributes));
  }
  public getCompanion(scriptTag: Element): NSDictionary<any> {
    const root = this.getRootNode(scriptTag);
    if (root) {
      return root.companion;
    } else {
      throw new Error("scriptTag is not goml");
    }
  }
  public addRootNode(tag: HTMLScriptElement, rootNode: GomlNode): string {
    if (!rootNode) {
      throw new Error("can not register null to rootNodes.");
    }
    tag.setAttribute("x-rootNodeId", rootNode.id);
    this.rootNodes[rootNode.id] = rootNode;
    rootNode.companion.set(this.ns(Constants.defaultNamespace)("scriptElement"), tag);

    // awake and mount tree.
    rootNode.setMounted(true);
    rootNode.broadcastMessage("treeInitialized", <ITreeInitializedInfo>{
      ownerScriptTag: tag,
      id: rootNode.id
    });
    rootNode.sendInitializedMessage(<ITreeInitializedInfo>{
      ownerScriptTag: tag,
      id: rootNode.id
    });
    return rootNode.id;
  }

  public getRootNode(scriptTag: Element): GomlNode {
    const id = scriptTag.getAttribute("x-rootNodeId");
    return this.rootNodes[id];
  }

  public noConflict(): void {
    window["gr"] = this.noConflictPreserve;
  }

  public queryRootNodes(query: string): GomlNode[] {
    const scriptTags = document.querySelectorAll(query);
    const nodes: GomlNode[] = [];
    for (let i = 0; i < scriptTags.length; i++) {
      const node = this.getRootNode(scriptTags.item(i));
      if (node) {
        nodes.push(node);
      }
    }
    return nodes;
  }

  public registerConverter(name: Name, converter: ((val: any, attr: Attribute) => any)): void;
  public registerConverter(declaration: IAttributeConverterDeclaration): void;
  public registerConverter(arg1: Name | IAttributeConverterDeclaration, converter?: ((val: any, attr: Attribute) => any)): void {
    if (converter) {
      this.registerConverter({ name: this._ensureTobeNSIdentityOnRegister(arg1 as any), verify: () => true, convert: converter });
      return;
    }
    const dec = arg1 as IAttributeConverterDeclaration;
    this.converters.set(this._ensureTobeNSIdentityOnRegister(dec.name), dec);
  }

  public overrideDeclaration(targetDeclaration: Name, additionalComponents: (Name)[]): NodeDeclaration;
  public overrideDeclaration(targetDeclaration: Name, defaults: { [attrName: string]: any }): NodeDeclaration;
  public overrideDeclaration(targetDeclaration: Name, additionalComponents: (Name)[], defaults: { [attrName: string]: any }): NodeDeclaration;
  public overrideDeclaration(targetDeclaration: Name, arg2: (Name)[] | { [attrName: string]: any }, defaults?: { [attrName: string]: any }): NodeDeclaration {
    const dec = this.nodeDeclarations.get(targetDeclaration);
    if (!dec) {
      throw new Error(`attempt not-exist node declaration : ${Ensure.tobeNSIdentity(targetDeclaration).name}`);
    }
    if (defaults) {
      const additionalC = arg2 as (Name)[];
      for (let i = 0; i < additionalC.length; i++) {
        dec.addDefaultComponent(additionalC[i]);
      }
      dec.defaultAttributes.pushDictionary(Ensure.tobeNSDictionary(defaults));
    } else if (Array.isArray(arg2)) {
      const additionalC = arg2 as (Name)[];
      for (let i = 0; i < additionalC.length; i++) {
        dec.addDefaultComponent(additionalC[i]);
      }
    } else {
      dec.defaultAttributes.pushDictionary(Ensure.tobeNSDictionary(arg2));
    }
    return dec;
  }



  /**
   * This method is not for users.
   * Just for unit testing.
   *
   * Clear all configuration that GrimoireInterface contain.
   */
  public clear(): void {
    this.nodeDeclarations.clear();
    this.componentDeclarations.clear();
    this.converters.clear();
    for (let key in this.rootNodes) {
      delete this.rootNodes[key];
    }
    for (let key in this.nodeDictionary) {
      delete this.nodeDictionary[key];
    }
    for (let key in this.componentDictionary) {
      delete this.componentDictionary[key];
    }
    this.loadTasks.splice(0, this.loadTasks.length);
    this._registeringPluginNamespace = Constants.defaultNamespace;
    this.initialize();
  }

  public extendGrimoireInterface(name: string, func: Function): void {
    if (this[name]) {
      throw new Error(`gr.${name} can not extend.it is already exist.`);
    }
    this[name] = func.bind(this);
  }
  public extendGomlInterface(name: string, func: Function): void {
    if (GomlInterfaceImpl[name]) {
      throw new Error(`gr.${name} can not extend.it is already exist.`);
    }
    GomlInterfaceImpl[name] = func.bind(this);
  }
  public extendNodeInterface(name: string, func: Function): void {
    if (NodeInterface[name]) {
      throw new Error(`gr.${name} can not extend.it is already exist.`);
    }
    NodeInterface[name] = func.bind(this);
  }

  /**
   * use for notify GrimoireInterface of plugin namespace to be ragister.
   * notified namespace will use when resolve loadTask of the plugin.
   * @param {string} namespace namespace of plugin to be ragister.
   */
  public notifyRegisteringPlugin(namespace: string): void {
    this._registeringPluginNamespace = namespace;
  }

  /**
   * Ensure the given object or constructor to be an constructor inherits Component;
   * @param  {Object | (new ()=> Component} obj [The variable need to be ensured.]
   * @return {[type]}      [The constructor inherits Component]
   */
  private _ensureTobeComponentConstructor(obj: Object | (new () => Component), baseConstructor?: (new () => Component)): new () => Component {
    if (typeof obj === "function") {
      if (!((obj as Function).prototype instanceof Component) && (obj as Function) !== Component) {
        throw new Error("Component constructor must extends Component class.");
      }
      return obj as (new () => Component);
    } else if (typeof obj === "object") {
      if (baseConstructor && !((baseConstructor as Function).prototype instanceof Component)) {
        throw new Error("Base component comstructor must extends Compoent class.");
      }
      const ctor = baseConstructor || Component;
      const newCtor = function() {
        ctor.call(this);
      };
      const properties = {};
      for (let key in obj) {
        if (key === "attributes") {
          continue;
        }
        properties[key] = { value: obj[key] };
      }

      const attributes = {};
      for (let key in ctor["attributes"]) {
        attributes[key] = ctor["attributes"][key];
      }
      for (let key in obj["attributes"]) {
        attributes[key] = obj["attributes"][key];
      }
      newCtor.prototype = Object.create(ctor.prototype, properties);
      Object.defineProperty(newCtor, "attributes", {
        value: attributes
      });
      obj = newCtor;
      return obj as (new () => Component);
    }
    return Component;
  }

  private _ensureNameTobeConstructor(component: Name | (new () => Component)): (new () => Component) {
    if (!component) {
      return null;
    }
    if (typeof component === "function") {
      return component;
    } else if (typeof component === "string") {
      return this._ensureNameTobeConstructor(Ensure.tobeNSIdentity(component));
    } else {
      // here NSIdentity.
      let c = this.componentDeclarations.get(component);
      if (!c) {
        return null;
      }
      return c.ctor;
    }
  }

  private _ensureTobeNSIdentityOnRegister(name: Name): NSIdentity {
    if (!name) {
      return undefined;
    }
    if (typeof name === "string") {
      if (name.indexOf("|") !== -1) {
        return NSIdentity.fromFQN(name);
      }
      return NSIdentity.from(this._registrationContext, name);
    } else {
      return name;
    }
  }
}
