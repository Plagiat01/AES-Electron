const signer = require('node-signpdf').default;
const { plainAddPlaceholder } = require('node-signpdf/dist/helpers');

function sign_pdf(path_pdf, path_certificate, passphrase){
    var pdfBuffer = fs.readFileSync(path_pdf);
    var p12Buffer = fs.readFileSync(path_certificate);

    pdfBuffer = plainAddPlaceholder({
        pdfBuffer,
        signatureLenght: 1612
    });

    if (passphrase == ''){
        try{
            pdfBuffer = signer.sign(pdfBuffer, p12Buffer);
        } catch {
            alert("Wrong password.");
            return false;
        }
    } else {
        try {
            pdfBuffer = signer.sign(pdfBuffer, p12Buffer, {passphrase: passphrase});
        } catch {
            alert("Wrong password.");
            return false;
        }
    }

    var output_path = path_pdf.replace(/\.[^/.]+$/, "") + '_signed.pdf';

    fs.writeFile(output_path, pdfBuffer, function (err) {
        if (err) return console.log(err);
    });

    alert(path.basename(path_pdf) + " is signed.")
}