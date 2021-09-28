// Toggle Sidebar
function sidebar_toggle(type){
    let sidebar = document.querySelector('.sidebar');
    let main = document.querySelector('.main');

    if(sidebar.classList.contains('sidebar-open')){
        sidebar.classList.remove('sidebar-open');
        main.classList.remove('complete-open');
        if(type === 'partial'){
            sidebar.classList.add('sidebar-partial');
            main.classList.add('partial-open');
        }
    }

    else{
        sidebar.classList.add('sidebar-open');
        main.classList.add('complete-open');
        if(type === 'partial'){
            sidebar.classList.remove('sidebar-partial');
            main.classList.remove('partial-open');
        }
    }
}


window.addEventListener('DOMContentLoaded', (event)=>{
    // Sidebar status to Main body
    let sidebar = document.querySelector('.sidebar');
    let main = document.querySelector('.main');

    if(sidebar.classList.contains('sidebar-partial')){
        main.classList.add('partial-open');
    }

    else if(sidebar.classList.contains('sidebar-open')){
        main.classList.add('complete-open');
    }
    // Sidebar status instantiation ends
})