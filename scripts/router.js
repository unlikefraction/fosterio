let baseURL = "/";
let baseHTML = "/main_content.html"

function path(loc, home=false, force_reload=false){
    console.log(document.querySelector('.main'));

    // if(document.querySelector('.main') !== null && loc === location.pathname && !force_reload){
    //     return '';
    // }

    if(home && !location.search.includes("?loadPage=")){
        fetchHTML(loc, false);
    }

    else if(location.pathname !== baseURL){
        window.location = `${baseURL}?loadPage=${loc}`;
    }

    else{
        if(location.search.includes("?loadPage=")){
            let loadPage = location.search.replace("?loadPage=", "");
            fetchHTML(loadPage, true);
        }
    }
}


// Fetch HTML

function fetchHTML(file, addHistory=true) {
    // Fetch Page

    fetch(location.origin + baseURL + file)
    .then(function(response) {
        let main = document.querySelector('.main'); // Main div
        // When the page is loaded convert it to text
        main.innerHTML = '<div class="loader"></div>';
        main.classList.add("loading");
        return response.text()
    })
    .then(function(html) {
        let main = document.querySelector('.main'); // Main div
        main.classList.remove("loading");
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


// On navigating History
window.addEventListener('popstate', (event) => {
    console.log(event.state)
    try{
        // Load page from state.loadpage
        let loadPage = event.state.loadPage;
        fetchHTML(loadPage, false);
    }
    catch(err){
        // Load home page
        if(location.pathname === baseURL){
            fetchHTML(baseHTML, false);
        }

        else{
            console.error(err);
        }
    }
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
    document.querySelectorAll("a.home_anchor").forEach(
        anchor => {
            anchor.href = baseURL;
            anchor.addEventListener('click', (event) => {
                event.preventDefault();
                fetchHTML(baseHTML, false);
                history.pushState({loadPage: baseHTML}, null, baseURL);
            })
        });
})
