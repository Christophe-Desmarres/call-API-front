const taskFilter = {

    showArchivedTasks: false,

    // used to activate all eventlisteners on a task
    init: function () {
        console.log('init TaskFilter');

        //the form element
        const taskFilterCompletion = document.querySelector('.filters__task.filters__task--completion');
        const taskFilterCompletionButton = taskFilterCompletion.querySelectorAll('.filters__choice.button')
        const taskFilterCategoriesButton = document.querySelectorAll('.filters__task.filters__task--category');
        const taskFilterArchiveButton = document.querySelector('.filters__task.filters__task--archived');



        // when I submit form
        taskFilterCompletionButton.forEach(btnElement => {
            btnElement.addEventListener('click', taskFilter.handleTaskFilter);
        });

        taskFilterArchiveButton.addEventListener('click', taskFilter.handleShowArchiveTaskFilter);

    },

    // to show archived task
    handleShowArchiveTaskFilter: function (event) {

        event.preventDefault();
        const archiveBtn = event.currentTarget;
        const lienBtn = archiveBtn.querySelector('.filters__choice');

        if (taskFilter.showArchivedTasks === false) {
            lienBtn.textContent = 'Voir les tâches actives';
            taskFilter.showArchivedTasks = true;

        } else {
            lienBtn.textContent = 'Voir les archives';
            taskFilter.showArchivedTasks = false;
        }

        //all task list
        const tasksList = document.querySelectorAll('.tasks .task');

        tasksList.forEach(function (taskElement) {
            taskElement.classList.add('is-hidden');
            if (taskElement.classList.contains('task--archive') && taskFilter.showArchivedTasks === true) {
                taskElement.classList.remove('is-hidden');
            } else if (taskElement.classList.contains('task--archive') && taskFilter.showArchivedTasks === false) {
                taskElement.classList.add('is-hidden');
            } else if(taskFilter.showArchivedTasks === false){
                taskElement.classList.remove('is-hidden');
            }
        });

    },

    handleTaskFilter: function (event) {
        event.preventDefault();
        const taskBtn = event.currentTarget;
        //remove all class selected on button (to initialize display of button choose)
        const taskFilterButton = document.querySelectorAll('.filters__choice');
        taskFilterButton.forEach(btnElement => {
            btnElement.classList.remove('is-info', 'is-selected');
        });

        taskBtn.classList.add('is-info', 'is-selected');
        //add class selected on button choose and set data for filter task
        if (taskBtn.textContent === 'Complètes') { // taches completes
            filterTask = 'task--complete';
        } else if (taskBtn.textContent === 'Incomplètes') { // taches incompletes
            filterTask = 'task--todo';
        } else if (taskBtn.textContent === 'Toutes') { // toutes les taches
            filterTask = 'task';
        } else {
            app.setMessage('vous pouvez repeter la question ??') // erreur
        }

        
        // je récupere toutes les taches
        //all task list
        const tasksList = document.querySelectorAll('.tasks .task');

        // je vérifie la classe pour chaque tasks

        //for each task element, we verify condition
        tasksList.forEach(function (taskElement) {
            //show the current task before filter it
            taskElement.classList.add('is-hidden')

            //apply the filter
            if (taskElement.classList.contains(filterTask)) {

                taskElement.classList.remove('is-hidden')

            } else {

                taskElement.classList.add('is-hidden')
            }

        });


    },

    //! méthode de base avant modif pour les filtres
    handleTaskFilterBeforeChange: function (event) {

    //     event.preventDefault();
    //     let filterTask = [];
    //     let filterCategorie = '';
    //     const taskBtn = event.currentTarget;
    //     console.log(taskBtn);
    //     //remove all class selected on button (to initialize display of button choose)
    //     const taskFilterButton = document.querySelectorAll('.filters__choice');
    //     taskFilterButton.forEach(btnElement => {
    //         btnElement.classList.remove('is-info', 'is-selected');
    //     });

    //     //add class selected on button choose and set data for filter task
    //     if (taskBtn.classList.contains('button')) {

    //         if (taskBtn.textContent == 'Complètes') { // taches completes
    //             taskBtn.classList.add('is-info', 'is-selected');
    //             filterTask = 'task--complete';
    //         } else if (taskBtn.textContent == 'Incomplètes') { // taches incompletes
    //             taskBtn.classList.add('is-info', 'is-selected');
    //             filterTask = 'task--todo';
    //         } else if (taskBtn.textContent == 'Toutes') { // toutes les taches
    //             taskBtn.classList.add('is-info', 'is-selected');
    //             filterTask = 'task';
    //         } else {
    //             console.log('vous pouvez repeter la question ??') // erreur
    //         }

    //     } else if (taskBtn.nodeName == 'A') { // taches archivées
    //         console.log('voir les archives');
    //         filterTask = 'task--archive';
    //     }

    //     if (taskBtn.nodeName == 'SELECT') {
    //         filterCategorie = taskBtn.value;
    //     }
    //     //all task list
    //     const tasksList = document.querySelectorAll('.tasks .task');
    //     // console.log('filter = '+filterTask);
    //     // console.log('categ = '+filterCategorie);

    //     //for each task element, we verify condition
    //     tasksList.forEach(function (taskElement) {
    //         //show the current task before filter it

    //         //apply the filter
    //         if (taskElement.classList.contains(filterTask)) {

    //             taskElement.classList.remove('is-hidden')

    //             if (filterCategorie == 'Toutes les catégories') {
    //                 // console.log('all categ');

    //             } else if (taskElement.getAttribute('data-category') == filterCategorie) {
    //                 // console.log('categ = ok');

    //             } else {
    //                 // console.log('categ nok');

    //             }
    //         } else {

    //             taskElement.classList.add('is-hidden')
    //         }

    //     });


    //     // let inputElmt = taskComplete.querySelector('input');
    //     // let categorieElmt = taskComplete.querySelector('select');
    //     // if (inputElmt.value == '' || inputElmt.value == null) {
    //     //     alert('veuillez remplir une tâche svp...')
    //     // } else {
    //     //     const vaninaElement = document.getElementById('empty-template').content.cloneNode(true);
    //     //     // vanina est un clone 'vide', ajoutons les infos dans ses enfants
    //     //     vaninaElement.querySelector('.task__title-label').textContent = inputElmt.value;
    //     //     vaninaElement.querySelector('.task__title-field').value = inputElmt.value;
    //     //     vaninaElement.querySelector('.task__category p').textContent = categorieElmt.value;

    //     //     // ne reste plus qu'à ajouter ce 'record' à notre liste
    //     //     document.querySelector('.tasks').append(vaninaElement);
    //     //     inputElmt.value = '';
    //     //     categorieElmt.value = 'Choisir une catégorie';

    //     //     tasksList.bindAllTasks();
    //     //     inputElmt.focus();
    //     // }
    }




}