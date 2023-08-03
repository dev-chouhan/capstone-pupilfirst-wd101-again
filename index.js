// Validate Email
const email = document.getElementById("email");
email.addEventListener("input", function (event) {
    if (email.value.includes("@")&&email.value.includes(".")) {
        email.style.border = "";
        email.setCustomValidity("");
    } else {
        email.style.border = "3px solid red";
        email.setCustomValidity("This is not a valid email address!");
        email.reportValidity();
    }
});

// Validate DOB
const dob = document.getElementById("dob");

const debounce = (callback, time) => {
    let debounceTimer;
    return (e) => {
        window.clearTimeout(debounceTimer);
        debounceTimer = window.setTimeout(callback.bind(null, e), time);
    };
};

function _calculateAge(birthday) {
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

const validateAge = (e) => {
    const now = new Date(e.target.value);
    const age = _calculateAge(now);
    if (age < 18 || age > 55) {
        dob.setCustomValidity("You are not eligible. Ages 18 to 55 only");
        dob.reportValidity();
    } else {
        dob.setCustomValidity("");
    }
};

dob.addEventListener("input", debounce(validateAge, 700));

// Save and Display Entries
let userEntries = localStorage.getItem("user-entries");
if (userEntries) {
    userEntries = JSON.parse(userEntries);
} else {
    userEntries = [];
}

const saveUserForm = (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptTermsAndConditions =
        document.getElementById("acceptTerms").checked;
    const userDetails = {
        name,
        email,
        password,
        dob,
        acceptTermsAndConditions,
    };
    userEntries.push(userDetails);
    localStorage.setItem("user-entries", JSON.stringify(userEntries));

    displayEntries();

    document.getElementById("user_form").reset();

    const submitButton = document.getElementById("submit");
    submitButton.innerText = "Submitted!";
    setTimeout(() => {
        submitButton.innerText = "Submit";
    }, 1000);
};

const displayEntries = () => {
    const savedUserEntries = localStorage.getItem("user-entries");
    let entries = "";
    if (savedUserEntries) {
        const parsedUserEntries = JSON.parse(savedUserEntries);
        entries = parsedUserEntries
            .map((entry) => {
                const name = `<td class="text-sm text-gray-900 text-center px-6 py-4 whitespace-nowrap">${entry.name}</td>`;
                const email = `<td class="text-sm text-gray-900 text-center px-6 py-4 whitespace-nowrap">${entry.email}</td>`;
                const password = `<td class="text-sm text-gray-900 text-center px-6 py-4 whitespace-nowrap">${entry.password}</td>`;
                const dob = `<td class="text-sm text-gray-900 text-center px-6 py-4 whitespace-nowrap">${entry.dob}</td>`;
                const acceptTerms = `<td class="text-sm text-gray-900 text-center px-6 py-4 whitespace-nowrap">${entry.acceptTermsAndConditions}</td>`;
                const row = `<tr class="bg-white border-b">${name} ${email} ${password} ${dob} ${acceptTerms}</tr>`;
                return row;
            })
            .join("\n");
    }
    var table = `<table class="min-w-full mt-12" border='1' width='100%'><tr>
        <th>Name</th>
        <th>Email</th>
        <th>Password</th>
        <th>DOB</th>
        <th>Accepted Terms?</th>
        </tr>${entries} </table>`;
    let details = document.getElementById("user-entries");
    details.innerHTML = table;
};

let form = document.getElementById("user_form");
form.addEventListener("submit", saveUserForm, true);
displayEntries();

document.getElementById("view-entries-btn").addEventListener("click", () => {
    document.getElementById("view-entries").scrollIntoView();
});
