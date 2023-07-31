let userData = [];
let elements = (id) => document.getElementById(id);

// Display User data;
const reteriveUserData = () => {
    let entries = localStorage.getItem("user-form");
    if (entries) {
        userData = JSON.parse(entries);
    } else {
        userData = [];
    }
    return userData;
};

const displayEntries = () => {
    let entries = reteriveUserData();
    let str = `<tr>
    <th class="px-4 py-2" scope="col">Name</th>
    <th class="px-4 py-2" scope="col">Email</th>
    <th class="px-4 py-2" scope="col">Password</th>
    <th class="px-4 py-2" scope="col">D.O.B</th>
    <th class="px-4 py-2" scope="col">Accepted terms?</th>
    </tr>`;

    entries.forEach((entry) => {
        const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
        const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
        const passCell = `<td class='border px-4 py-2'>${entry.pass}</td>`;
        const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`;
        const acceptCell = `<td class='border px-4 py-2'>${entry.accept}</td>`;

        str += `<tr>${nameCell} ${emailCell} ${passCell} ${dobCell} ${acceptCell}</tr>`;
    });
    elements("dataTable").innerHTML = str;
};

// Save user data;
let userForm = elements("user-form");

userForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let name = elements("exampleInputName").value;
    let email = elements("exampleInputEmail1").value;
    let pass = elements("pass").value;
    let dob = elements("dob").value;
    let accept = elements("accTerms").checked;

    let entry = {
        name,
        email,
        pass,
        dob,
        accept,
    };

    if(checkEmailAndDob()){
        userData.push(entry);
    }
    localStorage.setItem("user-form", JSON.stringify(userData));
    displayEntries();
});

window.onload = (event) => {
    displayEntries();
};

// Validity Checking
const emailVali = elements("exampleInputEmail1");
const dobValidity = elements("dob");

function checkEmailAndDob () {
    let opt = true;
    // For email
    if (emailVali.value.includes("@") && emailVali.value.includes(".")) {
        emailVali.style.border = "";
        emailVali.setCustomValidity("");
        opt = true;
    } else {
        emailVali.style.border = "1px solid red";
        emailVali.setCustomValidity("Email must be of form 'johndoe@email.com'");
        emailVali.reportValidity();
        opt = false;
    }
    // For age
    let age = calculateAge(dobValidity.value);
    if (age < 18 || age > 55) {
        dobValidity.setCustomValidity("You are not eligible. Ages 18 to 55 only");
        dobValidity.reportValidity();
        opt = false;
    } else {
        dobValidity.setCustomValidity("");
        opt = true;
    }
    return opt;
}

function calculateAge (birthday){
    const ageDifMs = Date.now() - new Date(birthday).getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}