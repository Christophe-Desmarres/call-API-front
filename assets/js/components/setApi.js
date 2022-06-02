const setApi = {

    init: function () {
        console.log("init setApi");

        const inputElmt = document.querySelector('input');
        inputElmt.value = localStorage.getItem('baseUrl');

        //when I press the enter key
        inputElmt.addEventListener('blur', setApi.disableInputEditOnKeydown);
        //when I clic on title
        // inputElmt.addEventListener('click', setApi.enableTaskTitleEdit);

    },

    //to enable title modification
    enableTaskTitleEdit: function (event) {
        console.log('enable edit');
        // task__title-field input
        const inputElement = event.currentTarget;
        const taskElement = inputElement.closest('.task');
        taskElement.classList.add('task--edit');
    },

    //to save the title modification on enter key press
    disableInputEditOnKeydown: function (event) {
        console.log('disable edit');

        const inputTitleElmt = event.currentTarget;
        const newInputTitle = inputTitleElmt.value;
        setApi.updateNameInputApi(inputTitleElmt, newInputTitle);

    },

    //modify name of input
    updateNameInputApi: function (inputElmt, basePathUrl) {

        // update the 'p' title element with the input value
        inputElmt.textContent = basePathUrl;
        setApi.setLocalBaseUrl(basePathUrl)



    },

    setLocalBaseUrl: function (basePathUrl) {
        localStorage.setItem('baseUrl', basePathUrl);
        console.log(localStorage.getItem('baseUrl'));
    }


}