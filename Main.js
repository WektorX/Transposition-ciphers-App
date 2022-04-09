main = function(){

    var output = document.getElementById("output");
    output.innerText = "";

    var input = document.getElementById("input");
    input.addEventListener("input", (event) =>{
        var rail = new RailFenceCipher();
        rail.encrypt(event.target.value, 4)
    })

}