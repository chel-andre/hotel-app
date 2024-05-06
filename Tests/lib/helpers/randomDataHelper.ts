const names = ['John', 'Emma', 'Michael', 'Sophia', 'William', 'Olivia', 'James', 'Ava', 'Robert', 'Isabella', 'David', 'Mia', 'Joseph', 'Emily', 'Daniel', 'Charlotte', 'Matthew', 'Amelia', 'Christopher', 'Evelyn'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Martinez', 'Robinson'];

export const generateRandomName = () => getRandomElementFromArray(names);

export const generateRandomLastName = () => getRandomElementFromArray(lastNames);

export const getRandomNumber = (maxValue = 999999) => Math.floor(Math.random() * maxValue);

export const getRandomString = () => Date.now().toString(36) + Math.random().toString(36).slice(2);

export function generateRandomEmail() {
    const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'example.com'];
    const randomDomainIndex = Math.floor(Math.random() * domains.length);
    const domain = domains[randomDomainIndex];
    const randomUsername = getRandomString();
    const email = `${randomUsername}@${domain}`;

    return email;
}

function getRandomElementFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}
