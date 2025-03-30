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

//variabler för att hämta inputvärden
const code = document.getElementById("code") as HTMLInputElement;
const coursename = document.getElementById("name") as HTMLInputElement;
const progression = document.getElementById("progression") as HTMLSelectElement;
const syllabus = document.getElementById("syllabus") as HTMLInputElement;
const button = document.getElementById("button") as HTMLButtonElement;


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



function collectInput(): void {
//Kursobjekt
//progression value ska vara ett av enum värdena
const courseInput: course = {
    code: code.value, 
    name: coursename.value,
    progression: progression.value as progression_values,
    syllabus: syllabus.value,
};

courses.push(courseInput);

printInput(courseInput);

};


function printInput(course: course): void {

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

code.value = "";
coursename.value = "";
progression.value = "A";
syllabus.value = "";

console.log(courses);
};
