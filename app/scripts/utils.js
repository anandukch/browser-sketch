export const initialState = {
  board: false,
  eraser: false,
  pen: false,
  color: "#000000",
  "pen-size": 5,
};

export async function getLocal() {
  let saved;
  let storage = await browser.storage.local.get();
  if (storage && storage.mark) {
    saved = storage["mark"];
  } else {
    saved = initialState;
    await browser.storage.local.set({ ["mark"]: saved ,["tabid"]: []});
  }
  return saved;
}