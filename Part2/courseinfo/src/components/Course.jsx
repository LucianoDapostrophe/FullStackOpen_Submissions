
const Header = (props) => {
    return (
      <h1>{props.title}</h1>
    )
}

const Part = (props) => {
    return (
        <p>{props.name} {props.exercises}</p>
    )
}

const Content = (props) => {
    const parts = props.parts
    return (
      <div>
        {parts.map((part) => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
      </div>  
    )
}

const Total = (props) => {
    const parts = props.parts
    const totalExercises = parts.reduce((total, part) => total + part.exercises, 0)
    return(
        <b>Number of exercises {totalExercises}</b>
    )
}

const Course = ({course}) => {
    return (
      <div>
        <Header title={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }

export default Course