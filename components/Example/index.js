export default function ExampleComponent({ children, ...props }) {
  return (
    <h1
      className={props.classname}
    >
      {children}
    </h1>
  )
}