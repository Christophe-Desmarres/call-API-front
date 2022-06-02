// Component used for everything related to the list of tasks
const tasksList = {

    init: function () {
        console.log('init TasksList');
        //we don't need to keep it beacause tasks is bind automatically for each task
        // tasksList.bindAllTasks();
        tasksList.loadTasksromAPI();
    },

    insertNewTask: function (taskElmt) {

        // insert 'taskElmt'to the tasks list
        document.querySelector('.tasks').prepend(taskElmt);

        // load the addEventlistener on new task
        task.bindTaskEvents(taskElmt)

    },

    loadTasksromAPI: function () {

        // select the target to put data receive by request
        const tasksAPIList = document.querySelector('.tasks');

        // On prépare la configuration de la requête HTTP
        let config = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        };

        // On déclenche la requête HTTP (via le moteur sous-jacent Ajax)
        fetch(app.apiRootUrl + '/tasks', config)
            .then(function (response) {
                return response.json();
            })
            .then(function (jsonResponse) {
                // we must doing twice create and set data for two target else it's don't function
                for (let i = 0; i < jsonResponse.length; i++) {

                    const newTaskObject = task.createTaskElmt(jsonResponse[i].title, jsonResponse[i].category.name, jsonResponse[i].id, jsonResponse[i].completion, jsonResponse[i].status);
                    tasksList.insertNewTask(newTaskObject);
                    tasksList.hideTaskArchive();

                }
            });


    },

    // Gets all tasks and add eventlistenner
    bindAllTasks: function () {
        const tasksList = document.querySelectorAll('.tasks .task');

        tasksList.forEach(function (taskElement) {
            task.bindTaskEvents(taskElement);
        });
    },

    refreshTaskListVerify: function () {
        let affichage = document.querySelector('.message.is-danger.is-hidden')
        // TODO
        app.setMessage("Des modifications ont été apportées, veuillez enregistrer votre travail et rafraichir la page...");
    },

    hideTaskArchive: function () {
        let tasksList = document.querySelectorAll('.task');

        tasksList.forEach( task => {
            if (task.classList.contains('task--archive')) {
                task.classList.add('is-hidden');
            }
        });
    }


}