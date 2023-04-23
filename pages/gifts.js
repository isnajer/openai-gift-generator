import React from "react";
import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import { FcIdea } from "react-icons/fc";

export default function Home() {

  const [gender, setGender ] = useState("");
  const [age, setAge] = useState();
  const [priceMin, setPriceMin] = useState();
  const [priceMax, setPriceMax] = useState();
  const [hobbies, setHobbies] = useState("");


  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();

    if (loading) {
        return;
    }
    setLoading(true);

    try {
        const response = await fetch("/api/generate-gifts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ priceMin, priceMax, gender, age, hobbies }),
        });
        const data = await response.json();
          setResult(data.result.replaceAll("\n", "<br />"));
    }   catch (e) {
        Alert('Failed to generate gift ideas. Try later.');
    }   finally {
        setLoading(false);
    }
  }

  return (
    <div>
      <Head>
        <title>GiftSmart</title>
        <link rel="icon" href="/gift.png" />
      </Head>

      <main className={styles.main}>
        <FcIdea className={styles.icon} size='45'/>
        <h3>GiftSmart</h3>
        <form onSubmit={onSubmit}>
          <label>Gender</label>
          <input
            type="text"
            name="gender"
            placeholder="Enter gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />

          <label>Age</label>
          <input
            type="number"
            min={1}
            max={99}
            name="age"
            placeholder="Enter age"
            value={age}
            onChange={(e) => setAge(Number.parseInt(e.target.value))}
          />

          <label>$ Min</label>
          <input
            type="number"
            min={1}
            name="priceMin"
            placeholder="Minimum price"
            value={priceMin}
            onChange={(e) => setPriceMin(Number.parseInt(e.target.value))}
          />

          <label>$ Max</label>
          <input
            type="number"
            min={1}
            name="priceMax"
            placeholder="Maximum price"
            value={priceMax}
            onChange={(e) => setPriceMax(Number.parseInt(e.target.value))}
          />

          <label>Hobbies</label>
          <input
            type="text"
            name="hobbies"
            placeholder="What are their hobbies ?"
            value={hobbies}
            onChange={(e) => setHobbies(e.target.value)}
          />
          <input type="submit" value="Generate gift ideas" />
        </form>

        {loading && (
          <div>
            <h3></h3>
            <img src="/loading.gif" className={styles.loading} />
          </div>
        )}
        <div 
            className={styles.result}
            dangerouslySetInnerHTML={{ __html: result }}/>
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
