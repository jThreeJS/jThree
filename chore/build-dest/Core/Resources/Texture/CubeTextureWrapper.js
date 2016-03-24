import TextureWrapperBase from "./TextureWrapperBase";
class CubeTextureWrapper extends TextureWrapperBase {
    constructor(canvas, parent) {
        super(canvas, parent);
    }
    init(isChanged) {
        const parent = this.Parent;
        if (this.Initialized && !isChanged) {
            return;
        }
        if (this.TargetTexture == null) {
            this.__setTargetTexture(this.GL.createTexture());
        }
        this.GL.bindTexture(WebGLRenderingContext.TEXTURE_CUBE_MAP, this.TargetTexture);
        if (parent.ImageSource == null) {
            for (let i = 0; i < 6; i++) {
                this.GL.texImage2D(WebGLRenderingContext.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, WebGLRenderingContext.RGBA, 1, 1, 0, WebGLRenderingContext.RGBA, WebGLRenderingContext.UNSIGNED_BYTE, TextureWrapperBase.__altTextureBuffer);
            }
        }
        else {
            this.preTextureUpload();
            for (let i = 0; i < 6; i++) {
                if (parent.ImageSource[i]) {
                    this.GL.texImage2D(WebGLRenderingContext.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, WebGLRenderingContext.RGBA, WebGLRenderingContext.RGBA, WebGLRenderingContext.UNSIGNED_BYTE, parent.ImageSource[i]);
                }
            }
        }
        this.GL.bindTexture(WebGLRenderingContext.TEXTURE_CUBE_MAP, null);
        this.__setInitialized();
    }
}
export default CubeTextureWrapper;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvcmUvUmVzb3VyY2VzL1RleHR1cmUvQ3ViZVRleHR1cmVXcmFwcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJPQUFPLGtCQUFrQixNQUFNLHNCQUFzQjtBQUlyRCxpQ0FBaUMsa0JBQWtCO0lBQ2pELFlBQVksTUFBYyxFQUFFLE1BQW1CO1FBQzdDLE1BQU0sTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFTSxJQUFJLENBQUMsU0FBbUI7UUFDN0IsTUFBTSxNQUFNLEdBQWdCLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDeEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDbkMsTUFBTSxDQUFDO1FBQ1QsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO1FBQ25ELENBQUM7UUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDaEYsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQy9CLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLHFCQUFxQixDQUFDLDJCQUEyQixHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUscUJBQXFCLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLHFCQUFxQixDQUFDLElBQUksRUFBRSxxQkFBcUIsQ0FBQyxhQUFhLEVBQUUsa0JBQWtCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUM1TixDQUFDO1FBQ0gsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDeEIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDM0IsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzFCLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLHFCQUFxQixDQUFDLDJCQUEyQixHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUscUJBQXFCLENBQUMsSUFBSSxFQUFFLHFCQUFxQixDQUFDLElBQUksRUFBRSxxQkFBcUIsQ0FBQyxhQUFhLEVBQWEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM5TSxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUMxQixDQUFDO0FBRUgsQ0FBQztBQUVELGVBQWUsa0JBQWtCLENBQUMiLCJmaWxlIjoiQ29yZS9SZXNvdXJjZXMvVGV4dHVyZS9DdWJlVGV4dHVyZVdyYXBwZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVGV4dHVyZVdyYXBwZXJCYXNlIGZyb20gXCIuL1RleHR1cmVXcmFwcGVyQmFzZVwiO1xuaW1wb3J0IENhbnZhcyBmcm9tIFwiLi4vLi4vQ2FudmFzL0NhbnZhc1wiO1xuaW1wb3J0IEN1YmVUZXh0dXJlIGZyb20gXCIuL0N1YmVUZXh0dXJlXCI7XG5cbmNsYXNzIEN1YmVUZXh0dXJlV3JhcHBlciBleHRlbmRzIFRleHR1cmVXcmFwcGVyQmFzZSB7XG4gIGNvbnN0cnVjdG9yKGNhbnZhczogQ2FudmFzLCBwYXJlbnQ6IEN1YmVUZXh0dXJlKSB7XG4gICAgc3VwZXIoY2FudmFzLCBwYXJlbnQpO1xuICB9XG5cbiAgcHVibGljIGluaXQoaXNDaGFuZ2VkPzogYm9vbGVhbik6IHZvaWQge1xuICAgIGNvbnN0IHBhcmVudCA9IDxDdWJlVGV4dHVyZT50aGlzLlBhcmVudDtcbiAgICBpZiAodGhpcy5Jbml0aWFsaXplZCAmJiAhaXNDaGFuZ2VkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLlRhcmdldFRleHR1cmUgPT0gbnVsbCkge1xuICAgICAgdGhpcy5fX3NldFRhcmdldFRleHR1cmUodGhpcy5HTC5jcmVhdGVUZXh0dXJlKCkpO1xuICAgIH1cbiAgICB0aGlzLkdMLmJpbmRUZXh0dXJlKFdlYkdMUmVuZGVyaW5nQ29udGV4dC5URVhUVVJFX0NVQkVfTUFQLCB0aGlzLlRhcmdldFRleHR1cmUpO1xuICAgIGlmIChwYXJlbnQuSW1hZ2VTb3VyY2UgPT0gbnVsbCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2OyBpKyspIHtcbiAgICAgICAgdGhpcy5HTC50ZXhJbWFnZTJEKFdlYkdMUmVuZGVyaW5nQ29udGV4dC5URVhUVVJFX0NVQkVfTUFQX1BPU0lUSVZFX1ggKyBpLCAwLCBXZWJHTFJlbmRlcmluZ0NvbnRleHQuUkdCQSwgMSwgMSwgMCwgV2ViR0xSZW5kZXJpbmdDb250ZXh0LlJHQkEsIFdlYkdMUmVuZGVyaW5nQ29udGV4dC5VTlNJR05FRF9CWVRFLCBUZXh0dXJlV3JhcHBlckJhc2UuX19hbHRUZXh0dXJlQnVmZmVyKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcmVUZXh0dXJlVXBsb2FkKCk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykge1xuICAgICAgICBpZiAocGFyZW50LkltYWdlU291cmNlW2ldKSB7XG4gICAgICAgICAgdGhpcy5HTC50ZXhJbWFnZTJEKFdlYkdMUmVuZGVyaW5nQ29udGV4dC5URVhUVVJFX0NVQkVfTUFQX1BPU0lUSVZFX1ggKyBpLCAwLCBXZWJHTFJlbmRlcmluZ0NvbnRleHQuUkdCQSwgV2ViR0xSZW5kZXJpbmdDb250ZXh0LlJHQkEsIFdlYkdMUmVuZGVyaW5nQ29udGV4dC5VTlNJR05FRF9CWVRFLCA8SW1hZ2VEYXRhPnBhcmVudC5JbWFnZVNvdXJjZVtpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5HTC5iaW5kVGV4dHVyZShXZWJHTFJlbmRlcmluZ0NvbnRleHQuVEVYVFVSRV9DVUJFX01BUCwgbnVsbCk7XG4gICAgdGhpcy5fX3NldEluaXRpYWxpemVkKCk7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBDdWJlVGV4dHVyZVdyYXBwZXI7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
