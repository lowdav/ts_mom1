//variabler
var info = document.getElementById("info");
var code = document.getElementById("code");
var coursename = document.getElementById("name");
var progression = document.getElementById("progression");
var syllabus = document.getElementById("syllabus");
var button = document.getElementById("button");
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
// hämtar innehåll från local storage - sparar i courses-arrayen
function loadSavedCourses() {
    var savedCourses = localStorage.getItem("savedcourses");
    // 2 kontroll att arrayen inte är tom, annars skriv ut till DOM
    if (savedCourses !== null) {
        try {
            var coursesArr = JSON.parse(savedCourses);
            coursesArr.forEach(function (course) {
                courses.push(course);
                console.log(course);
                printInput(course);
            });
        }
        catch (error) {
            console.error("Något gick fel när local storage skulle läsas in."), error;
        }
    }
    else {
        info.style.display = "block";
    }
}
;
loadSavedCourses();
//eventlyssnare som anropar funktionen för utskrift 
button.addEventListener("click", collectInput);
// LÄGG TILL -  när en kurs läggs till, kolla att kurskoden inte redan finns i local storage/arrayen
function collectInput() {
    //Kursobjekt
    //progression value ska vara ett av enum värdena
    var courseInput = {
        code: code.value,
        name: coursename.value,
        progression: progression.value,
        syllabus: syllabus.value,
    };
    //Lägger till courseInput i courses
    courses.push(courseInput);
    //skriver ut till DOM
    printInput(courseInput);
    //lagra i local storage
    saveCourses();
    //Tar bort info om att inga kurser finns
    info.style.display = "none";
    //rensa inputfälten
    code.value = "";
    coursename.value = "";
    progression.value = "A";
    syllabus.value = "";
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
    console.log(courses);
}
;
//Spara i local storage
function saveCourses() {
    localStorage.setItem("savedcourses", JSON.stringify(courses));
}
