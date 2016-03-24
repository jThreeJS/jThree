import ContextSafeResourceContainer from "../ContextSafeResourceContainer";
import JThreeEvent from "../../../Base/JThreeEvent";
/**
 *
 */
class TextureBase extends ContextSafeResourceContainer {
    constructor(textureName, flipY, isCubeTexture) {
        super();
        this.__textureFormat = WebGLRenderingContext.RGBA;
        this.__elementFormat = WebGLRenderingContext.UNSIGNED_BYTE;
        this._targetTextureType = WebGLRenderingContext.TEXTURE_2D;
        this._onFilterParameterChangedHandler = new JThreeEvent();
        this._minFilter = WebGLRenderingContext.NEAREST;
        this._magFilter = WebGLRenderingContext.NEAREST;
        this._tWrap = WebGLRenderingContext.CLAMP_TO_EDGE;
        this._sWrap = WebGLRenderingContext.CLAMP_TO_EDGE;
        this._flipY = false;
        if (typeof flipY === "undefined") {
            flipY = false;
        }
        if (typeof isCubeTexture === "undefined") {
            isCubeTexture = false;
        }
        this._flipY = flipY;
        this._targetTextureType = isCubeTexture ? WebGLRenderingContext.TEXTURE_CUBE_MAP : WebGLRenderingContext.TEXTURE_2D;
        this.__initializeForFirst();
    }
    get TargetTextureType() {
        return this._targetTextureType;
    }
    get TextureFormat() {
        return this.__textureFormat;
    }
    get ElementFormat() {
        return this.__elementFormat;
    }
    get FlipY() {
        return this._flipY;
    }
    set FlipY(val) {
        this._flipY = val;
    }
    get MinFilter() {
        return this._minFilter;
    }
    set MinFilter(value) {
        if (value === this._minFilter) {
            return;
        }
        this._minFilter = value;
        this._onFilterParameterChangedHandler.fire(this, WebGLRenderingContext.TEXTURE_MIN_FILTER);
    }
    get MagFilter() {
        return this._magFilter;
    }
    set MagFilter(value) {
        if (value === this._magFilter) {
            return;
        }
        this._magFilter = value;
        this._onFilterParameterChangedHandler.fire(this, WebGLRenderingContext.TEXTURE_MAG_FILTER);
    }
    get SWrap() {
        return this._sWrap;
    }
    set SWrap(value) {
        if (this._sWrap === value) {
            return;
        }
        this._sWrap = value;
        this._onFilterParameterChangedHandler.fire(this, WebGLRenderingContext.TEXTURE_WRAP_S);
    }
    get TWrap() {
        return this._tWrap;
    }
    set TWrap(value) {
        if (this._tWrap === value) {
            return;
        }
        this._tWrap = value;
        this._onFilterParameterChangedHandler.fire(this, WebGLRenderingContext.TEXTURE_WRAP_T);
    }
    onFilterParameterChanged(handler) {
        this._onFilterParameterChangedHandler.addListener(handler);
    }
    generateMipmapIfNeed() {
        switch (this.MinFilter) {
            case WebGLRenderingContext.LINEAR_MIPMAP_LINEAR:
            case WebGLRenderingContext.LINEAR_MIPMAP_NEAREST:
            case WebGLRenderingContext.NEAREST_MIPMAP_LINEAR:
            case WebGLRenderingContext.NEAREST_MIPMAP_NEAREST:
                this.each((v) => {
                    v.bind();
                    v.GL.generateMipmap(this.TargetTextureType);
                });
                break;
            default:
        }
    }
    get TextureName() {
        return this._textureName;
    }
}
export default TextureBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvcmUvUmVzb3VyY2VzL1RleHR1cmUvVGV4dHVyZUJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ik9BQU8sNEJBQTRCLE1BQU0saUNBQWlDO09BRW5FLFdBQVcsTUFBTSwyQkFBMkI7QUFFbkQ7O0dBRUc7QUFDSCwwQkFBMEIsNEJBQTRCO0lBZXBELFlBQVksV0FBbUIsRUFBRSxLQUFlLEVBQUUsYUFBdUI7UUFDdkUsT0FBTyxDQUFDO1FBZEEsb0JBQWUsR0FBVyxxQkFBcUIsQ0FBQyxJQUFJLENBQUM7UUFDckQsb0JBQWUsR0FBVyxxQkFBcUIsQ0FBQyxhQUFhLENBQUM7UUFDaEUsdUJBQWtCLEdBQVcscUJBQXFCLENBQUMsVUFBVSxDQUFDO1FBQzlELHFDQUFnQyxHQUF3QixJQUFJLFdBQVcsRUFBVSxDQUFDO1FBQ2xGLGVBQVUsR0FBVyxxQkFBcUIsQ0FBQyxPQUFPLENBQUM7UUFDbkQsZUFBVSxHQUFXLHFCQUFxQixDQUFDLE9BQU8sQ0FBQztRQUNuRCxXQUFNLEdBQVcscUJBQXFCLENBQUMsYUFBYSxDQUFDO1FBQ3JELFdBQU0sR0FBVyxxQkFBcUIsQ0FBQyxhQUFhLENBQUM7UUFDckQsV0FBTSxHQUFZLEtBQUssQ0FBQztRQU85QixFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDaEIsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sYUFBYSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDekMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUN4QixDQUFDO1FBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGFBQWEsR0FBRyxxQkFBcUIsQ0FBQyxnQkFBZ0IsR0FBRyxxQkFBcUIsQ0FBQyxVQUFVLENBQUM7UUFDcEgsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7SUFDOUIsQ0FB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QUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDVixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ1QsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0JBQzlDLENBQUMsQ0FBQyxDQUFDO2dCQUNILEtBQUssQ0FBQztZQUNSLFFBQVE7UUFDVixDQUFDO0lBQ0gsQ0FBQztJQUVELElBQVcsV0FBVztRQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0FBQ0gsQ0FBQztBQUVELGVBQWUsV0FBVyxDQUFDIiwiZmlsZSI6IkNvcmUvUmVzb3VyY2VzL1RleHR1cmUvVGV4dHVyZUJhc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29udGV4dFNhZmVSZXNvdXJjZUNvbnRhaW5lciBmcm9tIFwiLi4vQ29udGV4dFNhZmVSZXNvdXJjZUNvbnRhaW5lclwiO1xuaW1wb3J0IFRleHR1cmVXcmFwcGVyQmFzZSBmcm9tIFwiLi9UZXh0dXJlV3JhcHBlckJhc2VcIjtcbmltcG9ydCBKVGhyZWVFdmVudCBmcm9tIFwiLi4vLi4vLi4vQmFzZS9KVGhyZWVFdmVudFwiO1xuaW1wb3J0IHtBY3Rpb24yfSBmcm9tIFwiLi4vLi4vLi4vQmFzZS9EZWxlZ2F0ZXNcIjtcbi8qKlxuICpcbiAqL1xuY2xhc3MgVGV4dHVyZUJhc2UgZXh0ZW5kcyBDb250ZXh0U2FmZVJlc291cmNlQ29udGFpbmVyPFRleHR1cmVXcmFwcGVyQmFzZT4ge1xuXG4gIHByb3RlY3RlZCBfX3RleHR1cmVGb3JtYXQ6IG51bWJlciA9IFdlYkdMUmVuZGVyaW5nQ29udGV4dC5SR0JBO1xuICBwcm90ZWN0ZWQgX19lbGVtZW50Rm9ybWF0OiBudW1iZXIgPSBXZWJHTFJlbmRlcmluZ0NvbnRleHQuVU5TSUdORURfQllURTtcbiAgcHJpdmF0ZSBfdGFyZ2V0VGV4dHVyZVR5cGU6IG51bWJlciA9IFdlYkdMUmVuZGVyaW5nQ29udGV4dC5URVhUVVJFXzJEO1xuICBwcml2YXRlIF9vbkZpbHRlclBhcmFtZXRlckNoYW5nZWRIYW5kbGVyOiBKVGhyZWVFdmVudDxudW1iZXI+ID0gbmV3IEpUaHJlZUV2ZW50PG51bWJlcj4oKTtcbiAgcHJpdmF0ZSBfbWluRmlsdGVyOiBudW1iZXIgPSBXZWJHTFJlbmRlcmluZ0NvbnRleHQuTkVBUkVTVDtcbiAgcHJpdmF0ZSBfbWFnRmlsdGVyOiBudW1iZXIgPSBXZWJHTFJlbmRlcmluZ0NvbnRleHQuTkVBUkVTVDtcbiAgcHJpdmF0ZSBfdFdyYXA6IG51bWJlciA9IFdlYkdMUmVuZGVyaW5nQ29udGV4dC5DTEFNUF9UT19FREdFO1xuICBwcml2YXRlIF9zV3JhcDogbnVtYmVyID0gV2ViR0xSZW5kZXJpbmdDb250ZXh0LkNMQU1QX1RPX0VER0U7XG4gIHByaXZhdGUgX2ZsaXBZOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgX3RleHR1cmVOYW1lOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IodGV4dHVyZU5hbWU6IHN0cmluZyk7XG4gIGNvbnN0cnVjdG9yKHRleHR1cmVOYW1lOiBzdHJpbmcsIGZsaXBZOiBib29sZWFuLCBpc0N1YmVUZXh0dXJlOiBib29sZWFuKTtcbiAgY29uc3RydWN0b3IodGV4dHVyZU5hbWU6IHN0cmluZywgZmxpcFk/OiBib29sZWFuLCBpc0N1YmVUZXh0dXJlPzogYm9vbGVhbikge1xuICAgIHN1cGVyKCk7XG4gICAgaWYgKHR5cGVvZiBmbGlwWSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgZmxpcFkgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBpc0N1YmVUZXh0dXJlID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBpc0N1YmVUZXh0dXJlID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuX2ZsaXBZID0gZmxpcFk7XG4gICAgdGhpcy5fdGFyZ2V0VGV4dHVyZVR5cGUgPSBpc0N1YmVUZXh0dXJlID8gV2ViR0xSZW5kZXJpbmdDb250ZXh0LlRFWFRVUkVfQ1VCRV9NQVAgOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQuVEVYVFVSRV8yRDtcbiAgICB0aGlzLl9faW5pdGlhbGl6ZUZvckZpcnN0KCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IFRhcmdldFRleHR1cmVUeXBlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3RhcmdldFRleHR1cmVUeXBlO1xuICB9XG5cbiAgcHVibGljIGdldCBUZXh0dXJlRm9ybWF0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX190ZXh0dXJlRm9ybWF0O1xuICB9XG5cbiAgcHVibGljIGdldCBFbGVtZW50Rm9ybWF0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX19lbGVtZW50Rm9ybWF0O1xuICB9XG5cbiAgcHVibGljIGdldCBGbGlwWSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZmxpcFk7XG4gIH1cblxuICBwdWJsaWMgc2V0IEZsaXBZKHZhbDogYm9vbGVhbikge1xuICAgIHRoaXMuX2ZsaXBZID0gdmFsO1xuICB9XG5cbiAgcHVibGljIGdldCBNaW5GaWx0ZXIoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbWluRmlsdGVyO1xuICB9XG4gIHB1YmxpYyBzZXQgTWluRmlsdGVyKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodmFsdWUgPT09IHRoaXMuX21pbkZpbHRlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9taW5GaWx0ZXIgPSB2YWx1ZTtcbiAgICB0aGlzLl9vbkZpbHRlclBhcmFtZXRlckNoYW5nZWRIYW5kbGVyLmZpcmUodGhpcywgV2ViR0xSZW5kZXJpbmdDb250ZXh0LlRFWFRVUkVfTUlOX0ZJTFRFUik7XG4gIH1cblxuICBwdWJsaWMgZ2V0IE1hZ0ZpbHRlcigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9tYWdGaWx0ZXI7XG4gIH1cbiAgcHVibGljIHNldCBNYWdGaWx0ZXIodmFsdWU6IG51bWJlcikge1xuICAgIGlmICh2YWx1ZSA9PT0gdGhpcy5fbWFnRmlsdGVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX21hZ0ZpbHRlciA9IHZhbHVlO1xuICAgIHRoaXMuX29uRmlsdGVyUGFyYW1ldGVyQ2hhbmdlZEhhbmRsZXIuZmlyZSh0aGlzLCBXZWJHTFJlbmRlcmluZ0NvbnRleHQuVEVYVFVSRV9NQUdfRklMVEVSKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgU1dyYXAoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fc1dyYXA7XG4gIH1cblxuICBwdWJsaWMgc2V0IFNXcmFwKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5fc1dyYXAgPT09IHZhbHVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3NXcmFwID0gdmFsdWU7XG4gICAgdGhpcy5fb25GaWx0ZXJQYXJhbWV0ZXJDaGFuZ2VkSGFuZGxlci5maXJlKHRoaXMsIFdlYkdMUmVuZGVyaW5nQ29udGV4dC5URVhUVVJFX1dSQVBfUyk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IFRXcmFwKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3RXcmFwO1xuICB9XG5cbiAgcHVibGljIHNldCBUV3JhcCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX3RXcmFwID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl90V3JhcCA9IHZhbHVlO1xuICAgIHRoaXMuX29uRmlsdGVyUGFyYW1ldGVyQ2hhbmdlZEhhbmRsZXIuZmlyZSh0aGlzLCBXZWJHTFJlbmRlcmluZ0NvbnRleHQuVEVYVFVSRV9XUkFQX1QpO1xuICB9XG5cbiAgcHVibGljIG9uRmlsdGVyUGFyYW1ldGVyQ2hhbmdlZChoYW5kbGVyOiBBY3Rpb24yPFRleHR1cmVCYXNlLCBudW1iZXI+KTogdm9pZCB7XG4gICAgdGhpcy5fb25GaWx0ZXJQYXJhbWV0ZXJDaGFuZ2VkSGFuZGxlci5hZGRMaXN0ZW5lcihoYW5kbGVyKTtcbiAgfVxuXG4gIHB1YmxpYyBnZW5lcmF0ZU1pcG1hcElmTmVlZCgpOiB2b2lkIHtcbiAgICBzd2l0Y2ggKHRoaXMuTWluRmlsdGVyKSB7XG4gICAgICBjYXNlIFdlYkdMUmVuZGVyaW5nQ29udGV4dC5MSU5FQVJfTUlQTUFQX0xJTkVBUjpcbiAgICAgIGNhc2UgV2ViR0xSZW5kZXJpbmdDb250ZXh0LkxJTkVBUl9NSVBNQVBfTkVBUkVTVDpcbiAgICAgIGNhc2UgV2ViR0xSZW5kZXJpbmdDb250ZXh0Lk5FQVJFU1RfTUlQTUFQX0xJTkVBUjpcbiAgICAgIGNhc2UgV2ViR0xSZW5kZXJpbmdDb250ZXh0Lk5FQVJFU1RfTUlQTUFQX05FQVJFU1Q6XG4gICAgICAgIHRoaXMuZWFjaCgodikgPT4ge1xuICAgICAgICAgIHYuYmluZCgpO1xuICAgICAgICAgIHYuR0wuZ2VuZXJhdGVNaXBtYXAodGhpcy5UYXJnZXRUZXh0dXJlVHlwZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldCBUZXh0dXJlTmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl90ZXh0dXJlTmFtZTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUZXh0dXJlQmFzZTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
