const searchAPI = {

    generateButton: document.querySelector('#generate'),
    baseUrl: document.querySelector("#baseUrl"),
    method: document.querySelector("#method"),
    route: document.querySelector("#route"),


    init: function () {
        console.log("init searchAPI");
        searchAPI.generateButton.addEventListener('click', searchAPI.addImgFromAPI);
        searchAPI.route.addEventListener('keydown', searchAPI.addImgFromAPI);
    },

    addImgFromAPI: function () {
        console.log("fct search from API");
        searchAPI.generateButton.classList.add('is-loading');

        // On prépare la configuration de la requête HTTP
        let config = {
            method: searchAPI.method.value,
            // mode: 'no-cors',

            // headers: {
            //     'Content-Type': 'application/json',
            //     'Access-Control-Allow-Origin': '*',
            // },

            // cache: 'no-cache',
        };


        // console.log(searchAPI.baseUrl.value + searchAPI.event.value);

        // fetch(app.url)
        //     .then(function (response) {
        //         return response.json();
        //     })
        //     .then(function (data) {
        //         console.log(data.results);
        //     })
        //     .catch(function (error) {
        //         console.log(error)
        //     });

        // On déclenche la requête HTTP (via le moteur sous-jacent Ajax)
        fetch((searchAPI.baseUrl.value + searchAPI.route.value), config)
            // Ensuite, lorsqu'on reçoit la réponse au format JSON
            .then(function (response) {
                console.log(response);

                // On convertit cette réponse en un objet JS et on le retourne
                return response.json();
            })
            // Ce résultat au format JS est récupéré en argument ici-même
            .then(function (data) {
                console.log(data);
                searchAPI.createImgElement(data.features);
                //     // format du retour
                //     //{"url": "https://random-d.uk/api/images/51.jpg", "message": "Powered by random-d.uk"}

                //     // On dispose désormais d'un tableau JS exploitable dans la variable data
                //     // La suite dépend de l'utilisation qu'on veut faire de ces données


            });
    },

    createImgElement: function (result) {
        // console.log("fct add elmt");

        const pList = document.querySelector('.list');
        pList.textContent = '';
        console.log(result);

        result.forEach(element => {
            const pElement = document.createElement('p');
            pElement.textContent = element.properties.label
            pList.appendChild(pElement);
        });

        app.setMessage('requete terminée');
        searchAPI.generateButton.classList.remove('is-loading')
        return true
    }

}