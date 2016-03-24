import CoreRelatedNodeBase from "../../CoreRelatedNodeBase";
import GLEnumParser from "../../../Core/Canvas/GL/GLEnumParser";
import JThreeContext from "../../../JThreeContext";
import ContextComponents from "../../../ContextComponents";
/**
 * All texture resource node class inherit this class.
 */
class TextureNodeBase extends CoreRelatedNodeBase {
    constructor() {
        super();
        this.attributes.defineAttribute({
            name: {
                value: undefined,
                converter: "string",
                constant: true,
            },
            minFilter: {
                value: "LINEAR",
                converter: "string",
                onchanged: (attr) => {
                    if (this.target) {
                        this.target.MinFilter = GLEnumParser.parseTextureMinFilter(attr.Value);
                        attr.done();
                    }
                }
            },
            magFilter: {
                value: "LINEAR",
                converter: "string",
                onchanged: (attr) => {
                    if (this.target) {
                        this.target.MagFilter = GLEnumParser.parseTextureMagFilter(attr.Value);
                        attr.done();
                    }
                }
            },
            twrap: {
                value: "CLAMP_TO_EDGE",
                converter: "string",
                onchanged: (attr) => {
                    if (this.target) {
                        this.target.TWrap = GLEnumParser.parseTextureWrapMode(attr.Value);
                        attr.done();
                    }
                }
            },
            swrap: {
                value: "CLAMP_TO_EDGE",
                converter: "string",
                onchanged: (attr) => {
                    if (this.target) {
                        this.target.SWrap = GLEnumParser.parseTextureWrapMode(attr.Value);
                        attr.done();
                    }
                }
            }
        });
        this.on("update-target", (obj) => {
            this._onMinFilterAttrChanged.call(this, this.attributes.getAttribute("minFilter"));
            this._onMagFilterAttrChanged.call(this, this.attributes.getAttribute("magFilter"));
            this._onTWrapAttrChanged.call(this, this.attributes.getAttribute("twrap"));
            this._onSWrapAttrChanged.call(this, this.attributes.getAttribute("swrap"));
        });
    }
    __onMount() {
        super.__onMount();
        const rm = JThreeContext.getContextComponent(ContextComponents.ResourceManager);
        const name = this.attributes.getValue("name");
        this.__constructTexture(name, rm).then((texture) => {
            this.target = texture;
            this.emit("update-target", this.target);
            this.nodeExport(name);
        });
    }
    _onMinFilterAttrChanged(attr) {
        if (this.target) {
            this.target.MinFilter = GLEnumParser.parseTextureMinFilter(attr.Value);
            attr.done();
        }
    }
    _onMagFilterAttrChanged(attr) {
        if (this.target) {
            this.target.MagFilter = GLEnumParser.parseTextureMagFilter(attr.Value);
            attr.done();
        }
    }
    _onTWrapAttrChanged(attr) {
        if (this.target) {
            this.target.TWrap = GLEnumParser.parseTextureWrapMode(attr.Value);
            attr.done();
        }
    }
    _onSWrapAttrChanged(attr) {
        if (this.target) {
            this.target.SWrap = GLEnumParser.parseTextureWrapMode(attr.Value);
            attr.done();
        }
    }
}
export default TextureNodeBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdvbWwvTm9kZXMvVGV4dHVyZS9UZXh0dXJlTm9kZUJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ik9BQU8sbUJBQW1CLE1BQU0sMkJBQTJCO09BQ3BELFlBQVksTUFBTSxzQ0FBc0M7T0FHeEQsYUFBYSxNQUFNLHdCQUF3QjtPQUMzQyxpQkFBaUIsTUFBTSw0QkFBNEI7QUFDMUQ7O0dBRUc7QUFDSCw4QkFBOEQsbUJBQW1CO0lBRS9FO1FBQ0UsT0FBTyxDQUFDO1FBQ1IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUM7WUFDOUIsSUFBSSxFQUFFO2dCQUNKLEtBQUssRUFBRSxTQUFTO2dCQUNoQixTQUFTLEVBQUUsUUFBUTtnQkFDbkIsUUFBUSxFQUFFLElBQUk7YUFDZjtZQUNELFNBQVMsRUFBRTtnQkFDVCxLQUFLLEVBQUUsUUFBUTtnQkFDZixTQUFTLEVBQUUsUUFBUTtnQkFDbkIsU0FBUyxFQUFFLENBQUMsSUFBSTtvQkFDZCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzt3QkFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDdkUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO29CQUNkLENBQUM7Z0JBQ0gsQ0FBQzthQUNGO1lBQ0QsU0FBUyxFQUFFO2dCQUNULEtBQUssRUFBRSxRQUFRO2dCQUNmLFNBQVMsRUFBRSxRQUFRO2dCQUNuQixTQUFTLEVBQUUsQ0FBQyxJQUFJO29CQUNkLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO3dCQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUN2RSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ2QsQ0FBQztnQkFD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QkFBcUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdkUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2QsQ0FBQztJQUNILENBQUM7SUFFTyxtQkFBbUIsQ0FBQyxJQUFJO1FBQzlCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2QsQ0FBQztJQUNILENBQUM7SUFFTyxtQkFBbUIsQ0FBQyxJQUFJO1FBQzlCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2QsQ0FBQztJQUNILENBQUM7QUFDSCxDQUFDO0FBRUQsZUFBZSxlQUFlLENBQUMiLCJmaWxlIjoiR29tbC9Ob2Rlcy9UZXh0dXJlL1RleHR1cmVOb2RlQmFzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb3JlUmVsYXRlZE5vZGVCYXNlIGZyb20gXCIuLi8uLi9Db3JlUmVsYXRlZE5vZGVCYXNlXCI7XG5pbXBvcnQgR0xFbnVtUGFyc2VyIGZyb20gXCIuLi8uLi8uLi9Db3JlL0NhbnZhcy9HTC9HTEVudW1QYXJzZXJcIjtcbmltcG9ydCBUZXh0dXJlQmFzZSBmcm9tIFwiLi4vLi4vLi4vQ29yZS9SZXNvdXJjZXMvVGV4dHVyZS9UZXh0dXJlQmFzZVwiO1xuaW1wb3J0IFJlc291cmNlTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vQ29yZS9SZXNvdXJjZU1hbmFnZXJcIjtcbmltcG9ydCBKVGhyZWVDb250ZXh0IGZyb20gXCIuLi8uLi8uLi9KVGhyZWVDb250ZXh0XCI7XG5pbXBvcnQgQ29udGV4dENvbXBvbmVudHMgZnJvbSBcIi4uLy4uLy4uL0NvbnRleHRDb21wb25lbnRzXCI7XG4vKipcbiAqIEFsbCB0ZXh0dXJlIHJlc291cmNlIG5vZGUgY2xhc3MgaW5oZXJpdCB0aGlzIGNsYXNzLlxuICovXG5hYnN0cmFjdCBjbGFzcyBUZXh0dXJlTm9kZUJhc2U8VCBleHRlbmRzIFRleHR1cmVCYXNlPiBleHRlbmRzIENvcmVSZWxhdGVkTm9kZUJhc2U8VD4ge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5hdHRyaWJ1dGVzLmRlZmluZUF0dHJpYnV0ZSh7XG4gICAgICBuYW1lOiB7XG4gICAgICAgIHZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgIGNvbnZlcnRlcjogXCJzdHJpbmdcIixcbiAgICAgICAgY29uc3RhbnQ6IHRydWUsXG4gICAgICB9LFxuICAgICAgbWluRmlsdGVyOiB7XG4gICAgICAgIHZhbHVlOiBcIkxJTkVBUlwiLFxuICAgICAgICBjb252ZXJ0ZXI6IFwic3RyaW5nXCIsXG4gICAgICAgIG9uY2hhbmdlZDogKGF0dHIpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy50YXJnZXQpIHtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0Lk1pbkZpbHRlciA9IEdMRW51bVBhcnNlci5wYXJzZVRleHR1cmVNaW5GaWx0ZXIoYXR0ci5WYWx1ZSk7XG4gICAgICAgICAgICBhdHRyLmRvbmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBtYWdGaWx0ZXI6IHtcbiAgICAgICAgdmFsdWU6IFwiTElORUFSXCIsXG4gICAgICAgIGNvbnZlcnRlcjogXCJzdHJpbmdcIixcbiAgICAgICAgb25jaGFuZ2VkOiAoYXR0cikgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLnRhcmdldCkge1xuICAgICAgICAgICAgdGhpcy50YXJnZXQuTWFnRmlsdGVyID0gR0xFbnVtUGFyc2VyLnBhcnNlVGV4dHVyZU1hZ0ZpbHRlcihhdHRyLlZhbHVlKTtcbiAgICAgICAgICAgIGF0dHIuZG9uZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHR3cmFwOiB7XG4gICAgICAgIHZhbHVlOiBcIkNMQU1QX1RPX0VER0VcIixcbiAgICAgICAgY29udmVydGVyOiBcInN0cmluZ1wiLFxuICAgICAgICBvbmNoYW5nZWQ6IChhdHRyKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMudGFyZ2V0KSB7XG4gICAgICAgICAgICB0aGlzLnRhcmdldC5UV3JhcCA9IEdMRW51bVBhcnNlci5wYXJzZVRleHR1cmVXcmFwTW9kZShhdHRyLlZhbHVlKTtcbiAgICAgICAgICAgIGF0dHIuZG9uZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHN3cmFwOiB7XG4gICAgICAgIHZhbHVlOiBcIkNMQU1QX1RPX0VER0VcIixcbiAgICAgICAgY29udmVydGVyOiBcInN0cmluZ1wiLFxuICAgICAgICBvbmNoYW5nZWQ6IChhdHRyKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMudGFyZ2V0KSB7XG4gICAgICAgICAgICB0aGlzLnRhcmdldC5TV3JhcCA9IEdMRW51bVBhcnNlci5wYXJzZVRleHR1cmVXcmFwTW9kZShhdHRyLlZhbHVlKTtcbiAgICAgICAgICAgIGF0dHIuZG9uZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMub24oXCJ1cGRhdGUtdGFyZ2V0XCIsIChvYmo6IFQpID0+IHtcbiAgICAgIHRoaXMuX29uTWluRmlsdGVyQXR0ckNoYW5nZWQuY2FsbCh0aGlzLCB0aGlzLmF0dHJpYnV0ZXMuZ2V0QXR0cmlidXRlKFwibWluRmlsdGVyXCIpKTtcbiAgICAgIHRoaXMuX29uTWFnRmlsdGVyQXR0ckNoYW5nZWQuY2FsbCh0aGlzLCB0aGlzLmF0dHJpYnV0ZXMuZ2V0QXR0cmlidXRlKFwibWFnRmlsdGVyXCIpKTtcbiAgICAgIHRoaXMuX29uVFdyYXBBdHRyQ2hhbmdlZC5jYWxsKHRoaXMsIHRoaXMuYXR0cmlidXRlcy5nZXRBdHRyaWJ1dGUoXCJ0d3JhcFwiKSk7XG4gICAgICB0aGlzLl9vblNXcmFwQXR0ckNoYW5nZWQuY2FsbCh0aGlzLCB0aGlzLmF0dHJpYnV0ZXMuZ2V0QXR0cmlidXRlKFwic3dyYXBcIikpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9fb25Nb3VudCgpOiB2b2lkIHtcbiAgICBzdXBlci5fX29uTW91bnQoKTtcbiAgICBjb25zdCBybSA9IEpUaHJlZUNvbnRleHQuZ2V0Q29udGV4dENvbXBvbmVudDxSZXNvdXJjZU1hbmFnZXI+KENvbnRleHRDb21wb25lbnRzLlJlc291cmNlTWFuYWdlcik7XG4gICAgY29uc3QgbmFtZSA9IHRoaXMuYXR0cmlidXRlcy5nZXRWYWx1ZShcIm5hbWVcIik7XG4gICAgdGhpcy5fX2NvbnN0cnVjdFRleHR1cmUobmFtZSwgcm0pLnRoZW4oKHRleHR1cmUpID0+IHtcbiAgICAgIHRoaXMudGFyZ2V0ID0gdGV4dHVyZTtcbiAgICAgIHRoaXMuZW1pdChcInVwZGF0ZS10YXJnZXRcIiwgdGhpcy50YXJnZXQpO1xuICAgICAgdGhpcy5ub2RlRXhwb3J0KG5hbWUpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCB0ZXh0dXJlLlxuICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgICAgICAgIG5hbWUgW2Rlc2NyaXB0aW9uXVxuICAgKiBAcGFyYW0gIHtSZXNvdXJjZU1hbmFnZXJ9IHJtICAgW2Rlc2NyaXB0aW9uXVxuICAgKiBAcmV0dXJuIHtUZXh0dXJlQmFzZX0gICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgKi9cbiAgcHJvdGVjdGVkIGFic3RyYWN0IF9fY29uc3RydWN0VGV4dHVyZShuYW1lOiBzdHJpbmcsIHJtOiBSZXNvdXJjZU1hbmFnZXIpOiBRLklQcm9taXNlPFQ+O1xuXG4gIHByaXZhdGUgX29uTWluRmlsdGVyQXR0ckNoYW5nZWQoYXR0cik6IHZvaWQge1xuICAgIGlmICh0aGlzLnRhcmdldCkge1xuICAgICAgdGhpcy50YXJnZXQuTWluRmlsdGVyID0gR0xFbnVtUGFyc2VyLnBhcnNlVGV4dHVyZU1pbkZpbHRlcihhdHRyLlZhbHVlKTtcbiAgICAgIGF0dHIuZG9uZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX29uTWFnRmlsdGVyQXR0ckNoYW5nZWQoYXR0cik6IHZvaWQge1xuICAgIGlmICh0aGlzLnRhcmdldCkge1xuICAgICAgdGhpcy50YXJnZXQuTWFnRmlsdGVyID0gR0xFbnVtUGFyc2VyLnBhcnNlVGV4dHVyZU1hZ0ZpbHRlcihhdHRyLlZhbHVlKTtcbiAgICAgIGF0dHIuZG9uZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX29uVFdyYXBBdHRyQ2hhbmdlZChhdHRyKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudGFyZ2V0KSB7XG4gICAgICB0aGlzLnRhcmdldC5UV3JhcCA9IEdMRW51bVBhcnNlci5wYXJzZVRleHR1cmVXcmFwTW9kZShhdHRyLlZhbHVlKTtcbiAgICAgIGF0dHIuZG9uZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX29uU1dyYXBBdHRyQ2hhbmdlZChhdHRyKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudGFyZ2V0KSB7XG4gICAgICB0aGlzLnRhcmdldC5TV3JhcCA9IEdMRW51bVBhcnNlci5wYXJzZVRleHR1cmVXcmFwTW9kZShhdHRyLlZhbHVlKTtcbiAgICAgIGF0dHIuZG9uZSgpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUZXh0dXJlTm9kZUJhc2U7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
