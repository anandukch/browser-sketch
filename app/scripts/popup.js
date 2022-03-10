const { getLocal, initialState } = require("./utils.js");

let SavedState = null;
async function onLoad() {
  const currentTabId = await browser.tabs
    .query({ active: true, currentWindow: true })
    .then((tabs) => tabs[0].id);
  const storedTabid = await browser.storage.local.get("tabid");
  if (storedTabid.tabid != currentTabId) {
    console.log("tabid changed");
    SavedState = initialState;
    await browser.storage.local.set({
      ["mark"]: SavedState,
      ["tabid"]: currentTabId,
    });
  } else {
    SavedState = await getLocal();
  }
  const savedStateKeys = Object.keys(SavedState);

  Object.keys(initialState).forEach((key) => {
    const checkbox = document.getElementById(key);
    if (key == "pen-size") {
      checkbox.value = SavedState["pen-size"];
      checkbox.addEventListener("click", onClickHandler);
    } else if (key == "color") {
      checkbox.addEventListener("change", onClickHandler);
    } else {
      checkbox.checked = savedStateKeys.includes(key) ? SavedState[key] : true;
      checkbox.addEventListener("click", onClickHandler);
    }
  });
}
let clearButton = document.getElementById("clear");
clearButton.addEventListener("click", onClickHandler);
async function onClickHandler(e) {
  const key = e.target.id;
  if (e.target.id == "pen-size") {
    SavedState["pen-size"] = parseInt(e.target.value);
  } else if (key == "color") {
    SavedState["color"] = e.target.value;
  } else if (key == "clear") {
    console.log("clear");
  } else {
    SavedState[e.target.id] = !SavedState[e.target.id];
  }
  if (SavedState["board"] == false) {
    SavedState = initialState;
    Object.keys(initialState).forEach((key) => {
      if (key != "pen-size") {
        const checkbox = document.getElementById(key);
        checkbox.checked = false;
      }
    });
  }
  await browser.storage.local.set({ ["mark"]: SavedState });
  let msg = {
    type: "check",
    key: key,
  };
  // browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
  //   console.log(tabs[0].id);
  //   browser.tabs.sendMessage(tabs[0].id, msg);
  // });
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    console.log(tabs[0].id);
    chrome.tabs.sendMessage(tabs[0].id, msg);
  });
}

onLoad();

