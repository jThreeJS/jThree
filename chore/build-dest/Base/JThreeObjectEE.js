import { EventEmitter } from "events";
import JThreeObject from "./JThreeObject";
/**
 * EventEmitterをmixinしたJThreeObject
 */
class JThreeObjectEE extends JThreeObject {
    constructor() {
        super();
    }
}
function applyMixins(derivedCtor, baseCtors) {
    baseCtors.forEach((baseCtor) => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}
applyMixins(JThreeObjectEE, [EventEmitter]);
export default JThreeObjectEE;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkJhc2UvSlRocmVlT2JqZWN0RUUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ik9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxRQUFRO09BQzVCLFlBQVksTUFBTSxnQkFBZ0I7QUFFekM7O0dBRUc7QUFDSCw2QkFBNkIsWUFBWTtJQVV2QztRQUNFLE9BQU8sQ0FBQztJQUNWLENBQUM7QUFDSCxDQUFDO0FBRUQscUJBQXFCLFdBQWdCLEVBQUUsU0FBZ0I7SUFDckQsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVE7UUFDekIsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJO1lBQzFELFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6RCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELFdBQVcsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO0FBRTVDLGVBQWUsY0FBYyxDQUFDIiwiZmlsZSI6IkJhc2UvSlRocmVlT2JqZWN0RUUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0V2ZW50RW1pdHRlcn0gZnJvbSBcImV2ZW50c1wiO1xuaW1wb3J0IEpUaHJlZU9iamVjdCBmcm9tIFwiLi9KVGhyZWVPYmplY3RcIjtcblxuLyoqXG4gKiBFdmVudEVtaXR0ZXLjgpJtaXhpbuOBl+OBn0pUaHJlZU9iamVjdFxuICovXG5jbGFzcyBKVGhyZWVPYmplY3RFRSBleHRlbmRzIEpUaHJlZU9iamVjdCBpbXBsZW1lbnRzIEV2ZW50RW1pdHRlciB7XG4gIHB1YmxpYyBhZGRMaXN0ZW5lcjogKGV2ZW50OiBzdHJpbmcsIGxpc3RlbmVyOiBGdW5jdGlvbikgPT4gRXZlbnRFbWl0dGVyO1xuICBwdWJsaWMgb246IChldmVudDogc3RyaW5nLCBsaXN0ZW5lcjogRnVuY3Rpb24pID0+IEV2ZW50RW1pdHRlcjtcbiAgcHVibGljIG9uY2U6IChldmVudDogc3RyaW5nLCBsaXN0ZW5lcjogRnVuY3Rpb24pID0+IEV2ZW50RW1pdHRlcjtcbiAgcHVibGljIHJlbW92ZUxpc3RlbmVyOiAoZXZlbnQ6IHN0cmluZywgbGlzdGVuZXI6IEZ1bmN0aW9uKSA9PiBFdmVudEVtaXR0ZXI7XG4gIHB1YmxpYyByZW1vdmVBbGxMaXN0ZW5lcnM6IChldmVudD86IHN0cmluZykgPT4gRXZlbnRFbWl0dGVyO1xuICBwdWJsaWMgc2V0TWF4TGlzdGVuZXJzOiAobjogbnVtYmVyKSA9PiB2b2lkO1xuICBwdWJsaWMgbGlzdGVuZXJzOiAoZXZlbnQ6IHN0cmluZykgPT4gRnVuY3Rpb25bXTtcbiAgcHVibGljIGVtaXQ6IChldmVudDogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSkgPT4gYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFwcGx5TWl4aW5zKGRlcml2ZWRDdG9yOiBhbnksIGJhc2VDdG9yczogYW55W10pIHtcbiAgYmFzZUN0b3JzLmZvckVhY2goKGJhc2VDdG9yKSA9PiB7XG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYmFzZUN0b3IucHJvdG90eXBlKS5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgICBkZXJpdmVkQ3Rvci5wcm90b3R5cGVbbmFtZV0gPSBiYXNlQ3Rvci5wcm90b3R5cGVbbmFtZV07XG4gICAgfSk7XG4gIH0pO1xufVxuXG5hcHBseU1peGlucyhKVGhyZWVPYmplY3RFRSwgW0V2ZW50RW1pdHRlcl0pO1xuXG5leHBvcnQgZGVmYXVsdCBKVGhyZWVPYmplY3RFRTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
