'use strict';
window.addEventListener( 'DOMContentLoaded', () => {
    let tasks = [];

    const form = document.forms[ 'taskForm' ];
    const inputTitle = form[ 0 ];
    const inputBody = form[ 1 ];
    const DOMCardPararent = document.querySelector( '.myCardParentDom' );

    getTaskFromLocalStorage();


    form.addEventListener( 'submit', onFormSubmit );

    function onFormSubmit( e ) {
        e.preventDefault();
        const titleVal = inputTitle.value.trim();
        const bodyVal = inputBody.value.trim();

        if ( !titleVal || !bodyVal ) {
            toastr["error"] ("Add your task! please");
            return
        }


        const newTask = newTaskCreate( titleVal, bodyVal );
        tasks.push( newTask );
        localStorage.setItem( 'tasks', JSON.stringify( tasks ) );
        toastr["success"] ("Success!");
        form.reset();
    }

    function newTaskCreate( title, body ) {
        const newTask = {
            id: `task-${ Math.floor( Math.random() * 9999999 ) }`,
            title,
            body,
            time: `${ new Date().getHours() }:${ new Date().getMinutes() }:${ new Date().getSeconds() }`
        };
        cardTemplateUI( newTask );
        return newTask;
    }

    function getTasks( tasks ) {
        tasks.forEach( task => cardTemplateUI( task ) );
    }

    function cardTemplateUI( { time, title, body, id } ) {
        const cardUI = `
                <div class="card bg-light mb-3 mx-5 mb-5" data-task-id=${ id } style="max-width: 25rem; min-width: 15em">
                    <div class="card-header myCardHeader">${ time } <a class="btn-floating btn-sm btn-secondary myStarLink"><i class="fas fa-star starClose"></i></a></div>
                    <div class="card-body">
                       <h5 class="card-title">${ title }</h5>
                        <p class="card-text">${ body }</p>
                    </div>
                </div>`;
        DOMRender( cardUI );
    }

    function DOMRender( fullCard ) {
        DOMCardPararent.insertAdjacentHTML( "afterbegin", fullCard );
    }

    DOMCardPararent.addEventListener( 'click', e => {
        const { target } = e;
        if ( target.classList.contains( 'starClose' ) ) {
            const parent = target.closest( '.card' );
            const tID = parent.dataset.taskId;
            removeTaskFromTasks( tID );
            parent.remove();
            toastr[ "info" ]( "Your task removed!" );
        }
    } );

    function removeTaskFromTasks( parentID ) {
        tasks = tasks.filter( task => task.id !== parentID );
        localStorage.setItem( 'tasks', JSON.stringify( tasks ) );
    }

    function getTaskFromLocalStorage() {
        const taskFromLC = JSON.parse( localStorage.getItem( 'tasks' ) );

        if ( !taskFromLC ) return;

        tasks = taskFromLC;
        getTasks( taskFromLC )
    }

    toastr.options = {
        "closeButton": true, // true/false
        "debug": false, // true/false
        "newestOnTop": false, // true/false
        "progressBar": false, // true/false
        "positionClass": "toast-bottom-left", // md-toast-top-right / md-toast-top-left / md-toast-bottom-right / md-toast-bottom-left
        "preventDuplicates": true, //true/false
        "onclick": null,
        "showDuration": "300", // in milliseconds
        "hideDuration": "2500", // in milliseconds
        "timeOut": "3000", // in milliseconds
        "extendedTimeOut": "1000", // in milliseconds
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

} );

