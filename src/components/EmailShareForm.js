import React, { useState } from "react";
import Button from "./Button.js";
import * as styles from "./EmailShareForm.module.scss";

export default function EmailShareForm({ posts }) {
  if (posts === undefined) {
    posts = [];
  }
  const [formState, setFormState] = useState("collapsed");
  const [isActive, setIsActive] = useState(true);
  const [formData, setFormData] = useState({ userEmail: "", targetEmails: "", message: "" });
  let flattenedPosts = [];
  if (posts.length > 0) {
    flattenedPosts = posts.map((p) => {
      return {
        title: p.childMdx.frontmatter.title,
        authors: p.childMdx.frontmatter.authors
          .map((a) => {
            return a.frontmatter.name;
          })
          .join(", "),
        link: `https://leibniz-nw.netlify.app/${p.childMdx.fields.slug}`,
      };
    });
  }

  // If the server-side email fails, we fall back to a mailto link
  let mailto = "";
  if (posts.length > 0) {
    const emailTitle = `Work New @ Leibniz`;
    const emailBody = posts.map((p) => `${p.childMdx.frontmatter.title} – https://leibniz-nw.netlify.app/${p.childMdx.fields.slug}`).join(`\n`);
    const to = formData.targetEmails.split(",").join(";");
    mailto = `mailto:${to}?subject=${emailTitle}&body=${encodeURIComponent(`${formData.message}\n\n${emailBody}\n\nPasswort: Leibniz123\n\n`)}`;
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

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Submitting email form");
    const res = await fetch("/.netlify/functions/triggerShareEmail", {
      method: "POST",
      body: JSON.stringify({
        userEmail: formData["userEmail"],
        targetEmails: formData["targetEmails"].split(","),
        message: formData["message"],
        posts: flattenedPosts,
      }),
    });
    console.log(res);
    if (res.status === 200) {
      setFormState("success");
    } else {
      setFormState("error");
    }
  }
  const defaultView = (
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
        <textarea onChange={handleChange} value={formData["message"]} name="message" id="message" rows="3"></textarea>
      </div>
      <div className={styles.actions}>
        <Button state="primary" as="input" label={`${posts.length} Artikel teilen`} />
        <Button onClick={() => setFormState("collapsed")}>Abbrechen</Button>
      </div>
    </form>
  );

  const successView = (
    <div>
      <p className={`${styles.feedback} ${styles.success}`}>Email erfolgreich verschickt!</p>
      <div className={styles.actions}>
        <Button onClick={() => setFormState("collapsed")} state="">
          Schließen
        </Button>
      </div>
    </div>
  );
  const errorView = (
    <div>
      <p className={`${styles.feedback} ${styles.error}`}>
        Versand fehlgeschlagen. Versuch es in ein paar Minuten erneut oder <a href={mailto}>schick die Email manuell</a> mit deiner Email-App.
      </p>
      <div className={styles.actions}>
        <Button onClick={() => setFormState("collapsed")} state="">
          Abbrechen
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {formState === "collapsed" && (
        <div className={styles.toggle}>
          <Button onClick={() => setFormState("default")}>Per Email teilen</Button>
        </div>
      )}
      {formState === "default" && <>{defaultView}</>}
      {formState === "success" && <>{successView}</>}
      {formState === "error" && <>{errorView}</>}
    </>
  );
}
