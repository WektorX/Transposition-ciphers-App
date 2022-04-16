main = function () {


    // Configure output textarea
    var output = document.getElementById("output");
    output.innerText = "";

    // Setup input textarea
    var input = document.getElementById("input");
    input.addEventListener("input", (event) => {
        if (encrypt) {
            encryptionAlgorithm.encrypt(event.target.value, options)
        }
        else {
            encryptionAlgorithm.decrypt(event.target.value, options)
        }
    })

    // Choose encryption algorithm - default RailFence 
    var encryptionAlgorithm = new RailFenceCipher();
    var options = 4;
    var algorithms = document.getElementsByClassName("alg_menu--item");

    //Options - by defaulr railfence options are displayed
    var railfenceOptions = document.getElementById("railfence");
    railfenceOptions.style.display = "flex";
    var columnOptions = document.getElementById("column");
    var ownOptions = document.getElementById("own")

    for (let i = 0; i < algorithms.length; i++) {

        let a = algorithms[i];
        // add listener on click - change algotithm
        a.addEventListener("click", function (e) {

            //remove highlight 
            for (let j = 0; j < algorithms.length; j++) {
                algorithms[j].classList.remove("alg-selected")
            }

            //add highlight to chosen element
            a.classList.add("alg-selected");
            let value = a.innerText;

            // choose algorithm and hide and show alg options
            switch (value) {
                case "Płotkowy":
                    encryptionAlgorithm = new RailFenceCipher();
                    hideAndShow(railfenceOptions, [columnOptions, ownOptions])
                    break;
                case "Kolumnowy":
                    encryptionAlgorithm = new RailFenceCipher();
                    hideAndShow(columnOptions, [railfenceOptions, ownOptions])
                    break;
                case "Własny":
                    encryptionAlgorithm = new RailFenceCipher();
                    hideAndShow(ownOptions, [railfenceOptions, columnOptions])
                    break;
            }

        })
    }

    //Select actions - encrypt or decrypt the message
    var encrypt = true;
    var actions = document.getElementsByClassName("action_menu--item");
    for (let i = 0; i < actions.length; i++) {

        let a = actions[i];

        a.addEventListener("click", function (e) {

            for (let j = 0; j < actions.length; j++) {
                actions[j].classList.remove("act-selected")
            }

            a.classList.add("act-selected");
            let value = a.innerText;

            encrypt = (value == "Zaszyfruj");

        })
    }


    //Listeners for all options 

    var railfenceKey = document.getElementById("railKey");
    railfenceKey.addEventListener("change", (event) => {
        options = event.target.value;
        if (encrypt) {
            encryptionAlgorithm.encrypt(input.value, options);
        }
        else {
            encryptionAlgorithm.decrypt(input.value, options);
        }
    })



}



hideAndShow = function (show, hide) {
    show.style.display = "flex";

    for (let i = 0; i < hide.length; i++) {
        h = hide[i];
        h.style.display = "none"
    }
}