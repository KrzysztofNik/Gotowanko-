const CpmDescription = () => {
    return (
        <div className="w-[1000px] text-left">
            <h2 className="text-xl font-semibold text-main-green pb-2">About Critical Path Method (CPM)</h2>
            <p className="text-md mb-6">
                The Critical Path Method (CPM) is a project modeling technique used in project management to identify
                the most important sequence of tasks (critical path) that determines the minimum time required to complete the project.
                It helps to schedule a set of project activities, identify the earliest and latest that each activity can start and finish
                without making the project longer, and highlight tasks that are critical and which have "slack" or extra time.
            </p>
            <h3 className="text-xl font-semibold text-main-green pb-2">How to Use This Application</h3>
            <ul className="text-left mx-auto" style={{ maxWidth: '1000px' }}>
                <li><b>Adding a Row:</b> Click the "+" button to add a new row to the table.</li>
                <li><b>Removing a Row:</b> Click the "-" button to remove the last row from the table.</li>
                <li><b>Activity:</b> Enter the name or identifier of the activity in the "Activity" column.</li>
                <li><b>Preceding Activity:</b> Enter the names or identifiers of any preceding activities in the "Preceding Activity" column, separated by commas if there are more than one.</li>
                <li><b>Duration:</b> Enter the duration of the activity in the "Duration" column. If an activity does not have a duration, enter 0.</li>
                <li><b>Calculating the Critical Path:</b> After filling out the table, click the "Calculate" button to display the graph with the critical path based on the entered data.</li>
            </ul>
        </div>
    );
}

export default CpmDescription;