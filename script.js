const container = document.getElementById('game-container');
  let playerName = '';

  const adventure = {
    intro: {
      text: `The cold wind bites at your face as you wake up alone in the vast wilderness of Alaska.\n\nAbove, the shimmering northern lights paint the sky in ribbons of green and purple.\n\nYou have no memory of how you got here, but survival is your only goal.`,
      choices: [
        { id: 'start', label: 'Continue' }
      ]
    },
    start: {
      text: (name) => `You gather your thoughts, ${name}. The icy tundra stretches before you.\n\nWhat do you want to do first?`,
      choices: [
        { id: 'findFood', label: 'Find Food' },
        { id: 'findCamp', label: 'Find Camp' }
      ]
    },
    findCamp: {
      text: (name) => `You decide to find a camp, ${name}.\n\nYou spot a sheltered cave nearby and a spot perfect for building a fire.`,
      choices: [
        { id: 'shelter', label: 'Go to Shelter' },
        { id: 'fire', label: 'Build a Fire' }
      ]
    },
    shelter: {
      text: `You shelter inside the cave. It's dark and quiet.\n\nDo you want to go out again or try to sleep here?`,
      choices: [
        { id: 'goOut', label: 'Go Out Again' },
        { id: 'sleep', label: 'Try to Sleep' }
      ]
    },
    sleep: {
      text: `You try to sleep, but the cold seeps in.\n\nUnfortunately, you freeze during the night.\n\nGAME OVER`,
      choices: [
        { id: 'restart', label: 'Restart' }
      ]
    },
    goOut: {
      text: `You step out into the cold.\n\nYou see a frozen lake for ice fishing and a bush full of berries nearby.`,
      choices: [
        { id: 'iceFishing', label: 'Go Ice Fishing' },
        { id: 'findBerries', label: 'Gather Berries' }
      ]
    },
    iceFishing: {
      text: `You try your luck at ice fishing.\n\nAfter a while, you can either return to camp or keep fishing.`,
      choices: [
        { id: 'returnCamp', label: 'Return to Camp' },
        { id: 'keepFishing', label: 'Keep Fishing' }
      ]
    },
    keepFishing: {
      text: `You stay too long on the ice.\n\nThe ice cracks and you fall in.\n\nGAME OVER`,
      choices: [
        { id: 'restart', label: 'Restart' }
      ]
    },
    returnCamp: {
      text: `You return to camp safely with some fish.\n\nYou survived another day!\n\nCONGRATULATIONS!`,
      choices: [
        { id: 'restart', label: 'Restart' }
      ]
    },
    findBerries: {
      text: `The berries are poisonous!\n\nAfter eating them, you get very sick.\n\nGAME OVER`,
      choices: [
        { id: 'restart', label: 'Restart' }
      ]
    },
    fire: {
      text: `You build a fire.\n\nDo you want to warm yourself or cook food?`,
      choices: [
        { id: 'warmYourself', label: 'Warm Yourself' },
        { id: 'cookFood', label: 'Cook Food' }
      ]
    },
    warmYourself: {
      text: `You warm yourself by the fire, but without food, you weaken and succumb to the cold.\n\nGAME OVER`,
      choices: [
        { id: 'restart', label: 'Restart' }
      ]
    },
    cookFood: {
      text: `You cook food over the fire and regain your strength.\n\nYou survive another day.\n\nCONGRATULATIONS!`,
      choices: [
        { id: 'restart', label: 'Restart' }
      ]
    },
    findFood: {
      text: `You look for food.\n\nYou can try ice fishing or gather berries.`,
      choices: [
        { id: 'iceFishing', label: 'Go Ice Fishing' },
        { id: 'findBerries', label: 'Gather Berries' }
      ]
    }
  };

  function renderTitleScreen() {
    container.innerHTML = `
      <h1>Welcome to Alaska Survival Adventure</h1>
      <p>Please enter your name to begin your journey:</p>
      <input type="text" id="nameInput" aria-label="Enter your name" placeholder="Your name here" />
      <button id="startBtn" disabled>Start Adventure</button>
    `;

    const nameInput = document.getElementById('nameInput');
    const startBtn = document.getElementById('startBtn');

    nameInput.addEventListener('input', () => {
      startBtn.disabled = nameInput.value.trim() === '';
    });

    startBtn.addEventListener('click', () => {
      playerName = nameInput.value.trim();
      if (playerName) {
        renderScreen('intro');
      }
    });

    nameInput.focus();
  }

  function renderScreen(screenId) {
    const screen = adventure[screenId];
    if (!screen) {
      container.innerHTML = `<p>Oops, something went wrong.</p>`;
      return;
    }

    container.innerHTML = '';

    const h1 = document.createElement('h1');
    h1.textContent = 'Alaska Survival Adventure';
    container.appendChild(h1);

    const p = document.createElement('p');
    const text = typeof screen.text === 'function' ? screen.text(playerName) : screen.text;
    p.innerHTML = text.replace(/\n/g, '<br>');
    container.appendChild(p);

    const choicesDiv = document.createElement('div');
    choicesDiv.className = 'choices';

    screen.choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.textContent = choice.label;
      btn.setAttribute('aria-label', choice.label);
      if (screenId === 'intro' && choice.label === 'Continue') {
        btn.classList.add('continue-btn');
        btn.disabled = true;
        btn.tabIndex = -1;

        setTimeout(() => {
          btn.disabled = false;
          btn.tabIndex = 0;
          btn.classList.add('enabled');
          btn.focus();
        }, 3000);

        btn.onclick = () => {
          if (!btn.disabled) {
            renderScreen(choice.id);
          }
        };
      } else {
        btn.onclick = () => {
          if (choice.id === 'restart') {
            renderTitleScreen();
          } else {
            renderScreen(choice.id);
          }
        };
      }
      choicesDiv.appendChild(btn);
    });

    container.appendChild(choicesDiv);
    container.focus();
  }
  renderTitleScreen();
