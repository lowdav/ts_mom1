//Enum för kursprogression
//Minnesanteckning: Enum (enumeration) är en lista på tillåtna värden.
//Min enum nedan har jag gjort till strängbaserad genom att tilldela en sträng
//till varje värde. Annars hade varje värde fått ett nummer som värde 0-2 i detta fall.
var progression_values;
(function (progression_values) {
    progression_values["A"] = "A";
    progression_values["B"] = "B";
    progression_values["C"] = "C";
})(progression_values || (progression_values = {}));
//variabler för att hämta inputvärden
var code = document.getElementById("code");
var coursename = document.getElementById("name");
var progression = document.getElementById("progression");
var syllabus = document.getElementById("syllabus");
var button = document.getElementById("button");
//testutskrift
button.addEventListener("click", function () {
    //Kursobjekt
    //progression value ska vara ett av enum värdena
    var courseInput = {
        code: code.value,
        name: coursename.value,
        progression: progression.value,
        syllabus: syllabus.value,
    };
    console.log(courseInput);
});
