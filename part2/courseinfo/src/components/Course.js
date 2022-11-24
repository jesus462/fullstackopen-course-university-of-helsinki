const Header = ({ name }) => <h1>{name}</h1>

const Total = ({ total }) => <h4>Number of exercises {total}</h4>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => <Part key={part.id} part={part} />)} 
  </>

const Course = ({course}) => {
    const {name, parts} = course
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)

    return (
      <>
        <Header name={name} />
        <Content parts={parts} />
        <Total total={total} />
      </>
    )
}

export default Course