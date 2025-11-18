import { getToken } from "../index.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  appEl.innerHTML = `
    <div class="page-container">
      <div class="header-container"></div>
      <h1 class="page-title">Добавить пост</h1>
      <form id="add-post-form" class="form">
        <textarea
          id="description-input"
          class="input input--large"
          placeholder="Описание картинки"
          required
        ></textarea>
          <input type="file" id="image-file-input" accept="image/*" required class="input--file">
  
        <button type="submit" class="button button--large">Добавить</button>
      </form>
    </div>
  `;

  const formEl = document.getElementById("add-post-form");
  console.log("Форма добавления поста рендерена:", formEl);

  formEl.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log("Нажата кнопка Добавить");

    const description = document
      .getElementById("description-input")
      .value.trim();
    const file = document.getElementById("image-file-input").files[0];

    if (!description) {
      alert("Описание не может быть пустым");
      return;
    }

    if (!file) {
      alert("Выберите файл для загрузки");
      return;
    }

    console.log("Описание:", description, "Файл:", file, "Token:", getToken());

    try {
      //Загружаем изображение на сервер
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        "https://wedev-api.sky.pro/api/upload/image",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log("Ответ API при загрузке картинки:", data);

      const imageUrl = data.fileUrl;
      console.log("URL загруженной картинки:", imageUrl);

      if (!imageUrl) {
        alert("Ошибка: сервер не вернул корректный URL картинки");
        return;
      }

      // Добавляем пост 
      onAddPostClick && onAddPostClick({ description, imageUrl });
    } catch (error) {
      console.error("Ошибка загрузки или добавления поста:", error);
      alert("Ошибка при добавлении поста");
    }
  });
}
