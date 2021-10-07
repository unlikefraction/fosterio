let mobileBreakPoint = 650;
let tabletBreakpoint = 1024;

// Toggle Sidebar
function sidebar_toggle(type){
    let sidebar = document.querySelector('.sidebar');
    let main = document.querySelector('.main');
    let footer = document.querySelector('footer');

    if(sidebar.classList.contains('sidebar-open')){
        sidebar.classList.remove('sidebar-open');
        main.classList.remove('complete-open');

        if(footer){
            footer.classList.remove('complete-open');
        }

        if(type === 'partial'){
            sidebar.classList.add('sidebar-partial');
            main.classList.add('partial-open');

            if(footer){
                footer.classList.add('partial-open');
            }
        }
    }

    else{
        sidebar.classList.add('sidebar-open');
        main.classList.add('complete-open');

        if(footer){
            footer.classList.add('complete-open');
        }

        if(type === 'partial'){
            sidebar.classList.remove('sidebar-partial');
            main.classList.remove('partial-open');

            if(footer){
                footer.classList.remove('partial-open');
            }
        }
    }
}


window.addEventListener('DOMContentLoaded', (event)=>{
    // Sidebar status to Main body
    let sidebar = document.querySelector('.sidebar');
    let main = document.querySelector('.main');
    let footer = document.querySelector('footer');

    if(sidebar){
        if(sidebar.classList.contains('sidebar-partial')){
            main.classList.add('partial-open');
            if(footer){
                footer.classList.add('partial-open');
            }
        }
    
        else if(sidebar.classList.contains('sidebar-open')){
            main.classList.add('complete-open');
            if(footer){
                footer.classList.add('complete-open');
            }
        }
    }
    // Sidebar status instantiation ends

    // Navbar on mobile Animation
    let navOnMobile = document.querySelector('.nav-on-mobile');

    if(navOnMobile){
        let min_timedelay = 0.7;
        let delay_inc = 0.1;
        let nav_children = navOnMobile.children;

        for(let li of nav_children){
            li.style.transitionDelay = `${min_timedelay}s`;
            min_timedelay += delay_inc;
        }
    }

    // If nav is fixed, push the main down

    let navs = document.querySelectorAll('nav');
    let topMargin = 0;

    navs.forEach(nav => {
        if(nav.classList.contains('fixed')){
            topMargin += nav.offsetHeight;
        }
    })

    main.style.paddingTop = `${topMargin}px`;
    // 0.5s ease all
    if(sidebar){
        sidebar.style.paddingTop = `${topMargin}px`;
        // 0.5s all ease
    }


    // Exit sidebar on mobile
    if(document.scrollingElement.clientWidth < mobileBreakPoint){
        let sidebar_elements = document.querySelectorAll('.sidebar-element');

        sidebar_elements.forEach(sidebar_element => {
            sidebar_element.addEventListener('click', e => {
                sidebar_toggle();
            })
        })
    }

    // Dropdown
    
})


// Show DropDown
function showDropDown(dropdown, unclick=false){
    let dropdown_options = dropdown.querySelector('.dropdown-options');

    dropdown.addEventListener('mouseleave', (e) => {
        dropdown_options.classList.remove('dropdown-show');
    })

    if(unclick){
        document.querySelector('.main').addEventListener('click', (e) => {
            dropdown_options.classList.remove('dropdown-show');
        })
    }

    dropdown_options.classList.add('dropdown-show');

}

// Register Dropdown on all dropdowns
function registerDropDown(){
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.addEventListener('mouseenter', (e) => {
            showDropDown(dropdown);
        })

        dropdown.addEventListener('click', (e) => {
            showDropDown(dropdown, unclick=true);
        })
    })
}



// Toggle Navigation bar on mobile
function navToggle(){
    let nav = document.querySelector('.nav-on-mobile');

    if(nav.classList.contains('nav-on-mobile-open')){
        nav.classList.remove('nav-on-mobile-open');
    }

    else{
        nav.classList.add('nav-on-mobile-open');
    }
}