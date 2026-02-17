  import styles from './Button.module.css'
  

const Button = ({name}) => {
  console.log(styles);
  return (
    <button className='button'>{name}</button>
  )
}

export default Button