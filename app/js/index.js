
function create_sign_button(){
    var sign_button = document.createElement("button");
    sign_button.setAttribute('id', 'sign');
    sign_button.innerHTML = 'Sign';
    sign_button.onclick = function () {
        cr_sign();
    }
    document.getElementById('buttons').appendChild(sign_button);
}
function remove_sign_button() {
    try {
        document.getElementById('sign').remove();
    } catch{}
}
function clear(rm_files=false){
    if (rm_files) {
        document.getElementById('files').value = '';
        dispfile();
    }
    try {
        document.getElementById('passphrase').remove();
    } catch {}
    try {
        document.getElementById('passphrase_c').remove();
    } catch {}
    document.getElementById('go').style.visibility = 'hidden';
}
function check_constraints_file(files){
    return files.length != 0;
}
function check_constraints_passphrase(pass_c = null){
    var passphrase = document.getElementById('passphrase').value;
    if (passphrase == '') {
        document.getElementById('go').style.visibility = 'hidden';
        return false;
    }
    if (passphrase.length < 8) {
        document.getElementById('go').style.visibility = 'hidden';
        document.getElementById('missing').innerHTML = "Passphrase must be at least 8 characters long.";
        return false;
    }
    if (pass_c != null){
        if(pass_c != passphrase) {
            document.getElementById('go').style.visibility = 'hidden';
            document.getElementById('missing').innerHTML = "Passphrases do not match.";
            return false;
        }
    }
    document.getElementById('missing').innerHTML = '';
    document.getElementById('go').style.visibility = 'visible';
    if (pass_c != null){
        document.getElementById('go').onclick = function () {
            enc();
        };
    } else {
        document.getElementById('go').onclick = function () {
            dec();
        };
    }
    return true;
}
function dispfile(){
    var files = document.getElementById('files').files;
    if (check_constraints_file(files)){
        document.getElementById('but_enc').style.visibility = 'visible';
        document.getElementById('but_dec').style.visibility = 'visible';
    } else {
        document.getElementById('but_enc').style.visibility = 'hidden';
        document.getElementById('but_dec').style.visibility = 'hidden';
        remove_sign_button();
        clear();
    }
    if (files.length > 0){
        if (files.length == 1)
            document.getElementById('filename').innerHTML = files[0].name;
        else if (files.length > 1)
            document.getElementById('filename').innerHTML = files.length + " files selected.";

        var path = require('path')
        path.extname('index.html')
        for (i = 0; i<files.length; i++){
            if (path.extname(files[i].name) != '.pdf'){
                remove_sign_button();
                return;
            }
        }
        create_sign_button();
        
    } else
        document.getElementById('filename').innerHTML = '';
}
function cr_enc(){
    var passphrase = document.createElement("input");
    passphrase.setAttribute("type", "password");
    passphrase.setAttribute("id", "passphrase");
    passphrase.setAttribute("placeholder", "Passphrase");
    passphrase.style.marginRight = '15px';
    var passphrase_c = document.createElement("input");
    passphrase_c.setAttribute("type", "password");
    passphrase_c.setAttribute("id", "passphrase_c");
    passphrase_c.setAttribute("placeholder", "Confirm passphrase");
    document.getElementById('pass_input').appendChild(passphrase);
    document.getElementById('pass_input').appendChild(passphrase_c);
    passphrase_c.addEventListener('keyup', function(e){
        check_constraints_passphrase(passphrase_c.value);
    });
    passphrase.addEventListener('keyup', function(e){
        check_constraints_passphrase(passphrase_c.value);
    });
}
function enc(){
    var passphrase = document.getElementById('passphrase').value;
    var files = document.getElementById('files').files;
    for (i = 0; i<files.length; i++){
        encrypt(passphrase, files[i].path);
    }
    clear(rm_files = true);
}
function cr_dec(){
    clear();
    var passphrase = document.createElement("input");
    passphrase.setAttribute("type", "password");
    passphrase.setAttribute("id", "passphrase");
    passphrase.setAttribute("placeholder", "Passphrase");
    document.getElementById('pass_input').appendChild(passphrase);
    passphrase.addEventListener('keyup', function(e){
        check_constraints_passphrase();
    });
}
function dec(){
    var passphrase = document.getElementById('passphrase').value;
    var files = document.getElementById('files').files;
    for (i = 0; i<files.length; i++){
        decrypt(passphrase, files[i].path);
    }
    clear(rm_files = true);
}

function cr_sign(){
    var certif_input = document.createElement('input');
    certif_input.setAttribute('type', 'file');
    certif_input.setAttribute('accept', '.p12');
    certif_input.setAttribute('id', 'certif_file');
    document.getElementById('certificate_input').appendChild(certif_input);

    var passphrase = document.createElement("input");
    passphrase.setAttribute("type", "password");
    passphrase.setAttribute("id", "passphrase");
    passphrase.setAttribute("placeholder", "Passphrase for certificate (let empty if none)");
    document.getElementById('pass_input').appendChild(passphrase);

    certif_input.onchange = function() {
        if (certif_input.files.length > 0) {
            document.getElementById('go').style.visibility = 'visible';
            document.getElementById('go').onclick = function () {
                sign();
            };
        } else {
            document.getElementById('go').style.visibility = 'hidden';
        }
    }
}
function sign(){
    var pdf_files = document.getElementById('files').files;
    var certif_file = document.getElementById('certif_file').files[0];
    var passphrase = document.getElementById('passphrase').value;
    for (i = 0; i<pdf_files.length; i++){
        sign_pdf(pdf_files[i].path, certif_file.path, passphrase);
    }
    document.getElementById('certif_file').remove();
    clear(rm_files = true);
}
