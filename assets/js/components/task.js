const task = {

    // used to activate all eventlisteners on a task
    bindTaskEvents: function (taskElement) {

        // when I clic on title
        const taskTitleElement = taskElement.querySelector('.task__title-label');
        // when I clic on title input
        const taskTitleElementInput = taskElement.querySelector('.task__title-field');
        // when I clic on validate button
        const taskElementValidateButton = taskElement.querySelector('.task__button--validate');
        // when I clic on validate button
        const taskElementincompeteButton = taskElement.querySelector('.task__button--incomplete');
        // when I clic on archive button
        const taskElementArchiveButton = taskElement.querySelector('.task__button--archive');
        // when I clic on desarchive button
        const taskElementDesarchiveButton = taskElement.querySelector('.task__button--desarchive');
        // when I clic on delete button
        const taskElementDeleteButton = taskElement.querySelector('.task__button--delete');


        //when I clic on title
        taskTitleElement.addEventListener('click', task.enableTaskTitleEdit);
        //when I lose the focus on the input
        taskTitleElementInput.addEventListener('blur', task.disableTaskTitleEdit);
        //when I press the enter key
        taskTitleElementInput.addEventListener('keydown', task.disableTaskTitleEditOnKeydown);
        //when I clic on validate button
        taskElementValidateButton.addEventListener('click', task.validateTask);
        //when I clic on reactivate button
        taskElementincompeteButton.addEventListener('click', task.reactivateTask);
        //when I clic on archive button
        taskElementArchiveButton.addEventListener('click', task.archivedTask);
        //when I clic on desarchive button
        taskElementDesarchiveButton.addEventListener('click', task.desarchivedTask);
        //when I clic on delete button
        taskElementDeleteButton.addEventListener('click', task.deletedTask);

    },

    //to enable title modification
    enableTaskTitleEdit: function (event) {
        // task__title-field input
        const taskTitleElement = event.currentTarget;
        const taskElement = taskTitleElement.closest('.task');
        taskElement.classList.add('task--edit');
    },

    //to save the title modification on enter key press
    disableTaskTitleEditOnKeydown: function (event) {
        if (event.code === 'Enter' || event.code === 'NumpadEnter') {
            task.disableTaskTitleEdit(event);
        }
    },

    //to save the title modification on clic anywhere
    disableTaskTitleEdit: function (event) {
  
        const taskTitleElement = event.currentTarget;
        // the new value of our input
        const newTaskTitle = taskTitleElement.value;
        const taskElement = taskTitleElement.closest('.task');
        let id = taskElement.dataset.id
        task.updateNameTaskApi(taskElement, id, newTaskTitle);
    },

    //modify the task status at completed
    validateTask: function (event) {
        const taskComplete = event.currentTarget;
        const taskElement = taskComplete.closest('.task');
        let id = taskElement.dataset.id
        task.updateStatusTaskApi(taskElement, id, 1);
    },

    //modify the task stautus at todo
    reactivateTask: function (event) {
        const taskComplete = event.currentTarget;
        const taskElement = taskComplete.closest('.task');
        let id = taskElement.dataset.id
        task.updateStatusTaskApi(taskElement, id, 0);

    },

    //modify the task status at completed
    archivedTask: function (event) {
        const taskComplete = event.currentTarget;
        const taskElement = taskComplete.closest('.task');
        let id = taskElement.dataset.id

        task.updateStatusTaskApi(taskElement, id, 2);
    },

    //modify the task status at completed
    desarchivedTask: function (event) {
        const taskComplete = event.currentTarget;
        const taskElement = taskComplete.closest('.task');
        let id = taskElement.dataset.id
        task.updateStatusTaskApi(taskElement, id, 3);
    },

    //delete the task
    deletedTask: function (event) {
        const taskToDelete = event.currentTarget;
        let response = confirm('Etes vous sur de vouloir supprimer cette t??che ?');
        if (response) {
                 
        const taskElement = taskToDelete.closest('.task');
        let id = taskElement.dataset.id;
        let title = taskElement.textContent;
        
        //--------------------------
        //modif API
        //--------------------------
         // On pr??pare la configuration de la requ??te HTTP
         let config = {
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache'
        };

        // On d??clenche la requ??te HTTP (via le moteur sous-jacent Ajax)
        fetch(app.apiRootUrl + '/tasks/'+id, config)
            .then(function (response) {
                if(response.status === 204){
                    taskElement.remove();
                    app.setMessage('La t??che "<em>' + title + '</em>" a ??t?? supprim??e');
                } else if (response.status === 500) {
                    app.setMessage('Une erreur s\'est produite');
                } else {
                    app.setMessage('La t??che n\'existe pas');
                }
            });
            } else {
            app.setMessage("La t??che na pas ??t?? supprim??e");
        }

    },

    //modify status of task in API
    updateStatusTaskApi: function (taskElement, id, status) {
        //--------------------------
        //modif API
        //--------------------------
        // status
        // 0 => en cours
        // 1=> r??alis??e
        // 2=> archiv??e
        // 3=> d??sarch??e


        let progressBar = taskElement.querySelector('.progress-bar__level');
        //utilisation de parseint pour ne pas avoir une valeur en pourcentage
        let completionBar = parseInt(progressBar.style.width);
        let desarchivedStatus = false;
        let nbcompletion = '';

        if (status === 0) { // en cours
            nbcompletion = 0;
        } else if (status === 1) { // r??alis??
            nbcompletion = 100;
        } else if (status === 3) { // d??sarchiv??
            desarchivedStatus = true;
            if (completionBar === 100) { // status compl??t?? soit = 100
                status = 1;
            } else {
                status = 0; // sinon status en cours =0
            }
            nbcompletion = completionBar;
        }

        // On stocke les donn??es ?? transf??rer
        const data = {
            "status": status,
            "completion": nbcompletion
        };

        //si le status est 2 => archiv??,
        //on ne change pas la completion de la tache
        if (status === 2) {
            const data = {
                "status": status
            };
        }
        console.log(data);

        // On pr??pare les ent??tes HTTP (headers) de la requ??te
        // afin de sp??cifier que les donn??es sont en JSON
        const httpHeaders = new Headers();
        httpHeaders.append("Content-Type", "application/json");

        // On consomme l'API pour ajouter en DB
        const fetchOptions = {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            // On ajoute les headers dans les options
            headers: httpHeaders,
            // On ajoute les donn??es, encod??es en JSON, dans le corps de la requ??te
            body: JSON.stringify(data)
        };

        // Ex??cuter la requ??te HTTP avec FETCH
        fetch(app.apiRootUrl + '/tasks/' + id, fetchOptions)
            .then(
                function (response) {
                    console.log(response);
                    if (response.status == 201) {
                        //--------------------------
                        //modif front
                        //--------------------------

                        if (status === 2) { //status archiv??
                            taskElement.classList.remove('task--todo');
                            taskElement.classList.add('task--archive');
                        }
                        if (desarchivedStatus === true) {
                            taskElement.classList.remove('task--archive');
                        }
                        if (nbcompletion === 100) {
                            taskElement.classList.remove('task--todo');
                            taskElement.classList.add('task--complete');
                            taskElement.querySelector('.progress-bar__level').style.width = nbcompletion + '%';

                        } else {
                            taskElement.classList.add('task--todo');
                            taskElement.classList.remove('task--complete');
                            taskElement.querySelector('.progress-bar__level').style.width = nbcompletion + '%';
                        }

                    } else {
                        app.setMessage('L\'ajout a ??chou??');
                    }
                }
            )
    },

    //modify name of task in API
    updateNameTaskApi: function (taskElement, id, name) {
        //--------------------------
        //modif API
        //--------------------------
        // On stocke les donn??es ?? transf??rer
        const data = {
            "title": name
        };


        // On pr??pare les ent??tes HTTP (headers) de la requ??te
        // afin de sp??cifier que les donn??es sont en JSON
        const httpHeaders = new Headers();
        httpHeaders.append("Content-Type", "application/json");

        // On consomme l'API pour ajouter en DB
        const fetchOptions = {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            // On ajoute les headers dans les options
            headers: httpHeaders,
            // On ajoute les donn??es, encod??es en JSON, dans le corps de la requ??te
            body: JSON.stringify(data)
        };

        // Ex??cuter la requ??te HTTP avec FETCH
        fetch(app.apiRootUrl + '/tasks/' + id, fetchOptions)
            .then(
                function (response) {

                    if (response.status == 201) {
                        //--------------------------
                        //modif front
                        //--------------------------
                        // update the 'p' title element with the input value
                        taskElement.querySelector('.task__title-label').textContent = name;
                        taskElement.classList.remove('task--edit');

                    } else {
                        app.setMessage('L\'ajout a ??chou??');
                    }
                }
            )
    },

    createTaskElmt: function (title, categoryName, dataId, completion = 0, status = 0) {

        //select template and clone it
        const taskCloneElement = document.getElementById('empty-template').content.cloneNode(true).firstElementChild;

        // taskCloneElement is an empty clone of template
        // set content text of 'p' element'
        taskCloneElement.querySelector('.task__title-label').textContent = title;

        // set input and content input
        taskCloneElement.querySelector('.task__title-field').value = title;
        taskCloneElement.querySelector('.task__title-field').setAttribute('value', title);

        // set content text input 
        taskCloneElement.querySelector('.task__category p').textContent = categoryName;
        taskCloneElement.setAttribute('data-category', categoryName);
        // or we can write with data-set :
        //taskCloneElement.dataset.category = categoryName;
        taskCloneElement.dataset.id = dataId;

        // set progress bar completion
        taskCloneElement.querySelector('.progress-bar__level').style.width = completion + '%';
        if (status === 1) {
            taskCloneElement.classList.remove('task--todo');
            taskCloneElement.classList.add('task--complete');
        }
        if (status === 2) {
            taskCloneElement.classList.add('task--archive');
        }

        return taskCloneElement;

    }

}