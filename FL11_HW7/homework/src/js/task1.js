let emails = ['user@gmail.com', 'admin@gmail.com'];// so the code is the same no matter how many users there are
let passwords = ['UserPass', 'AdminPass'];
let currentEmail = prompt('Enter your email, please', '');
let currentPassword;
const minumSymbEm = 6;
const minumSymbPas = 5;
let changePassConfirm;
let currentPassConfirm;
let newPassword;
let repeatNewPassword;
const nonExistingEl = -1;

//check login
if ( currentEmail === '' || currentEmail === null ) {
  alert('Canceled');
} else if ( currentEmail.length < minumSymbEm ) {
  alert('I don\'t know any emails having name length less than 6 symbols');
} else if ( emails.indexOf(currentEmail) !== nonExistingEl) {
  currentPassword = prompt('And now enter your password');
} else {
  alert('I don\'t know you');
}

//check the password and ask the confirmation to change it
if ( currentPassword === '' || currentPassword === null) {
  alert('Canceled');
} else if (currentPassword !== passwords[emails.indexOf(currentEmail)] ) {
  alert('Wrong password');
} else if (emails.indexOf(currentEmail) !== nonExistingEl){ //so this doesn't show up if email is invalid
  changePassConfirm = confirm('Do you want to change your password?');
}

//ask current password before changing it
 if ( changePassConfirm ) {
  currentPassConfirm = prompt('Now enter your current password');
} else if ( changePassConfirm !== undefined ){ //it appears only if a user presses OK or Cancel
  alert('You have failed the change.');
} 

// this block works if we get positive answer - change password
if ( !!currentPassConfirm === true &&
     currentPassConfirm === passwords[emails.indexOf(currentEmail)] ) {
  newPassword = prompt('Enter new password, please', '')
} else if(!!currentPassConfirm === true) {
    alert('Wrong password');
}

if (!!newPassword === true && newPassword.length < minumSymbPas) {
  newPassword = prompt('This password is too short. Sorry')
}

//this block will work only if a user's newPassword is valid
if (newPassword !== undefined &&
    newPassword !== null &&
    newPassword.length >= minumSymbPas) {
  repeatNewPassword = prompt('Repeat new password','')
}

// this block will work if newPassword and repeatNewPassword are valid
if (repeatNewPassword !== newPassword && !!newPassword === true) {
  alert('You wrote the wrong password.')
} else if (repeatNewPassword === newPassword && !!newPassword === true){
  passwords[emails.indexOf(currentEmail)] = newPassword;
  alert('You have successfully changed your password.')
}
