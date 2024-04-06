let contacts = [
    {
        name: 'Anja Schulz',
        email: 'schulz@gmail.com',
        img: '../assets/img/person.png',
        color: 'blue',
        phone: '+1234567890'
    },
    {
        name: 'John Smith',
        email: 'john.smith@example.com',
        img: '../assets/img/person.png',
        color: 'green',
        phone: '+2345678901'
    },
    {
        name: 'Maria Garcia',
        email: 'maria.garcia@example.com',
        img: '../assets/img/person.png',
        color: 'red',
        phone: '+3456789012'
    },
    {
        name: 'Ahmed Khan',
        email: 'ahmed.khan@example.com',
        img: '../assets/img/person.png',
        color: 'yellow',
        phone: '+4567890123'
    },
    {
        name: 'Sophie Martin',
        email: 'sophie.martin@example.com',
        img: '../assets/img/person.png',
        color: 'purple',
        phone: '+5678901234'
    },
    {
        name: 'David Lee',
        email: 'david.lee@example.com',
        img: '../assets/img/person.png',
        color: 'orange',
        phone: '+6789012345'
    },
    {
        name: 'Anna Wang',
        email: 'anna.wang@example.com',
        img: '../assets/img/person.png',
        color: 'pink',
        phone: '+7890123456'
    },
    {
        name: 'Diego Rodriguez',
        email: 'diego.rodriguez@example.com',
        img: '../assets/img/person.png',
        color: 'cyan',
        phone: '+8901234567'
    },
    {
        name: 'Elena Petrova',
        email: 'elena.petrova@example.com',
        img: '../assets/img/person.png',
        color: 'magenta',
        phone: '+9012345678'
    },
    {
        name: 'Mohammed Ali',
        email: 'mohammed.ali@example.com',
        img: '../assets/img/person.png',
        color: 'brown',
        phone: '+0123456789'
    },
    {
        name: 'Anja Schulz',
        email: 'schulz@gmail.com',
        img: '../assets/img/person.png',
        color: 'gray',
        phone: '+1234567890'
    },
    {
        name: 'John Smith',
        email: 'john.smith@example.com',
        img: '../assets/img/person.png',
        color: 'lightblue',
        phone: '+2345678901'
    },
    {
        name: 'Maria Garcia',
        email: 'maria.garcia@example.com',
        img: '../assets/img/person.png',
        color: 'lightgreen',
        phone: '+3456789012'
    },
    {
        name: 'Ahmed Khan',
        email: 'ahmed.khan@example.com',
        img: '../assets/img/person.png',
        color: 'lightred',
        phone: '+4567890123'
    },
    {
        name: 'Sophie Martin',
        email: 'sophie.martin@example.com',
        img: '../assets/img/person.png',
        color: 'lightyellow',
        phone: '+5678901234'
    },
    {
        name: 'David Lee',
        email: 'david.lee@example.com',
        img: '../assets/img/person.png',
        color: 'lightpurple',
        phone: '+6789012345'
    }
];


function showContacts() {
    contacts = JSON.parse(localStorage.getItem('ContactsArray'));
    let content = document.getElementById('contactsMenu');
    content.innerHTML = '';

    sortContacts();
    let currentLetter = '';
    contacts.forEach((contact, index) => {
        const [firstLetter, secondLetter] = findFirstLetters(index); // Destructuring assignment to get firstLetter and secondLetter

        if (firstLetter !== currentLetter) {
            currentLetter = firstLetter;
            content.innerHTML += `<div class="filter">${firstLetter}</div>`;
        }

        content.innerHTML += `
        <div class="contact" id="contact${index}" onclick="showInfo(${index});addBgColor(${index});">
            <h6 class="orange-cn" style="background-color:${contact.color}">${firstLetter}${secondLetter}</h6>
            <div class="contact-info">
                <h3 id="contact-name${index}">${contact.name}</h3>
                <h5>${contact.email}</h5>
            </div>
        </div>
        `;
    });
    
}

function sortContacts(){
    
    contacts.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0; 
    });
}

function findFirstLetters(contactIndex) {
    const nameParts = contacts[contactIndex].name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts[1];
    const firstLetter = firstName[0];
    const secondLetter = lastName ? lastName[0] : ''; // Handle cases where lastName might be undefined
    return [firstLetter, secondLetter]; // Return as an array
}

function showInfo(contact) {
    const [firstLetter, secondLetter] = findFirstLetters(contact);
    const name = contacts[contact].name;
    const email = contacts[contact].email;
    const phone = contacts[contact].phone;
    const color = contacts[contact].color;

    let content = document.getElementById('contact-container');
    content.classList.remove('hidden');
    document.getElementById('right-contacts').style.display = 'block';
    content.innerHTML ='';

    content.innerHTML += returnContactInfo(name,email,phone,color,firstLetter,secondLetter,contact);
}

function returnContactInfo(name,email,phone,color,firstLetter,secondLetter,contact) {
    return `<div class="contact-name">
        <div class="contact-img">
            <h2 style="background-color:${color}">${firstLetter}${secondLetter}</h2>
            <div class="name-container">
                <h3>${name}</h3>
                <div class="edit-delete">
                    <div class="edit" onclick="editContact(${contact})"><svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 17H3.4L12.025 8.375L10.625 6.975L2 15.6V17ZM16.3 6.925L12.05 2.725L13.45 1.325C13.8333 0.941667 14.3042 0.75 14.8625 0.75C15.4208 0.75 15.8917 0.941667 16.275 1.325L17.675 2.725C18.0583 3.10833 18.2583 3.57083 18.275 4.1125C18.2917 4.65417 18.1083 5.11667 17.725 5.5L16.3 6.925ZM14.85 8.4L4.25 19H0V14.75L10.6 4.15L14.85 8.4Z" fill="#2A3647"/>
                    </svg>
                    <h5>Edit</h5></div>
                    <div class="delete" onclick="deleteContact(${contact})"><svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3C0.716667 3 0.479167 2.90417 0.2875 2.7125C0.0958333 2.52083 0 2.28333 0 2C0 1.71667 0.0958333 1.47917 0.2875 1.2875C0.479167 1.09583 0.716667 1 1 1H5C5 0.716667 5.09583 0.479167 5.2875 0.2875C5.47917 0.0958333 5.71667 0 6 0H10C10.2833 0 10.5208 0.0958333 10.7125 0.2875C10.9042 0.479167 11 0.716667 11 1H15C15.2833 1 15.5208 1.09583 15.7125 1.2875C15.9042 1.47917 16 1.71667 16 2C16 2.28333 15.9042 2.52083 15.7125 2.7125C15.5208 2.90417 15.2833 3 15 3V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM3 3V16H13V3H3ZM5 13C5 13.2833 5.09583 13.5208 5.2875 13.7125C5.47917 13.9042 5.71667 14 6 14C6.28333 14 6.52083 13.9042 6.7125 13.7125C6.90417 13.5208 7 13.2833 7 13V6C7 5.71667 6.90417 5.47917 6.7125 5.2875C6.52083 5.09583 6.28333 5 6 5C5.71667 5 5.47917 5.09583 5.2875 5.2875C5.09583 5.47917 5 5.71667 5 6V13ZM9 13C9 13.2833 9.09583 13.5208 9.2875 13.7125C9.47917 13.9042 9.71667 14 10 14C10.2833 14 10.5208 13.9042 10.7125 13.7125C10.9042 13.5208 11 13.2833 11 13V6C11 5.71667 10.9042 5.47917 10.7125 5.2875C10.5208 5.09583 10.2833 5 10 5C9.71667 5 9.47917 5.09583 9.2875 5.2875C9.09583 5.47917 9 5.71667 9 6V13Z" fill="#2A3647"/>
                    </svg>
                    <h5>Delete</h5></div>
                </div>
            </div>
        </div>
        <div class="contact-information">
            <h5>Contact information</h5>
            <h6>Email</h6>
            <p class="blue">${email}</p>
            <h6>Phone</h6>
            <p>${phone}</p>
        </div>
    </div>
    <button class="editContactIcon" onclick="editContact(${contact});"><img src="./assets/img/more_vert.png"></button>
    `;
}

function editContact(contact) {
    const [firstLetter, secondLetter] = findFirstLetters(contact);
    let content = document.getElementById('editContactContainer');
    
    content.classList.remove('hidden');
    content.innerHTML = "";
    content.innerHTML += `
    <div class="left-add">
        <img src="../assets/img/Capa 1.png">
        <h4>Edit contact</h4>
    </div>
    <div class="right-add contact-img">
    <h2 style="background-color:${contacts[contact].color};margin-left:12%;">${firstLetter}${secondLetter}</h2>
    
        <div class="add-contact">
            <section class="logInContainer">
                <form id="addContactForm">
                    <div class="email-container">
                        <input id="name" class="input_field name" placeholder="Name">
                        <img class="lock-icon" src="../assets/img/person.png" alt="">
                    </div>
                    <div class="email-container">
                        <input id="email" class="input_field email" required type="email" placeholder="Email">
                        <img class="mail-icon" src="../assets/img/mail.png">
                    </div>
                    <div class="email-container">
                        <input id="phone" class="input_field email" required type="phone" placeholder="Phone">
                        <img class="mail-icon" src="../assets/img/call.png">
                    </div>

                    <div class="buttons-container">
                        <button class="cancel" onclick="closeContainer('editContactContainer');deleteContact(${contact})">Delete</button>
                        <button type="button" class="create" onclick="editContactInfo(${contact});closeContainer('editContactContainer');">Save<img src="../assets/img/Vector (2).png"></button>
                    </div>
                </form>
            </section>
        </div>
    </div>
    `;
    document.getElementById('name').value = contacts[contact].name;
    document.getElementById('email').value = contacts[contact].email;
    document.getElementById('phone').value = contacts[contact].phone;
    document.addEventListener('mouseup', function(e) {
        if (!content.contains(e.target)) {
        content.classList.add('hidden');
        }
    });
    showContacts();
}

function addBgColor(index) {
    // Remove background color from all elements with IDs starting with 'contact' followed by the index
    let elements = document.querySelectorAll('[id^="contact"]');
    elements.forEach(element => {
        element.style.backgroundColor = "transparent";
    });

    let names = document.querySelectorAll('[id^="contact-name"]');
    names.forEach(element => {
        element.style.color="black";
    })
    // Set background color for the newly clicked element
    document.getElementById(`contact${index}`).style.cssText= `background-color:#2a3647;border-radius:10px;`;
    let contactNameElement = document.getElementById(`contact-name${index}`);
    contactNameElement.style.color = "white";
}

function addNewContact() {
    let content = document.getElementById('addContactContainer');
    content.classList.remove('hidden');
    content.innerHTML = "";

    content.innerHTML += `
    <div class="left-add">
        <img src="../assets/img/Capa 1.png">
        <h4>Add contact</h4>
        <h6>Tasks are better with a team!</h6>
    </div>
    <div class="right-add">
        <svg width="64" height="54" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.0001 22.0001C19.0667 22.0001 16.5556 20.9556 14.4667 18.8667C12.3779 16.7779 11.3334 14.2667 11.3334 11.3334C11.3334 8.40008 12.3779 5.88897 14.4667 3.80008C16.5556 1.71119 19.0667 0.666748 22.0001 0.666748C24.9334 0.666748 27.4445 1.71119 29.5334 3.80008C31.6223 5.88897 32.6667 8.40008 32.6667 11.3334C32.6667 14.2667 31.6223 16.7779 29.5334 18.8667C27.4445 20.9556 24.9334 22.0001 22.0001 22.0001ZM38.0001 43.3334H6.00008C4.53341 43.3334 3.27786 42.8112 2.23341 41.7668C1.18897 40.7223 0.666748 39.4668 0.666748 38.0001V35.8667C0.666748 34.3556 1.05564 32.9667 1.83341 31.7001C2.61119 30.4334 3.64453 29.4667 4.93341 28.8001C7.68897 27.4223 10.489 26.389 13.3334 25.7001C16.1779 25.0112 19.0667 24.6667 22.0001 24.6667C24.9334 24.6667 27.8223 25.0112 30.6667 25.7001C33.5112 26.389 36.3112 27.4223 39.0667 28.8001C40.3556 29.4667 41.389 30.4334 42.1667 31.7001C42.9445 32.9667 43.3334 34.3556 43.3334 35.8667V38.0001C43.3334 39.4668 42.8112 40.7223 41.7668 41.7668C40.7223 42.8112 39.4668 43.3334 38.0001 43.3334ZM6.00008 38.0001H38.0001V35.8667C38.0001 35.3779 37.8779 34.9334 37.6334 34.5334C37.389 34.1334 37.0667 33.8223 36.6667 33.6001C34.2668 32.4001 31.8445 31.5001 29.4001 30.9001C26.9556 30.3001 24.489 30.0001 22.0001 30.0001C19.5112 30.0001 17.0445 30.3001 14.6001 30.9001C12.1556 31.5001 9.73341 32.4001 7.33342 33.6001C6.93341 33.8223 6.61119 34.1334 6.36675 34.5334C6.1223 34.9334 6.00008 35.3779 6.00008 35.8667V38.0001ZM22.0001 16.6667C23.4667 16.6667 24.7223 16.1445 25.7668 15.1001C26.8112 14.0556 27.3334 12.8001 27.3334 11.3334C27.3334 9.86675 26.8112 8.61119 25.7668 7.56675C24.7223 6.5223 23.4667 6.00008 22.0001 6.00008C20.5334 6.00008 19.2779 6.5223 18.2334 7.56675C17.189 8.61119 16.6667 9.86675 16.6667 11.3334C16.6667 12.8001 17.189 14.0556 18.2334 15.1001C19.2779 16.1445 20.5334 16.6667 22.0001 16.6667Z" fill="white"/>
        </svg>
    
        <div class="add-contact">
            <section class="logInContainer">
                <form id="addContactForm">
                    <div class="email-container">
                        <input id="name" class="input_field name" placeholder="Name">
                        <img class="lock-icon" src="../assets/img/person.png" alt="">
                    </div>
                    <div class="email-container">
                        <input id="email" class="input_field email" required type="email" placeholder="Email">
                        <img class="mail-icon" src="../assets/img/mail.png">
                    </div>
                    <div class="email-container">
                        <input id="phone" class="input_field email" required type="phone" placeholder="Phone">
                        <img class="mail-icon" src="../assets/img/call.png">
                    </div>

                    <div class="buttons-container">
                        <button class="cancel" onclick="closeContainer('addContactContainer');">Cancel <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.001 6.50008L12.244 11.7431M1.758 11.7431L7.001 6.50008L1.758 11.7431ZM12.244 1.25708L7 6.50008L12.244 1.25708ZM7 6.50008L1.758 1.25708L7 6.50008Z" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        </button>
                        <button type="button" class="create" onclick="addContactToArray();closeContainer('addContactContainer');">Create contact<img src="../assets/img/Vector (2).png"></button>
                    </div>
                </form>
            </section>
        </div>
    </div>
    `;
    document.addEventListener('mouseup', function(e) {
        if (!content.contains(e.target)) {
        content.classList.add('hidden');
        }
    });
}

function closeContainer(id) {
    document.getElementById(id).classList.add("hidden");
}

function addContactToArray() {
    
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;

    // Create a new contact object
    let newContact = {
        name: name,
        email: email,
        phone: phone,
        img: '../assets/img/person.png',
        color: 'blue' 
    };

    let contacts = JSON.parse(localStorage.getItem('ContactsArray') || '[]');
    // Push the new contact to the array
    contacts.push(newContact);
    localStorage.setItem('ContactsArray', JSON.stringify(contacts)); 

    showContacts();
}

function deleteContact(contact) {
    contacts.splice(contact,1);
    localStorage.setItem('ContactsArray', JSON.stringify(contacts));
    document.getElementById("contact-container").classList.add("hidden");
    showContacts();
}

function editContactInfo(contactId) {
    
    const newName = document.getElementById('name').value;
    const newEmail = document.getElementById('email').value;
    const newPhone = document.getElementById('phone').value;

    // Update the contact object with the new values
    contacts[contactId].name = newName;
    contacts[contactId].email = newEmail;
    contacts[contactId].phone = newPhone;
    localStorage.setItem('ContactsArray', JSON.stringify(contacts));

    showContacts();
    showInfo(contactId);
}