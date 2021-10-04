function loadCodeSnippet(){
    // code snippet
    let codes = document.querySelectorAll("code.iframe-code-snippet");
    let snippetContainers, codeInnerHTML;

    codes.forEach((code) => {
        // converting to snippet

        codeInnerHTML = code.innerHTML;

        code.innerHTML = "";

        const iframe = document.createElement('iframe');
        iframe.className = "code-snippet-output";
        // HTML inside the iframe
        iframe.srcdoc = `<html>
                        <head>
                        <link href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap" rel="stylesheet">
                        <link href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css" rel="stylesheet">
                        <link rel="stylesheet" href="../styles/main.css">
                        <link rel="stylesheet" href="../styles/iframe.css">
                        <\/head>
                        <body>${codeInnerHTML}
                        <script src="../scripts/main.js"><\/script>
                        <script src="../scripts/router.js"><\/script>
                        <\/body>
                        <\/html>`;

        codeInnerHTML = codeInnerHTML.replace(/[<>&\n ]/g, function(x) {
            return {
                '<': '&lt;',
                '>': '&gt;',
                '&': '&amp;',
            '\n': '\n',
            ' ': '&nbsp;',
            }[x];
        });

        // iframe.sandbox = 'allow-scripts allow-same-origin ';
        code.appendChild(iframe);

        // adding the snippet to html
        code.innerHTML += `<div class='code_snippet border-top'><pre><code>${codeInnerHTML}</pre></code></div>`;
        
        // Make it look like its on the device
        document.querySelectorAll('.code-snippet-output').forEach(codeOutput => {
            let iframeWidth = codeOutput.offsetWidth;
            let documentWidth = document.body.clientWidth;
            if(mobileBreakPoint >= documentWidth){
                // On mobile, 9:16
                codeOutput.style.height = `${iframeWidth*16/9}px`;
            }

            else if(documentWidth >= mobileBreakPoint && documentWidth <= tabletBreakpoint){
                // On tablet, 4:3
                codeOutput.style.height = `${iframeWidth*3/4}px`;
            }

            else{
                codeOutput.style.height = `${iframeWidth*9/16}px`;
            }
        })

        // Highlight Code
        hljs.highlightAll();
    })
}