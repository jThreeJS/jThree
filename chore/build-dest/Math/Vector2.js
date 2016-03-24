import VectorBase from "./VectorBase";
import { vec2 } from "gl-matrix";
class Vector2 extends VectorBase {
    constructor(x, y) {
        super();
        if (typeof y === "undefined") {
            this.rawElements = x;
            return;
        }
        this.rawElements = [x, y];
    }
    static get XUnit() {
        return new Vector2(1, 0);
    }
    static get YUnit() {
        return new Vector2(0, 1);
    }
    static get One() {
        return new Vector2(1, 1);
    }
    static get Zero() {
        return new Vector2(0, 0);
    }
    static copy(vec) {
        return new Vector2(vec.X, vec.Y);
    }
    static parse(str) {
        const parseResult = VectorBase.__parse(str);
        const elements = parseResult.elements;
        if (elements.length !== 1 && elements.length !== 2) {
            return undefined;
        }
        let result;
        if (elements.length === 1) {
            result = new Vector2(elements[0], elements[0]);
        }
        else {
            result = new Vector2(elements[0], elements[1]);
        }
        if (parseResult.needNormalize) {
            result = result.normalizeThis();
        }
        if (parseResult.coefficient) {
            result = result.multiplyWith(parseResult.coefficient);
        }
        if (parseResult.needNegate) {
            result = result.negateThis();
        }
        return result;
    }
    get normalized() {
        return this.multiplyWith(1 / this.magnitude);
    }
    get X() {
        return this.rawElements[0];
    }
    get Y() {
        return this.rawElements[1];
    }
    set X(x) {
        this.rawElements[0] = +x;
    }
    set Y(y) {
        this.rawElements[1] = +y;
    }
    static dot(v1, v2) {
        return vec2.dot(v1.rawElements, v2.rawElements);
    }
    static add(v1, v2) {
        const newVec = vec2.create();
        return new Vector2(vec2.add(newVec, v1.rawElements, v2.rawElements));
    }
    static subtract(v1, v2) {
        const newVec = vec2.create();
        return new Vector2(vec2.sub(newVec, v1.rawElements, v2.rawElements));
    }
    static multiply(s, v) {
        const newVec = vec2.create();
        return new Vector2(vec2.scale(newVec, v.rawElements, s));
    }
    static negate(v1) {
        return Vector2.multiply(-1, v1);
    }
    static equals(v1, v2) {
        return VectorBase.__elementEquals(v1, v2);
    }
    static nearlyEquals(v1, v2) {
        return VectorBase.__nearlyElementEquals(v1, v2);
    }
    static normalize(v1) {
        const newVec = vec2.create();
        return new Vector2(vec2.normalize(newVec, v1.rawElements));
    }
    static min(v1, v2) {
        return new Vector2(VectorBase.__fromGenerationFunction(v1, v2, (i, v1_, v2_) => Math.min(v1_.rawElements[i], v2_.rawElements[i])));
    }
    static max(v1, v2) {
        return new Vector2(VectorBase.__fromGenerationFunction(v1, v2, (i, v1_, v2_) => Math.max(v1_.rawElements[i], v2_.rawElements[i])));
    }
    static angle(v1, v2) {
        return Math.acos(Vector2.dot(v1.normalized, v2.normalized));
    }
    dotWith(v) {
        return Vector2.dot(this, v);
    }
    addWith(v) {
        return Vector2.add(this, v);
    }
    subtractWith(v) {
        return Vector2.subtract(v, this);
    }
    multiplyWith(s) {
        return Vector2.multiply(s, this);
    }
    negateThis() {
        return Vector2.negate(this);
    }
    equalWith(v) {
        return Vector2.equals(this, v);
    }
    nearlyEqualWith(v) {
        return Vector2.nearlyEquals(this, v);
    }
    normalizeThis() {
        return Vector2.normalize(this);
    }
    toString() {
        return `(${this.X}, ${this.Y})`;
    }
    toDisplayString() {
        return `Vector2${this.toString()}`;
    }
    get ElementCount() { return 2; }
    toMathematicaString() {
        return `{${this.X}, ${this.Y}}`;
    }
}
export default Vector2;

//# sourceMappingURL=data:application/json;base64,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TSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFTSxlQUFlLENBQUMsQ0FBVTtRQUMvQixNQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVNLGFBQWE7UUFDbEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVNLFFBQVE7UUFDYixNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUNsQyxDQUFDO0lBRU0sZUFBZTtRQUNwQixNQUFNLENBQUMsVUFBVSxJQUFJLENBQUMsUUFBUSxFQUFHLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0lBRUQsSUFBVyxZQUFZLEtBQWEsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFeEMsbUJBQW1CO1FBQ3hCLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQ2xDLENBQUM7QUFDSCxDQUFDO0FBRUQsZUFBZSxPQUFPLENBQUMiLCJmaWxlIjoiTWF0aC9WZWN0b3IyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZlY3RvckJhc2UgZnJvbSBcIi4vVmVjdG9yQmFzZVwiO1xuaW1wb3J0IHtHTE0sIHZlYzJ9IGZyb20gXCJnbC1tYXRyaXhcIjtcbmNsYXNzIFZlY3RvcjIgZXh0ZW5kcyBWZWN0b3JCYXNlIHtcblxuICBwdWJsaWMgc3RhdGljIGdldCBYVW5pdCgpOiBWZWN0b3IyIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcjIoMSwgMCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldCBZVW5pdCgpOiBWZWN0b3IyIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcjIoMCwgMSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldCBPbmUoKTogVmVjdG9yMiB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IyKDEsIDEpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXQgWmVybygpOiBWZWN0b3IyIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcjIoMCwgMCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNvcHkodmVjOiBWZWN0b3IyKTogVmVjdG9yMiB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IyKHZlYy5YLCB2ZWMuWSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIHBhcnNlKHN0cjogc3RyaW5nKTogVmVjdG9yMiB7XG4gICAgY29uc3QgcGFyc2VSZXN1bHQgPSBWZWN0b3JCYXNlLl9fcGFyc2Uoc3RyKTtcbiAgICBjb25zdCBlbGVtZW50cyA9IHBhcnNlUmVzdWx0LmVsZW1lbnRzO1xuICAgIGlmIChlbGVtZW50cy5sZW5ndGggIT09IDEgJiYgZWxlbWVudHMubGVuZ3RoICE9PSAyKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBsZXQgcmVzdWx0O1xuICAgIGlmIChlbGVtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHJlc3VsdCA9IG5ldyBWZWN0b3IyKGVsZW1lbnRzWzBdLCBlbGVtZW50c1swXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IG5ldyBWZWN0b3IyKGVsZW1lbnRzWzBdLCBlbGVtZW50c1sxXSk7XG4gICAgfVxuICAgIGlmIChwYXJzZVJlc3VsdC5uZWVkTm9ybWFsaXplKSB7XG4gICAgICByZXN1bHQgPSByZXN1bHQubm9ybWFsaXplVGhpcygpO1xuICAgIH1cbiAgICBpZiAocGFyc2VSZXN1bHQuY29lZmZpY2llbnQpIHtcbiAgICAgIHJlc3VsdCA9IHJlc3VsdC5tdWx0aXBseVdpdGgocGFyc2VSZXN1bHQuY29lZmZpY2llbnQpO1xuICAgIH1cbiAgICBpZiAocGFyc2VSZXN1bHQubmVlZE5lZ2F0ZSkge1xuICAgICAgcmVzdWx0ID0gcmVzdWx0Lm5lZ2F0ZVRoaXMoKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyKTtcbiAgY29uc3RydWN0b3IoeDogR0xNLklBcnJheSk7XG4gIGNvbnN0cnVjdG9yKHg6IG51bWJlciB8IEdMTS5JQXJyYXksIHk/OiBudW1iZXIpIHtcbiAgICBzdXBlcigpO1xuICAgIGlmICh0eXBlb2YgeSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdGhpcy5yYXdFbGVtZW50cyA9IDxHTE0uSUFycmF5Png7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucmF3RWxlbWVudHMgPSBbPG51bWJlcj54LCB5XTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbm9ybWFsaXplZCgpIHtcbiAgICByZXR1cm4gdGhpcy5tdWx0aXBseVdpdGgoMSAvIHRoaXMubWFnbml0dWRlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgWCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnJhd0VsZW1lbnRzWzBdO1xuICB9XG5cbiAgcHVibGljIGdldCBZKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMucmF3RWxlbWVudHNbMV07XG4gIH1cblxuICBwdWJsaWMgc2V0IFgoeDogbnVtYmVyKSB7XG4gICAgdGhpcy5yYXdFbGVtZW50c1swXSA9ICt4O1xuICB9XG5cbiAgcHVibGljIHNldCBZKHk6IG51bWJlcikge1xuICAgIHRoaXMucmF3RWxlbWVudHNbMV0gPSAreTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZG90KHYxOiBWZWN0b3IyLCB2MjogVmVjdG9yMik6IG51bWJlciB7XG4gICAgcmV0dXJuIHZlYzIuZG90KHYxLnJhd0VsZW1lbnRzLCB2Mi5yYXdFbGVtZW50cyk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGFkZCh2MTogVmVjdG9yMiwgdjI6IFZlY3RvcjIpOiBWZWN0b3IyIHtcbiAgICBjb25zdCBuZXdWZWMgPSB2ZWMyLmNyZWF0ZSgpO1xuICAgIHJldHVybiBuZXcgVmVjdG9yMih2ZWMyLmFkZChuZXdWZWMsIHYxLnJhd0VsZW1lbnRzLCB2Mi5yYXdFbGVtZW50cykpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBzdWJ0cmFjdCh2MTogVmVjdG9yMiwgdjI6IFZlY3RvcjIpOiBWZWN0b3IyIHtcbiAgICBjb25zdCBuZXdWZWMgPSB2ZWMyLmNyZWF0ZSgpO1xuICAgIHJldHVybiBuZXcgVmVjdG9yMih2ZWMyLnN1YihuZXdWZWMsIHYxLnJhd0VsZW1lbnRzLCB2Mi5yYXdFbGVtZW50cykpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBtdWx0aXBseShzOiBudW1iZXIsIHY6IFZlY3RvcjIpOiBWZWN0b3IyIHtcbiAgICBjb25zdCBuZXdWZWMgPSB2ZWMyLmNyZWF0ZSgpO1xuICAgIHJldHVybiBuZXcgVmVjdG9yMih2ZWMyLnNjYWxlKG5ld1ZlYywgdi5yYXdFbGVtZW50cywgcykpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBuZWdhdGUodjE6IFZlY3RvcjIpOiBWZWN0b3IyIHtcbiAgICByZXR1cm4gVmVjdG9yMi5tdWx0aXBseSgtMSwgdjEpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBlcXVhbHModjE6IFZlY3RvcjIsIHYyOiBWZWN0b3IyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIFZlY3RvckJhc2UuX19lbGVtZW50RXF1YWxzKHYxLCB2Mik7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIG5lYXJseUVxdWFscyh2MTogVmVjdG9yMiwgdjI6IFZlY3RvcjIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gVmVjdG9yQmFzZS5fX25lYXJseUVsZW1lbnRFcXVhbHModjEsIHYyKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgbm9ybWFsaXplKHYxOiBWZWN0b3IyKTogVmVjdG9yMiB7XG4gICAgY29uc3QgbmV3VmVjID0gdmVjMi5jcmVhdGUoKTtcbiAgICByZXR1cm4gbmV3IFZlY3RvcjIodmVjMi5ub3JtYWxpemUobmV3VmVjLCB2MS5yYXdFbGVtZW50cykpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBtaW4odjE6IFZlY3RvcjIsIHYyOiBWZWN0b3IyKTogVmVjdG9yMiB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IyKFZlY3RvckJhc2UuX19mcm9tR2VuZXJhdGlvbkZ1bmN0aW9uKHYxLCB2MiwgKGksIHYxXywgdjJfKSA9PiBNYXRoLm1pbih2MV8ucmF3RWxlbWVudHNbaV0sIHYyXy5yYXdFbGVtZW50c1tpXSkpKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgbWF4KHYxOiBWZWN0b3IyLCB2MjogVmVjdG9yMik6IFZlY3RvcjIge1xuICAgIHJldHVybiBuZXcgVmVjdG9yMihWZWN0b3JCYXNlLl9fZnJvbUdlbmVyYXRpb25GdW5jdGlvbih2MSwgdjIsIChpLCB2MV8sIHYyXykgPT4gTWF0aC5tYXgodjFfLnJhd0VsZW1lbnRzW2ldLCB2Ml8ucmF3RWxlbWVudHNbaV0pKSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGFuZ2xlKHYxOiBWZWN0b3IyLCB2MjogVmVjdG9yMik6IG51bWJlciB7XG4gICAgcmV0dXJuIE1hdGguYWNvcyhWZWN0b3IyLmRvdCh2MS5ub3JtYWxpemVkLCB2Mi5ub3JtYWxpemVkKSk7XG4gIH1cblxuICBwdWJsaWMgZG90V2l0aCh2OiBWZWN0b3IyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gVmVjdG9yMi5kb3QodGhpcywgdik7XG4gIH1cblxuICBwdWJsaWMgYWRkV2l0aCh2OiBWZWN0b3IyKTogVmVjdG9yMiB7XG4gICAgcmV0dXJuIFZlY3RvcjIuYWRkKHRoaXMsIHYpO1xuICB9XG5cbiAgcHVibGljIHN1YnRyYWN0V2l0aCh2OiBWZWN0b3IyKTogVmVjdG9yMiB7XG4gICAgcmV0dXJuIFZlY3RvcjIuc3VidHJhY3QodiwgdGhpcyk7XG4gIH1cblxuICBwdWJsaWMgbXVsdGlwbHlXaXRoKHM6IG51bWJlcik6IFZlY3RvcjIge1xuICAgIHJldHVybiBWZWN0b3IyLm11bHRpcGx5KHMsIHRoaXMpO1xuICB9XG5cbiAgcHVibGljIG5lZ2F0ZVRoaXMoKTogVmVjdG9yMiB7XG4gICAgcmV0dXJuIFZlY3RvcjIubmVnYXRlKHRoaXMpO1xuICB9XG5cbiAgcHVibGljIGVxdWFsV2l0aCh2OiBWZWN0b3IyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIFZlY3RvcjIuZXF1YWxzKHRoaXMsIHYpO1xuICB9XG5cbiAgcHVibGljIG5lYXJseUVxdWFsV2l0aCh2OiBWZWN0b3IyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIFZlY3RvcjIubmVhcmx5RXF1YWxzKHRoaXMsIHYpO1xuICB9XG5cbiAgcHVibGljIG5vcm1hbGl6ZVRoaXMoKTogVmVjdG9yMiB7XG4gICAgcmV0dXJuIFZlY3RvcjIubm9ybWFsaXplKHRoaXMpO1xuICB9XG5cbiAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGAoJHt0aGlzLlh9LCAke3RoaXMuWX0pYDtcbiAgfVxuXG4gIHB1YmxpYyB0b0Rpc3BsYXlTdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYFZlY3RvcjIke3RoaXMudG9TdHJpbmcoKSB9YDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgRWxlbWVudENvdW50KCk6IG51bWJlciB7IHJldHVybiAyOyB9XG5cbiAgcHVibGljIHRvTWF0aGVtYXRpY2FTdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYHske3RoaXMuWH0sICR7dGhpcy5ZfX1gO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFZlY3RvcjI7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
