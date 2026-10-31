  import GoalItem from './GoalItem.jsx';

  function GoalList() {
  return (
    <ul>
      <GoalItem title="Goal 1" >
        Description for Goal 1
      </GoalItem>
      <GoalItem title="Goal 2" >
        Description for Goal 2
      </GoalItem>
      <GoalItem title="Goal 3" >
        Description for Goal 3
      </GoalItem>
    </ul>
  );
}

export default GoalList;