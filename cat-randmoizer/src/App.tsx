import { useEffect, useState } from "react";
import "./App.css";
import { BREEDS } from "./Breed";
import CatCard from "./CatCard";

const breedLength = BREEDS.length;

export type Cat = {
  url?: string;
  description?: string;
  id?: string;
  country?: string;
  weight?: string;
  wiki?: string;
  alt?: string;
};

function App() {
  const [loading, setLoading] = useState(false);
  const [bannedCatIds, setBannedCatIds] = useState<number[]>([]);
  const [breedId, setBreedId] = useState<number>(
    Math.round(Math.random() * breedLength)
  );
  const [currentCat, setCurrentCat] = useState<Cat | undefined>(undefined);

  useEffect(() => {
    getData();
  }, [breedId]);

  const urls = [
    `https://api.thecatapi.com/v1/images/search?breed_ids=${BREEDS[breedId]}`,
    `https://api.thecatapi.com/v1/breeds/${BREEDS[breedId]}`,
  ];

  const getData = async () => {
    setLoading(true);
    const [result1, result2] = await Promise.all(
      urls.map((url) => fetch(url).then((res) => res.json()))
    );
    setLoading(false);
    setCurrentCat({
      url: result1[0].url,
      alt: result2?.alt_names,
      wiki: result2?.wikipedia_url,
      weight: result2?.weight?.imperial,
      country: result2?.origin,
      description: result2?.description,
      id: result2?.id,
    });
  };

  function handleDiscover() {
    let index = -1;

    do {
      index = Math.round(Math.random() * breedLength);
    } while (bannedCatIds.includes(index));
    setBreedId(index);
  }

  function banCat(): void {
    setBannedCatIds([...bannedCatIds, breedId]);
  }

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center", color: "green" }}
      >
        <h3>Discover the Wildest Cats</h3>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "16px",
        }}
      >
        <CatCard
          url={currentCat?.url}
          id={currentCat?.id}
          description={currentCat?.description}
          country={currentCat?.country}
          weight={currentCat?.weight}
          wiki={currentCat?.wiki}
          alt={currentCat?.alt}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "16px",
        }}
      >
        <button
          type="button"
          className="btn btn-md btn-success"
          style={{ marginRight: "16px" }}
          onClick={handleDiscover}
        >
          Discover Cats
        </button>
        <button
          type="button"
          className="btn btn-md btn-danger"
          onClick={banCat}
        >
          Ban This Cat
        </button>
      </div>
    </>
  );
}

export default App;
