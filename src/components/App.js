import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  function handleChangeType (filter) {
    setFilters(filter)
  }

const url = (`http://localhost:3001/pets${filters.type === 'all' ? "" :  `?type=${filters.type}`}`)

  function handleFindPetsClick () {
    fetch(url)
    .then(r=>r.json())
    .then((pets) => setPets(pets))
  }

  //we get the pets id from the pet component through the callback function, then we update our current array by mapping through pets and returning every pet as it is unless if the pets id matches, then we construct a new object with pet and set isAdopted to true
  function handleAdoptPet(id) {
    const updatedPets = pets.map((pet) => {
      return pet.id === id ? {...pet, isAdopted: true} : pet
    })
    setPets(updatedPets)
    }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onFindPetsClick={handleFindPetsClick} onChangeType={handleChangeType} />
          </div>
          <div className="twelve wide column">
            <PetBrowser onAdoptPet={handleAdoptPet} pets={pets}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
