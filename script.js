let userData = [];
let elements = (id) => document.getElementById(id);

// Display User data;
const reteriveUserData = () => {
    let entries = localStorage.getItem("user-form");
    if (entries) {
        entries = JSON.parse(entries);
        console.log(entries);
    } else {
        entries = [];
    }
    return entries;
};

let userEnteries = reteriveUserData();
let tableEnteries = [];

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
        const acceptCell = `<td class='border px-4 py-2'>${entry.check}</td>`;

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
    let accept = elements("accTerms").value;

    let check = false;
    if(accept.checked) check = true;

    let entry = {
        name,
        email,
        pass,
        dob,
        check,
    };

    userData.push(entry);

    localStorage.setItem("user-form", JSON.stringify(userData));
    displayEntries();
});

displayEntries();

// Validity

const emailVali = elements("exampleInputEmail1");
emailVali.addEventListener("input", () => Validate(email));
function Validate(elem) {
    if (elem.Validity.typeMismatch) {
        elem.style.border = "1px solid red";
        elem.setCustomValidity("Email must be of form 'johndoe@email.com'");
        elem.reportValidity();
    } else {
        elem.style.border = "";
        elem.setCustomValidity("");
    }
}
