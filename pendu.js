let words = require("./words.json");

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const tabHangMan = [
  `  ______
  |          
  |          
  |         
  |     
  |    
 _|_
|___|`,
  `  ______
  |     |      
  |          
  |        
  |     
  |   
 _|_
|___|`,
  `  ______
  |     |      
  |     o      
  |        
  |     
  |    
 _|_
|___|`,
  `  ______
  |     |      
  |     o      
  |     |    
  |     
  |    
 _|_
|___|`,
  `  ______
  |     |      
  |     o      
  |    /|    
  |     
  |    
 _|_
|___|`,
  `  ______
  |     |      
  |     o      
  |    /|\\     
  |     
  |    
 _|_
|___|`,
  `  ______
  |     |      
  |     o      
  |    /|\\     
  |     |
  |    
 _|_
|___|`,
  `  ______
  |     |      
  |     o      
  |    /|\\     
  |     |
  |    / 
 _|_
|___|`,
  `  ______
  |     |      
  |     o      
  |    /|\\     
  |     |
  |    / \\
 _|_
|___|`
];
let j = 0;

const randomWord = () => {
  let min = 0;
  let max = 1460;
  let random = Math.floor(Math.random() * (+max - +min)) + +min;
  if (words[random].label.length > 4) {
    return words[random].label;
  } else {
    return randomWord();
  }
};

const replace = (arr1, arr2, arr3) => {
  for (let i = 0; i < arr1.length; i++) {
    if (arr2.includes(arr1[i])) {
      arr3[i] = arr2;
    }
  }

  return arr1;
};

const deburr = str => {
  str = str.replace(/à/g, "a");
  str = str.replace(/â/g, "a");
  str = str.replace(/ç/g, "c");
  str = str.replace(/è/g, "e");
  str = str.replace(/é/g, "e");
  str = str.replace(/ê/g, "e");
  str = str.replace(/î/g, "i");
  str = str.replace(/ï/g, "i");
  str = str.replace(/ô/g, "o");
  str = str.replace(/ù/g, "u");
  str = str.replace(/û/g, "u");
  return str;
};

const showHangMan = () => {
  console.log(tabHangMan[j].toString());
};

const finalWord = Array.from(deburr(randomWord()).toUpperCase());

const hideWord = Array.from("*".repeat(finalWord.length));

const lettersUse = [];

let points = 8;

console.log("\nBienvenue dans le pendu !");

const countPoints = () => {
  console.log(`\nIl vous reste ${points} coups à jouer`);
};

const choix = () => {
  rl.question("Proposez une lettre : ", answer => {
    // console.log(finalWord);
    // console.log(answer.toUpperCase());
    if (lettersUse.includes(answer.toUpperCase())) {
      console.log(
        `La lettre "${answer.toUpperCase()}" a déjà été soumise, réessayez.`
      );
      pendu();
    } else {
      lettersUse.push(answer.toUpperCase());
      if (finalWord.includes(answer.toUpperCase())) {
        replace(finalWord, answer.toUpperCase(), hideWord);
        if (finalWord.join("") === hideWord.join("")) {
          console.log(
            `\nGagné ! Le mot secret était bien : ${finalWord.join("")}\n`
          );
          rl.close();
        } else {
          pendu();
        }
      } else {
        if (points > 1) {
          j += 1;
          points -= 1;
          return pendu();
        } else {
          j += 1;
          showHangMan();
          console.log(
            `\nGame Over ! Le mot secret était : ${finalWord.join("")}\n`
          );
          rl.close();
        }
      }
    }
  });
};

const pendu = () => {
  showHangMan();
  countPoints();
  console.log(`Quel est le mot secret ? ${hideWord.join("")}`);
  choix();
};

pendu();
