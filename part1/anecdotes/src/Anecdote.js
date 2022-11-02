const Anecdote = ({anecdote, points, header}) => (
    <div>
      <h1>{header}</h1>
      <div>{anecdote}</div>
      <div>has {points} votes</div>
    </div>
)


export default Anecdote