const includeElements = document.querySelectorAll("[data-include]");

includeElements.forEach(async (element) => {
  const filePath = element.getAttribute("data-include");

  // 読み込み中状態を付ける
  element.classList.add("is-loading");

  try {
    const response = await fetch(filePath);

    if (!response.ok) {
      throw new Error(`${filePath} を読み込めませんでした`);
    }

    const html = await response.text();

    element.innerHTML = html;
    element.classList.remove("is-loading");
    element.classList.add("is-loaded");
  } catch (error) {
    console.error(error);

    // 画面にはエラーメッセージを出さない
    // レイアウト崩れ防止のため、空のままにする
    element.innerHTML = "";

    element.classList.remove("is-loading");
    element.classList.add("is-error");
  }
});