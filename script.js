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
    if(checkEmail()){
        userData.push(entry);
        console.log("Email haaaaa");
    }
    else{
        console.log("Email naaaa");
    }

    if(checkDate()){
        userData.push(entry);
        console.log("dob haaaaa");
    } else {
        console.log("dob naaaa");
    }


    localStorage.setItem("user-form", JSON.stringify(userData));
    displayEntries();
});

window.onload = (event) => {
    displayEntries();
};

// Validity For email
const emailVali = elements("exampleInputEmail1");
function checkEmail () {
    emailVali.addEventListener("input", (e) => {
        if (e.value.includes("@") && e.value.includes(".")) {
            e.style.border = "";
            e.setCustomValidity("");
            return true;
        } else {
            e.style.border = "1px solid red";
            e.setCustomValidity("Email must be of form 'johndoe@email.com'");
            e.reportValidity();
            return false;
        }
    });
}


// Validity for dob
const dobValidity = elements("dob");
function checkDate(){
    dobValidity.addEventListener("input", (e) => {
        let age = calculateAge(e.value);
        if (age < 18 || age > 55) {
            dob.setCustomValidity("You are not eligible. Ages 18 to 55 only");
            dob.reportValidity();
        } else {
            dob.setCustomValidity("");
        }
    })
}

function calculateAge (birthDate) {
    birthDate = new Date(birthDate);
    let otherDate = new Date();
    var years = (otherDate.getFullYear() - birthDate.getFullYear());
    if (otherDate.getMonth() < birthDate.getMonth() || 
        otherDate.getMonth() == birthDate.getMonth() && otherDate.getDate() < birthDate.getDate()) {
        years--;
    }
    return years;
}