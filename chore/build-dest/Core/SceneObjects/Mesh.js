import SceneObject from "../SceneObjects/SceneObject";
class Mesh extends SceneObject {
    constructor(geometry, mat) {
        super();
        if (mat) {
            this.addMaterial(mat);
        }
        if (geometry) {
            this.__geometry = geometry;
        }
    }
}
export default Mesh;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvcmUvU2NlbmVPYmplY3RzL01lc2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ik9BQU8sV0FBVyxNQUFNLDZCQUE2QjtBQUlyRCxtQkFBbUIsV0FBVztJQUM1QixZQUFZLFFBQWtCLEVBQUUsR0FBYTtRQUMzQyxPQUFPLENBQUM7UUFDUixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ1IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNiLElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO1FBQzdCLENBQUM7SUFDSCxDQUFDO0FBQ0gsQ0FBQztBQUVELGVBQWUsSUFBSSxDQUFDIiwiZmlsZSI6IkNvcmUvU2NlbmVPYmplY3RzL01lc2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2NlbmVPYmplY3QgZnJvbSBcIi4uL1NjZW5lT2JqZWN0cy9TY2VuZU9iamVjdFwiO1xuaW1wb3J0IEdlb21ldHJ5IGZyb20gXCIuLi9HZW9tZXRyaWVzL0Jhc2UvR2VvbWV0cnlcIjtcbmltcG9ydCBNYXRlcmlhbCBmcm9tIFwiLi4vTWF0ZXJpYWxzL01hdGVyaWFsXCI7XG5cbmNsYXNzIE1lc2ggZXh0ZW5kcyBTY2VuZU9iamVjdCB7XG4gIGNvbnN0cnVjdG9yKGdlb21ldHJ5OiBHZW9tZXRyeSwgbWF0OiBNYXRlcmlhbCkge1xuICAgIHN1cGVyKCk7XG4gICAgaWYgKG1hdCkge1xuICAgICAgdGhpcy5hZGRNYXRlcmlhbChtYXQpO1xuICAgIH1cbiAgICBpZiAoZ2VvbWV0cnkpIHtcbiAgICAgIHRoaXMuX19nZW9tZXRyeSA9IGdlb21ldHJ5O1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNZXNoO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
