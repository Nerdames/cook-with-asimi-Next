import React from 'react'
import styles from './Footer.module.css'
import { BiEnvelope } from 'react-icons/bi'
import { BsLinkedin, BsWhatsapp } from 'react-icons/bs'

const FooterSocials: React.FC = () => {
  return (
    <div className={styles.footer1Item}>
      <p className={styles.itemTopic}>Contact Us</p>
      <ul className={styles.socials}>
        <li>
          <BiEnvelope size={20} />
          <span>Email</span>
        </li>
        <li>
          <BsLinkedin size={20} />
          <span>LinkedIn</span>
        </li>
        <li>
          <BsWhatsapp size={20} />
          <span>WhatsApp</span>
        </li>
      </ul>
    </div>
  )
}

export default FooterSocials
