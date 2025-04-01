//variabler
const header = document.getElementById("header") as HTMLDivElement;
const info = document.getElementById("info") as HTMLParagraphElement;
const code = document.getElementById("code") as HTMLInputElement;
const coursename = document.getElementById("name") as HTMLInputElement;
const progression = document.getElementById("progression") as HTMLSelectElement;
const syllabus = document.getElementById("syllabus") as HTMLInputElement;
const button = document.getElementById("button") as HTMLButtonElement;

//Enum för kursprogression
//Minnesanteckning: Enum (enumeration) är en lista på tillåtna värden.
//Min enum nedan har jag gjort till strängbaserad genom att tilldela en sträng
//till varje värde. Annars hade varje värde fått ett nummer som värde 0-2 i detta fall.

enum progression_values {
    A = "A",
    B = "B",
    C = "C",
} 

//Interface för kurs
//Minnesanteckning: Interface är en beskrivning av hur ett objekt ska se ut
interface course {
    code: string;
    name: string;
    progression: progression_values;
    syllabus: string;
}

//skapar en array med objekt av typ course (mitt interface)
const courses: course[] = [];



// hämtar innehåll från local storage - sparar i courses-arrayen

function loadSavedCourses(): void {
    const savedCourses = localStorage.getItem("savedcourses");

// kontroll att arrayen inte är tom, annars skriv ut till DOM

if (savedCourses !== null) {
    try {
        const coursesArr: course[] = JSON.parse(savedCourses);
        coursesArr.forEach((course) => {
            courses.push(course);
            console.log(course);
            printInput(course);
        })
    } catch (error) {
        console.error("Något gick fel när local storage skulle läsas in."), error;
    }
} else {
    header.style.display = "none";
    info.textContent = "Inga kurser finns lagrade i localstorage";
    info.style.display = "block";
}
};

loadSavedCourses();

//eventlyssnare som anropar funktionen för utskrift 
button.addEventListener("click", checkNotEmpty);

//kolla att inputfälten inte är tomma
function checkNotEmpty(): void {
    if (!code.value.trim() || !coursename.value.trim() || !syllabus.value.trim()) {
        info.textContent = "Fyll i alla fält!";
        info.style.display = "block";
        return;
      } else {
        collectInput();
      }   
}

function collectInput(): void {
//Kursobjekt
//progression value ska vara ett av enum värdena
const courseInput: course = {
    code: code.value, 
    name: coursename.value,
    progression: progression.value as progression_values,
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

};


function printInput(course: course): void {

header.style.display = "grid";    
const courselist = document.getElementById("courselist") as HTMLDivElement; 
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

};


//Spara i local storage
function saveCourses(): void {
    localStorage.setItem("savedcourses", JSON.stringify(courses));
  }