import React, { useState } from "react";
import Button from "./Button.js";
import * as styles from "./EmailShareForm.module.scss";

export default function EmailShareForm({ posts }) {
  if (posts === undefined) {
    posts = [];
  }
  const [isActive, setIsActive] = useState(true);
  const [formData, setFormData] = useState({ userEmail: "", targetEmails: "", message: "" });
  let flattenedPosts = [];
  if (posts && posts.length > 0) {
    flattenedPosts = posts.map((p) => {
      return {
        title: p.childMdx.frontmatter.title,
        authors: p.childMdx.frontmatter.authors
          .map((a) => {
            return a.frontmatter.name;
          })
          .join(", "),
        link: "http://www.example.com",
      };
    });
  }

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
    console.log("Submitting email form");
    fetch("/.netlify/functions/triggerShareEmail", {
      method: "POST",
      body: JSON.stringify({
        userEmail: formData["userEmail"],
        targetEmails: formData["targetEmails"].split(","),
        message: formData["message"],
        posts: flattenedPosts,
      }),
    });
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
          <Button state="primary" as="input" label={`${posts.length} Artikel teilen`} />
          <Button onClick={() => setIsActive(false)}>Abbrechen</Button>
        </div>
      </form>
    </>
  );
}
