const categoriesList = {

    init: function (apiRootUrl) {
        console.log('init categoriesList');

        categoriesList.loadCategoriesFromAPI(apiRootUrl);
    },

    loadCategoriesFromAPI: function (apiRootUrl) {

        // On prépare la configuration de la requête HTTP
        let config = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        };

        // On déclenche la requête HTTP (via le moteur sous-jacent Ajax)
        fetch(apiRootUrl+'/categories', config)
            // Ensuite, lorsqu'on reçoit la réponse au format JSON
            .then(function (response) {
                // On convertit cette réponse en un objet JS et on le retourne
                return response.json();
            })
            // Ce résultat au format JS est récupéré en argument ici-même
            .then(function (data) {
                // On dispose désormais d'un tableau JS exploitable dans la variable data
                // La suite dépend de l'utilisation qu'on veut faire de ces données

                const listFilterItem = categoriesList.createSelectElement(data, "Toutes les catégories", 'filters__choice');
                const listFormItem = categoriesList.createSelectElement(data, "Choisir une catégorie");
                
                // select the target to put data receive by request
                const categoriesFilterList = document.querySelector('.filters__task.filters__task--category.select.is-small');
                
                const categoriesFormList = document.querySelector('.task__category .select.is-small');

                //insert the 'select' create in the div choose before
                categoriesFilterList.append(listFilterItem);
                categoriesFormList.append(listFormItem);
            });
    },

    createSelectElement: function (categories, optionDefaultValue, selectClass = '') {

        const selectElement = document.createElement('select');
        if (selectClass != '') {
            selectElement.classList.add(selectClass);
        }
        const defaultOption = document.createElement('option');
        defaultOption.textContent = optionDefaultValue;
        selectElement.append(defaultOption);

        categories.forEach(function (category) {
            let optionElmt = document.createElement('option');
            optionElmt.dataset.id = category.id;
            optionElmt.dataset.name = category.name;
            optionElmt.setAttribute('value', category.id);
            optionElmt.textContent = category.name;
            selectElement.appendChild(optionElmt);

        });

        return selectElement;
        

        // // we must doing twice create and set data for two target
        // let listFilterItem = document.createElement('select');
        // listFilterItem.classList.add('filters__choice');


        // let listFormItem = document.createElement('select');
        // // listFormItem.classList.add('filters__choice');

        // for (let i = 0; i < categories.length; i++) {
        //     //create option elmt
        //     let listOptionFilterItem = document.createElement('option');
        //     let listOptionFormItem = document.createElement('option');

        //     //set categories in 'option' elmt
        //     listOptionFilterItem.textContent = categories[i].name;
        //     listOptionFormItem.innerHTML = categories[i].name;

        //     //put 'option' elmt in select child
        //     listFilterItem.appendChild(listOptionFilterItem);
        //     listFormItem.appendChild(listOptionFormItem);
        // }


    }

}