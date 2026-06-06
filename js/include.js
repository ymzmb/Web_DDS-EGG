document.addEventListener("DOMContentLoaded", () => {
  const includeElements = document.querySelectorAll("[data-include]");

  includeElements.forEach(async (element) => {
    const filePath = element.getAttribute("data-include");

    try {
      const response = await fetch(filePath);

      if (!response.ok) {
        throw new Error(`${filePath} を読み込めませんでした`);
      }

      const html = await response.text();
      element.innerHTML = html;

      // ヘッダー読み込み後に、ページごとの説明文を反映する
      const pageDescription = document.body.getAttribute("data-page-description");
      const descriptionElement = document.getElementById("page-description");

      if (descriptionElement && pageDescription) {
        descriptionElement.textContent = pageDescription;
      }
    } catch (error) {
      console.error(error);
      element.innerHTML = "<p>共通パーツの読み込みに失敗しました。</p>";
    }
  });
});