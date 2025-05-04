const form = document.getElementById('form');

const button = document.querySelector('button');

button.addEventListener('click', function (event) {
    let valid = true;
    const inputElements = form.querySelectorAll('.form-group > input');

    inputElements.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            valid = false;
            input.classList.add('custom-error');
        } else {
            input.classList.remove('custom-error');
        }
    });
    if (!valid) {
        event.preventDefault();
    }
});

// ADDING FRONT END ERROR AT THE PLACE OF DJANGO'S ONES

// const form = document.getElementById("form");

// form.addEventListener("submit", function(event) {
//     let valid = true;

//     // Clear previous frontend error messages
//     form.querySelectorAll('.error-message').forEach(div => {
//         // Only clear JS-generated messages (not backend ones)
//         div.querySelectorAll('.frontend-error').forEach(el => el.remove());
//     });

//     form.querySelectorAll("input, textarea, select").forEach(input => {
//         const errorDiv = document.getElementById("error-" + input.name);
//         if (input.hasAttribute("required") && !input.value.trim()) {
//             valid = false;

//             const p = document.createElement("p");
//             p.classList.add("frontend-error");
//             p.style.color = "red";
//             p.innerText = `${input.name} is required`;

//             errorDiv.appendChild(p);
//         }
//     });

//     if (!valid) {
//         event.preventDefault(); // Stop submission
//     }
// });

