import J3ObjectBase from "../J3ObjectBase";
const BreakException = {};
class CollectionManipulation extends J3ObjectBase {
    each(func) {
        try {
            Array.prototype.forEach.call(this, (node, index) => {
                const ret = func.bind(node)(index, node);
                if (ret === false) {
                    throw BreakException;
                }
            });
        }
        catch (e) {
            if (e !== BreakException) {
                throw e;
            }
        }
        return this;
    }
}
export default CollectionManipulation;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkludGVyZmFjZS9NYW5pcHVsYXRpb24vQ29sbGVjdGlvbk1hbmlwdWxhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiT0FDTyxZQUFZLE1BQU0saUJBQWlCO0FBRzFDLE1BQU0sY0FBYyxHQUFHLEVBQUUsQ0FBQztBQUUxQixxQ0FBcUMsWUFBWTtJQUd4QyxJQUFJLENBQUMsSUFBb0Q7UUFDOUQsSUFBSSxDQUFDO1lBQ0gsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLElBQXNCLEVBQUUsS0FBYTtnQkFDdkUsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3pDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNsQixNQUFNLGNBQWMsQ0FBQztnQkFDdkIsQ0FBQztZQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBRTtRQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDWCxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssY0FBYyxDQUFDLENBQUMsQ0FBQztnQkFDekIsTUFBTSxDQUFDLENBQUM7WUFDVixDQUFDO1FBQ0gsQ0FBQztRQUNELE1BQU0sQ0FBTSxJQUFJLENBQUM7SUFDbkIsQ0FBQztBQUNILENBQUM7QUFFRCxlQUFlLHNCQUFzQixDQUFDIiwiZmlsZSI6IkludGVyZmFjZS9NYW5pcHVsYXRpb24vQ29sbGVjdGlvbk1hbmlwdWxhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBKM09iamVjdCBmcm9tIFwiLi4vSjNPYmplY3RcIjtcbmltcG9ydCBKM09iamVjdEJhc2UgZnJvbSBcIi4uL0ozT2JqZWN0QmFzZVwiO1xuaW1wb3J0IEdvbWxUcmVlTm9kZUJhc2UgZnJvbSBcIi4uLy4uL0dvbWwvR29tbFRyZWVOb2RlQmFzZVwiO1xuXG5jb25zdCBCcmVha0V4Y2VwdGlvbiA9IHt9O1xuXG5jbGFzcyBDb2xsZWN0aW9uTWFuaXB1bGF0aW9uIGV4dGVuZHMgSjNPYmplY3RCYXNlIHtcbiAgcHVibGljIGVhY2goZnVuYzogKGluZGV4OiBudW1iZXIsIG5vZGU6IEdvbWxUcmVlTm9kZUJhc2UpID0+IGJvb2xlYW4pOiBKM09iamVjdDtcbiAgcHVibGljIGVhY2goZnVuYzogKGluZGV4OiBudW1iZXIsIG5vZGU6IEdvbWxUcmVlTm9kZUJhc2UpID0+IHZvaWQpOiBKM09iamVjdDtcbiAgcHVibGljIGVhY2goZnVuYzogKGluZGV4OiBudW1iZXIsIG5vZGU6IEdvbWxUcmVlTm9kZUJhc2UpID0+IGFueSk6IEozT2JqZWN0IHtcbiAgICB0cnkge1xuICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbCh0aGlzLCAobm9kZTogR29tbFRyZWVOb2RlQmFzZSwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICBjb25zdCByZXQgPSBmdW5jLmJpbmQobm9kZSkoaW5kZXgsIG5vZGUpO1xuICAgICAgICBpZiAocmV0ID09PSBmYWxzZSkge1xuICAgICAgICAgIHRocm93IEJyZWFrRXhjZXB0aW9uO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoZSAhPT0gQnJlYWtFeGNlcHRpb24pIHtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIDxhbnk+dGhpcztcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb2xsZWN0aW9uTWFuaXB1bGF0aW9uO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
