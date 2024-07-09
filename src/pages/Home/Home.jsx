// CSS
import styles from "./Home.module.css"
import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"
import Card from '../../components/data_display/Cards';
import { uploads } from "../../utils/config";
import { useArtWorks } from "../../hooks/useArtWorks";
import { Spinner, Flex } from '@radix-ui/themes';
import Expositions from "../Expositions/Expositions";

const Home = () => {

  return (
    <div className={styles.home}>
      <Expositions/>
    </div>
  )
}

export default Home