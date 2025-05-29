function getRandomPowerItemHero(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export default getRandomPowerItemHero

import HeroesPage from "../pages/heroes-create-form"

export function getRandomHeroPowerWithPromise() {
  return HeroesPage.getAllPowerText().then(allPowers => {
    const randomPower = getRandomPowerItemHero(allPowers);
    cy.log(`Poder escolhido foi: ${randomPower}`);
    return randomPower;
  });
}