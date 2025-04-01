function lockedProfile() {
    const profileElement = document.querySelector('.profile');
    profileElement.remove();

    const mainElement = document.getElementById('main');

    const baseUrl =
        'http://localhost:3030/jsonstore/advanced/profiles';

    fetch(baseUrl)
        .then(response => response.json())
        .then(result => {
            Object.values(result).forEach((item, index) => {
                mainElement.appendChild(
                    createProfileElement(item, index)
                );
            });
        });

    function createProfileElement(data, index) {
        const imgElement = document.createElement('img');
        imgElement.src = './iconProfile2.png';
        imgElement.classList.add('userIcon');

        const lockLabelElement = document.createElement('label');
        lockLabelElement.textContent = 'Lock';

        const lockInputElement = document.createElement('input');
        lockInputElement.type = 'radio';
        lockInputElement.name = `user${index + 1}Locked`;
        lockInputElement.value = 'lock';
        lockInputElement.setAttribute('checked', 'checked');

        const unlockLabelElement = document.createElement('label');
        unlockLabelElement.textContent = 'Unlock';

        const unlockInputElement = document.createElement('input');
        unlockInputElement.type = 'radio';
        unlockInputElement.name = `user${index + 1}Locked`;
        unlockInputElement.value = 'unlock';

        const firstHrElement = document.createElement('hr');

        const usernameLabelElement = document.createElement('label');
        usernameLabelElement.textContent = 'Username';

        const usernameInputElement = document.createElement('input');
        usernameInputElement.type = 'text';
        usernameInputElement.name = `user${index + 1}Username`;
        usernameInputElement.value = data.username;
        usernameInputElement.setAttribute('disabled', 'disabled');
        usernameInputElement.setAttribute('readonly', 'readonly');

        const secondHrElement = document.createElement('hr');

        const emailLabelElement = document.createElement('label');
        emailLabelElement.textContent = 'Email:';

        const emailInputElement = document.createElement('input');
        emailInputElement.type = 'email';
        emailInputElement.name = `user${index + 1}Email`;
        emailInputElement.value = data.email;
        emailInputElement.setAttribute('disabled', 'disabled');
        emailInputElement.setAttribute('readonly', 'readonly');

        const ageLabelElement = document.createElement('label');
        ageLabelElement.textContent = 'Email:';

        const ageInputElement = document.createElement('input');
        ageInputElement.type = 'number';
        ageInputElement.name = `user${index + 1}Age`;
        ageInputElement.value = data.age;
        ageInputElement.setAttribute('disabled', 'disabled');
        ageInputElement.setAttribute('readonly', 'readonly');

        const hiddenContent = document.createElement('div');
        hiddenContent.classList.add(`user${index + 1}Username`);
        hiddenContent.style.display = 'none';
        hiddenContent.appendChild(secondHrElement);
        hiddenContent.appendChild(emailLabelElement);
        hiddenContent.appendChild(emailInputElement);
        hiddenContent.appendChild(ageLabelElement);
        hiddenContent.appendChild(ageInputElement);

        const showMoreButtonElement =
            document.createElement('button');
        showMoreButtonElement.textContent = 'Show more';

        showMoreButtonElement.addEventListener('click', e => {
            if (lockInputElement.checked) {
                return;
            }

            const hiddenContentIsDisplayed =
                showMoreButtonElement.textContent == 'Hide it';

            hiddenContent.style.display = hiddenContentIsDisplayed
                ? 'none'
                : 'block';
            showMoreButtonElement.textContent =
                hiddenContentIsDisplayed ? 'Show more' : 'Hide it';
        });

        const profileElement = document.createElement('div');
        profileElement.classList.add('profile');
        profileElement.appendChild(imgElement);
        profileElement.appendChild(lockLabelElement);
        profileElement.appendChild(lockInputElement);
        profileElement.appendChild(unlockLabelElement);
        profileElement.appendChild(unlockInputElement);
        profileElement.appendChild(firstHrElement);
        profileElement.appendChild(usernameLabelElement);
        profileElement.appendChild(usernameInputElement);
        profileElement.appendChild(hiddenContent);
        profileElement.appendChild(showMoreButtonElement);

        return profileElement;
    }
}
