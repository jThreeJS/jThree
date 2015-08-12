
import Lambert = require("../../../Core/Materials/LambertMaterial");
import GomlTreeNodeBase = require("../../GomlTreeNodeBase");
import GomlLoader = require("../../GomlLoader");
import MaterialNodeBase = require('./MaterialNodeBase');
import Material = require('../../../Core/Materials/Material');
class LambertNode extends MaterialNodeBase
{
    public material:Lambert;

    constructor(elem:HTMLElement,loader:GomlLoader,parent:GomlTreeNodeBase) {
        super(elem,loader,parent);
        this.attributes.defineAttribute({
          "color":{
            value:"#f0C",converter:"color4",handler:(v)=>{this.material.Color=v.Value}
          }
        });

    }

    protected ConstructMaterial():Material
    {
      this.material=new Lambert();
      this.material.Color=this.attributes.getValue("color");
      return this.material;
    }

    public beforeLoad()
    {
      super.beforeLoad();
    }

}

export=LambertNode;