import React, { useState } from "react";
import Button from "./Button.js";
import * as styles from "./EmailShareForm.module.scss";

export default function EmailShareForm({ posts }) {
  if (posts === undefined) {
    posts = [];
  }
  const [isActive, setIsActive] = useState(true);
  const [formData, setFormData] = useState({ userEmail: "", targetEmails: "" });

  function handleChange(e) {
    e.preventDefault();
    const property = e.target.getAttribute("id");
    setFormData((prev) => {
      const newData = { ...prev };
      newData[property] = e.target.value;
      return newData;
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(e);
  }
  return (
    <>
      <div className={styles.toggle}>{!isActive && <Button onClick={() => setIsActive(!isActive)}>Per Email teilen</Button>}</div>
      <form onSubmit={handleSubmit} className={`${styles.container} ${isActive && styles.active}`}>
        <div className={styles.section}>
          <label htmlFor="userEmail">Deine Email-Adresse</label>
          <input onChange={handleChange} required placeholder="you@work.com" type="email" id="userEmail" value={formData["userEmail"]} />
        </div>
        <div className={styles.section}>
          <label htmlFor="targetEmails">Empfänger</label>
          <input
            onChange={handleChange}
            required
            placeholder="alice@work.com, bob@work.com"
            type="text"
            id="targetEmails"
            value={formData["targetEmails"]}
          />
        </div>
        <div className={styles.section}>
            <label htmlFor="message">Nachricht (optional)</label>
            <textarea name="message" id="message" rows="3"></textarea>
        </div>
        <div className={styles.submit}>
          <Button as="input" label={`${posts.length} Artikel teilen`}/>
          <Button onClick={() => setIsActive(false)}>Abbrechen</Button>
        </div>
      </form>
    </>
  );
}
