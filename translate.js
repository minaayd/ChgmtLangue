function Translate() {
  this.init = function (attribute, lng) {
    this.attribute = attribute;
    this.lng = lng;
  };

  this.process = async function () {
    try {
      const response = await fetch("lng/" + this.lng + ".json");
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      const LngObject = await response.json();
      const allDom = document.getElementsByTagName("*");
      for (let i = 0; i < allDom.length; i++) {
        const elem = allDom[i];
        const key = elem.getAttribute(this.attribute);
        if (key !== null && LngObject[key]) {
          elem.innerHTML = LngObject[key];
        }
      }
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  };
}

document.addEventListener("DOMContentLoaded", function () {
  const translator = new Translate();
  translator.init("data-translate", "fr");
  translator.process();

  document
    .getElementById("languageSelect")
    .addEventListener("change", function () {
      const language = this.value;
      translator.init("data-translate", language);
      translator.process();
    });
});
