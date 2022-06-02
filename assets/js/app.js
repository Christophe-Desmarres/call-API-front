const app = {

    // pour factoriser le début de l'adresse des requetes API
    apiRootUrl: 'https://swapi.dev/api/',
    //url pour test
    url : 'https://randomuser.me/api/?results=10',

    //init execute the startup code needed by our application
    init: function () {
        console.log("init app launched");

        //all the object we want to init
        searchAPI.init();
        setApi.init();
    },

    setMessage: function (message) {
        const messageZone = document.querySelector('.message.is-info');
        let divMessage = document.createElement('p')
        divMessage.innerHTML = message;
        messageZone.append(divMessage);
        messageZone.classList.remove('is-hidden');
        setTimeout(app.resetMessage, 5000);
    },

    resetMessage: function () {
        const messageZone = document.querySelector('.message.is-info');
        messageZone.classList.add('is-hidden');
        messageZone.textContent = '';
    }

}

document.addEventListener('DOMContentLoaded', app.init);