'use strict';
window.addEventListener( 'DOMContentLoaded', () => {
    const task = [
        {
            id: '1',
            title: 'New Task',
            body: 'Some Text for task'
        },
        {
            id: '2',
            title: 'New Task 2',
            body: 'Some Text for task'
        },
        {
            id: '3',
            title: 'New Task 3',
            body: 'Some Text for task'
        }
    ];

    const form = document.forms[ 'taskForm' ];
    const inputTitle = form[ 0 ];
    const inputBody = form[ 1 ];


    form.addEventListener( 'submit', onFormSubmit );

    function onFormSubmit( e ) {
        e.preventDefault();
        

    }


} );
