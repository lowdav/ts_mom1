//variabler
const header = document.getElementById("header");
const info = document.getElementById("info");
const code = document.getElementById("code");
const coursename = document.getElementById("name");
const progression = document.getElementById("progression");
const syllabus = document.getElementById("syllabus");
const button = document.getElementById("button");
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
const courses = [];
// hämtar innehåll från local storage - sparar i courses-arrayen
function loadSavedCourses() {
    const savedCourses = localStorage.getItem("savedcourses");
    // kontroll att arrayen inte är tom, annars skriv ut till DOM
    if (savedCourses !== null) {
        try {
            const coursesArr = JSON.parse(savedCourses);
            coursesArr.forEach((course) => {
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
        header.style.display = "none";
        info.textContent = "Inga kurser finns lagrade i localstorage";
        info.style.display = "block";
    }
}
;
loadSavedCourses();
//eventlyssnare som anropar funktionen för utskrift 
button.addEventListener("click", checkNotEmpty);
//kolla att inputfälten inte är tomma
function checkNotEmpty() {
    if (!code.value.trim() || !coursename.value.trim() || !syllabus.value.trim()) {
        info.textContent = "Fyll i alla fält!";
        info.style.display = "block";
        return;
    }
    else {
        collectInput();
    }
}
function collectInput() {
    //Kursobjekt
    //progression value ska vara ett av enum värdena
    const courseInput = {
        code: code.value,
        name: coursename.value,
        progression: progression.value,
        syllabus: syllabus.value,
    };
    if (courses.some(item => item.code.toLowerCase() === courseInput.code.toLowerCase())) {
        info.textContent = "En kurs med samma kurskod finns redan registrerad";
        info.style.display = "block";
        return;
    }
    //Lägger till courseInput i courses
    courses.push(courseInput);
    //skriver ut till DOM
    printInput(courseInput);
    //lagra i local storage
    saveCourses();
    //Tar bort ev felmeddelanden
    info.textContent = "Kursen sparades till local storage";
    info.style.display = "block";
    //rensa inputfälten
    code.value = "";
    coursename.value = "";
    progression.value = "A";
    syllabus.value = "";
}
;
function printInput(course) {
    header.style.display = "grid";
    const courselist = document.getElementById("courselist");
    const courserow = document.createElement("div");
    courserow.className = "courserow";
    const codeInput = document.createElement("p");
    codeInput.textContent = course.code;
    const courseNameInput = document.createElement("p");
    courseNameInput.textContent = course.name;
    const progressionInput = document.createElement("p");
    progressionInput.textContent = course.progression;
    const syllabusInput = document.createElement("p");
    syllabusInput.textContent = course.syllabus;
    courserow.appendChild(codeInput);
    courserow.appendChild(courseNameInput);
    courserow.appendChild(progressionInput);
    courserow.appendChild(syllabusInput);
    courselist.appendChild(courserow);
}
;
//Spara i local storage
function saveCourses() {
    localStorage.setItem("savedcourses", JSON.stringify(courses));
}
