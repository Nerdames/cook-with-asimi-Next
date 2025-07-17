import styles from './Newsletter.module.css'

export default function Newsletter() {
  return (
    <div className={styles.newsletter}>
      <h3>Subscribe to our Newsletter</h3>
      <p>Get the latest updates and exclusive content directly in your inbox.</p>

      <form className={styles.newsletterForm}>
        <input 
          type="email" 
          placeholder="Enter your email" 
          required 
        />
        <button type="submit">Subscribe</button>
      </form>
    </div>
  )
}
