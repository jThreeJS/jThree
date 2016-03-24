import BufferSet from "./BufferSet";
import RenderPathExecutor from "./RenderPathExecutor";
import Rectangle from "../../Math/Rectangle";
import RendererConfigurator from "./RendererConfigurator/BasicRendererConfigurator";
import JThreeContext from "../../JThreeContext";
import ContextComponents from "../../ContextComponents";
import RenderPath from "./RenderPath";
import CanvasRegion from "../Canvas/CanvasRegion";
/**
* Provides base class feature for renderer classes.
*/
class BasicRenderer extends CanvasRegion {
    /**
     * Constructor of RenderBase
     * @param canvas
     * @param viewportArea
     * @returns {}
     */
    constructor(canvas, viewportArea, configurator) {
        super(canvas.canvasElement);
        this.renderPath = new RenderPath(this);
        this._viewport = new Rectangle(0, 0, 256, 256);
        configurator = configurator || new RendererConfigurator();
        this._canvas = canvas;
        this._renderPathExecutor = new RenderPathExecutor(this);
        this._viewport = viewportArea;
        const rm = JThreeContext.getContextComponent(ContextComponents.ResourceManager);
        if (this._viewport) {
            rm.createRBO(this.ID + ".rbo.default", this._viewport.Width, this._viewport.Height);
        }
        this.renderPath.fromPathTemplate(configurator.getStageChain(this));
        this.bufferSet = new BufferSet(this);
        this.bufferSet.appendBuffers(configurator.TextureBuffers);
        this.name = this.ID;
    }
    /**
     * Initialize renderer to be rendererd.
     * Basically, this method are used for initializing GL resources, the other variable and any resources will be initialized when constructor was called.
     * This method is not intended to be called by user manually.
     */
    initialize() {
        this.alternativeTexture = this.__initializeAlternativeTexture();
        this.alternativeCubeTexture = this.__initializeAlternativeCubeTexture();
    }
    /**
     * The camera reference this renderer using for draw.
     */
    get Camera() {
        return this._camera;
    }
    /**
     * The camera reference this renderer using for draw.
     */
    set Camera(camera) {
        this._camera = camera;
    }
    render(scene) {
        this._renderPathExecutor.processRender(scene, this.renderPath);
    }
    /**
     * Canvas managing this renderer.
     */
    get Canvas() {
        return this._canvas;
    }
    get GL() {
        return this._canvas.gl;
    }
    /**
     * It will be called before processing renderer.
     * If you need to override this method, you need to call same method of super class first.
     */
    beforeRender() {
        this.applyDefaultBufferViewport();
        this.Canvas.beforeRender(this);
    }
    /**
     * It will be called after processing renderer.
     * If you need to override this method, you need to call same method of super class first.
     */
    afterRender() {
        this.GL.flush();
        this.Canvas.afterRender(this);
    }
    /**
     * Provides render stage abstraction
     */
    get RenderPathExecutor() {
        return this._renderPathExecutor;
    }
    /**
     * Getter for viewport area. Viewport area is the area to render.
     * @returns {Rectangle} the rectangle region to render.
     */
    get region() {
        return this._viewport;
    }
    /**
     * Setter for viewport area. viewport area is the area to render.
     * @param area {Rectangle} the rectangle to render.
     */
    set region(area) {
        if (!Rectangle.equals(area, this._viewport) && (typeof area.Width !== "undefined") && (typeof area.Height !== "undefined")) {
            if (isNaN(area.Height + area.Width)) {
                return;
            }
            this._viewport = area;
            JThreeContext.getContextComponent(ContextComponents.ResourceManager).getRBO(this.ID + ".rbo.default").resize(area.Width, area.Height);
            this.emit("resize", area); // This should be moved in canvas region
        }
    }
    /**
     * Apply viewport configuration
     */
    applyDefaultBufferViewport() {
        this.GL.viewport(this._viewport.Left, this._canvas.region.Height - this._viewport.Bottom, this._viewport.Width, this._viewport.Height);
    }
    applyRendererBufferViewport() {
        this.GL.viewport(0, 0, this._viewport.Width, this._viewport.Height);
    }
    /**
     * Initialize and obtain the buffer texture which will be used when any texture sampler2D variable in GLSL was not assigned.
     * This method will be called when RendererFactory called initialize method to construct instance.
     * Basically,this method is not intended to be called from user.
     * @return {TextureBase} Constructed texture buffer.
     */
    __initializeAlternativeTexture() {
        const rm = JThreeContext.getContextComponent(ContextComponents.ResourceManager);
        let tex = rm.createTexture("jthree.alt.texture2D." + this.ID, 1, 1);
        tex.updateTexture(new Uint8Array([255, 0, 255, 255])); // Use purple color as the color of default buffer texture.
        return tex;
    }
    __initializeAlternativeCubeTexture() {
        const rm = JThreeContext.getContextComponent(ContextComponents.ResourceManager);
        let tex = rm.createCubeTextureWithSource("jthree.alt.textureCube." + this.ID, null);
        return tex;
    }
}
export default BasicRenderer;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvcmUvUmVuZGVyZXJzL0Jhc2ljUmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ik9BQU8sU0FBUyxNQUFNLGFBQWE7T0FLNUIsa0JBQWtCLE1BQU0sc0JBQXNCO09BQzlDLFNBQVMsTUFBTSxzQkFBc0I7T0FFckMsb0JBQW9CLE1BQU0sa0RBQWtEO09BQzVFLGFBQWEsTUFBTSxxQkFBcUI7T0FDeEMsaUJBQWlCLE1BQU0seUJBQXlCO09BR2hELFVBQVUsTUFBTSxjQUFjO09BRTlCLFlBQVksTUFBTSx3QkFBd0I7QUFDakQ7O0VBRUU7QUFDRiw0QkFBNEIsWUFBWTtJQXdDdEM7Ozs7O09BS0c7SUFDSCxZQUFZLE1BQWMsRUFBRSxZQUF1QixFQUFFLFlBQXVDO1FBQzFGLE1BQU0sTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBN0J2QixlQUFVLEdBQWUsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFjN0MsY0FBUyxHQUFjLElBQUksU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBZ0IzRCxZQUFZLEdBQUcsWUFBWSxJQUFJLElBQUksb0JBQW9CLEVBQUUsQ0FBQztRQUMxRCxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN0QixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQztRQUM5QixNQUFNLEVBQUUsR0FBRyxhQUFhLENBQUMsbUJBQW1CLENBQWtCLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2pHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLGNBQWMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJ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QUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEYsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNiLENBQUM7QUFFSCxDQUFDO0FBR0QsZUFBZSxhQUFhLENBQUMiLCJmaWxlIjoiQ29yZS9SZW5kZXJlcnMvQmFzaWNSZW5kZXJlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCdWZmZXJTZXQgZnJvbSBcIi4vQnVmZmVyU2V0XCI7XG5pbXBvcnQgQ3ViZVRleHR1cmUgZnJvbSBcIi4uL1Jlc291cmNlcy9UZXh0dXJlL0N1YmVUZXh0dXJlXCI7XG5pbXBvcnQgQnVmZmVyVGV4dHVyZSBmcm9tIFwiLi4vUmVzb3VyY2VzL1RleHR1cmUvQnVmZmVyVGV4dHVyZVwiO1xuaW1wb3J0IFRleHR1cmVCYXNlIGZyb20gXCIuLi9SZXNvdXJjZXMvVGV4dHVyZS9UZXh0dXJlQmFzZVwiO1xuaW1wb3J0IENhbWVyYSBmcm9tIFwiLi8uLi9TY2VuZU9iamVjdHMvQ2FtZXJhL0NhbWVyYVwiO1xuaW1wb3J0IFJlbmRlclBhdGhFeGVjdXRvciBmcm9tIFwiLi9SZW5kZXJQYXRoRXhlY3V0b3JcIjtcbmltcG9ydCBSZWN0YW5nbGUgZnJvbSBcIi4uLy4uL01hdGgvUmVjdGFuZ2xlXCI7XG5pbXBvcnQgUmVuZGVyZXJDb25maWd1cmF0b3JCYXNlIGZyb20gXCIuL1JlbmRlcmVyQ29uZmlndXJhdG9yL1JlbmRlcmVyQ29uZmlndXJhdG9yQmFzZVwiO1xuaW1wb3J0IFJlbmRlcmVyQ29uZmlndXJhdG9yIGZyb20gXCIuL1JlbmRlcmVyQ29uZmlndXJhdG9yL0Jhc2ljUmVuZGVyZXJDb25maWd1cmF0b3JcIjtcbmltcG9ydCBKVGhyZWVDb250ZXh0IGZyb20gXCIuLi8uLi9KVGhyZWVDb250ZXh0XCI7XG5pbXBvcnQgQ29udGV4dENvbXBvbmVudHMgZnJvbSBcIi4uLy4uL0NvbnRleHRDb21wb25lbnRzXCI7XG5pbXBvcnQgUmVzb3VyY2VNYW5hZ2VyIGZyb20gXCIuLi9SZXNvdXJjZU1hbmFnZXJcIjtcbmltcG9ydCBTY2VuZSBmcm9tIFwiLi4vU2NlbmVcIjtcbmltcG9ydCBSZW5kZXJQYXRoIGZyb20gXCIuL1JlbmRlclBhdGhcIjtcbmltcG9ydCBDYW52YXMgZnJvbSBcIi4uL0NhbnZhcy9DYW52YXNcIjtcbmltcG9ydCBDYW52YXNSZWdpb24gZnJvbSBcIi4uL0NhbnZhcy9DYW52YXNSZWdpb25cIjtcbi8qKlxuKiBQcm92aWRlcyBiYXNlIGNsYXNzIGZlYXR1cmUgZm9yIHJlbmRlcmVyIGNsYXNzZXMuXG4qL1xuY2xhc3MgQmFzaWNSZW5kZXJlciBleHRlbmRzIENhbnZhc1JlZ2lvbiB7XG5cbiAgLyoqXG4gICAqIFRoZSB0ZXh0dXJlIHdoaWNoIHdpbGwgYmUgdXNlZCBmb3IgdW5hc3NpZ25lZCB0ZXh0dXJlIHNhbXBsZXIyRCB2YXJpYWJsZSBpbiBHTFNMLlxuICAgKiBUaGlzIHZhcmlhYmxlIGlzIG5vdCBpbnRlbmRlZCB0byBiZSBhc3NpZ25lZCBieSB1c2VyIG1hbnVhbGx5LlxuICAgKiBJZiB5b3Ugd2FudCB0byBjaGFuZ2UgdGhpcyBhbHRlcm5hdGl2ZSB0ZXh0dXJlLCB5b3UgbmVlZCB0byBleHRlbmQgdGhpcyBjbGFzcyBhbmQgb3ZlcnJyaWRlIF9faW5pdGlhbGl6ZUFsdGVybmF0aXZlVGV4dHVyZSBtZXRob2QuXG4gICAqIEB0eXBlIHtUZXh0dXJlQmFzZX1cbiAgICovXG4gIHB1YmxpYyBhbHRlcm5hdGl2ZVRleHR1cmU6IFRleHR1cmVCYXNlO1xuXG4gIC8qKlxuICAgKiBUaGUgY3ViZVRleHR1cmUgd2hpY2ggd2lsbCBiZSB1c2VkIGZvciB1bmFzc2lnbmVkIHRleHR1cmUgc2FtcGxlckN1YmUgdmFyaWFibGUgaW4gR0xTTC5cbiAgICogVGhpcyB2YXJpYWJsZSBpcyBub3QgaW50ZW5kZWQgdG8gYmUgYXNzaWduZWQgYnkgdXNlciBtYW51YWxseS5cbiAgICogSWYgeW91IHdhbnQgdG8gY2hhbmdlIHRoaXMgYWx0ZXJuYXRpdmUgdGV4dHVyZSwgeW9vdSBuZWVkIHRvIGV4dGVuZCB0aGlzIGNsYXNzIGFuZCBvdmVycmlkZSBfX2luaXRpYWxpemVBbHRlcm5hdGl2ZUN1YmVUZXh0dXJlIG1ldGhvZC5cbiAgICogQHR5cGUge0N1YmVUZXh0dXJlfVxuICAgKi9cbiAgcHVibGljIGFsdGVybmF0aXZlQ3ViZVRleHR1cmU6IEN1YmVUZXh0dXJlO1xuXG4gIHB1YmxpYyByZW5kZXJQYXRoOiBSZW5kZXJQYXRoID0gbmV3IFJlbmRlclBhdGgodGhpcyk7XG5cbiAgcHVibGljIGJ1ZmZlclNldDogQnVmZmVyU2V0O1xuXG4gIC8qKlxuICAgKiBUaGUgY2FtZXJhIHJlZmVyZW5jZSB0aGlzIHJlbmRlcmVyIHVzaW5nIGZvciBkcmF3LlxuICAgKi9cbiAgcHJpdmF0ZSBfY2FtZXJhOiBDYW1lcmE7XG5cbiAgLyoqXG4gICAqIENhbnZhcyBtYW5hZ2luZyB0aGlzIHJlbmRlcmVyLlxuICAgKi9cbiAgcHJpdmF0ZSBfY2FudmFzOiBDYW52YXM7XG5cbiAgcHJpdmF0ZSBfdmlld3BvcnQ6IFJlY3RhbmdsZSA9IG5ldyBSZWN0YW5nbGUoMCwgMCwgMjU2LCAyNTYpO1xuXG4gIC8qKlxuICAqIFByb3ZpZGVzIHJlbmRlciBzdGFnZSBhYnN0cmFjdGlvblxuICAqL1xuICBwcml2YXRlIF9yZW5kZXJQYXRoRXhlY3V0b3I6IFJlbmRlclBhdGhFeGVjdXRvcjtcblxuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvciBvZiBSZW5kZXJCYXNlXG4gICAqIEBwYXJhbSBjYW52YXNcbiAgICogQHBhcmFtIHZpZXdwb3J0QXJlYVxuICAgKiBAcmV0dXJucyB7fVxuICAgKi9cbiAgY29uc3RydWN0b3IoY2FudmFzOiBDYW52YXMsIHZpZXdwb3J0QXJlYTogUmVjdGFuZ2xlLCBjb25maWd1cmF0b3I/OiBSZW5kZXJlckNvbmZpZ3VyYXRvckJhc2UpIHtcbiAgICBzdXBlcihjYW52YXMuY2FudmFzRWxlbWVudCk7XG4gICAgY29uZmlndXJhdG9yID0gY29uZmlndXJhdG9yIHx8IG5ldyBSZW5kZXJlckNvbmZpZ3VyYXRvcigpO1xuICAgIHRoaXMuX2NhbnZhcyA9IGNhbnZhcztcbiAgICB0aGlzLl9yZW5kZXJQYXRoRXhlY3V0b3IgPSBuZXcgUmVuZGVyUGF0aEV4ZWN1dG9yKHRoaXMpO1xuICAgIHRoaXMuX3ZpZXdwb3J0ID0gdmlld3BvcnRBcmVhO1xuICAgIGNvbnN0IHJtID0gSlRocmVlQ29udGV4dC5nZXRDb250ZXh0Q29tcG9uZW50PFJlc291cmNlTWFuYWdlcj4oQ29udGV4dENvbXBvbmVudHMuUmVzb3VyY2VNYW5hZ2VyKTtcbiAgICBpZiAodGhpcy5fdmlld3BvcnQpIHsgcm0uY3JlYXRlUkJPKHRoaXMuSUQgKyBcIi5yYm8uZGVmYXVsdFwiLCB0aGlzLl92aWV3cG9ydC5XaWR0aCwgdGhpcy5fdmlld3BvcnQuSGVpZ2h0KTsgfVxuICAgIHRoaXMucmVuZGVyUGF0aC5mcm9tUGF0aFRlbXBsYXRlKGNvbmZpZ3VyYXRvci5nZXRTdGFnZUNoYWluKHRoaXMpKTtcbiAgICB0aGlzLmJ1ZmZlclNldCA9IG5ldyBCdWZmZXJTZXQodGhpcyk7XG4gICAgdGhpcy5idWZmZXJTZXQuYXBwZW5kQnVmZmVycyhjb25maWd1cmF0b3IuVGV4dHVyZUJ1ZmZlcnMpO1xuICAgIHRoaXMubmFtZSA9IHRoaXMuSUQ7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSByZW5kZXJlciB0byBiZSByZW5kZXJlcmQuXG4gICAqIEJhc2ljYWxseSwgdGhpcyBtZXRob2QgYXJlIHVzZWQgZm9yIGluaXRpYWxpemluZyBHTCByZXNvdXJjZXMsIHRoZSBvdGhlciB2YXJpYWJsZSBhbmQgYW55IHJlc291cmNlcyB3aWxsIGJlIGluaXRpYWxpemVkIHdoZW4gY29uc3RydWN0b3Igd2FzIGNhbGxlZC5cbiAgICogVGhpcyBtZXRob2QgaXMgbm90IGludGVuZGVkIHRvIGJlIGNhbGxlZCBieSB1c2VyIG1hbnVhbGx5LlxuICAgKi9cbiAgcHVibGljIGluaXRpYWxpemUoKTogdm9pZCB7XG4gICAgdGhpcy5hbHRlcm5hdGl2ZVRleHR1cmUgPSB0aGlzLl9faW5pdGlhbGl6ZUFsdGVybmF0aXZlVGV4dHVyZSgpO1xuICAgIHRoaXMuYWx0ZXJuYXRpdmVDdWJlVGV4dHVyZSA9IHRoaXMuX19pbml0aWFsaXplQWx0ZXJuYXRpdmVDdWJlVGV4dHVyZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBjYW1lcmEgcmVmZXJlbmNlIHRoaXMgcmVuZGVyZXIgdXNpbmcgZm9yIGRyYXcuXG4gICAqL1xuICBwdWJsaWMgZ2V0IENhbWVyYSgpOiBDYW1lcmEge1xuICAgIHJldHVybiB0aGlzLl9jYW1lcmE7XG4gIH1cbiAgLyoqXG4gICAqIFRoZSBjYW1lcmEgcmVmZXJlbmNlIHRoaXMgcmVuZGVyZXIgdXNpbmcgZm9yIGRyYXcuXG4gICAqL1xuICBwdWJsaWMgc2V0IENhbWVyYShjYW1lcmE6IENhbWVyYSkge1xuICAgIHRoaXMuX2NhbWVyYSA9IGNhbWVyYTtcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIoc2NlbmU6IFNjZW5lKTogdm9pZCB7XG4gICAgdGhpcy5fcmVuZGVyUGF0aEV4ZWN1dG9yLnByb2Nlc3NSZW5kZXIoc2NlbmUsIHRoaXMucmVuZGVyUGF0aCk7XG4gIH1cblxuICAvKipcbiAgICogQ2FudmFzIG1hbmFnaW5nIHRoaXMgcmVuZGVyZXIuXG4gICAqL1xuICBwdWJsaWMgZ2V0IENhbnZhcygpOiBDYW52YXMge1xuICAgIHJldHVybiB0aGlzLl9jYW52YXM7XG4gIH1cblxuICBwdWJsaWMgZ2V0IEdMKCk6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCB7XG4gICAgcmV0dXJuIHRoaXMuX2NhbnZhcy5nbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdCB3aWxsIGJlIGNhbGxlZCBiZWZvcmUgcHJvY2Vzc2luZyByZW5kZXJlci5cbiAgICogSWYgeW91IG5lZWQgdG8gb3ZlcnJpZGUgdGhpcyBtZXRob2QsIHlvdSBuZWVkIHRvIGNhbGwgc2FtZSBtZXRob2Qgb2Ygc3VwZXIgY2xhc3MgZmlyc3QuXG4gICAqL1xuICBwdWJsaWMgYmVmb3JlUmVuZGVyKCk6IHZvaWQge1xuICAgIHRoaXMuYXBwbHlEZWZhdWx0QnVmZmVyVmlld3BvcnQoKTtcbiAgICB0aGlzLkNhbnZhcy5iZWZvcmVSZW5kZXIodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogSXQgd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgcHJvY2Vzc2luZyByZW5kZXJlci5cbiAgICogSWYgeW91IG5lZWQgdG8gb3ZlcnJpZGUgdGhpcyBtZXRob2QsIHlvdSBuZWVkIHRvIGNhbGwgc2FtZSBtZXRob2Qgb2Ygc3VwZXIgY2xhc3MgZmlyc3QuXG4gICAqL1xuICBwdWJsaWMgYWZ0ZXJSZW5kZXIoKTogdm9pZCB7XG4gICAgdGhpcy5HTC5mbHVzaCgpO1xuICAgIHRoaXMuQ2FudmFzLmFmdGVyUmVuZGVyKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb3ZpZGVzIHJlbmRlciBzdGFnZSBhYnN0cmFjdGlvblxuICAgKi9cbiAgcHVibGljIGdldCBSZW5kZXJQYXRoRXhlY3V0b3IoKTogUmVuZGVyUGF0aEV4ZWN1dG9yIHtcbiAgICByZXR1cm4gdGhpcy5fcmVuZGVyUGF0aEV4ZWN1dG9yO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHRlciBmb3Igdmlld3BvcnQgYXJlYS4gVmlld3BvcnQgYXJlYSBpcyB0aGUgYXJlYSB0byByZW5kZXIuXG4gICAqIEByZXR1cm5zIHtSZWN0YW5nbGV9IHRoZSByZWN0YW5nbGUgcmVnaW9uIHRvIHJlbmRlci5cbiAgICovXG4gIHB1YmxpYyBnZXQgcmVnaW9uKCk6IFJlY3RhbmdsZSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZpZXdwb3J0O1xuICB9XG4gIC8qKlxuICAgKiBTZXR0ZXIgZm9yIHZpZXdwb3J0IGFyZWEuIHZpZXdwb3J0IGFyZWEgaXMgdGhlIGFyZWEgdG8gcmVuZGVyLlxuICAgKiBAcGFyYW0gYXJlYSB7UmVjdGFuZ2xlfSB0aGUgcmVjdGFuZ2xlIHRvIHJlbmRlci5cbiAgICovXG4gIHB1YmxpYyBzZXQgcmVnaW9uKGFyZWE6IFJlY3RhbmdsZSkge1xuICAgIGlmICghUmVjdGFuZ2xlLmVxdWFscyhhcmVhLCB0aGlzLl92aWV3cG9ydCkgJiYgKHR5cGVvZiBhcmVhLldpZHRoICE9PSBcInVuZGVmaW5lZFwiKSAmJiAodHlwZW9mIGFyZWEuSGVpZ2h0ICE9PSBcInVuZGVmaW5lZFwiKSkgeyAvLyBDaGVjayBzcGVjaWZpZWQgYXJlYSBpcyB2YWxpZCBhbmQgbW9kaWZpZWRcbiAgICAgIGlmIChpc05hTihhcmVhLkhlaWdodCArIGFyZWEuV2lkdGgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3ZpZXdwb3J0ID0gYXJlYTtcbiAgICAgIEpUaHJlZUNvbnRleHQuZ2V0Q29udGV4dENvbXBvbmVudDxSZXNvdXJjZU1hbmFnZXI+KENvbnRleHRDb21wb25lbnRzLlJlc291cmNlTWFuYWdlcikuZ2V0UkJPKHRoaXMuSUQgKyBcIi5yYm8uZGVmYXVsdFwiKS5yZXNpemUoYXJlYS5XaWR0aCwgYXJlYS5IZWlnaHQpO1xuICAgICAgdGhpcy5lbWl0KFwicmVzaXplXCIsIGFyZWEpOyAvLyBUaGlzIHNob3VsZCBiZSBtb3ZlZCBpbiBjYW52YXMgcmVnaW9uXG4gICAgfVxuXG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdmlld3BvcnQgY29uZmlndXJhdGlvblxuICAgKi9cbiAgcHVibGljIGFwcGx5RGVmYXVsdEJ1ZmZlclZpZXdwb3J0KCk6IHZvaWQge1xuICAgIHRoaXMuR0wudmlld3BvcnQodGhpcy5fdmlld3BvcnQuTGVmdCwgdGhpcy5fY2FudmFzLnJlZ2lvbi5IZWlnaHQgLSB0aGlzLl92aWV3cG9ydC5Cb3R0b20sIHRoaXMuX3ZpZXdwb3J0LldpZHRoLCB0aGlzLl92aWV3cG9ydC5IZWlnaHQpO1xuICB9XG5cbiAgcHVibGljIGFwcGx5UmVuZGVyZXJCdWZmZXJWaWV3cG9ydCgpOiB2b2lkIHtcbiAgICB0aGlzLkdMLnZpZXdwb3J0KDAsIDAsIHRoaXMuX3ZpZXdwb3J0LldpZHRoLCB0aGlzLl92aWV3cG9ydC5IZWlnaHQpO1xuICB9XG5cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSBhbmQgb2J0YWluIHRoZSBidWZmZXIgdGV4dHVyZSB3aGljaCB3aWxsIGJlIHVzZWQgd2hlbiBhbnkgdGV4dHVyZSBzYW1wbGVyMkQgdmFyaWFibGUgaW4gR0xTTCB3YXMgbm90IGFzc2lnbmVkLlxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIGJlIGNhbGxlZCB3aGVuIFJlbmRlcmVyRmFjdG9yeSBjYWxsZWQgaW5pdGlhbGl6ZSBtZXRob2QgdG8gY29uc3RydWN0IGluc3RhbmNlLlxuICAgKiBCYXNpY2FsbHksdGhpcyBtZXRob2QgaXMgbm90IGludGVuZGVkIHRvIGJlIGNhbGxlZCBmcm9tIHVzZXIuXG4gICAqIEByZXR1cm4ge1RleHR1cmVCYXNlfSBDb25zdHJ1Y3RlZCB0ZXh0dXJlIGJ1ZmZlci5cbiAgICovXG4gIHByb3RlY3RlZCBfX2luaXRpYWxpemVBbHRlcm5hdGl2ZVRleHR1cmUoKTogVGV4dHVyZUJhc2Uge1xuICAgIGNvbnN0IHJtID0gSlRocmVlQ29udGV4dC5nZXRDb250ZXh0Q29tcG9uZW50PFJlc291cmNlTWFuYWdlcj4oQ29udGV4dENvbXBvbmVudHMuUmVzb3VyY2VNYW5hZ2VyKTtcbiAgICBsZXQgdGV4ID0gPEJ1ZmZlclRleHR1cmU+cm0uY3JlYXRlVGV4dHVyZShcImp0aHJlZS5hbHQudGV4dHVyZTJELlwiICsgdGhpcy5JRCwgMSwgMSk7XG4gICAgdGV4LnVwZGF0ZVRleHR1cmUobmV3IFVpbnQ4QXJyYXkoWzI1NSwgMCwgMjU1LCAyNTVdKSk7IC8vIFVzZSBwdXJwbGUgY29sb3IgYXMgdGhlIGNvbG9yIG9mIGRlZmF1bHQgYnVmZmVyIHRleHR1cmUuXG4gICAgcmV0dXJuIHRleDtcbiAgfVxuXG4gIHByb3RlY3RlZCBfX2luaXRpYWxpemVBbHRlcm5hdGl2ZUN1YmVUZXh0dXJlKCk6IEN1YmVUZXh0dXJlIHtcbiAgICBjb25zdCBybSA9IEpUaHJlZUNvbnRleHQuZ2V0Q29udGV4dENvbXBvbmVudDxSZXNvdXJjZU1hbmFnZXI+KENvbnRleHRDb21wb25lbnRzLlJlc291cmNlTWFuYWdlcik7XG4gICAgbGV0IHRleCA9IHJtLmNyZWF0ZUN1YmVUZXh0dXJlV2l0aFNvdXJjZShcImp0aHJlZS5hbHQudGV4dHVyZUN1YmUuXCIgKyB0aGlzLklELCBudWxsKTtcbiAgICByZXR1cm4gdGV4O1xuICB9XG5cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBCYXNpY1JlbmRlcmVyO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
