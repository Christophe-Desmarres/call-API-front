const taskForm = {

    // used to activate all eventlisteners on a task
    init: function () {
        console.log('init TaskForm');

        //the form element
        const taskFormulaire = document.querySelector('.task--add form');

        // when I submit form
        taskFormulaire.addEventListener('submit', taskForm.handleSubmitForm);
    },

    // Form validation
    handleSubmitForm: function (event) {

        event.preventDefault();

        const taskComplete = event.currentTarget;
        let inputElmt = taskComplete.querySelector('input');
        const categorieElmt = taskComplete.querySelector('select');

        // to verify if input data exist
        if (inputElmt.value === '' || inputElmt.value === null) {
            app.setMessage('veuillez remplir une tâche svp...')
        } else if (categorieElmt.value === 'Choisir une catégorie') {
            app.setMessage('veuillez remplir une categorie svp...')
        } else {
            let optionElmt = categorieElmt.querySelector('[data-id="' + categorieElmt.value + '"]');
            taskForm.addTaskFormAPI(inputElmt, categorieElmt, optionElmt);

        }
    },

    //! 1 modif à faire ds cette méthode
    /**
     * Méthode qui ajoute un élément dans la base
     */
    addTaskFormAPI: function (inputElmt, categorieElmt, optionElmt) {

        let id = optionElmt.dataset.id;
        let name = optionElmt.dataset.name;

        //--------------------------
        //modif API
        //--------------------------
        // On stocke les données à transférer
        const data = {
            title: inputElmt.value,
            category_id: id,
            completion: 0,
            status: 0
        };

        // On prépare les entêtes HTTP (headers) de la requête
        // afin de spécifier que les données sont en JSON
        const httpHeaders = new Headers();
        httpHeaders.append("Content-Type", "application/json");

        // On consomme l'API pour ajouter en DB
        const fetchOptions = {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            // On ajoute les headers dans les options
            headers: httpHeaders,
            // On ajoute les données, encodées en JSON, dans le corps de la requête
            body: JSON.stringify(data)
        };

        // Exécuter la requête HTTP avec FETCH
        fetch(app.apiRootUrl + '/tasks', fetchOptions)
            .then(
                function (response) {
                    if (response.status == 201) {
                        return response.json();
                    } else {
                        alert('L\'ajout a échoué');
                    }

                })
            .then(function (responseJson) {

                // TODO verifier la présence de responseJson avant d'ajouter la nouvelle tache

                const newTaskObject = task.createTaskElmt(inputElmt.value, name, responseJson.id);
                tasksList.insertNewTask(newTaskObject);

                // reset the form with standart data
                inputElmt.value = '';
                categorieElmt.value = 'Choisir une catégorie';

                // set the focus on input form
                inputElmt.focus();

            })

    }
}