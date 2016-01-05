import BasicRenderer = require('../BasicRenderer');
import SceneObject = require('../../SceneObject');
import RenderStageBase = require('./RenderStageBase');
import ClearTargetType = require("../../../Wrapper/ClearTargetType");
import Scene = require('../../Scene');
import Program = require('../../Resources/Program/Program');
import Mesh = require('../../../Shapes/Mesh');
import Matrix = require('../../../Math/Matrix');
import ResolvedChainInfo = require('../ResolvedChainInfo');
import agent = require('superagent');

class GrayScaleStage extends RenderStageBase {

    private program: Program;
    //

    constructor(renderer: BasicRenderer) {
        super(renderer);
        var vs = require('../../Shaders/VertexShaders/PostEffectGeometries.glsl');
        agent.get("/GrayScale.glsl").end((err, res: agent.Response) => {
            this.program = this.loadProgram("jthree.shaders.vertex.post", "jthree.shaders.fragment.post.gray", "jthree.programs.post.gray", vs, res.text);
        });
    }


    public preTechnique(scene: Scene, passCount: number, texs: ResolvedChainInfo) {
        this.bindAsOutBuffer(this.DefaultFBO, [{
            texture: texs["OUT"],
            target: 0, isOptional: false
        }, {
                texture: this.DefaultRBO,
                type: "rbo",
                target: "depth"
            }], () => {
                this.Renderer.GL.clearColor(0, 0, 0, 1);
                this.Renderer.GL.clear(ClearTargetType.ColorBits);
            });
        this.Renderer.GL.clear(ClearTargetType.DepthBits);
    }


    public render(scene: Scene, object: SceneObject, passCount: number, texs: ResolvedChainInfo) {
        var geometry = object.Geometry;
        if (!geometry || !this.program) return;
        this.configureMaterial(scene, this.Renderer, new Mesh(geometry, null), texs);
        geometry.drawElements(this.Renderer.ContextManager, null);
        //this.rbLightFBO.getForContext(this.Renderer.ContextManager).unbind();
    }

    public configureMaterial(scene: Scene, renderer: BasicRenderer, object: SceneObject, texs: ResolvedChainInfo): void {
        var geometry = object.Geometry;
        var pWrapper = this.program.getForContext(renderer.ContextManager);
        pWrapper.useProgram();
        pWrapper.assignAttributeVariable("position",geometry.PositionBuffer);
        pWrapper.assignAttributeVariable("uv",geometry.UVBuffer);
        pWrapper.uniformSampler2D("source",texs["SOURCE"],0);
        geometry.IndexBuffer.getForContext(renderer.ContextManager).bindBuffer();
    }

    public needRender(scene: Scene, object: SceneObject, passCount: number): boolean {
        return true;
    }

    public getTechniqueCount(scene: Scene) {
        return 1;
    }


    public get TargetGeometry(): string {
        return "quad";
    }

    public get RenderStageConfig() {
        return {
            depthTest: true
        };
    }
}
export = GrayScaleStage;
