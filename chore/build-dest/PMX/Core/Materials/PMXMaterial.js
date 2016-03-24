import BasicMaterial from "../../../Core/Materials/Base/BasicMaterial";
import Material from "../../../Core/Materials/Material";
import Vector4 from "../../../Math/Vector4";
import Color4 from "../../../Math/Color4";
import Color3 from "../../../Math/Color3";
import PmxMaterialMorphParamContainer from "./../PMXMaterialMorphParamContainer";
import ContextComponents from "../../../ContextComponents";
import JThreeContext from "../../../JThreeContext";
/**
 * the materials for PMX.
 */
class PMXMaterial extends Material {
    constructor(pmx, index, offset) {
        super();
        this.edgeColor = null;
        this._sphere = null;
        this._texture = null;
        this._toon = null;
        this.addMorphParam = new PmxMaterialMorphParamContainer(1);
        this.mulMorphParam = new PmxMaterialMorphParamContainer(0);
        this._parentModel = pmx;
        this._pmxData = pmx.ModelData;
        this.materialIndex = index;
        let materialData = this._pmxData.Materials[index];
        this._verticiesCount = materialData.vertexCount;
        this._verticiesOffset = offset;
        this.name = materialData.materialName;
        this.cullEnabled = !((materialData.drawFlag & 0x01) > 0); // each side draw flag
        this._ambient = new Color3(materialData.ambient[0], materialData.ambient[1], materialData.ambient[2]);
        this._diffuse = new Color4(materialData.diffuse[0], materialData.diffuse[1], materialData.diffuse[2], materialData.diffuse[3]);
        if ((materialData.drawFlag & 0x10) > 0) {
            this.edgeColor = new Color4(materialData.edgeColor[0], materialData.edgeColor[1], materialData.edgeColor[2], materialData.edgeColor[3]);
        }
        this._specular = new Vector4(materialData.specular);
        this._edgeSize = materialData.edgeSize;
        this._sphereMode = materialData.sphereMode;
        this.__innerMaterial = new BasicMaterial(require("../../Materials/Forward.html"));
        const tm = this._parentModel.pmxTextureManager;
        tm.loadTexture(materialData.sphereTextureIndex).then((texture) => {
            this._sphere = texture;
        });
        tm.loadTexture(materialData.textureIndex).then((texture) => {
            this._texture = texture;
        });
        if (materialData.sharedToonFlag === 0) {
            tm.loadTexture(materialData.targetToonIndex).then((texture) => {
                this._toon = texture;
            });
        }
        else {
            this._toon = this._loadSharedTexture(materialData.targetToonIndex);
        }
        this.__innerMaterial.on("configure", (v) => {
            if (v.passIndex === 0) {
                v.configure.cullOrientation = this.cullEnabled ? "BACK" : "NONE";
            }
        });
        this.__innerMaterial.on("ready", () => {
            this.__setLoaded();
        });
    }
    /**
     * Count of verticies
     */
    get VerticiesCount() {
        return this._verticiesCount;
    }
    /**
     * Offset of verticies in index buffer
     */
    get VerticiesOffset() {
        return this._verticiesOffset;
    }
    get ParentModel() {
        return this._parentModel;
    }
    get Diffuse() {
        return this._diffuse;
    }
    get Texture() {
        return this._texture;
    }
    get Sphere() {
        return this._sphere;
    }
    get SphereMode() {
        return this._sphereMode;
    }
    get Specular() {
        return this._specular;
    }
    getPassCount(techniqueIndex) {
        return this.edgeColor == null ? 1 : 2;
    }
    get SelfShadow() {
        return (this._pmxData.Materials[this.materialIndex].drawFlag & 0x04) > 0;
    }
    apply(matArg) {
        const skeleton = this._parentModel.skeleton;
        if (matArg.passIndex === 1) {
            this.__innerMaterial.materialVariables = {
                boneCount: skeleton.BoneCount,
                boneMatriciesTexture: skeleton.MatrixTexture,
                edgeSize: PmxMaterialMorphParamContainer.calcMorphedSingleValue(this._edgeSize, this.addMorphParam, this.mulMorphParam, (t) => t.edgeSize),
                edgeColor: PmxMaterialMorphParamContainer.calcMorphedVectorValue(this.edgeColor.toVector(), this.addMorphParam, this.mulMorphParam, (t) => t.edgeColor, 4)
            };
        }
        else {
            this.__innerMaterial.materialVariables = {
                boneCount: skeleton.BoneCount,
                boneMatriciesTexture: skeleton.MatrixTexture,
                texture: this._texture,
                toon: this._toon,
                sphere: this._sphere,
                diffuse: this._diffuse.toVector(),
                specular: this._specular,
                ambient: this._ambient.toVector(),
                textureUsed: !this._texture ? 0 : 1,
                sphereMode: !this._sphere ? 0 : this._sphereMode,
                toonFlag: !this._toon ? 0 : 1,
                addTexCoeff: new Vector4(this.addMorphParam.textureCoeff),
                mulTexCoeff: new Vector4(this.mulMorphParam.textureCoeff),
                addSphereCoeff: new Vector4(this.addMorphParam.sphereCoeff),
                mulSphereCoeff: new Vector4(this.mulMorphParam.sphereCoeff),
                addToonCoeff: new Vector4(this.addMorphParam.toonCoeff),
                mulToonCoeff: new Vector4(this.mulMorphParam.toonCoeff),
                ambientCoefficient: matArg.scene.sceneAmbient.toVector()
            };
        }
        this.__innerMaterial.apply(matArg);
    }
    get Priorty() {
        return 100 + this.materialIndex;
    }
    getDrawGeometryLength(geo) {
        return this._diffuse.A > 0 ? this.VerticiesCount : 0;
    }
    getDrawGeometryOffset(geo) {
        return this.VerticiesOffset * 4;
    }
    _loadSharedTexture(index) {
        if (index < 0) {
            return null;
        }
        const rm = JThreeContext.getContextComponent(ContextComponents.ResourceManager);
        const resName = "jthree.pmx.sharedtoon." + index;
        if (rm.getTexture(resName)) {
            return rm.getTexture(resName);
        }
        else {
            const tex = rm.createTextureWithSource(resName, this._parentModel.pmxTextureManager.generateSharedToonImg(index));
            return tex;
        }
    }
}
export default PMXMaterial;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBNWC9Db3JlL01hdGVyaWFscy9QTVhNYXRlcmlhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiT0FHTyxhQUFhLE1BQU0sNENBQTRDO09BQy9ELFFBQVEsTUFBTSxrQ0FBa0M7T0FFaEQsT0FBTyxNQUFNLHVCQUF1QjtPQUNwQyxNQUFNLE1BQU0sc0JBQXNCO09BQ2xDLE1BQU0sTUFBTSxzQkFBc0I7T0FJbEMsOEJBQThCLE1BQU0scUNBQXFDO09BRXpFLGlCQUFpQixNQUFNLDRCQUE0QjtPQUNuRCxhQUFhLE1BQU0sd0JBQXdCO0FBRWxEOztHQUVHO0FBQ0gsMEJBQTBCLFFBQVE7SUF3Q2hDLFlBQVksR0FBYSxFQUFFLEtBQWEsRUFBRSxNQUFjO1FBQ3RELE9BQU8sQ0FBQztRQXZDSCxjQUFTLEdBQVcsSUFBSSxDQUFDO1FBd0J4QixZQUFPLEdBQWdCLElBQUksQ0FBQztRQUU1QixhQUFRLEdBQWdCLElBQUksQ0FBQztRQUU3QixVQUFLLEdBQWdCLElBQUksQ0FBQztRQVloQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksOEJBQThCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLDhCQUE4QixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQztRQUM5QixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUMzQixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsZUFBZSxHQUFHLFlBQVksQ0FBQyxXQUFXLENBQUM7UUFDaEQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLE1BQU0sQ0FBQztRQUMvQixJQUFJLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUM7UUFDdEMsSUFB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O0lBRU8sa0JBQWtCLENBQUMsS0FBYTtRQUN0QyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBQ0QsTUFBTSxFQUFFLEdBQUcsYUFBYSxDQUFDLG1CQUFtQixDQUFrQixpQkFBaUIsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNqRyxNQUFNLE9BQU8sR0FBRyx3QkFBd0IsR0FBRyxLQUFLLENBQUM7UUFDakQsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsTUFBTSxDQUFVLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLHVCQUF1QixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDbEgsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUNiLENBQUM7SUFDSCxDQUFDO0FBQ0gsQ0FBQztBQUVELGVBQWUsV0FBVyxDQUFDIiwiZmlsZSI6IlBNWC9Db3JlL01hdGVyaWFscy9QTVhNYXRlcmlhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUZXh0dXJlQmFzZSBmcm9tIFwiLi4vLi4vLi4vQ29yZS9SZXNvdXJjZXMvVGV4dHVyZS9UZXh0dXJlQmFzZVwiO1xuaW1wb3J0IElDb25maWd1cmVFdmVudEFyZ3MgZnJvbSBcIi4uLy4uLy4uL0NvcmUvSUNvbmZpZ3VyZUV2ZW50QXJnc1wiO1xuaW1wb3J0IElBcHBseU1hdGVyaWFsQXJndW1lbnQgZnJvbSBcIi4uLy4uLy4uL0NvcmUvTWF0ZXJpYWxzL0Jhc2UvSUFwcGx5TWF0ZXJpYWxBcmd1bWVudFwiO1xuaW1wb3J0IEJhc2ljTWF0ZXJpYWwgZnJvbSBcIi4uLy4uLy4uL0NvcmUvTWF0ZXJpYWxzL0Jhc2UvQmFzaWNNYXRlcmlhbFwiO1xuaW1wb3J0IE1hdGVyaWFsIGZyb20gXCIuLi8uLi8uLi9Db3JlL01hdGVyaWFscy9NYXRlcmlhbFwiO1xuaW1wb3J0IEdlb21ldHJ5IGZyb20gXCIuLi8uLi8uLi9Db3JlL0dlb21ldHJpZXMvQmFzZS9HZW9tZXRyeVwiO1xuaW1wb3J0IFZlY3RvcjQgZnJvbSBcIi4uLy4uLy4uL01hdGgvVmVjdG9yNFwiO1xuaW1wb3J0IENvbG9yNCBmcm9tIFwiLi4vLi4vLi4vTWF0aC9Db2xvcjRcIjtcbmltcG9ydCBDb2xvcjMgZnJvbSBcIi4uLy4uLy4uL01hdGgvQ29sb3IzXCI7XG5pbXBvcnQgUE1YIGZyb20gXCIuLi8uLi9QTVhEYXRhXCI7XG5pbXBvcnQgVGV4dHVyZSBmcm9tIFwiLi4vLi4vLi4vQ29yZS9SZXNvdXJjZXMvVGV4dHVyZS9UZXh0dXJlXCI7XG5pbXBvcnQgUE1YTW9kZWwgZnJvbSBcIi4vLi4vUE1YTW9kZWxcIjtcbmltcG9ydCBQbXhNYXRlcmlhbE1vcnBoUGFyYW1Db250YWluZXIgZnJvbSBcIi4vLi4vUE1YTWF0ZXJpYWxNb3JwaFBhcmFtQ29udGFpbmVyXCI7XG5pbXBvcnQgUmVzb3VyY2VNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9Db3JlL1Jlc291cmNlTWFuYWdlclwiO1xuaW1wb3J0IENvbnRleHRDb21wb25lbnRzIGZyb20gXCIuLi8uLi8uLi9Db250ZXh0Q29tcG9uZW50c1wiO1xuaW1wb3J0IEpUaHJlZUNvbnRleHQgZnJvbSBcIi4uLy4uLy4uL0pUaHJlZUNvbnRleHRcIjtcblxuLyoqXG4gKiB0aGUgbWF0ZXJpYWxzIGZvciBQTVguXG4gKi9cbmNsYXNzIFBNWE1hdGVyaWFsIGV4dGVuZHMgTWF0ZXJpYWwge1xuXG4gIHB1YmxpYyBlZGdlQ29sb3I6IENvbG9yNCA9IG51bGw7XG5cbiAgcHVibGljIG1hdGVyaWFsSW5kZXg6IG51bWJlcjtcblxuICBwdWJsaWMgY3VsbEVuYWJsZWQ6IGJvb2xlYW47XG5cbiAgcHVibGljIG5hbWU6IHN0cmluZztcblxuICBwdWJsaWMgYWRkTW9ycGhQYXJhbTogUG14TWF0ZXJpYWxNb3JwaFBhcmFtQ29udGFpbmVyO1xuXG4gIHB1YmxpYyBtdWxNb3JwaFBhcmFtOiBQbXhNYXRlcmlhbE1vcnBoUGFyYW1Db250YWluZXI7XG5cbiAgcHJvdGVjdGVkIF9faW5uZXJNYXRlcmlhbDogQmFzaWNNYXRlcmlhbDtcblxuICBwcml2YXRlIF92ZXJ0aWNpZXNDb3VudDogbnVtYmVyO1xuXG4gIHByaXZhdGUgX3ZlcnRpY2llc09mZnNldDogbnVtYmVyO1xuXG4gIHByaXZhdGUgX2FtYmllbnQ6IENvbG9yMztcblxuICBwcml2YXRlIF9kaWZmdXNlOiBDb2xvcjQ7XG5cbiAgcHJpdmF0ZSBfZWRnZVNpemU6IG51bWJlcjtcblxuICBwcml2YXRlIF9zcGhlcmU6IFRleHR1cmVCYXNlID0gbnVsbDtcblxuICBwcml2YXRlIF90ZXh0dXJlOiBUZXh0dXJlQmFzZSA9IG51bGw7XG5cbiAgcHJpdmF0ZSBfdG9vbjogVGV4dHVyZUJhc2UgPSBudWxsO1xuXG4gIHByaXZhdGUgX3BteERhdGE6IFBNWDtcblxuICBwcml2YXRlIF9wYXJlbnRNb2RlbDogUE1YTW9kZWw7XG5cbiAgcHJpdmF0ZSBfc3BoZXJlTW9kZTogbnVtYmVyO1xuXG4gIHByaXZhdGUgX3NwZWN1bGFyOiBWZWN0b3I0O1xuXG4gIGNvbnN0cnVjdG9yKHBteDogUE1YTW9kZWwsIGluZGV4OiBudW1iZXIsIG9mZnNldDogbnVtYmVyKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmFkZE1vcnBoUGFyYW0gPSBuZXcgUG14TWF0ZXJpYWxNb3JwaFBhcmFtQ29udGFpbmVyKDEpO1xuICAgIHRoaXMubXVsTW9ycGhQYXJhbSA9IG5ldyBQbXhNYXRlcmlhbE1vcnBoUGFyYW1Db250YWluZXIoMCk7XG4gICAgdGhpcy5fcGFyZW50TW9kZWwgPSBwbXg7XG4gICAgdGhpcy5fcG14RGF0YSA9IHBteC5Nb2RlbERhdGE7XG4gICAgdGhpcy5tYXRlcmlhbEluZGV4ID0gaW5kZXg7XG4gICAgbGV0IG1hdGVyaWFsRGF0YSA9IHRoaXMuX3BteERhdGEuTWF0ZXJpYWxzW2luZGV4XTtcbiAgICB0aGlzLl92ZXJ0aWNpZXNDb3VudCA9IG1hdGVyaWFsRGF0YS52ZXJ0ZXhDb3VudDtcbiAgICB0aGlzLl92ZXJ0aWNpZXNPZmZzZXQgPSBvZmZzZXQ7XG4gICAgdGhpcy5uYW1lID0gbWF0ZXJpYWxEYXRhLm1hdGVyaWFsTmFtZTtcbiAgICB0aGlzLmN1bGxFbmFibGVkID0gISgobWF0ZXJpYWxEYXRhLmRyYXdGbGFnICYgMHgwMSkgPiAwKTsgLy8gZWFjaCBzaWRlIGRyYXcgZmxhZ1xuICAgIHRoaXMuX2FtYmllbnQgPSBuZXcgQ29sb3IzKG1hdGVyaWFsRGF0YS5hbWJpZW50WzBdLCBtYXRlcmlhbERhdGEuYW1iaWVudFsxXSwgbWF0ZXJpYWxEYXRhLmFtYmllbnRbMl0pO1xuICAgIHRoaXMuX2RpZmZ1c2UgPSBuZXcgQ29sb3I0KG1hdGVyaWFsRGF0YS5kaWZmdXNlWzBdLCBtYXRlcmlhbERhdGEuZGlmZnVzZVsxXSwgbWF0ZXJpYWxEYXRhLmRpZmZ1c2VbMl0sIG1hdGVyaWFsRGF0YS5kaWZmdXNlWzNdKTtcbiAgICBpZiAoKG1hdGVyaWFsRGF0YS5kcmF3RmxhZyAmIDB4MTApID4gMCkge1xuICAgICAgdGhpcy5lZGdlQ29sb3IgPSBuZXcgQ29sb3I0KG1hdGVyaWFsRGF0YS5lZGdlQ29sb3JbMF0sIG1hdGVyaWFsRGF0YS5lZGdlQ29sb3JbMV0sIG1hdGVyaWFsRGF0YS5lZGdlQ29sb3JbMl0sIG1hdGVyaWFsRGF0YS5lZGdlQ29sb3JbM10pO1xuICAgIH1cbiAgICB0aGlzLl9zcGVjdWxhciA9IG5ldyBWZWN0b3I0KG1hdGVyaWFsRGF0YS5zcGVjdWxhcik7XG4gICAgdGhpcy5fZWRnZVNpemUgPSBtYXRlcmlhbERhdGEuZWRnZVNpemU7XG4gICAgdGhpcy5fc3BoZXJlTW9kZSA9IG1hdGVyaWFsRGF0YS5zcGhlcmVNb2RlO1xuICAgIHRoaXMuX19pbm5lck1hdGVyaWFsID0gbmV3IEJhc2ljTWF0ZXJpYWwocmVxdWlyZShcIi4uLy4uL01hdGVyaWFscy9Gb3J3YXJkLmh0bWxcIikpO1xuICAgIGNvbnN0IHRtID0gdGhpcy5fcGFyZW50TW9kZWwucG14VGV4dHVyZU1hbmFnZXI7XG4gICAgdG0ubG9hZFRleHR1cmUobWF0ZXJpYWxEYXRhLnNwaGVyZVRleHR1cmVJbmRleCkudGhlbigodGV4dHVyZSkgPT4ge1xuICAgICAgdGhpcy5fc3BoZXJlID0gdGV4dHVyZTtcbiAgICB9KTtcbiAgICB0bS5sb2FkVGV4dHVyZShtYXRlcmlhbERhdGEudGV4dHVyZUluZGV4KS50aGVuKCh0ZXh0dXJlKSA9PiB7XG4gICAgICB0aGlzLl90ZXh0dXJlID0gdGV4dHVyZTtcbiAgICB9KTtcbiAgICBpZiAobWF0ZXJpYWxEYXRhLnNoYXJlZFRvb25GbGFnID09PSAwKSB7IC8vIG5vdCBzaGFyZWQgdGV4dHVyZVxuICAgICAgdG0ubG9hZFRleHR1cmUobWF0ZXJpYWxEYXRhLnRhcmdldFRvb25JbmRleCkudGhlbigodGV4dHVyZSkgPT4ge1xuICAgICAgICB0aGlzLl90b29uID0gdGV4dHVyZTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl90b29uID0gdGhpcy5fbG9hZFNoYXJlZFRleHR1cmUobWF0ZXJpYWxEYXRhLnRhcmdldFRvb25JbmRleCk7XG4gICAgfVxuICAgIHRoaXMuX19pbm5lck1hdGVyaWFsLm9uKFwiY29uZmlndXJlXCIsICh2OiBJQ29uZmlndXJlRXZlbnRBcmdzKSA9PiB7XG4gICAgICBpZiAodi5wYXNzSW5kZXggPT09IDApIHtcbiAgICAgICAgdi5jb25maWd1cmUuY3VsbE9yaWVudGF0aW9uID0gdGhpcy5jdWxsRW5hYmxlZCA/IFwiQkFDS1wiIDogXCJOT05FXCI7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5fX2lubmVyTWF0ZXJpYWwub24oXCJyZWFkeVwiLCAoKSA9PiB7XG4gICAgICB0aGlzLl9fc2V0TG9hZGVkKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ291bnQgb2YgdmVydGljaWVzXG4gICAqL1xuICBwdWJsaWMgZ2V0IFZlcnRpY2llc0NvdW50KCkge1xuICAgIHJldHVybiB0aGlzLl92ZXJ0aWNpZXNDb3VudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBPZmZzZXQgb2YgdmVydGljaWVzIGluIGluZGV4IGJ1ZmZlclxuICAgKi9cbiAgcHVibGljIGdldCBWZXJ0aWNpZXNPZmZzZXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZlcnRpY2llc09mZnNldDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgUGFyZW50TW9kZWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3BhcmVudE1vZGVsO1xuICB9XG5cbiAgcHVibGljIGdldCBEaWZmdXNlKCk6IENvbG9yNCB7XG4gICAgcmV0dXJuIHRoaXMuX2RpZmZ1c2U7XG4gIH1cblxuICBwdWJsaWMgZ2V0IFRleHR1cmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RleHR1cmU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IFNwaGVyZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc3BoZXJlO1xuICB9XG5cblxuICBwdWJsaWMgZ2V0IFNwaGVyZU1vZGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NwaGVyZU1vZGU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IFNwZWN1bGFyKCkge1xuICAgIHJldHVybiB0aGlzLl9zcGVjdWxhcjtcbiAgfVxuXG4gIHB1YmxpYyBnZXRQYXNzQ291bnQodGVjaG5pcXVlSW5kZXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZWRnZUNvbG9yID09IG51bGwgPyAxIDogMjtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgU2VsZlNoYWRvdygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKHRoaXMuX3BteERhdGEuTWF0ZXJpYWxzW3RoaXMubWF0ZXJpYWxJbmRleF0uZHJhd0ZsYWcgJiAweDA0KSA+IDA7XG4gIH1cblxuICBwdWJsaWMgYXBwbHkobWF0QXJnOiBJQXBwbHlNYXRlcmlhbEFyZ3VtZW50KTogdm9pZCB7XG4gICAgY29uc3Qgc2tlbGV0b24gPSB0aGlzLl9wYXJlbnRNb2RlbC5za2VsZXRvbjtcbiAgICBpZiAobWF0QXJnLnBhc3NJbmRleCA9PT0gMSkge1xuICAgICAgdGhpcy5fX2lubmVyTWF0ZXJpYWwubWF0ZXJpYWxWYXJpYWJsZXMgPSB7XG4gICAgICAgIGJvbmVDb3VudDogc2tlbGV0b24uQm9uZUNvdW50LFxuICAgICAgICBib25lTWF0cmljaWVzVGV4dHVyZTogc2tlbGV0b24uTWF0cml4VGV4dHVyZSxcbiAgICAgICAgZWRnZVNpemU6IFBteE1hdGVyaWFsTW9ycGhQYXJhbUNvbnRhaW5lci5jYWxjTW9ycGhlZFNpbmdsZVZhbHVlKHRoaXMuX2VkZ2VTaXplLCB0aGlzLmFkZE1vcnBoUGFyYW0sIHRoaXMubXVsTW9ycGhQYXJhbSwgKHQpID0+IHQuZWRnZVNpemUpLFxuICAgICAgICBlZGdlQ29sb3I6IFBteE1hdGVyaWFsTW9ycGhQYXJhbUNvbnRhaW5lci5jYWxjTW9ycGhlZFZlY3RvclZhbHVlKHRoaXMuZWRnZUNvbG9yLnRvVmVjdG9yKCksIHRoaXMuYWRkTW9ycGhQYXJhbSwgdGhpcy5tdWxNb3JwaFBhcmFtLCAodCkgPT4gdC5lZGdlQ29sb3IsIDQpXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9faW5uZXJNYXRlcmlhbC5tYXRlcmlhbFZhcmlhYmxlcyA9IHtcbiAgICAgICAgYm9uZUNvdW50OiBza2VsZXRvbi5Cb25lQ291bnQsXG4gICAgICAgIGJvbmVNYXRyaWNpZXNUZXh0dXJlOiBza2VsZXRvbi5NYXRyaXhUZXh0dXJlLFxuICAgICAgICB0ZXh0dXJlOiB0aGlzLl90ZXh0dXJlLFxuICAgICAgICB0b29uOiB0aGlzLl90b29uLFxuICAgICAgICBzcGhlcmU6IHRoaXMuX3NwaGVyZSxcbiAgICAgICAgZGlmZnVzZTogdGhpcy5fZGlmZnVzZS50b1ZlY3RvcigpLFxuICAgICAgICBzcGVjdWxhcjogdGhpcy5fc3BlY3VsYXIsXG4gICAgICAgIGFtYmllbnQ6IHRoaXMuX2FtYmllbnQudG9WZWN0b3IoKSxcbiAgICAgICAgdGV4dHVyZVVzZWQ6ICF0aGlzLl90ZXh0dXJlID8gMCA6IDEsXG4gICAgICAgIHNwaGVyZU1vZGU6ICF0aGlzLl9zcGhlcmUgPyAwIDogdGhpcy5fc3BoZXJlTW9kZSxcbiAgICAgICAgdG9vbkZsYWc6ICF0aGlzLl90b29uID8gMCA6IDEsXG4gICAgICAgIGFkZFRleENvZWZmOiBuZXcgVmVjdG9yNCh0aGlzLmFkZE1vcnBoUGFyYW0udGV4dHVyZUNvZWZmKSxcbiAgICAgICAgbXVsVGV4Q29lZmY6IG5ldyBWZWN0b3I0KHRoaXMubXVsTW9ycGhQYXJhbS50ZXh0dXJlQ29lZmYpLFxuICAgICAgICBhZGRTcGhlcmVDb2VmZjogbmV3IFZlY3RvcjQodGhpcy5hZGRNb3JwaFBhcmFtLnNwaGVyZUNvZWZmKSxcbiAgICAgICAgbXVsU3BoZXJlQ29lZmY6IG5ldyBWZWN0b3I0KHRoaXMubXVsTW9ycGhQYXJhbS5zcGhlcmVDb2VmZiksXG4gICAgICAgIGFkZFRvb25Db2VmZjogbmV3IFZlY3RvcjQodGhpcy5hZGRNb3JwaFBhcmFtLnRvb25Db2VmZiksXG4gICAgICAgIG11bFRvb25Db2VmZjogbmV3IFZlY3RvcjQodGhpcy5tdWxNb3JwaFBhcmFtLnRvb25Db2VmZiksXG4gICAgICAgIGFtYmllbnRDb2VmZmljaWVudDogbWF0QXJnLnNjZW5lLnNjZW5lQW1iaWVudC50b1ZlY3RvcigpXG4gICAgICB9O1xuICAgIH1cbiAgICB0aGlzLl9faW5uZXJNYXRlcmlhbC5hcHBseShtYXRBcmcpO1xuICB9XG5cbiAgcHVibGljIGdldCBQcmlvcnR5KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIDEwMCArIHRoaXMubWF0ZXJpYWxJbmRleDtcbiAgfVxuXG4gIHB1YmxpYyBnZXREcmF3R2VvbWV0cnlMZW5ndGgoZ2VvOiBHZW9tZXRyeSk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2RpZmZ1c2UuQSA+IDAgPyB0aGlzLlZlcnRpY2llc0NvdW50IDogMDtcbiAgfVxuXG4gIHB1YmxpYyBnZXREcmF3R2VvbWV0cnlPZmZzZXQoZ2VvOiBHZW9tZXRyeSk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuVmVydGljaWVzT2Zmc2V0ICogNDtcbiAgfVxuXG4gIHByaXZhdGUgX2xvYWRTaGFyZWRUZXh0dXJlKGluZGV4OiBudW1iZXIpOiBUZXh0dXJlIHtcbiAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3Qgcm0gPSBKVGhyZWVDb250ZXh0LmdldENvbnRleHRDb21wb25lbnQ8UmVzb3VyY2VNYW5hZ2VyPihDb250ZXh0Q29tcG9uZW50cy5SZXNvdXJjZU1hbmFnZXIpO1xuICAgIGNvbnN0IHJlc05hbWUgPSBcImp0aHJlZS5wbXguc2hhcmVkdG9vbi5cIiArIGluZGV4O1xuICAgIGlmIChybS5nZXRUZXh0dXJlKHJlc05hbWUpKSB7XG4gICAgICByZXR1cm4gPFRleHR1cmU+cm0uZ2V0VGV4dHVyZShyZXNOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdGV4ID0gcm0uY3JlYXRlVGV4dHVyZVdpdGhTb3VyY2UocmVzTmFtZSwgdGhpcy5fcGFyZW50TW9kZWwucG14VGV4dHVyZU1hbmFnZXIuZ2VuZXJhdGVTaGFyZWRUb29uSW1nKGluZGV4KSk7XG4gICAgICByZXR1cm4gdGV4O1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQTVhNYXRlcmlhbDtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
