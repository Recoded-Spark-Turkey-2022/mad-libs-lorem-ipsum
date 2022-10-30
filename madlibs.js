/**
 * Complete the implementation of parseStory.
 *
 * parseStory retrieves the story as a single string from story.txt
 * (I have written this part for you).
 *
 * In your code, you are required (please read this carefully):
 * - to return a list of objects
 * - each object should definitely have a field, `word`
 * - each object should maybe have a field, `pos` (part of speech)
 *
 * So for example, the return value of this for the example story.txt
 * will be an object that looks like so (note the comma! periods should
 * be handled in the same way).
 *
 * Input: "Louis[n] went[v] to the store[n], and it was fun[a]."
 * Output: [
 *  { word: "Louis", pos: "noun" },
 *  { word: "went", pos: "verb", },
 *  { word: "to", },
 *  { word: "the", },
 *  { word: "store", pos: "noun" }
 *  { word: "," }
 *  ....
 *
 * There are multiple ways to do this, but you may want to use regular expressions.
 * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/
 */
function parseStory(rawStory) {
  const noun = /\[n\]/; // regular Expression for [n]
  const verb = /\[v\]/; // regular Expression for [v]
  const adj = /\[a\]/; // regular Expression for [a]
  const outputStory = []; // new empty erray to push each word of our story
  const ourStory = rawStory.split(" "); //convert the story to array using split()
  ourStory.map((story) => {
    // looping over the array
    if (noun.test(story) === true) {
      //checking if the [n] exists in each word in our story
      outputStory.push({
        // push each story to the emtpy array
        word: story,
        pos: "noun",
      });
    } else if (verb.test(story) === true) {
      //checking if the [v] exists in each word in our story
      outputStory.push({
        // push each story to the emtpy array
        word: story,
        pos: "verb",
      });
    } else if (adj.test(story) === true) {
      //checking if the [a] exists in each word in our story
      outputStory.push({
        // push each story to the emtpy array
        word: story,
        pos: "adj",
      });
    } else {
      outputStory.push({
        // push each story to the emtpy array
        word: story,
      });
    }
  });
  return outputStory;
}

/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 *
 * You'll want to use the results of parseStory() to display the story on the page.
 */

getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    console.log(processedStory);
    createElements(processedStory);
    liveUpdates();
  });

function createElements(outputStory) {
  const madEdit = document.querySelector(".madLibsEdit"); //select the element with class (madLibsEdit)
  const madPrev = document.querySelector(".madLibsPreview"); //select the element with class (madLibsPreview)

  outputStory.map((story) => {
    //looping over the array of objects that we return in line 57
    if ("pos" in story === false) {
      //checking if each object has "pos" key
      madEdit.innerHTML = madEdit.innerHTML + `${story.word} `;
      madPrev.innerHTML = madEdit.innerHTML + `${story.word} `;
    } else if ("pos" in story === true) {
      //checking if each object has "pos" key
      madEdit.innerHTML =
        madEdit.innerHTML +
        `<input id="${story.word}" placeHolder="${story.word}" />`;
      madPrev.innerHTML =
        madPrev.innerHTML + `<input id="${story.pos}" />`;
        //document.querySelectorAll(".madLibsPreview input").disabled = true;
    }
  });
  return outputStory;
}

function liveUpdates () {
  const editingSection = document.querySelectorAll(".madLibsEdit input");
  const previewSection = document.querySelectorAll(".madLibsPreview input");
  for (let i=0; i<editingSection.length;i++) {
    previewSection[i].value=editingSection[i].value;
  editingSection[i].addEventListener("input", liveUpdates);
  }
}
