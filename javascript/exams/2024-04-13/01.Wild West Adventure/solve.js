function solve(input) {
    const data = [...input];
    const count = data.shift();

    const characters = [];

    for (let i = 0; i < count; i++) {
        let [name, hp, bullets] = data.shift().split(' ');

        hp = Number(Math.min(hp, 100));
        bullets = Number(bullets);

        characters.push({ name, hp, bullets });
    }

    const commands = {
        FireShot(name, target) {
            const character = getCharacter(name);

            if (character) {
                if (character.bullets <= 0) {
                    console.log(
                        `${name} doesn't have enough bullets to shoot at ${target}!`
                    );
                } else {
                    character.bullets -= 1;

                    console.log(
                        `${name} has successfully hit ${target} and now has ${character.bullets} bullets!`
                    );
                }
            }
        },
        TakeHit(name, damage, attacker) {
            const character = getCharacter(name);

            if (character) {
                character.hp -= Number(damage);

                if (character.hp <= 0) {
                    const index = characters.findIndex(
                        character => character.name === name
                    );

                    characters.splice(index, 1);

                    console.log(
                        `${name} was gunned down by ${attacker}!`
                    );
                } else {
                    console.log(
                        `${name} took a hit for ${damage} HP from ${attacker} and now has ${character.hp} HP!`
                    );
                }
            }
        },
        Reload(name) {
            const character = getCharacter(name);

            if (character) {
                const currentBullets = character.bullets;

                if (currentBullets >= 6) {
                    console.log(`${name}'s pistol is fully loaded!`);
                } else {
                    character.bullets = Math.min(
                        character.bullets + 6,
                        6
                    );
                    const difference = Math.abs(
                        character.bullets - currentBullets
                    );

                    console.log(
                        `${name} reloaded ${difference} bullets!`
                    );
                }
            }
        },
        PatchUp(name, amount) {
            const character = getCharacter(name);

            if (character) {
                const currentHp = character.hp;

                if (currentHp >= 100) {
                    console.log(`${name} is in full health!`);
                } else {
                    character.hp = Math.min(
                        character.hp + Number(amount),
                        100
                    );
                    const difference = Math.abs(
                        character.hp - currentHp
                    );

                    console.log(
                        `${name} patched up and recovered ${difference} HP!`
                    );
                }
            }
        },
        'Ride Off Into Sunset'() {
            characters.forEach(character => {
                console.log(`${character.name}`);
                console.log(` HP: ${character.hp}`);
                console.log(` Bullets: ${character.bullets}`);
            });
        }
    };

    data.forEach(element => {
        const [command, ...rest] = element.split(' - ');

        commands[command](...rest);
    });

    function getCharacter(name) {
        return characters.find(character => character.name === name);
    }
}

solve((["2",
    "Jesse 100 4",
    "Walt 100 5",
    "FireShot - Jesse - Bandit",
     "TakeHit - Walt - 30 - Bandit",
     "PatchUp - Walt - 20" ,
     "Reload - Jesse",
     "Ride Off Into Sunset"]));
