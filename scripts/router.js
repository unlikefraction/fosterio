const baseURL = "/fosterio/";

function path(loc){
    if(location.pathname !== baseURL){
        window.location = `${baseURL}?loadPage=${loc}`;
    }
    else{
        if(location.search.includes("?loadPage=")){
            let loadPage = location.search.replace("?loadPage=", "");
            fetchHTML(loadPage);
        }
    }
}


// Fetch HTML

function fetchHTML(file, addHistory=true) {
    // Fetch Page
    fetch(baseURL + file)
    .then(function(response) {
        // When the page is loaded convert it to text
        return response.text()
    })
    .then(function(html) {
        let main = document.querySelector('.main');
        main.innerHTML = html;

        var parser = new DOMParser();

        // Parse the text
        var doc = parser.parseFromString(html, "text/html");

        try{
            doc.body.querySelectorAll('script').forEach(s => eval(s.innerHTML));
        }
        catch{}

        
        
    })
    .catch(function(err) {
        console.log('Failed to fetch page: ', err);  
    });

    // Add to History and reflect in URL
    if(addHistory){
        history.pushState({loadPage: file}, null, baseURL + file.substr(1));
    }
}

window.addEventListener('popstate', (event) => {
    let loadPage = event.state.loadPage;
    fetchHTML(loadPage, false);
  });



// Make anchor with class async, asyncronous
function make_async(){
    let anchors = document.querySelectorAll('a.async');

    anchors.forEach((anchor => {
        anchor.addEventListener('click', (a) => {
            a.preventDefault();

            fetchHTML(anchor.pathname);
        })
    }))
}

window.addEventListener('DOMContentLoaded', (event)=>{
    // Async Anchors
    make_async();

    // Make home_anchor point to anchor
    document.querySelectorAll("a.home_anchor").forEach(anchor => {anchor.href = baseURL});
})