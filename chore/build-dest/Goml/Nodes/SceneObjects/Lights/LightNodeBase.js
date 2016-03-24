import SceneObjectNodeBase from "../SceneObjectNodeBase";
class LightNodeBase extends SceneObjectNodeBase {
    constructor() {
        super();
        this.attributes.defineAttribute({
            "color": {
                value: "white",
                converter: "color3",
                onchanged: this._onColorAttrChanged.bind(this),
            }
        });
        this.on("update-scene-object", (obj) => {
            this._onColorAttrChanged.call(this, this.attributes.getAttribute("color"));
        });
    }
    /**
     * Construct target light object when this method was called.
   * This method should be overridden.
     */
    __constructLight() {
        return null;
    }
    __onMount() {
        super.__onMount();
        this.TargetSceneObject = this.__constructLight();
    }
    _onColorAttrChanged(attr) {
        if (this.TargetSceneObject) {
            this.TargetSceneObject.Color = attr.Value;
            attr.done();
        }
    }
}
export default LightNodeBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdvbWwvTm9kZXMvU2NlbmVPYmplY3RzL0xpZ2h0cy9MaWdodE5vZGVCYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJPQUFPLG1CQUFtQixNQUFNLHdCQUF3QjtBQUl4RCw0QkFBaUQsbUJBQW1CO0lBQ2xFO1FBQ0UsT0FBTyxDQUFDO1FBQ1IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUM7WUFDOUIsT0FBTyxFQUFFO2dCQUNQLEtBQUssRUFBRSxPQUFPO2dCQUNkLFNBQVMsRUFBRSxRQUFRO2dCQUNuQixTQUFTLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDL0M7U0FDRixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsRUFBRSxDQUFDLHFCQUFxQixFQUFFLENBQUMsR0FBYztZQUM1QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzdFLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVGOzs7T0FHRztJQUNRLGdCQUFnQjtRQUN4QixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVTLFNBQVM7UUFDakIsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUNuRCxDQUFDO0lBRU8sbUJBQW1CLENBQUMsSUFBbUI7UUFDN0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztZQUNmLElBQUksQ0FBQyxpQkFBa0IsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUN2RCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDZCxDQUFDO0lBQ0gsQ0FBQztBQUNILENBQUM7QUFFRCxlQUFlLGFBQWEsQ0FBQyIsImZpbGUiOiJHb21sL05vZGVzL1NjZW5lT2JqZWN0cy9MaWdodHMvTGlnaHROb2RlQmFzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTY2VuZU9iamVjdE5vZGVCYXNlIGZyb20gXCIuLi9TY2VuZU9iamVjdE5vZGVCYXNlXCI7XG5pbXBvcnQgTGlnaHRCYXNlIGZyb20gXCIuLi8uLi8uLi8uLi9Db3JlL1NjZW5lT2JqZWN0cy9MaWdodC9MaWdodEJhc2VcIjtcbmltcG9ydCBHb21sQXR0cmlidXRlIGZyb20gXCIuLi8uLi8uLi9Hb21sQXR0cmlidXRlXCI7XG5cbmNsYXNzIExpZ2h0Tm9kZUJhc2U8VCBleHRlbmRzIExpZ2h0QmFzZT4gZXh0ZW5kcyBTY2VuZU9iamVjdE5vZGVCYXNlPFQ+IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmF0dHJpYnV0ZXMuZGVmaW5lQXR0cmlidXRlKHtcbiAgICAgIFwiY29sb3JcIjoge1xuICAgICAgICB2YWx1ZTogXCJ3aGl0ZVwiLFxuICAgICAgICBjb252ZXJ0ZXI6IFwiY29sb3IzXCIsXG4gICAgICAgIG9uY2hhbmdlZDogdGhpcy5fb25Db2xvckF0dHJDaGFuZ2VkLmJpbmQodGhpcyksXG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5vbihcInVwZGF0ZS1zY2VuZS1vYmplY3RcIiwgKG9iajogTGlnaHRCYXNlKSA9PiB7XG4gICAgICB0aGlzLl9vbkNvbG9yQXR0ckNoYW5nZWQuY2FsbCh0aGlzLCB0aGlzLmF0dHJpYnV0ZXMuZ2V0QXR0cmlidXRlKFwiY29sb3JcIikpO1xuICAgIH0pO1xuICB9XG5cblx0LyoqXG5cdCAqIENvbnN0cnVjdCB0YXJnZXQgbGlnaHQgb2JqZWN0IHdoZW4gdGhpcyBtZXRob2Qgd2FzIGNhbGxlZC5cbiAgICogVGhpcyBtZXRob2Qgc2hvdWxkIGJlIG92ZXJyaWRkZW4uXG5cdCAqL1xuICBwcm90ZWN0ZWQgX19jb25zdHJ1Y3RMaWdodCgpOiBUIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHByb3RlY3RlZCBfX29uTW91bnQoKTogdm9pZCB7XG4gICAgc3VwZXIuX19vbk1vdW50KCk7XG4gICAgdGhpcy5UYXJnZXRTY2VuZU9iamVjdCA9IHRoaXMuX19jb25zdHJ1Y3RMaWdodCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfb25Db2xvckF0dHJDaGFuZ2VkKGF0dHI6IEdvbWxBdHRyaWJ1dGUpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5UYXJnZXRTY2VuZU9iamVjdCkge1xuICAgICAgKDxMaWdodEJhc2U+dGhpcy5UYXJnZXRTY2VuZU9iamVjdCkuQ29sb3IgPSBhdHRyLlZhbHVlO1xuICAgICAgYXR0ci5kb25lKCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExpZ2h0Tm9kZUJhc2U7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
