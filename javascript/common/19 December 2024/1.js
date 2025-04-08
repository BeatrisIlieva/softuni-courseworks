function solve(input) {
    const data = [...input];
    const number = data.shift();

    function findAstronautObj(name, astronautsObj) {
        return astronautsObj.find(obj => obj.name === name);
    }

    function checkIfSkillIsLearned(skill, astronautObj) {
        const skills = astronautObj.skills;
        return skills.includes(skill);
    }

    data.reduce((acc, curr) => {
        if (curr.includes('Perform')) {
            const [_, name, section, skill] = curr.split(' / ');

            const astronautObj = findAstronautObj(name, acc);
            const sectionIsCorrect = astronautObj.section === section;

            const hasTheSkill = checkIfSkillIsLearned(
                skill,
                astronautObj
            );

            const result =
                !sectionIsCorrect || !hasTheSkill
                    ? `${name} cannot perform the skill: ${skill}.`
                    : `${name} has successfully performed the skill: ${skill}!`;

            console.log(result);
        } else if (curr.includes('Transfer')) {
            const [_, name, section] = curr.split(' / ');

            const astronautObj = findAstronautObj(name, acc);

            astronautObj.section = section;

            console.log(
                `${name} has been transferred to: ${section}`
            );
        } else if (curr.includes('Learn Skill')) {
            const [_, name, newSkill] = curr.split(' / ');

            const astronautObj = findAstronautObj(name, acc);

            const hasTheSkill = checkIfSkillIsLearned(
                newSkill,
                astronautObj
            );

            const result = hasTheSkill
                ? `${name} already knows the skill: ${newSkill}.`
                : `${name} has learned a new skill: ${newSkill}.`;

            console.log(result);

            !hasTheSkill && astronautObj.skills.push(newSkill);
        } else if (curr.includes('End')) {
            acc.forEach(element => {
                const name = element.name;
                const section = element.section;
                let skills = element.skills.sort((a, b) => a.localeCompare(b))
                skills = skills.join(', ');

                console.log(
                    `Astronaut: ${name}, Section: ${section}, Skills: ${skills}`
                );
            });
        } else {
            let [name, section, skillsList] = curr.split(' ');

            skillsList = skillsList.split(',');

            acc.push({ name, section, skills: skillsList });
        }

        return acc;
    }, []);
}

solve([
    '2',
    'Alice command_module piloting,communications',
    'Bob engineering_bay repair,maintenance',
    'Perform / Alice / command_module / piloting',
    'Perform / Bob / command_module / repair',
    'Learn Skill / Alice / navigation',
    'Perform / Alice / command_module / navigation',
    'Transfer / Bob / command_module',
    'Perform / Bob / command_module / maintenance',
    'End'
]);
