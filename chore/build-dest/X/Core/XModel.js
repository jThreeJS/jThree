import HitAreaMaterial from "../../Core/Materials/Buffering/HitAreaMaterial";
import XPrimaryMaterial from "./XPrimaryBufferMaterial";
import XMaterial from "./XMaterial";
import XGeometry from "./XGeometry";
import XFileData from "../XFileData";
import SceneObject from "../../Core/SceneObjects/SceneObject";
class XModel extends SceneObject {
    constructor(modelData) {
        super();
        this._modelData = modelData;
        this.Geometry = new XGeometry(modelData);
        this._modelData.materials.forEach((material) => {
            this.addMaterial(new XMaterial(material));
            this.addMaterial(new HitAreaMaterial());
            this.addMaterial(new XPrimaryMaterial(material));
        });
    }
    static fromUrl(src) {
        return XFileData.loadFile(src).then(data => {
            return new XModel(data);
        });
    }
}
export default XModel;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlgvQ29yZS9YTW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ik9BQU8sZUFBZSxNQUFNLGdEQUFnRDtPQUNyRSxnQkFBZ0IsTUFBTSwwQkFBMEI7T0FDaEQsU0FBUyxNQUFNLGFBQWE7T0FDNUIsU0FBUyxNQUFNLGFBQWE7T0FDNUIsU0FBUyxNQUFNLGNBQWM7T0FDN0IsV0FBVyxNQUFNLHFDQUFxQztBQUU3RCxxQkFBcUIsV0FBVztJQUk5QixZQUFZLFNBQW9CO1FBQzlCLE9BQU8sQ0FBQztRQUNSLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUTtZQUN6QyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLGVBQWUsRUFBRSxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDbkQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsT0FBYyxPQUFPLENBQUMsR0FBVztRQUMvQixNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSTtZQUN0QyxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0FBRUgsQ0FBQztBQUVELGVBQWUsTUFBTSxDQUFDIiwiZmlsZSI6IlgvQ29yZS9YTW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSGl0QXJlYU1hdGVyaWFsIGZyb20gXCIuLi8uLi9Db3JlL01hdGVyaWFscy9CdWZmZXJpbmcvSGl0QXJlYU1hdGVyaWFsXCI7XG5pbXBvcnQgWFByaW1hcnlNYXRlcmlhbCBmcm9tIFwiLi9YUHJpbWFyeUJ1ZmZlck1hdGVyaWFsXCI7XG5pbXBvcnQgWE1hdGVyaWFsIGZyb20gXCIuL1hNYXRlcmlhbFwiO1xuaW1wb3J0IFhHZW9tZXRyeSBmcm9tIFwiLi9YR2VvbWV0cnlcIjtcbmltcG9ydCBYRmlsZURhdGEgZnJvbSBcIi4uL1hGaWxlRGF0YVwiO1xuaW1wb3J0IFNjZW5lT2JqZWN0IGZyb20gXCIuLi8uLi9Db3JlL1NjZW5lT2JqZWN0cy9TY2VuZU9iamVjdFwiO1xuaW1wb3J0IFEgZnJvbSBcInFcIjtcbmNsYXNzIFhNb2RlbCBleHRlbmRzIFNjZW5lT2JqZWN0IHtcblxuICBwcml2YXRlIF9tb2RlbERhdGE6IFhGaWxlRGF0YTtcblxuICBjb25zdHJ1Y3Rvcihtb2RlbERhdGE6IFhGaWxlRGF0YSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fbW9kZWxEYXRhID0gbW9kZWxEYXRhO1xuICAgIHRoaXMuR2VvbWV0cnkgPSBuZXcgWEdlb21ldHJ5KG1vZGVsRGF0YSk7XG4gICAgdGhpcy5fbW9kZWxEYXRhLm1hdGVyaWFscy5mb3JFYWNoKChtYXRlcmlhbCkgPT4ge1xuICAgICAgdGhpcy5hZGRNYXRlcmlhbChuZXcgWE1hdGVyaWFsKG1hdGVyaWFsKSk7XG4gICAgICB0aGlzLmFkZE1hdGVyaWFsKG5ldyBIaXRBcmVhTWF0ZXJpYWwoKSk7XG4gICAgICB0aGlzLmFkZE1hdGVyaWFsKG5ldyBYUHJpbWFyeU1hdGVyaWFsKG1hdGVyaWFsKSk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGZyb21Vcmwoc3JjOiBzdHJpbmcpOiBRLklQcm9taXNlPFhNb2RlbD4ge1xuICAgIHJldHVybiBYRmlsZURhdGEubG9hZEZpbGUoc3JjKS50aGVuKGRhdGEgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBYTW9kZWwoZGF0YSk7XG4gICAgfSk7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBYTW9kZWw7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
