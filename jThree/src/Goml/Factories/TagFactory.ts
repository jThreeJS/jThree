import GomlTreeNodeBase = require("../GomlTreeNodeBase");
import jThreeObject = require("../../Base/JThreeObject");
import JThreeContextProxy = require("../../Core/JThreeContextProxy");
import GomlLoader = require("../GomlLoader");
class TagFactory extends jThreeObject {

    constructor(tagName:string,nodeType:any)
    {
      super();
      this.tagName=tagName;
      this.nodeType=nodeType;
    }

    protected tagName:string;

    protected nodeType:any;

    public get TagName(): string {
        return this.tagName;
    }

    public get NoNeedParseChildren():boolean
    {
        return false;
    }

    public CreateNodeForThis(elem: HTMLElement, loader: GomlLoader, parent: GomlTreeNodeBase): GomlTreeNodeBase {
        return new this.nodeType(elem,loader,parent);
    }

    protected getTag(name:string): TagFactory {
        return JThreeContextProxy.getJThreeContext().GomlLoader.Configurator.getGomlTagFactory(name);
    }
}

export=TagFactory;
