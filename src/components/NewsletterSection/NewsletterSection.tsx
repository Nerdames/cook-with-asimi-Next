import React from 'react';
import styles from './NewsletterSection.module.css';

const NewsletterSection: React.FC = () => {
  return (
    <section className={styles.newsletterSection}>
      <div className={styles.overlay}>
        <div className={styles.textContent}>
          <h2>Join My Exclusive Cooking Newsletter</h2>
          <p>
            Get a taste of delicious updates! Join thousands of food lovers on my free email list.
            Be the first to receive new recipes, cooking tips, and exclusive kitchen hacks straight to your inbox.
          </p>

          <form className={styles.form}>
            <input type="text" placeholder="Your first name" required />
            <input type="email" placeholder="Your email address" required />

            <label className={styles.checkbox}>
              <input type="checkbox" required />
              <span>I agree to receive emails from Cook With Asimi.</span>
            </label>

            <button type="submit" className={styles.submitButton}>Yes, Sign Me Up</button>
          </form>

          <small className={styles.privacyNote}>We respect your privacy. You can unsubscribe anytime.</small>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
