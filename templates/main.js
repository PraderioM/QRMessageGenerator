const EMAIL_HEADER = "mList: ";
const HEADER_SEPARATOR= " --- ";
const MESSAGE_HEADER = "msg: ";
const EMAIL_SEPARATOR = "; ";
const SUBJECT_HEADER = "subj: ";
const ID_HEADER = "uuid: ";


function init() {
    let addEmailBtn = document.getElementById('addEmailBtn');
    addEmailBtn.onclick = addEmail;
    let generateQRBtn = document.getElementById('generateQRBtn');
    generateQRBtn.onclick = generateQR;
}


function updateEmailList() {
    let emailListDiv = document.getElementById('emailListDiv');
    let innerHTML = '';
    for (let i=0; i< emailList.length; i++) {
        innerHTML += '<br>';
        innerHTML += `<label for="email${i}" class = "vertical-center left email-label" >e-mail ${i+1}: ${emailList[i]}</label>`;
        innerHTML += `<button class="remove-button vertical-center right" id="email${i}" onclick="removeEmail(${i})" >-</button>`;
    }
    emailListDiv.innerHTML = innerHTML;
}

function removeEmail(index) {
    emailList.splice(index, 1);
    updateEmailList();
}

function addEmail() {
    let newEmailInput = document.getElementById('newEmail');
    let newEmail = newEmailInput.value;
    newEmailInput.value = '';

    emailList.push(newEmail);
    updateEmailList();
}

function getNewEmail() {
    return document.getElementById('newEmail').value;
}

function getEmailSubject() {
    return document.getElementById('subject').value;
}

function getEmailMessage() {
    return document.getElementById('message').value;
}

function getHeight() {
    return parseInt(document.getElementById('height').value);
}

function getWidth() {
    return parseInt(document.getElementById('width').value);
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function generateQR() {
    // If there are no specified e-mails we show an alert and stop generation.
    if (emailList.length === 0) {
        alert('ERROR: you must specify at least one target e-mail.');
        return
    }

    // If there is currently an attempt of adding a new e-mail we show
    // an alert to prevent errors of missing added mails.
    let newEmail = getNewEmail();
    if (newEmail !== "") {
        alert(`WARNING: The mail ${newEmail} was not added to the mailing list even though it was specified.
Please add it to the e-mail list or remove it entirely.`);
        return
    }

    let alertString = 'Generated qr contains the following information:';
    let qrString = '';

    qrString += EMAIL_HEADER;
    qrString += emailList.join(EMAIL_SEPARATOR);
    alertString += '\ne-mails: ';
    alertString += emailList.join(', ');

    qrString += HEADER_SEPARATOR;

    qrString += SUBJECT_HEADER;
    let emailSubject = getEmailSubject();
    qrString += emailSubject;
    alertString += '\nsubject: ';
    alertString += emailSubject;

    qrString += HEADER_SEPARATOR;

    qrString += MESSAGE_HEADER;
    let message = getEmailMessage();
    qrString += message;
    alertString += '\nmessage: ';
    alertString += message;

    qrString += HEADER_SEPARATOR;

    qrString += ID_HEADER;
    let uuid = uuidv4();
    qrString += uuid;

    // Show an alert containing the information stored in the qr code.
    alert(alertString);

    // Create qr code.

    let qrcode = new QRCode(document.getElementById("qrCode"), {
	width : getWidth(),
	height : getHeight()
});
    qrcode.makeCode(qrString);
    let image = document.getElementsByTagName('img')[0];
    setTimeout( function() {
      let qrImage = image.src;

    // create a link that will be used to download the pdf.
    let PDFLink = document.createElement('a');
    // check if the browser supports the append method.
    try {
        document.body.append(PDFLink); // append to body.
    } catch (err) {}
    PDFLink.setAttribute("type", "hidden");  // hide link.
    PDFLink.download = `QRmessage_id${uuid}.png`;  // set name of download element.

    // set link pointing to a function that will be run on server side and that will be taking the parameters
    // following the symbol '&'.
    PDFLink.href = qrImage;

    // click generated link to run the above mentioned function and download the pdf.
    PDFLink.click();
    }, 500
)
}
