import Vector4 from "../../Math/Vector4";
import Vector3 from "../../Math/Vector3";
class PMXMaterialMorphParamContainer {
    constructor(calcFlag) {
        this._calcFlag = calcFlag;
        const def = 1 - calcFlag;
        this.diffuse = [def, def, def, def];
        this.specular = [def, def, def, def];
        this.ambient = [def, def, def];
        this.edgeColor = [def, def, def, def];
        this.edgeSize = def;
        this.textureCoeff = [def, def, def, def];
        this.sphereCoeff = [def, def, def, def];
        this.toonCoeff = [def, def, def, def];
    }
    static calcMorphedSingleValue(base, add, mul, target) {
        return base * target(mul) + target(add);
    }
    static calcMorphedVectorValue(base, add, mul, target, vecLength) {
        switch (vecLength) {
            case 3:
                return new Vector3(base.X * target(mul)[0] + target(add)[0], base.Y * target(mul)[1] + target(add)[1], base.Z * target(mul)[2] + target(add)[2]);
            case 4:
                return new Vector4(base.X * target(mul)[0] + target(add)[0], base.Y * target(mul)[1] + target(add)[1], base.Z * target(mul)[2] + target(add)[2], base.W * target(mul)[3] + target(add)[3]);
        }
    }
}
export default PMXMaterialMorphParamContainer;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBNWC9Db3JlL1BNWE1hdGVyaWFsTW9ycGhQYXJhbUNvbnRhaW5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiT0FBTyxPQUFPLE1BQU0sb0JBQW9CO09BQ2pDLE9BQU8sTUFBTSxvQkFBb0I7QUFFeEM7SUFvQkUsWUFBWSxRQUFnQjtRQUMxQixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUMxQixNQUFNLEdBQUcsR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxPQUFjLHNCQUFzQixDQUFDLElBQVksRUFBRSxHQUFtQyxFQUFFLEdBQW1DLEVBQUUsTUFBcUQ7UUFDaEwsTUFBTSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCxPQUFjLHNCQUFzQixDQUFDLElBQXFCLEVBQUUsR0FBbUMsRUFBRSxHQUFtQyxFQUFFLE1BQXVELEVBQUUsU0FBaUI7UUFDOU0sTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNsQixLQUFLLENBQUM7Z0JBQ0osTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDekQsSUFBSSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUN4QyxJQUFJLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QyxLQUFLLENBQUM7Z0JBQ0osTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDekQsSUFBSSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUN4QyxJQUFJLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQzlCLElBQUssQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDbEQsQ0FBQztRQUNSLENBQUM7SUFDSCxDQUFDO0FBQ0gsQ0FBQztBQUVELGVBQWUsOEJBQThCLENBQUMiLCJmaWxlIjoiUE1YL0NvcmUvUE1YTWF0ZXJpYWxNb3JwaFBhcmFtQ29udGFpbmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZlY3RvcjQgZnJvbSBcIi4uLy4uL01hdGgvVmVjdG9yNFwiO1xuaW1wb3J0IFZlY3RvcjMgZnJvbSBcIi4uLy4uL01hdGgvVmVjdG9yM1wiO1xuaW1wb3J0IHtGdW5jMX0gZnJvbSBcIi4uLy4uL0Jhc2UvRGVsZWdhdGVzXCI7XG5jbGFzcyBQTVhNYXRlcmlhbE1vcnBoUGFyYW1Db250YWluZXIge1xuXG4gIHB1YmxpYyBkaWZmdXNlOiBudW1iZXJbXTtcblxuICBwdWJsaWMgc3BlY3VsYXI6IG51bWJlcltdO1xuXG4gIHB1YmxpYyBhbWJpZW50OiBudW1iZXJbXTtcblxuICBwdWJsaWMgZWRnZUNvbG9yOiBudW1iZXJbXTtcblxuICBwdWJsaWMgZWRnZVNpemU6IG51bWJlcjtcblxuICBwdWJsaWMgdGV4dHVyZUNvZWZmOiBudW1iZXJbXTtcblxuICBwdWJsaWMgc3BoZXJlQ29lZmY6IG51bWJlcltdO1xuXG4gIHB1YmxpYyB0b29uQ29lZmY6IG51bWJlcltdO1xuXG4gIHByaXZhdGUgX2NhbGNGbGFnOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoY2FsY0ZsYWc6IG51bWJlcikge1xuICAgIHRoaXMuX2NhbGNGbGFnID0gY2FsY0ZsYWc7XG4gICAgY29uc3QgZGVmID0gMSAtIGNhbGNGbGFnO1xuICAgIHRoaXMuZGlmZnVzZSA9IFtkZWYsIGRlZiwgZGVmLCBkZWZdO1xuICAgIHRoaXMuc3BlY3VsYXIgPSBbZGVmLCBkZWYsIGRlZiwgZGVmXTtcbiAgICB0aGlzLmFtYmllbnQgPSBbZGVmLCBkZWYsIGRlZl07XG4gICAgdGhpcy5lZGdlQ29sb3IgPSBbZGVmLCBkZWYsIGRlZiwgZGVmXTtcbiAgICB0aGlzLmVkZ2VTaXplID0gZGVmO1xuICAgIHRoaXMudGV4dHVyZUNvZWZmID0gW2RlZiwgZGVmLCBkZWYsIGRlZl07XG4gICAgdGhpcy5zcGhlcmVDb2VmZiA9IFtkZWYsIGRlZiwgZGVmLCBkZWZdO1xuICAgIHRoaXMudG9vbkNvZWZmID0gW2RlZiwgZGVmLCBkZWYsIGRlZl07XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNhbGNNb3JwaGVkU2luZ2xlVmFsdWUoYmFzZTogbnVtYmVyLCBhZGQ6IFBNWE1hdGVyaWFsTW9ycGhQYXJhbUNvbnRhaW5lciwgbXVsOiBQTVhNYXRlcmlhbE1vcnBoUGFyYW1Db250YWluZXIsIHRhcmdldDogRnVuYzE8UE1YTWF0ZXJpYWxNb3JwaFBhcmFtQ29udGFpbmVyLCBudW1iZXI+KTogbnVtYmVyIHtcbiAgICByZXR1cm4gYmFzZSAqIHRhcmdldChtdWwpICsgdGFyZ2V0KGFkZCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNhbGNNb3JwaGVkVmVjdG9yVmFsdWUoYmFzZTogVmVjdG9yNHxWZWN0b3IzLCBhZGQ6IFBNWE1hdGVyaWFsTW9ycGhQYXJhbUNvbnRhaW5lciwgbXVsOiBQTVhNYXRlcmlhbE1vcnBoUGFyYW1Db250YWluZXIsIHRhcmdldDogRnVuYzE8UE1YTWF0ZXJpYWxNb3JwaFBhcmFtQ29udGFpbmVyLCBudW1iZXJbXT4sIHZlY0xlbmd0aDogbnVtYmVyKTogVmVjdG9yM3xWZWN0b3I0IHtcbiAgICBzd2l0Y2ggKHZlY0xlbmd0aCkge1xuICAgICAgY2FzZSAzOlxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjMoYmFzZS5YICogdGFyZ2V0KG11bClbMF0gKyB0YXJnZXQoYWRkKVswXSxcbiAgICAgICAgICBiYXNlLlkgKiB0YXJnZXQobXVsKVsxXSArIHRhcmdldChhZGQpWzFdLFxuICAgICAgICAgIGJhc2UuWiAqIHRhcmdldChtdWwpWzJdICsgdGFyZ2V0KGFkZClbMl0pO1xuICAgICAgY2FzZSA0OlxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjQoYmFzZS5YICogdGFyZ2V0KG11bClbMF0gKyB0YXJnZXQoYWRkKVswXSxcbiAgICAgICAgICBiYXNlLlkgKiB0YXJnZXQobXVsKVsxXSArIHRhcmdldChhZGQpWzFdLFxuICAgICAgICAgIGJhc2UuWiAqIHRhcmdldChtdWwpWzJdICsgdGFyZ2V0KGFkZClbMl0sXG4gICAgICAgICAgKDxWZWN0b3I0PmJhc2UpLlcgKiB0YXJnZXQobXVsKVszXSArIHRhcmdldChhZGQpWzNdXG4gICAgICAgICAgKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUE1YTWF0ZXJpYWxNb3JwaFBhcmFtQ29udGFpbmVyO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
