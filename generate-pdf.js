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
let fileName = "pedro_ribeiro_resume.pdf";
let file = [{ url: "http://localhost:3000", name: fileName }];

html_to_pdf.generatePdfs(file, options).then(outputArr => {
    let output = outputArr[0];
    fs.writeFile('./' + fileName, output.buffer, { flag: 'w+' }, err => {
        console.log(err || 'done');
    });
});