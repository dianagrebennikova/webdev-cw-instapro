import { getToken, goToPage, POSTS_PAGE } from "../index.js";
import { renderUploadImageComponent } from "./upload-image-component.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  appEl.innerHTML = `
    <div class="add-header-container">
      <div class="page-header">
        <h1 class="logo">instapro</h1>
        <button class="header-button add-or-login-button">
          <div title="Добавить пост" class="add-post-sign"></div>
        </button>
        <button title="Diana" class="header-button logout-button">Выйти</button>  
      </div>
    </div>
    <div class="page-container">
      <div class="form">
        <h3 class="form-title">Добавить пост</h3>
        <form id="add-post-form" class="form-inputs">
          <div class="upload-image-container"></div>
          
          <label>
            Опишите фотографию:
            <textarea id="description-input" class="input textarea" rows="4" " required></textarea>
          </label>

          <button type="submit" class="button button--large" id="add-button">Добавить</button>
        </form>
      </div>
    </div>
  `;

  // Рендерим компонент загрузки изображения
  let currentImageUrl = "";
  const uploadContainer = appEl.querySelector(".upload-image-container");
  renderUploadImageComponent({
    element: uploadContainer,
    onImageUrlChange: (url) => {
      currentImageUrl = url;
    },
  });

  // Обработка отправки формы
  const formEl = appEl.querySelector("#add-post-form");
  formEl.addEventListener("submit", async (event) => {
    event.preventDefault();

    const description = document.getElementById("description-input").value.trim();

    if (!description) {
      alert("Описание не может быть пустым");
      return;
    }

    if (!currentImageUrl) {
      alert("Выберите фото для загрузки");
      return;
    }

    // Передаем данные в колбэк, чтобы index.js добавил пост
    onAddPostClick && onAddPostClick({ description, imageUrl: currentImageUrl });
  });

  // Переход на главную страницу при клике на логотип
  const logoEl = appEl.querySelector(".logo");
  logoEl.addEventListener("click", () => {
    goToPage(POSTS_PAGE);
  });
}
