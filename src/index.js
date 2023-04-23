let addToy = ;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

const toyCollection = document.querySelector('#toy-collection');

fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(toys => {
    toys.forEach(toy => {
      const cardDiv = document.createElement('div');
      cardDiv.className = 'card';

      const h2 = document.createElement('h2');
      h2.textContent = toy.name;

      const img = document.createElement('img');
      img.src = toy.image;
      img.className = 'toy-avatar';

      const p = document.createElement('p');
      p.textContent = `${toy.likes} likes`;

      const button = document.createElement('button');
      button.className = 'like-btn';
      button.id = toy.id;
      button.textContent = 'Like';
      button.addEventListener('click', () => {
        likeToy(toy, p);
      });

      cardDiv.appendChild(h2);
      cardDiv.appendChild(img);
      cardDiv.appendChild(p);
      cardDiv.appendChild(button);

      toyCollection.appendChild(cardDiv);
    });
  })
  .catch(error => console.log(error));

  function addNewToy(toy) {
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(toy)
    })
      .then(response => response.json())
      .then(newToy => {
        const cardDiv = createToyCard(newToy);
        toyCollection.appendChild(cardDiv);
        form.reset();
      })
      .catch(error => console.log(error));
  }

  function likeToy(toy, p) {
    toy.likes++;
    p.textContent = `${toy.likes} likes`;
  
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ likes: toy.likes })
    })
      .then(response => response.json())
      .then(updatedToy => console.log(updatedToy))
      .catch(error => console.log(error));
  }