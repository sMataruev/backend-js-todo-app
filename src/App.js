'use strict';
window.addEventListener( 'DOMContentLoaded', () => {
    let tasks = [];

    const form = document.forms[ 'taskForm' ];
    const inputTitle = form[ 0 ];
    const inputBody = form[ 1 ];
    const DOMCardPararent = document.querySelector( '.myCardParentDom' );


    form.addEventListener( 'submit', onFormSubmit );

    function onFormSubmit( e ) {
        e.preventDefault();
        const titleVal = inputTitle.value;
        const bodyVal = inputBody.value;

        if ( !titleVal || !bodyVal ) {
            alert( "Введите данные!" );
            return
        }

        const newTask = newTaskCreate( titleVal, bodyVal );
        tasks.push( newTask );
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

        localStorage.setItem( 'tasks', JSON.stringify( cardUI ) );
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
        }

    } );

    function removeTaskFromTasks( parentID ) {
        tasks = tasks.filter( task => task.id !== parentID );
    }


} );
