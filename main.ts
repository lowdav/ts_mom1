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

//variabler för att hämta inputvärden
const code = document.getElementById("code") as HTMLInputElement;
const coursename = document.getElementById("name") as HTMLInputElement;
const progression = document.getElementById("progression") as HTMLInputElement;
const syllabus = document.getElementById("syllabus") as HTMLInputElement;
const button = document.getElementById("button") as HTMLButtonElement;


//testutskrift
button.addEventListener("click", () => {
    
//Kursobjekt
//progression value ska vara ett av enum värdena
const courseInput: course = {
    code: code.value, 
    name: coursename.value,
    progression: progression.value as progression_values,
    syllabus: syllabus.value,
};


    console.log(courseInput);
});
