let html_to_pdf = require('html-pdf-node');
let fs = require('fs');
let options = {
    format: 'letter', landscape: false, scale: 0.5,
    margin: {
        top: 100,
        right: 0,
        bottom: 100,
        left: 0
    }

};
let createEntry = (filename, url) => ({ filename, file: [{ url, name: filename }]})

let files = [
    createEntry( "pedro_ribeiro_resume_full.pdf",  "http://localhost:3000/" ),
    createEntry( "pedro_ribeiro_resume_tech.pdf",  "http://localhost:3000/tech.html" ) ];

files.forEach((f) =>{
    html_to_pdf.generatePdfs(f.file, options).then(outputArr => {
        let output = outputArr[0];
        fs.writeFile('./' + f.filename, output.buffer, { flag: 'w+' }, err => {
            console.log(err || 'done ' + f.filename);
        });
    });
})
