let a = 2 + 2;

switch (a) {
    case 3:
        alert('Too small');
        break;
    case 4:
        alert('Exactly!');
        break;
    case 5:
        alert('Too big');
        break;
    default:
        alert("I don't know such values");
}

// Grouping of “case”
let b = 3;
switch (b) {
    case 4:
        alert('Right!');
        break;

    case 3: // (*) grouped two cases
    case 5:
        alert('Wrong!');
        alert("Why don't you take a math class?");
        break;

    default:
        alert('The result is strange. Really.');
}

// Type matters
let arg = prompt("Enter a value?");
switch (arg) {
    case '0':
    case '1':
        alert('One or zero');
        break;

    case '2':
        alert('Two');
        break;

    case 3:
        alert('Never executes!');
        break;
    default:
        alert('An unknown value');
}