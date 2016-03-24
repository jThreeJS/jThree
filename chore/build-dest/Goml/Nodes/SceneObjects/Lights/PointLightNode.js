import LightNodeBase from "./LightNodeBase";
import PointLight from "../../../../Core/SceneObjects/Light/Impl/PointLight";
class PointLightNode extends LightNodeBase {
    constructor() {
        super();
        this.attributes.defineAttribute({
            "intensity": {
                value: 1,
                converter: "float",
                onchanged: this._onIntensityAttrChanged.bind(this),
            },
            "decay": {
                value: 1,
                converter: "float",
                onchanged: this._onDecayAttrChanged.bind(this),
            },
            "distance": {
                value: 1,
                converter: "float",
                onchanged: this._onDistanceAttrChanged.bind(this),
            }
        });
        this.on("update-scene-object", (obj) => {
            this._onIntensityAttrChanged.call(this, this.attributes.getAttribute("intensity"));
            this._onDecayAttrChanged.call(this, this.attributes.getAttribute("decay"));
            this._onDistanceAttrChanged.call(this, this.attributes.getAttribute("distance"));
        });
    }
    __constructLight() {
        return new PointLight();
    }
    _onIntensityAttrChanged(attr) {
        if (this.TargetSceneObject) {
            this.TargetSceneObject.intensity = attr.Value;
            attr.done();
        }
    }
    _onDecayAttrChanged(attr) {
        if (this.TargetSceneObject) {
            this.TargetSceneObject.decay = attr.Value;
            attr.done();
        }
    }
    _onDistanceAttrChanged(attr) {
        if (this.TargetSceneObject) {
            this.TargetSceneObject.distance = attr.Value;
            attr.done();
        }
    }
}
export default PointLightNode;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdvbWwvTm9kZXMvU2NlbmVPYmplY3RzL0xpZ2h0cy9Qb2ludExpZ2h0Tm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiT0FBTyxhQUFhLE1BQU0saUJBQWlCO09BQ3BDLFVBQVUsTUFBTSxxREFBcUQ7QUFHNUUsNkJBQTZCLGFBQWE7SUFDeEM7UUFDRSxPQUFPLENBQUM7UUFDUixJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQztZQUM5QixXQUFXLEVBQUU7Z0JBQ1gsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsU0FBUyxFQUFFLE9BQU87Z0JBQ2xCLFNBQVMsRUFBRSxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUNuRDtZQUNELE9BQU8sRUFDUDtnQkFDRSxLQUFLLEVBQUUsQ0FBQztnQkFDUixTQUFTLEVBQUUsT0FBTztnQkFDbEIsU0FBUyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQy9DO1lBQ0QsVUFBVSxFQUNWO2dCQUNFLEtBQUssRUFBRSxDQUFDO2dCQUNSLFNBQVMsRUFBRSxPQUFPO2dCQUNsQixTQUFTLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDbEQ7U0FDRixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsRUFBRSxDQUFDLHFCQUFxQixFQUFFLENBQUMsR0FBZTtZQUM3QyxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ25GLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDM0UsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUNuRixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFUyxnQkFBZ0I7UUFDeEIsTUFBTSxDQUFDLElBQUksVUFBVSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVPLHVCQUF1QixDQUFDLElBQW1CO1FBQ2pELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDZCxJQUFJLENBQUMsaUJBQWtCLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDNUQsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2QsQ0FBQztJQUNILENBQUM7SUFFTyxtQkFBbUIsQ0FBQyxJQUFtQjtRQUM3QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQ2QsSUFBSSxDQUFDLGlCQUFrQixDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3hELElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNkLENBQUM7SUFDSCxDQUFDO0lBRU8sc0JBQXNCLENBQUMsSUFBbUI7UUFDaEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztZQUNkLElBQUksQ0FBQyxpQkFBa0IsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUMzRCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDZCxDQUFDO0lBQ0gsQ0FBQztBQUNILENBQUM7QUFFRCxlQUFlLGNBQWMsQ0FBQyIsImZpbGUiOiJHb21sL05vZGVzL1NjZW5lT2JqZWN0cy9MaWdodHMvUG9pbnRMaWdodE5vZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTGlnaHROb2RlQmFzZSBmcm9tIFwiLi9MaWdodE5vZGVCYXNlXCI7XG5pbXBvcnQgUG9pbnRMaWdodCBmcm9tIFwiLi4vLi4vLi4vLi4vQ29yZS9TY2VuZU9iamVjdHMvTGlnaHQvSW1wbC9Qb2ludExpZ2h0XCI7XG5pbXBvcnQgR29tbEF0dHJpYnV0ZSBmcm9tIFwiLi4vLi4vLi4vR29tbEF0dHJpYnV0ZVwiO1xuXG5jbGFzcyBQb2ludExpZ2h0Tm9kZSBleHRlbmRzIExpZ2h0Tm9kZUJhc2U8UG9pbnRMaWdodD4ge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuYXR0cmlidXRlcy5kZWZpbmVBdHRyaWJ1dGUoe1xuICAgICAgXCJpbnRlbnNpdHlcIjoge1xuICAgICAgICB2YWx1ZTogMSxcbiAgICAgICAgY29udmVydGVyOiBcImZsb2F0XCIsXG4gICAgICAgIG9uY2hhbmdlZDogdGhpcy5fb25JbnRlbnNpdHlBdHRyQ2hhbmdlZC5iaW5kKHRoaXMpLFxuICAgICAgfSxcbiAgICAgIFwiZGVjYXlcIjpcbiAgICAgIHtcbiAgICAgICAgdmFsdWU6IDEsXG4gICAgICAgIGNvbnZlcnRlcjogXCJmbG9hdFwiLFxuICAgICAgICBvbmNoYW5nZWQ6IHRoaXMuX29uRGVjYXlBdHRyQ2hhbmdlZC5iaW5kKHRoaXMpLFxuICAgICAgfSxcbiAgICAgIFwiZGlzdGFuY2VcIjpcbiAgICAgIHtcbiAgICAgICAgdmFsdWU6IDEsXG4gICAgICAgIGNvbnZlcnRlcjogXCJmbG9hdFwiLFxuICAgICAgICBvbmNoYW5nZWQ6IHRoaXMuX29uRGlzdGFuY2VBdHRyQ2hhbmdlZC5iaW5kKHRoaXMpLFxuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMub24oXCJ1cGRhdGUtc2NlbmUtb2JqZWN0XCIsIChvYmo6IFBvaW50TGlnaHQpID0+IHtcbiAgICAgIHRoaXMuX29uSW50ZW5zaXR5QXR0ckNoYW5nZWQuY2FsbCh0aGlzLCB0aGlzLmF0dHJpYnV0ZXMuZ2V0QXR0cmlidXRlKFwiaW50ZW5zaXR5XCIpKTtcbiAgICAgIHRoaXMuX29uRGVjYXlBdHRyQ2hhbmdlZC5jYWxsKHRoaXMsIHRoaXMuYXR0cmlidXRlcy5nZXRBdHRyaWJ1dGUoXCJkZWNheVwiKSk7XG4gICAgICB0aGlzLl9vbkRpc3RhbmNlQXR0ckNoYW5nZWQuY2FsbCh0aGlzLCB0aGlzLmF0dHJpYnV0ZXMuZ2V0QXR0cmlidXRlKFwiZGlzdGFuY2VcIikpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9fY29uc3RydWN0TGlnaHQoKTogUG9pbnRMaWdodCB7XG4gICAgcmV0dXJuIG5ldyBQb2ludExpZ2h0KCk7XG4gIH1cblxuICBwcml2YXRlIF9vbkludGVuc2l0eUF0dHJDaGFuZ2VkKGF0dHI6IEdvbWxBdHRyaWJ1dGUpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5UYXJnZXRTY2VuZU9iamVjdCkge1xuICAgICAgKDxQb2ludExpZ2h0PnRoaXMuVGFyZ2V0U2NlbmVPYmplY3QpLmludGVuc2l0eSA9IGF0dHIuVmFsdWU7XG4gICAgICBhdHRyLmRvbmUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9vbkRlY2F5QXR0ckNoYW5nZWQoYXR0cjogR29tbEF0dHJpYnV0ZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLlRhcmdldFNjZW5lT2JqZWN0KSB7XG4gICAgICAoPFBvaW50TGlnaHQ+dGhpcy5UYXJnZXRTY2VuZU9iamVjdCkuZGVjYXkgPSBhdHRyLlZhbHVlO1xuICAgICAgYXR0ci5kb25lKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfb25EaXN0YW5jZUF0dHJDaGFuZ2VkKGF0dHI6IEdvbWxBdHRyaWJ1dGUpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5UYXJnZXRTY2VuZU9iamVjdCkge1xuICAgICAgKDxQb2ludExpZ2h0PnRoaXMuVGFyZ2V0U2NlbmVPYmplY3QpLmRpc3RhbmNlID0gYXR0ci5WYWx1ZTtcbiAgICAgIGF0dHIuZG9uZSgpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQb2ludExpZ2h0Tm9kZTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
