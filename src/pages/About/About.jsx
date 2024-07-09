// CSS
import { Link } from "react-router-dom"
import styles from "./About.module.css"

const About = () => {
  return (
    <div className={styles.about}>
       <h2>Sobre<span></span></h2>
       <p>Este projeto consiste em no inicio do teste da integração do AppMauc, feito com React no front-end e node.js + express no back-end.</p>
    </div>
  )
}

export default About