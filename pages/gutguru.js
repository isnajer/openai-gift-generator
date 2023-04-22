import React from "react";
import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {

  const [symptom, setSymptom ] = useState('psoriasis');

  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();

    const response = await fetch("/api/generate-food-medicine", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ symptom }),
    });
    const data = await response.json();
      setResult(data.result);
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Gut Guru</h3>
        <form onSubmit={onSubmit}>
          <label>Enter symptom or disease</label>
          <input
            type="text"
            name="symptom"
            value={symptom}
            onChange={(e) => setSymptom(e.target.value)}
          />
          <input type="submit" value="Generate results!" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}


// What is rendered:
  // image icon (line 42)
  // form (line 44) that has 1 input {animalInput}, and a submit button to submit form (52)

// {onSubmit} function (line 9):
  // it uses "fetch" to to fetch data from API url("/api/generate", 
  // sends POST request, 
  // specifies "animal" inside the body of the request)
  // then it gets the data and sets (setResult) in the state as a result (line 7)
  // when result is set, then its displayed as {result} (line 54) 
