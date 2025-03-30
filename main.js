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
//skapar en array med objekt av typ course (mitt interface)
var courses = [];
//variabler för att hämta inputvärden
var code = document.getElementById("code");
var coursename = document.getElementById("name");
var progression = document.getElementById("progression");
var syllabus = document.getElementById("syllabus");
var button = document.getElementById("button");
//eventlyssnare som anropar funktionen för utskrift 
button.addEventListener("click", collectInput);
// const testArr: course[] = [
//     {
//       code: "DT057G",
//       name: "Webbutveckling I",
//       progression: progression_values.A,
//       syllabus: "https://test"
//     },
//     {
//       code: "DT084G",
//       name: "Webbutveckling II",
//       progression: progression_values.B,
//       syllabus: "https://test"
//     }
//   ];
function collectInput() {
    //Kursobjekt
    //progression value ska vara ett av enum värdena
    var courseInput = {
        code: code.value,
        name: coursename.value,
        progression: progression.value,
        syllabus: syllabus.value,
    };
    courses.push(courseInput);
    printInput(courseInput);
}
;
function printInput(course) {
    var courselist = document.getElementById("courselist");
    var courserow = document.createElement("div");
    courserow.className = "courserow";
    var codeInput = document.createElement("p");
    codeInput.textContent = course.code;
    var courseNameInput = document.createElement("p");
    courseNameInput.textContent = course.name;
    var progressionInput = document.createElement("p");
    progressionInput.textContent = course.progression;
    var syllabusInput = document.createElement("p");
    syllabusInput.textContent = course.syllabus;
    courserow.appendChild(codeInput);
    courserow.appendChild(courseNameInput);
    courserow.appendChild(progressionInput);
    courserow.appendChild(syllabusInput);
    courselist.appendChild(courserow);
    code.value = "";
    coursename.value = "";
    syllabus.value = "";
    console.log(courses);
}
;
