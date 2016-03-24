import PMXBone from "./PMXBone";
import ContextComponents from "../../ContextComponents";
import JThreeContext from "../../JThreeContext";
class PMXSkeleton {
    constructor(model) {
        this._rootBones = [];
        this._boneDictionary = {};
        model.skeleton = this;
        const bones = model.ModelData.Bones;
        this._bones = new Array(model.ModelData.Bones.length);
        this._bonesInTransformOrder = new Array(model.ModelData.Bones.length);
        this._matricies = new Float32Array(model.ModelData.Bones.length * 16);
        for (let i = 0; i < bones.length; i++) {
            const bone = bones[i];
            const pmxBone = new PMXBone(model, this, i);
            if (bone.parentBoneIndex === -1) {
                this._rootBones.push(pmxBone);
            }
            this._bonesInTransformOrder[i] = this._bones[i] = pmxBone;
            this._boneDictionary[bone.boneName] = pmxBone;
        }
        this._bones.forEach((v) => v.boneDictionaryConstructed());
        this._bonesInTransformOrder.sort((a, b) => a.OrderCriteria - b.OrderCriteria);
        this._matrixTexture = JThreeContext.getContextComponent(ContextComponents.ResourceManager).createTexture("jthree.pmx.bonetransform" + model.ID, 4, this._bones.length, WebGLRenderingContext.RGBA, WebGLRenderingContext.FLOAT);
    }
    get MatrixTexture() {
        return this._matrixTexture;
    }
    get BoneCount() {
        return this._bones.length;
    }
    getBoneByName(name) {
        return this._boneDictionary[name];
    }
    getBoneByIndex(index) {
        return this._bones[index];
    }
    updateMatricies() {
        this.updateBoneTransforms();
        for (let i = 0; i < this._bones.length; i++) {
            this._bones[i].applyMatrixToBuffer(this._matricies);
        }
        this._matrixTexture.updateTexture(this._matricies);
    }
    updateBoneTransforms() {
        // this.rootBones.forEach(v=>v.callRecursive(l=>{
        // 	if(l["updateBoneTransform"])(<PMXBone>l).updateBoneTransform();
        // }));
        this._bonesInTransformOrder.forEach(v => (v.updateBoneTransform()));
    }
    structureToString() {
        let result = "";
        this._rootBones.forEach(v => result += v.structureToString(0));
        return result;
    }
}
export default PMXSkeleton;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBNWC9Db3JlL1BNWFNrZWxldG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJPQUNPLE9BQU8sTUFBTSxXQUFXO09BRXhCLGlCQUFpQixNQUFNLHlCQUF5QjtPQUNoRCxhQUFhLE1BQU0scUJBQXFCO0FBRy9DO0lBY0UsWUFBWSxLQUFlO1FBWm5CLGVBQVUsR0FBYyxFQUFFLENBQUM7UUFNM0Isb0JBQWUsR0FBb0MsRUFBRSxDQUFDO1FBTzVELEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3RFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3RDLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QixNQUFNLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzVDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNoQyxDQUFDO1lBQ0QsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDO1lBQzFELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLE9BQU8sQ0FBQztRQUNoRCxDQUFDO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLHlCQUF5QixFQUFFLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM5RSxJQUFJLENBQUMsY0FBYyxHQUFrQixhQUFhLENBQUMsbUJBQW1CLENBQWtCLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxDQUFDLGFBQWEsQ0FBQywwQkFBMEIsR0FBRyxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbFEsQ0FBQztJQUVELElBQVcsYUFBYTtRQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUM3QixDQUFDO0lBRUQsSUFBVyxTQUFTO1FBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUM1QixDQUFDO0lBRU0sYUFBYSxDQUFDLElBQVk7UUFDL0IsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVNLGNBQWMsQ0FBQyxLQUFhO1FBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFTSxlQUFlO1FBQ3BCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQzVCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN0RCxDQUFDO1FBQ0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFTSxvQkFBb0I7UUFDekIsaURBQWlEO1FBQ2pELG1FQUFtRTtRQUNuRSxPQUFPO1FBQ1AsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVNLGlCQUFpQjtRQUN0QixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLE1BQU0sSUFBSSxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvRCxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2hCLENBQUM7QUFDSCxDQUFDO0FBRUQsZUFBZSxXQUFXLENBQUMiLCJmaWxlIjoiUE1YL0NvcmUvUE1YU2tlbGV0b24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUE1YTW9kZWwgZnJvbSBcIi4vUE1YTW9kZWxcIjtcbmltcG9ydCBQTVhCb25lIGZyb20gXCIuL1BNWEJvbmVcIjtcbmltcG9ydCBUZXh0dXJlQnVmZmVyIGZyb20gXCIuLi8uLi9Db3JlL1Jlc291cmNlcy9UZXh0dXJlL0J1ZmZlclRleHR1cmVcIjtcbmltcG9ydCBDb250ZXh0Q29tcG9uZW50cyBmcm9tIFwiLi4vLi4vQ29udGV4dENvbXBvbmVudHNcIjtcbmltcG9ydCBKVGhyZWVDb250ZXh0IGZyb20gXCIuLi8uLi9KVGhyZWVDb250ZXh0XCI7XG5pbXBvcnQgUmVzb3VyY2VNYW5hZ2VyIGZyb20gXCIuLi8uLi9Db3JlL1Jlc291cmNlTWFuYWdlclwiO1xuXG5jbGFzcyBQTVhTa2VsZXRvbiB7XG5cbiAgcHJpdmF0ZSBfcm9vdEJvbmVzOiBQTVhCb25lW10gPSBbXTtcblxuICBwcml2YXRlIF9ib25lczogUE1YQm9uZVtdO1xuXG4gIHByaXZhdGUgX2JvbmVzSW5UcmFuc2Zvcm1PcmRlcjogUE1YQm9uZVtdO1xuXG4gIHByaXZhdGUgX2JvbmVEaWN0aW9uYXJ5OiB7IFtib25lTmFtZTogc3RyaW5nXTogUE1YQm9uZSB9ID0ge307XG5cbiAgcHJpdmF0ZSBfbWF0cmljaWVzOiBGbG9hdDMyQXJyYXk7XG5cbiAgcHJpdmF0ZSBfbWF0cml4VGV4dHVyZTogVGV4dHVyZUJ1ZmZlcjtcblxuICBjb25zdHJ1Y3Rvcihtb2RlbDogUE1YTW9kZWwpIHtcbiAgICBtb2RlbC5za2VsZXRvbiA9IHRoaXM7XG4gICAgY29uc3QgYm9uZXMgPSBtb2RlbC5Nb2RlbERhdGEuQm9uZXM7XG4gICAgdGhpcy5fYm9uZXMgPSBuZXcgQXJyYXkobW9kZWwuTW9kZWxEYXRhLkJvbmVzLmxlbmd0aCk7XG4gICAgdGhpcy5fYm9uZXNJblRyYW5zZm9ybU9yZGVyID0gbmV3IEFycmF5KG1vZGVsLk1vZGVsRGF0YS5Cb25lcy5sZW5ndGgpO1xuICAgIHRoaXMuX21hdHJpY2llcyA9IG5ldyBGbG9hdDMyQXJyYXkobW9kZWwuTW9kZWxEYXRhLkJvbmVzLmxlbmd0aCAqIDE2KTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJvbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBib25lID0gYm9uZXNbaV07XG4gICAgICBjb25zdCBwbXhCb25lID0gbmV3IFBNWEJvbmUobW9kZWwsIHRoaXMsIGkpO1xuICAgICAgaWYgKGJvbmUucGFyZW50Qm9uZUluZGV4ID09PSAtMSkge1xuICAgICAgICB0aGlzLl9yb290Qm9uZXMucHVzaChwbXhCb25lKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2JvbmVzSW5UcmFuc2Zvcm1PcmRlcltpXSA9IHRoaXMuX2JvbmVzW2ldID0gcG14Qm9uZTtcbiAgICAgIHRoaXMuX2JvbmVEaWN0aW9uYXJ5W2JvbmUuYm9uZU5hbWVdID0gcG14Qm9uZTtcbiAgICB9XG4gICAgdGhpcy5fYm9uZXMuZm9yRWFjaCgodikgPT4gdi5ib25lRGljdGlvbmFyeUNvbnN0cnVjdGVkKCkpO1xuICAgIHRoaXMuX2JvbmVzSW5UcmFuc2Zvcm1PcmRlci5zb3J0KChhLCBiKSA9PiBhLk9yZGVyQ3JpdGVyaWEgLSBiLk9yZGVyQ3JpdGVyaWEpO1xuICAgIHRoaXMuX21hdHJpeFRleHR1cmUgPSA8VGV4dHVyZUJ1ZmZlcj5KVGhyZWVDb250ZXh0LmdldENvbnRleHRDb21wb25lbnQ8UmVzb3VyY2VNYW5hZ2VyPihDb250ZXh0Q29tcG9uZW50cy5SZXNvdXJjZU1hbmFnZXIpLmNyZWF0ZVRleHR1cmUoXCJqdGhyZWUucG14LmJvbmV0cmFuc2Zvcm1cIiArIG1vZGVsLklELCA0LCB0aGlzLl9ib25lcy5sZW5ndGgsIFdlYkdMUmVuZGVyaW5nQ29udGV4dC5SR0JBLCBXZWJHTFJlbmRlcmluZ0NvbnRleHQuRkxPQVQpO1xuICB9XG5cbiAgcHVibGljIGdldCBNYXRyaXhUZXh0dXJlKCkge1xuICAgIHJldHVybiB0aGlzLl9tYXRyaXhUZXh0dXJlO1xuICB9XG5cbiAgcHVibGljIGdldCBCb25lQ291bnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2JvbmVzLmxlbmd0aDtcbiAgfVxuXG4gIHB1YmxpYyBnZXRCb25lQnlOYW1lKG5hbWU6IHN0cmluZyk6IFBNWEJvbmUge1xuICAgIHJldHVybiB0aGlzLl9ib25lRGljdGlvbmFyeVtuYW1lXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRCb25lQnlJbmRleChpbmRleDogbnVtYmVyKTogUE1YQm9uZSB7XG4gICAgcmV0dXJuIHRoaXMuX2JvbmVzW2luZGV4XTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVNYXRyaWNpZXMoKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGVCb25lVHJhbnNmb3JtcygpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fYm9uZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuX2JvbmVzW2ldLmFwcGx5TWF0cml4VG9CdWZmZXIodGhpcy5fbWF0cmljaWVzKTtcbiAgICB9XG4gICAgdGhpcy5fbWF0cml4VGV4dHVyZS51cGRhdGVUZXh0dXJlKHRoaXMuX21hdHJpY2llcyk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlQm9uZVRyYW5zZm9ybXMoKTogdm9pZCB7XG4gICAgLy8gdGhpcy5yb290Qm9uZXMuZm9yRWFjaCh2PT52LmNhbGxSZWN1cnNpdmUobD0+e1xuICAgIC8vIFx0aWYobFtcInVwZGF0ZUJvbmVUcmFuc2Zvcm1cIl0pKDxQTVhCb25lPmwpLnVwZGF0ZUJvbmVUcmFuc2Zvcm0oKTtcbiAgICAvLyB9KSk7XG4gICAgdGhpcy5fYm9uZXNJblRyYW5zZm9ybU9yZGVyLmZvckVhY2godiA9PiAodi51cGRhdGVCb25lVHJhbnNmb3JtKCkpKTtcbiAgfVxuXG4gIHB1YmxpYyBzdHJ1Y3R1cmVUb1N0cmluZygpOiBzdHJpbmcge1xuICAgIGxldCByZXN1bHQgPSBcIlwiO1xuICAgIHRoaXMuX3Jvb3RCb25lcy5mb3JFYWNoKHYgPT4gcmVzdWx0ICs9IHYuc3RydWN0dXJlVG9TdHJpbmcoMCkpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUE1YU2tlbGV0b247XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
