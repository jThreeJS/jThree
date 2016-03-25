import IRenderer from "./IRenderer";
import RendererBase from "./RendererBase";
import RBO from "../Resources/RBO/RBO";
import BufferSet from "./BufferSet";
import Camera from "./../SceneObjects/Camera/Camera";
import RenderPathExecutor from "./RenderPathExecutor";
import Rectangle from "../../Math/Rectangle";
import RendererConfiguratorBase from "./RendererConfigurator/RendererConfiguratorBase";
import RendererConfigurator from "./RendererConfigurator/BasicRendererConfigurator";
import JThreeContext from "../../JThreeContext";
import ContextComponents from "../../ContextComponents";
import ResourceManager from "../ResourceManager";
import Scene from "../Scene";
import RenderPath from "./RenderPath";
import Canvas from "../Canvas/Canvas";

/**
* Provides base class feature for renderer classes.
*/
class BasicRenderer extends RendererBase implements IRenderer {

  public defaultRenderBuffer: RBO;

  public renderPath: RenderPath = new RenderPath(this);

  public bufferSet: BufferSet;
  /**
   * The camera reference this renderer using for draw.
   */
  public camera: Camera;

  /**
   * Constructor of RenderBase
   * @param canvas
   * @param viewportArea
   * @returns {}
   */
  constructor(canvas: Canvas, viewportArea: Rectangle, configurator?: RendererConfiguratorBase) {
    super(canvas);
    configurator = configurator || new RendererConfigurator();
    this.region = viewportArea;
    this.renderPath.fromPathTemplate(configurator.getStageChain(this));
    this.bufferSet = new BufferSet(this);
    this.bufferSet.appendBuffers(configurator.TextureBuffers);
  }

  /**
   * Initialize renderer to be rendererd.
   * Basically, this method are used for initializing GL resources, the other variable and any resources will be initialized when constructor was called.
   * This method is not intended to be called by user manually.
   */
  public initialize(): void {
    const rm = JThreeContext.getContextComponent<ResourceManager>(ContextComponents.ResourceManager);
    this.defaultRenderBuffer = rm.createRBO(this.id + ".rbo.default", this.region.Width, this.region.Height);
    this.on("resize", () => {
      JThreeContext.getContextComponent<ResourceManager>(ContextComponents.ResourceManager).getRBO(this.id + ".rbo.default").resize(this.region.Width, this.region.Height);
    });
  }

  public dispose(): void {
    this.defaultRenderBuffer.dispose();
    this.bufferSet.dispose();
  }

  public render(scene: Scene): void {
    RenderPathExecutor.processRender(this, scene);
  }


  /**
   * It will be called before processing renderer.
   * If you need to override this method, you need to call same method of super class first.
   */
  public beforeRender(): void {
    this.applyViewport(true);
    this.canvas.beforeRender(this);
  }

  /**
   * It will be called after processing renderer.
   * If you need to override this method, you need to call same method of super class first.
   */
  public afterRender(): void {
    this.gl.flush();
    this.canvas.afterRender(this);
  }

  /**
   * Apply viewport configuration
   */
  public applyViewport(isDefaultBuffer: boolean): void {
    if (isDefaultBuffer) {
      this.gl.viewport(this.region.Left, this.canvas.region.Height - this.region.Bottom, this.region.Width, this.region.Height);
    } else {
      this.gl.viewport(0, 0, this.region.Width, this.region.Height);
    }
  }
}


export default BasicRenderer;
