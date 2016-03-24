import ResourceWrapper from "../ResourceWrapper";
class ProgramWrapper extends ResourceWrapper {
    constructor(parent, canvas) {
        super(canvas);
        this._islinked = false;
        this._targetProgram = null;
        this._parentProgram = null;
        this._attributeLocations = {};
        this._uniformLocations = {};
        this._parentProgram = parent;
    }
    get TargetProgram() {
        return this._targetProgram;
    }
    init() {
        if (!this.Initialized) {
            this._targetProgram = this.GL.createProgram();
            this._parentProgram.AttachedShaders.forEach((v, i, a) => {
                this.GL.attachShader(this._targetProgram, v.getForContextID(this.OwnerID).TargetShader);
            });
            this.__setInitialized();
        }
    }
    dispose() {
        if (this.Initialized) {
            this.GL.deleteProgram(this._targetProgram);
            this.__setInitialized(false);
            this._targetProgram = null;
            this._islinked = false;
        }
    }
    linkProgram() {
        if (!this._islinked) {
            this.GL.linkProgram(this._targetProgram);
            if (!this.GL.getProgramParameter(this._targetProgram, this.GL.LINK_STATUS)) {
                console.error(`LINK ERROR:${this.GL.getProgramInfoLog(this._targetProgram)}`);
            }
            this._islinked = true;
        }
    }
    useProgram() {
        if (!this.Initialized) {
            this.init();
        }
        if (!this._islinked) {
            this.linkProgram();
        }
        this.GL.useProgram(this._targetProgram);
    }
    uniformExists(valName) {
        this.useProgram();
        return this._fetchUniformLocation(valName) !== -1;
    }
    /**
     * Relink shader for shader source changing
     */
    relink() {
        this.GL.deleteProgram(this.TargetProgram);
        this._targetProgram = this.GL.createProgram();
        this._parentProgram.AttachedShaders.forEach((v, i, a) => {
            this.GL.attachShader(this._targetProgram, v.getForContextID(this.OwnerID).TargetShader);
        });
    }
    /**
     * Assign attribute variable. This method requires that this related program was already used.
     * @param {string} variableName variable name to be assigned buffer
     * @param {Buffer} buffer       actual variable buffer to be assigned
     */
    assignAttributeVariable(variableName, buffer) {
        const attribIndex = this._fetchAttributeLocation(variableName);
        if (attribIndex < 0) {
            return;
        } // When the variable was not found
        const bufWrapper = buffer.getForContext(this.OwnerCanvas);
        bufWrapper.bindBuffer();
        this.GL.vertexAttribPointer(attribIndex, buffer.UnitCount, buffer.ElementType, buffer.Normalized, buffer.Stride, buffer.Offset);
    }
    uniformMatrixArrayFromBuffer(variableName, buffer) {
        const location = this._fetchUniformLocation(variableName);
        if (!location) {
            return;
        }
        this.GL.uniform4fv(location, buffer);
    }
    uniformMatrixArray(variableName, matArray) {
        const location = this._fetchUniformLocation(variableName);
        if (!location) {
            return;
        }
        this.GL.uniform4fv(location, matArray.rawElements);
    }
    uniformMatrix(variableName, mat) {
        const location = this._fetchUniformLocation(variableName);
        if (!location) {
            return;
        }
        this.GL.uniformMatrix4fv(location, false, mat.rawElements);
    }
    uniformVector(variableName, vec) {
        const location = this._fetchUniformLocation(variableName);
        if (!location) {
            return;
        }
        const rawVector = vec.rawElements;
        switch (vec.ElementCount) {
            case 2:
                this.GL.uniform2f(location, rawVector[0], rawVector[1]);
                return;
            case 3:
                this.GL.uniform3f(location, rawVector[0], rawVector[1], rawVector[2]);
                return;
            case 4:
                this.GL.uniform4f(location, rawVector[0], rawVector[1], rawVector[2], rawVector[3]);
                return;
            default:
                console.error("Unexpected element count of vector!");
        }
    }
    uniformVectorArray(variableName, vectors) {
        const location = this._fetchUniformLocation(variableName);
        if (!location) {
            return;
        }
        switch (vectors.dimension) {
            case 2:
                this.GL.uniform2fv(location, new Float32Array(vectors.rawElements));
                return;
            case 3:
                this.GL.uniform3fv(location, new Float32Array(vectors.rawElements));
                return;
            case 4:
                this.GL.uniform4fv(location, new Float32Array(vectors.rawElements));
                return;
            default:
                console.error("Unexpected element count of vector!");
        }
    }
    uniformFloat(variableName, val) {
        const location = this._fetchUniformLocation(variableName);
        if (!location) {
            return;
        }
        this.GL.uniform1f(location, val);
    }
    uniformFloatArray(variableName, val) {
        const location = this._fetchUniformLocation(variableName);
        if (!location) {
            return;
        }
        this.GL.uniform1fv(location, new Float32Array(val));
    }
    uniformInt(variableName, val) {
        const location = this._fetchUniformLocation(variableName);
        if (!location) {
            return;
        }
        this.GL.uniform1i(location, val);
    }
    uniformIntArray(variableName, val) {
        const location = this._fetchUniformLocation(variableName);
        if (!location) {
            return;
        }
        this.GL.uniform1iv(location, new Int32Array(val));
    }
    uniformSampler(variableName, tex, texRegister) {
        const location = this._fetchUniformLocation(variableName);
        const texWrapper = tex.getForContext(this.OwnerCanvas);
        if (!location) {
            return -1;
        }
        if (texWrapper.Initialized) {
            if (texWrapper.registerTexture(texRegister)) {
                this.GL.uniform1i(location, texRegister);
            }
        }
    }
    _fetchUniformLocation(valName) {
        if (!this._uniformLocations[valName]) {
            this._uniformLocations[valName] = this.GL.getUniformLocation(this.TargetProgram, valName);
        }
        return this._uniformLocations[valName];
    }
    _fetchAttributeLocation(valName) {
        if (!this._attributeLocations[valName]) {
            this._attributeLocations[valName] = this.GL.getAttribLocation(this.TargetProgram, valName);
            if (this._attributeLocations[valName] >= 0) {
                this.GL.enableVertexAttribArray(this._attributeLocations[valName]);
            }
        }
        return this._attributeLocations[valName];
    }
}
export default ProgramWrapper;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvcmUvUmVzb3VyY2VzL1Byb2dyYW0vUHJvZ3JhbVdyYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ik9BT08sZUFBZSxNQUFNLG9CQUFvQjtBQUVoRCw2QkFBNkIsZUFBZTtJQUMxQyxZQUFZLE1BQWUsRUFBRSxNQUFjO1FBQ3pDLE1BQU0sTUFBTSxDQUFDLENBQUM7UUFJUixjQUFTLEdBQVksS0FBSyxDQUFDO1FBRTNCLG1CQUFjLEdBQWlCLElBQUksQ0FBQztRQUVwQyxtQkFBYyxHQUFZLElBQUksQ0FBQztRQUUvQix3QkFBbUIsR0FBOEIsRUFBRSxDQUFDO1FBRXBELHNCQUFpQixHQUE0QyxFQUFFLENBQUM7UUFYdEUsSUFBSSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUM7SUFDL0IsQ0FBQztJQVlELElBQVcsYUFBYTtRQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUM3QixDQUFDO0lBRU0sSUFBSTtRQUNULEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQzlDLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztnQkFDbEQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMxRixDQUFDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQzFCLENBQUM7SUFDSCxDQUFDO0lBRU0sT0FBTztRQUNaLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxF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O1lBQzNDLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUVPLHFCQUFxQixDQUFDLE9BQWU7UUFDM0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDNUYsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVPLHVCQUF1QixDQUFDLE9BQWU7UUFDN0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDM0YsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxFQUFFLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDckUsQ0FBQztRQUNILENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzNDLENBQUM7QUFDSCxDQUFDO0FBRUQsZUFBZSxjQUFjLENBQUMiLCJmaWxlIjoiQ29yZS9SZXNvdXJjZXMvUHJvZ3JhbS9Qcm9ncmFtV3JhcHBlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNYXRyaXhBcnJheSBmcm9tIFwiLi4vLi4vLi4vTWF0aC9NYXRyaXhBcnJheVwiO1xuaW1wb3J0IFZlY3RvckFycmF5IGZyb20gXCIuLi8uLi8uLi9NYXRoL1ZlY3RvckFycmF5XCI7XG5pbXBvcnQgVGV4dHVyZUJhc2UgZnJvbSBcIi4uL1RleHR1cmUvVGV4dHVyZUJhc2VcIjtcbmltcG9ydCBWZWN0b3JCYXNlIGZyb20gXCIuLi8uLi8uLi9NYXRoL1ZlY3RvckJhc2VcIjtcbmltcG9ydCBNYXRyaXggZnJvbSBcIi4uLy4uLy4uL01hdGgvTWF0cml4XCI7XG5pbXBvcnQgUHJvZ3JhbSBmcm9tIFwiLi9Qcm9ncmFtXCI7XG5pbXBvcnQgQ2FudmFzIGZyb20gXCIuLi8uLi9DYW52YXMvQ2FudmFzXCI7XG5pbXBvcnQgUmVzb3VyY2VXcmFwcGVyIGZyb20gXCIuLi9SZXNvdXJjZVdyYXBwZXJcIjtcbmltcG9ydCBCdWZmZXIgZnJvbSBcIi4uL0J1ZmZlci9CdWZmZXJcIjtcbmNsYXNzIFByb2dyYW1XcmFwcGVyIGV4dGVuZHMgUmVzb3VyY2VXcmFwcGVyIHtcbiAgY29uc3RydWN0b3IocGFyZW50OiBQcm9ncmFtLCBjYW52YXM6IENhbnZhcykge1xuICAgIHN1cGVyKGNhbnZhcyk7XG4gICAgdGhpcy5fcGFyZW50UHJvZ3JhbSA9IHBhcmVudDtcbiAgfVxuXG4gIHByaXZhdGUgX2lzbGlua2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBfdGFyZ2V0UHJvZ3JhbTogV2ViR0xQcm9ncmFtID0gbnVsbDtcblxuICBwcml2YXRlIF9wYXJlbnRQcm9ncmFtOiBQcm9ncmFtID0gbnVsbDtcblxuICBwcml2YXRlIF9hdHRyaWJ1dGVMb2NhdGlvbnM6IHsgW2tleTogc3RyaW5nXTogbnVtYmVyIH0gPSB7fTtcblxuICBwcml2YXRlIF91bmlmb3JtTG9jYXRpb25zOiB7IFtrZXk6IHN0cmluZ106IFdlYkdMVW5pZm9ybUxvY2F0aW9uIH0gPSB7fTtcblxuICBwdWJsaWMgZ2V0IFRhcmdldFByb2dyYW0oKTogV2ViR0xQcm9ncmFtIHtcbiAgICByZXR1cm4gdGhpcy5fdGFyZ2V0UHJvZ3JhbTtcbiAgfVxuXG4gIHB1YmxpYyBpbml0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5Jbml0aWFsaXplZCkge1xuICAgICAgdGhpcy5fdGFyZ2V0UHJvZ3JhbSA9IHRoaXMuR0wuY3JlYXRlUHJvZ3JhbSgpO1xuICAgICAgdGhpcy5fcGFyZW50UHJvZ3JhbS5BdHRhY2hlZFNoYWRlcnMuZm9yRWFjaCgodiwgaSwgYSkgPT4ge1xuICAgICAgICB0aGlzLkdMLmF0dGFjaFNoYWRlcih0aGlzLl90YXJnZXRQcm9ncmFtLCB2LmdldEZvckNvbnRleHRJRCh0aGlzLk93bmVySUQpLlRhcmdldFNoYWRlcik7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuX19zZXRJbml0aWFsaXplZCgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLkluaXRpYWxpemVkKSB7XG4gICAgICB0aGlzLkdMLmRlbGV0ZVByb2dyYW0odGhpcy5fdGFyZ2V0UHJvZ3JhbSk7XG4gICAgICB0aGlzLl9fc2V0SW5pdGlhbGl6ZWQoZmFsc2UpO1xuICAgICAgdGhpcy5fdGFyZ2V0UHJvZ3JhbSA9IG51bGw7XG4gICAgICB0aGlzLl9pc2xpbmtlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBsaW5rUHJvZ3JhbSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2lzbGlua2VkKSB7XG4gICAgICB0aGlzLkdMLmxpbmtQcm9ncmFtKHRoaXMuX3RhcmdldFByb2dyYW0pO1xuICAgICAgaWYgKCF0aGlzLkdMLmdldFByb2dyYW1QYXJhbWV0ZXIodGhpcy5fdGFyZ2V0UHJvZ3JhbSwgdGhpcy5HTC5MSU5LX1NUQVRVUykpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgTElOSyBFUlJPUjoke3RoaXMuR0wuZ2V0UHJvZ3JhbUluZm9Mb2codGhpcy5fdGFyZ2V0UHJvZ3JhbSkgfWApO1xuICAgICAgfVxuICAgICAgdGhpcy5faXNsaW5rZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB1c2VQcm9ncmFtKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5Jbml0aWFsaXplZCkge1xuICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuICAgIGlmICghdGhpcy5faXNsaW5rZWQpIHtcbiAgICAgIHRoaXMubGlua1Byb2dyYW0oKTtcbiAgICB9XG4gICAgdGhpcy5HTC51c2VQcm9ncmFtKHRoaXMuX3RhcmdldFByb2dyYW0pO1xuICB9XG5cbiAgcHVibGljIHVuaWZvcm1FeGlzdHModmFsTmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgdGhpcy51c2VQcm9ncmFtKCk7XG4gICAgcmV0dXJuIHRoaXMuX2ZldGNoVW5pZm9ybUxvY2F0aW9uKHZhbE5hbWUpICE9PSAtMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWxpbmsgc2hhZGVyIGZvciBzaGFkZXIgc291cmNlIGNoYW5naW5nXG4gICAqL1xuICBwdWJsaWMgcmVsaW5rKCk6IHZvaWQge1xuICAgIHRoaXMuR0wuZGVsZXRlUHJvZ3JhbSh0aGlzLlRhcmdldFByb2dyYW0pO1xuICAgIHRoaXMuX3RhcmdldFByb2dyYW0gPSB0aGlzLkdMLmNyZWF0ZVByb2dyYW0oKTtcbiAgICB0aGlzLl9wYXJlbnRQcm9ncmFtLkF0dGFjaGVkU2hhZGVycy5mb3JFYWNoKCh2LCBpLCBhKSA9PiB7XG4gICAgICB0aGlzLkdMLmF0dGFjaFNoYWRlcih0aGlzLl90YXJnZXRQcm9ncmFtLCB2LmdldEZvckNvbnRleHRJRCh0aGlzLk93bmVySUQpLlRhcmdldFNoYWRlcik7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQXNzaWduIGF0dHJpYnV0ZSB2YXJpYWJsZS4gVGhpcyBtZXRob2QgcmVxdWlyZXMgdGhhdCB0aGlzIHJlbGF0ZWQgcHJvZ3JhbSB3YXMgYWxyZWFkeSB1c2VkLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFyaWFibGVOYW1lIHZhcmlhYmxlIG5hbWUgdG8gYmUgYXNzaWduZWQgYnVmZmVyXG4gICAqIEBwYXJhbSB7QnVmZmVyfSBidWZmZXIgICAgICAgYWN0dWFsIHZhcmlhYmxlIGJ1ZmZlciB0byBiZSBhc3NpZ25lZFxuICAgKi9cbiAgcHVibGljIGFzc2lnbkF0dHJpYnV0ZVZhcmlhYmxlKHZhcmlhYmxlTmFtZTogc3RyaW5nLCBidWZmZXI6IEJ1ZmZlcik6IHZvaWQge1xuICAgIGNvbnN0IGF0dHJpYkluZGV4ID0gdGhpcy5fZmV0Y2hBdHRyaWJ1dGVMb2NhdGlvbih2YXJpYWJsZU5hbWUpO1xuICAgIGlmIChhdHRyaWJJbmRleCA8IDApIHsgcmV0dXJuOyB9IC8vIFdoZW4gdGhlIHZhcmlhYmxlIHdhcyBub3QgZm91bmRcbiAgICBjb25zdCBidWZXcmFwcGVyID0gYnVmZmVyLmdldEZvckNvbnRleHQodGhpcy5Pd25lckNhbnZhcyk7XG4gICAgYnVmV3JhcHBlci5iaW5kQnVmZmVyKCk7XG4gICAgdGhpcy5HTC52ZXJ0ZXhBdHRyaWJQb2ludGVyKGF0dHJpYkluZGV4LCBidWZmZXIuVW5pdENvdW50LCBidWZmZXIuRWxlbWVudFR5cGUsIGJ1ZmZlci5Ob3JtYWxpemVkLCBidWZmZXIuU3RyaWRlLCBidWZmZXIuT2Zmc2V0KTtcbiAgfVxuXG4gIHB1YmxpYyB1bmlmb3JtTWF0cml4QXJyYXlGcm9tQnVmZmVyKHZhcmlhYmxlTmFtZTogc3RyaW5nLCBidWZmZXI6IEZsb2F0MzJBcnJheSk6IHZvaWQge1xuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5fZmV0Y2hVbmlmb3JtTG9jYXRpb24odmFyaWFibGVOYW1lKTtcbiAgICBpZiAoIWxvY2F0aW9uKSB7IHJldHVybjsgfVxuICAgIHRoaXMuR0wudW5pZm9ybTRmdihsb2NhdGlvbiwgYnVmZmVyKTtcbiAgfVxuXG4gIHB1YmxpYyB1bmlmb3JtTWF0cml4QXJyYXkodmFyaWFibGVOYW1lOiBzdHJpbmcsIG1hdEFycmF5OiBNYXRyaXhBcnJheSk6IHZvaWQge1xuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5fZmV0Y2hVbmlmb3JtTG9jYXRpb24odmFyaWFibGVOYW1lKTtcbiAgICBpZiAoIWxvY2F0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuR0wudW5pZm9ybTRmdihsb2NhdGlvbiwgbWF0QXJyYXkucmF3RWxlbWVudHMpO1xuICB9XG5cbiAgcHVibGljIHVuaWZvcm1NYXRyaXgodmFyaWFibGVOYW1lOiBzdHJpbmcsIG1hdDogTWF0cml4KTogdm9pZCB7XG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLl9mZXRjaFVuaWZvcm1Mb2NhdGlvbih2YXJpYWJsZU5hbWUpO1xuICAgIGlmICghbG9jYXRpb24pIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5HTC51bmlmb3JtTWF0cml4NGZ2KGxvY2F0aW9uLCBmYWxzZSwgPEZsb2F0MzJBcnJheT5tYXQucmF3RWxlbWVudHMpO1xuICB9XG5cbiAgcHVibGljIHVuaWZvcm1WZWN0b3IodmFyaWFibGVOYW1lOiBzdHJpbmcsIHZlYzogVmVjdG9yQmFzZSk6IHZvaWQge1xuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5fZmV0Y2hVbmlmb3JtTG9jYXRpb24odmFyaWFibGVOYW1lKTtcbiAgICBpZiAoIWxvY2F0aW9uKSB7IHJldHVybjsgfVxuICAgIGNvbnN0IHJhd1ZlY3RvciA9IHZlYy5yYXdFbGVtZW50cztcbiAgICBzd2l0Y2ggKHZlYy5FbGVtZW50Q291bnQpIHtcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgdGhpcy5HTC51bmlmb3JtMmYobG9jYXRpb24sIHJhd1ZlY3RvclswXSwgcmF3VmVjdG9yWzFdKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgY2FzZSAzOlxuICAgICAgICB0aGlzLkdMLnVuaWZvcm0zZihsb2NhdGlvbiwgcmF3VmVjdG9yWzBdLCByYXdWZWN0b3JbMV0sIHJhd1ZlY3RvclsyXSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIGNhc2UgNDpcbiAgICAgICAgdGhpcy5HTC51bmlmb3JtNGYobG9jYXRpb24sIHJhd1ZlY3RvclswXSwgcmF3VmVjdG9yWzFdLCByYXdWZWN0b3JbMl0sIHJhd1ZlY3RvclszXSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJVbmV4cGVjdGVkIGVsZW1lbnQgY291bnQgb2YgdmVjdG9yIVwiKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdW5pZm9ybVZlY3RvckFycmF5KHZhcmlhYmxlTmFtZTogc3RyaW5nLCB2ZWN0b3JzOiBWZWN0b3JBcnJheSk6IHZvaWQge1xuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5fZmV0Y2hVbmlmb3JtTG9jYXRpb24odmFyaWFibGVOYW1lKTtcbiAgICBpZiAoIWxvY2F0aW9uKSB7IHJldHVybjsgfVxuICAgIHN3aXRjaCAodmVjdG9ycy5kaW1lbnNpb24pIHtcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgdGhpcy5HTC51bmlmb3JtMmZ2KGxvY2F0aW9uLCBuZXcgRmxvYXQzMkFycmF5KHZlY3RvcnMucmF3RWxlbWVudHMpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgY2FzZSAzOlxuICAgICAgICB0aGlzLkdMLnVuaWZvcm0zZnYobG9jYXRpb24sIG5ldyBGbG9hdDMyQXJyYXkodmVjdG9ycy5yYXdFbGVtZW50cykpO1xuICAgICAgICByZXR1cm47XG4gICAgICBjYXNlIDQ6XG4gICAgICAgIHRoaXMuR0wudW5pZm9ybTRmdihsb2NhdGlvbiwgbmV3IEZsb2F0MzJBcnJheSh2ZWN0b3JzLnJhd0VsZW1lbnRzKSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJVbmV4cGVjdGVkIGVsZW1lbnQgY291bnQgb2YgdmVjdG9yIVwiKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdW5pZm9ybUZsb2F0KHZhcmlhYmxlTmFtZTogc3RyaW5nLCB2YWw6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5fZmV0Y2hVbmlmb3JtTG9jYXRpb24odmFyaWFibGVOYW1lKTtcbiAgICBpZiAoIWxvY2F0aW9uKSB7IHJldHVybjsgfVxuICAgIHRoaXMuR0wudW5pZm9ybTFmKGxvY2F0aW9uLCB2YWwpO1xuICB9XG5cbiAgcHVibGljIHVuaWZvcm1GbG9hdEFycmF5KHZhcmlhYmxlTmFtZTogc3RyaW5nLCB2YWw6IG51bWJlcltdKTogdm9pZCB7XG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLl9mZXRjaFVuaWZvcm1Mb2NhdGlvbih2YXJpYWJsZU5hbWUpO1xuICAgIGlmICghbG9jYXRpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5HTC51bmlmb3JtMWZ2KGxvY2F0aW9uLCBuZXcgRmxvYXQzMkFycmF5KHZhbCkpO1xuICB9XG5cbiAgcHVibGljIHVuaWZvcm1JbnQodmFyaWFibGVOYW1lOiBzdHJpbmcsIHZhbDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLl9mZXRjaFVuaWZvcm1Mb2NhdGlvbih2YXJpYWJsZU5hbWUpO1xuICAgIGlmICghbG9jYXRpb24pIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5HTC51bmlmb3JtMWkobG9jYXRpb24sIHZhbCk7XG4gIH1cblxuICBwdWJsaWMgdW5pZm9ybUludEFycmF5KHZhcmlhYmxlTmFtZTogc3RyaW5nLCB2YWw6IG51bWJlcltdKTogdm9pZCB7XG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLl9mZXRjaFVuaWZvcm1Mb2NhdGlvbih2YXJpYWJsZU5hbWUpO1xuICAgIGlmICghbG9jYXRpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5HTC51bmlmb3JtMWl2KGxvY2F0aW9uLCBuZXcgSW50MzJBcnJheSh2YWwpKTtcbiAgfVxuXG4gIHB1YmxpYyB1bmlmb3JtU2FtcGxlcih2YXJpYWJsZU5hbWU6IHN0cmluZywgdGV4OiBUZXh0dXJlQmFzZSwgdGV4UmVnaXN0ZXI6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLl9mZXRjaFVuaWZvcm1Mb2NhdGlvbih2YXJpYWJsZU5hbWUpO1xuICAgIGNvbnN0IHRleFdyYXBwZXIgPSB0ZXguZ2V0Rm9yQ29udGV4dCh0aGlzLk93bmVyQ2FudmFzKTtcbiAgICBpZiAoIWxvY2F0aW9uKSB7IHJldHVybiAtMTsgfVxuICAgIGlmICh0ZXhXcmFwcGVyLkluaXRpYWxpemVkKSB7XG4gICAgICBpZiAodGV4V3JhcHBlci5yZWdpc3RlclRleHR1cmUodGV4UmVnaXN0ZXIpKSB7XG4gICAgICAgIHRoaXMuR0wudW5pZm9ybTFpKGxvY2F0aW9uLCB0ZXhSZWdpc3Rlcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZmV0Y2hVbmlmb3JtTG9jYXRpb24odmFsTmFtZTogc3RyaW5nKTogV2ViR0xVbmlmb3JtTG9jYXRpb24ge1xuICAgIGlmICghdGhpcy5fdW5pZm9ybUxvY2F0aW9uc1t2YWxOYW1lXSkge1xuICAgICAgdGhpcy5fdW5pZm9ybUxvY2F0aW9uc1t2YWxOYW1lXSA9IHRoaXMuR0wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMuVGFyZ2V0UHJvZ3JhbSwgdmFsTmFtZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl91bmlmb3JtTG9jYXRpb25zW3ZhbE5hbWVdO1xuICB9XG5cbiAgcHJpdmF0ZSBfZmV0Y2hBdHRyaWJ1dGVMb2NhdGlvbih2YWxOYW1lOiBzdHJpbmcpOiBudW1iZXIge1xuICAgIGlmICghdGhpcy5fYXR0cmlidXRlTG9jYXRpb25zW3ZhbE5hbWVdKSB7XG4gICAgICB0aGlzLl9hdHRyaWJ1dGVMb2NhdGlvbnNbdmFsTmFtZV0gPSB0aGlzLkdMLmdldEF0dHJpYkxvY2F0aW9uKHRoaXMuVGFyZ2V0UHJvZ3JhbSwgdmFsTmFtZSk7XG4gICAgICBpZiAodGhpcy5fYXR0cmlidXRlTG9jYXRpb25zW3ZhbE5hbWVdID49IDApIHtcbiAgICAgICAgdGhpcy5HTC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh0aGlzLl9hdHRyaWJ1dGVMb2NhdGlvbnNbdmFsTmFtZV0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fYXR0cmlidXRlTG9jYXRpb25zW3ZhbE5hbWVdO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFByb2dyYW1XcmFwcGVyO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
