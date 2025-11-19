/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./api.js":
/*!****************!*\
  !*** ./api.js ***!
  \****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addPost: () => (/* binding */ addPost),
/* harmony export */   deletePost: () => (/* binding */ deletePost),
/* harmony export */   getPosts: () => (/* binding */ getPosts),
/* harmony export */   getUserPosts: () => (/* binding */ getUserPosts),
/* harmony export */   likePost: () => (/* binding */ likePost),
/* harmony export */   loginUser: () => (/* binding */ loginUser),
/* harmony export */   registerUser: () => (/* binding */ registerUser),
/* harmony export */   unlikePost: () => (/* binding */ unlikePost),
/* harmony export */   uploadImage: () => (/* binding */ uploadImage)
/* harmony export */ });
const personalKey = "diana123test";
const baseHost = "https://wedev-api.sky.pro/api/v1";
const postsHost = `${baseHost}/${personalKey}/instapro`;

//Получение постов
function getPosts() {
  return fetch(postsHost, { method: "GET" })
    .then((response) => response.json())
    .then((data) => data.posts);
}

//Регистрация пользователя
function registerUser({ login, password, name, imageUrl }) {
  return fetch(baseHost + "/api/user", {
    method: "POST",
    body: JSON.stringify({ login, password, name, imageUrl }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Такой пользователь уже существует");
    }
    return response.json();
  });
}

//Вход пользователя
function loginUser({ login, password }) {
  return fetch(baseHost + "/api/user/login", {
    method: "POST",
    body: JSON.stringify({ login, password }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Неверный логин или пароль");
    }
    return response.json();
  });
}

//Загрузка изображения
function uploadImage({ file }) {
  const data = new FormData();
  data.append("file", file);

  return fetch(baseHost + "/api/upload/image", {
    method: "POST",
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Ответ API при загрузке картинки:", data);
      return { url: data.fileUrl };
    });
}

//Добавление поста
async function addPost({ description, imageUrl, token }) {
  const body = { description, imageUrl };

  console.log("📦 Формируем JSON для добавления поста:", body);

  const response = await fetch(postsHost, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const text = await response.text();
  console.log("📩 Ответ сервера:", text);

  if (!response.ok) {
    console.error("❌ Ошибка при добавлении поста:", text);
    throw new Error("Ошибка при добавлении поста");
  }

  const data = JSON.parse(text);
  console.log("✅ Parsed response:", data);
  return data;
}

//Поставить лайк
function likePost({ postId, token }) {
  return fetch(`${postsHost}/${postId}/like`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
}

//Убрать лайк
function unlikePost({ postId, token }) {
  return fetch(`${postsHost}/${postId}/dislike`, {  
    method: "POST",                                 
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
}

//Удалить пост
async function deletePost({ postId, token }) {
  const response = await fetch(`${postsHost}/${postId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Ошибка при удалении поста:", data);
    throw new Error(data.message || "Ошибка при удалении поста");
  }

  return data;
}
//Получить посты конкретного пользователя
function getUserPosts({ userId, token }) {
  return fetch(`${postsHost}/user-posts/${userId}`, {
    method: "GET",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })
  .then((res) => res.json())
  .then((data) => data.posts);
}






/***/ }),

/***/ "./assets/fonts/stratosskyengweb-medium.woff2":
/*!****************************************************!*\
  !*** ./assets/fonts/stratosskyengweb-medium.woff2 ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "df607770dd56217f1c94.woff2";

/***/ }),

/***/ "./assets/fonts/stratosskyengweb-regular.woff2":
/*!*****************************************************!*\
  !*** ./assets/fonts/stratosskyengweb-regular.woff2 ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "ce93393e831d32412096.woff2";

/***/ }),

/***/ "./assets/images/like-active.svg":
/*!***************************************!*\
  !*** ./assets/images/like-active.svg ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "d05226d21422d0ae3b24.svg";

/***/ }),

/***/ "./assets/images/like-not-active.svg":
/*!*******************************************!*\
  !*** ./assets/images/like-not-active.svg ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "fe1b8ca722799bd5363c.svg";

/***/ }),

/***/ "./components/add-post-page-component.js":
/*!***********************************************!*\
  !*** ./components/add-post-page-component.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderAddPostPageComponent: () => (/* binding */ renderAddPostPageComponent)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index.js */ "./index.js");


function renderAddPostPageComponent({ appEl, onAddPostClick }) {
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

    console.log("Описание:", description, "Файл:", file, "Token:", (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.getToken)());

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


/***/ }),

/***/ "./components/auth-page-component.js":
/*!*******************************************!*\
  !*** ./components/auth-page-component.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderAuthPageComponent: () => (/* binding */ renderAuthPageComponent)
/* harmony export */ });
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api.js */ "./api.js");
/* harmony import */ var _header_component_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./header-component.js */ "./components/header-component.js");
/* harmony import */ var _upload_image_component_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./upload-image-component.js */ "./components/upload-image-component.js");




/**
 * Компонент страницы авторизации.
 * Этот компонент предоставляет пользователю интерфейс для входа в систему или регистрации.
 * Форма переключается между режимами "Вход" и "Регистрация".
 *
 * @param {HTMLElement} params.appEl - Корневой элемент приложения, в который будет рендериться страница.
 * @param {Function} params.setUser - Функция, вызываемая при успешной авторизации или регистрации.
 *                                    Принимает объект пользователя в качестве аргумента.
 */
function renderAuthPageComponent({ appEl, setUser }) {
  /**
   * Флаг, указывающий текущий режим формы.
   * Если `true`, форма находится в режиме входа. Если `false`, в режиме регистрации.
   * @type {boolean}
   */
  let isLoginMode = true;

  /**
   * URL изображения, загруженного пользователем при регистрации.
   * Используется только в режиме регистрации.
   * @type {string}
   */
  let imageUrl = "";

  /**
   * Рендерит форму авторизации или регистрации.
   * В зависимости от значения `isLoginMode` отображает соответствующий интерфейс.
   */
  const renderForm = () => {
    const appHtml = `
      <div class="page-container">
          <div class="header-container"></div>
          <div class="form">
              <h3 class="form-title">
                ${
                  isLoginMode
                    ? "Вход в&nbsp;Instapro"
                    : "Регистрация в&nbsp;Instapro"
                }
              </h3>
              <div class="form-inputs">
                  ${
                    !isLoginMode
                      ? `
                      <div class="upload-image-container"></div>
                      <input type="text" id="name-input" class="input" placeholder="Имя" />
                      `
                      : ""
                  }
                  <input type="text" id="login-input" class="input" placeholder="Логин" />
                  <input type="password" id="password-input" class="input" placeholder="Пароль" />
                  <div class="form-error"></div>
                  <button class="button" id="login-button">${
                    isLoginMode ? "Войти" : "Зарегистрироваться"
                  }</button>
              </div>
              <div class="form-footer">
                <p class="form-footer-title">
                  ${isLoginMode ? "Нет аккаунта?" : "Уже есть аккаунт?"}
                  <button class="link-button" id="toggle-button">
                    ${isLoginMode ? "Зарегистрироваться." : "Войти."}
                  </button>
                </p>
              </div>
          </div>
      </div>    
    `;

    appEl.innerHTML = appHtml;

    /**
     * Устанавливает сообщение об ошибке в форме.
     * @param {string} message - Текст сообщения об ошибке.
     */
    const setError = (message) => {
      appEl.querySelector(".form-error").textContent = message;
    };

    // Рендерим заголовок страницы
    (0,_header_component_js__WEBPACK_IMPORTED_MODULE_1__.renderHeaderComponent)({
      element: document.querySelector(".header-container"),
    });

    // Если режим регистрации, рендерим компонент загрузки изображения
    const uploadImageContainer = appEl.querySelector(".upload-image-container");
    if (uploadImageContainer) {
      (0,_upload_image_component_js__WEBPACK_IMPORTED_MODULE_2__.renderUploadImageComponent)({
        element: uploadImageContainer,
        onImageUrlChange(newImageUrl) {
          imageUrl = newImageUrl;
        },
      });
    }

    // Обработка клика на кнопку входа/регистрации
    document.getElementById("login-button").addEventListener("click", () => {
      setError("");

      if (isLoginMode) {
        // Обработка входа
        const login = document.getElementById("login-input").value;
        const password = document.getElementById("password-input").value;

        if (!login) {
          alert("Введите логин");
          return;
        }

        if (!password) {
          alert("Введите пароль");
          return;
        }

        (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.loginUser)({ login, password })
          .then((user) => {
            setUser(user.user);
          })
          .catch((error) => {
            console.warn(error);
            setError(error.message);
          });
      } else {
        // Обработка регистрации
        const login = document.getElementById("login-input").value;
        const name = document.getElementById("name-input").value;
        const password = document.getElementById("password-input").value;

        if (!name) {
          alert("Введите имя");
          return;
        }

        if (!login) {
          alert("Введите логин");
          return;
        }

        if (!password) {
          alert("Введите пароль");
          return;
        }

        if (!imageUrl) {
          alert("Не выбрана фотография");
          return;
        }

        (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.registerUser)({ login, password, name, imageUrl })
          .then((user) => {
            setUser(user.user);
          })
          .catch((error) => {
            console.warn(error);
            setError(error.message);
          });
      }
    });

    // Обработка переключения режима (вход ↔ регистрация)
    document.getElementById("toggle-button").addEventListener("click", () => {
      isLoginMode = !isLoginMode;
      renderForm(); // Перерисовываем форму с новым режимом
    });
  };

  // Инициализация формы
  renderForm();
}


/***/ }),

/***/ "./components/header-component.js":
/*!****************************************!*\
  !*** ./components/header-component.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderHeaderComponent: () => (/* binding */ renderHeaderComponent)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index.js */ "./index.js");
/* harmony import */ var _routes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../routes.js */ "./routes.js");



/**
 * Компонент заголовка страницы.
 * Этот компонент отображает шапку страницы с логотипом, кнопкой добавления постов/входа и кнопкой выхода (если пользователь авторизован).
 * 
 * @param {HTMLElement} params.element - HTML-элемент, в который будет рендериться заголовок.
 * @returns {HTMLElement} Возвращает элемент заголовка после рендеринга.
 */
function renderHeaderComponent({ element }) {
  /**
   * Рендерит содержимое заголовка.
   */
  element.innerHTML = `
  <div class="page-header">
      <h1 class="logo">instapro</h1>
      <button class="header-button add-or-login-button">
      ${
        _index_js__WEBPACK_IMPORTED_MODULE_0__.user
          ? `<div title="Добавить пост" class="add-post-sign"></div>`
          : "Войти"
      }
      </button>
      ${
        _index_js__WEBPACK_IMPORTED_MODULE_0__.user
          ? `<button title="${_index_js__WEBPACK_IMPORTED_MODULE_0__.user.name}" class="header-button logout-button">Выйти</button>`
          : ""
      }  
  </div>
  `;

  /**
   * Обработчик клика по кнопке "Добавить пост"/"Войти".
   * Если пользователь авторизован, перенаправляет на страницу добавления постов.
   * Если пользователь не авторизован, перенаправляет на страницу авторизации.
   */
  element
    .querySelector(".add-or-login-button")
    .addEventListener("click", () => {
      if (_index_js__WEBPACK_IMPORTED_MODULE_0__.user) {
        (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.goToPage)(_routes_js__WEBPACK_IMPORTED_MODULE_1__.ADD_POSTS_PAGE);
      } else {
        (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.goToPage)(_routes_js__WEBPACK_IMPORTED_MODULE_1__.AUTH_PAGE);
      }
    });

  /**
   * Обработчик клика по логотипу.
   * Перенаправляет на страницу с постами.
   */
  element.querySelector(".logo").addEventListener("click", () => {
    (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.goToPage)(_routes_js__WEBPACK_IMPORTED_MODULE_1__.POSTS_PAGE);
  });

  /**
   * Обработчик клика по кнопке "Выйти".
   * Если кнопка существует (т.е. пользователь авторизован), вызывает функцию `logout`.
   */
  element.querySelector(".logout-button")?.addEventListener("click", _index_js__WEBPACK_IMPORTED_MODULE_0__.logout);

  return element;
}


/***/ }),

/***/ "./components/loading-page-component.js":
/*!**********************************************!*\
  !*** ./components/loading-page-component.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderLoadingPageComponent: () => (/* binding */ renderLoadingPageComponent)
/* harmony export */ });
/* harmony import */ var _header_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./header-component.js */ "./components/header-component.js");


/**
 * Компонент страницы загрузки.
 * Этот компонент отображает страницу с индикатором загрузки и заголовком.
 * Используется для отображения промежуточного состояния, пока выполняется загрузка данных или другой процесс.
 * 
 * @param {HTMLElement} params.appEl - Корневой элемент приложения, в который будет рендериться страница загрузки.
 * @param {Object} params.user - Объект пользователя, содержащий данные о текущем авторизованном пользователе (если он есть).
 * @param {Function} params.goToPage - Функция для навигации по страницам.
 */
function renderLoadingPageComponent({ appEl, user, goToPage }) {
  /**
   * HTML-разметка страницы загрузки.
   * Содержит контейнер заголовка и индикатор загрузки.
   */
  const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>
                <div class="loading-page">
                  <div class="loader"><div></div><div></div><div></div></div>
                </div>
              </div>`;

  // Устанавливаем разметку в корневой элемент приложения
  appEl.innerHTML = appHtml;

  /**
   * Рендеринг заголовка с использованием компонента `renderHeaderComponent`.
   * Передаются данные пользователя и функция навигации.
   */
  (0,_header_component_js__WEBPACK_IMPORTED_MODULE_0__.renderHeaderComponent)({
    user,
    element: document.querySelector(".header-container"),
    goToPage,
  });
}


/***/ }),

/***/ "./components/posts-page-component.js":
/*!********************************************!*\
  !*** ./components/posts-page-component.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderPostsPageComponent: () => (/* binding */ renderPostsPageComponent)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index.js */ "./index.js");
/* harmony import */ var _header_component_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./header-component.js */ "./components/header-component.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/formatDistanceToNow.js");
/* harmony import */ var date_fns_locale__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! date-fns/locale */ "./node_modules/date-fns/locale/ru.js");
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../api.js */ "./api.js");
/* harmony import */ var _assets_images_like_active_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../assets/images/like-active.svg */ "./assets/images/like-active.svg");
/* harmony import */ var _assets_images_like_not_active_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../assets/images/like-not-active.svg */ "./assets/images/like-not-active.svg");









function renderPostsPageComponent({ appEl }) {
  const renderPosts = () => {
    const postsHtml = _index_js__WEBPACK_IMPORTED_MODULE_0__.posts
      .map(post => {
        const postDate = new Date(post.createdAt);

        // проверяем лайк во всех массивах
        const allPosts = [..._index_js__WEBPACK_IMPORTED_MODULE_0__.posts, ...(window.userPosts || [])];
        const postGlobal = allPosts.find(p => p.id === post.id);
        const isLiked = postGlobal?.likes.some(l => l.id === _index_js__WEBPACK_IMPORTED_MODULE_0__.user?._id);
        const likeImage = isLiked ? _assets_images_like_active_svg__WEBPACK_IMPORTED_MODULE_5__ : _assets_images_like_not_active_svg__WEBPACK_IMPORTED_MODULE_6__;

        return `
          <li class="post" data-post-id="${post.id}">
            <div class="post-header" data-user-id="${post.user.id}">
              <img src="${post.user.imageUrl}" class="post-header__user-image">
              <p class="post-header__user-name">${post.user.name}</p>
            </div>
            <div class="post-image-container">
              <img class="post-image" src="${post.imageUrl}">
              <div class="heart-overlay"></div>
            </div>
            <div class="post-likes">
              <button data-post-id="${post.id}" class="like-button">
                <img src="${likeImage}">
              </button>
              <p class="post-likes-text">
                Нравится: <strong>${post.likes.length}</strong>
              </p>
              ${
                post.user.id === _index_js__WEBPACK_IMPORTED_MODULE_0__.user?._id
                  ? `<button class="delete-button" data-post-id="${post.id}">Удалить</button>`
                  : ""
              }
            </div>
            <p class="post-text">
              <span class="user-name">${post.user.name}</span>
              ${post.description}
            </p>
            <p class="post-date">
              ${(0,date_fns__WEBPACK_IMPORTED_MODULE_2__.formatDistanceToNow)(postDate, { addSuffix: true, locale: date_fns_locale__WEBPACK_IMPORTED_MODULE_3__.ru })}
            </p>
          </li>
        `;
      })
      .join("");

    appEl.innerHTML = `
      <div class="page-container">
        <div class="header-container"></div>
        <ul class="posts">${postsHtml}</ul>
      </div>
    `;

    (0,_header_component_js__WEBPACK_IMPORTED_MODULE_1__.renderHeaderComponent)({ element: document.querySelector(".header-container") });

    // Переход на страницу пользователя
    document.querySelectorAll(".post-header").forEach(userEl => {
      userEl.addEventListener("click", () => {
        (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.goToPage)(_index_js__WEBPACK_IMPORTED_MODULE_0__.USER_POSTS_PAGE, { userId: userEl.dataset.userId });
      });
    });

    // Лайки с анимацией
    document.querySelectorAll(".like-button").forEach(button => {
      button.addEventListener("click", async () => {
        const postId = button.dataset.postId;
        const imgEl = button.querySelector("img");
        const likesTextEl = button.nextElementSibling;

        try {
          const newLikesCount = await (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.toggleLike)(postId);

          const allPosts = [..._index_js__WEBPACK_IMPORTED_MODULE_0__.posts, ...(window.userPosts || [])];
          const post = allPosts.find(p => p.id === postId);
          const isLiked = post.likes.some(l => l.id === _index_js__WEBPACK_IMPORTED_MODULE_0__.user._id);

          imgEl.src = isLiked ? _assets_images_like_active_svg__WEBPACK_IMPORTED_MODULE_5__ : _assets_images_like_not_active_svg__WEBPACK_IMPORTED_MODULE_6__;

          const overlay = button.closest(".post").querySelector(".heart-overlay");
          if (isLiked) {
            overlay.classList.add("show-heart");
            setTimeout(() => overlay.classList.remove("show-heart"), 800);
          }

          likesTextEl.querySelector("strong").textContent = newLikesCount;
        } catch (error) {
          console.error(error);
        }
      });
    });

    // Удаление постов
    document.querySelectorAll(".delete-button").forEach((button, index) => {
      button.addEventListener("click", async () => {
        const post = _index_js__WEBPACK_IMPORTED_MODULE_0__.posts[index];
        if (!confirm("Вы точно хотите удалить пост?")) return;

        try {
          await (0,_api_js__WEBPACK_IMPORTED_MODULE_4__.deletePost)({ postId: post.id, token: _index_js__WEBPACK_IMPORTED_MODULE_0__.user.token });
          _index_js__WEBPACK_IMPORTED_MODULE_0__.posts.splice(index, 1);
          button.closest("li.post").remove();
        } catch (error) {
          console.error("Ошибка при удалении поста:", error);
          alert("Не удалось удалить пост");
        }
      });
    });
  };

  renderPosts();
}


/***/ }),

/***/ "./components/upload-image-component.js":
/*!**********************************************!*\
  !*** ./components/upload-image-component.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderUploadImageComponent: () => (/* binding */ renderUploadImageComponent)
/* harmony export */ });
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api.js */ "./api.js");


/**
 * Компонент загрузки изображения.
 * Этот компонент позволяет пользователю загружать изображение и отображать его превью.
 * Если изображение уже загружено, пользователь может заменить его.
 *
 * @param {HTMLElement} params.element - HTML-элемент, в который будет рендериться компонент.
 * @param {Function} params.onImageUrlChange - Функция, вызываемая при изменении URL изображения.
 *                                            Принимает один аргумент - новый URL изображения или пустую строку.
 */
function renderUploadImageComponent({ element, onImageUrlChange }) {
  /**
   * URL текущего изображения.
   * Изначально пуст, пока пользователь не загрузит изображение.
   * @type {string}
   */
  let imageUrl = "";

  /**
   * Функция рендеринга компонента.
   * Отображает интерфейс компонента в зависимости от состояния: 
   * либо форма выбора файла, либо превью загруженного изображения с кнопкой замены.
   */
  const render = () => {
    element.innerHTML = `
      <div class="upload-image">
        ${
          imageUrl
            ? `
            <div class="file-upload-image-container">
              <img class="file-upload-image" src="${imageUrl}" alt="Загруженное изображение">
              <button class="file-upload-remove-button button">Заменить фото</button>
            </div>
            `
            : `
            <label class="file-upload-label secondary-button">
              <input
                type="file"
                class="file-upload-input"
                style="display:none"
              />
              Выберите фото
            </label>
          `
        }
      </div>
    `;

    // Обработчик выбора файла
    const fileInputElement = element.querySelector(".file-upload-input");
    fileInputElement?.addEventListener("change", () => {
      const file = fileInputElement.files[0];
      if (file) {
        const labelEl = document.querySelector(".file-upload-label");
        labelEl.setAttribute("disabled", true);
        labelEl.textContent = "Загружаю файл...";
        
        // Загружаем изображение с помощью API
        (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.uploadImage)({ file }).then(({ fileUrl }) => {
          imageUrl = fileUrl; // Сохраняем URL загруженного изображения
          onImageUrlChange(imageUrl); // Уведомляем о изменении URL изображения
          render(); // Перерисовываем компонент с новым состоянием
        });
      }
    });

    // Обработчик удаления изображения
    element
      .querySelector(".file-upload-remove-button")
      ?.addEventListener("click", () => {
        imageUrl = ""; // Сбрасываем URL изображения
        onImageUrlChange(imageUrl); // Уведомляем об изменении URL изображения
        render(); // Перерисовываем компонент
      });
  };

  // Инициализация компонента
  render();
}


/***/ }),

/***/ "./components/user-posts-page-component.js":
/*!*************************************************!*\
  !*** ./components/user-posts-page-component.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderUserPostsPageComponent: () => (/* binding */ renderUserPostsPageComponent)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index.js */ "./index.js");
/* harmony import */ var _header_component_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./header-component.js */ "./components/header-component.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/formatDistanceToNow.js");
/* harmony import */ var date_fns_locale__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! date-fns/locale */ "./node_modules/date-fns/locale/ru.js");
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../api.js */ "./api.js");
/* harmony import */ var _assets_images_like_active_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../assets/images/like-active.svg */ "./assets/images/like-active.svg");
/* harmony import */ var _assets_images_like_not_active_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../assets/images/like-not-active.svg */ "./assets/images/like-not-active.svg");









async function renderUserPostsPageComponent({ appEl, userId }) {
  appEl.innerHTML = "<p>Загрузка постов...</p>";

  try {
    const userPosts = await (0,_api_js__WEBPACK_IMPORTED_MODULE_4__.getUserPosts)({ userId });
    window.userPosts = userPosts; //для синхронизации

    const renderPosts = (postsArray) => {
      return postsArray
        .map(post => {
          const postDate = new Date(post.createdAt);

          // проверяем лайк во всех массивах
          const allPosts = [..._index_js__WEBPACK_IMPORTED_MODULE_0__.posts, ...(window.userPosts || [])];
          const postGlobal = allPosts.find(p => p.id === post.id);
          const isLiked = postGlobal?.likes.some(l => l.id === _index_js__WEBPACK_IMPORTED_MODULE_0__.user?._id);
          const likeImage = isLiked ? _assets_images_like_active_svg__WEBPACK_IMPORTED_MODULE_5__ : _assets_images_like_not_active_svg__WEBPACK_IMPORTED_MODULE_6__;

          return `
            <li class="post" data-post-id="${post.id}">
              <div class="post-header" data-user-id="${post.user.id}">
                <img src="${post.user.imageUrl}" class="post-header__user-image">
                <p class="post-header__user-name">${post.user.name}</p>
              </div>
              <div class="post-image-container">
                <img class="post-image" src="${post.imageUrl}">
                <div class="heart-overlay"></div>
              </div>
              <div class="post-likes">
                <button data-post-id="${post.id}" class="like-button">
                  <img src="${likeImage}">
                </button>
                <p class="post-likes-text">
                  Нравится: <strong>${post.likes.length}</strong>
                </p>
                ${
                  post.user.id === _index_js__WEBPACK_IMPORTED_MODULE_0__.user?._id
                    ? `<button class="delete-button" data-post-id="${post.id}">Удалить</button>`
                    : ""
                }
              </div>
              <p class="post-text">
                <span class="user-name">${post.user.name}</span>
                ${post.description}
              </p>
              <p class="post-date">
                ${(0,date_fns__WEBPACK_IMPORTED_MODULE_2__.formatDistanceToNow)(postDate, { addSuffix: true, locale: date_fns_locale__WEBPACK_IMPORTED_MODULE_3__.ru })}
              </p>
            </li>
          `;
        })
        .join("");
    };

    appEl.innerHTML = `
      <div class="page-container">
        <div class="header-container"></div>
        <button class="back-button">← Назад</button>
        <ul class="posts">${renderPosts(userPosts)}</ul>
      </div>
    `;

    document.querySelector(".back-button").addEventListener("click", () => (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.goToPage)(_index_js__WEBPACK_IMPORTED_MODULE_0__.POSTS_PAGE));

    (0,_header_component_js__WEBPACK_IMPORTED_MODULE_1__.renderHeaderComponent)({ element: document.querySelector(".header-container") });

    document.querySelectorAll(".post-header").forEach(userEl => {
      userEl.addEventListener("click", () => {
        const clickedUserId = userEl.dataset.userId;
        if (window.currentUserPostsId === clickedUserId) return;
        window.currentUserPostsId = clickedUserId;
        (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.goToPage)(USER_POSTS_PAGE, { userId: clickedUserId });
      });
    });

    // лайки с анимацией
    document.querySelectorAll(".like-button").forEach(button => {
      button.addEventListener("click", async () => {
        const postId = button.dataset.postId;
        const imgEl = button.querySelector("img");
        const likesTextEl = button.nextElementSibling;

        try {
          const newLikesCount = await (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.toggleLike)(postId);

          const allPosts = [..._index_js__WEBPACK_IMPORTED_MODULE_0__.posts, ...(window.userPosts || [])];
          const post = allPosts.find(p => p.id === postId);
          const isLiked = post.likes.some(l => l.id === _index_js__WEBPACK_IMPORTED_MODULE_0__.user._id);

          imgEl.src = isLiked ? _assets_images_like_active_svg__WEBPACK_IMPORTED_MODULE_5__ : _assets_images_like_not_active_svg__WEBPACK_IMPORTED_MODULE_6__;

          const overlay = button.closest(".post").querySelector(".heart-overlay");
          if (isLiked) {
            overlay.classList.add("show-heart");
            setTimeout(() => overlay.classList.remove("show-heart"), 800);
          }

          likesTextEl.querySelector("strong").textContent = newLikesCount;
        } catch (error) {
          console.error(error);
        }
      });
    });

    document.querySelectorAll(".delete-button").forEach((button, index) => {
      button.addEventListener("click", async () => {
        const post = userPosts[index];
        if (!confirm("Вы точно хотите удалить пост?")) return;

        try {
          await (0,_api_js__WEBPACK_IMPORTED_MODULE_4__.deletePost)({ postId: post.id, token: _index_js__WEBPACK_IMPORTED_MODULE_0__.user.token });
          userPosts.splice(index, 1);
          window.userPosts = userPosts;
          button.closest("li.post").remove();
        } catch (error) {
          console.error("Ошибка при удалении поста:", error);
          alert("Не удалось удалить пост");
        }
      });
    });

    window.currentUserPostsId = userId;

  } catch (error) {
    console.error("Ошибка при загрузке постов пользователя:", error);
    appEl.innerHTML = "<p>Не удалось загрузить посты пользователя</p>";
  }
}


/***/ }),

/***/ "./helpers.js":
/*!********************!*\
  !*** ./helpers.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getUserFromLocalStorage: () => (/* binding */ getUserFromLocalStorage),
/* harmony export */   removeUserFromLocalStorage: () => (/* binding */ removeUserFromLocalStorage),
/* harmony export */   saveUserToLocalStorage: () => (/* binding */ saveUserToLocalStorage)
/* harmony export */ });
function saveUserToLocalStorage(user) {
  window.localStorage.setItem("user", JSON.stringify(user));
}

function getUserFromLocalStorage(user) {
  try {
    return JSON.parse(window.localStorage.getItem("user"));
  } catch (error) {
    return null;
  }
}

function removeUserFromLocalStorage(user) {
  window.localStorage.removeItem("user");
}


/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ADD_POSTS_PAGE: () => (/* reexport safe */ _routes_js__WEBPACK_IMPORTED_MODULE_8__.ADD_POSTS_PAGE),
/* harmony export */   AUTH_PAGE: () => (/* reexport safe */ _routes_js__WEBPACK_IMPORTED_MODULE_8__.AUTH_PAGE),
/* harmony export */   LOADING_PAGE: () => (/* reexport safe */ _routes_js__WEBPACK_IMPORTED_MODULE_8__.LOADING_PAGE),
/* harmony export */   POSTS_PAGE: () => (/* reexport safe */ _routes_js__WEBPACK_IMPORTED_MODULE_8__.POSTS_PAGE),
/* harmony export */   USER_POSTS_PAGE: () => (/* reexport safe */ _routes_js__WEBPACK_IMPORTED_MODULE_8__.USER_POSTS_PAGE),
/* harmony export */   getToken: () => (/* binding */ getToken),
/* harmony export */   goToPage: () => (/* binding */ goToPage),
/* harmony export */   logout: () => (/* binding */ logout),
/* harmony export */   page: () => (/* binding */ page),
/* harmony export */   posts: () => (/* binding */ posts),
/* harmony export */   toggleLike: () => (/* binding */ toggleLike),
/* harmony export */   user: () => (/* binding */ user)
/* harmony export */ });
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ "./styles.css");
/* harmony import */ var _ui_kit_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui-kit.css */ "./ui-kit.css");
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./api.js */ "./api.js");
/* harmony import */ var _components_add_post_page_component_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/add-post-page-component.js */ "./components/add-post-page-component.js");
/* harmony import */ var _components_auth_page_component_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/auth-page-component.js */ "./components/auth-page-component.js");
/* harmony import */ var _components_posts_page_component_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/posts-page-component.js */ "./components/posts-page-component.js");
/* harmony import */ var _components_loading_page_component_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/loading-page-component.js */ "./components/loading-page-component.js");
/* harmony import */ var _components_user_posts_page_component_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/user-posts-page-component.js */ "./components/user-posts-page-component.js");
/* harmony import */ var _routes_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./routes.js */ "./routes.js");
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./helpers.js */ "./helpers.js");
















let user = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_9__.getUserFromLocalStorage)();
let page = null;
let posts = [];

// Получение токена
const getToken = () => (user ? user.token : undefined);

// Выход
const logout = () => {
  user = null;
  (0,_helpers_js__WEBPACK_IMPORTED_MODULE_9__.removeUserFromLocalStorage)();
  goToPage(_routes_js__WEBPACK_IMPORTED_MODULE_8__.POSTS_PAGE);
};

//Функция синхронизации лайков
async function toggleLike(postId) {
  if (!user) {
    alert("Войдите, чтобы ставить лайки");
    return;
  }

  // Ищем пост во всех массивах
  const arrays = [posts, window.userPosts || []];
  let post;
  for (const arr of arrays) {
    post = arr.find((p) => p.id === postId);
    if (post) break;
  }

  if (!post) {
    console.error("Пост не найден", postId);
    return;
  }

  const isLiked = post.likes.some((l) => l.id === user._id);

  try {
    if (isLiked) {
      await (0,_api_js__WEBPACK_IMPORTED_MODULE_2__.unlikePost)({ postId, token: user.token });
      post.likes = post.likes.filter(l => l.id !== user._id);
    } else {
      await (0,_api_js__WEBPACK_IMPORTED_MODULE_2__.likePost)({ postId, token: user.token });
      post.likes.push({ id: user._id, name: user.name });
    }

    //Синхронизируем лайки во всех массивах
    arrays.forEach(arr => {
      const p = arr.find(p => p.id === postId);
      if (p) p.likes = post.likes;
    });

  } catch (error) {
    console.error("Ошибка лайка", error);
    alert("Не удалось поставить/убрать лайк");
    return;
  }

  return post.likes.length;
}


//Переход на страницы
const goToPage = (newPage, data) => {
  if (
    [_routes_js__WEBPACK_IMPORTED_MODULE_8__.POSTS_PAGE, _routes_js__WEBPACK_IMPORTED_MODULE_8__.AUTH_PAGE, _routes_js__WEBPACK_IMPORTED_MODULE_8__.ADD_POSTS_PAGE, _routes_js__WEBPACK_IMPORTED_MODULE_8__.USER_POSTS_PAGE, _routes_js__WEBPACK_IMPORTED_MODULE_8__.LOADING_PAGE].includes(newPage)
  ) {
    if (newPage === _routes_js__WEBPACK_IMPORTED_MODULE_8__.ADD_POSTS_PAGE) {
      page = user ? _routes_js__WEBPACK_IMPORTED_MODULE_8__.ADD_POSTS_PAGE : _routes_js__WEBPACK_IMPORTED_MODULE_8__.AUTH_PAGE;
      return renderApp();
    }

    if (newPage === _routes_js__WEBPACK_IMPORTED_MODULE_8__.POSTS_PAGE) {
      page = _routes_js__WEBPACK_IMPORTED_MODULE_8__.LOADING_PAGE;
      renderApp();

      return (0,_api_js__WEBPACK_IMPORTED_MODULE_2__.getPosts)({ token: getToken() })
        .then((newPosts) => {
          page = _routes_js__WEBPACK_IMPORTED_MODULE_8__.POSTS_PAGE;
          posts = newPosts;
          renderApp();
        })
        .catch((error) => {
          console.error(error);
          goToPage(_routes_js__WEBPACK_IMPORTED_MODULE_8__.POSTS_PAGE);
        });
    }

    if (newPage === _routes_js__WEBPACK_IMPORTED_MODULE_8__.USER_POSTS_PAGE) {
      console.log("Открываю страницу пользователя: ", data.userId);
      page = _routes_js__WEBPACK_IMPORTED_MODULE_8__.USER_POSTS_PAGE;
      const appEl = document.getElementById("app");
      return (0,_components_user_posts_page_component_js__WEBPACK_IMPORTED_MODULE_7__.renderUserPostsPageComponent)({ appEl, userId: data.userId });
    }

    page = newPage;
    renderApp();
    return;
  }

  throw new Error("страницы не существует");
};

// Рендер приложения
const renderApp = () => {
  const appEl = document.getElementById("app");

  switch (page) {
    case _routes_js__WEBPACK_IMPORTED_MODULE_8__.LOADING_PAGE:
      (0,_components_loading_page_component_js__WEBPACK_IMPORTED_MODULE_6__.renderLoadingPageComponent)({ appEl, user, goToPage });
      break;

    case _routes_js__WEBPACK_IMPORTED_MODULE_8__.AUTH_PAGE:
      (0,_components_auth_page_component_js__WEBPACK_IMPORTED_MODULE_4__.renderAuthPageComponent)({
        appEl,
        setUser: (newUser) => {
          user = newUser;
          (0,_helpers_js__WEBPACK_IMPORTED_MODULE_9__.saveUserToLocalStorage)(user);
          goToPage(_routes_js__WEBPACK_IMPORTED_MODULE_8__.POSTS_PAGE);
        },
        user,
        goToPage,
      });
      break;

    case _routes_js__WEBPACK_IMPORTED_MODULE_8__.ADD_POSTS_PAGE:
      (0,_components_add_post_page_component_js__WEBPACK_IMPORTED_MODULE_3__.renderAddPostPageComponent)({
        appEl,
        onAddPostClick: async ({ description, imageUrl }) => {
          try {
            const post = await (0,_api_js__WEBPACK_IMPORTED_MODULE_2__.addPost)({
              description,
              imageUrl,
              token: getToken(),
            });
            console.log("Пост добавлен:", post);
            goToPage(_routes_js__WEBPACK_IMPORTED_MODULE_8__.POSTS_PAGE);
          } catch (error) {
            console.error("Ошибка при добавлении поста", error);
            alert("Ошибка при добавлении поста");
          }
        },
      });
      break;

    case _routes_js__WEBPACK_IMPORTED_MODULE_8__.POSTS_PAGE:
      (0,_components_posts_page_component_js__WEBPACK_IMPORTED_MODULE_5__.renderPostsPageComponent)({ appEl });
      break;

    case _routes_js__WEBPACK_IMPORTED_MODULE_8__.USER_POSTS_PAGE:
      appEl.innerHTML = "Здесь будет страница фотографий пользователя";
      break;
  }
};

//Запуск приложения
goToPage(_routes_js__WEBPACK_IMPORTED_MODULE_8__.POSTS_PAGE);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./styles.css":
/*!**********************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./styles.css ***!
  \**********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! data:image/svg+xml,%3Csvg id=%27Layer_1%27 data-name=%27Layer 1%27 xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 122.88 122.88%27%3E%3Ctitle%3Eadd%3C/title%3E%3Cpath d=%27M61.44,0A61.46,61.46,0,1,1,18,18,61.25,61.25,0,0,1,61.44,0ZM88.6,56.82v9.24a4,4,0,0,1-4,4H70V84.62a4,4,0,0,1-4,4H56.82a4,4,0,0,1-4-4V70H38.26a4,4,0,0,1-4-4V56.82a4,4,0,0,1,4-4H52.84V38.26a4,4,0,0,1,4-4h9.24a4,4,0,0,1,4,4V52.84H84.62a4,4,0,0,1,4,4Zm8.83-31.37a50.92,50.92,0,1,0,14.9,36,50.78,50.78,0,0,0-14.9-36Z%27/%3E%3C/svg%3E */ "data:image/svg+xml,%3Csvg id=%27Layer_1%27 data-name=%27Layer 1%27 xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 122.88 122.88%27%3E%3Ctitle%3Eadd%3C/title%3E%3Cpath d=%27M61.44,0A61.46,61.46,0,1,1,18,18,61.25,61.25,0,0,1,61.44,0ZM88.6,56.82v9.24a4,4,0,0,1-4,4H70V84.62a4,4,0,0,1-4,4H56.82a4,4,0,0,1-4-4V70H38.26a4,4,0,0,1-4-4V56.82a4,4,0,0,1,4-4H52.84V38.26a4,4,0,0,1,4-4h9.24a4,4,0,0,1,4,4V52.84H84.62a4,4,0,0,1,4,4Zm8.83-31.37a50.92,50.92,0,1,0,14.9,36,50.78,50.78,0,0,0-14.9-36Z%27/%3E%3C/svg%3E"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.page-container {
  padding: 0 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  padding: 20px 16px;
  margin-left: -20px;
  margin-right: -20px;
}

.logo {
  margin: 0;
  font-size: 28px;
  cursor: pointer;
  width: 130px;
}

.header-container {
  margin-bottom: 8px;
}

.header-button {
  padding: 0;
  border: none;
  background-color: transparent;
  font-size: 14px;
  line-height: 18px;
  font-weight: 500;
  cursor: pointer;
}

.logout-button {
  width: 130px;
  text-align: right;
}

.posts {
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  margin: 0;
}

.post-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
}

.post-header__user-image {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 40px;
  margin-right: 10px;
}

.post-image-container {
  margin-left: -20px;
  margin-right: -20px;
  height: 500px;
  display: flex;
  justify-content: center;
  background-color: #e0e0e0;
}

.post-image {
  width: 100%;
  height: 100%;
  max-width: 500px;
  object-fit: cover;
}

.post-likes {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.like-button {
  border: none;
  background-color: transparent;
  padding: 8px;
  padding-left: 0px;
  padding-bottom: 5px;
  cursor: pointer;
}

.user-name {
  font-weight: 500;
}

.post-text {
  font-size: 14px;
  line-height: 18px;
  margin-top: 5px;
}

.post-date {
  color: #8a8a8a;
}

.post + .post {
  margin-top: 20px;
}

.posts-user-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
}

.posts-user-header__user-image {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 40px;
  margin-right: 10px;
}

.posts-user-header__user-name {
  font-size: 28px;
  line-height: 35px;
}

.loading-page {
  display: flex;
  justify-content: center;
  margin-top: 100px;
}

.add-post-sign {
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_0___});
  height: 30px;
  width: 30px;
}

.form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.form-title {
  font-size: 28px;
  line-height: 35px;
  text-align: center;
}

.form-inputs {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-error {
  color: red;
}

.form-footer {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-footer-title {
  text-align: center;
}

.file-upload-image-conrainer {
  display: flex;
  align-items: center;
}

.file-upload-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 10px;
  border: 1px solid gray;
  border-radius: 5px;
}

.file-upload-label {
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  text-align: center;
}
`, "",{"version":3,"sources":["webpack://./styles.css"],"names":[],"mappings":"AAAA;EACE,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,gCAAgC;EAChC,kBAAkB;EAClB,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;EACE,SAAS;EACT,eAAe;EACf,eAAe;EACf,YAAY;AACd;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,UAAU;EACV,YAAY;EACZ,6BAA6B;EAC7B,eAAe;EACf,iBAAiB;EACjB,gBAAgB;EAChB,eAAe;AACjB;;AAEA;EACE,YAAY;EACZ,iBAAiB;AACnB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,gBAAgB;EAChB,UAAU;EACV,SAAS;AACX;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,mBAAmB;EACnB,mBAAmB;EACnB,eAAe;AACjB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,kBAAkB;AACpB;;AAEA;EACE,kBAAkB;EAClB,mBAAmB;EACnB,aAAa;EACb,aAAa;EACb,uBAAuB;EACvB,yBAAyB;AAC3B;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,gBAAgB;EAChB,iBAAiB;AACnB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,mBAAmB;AACrB;;AAEA;EACE,YAAY;EACZ,6BAA6B;EAC7B,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,eAAe;AACjB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,eAAe;EACf,iBAAiB;EACjB,eAAe;AACjB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,mBAAmB;EACnB,mBAAmB;AACrB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,kBAAkB;AACpB;;AAEA;EACE,eAAe;EACf,iBAAiB;AACnB;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,iBAAiB;AACnB;;AAEA;EACE,yDAAggB;EAChgB,YAAY;EACZ,WAAW;AACb;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,WAAW;AACb;;AAEA;EACE,eAAe;EACf,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,SAAS;AACX;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,gBAAgB;EAChB,aAAa;EACb,sBAAsB;EACtB,SAAS;AACX;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,iBAAiB;EACjB,kBAAkB;EAClB,sBAAsB;EACtB,kBAAkB;AACpB;;AAEA;EACE,qBAAqB;EACrB,sBAAsB;EACtB,WAAW;EACX,kBAAkB;AACpB","sourcesContent":[".page-container {\n  padding: 0 20px;\n}\n\n.page-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  border-bottom: 1px solid #e0e0e0;\n  padding: 20px 16px;\n  margin-left: -20px;\n  margin-right: -20px;\n}\n\n.logo {\n  margin: 0;\n  font-size: 28px;\n  cursor: pointer;\n  width: 130px;\n}\n\n.header-container {\n  margin-bottom: 8px;\n}\n\n.header-button {\n  padding: 0;\n  border: none;\n  background-color: transparent;\n  font-size: 14px;\n  line-height: 18px;\n  font-weight: 500;\n  cursor: pointer;\n}\n\n.logout-button {\n  width: 130px;\n  text-align: right;\n}\n\n.posts {\n  display: flex;\n  flex-direction: column;\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n\n.post-header {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  margin-bottom: 10px;\n  cursor: pointer;\n}\n\n.post-header__user-image {\n  width: 40px;\n  height: 40px;\n  object-fit: cover;\n  border-radius: 40px;\n  margin-right: 10px;\n}\n\n.post-image-container {\n  margin-left: -20px;\n  margin-right: -20px;\n  height: 500px;\n  display: flex;\n  justify-content: center;\n  background-color: #e0e0e0;\n}\n\n.post-image {\n  width: 100%;\n  height: 100%;\n  max-width: 500px;\n  object-fit: cover;\n}\n\n.post-likes {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n}\n\n.like-button {\n  border: none;\n  background-color: transparent;\n  padding: 8px;\n  padding-left: 0px;\n  padding-bottom: 5px;\n  cursor: pointer;\n}\n\n.user-name {\n  font-weight: 500;\n}\n\n.post-text {\n  font-size: 14px;\n  line-height: 18px;\n  margin-top: 5px;\n}\n\n.post-date {\n  color: #8a8a8a;\n}\n\n.post + .post {\n  margin-top: 20px;\n}\n\n.posts-user-header {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  margin-bottom: 12px;\n}\n\n.posts-user-header__user-image {\n  width: 70px;\n  height: 70px;\n  object-fit: cover;\n  border-radius: 40px;\n  margin-right: 10px;\n}\n\n.posts-user-header__user-name {\n  font-size: 28px;\n  line-height: 35px;\n}\n\n.loading-page {\n  display: flex;\n  justify-content: center;\n  margin-top: 100px;\n}\n\n.add-post-sign {\n  background-image: url(\"data:image/svg+xml,%3Csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 122.88 122.88'%3E%3Ctitle%3Eadd%3C/title%3E%3Cpath d='M61.44,0A61.46,61.46,0,1,1,18,18,61.25,61.25,0,0,1,61.44,0ZM88.6,56.82v9.24a4,4,0,0,1-4,4H70V84.62a4,4,0,0,1-4,4H56.82a4,4,0,0,1-4-4V70H38.26a4,4,0,0,1-4-4V56.82a4,4,0,0,1,4-4H52.84V38.26a4,4,0,0,1,4-4h9.24a4,4,0,0,1,4,4V52.84H84.62a4,4,0,0,1,4,4Zm8.83-31.37a50.92,50.92,0,1,0,14.9,36,50.78,50.78,0,0,0-14.9-36Z'/%3E%3C/svg%3E\");\n  height: 30px;\n  width: 30px;\n}\n\n.form {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n}\n\n.form-title {\n  font-size: 28px;\n  line-height: 35px;\n  text-align: center;\n}\n\n.form-inputs {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n\n.form-error {\n  color: red;\n}\n\n.form-footer {\n  margin-top: 50px;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n\n.form-footer-title {\n  text-align: center;\n}\n\n.file-upload-image-conrainer {\n  display: flex;\n  align-items: center;\n}\n\n.file-upload-image {\n  width: 100px;\n  height: 100px;\n  object-fit: cover;\n  margin-right: 10px;\n  border: 1px solid gray;\n  border-radius: 5px;\n}\n\n.file-upload-label {\n  display: inline-block;\n  box-sizing: border-box;\n  width: 100%;\n  text-align: center;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./ui-kit.css":
/*!**********************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./ui-kit.css ***!
  \**********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/fonts/stratosskyengweb-regular.woff2 */ "./assets/fonts/stratosskyengweb-regular.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/fonts/stratosskyengweb-medium.woff2 */ "./assets/fonts/stratosskyengweb-medium.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/images/like-active.svg */ "./assets/images/like-active.svg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* 
  Это стили Дизайн системы, сквозные стили для элементов интерфейса
  всего приложения: шрифты, кнопки, инпуты и так далее
*/

@font-face {
  font-family: "StratosSkyeng";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(${___CSS_LOADER_URL_REPLACEMENT_0___}) format("woff2");
}

@font-face {
  font-family: "StratosSkyeng";
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(${___CSS_LOADER_URL_REPLACEMENT_1___}) format("woff2");
}

html {
  /* скрывает скролбары в firefox */
  scrollbar-width: none;
}

body {
  margin: 0;
  padding: 0;
  font-family: StratosSkyeng;
  overflow: auto;
  font-size: 14px;
  line-height: 18px;
}

/* скрывает скролбары в chrome */
body::-webkit-scrollbar {
  display: none;
}

p {
  margin: 0;
}

.button,
.secondary-button {
  display: block;
  padding: 10px 13px 13px;
  font-size: 18px;
  line-height: 22px;
  border-radius: 5px;
  background-color: #565eef;
  color: #ffffff;
  border: none;
}

.link-button {
  display: inline;
  border: 0;
  padding: 0;
  background: none;
  color: #565eef;
  cursor: pointer;
}

.button:hover {
  background-color: #6d73ff;
}

.button[disabled="true"],
.secondary-button[disabled="true"] {
  background-color: #f4f5f6;
  color: rgba(153, 153, 153, 0.6);
  pointer-events: none;
}

.button:active {
  background-color: #4f56ce;
}

.secondary-button {
  background-color: #edecff;
  color: #565eef;
}

.secondary-button:hover {
  background-color: #f2eeff;
}

.secondary-button:active {
  background-color: #d8d7ff;
}

.input {
  height: 36px;
  box-sizing: border-box;
  padding: 15px;
  font-size: 14px;
  line-height: 18px;
  color: rgb(4, 18, 27);
  border: none;
  border-radius: 5px;
  background-color: #e8e8e8;
}

.input .-error {
  background-color: #fff;
}

.input:focus {
  background-color: #fff;
}

.textarea {
  padding: 15px;
  resize: none;
  width: 100%;
  height: 100px;
}

strong {
  font-weight: 500;
}

/** Анимация загрузки **/
.loader {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.loader div {
  display: inline-block;
  position: absolute;
  left: 8px;
  width: 16px;
  background: #000;
  animation: loader 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.loader div:nth-child(1) {
  left: 8px;
  animation-delay: -0.24s;
}
.loader div:nth-child(2) {
  left: 32px;
  animation-delay: -0.12s;
}
.loader div:nth-child(3) {
  left: 56px;
  animation-delay: 0;
}
@keyframes loader {
  0% {
    top: 8px;
    height: 64px;
  }
  50%,
  100% {
    top: 24px;
    height: 32px;
  }
}

.input--large {
  height: 150px;               
  padding: 12px 15px;          
  margin-bottom: 15px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ccc;     
  border-radius: 8px;          
  font-size: 16px;             
  line-height: 1.5;
  resize: vertical;             
  transition: border-color 0.2s, box-shadow 0.2s;
}

.input--large:focus {
  outline: none;
  border-color: #409eff;       
  box-shadow: 0 0 5px rgba(64, 158, 255, 0.5);
  background-color: #fff;
}


.input--file {
  display: block;
  width: 100%;
  padding: 12px 15px;
  font-size: 14px;
  line-height: 18px;
  color: #04121b;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f5f5f5;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;
}

.input--file:hover {
  background-color: #e0e0e0;
}

.button--large {
  margin-top: 15px;
  padding: 14px 24px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #409eff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.button--large:hover {
  background-color: #66b1ff;
}

.button--large:disabled {
  background-color: #a0cfff;
  cursor: not-allowed;
}

.back-button {
  display: inline-block;
  margin-bottom: 15px;
  padding: 8px 16px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.back-button:hover {
  background-color: #e0e0e0;
}

.delete-button {
  margin-left: auto;
  padding: 4px 8px;
  background-color: #b7b6b6;
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.delete-button:hover {
  background-color: #ff7875;
}

.like-pulse {
  transform: scale(1.3);
  transition: transform 0.3s ease;
}

.heart-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_2___});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transform: translate(-50%, -50%) scale(0);
  opacity: 0;
  pointer-events: none;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.heart-overlay.show-heart {
  transform: translate(-50%, -50%) scale(1.2);
  opacity: 1;
}
@keyframes heart-pop {
  0% {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 0.8;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0;
  }
}
`, "",{"version":3,"sources":["webpack://./ui-kit.css"],"names":[],"mappings":"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","sourcesContent":["/* \n  Это стили Дизайн системы, сквозные стили для элементов интерфейса\n  всего приложения: шрифты, кнопки, инпуты и так далее\n*/\n\n@font-face {\n  font-family: \"StratosSkyeng\";\n  font-style: normal;\n  font-weight: 400;\n  font-display: swap;\n  src: url(\"./assets/fonts/stratosskyengweb-regular.woff2\") format(\"woff2\");\n}\n\n@font-face {\n  font-family: \"StratosSkyeng\";\n  font-style: normal;\n  font-weight: 500;\n  font-display: swap;\n  src: url(\"./assets/fonts/stratosskyengweb-medium.woff2\") format(\"woff2\");\n}\n\nhtml {\n  /* скрывает скролбары в firefox */\n  scrollbar-width: none;\n}\n\nbody {\n  margin: 0;\n  padding: 0;\n  font-family: StratosSkyeng;\n  overflow: auto;\n  font-size: 14px;\n  line-height: 18px;\n}\n\n/* скрывает скролбары в chrome */\nbody::-webkit-scrollbar {\n  display: none;\n}\n\np {\n  margin: 0;\n}\n\n.button,\n.secondary-button {\n  display: block;\n  padding: 10px 13px 13px;\n  font-size: 18px;\n  line-height: 22px;\n  border-radius: 5px;\n  background-color: #565eef;\n  color: #ffffff;\n  border: none;\n}\n\n.link-button {\n  display: inline;\n  border: 0;\n  padding: 0;\n  background: none;\n  color: #565eef;\n  cursor: pointer;\n}\n\n.button:hover {\n  background-color: #6d73ff;\n}\n\n.button[disabled=\"true\"],\n.secondary-button[disabled=\"true\"] {\n  background-color: #f4f5f6;\n  color: rgba(153, 153, 153, 0.6);\n  pointer-events: none;\n}\n\n.button:active {\n  background-color: #4f56ce;\n}\n\n.secondary-button {\n  background-color: #edecff;\n  color: #565eef;\n}\n\n.secondary-button:hover {\n  background-color: #f2eeff;\n}\n\n.secondary-button:active {\n  background-color: #d8d7ff;\n}\n\n.input {\n  height: 36px;\n  box-sizing: border-box;\n  padding: 15px;\n  font-size: 14px;\n  line-height: 18px;\n  color: rgb(4, 18, 27);\n  border: none;\n  border-radius: 5px;\n  background-color: #e8e8e8;\n}\n\n.input .-error {\n  background-color: #fff;\n}\n\n.input:focus {\n  background-color: #fff;\n}\n\n.textarea {\n  padding: 15px;\n  resize: none;\n  width: 100%;\n  height: 100px;\n}\n\nstrong {\n  font-weight: 500;\n}\n\n/** Анимация загрузки **/\n.loader {\n  display: inline-block;\n  position: relative;\n  width: 80px;\n  height: 80px;\n}\n.loader div {\n  display: inline-block;\n  position: absolute;\n  left: 8px;\n  width: 16px;\n  background: #000;\n  animation: loader 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;\n}\n.loader div:nth-child(1) {\n  left: 8px;\n  animation-delay: -0.24s;\n}\n.loader div:nth-child(2) {\n  left: 32px;\n  animation-delay: -0.12s;\n}\n.loader div:nth-child(3) {\n  left: 56px;\n  animation-delay: 0;\n}\n@keyframes loader {\n  0% {\n    top: 8px;\n    height: 64px;\n  }\n  50%,\n  100% {\n    top: 24px;\n    height: 32px;\n  }\n}\n\n.input--large {\n  height: 150px;               \n  padding: 12px 15px;          \n  margin-bottom: 15px;\n  width: 100%;\n  box-sizing: border-box;\n  border: 1px solid #ccc;     \n  border-radius: 8px;          \n  font-size: 16px;             \n  line-height: 1.5;\n  resize: vertical;             \n  transition: border-color 0.2s, box-shadow 0.2s;\n}\n\n.input--large:focus {\n  outline: none;\n  border-color: #409eff;       \n  box-shadow: 0 0 5px rgba(64, 158, 255, 0.5);\n  background-color: #fff;\n}\n\n\n.input--file {\n  display: block;\n  width: 100%;\n  padding: 12px 15px;\n  font-size: 14px;\n  line-height: 18px;\n  color: #04121b;\n  border: 1px solid #ccc;\n  border-radius: 8px;\n  background-color: #f5f5f5;\n  cursor: pointer;\n  transition: background-color 0.2s, border-color 0.2s;\n}\n\n.input--file:hover {\n  background-color: #e0e0e0;\n}\n\n.button--large {\n  margin-top: 15px;\n  padding: 14px 24px;\n  font-size: 16px;\n  font-weight: bold;\n  color: #fff;\n  background-color: #409eff;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n\n.button--large:hover {\n  background-color: #66b1ff;\n}\n\n.button--large:disabled {\n  background-color: #a0cfff;\n  cursor: not-allowed;\n}\n\n.back-button {\n  display: inline-block;\n  margin-bottom: 15px;\n  padding: 8px 16px;\n  background-color: #f0f0f0;\n  border: 1px solid #ccc;\n  border-radius: 6px;\n  font-size: 14px;\n  cursor: pointer;\n  transition: background-color 0.2s, color 0.2s;\n}\n\n.back-button:hover {\n  background-color: #e0e0e0;\n}\n\n.delete-button {\n  margin-left: auto;\n  padding: 4px 8px;\n  background-color: #b7b6b6;\n  color: black;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 12px;\n}\n\n.delete-button:hover {\n  background-color: #ff7875;\n}\n\n.like-pulse {\n  transform: scale(1.3);\n  transition: transform 0.3s ease;\n}\n\n.heart-overlay {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 100px;\n  height: 100px;\n  background-image: url('./assets/images/like-active.svg');\n  background-size: contain;\n  background-repeat: no-repeat;\n  background-position: center;\n  transform: translate(-50%, -50%) scale(0);\n  opacity: 0;\n  pointer-events: none;\n  transition: transform 0.3s ease, opacity 0.3s ease;\n}\n\n.heart-overlay.show-heart {\n  transform: translate(-50%, -50%) scale(1.2);\n  opacity: 1;\n}\n@keyframes heart-pop {\n  0% {\n    transform: translate(-50%, -50%) scale(0.8);\n    opacity: 0.8;\n  }\n  50% {\n    transform: translate(-50%, -50%) scale(1.5);\n    opacity: 1;\n  }\n  100% {\n    transform: translate(-50%, -50%) scale(1);\n    opacity: 0;\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/date-fns/_lib/defaultOptions.js":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/_lib/defaultOptions.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDefaultOptions: () => (/* binding */ getDefaultOptions),
/* harmony export */   setDefaultOptions: () => (/* binding */ setDefaultOptions)
/* harmony export */ });
let defaultOptions = {};

function getDefaultOptions() {
  return defaultOptions;
}

function setDefaultOptions(newOptions) {
  defaultOptions = newOptions;
}


/***/ }),

/***/ "./node_modules/date-fns/_lib/getRoundingMethod.js":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/_lib/getRoundingMethod.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getRoundingMethod: () => (/* binding */ getRoundingMethod)
/* harmony export */ });
function getRoundingMethod(method) {
  return (number) => {
    const round = method ? Math[method] : Math.trunc;
    const result = round(number);
    // Prevent negative zero
    return result === 0 ? 0 : result;
  };
}


/***/ }),

/***/ "./node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.js":
/*!***********************************************************************!*\
  !*** ./node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getTimezoneOffsetInMilliseconds: () => (/* binding */ getTimezoneOffsetInMilliseconds)
/* harmony export */ });
/* harmony import */ var _toDate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../toDate.js */ "./node_modules/date-fns/toDate.js");


/**
 * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
 * They usually appear for dates that denote time before the timezones were introduced
 * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
 * and GMT+01:00:00 after that date)
 *
 * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
 * which would lead to incorrect calculations.
 *
 * This function returns the timezone offset in milliseconds that takes seconds in account.
 */
function getTimezoneOffsetInMilliseconds(date) {
  const _date = (0,_toDate_js__WEBPACK_IMPORTED_MODULE_0__.toDate)(date);
  const utcDate = new Date(
    Date.UTC(
      _date.getFullYear(),
      _date.getMonth(),
      _date.getDate(),
      _date.getHours(),
      _date.getMinutes(),
      _date.getSeconds(),
      _date.getMilliseconds(),
    ),
  );
  utcDate.setUTCFullYear(_date.getFullYear());
  return +date - +utcDate;
}


/***/ }),

/***/ "./node_modules/date-fns/_lib/normalizeDates.js":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/_lib/normalizeDates.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   normalizeDates: () => (/* binding */ normalizeDates)
/* harmony export */ });
/* harmony import */ var _constructFrom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constructFrom.js */ "./node_modules/date-fns/constructFrom.js");


function normalizeDates(context, ...dates) {
  const normalize = _constructFrom_js__WEBPACK_IMPORTED_MODULE_0__.constructFrom.bind(
    null,
    context || dates.find((date) => typeof date === "object"),
  );
  return dates.map(normalize);
}


/***/ }),

/***/ "./node_modules/date-fns/compareAsc.js":
/*!*********************************************!*\
  !*** ./node_modules/date-fns/compareAsc.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   compareAsc: () => (/* binding */ compareAsc),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _toDate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");


/**
 * @name compareAsc
 * @category Common Helpers
 * @summary Compare the two dates and return -1, 0 or 1.
 *
 * @description
 * Compare the two dates and return 1 if the first date is after the second,
 * -1 if the first date is before the second or 0 if dates are equal.
 *
 * @param dateLeft - The first date to compare
 * @param dateRight - The second date to compare
 *
 * @returns The result of the comparison
 *
 * @example
 * // Compare 11 February 1987 and 10 July 1989:
 * const result = compareAsc(new Date(1987, 1, 11), new Date(1989, 6, 10))
 * //=> -1
 *
 * @example
 * // Sort the array of dates:
 * const result = [
 *   new Date(1995, 6, 2),
 *   new Date(1987, 1, 11),
 *   new Date(1989, 6, 10)
 * ].sort(compareAsc)
 * //=> [
 * //   Wed Feb 11 1987 00:00:00,
 * //   Mon Jul 10 1989 00:00:00,
 * //   Sun Jul 02 1995 00:00:00
 * // ]
 */
function compareAsc(dateLeft, dateRight) {
  const diff = +(0,_toDate_js__WEBPACK_IMPORTED_MODULE_0__.toDate)(dateLeft) - +(0,_toDate_js__WEBPACK_IMPORTED_MODULE_0__.toDate)(dateRight);

  if (diff < 0) return -1;
  else if (diff > 0) return 1;

  // Return 0 if diff is 0; return NaN if diff is NaN
  return diff;
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (compareAsc);


/***/ }),

/***/ "./node_modules/date-fns/constants.js":
/*!********************************************!*\
  !*** ./node_modules/date-fns/constants.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   constructFromSymbol: () => (/* binding */ constructFromSymbol),
/* harmony export */   daysInWeek: () => (/* binding */ daysInWeek),
/* harmony export */   daysInYear: () => (/* binding */ daysInYear),
/* harmony export */   maxTime: () => (/* binding */ maxTime),
/* harmony export */   millisecondsInDay: () => (/* binding */ millisecondsInDay),
/* harmony export */   millisecondsInHour: () => (/* binding */ millisecondsInHour),
/* harmony export */   millisecondsInMinute: () => (/* binding */ millisecondsInMinute),
/* harmony export */   millisecondsInSecond: () => (/* binding */ millisecondsInSecond),
/* harmony export */   millisecondsInWeek: () => (/* binding */ millisecondsInWeek),
/* harmony export */   minTime: () => (/* binding */ minTime),
/* harmony export */   minutesInDay: () => (/* binding */ minutesInDay),
/* harmony export */   minutesInHour: () => (/* binding */ minutesInHour),
/* harmony export */   minutesInMonth: () => (/* binding */ minutesInMonth),
/* harmony export */   minutesInYear: () => (/* binding */ minutesInYear),
/* harmony export */   monthsInQuarter: () => (/* binding */ monthsInQuarter),
/* harmony export */   monthsInYear: () => (/* binding */ monthsInYear),
/* harmony export */   quartersInYear: () => (/* binding */ quartersInYear),
/* harmony export */   secondsInDay: () => (/* binding */ secondsInDay),
/* harmony export */   secondsInHour: () => (/* binding */ secondsInHour),
/* harmony export */   secondsInMinute: () => (/* binding */ secondsInMinute),
/* harmony export */   secondsInMonth: () => (/* binding */ secondsInMonth),
/* harmony export */   secondsInQuarter: () => (/* binding */ secondsInQuarter),
/* harmony export */   secondsInWeek: () => (/* binding */ secondsInWeek),
/* harmony export */   secondsInYear: () => (/* binding */ secondsInYear)
/* harmony export */ });
/**
 * @module constants
 * @summary Useful constants
 * @description
 * Collection of useful date constants.
 *
 * The constants could be imported from `date-fns/constants`:
 *
 * ```ts
 * import { maxTime, minTime } from "./constants/date-fns/constants";
 *
 * function isAllowedTime(time) {
 *   return time <= maxTime && time >= minTime;
 * }
 * ```
 */

/**
 * @constant
 * @name daysInWeek
 * @summary Days in 1 week.
 */
const daysInWeek = 7;

/**
 * @constant
 * @name daysInYear
 * @summary Days in 1 year.
 *
 * @description
 * How many days in a year.
 *
 * One years equals 365.2425 days according to the formula:
 *
 * > Leap year occurs every 4 years, except for years that are divisible by 100 and not divisible by 400.
 * > 1 mean year = (365+1/4-1/100+1/400) days = 365.2425 days
 */
const daysInYear = 365.2425;

/**
 * @constant
 * @name maxTime
 * @summary Maximum allowed time.
 *
 * @example
 * import { maxTime } from "./constants/date-fns/constants";
 *
 * const isValid = 8640000000000001 <= maxTime;
 * //=> false
 *
 * new Date(8640000000000001);
 * //=> Invalid Date
 */
const maxTime = Math.pow(10, 8) * 24 * 60 * 60 * 1000;

/**
 * @constant
 * @name minTime
 * @summary Minimum allowed time.
 *
 * @example
 * import { minTime } from "./constants/date-fns/constants";
 *
 * const isValid = -8640000000000001 >= minTime;
 * //=> false
 *
 * new Date(-8640000000000001)
 * //=> Invalid Date
 */
const minTime = -maxTime;

/**
 * @constant
 * @name millisecondsInWeek
 * @summary Milliseconds in 1 week.
 */
const millisecondsInWeek = 604800000;

/**
 * @constant
 * @name millisecondsInDay
 * @summary Milliseconds in 1 day.
 */
const millisecondsInDay = 86400000;

/**
 * @constant
 * @name millisecondsInMinute
 * @summary Milliseconds in 1 minute
 */
const millisecondsInMinute = 60000;

/**
 * @constant
 * @name millisecondsInHour
 * @summary Milliseconds in 1 hour
 */
const millisecondsInHour = 3600000;

/**
 * @constant
 * @name millisecondsInSecond
 * @summary Milliseconds in 1 second
 */
const millisecondsInSecond = 1000;

/**
 * @constant
 * @name minutesInYear
 * @summary Minutes in 1 year.
 */
const minutesInYear = 525600;

/**
 * @constant
 * @name minutesInMonth
 * @summary Minutes in 1 month.
 */
const minutesInMonth = 43200;

/**
 * @constant
 * @name minutesInDay
 * @summary Minutes in 1 day.
 */
const minutesInDay = 1440;

/**
 * @constant
 * @name minutesInHour
 * @summary Minutes in 1 hour.
 */
const minutesInHour = 60;

/**
 * @constant
 * @name monthsInQuarter
 * @summary Months in 1 quarter.
 */
const monthsInQuarter = 3;

/**
 * @constant
 * @name monthsInYear
 * @summary Months in 1 year.
 */
const monthsInYear = 12;

/**
 * @constant
 * @name quartersInYear
 * @summary Quarters in 1 year
 */
const quartersInYear = 4;

/**
 * @constant
 * @name secondsInHour
 * @summary Seconds in 1 hour.
 */
const secondsInHour = 3600;

/**
 * @constant
 * @name secondsInMinute
 * @summary Seconds in 1 minute.
 */
const secondsInMinute = 60;

/**
 * @constant
 * @name secondsInDay
 * @summary Seconds in 1 day.
 */
const secondsInDay = secondsInHour * 24;

/**
 * @constant
 * @name secondsInWeek
 * @summary Seconds in 1 week.
 */
const secondsInWeek = secondsInDay * 7;

/**
 * @constant
 * @name secondsInYear
 * @summary Seconds in 1 year.
 */
const secondsInYear = secondsInDay * daysInYear;

/**
 * @constant
 * @name secondsInMonth
 * @summary Seconds in 1 month
 */
const secondsInMonth = secondsInYear / 12;

/**
 * @constant
 * @name secondsInQuarter
 * @summary Seconds in 1 quarter.
 */
const secondsInQuarter = secondsInMonth * 3;

/**
 * @constant
 * @name constructFromSymbol
 * @summary Symbol enabling Date extensions to inherit properties from the reference date.
 *
 * The symbol is used to enable the `constructFrom` function to construct a date
 * using a reference date and a value. It allows to transfer extra properties
 * from the reference date to the new date. It's useful for extensions like
 * [`TZDate`](https://github.com/date-fns/tz) that accept a time zone as
 * a constructor argument.
 */
const constructFromSymbol = Symbol.for("constructDateFrom");


/***/ }),

/***/ "./node_modules/date-fns/constructFrom.js":
/*!************************************************!*\
  !*** ./node_modules/date-fns/constructFrom.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   constructFrom: () => (/* binding */ constructFrom),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ "./node_modules/date-fns/constants.js");


/**
 * @name constructFrom
 * @category Generic Helpers
 * @summary Constructs a date using the reference date and the value
 *
 * @description
 * The function constructs a new date using the constructor from the reference
 * date and the given value. It helps to build generic functions that accept
 * date extensions.
 *
 * It defaults to `Date` if the passed reference date is a number or a string.
 *
 * Starting from v3.7.0, it allows to construct a date using `[Symbol.for("constructDateFrom")]`
 * enabling to transfer extra properties from the reference date to the new date.
 * It's useful for extensions like [`TZDate`](https://github.com/date-fns/tz)
 * that accept a time zone as a constructor argument.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The reference date to take constructor from
 * @param value - The value to create the date
 *
 * @returns Date initialized using the given date and value
 *
 * @example
 * import { constructFrom } from "./constructFrom/date-fns";
 *
 * // A function that clones a date preserving the original type
 * function cloneDate<DateType extends Date>(date: DateType): DateType {
 *   return constructFrom(
 *     date, // Use constructor from the given date
 *     date.getTime() // Use the date value to create a new date
 *   );
 * }
 */
function constructFrom(date, value) {
  if (typeof date === "function") return date(value);

  if (date && typeof date === "object" && _constants_js__WEBPACK_IMPORTED_MODULE_0__.constructFromSymbol in date)
    return date[_constants_js__WEBPACK_IMPORTED_MODULE_0__.constructFromSymbol](value);

  if (date instanceof Date) return new date.constructor(value);

  return new Date(value);
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (constructFrom);


/***/ }),

/***/ "./node_modules/date-fns/constructNow.js":
/*!***********************************************!*\
  !*** ./node_modules/date-fns/constructNow.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   constructNow: () => (/* binding */ constructNow),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constructFrom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constructFrom.js */ "./node_modules/date-fns/constructFrom.js");


/**
 * @name constructNow
 * @category Generic Helpers
 * @summary Constructs a new current date using the passed value constructor.
 * @pure false
 *
 * @description
 * The function constructs a new current date using the constructor from
 * the reference date. It helps to build generic functions that accept date
 * extensions and use the current date.
 *
 * It defaults to `Date` if the passed reference date is a number or a string.
 *
 * @param date - The reference date to take constructor from
 *
 * @returns Current date initialized using the given date constructor
 *
 * @example
 * import { constructNow, isSameDay } from 'date-fns'
 *
 * function isToday<DateType extends Date>(
 *   date: DateArg<DateType>,
 * ): boolean {
 *   // If we were to use `new Date()` directly, the function would  behave
 *   // differently in different timezones and return false for the same date.
 *   return isSameDay(date, constructNow(date));
 * }
 */
function constructNow(date) {
  return (0,_constructFrom_js__WEBPACK_IMPORTED_MODULE_0__.constructFrom)(date, Date.now());
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (constructNow);


/***/ }),

/***/ "./node_modules/date-fns/differenceInCalendarMonths.js":
/*!*************************************************************!*\
  !*** ./node_modules/date-fns/differenceInCalendarMonths.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   differenceInCalendarMonths: () => (/* binding */ differenceInCalendarMonths)
/* harmony export */ });
/* harmony import */ var _lib_normalizeDates_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_lib/normalizeDates.js */ "./node_modules/date-fns/_lib/normalizeDates.js");


/**
 * The {@link differenceInCalendarMonths} function options.
 */

/**
 * @name differenceInCalendarMonths
 * @category Month Helpers
 * @summary Get the number of calendar months between the given dates.
 *
 * @description
 * Get the number of calendar months between the given dates.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - An object with options
 *
 * @returns The number of calendar months
 *
 * @example
 * // How many calendar months are between 31 January 2014 and 1 September 2014?
 * const result = differenceInCalendarMonths(
 *   new Date(2014, 8, 1),
 *   new Date(2014, 0, 31)
 * )
 * //=> 8
 */
function differenceInCalendarMonths(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = (0,_lib_normalizeDates_js__WEBPACK_IMPORTED_MODULE_0__.normalizeDates)(
    options?.in,
    laterDate,
    earlierDate,
  );

  const yearsDiff = laterDate_.getFullYear() - earlierDate_.getFullYear();
  const monthsDiff = laterDate_.getMonth() - earlierDate_.getMonth();

  return yearsDiff * 12 + monthsDiff;
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (differenceInCalendarMonths);


/***/ }),

/***/ "./node_modules/date-fns/differenceInMilliseconds.js":
/*!***********************************************************!*\
  !*** ./node_modules/date-fns/differenceInMilliseconds.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   differenceInMilliseconds: () => (/* binding */ differenceInMilliseconds)
/* harmony export */ });
/* harmony import */ var _toDate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");


/**
 * @name differenceInMilliseconds
 * @category Millisecond Helpers
 * @summary Get the number of milliseconds between the given dates.
 *
 * @description
 * Get the number of milliseconds between the given dates.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 *
 * @returns The number of milliseconds
 *
 * @example
 * // How many milliseconds are between
 * // 2 July 2014 12:30:20.600 and 2 July 2014 12:30:21.700?
 * const result = differenceInMilliseconds(
 *   new Date(2014, 6, 2, 12, 30, 21, 700),
 *   new Date(2014, 6, 2, 12, 30, 20, 600)
 * )
 * //=> 1100
 */
function differenceInMilliseconds(laterDate, earlierDate) {
  return +(0,_toDate_js__WEBPACK_IMPORTED_MODULE_0__.toDate)(laterDate) - +(0,_toDate_js__WEBPACK_IMPORTED_MODULE_0__.toDate)(earlierDate);
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (differenceInMilliseconds);


/***/ }),

/***/ "./node_modules/date-fns/differenceInMonths.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/differenceInMonths.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   differenceInMonths: () => (/* binding */ differenceInMonths)
/* harmony export */ });
/* harmony import */ var _lib_normalizeDates_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_lib/normalizeDates.js */ "./node_modules/date-fns/_lib/normalizeDates.js");
/* harmony import */ var _compareAsc_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./compareAsc.js */ "./node_modules/date-fns/compareAsc.js");
/* harmony import */ var _differenceInCalendarMonths_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./differenceInCalendarMonths.js */ "./node_modules/date-fns/differenceInCalendarMonths.js");
/* harmony import */ var _isLastDayOfMonth_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./isLastDayOfMonth.js */ "./node_modules/date-fns/isLastDayOfMonth.js");





/**
 * The {@link differenceInMonths} function options.
 */

/**
 * @name differenceInMonths
 * @category Month Helpers
 * @summary Get the number of full months between the given dates.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - An object with options
 *
 * @returns The number of full months
 *
 * @example
 * // How many full months are between 31 January 2014 and 1 September 2014?
 * const result = differenceInMonths(new Date(2014, 8, 1), new Date(2014, 0, 31))
 * //=> 7
 */
function differenceInMonths(laterDate, earlierDate, options) {
  const [laterDate_, workingLaterDate, earlierDate_] = (0,_lib_normalizeDates_js__WEBPACK_IMPORTED_MODULE_0__.normalizeDates)(
    options?.in,
    laterDate,
    laterDate,
    earlierDate,
  );

  const sign = (0,_compareAsc_js__WEBPACK_IMPORTED_MODULE_1__.compareAsc)(workingLaterDate, earlierDate_);
  const difference = Math.abs(
    (0,_differenceInCalendarMonths_js__WEBPACK_IMPORTED_MODULE_2__.differenceInCalendarMonths)(workingLaterDate, earlierDate_),
  );

  if (difference < 1) return 0;

  if (workingLaterDate.getMonth() === 1 && workingLaterDate.getDate() > 27)
    workingLaterDate.setDate(30);

  workingLaterDate.setMonth(workingLaterDate.getMonth() - sign * difference);

  let isLastMonthNotFull = (0,_compareAsc_js__WEBPACK_IMPORTED_MODULE_1__.compareAsc)(workingLaterDate, earlierDate_) === -sign;

  if (
    (0,_isLastDayOfMonth_js__WEBPACK_IMPORTED_MODULE_3__.isLastDayOfMonth)(laterDate_) &&
    difference === 1 &&
    (0,_compareAsc_js__WEBPACK_IMPORTED_MODULE_1__.compareAsc)(laterDate_, earlierDate_) === 1
  ) {
    isLastMonthNotFull = false;
  }

  const result = sign * (difference - +isLastMonthNotFull);
  return result === 0 ? 0 : result;
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (differenceInMonths);


/***/ }),

/***/ "./node_modules/date-fns/differenceInSeconds.js":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/differenceInSeconds.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   differenceInSeconds: () => (/* binding */ differenceInSeconds)
/* harmony export */ });
/* harmony import */ var _lib_getRoundingMethod_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_lib/getRoundingMethod.js */ "./node_modules/date-fns/_lib/getRoundingMethod.js");
/* harmony import */ var _differenceInMilliseconds_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./differenceInMilliseconds.js */ "./node_modules/date-fns/differenceInMilliseconds.js");



/**
 * The {@link differenceInSeconds} function options.
 */

/**
 * @name differenceInSeconds
 * @category Second Helpers
 * @summary Get the number of seconds between the given dates.
 *
 * @description
 * Get the number of seconds between the given dates.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - An object with options.
 *
 * @returns The number of seconds
 *
 * @example
 * // How many seconds are between
 * // 2 July 2014 12:30:07.999 and 2 July 2014 12:30:20.000?
 * const result = differenceInSeconds(
 *   new Date(2014, 6, 2, 12, 30, 20, 0),
 *   new Date(2014, 6, 2, 12, 30, 7, 999)
 * )
 * //=> 12
 */
function differenceInSeconds(laterDate, earlierDate, options) {
  const diff = (0,_differenceInMilliseconds_js__WEBPACK_IMPORTED_MODULE_1__.differenceInMilliseconds)(laterDate, earlierDate) / 1000;
  return (0,_lib_getRoundingMethod_js__WEBPACK_IMPORTED_MODULE_0__.getRoundingMethod)(options?.roundingMethod)(diff);
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (differenceInSeconds);


/***/ }),

/***/ "./node_modules/date-fns/endOfDay.js":
/*!*******************************************!*\
  !*** ./node_modules/date-fns/endOfDay.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   endOfDay: () => (/* binding */ endOfDay)
/* harmony export */ });
/* harmony import */ var _toDate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");


/**
 * The {@link endOfDay} function options.
 */

/**
 * @name endOfDay
 * @category Day Helpers
 * @summary Return the end of a day for the given date.
 *
 * @description
 * Return the end of a day for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The end of a day
 *
 * @example
 * // The end of a day for 2 September 2014 11:55:00:
 * const result = endOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 23:59:59.999
 */
function endOfDay(date, options) {
  const _date = (0,_toDate_js__WEBPACK_IMPORTED_MODULE_0__.toDate)(date, options?.in);
  _date.setHours(23, 59, 59, 999);
  return _date;
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (endOfDay);


/***/ }),

/***/ "./node_modules/date-fns/endOfMonth.js":
/*!*********************************************!*\
  !*** ./node_modules/date-fns/endOfMonth.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   endOfMonth: () => (/* binding */ endOfMonth)
/* harmony export */ });
/* harmony import */ var _toDate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");


/**
 * The {@link endOfMonth} function options.
 */

/**
 * @name endOfMonth
 * @category Month Helpers
 * @summary Return the end of a month for the given date.
 *
 * @description
 * Return the end of a month for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The end of a month
 *
 * @example
 * // The end of a month for 2 September 2014 11:55:00:
 * const result = endOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 23:59:59.999
 */
function endOfMonth(date, options) {
  const _date = (0,_toDate_js__WEBPACK_IMPORTED_MODULE_0__.toDate)(date, options?.in);
  const month = _date.getMonth();
  _date.setFullYear(_date.getFullYear(), month + 1, 0);
  _date.setHours(23, 59, 59, 999);
  return _date;
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (endOfMonth);


/***/ }),

/***/ "./node_modules/date-fns/formatDistance.js":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/formatDistance.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   formatDistance: () => (/* binding */ formatDistance)
/* harmony export */ });
/* harmony import */ var _lib_defaultLocale_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_lib/defaultLocale.js */ "./node_modules/date-fns/locale/en-US.js");
/* harmony import */ var _lib_defaultOptions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_lib/defaultOptions.js */ "./node_modules/date-fns/_lib/defaultOptions.js");
/* harmony import */ var _lib_getTimezoneOffsetInMilliseconds_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_lib/getTimezoneOffsetInMilliseconds.js */ "./node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.js");
/* harmony import */ var _lib_normalizeDates_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_lib/normalizeDates.js */ "./node_modules/date-fns/_lib/normalizeDates.js");
/* harmony import */ var _compareAsc_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./compareAsc.js */ "./node_modules/date-fns/compareAsc.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./constants.js */ "./node_modules/date-fns/constants.js");
/* harmony import */ var _differenceInMonths_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./differenceInMonths.js */ "./node_modules/date-fns/differenceInMonths.js");
/* harmony import */ var _differenceInSeconds_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./differenceInSeconds.js */ "./node_modules/date-fns/differenceInSeconds.js");









/**
 * The {@link formatDistance} function options.
 */

/**
 * @name formatDistance
 * @category Common Helpers
 * @summary Return the distance between the given dates in words.
 *
 * @description
 * Return the distance between the given dates in words.
 *
 * | Distance between dates                                            | Result              |
 * |-------------------------------------------------------------------|---------------------|
 * | 0 ... 30 secs                                                     | less than a minute  |
 * | 30 secs ... 1 min 30 secs                                         | 1 minute            |
 * | 1 min 30 secs ... 44 mins 30 secs                                 | [2..44] minutes     |
 * | 44 mins ... 30 secs ... 89 mins 30 secs                           | about 1 hour        |
 * | 89 mins 30 secs ... 23 hrs 59 mins 30 secs                        | about [2..24] hours |
 * | 23 hrs 59 mins 30 secs ... 41 hrs 59 mins 30 secs                 | 1 day               |
 * | 41 hrs 59 mins 30 secs ... 29 days 23 hrs 59 mins 30 secs         | [2..30] days        |
 * | 29 days 23 hrs 59 mins 30 secs ... 44 days 23 hrs 59 mins 30 secs | about 1 month       |
 * | 44 days 23 hrs 59 mins 30 secs ... 59 days 23 hrs 59 mins 30 secs | about 2 months      |
 * | 59 days 23 hrs 59 mins 30 secs ... 1 yr                           | [2..12] months      |
 * | 1 yr ... 1 yr 3 months                                            | about 1 year        |
 * | 1 yr 3 months ... 1 yr 9 month s                                  | over 1 year         |
 * | 1 yr 9 months ... 2 yrs                                           | almost 2 years      |
 * | N yrs ... N yrs 3 months                                          | about N years       |
 * | N yrs 3 months ... N yrs 9 months                                 | over N years        |
 * | N yrs 9 months ... N+1 yrs                                        | almost N+1 years    |
 *
 * With `options.includeSeconds == true`:
 * | Distance between dates | Result               |
 * |------------------------|----------------------|
 * | 0 secs ... 5 secs      | less than 5 seconds  |
 * | 5 secs ... 10 secs     | less than 10 seconds |
 * | 10 secs ... 20 secs    | less than 20 seconds |
 * | 20 secs ... 40 secs    | half a minute        |
 * | 40 secs ... 60 secs    | less than a minute   |
 * | 60 secs ... 90 secs    | 1 minute             |
 *
 * @param laterDate - The date
 * @param earlierDate - The date to compare with
 * @param options - An object with options
 *
 * @returns The distance in words
 *
 * @throws `date` must not be Invalid Date
 * @throws `baseDate` must not be Invalid Date
 * @throws `options.locale` must contain `formatDistance` property
 *
 * @example
 * // What is the distance between 2 July 2014 and 1 January 2015?
 * const result = formatDistance(new Date(2014, 6, 2), new Date(2015, 0, 1))
 * //=> '6 months'
 *
 * @example
 * // What is the distance between 1 January 2015 00:00:15
 * // and 1 January 2015 00:00:00, including seconds?
 * const result = formatDistance(
 *   new Date(2015, 0, 1, 0, 0, 15),
 *   new Date(2015, 0, 1, 0, 0, 0),
 *   { includeSeconds: true }
 * )
 * //=> 'less than 20 seconds'
 *
 * @example
 * // What is the distance from 1 January 2016
 * // to 1 January 2015, with a suffix?
 * const result = formatDistance(new Date(2015, 0, 1), new Date(2016, 0, 1), {
 *   addSuffix: true
 * })
 * //=> 'about 1 year ago'
 *
 * @example
 * // What is the distance between 1 August 2016 and 1 January 2015 in Esperanto?
 * import { eoLocale } from 'date-fns/locale/eo'
 * const result = formatDistance(new Date(2016, 7, 1), new Date(2015, 0, 1), {
 *   locale: eoLocale
 * })
 * //=> 'pli ol 1 jaro'
 */
function formatDistance(laterDate, earlierDate, options) {
  const defaultOptions = (0,_lib_defaultOptions_js__WEBPACK_IMPORTED_MODULE_1__.getDefaultOptions)();
  const locale = options?.locale ?? defaultOptions.locale ?? _lib_defaultLocale_js__WEBPACK_IMPORTED_MODULE_0__.enUS;
  const minutesInAlmostTwoDays = 2520;

  const comparison = (0,_compareAsc_js__WEBPACK_IMPORTED_MODULE_4__.compareAsc)(laterDate, earlierDate);

  if (isNaN(comparison)) throw new RangeError("Invalid time value");

  const localizeOptions = Object.assign({}, options, {
    addSuffix: options?.addSuffix,
    comparison: comparison,
  });

  const [laterDate_, earlierDate_] = (0,_lib_normalizeDates_js__WEBPACK_IMPORTED_MODULE_3__.normalizeDates)(
    options?.in,
    ...(comparison > 0 ? [earlierDate, laterDate] : [laterDate, earlierDate]),
  );

  const seconds = (0,_differenceInSeconds_js__WEBPACK_IMPORTED_MODULE_7__.differenceInSeconds)(earlierDate_, laterDate_);
  const offsetInSeconds =
    ((0,_lib_getTimezoneOffsetInMilliseconds_js__WEBPACK_IMPORTED_MODULE_2__.getTimezoneOffsetInMilliseconds)(earlierDate_) -
      (0,_lib_getTimezoneOffsetInMilliseconds_js__WEBPACK_IMPORTED_MODULE_2__.getTimezoneOffsetInMilliseconds)(laterDate_)) /
    1000;
  const minutes = Math.round((seconds - offsetInSeconds) / 60);
  let months;

  // 0 up to 2 mins
  if (minutes < 2) {
    if (options?.includeSeconds) {
      if (seconds < 5) {
        return locale.formatDistance("lessThanXSeconds", 5, localizeOptions);
      } else if (seconds < 10) {
        return locale.formatDistance("lessThanXSeconds", 10, localizeOptions);
      } else if (seconds < 20) {
        return locale.formatDistance("lessThanXSeconds", 20, localizeOptions);
      } else if (seconds < 40) {
        return locale.formatDistance("halfAMinute", 0, localizeOptions);
      } else if (seconds < 60) {
        return locale.formatDistance("lessThanXMinutes", 1, localizeOptions);
      } else {
        return locale.formatDistance("xMinutes", 1, localizeOptions);
      }
    } else {
      if (minutes === 0) {
        return locale.formatDistance("lessThanXMinutes", 1, localizeOptions);
      } else {
        return locale.formatDistance("xMinutes", minutes, localizeOptions);
      }
    }

    // 2 mins up to 0.75 hrs
  } else if (minutes < 45) {
    return locale.formatDistance("xMinutes", minutes, localizeOptions);

    // 0.75 hrs up to 1.5 hrs
  } else if (minutes < 90) {
    return locale.formatDistance("aboutXHours", 1, localizeOptions);

    // 1.5 hrs up to 24 hrs
  } else if (minutes < _constants_js__WEBPACK_IMPORTED_MODULE_5__.minutesInDay) {
    const hours = Math.round(minutes / 60);
    return locale.formatDistance("aboutXHours", hours, localizeOptions);

    // 1 day up to 1.75 days
  } else if (minutes < minutesInAlmostTwoDays) {
    return locale.formatDistance("xDays", 1, localizeOptions);

    // 1.75 days up to 30 days
  } else if (minutes < _constants_js__WEBPACK_IMPORTED_MODULE_5__.minutesInMonth) {
    const days = Math.round(minutes / _constants_js__WEBPACK_IMPORTED_MODULE_5__.minutesInDay);
    return locale.formatDistance("xDays", days, localizeOptions);

    // 1 month up to 2 months
  } else if (minutes < _constants_js__WEBPACK_IMPORTED_MODULE_5__.minutesInMonth * 2) {
    months = Math.round(minutes / _constants_js__WEBPACK_IMPORTED_MODULE_5__.minutesInMonth);
    return locale.formatDistance("aboutXMonths", months, localizeOptions);
  }

  months = (0,_differenceInMonths_js__WEBPACK_IMPORTED_MODULE_6__.differenceInMonths)(earlierDate_, laterDate_);

  // 2 months up to 12 months
  if (months < 12) {
    const nearestMonth = Math.round(minutes / _constants_js__WEBPACK_IMPORTED_MODULE_5__.minutesInMonth);
    return locale.formatDistance("xMonths", nearestMonth, localizeOptions);

    // 1 year up to max Date
  } else {
    const monthsSinceStartOfYear = months % 12;
    const years = Math.trunc(months / 12);

    // N years up to 1 years 3 months
    if (monthsSinceStartOfYear < 3) {
      return locale.formatDistance("aboutXYears", years, localizeOptions);

      // N years 3 months up to N years 9 months
    } else if (monthsSinceStartOfYear < 9) {
      return locale.formatDistance("overXYears", years, localizeOptions);

      // N years 9 months up to N year 12 months
    } else {
      return locale.formatDistance("almostXYears", years + 1, localizeOptions);
    }
  }
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formatDistance);


/***/ }),

/***/ "./node_modules/date-fns/formatDistanceToNow.js":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/formatDistanceToNow.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   formatDistanceToNow: () => (/* binding */ formatDistanceToNow)
/* harmony export */ });
/* harmony import */ var _constructNow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constructNow.js */ "./node_modules/date-fns/constructNow.js");
/* harmony import */ var _formatDistance_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./formatDistance.js */ "./node_modules/date-fns/formatDistance.js");




/**
 * The {@link formatDistanceToNow} function options.
 */

/**
 * @name formatDistanceToNow
 * @category Common Helpers
 * @summary Return the distance between the given date and now in words.
 * @pure false
 *
 * @description
 * Return the distance between the given date and now in words.
 *
 * | Distance to now                                                   | Result              |
 * |-------------------------------------------------------------------|---------------------|
 * | 0 ... 30 secs                                                     | less than a minute  |
 * | 30 secs ... 1 min 30 secs                                         | 1 minute            |
 * | 1 min 30 secs ... 44 mins 30 secs                                 | [2..44] minutes     |
 * | 44 mins ... 30 secs ... 89 mins 30 secs                           | about 1 hour        |
 * | 89 mins 30 secs ... 23 hrs 59 mins 30 secs                        | about [2..24] hours |
 * | 23 hrs 59 mins 30 secs ... 41 hrs 59 mins 30 secs                 | 1 day               |
 * | 41 hrs 59 mins 30 secs ... 29 days 23 hrs 59 mins 30 secs         | [2..30] days        |
 * | 29 days 23 hrs 59 mins 30 secs ... 44 days 23 hrs 59 mins 30 secs | about 1 month       |
 * | 44 days 23 hrs 59 mins 30 secs ... 59 days 23 hrs 59 mins 30 secs | about 2 months      |
 * | 59 days 23 hrs 59 mins 30 secs ... 1 yr                           | [2..12] months      |
 * | 1 yr ... 1 yr 3 months                                            | about 1 year        |
 * | 1 yr 3 months ... 1 yr 9 month s                                  | over 1 year         |
 * | 1 yr 9 months ... 2 yrs                                           | almost 2 years      |
 * | N yrs ... N yrs 3 months                                          | about N years       |
 * | N yrs 3 months ... N yrs 9 months                                 | over N years        |
 * | N yrs 9 months ... N+1 yrs                                        | almost N+1 years    |
 *
 * With `options.includeSeconds == true`:
 * | Distance to now     | Result               |
 * |---------------------|----------------------|
 * | 0 secs ... 5 secs   | less than 5 seconds  |
 * | 5 secs ... 10 secs  | less than 10 seconds |
 * | 10 secs ... 20 secs | less than 20 seconds |
 * | 20 secs ... 40 secs | half a minute        |
 * | 40 secs ... 60 secs | less than a minute   |
 * | 60 secs ... 90 secs | 1 minute             |
 *
 * @param date - The given date
 * @param options - The object with options
 *
 * @returns The distance in words
 *
 * @throws `date` must not be Invalid Date
 * @throws `options.locale` must contain `formatDistance` property
 *
 * @example
 * // If today is 1 January 2015, what is the distance to 2 July 2014?
 * const result = formatDistanceToNow(
 *   new Date(2014, 6, 2)
 * )
 * //=> '6 months'
 *
 * @example
 * // If now is 1 January 2015 00:00:00,
 * // what is the distance to 1 January 2015 00:00:15, including seconds?
 * const result = formatDistanceToNow(
 *   new Date(2015, 0, 1, 0, 0, 15),
 *   {includeSeconds: true}
 * )
 * //=> 'less than 20 seconds'
 *
 * @example
 * // If today is 1 January 2015,
 * // what is the distance to 1 January 2016, with a suffix?
 * const result = formatDistanceToNow(
 *   new Date(2016, 0, 1),
 *   {addSuffix: true}
 * )
 * //=> 'in about 1 year'
 *
 * @example
 * // If today is 1 January 2015,
 * // what is the distance to 1 August 2016 in Esperanto?
 * const eoLocale = require('date-fns/locale/eo')
 * const result = formatDistanceToNow(
 *   new Date(2016, 7, 1),
 *   {locale: eoLocale}
 * )
 * //=> 'pli ol 1 jaro'
 */
function formatDistanceToNow(date, options) {
  return (0,_formatDistance_js__WEBPACK_IMPORTED_MODULE_1__.formatDistance)(date, (0,_constructNow_js__WEBPACK_IMPORTED_MODULE_0__.constructNow)(date), options);
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formatDistanceToNow);


/***/ }),

/***/ "./node_modules/date-fns/isLastDayOfMonth.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/isLastDayOfMonth.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   isLastDayOfMonth: () => (/* binding */ isLastDayOfMonth)
/* harmony export */ });
/* harmony import */ var _endOfDay_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./endOfDay.js */ "./node_modules/date-fns/endOfDay.js");
/* harmony import */ var _endOfMonth_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./endOfMonth.js */ "./node_modules/date-fns/endOfMonth.js");
/* harmony import */ var _toDate_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");




/**
 * @name isLastDayOfMonth
 * @category Month Helpers
 * @summary Is the given date the last day of a month?
 *
 * @description
 * Is the given date the last day of a month?
 *
 * @param date - The date to check
 * @param options - An object with options
 *
 * @returns The date is the last day of a month
 *
 * @example
 * // Is 28 February 2014 the last day of a month?
 * const result = isLastDayOfMonth(new Date(2014, 1, 28))
 * //=> true
 */
function isLastDayOfMonth(date, options) {
  const _date = (0,_toDate_js__WEBPACK_IMPORTED_MODULE_2__.toDate)(date, options?.in);
  return +(0,_endOfDay_js__WEBPACK_IMPORTED_MODULE_0__.endOfDay)(_date, options) === +(0,_endOfMonth_js__WEBPACK_IMPORTED_MODULE_1__.endOfMonth)(_date, options);
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isLastDayOfMonth);


/***/ }),

/***/ "./node_modules/date-fns/isSameWeek.js":
/*!*********************************************!*\
  !*** ./node_modules/date-fns/isSameWeek.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   isSameWeek: () => (/* binding */ isSameWeek)
/* harmony export */ });
/* harmony import */ var _lib_normalizeDates_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_lib/normalizeDates.js */ "./node_modules/date-fns/_lib/normalizeDates.js");
/* harmony import */ var _startOfWeek_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./startOfWeek.js */ "./node_modules/date-fns/startOfWeek.js");



/**
 * The {@link isSameWeek} function options.
 */

/**
 * @name isSameWeek
 * @category Week Helpers
 * @summary Are the given dates in the same week (and month and year)?
 *
 * @description
 * Are the given dates in the same week (and month and year)?
 *
 * @param laterDate - The first date to check
 * @param earlierDate - The second date to check
 * @param options - An object with options
 *
 * @returns The dates are in the same week (and month and year)
 *
 * @example
 * // Are 31 August 2014 and 4 September 2014 in the same week?
 * const result = isSameWeek(new Date(2014, 7, 31), new Date(2014, 8, 4))
 * //=> true
 *
 * @example
 * // If week starts with Monday,
 * // are 31 August 2014 and 4 September 2014 in the same week?
 * const result = isSameWeek(new Date(2014, 7, 31), new Date(2014, 8, 4), {
 *   weekStartsOn: 1
 * })
 * //=> false
 *
 * @example
 * // Are 1 January 2014 and 1 January 2015 in the same week?
 * const result = isSameWeek(new Date(2014, 0, 1), new Date(2015, 0, 1))
 * //=> false
 */
function isSameWeek(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = (0,_lib_normalizeDates_js__WEBPACK_IMPORTED_MODULE_0__.normalizeDates)(
    options?.in,
    laterDate,
    earlierDate,
  );
  return (
    +(0,_startOfWeek_js__WEBPACK_IMPORTED_MODULE_1__.startOfWeek)(laterDate_, options) === +(0,_startOfWeek_js__WEBPACK_IMPORTED_MODULE_1__.startOfWeek)(earlierDate_, options)
  );
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isSameWeek);


/***/ }),

/***/ "./node_modules/date-fns/locale/_lib/buildFormatLongFn.js":
/*!****************************************************************!*\
  !*** ./node_modules/date-fns/locale/_lib/buildFormatLongFn.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildFormatLongFn: () => (/* binding */ buildFormatLongFn)
/* harmony export */ });
function buildFormatLongFn(args) {
  return (options = {}) => {
    // TODO: Remove String()
    const width = options.width ? String(options.width) : args.defaultWidth;
    const format = args.formats[width] || args.formats[args.defaultWidth];
    return format;
  };
}


/***/ }),

/***/ "./node_modules/date-fns/locale/_lib/buildLocalizeFn.js":
/*!**************************************************************!*\
  !*** ./node_modules/date-fns/locale/_lib/buildLocalizeFn.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildLocalizeFn: () => (/* binding */ buildLocalizeFn)
/* harmony export */ });
/**
 * The localize function argument callback which allows to convert raw value to
 * the actual type.
 *
 * @param value - The value to convert
 *
 * @returns The converted value
 */

/**
 * The map of localized values for each width.
 */

/**
 * The index type of the locale unit value. It types conversion of units of
 * values that don't start at 0 (i.e. quarters).
 */

/**
 * Converts the unit value to the tuple of values.
 */

/**
 * The tuple of localized era values. The first element represents BC,
 * the second element represents AD.
 */

/**
 * The tuple of localized quarter values. The first element represents Q1.
 */

/**
 * The tuple of localized day values. The first element represents Sunday.
 */

/**
 * The tuple of localized month values. The first element represents January.
 */

function buildLocalizeFn(args) {
  return (value, options) => {
    const context = options?.context ? String(options.context) : "standalone";

    let valuesArray;
    if (context === "formatting" && args.formattingValues) {
      const defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      const width = options?.width ? String(options.width) : defaultWidth;

      valuesArray =
        args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      const defaultWidth = args.defaultWidth;
      const width = options?.width ? String(options.width) : args.defaultWidth;

      valuesArray = args.values[width] || args.values[defaultWidth];
    }
    const index = args.argumentCallback ? args.argumentCallback(value) : value;

    // @ts-expect-error - For some reason TypeScript just don't want to match it, no matter how hard we try. I challenge you to try to remove it!
    return valuesArray[index];
  };
}


/***/ }),

/***/ "./node_modules/date-fns/locale/_lib/buildMatchFn.js":
/*!***********************************************************!*\
  !*** ./node_modules/date-fns/locale/_lib/buildMatchFn.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildMatchFn: () => (/* binding */ buildMatchFn)
/* harmony export */ });
function buildMatchFn(args) {
  return (string, options = {}) => {
    const width = options.width;

    const matchPattern =
      (width && args.matchPatterns[width]) ||
      args.matchPatterns[args.defaultMatchWidth];
    const matchResult = string.match(matchPattern);

    if (!matchResult) {
      return null;
    }
    const matchedString = matchResult[0];

    const parsePatterns =
      (width && args.parsePatterns[width]) ||
      args.parsePatterns[args.defaultParseWidth];

    const key = Array.isArray(parsePatterns)
      ? findIndex(parsePatterns, (pattern) => pattern.test(matchedString))
      : // [TODO] -- I challenge you to fix the type
        findKey(parsePatterns, (pattern) => pattern.test(matchedString));

    let value;

    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback
      ? // [TODO] -- I challenge you to fix the type
        options.valueCallback(value)
      : value;

    const rest = string.slice(matchedString.length);

    return { value, rest };
  };
}

function findKey(object, predicate) {
  for (const key in object) {
    if (
      Object.prototype.hasOwnProperty.call(object, key) &&
      predicate(object[key])
    ) {
      return key;
    }
  }
  return undefined;
}

function findIndex(array, predicate) {
  for (let key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
  return undefined;
}


/***/ }),

/***/ "./node_modules/date-fns/locale/_lib/buildMatchPatternFn.js":
/*!******************************************************************!*\
  !*** ./node_modules/date-fns/locale/_lib/buildMatchPatternFn.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildMatchPatternFn: () => (/* binding */ buildMatchPatternFn)
/* harmony export */ });
function buildMatchPatternFn(args) {
  return (string, options = {}) => {
    const matchResult = string.match(args.matchPattern);
    if (!matchResult) return null;
    const matchedString = matchResult[0];

    const parseResult = string.match(args.parsePattern);
    if (!parseResult) return null;
    let value = args.valueCallback
      ? args.valueCallback(parseResult[0])
      : parseResult[0];

    // [TODO] I challenge you to fix the type
    value = options.valueCallback ? options.valueCallback(value) : value;

    const rest = string.slice(matchedString.length);

    return { value, rest };
  };
}


/***/ }),

/***/ "./node_modules/date-fns/locale/en-US.js":
/*!***********************************************!*\
  !*** ./node_modules/date-fns/locale/en-US.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   enUS: () => (/* binding */ enUS)
/* harmony export */ });
/* harmony import */ var _en_US_lib_formatDistance_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./en-US/_lib/formatDistance.js */ "./node_modules/date-fns/locale/en-US/_lib/formatDistance.js");
/* harmony import */ var _en_US_lib_formatLong_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./en-US/_lib/formatLong.js */ "./node_modules/date-fns/locale/en-US/_lib/formatLong.js");
/* harmony import */ var _en_US_lib_formatRelative_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./en-US/_lib/formatRelative.js */ "./node_modules/date-fns/locale/en-US/_lib/formatRelative.js");
/* harmony import */ var _en_US_lib_localize_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./en-US/_lib/localize.js */ "./node_modules/date-fns/locale/en-US/_lib/localize.js");
/* harmony import */ var _en_US_lib_match_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./en-US/_lib/match.js */ "./node_modules/date-fns/locale/en-US/_lib/match.js");






/**
 * @category Locales
 * @summary English locale (United States).
 * @language English
 * @iso-639-2 eng
 * @author Sasha Koss [@kossnocorp](https://github.com/kossnocorp)
 * @author Lesha Koss [@leshakoss](https://github.com/leshakoss)
 */
const enUS = {
  code: "en-US",
  formatDistance: _en_US_lib_formatDistance_js__WEBPACK_IMPORTED_MODULE_0__.formatDistance,
  formatLong: _en_US_lib_formatLong_js__WEBPACK_IMPORTED_MODULE_1__.formatLong,
  formatRelative: _en_US_lib_formatRelative_js__WEBPACK_IMPORTED_MODULE_2__.formatRelative,
  localize: _en_US_lib_localize_js__WEBPACK_IMPORTED_MODULE_3__.localize,
  match: _en_US_lib_match_js__WEBPACK_IMPORTED_MODULE_4__.match,
  options: {
    weekStartsOn: 0 /* Sunday */,
    firstWeekContainsDate: 1,
  },
};

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (enUS);


/***/ }),

/***/ "./node_modules/date-fns/locale/en-US/_lib/formatDistance.js":
/*!*******************************************************************!*\
  !*** ./node_modules/date-fns/locale/en-US/_lib/formatDistance.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatDistance: () => (/* binding */ formatDistance)
/* harmony export */ });
const formatDistanceLocale = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds",
  },

  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds",
  },

  halfAMinute: "half a minute",

  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes",
  },

  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes",
  },

  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours",
  },

  xHours: {
    one: "1 hour",
    other: "{{count}} hours",
  },

  xDays: {
    one: "1 day",
    other: "{{count}} days",
  },

  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks",
  },

  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks",
  },

  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months",
  },

  xMonths: {
    one: "1 month",
    other: "{{count}} months",
  },

  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years",
  },

  xYears: {
    one: "1 year",
    other: "{{count}} years",
  },

  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years",
  },

  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years",
  },
};

const formatDistance = (token, count, options) => {
  let result;

  const tokenValue = formatDistanceLocale[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }

  if (options?.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "in " + result;
    } else {
      return result + " ago";
    }
  }

  return result;
};


/***/ }),

/***/ "./node_modules/date-fns/locale/en-US/_lib/formatLong.js":
/*!***************************************************************!*\
  !*** ./node_modules/date-fns/locale/en-US/_lib/formatLong.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatLong: () => (/* binding */ formatLong)
/* harmony export */ });
/* harmony import */ var _lib_buildFormatLongFn_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../_lib/buildFormatLongFn.js */ "./node_modules/date-fns/locale/_lib/buildFormatLongFn.js");


const dateFormats = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy",
};

const timeFormats = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a",
};

const dateTimeFormats = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}",
};

const formatLong = {
  date: (0,_lib_buildFormatLongFn_js__WEBPACK_IMPORTED_MODULE_0__.buildFormatLongFn)({
    formats: dateFormats,
    defaultWidth: "full",
  }),

  time: (0,_lib_buildFormatLongFn_js__WEBPACK_IMPORTED_MODULE_0__.buildFormatLongFn)({
    formats: timeFormats,
    defaultWidth: "full",
  }),

  dateTime: (0,_lib_buildFormatLongFn_js__WEBPACK_IMPORTED_MODULE_0__.buildFormatLongFn)({
    formats: dateTimeFormats,
    defaultWidth: "full",
  }),
};


/***/ }),

/***/ "./node_modules/date-fns/locale/en-US/_lib/formatRelative.js":
/*!*******************************************************************!*\
  !*** ./node_modules/date-fns/locale/en-US/_lib/formatRelative.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatRelative: () => (/* binding */ formatRelative)
/* harmony export */ });
const formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P",
};

const formatRelative = (token, _date, _baseDate, _options) =>
  formatRelativeLocale[token];


/***/ }),

/***/ "./node_modules/date-fns/locale/en-US/_lib/localize.js":
/*!*************************************************************!*\
  !*** ./node_modules/date-fns/locale/en-US/_lib/localize.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   localize: () => (/* binding */ localize)
/* harmony export */ });
/* harmony import */ var _lib_buildLocalizeFn_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../_lib/buildLocalizeFn.js */ "./node_modules/date-fns/locale/_lib/buildLocalizeFn.js");


const eraValues = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"],
};

const quarterValues = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"],
};

// Note: in English, the names of days of the week and months are capitalized.
// If you are making a new locale based on this one, check if the same is true for the language you're working on.
// Generally, formatted dates should look like they are in the middle of a sentence,
// e.g. in Spanish language the weekdays and months should be in the lowercase.
const monthValues = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],

  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
};

const dayValues = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
};

const dayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night",
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night",
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night",
  },
};

const formattingDayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night",
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night",
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night",
  },
};

const ordinalNumber = (dirtyNumber, _options) => {
  const number = Number(dirtyNumber);

  // If ordinal numbers depend on context, for example,
  // if they are different for different grammatical genders,
  // use `options.unit`.
  //
  // `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
  // 'day', 'hour', 'minute', 'second'.

  const rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + "st";
      case 2:
        return number + "nd";
      case 3:
        return number + "rd";
    }
  }
  return number + "th";
};

const localize = {
  ordinalNumber,

  era: (0,_lib_buildLocalizeFn_js__WEBPACK_IMPORTED_MODULE_0__.buildLocalizeFn)({
    values: eraValues,
    defaultWidth: "wide",
  }),

  quarter: (0,_lib_buildLocalizeFn_js__WEBPACK_IMPORTED_MODULE_0__.buildLocalizeFn)({
    values: quarterValues,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1,
  }),

  month: (0,_lib_buildLocalizeFn_js__WEBPACK_IMPORTED_MODULE_0__.buildLocalizeFn)({
    values: monthValues,
    defaultWidth: "wide",
  }),

  day: (0,_lib_buildLocalizeFn_js__WEBPACK_IMPORTED_MODULE_0__.buildLocalizeFn)({
    values: dayValues,
    defaultWidth: "wide",
  }),

  dayPeriod: (0,_lib_buildLocalizeFn_js__WEBPACK_IMPORTED_MODULE_0__.buildLocalizeFn)({
    values: dayPeriodValues,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: "wide",
  }),
};


/***/ }),

/***/ "./node_modules/date-fns/locale/en-US/_lib/match.js":
/*!**********************************************************!*\
  !*** ./node_modules/date-fns/locale/en-US/_lib/match.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   match: () => (/* binding */ match)
/* harmony export */ });
/* harmony import */ var _lib_buildMatchFn_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../_lib/buildMatchFn.js */ "./node_modules/date-fns/locale/_lib/buildMatchFn.js");
/* harmony import */ var _lib_buildMatchPatternFn_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_lib/buildMatchPatternFn.js */ "./node_modules/date-fns/locale/_lib/buildMatchPatternFn.js");



const matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
const parseOrdinalNumberPattern = /\d+/i;

const matchEraPatterns = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i,
};
const parseEraPatterns = {
  any: [/^b/i, /^(a|c)/i],
};

const matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i,
};
const parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i],
};

const matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i,
};
const parseMonthPatterns = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i,
  ],

  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i,
  ],
};

const matchDayPatterns = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i,
};
const parseDayPatterns = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i],
};

const matchDayPeriodPatterns = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i,
};
const parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i,
  },
};

const match = {
  ordinalNumber: (0,_lib_buildMatchPatternFn_js__WEBPACK_IMPORTED_MODULE_1__.buildMatchPatternFn)({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: (value) => parseInt(value, 10),
  }),

  era: (0,_lib_buildMatchFn_js__WEBPACK_IMPORTED_MODULE_0__.buildMatchFn)({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns,
    defaultParseWidth: "any",
  }),

  quarter: (0,_lib_buildMatchFn_js__WEBPACK_IMPORTED_MODULE_0__.buildMatchFn)({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1,
  }),

  month: (0,_lib_buildMatchFn_js__WEBPACK_IMPORTED_MODULE_0__.buildMatchFn)({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: "any",
  }),

  day: (0,_lib_buildMatchFn_js__WEBPACK_IMPORTED_MODULE_0__.buildMatchFn)({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns,
    defaultParseWidth: "any",
  }),

  dayPeriod: (0,_lib_buildMatchFn_js__WEBPACK_IMPORTED_MODULE_0__.buildMatchFn)({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: "any",
  }),
};


/***/ }),

/***/ "./node_modules/date-fns/locale/ru.js":
/*!********************************************!*\
  !*** ./node_modules/date-fns/locale/ru.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   ru: () => (/* binding */ ru)
/* harmony export */ });
/* harmony import */ var _ru_lib_formatDistance_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ru/_lib/formatDistance.js */ "./node_modules/date-fns/locale/ru/_lib/formatDistance.js");
/* harmony import */ var _ru_lib_formatLong_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ru/_lib/formatLong.js */ "./node_modules/date-fns/locale/ru/_lib/formatLong.js");
/* harmony import */ var _ru_lib_formatRelative_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ru/_lib/formatRelative.js */ "./node_modules/date-fns/locale/ru/_lib/formatRelative.js");
/* harmony import */ var _ru_lib_localize_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ru/_lib/localize.js */ "./node_modules/date-fns/locale/ru/_lib/localize.js");
/* harmony import */ var _ru_lib_match_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ru/_lib/match.js */ "./node_modules/date-fns/locale/ru/_lib/match.js");






/**
 * @category Locales
 * @summary Russian locale.
 * @language Russian
 * @iso-639-2 rus
 * @author Sasha Koss [@kossnocorp](https://github.com/kossnocorp)
 * @author Lesha Koss [@leshakoss](https://github.com/leshakoss)
 */
const ru = {
  code: "ru",
  formatDistance: _ru_lib_formatDistance_js__WEBPACK_IMPORTED_MODULE_0__.formatDistance,
  formatLong: _ru_lib_formatLong_js__WEBPACK_IMPORTED_MODULE_1__.formatLong,
  formatRelative: _ru_lib_formatRelative_js__WEBPACK_IMPORTED_MODULE_2__.formatRelative,
  localize: _ru_lib_localize_js__WEBPACK_IMPORTED_MODULE_3__.localize,
  match: _ru_lib_match_js__WEBPACK_IMPORTED_MODULE_4__.match,
  options: {
    weekStartsOn: 1 /* Monday */,
    firstWeekContainsDate: 1,
  },
};

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ru);


/***/ }),

/***/ "./node_modules/date-fns/locale/ru/_lib/formatDistance.js":
/*!****************************************************************!*\
  !*** ./node_modules/date-fns/locale/ru/_lib/formatDistance.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatDistance: () => (/* binding */ formatDistance)
/* harmony export */ });
function declension(scheme, count) {
  // scheme for count=1 exists
  if (scheme.one !== undefined && count === 1) {
    return scheme.one;
  }

  const rem10 = count % 10;
  const rem100 = count % 100;

  // 1, 21, 31, ...
  if (rem10 === 1 && rem100 !== 11) {
    return scheme.singularNominative.replace("{{count}}", String(count));

    // 2, 3, 4, 22, 23, 24, 32 ...
  } else if (rem10 >= 2 && rem10 <= 4 && (rem100 < 10 || rem100 > 20)) {
    return scheme.singularGenitive.replace("{{count}}", String(count));

    // 5, 6, 7, 8, 9, 10, 11, ...
  } else {
    return scheme.pluralGenitive.replace("{{count}}", String(count));
  }
}

function buildLocalizeTokenFn(scheme) {
  return (count, options) => {
    if (options?.addSuffix) {
      if (options.comparison && options.comparison > 0) {
        if (scheme.future) {
          return declension(scheme.future, count);
        } else {
          return "через " + declension(scheme.regular, count);
        }
      } else {
        if (scheme.past) {
          return declension(scheme.past, count);
        } else {
          return declension(scheme.regular, count) + " назад";
        }
      }
    } else {
      return declension(scheme.regular, count);
    }
  };
}

const formatDistanceLocale = {
  lessThanXSeconds: buildLocalizeTokenFn({
    regular: {
      one: "меньше секунды",
      singularNominative: "меньше {{count}} секунды",
      singularGenitive: "меньше {{count}} секунд",
      pluralGenitive: "меньше {{count}} секунд",
    },
    future: {
      one: "меньше, чем через секунду",
      singularNominative: "меньше, чем через {{count}} секунду",
      singularGenitive: "меньше, чем через {{count}} секунды",
      pluralGenitive: "меньше, чем через {{count}} секунд",
    },
  }),

  xSeconds: buildLocalizeTokenFn({
    regular: {
      singularNominative: "{{count}} секунда",
      singularGenitive: "{{count}} секунды",
      pluralGenitive: "{{count}} секунд",
    },
    past: {
      singularNominative: "{{count}} секунду назад",
      singularGenitive: "{{count}} секунды назад",
      pluralGenitive: "{{count}} секунд назад",
    },
    future: {
      singularNominative: "через {{count}} секунду",
      singularGenitive: "через {{count}} секунды",
      pluralGenitive: "через {{count}} секунд",
    },
  }),

  halfAMinute: (_count, options) => {
    if (options?.addSuffix) {
      if (options.comparison && options.comparison > 0) {
        return "через полминуты";
      } else {
        return "полминуты назад";
      }
    }

    return "полминуты";
  },

  lessThanXMinutes: buildLocalizeTokenFn({
    regular: {
      one: "меньше минуты",
      singularNominative: "меньше {{count}} минуты",
      singularGenitive: "меньше {{count}} минут",
      pluralGenitive: "меньше {{count}} минут",
    },
    future: {
      one: "меньше, чем через минуту",
      singularNominative: "меньше, чем через {{count}} минуту",
      singularGenitive: "меньше, чем через {{count}} минуты",
      pluralGenitive: "меньше, чем через {{count}} минут",
    },
  }),

  xMinutes: buildLocalizeTokenFn({
    regular: {
      singularNominative: "{{count}} минута",
      singularGenitive: "{{count}} минуты",
      pluralGenitive: "{{count}} минут",
    },
    past: {
      singularNominative: "{{count}} минуту назад",
      singularGenitive: "{{count}} минуты назад",
      pluralGenitive: "{{count}} минут назад",
    },
    future: {
      singularNominative: "через {{count}} минуту",
      singularGenitive: "через {{count}} минуты",
      pluralGenitive: "через {{count}} минут",
    },
  }),

  aboutXHours: buildLocalizeTokenFn({
    regular: {
      singularNominative: "около {{count}} часа",
      singularGenitive: "около {{count}} часов",
      pluralGenitive: "около {{count}} часов",
    },
    future: {
      singularNominative: "приблизительно через {{count}} час",
      singularGenitive: "приблизительно через {{count}} часа",
      pluralGenitive: "приблизительно через {{count}} часов",
    },
  }),

  xHours: buildLocalizeTokenFn({
    regular: {
      singularNominative: "{{count}} час",
      singularGenitive: "{{count}} часа",
      pluralGenitive: "{{count}} часов",
    },
  }),

  xDays: buildLocalizeTokenFn({
    regular: {
      singularNominative: "{{count}} день",
      singularGenitive: "{{count}} дня",
      pluralGenitive: "{{count}} дней",
    },
  }),

  aboutXWeeks: buildLocalizeTokenFn({
    regular: {
      singularNominative: "около {{count}} недели",
      singularGenitive: "около {{count}} недель",
      pluralGenitive: "около {{count}} недель",
    },
    future: {
      singularNominative: "приблизительно через {{count}} неделю",
      singularGenitive: "приблизительно через {{count}} недели",
      pluralGenitive: "приблизительно через {{count}} недель",
    },
  }),

  xWeeks: buildLocalizeTokenFn({
    regular: {
      singularNominative: "{{count}} неделя",
      singularGenitive: "{{count}} недели",
      pluralGenitive: "{{count}} недель",
    },
  }),

  aboutXMonths: buildLocalizeTokenFn({
    regular: {
      singularNominative: "около {{count}} месяца",
      singularGenitive: "около {{count}} месяцев",
      pluralGenitive: "около {{count}} месяцев",
    },
    future: {
      singularNominative: "приблизительно через {{count}} месяц",
      singularGenitive: "приблизительно через {{count}} месяца",
      pluralGenitive: "приблизительно через {{count}} месяцев",
    },
  }),

  xMonths: buildLocalizeTokenFn({
    regular: {
      singularNominative: "{{count}} месяц",
      singularGenitive: "{{count}} месяца",
      pluralGenitive: "{{count}} месяцев",
    },
  }),

  aboutXYears: buildLocalizeTokenFn({
    regular: {
      singularNominative: "около {{count}} года",
      singularGenitive: "около {{count}} лет",
      pluralGenitive: "около {{count}} лет",
    },
    future: {
      singularNominative: "приблизительно через {{count}} год",
      singularGenitive: "приблизительно через {{count}} года",
      pluralGenitive: "приблизительно через {{count}} лет",
    },
  }),

  xYears: buildLocalizeTokenFn({
    regular: {
      singularNominative: "{{count}} год",
      singularGenitive: "{{count}} года",
      pluralGenitive: "{{count}} лет",
    },
  }),

  overXYears: buildLocalizeTokenFn({
    regular: {
      singularNominative: "больше {{count}} года",
      singularGenitive: "больше {{count}} лет",
      pluralGenitive: "больше {{count}} лет",
    },
    future: {
      singularNominative: "больше, чем через {{count}} год",
      singularGenitive: "больше, чем через {{count}} года",
      pluralGenitive: "больше, чем через {{count}} лет",
    },
  }),

  almostXYears: buildLocalizeTokenFn({
    regular: {
      singularNominative: "почти {{count}} год",
      singularGenitive: "почти {{count}} года",
      pluralGenitive: "почти {{count}} лет",
    },
    future: {
      singularNominative: "почти через {{count}} год",
      singularGenitive: "почти через {{count}} года",
      pluralGenitive: "почти через {{count}} лет",
    },
  }),
};

const formatDistance = (token, count, options) => {
  return formatDistanceLocale[token](count, options);
};


/***/ }),

/***/ "./node_modules/date-fns/locale/ru/_lib/formatLong.js":
/*!************************************************************!*\
  !*** ./node_modules/date-fns/locale/ru/_lib/formatLong.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatLong: () => (/* binding */ formatLong)
/* harmony export */ });
/* harmony import */ var _lib_buildFormatLongFn_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../_lib/buildFormatLongFn.js */ "./node_modules/date-fns/locale/_lib/buildFormatLongFn.js");


const dateFormats = {
  full: "EEEE, d MMMM y 'г.'",
  long: "d MMMM y 'г.'",
  medium: "d MMM y 'г.'",
  short: "dd.MM.y",
};

const timeFormats = {
  full: "H:mm:ss zzzz",
  long: "H:mm:ss z",
  medium: "H:mm:ss",
  short: "H:mm",
};

const dateTimeFormats = {
  any: "{{date}}, {{time}}",
};

const formatLong = {
  date: (0,_lib_buildFormatLongFn_js__WEBPACK_IMPORTED_MODULE_0__.buildFormatLongFn)({
    formats: dateFormats,
    defaultWidth: "full",
  }),

  time: (0,_lib_buildFormatLongFn_js__WEBPACK_IMPORTED_MODULE_0__.buildFormatLongFn)({
    formats: timeFormats,
    defaultWidth: "full",
  }),

  dateTime: (0,_lib_buildFormatLongFn_js__WEBPACK_IMPORTED_MODULE_0__.buildFormatLongFn)({
    formats: dateTimeFormats,
    defaultWidth: "any",
  }),
};


/***/ }),

/***/ "./node_modules/date-fns/locale/ru/_lib/formatRelative.js":
/*!****************************************************************!*\
  !*** ./node_modules/date-fns/locale/ru/_lib/formatRelative.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatRelative: () => (/* binding */ formatRelative)
/* harmony export */ });
/* harmony import */ var _isSameWeek_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../isSameWeek.js */ "./node_modules/date-fns/isSameWeek.js");


const accusativeWeekdays = [
  "воскресенье",
  "понедельник",
  "вторник",
  "среду",
  "четверг",
  "пятницу",
  "субботу",
];

function lastWeek(day) {
  const weekday = accusativeWeekdays[day];

  switch (day) {
    case 0:
      return "'в прошлое " + weekday + " в' p";
    case 1:
    case 2:
    case 4:
      return "'в прошлый " + weekday + " в' p";
    case 3:
    case 5:
    case 6:
      return "'в прошлую " + weekday + " в' p";
  }
}

function thisWeek(day) {
  const weekday = accusativeWeekdays[day];

  if (day === 2 /* Tue */) {
    return "'во " + weekday + " в' p";
  } else {
    return "'в " + weekday + " в' p";
  }
}

function nextWeek(day) {
  const weekday = accusativeWeekdays[day];

  switch (day) {
    case 0:
      return "'в следующее " + weekday + " в' p";
    case 1:
    case 2:
    case 4:
      return "'в следующий " + weekday + " в' p";
    case 3:
    case 5:
    case 6:
      return "'в следующую " + weekday + " в' p";
  }
}

const formatRelativeLocale = {
  lastWeek: (date, baseDate, options) => {
    const day = date.getDay();
    if ((0,_isSameWeek_js__WEBPACK_IMPORTED_MODULE_0__.isSameWeek)(date, baseDate, options)) {
      return thisWeek(day);
    } else {
      return lastWeek(day);
    }
  },
  yesterday: "'вчера в' p",
  today: "'сегодня в' p",
  tomorrow: "'завтра в' p",
  nextWeek: (date, baseDate, options) => {
    const day = date.getDay();
    if ((0,_isSameWeek_js__WEBPACK_IMPORTED_MODULE_0__.isSameWeek)(date, baseDate, options)) {
      return thisWeek(day);
    } else {
      return nextWeek(day);
    }
  },
  other: "P",
};

const formatRelative = (token, date, baseDate, options) => {
  const format = formatRelativeLocale[token];

  if (typeof format === "function") {
    return format(date, baseDate, options);
  }

  return format;
};


/***/ }),

/***/ "./node_modules/date-fns/locale/ru/_lib/localize.js":
/*!**********************************************************!*\
  !*** ./node_modules/date-fns/locale/ru/_lib/localize.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   localize: () => (/* binding */ localize)
/* harmony export */ });
/* harmony import */ var _lib_buildLocalizeFn_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../_lib/buildLocalizeFn.js */ "./node_modules/date-fns/locale/_lib/buildLocalizeFn.js");


const eraValues = {
  narrow: ["до н.э.", "н.э."],
  abbreviated: ["до н. э.", "н. э."],
  wide: ["до нашей эры", "нашей эры"],
};

const quarterValues = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["1-й кв.", "2-й кв.", "3-й кв.", "4-й кв."],
  wide: ["1-й квартал", "2-й квартал", "3-й квартал", "4-й квартал"],
};

const monthValues = {
  narrow: ["Я", "Ф", "М", "А", "М", "И", "И", "А", "С", "О", "Н", "Д"],
  abbreviated: [
    "янв.",
    "фев.",
    "март",
    "апр.",
    "май",
    "июнь",
    "июль",
    "авг.",
    "сент.",
    "окт.",
    "нояб.",
    "дек.",
  ],

  wide: [
    "январь",
    "февраль",
    "март",
    "апрель",
    "май",
    "июнь",
    "июль",
    "август",
    "сентябрь",
    "октябрь",
    "ноябрь",
    "декабрь",
  ],
};

const formattingMonthValues = {
  narrow: ["Я", "Ф", "М", "А", "М", "И", "И", "А", "С", "О", "Н", "Д"],
  abbreviated: [
    "янв.",
    "фев.",
    "мар.",
    "апр.",
    "мая",
    "июн.",
    "июл.",
    "авг.",
    "сент.",
    "окт.",
    "нояб.",
    "дек.",
  ],

  wide: [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ],
};

const dayValues = {
  narrow: ["В", "П", "В", "С", "Ч", "П", "С"],
  short: ["вс", "пн", "вт", "ср", "чт", "пт", "сб"],
  abbreviated: ["вск", "пнд", "втр", "срд", "чтв", "птн", "суб"],
  wide: [
    "воскресенье",
    "понедельник",
    "вторник",
    "среда",
    "четверг",
    "пятница",
    "суббота",
  ],
};

const dayPeriodValues = {
  narrow: {
    am: "ДП",
    pm: "ПП",
    midnight: "полн.",
    noon: "полд.",
    morning: "утро",
    afternoon: "день",
    evening: "веч.",
    night: "ночь",
  },
  abbreviated: {
    am: "ДП",
    pm: "ПП",
    midnight: "полн.",
    noon: "полд.",
    morning: "утро",
    afternoon: "день",
    evening: "веч.",
    night: "ночь",
  },
  wide: {
    am: "ДП",
    pm: "ПП",
    midnight: "полночь",
    noon: "полдень",
    morning: "утро",
    afternoon: "день",
    evening: "вечер",
    night: "ночь",
  },
};

const formattingDayPeriodValues = {
  narrow: {
    am: "ДП",
    pm: "ПП",
    midnight: "полн.",
    noon: "полд.",
    morning: "утра",
    afternoon: "дня",
    evening: "веч.",
    night: "ночи",
  },
  abbreviated: {
    am: "ДП",
    pm: "ПП",
    midnight: "полн.",
    noon: "полд.",
    morning: "утра",
    afternoon: "дня",
    evening: "веч.",
    night: "ночи",
  },
  wide: {
    am: "ДП",
    pm: "ПП",
    midnight: "полночь",
    noon: "полдень",
    morning: "утра",
    afternoon: "дня",
    evening: "вечера",
    night: "ночи",
  },
};

const ordinalNumber = (dirtyNumber, options) => {
  const number = Number(dirtyNumber);
  const unit = options?.unit;

  let suffix;
  if (unit === "date") {
    suffix = "-е";
  } else if (unit === "week" || unit === "minute" || unit === "second") {
    suffix = "-я";
  } else {
    suffix = "-й";
  }

  return number + suffix;
};

const localize = {
  ordinalNumber,

  era: (0,_lib_buildLocalizeFn_js__WEBPACK_IMPORTED_MODULE_0__.buildLocalizeFn)({
    values: eraValues,
    defaultWidth: "wide",
  }),

  quarter: (0,_lib_buildLocalizeFn_js__WEBPACK_IMPORTED_MODULE_0__.buildLocalizeFn)({
    values: quarterValues,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1,
  }),

  month: (0,_lib_buildLocalizeFn_js__WEBPACK_IMPORTED_MODULE_0__.buildLocalizeFn)({
    values: monthValues,
    defaultWidth: "wide",
    formattingValues: formattingMonthValues,
    defaultFormattingWidth: "wide",
  }),

  day: (0,_lib_buildLocalizeFn_js__WEBPACK_IMPORTED_MODULE_0__.buildLocalizeFn)({
    values: dayValues,
    defaultWidth: "wide",
  }),

  dayPeriod: (0,_lib_buildLocalizeFn_js__WEBPACK_IMPORTED_MODULE_0__.buildLocalizeFn)({
    values: dayPeriodValues,
    defaultWidth: "any",
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: "wide",
  }),
};


/***/ }),

/***/ "./node_modules/date-fns/locale/ru/_lib/match.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/locale/ru/_lib/match.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   match: () => (/* binding */ match)
/* harmony export */ });
/* harmony import */ var _lib_buildMatchFn_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../_lib/buildMatchFn.js */ "./node_modules/date-fns/locale/_lib/buildMatchFn.js");
/* harmony import */ var _lib_buildMatchPatternFn_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_lib/buildMatchPatternFn.js */ "./node_modules/date-fns/locale/_lib/buildMatchPatternFn.js");



const matchOrdinalNumberPattern = /^(\d+)(-?(е|я|й|ое|ье|ая|ья|ый|ой|ий|ый))?/i;
const parseOrdinalNumberPattern = /\d+/i;

const matchEraPatterns = {
  narrow: /^((до )?н\.?\s?э\.?)/i,
  abbreviated: /^((до )?н\.?\s?э\.?)/i,
  wide: /^(до нашей эры|нашей эры|наша эра)/i,
};
const parseEraPatterns = {
  any: [/^д/i, /^н/i],
};

const matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234](-?[ыои]?й?)? кв.?/i,
  wide: /^[1234](-?[ыои]?й?)? квартал/i,
};

const parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i],
};

const matchMonthPatterns = {
  narrow: /^[яфмаисонд]/i,
  abbreviated:
    /^(янв|фев|март?|апр|ма[йя]|июн[ья]?|июл[ья]?|авг|сент?|окт|нояб?|дек)\.?/i,
  wide: /^(январ[ья]|феврал[ья]|марта?|апрел[ья]|ма[йя]|июн[ья]|июл[ья]|августа?|сентябр[ья]|октябр[ья]|октябр[ья]|ноябр[ья]|декабр[ья])/i,
};

const parseMonthPatterns = {
  narrow: [
    /^я/i,
    /^ф/i,
    /^м/i,
    /^а/i,
    /^м/i,
    /^и/i,
    /^и/i,
    /^а/i,
    /^с/i,
    /^о/i,
    /^н/i,
    /^я/i,
  ],

  any: [
    /^я/i,
    /^ф/i,
    /^мар/i,
    /^ап/i,
    /^ма[йя]/i,
    /^июн/i,
    /^июл/i,
    /^ав/i,
    /^с/i,
    /^о/i,
    /^н/i,
    /^д/i,
  ],
};

const matchDayPatterns = {
  narrow: /^[впсч]/i,
  short: /^(вс|во|пн|по|вт|ср|чт|че|пт|пя|сб|су)\.?/i,
  abbreviated: /^(вск|вос|пнд|пон|втр|вто|срд|сре|чтв|чет|птн|пят|суб).?/i,
  wide: /^(воскресень[ея]|понедельника?|вторника?|сред[аы]|четверга?|пятниц[аы]|суббот[аы])/i,
};

const parseDayPatterns = {
  narrow: [/^в/i, /^п/i, /^в/i, /^с/i, /^ч/i, /^п/i, /^с/i],
  any: [/^в[ос]/i, /^п[он]/i, /^в/i, /^ср/i, /^ч/i, /^п[ят]/i, /^с[уб]/i],
};

const matchDayPeriodPatterns = {
  narrow: /^([дп]п|полн\.?|полд\.?|утр[оа]|день|дня|веч\.?|ноч[ьи])/i,
  abbreviated: /^([дп]п|полн\.?|полд\.?|утр[оа]|день|дня|веч\.?|ноч[ьи])/i,
  wide: /^([дп]п|полночь|полдень|утр[оа]|день|дня|вечера?|ноч[ьи])/i,
};

const parseDayPeriodPatterns = {
  any: {
    am: /^дп/i,
    pm: /^пп/i,
    midnight: /^полн/i,
    noon: /^полд/i,
    morning: /^у/i,
    afternoon: /^д[ен]/i,
    evening: /^в/i,
    night: /^н/i,
  },
};

const match = {
  ordinalNumber: (0,_lib_buildMatchPatternFn_js__WEBPACK_IMPORTED_MODULE_1__.buildMatchPatternFn)({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: (value) => parseInt(value, 10),
  }),

  era: (0,_lib_buildMatchFn_js__WEBPACK_IMPORTED_MODULE_0__.buildMatchFn)({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns,
    defaultParseWidth: "any",
  }),

  quarter: (0,_lib_buildMatchFn_js__WEBPACK_IMPORTED_MODULE_0__.buildMatchFn)({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1,
  }),

  month: (0,_lib_buildMatchFn_js__WEBPACK_IMPORTED_MODULE_0__.buildMatchFn)({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: "any",
  }),

  day: (0,_lib_buildMatchFn_js__WEBPACK_IMPORTED_MODULE_0__.buildMatchFn)({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns,
    defaultParseWidth: "any",
  }),

  dayPeriod: (0,_lib_buildMatchFn_js__WEBPACK_IMPORTED_MODULE_0__.buildMatchFn)({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: "any",
  }),
};


/***/ }),

/***/ "./node_modules/date-fns/startOfWeek.js":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/startOfWeek.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   startOfWeek: () => (/* binding */ startOfWeek)
/* harmony export */ });
/* harmony import */ var _lib_defaultOptions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_lib/defaultOptions.js */ "./node_modules/date-fns/_lib/defaultOptions.js");
/* harmony import */ var _toDate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toDate.js */ "./node_modules/date-fns/toDate.js");



/**
 * The {@link startOfWeek} function options.
 */

/**
 * @name startOfWeek
 * @category Week Helpers
 * @summary Return the start of a week for the given date.
 *
 * @description
 * Return the start of a week for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of a week
 *
 * @example
 * // The start of a week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfWeek(date, options) {
  const defaultOptions = (0,_lib_defaultOptions_js__WEBPACK_IMPORTED_MODULE_0__.getDefaultOptions)();
  const weekStartsOn =
    options?.weekStartsOn ??
    options?.locale?.options?.weekStartsOn ??
    defaultOptions.weekStartsOn ??
    defaultOptions.locale?.options?.weekStartsOn ??
    0;

  const _date = (0,_toDate_js__WEBPACK_IMPORTED_MODULE_1__.toDate)(date, options?.in);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;

  _date.setDate(_date.getDate() - diff);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (startOfWeek);


/***/ }),

/***/ "./node_modules/date-fns/toDate.js":
/*!*****************************************!*\
  !*** ./node_modules/date-fns/toDate.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   toDate: () => (/* binding */ toDate)
/* harmony export */ });
/* harmony import */ var _constructFrom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constructFrom.js */ "./node_modules/date-fns/constructFrom.js");


/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * Starting from v3.7.0, it clones a date using `[Symbol.for("constructDateFrom")]`
 * enabling to transfer extra properties from the reference date to the new date.
 * It's useful for extensions like [`TZDate`](https://github.com/date-fns/tz)
 * that accept a time zone as a constructor argument.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param argument - The value to convert
 *
 * @returns The parsed date in the local time zone
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */
function toDate(argument, context) {
  // [TODO] Get rid of `toDate` or `constructFrom`?
  return (0,_constructFrom_js__WEBPACK_IMPORTED_MODULE_0__.constructFrom)(context || argument, argument);
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toDate);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./routes.js":
/*!*******************!*\
  !*** ./routes.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ADD_POSTS_PAGE: () => (/* binding */ ADD_POSTS_PAGE),
/* harmony export */   AUTH_PAGE: () => (/* binding */ AUTH_PAGE),
/* harmony export */   LOADING_PAGE: () => (/* binding */ LOADING_PAGE),
/* harmony export */   POSTS_PAGE: () => (/* binding */ POSTS_PAGE),
/* harmony export */   USER_POSTS_PAGE: () => (/* binding */ USER_POSTS_PAGE)
/* harmony export */ });
/* Файл со списком страниц приложения */
const POSTS_PAGE = "posts";
const USER_POSTS_PAGE = "user-posts";
const AUTH_PAGE = "auth";
const ADD_POSTS_PAGE = "add-post";
const LOADING_PAGE = "loading";


/***/ }),

/***/ "./styles.css":
/*!********************!*\
  !*** ./styles.css ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !./node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !./node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !./node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !./node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!./node_modules/css-loader/dist/cjs.js!./styles.css */ "./node_modules/css-loader/dist/cjs.js!./styles.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./ui-kit.css":
/*!********************!*\
  !*** ./ui-kit.css ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !./node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !./node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !./node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !./node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ui_kit_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!./node_modules/css-loader/dist/cjs.js!./ui-kit.css */ "./node_modules/css-loader/dist/cjs.js!./ui-kit.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ui_kit_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ui_kit_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_ui_kit_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_ui_kit_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "data:image/svg+xml,%3Csvg id=%27Layer_1%27 data-name=%27Layer 1%27 xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 122.88 122.88%27%3E%3Ctitle%3Eadd%3C/title%3E%3Cpath d=%27M61.44,0A61.46,61.46,0,1,1,18,18,61.25,61.25,0,0,1,61.44,0ZM88.6,56.82v9.24a4,4,0,0,1-4,4H70V84.62a4,4,0,0,1-4,4H56.82a4,4,0,0,1-4-4V70H38.26a4,4,0,0,1-4-4V56.82a4,4,0,0,1,4-4H52.84V38.26a4,4,0,0,1,4-4h9.24a4,4,0,0,1,4,4V52.84H84.62a4,4,0,0,1,4,4Zm8.83-31.37a50.92,50.92,0,1,0,14.9,36,50.78,50.78,0,0,0-14.9-36Z%27/%3E%3C/svg%3E":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml,%3Csvg id=%27Layer_1%27 data-name=%27Layer 1%27 xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 122.88 122.88%27%3E%3Ctitle%3Eadd%3C/title%3E%3Cpath d=%27M61.44,0A61.46,61.46,0,1,1,18,18,61.25,61.25,0,0,1,61.44,0ZM88.6,56.82v9.24a4,4,0,0,1-4,4H70V84.62a4,4,0,0,1-4,4H56.82a4,4,0,0,1-4-4V70H38.26a4,4,0,0,1-4-4V56.82a4,4,0,0,1,4-4H52.84V38.26a4,4,0,0,1,4-4h9.24a4,4,0,0,1,4,4V52.84H84.62a4,4,0,0,1,4,4Zm8.83-31.37a50.92,50.92,0,1,0,14.9,36,50.78,50.78,0,0,0-14.9-36Z%27/%3E%3C/svg%3E ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml,%3Csvg id=%27Layer_1%27 data-name=%27Layer 1%27 xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 122.88 122.88%27%3E%3Ctitle%3Eadd%3C/title%3E%3Cpath d=%27M61.44,0A61.46,61.46,0,1,1,18,18,61.25,61.25,0,0,1,61.44,0ZM88.6,56.82v9.24a4,4,0,0,1-4,4H70V84.62a4,4,0,0,1-4,4H56.82a4,4,0,0,1-4-4V70H38.26a4,4,0,0,1-4-4V56.82a4,4,0,0,1,4-4H52.84V38.26a4,4,0,0,1,4-4h9.24a4,4,0,0,1,4,4V52.84H84.62a4,4,0,0,1,4,4Zm8.83-31.37a50.92,50.92,0,1,0,14.9,36,50.78,50.78,0,0,0-14.9-36Z%27/%3E%3C/svg%3E";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/^blob:/, "").replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = (typeof document !== 'undefined' && document.baseURI) || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEIsbUNBQW1DO0FBQzdEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sNkVBQTZFLFVBQVUsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLFVBQVUsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLFdBQVcsWUFBWSxhQUFhLFdBQVcsT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxVQUFVLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLFdBQVcsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxZQUFZ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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxtQ0FBbUM7QUFDaEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsbUNBQW1DO0FBQ2hEOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLG1DQUFtQztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sK0VBQStFLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxXQUFXLFVBQVUsWUFBWSxPQUFPLFlBQVksTUFBTSxVQUFVLE1BQU0sS0FBSyxVQUFVLE1BQU0sTUFBTSxVQUFVLFlBQVksV0FBVyxZQUFZLGFBQWEsYUFBYSxXQUFXLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksV0FBVyxVQUFVLE9BQU8sS0FBSyxZQUFZLE9BQU8sTUFBTSxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxVQUFVLFlBQVksYUFBYSxXQUFXLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxP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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQOztBQUVBLE9BQU8sd0VBQWU7QUFDdEI7QUFDQTtBQUNBLEdBQUc7O0FBRUgsV0FBVyx3RUFBZTtBQUMxQjtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVILFNBQVMsd0VBQWU7QUFDeEI7QUFDQTtBQUNBLEdBQUc7O0FBRUgsT0FBTyx3RUFBZTtBQUN0QjtBQUNBO0FBQ0EsR0FBRzs7QUFFSCxhQUFhLHdFQUFlO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7Ozs7Ozs7Ozs7OztBQzFMMEQ7QUFDYzs7QUFFeEU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFTztBQUNQLGlCQUFpQixnRkFBbUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSCxPQUFPLGtFQUFZO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSCxXQUFXLGtFQUFZO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVILFNBQVMsa0VBQVk7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVILE9BQU8sa0VBQVk7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVILGFBQWEsa0VBQVk7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25JNkQ7QUFDUjtBQUNRO0FBQ1o7QUFDTjs7QUFFM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQSxrQkFBa0IscUVBQWM7QUFDaEMsY0FBYyw2REFBVTtBQUN4QixrQkFBa0IscUVBQWM7QUFDaEMsWUFBWSx5REFBUTtBQUNwQixTQUFTLG1EQUFLO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0EsaUVBQWUsRUFBRSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUM1QmxCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0RBQWdELE9BQU87O0FBRXZEO0FBQ0EsSUFBSTtBQUNKLDhDQUE4QyxPQUFPOztBQUVyRDtBQUNBLElBQUk7QUFDSiw0Q0FBNEMsT0FBTztBQUNuRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLFFBQVE7QUFDNUMsa0NBQWtDLFFBQVE7QUFDMUMsZ0NBQWdDLFFBQVE7QUFDeEMsS0FBSztBQUNMO0FBQ0E7QUFDQSwrQ0FBK0MsUUFBUTtBQUN2RCw2Q0FBNkMsUUFBUTtBQUNyRCwyQ0FBMkMsUUFBUTtBQUNuRCxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsNkJBQTZCLFFBQVE7QUFDckMsMkJBQTJCLFFBQVE7QUFDbkMseUJBQXlCLFFBQVE7QUFDakMsS0FBSztBQUNMO0FBQ0EsNkJBQTZCLFFBQVE7QUFDckMsMkJBQTJCLFFBQVE7QUFDbkMseUJBQXlCLFFBQVE7QUFDakMsS0FBSztBQUNMO0FBQ0EsbUNBQW1DLFFBQVE7QUFDM0MsaUNBQWlDLFFBQVE7QUFDekMsK0JBQStCLFFBQVE7QUFDdkMsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsUUFBUTtBQUM1QyxrQ0FBa0MsUUFBUTtBQUMxQyxnQ0FBZ0MsUUFBUTtBQUN4QyxLQUFLO0FBQ0w7QUFDQTtBQUNBLCtDQUErQyxRQUFRO0FBQ3ZELDZDQUE2QyxRQUFRO0FBQ3JELDJDQUEyQyxRQUFRO0FBQ25ELEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQSw2QkFBNkIsUUFBUTtBQUNyQywyQkFBMkIsUUFBUTtBQUNuQyx5QkFBeUIsUUFBUTtBQUNqQyxLQUFLO0FBQ0w7QUFDQSw2QkFBNkIsUUFBUTtBQUNyQywyQkFBMkIsUUFBUTtBQUNuQyx5QkFBeUIsUUFBUTtBQUNqQyxLQUFLO0FBQ0w7QUFDQSxtQ0FBbUMsUUFBUTtBQUMzQyxpQ0FBaUMsUUFBUTtBQUN6QywrQkFBK0IsUUFBUTtBQUN2QyxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsbUNBQW1DLFFBQVE7QUFDM0MsaUNBQWlDLFFBQVE7QUFDekMsK0JBQStCLFFBQVE7QUFDdkMsS0FBSztBQUNMO0FBQ0Esa0RBQWtELFFBQVE7QUFDMUQsZ0RBQWdELFFBQVE7QUFDeEQsOENBQThDLFFBQVE7QUFDdEQsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBLDZCQUE2QixRQUFRO0FBQ3JDLDJCQUEyQixRQUFRO0FBQ25DLHlCQUF5QixRQUFRO0FBQ2pDLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQSw2QkFBNkIsUUFBUTtBQUNyQywyQkFBMkIsUUFBUTtBQUNuQyx5QkFBeUIsUUFBUTtBQUNqQyxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsbUNBQW1DLFFBQVE7QUFDM0MsaUNBQWlDLFFBQVE7QUFDekMsK0JBQStCLFFBQVE7QUFDdkMsS0FBSztBQUNMO0FBQ0Esa0RBQWtELFFBQVE7QUFDMUQsZ0RBQWdELFFBQVE7QUFDeEQsOENBQThDLFFBQVE7QUFDdEQsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBLDZCQUE2QixRQUFRO0FBQ3JDLDJCQUEyQixRQUFRO0FBQ25DLHlCQUF5QixRQUFRO0FBQ2pDLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQSxtQ0FBbUMsUUFBUTtBQUMzQyxpQ0FBaUMsUUFBUTtBQUN6QywrQkFBK0IsUUFBUTtBQUN2QyxLQUFLO0FBQ0w7QUFDQSxrREFBa0QsUUFBUTtBQUMxRCxnREFBZ0QsUUFBUTtBQUN4RCw4Q0FBOEMsUUFBUTtBQUN0RCxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsNkJBQTZCLFFBQVE7QUFDckMsMkJBQTJCLFFBQVE7QUFDbkMseUJBQXlCLFFBQVE7QUFDakMsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBLG1DQUFtQyxRQUFRO0FBQzNDLGlDQUFpQyxRQUFRO0FBQ3pDLCtCQUErQixRQUFRO0FBQ3ZDLEtBQUs7QUFDTDtBQUNBLGtEQUFrRCxRQUFRO0FBQzFELGdEQUFnRCxRQUFRO0FBQ3hELDhDQUE4QyxRQUFRO0FBQ3RELEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQSw2QkFBNkIsUUFBUTtBQUNyQywyQkFBMkIsUUFBUTtBQUNuQyx5QkFBeUIsUUFBUTtBQUNqQyxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBO0FBQ0Esb0NBQW9DLFFBQVE7QUFDNUMsa0NBQWtDLFFBQVE7QUFDMUMsZ0NBQWdDLFFBQVE7QUFDeEMsS0FBSztBQUNMO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQsNkNBQTZDLFFBQVE7QUFDckQsMkNBQTJDLFFBQVE7QUFDbkQsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBLG1DQUFtQyxRQUFRO0FBQzNDLGlDQUFpQyxRQUFRO0FBQ3pDLCtCQUErQixRQUFRO0FBQ3ZDLEtBQUs7QUFDTDtBQUNBLHlDQUF5QyxRQUFRO0FBQ2pELHVDQUF1QyxRQUFRO0FBQy9DLHFDQUFxQyxRQUFRO0FBQzdDLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRU87QUFDUDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDclBvRTs7QUFFcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVUsTUFBTSxJQUFJLE1BQU07QUFDMUI7O0FBRU87QUFDUCxRQUFRLDRFQUFpQjtBQUN6QjtBQUNBO0FBQ0EsR0FBRzs7QUFFSCxRQUFRLDRFQUFpQjtBQUN6QjtBQUNBO0FBQ0EsR0FBRzs7QUFFSCxZQUFZLDRFQUFpQjtBQUM3QjtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7Ozs7Ozs7Ozs7O0FDbkNvRDs7QUFFcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsMERBQVU7QUFDbEI7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSwwREFBVTtBQUNsQjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZGZ0U7O0FBRWhFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBOztBQUVPO0FBQ1A7O0FBRUEsT0FBTyx3RUFBZTtBQUN0QjtBQUNBO0FBQ0EsR0FBRzs7QUFFSCxXQUFXLHdFQUFlO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUgsU0FBUyx3RUFBZTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUgsT0FBTyx3RUFBZTtBQUN0QjtBQUNBO0FBQ0EsR0FBRzs7QUFFSCxhQUFhLHdFQUFlO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2pOMEQ7QUFDYzs7QUFFeEU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVPO0FBQ1AsaUJBQWlCLGdGQUFtQjtBQUNwQztBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVILE9BQU8sa0VBQVk7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVILFdBQVcsa0VBQVk7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUgsU0FBUyxrRUFBWTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUgsT0FBTyxrRUFBWTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUgsYUFBYSxrRUFBWTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekk2RDtBQUN4Qjs7QUFFckM7QUFDQSxRQUFRLG1CQUFtQjtBQUMzQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBaUUsaUJBQWlCO0FBQ2xGO0FBQ0E7QUFDTztBQUNQLHlCQUF5Qix5RUFBaUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdCQUFnQixrREFBTTtBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUVBQWUsV0FBVyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3JEd0I7O0FBRW5EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0EsU0FBUyxnRUFBYTtBQUN0Qjs7QUFFQTtBQUNBLGlFQUFlLE1BQU0sRUFBQzs7Ozs7Ozs7Ozs7QUM5Q1Q7O0FBRWI7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLHdCQUF3QjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixpQkFBaUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiw0QkFBNEI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiw2QkFBNkI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7OztBQ25GYTs7QUFFYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0M7Ozs7Ozs7Ozs7QUNqQ2E7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQzs7Ozs7Ozs7OztBQ1RhOztBQUViO0FBQ0E7QUFDQSxjQUFjLEtBQXdDLEdBQUcsc0JBQWlCLEdBQUcsQ0FBSTtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEOzs7Ozs7Ozs7O0FDVGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0Q7QUFDbEQ7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQSxpRkFBaUY7QUFDakY7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSx5REFBeUQ7QUFDekQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0I7Ozs7Ozs7Ozs7QUM1RGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2JBO0FBQ087QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKUCxNQUE4RjtBQUM5RixNQUFvRjtBQUNwRixNQUEyRjtBQUMzRixNQUE4RztBQUM5RyxNQUF1RztBQUN2RyxNQUF1RztBQUN2RyxNQUFtRztBQUNuRztBQUNBOztBQUVBOztBQUVBLDRCQUE0QixxR0FBbUI7QUFDL0Msd0JBQXdCLGtIQUFhO0FBQ3JDLGlCQUFpQix1R0FBYTtBQUM5QixpQkFBaUIsK0ZBQU07QUFDdkIsNkJBQTZCLHNHQUFrQjs7QUFFL0MsYUFBYSwwR0FBRyxDQUFDLHVGQUFPOzs7O0FBSTZDO0FBQ3JFLE9BQU8saUVBQWUsdUZBQU8sSUFBSSx1RkFBTyxVQUFVLHVGQUFPLG1CQUFtQixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZCN0UsTUFBOEY7QUFDOUYsTUFBb0Y7QUFDcEYsTUFBMkY7QUFDM0YsTUFBOEc7QUFDOUcsTUFBdUc7QUFDdkcsTUFBdUc7QUFDdkcsTUFBbUc7QUFDbkc7QUFDQTs7QUFFQTs7QUFFQSw0QkFBNEIscUdBQW1CO0FBQy9DLHdCQUF3QixrSEFBYTtBQUNyQyxpQkFBaUIsdUdBQWE7QUFDOUIsaUJBQWlCLCtGQUFNO0FBQ3ZCLDZCQUE2QixzR0FBa0I7O0FBRS9DLGFBQWEsMEdBQUcsQ0FBQyx1RkFBTzs7OztBQUk2QztBQUNyRSxPQUFPLGlFQUFlLHVGQUFPLElBQUksdUZBQU8sVUFBVSx1RkFBTyxtQkFBbUIsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7VUN4QjdFO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7Ozs7V0N6QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0EsRTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUMsSTs7Ozs7V0NQRCx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0QsRTs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxrQzs7Ozs7V0NsQkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBLG9COzs7OztXQ3JCQSxtQzs7Ozs7VUVBQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby8uL2FwaS5qcyIsIndlYnBhY2s6Ly93ZWJkZXYtY3ctaW5zdGFwcm8vLi9jb21wb25lbnRzL2FkZC1wb3N0LXBhZ2UtY29tcG9uZW50LmpzIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby8uL2NvbXBvbmVudHMvYXV0aC1wYWdlLWNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly93ZWJkZXYtY3ctaW5zdGFwcm8vLi9jb21wb25lbnRzL2hlYWRlci1jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vd2ViZGV2LWN3LWluc3RhcHJvLy4vY29tcG9uZW50cy9sb2FkaW5nLXBhZ2UtY29tcG9uZW50LmpzIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby8uL2NvbXBvbmVudHMvcG9zdHMtcGFnZS1jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vd2ViZGV2LWN3LWluc3RhcHJvLy4vY29tcG9uZW50cy91cGxvYWQtaW1hZ2UtY29tcG9uZW50LmpzIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby8uL2NvbXBvbmVudHMvdXNlci1wb3N0cy1wYWdlLWNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly93ZWJkZXYtY3ctaW5zdGFwcm8vLi9oZWxwZXJzLmpzIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby8uL2luZGV4LmpzIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby8uL3N0eWxlcy5jc3MiLCJ3ZWJwYWNrOi8vd2ViZGV2LWN3LWluc3RhcHJvLy4vdWkta2l0LmNzcyIsIndlYnBhY2s6Ly93ZWJkZXYtY3ctaW5zdGFwcm8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vd2ViZGV2LWN3LWluc3RhcHJvLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vd2ViZGV2LWN3LWluc3RhcHJvLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL19saWIvZGVmYXVsdE9wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vd2ViZGV2LWN3LWluc3RhcHJvLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL19saWIvZ2V0Um91bmRpbmdNZXRob2QuanMiLCJ3ZWJwYWNrOi8vd2ViZGV2LWN3LWluc3RhcHJvLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL19saWIvZ2V0VGltZXpvbmVPZmZzZXRJbk1pbGxpc2Vjb25kcy5qcyIsIndlYnBhY2s6Ly93ZWJkZXYtY3ctaW5zdGFwcm8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvX2xpYi9ub3JtYWxpemVEYXRlcy5qcyIsIndlYnBhY2s6Ly93ZWJkZXYtY3ctaW5zdGFwcm8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvY29tcGFyZUFzYy5qcyIsIndlYnBhY2s6Ly93ZWJkZXYtY3ctaW5zdGFwcm8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvY29uc3RhbnRzLmpzIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9jb25zdHJ1Y3RGcm9tLmpzIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9jb25zdHJ1Y3ROb3cuanMiLCJ3ZWJwYWNrOi8vd2ViZGV2LWN3LWluc3RhcHJvLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2RpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzLmpzIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9kaWZmZXJlbmNlSW5NaWxsaXNlY29uZHMuanMiLCJ3ZWJwYWNrOi8vd2ViZGV2LWN3LWluc3RhcHJvLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2RpZmZlcmVuY2VJbk1vbnRocy5qcyIsIndlYnBhY2s6Ly93ZWJkZXYtY3ctaW5zdGFwcm8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZGlmZmVyZW5jZUluU2Vjb25kcy5qcyIsIndlYnBhY2s6Ly93ZWJkZXYtY3ctaW5zdGFwcm8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZW5kT2ZEYXkuanMiLCJ3ZWJwYWNrOi8vd2ViZGV2LWN3LWluc3RhcHJvLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VuZE9mTW9udGguanMiLCJ3ZWJwYWNrOi8vd2ViZGV2LWN3LWluc3RhcHJvLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2Zvcm1hdERpc3RhbmNlLmpzIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9mb3JtYXREaXN0YW5jZVRvTm93LmpzIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9pc0xhc3REYXlPZk1vbnRoLmpzIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9pc1NhbWVXZWVrLmpzIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sb2NhbGUvX2xpYi9idWlsZEZvcm1hdExvbmdGbi5qcyIsIndlYnBhY2s6Ly93ZWJkZXYtY3ctaW5zdGFwcm8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvbG9jYWxlL19saWIvYnVpbGRMb2NhbGl6ZUZuLmpzIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sb2NhbGUvX2xpYi9idWlsZE1hdGNoRm4uanMiLCJ3ZWJwYWNrOi8vd2ViZGV2LWN3LWluc3RhcHJvLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2xvY2FsZS9fbGliL2J1aWxkTWF0Y2hQYXR0ZXJuRm4uanMiLCJ3ZWJwYWNrOi8vd2ViZGV2LWN3LWluc3RhcHJvLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2xvY2FsZS9lbi1VUy5qcyIsIndlYnBhY2s6Ly93ZWJkZXYtY3ctaW5zdGFwcm8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvbG9jYWxlL2VuLVVTL19saWIvZm9ybWF0RGlzdGFuY2UuanMiLCJ3ZWJwYWNrOi8vd2ViZGV2LWN3LWluc3RhcHJvLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2xvY2FsZS9lbi1VUy9fbGliL2Zvcm1hdExvbmcuanMiLCJ3ZWJwYWNrOi8vd2ViZGV2LWN3LWluc3RhcHJvLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2xvY2FsZS9lbi1VUy9fbGliL2Zvcm1hdFJlbGF0aXZlLmpzIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sb2NhbGUvZW4tVVMvX2xpYi9sb2NhbGl6ZS5qcyIsIndlYnBhY2s6Ly93ZWJkZXYtY3ctaW5zdGFwcm8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvbG9jYWxlL2VuLVVTL19saWIvbWF0Y2guanMiLCJ3ZWJwYWNrOi8vd2ViZGV2LWN3LWluc3RhcHJvLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2xvY2FsZS9ydS5qcyIsIndlYnBhY2s6Ly93ZWJkZXYtY3ctaW5zdGFwcm8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvbG9jYWxlL3J1L19saWIvZm9ybWF0RGlzdGFuY2UuanMiLCJ3ZWJwYWNrOi8vd2ViZGV2LWN3LWluc3RhcHJvLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2xvY2FsZS9ydS9fbGliL2Zvcm1hdExvbmcuanMiLCJ3ZWJwYWNrOi8vd2ViZGV2LWN3LWluc3RhcHJvLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2xvY2FsZS9ydS9fbGliL2Zvcm1hdFJlbGF0aXZlLmpzIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sb2NhbGUvcnUvX2xpYi9sb2NhbGl6ZS5qcyIsIndlYnBhY2s6Ly93ZWJkZXYtY3ctaW5zdGFwcm8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvbG9jYWxlL3J1L19saWIvbWF0Y2guanMiLCJ3ZWJwYWNrOi8vd2ViZGV2LWN3LWluc3RhcHJvLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3N0YXJ0T2ZXZWVrLmpzIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy90b0RhdGUuanMiLCJ3ZWJwYWNrOi8vd2ViZGV2LWN3LWluc3RhcHJvLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vd2ViZGV2LWN3LWluc3RhcHJvLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly93ZWJkZXYtY3ctaW5zdGFwcm8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly93ZWJkZXYtY3ctaW5zdGFwcm8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly93ZWJkZXYtY3ctaW5zdGFwcm8vLi9yb3V0ZXMuanMiLCJ3ZWJwYWNrOi8vd2ViZGV2LWN3LWluc3RhcHJvLy4vc3R5bGVzLmNzcz8xNzBmIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby8uL3VpLWtpdC5jc3M/MmE5NiIsIndlYnBhY2s6Ly93ZWJkZXYtY3ctaW5zdGFwcm8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2ViZGV2LWN3LWluc3RhcHJvL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2ViZGV2LWN3LWluc3RhcHJvL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vd2ViZGV2LWN3LWluc3RhcHJvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2ViZGV2LWN3LWluc3RhcHJvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2ViZGV2LWN3LWluc3RhcHJvL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly93ZWJkZXYtY3ctaW5zdGFwcm8vd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vd2ViZGV2LWN3LWluc3RhcHJvL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBwZXJzb25hbEtleSA9IFwiZGlhbmExMjN0ZXN0XCI7XG5jb25zdCBiYXNlSG9zdCA9IFwiaHR0cHM6Ly93ZWRldi1hcGkuc2t5LnByby9hcGkvdjFcIjtcbmNvbnN0IHBvc3RzSG9zdCA9IGAke2Jhc2VIb3N0fS8ke3BlcnNvbmFsS2V5fS9pbnN0YXByb2A7XG5cbi8v0J/QvtC70YPRh9C10L3QuNC1INC/0L7RgdGC0L7QslxuZXhwb3J0IGZ1bmN0aW9uIGdldFBvc3RzKCkge1xuICByZXR1cm4gZmV0Y2gocG9zdHNIb3N0LCB7IG1ldGhvZDogXCJHRVRcIiB9KVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgIC50aGVuKChkYXRhKSA9PiBkYXRhLnBvc3RzKTtcbn1cblxuLy/QoNC10LPQuNGB0YLRgNCw0YbQuNGPINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRj1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyVXNlcih7IGxvZ2luLCBwYXNzd29yZCwgbmFtZSwgaW1hZ2VVcmwgfSkge1xuICByZXR1cm4gZmV0Y2goYmFzZUhvc3QgKyBcIi9hcGkvdXNlclwiLCB7XG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGxvZ2luLCBwYXNzd29yZCwgbmFtZSwgaW1hZ2VVcmwgfSksXG4gIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCLQotCw0LrQvtC5INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjCDRg9C20LUg0YHRg9GJ0LXRgdGC0LLRg9C10YJcIik7XG4gICAgfVxuICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gIH0pO1xufVxuXG4vL9CS0YXQvtC0INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRj1xuZXhwb3J0IGZ1bmN0aW9uIGxvZ2luVXNlcih7IGxvZ2luLCBwYXNzd29yZCB9KSB7XG4gIHJldHVybiBmZXRjaChiYXNlSG9zdCArIFwiL2FwaS91c2VyL2xvZ2luXCIsIHtcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgbG9naW4sIHBhc3N3b3JkIH0pLFxuICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDQwMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwi0J3QtdCy0LXRgNC90YvQuSDQu9C+0LPQuNC9INC40LvQuCDQv9Cw0YDQvtC70YxcIik7XG4gICAgfVxuICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gIH0pO1xufVxuXG4vL9CX0LDQs9GA0YPQt9C60LAg0LjQt9C+0LHRgNCw0LbQtdC90LjRj1xuZXhwb3J0IGZ1bmN0aW9uIHVwbG9hZEltYWdlKHsgZmlsZSB9KSB7XG4gIGNvbnN0IGRhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgZGF0YS5hcHBlbmQoXCJmaWxlXCIsIGZpbGUpO1xuXG4gIHJldHVybiBmZXRjaChiYXNlSG9zdCArIFwiL2FwaS91cGxvYWQvaW1hZ2VcIiwge1xuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgYm9keTogZGF0YSxcbiAgfSlcbiAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCLQntGC0LLQtdGCIEFQSSDQv9GA0Lgg0LfQsNCz0YDRg9C30LrQtSDQutCw0YDRgtC40L3QutC4OlwiLCBkYXRhKTtcbiAgICAgIHJldHVybiB7IHVybDogZGF0YS5maWxlVXJsIH07XG4gICAgfSk7XG59XG5cbi8v0JTQvtCx0LDQstC70LXQvdC40LUg0L/QvtGB0YLQsFxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFBvc3QoeyBkZXNjcmlwdGlvbiwgaW1hZ2VVcmwsIHRva2VuIH0pIHtcbiAgY29uc3QgYm9keSA9IHsgZGVzY3JpcHRpb24sIGltYWdlVXJsIH07XG5cbiAgY29uc29sZS5sb2coXCLwn5OmINCk0L7RgNC80LjRgNGD0LXQvCBKU09OINC00LvRjyDQtNC+0LHQsNCy0LvQtdC90LjRjyDQv9C+0YHRgtCwOlwiLCBib2R5KTtcblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHBvc3RzSG9zdCwge1xuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgaGVhZGVyczoge1xuICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3Rva2VufWAsXG4gICAgfSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShib2R5KSxcbiAgfSk7XG5cbiAgY29uc3QgdGV4dCA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgY29uc29sZS5sb2coXCLwn5OpINCe0YLQstC10YIg0YHQtdGA0LLQtdGA0LA6XCIsIHRleHQpO1xuXG4gIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICBjb25zb2xlLmVycm9yKFwi4p2MINCe0YjQuNCx0LrQsCDQv9GA0Lgg0LTQvtCx0LDQstC70LXQvdC40Lgg0L/QvtGB0YLQsDpcIiwgdGV4dCk7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwi0J7RiNC40LHQutCwINC/0YDQuCDQtNC+0LHQsNCy0LvQtdC90LjQuCDQv9C+0YHRgtCwXCIpO1xuICB9XG5cbiAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UodGV4dCk7XG4gIGNvbnNvbGUubG9nKFwi4pyFIFBhcnNlZCByZXNwb25zZTpcIiwgZGF0YSk7XG4gIHJldHVybiBkYXRhO1xufVxuXG4vL9Cf0L7RgdGC0LDQstC40YLRjCDQu9Cw0LnQulxuZXhwb3J0IGZ1bmN0aW9uIGxpa2VQb3N0KHsgcG9zdElkLCB0b2tlbiB9KSB7XG4gIHJldHVybiBmZXRjaChgJHtwb3N0c0hvc3R9LyR7cG9zdElkfS9saWtlYCwge1xuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgaGVhZGVyczoge1xuICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3Rva2VufWAsXG4gICAgfSxcbiAgfSkudGhlbigocmVzKSA9PiByZXMuanNvbigpKTtcbn1cblxuLy/Qo9Cx0YDQsNGC0Ywg0LvQsNC50LpcbmV4cG9ydCBmdW5jdGlvbiB1bmxpa2VQb3N0KHsgcG9zdElkLCB0b2tlbiB9KSB7XG4gIHJldHVybiBmZXRjaChgJHtwb3N0c0hvc3R9LyR7cG9zdElkfS9kaXNsaWtlYCwgeyAgXG4gICAgbWV0aG9kOiBcIlBPU1RcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICBoZWFkZXJzOiB7XG4gICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dG9rZW59YCxcbiAgICB9LFxuICB9KS50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpO1xufVxuXG4vL9Cj0LTQsNC70LjRgtGMINC/0L7RgdGCXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlUG9zdCh7IHBvc3RJZCwgdG9rZW4gfSkge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke3Bvc3RzSG9zdH0vJHtwb3N0SWR9YCwge1xuICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICBoZWFkZXJzOiB7IEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gIH0sXG4gIH0pO1xuXG4gIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cbiAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgIGNvbnNvbGUuZXJyb3IoXCLQntGI0LjQsdC60LAg0L/RgNC4INGD0LTQsNC70LXQvdC40Lgg0L/QvtGB0YLQsDpcIiwgZGF0YSk7XG4gICAgdGhyb3cgbmV3IEVycm9yKGRhdGEubWVzc2FnZSB8fCBcItCe0YjQuNCx0LrQsCDQv9GA0Lgg0YPQtNCw0LvQtdC90LjQuCDQv9C+0YHRgtCwXCIpO1xuICB9XG5cbiAgcmV0dXJuIGRhdGE7XG59XG4vL9Cf0L7Qu9GD0YfQuNGC0Ywg0L/QvtGB0YLRiyDQutC+0L3QutGA0LXRgtC90L7Qs9C+INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRj1xuZXhwb3J0IGZ1bmN0aW9uIGdldFVzZXJQb3N0cyh7IHVzZXJJZCwgdG9rZW4gfSkge1xuICByZXR1cm4gZmV0Y2goYCR7cG9zdHNIb3N0fS91c2VyLXBvc3RzLyR7dXNlcklkfWAsIHtcbiAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgaGVhZGVyczogdG9rZW4gPyB7IEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gIH0gOiB7fSxcbiAgfSlcbiAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcbiAgLnRoZW4oKGRhdGEpID0+IGRhdGEucG9zdHMpO1xufVxuXG5cblxuXG4iLCJpbXBvcnQgeyBnZXRUb2tlbiB9IGZyb20gXCIuLi9pbmRleC5qc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyQWRkUG9zdFBhZ2VDb21wb25lbnQoeyBhcHBFbCwgb25BZGRQb3N0Q2xpY2sgfSkge1xuICBhcHBFbC5pbm5lckhUTUwgPSBgXG4gICAgPGRpdiBjbGFzcz1cInBhZ2UtY29udGFpbmVyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLWNvbnRhaW5lclwiPjwvZGl2PlxuICAgICAgPGgxIGNsYXNzPVwicGFnZS10aXRsZVwiPtCU0L7QsdCw0LLQuNGC0Ywg0L/QvtGB0YI8L2gxPlxuICAgICAgPGZvcm0gaWQ9XCJhZGQtcG9zdC1mb3JtXCIgY2xhc3M9XCJmb3JtXCI+XG4gICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgIGlkPVwiZGVzY3JpcHRpb24taW5wdXRcIlxuICAgICAgICAgIGNsYXNzPVwiaW5wdXQgaW5wdXQtLWxhcmdlXCJcbiAgICAgICAgICBwbGFjZWhvbGRlcj1cItCe0L/QuNGB0LDQvdC40LUg0LrQsNGA0YLQuNC90LrQuFwiXG4gICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgPjwvdGV4dGFyZWE+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJmaWxlXCIgaWQ9XCJpbWFnZS1maWxlLWlucHV0XCIgYWNjZXB0PVwiaW1hZ2UvKlwiIHJlcXVpcmVkIGNsYXNzPVwiaW5wdXQtLWZpbGVcIj5cbiAgXG4gICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi0tbGFyZ2VcIj7QlNC+0LHQsNCy0LjRgtGMPC9idXR0b24+XG4gICAgICA8L2Zvcm0+XG4gICAgPC9kaXY+XG4gIGA7XG5cbiAgY29uc3QgZm9ybUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtcG9zdC1mb3JtXCIpO1xuICBjb25zb2xlLmxvZyhcItCk0L7RgNC80LAg0LTQvtCx0LDQstC70LXQvdC40Y8g0L/QvtGB0YLQsCDRgNC10L3QtNC10YDQtdC90LA6XCIsIGZvcm1FbCk7XG5cbiAgZm9ybUVsLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgYXN5bmMgKGV2ZW50KSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zb2xlLmxvZyhcItCd0LDQttCw0YLQsCDQutC90L7Qv9C60LAg0JTQvtCx0LDQstC40YLRjFwiKTtcblxuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnRcbiAgICAgIC5nZXRFbGVtZW50QnlJZChcImRlc2NyaXB0aW9uLWlucHV0XCIpXG4gICAgICAudmFsdWUudHJpbSgpO1xuICAgIGNvbnN0IGZpbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImltYWdlLWZpbGUtaW5wdXRcIikuZmlsZXNbMF07XG5cbiAgICBpZiAoIWRlc2NyaXB0aW9uKSB7XG4gICAgICBhbGVydChcItCe0L/QuNGB0LDQvdC40LUg0L3QtSDQvNC+0LbQtdGCINCx0YvRgtGMINC/0YPRgdGC0YvQvFwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIWZpbGUpIHtcbiAgICAgIGFsZXJ0KFwi0JLRi9Cx0LXRgNC40YLQtSDRhNCw0LnQuyDQtNC70Y8g0LfQsNCz0YDRg9C30LrQuFwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhcItCe0L/QuNGB0LDQvdC40LU6XCIsIGRlc2NyaXB0aW9uLCBcItCk0LDQudC7OlwiLCBmaWxlLCBcIlRva2VuOlwiLCBnZXRUb2tlbigpKTtcblxuICAgIHRyeSB7XG4gICAgICAvL9CX0LDQs9GA0YPQttCw0LXQvCDQuNC30L7QsdGA0LDQttC10L3QuNC1INC90LAg0YHQtdGA0LLQtdGAXG4gICAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgZm9ybURhdGEuYXBwZW5kKFwiZmlsZVwiLCBmaWxlKTtcblxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgICAgXCJodHRwczovL3dlZGV2LWFwaS5za3kucHJvL2FwaS91cGxvYWQvaW1hZ2VcIixcbiAgICAgICAge1xuICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgYm9keTogZm9ybURhdGEsXG4gICAgICAgIH1cbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICBjb25zb2xlLmxvZyhcItCe0YLQstC10YIgQVBJINC/0YDQuCDQt9Cw0LPRgNGD0LfQutC1INC60LDRgNGC0LjQvdC60Lg6XCIsIGRhdGEpO1xuXG4gICAgICBjb25zdCBpbWFnZVVybCA9IGRhdGEuZmlsZVVybDtcbiAgICAgIGNvbnNvbGUubG9nKFwiVVJMINC30LDQs9GA0YPQttC10L3QvdC+0Lkg0LrQsNGA0YLQuNC90LrQuDpcIiwgaW1hZ2VVcmwpO1xuXG4gICAgICBpZiAoIWltYWdlVXJsKSB7XG4gICAgICAgIGFsZXJ0KFwi0J7RiNC40LHQutCwOiDRgdC10YDQstC10YAg0L3QtSDQstC10YDQvdGD0Lsg0LrQvtGA0YDQtdC60YLQvdGL0LkgVVJMINC60LDRgNGC0LjQvdC60LhcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8g0JTQvtCx0LDQstC70Y/QtdC8INC/0L7RgdGCIFxuICAgICAgb25BZGRQb3N0Q2xpY2sgJiYgb25BZGRQb3N0Q2xpY2soeyBkZXNjcmlwdGlvbiwgaW1hZ2VVcmwgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCLQntGI0LjQsdC60LAg0LfQsNCz0YDRg9C30LrQuCDQuNC70Lgg0LTQvtCx0LDQstC70LXQvdC40Y8g0L/QvtGB0YLQsDpcIiwgZXJyb3IpO1xuICAgICAgYWxlcnQoXCLQntGI0LjQsdC60LAg0L/RgNC4INC00L7QsdCw0LLQu9C10L3QuNC4INC/0L7RgdGC0LBcIik7XG4gICAgfVxuICB9KTtcbn1cbiIsImltcG9ydCB7IGxvZ2luVXNlciwgcmVnaXN0ZXJVc2VyIH0gZnJvbSBcIi4uL2FwaS5qc1wiO1xuaW1wb3J0IHsgcmVuZGVySGVhZGVyQ29tcG9uZW50IH0gZnJvbSBcIi4vaGVhZGVyLWNvbXBvbmVudC5qc1wiO1xuaW1wb3J0IHsgcmVuZGVyVXBsb2FkSW1hZ2VDb21wb25lbnQgfSBmcm9tIFwiLi91cGxvYWQtaW1hZ2UtY29tcG9uZW50LmpzXCI7XG5cbi8qKlxuICog0JrQvtC80L/QvtC90LXQvdGCINGB0YLRgNCw0L3QuNGG0Ysg0LDQstGC0L7RgNC40LfQsNGG0LjQuC5cbiAqINCt0YLQvtGCINC60L7QvNC/0L7QvdC10L3RgiDQv9GA0LXQtNC+0YHRgtCw0LLQu9GP0LXRgiDQv9C+0LvRjNC30L7QstCw0YLQtdC70Y4g0LjQvdGC0LXRgNGE0LXQudGBINC00LvRjyDQstGF0L7QtNCwINCyINGB0LjRgdGC0LXQvNGDINC40LvQuCDRgNC10LPQuNGB0YLRgNCw0YbQuNC4LlxuICog0KTQvtGA0LzQsCDQv9C10YDQtdC60LvRjtGH0LDQtdGC0YHRjyDQvNC10LbQtNGDINGA0LXQttC40LzQsNC80LggXCLQktGF0L7QtFwiINC4IFwi0KDQtdCz0LjRgdGC0YDQsNGG0LjRj1wiLlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHBhcmFtcy5hcHBFbCAtINCa0L7RgNC90LXQstC+0Lkg0Y3Qu9C10LzQtdC90YIg0L/RgNC40LvQvtC20LXQvdC40Y8sINCyINC60L7RgtC+0YDRi9C5INCx0YPQtNC10YIg0YDQtdC90LTQtdGA0LjRgtGM0YHRjyDRgdGC0YDQsNC90LjRhtCwLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcGFyYW1zLnNldFVzZXIgLSDQpNGD0L3QutGG0LjRjywg0LLRi9C30YvQstCw0LXQvNCw0Y8g0L/RgNC4INGD0YHQv9C10YjQvdC+0Lkg0LDQstGC0L7RgNC40LfQsNGG0LjQuCDQuNC70Lgg0YDQtdCz0LjRgdGC0YDQsNGG0LjQuC5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg0J/RgNC40L3QuNC80LDQtdGCINC+0LHRitC10LrRgiDQv9C+0LvRjNC30L7QstCw0YLQtdC70Y8g0LIg0LrQsNGH0LXRgdGC0LLQtSDQsNGA0LPRg9C80LXQvdGC0LAuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJBdXRoUGFnZUNvbXBvbmVudCh7IGFwcEVsLCBzZXRVc2VyIH0pIHtcbiAgLyoqXG4gICAqINCk0LvQsNCzLCDRg9C60LDQt9GL0LLQsNGO0YnQuNC5INGC0LXQutGD0YnQuNC5INGA0LXQttC40Lwg0YTQvtGA0LzRiy5cbiAgICog0JXRgdC70LggYHRydWVgLCDRhNC+0YDQvNCwINC90LDRhdC+0LTQuNGC0YHRjyDQsiDRgNC10LbQuNC80LUg0LLRhdC+0LTQsC4g0JXRgdC70LggYGZhbHNlYCwg0LIg0YDQtdC20LjQvNC1INGA0LXQs9C40YHRgtGA0LDRhtC40LguXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKi9cbiAgbGV0IGlzTG9naW5Nb2RlID0gdHJ1ZTtcblxuICAvKipcbiAgICogVVJMINC40LfQvtCx0YDQsNC20LXQvdC40Y8sINC30LDQs9GA0YPQttC10L3QvdC+0LPQviDQv9C+0LvRjNC30L7QstCw0YLQtdC70LXQvCDQv9GA0Lgg0YDQtdCz0LjRgdGC0YDQsNGG0LjQuC5cbiAgICog0JjRgdC/0L7Qu9GM0LfRg9C10YLRgdGPINGC0L7Qu9GM0LrQviDQsiDRgNC10LbQuNC80LUg0YDQtdCz0LjRgdGC0YDQsNGG0LjQuC5cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIGxldCBpbWFnZVVybCA9IFwiXCI7XG5cbiAgLyoqXG4gICAqINCg0LXQvdC00LXRgNC40YIg0YTQvtGA0LzRgyDQsNCy0YLQvtGA0LjQt9Cw0YbQuNC4INC40LvQuCDRgNC10LPQuNGB0YLRgNCw0YbQuNC4LlxuICAgKiDQkiDQt9Cw0LLQuNGB0LjQvNC+0YHRgtC4INC+0YIg0LfQvdCw0YfQtdC90LjRjyBgaXNMb2dpbk1vZGVgINC+0YLQvtCx0YDQsNC20LDQtdGCINGB0L7QvtGC0LLQtdGC0YHRgtCy0YPRjtGJ0LjQuSDQuNC90YLQtdGA0YTQtdC50YEuXG4gICAqL1xuICBjb25zdCByZW5kZXJGb3JtID0gKCkgPT4ge1xuICAgIGNvbnN0IGFwcEh0bWwgPSBgXG4gICAgICA8ZGl2IGNsYXNzPVwicGFnZS1jb250YWluZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLWNvbnRhaW5lclwiPjwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtXCI+XG4gICAgICAgICAgICAgIDxoMyBjbGFzcz1cImZvcm0tdGl0bGVcIj5cbiAgICAgICAgICAgICAgICAke1xuICAgICAgICAgICAgICAgICAgaXNMb2dpbk1vZGVcbiAgICAgICAgICAgICAgICAgICAgPyBcItCS0YXQvtC0INCyJm5ic3A7SW5zdGFwcm9cIlxuICAgICAgICAgICAgICAgICAgICA6IFwi0KDQtdCz0LjRgdGC0YDQsNGG0LjRjyDQsiZuYnNwO0luc3RhcHJvXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWlucHV0c1wiPlxuICAgICAgICAgICAgICAgICAgJHtcbiAgICAgICAgICAgICAgICAgICAgIWlzTG9naW5Nb2RlXG4gICAgICAgICAgICAgICAgICAgICAgPyBgXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVwbG9hZC1pbWFnZS1jb250YWluZXJcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cIm5hbWUtaW5wdXRcIiBjbGFzcz1cImlucHV0XCIgcGxhY2Vob2xkZXI9XCLQmNC80Y9cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIGBcbiAgICAgICAgICAgICAgICAgICAgICA6IFwiXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwibG9naW4taW5wdXRcIiBjbGFzcz1cImlucHV0XCIgcGxhY2Vob2xkZXI9XCLQm9C+0LPQuNC9XCIgLz5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicGFzc3dvcmRcIiBpZD1cInBhc3N3b3JkLWlucHV0XCIgY2xhc3M9XCJpbnB1dFwiIHBsYWNlaG9sZGVyPVwi0J/QsNGA0L7Qu9GMXCIgLz5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWVycm9yXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uXCIgaWQ9XCJsb2dpbi1idXR0b25cIj4ke1xuICAgICAgICAgICAgICAgICAgICBpc0xvZ2luTW9kZSA/IFwi0JLQvtC50YLQuFwiIDogXCLQl9Cw0YDQtdCz0LjRgdGC0YDQuNGA0L7QstCw0YLRjNGB0Y9cIlxuICAgICAgICAgICAgICAgICAgfTwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZm9vdGVyXCI+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJmb3JtLWZvb3Rlci10aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgJHtpc0xvZ2luTW9kZSA/IFwi0J3QtdGCINCw0LrQutCw0YPQvdGC0LA/XCIgOiBcItCj0LbQtSDQtdGB0YLRjCDQsNC60LrQsNGD0L3Rgj9cIn1cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJsaW5rLWJ1dHRvblwiIGlkPVwidG9nZ2xlLWJ1dHRvblwiPlxuICAgICAgICAgICAgICAgICAgICAke2lzTG9naW5Nb2RlID8gXCLQl9Cw0YDQtdCz0LjRgdGC0YDQuNGA0L7QstCw0YLRjNGB0Y8uXCIgOiBcItCS0L7QudGC0LguXCJ9XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+ICAgIFxuICAgIGA7XG5cbiAgICBhcHBFbC5pbm5lckhUTUwgPSBhcHBIdG1sO1xuXG4gICAgLyoqXG4gICAgICog0KPRgdGC0LDQvdCw0LLQu9C40LLQsNC10YIg0YHQvtC+0LHRidC10L3QuNC1INC+0LEg0L7RiNC40LHQutC1INCyINGE0L7RgNC80LUuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSDQotC10LrRgdGCINGB0L7QvtCx0YnQtdC90LjRjyDQvtCxINC+0YjQuNCx0LrQtS5cbiAgICAgKi9cbiAgICBjb25zdCBzZXRFcnJvciA9IChtZXNzYWdlKSA9PiB7XG4gICAgICBhcHBFbC5xdWVyeVNlbGVjdG9yKFwiLmZvcm0tZXJyb3JcIikudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xuICAgIH07XG5cbiAgICAvLyDQoNC10L3QtNC10YDQuNC8INC30LDQs9C+0LvQvtCy0L7QuiDRgdGC0YDQsNC90LjRhtGLXG4gICAgcmVuZGVySGVhZGVyQ29tcG9uZW50KHtcbiAgICAgIGVsZW1lbnQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVhZGVyLWNvbnRhaW5lclwiKSxcbiAgICB9KTtcblxuICAgIC8vINCV0YHQu9C4INGA0LXQttC40Lwg0YDQtdCz0LjRgdGC0YDQsNGG0LjQuCwg0YDQtdC90LTQtdGA0LjQvCDQutC+0LzQv9C+0L3QtdC90YIg0LfQsNCz0YDRg9C30LrQuCDQuNC30L7QsdGA0LDQttC10L3QuNGPXG4gICAgY29uc3QgdXBsb2FkSW1hZ2VDb250YWluZXIgPSBhcHBFbC5xdWVyeVNlbGVjdG9yKFwiLnVwbG9hZC1pbWFnZS1jb250YWluZXJcIik7XG4gICAgaWYgKHVwbG9hZEltYWdlQ29udGFpbmVyKSB7XG4gICAgICByZW5kZXJVcGxvYWRJbWFnZUNvbXBvbmVudCh7XG4gICAgICAgIGVsZW1lbnQ6IHVwbG9hZEltYWdlQ29udGFpbmVyLFxuICAgICAgICBvbkltYWdlVXJsQ2hhbmdlKG5ld0ltYWdlVXJsKSB7XG4gICAgICAgICAgaW1hZ2VVcmwgPSBuZXdJbWFnZVVybDtcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vINCe0LHRgNCw0LHQvtGC0LrQsCDQutC70LjQutCwINC90LAg0LrQvdC+0L/QutGDINCy0YXQvtC00LAv0YDQtdCz0LjRgdGC0YDQsNGG0LjQuFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9naW4tYnV0dG9uXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBzZXRFcnJvcihcIlwiKTtcblxuICAgICAgaWYgKGlzTG9naW5Nb2RlKSB7XG4gICAgICAgIC8vINCe0LHRgNCw0LHQvtGC0LrQsCDQstGF0L7QtNCwXG4gICAgICAgIGNvbnN0IGxvZ2luID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dpbi1pbnB1dFwiKS52YWx1ZTtcbiAgICAgICAgY29uc3QgcGFzc3dvcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBhc3N3b3JkLWlucHV0XCIpLnZhbHVlO1xuXG4gICAgICAgIGlmICghbG9naW4pIHtcbiAgICAgICAgICBhbGVydChcItCS0LLQtdC00LjRgtC1INC70L7Qs9C40L1cIik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFwYXNzd29yZCkge1xuICAgICAgICAgIGFsZXJ0KFwi0JLQstC10LTQuNGC0LUg0L/QsNGA0L7Qu9GMXCIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxvZ2luVXNlcih7IGxvZ2luLCBwYXNzd29yZCB9KVxuICAgICAgICAgIC50aGVuKCh1c2VyKSA9PiB7XG4gICAgICAgICAgICBzZXRVc2VyKHVzZXIudXNlcik7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oZXJyb3IpO1xuICAgICAgICAgICAgc2V0RXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyDQntCx0YDQsNCx0L7RgtC60LAg0YDQtdCz0LjRgdGC0YDQsNGG0LjQuFxuICAgICAgICBjb25zdCBsb2dpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9naW4taW5wdXRcIikudmFsdWU7XG4gICAgICAgIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hbWUtaW5wdXRcIikudmFsdWU7XG4gICAgICAgIGNvbnN0IHBhc3N3b3JkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwYXNzd29yZC1pbnB1dFwiKS52YWx1ZTtcblxuICAgICAgICBpZiAoIW5hbWUpIHtcbiAgICAgICAgICBhbGVydChcItCS0LLQtdC00LjRgtC1INC40LzRj1wiKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWxvZ2luKSB7XG4gICAgICAgICAgYWxlcnQoXCLQktCy0LXQtNC40YLQtSDQu9C+0LPQuNC9XCIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghcGFzc3dvcmQpIHtcbiAgICAgICAgICBhbGVydChcItCS0LLQtdC00LjRgtC1INC/0LDRgNC+0LvRjFwiKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWltYWdlVXJsKSB7XG4gICAgICAgICAgYWxlcnQoXCLQndC1INCy0YvQsdGA0LDQvdCwINGE0L7RgtC+0LPRgNCw0YTQuNGPXCIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZ2lzdGVyVXNlcih7IGxvZ2luLCBwYXNzd29yZCwgbmFtZSwgaW1hZ2VVcmwgfSlcbiAgICAgICAgICAudGhlbigodXNlcikgPT4ge1xuICAgICAgICAgICAgc2V0VXNlcih1c2VyLnVzZXIpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGVycm9yKTtcbiAgICAgICAgICAgIHNldEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8g0J7QsdGA0LDQsdC+0YLQutCwINC/0LXRgNC10LrQu9GO0YfQtdC90LjRjyDRgNC10LbQuNC80LAgKNCy0YXQvtC0IOKGlCDRgNC10LPQuNGB0YLRgNCw0YbQuNGPKVxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9nZ2xlLWJ1dHRvblwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgaXNMb2dpbk1vZGUgPSAhaXNMb2dpbk1vZGU7XG4gICAgICByZW5kZXJGb3JtKCk7IC8vINCf0LXRgNC10YDQuNGB0L7QstGL0LLQsNC10Lwg0YTQvtGA0LzRgyDRgSDQvdC+0LLRi9C8INGA0LXQttC40LzQvtC8XG4gICAgfSk7XG4gIH07XG5cbiAgLy8g0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0YTQvtGA0LzRi1xuICByZW5kZXJGb3JtKCk7XG59XG4iLCJpbXBvcnQgeyBnb1RvUGFnZSwgbG9nb3V0LCB1c2VyIH0gZnJvbSBcIi4uL2luZGV4LmpzXCI7XG5pbXBvcnQgeyBBRERfUE9TVFNfUEFHRSwgQVVUSF9QQUdFLCBQT1NUU19QQUdFIH0gZnJvbSBcIi4uL3JvdXRlcy5qc1wiO1xuXG4vKipcbiAqINCa0L7QvNC/0L7QvdC10L3RgiDQt9Cw0LPQvtC70L7QstC60LAg0YHRgtGA0LDQvdC40YbRiy5cbiAqINCt0YLQvtGCINC60L7QvNC/0L7QvdC10L3RgiDQvtGC0L7QsdGA0LDQttCw0LXRgiDRiNCw0L/QutGDINGB0YLRgNCw0L3QuNGG0Ysg0YEg0LvQvtCz0L7RgtC40L/QvtC8LCDQutC90L7Qv9C60L7QuSDQtNC+0LHQsNCy0LvQtdC90LjRjyDQv9C+0YHRgtC+0LIv0LLRhdC+0LTQsCDQuCDQutC90L7Qv9C60L7QuSDQstGL0YXQvtC00LAgKNC10YHQu9C4INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjCDQsNCy0YLQvtGA0LjQt9C+0LLQsNC9KS5cbiAqIFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcGFyYW1zLmVsZW1lbnQgLSBIVE1MLdGN0LvQtdC80LXQvdGCLCDQsiDQutC+0YLQvtGA0YvQuSDQsdGD0LTQtdGCINGA0LXQvdC00LXRgNC40YLRjNGB0Y8g0LfQsNCz0L7Qu9C+0LLQvtC6LlxuICogQHJldHVybnMge0hUTUxFbGVtZW50fSDQktC+0LfQstGA0LDRidCw0LXRgiDRjdC70LXQvNC10L3RgiDQt9Cw0LPQvtC70L7QstC60LAg0L/QvtGB0LvQtSDRgNC10L3QtNC10YDQuNC90LPQsC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckhlYWRlckNvbXBvbmVudCh7IGVsZW1lbnQgfSkge1xuICAvKipcbiAgICog0KDQtdC90LTQtdGA0LjRgiDRgdC+0LTQtdGA0LbQuNC80L7QtSDQt9Cw0LPQvtC70L7QstC60LAuXG4gICAqL1xuICBlbGVtZW50LmlubmVySFRNTCA9IGBcbiAgPGRpdiBjbGFzcz1cInBhZ2UtaGVhZGVyXCI+XG4gICAgICA8aDEgY2xhc3M9XCJsb2dvXCI+aW5zdGFwcm88L2gxPlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImhlYWRlci1idXR0b24gYWRkLW9yLWxvZ2luLWJ1dHRvblwiPlxuICAgICAgJHtcbiAgICAgICAgdXNlclxuICAgICAgICAgID8gYDxkaXYgdGl0bGU9XCLQlNC+0LHQsNCy0LjRgtGMINC/0L7RgdGCXCIgY2xhc3M9XCJhZGQtcG9zdC1zaWduXCI+PC9kaXY+YFxuICAgICAgICAgIDogXCLQktC+0LnRgtC4XCJcbiAgICAgIH1cbiAgICAgIDwvYnV0dG9uPlxuICAgICAgJHtcbiAgICAgICAgdXNlclxuICAgICAgICAgID8gYDxidXR0b24gdGl0bGU9XCIke3VzZXIubmFtZX1cIiBjbGFzcz1cImhlYWRlci1idXR0b24gbG9nb3V0LWJ1dHRvblwiPtCS0YvQudGC0Lg8L2J1dHRvbj5gXG4gICAgICAgICAgOiBcIlwiXG4gICAgICB9ICBcbiAgPC9kaXY+XG4gIGA7XG5cbiAgLyoqXG4gICAqINCe0LHRgNCw0LHQvtGC0YfQuNC6INC60LvQuNC60LAg0L/QviDQutC90L7Qv9C60LUgXCLQlNC+0LHQsNCy0LjRgtGMINC/0L7RgdGCXCIvXCLQktC+0LnRgtC4XCIuXG4gICAqINCV0YHQu9C4INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjCDQsNCy0YLQvtGA0LjQt9C+0LLQsNC9LCDQv9C10YDQtdC90LDQv9GA0LDQstC70Y/QtdGCINC90LAg0YHRgtGA0LDQvdC40YbRgyDQtNC+0LHQsNCy0LvQtdC90LjRjyDQv9C+0YHRgtC+0LIuXG4gICAqINCV0YHQu9C4INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjCDQvdC1INCw0LLRgtC+0YDQuNC30L7QstCw0L0sINC/0LXRgNC10L3QsNC/0YDQsNCy0LvRj9C10YIg0L3QsCDRgdGC0YDQsNC90LjRhtGDINCw0LLRgtC+0YDQuNC30LDRhtC40LguXG4gICAqL1xuICBlbGVtZW50XG4gICAgLnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLW9yLWxvZ2luLWJ1dHRvblwiKVxuICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgZ29Ub1BhZ2UoQUREX1BPU1RTX1BBR0UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ29Ub1BhZ2UoQVVUSF9QQUdFKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAvKipcbiAgICog0J7QsdGA0LDQsdC+0YLRh9C40Log0LrQu9C40LrQsCDQv9C+INC70L7Qs9C+0YLQuNC/0YMuXG4gICAqINCf0LXRgNC10L3QsNC/0YDQsNCy0LvRj9C10YIg0L3QsCDRgdGC0YDQsNC90LjRhtGDINGBINC/0L7RgdGC0LDQvNC4LlxuICAgKi9cbiAgZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmxvZ29cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBnb1RvUGFnZShQT1NUU19QQUdFKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqINCe0LHRgNCw0LHQvtGC0YfQuNC6INC60LvQuNC60LAg0L/QviDQutC90L7Qv9C60LUgXCLQktGL0LnRgtC4XCIuXG4gICAqINCV0YHQu9C4INC60L3QvtC/0LrQsCDRgdGD0YnQtdGB0YLQstGD0LXRgiAo0YIu0LUuINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjCDQsNCy0YLQvtGA0LjQt9C+0LLQsNC9KSwg0LLRi9C30YvQstCw0LXRgiDRhNGD0L3QutGG0LjRjiBgbG9nb3V0YC5cbiAgICovXG4gIGVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5sb2dvdXQtYnV0dG9uXCIpPy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbG9nb3V0KTtcblxuICByZXR1cm4gZWxlbWVudDtcbn1cbiIsImltcG9ydCB7IHJlbmRlckhlYWRlckNvbXBvbmVudCB9IGZyb20gXCIuL2hlYWRlci1jb21wb25lbnQuanNcIjtcblxuLyoqXG4gKiDQmtC+0LzQv9C+0L3QtdC90YIg0YHRgtGA0LDQvdC40YbRiyDQt9Cw0LPRgNGD0LfQutC4LlxuICog0K3RgtC+0YIg0LrQvtC80L/QvtC90LXQvdGCINC+0YLQvtCx0YDQsNC20LDQtdGCINGB0YLRgNCw0L3QuNGG0YMg0YEg0LjQvdC00LjQutCw0YLQvtGA0L7QvCDQt9Cw0LPRgNGD0LfQutC4INC4INC30LDQs9C+0LvQvtCy0LrQvtC8LlxuICog0JjRgdC/0L7Qu9GM0LfRg9C10YLRgdGPINC00LvRjyDQvtGC0L7QsdGA0LDQttC10L3QuNGPINC/0YDQvtC80LXQttGD0YLQvtGH0L3QvtCz0L4g0YHQvtGB0YLQvtGP0L3QuNGPLCDQv9C+0LrQsCDQstGL0L/QvtC70L3Rj9C10YLRgdGPINC30LDQs9GA0YPQt9C60LAg0LTQsNC90L3Ri9GFINC40LvQuCDQtNGA0YPQs9C+0Lkg0L/RgNC+0YbQtdGB0YEuXG4gKiBcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHBhcmFtcy5hcHBFbCAtINCa0L7RgNC90LXQstC+0Lkg0Y3Qu9C10LzQtdC90YIg0L/RgNC40LvQvtC20LXQvdC40Y8sINCyINC60L7RgtC+0YDRi9C5INCx0YPQtNC10YIg0YDQtdC90LTQtdGA0LjRgtGM0YHRjyDRgdGC0YDQsNC90LjRhtCwINC30LDQs9GA0YPQt9C60LguXG4gKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zLnVzZXIgLSDQntCx0YrQtdC60YIg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GPLCDRgdC+0LTQtdGA0LbQsNGJ0LjQuSDQtNCw0L3QvdGL0LUg0L4g0YLQtdC60YPRidC10Lwg0LDQstGC0L7RgNC40LfQvtCy0LDQvdC90L7QvCDQv9C+0LvRjNC30L7QstCw0YLQtdC70LUgKNC10YHQu9C4INC+0L0g0LXRgdGC0YwpLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcGFyYW1zLmdvVG9QYWdlIC0g0KTRg9C90LrRhtC40Y8g0LTQu9GPINC90LDQstC40LPQsNGG0LjQuCDQv9C+INGB0YLRgNCw0L3QuNGG0LDQvC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckxvYWRpbmdQYWdlQ29tcG9uZW50KHsgYXBwRWwsIHVzZXIsIGdvVG9QYWdlIH0pIHtcbiAgLyoqXG4gICAqIEhUTUwt0YDQsNC30LzQtdGC0LrQsCDRgdGC0YDQsNC90LjRhtGLINC30LDQs9GA0YPQt9C60LguXG4gICAqINCh0L7QtNC10YDQttC40YIg0LrQvtC90YLQtdC50L3QtdGAINC30LDQs9C+0LvQvtCy0LrQsCDQuCDQuNC90LTQuNC60LDRgtC+0YAg0LfQsNCz0YDRg9C30LrQuC5cbiAgICovXG4gIGNvbnN0IGFwcEh0bWwgPSBgXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYWdlLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXItY29udGFpbmVyXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxvYWRpbmctcGFnZVwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxvYWRlclwiPjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5gO1xuXG4gIC8vINCj0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdC8INGA0LDQt9C80LXRgtC60YMg0LIg0LrQvtGA0L3QtdCy0L7QuSDRjdC70LXQvNC10L3RgiDQv9GA0LjQu9C+0LbQtdC90LjRj1xuICBhcHBFbC5pbm5lckhUTUwgPSBhcHBIdG1sO1xuXG4gIC8qKlxuICAgKiDQoNC10L3QtNC10YDQuNC90LMg0LfQsNCz0L7Qu9C+0LLQutCwINGBINC40YHQv9C+0LvRjNC30L7QstCw0L3QuNC10Lwg0LrQvtC80L/QvtC90LXQvdGC0LAgYHJlbmRlckhlYWRlckNvbXBvbmVudGAuXG4gICAqINCf0LXRgNC10LTQsNGO0YLRgdGPINC00LDQvdC90YvQtSDQv9C+0LvRjNC30L7QstCw0YLQtdC70Y8g0Lgg0YTRg9C90LrRhtC40Y8g0L3QsNCy0LjQs9Cw0YbQuNC4LlxuICAgKi9cbiAgcmVuZGVySGVhZGVyQ29tcG9uZW50KHtcbiAgICB1c2VyLFxuICAgIGVsZW1lbnQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVhZGVyLWNvbnRhaW5lclwiKSxcbiAgICBnb1RvUGFnZSxcbiAgfSk7XG59XG4iLCJpbXBvcnQgeyBVU0VSX1BPU1RTX1BBR0UsIGdvVG9QYWdlLCBwb3N0cyBhcyBnbG9iYWxQb3N0cywgdXNlciwgdG9nZ2xlTGlrZSB9IGZyb20gXCIuLi9pbmRleC5qc1wiO1xuaW1wb3J0IHsgcmVuZGVySGVhZGVyQ29tcG9uZW50IH0gZnJvbSBcIi4vaGVhZGVyLWNvbXBvbmVudC5qc1wiO1xuaW1wb3J0IHsgZm9ybWF0RGlzdGFuY2VUb05vdyB9IGZyb20gXCJkYXRlLWZuc1wiO1xuaW1wb3J0IHsgcnUgfSBmcm9tIFwiZGF0ZS1mbnMvbG9jYWxlXCI7XG5pbXBvcnQgeyBkZWxldGVQb3N0IH0gZnJvbSBcIi4uL2FwaS5qc1wiO1xuXG5pbXBvcnQgbGlrZUFjdGl2ZUljb24gZnJvbSBcIi4uL2Fzc2V0cy9pbWFnZXMvbGlrZS1hY3RpdmUuc3ZnXCI7XG5pbXBvcnQgbGlrZU5vdEFjdGl2ZUljb24gZnJvbSBcIi4uL2Fzc2V0cy9pbWFnZXMvbGlrZS1ub3QtYWN0aXZlLnN2Z1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyUG9zdHNQYWdlQ29tcG9uZW50KHsgYXBwRWwgfSkge1xuICBjb25zdCByZW5kZXJQb3N0cyA9ICgpID0+IHtcbiAgICBjb25zdCBwb3N0c0h0bWwgPSBnbG9iYWxQb3N0c1xuICAgICAgLm1hcChwb3N0ID0+IHtcbiAgICAgICAgY29uc3QgcG9zdERhdGUgPSBuZXcgRGF0ZShwb3N0LmNyZWF0ZWRBdCk7XG5cbiAgICAgICAgLy8g0L/RgNC+0LLQtdGA0Y/QtdC8INC70LDQudC6INCy0L4g0LLRgdC10YUg0LzQsNGB0YHQuNCy0LDRhVxuICAgICAgICBjb25zdCBhbGxQb3N0cyA9IFsuLi5nbG9iYWxQb3N0cywgLi4uKHdpbmRvdy51c2VyUG9zdHMgfHwgW10pXTtcbiAgICAgICAgY29uc3QgcG9zdEdsb2JhbCA9IGFsbFBvc3RzLmZpbmQocCA9PiBwLmlkID09PSBwb3N0LmlkKTtcbiAgICAgICAgY29uc3QgaXNMaWtlZCA9IHBvc3RHbG9iYWw/Lmxpa2VzLnNvbWUobCA9PiBsLmlkID09PSB1c2VyPy5faWQpO1xuICAgICAgICBjb25zdCBsaWtlSW1hZ2UgPSBpc0xpa2VkID8gbGlrZUFjdGl2ZUljb24gOiBsaWtlTm90QWN0aXZlSWNvbjtcblxuICAgICAgICByZXR1cm4gYFxuICAgICAgICAgIDxsaSBjbGFzcz1cInBvc3RcIiBkYXRhLXBvc3QtaWQ9XCIke3Bvc3QuaWR9XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicG9zdC1oZWFkZXJcIiBkYXRhLXVzZXItaWQ9XCIke3Bvc3QudXNlci5pZH1cIj5cbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIke3Bvc3QudXNlci5pbWFnZVVybH1cIiBjbGFzcz1cInBvc3QtaGVhZGVyX191c2VyLWltYWdlXCI+XG4gICAgICAgICAgICAgIDxwIGNsYXNzPVwicG9zdC1oZWFkZXJfX3VzZXItbmFtZVwiPiR7cG9zdC51c2VyLm5hbWV9PC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicG9zdC1pbWFnZS1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgPGltZyBjbGFzcz1cInBvc3QtaW1hZ2VcIiBzcmM9XCIke3Bvc3QuaW1hZ2VVcmx9XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoZWFydC1vdmVybGF5XCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwb3N0LWxpa2VzXCI+XG4gICAgICAgICAgICAgIDxidXR0b24gZGF0YS1wb3N0LWlkPVwiJHtwb3N0LmlkfVwiIGNsYXNzPVwibGlrZS1idXR0b25cIj5cbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7bGlrZUltYWdlfVwiPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPHAgY2xhc3M9XCJwb3N0LWxpa2VzLXRleHRcIj5cbiAgICAgICAgICAgICAgICDQndGA0LDQstC40YLRgdGPOiA8c3Ryb25nPiR7cG9zdC5saWtlcy5sZW5ndGh9PC9zdHJvbmc+XG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgJHtcbiAgICAgICAgICAgICAgICBwb3N0LnVzZXIuaWQgPT09IHVzZXI/Ll9pZFxuICAgICAgICAgICAgICAgICAgPyBgPGJ1dHRvbiBjbGFzcz1cImRlbGV0ZS1idXR0b25cIiBkYXRhLXBvc3QtaWQ9XCIke3Bvc3QuaWR9XCI+0KPQtNCw0LvQuNGC0Yw8L2J1dHRvbj5gXG4gICAgICAgICAgICAgICAgICA6IFwiXCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8cCBjbGFzcz1cInBvc3QtdGV4dFwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVzZXItbmFtZVwiPiR7cG9zdC51c2VyLm5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAke3Bvc3QuZGVzY3JpcHRpb259XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8cCBjbGFzcz1cInBvc3QtZGF0ZVwiPlxuICAgICAgICAgICAgICAke2Zvcm1hdERpc3RhbmNlVG9Ob3cocG9zdERhdGUsIHsgYWRkU3VmZml4OiB0cnVlLCBsb2NhbGU6IHJ1IH0pfVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgIGA7XG4gICAgICB9KVxuICAgICAgLmpvaW4oXCJcIik7XG5cbiAgICBhcHBFbC5pbm5lckhUTUwgPSBgXG4gICAgICA8ZGl2IGNsYXNzPVwicGFnZS1jb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImhlYWRlci1jb250YWluZXJcIj48L2Rpdj5cbiAgICAgICAgPHVsIGNsYXNzPVwicG9zdHNcIj4ke3Bvc3RzSHRtbH08L3VsPlxuICAgICAgPC9kaXY+XG4gICAgYDtcblxuICAgIHJlbmRlckhlYWRlckNvbXBvbmVudCh7IGVsZW1lbnQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVhZGVyLWNvbnRhaW5lclwiKSB9KTtcblxuICAgIC8vINCf0LXRgNC10YXQvtC0INC90LAg0YHRgtGA0LDQvdC40YbRgyDQv9C+0LvRjNC30L7QstCw0YLQtdC70Y9cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBvc3QtaGVhZGVyXCIpLmZvckVhY2godXNlckVsID0+IHtcbiAgICAgIHVzZXJFbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBnb1RvUGFnZShVU0VSX1BPU1RTX1BBR0UsIHsgdXNlcklkOiB1c2VyRWwuZGF0YXNldC51c2VySWQgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vINCb0LDQudC60Lgg0YEg0LDQvdC40LzQsNGG0LjQtdC5XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5saWtlLWJ1dHRvblwiKS5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgcG9zdElkID0gYnV0dG9uLmRhdGFzZXQucG9zdElkO1xuICAgICAgICBjb25zdCBpbWdFbCA9IGJ1dHRvbi5xdWVyeVNlbGVjdG9yKFwiaW1nXCIpO1xuICAgICAgICBjb25zdCBsaWtlc1RleHRFbCA9IGJ1dHRvbi5uZXh0RWxlbWVudFNpYmxpbmc7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBuZXdMaWtlc0NvdW50ID0gYXdhaXQgdG9nZ2xlTGlrZShwb3N0SWQpO1xuXG4gICAgICAgICAgY29uc3QgYWxsUG9zdHMgPSBbLi4uZ2xvYmFsUG9zdHMsIC4uLih3aW5kb3cudXNlclBvc3RzIHx8IFtdKV07XG4gICAgICAgICAgY29uc3QgcG9zdCA9IGFsbFBvc3RzLmZpbmQocCA9PiBwLmlkID09PSBwb3N0SWQpO1xuICAgICAgICAgIGNvbnN0IGlzTGlrZWQgPSBwb3N0Lmxpa2VzLnNvbWUobCA9PiBsLmlkID09PSB1c2VyLl9pZCk7XG5cbiAgICAgICAgICBpbWdFbC5zcmMgPSBpc0xpa2VkID8gbGlrZUFjdGl2ZUljb24gOiBsaWtlTm90QWN0aXZlSWNvbjtcblxuICAgICAgICAgIGNvbnN0IG92ZXJsYXkgPSBidXR0b24uY2xvc2VzdChcIi5wb3N0XCIpLnF1ZXJ5U2VsZWN0b3IoXCIuaGVhcnQtb3ZlcmxheVwiKTtcbiAgICAgICAgICBpZiAoaXNMaWtlZCkge1xuICAgICAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QuYWRkKFwic2hvdy1oZWFydFwiKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gb3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKFwic2hvdy1oZWFydFwiKSwgODAwKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsaWtlc1RleHRFbC5xdWVyeVNlbGVjdG9yKFwic3Ryb25nXCIpLnRleHRDb250ZW50ID0gbmV3TGlrZXNDb3VudDtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyDQo9C00LDQu9C10L3QuNC1INC/0L7RgdGC0L7QslxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZGVsZXRlLWJ1dHRvblwiKS5mb3JFYWNoKChidXR0b24sIGluZGV4KSA9PiB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgcG9zdCA9IGdsb2JhbFBvc3RzW2luZGV4XTtcbiAgICAgICAgaWYgKCFjb25maXJtKFwi0JLRiyDRgtC+0YfQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDQv9C+0YHRgj9cIikpIHJldHVybjtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIGF3YWl0IGRlbGV0ZVBvc3QoeyBwb3N0SWQ6IHBvc3QuaWQsIHRva2VuOiB1c2VyLnRva2VuIH0pO1xuICAgICAgICAgIGdsb2JhbFBvc3RzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgYnV0dG9uLmNsb3Nlc3QoXCJsaS5wb3N0XCIpLnJlbW92ZSgpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLQntGI0LjQsdC60LAg0L/RgNC4INGD0LTQsNC70LXQvdC40Lgg0L/QvtGB0YLQsDpcIiwgZXJyb3IpO1xuICAgICAgICAgIGFsZXJ0KFwi0J3QtSDRg9C00LDQu9C+0YHRjCDRg9C00LDQu9C40YLRjCDQv9C+0YHRglwiKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmVuZGVyUG9zdHMoKTtcbn1cbiIsImltcG9ydCB7IHVwbG9hZEltYWdlIH0gZnJvbSBcIi4uL2FwaS5qc1wiO1xuXG4vKipcbiAqINCa0L7QvNC/0L7QvdC10L3RgiDQt9Cw0LPRgNGD0LfQutC4INC40LfQvtCx0YDQsNC20LXQvdC40Y8uXG4gKiDQrdGC0L7RgiDQutC+0LzQv9C+0L3QtdC90YIg0L/QvtC30LLQvtC70Y/QtdGCINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjiDQt9Cw0LPRgNGD0LbQsNGC0Ywg0LjQt9C+0LHRgNCw0LbQtdC90LjQtSDQuCDQvtGC0L7QsdGA0LDQttCw0YLRjCDQtdCz0L4g0L/RgNC10LLRjNGOLlxuICog0JXRgdC70Lgg0LjQt9C+0LHRgNCw0LbQtdC90LjQtSDRg9C20LUg0LfQsNCz0YDRg9C20LXQvdC+LCDQv9C+0LvRjNC30L7QstCw0YLQtdC70Ywg0LzQvtC20LXRgiDQt9Cw0LzQtdC90LjRgtGMINC10LPQvi5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBwYXJhbXMuZWxlbWVudCAtIEhUTUwt0Y3Qu9C10LzQtdC90YIsINCyINC60L7RgtC+0YDRi9C5INCx0YPQtNC10YIg0YDQtdC90LTQtdGA0LjRgtGM0YHRjyDQutC+0LzQv9C+0L3QtdC90YIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwYXJhbXMub25JbWFnZVVybENoYW5nZSAtINCk0YPQvdC60YbQuNGPLCDQstGL0LfRi9Cy0LDQtdC80LDRjyDQv9GA0Lgg0LjQt9C80LXQvdC10L3QuNC4IFVSTCDQuNC30L7QsdGA0LDQttC10L3QuNGPLlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgINCf0YDQuNC90LjQvNCw0LXRgiDQvtC00LjQvSDQsNGA0LPRg9C80LXQvdGCIC0g0L3QvtCy0YvQuSBVUkwg0LjQt9C+0LHRgNCw0LbQtdC90LjRjyDQuNC70Lgg0L/Rg9GB0YLRg9GOINGB0YLRgNC+0LrRgy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclVwbG9hZEltYWdlQ29tcG9uZW50KHsgZWxlbWVudCwgb25JbWFnZVVybENoYW5nZSB9KSB7XG4gIC8qKlxuICAgKiBVUkwg0YLQtdC60YPRidC10LPQviDQuNC30L7QsdGA0LDQttC10L3QuNGPLlxuICAgKiDQmNC30L3QsNGH0LDQu9GM0L3QviDQv9GD0YHRgiwg0L/QvtC60LAg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GMINC90LUg0LfQsNCz0YDRg9C30LjRgiDQuNC30L7QsdGA0LDQttC10L3QuNC1LlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgbGV0IGltYWdlVXJsID0gXCJcIjtcblxuICAvKipcbiAgICog0KTRg9C90LrRhtC40Y8g0YDQtdC90LTQtdGA0LjQvdCz0LAg0LrQvtC80L/QvtC90LXQvdGC0LAuXG4gICAqINCe0YLQvtCx0YDQsNC20LDQtdGCINC40L3RgtC10YDRhNC10LnRgSDQutC+0LzQv9C+0L3QtdC90YLQsCDQsiDQt9Cw0LLQuNGB0LjQvNC+0YHRgtC4INC+0YIg0YHQvtGB0YLQvtGP0L3QuNGPOiBcbiAgICog0LvQuNCx0L4g0YTQvtGA0LzQsCDQstGL0LHQvtGA0LAg0YTQsNC50LvQsCwg0LvQuNCx0L4g0L/RgNC10LLRjNGOINC30LDQs9GA0YPQttC10L3QvdC+0LPQviDQuNC30L7QsdGA0LDQttC10L3QuNGPINGBINC60L3QvtC/0LrQvtC5INC30LDQvNC10L3Riy5cbiAgICovXG4gIGNvbnN0IHJlbmRlciA9ICgpID0+IHtcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJ1cGxvYWQtaW1hZ2VcIj5cbiAgICAgICAgJHtcbiAgICAgICAgICBpbWFnZVVybFxuICAgICAgICAgICAgPyBgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmlsZS11cGxvYWQtaW1hZ2UtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJmaWxlLXVwbG9hZC1pbWFnZVwiIHNyYz1cIiR7aW1hZ2VVcmx9XCIgYWx0PVwi0JfQsNCz0YDRg9C20LXQvdC90L7QtSDQuNC30L7QsdGA0LDQttC10L3QuNC1XCI+XG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJmaWxlLXVwbG9hZC1yZW1vdmUtYnV0dG9uIGJ1dHRvblwiPtCX0LDQvNC10L3QuNGC0Ywg0YTQvtGC0L48L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgYFxuICAgICAgICAgICAgOiBgXG4gICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJmaWxlLXVwbG9hZC1sYWJlbCBzZWNvbmRhcnktYnV0dG9uXCI+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIHR5cGU9XCJmaWxlXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cImZpbGUtdXBsb2FkLWlucHV0XCJcbiAgICAgICAgICAgICAgICBzdHlsZT1cImRpc3BsYXk6bm9uZVwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgINCS0YvQsdC10YDQuNGC0LUg0YTQvtGC0L5cbiAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgYFxuICAgICAgICB9XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuXG4gICAgLy8g0J7QsdGA0LDQsdC+0YLRh9C40Log0LLRi9Cx0L7RgNCwINGE0LDQudC70LBcbiAgICBjb25zdCBmaWxlSW5wdXRFbGVtZW50ID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmZpbGUtdXBsb2FkLWlucHV0XCIpO1xuICAgIGZpbGVJbnB1dEVsZW1lbnQ/LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgZmlsZSA9IGZpbGVJbnB1dEVsZW1lbnQuZmlsZXNbMF07XG4gICAgICBpZiAoZmlsZSkge1xuICAgICAgICBjb25zdCBsYWJlbEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5maWxlLXVwbG9hZC1sYWJlbFwiKTtcbiAgICAgICAgbGFiZWxFbC5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCB0cnVlKTtcbiAgICAgICAgbGFiZWxFbC50ZXh0Q29udGVudCA9IFwi0JfQsNCz0YDRg9C20LDRjiDRhNCw0LnQuy4uLlwiO1xuICAgICAgICBcbiAgICAgICAgLy8g0JfQsNCz0YDRg9C20LDQtdC8INC40LfQvtCx0YDQsNC20LXQvdC40LUg0YEg0L/QvtC80L7RidGM0Y4gQVBJXG4gICAgICAgIHVwbG9hZEltYWdlKHsgZmlsZSB9KS50aGVuKCh7IGZpbGVVcmwgfSkgPT4ge1xuICAgICAgICAgIGltYWdlVXJsID0gZmlsZVVybDsgLy8g0KHQvtGF0YDQsNC90Y/QtdC8IFVSTCDQt9Cw0LPRgNGD0LbQtdC90L3QvtCz0L4g0LjQt9C+0LHRgNCw0LbQtdC90LjRj1xuICAgICAgICAgIG9uSW1hZ2VVcmxDaGFuZ2UoaW1hZ2VVcmwpOyAvLyDQo9Cy0LXQtNC+0LzQu9GP0LXQvCDQviDQuNC30LzQtdC90LXQvdC40LggVVJMINC40LfQvtCx0YDQsNC20LXQvdC40Y9cbiAgICAgICAgICByZW5kZXIoKTsgLy8g0J/QtdGA0LXRgNC40YHQvtCy0YvQstCw0LXQvCDQutC+0LzQv9C+0L3QtdC90YIg0YEg0L3QvtCy0YvQvCDRgdC+0YHRgtC+0Y/QvdC40LXQvFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vINCe0LHRgNCw0LHQvtGC0YfQuNC6INGD0LTQsNC70LXQvdC40Y8g0LjQt9C+0LHRgNCw0LbQtdC90LjRj1xuICAgIGVsZW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLmZpbGUtdXBsb2FkLXJlbW92ZS1idXR0b25cIilcbiAgICAgID8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgaW1hZ2VVcmwgPSBcIlwiOyAvLyDQodCx0YDQsNGB0YvQstCw0LXQvCBVUkwg0LjQt9C+0LHRgNCw0LbQtdC90LjRj1xuICAgICAgICBvbkltYWdlVXJsQ2hhbmdlKGltYWdlVXJsKTsgLy8g0KPQstC10LTQvtC80LvRj9C10Lwg0L7QsSDQuNC30LzQtdC90LXQvdC40LggVVJMINC40LfQvtCx0YDQsNC20LXQvdC40Y9cbiAgICAgICAgcmVuZGVyKCk7IC8vINCf0LXRgNC10YDQuNGB0L7QstGL0LLQsNC10Lwg0LrQvtC80L/QvtC90LXQvdGCXG4gICAgICB9KTtcbiAgfTtcblxuICAvLyDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDQutC+0LzQv9C+0L3QtdC90YLQsFxuICByZW5kZXIoKTtcbn1cbiIsImltcG9ydCB7IGdvVG9QYWdlLCB1c2VyLCBQT1NUU19QQUdFLCB0b2dnbGVMaWtlLCBwb3N0cyBhcyBnbG9iYWxQb3N0cyB9IGZyb20gXCIuLi9pbmRleC5qc1wiO1xuaW1wb3J0IHsgcmVuZGVySGVhZGVyQ29tcG9uZW50IH0gZnJvbSBcIi4vaGVhZGVyLWNvbXBvbmVudC5qc1wiO1xuaW1wb3J0IHsgZm9ybWF0RGlzdGFuY2VUb05vdyB9IGZyb20gXCJkYXRlLWZuc1wiO1xuaW1wb3J0IHsgcnUgfSBmcm9tIFwiZGF0ZS1mbnMvbG9jYWxlXCI7XG5pbXBvcnQgeyBkZWxldGVQb3N0LCBnZXRVc2VyUG9zdHMgfSBmcm9tIFwiLi4vYXBpLmpzXCI7XG5cbmltcG9ydCBsaWtlQWN0aXZlSWNvbiBmcm9tIFwiLi4vYXNzZXRzL2ltYWdlcy9saWtlLWFjdGl2ZS5zdmdcIjtcbmltcG9ydCBsaWtlTm90QWN0aXZlSWNvbiBmcm9tIFwiLi4vYXNzZXRzL2ltYWdlcy9saWtlLW5vdC1hY3RpdmUuc3ZnXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW5kZXJVc2VyUG9zdHNQYWdlQ29tcG9uZW50KHsgYXBwRWwsIHVzZXJJZCB9KSB7XG4gIGFwcEVsLmlubmVySFRNTCA9IFwiPHA+0JfQsNCz0YDRg9C30LrQsCDQv9C+0YHRgtC+0LIuLi48L3A+XCI7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCB1c2VyUG9zdHMgPSBhd2FpdCBnZXRVc2VyUG9zdHMoeyB1c2VySWQgfSk7XG4gICAgd2luZG93LnVzZXJQb3N0cyA9IHVzZXJQb3N0czsgLy/QtNC70Y8g0YHQuNC90YXRgNC+0L3QuNC30LDRhtC40LhcblxuICAgIGNvbnN0IHJlbmRlclBvc3RzID0gKHBvc3RzQXJyYXkpID0+IHtcbiAgICAgIHJldHVybiBwb3N0c0FycmF5XG4gICAgICAgIC5tYXAocG9zdCA9PiB7XG4gICAgICAgICAgY29uc3QgcG9zdERhdGUgPSBuZXcgRGF0ZShwb3N0LmNyZWF0ZWRBdCk7XG5cbiAgICAgICAgICAvLyDQv9GA0L7QstC10YDRj9C10Lwg0LvQsNC50Log0LLQviDQstGB0LXRhSDQvNCw0YHRgdC40LLQsNGFXG4gICAgICAgICAgY29uc3QgYWxsUG9zdHMgPSBbLi4uZ2xvYmFsUG9zdHMsIC4uLih3aW5kb3cudXNlclBvc3RzIHx8IFtdKV07XG4gICAgICAgICAgY29uc3QgcG9zdEdsb2JhbCA9IGFsbFBvc3RzLmZpbmQocCA9PiBwLmlkID09PSBwb3N0LmlkKTtcbiAgICAgICAgICBjb25zdCBpc0xpa2VkID0gcG9zdEdsb2JhbD8ubGlrZXMuc29tZShsID0+IGwuaWQgPT09IHVzZXI/Ll9pZCk7XG4gICAgICAgICAgY29uc3QgbGlrZUltYWdlID0gaXNMaWtlZCA/IGxpa2VBY3RpdmVJY29uIDogbGlrZU5vdEFjdGl2ZUljb247XG5cbiAgICAgICAgICByZXR1cm4gYFxuICAgICAgICAgICAgPGxpIGNsYXNzPVwicG9zdFwiIGRhdGEtcG9zdC1pZD1cIiR7cG9zdC5pZH1cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBvc3QtaGVhZGVyXCIgZGF0YS11c2VyLWlkPVwiJHtwb3N0LnVzZXIuaWR9XCI+XG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCIke3Bvc3QudXNlci5pbWFnZVVybH1cIiBjbGFzcz1cInBvc3QtaGVhZGVyX191c2VyLWltYWdlXCI+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJwb3N0LWhlYWRlcl9fdXNlci1uYW1lXCI+JHtwb3N0LnVzZXIubmFtZX08L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicG9zdC1pbWFnZS1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwicG9zdC1pbWFnZVwiIHNyYz1cIiR7cG9zdC5pbWFnZVVybH1cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGVhcnQtb3ZlcmxheVwiPjwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBvc3QtbGlrZXNcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtcG9zdC1pZD1cIiR7cG9zdC5pZH1cIiBjbGFzcz1cImxpa2UtYnV0dG9uXCI+XG4gICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7bGlrZUltYWdlfVwiPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicG9zdC1saWtlcy10ZXh0XCI+XG4gICAgICAgICAgICAgICAgICDQndGA0LDQstC40YLRgdGPOiA8c3Ryb25nPiR7cG9zdC5saWtlcy5sZW5ndGh9PC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICR7XG4gICAgICAgICAgICAgICAgICBwb3N0LnVzZXIuaWQgPT09IHVzZXI/Ll9pZFxuICAgICAgICAgICAgICAgICAgICA/IGA8YnV0dG9uIGNsYXNzPVwiZGVsZXRlLWJ1dHRvblwiIGRhdGEtcG9zdC1pZD1cIiR7cG9zdC5pZH1cIj7Qo9C00LDQu9C40YLRjDwvYnV0dG9uPmBcbiAgICAgICAgICAgICAgICAgICAgOiBcIlwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHAgY2xhc3M9XCJwb3N0LXRleHRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVzZXItbmFtZVwiPiR7cG9zdC51c2VyLm5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICR7cG9zdC5kZXNjcmlwdGlvbn1cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICA8cCBjbGFzcz1cInBvc3QtZGF0ZVwiPlxuICAgICAgICAgICAgICAgICR7Zm9ybWF0RGlzdGFuY2VUb05vdyhwb3N0RGF0ZSwgeyBhZGRTdWZmaXg6IHRydWUsIGxvY2FsZTogcnUgfSl9XG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgYDtcbiAgICAgICAgfSlcbiAgICAgICAgLmpvaW4oXCJcIik7XG4gICAgfTtcblxuICAgIGFwcEVsLmlubmVySFRNTCA9IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJwYWdlLWNvbnRhaW5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLWNvbnRhaW5lclwiPjwvZGl2PlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYmFjay1idXR0b25cIj7ihpAg0J3QsNC30LDQtDwvYnV0dG9uPlxuICAgICAgICA8dWwgY2xhc3M9XCJwb3N0c1wiPiR7cmVuZGVyUG9zdHModXNlclBvc3RzKX08L3VsPlxuICAgICAgPC9kaXY+XG4gICAgYDtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYmFjay1idXR0b25cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGdvVG9QYWdlKFBPU1RTX1BBR0UpKTtcblxuICAgIHJlbmRlckhlYWRlckNvbXBvbmVudCh7IGVsZW1lbnQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVhZGVyLWNvbnRhaW5lclwiKSB9KTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucG9zdC1oZWFkZXJcIikuZm9yRWFjaCh1c2VyRWwgPT4ge1xuICAgICAgdXNlckVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNsaWNrZWRVc2VySWQgPSB1c2VyRWwuZGF0YXNldC51c2VySWQ7XG4gICAgICAgIGlmICh3aW5kb3cuY3VycmVudFVzZXJQb3N0c0lkID09PSBjbGlja2VkVXNlcklkKSByZXR1cm47XG4gICAgICAgIHdpbmRvdy5jdXJyZW50VXNlclBvc3RzSWQgPSBjbGlja2VkVXNlcklkO1xuICAgICAgICBnb1RvUGFnZShVU0VSX1BPU1RTX1BBR0UsIHsgdXNlcklkOiBjbGlja2VkVXNlcklkIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyDQu9Cw0LnQutC4INGBINCw0L3QuNC80LDRhtC40LXQuVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubGlrZS1idXR0b25cIikuZm9yRWFjaChidXR0b24gPT4ge1xuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHBvc3RJZCA9IGJ1dHRvbi5kYXRhc2V0LnBvc3RJZDtcbiAgICAgICAgY29uc3QgaW1nRWwgPSBidXR0b24ucXVlcnlTZWxlY3RvcihcImltZ1wiKTtcbiAgICAgICAgY29uc3QgbGlrZXNUZXh0RWwgPSBidXR0b24ubmV4dEVsZW1lbnRTaWJsaW5nO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgbmV3TGlrZXNDb3VudCA9IGF3YWl0IHRvZ2dsZUxpa2UocG9zdElkKTtcblxuICAgICAgICAgIGNvbnN0IGFsbFBvc3RzID0gWy4uLmdsb2JhbFBvc3RzLCAuLi4od2luZG93LnVzZXJQb3N0cyB8fCBbXSldO1xuICAgICAgICAgIGNvbnN0IHBvc3QgPSBhbGxQb3N0cy5maW5kKHAgPT4gcC5pZCA9PT0gcG9zdElkKTtcbiAgICAgICAgICBjb25zdCBpc0xpa2VkID0gcG9zdC5saWtlcy5zb21lKGwgPT4gbC5pZCA9PT0gdXNlci5faWQpO1xuXG4gICAgICAgICAgaW1nRWwuc3JjID0gaXNMaWtlZCA/IGxpa2VBY3RpdmVJY29uIDogbGlrZU5vdEFjdGl2ZUljb247XG5cbiAgICAgICAgICBjb25zdCBvdmVybGF5ID0gYnV0dG9uLmNsb3Nlc3QoXCIucG9zdFwiKS5xdWVyeVNlbGVjdG9yKFwiLmhlYXJ0LW92ZXJsYXlcIik7XG4gICAgICAgICAgaWYgKGlzTGlrZWQpIHtcbiAgICAgICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LmFkZChcInNob3ctaGVhcnRcIik7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IG92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZShcInNob3ctaGVhcnRcIiksIDgwMCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGlrZXNUZXh0RWwucXVlcnlTZWxlY3RvcihcInN0cm9uZ1wiKS50ZXh0Q29udGVudCA9IG5ld0xpa2VzQ291bnQ7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5kZWxldGUtYnV0dG9uXCIpLmZvckVhY2goKGJ1dHRvbiwgaW5kZXgpID0+IHtcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCBwb3N0ID0gdXNlclBvc3RzW2luZGV4XTtcbiAgICAgICAgaWYgKCFjb25maXJtKFwi0JLRiyDRgtC+0YfQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDQv9C+0YHRgj9cIikpIHJldHVybjtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIGF3YWl0IGRlbGV0ZVBvc3QoeyBwb3N0SWQ6IHBvc3QuaWQsIHRva2VuOiB1c2VyLnRva2VuIH0pO1xuICAgICAgICAgIHVzZXJQb3N0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgIHdpbmRvdy51c2VyUG9zdHMgPSB1c2VyUG9zdHM7XG4gICAgICAgICAgYnV0dG9uLmNsb3Nlc3QoXCJsaS5wb3N0XCIpLnJlbW92ZSgpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLQntGI0LjQsdC60LAg0L/RgNC4INGD0LTQsNC70LXQvdC40Lgg0L/QvtGB0YLQsDpcIiwgZXJyb3IpO1xuICAgICAgICAgIGFsZXJ0KFwi0J3QtSDRg9C00LDQu9C+0YHRjCDRg9C00LDQu9C40YLRjCDQv9C+0YHRglwiKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB3aW5kb3cuY3VycmVudFVzZXJQb3N0c0lkID0gdXNlcklkO1xuXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcItCe0YjQuNCx0LrQsCDQv9GA0Lgg0LfQsNCz0YDRg9C30LrQtSDQv9C+0YHRgtC+0LIg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GPOlwiLCBlcnJvcik7XG4gICAgYXBwRWwuaW5uZXJIVE1MID0gXCI8cD7QndC1INGD0LTQsNC70L7RgdGMINC30LDQs9GA0YPQt9C40YLRjCDQv9C+0YHRgtGLINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjzwvcD5cIjtcbiAgfVxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIHNhdmVVc2VyVG9Mb2NhbFN0b3JhZ2UodXNlcikge1xuICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ1c2VyXCIsIEpTT04uc3RyaW5naWZ5KHVzZXIpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFVzZXJGcm9tTG9jYWxTdG9yYWdlKHVzZXIpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZSh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1c2VyXCIpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlVXNlckZyb21Mb2NhbFN0b3JhZ2UodXNlcikge1xuICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJ1c2VyXCIpO1xufVxuIiwiaW1wb3J0IFwiLi9zdHlsZXMuY3NzXCI7XG5pbXBvcnQgXCIuL3VpLWtpdC5jc3NcIjtcblxuaW1wb3J0IHsgZ2V0UG9zdHMsIGFkZFBvc3QsIGxpa2VQb3N0LCB1bmxpa2VQb3N0IH0gZnJvbSBcIi4vYXBpLmpzXCI7XG5pbXBvcnQgeyByZW5kZXJBZGRQb3N0UGFnZUNvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvYWRkLXBvc3QtcGFnZS1jb21wb25lbnQuanNcIjtcbmltcG9ydCB7IHJlbmRlckF1dGhQYWdlQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9hdXRoLXBhZ2UtY29tcG9uZW50LmpzXCI7XG5pbXBvcnQgeyByZW5kZXJQb3N0c1BhZ2VDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL3Bvc3RzLXBhZ2UtY29tcG9uZW50LmpzXCI7XG5pbXBvcnQgeyByZW5kZXJMb2FkaW5nUGFnZUNvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvbG9hZGluZy1wYWdlLWNvbXBvbmVudC5qc1wiO1xuaW1wb3J0IHsgcmVuZGVyVXNlclBvc3RzUGFnZUNvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvdXNlci1wb3N0cy1wYWdlLWNvbXBvbmVudC5qc1wiO1xuXG5pbXBvcnQge1xuICBBRERfUE9TVFNfUEFHRSxcbiAgQVVUSF9QQUdFLFxuICBMT0FESU5HX1BBR0UsXG4gIFBPU1RTX1BBR0UsXG4gIFVTRVJfUE9TVFNfUEFHRSxcbn0gZnJvbSBcIi4vcm91dGVzLmpzXCI7XG5cbmltcG9ydCB7XG4gIGdldFVzZXJGcm9tTG9jYWxTdG9yYWdlLFxuICByZW1vdmVVc2VyRnJvbUxvY2FsU3RvcmFnZSxcbiAgc2F2ZVVzZXJUb0xvY2FsU3RvcmFnZSxcbn0gZnJvbSBcIi4vaGVscGVycy5qc1wiO1xuXG5leHBvcnQgeyBQT1NUU19QQUdFLCBBRERfUE9TVFNfUEFHRSwgQVVUSF9QQUdFLCBMT0FESU5HX1BBR0UsIFVTRVJfUE9TVFNfUEFHRSB9O1xuXG5leHBvcnQgbGV0IHVzZXIgPSBnZXRVc2VyRnJvbUxvY2FsU3RvcmFnZSgpO1xuZXhwb3J0IGxldCBwYWdlID0gbnVsbDtcbmV4cG9ydCBsZXQgcG9zdHMgPSBbXTtcblxuLy8g0J/QvtC70YPRh9C10L3QuNC1INGC0L7QutC10L3QsFxuZXhwb3J0IGNvbnN0IGdldFRva2VuID0gKCkgPT4gKHVzZXIgPyB1c2VyLnRva2VuIDogdW5kZWZpbmVkKTtcblxuLy8g0JLRi9GF0L7QtFxuZXhwb3J0IGNvbnN0IGxvZ291dCA9ICgpID0+IHtcbiAgdXNlciA9IG51bGw7XG4gIHJlbW92ZVVzZXJGcm9tTG9jYWxTdG9yYWdlKCk7XG4gIGdvVG9QYWdlKFBPU1RTX1BBR0UpO1xufTtcblxuLy/QpNGD0L3QutGG0LjRjyDRgdC40L3RhdGA0L7QvdC40LfQsNGG0LjQuCDQu9Cw0LnQutC+0LJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB0b2dnbGVMaWtlKHBvc3RJZCkge1xuICBpZiAoIXVzZXIpIHtcbiAgICBhbGVydChcItCS0L7QudC00LjRgtC1LCDRh9GC0L7QsdGLINGB0YLQsNCy0LjRgtGMINC70LDQudC60LhcIik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8g0JjRidC10Lwg0L/QvtGB0YIg0LLQviDQstGB0LXRhSDQvNCw0YHRgdC40LLQsNGFXG4gIGNvbnN0IGFycmF5cyA9IFtwb3N0cywgd2luZG93LnVzZXJQb3N0cyB8fCBbXV07XG4gIGxldCBwb3N0O1xuICBmb3IgKGNvbnN0IGFyciBvZiBhcnJheXMpIHtcbiAgICBwb3N0ID0gYXJyLmZpbmQoKHApID0+IHAuaWQgPT09IHBvc3RJZCk7XG4gICAgaWYgKHBvc3QpIGJyZWFrO1xuICB9XG5cbiAgaWYgKCFwb3N0KSB7XG4gICAgY29uc29sZS5lcnJvcihcItCf0L7RgdGCINC90LUg0L3QsNC50LTQtdC9XCIsIHBvc3RJZCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgaXNMaWtlZCA9IHBvc3QubGlrZXMuc29tZSgobCkgPT4gbC5pZCA9PT0gdXNlci5faWQpO1xuXG4gIHRyeSB7XG4gICAgaWYgKGlzTGlrZWQpIHtcbiAgICAgIGF3YWl0IHVubGlrZVBvc3QoeyBwb3N0SWQsIHRva2VuOiB1c2VyLnRva2VuIH0pO1xuICAgICAgcG9zdC5saWtlcyA9IHBvc3QubGlrZXMuZmlsdGVyKGwgPT4gbC5pZCAhPT0gdXNlci5faWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhd2FpdCBsaWtlUG9zdCh7IHBvc3RJZCwgdG9rZW46IHVzZXIudG9rZW4gfSk7XG4gICAgICBwb3N0Lmxpa2VzLnB1c2goeyBpZDogdXNlci5faWQsIG5hbWU6IHVzZXIubmFtZSB9KTtcbiAgICB9XG5cbiAgICAvL9Ch0LjQvdGF0YDQvtC90LjQt9C40YDRg9C10Lwg0LvQsNC50LrQuCDQstC+INCy0YHQtdGFINC80LDRgdGB0LjQstCw0YVcbiAgICBhcnJheXMuZm9yRWFjaChhcnIgPT4ge1xuICAgICAgY29uc3QgcCA9IGFyci5maW5kKHAgPT4gcC5pZCA9PT0gcG9zdElkKTtcbiAgICAgIGlmIChwKSBwLmxpa2VzID0gcG9zdC5saWtlcztcbiAgICB9KTtcblxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCLQntGI0LjQsdC60LAg0LvQsNC50LrQsFwiLCBlcnJvcik7XG4gICAgYWxlcnQoXCLQndC1INGD0LTQsNC70L7RgdGMINC/0L7RgdGC0LDQstC40YLRjC/Rg9Cx0YDQsNGC0Ywg0LvQsNC50LpcIik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcmV0dXJuIHBvc3QubGlrZXMubGVuZ3RoO1xufVxuXG5cbi8v0J/QtdGA0LXRhdC+0LQg0L3QsCDRgdGC0YDQsNC90LjRhtGLXG5leHBvcnQgY29uc3QgZ29Ub1BhZ2UgPSAobmV3UGFnZSwgZGF0YSkgPT4ge1xuICBpZiAoXG4gICAgW1BPU1RTX1BBR0UsIEFVVEhfUEFHRSwgQUREX1BPU1RTX1BBR0UsIFVTRVJfUE9TVFNfUEFHRSwgTE9BRElOR19QQUdFXS5pbmNsdWRlcyhuZXdQYWdlKVxuICApIHtcbiAgICBpZiAobmV3UGFnZSA9PT0gQUREX1BPU1RTX1BBR0UpIHtcbiAgICAgIHBhZ2UgPSB1c2VyID8gQUREX1BPU1RTX1BBR0UgOiBBVVRIX1BBR0U7XG4gICAgICByZXR1cm4gcmVuZGVyQXBwKCk7XG4gICAgfVxuXG4gICAgaWYgKG5ld1BhZ2UgPT09IFBPU1RTX1BBR0UpIHtcbiAgICAgIHBhZ2UgPSBMT0FESU5HX1BBR0U7XG4gICAgICByZW5kZXJBcHAoKTtcblxuICAgICAgcmV0dXJuIGdldFBvc3RzKHsgdG9rZW46IGdldFRva2VuKCkgfSlcbiAgICAgICAgLnRoZW4oKG5ld1Bvc3RzKSA9PiB7XG4gICAgICAgICAgcGFnZSA9IFBPU1RTX1BBR0U7XG4gICAgICAgICAgcG9zdHMgPSBuZXdQb3N0cztcbiAgICAgICAgICByZW5kZXJBcHAoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgIGdvVG9QYWdlKFBPU1RTX1BBR0UpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAobmV3UGFnZSA9PT0gVVNFUl9QT1NUU19QQUdFKSB7XG4gICAgICBjb25zb2xlLmxvZyhcItCe0YLQutGA0YvQstCw0Y4g0YHRgtGA0LDQvdC40YbRgyDQv9C+0LvRjNC30L7QstCw0YLQtdC70Y86IFwiLCBkYXRhLnVzZXJJZCk7XG4gICAgICBwYWdlID0gVVNFUl9QT1NUU19QQUdFO1xuICAgICAgY29uc3QgYXBwRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFwcFwiKTtcbiAgICAgIHJldHVybiByZW5kZXJVc2VyUG9zdHNQYWdlQ29tcG9uZW50KHsgYXBwRWwsIHVzZXJJZDogZGF0YS51c2VySWQgfSk7XG4gICAgfVxuXG4gICAgcGFnZSA9IG5ld1BhZ2U7XG4gICAgcmVuZGVyQXBwKCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhyb3cgbmV3IEVycm9yKFwi0YHRgtGA0LDQvdC40YbRiyDQvdC1INGB0YPRidC10YHRgtCy0YPQtdGCXCIpO1xufTtcblxuLy8g0KDQtdC90LTQtdGAINC/0YDQuNC70L7QttC10L3QuNGPXG5jb25zdCByZW5kZXJBcHAgPSAoKSA9PiB7XG4gIGNvbnN0IGFwcEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhcHBcIik7XG5cbiAgc3dpdGNoIChwYWdlKSB7XG4gICAgY2FzZSBMT0FESU5HX1BBR0U6XG4gICAgICByZW5kZXJMb2FkaW5nUGFnZUNvbXBvbmVudCh7IGFwcEVsLCB1c2VyLCBnb1RvUGFnZSB9KTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBBVVRIX1BBR0U6XG4gICAgICByZW5kZXJBdXRoUGFnZUNvbXBvbmVudCh7XG4gICAgICAgIGFwcEVsLFxuICAgICAgICBzZXRVc2VyOiAobmV3VXNlcikgPT4ge1xuICAgICAgICAgIHVzZXIgPSBuZXdVc2VyO1xuICAgICAgICAgIHNhdmVVc2VyVG9Mb2NhbFN0b3JhZ2UodXNlcik7XG4gICAgICAgICAgZ29Ub1BhZ2UoUE9TVFNfUEFHRSk7XG4gICAgICAgIH0sXG4gICAgICAgIHVzZXIsXG4gICAgICAgIGdvVG9QYWdlLFxuICAgICAgfSk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgQUREX1BPU1RTX1BBR0U6XG4gICAgICByZW5kZXJBZGRQb3N0UGFnZUNvbXBvbmVudCh7XG4gICAgICAgIGFwcEVsLFxuICAgICAgICBvbkFkZFBvc3RDbGljazogYXN5bmMgKHsgZGVzY3JpcHRpb24sIGltYWdlVXJsIH0pID0+IHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcG9zdCA9IGF3YWl0IGFkZFBvc3Qoe1xuICAgICAgICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgaW1hZ2VVcmwsXG4gICAgICAgICAgICAgIHRva2VuOiBnZXRUb2tlbigpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcItCf0L7RgdGCINC00L7QsdCw0LLQu9C10L06XCIsIHBvc3QpO1xuICAgICAgICAgICAgZ29Ub1BhZ2UoUE9TVFNfUEFHRSk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLQntGI0LjQsdC60LAg0L/RgNC4INC00L7QsdCw0LLQu9C10L3QuNC4INC/0L7RgdGC0LBcIiwgZXJyb3IpO1xuICAgICAgICAgICAgYWxlcnQoXCLQntGI0LjQsdC60LAg0L/RgNC4INC00L7QsdCw0LLQu9C10L3QuNC4INC/0L7RgdGC0LBcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgUE9TVFNfUEFHRTpcbiAgICAgIHJlbmRlclBvc3RzUGFnZUNvbXBvbmVudCh7IGFwcEVsIH0pO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIFVTRVJfUE9TVFNfUEFHRTpcbiAgICAgIGFwcEVsLmlubmVySFRNTCA9IFwi0JfQtNC10YHRjCDQsdGD0LTQtdGCINGB0YLRgNCw0L3QuNGG0LAg0YTQvtGC0L7Qs9GA0LDRhNC40Lkg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GPXCI7XG4gICAgICBicmVhaztcbiAgfVxufTtcblxuLy/Ql9Cw0L/Rg9GB0Log0L/RgNC40LvQvtC20LXQvdC40Y9cbmdvVG9QYWdlKFBPU1RTX1BBR0UpO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcImRhdGE6aW1hZ2Uvc3ZnK3htbCwlM0NzdmcgaWQ9JTI3TGF5ZXJfMSUyNyBkYXRhLW5hbWU9JTI3TGF5ZXIgMSUyNyB4bWxucz0lMjdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyUyNyB2aWV3Qm94PSUyNzAgMCAxMjIuODggMTIyLjg4JTI3JTNFJTNDdGl0bGUlM0VhZGQlM0MvdGl0bGUlM0UlM0NwYXRoIGQ9JTI3TTYxLjQ0LDBBNjEuNDYsNjEuNDYsMCwxLDEsMTgsMTgsNjEuMjUsNjEuMjUsMCwwLDEsNjEuNDQsMFpNODguNiw1Ni44MnY5LjI0YTQsNCwwLDAsMS00LDRINzBWODQuNjJhNCw0LDAsMCwxLTQsNEg1Ni44MmE0LDQsMCwwLDEtNC00VjcwSDM4LjI2YTQsNCwwLDAsMS00LTRWNTYuODJhNCw0LDAsMCwxLDQtNEg1Mi44NFYzOC4yNmE0LDQsMCwwLDEsNC00aDkuMjRhNCw0LDAsMCwxLDQsNFY1Mi44NEg4NC42MmE0LDQsMCwwLDEsNCw0Wm04LjgzLTMxLjM3YTUwLjkyLDUwLjkyLDAsMSwwLDE0LjksMzYsNTAuNzgsNTAuNzgsMCwwLDAtMTQuOS0zNlolMjcvJTNFJTNDL3N2ZyUzRVwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgLnBhZ2UtY29udGFpbmVyIHtcbiAgcGFkZGluZzogMCAyMHB4O1xufVxuXG4ucGFnZS1oZWFkZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZTBlMGUwO1xuICBwYWRkaW5nOiAyMHB4IDE2cHg7XG4gIG1hcmdpbi1sZWZ0OiAtMjBweDtcbiAgbWFyZ2luLXJpZ2h0OiAtMjBweDtcbn1cblxuLmxvZ28ge1xuICBtYXJnaW46IDA7XG4gIGZvbnQtc2l6ZTogMjhweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB3aWR0aDogMTMwcHg7XG59XG5cbi5oZWFkZXItY29udGFpbmVyIHtcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xufVxuXG4uaGVhZGVyLWJ1dHRvbiB7XG4gIHBhZGRpbmc6IDA7XG4gIGJvcmRlcjogbm9uZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgbGluZS1oZWlnaHQ6IDE4cHg7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmxvZ291dC1idXR0b24ge1xuICB3aWR0aDogMTMwcHg7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xufVxuXG4ucG9zdHMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBsaXN0LXN0eWxlOiBub25lO1xuICBwYWRkaW5nOiAwO1xuICBtYXJnaW46IDA7XG59XG5cbi5wb3N0LWhlYWRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLnBvc3QtaGVhZGVyX191c2VyLWltYWdlIHtcbiAgd2lkdGg6IDQwcHg7XG4gIGhlaWdodDogNDBweDtcbiAgb2JqZWN0LWZpdDogY292ZXI7XG4gIGJvcmRlci1yYWRpdXM6IDQwcHg7XG4gIG1hcmdpbi1yaWdodDogMTBweDtcbn1cblxuLnBvc3QtaW1hZ2UtY29udGFpbmVyIHtcbiAgbWFyZ2luLWxlZnQ6IC0yMHB4O1xuICBtYXJnaW4tcmlnaHQ6IC0yMHB4O1xuICBoZWlnaHQ6IDUwMHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2UwZTBlMDtcbn1cblxuLnBvc3QtaW1hZ2Uge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBtYXgtd2lkdGg6IDUwMHB4O1xuICBvYmplY3QtZml0OiBjb3Zlcjtcbn1cblxuLnBvc3QtbGlrZXMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4ubGlrZS1idXR0b24ge1xuICBib3JkZXI6IG5vbmU7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICBwYWRkaW5nOiA4cHg7XG4gIHBhZGRpbmctbGVmdDogMHB4O1xuICBwYWRkaW5nLWJvdHRvbTogNXB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi51c2VyLW5hbWUge1xuICBmb250LXdlaWdodDogNTAwO1xufVxuXG4ucG9zdC10ZXh0IHtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBsaW5lLWhlaWdodDogMThweDtcbiAgbWFyZ2luLXRvcDogNXB4O1xufVxuXG4ucG9zdC1kYXRlIHtcbiAgY29sb3I6ICM4YThhOGE7XG59XG5cbi5wb3N0ICsgLnBvc3Qge1xuICBtYXJnaW4tdG9wOiAyMHB4O1xufVxuXG4ucG9zdHMtdXNlci1oZWFkZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBtYXJnaW4tYm90dG9tOiAxMnB4O1xufVxuXG4ucG9zdHMtdXNlci1oZWFkZXJfX3VzZXItaW1hZ2Uge1xuICB3aWR0aDogNzBweDtcbiAgaGVpZ2h0OiA3MHB4O1xuICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgYm9yZGVyLXJhZGl1czogNDBweDtcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xufVxuXG4ucG9zdHMtdXNlci1oZWFkZXJfX3VzZXItbmFtZSB7XG4gIGZvbnQtc2l6ZTogMjhweDtcbiAgbGluZS1oZWlnaHQ6IDM1cHg7XG59XG5cbi5sb2FkaW5nLXBhZ2Uge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgbWFyZ2luLXRvcDogMTAwcHg7XG59XG5cbi5hZGQtcG9zdC1zaWduIHtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fX30pO1xuICBoZWlnaHQ6IDMwcHg7XG4gIHdpZHRoOiAzMHB4O1xufVxuXG4uZm9ybSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4uZm9ybS10aXRsZSB7XG4gIGZvbnQtc2l6ZTogMjhweDtcbiAgbGluZS1oZWlnaHQ6IDM1cHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmZvcm0taW5wdXRzIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiAxMHB4O1xufVxuXG4uZm9ybS1lcnJvciB7XG4gIGNvbG9yOiByZWQ7XG59XG5cbi5mb3JtLWZvb3RlciB7XG4gIG1hcmdpbi10b3A6IDUwcHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogMTBweDtcbn1cblxuLmZvcm0tZm9vdGVyLXRpdGxlIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uZmlsZS11cGxvYWQtaW1hZ2UtY29ucmFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLmZpbGUtdXBsb2FkLWltYWdlIHtcbiAgd2lkdGg6IDEwMHB4O1xuICBoZWlnaHQ6IDEwMHB4O1xuICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCBncmF5O1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG59XG5cbi5maWxlLXVwbG9hZC1sYWJlbCB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgd2lkdGg6IDEwMCU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3R5bGVzLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLG1CQUFtQjtFQUNuQixnQ0FBZ0M7RUFDaEMsa0JBQWtCO0VBQ2xCLGtCQUFrQjtFQUNsQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxTQUFTO0VBQ1QsZUFBZTtFQUNmLGVBQWU7RUFDZixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsWUFBWTtFQUNaLDZCQUE2QjtFQUM3QixlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLGdCQUFnQjtFQUNoQixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsZ0JBQWdCO0VBQ2hCLFVBQVU7RUFDVixTQUFTO0FBQ1g7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLG1CQUFtQjtFQUNuQixtQkFBbUI7RUFDbkIsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0VBQ1osaUJBQWlCO0VBQ2pCLG1CQUFtQjtFQUNuQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsbUJBQW1CO0VBQ25CLGFBQWE7RUFDYixhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0VBQ1osZ0JBQWdCO0VBQ2hCLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLDZCQUE2QjtFQUM3QixZQUFZO0VBQ1osaUJBQWlCO0VBQ2pCLG1CQUFtQjtFQUNuQixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGlCQUFpQjtFQUNqQixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsbUJBQW1CO0VBQ25CLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0VBQ1osaUJBQWlCO0VBQ2pCLG1CQUFtQjtFQUNuQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSx5REFBZ2dCO0VBQ2hnQixZQUFZO0VBQ1osV0FBVztBQUNiOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsU0FBUztBQUNYOztBQUVBO0VBQ0UsVUFBVTtBQUNaOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsU0FBUztBQUNYOztBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixhQUFhO0VBQ2IsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQixzQkFBc0I7RUFDdEIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLHNCQUFzQjtFQUN0QixXQUFXO0VBQ1gsa0JBQWtCO0FBQ3BCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi5wYWdlLWNvbnRhaW5lciB7XFxuICBwYWRkaW5nOiAwIDIwcHg7XFxufVxcblxcbi5wYWdlLWhlYWRlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZTBlMGUwO1xcbiAgcGFkZGluZzogMjBweCAxNnB4O1xcbiAgbWFyZ2luLWxlZnQ6IC0yMHB4O1xcbiAgbWFyZ2luLXJpZ2h0OiAtMjBweDtcXG59XFxuXFxuLmxvZ28ge1xcbiAgbWFyZ2luOiAwO1xcbiAgZm9udC1zaXplOiAyOHB4O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgd2lkdGg6IDEzMHB4O1xcbn1cXG5cXG4uaGVhZGVyLWNvbnRhaW5lciB7XFxuICBtYXJnaW4tYm90dG9tOiA4cHg7XFxufVxcblxcbi5oZWFkZXItYnV0dG9uIHtcXG4gIHBhZGRpbmc6IDA7XFxuICBib3JkZXI6IG5vbmU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIGxpbmUtaGVpZ2h0OiAxOHB4O1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLmxvZ291dC1idXR0b24ge1xcbiAgd2lkdGg6IDEzMHB4O1xcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XFxufVxcblxcbi5wb3N0cyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG4ucG9zdC1oZWFkZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLnBvc3QtaGVhZGVyX191c2VyLWltYWdlIHtcXG4gIHdpZHRoOiA0MHB4O1xcbiAgaGVpZ2h0OiA0MHB4O1xcbiAgb2JqZWN0LWZpdDogY292ZXI7XFxuICBib3JkZXItcmFkaXVzOiA0MHB4O1xcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xcbn1cXG5cXG4ucG9zdC1pbWFnZS1jb250YWluZXIge1xcbiAgbWFyZ2luLWxlZnQ6IC0yMHB4O1xcbiAgbWFyZ2luLXJpZ2h0OiAtMjBweDtcXG4gIGhlaWdodDogNTAwcHg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTBlMGUwO1xcbn1cXG5cXG4ucG9zdC1pbWFnZSB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIG1heC13aWR0aDogNTAwcHg7XFxuICBvYmplY3QtZml0OiBjb3ZlcjtcXG59XFxuXFxuLnBvc3QtbGlrZXMge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4ubGlrZS1idXR0b24ge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICBwYWRkaW5nOiA4cHg7XFxuICBwYWRkaW5nLWxlZnQ6IDBweDtcXG4gIHBhZGRpbmctYm90dG9tOiA1cHg7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi51c2VyLW5hbWUge1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG59XFxuXFxuLnBvc3QtdGV4dCB7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBsaW5lLWhlaWdodDogMThweDtcXG4gIG1hcmdpbi10b3A6IDVweDtcXG59XFxuXFxuLnBvc3QtZGF0ZSB7XFxuICBjb2xvcjogIzhhOGE4YTtcXG59XFxuXFxuLnBvc3QgKyAucG9zdCB7XFxuICBtYXJnaW4tdG9wOiAyMHB4O1xcbn1cXG5cXG4ucG9zdHMtdXNlci1oZWFkZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgbWFyZ2luLWJvdHRvbTogMTJweDtcXG59XFxuXFxuLnBvc3RzLXVzZXItaGVhZGVyX191c2VyLWltYWdlIHtcXG4gIHdpZHRoOiA3MHB4O1xcbiAgaGVpZ2h0OiA3MHB4O1xcbiAgb2JqZWN0LWZpdDogY292ZXI7XFxuICBib3JkZXItcmFkaXVzOiA0MHB4O1xcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xcbn1cXG5cXG4ucG9zdHMtdXNlci1oZWFkZXJfX3VzZXItbmFtZSB7XFxuICBmb250LXNpemU6IDI4cHg7XFxuICBsaW5lLWhlaWdodDogMzVweDtcXG59XFxuXFxuLmxvYWRpbmctcGFnZSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBtYXJnaW4tdG9wOiAxMDBweDtcXG59XFxuXFxuLmFkZC1wb3N0LXNpZ24ge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcXCJkYXRhOmltYWdlL3N2Zyt4bWwsJTNDc3ZnIGlkPSdMYXllcl8xJyBkYXRhLW5hbWU9J0xheWVyIDEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgdmlld0JveD0nMCAwIDEyMi44OCAxMjIuODgnJTNFJTNDdGl0bGUlM0VhZGQlM0MvdGl0bGUlM0UlM0NwYXRoIGQ9J002MS40NCwwQTYxLjQ2LDYxLjQ2LDAsMSwxLDE4LDE4LDYxLjI1LDYxLjI1LDAsMCwxLDYxLjQ0LDBaTTg4LjYsNTYuODJ2OS4yNGE0LDQsMCwwLDEtNCw0SDcwVjg0LjYyYTQsNCwwLDAsMS00LDRINTYuODJhNCw0LDAsMCwxLTQtNFY3MEgzOC4yNmE0LDQsMCwwLDEtNC00VjU2LjgyYTQsNCwwLDAsMSw0LTRINTIuODRWMzguMjZhNCw0LDAsMCwxLDQtNGg5LjI0YTQsNCwwLDAsMSw0LDRWNTIuODRIODQuNjJhNCw0LDAsMCwxLDQsNFptOC44My0zMS4zN2E1MC45Miw1MC45MiwwLDEsMCwxNC45LDM2LDUwLjc4LDUwLjc4LDAsMCwwLTE0LjktMzZaJy8lM0UlM0Mvc3ZnJTNFXFxcIik7XFxuICBoZWlnaHQ6IDMwcHg7XFxuICB3aWR0aDogMzBweDtcXG59XFxuXFxuLmZvcm0ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICB3aWR0aDogMTAwJTtcXG59XFxuXFxuLmZvcm0tdGl0bGUge1xcbiAgZm9udC1zaXplOiAyOHB4O1xcbiAgbGluZS1oZWlnaHQ6IDM1cHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbi5mb3JtLWlucHV0cyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGdhcDogMTBweDtcXG59XFxuXFxuLmZvcm0tZXJyb3Ige1xcbiAgY29sb3I6IHJlZDtcXG59XFxuXFxuLmZvcm0tZm9vdGVyIHtcXG4gIG1hcmdpbi10b3A6IDUwcHg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGdhcDogMTBweDtcXG59XFxuXFxuLmZvcm0tZm9vdGVyLXRpdGxlIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLmZpbGUtdXBsb2FkLWltYWdlLWNvbnJhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLmZpbGUtdXBsb2FkLWltYWdlIHtcXG4gIHdpZHRoOiAxMDBweDtcXG4gIGhlaWdodDogMTAwcHg7XFxuICBvYmplY3QtZml0OiBjb3ZlcjtcXG4gIG1hcmdpbi1yaWdodDogMTBweDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGdyYXk7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxufVxcblxcbi5maWxlLXVwbG9hZC1sYWJlbCB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgd2lkdGg6IDEwMCU7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi9hc3NldHMvZm9udHMvc3RyYXRvc3NreWVuZ3dlYi1yZWd1bGFyLndvZmYyXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18gPSBuZXcgVVJMKFwiLi9hc3NldHMvZm9udHMvc3RyYXRvc3NreWVuZ3dlYi1tZWRpdW0ud29mZjJcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMl9fXyA9IG5ldyBVUkwoXCIuL2Fzc2V0cy9pbWFnZXMvbGlrZS1hY3RpdmUuc3ZnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8yX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMl9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYC8qIFxuICDQrdGC0L4g0YHRgtC40LvQuCDQlNC40LfQsNC50L0g0YHQuNGB0YLQtdC80YssINGB0LrQstC+0LfQvdGL0LUg0YHRgtC40LvQuCDQtNC70Y8g0Y3Qu9C10LzQtdC90YLQvtCyINC40L3RgtC10YDRhNC10LnRgdCwXG4gINCy0YHQtdCz0L4g0L/RgNC40LvQvtC20LXQvdC40Y86INGI0YDQuNGE0YLRiywg0LrQvdC+0L/QutC4LCDQuNC90L/Rg9GC0Ysg0Lgg0YLQsNC6INC00LDQu9C10LVcbiovXG5cbkBmb250LWZhY2Uge1xuICBmb250LWZhbWlseTogXCJTdHJhdG9zU2t5ZW5nXCI7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgZm9udC1kaXNwbGF5OiBzd2FwO1xuICBzcmM6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX199KSBmb3JtYXQoXCJ3b2ZmMlwiKTtcbn1cblxuQGZvbnQtZmFjZSB7XG4gIGZvbnQtZmFtaWx5OiBcIlN0cmF0b3NTa3llbmdcIjtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXdlaWdodDogNTAwO1xuICBmb250LWRpc3BsYXk6IHN3YXA7XG4gIHNyYzogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fX30pIGZvcm1hdChcIndvZmYyXCIpO1xufVxuXG5odG1sIHtcbiAgLyog0YHQutGA0YvQstCw0LXRgiDRgdC60YDQvtC70LHQsNGA0Ysg0LIgZmlyZWZveCAqL1xuICBzY3JvbGxiYXItd2lkdGg6IG5vbmU7XG59XG5cbmJvZHkge1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7XG4gIGZvbnQtZmFtaWx5OiBTdHJhdG9zU2t5ZW5nO1xuICBvdmVyZmxvdzogYXV0bztcbiAgZm9udC1zaXplOiAxNHB4O1xuICBsaW5lLWhlaWdodDogMThweDtcbn1cblxuLyog0YHQutGA0YvQstCw0LXRgiDRgdC60YDQvtC70LHQsNGA0Ysg0LIgY2hyb21lICovXG5ib2R5Ojotd2Via2l0LXNjcm9sbGJhciB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5cbnAge1xuICBtYXJnaW46IDA7XG59XG5cbi5idXR0b24sXG4uc2Vjb25kYXJ5LWJ1dHRvbiB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBwYWRkaW5nOiAxMHB4IDEzcHggMTNweDtcbiAgZm9udC1zaXplOiAxOHB4O1xuICBsaW5lLWhlaWdodDogMjJweDtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTY1ZWVmO1xuICBjb2xvcjogI2ZmZmZmZjtcbiAgYm9yZGVyOiBub25lO1xufVxuXG4ubGluay1idXR0b24ge1xuICBkaXNwbGF5OiBpbmxpbmU7XG4gIGJvcmRlcjogMDtcbiAgcGFkZGluZzogMDtcbiAgYmFja2dyb3VuZDogbm9uZTtcbiAgY29sb3I6ICM1NjVlZWY7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmJ1dHRvbjpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM2ZDczZmY7XG59XG5cbi5idXR0b25bZGlzYWJsZWQ9XCJ0cnVlXCJdLFxuLnNlY29uZGFyeS1idXR0b25bZGlzYWJsZWQ9XCJ0cnVlXCJdIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y0ZjVmNjtcbiAgY29sb3I6IHJnYmEoMTUzLCAxNTMsIDE1MywgMC42KTtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG59XG5cbi5idXR0b246YWN0aXZlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzRmNTZjZTtcbn1cblxuLnNlY29uZGFyeS1idXR0b24ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWRlY2ZmO1xuICBjb2xvcjogIzU2NWVlZjtcbn1cblxuLnNlY29uZGFyeS1idXR0b246aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjJlZWZmO1xufVxuXG4uc2Vjb25kYXJ5LWJ1dHRvbjphY3RpdmUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDhkN2ZmO1xufVxuXG4uaW5wdXQge1xuICBoZWlnaHQ6IDM2cHg7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIHBhZGRpbmc6IDE1cHg7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgbGluZS1oZWlnaHQ6IDE4cHg7XG4gIGNvbG9yOiByZ2IoNCwgMTgsIDI3KTtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlOGU4ZTg7XG59XG5cbi5pbnB1dCAuLWVycm9yIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbn1cblxuLmlucHV0OmZvY3VzIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbn1cblxuLnRleHRhcmVhIHtcbiAgcGFkZGluZzogMTVweDtcbiAgcmVzaXplOiBub25lO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDBweDtcbn1cblxuc3Ryb25nIHtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbn1cblxuLyoqINCQ0L3QuNC80LDRhtC40Y8g0LfQsNCz0YDRg9C30LrQuCAqKi9cbi5sb2FkZXIge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgd2lkdGg6IDgwcHg7XG4gIGhlaWdodDogODBweDtcbn1cbi5sb2FkZXIgZGl2IHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDhweDtcbiAgd2lkdGg6IDE2cHg7XG4gIGJhY2tncm91bmQ6ICMwMDA7XG4gIGFuaW1hdGlvbjogbG9hZGVyIDEuMnMgY3ViaWMtYmV6aWVyKDAsIDAuNSwgMC41LCAxKSBpbmZpbml0ZTtcbn1cbi5sb2FkZXIgZGl2Om50aC1jaGlsZCgxKSB7XG4gIGxlZnQ6IDhweDtcbiAgYW5pbWF0aW9uLWRlbGF5OiAtMC4yNHM7XG59XG4ubG9hZGVyIGRpdjpudGgtY2hpbGQoMikge1xuICBsZWZ0OiAzMnB4O1xuICBhbmltYXRpb24tZGVsYXk6IC0wLjEycztcbn1cbi5sb2FkZXIgZGl2Om50aC1jaGlsZCgzKSB7XG4gIGxlZnQ6IDU2cHg7XG4gIGFuaW1hdGlvbi1kZWxheTogMDtcbn1cbkBrZXlmcmFtZXMgbG9hZGVyIHtcbiAgMCUge1xuICAgIHRvcDogOHB4O1xuICAgIGhlaWdodDogNjRweDtcbiAgfVxuICA1MCUsXG4gIDEwMCUge1xuICAgIHRvcDogMjRweDtcbiAgICBoZWlnaHQ6IDMycHg7XG4gIH1cbn1cblxuLmlucHV0LS1sYXJnZSB7XG4gIGhlaWdodDogMTUwcHg7ICAgICAgICAgICAgICAgXG4gIHBhZGRpbmc6IDEycHggMTVweDsgICAgICAgICAgXG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XG4gIHdpZHRoOiAxMDAlO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjOyAgICAgXG4gIGJvcmRlci1yYWRpdXM6IDhweDsgICAgICAgICAgXG4gIGZvbnQtc2l6ZTogMTZweDsgICAgICAgICAgICAgXG4gIGxpbmUtaGVpZ2h0OiAxLjU7XG4gIHJlc2l6ZTogdmVydGljYWw7ICAgICAgICAgICAgIFxuICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgMC4ycywgYm94LXNoYWRvdyAwLjJzO1xufVxuXG4uaW5wdXQtLWxhcmdlOmZvY3VzIHtcbiAgb3V0bGluZTogbm9uZTtcbiAgYm9yZGVyLWNvbG9yOiAjNDA5ZWZmOyAgICAgICBcbiAgYm94LXNoYWRvdzogMCAwIDVweCByZ2JhKDY0LCAxNTgsIDI1NSwgMC41KTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbn1cblxuXG4uaW5wdXQtLWZpbGUge1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDEwMCU7XG4gIHBhZGRpbmc6IDEycHggMTVweDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBsaW5lLWhlaWdodDogMThweDtcbiAgY29sb3I6ICMwNDEyMWI7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y1ZjVmNTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuMnMsIGJvcmRlci1jb2xvciAwLjJzO1xufVxuXG4uaW5wdXQtLWZpbGU6aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTBlMGUwO1xufVxuXG4uYnV0dG9uLS1sYXJnZSB7XG4gIG1hcmdpbi10b3A6IDE1cHg7XG4gIHBhZGRpbmc6IDE0cHggMjRweDtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgY29sb3I6ICNmZmY7XG4gIGJhY2tncm91bmQtY29sb3I6ICM0MDllZmY7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4ycztcbn1cblxuLmJ1dHRvbi0tbGFyZ2U6aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNjZiMWZmO1xufVxuXG4uYnV0dG9uLS1sYXJnZTpkaXNhYmxlZCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNhMGNmZmY7XG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XG59XG5cbi5iYWNrLWJ1dHRvbiB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgbWFyZ2luLWJvdHRvbTogMTVweDtcbiAgcGFkZGluZzogOHB4IDE2cHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmMGYwZjA7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4ycywgY29sb3IgMC4ycztcbn1cblxuLmJhY2stYnV0dG9uOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2UwZTBlMDtcbn1cblxuLmRlbGV0ZS1idXR0b24ge1xuICBtYXJnaW4tbGVmdDogYXV0bztcbiAgcGFkZGluZzogNHB4IDhweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2I3YjZiNjtcbiAgY29sb3I6IGJsYWNrO1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBmb250LXNpemU6IDEycHg7XG59XG5cbi5kZWxldGUtYnV0dG9uOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmNzg3NTtcbn1cblxuLmxpa2UtcHVsc2Uge1xuICB0cmFuc2Zvcm06IHNjYWxlKDEuMyk7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2U7XG59XG5cbi5oZWFydC1vdmVybGF5IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDUwJTtcbiAgbGVmdDogNTAlO1xuICB3aWR0aDogMTAwcHg7XG4gIGhlaWdodDogMTAwcHg7XG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX199KTtcbiAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpIHNjYWxlKDApO1xuICBvcGFjaXR5OiAwO1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZSwgb3BhY2l0eSAwLjNzIGVhc2U7XG59XG5cbi5oZWFydC1vdmVybGF5LnNob3ctaGVhcnQge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKSBzY2FsZSgxLjIpO1xuICBvcGFjaXR5OiAxO1xufVxuQGtleWZyYW1lcyBoZWFydC1wb3Age1xuICAwJSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSkgc2NhbGUoMC44KTtcbiAgICBvcGFjaXR5OiAwLjg7XG4gIH1cbiAgNTAlIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKSBzY2FsZSgxLjUpO1xuICAgIG9wYWNpdHk6IDE7XG4gIH1cbiAgMTAwJSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSkgc2NhbGUoMSk7XG4gICAgb3BhY2l0eTogMDtcbiAgfVxufVxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi91aS1raXQuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBOzs7Q0FHQzs7QUFFRDtFQUNFLDRCQUE0QjtFQUM1QixrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtFQUNsQiw0REFBeUU7QUFDM0U7O0FBRUE7RUFDRSw0QkFBNEI7RUFDNUIsa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixrQkFBa0I7RUFDbEIsNERBQXdFO0FBQzFFOztBQUVBO0VBQ0UsaUNBQWlDO0VBQ2pDLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLFNBQVM7RUFDVCxVQUFVO0VBQ1YsMEJBQTBCO0VBQzFCLGNBQWM7RUFDZCxlQUFlO0VBQ2YsaUJBQWlCO0FBQ25COztBQUVBLGdDQUFnQztBQUNoQztFQUNFLGFBQWE7QUFDZjs7QUFFQTtFQUNFLFNBQVM7QUFDWDs7QUFFQTs7RUFFRSxjQUFjO0VBQ2QsdUJBQXVCO0VBQ3ZCLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLHlCQUF5QjtFQUN6QixjQUFjO0VBQ2QsWUFBWTtBQUNkOztBQUVBO0VBQ0UsZUFBZTtFQUNmLFNBQVM7RUFDVCxVQUFVO0VBQ1YsZ0JBQWdCO0VBQ2hCLGNBQWM7RUFDZCxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBOztFQUVFLHlCQUF5QjtFQUN6QiwrQkFBK0I7RUFDL0Isb0JBQW9CO0FBQ3RCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pC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LFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiBcXG4gINCt0YLQviDRgdGC0LjQu9C4INCU0LjQt9Cw0LnQvSDRgdC40YHRgtC10LzRiywg0YHQutCy0L7Qt9C90YvQtSDRgdGC0LjQu9C4INC00LvRjyDRjdC70LXQvNC10L3RgtC+0LIg0LjQvdGC0LXRgNGE0LXQudGB0LBcXG4gINCy0YHQtdCz0L4g0L/RgNC40LvQvtC20LXQvdC40Y86INGI0YDQuNGE0YLRiywg0LrQvdC+0L/QutC4LCDQuNC90L/Rg9GC0Ysg0Lgg0YLQsNC6INC00LDQu9C10LVcXG4qL1xcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJTdHJhdG9zU2t5ZW5nXFxcIjtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBmb250LWRpc3BsYXk6IHN3YXA7XFxuICBzcmM6IHVybChcXFwiLi9hc3NldHMvZm9udHMvc3RyYXRvc3NreWVuZ3dlYi1yZWd1bGFyLndvZmYyXFxcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpO1xcbn1cXG5cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiU3RyYXRvc1NreWVuZ1xcXCI7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXdlaWdodDogNTAwO1xcbiAgZm9udC1kaXNwbGF5OiBzd2FwO1xcbiAgc3JjOiB1cmwoXFxcIi4vYXNzZXRzL2ZvbnRzL3N0cmF0b3Nza3llbmd3ZWItbWVkaXVtLndvZmYyXFxcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpO1xcbn1cXG5cXG5odG1sIHtcXG4gIC8qINGB0LrRgNGL0LLQsNC10YIg0YHQutGA0L7Qu9Cx0LDRgNGLINCyIGZpcmVmb3ggKi9cXG4gIHNjcm9sbGJhci13aWR0aDogbm9uZTtcXG59XFxuXFxuYm9keSB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgZm9udC1mYW1pbHk6IFN0cmF0b3NTa3llbmc7XFxuICBvdmVyZmxvdzogYXV0bztcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIGxpbmUtaGVpZ2h0OiAxOHB4O1xcbn1cXG5cXG4vKiDRgdC60YDRi9Cy0LDQtdGCINGB0LrRgNC+0LvQsdCw0YDRiyDQsiBjaHJvbWUgKi9cXG5ib2R5Ojotd2Via2l0LXNjcm9sbGJhciB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG5wIHtcXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuLmJ1dHRvbixcXG4uc2Vjb25kYXJ5LWJ1dHRvbiB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHBhZGRpbmc6IDEwcHggMTNweCAxM3B4O1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgbGluZS1oZWlnaHQ6IDIycHg7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTY1ZWVmO1xcbiAgY29sb3I6ICNmZmZmZmY7XFxuICBib3JkZXI6IG5vbmU7XFxufVxcblxcbi5saW5rLWJ1dHRvbiB7XFxuICBkaXNwbGF5OiBpbmxpbmU7XFxuICBib3JkZXI6IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgYmFja2dyb3VuZDogbm9uZTtcXG4gIGNvbG9yOiAjNTY1ZWVmO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uYnV0dG9uOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM2ZDczZmY7XFxufVxcblxcbi5idXR0b25bZGlzYWJsZWQ9XFxcInRydWVcXFwiXSxcXG4uc2Vjb25kYXJ5LWJ1dHRvbltkaXNhYmxlZD1cXFwidHJ1ZVxcXCJdIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmNGY1ZjY7XFxuICBjb2xvcjogcmdiYSgxNTMsIDE1MywgMTUzLCAwLjYpO1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxufVxcblxcbi5idXR0b246YWN0aXZlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM0ZjU2Y2U7XFxufVxcblxcbi5zZWNvbmRhcnktYnV0dG9uIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlZGVjZmY7XFxuICBjb2xvcjogIzU2NWVlZjtcXG59XFxuXFxuLnNlY29uZGFyeS1idXR0b246aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YyZWVmZjtcXG59XFxuXFxuLnNlY29uZGFyeS1idXR0b246YWN0aXZlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNkOGQ3ZmY7XFxufVxcblxcbi5pbnB1dCB7XFxuICBoZWlnaHQ6IDM2cHg7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgcGFkZGluZzogMTVweDtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIGxpbmUtaGVpZ2h0OiAxOHB4O1xcbiAgY29sb3I6IHJnYig0LCAxOCwgMjcpO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U4ZThlODtcXG59XFxuXFxuLmlucHV0IC4tZXJyb3Ige1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG59XFxuXFxuLmlucHV0OmZvY3VzIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxufVxcblxcbi50ZXh0YXJlYSB7XFxuICBwYWRkaW5nOiAxNXB4O1xcbiAgcmVzaXplOiBub25lO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMHB4O1xcbn1cXG5cXG5zdHJvbmcge1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG59XFxuXFxuLyoqINCQ0L3QuNC80LDRhtC40Y8g0LfQsNCz0YDRg9C30LrQuCAqKi9cXG4ubG9hZGVyIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHdpZHRoOiA4MHB4O1xcbiAgaGVpZ2h0OiA4MHB4O1xcbn1cXG4ubG9hZGVyIGRpdiB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiA4cHg7XFxuICB3aWR0aDogMTZweDtcXG4gIGJhY2tncm91bmQ6ICMwMDA7XFxuICBhbmltYXRpb246IGxvYWRlciAxLjJzIGN1YmljLWJlemllcigwLCAwLjUsIDAuNSwgMSkgaW5maW5pdGU7XFxufVxcbi5sb2FkZXIgZGl2Om50aC1jaGlsZCgxKSB7XFxuICBsZWZ0OiA4cHg7XFxuICBhbmltYXRpb24tZGVsYXk6IC0wLjI0cztcXG59XFxuLmxvYWRlciBkaXY6bnRoLWNoaWxkKDIpIHtcXG4gIGxlZnQ6IDMycHg7XFxuICBhbmltYXRpb24tZGVsYXk6IC0wLjEycztcXG59XFxuLmxvYWRlciBkaXY6bnRoLWNoaWxkKDMpIHtcXG4gIGxlZnQ6IDU2cHg7XFxuICBhbmltYXRpb24tZGVsYXk6IDA7XFxufVxcbkBrZXlmcmFtZXMgbG9hZGVyIHtcXG4gIDAlIHtcXG4gICAgdG9wOiA4cHg7XFxuICAgIGhlaWdodDogNjRweDtcXG4gIH1cXG4gIDUwJSxcXG4gIDEwMCUge1xcbiAgICB0b3A6IDI0cHg7XFxuICAgIGhlaWdodDogMzJweDtcXG4gIH1cXG59XFxuXFxuLmlucHV0LS1sYXJnZSB7XFxuICBoZWlnaHQ6IDE1MHB4OyAgICAgICAgICAgICAgIFxcbiAgcGFkZGluZzogMTJweCAxNXB4OyAgICAgICAgICBcXG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XFxuICB3aWR0aDogMTAwJTtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjOyAgICAgXFxuICBib3JkZXItcmFkaXVzOiA4cHg7ICAgICAgICAgIFxcbiAgZm9udC1zaXplOiAxNnB4OyAgICAgICAgICAgICBcXG4gIGxpbmUtaGVpZ2h0OiAxLjU7XFxuICByZXNpemU6IHZlcnRpY2FsOyAgICAgICAgICAgICBcXG4gIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciAwLjJzLCBib3gtc2hhZG93IDAuMnM7XFxufVxcblxcbi5pbnB1dC0tbGFyZ2U6Zm9jdXMge1xcbiAgb3V0bGluZTogbm9uZTtcXG4gIGJvcmRlci1jb2xvcjogIzQwOWVmZjsgICAgICAgXFxuICBib3gtc2hhZG93OiAwIDAgNXB4IHJnYmEoNjQsIDE1OCwgMjU1LCAwLjUpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG59XFxuXFxuXFxuLmlucHV0LS1maWxlIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBwYWRkaW5nOiAxMnB4IDE1cHg7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBsaW5lLWhlaWdodDogMThweDtcXG4gIGNvbG9yOiAjMDQxMjFiO1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmNWY1ZjU7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuMnMsIGJvcmRlci1jb2xvciAwLjJzO1xcbn1cXG5cXG4uaW5wdXQtLWZpbGU6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2UwZTBlMDtcXG59XFxuXFxuLmJ1dHRvbi0tbGFyZ2Uge1xcbiAgbWFyZ2luLXRvcDogMTVweDtcXG4gIHBhZGRpbmc6IDE0cHggMjRweDtcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgY29sb3I6ICNmZmY7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDA5ZWZmO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjJzO1xcbn1cXG5cXG4uYnV0dG9uLS1sYXJnZTpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNjZiMWZmO1xcbn1cXG5cXG4uYnV0dG9uLS1sYXJnZTpkaXNhYmxlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYTBjZmZmO1xcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcXG59XFxuXFxuLmJhY2stYnV0dG9uIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XFxuICBwYWRkaW5nOiA4cHggMTZweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmMGYwZjA7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjJzLCBjb2xvciAwLjJzO1xcbn1cXG5cXG4uYmFjay1idXR0b246aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2UwZTBlMDtcXG59XFxuXFxuLmRlbGV0ZS1idXR0b24ge1xcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICBwYWRkaW5nOiA0cHggOHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2I3YjZiNjtcXG4gIGNvbG9yOiBibGFjaztcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGZvbnQtc2l6ZTogMTJweDtcXG59XFxuXFxuLmRlbGV0ZS1idXR0b246aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmNzg3NTtcXG59XFxuXFxuLmxpa2UtcHVsc2Uge1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjMpO1xcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZTtcXG59XFxuXFxuLmhlYXJ0LW92ZXJsYXkge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiA1MCU7XFxuICBsZWZ0OiA1MCU7XFxuICB3aWR0aDogMTAwcHg7XFxuICBoZWlnaHQ6IDEwMHB4O1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcuL2Fzc2V0cy9pbWFnZXMvbGlrZS1hY3RpdmUuc3ZnJyk7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XFxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSkgc2NhbGUoMCk7XFxuICBvcGFjaXR5OiAwO1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlLCBvcGFjaXR5IDAuM3MgZWFzZTtcXG59XFxuXFxuLmhlYXJ0LW92ZXJsYXkuc2hvdy1oZWFydCB7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKSBzY2FsZSgxLjIpO1xcbiAgb3BhY2l0eTogMTtcXG59XFxuQGtleWZyYW1lcyBoZWFydC1wb3Age1xcbiAgMCUge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKSBzY2FsZSgwLjgpO1xcbiAgICBvcGFjaXR5OiAwLjg7XFxuICB9XFxuICA1MCUge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKSBzY2FsZSgxLjUpO1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgfVxcbiAgMTAwJSB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpIHNjYWxlKDEpO1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgfVxcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpO1xuXG4gIC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9XG5cbiAgLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJsZXQgZGVmYXVsdE9wdGlvbnMgPSB7fTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldERlZmF1bHRPcHRpb25zKCkge1xuICByZXR1cm4gZGVmYXVsdE9wdGlvbnM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXREZWZhdWx0T3B0aW9ucyhuZXdPcHRpb25zKSB7XG4gIGRlZmF1bHRPcHRpb25zID0gbmV3T3B0aW9ucztcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBnZXRSb3VuZGluZ01ldGhvZChtZXRob2QpIHtcbiAgcmV0dXJuIChudW1iZXIpID0+IHtcbiAgICBjb25zdCByb3VuZCA9IG1ldGhvZCA/IE1hdGhbbWV0aG9kXSA6IE1hdGgudHJ1bmM7XG4gICAgY29uc3QgcmVzdWx0ID0gcm91bmQobnVtYmVyKTtcbiAgICAvLyBQcmV2ZW50IG5lZ2F0aXZlIHplcm9cbiAgICByZXR1cm4gcmVzdWx0ID09PSAwID8gMCA6IHJlc3VsdDtcbiAgfTtcbn1cbiIsImltcG9ydCB7IHRvRGF0ZSB9IGZyb20gXCIuLi90b0RhdGUuanNcIjtcblxuLyoqXG4gKiBHb29nbGUgQ2hyb21lIGFzIG9mIDY3LjAuMzM5Ni44NyBpbnRyb2R1Y2VkIHRpbWV6b25lcyB3aXRoIG9mZnNldCB0aGF0IGluY2x1ZGVzIHNlY29uZHMuXG4gKiBUaGV5IHVzdWFsbHkgYXBwZWFyIGZvciBkYXRlcyB0aGF0IGRlbm90ZSB0aW1lIGJlZm9yZSB0aGUgdGltZXpvbmVzIHdlcmUgaW50cm9kdWNlZFxuICogKGUuZy4gZm9yICdFdXJvcGUvUHJhZ3VlJyB0aW1lem9uZSB0aGUgb2Zmc2V0IGlzIEdNVCswMDo1Nzo0NCBiZWZvcmUgMSBPY3RvYmVyIDE4OTFcbiAqIGFuZCBHTVQrMDE6MDA6MDAgYWZ0ZXIgdGhhdCBkYXRlKVxuICpcbiAqIERhdGUjZ2V0VGltZXpvbmVPZmZzZXQgcmV0dXJucyB0aGUgb2Zmc2V0IGluIG1pbnV0ZXMgYW5kIHdvdWxkIHJldHVybiA1NyBmb3IgdGhlIGV4YW1wbGUgYWJvdmUsXG4gKiB3aGljaCB3b3VsZCBsZWFkIHRvIGluY29ycmVjdCBjYWxjdWxhdGlvbnMuXG4gKlxuICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSB0aW1lem9uZSBvZmZzZXQgaW4gbWlsbGlzZWNvbmRzIHRoYXQgdGFrZXMgc2Vjb25kcyBpbiBhY2NvdW50LlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGltZXpvbmVPZmZzZXRJbk1pbGxpc2Vjb25kcyhkYXRlKSB7XG4gIGNvbnN0IF9kYXRlID0gdG9EYXRlKGRhdGUpO1xuICBjb25zdCB1dGNEYXRlID0gbmV3IERhdGUoXG4gICAgRGF0ZS5VVEMoXG4gICAgICBfZGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgX2RhdGUuZ2V0TW9udGgoKSxcbiAgICAgIF9kYXRlLmdldERhdGUoKSxcbiAgICAgIF9kYXRlLmdldEhvdXJzKCksXG4gICAgICBfZGF0ZS5nZXRNaW51dGVzKCksXG4gICAgICBfZGF0ZS5nZXRTZWNvbmRzKCksXG4gICAgICBfZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSxcbiAgICApLFxuICApO1xuICB1dGNEYXRlLnNldFVUQ0Z1bGxZZWFyKF9kYXRlLmdldEZ1bGxZZWFyKCkpO1xuICByZXR1cm4gK2RhdGUgLSArdXRjRGF0ZTtcbn1cbiIsImltcG9ydCB7IGNvbnN0cnVjdEZyb20gfSBmcm9tIFwiLi4vY29uc3RydWN0RnJvbS5qc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplRGF0ZXMoY29udGV4dCwgLi4uZGF0ZXMpIHtcbiAgY29uc3Qgbm9ybWFsaXplID0gY29uc3RydWN0RnJvbS5iaW5kKFxuICAgIG51bGwsXG4gICAgY29udGV4dCB8fCBkYXRlcy5maW5kKChkYXRlKSA9PiB0eXBlb2YgZGF0ZSA9PT0gXCJvYmplY3RcIiksXG4gICk7XG4gIHJldHVybiBkYXRlcy5tYXAobm9ybWFsaXplKTtcbn1cbiIsImltcG9ydCB7IHRvRGF0ZSB9IGZyb20gXCIuL3RvRGF0ZS5qc1wiO1xuXG4vKipcbiAqIEBuYW1lIGNvbXBhcmVBc2NcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgQ29tcGFyZSB0aGUgdHdvIGRhdGVzIGFuZCByZXR1cm4gLTEsIDAgb3IgMS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIENvbXBhcmUgdGhlIHR3byBkYXRlcyBhbmQgcmV0dXJuIDEgaWYgdGhlIGZpcnN0IGRhdGUgaXMgYWZ0ZXIgdGhlIHNlY29uZCxcbiAqIC0xIGlmIHRoZSBmaXJzdCBkYXRlIGlzIGJlZm9yZSB0aGUgc2Vjb25kIG9yIDAgaWYgZGF0ZXMgYXJlIGVxdWFsLlxuICpcbiAqIEBwYXJhbSBkYXRlTGVmdCAtIFRoZSBmaXJzdCBkYXRlIHRvIGNvbXBhcmVcbiAqIEBwYXJhbSBkYXRlUmlnaHQgLSBUaGUgc2Vjb25kIGRhdGUgdG8gY29tcGFyZVxuICpcbiAqIEByZXR1cm5zIFRoZSByZXN1bHQgb2YgdGhlIGNvbXBhcmlzb25cbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQ29tcGFyZSAxMSBGZWJydWFyeSAxOTg3IGFuZCAxMCBKdWx5IDE5ODk6XG4gKiBjb25zdCByZXN1bHQgPSBjb21wYXJlQXNjKG5ldyBEYXRlKDE5ODcsIDEsIDExKSwgbmV3IERhdGUoMTk4OSwgNiwgMTApKVxuICogLy89PiAtMVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTb3J0IHRoZSBhcnJheSBvZiBkYXRlczpcbiAqIGNvbnN0IHJlc3VsdCA9IFtcbiAqICAgbmV3IERhdGUoMTk5NSwgNiwgMiksXG4gKiAgIG5ldyBEYXRlKDE5ODcsIDEsIDExKSxcbiAqICAgbmV3IERhdGUoMTk4OSwgNiwgMTApXG4gKiBdLnNvcnQoY29tcGFyZUFzYylcbiAqIC8vPT4gW1xuICogLy8gICBXZWQgRmViIDExIDE5ODcgMDA6MDA6MDAsXG4gKiAvLyAgIE1vbiBKdWwgMTAgMTk4OSAwMDowMDowMCxcbiAqIC8vICAgU3VuIEp1bCAwMiAxOTk1IDAwOjAwOjAwXG4gKiAvLyBdXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21wYXJlQXNjKGRhdGVMZWZ0LCBkYXRlUmlnaHQpIHtcbiAgY29uc3QgZGlmZiA9ICt0b0RhdGUoZGF0ZUxlZnQpIC0gK3RvRGF0ZShkYXRlUmlnaHQpO1xuXG4gIGlmIChkaWZmIDwgMCkgcmV0dXJuIC0xO1xuICBlbHNlIGlmIChkaWZmID4gMCkgcmV0dXJuIDE7XG5cbiAgLy8gUmV0dXJuIDAgaWYgZGlmZiBpcyAwOyByZXR1cm4gTmFOIGlmIGRpZmYgaXMgTmFOXG4gIHJldHVybiBkaWZmO1xufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IGNvbXBhcmVBc2M7XG4iLCIvKipcbiAqIEBtb2R1bGUgY29uc3RhbnRzXG4gKiBAc3VtbWFyeSBVc2VmdWwgY29uc3RhbnRzXG4gKiBAZGVzY3JpcHRpb25cbiAqIENvbGxlY3Rpb24gb2YgdXNlZnVsIGRhdGUgY29uc3RhbnRzLlxuICpcbiAqIFRoZSBjb25zdGFudHMgY291bGQgYmUgaW1wb3J0ZWQgZnJvbSBgZGF0ZS1mbnMvY29uc3RhbnRzYDpcbiAqXG4gKiBgYGB0c1xuICogaW1wb3J0IHsgbWF4VGltZSwgbWluVGltZSB9IGZyb20gXCIuL2NvbnN0YW50cy9kYXRlLWZucy9jb25zdGFudHNcIjtcbiAqXG4gKiBmdW5jdGlvbiBpc0FsbG93ZWRUaW1lKHRpbWUpIHtcbiAqICAgcmV0dXJuIHRpbWUgPD0gbWF4VGltZSAmJiB0aW1lID49IG1pblRpbWU7XG4gKiB9XG4gKiBgYGBcbiAqL1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgZGF5c0luV2Vla1xuICogQHN1bW1hcnkgRGF5cyBpbiAxIHdlZWsuXG4gKi9cbmV4cG9ydCBjb25zdCBkYXlzSW5XZWVrID0gNztcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIGRheXNJblllYXJcbiAqIEBzdW1tYXJ5IERheXMgaW4gMSB5ZWFyLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogSG93IG1hbnkgZGF5cyBpbiBhIHllYXIuXG4gKlxuICogT25lIHllYXJzIGVxdWFscyAzNjUuMjQyNSBkYXlzIGFjY29yZGluZyB0byB0aGUgZm9ybXVsYTpcbiAqXG4gKiA+IExlYXAgeWVhciBvY2N1cnMgZXZlcnkgNCB5ZWFycywgZXhjZXB0IGZvciB5ZWFycyB0aGF0IGFyZSBkaXZpc2libGUgYnkgMTAwIGFuZCBub3QgZGl2aXNpYmxlIGJ5IDQwMC5cbiAqID4gMSBtZWFuIHllYXIgPSAoMzY1KzEvNC0xLzEwMCsxLzQwMCkgZGF5cyA9IDM2NS4yNDI1IGRheXNcbiAqL1xuZXhwb3J0IGNvbnN0IGRheXNJblllYXIgPSAzNjUuMjQyNTtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1heFRpbWVcbiAqIEBzdW1tYXJ5IE1heGltdW0gYWxsb3dlZCB0aW1lLlxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgeyBtYXhUaW1lIH0gZnJvbSBcIi4vY29uc3RhbnRzL2RhdGUtZm5zL2NvbnN0YW50c1wiO1xuICpcbiAqIGNvbnN0IGlzVmFsaWQgPSA4NjQwMDAwMDAwMDAwMDAxIDw9IG1heFRpbWU7XG4gKiAvLz0+IGZhbHNlXG4gKlxuICogbmV3IERhdGUoODY0MDAwMDAwMDAwMDAwMSk7XG4gKiAvLz0+IEludmFsaWQgRGF0ZVxuICovXG5leHBvcnQgY29uc3QgbWF4VGltZSA9IE1hdGgucG93KDEwLCA4KSAqIDI0ICogNjAgKiA2MCAqIDEwMDA7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBtaW5UaW1lXG4gKiBAc3VtbWFyeSBNaW5pbXVtIGFsbG93ZWQgdGltZS5cbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0IHsgbWluVGltZSB9IGZyb20gXCIuL2NvbnN0YW50cy9kYXRlLWZucy9jb25zdGFudHNcIjtcbiAqXG4gKiBjb25zdCBpc1ZhbGlkID0gLTg2NDAwMDAwMDAwMDAwMDEgPj0gbWluVGltZTtcbiAqIC8vPT4gZmFsc2VcbiAqXG4gKiBuZXcgRGF0ZSgtODY0MDAwMDAwMDAwMDAwMSlcbiAqIC8vPT4gSW52YWxpZCBEYXRlXG4gKi9cbmV4cG9ydCBjb25zdCBtaW5UaW1lID0gLW1heFRpbWU7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBtaWxsaXNlY29uZHNJbldlZWtcbiAqIEBzdW1tYXJ5IE1pbGxpc2Vjb25kcyBpbiAxIHdlZWsuXG4gKi9cbmV4cG9ydCBjb25zdCBtaWxsaXNlY29uZHNJbldlZWsgPSA2MDQ4MDAwMDA7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBtaWxsaXNlY29uZHNJbkRheVxuICogQHN1bW1hcnkgTWlsbGlzZWNvbmRzIGluIDEgZGF5LlxuICovXG5leHBvcnQgY29uc3QgbWlsbGlzZWNvbmRzSW5EYXkgPSA4NjQwMDAwMDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1pbGxpc2Vjb25kc0luTWludXRlXG4gKiBAc3VtbWFyeSBNaWxsaXNlY29uZHMgaW4gMSBtaW51dGVcbiAqL1xuZXhwb3J0IGNvbnN0IG1pbGxpc2Vjb25kc0luTWludXRlID0gNjAwMDA7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBtaWxsaXNlY29uZHNJbkhvdXJcbiAqIEBzdW1tYXJ5IE1pbGxpc2Vjb25kcyBpbiAxIGhvdXJcbiAqL1xuZXhwb3J0IGNvbnN0IG1pbGxpc2Vjb25kc0luSG91ciA9IDM2MDAwMDA7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBtaWxsaXNlY29uZHNJblNlY29uZFxuICogQHN1bW1hcnkgTWlsbGlzZWNvbmRzIGluIDEgc2Vjb25kXG4gKi9cbmV4cG9ydCBjb25zdCBtaWxsaXNlY29uZHNJblNlY29uZCA9IDEwMDA7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBtaW51dGVzSW5ZZWFyXG4gKiBAc3VtbWFyeSBNaW51dGVzIGluIDEgeWVhci5cbiAqL1xuZXhwb3J0IGNvbnN0IG1pbnV0ZXNJblllYXIgPSA1MjU2MDA7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBtaW51dGVzSW5Nb250aFxuICogQHN1bW1hcnkgTWludXRlcyBpbiAxIG1vbnRoLlxuICovXG5leHBvcnQgY29uc3QgbWludXRlc0luTW9udGggPSA0MzIwMDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1pbnV0ZXNJbkRheVxuICogQHN1bW1hcnkgTWludXRlcyBpbiAxIGRheS5cbiAqL1xuZXhwb3J0IGNvbnN0IG1pbnV0ZXNJbkRheSA9IDE0NDA7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBtaW51dGVzSW5Ib3VyXG4gKiBAc3VtbWFyeSBNaW51dGVzIGluIDEgaG91ci5cbiAqL1xuZXhwb3J0IGNvbnN0IG1pbnV0ZXNJbkhvdXIgPSA2MDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1vbnRoc0luUXVhcnRlclxuICogQHN1bW1hcnkgTW9udGhzIGluIDEgcXVhcnRlci5cbiAqL1xuZXhwb3J0IGNvbnN0IG1vbnRoc0luUXVhcnRlciA9IDM7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBtb250aHNJblllYXJcbiAqIEBzdW1tYXJ5IE1vbnRocyBpbiAxIHllYXIuXG4gKi9cbmV4cG9ydCBjb25zdCBtb250aHNJblllYXIgPSAxMjtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIHF1YXJ0ZXJzSW5ZZWFyXG4gKiBAc3VtbWFyeSBRdWFydGVycyBpbiAxIHllYXJcbiAqL1xuZXhwb3J0IGNvbnN0IHF1YXJ0ZXJzSW5ZZWFyID0gNDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIHNlY29uZHNJbkhvdXJcbiAqIEBzdW1tYXJ5IFNlY29uZHMgaW4gMSBob3VyLlxuICovXG5leHBvcnQgY29uc3Qgc2Vjb25kc0luSG91ciA9IDM2MDA7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBzZWNvbmRzSW5NaW51dGVcbiAqIEBzdW1tYXJ5IFNlY29uZHMgaW4gMSBtaW51dGUuXG4gKi9cbmV4cG9ydCBjb25zdCBzZWNvbmRzSW5NaW51dGUgPSA2MDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIHNlY29uZHNJbkRheVxuICogQHN1bW1hcnkgU2Vjb25kcyBpbiAxIGRheS5cbiAqL1xuZXhwb3J0IGNvbnN0IHNlY29uZHNJbkRheSA9IHNlY29uZHNJbkhvdXIgKiAyNDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIHNlY29uZHNJbldlZWtcbiAqIEBzdW1tYXJ5IFNlY29uZHMgaW4gMSB3ZWVrLlxuICovXG5leHBvcnQgY29uc3Qgc2Vjb25kc0luV2VlayA9IHNlY29uZHNJbkRheSAqIDc7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBzZWNvbmRzSW5ZZWFyXG4gKiBAc3VtbWFyeSBTZWNvbmRzIGluIDEgeWVhci5cbiAqL1xuZXhwb3J0IGNvbnN0IHNlY29uZHNJblllYXIgPSBzZWNvbmRzSW5EYXkgKiBkYXlzSW5ZZWFyO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgc2Vjb25kc0luTW9udGhcbiAqIEBzdW1tYXJ5IFNlY29uZHMgaW4gMSBtb250aFxuICovXG5leHBvcnQgY29uc3Qgc2Vjb25kc0luTW9udGggPSBzZWNvbmRzSW5ZZWFyIC8gMTI7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBzZWNvbmRzSW5RdWFydGVyXG4gKiBAc3VtbWFyeSBTZWNvbmRzIGluIDEgcXVhcnRlci5cbiAqL1xuZXhwb3J0IGNvbnN0IHNlY29uZHNJblF1YXJ0ZXIgPSBzZWNvbmRzSW5Nb250aCAqIDM7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBjb25zdHJ1Y3RGcm9tU3ltYm9sXG4gKiBAc3VtbWFyeSBTeW1ib2wgZW5hYmxpbmcgRGF0ZSBleHRlbnNpb25zIHRvIGluaGVyaXQgcHJvcGVydGllcyBmcm9tIHRoZSByZWZlcmVuY2UgZGF0ZS5cbiAqXG4gKiBUaGUgc3ltYm9sIGlzIHVzZWQgdG8gZW5hYmxlIHRoZSBgY29uc3RydWN0RnJvbWAgZnVuY3Rpb24gdG8gY29uc3RydWN0IGEgZGF0ZVxuICogdXNpbmcgYSByZWZlcmVuY2UgZGF0ZSBhbmQgYSB2YWx1ZS4gSXQgYWxsb3dzIHRvIHRyYW5zZmVyIGV4dHJhIHByb3BlcnRpZXNcbiAqIGZyb20gdGhlIHJlZmVyZW5jZSBkYXRlIHRvIHRoZSBuZXcgZGF0ZS4gSXQncyB1c2VmdWwgZm9yIGV4dGVuc2lvbnMgbGlrZVxuICogW2BUWkRhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdHopIHRoYXQgYWNjZXB0IGEgdGltZSB6b25lIGFzXG4gKiBhIGNvbnN0cnVjdG9yIGFyZ3VtZW50LlxuICovXG5leHBvcnQgY29uc3QgY29uc3RydWN0RnJvbVN5bWJvbCA9IFN5bWJvbC5mb3IoXCJjb25zdHJ1Y3REYXRlRnJvbVwiKTtcbiIsImltcG9ydCB7IGNvbnN0cnVjdEZyb21TeW1ib2wgfSBmcm9tIFwiLi9jb25zdGFudHMuanNcIjtcblxuLyoqXG4gKiBAbmFtZSBjb25zdHJ1Y3RGcm9tXG4gKiBAY2F0ZWdvcnkgR2VuZXJpYyBIZWxwZXJzXG4gKiBAc3VtbWFyeSBDb25zdHJ1Y3RzIGEgZGF0ZSB1c2luZyB0aGUgcmVmZXJlbmNlIGRhdGUgYW5kIHRoZSB2YWx1ZVxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogVGhlIGZ1bmN0aW9uIGNvbnN0cnVjdHMgYSBuZXcgZGF0ZSB1c2luZyB0aGUgY29uc3RydWN0b3IgZnJvbSB0aGUgcmVmZXJlbmNlXG4gKiBkYXRlIGFuZCB0aGUgZ2l2ZW4gdmFsdWUuIEl0IGhlbHBzIHRvIGJ1aWxkIGdlbmVyaWMgZnVuY3Rpb25zIHRoYXQgYWNjZXB0XG4gKiBkYXRlIGV4dGVuc2lvbnMuXG4gKlxuICogSXQgZGVmYXVsdHMgdG8gYERhdGVgIGlmIHRoZSBwYXNzZWQgcmVmZXJlbmNlIGRhdGUgaXMgYSBudW1iZXIgb3IgYSBzdHJpbmcuXG4gKlxuICogU3RhcnRpbmcgZnJvbSB2My43LjAsIGl0IGFsbG93cyB0byBjb25zdHJ1Y3QgYSBkYXRlIHVzaW5nIGBbU3ltYm9sLmZvcihcImNvbnN0cnVjdERhdGVGcm9tXCIpXWBcbiAqIGVuYWJsaW5nIHRvIHRyYW5zZmVyIGV4dHJhIHByb3BlcnRpZXMgZnJvbSB0aGUgcmVmZXJlbmNlIGRhdGUgdG8gdGhlIG5ldyBkYXRlLlxuICogSXQncyB1c2VmdWwgZm9yIGV4dGVuc2lvbnMgbGlrZSBbYFRaRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy90eilcbiAqIHRoYXQgYWNjZXB0IGEgdGltZSB6b25lIGFzIGEgY29uc3RydWN0b3IgYXJndW1lbnQuXG4gKlxuICogQHR5cGVQYXJhbSBEYXRlVHlwZSAtIFRoZSBgRGF0ZWAgdHlwZSwgdGhlIGZ1bmN0aW9uIG9wZXJhdGVzIG9uLiBHZXRzIGluZmVycmVkIGZyb20gcGFzc2VkIGFyZ3VtZW50cy4gQWxsb3dzIHRvIHVzZSBleHRlbnNpb25zIGxpa2UgW2BVVENEYXRlYF0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL3V0YykuXG4gKlxuICogQHBhcmFtIGRhdGUgLSBUaGUgcmVmZXJlbmNlIGRhdGUgdG8gdGFrZSBjb25zdHJ1Y3RvciBmcm9tXG4gKiBAcGFyYW0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gY3JlYXRlIHRoZSBkYXRlXG4gKlxuICogQHJldHVybnMgRGF0ZSBpbml0aWFsaXplZCB1c2luZyB0aGUgZ2l2ZW4gZGF0ZSBhbmQgdmFsdWVcbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0IHsgY29uc3RydWN0RnJvbSB9IGZyb20gXCIuL2NvbnN0cnVjdEZyb20vZGF0ZS1mbnNcIjtcbiAqXG4gKiAvLyBBIGZ1bmN0aW9uIHRoYXQgY2xvbmVzIGEgZGF0ZSBwcmVzZXJ2aW5nIHRoZSBvcmlnaW5hbCB0eXBlXG4gKiBmdW5jdGlvbiBjbG9uZURhdGU8RGF0ZVR5cGUgZXh0ZW5kcyBEYXRlPihkYXRlOiBEYXRlVHlwZSk6IERhdGVUeXBlIHtcbiAqICAgcmV0dXJuIGNvbnN0cnVjdEZyb20oXG4gKiAgICAgZGF0ZSwgLy8gVXNlIGNvbnN0cnVjdG9yIGZyb20gdGhlIGdpdmVuIGRhdGVcbiAqICAgICBkYXRlLmdldFRpbWUoKSAvLyBVc2UgdGhlIGRhdGUgdmFsdWUgdG8gY3JlYXRlIGEgbmV3IGRhdGVcbiAqICAgKTtcbiAqIH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnN0cnVjdEZyb20oZGF0ZSwgdmFsdWUpIHtcbiAgaWYgKHR5cGVvZiBkYXRlID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBkYXRlKHZhbHVlKTtcblxuICBpZiAoZGF0ZSAmJiB0eXBlb2YgZGF0ZSA9PT0gXCJvYmplY3RcIiAmJiBjb25zdHJ1Y3RGcm9tU3ltYm9sIGluIGRhdGUpXG4gICAgcmV0dXJuIGRhdGVbY29uc3RydWN0RnJvbVN5bWJvbF0odmFsdWUpO1xuXG4gIGlmIChkYXRlIGluc3RhbmNlb2YgRGF0ZSkgcmV0dXJuIG5ldyBkYXRlLmNvbnN0cnVjdG9yKHZhbHVlKTtcblxuICByZXR1cm4gbmV3IERhdGUodmFsdWUpO1xufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IGNvbnN0cnVjdEZyb207XG4iLCJpbXBvcnQgeyBjb25zdHJ1Y3RGcm9tIH0gZnJvbSBcIi4vY29uc3RydWN0RnJvbS5qc1wiO1xuXG4vKipcbiAqIEBuYW1lIGNvbnN0cnVjdE5vd1xuICogQGNhdGVnb3J5IEdlbmVyaWMgSGVscGVyc1xuICogQHN1bW1hcnkgQ29uc3RydWN0cyBhIG5ldyBjdXJyZW50IGRhdGUgdXNpbmcgdGhlIHBhc3NlZCB2YWx1ZSBjb25zdHJ1Y3Rvci5cbiAqIEBwdXJlIGZhbHNlXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBUaGUgZnVuY3Rpb24gY29uc3RydWN0cyBhIG5ldyBjdXJyZW50IGRhdGUgdXNpbmcgdGhlIGNvbnN0cnVjdG9yIGZyb21cbiAqIHRoZSByZWZlcmVuY2UgZGF0ZS4gSXQgaGVscHMgdG8gYnVpbGQgZ2VuZXJpYyBmdW5jdGlvbnMgdGhhdCBhY2NlcHQgZGF0ZVxuICogZXh0ZW5zaW9ucyBhbmQgdXNlIHRoZSBjdXJyZW50IGRhdGUuXG4gKlxuICogSXQgZGVmYXVsdHMgdG8gYERhdGVgIGlmIHRoZSBwYXNzZWQgcmVmZXJlbmNlIGRhdGUgaXMgYSBudW1iZXIgb3IgYSBzdHJpbmcuXG4gKlxuICogQHBhcmFtIGRhdGUgLSBUaGUgcmVmZXJlbmNlIGRhdGUgdG8gdGFrZSBjb25zdHJ1Y3RvciBmcm9tXG4gKlxuICogQHJldHVybnMgQ3VycmVudCBkYXRlIGluaXRpYWxpemVkIHVzaW5nIHRoZSBnaXZlbiBkYXRlIGNvbnN0cnVjdG9yXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCB7IGNvbnN0cnVjdE5vdywgaXNTYW1lRGF5IH0gZnJvbSAnZGF0ZS1mbnMnXG4gKlxuICogZnVuY3Rpb24gaXNUb2RheTxEYXRlVHlwZSBleHRlbmRzIERhdGU+KFxuICogICBkYXRlOiBEYXRlQXJnPERhdGVUeXBlPixcbiAqICk6IGJvb2xlYW4ge1xuICogICAvLyBJZiB3ZSB3ZXJlIHRvIHVzZSBgbmV3IERhdGUoKWAgZGlyZWN0bHksIHRoZSBmdW5jdGlvbiB3b3VsZCAgYmVoYXZlXG4gKiAgIC8vIGRpZmZlcmVudGx5IGluIGRpZmZlcmVudCB0aW1lem9uZXMgYW5kIHJldHVybiBmYWxzZSBmb3IgdGhlIHNhbWUgZGF0ZS5cbiAqICAgcmV0dXJuIGlzU2FtZURheShkYXRlLCBjb25zdHJ1Y3ROb3coZGF0ZSkpO1xuICogfVxuICovXG5leHBvcnQgZnVuY3Rpb24gY29uc3RydWN0Tm93KGRhdGUpIHtcbiAgcmV0dXJuIGNvbnN0cnVjdEZyb20oZGF0ZSwgRGF0ZS5ub3coKSk7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgY29uc3RydWN0Tm93O1xuIiwiaW1wb3J0IHsgbm9ybWFsaXplRGF0ZXMgfSBmcm9tIFwiLi9fbGliL25vcm1hbGl6ZURhdGVzLmpzXCI7XG5cbi8qKlxuICogVGhlIHtAbGluayBkaWZmZXJlbmNlSW5DYWxlbmRhck1vbnRoc30gZnVuY3Rpb24gb3B0aW9ucy5cbiAqL1xuXG4vKipcbiAqIEBuYW1lIGRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzXG4gKiBAY2F0ZWdvcnkgTW9udGggSGVscGVyc1xuICogQHN1bW1hcnkgR2V0IHRoZSBudW1iZXIgb2YgY2FsZW5kYXIgbW9udGhzIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogR2V0IHRoZSBudW1iZXIgb2YgY2FsZW5kYXIgbW9udGhzIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzLlxuICpcbiAqIEBwYXJhbSBsYXRlckRhdGUgLSBUaGUgbGF0ZXIgZGF0ZVxuICogQHBhcmFtIGVhcmxpZXJEYXRlIC0gVGhlIGVhcmxpZXIgZGF0ZVxuICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvYmplY3Qgd2l0aCBvcHRpb25zXG4gKlxuICogQHJldHVybnMgVGhlIG51bWJlciBvZiBjYWxlbmRhciBtb250aHNcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSG93IG1hbnkgY2FsZW5kYXIgbW9udGhzIGFyZSBiZXR3ZWVuIDMxIEphbnVhcnkgMjAxNCBhbmQgMSBTZXB0ZW1iZXIgMjAxND9cbiAqIGNvbnN0IHJlc3VsdCA9IGRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzKFxuICogICBuZXcgRGF0ZSgyMDE0LCA4LCAxKSxcbiAqICAgbmV3IERhdGUoMjAxNCwgMCwgMzEpXG4gKiApXG4gKiAvLz0+IDhcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzKGxhdGVyRGF0ZSwgZWFybGllckRhdGUsIG9wdGlvbnMpIHtcbiAgY29uc3QgW2xhdGVyRGF0ZV8sIGVhcmxpZXJEYXRlX10gPSBub3JtYWxpemVEYXRlcyhcbiAgICBvcHRpb25zPy5pbixcbiAgICBsYXRlckRhdGUsXG4gICAgZWFybGllckRhdGUsXG4gICk7XG5cbiAgY29uc3QgeWVhcnNEaWZmID0gbGF0ZXJEYXRlXy5nZXRGdWxsWWVhcigpIC0gZWFybGllckRhdGVfLmdldEZ1bGxZZWFyKCk7XG4gIGNvbnN0IG1vbnRoc0RpZmYgPSBsYXRlckRhdGVfLmdldE1vbnRoKCkgLSBlYXJsaWVyRGF0ZV8uZ2V0TW9udGgoKTtcblxuICByZXR1cm4geWVhcnNEaWZmICogMTIgKyBtb250aHNEaWZmO1xufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IGRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzO1xuIiwiaW1wb3J0IHsgdG9EYXRlIH0gZnJvbSBcIi4vdG9EYXRlLmpzXCI7XG5cbi8qKlxuICogQG5hbWUgZGlmZmVyZW5jZUluTWlsbGlzZWNvbmRzXG4gKiBAY2F0ZWdvcnkgTWlsbGlzZWNvbmQgSGVscGVyc1xuICogQHN1bW1hcnkgR2V0IHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogR2V0IHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzLlxuICpcbiAqIEBwYXJhbSBsYXRlckRhdGUgLSBUaGUgbGF0ZXIgZGF0ZVxuICogQHBhcmFtIGVhcmxpZXJEYXRlIC0gVGhlIGVhcmxpZXIgZGF0ZVxuICpcbiAqIEByZXR1cm5zIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEhvdyBtYW55IG1pbGxpc2Vjb25kcyBhcmUgYmV0d2VlblxuICogLy8gMiBKdWx5IDIwMTQgMTI6MzA6MjAuNjAwIGFuZCAyIEp1bHkgMjAxNCAxMjozMDoyMS43MDA/XG4gKiBjb25zdCByZXN1bHQgPSBkaWZmZXJlbmNlSW5NaWxsaXNlY29uZHMoXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDYsIDIsIDEyLCAzMCwgMjEsIDcwMCksXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDYsIDIsIDEyLCAzMCwgMjAsIDYwMClcbiAqIClcbiAqIC8vPT4gMTEwMFxuICovXG5leHBvcnQgZnVuY3Rpb24gZGlmZmVyZW5jZUluTWlsbGlzZWNvbmRzKGxhdGVyRGF0ZSwgZWFybGllckRhdGUpIHtcbiAgcmV0dXJuICt0b0RhdGUobGF0ZXJEYXRlKSAtICt0b0RhdGUoZWFybGllckRhdGUpO1xufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IGRpZmZlcmVuY2VJbk1pbGxpc2Vjb25kcztcbiIsImltcG9ydCB7IG5vcm1hbGl6ZURhdGVzIH0gZnJvbSBcIi4vX2xpYi9ub3JtYWxpemVEYXRlcy5qc1wiO1xuaW1wb3J0IHsgY29tcGFyZUFzYyB9IGZyb20gXCIuL2NvbXBhcmVBc2MuanNcIjtcbmltcG9ydCB7IGRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzIH0gZnJvbSBcIi4vZGlmZmVyZW5jZUluQ2FsZW5kYXJNb250aHMuanNcIjtcbmltcG9ydCB7IGlzTGFzdERheU9mTW9udGggfSBmcm9tIFwiLi9pc0xhc3REYXlPZk1vbnRoLmpzXCI7XG5cbi8qKlxuICogVGhlIHtAbGluayBkaWZmZXJlbmNlSW5Nb250aHN9IGZ1bmN0aW9uIG9wdGlvbnMuXG4gKi9cblxuLyoqXG4gKiBAbmFtZSBkaWZmZXJlbmNlSW5Nb250aHNcbiAqIEBjYXRlZ29yeSBNb250aCBIZWxwZXJzXG4gKiBAc3VtbWFyeSBHZXQgdGhlIG51bWJlciBvZiBmdWxsIG1vbnRocyBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcy5cbiAqXG4gKiBAcGFyYW0gbGF0ZXJEYXRlIC0gVGhlIGxhdGVyIGRhdGVcbiAqIEBwYXJhbSBlYXJsaWVyRGF0ZSAtIFRoZSBlYXJsaWVyIGRhdGVcbiAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb2JqZWN0IHdpdGggb3B0aW9uc1xuICpcbiAqIEByZXR1cm5zIFRoZSBudW1iZXIgb2YgZnVsbCBtb250aHNcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSG93IG1hbnkgZnVsbCBtb250aHMgYXJlIGJldHdlZW4gMzEgSmFudWFyeSAyMDE0IGFuZCAxIFNlcHRlbWJlciAyMDE0P1xuICogY29uc3QgcmVzdWx0ID0gZGlmZmVyZW5jZUluTW9udGhzKG5ldyBEYXRlKDIwMTQsIDgsIDEpLCBuZXcgRGF0ZSgyMDE0LCAwLCAzMSkpXG4gKiAvLz0+IDdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpZmZlcmVuY2VJbk1vbnRocyhsYXRlckRhdGUsIGVhcmxpZXJEYXRlLCBvcHRpb25zKSB7XG4gIGNvbnN0IFtsYXRlckRhdGVfLCB3b3JraW5nTGF0ZXJEYXRlLCBlYXJsaWVyRGF0ZV9dID0gbm9ybWFsaXplRGF0ZXMoXG4gICAgb3B0aW9ucz8uaW4sXG4gICAgbGF0ZXJEYXRlLFxuICAgIGxhdGVyRGF0ZSxcbiAgICBlYXJsaWVyRGF0ZSxcbiAgKTtcblxuICBjb25zdCBzaWduID0gY29tcGFyZUFzYyh3b3JraW5nTGF0ZXJEYXRlLCBlYXJsaWVyRGF0ZV8pO1xuICBjb25zdCBkaWZmZXJlbmNlID0gTWF0aC5hYnMoXG4gICAgZGlmZmVyZW5jZUluQ2FsZW5kYXJNb250aHMod29ya2luZ0xhdGVyRGF0ZSwgZWFybGllckRhdGVfKSxcbiAgKTtcblxuICBpZiAoZGlmZmVyZW5jZSA8IDEpIHJldHVybiAwO1xuXG4gIGlmICh3b3JraW5nTGF0ZXJEYXRlLmdldE1vbnRoKCkgPT09IDEgJiYgd29ya2luZ0xhdGVyRGF0ZS5nZXREYXRlKCkgPiAyNylcbiAgICB3b3JraW5nTGF0ZXJEYXRlLnNldERhdGUoMzApO1xuXG4gIHdvcmtpbmdMYXRlckRhdGUuc2V0TW9udGgod29ya2luZ0xhdGVyRGF0ZS5nZXRNb250aCgpIC0gc2lnbiAqIGRpZmZlcmVuY2UpO1xuXG4gIGxldCBpc0xhc3RNb250aE5vdEZ1bGwgPSBjb21wYXJlQXNjKHdvcmtpbmdMYXRlckRhdGUsIGVhcmxpZXJEYXRlXykgPT09IC1zaWduO1xuXG4gIGlmIChcbiAgICBpc0xhc3REYXlPZk1vbnRoKGxhdGVyRGF0ZV8pICYmXG4gICAgZGlmZmVyZW5jZSA9PT0gMSAmJlxuICAgIGNvbXBhcmVBc2MobGF0ZXJEYXRlXywgZWFybGllckRhdGVfKSA9PT0gMVxuICApIHtcbiAgICBpc0xhc3RNb250aE5vdEZ1bGwgPSBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IHJlc3VsdCA9IHNpZ24gKiAoZGlmZmVyZW5jZSAtICtpc0xhc3RNb250aE5vdEZ1bGwpO1xuICByZXR1cm4gcmVzdWx0ID09PSAwID8gMCA6IHJlc3VsdDtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBkaWZmZXJlbmNlSW5Nb250aHM7XG4iLCJpbXBvcnQgeyBnZXRSb3VuZGluZ01ldGhvZCB9IGZyb20gXCIuL19saWIvZ2V0Um91bmRpbmdNZXRob2QuanNcIjtcbmltcG9ydCB7IGRpZmZlcmVuY2VJbk1pbGxpc2Vjb25kcyB9IGZyb20gXCIuL2RpZmZlcmVuY2VJbk1pbGxpc2Vjb25kcy5qc1wiO1xuXG4vKipcbiAqIFRoZSB7QGxpbmsgZGlmZmVyZW5jZUluU2Vjb25kc30gZnVuY3Rpb24gb3B0aW9ucy5cbiAqL1xuXG4vKipcbiAqIEBuYW1lIGRpZmZlcmVuY2VJblNlY29uZHNcbiAqIEBjYXRlZ29yeSBTZWNvbmQgSGVscGVyc1xuICogQHN1bW1hcnkgR2V0IHRoZSBudW1iZXIgb2Ygc2Vjb25kcyBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcy5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEdldCB0aGUgbnVtYmVyIG9mIHNlY29uZHMgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZXMuXG4gKlxuICogQHBhcmFtIGxhdGVyRGF0ZSAtIFRoZSBsYXRlciBkYXRlXG4gKiBAcGFyYW0gZWFybGllckRhdGUgLSBUaGUgZWFybGllciBkYXRlXG4gKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9iamVjdCB3aXRoIG9wdGlvbnMuXG4gKlxuICogQHJldHVybnMgVGhlIG51bWJlciBvZiBzZWNvbmRzXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEhvdyBtYW55IHNlY29uZHMgYXJlIGJldHdlZW5cbiAqIC8vIDIgSnVseSAyMDE0IDEyOjMwOjA3Ljk5OSBhbmQgMiBKdWx5IDIwMTQgMTI6MzA6MjAuMDAwP1xuICogY29uc3QgcmVzdWx0ID0gZGlmZmVyZW5jZUluU2Vjb25kcyhcbiAqICAgbmV3IERhdGUoMjAxNCwgNiwgMiwgMTIsIDMwLCAyMCwgMCksXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDYsIDIsIDEyLCAzMCwgNywgOTk5KVxuICogKVxuICogLy89PiAxMlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGlmZmVyZW5jZUluU2Vjb25kcyhsYXRlckRhdGUsIGVhcmxpZXJEYXRlLCBvcHRpb25zKSB7XG4gIGNvbnN0IGRpZmYgPSBkaWZmZXJlbmNlSW5NaWxsaXNlY29uZHMobGF0ZXJEYXRlLCBlYXJsaWVyRGF0ZSkgLyAxMDAwO1xuICByZXR1cm4gZ2V0Um91bmRpbmdNZXRob2Qob3B0aW9ucz8ucm91bmRpbmdNZXRob2QpKGRpZmYpO1xufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IGRpZmZlcmVuY2VJblNlY29uZHM7XG4iLCJpbXBvcnQgeyB0b0RhdGUgfSBmcm9tIFwiLi90b0RhdGUuanNcIjtcblxuLyoqXG4gKiBUaGUge0BsaW5rIGVuZE9mRGF5fSBmdW5jdGlvbiBvcHRpb25zLlxuICovXG5cbi8qKlxuICogQG5hbWUgZW5kT2ZEYXlcbiAqIEBjYXRlZ29yeSBEYXkgSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIHRoZSBlbmQgb2YgYSBkYXkgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBlbmQgb2YgYSBkYXkgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICogVGhlIHJlc3VsdCB3aWxsIGJlIGluIHRoZSBsb2NhbCB0aW1lem9uZS5cbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqIEB0eXBlUGFyYW0gUmVzdWx0RGF0ZSAtIFRoZSByZXN1bHQgYERhdGVgIHR5cGUsIGl0IGlzIHRoZSB0eXBlIHJldHVybmVkIGZyb20gdGhlIGNvbnRleHQgZnVuY3Rpb24gaWYgaXQgaXMgcGFzc2VkLCBvciBpbmZlcnJlZCBmcm9tIHRoZSBhcmd1bWVudHMuXG4gKlxuICogQHBhcmFtIGRhdGUgLSBUaGUgb3JpZ2luYWwgZGF0ZVxuICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvYmplY3Qgd2l0aCBvcHRpb25zXG4gKlxuICogQHJldHVybnMgVGhlIGVuZCBvZiBhIGRheVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBUaGUgZW5kIG9mIGEgZGF5IGZvciAyIFNlcHRlbWJlciAyMDE0IDExOjU1OjAwOlxuICogY29uc3QgcmVzdWx0ID0gZW5kT2ZEYXkobmV3IERhdGUoMjAxNCwgOCwgMiwgMTEsIDU1LCAwKSlcbiAqIC8vPT4gVHVlIFNlcCAwMiAyMDE0IDIzOjU5OjU5Ljk5OVxuICovXG5leHBvcnQgZnVuY3Rpb24gZW5kT2ZEYXkoZGF0ZSwgb3B0aW9ucykge1xuICBjb25zdCBfZGF0ZSA9IHRvRGF0ZShkYXRlLCBvcHRpb25zPy5pbik7XG4gIF9kYXRlLnNldEhvdXJzKDIzLCA1OSwgNTksIDk5OSk7XG4gIHJldHVybiBfZGF0ZTtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBlbmRPZkRheTtcbiIsImltcG9ydCB7IHRvRGF0ZSB9IGZyb20gXCIuL3RvRGF0ZS5qc1wiO1xuXG4vKipcbiAqIFRoZSB7QGxpbmsgZW5kT2ZNb250aH0gZnVuY3Rpb24gb3B0aW9ucy5cbiAqL1xuXG4vKipcbiAqIEBuYW1lIGVuZE9mTW9udGhcbiAqIEBjYXRlZ29yeSBNb250aCBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIGVuZCBvZiBhIG1vbnRoIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgZW5kIG9mIGEgbW9udGggZm9yIHRoZSBnaXZlbiBkYXRlLlxuICogVGhlIHJlc3VsdCB3aWxsIGJlIGluIHRoZSBsb2NhbCB0aW1lem9uZS5cbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqIEB0eXBlUGFyYW0gUmVzdWx0RGF0ZSAtIFRoZSByZXN1bHQgYERhdGVgIHR5cGUsIGl0IGlzIHRoZSB0eXBlIHJldHVybmVkIGZyb20gdGhlIGNvbnRleHQgZnVuY3Rpb24gaWYgaXQgaXMgcGFzc2VkLCBvciBpbmZlcnJlZCBmcm9tIHRoZSBhcmd1bWVudHMuXG4gKlxuICogQHBhcmFtIGRhdGUgLSBUaGUgb3JpZ2luYWwgZGF0ZVxuICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvYmplY3Qgd2l0aCBvcHRpb25zXG4gKlxuICogQHJldHVybnMgVGhlIGVuZCBvZiBhIG1vbnRoXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFRoZSBlbmQgb2YgYSBtb250aCBmb3IgMiBTZXB0ZW1iZXIgMjAxNCAxMTo1NTowMDpcbiAqIGNvbnN0IHJlc3VsdCA9IGVuZE9mTW9udGgobmV3IERhdGUoMjAxNCwgOCwgMiwgMTEsIDU1LCAwKSlcbiAqIC8vPT4gVHVlIFNlcCAzMCAyMDE0IDIzOjU5OjU5Ljk5OVxuICovXG5leHBvcnQgZnVuY3Rpb24gZW5kT2ZNb250aChkYXRlLCBvcHRpb25zKSB7XG4gIGNvbnN0IF9kYXRlID0gdG9EYXRlKGRhdGUsIG9wdGlvbnM/LmluKTtcbiAgY29uc3QgbW9udGggPSBfZGF0ZS5nZXRNb250aCgpO1xuICBfZGF0ZS5zZXRGdWxsWWVhcihfZGF0ZS5nZXRGdWxsWWVhcigpLCBtb250aCArIDEsIDApO1xuICBfZGF0ZS5zZXRIb3VycygyMywgNTksIDU5LCA5OTkpO1xuICByZXR1cm4gX2RhdGU7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgZW5kT2ZNb250aDtcbiIsImltcG9ydCB7IGRlZmF1bHRMb2NhbGUgfSBmcm9tIFwiLi9fbGliL2RlZmF1bHRMb2NhbGUuanNcIjtcbmltcG9ydCB7IGdldERlZmF1bHRPcHRpb25zIH0gZnJvbSBcIi4vX2xpYi9kZWZhdWx0T3B0aW9ucy5qc1wiO1xuaW1wb3J0IHsgZ2V0VGltZXpvbmVPZmZzZXRJbk1pbGxpc2Vjb25kcyB9IGZyb20gXCIuL19saWIvZ2V0VGltZXpvbmVPZmZzZXRJbk1pbGxpc2Vjb25kcy5qc1wiO1xuaW1wb3J0IHsgbm9ybWFsaXplRGF0ZXMgfSBmcm9tIFwiLi9fbGliL25vcm1hbGl6ZURhdGVzLmpzXCI7XG5pbXBvcnQgeyBjb21wYXJlQXNjIH0gZnJvbSBcIi4vY29tcGFyZUFzYy5qc1wiO1xuaW1wb3J0IHsgbWludXRlc0luRGF5LCBtaW51dGVzSW5Nb250aCB9IGZyb20gXCIuL2NvbnN0YW50cy5qc1wiO1xuaW1wb3J0IHsgZGlmZmVyZW5jZUluTW9udGhzIH0gZnJvbSBcIi4vZGlmZmVyZW5jZUluTW9udGhzLmpzXCI7XG5pbXBvcnQgeyBkaWZmZXJlbmNlSW5TZWNvbmRzIH0gZnJvbSBcIi4vZGlmZmVyZW5jZUluU2Vjb25kcy5qc1wiO1xuXG4vKipcbiAqIFRoZSB7QGxpbmsgZm9ybWF0RGlzdGFuY2V9IGZ1bmN0aW9uIG9wdGlvbnMuXG4gKi9cblxuLyoqXG4gKiBAbmFtZSBmb3JtYXREaXN0YW5jZVxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIGRpc3RhbmNlIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzIGluIHdvcmRzLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcyBpbiB3b3Jkcy5cbiAqXG4gKiB8IERpc3RhbmNlIGJldHdlZW4gZGF0ZXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUmVzdWx0ICAgICAgICAgICAgICB8XG4gKiB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXwtLS0tLS0tLS0tLS0tLS0tLS0tLS18XG4gKiB8IDAgLi4uIDMwIHNlY3MgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgbGVzcyB0aGFuIGEgbWludXRlICB8XG4gKiB8IDMwIHNlY3MgLi4uIDEgbWluIDMwIHNlY3MgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgMSBtaW51dGUgICAgICAgICAgICB8XG4gKiB8IDEgbWluIDMwIHNlY3MgLi4uIDQ0IG1pbnMgMzAgc2VjcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgWzIuLjQ0XSBtaW51dGVzICAgICB8XG4gKiB8IDQ0IG1pbnMgLi4uIDMwIHNlY3MgLi4uIDg5IG1pbnMgMzAgc2VjcyAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgYWJvdXQgMSBob3VyICAgICAgICB8XG4gKiB8IDg5IG1pbnMgMzAgc2VjcyAuLi4gMjMgaHJzIDU5IG1pbnMgMzAgc2VjcyAgICAgICAgICAgICAgICAgICAgICAgIHwgYWJvdXQgWzIuLjI0XSBob3VycyB8XG4gKiB8IDIzIGhycyA1OSBtaW5zIDMwIHNlY3MgLi4uIDQxIGhycyA1OSBtaW5zIDMwIHNlY3MgICAgICAgICAgICAgICAgIHwgMSBkYXkgICAgICAgICAgICAgICB8XG4gKiB8IDQxIGhycyA1OSBtaW5zIDMwIHNlY3MgLi4uIDI5IGRheXMgMjMgaHJzIDU5IG1pbnMgMzAgc2VjcyAgICAgICAgIHwgWzIuLjMwXSBkYXlzICAgICAgICB8XG4gKiB8IDI5IGRheXMgMjMgaHJzIDU5IG1pbnMgMzAgc2VjcyAuLi4gNDQgZGF5cyAyMyBocnMgNTkgbWlucyAzMCBzZWNzIHwgYWJvdXQgMSBtb250aCAgICAgICB8XG4gKiB8IDQ0IGRheXMgMjMgaHJzIDU5IG1pbnMgMzAgc2VjcyAuLi4gNTkgZGF5cyAyMyBocnMgNTkgbWlucyAzMCBzZWNzIHwgYWJvdXQgMiBtb250aHMgICAgICB8XG4gKiB8IDU5IGRheXMgMjMgaHJzIDU5IG1pbnMgMzAgc2VjcyAuLi4gMSB5ciAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgWzIuLjEyXSBtb250aHMgICAgICB8XG4gKiB8IDEgeXIgLi4uIDEgeXIgMyBtb250aHMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgYWJvdXQgMSB5ZWFyICAgICAgICB8XG4gKiB8IDEgeXIgMyBtb250aHMgLi4uIDEgeXIgOSBtb250aCBzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgb3ZlciAxIHllYXIgICAgICAgICB8XG4gKiB8IDEgeXIgOSBtb250aHMgLi4uIDIgeXJzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgYWxtb3N0IDIgeWVhcnMgICAgICB8XG4gKiB8IE4geXJzIC4uLiBOIHlycyAzIG1vbnRocyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgYWJvdXQgTiB5ZWFycyAgICAgICB8XG4gKiB8IE4geXJzIDMgbW9udGhzIC4uLiBOIHlycyA5IG1vbnRocyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgb3ZlciBOIHllYXJzICAgICAgICB8XG4gKiB8IE4geXJzIDkgbW9udGhzIC4uLiBOKzEgeXJzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgYWxtb3N0IE4rMSB5ZWFycyAgICB8XG4gKlxuICogV2l0aCBgb3B0aW9ucy5pbmNsdWRlU2Vjb25kcyA9PSB0cnVlYDpcbiAqIHwgRGlzdGFuY2UgYmV0d2VlbiBkYXRlcyB8IFJlc3VsdCAgICAgICAgICAgICAgIHxcbiAqIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18LS0tLS0tLS0tLS0tLS0tLS0tLS0tLXxcbiAqIHwgMCBzZWNzIC4uLiA1IHNlY3MgICAgICB8IGxlc3MgdGhhbiA1IHNlY29uZHMgIHxcbiAqIHwgNSBzZWNzIC4uLiAxMCBzZWNzICAgICB8IGxlc3MgdGhhbiAxMCBzZWNvbmRzIHxcbiAqIHwgMTAgc2VjcyAuLi4gMjAgc2VjcyAgICB8IGxlc3MgdGhhbiAyMCBzZWNvbmRzIHxcbiAqIHwgMjAgc2VjcyAuLi4gNDAgc2VjcyAgICB8IGhhbGYgYSBtaW51dGUgICAgICAgIHxcbiAqIHwgNDAgc2VjcyAuLi4gNjAgc2VjcyAgICB8IGxlc3MgdGhhbiBhIG1pbnV0ZSAgIHxcbiAqIHwgNjAgc2VjcyAuLi4gOTAgc2VjcyAgICB8IDEgbWludXRlICAgICAgICAgICAgIHxcbiAqXG4gKiBAcGFyYW0gbGF0ZXJEYXRlIC0gVGhlIGRhdGVcbiAqIEBwYXJhbSBlYXJsaWVyRGF0ZSAtIFRoZSBkYXRlIHRvIGNvbXBhcmUgd2l0aFxuICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvYmplY3Qgd2l0aCBvcHRpb25zXG4gKlxuICogQHJldHVybnMgVGhlIGRpc3RhbmNlIGluIHdvcmRzXG4gKlxuICogQHRocm93cyBgZGF0ZWAgbXVzdCBub3QgYmUgSW52YWxpZCBEYXRlXG4gKiBAdGhyb3dzIGBiYXNlRGF0ZWAgbXVzdCBub3QgYmUgSW52YWxpZCBEYXRlXG4gKiBAdGhyb3dzIGBvcHRpb25zLmxvY2FsZWAgbXVzdCBjb250YWluIGBmb3JtYXREaXN0YW5jZWAgcHJvcGVydHlcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hhdCBpcyB0aGUgZGlzdGFuY2UgYmV0d2VlbiAyIEp1bHkgMjAxNCBhbmQgMSBKYW51YXJ5IDIwMTU/XG4gKiBjb25zdCByZXN1bHQgPSBmb3JtYXREaXN0YW5jZShuZXcgRGF0ZSgyMDE0LCA2LCAyKSwgbmV3IERhdGUoMjAxNSwgMCwgMSkpXG4gKiAvLz0+ICc2IG1vbnRocydcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hhdCBpcyB0aGUgZGlzdGFuY2UgYmV0d2VlbiAxIEphbnVhcnkgMjAxNSAwMDowMDoxNVxuICogLy8gYW5kIDEgSmFudWFyeSAyMDE1IDAwOjAwOjAwLCBpbmNsdWRpbmcgc2Vjb25kcz9cbiAqIGNvbnN0IHJlc3VsdCA9IGZvcm1hdERpc3RhbmNlKFxuICogICBuZXcgRGF0ZSgyMDE1LCAwLCAxLCAwLCAwLCAxNSksXG4gKiAgIG5ldyBEYXRlKDIwMTUsIDAsIDEsIDAsIDAsIDApLFxuICogICB7IGluY2x1ZGVTZWNvbmRzOiB0cnVlIH1cbiAqIClcbiAqIC8vPT4gJ2xlc3MgdGhhbiAyMCBzZWNvbmRzJ1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBXaGF0IGlzIHRoZSBkaXN0YW5jZSBmcm9tIDEgSmFudWFyeSAyMDE2XG4gKiAvLyB0byAxIEphbnVhcnkgMjAxNSwgd2l0aCBhIHN1ZmZpeD9cbiAqIGNvbnN0IHJlc3VsdCA9IGZvcm1hdERpc3RhbmNlKG5ldyBEYXRlKDIwMTUsIDAsIDEpLCBuZXcgRGF0ZSgyMDE2LCAwLCAxKSwge1xuICogICBhZGRTdWZmaXg6IHRydWVcbiAqIH0pXG4gKiAvLz0+ICdhYm91dCAxIHllYXIgYWdvJ1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBXaGF0IGlzIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIDEgQXVndXN0IDIwMTYgYW5kIDEgSmFudWFyeSAyMDE1IGluIEVzcGVyYW50bz9cbiAqIGltcG9ydCB7IGVvTG9jYWxlIH0gZnJvbSAnZGF0ZS1mbnMvbG9jYWxlL2VvJ1xuICogY29uc3QgcmVzdWx0ID0gZm9ybWF0RGlzdGFuY2UobmV3IERhdGUoMjAxNiwgNywgMSksIG5ldyBEYXRlKDIwMTUsIDAsIDEpLCB7XG4gKiAgIGxvY2FsZTogZW9Mb2NhbGVcbiAqIH0pXG4gKiAvLz0+ICdwbGkgb2wgMSBqYXJvJ1xuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RGlzdGFuY2UobGF0ZXJEYXRlLCBlYXJsaWVyRGF0ZSwgb3B0aW9ucykge1xuICBjb25zdCBkZWZhdWx0T3B0aW9ucyA9IGdldERlZmF1bHRPcHRpb25zKCk7XG4gIGNvbnN0IGxvY2FsZSA9IG9wdGlvbnM/LmxvY2FsZSA/PyBkZWZhdWx0T3B0aW9ucy5sb2NhbGUgPz8gZGVmYXVsdExvY2FsZTtcbiAgY29uc3QgbWludXRlc0luQWxtb3N0VHdvRGF5cyA9IDI1MjA7XG5cbiAgY29uc3QgY29tcGFyaXNvbiA9IGNvbXBhcmVBc2MobGF0ZXJEYXRlLCBlYXJsaWVyRGF0ZSk7XG5cbiAgaWYgKGlzTmFOKGNvbXBhcmlzb24pKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIkludmFsaWQgdGltZSB2YWx1ZVwiKTtcblxuICBjb25zdCBsb2NhbGl6ZU9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zLCB7XG4gICAgYWRkU3VmZml4OiBvcHRpb25zPy5hZGRTdWZmaXgsXG4gICAgY29tcGFyaXNvbjogY29tcGFyaXNvbixcbiAgfSk7XG5cbiAgY29uc3QgW2xhdGVyRGF0ZV8sIGVhcmxpZXJEYXRlX10gPSBub3JtYWxpemVEYXRlcyhcbiAgICBvcHRpb25zPy5pbixcbiAgICAuLi4oY29tcGFyaXNvbiA+IDAgPyBbZWFybGllckRhdGUsIGxhdGVyRGF0ZV0gOiBbbGF0ZXJEYXRlLCBlYXJsaWVyRGF0ZV0pLFxuICApO1xuXG4gIGNvbnN0IHNlY29uZHMgPSBkaWZmZXJlbmNlSW5TZWNvbmRzKGVhcmxpZXJEYXRlXywgbGF0ZXJEYXRlXyk7XG4gIGNvbnN0IG9mZnNldEluU2Vjb25kcyA9XG4gICAgKGdldFRpbWV6b25lT2Zmc2V0SW5NaWxsaXNlY29uZHMoZWFybGllckRhdGVfKSAtXG4gICAgICBnZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzKGxhdGVyRGF0ZV8pKSAvXG4gICAgMTAwMDtcbiAgY29uc3QgbWludXRlcyA9IE1hdGgucm91bmQoKHNlY29uZHMgLSBvZmZzZXRJblNlY29uZHMpIC8gNjApO1xuICBsZXQgbW9udGhzO1xuXG4gIC8vIDAgdXAgdG8gMiBtaW5zXG4gIGlmIChtaW51dGVzIDwgMikge1xuICAgIGlmIChvcHRpb25zPy5pbmNsdWRlU2Vjb25kcykge1xuICAgICAgaWYgKHNlY29uZHMgPCA1KSB7XG4gICAgICAgIHJldHVybiBsb2NhbGUuZm9ybWF0RGlzdGFuY2UoXCJsZXNzVGhhblhTZWNvbmRzXCIsIDUsIGxvY2FsaXplT3B0aW9ucyk7XG4gICAgICB9IGVsc2UgaWYgKHNlY29uZHMgPCAxMCkge1xuICAgICAgICByZXR1cm4gbG9jYWxlLmZvcm1hdERpc3RhbmNlKFwibGVzc1RoYW5YU2Vjb25kc1wiLCAxMCwgbG9jYWxpemVPcHRpb25zKTtcbiAgICAgIH0gZWxzZSBpZiAoc2Vjb25kcyA8IDIwKSB7XG4gICAgICAgIHJldHVybiBsb2NhbGUuZm9ybWF0RGlzdGFuY2UoXCJsZXNzVGhhblhTZWNvbmRzXCIsIDIwLCBsb2NhbGl6ZU9wdGlvbnMpO1xuICAgICAgfSBlbHNlIGlmIChzZWNvbmRzIDwgNDApIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsZS5mb3JtYXREaXN0YW5jZShcImhhbGZBTWludXRlXCIsIDAsIGxvY2FsaXplT3B0aW9ucyk7XG4gICAgICB9IGVsc2UgaWYgKHNlY29uZHMgPCA2MCkge1xuICAgICAgICByZXR1cm4gbG9jYWxlLmZvcm1hdERpc3RhbmNlKFwibGVzc1RoYW5YTWludXRlc1wiLCAxLCBsb2NhbGl6ZU9wdGlvbnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsZS5mb3JtYXREaXN0YW5jZShcInhNaW51dGVzXCIsIDEsIGxvY2FsaXplT3B0aW9ucyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChtaW51dGVzID09PSAwKSB7XG4gICAgICAgIHJldHVybiBsb2NhbGUuZm9ybWF0RGlzdGFuY2UoXCJsZXNzVGhhblhNaW51dGVzXCIsIDEsIGxvY2FsaXplT3B0aW9ucyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbG9jYWxlLmZvcm1hdERpc3RhbmNlKFwieE1pbnV0ZXNcIiwgbWludXRlcywgbG9jYWxpemVPcHRpb25zKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyAyIG1pbnMgdXAgdG8gMC43NSBocnNcbiAgfSBlbHNlIGlmIChtaW51dGVzIDwgNDUpIHtcbiAgICByZXR1cm4gbG9jYWxlLmZvcm1hdERpc3RhbmNlKFwieE1pbnV0ZXNcIiwgbWludXRlcywgbG9jYWxpemVPcHRpb25zKTtcblxuICAgIC8vIDAuNzUgaHJzIHVwIHRvIDEuNSBocnNcbiAgfSBlbHNlIGlmIChtaW51dGVzIDwgOTApIHtcbiAgICByZXR1cm4gbG9jYWxlLmZvcm1hdERpc3RhbmNlKFwiYWJvdXRYSG91cnNcIiwgMSwgbG9jYWxpemVPcHRpb25zKTtcblxuICAgIC8vIDEuNSBocnMgdXAgdG8gMjQgaHJzXG4gIH0gZWxzZSBpZiAobWludXRlcyA8IG1pbnV0ZXNJbkRheSkge1xuICAgIGNvbnN0IGhvdXJzID0gTWF0aC5yb3VuZChtaW51dGVzIC8gNjApO1xuICAgIHJldHVybiBsb2NhbGUuZm9ybWF0RGlzdGFuY2UoXCJhYm91dFhIb3Vyc1wiLCBob3VycywgbG9jYWxpemVPcHRpb25zKTtcblxuICAgIC8vIDEgZGF5IHVwIHRvIDEuNzUgZGF5c1xuICB9IGVsc2UgaWYgKG1pbnV0ZXMgPCBtaW51dGVzSW5BbG1vc3RUd29EYXlzKSB7XG4gICAgcmV0dXJuIGxvY2FsZS5mb3JtYXREaXN0YW5jZShcInhEYXlzXCIsIDEsIGxvY2FsaXplT3B0aW9ucyk7XG5cbiAgICAvLyAxLjc1IGRheXMgdXAgdG8gMzAgZGF5c1xuICB9IGVsc2UgaWYgKG1pbnV0ZXMgPCBtaW51dGVzSW5Nb250aCkge1xuICAgIGNvbnN0IGRheXMgPSBNYXRoLnJvdW5kKG1pbnV0ZXMgLyBtaW51dGVzSW5EYXkpO1xuICAgIHJldHVybiBsb2NhbGUuZm9ybWF0RGlzdGFuY2UoXCJ4RGF5c1wiLCBkYXlzLCBsb2NhbGl6ZU9wdGlvbnMpO1xuXG4gICAgLy8gMSBtb250aCB1cCB0byAyIG1vbnRoc1xuICB9IGVsc2UgaWYgKG1pbnV0ZXMgPCBtaW51dGVzSW5Nb250aCAqIDIpIHtcbiAgICBtb250aHMgPSBNYXRoLnJvdW5kKG1pbnV0ZXMgLyBtaW51dGVzSW5Nb250aCk7XG4gICAgcmV0dXJuIGxvY2FsZS5mb3JtYXREaXN0YW5jZShcImFib3V0WE1vbnRoc1wiLCBtb250aHMsIGxvY2FsaXplT3B0aW9ucyk7XG4gIH1cblxuICBtb250aHMgPSBkaWZmZXJlbmNlSW5Nb250aHMoZWFybGllckRhdGVfLCBsYXRlckRhdGVfKTtcblxuICAvLyAyIG1vbnRocyB1cCB0byAxMiBtb250aHNcbiAgaWYgKG1vbnRocyA8IDEyKSB7XG4gICAgY29uc3QgbmVhcmVzdE1vbnRoID0gTWF0aC5yb3VuZChtaW51dGVzIC8gbWludXRlc0luTW9udGgpO1xuICAgIHJldHVybiBsb2NhbGUuZm9ybWF0RGlzdGFuY2UoXCJ4TW9udGhzXCIsIG5lYXJlc3RNb250aCwgbG9jYWxpemVPcHRpb25zKTtcblxuICAgIC8vIDEgeWVhciB1cCB0byBtYXggRGF0ZVxuICB9IGVsc2Uge1xuICAgIGNvbnN0IG1vbnRoc1NpbmNlU3RhcnRPZlllYXIgPSBtb250aHMgJSAxMjtcbiAgICBjb25zdCB5ZWFycyA9IE1hdGgudHJ1bmMobW9udGhzIC8gMTIpO1xuXG4gICAgLy8gTiB5ZWFycyB1cCB0byAxIHllYXJzIDMgbW9udGhzXG4gICAgaWYgKG1vbnRoc1NpbmNlU3RhcnRPZlllYXIgPCAzKSB7XG4gICAgICByZXR1cm4gbG9jYWxlLmZvcm1hdERpc3RhbmNlKFwiYWJvdXRYWWVhcnNcIiwgeWVhcnMsIGxvY2FsaXplT3B0aW9ucyk7XG5cbiAgICAgIC8vIE4geWVhcnMgMyBtb250aHMgdXAgdG8gTiB5ZWFycyA5IG1vbnRoc1xuICAgIH0gZWxzZSBpZiAobW9udGhzU2luY2VTdGFydE9mWWVhciA8IDkpIHtcbiAgICAgIHJldHVybiBsb2NhbGUuZm9ybWF0RGlzdGFuY2UoXCJvdmVyWFllYXJzXCIsIHllYXJzLCBsb2NhbGl6ZU9wdGlvbnMpO1xuXG4gICAgICAvLyBOIHllYXJzIDkgbW9udGhzIHVwIHRvIE4geWVhciAxMiBtb250aHNcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGxvY2FsZS5mb3JtYXREaXN0YW5jZShcImFsbW9zdFhZZWFyc1wiLCB5ZWFycyArIDEsIGxvY2FsaXplT3B0aW9ucyk7XG4gICAgfVxuICB9XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgZm9ybWF0RGlzdGFuY2U7XG4iLCJpbXBvcnQgeyBjb25zdHJ1Y3ROb3cgfSBmcm9tIFwiLi9jb25zdHJ1Y3ROb3cuanNcIjtcblxuaW1wb3J0IHsgZm9ybWF0RGlzdGFuY2UgfSBmcm9tIFwiLi9mb3JtYXREaXN0YW5jZS5qc1wiO1xuXG4vKipcbiAqIFRoZSB7QGxpbmsgZm9ybWF0RGlzdGFuY2VUb05vd30gZnVuY3Rpb24gb3B0aW9ucy5cbiAqL1xuXG4vKipcbiAqIEBuYW1lIGZvcm1hdERpc3RhbmNlVG9Ob3dcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlIGFuZCBub3cgaW4gd29yZHMuXG4gKiBAcHVyZSBmYWxzZVxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlIGFuZCBub3cgaW4gd29yZHMuXG4gKlxuICogfCBEaXN0YW5jZSB0byBub3cgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFJlc3VsdCAgICAgICAgICAgICAgfFxuICogfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18LS0tLS0tLS0tLS0tLS0tLS0tLS0tfFxuICogfCAwIC4uLiAzMCBzZWNzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGxlc3MgdGhhbiBhIG1pbnV0ZSAgfFxuICogfCAzMCBzZWNzIC4uLiAxIG1pbiAzMCBzZWNzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDEgbWludXRlICAgICAgICAgICAgfFxuICogfCAxIG1pbiAzMCBzZWNzIC4uLiA0NCBtaW5zIDMwIHNlY3MgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFsyLi40NF0gbWludXRlcyAgICAgfFxuICogfCA0NCBtaW5zIC4uLiAzMCBzZWNzIC4uLiA4OSBtaW5zIDMwIHNlY3MgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGFib3V0IDEgaG91ciAgICAgICAgfFxuICogfCA4OSBtaW5zIDMwIHNlY3MgLi4uIDIzIGhycyA1OSBtaW5zIDMwIHNlY3MgICAgICAgICAgICAgICAgICAgICAgICB8IGFib3V0IFsyLi4yNF0gaG91cnMgfFxuICogfCAyMyBocnMgNTkgbWlucyAzMCBzZWNzIC4uLiA0MSBocnMgNTkgbWlucyAzMCBzZWNzICAgICAgICAgICAgICAgICB8IDEgZGF5ICAgICAgICAgICAgICAgfFxuICogfCA0MSBocnMgNTkgbWlucyAzMCBzZWNzIC4uLiAyOSBkYXlzIDIzIGhycyA1OSBtaW5zIDMwIHNlY3MgICAgICAgICB8IFsyLi4zMF0gZGF5cyAgICAgICAgfFxuICogfCAyOSBkYXlzIDIzIGhycyA1OSBtaW5zIDMwIHNlY3MgLi4uIDQ0IGRheXMgMjMgaHJzIDU5IG1pbnMgMzAgc2VjcyB8IGFib3V0IDEgbW9udGggICAgICAgfFxuICogfCA0NCBkYXlzIDIzIGhycyA1OSBtaW5zIDMwIHNlY3MgLi4uIDU5IGRheXMgMjMgaHJzIDU5IG1pbnMgMzAgc2VjcyB8IGFib3V0IDIgbW9udGhzICAgICAgfFxuICogfCA1OSBkYXlzIDIzIGhycyA1OSBtaW5zIDMwIHNlY3MgLi4uIDEgeXIgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFsyLi4xMl0gbW9udGhzICAgICAgfFxuICogfCAxIHlyIC4uLiAxIHlyIDMgbW9udGhzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGFib3V0IDEgeWVhciAgICAgICAgfFxuICogfCAxIHlyIDMgbW9udGhzIC4uLiAxIHlyIDkgbW9udGggcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IG92ZXIgMSB5ZWFyICAgICAgICAgfFxuICogfCAxIHlyIDkgbW9udGhzIC4uLiAyIHlycyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGFsbW9zdCAyIHllYXJzICAgICAgfFxuICogfCBOIHlycyAuLi4gTiB5cnMgMyBtb250aHMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGFib3V0IE4geWVhcnMgICAgICAgfFxuICogfCBOIHlycyAzIG1vbnRocyAuLi4gTiB5cnMgOSBtb250aHMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IG92ZXIgTiB5ZWFycyAgICAgICAgfFxuICogfCBOIHlycyA5IG1vbnRocyAuLi4gTisxIHlycyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGFsbW9zdCBOKzEgeWVhcnMgICAgfFxuICpcbiAqIFdpdGggYG9wdGlvbnMuaW5jbHVkZVNlY29uZHMgPT0gdHJ1ZWA6XG4gKiB8IERpc3RhbmNlIHRvIG5vdyAgICAgfCBSZXN1bHQgICAgICAgICAgICAgICB8XG4gKiB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS18XG4gKiB8IDAgc2VjcyAuLi4gNSBzZWNzICAgfCBsZXNzIHRoYW4gNSBzZWNvbmRzICB8XG4gKiB8IDUgc2VjcyAuLi4gMTAgc2VjcyAgfCBsZXNzIHRoYW4gMTAgc2Vjb25kcyB8XG4gKiB8IDEwIHNlY3MgLi4uIDIwIHNlY3MgfCBsZXNzIHRoYW4gMjAgc2Vjb25kcyB8XG4gKiB8IDIwIHNlY3MgLi4uIDQwIHNlY3MgfCBoYWxmIGEgbWludXRlICAgICAgICB8XG4gKiB8IDQwIHNlY3MgLi4uIDYwIHNlY3MgfCBsZXNzIHRoYW4gYSBtaW51dGUgICB8XG4gKiB8IDYwIHNlY3MgLi4uIDkwIHNlY3MgfCAxIG1pbnV0ZSAgICAgICAgICAgICB8XG4gKlxuICogQHBhcmFtIGRhdGUgLSBUaGUgZ2l2ZW4gZGF0ZVxuICogQHBhcmFtIG9wdGlvbnMgLSBUaGUgb2JqZWN0IHdpdGggb3B0aW9uc1xuICpcbiAqIEByZXR1cm5zIFRoZSBkaXN0YW5jZSBpbiB3b3Jkc1xuICpcbiAqIEB0aHJvd3MgYGRhdGVgIG11c3Qgbm90IGJlIEludmFsaWQgRGF0ZVxuICogQHRocm93cyBgb3B0aW9ucy5sb2NhbGVgIG11c3QgY29udGFpbiBgZm9ybWF0RGlzdGFuY2VgIHByb3BlcnR5XG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElmIHRvZGF5IGlzIDEgSmFudWFyeSAyMDE1LCB3aGF0IGlzIHRoZSBkaXN0YW5jZSB0byAyIEp1bHkgMjAxND9cbiAqIGNvbnN0IHJlc3VsdCA9IGZvcm1hdERpc3RhbmNlVG9Ob3coXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDYsIDIpXG4gKiApXG4gKiAvLz0+ICc2IG1vbnRocydcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgbm93IGlzIDEgSmFudWFyeSAyMDE1IDAwOjAwOjAwLFxuICogLy8gd2hhdCBpcyB0aGUgZGlzdGFuY2UgdG8gMSBKYW51YXJ5IDIwMTUgMDA6MDA6MTUsIGluY2x1ZGluZyBzZWNvbmRzP1xuICogY29uc3QgcmVzdWx0ID0gZm9ybWF0RGlzdGFuY2VUb05vdyhcbiAqICAgbmV3IERhdGUoMjAxNSwgMCwgMSwgMCwgMCwgMTUpLFxuICogICB7aW5jbHVkZVNlY29uZHM6IHRydWV9XG4gKiApXG4gKiAvLz0+ICdsZXNzIHRoYW4gMjAgc2Vjb25kcydcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgdG9kYXkgaXMgMSBKYW51YXJ5IDIwMTUsXG4gKiAvLyB3aGF0IGlzIHRoZSBkaXN0YW5jZSB0byAxIEphbnVhcnkgMjAxNiwgd2l0aCBhIHN1ZmZpeD9cbiAqIGNvbnN0IHJlc3VsdCA9IGZvcm1hdERpc3RhbmNlVG9Ob3coXG4gKiAgIG5ldyBEYXRlKDIwMTYsIDAsIDEpLFxuICogICB7YWRkU3VmZml4OiB0cnVlfVxuICogKVxuICogLy89PiAnaW4gYWJvdXQgMSB5ZWFyJ1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJZiB0b2RheSBpcyAxIEphbnVhcnkgMjAxNSxcbiAqIC8vIHdoYXQgaXMgdGhlIGRpc3RhbmNlIHRvIDEgQXVndXN0IDIwMTYgaW4gRXNwZXJhbnRvP1xuICogY29uc3QgZW9Mb2NhbGUgPSByZXF1aXJlKCdkYXRlLWZucy9sb2NhbGUvZW8nKVxuICogY29uc3QgcmVzdWx0ID0gZm9ybWF0RGlzdGFuY2VUb05vdyhcbiAqICAgbmV3IERhdGUoMjAxNiwgNywgMSksXG4gKiAgIHtsb2NhbGU6IGVvTG9jYWxlfVxuICogKVxuICogLy89PiAncGxpIG9sIDEgamFybydcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdERpc3RhbmNlVG9Ob3coZGF0ZSwgb3B0aW9ucykge1xuICByZXR1cm4gZm9ybWF0RGlzdGFuY2UoZGF0ZSwgY29uc3RydWN0Tm93KGRhdGUpLCBvcHRpb25zKTtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBmb3JtYXREaXN0YW5jZVRvTm93O1xuIiwiaW1wb3J0IHsgZW5kT2ZEYXkgfSBmcm9tIFwiLi9lbmRPZkRheS5qc1wiO1xuaW1wb3J0IHsgZW5kT2ZNb250aCB9IGZyb20gXCIuL2VuZE9mTW9udGguanNcIjtcbmltcG9ydCB7IHRvRGF0ZSB9IGZyb20gXCIuL3RvRGF0ZS5qc1wiO1xuXG4vKipcbiAqIEBuYW1lIGlzTGFzdERheU9mTW9udGhcbiAqIEBjYXRlZ29yeSBNb250aCBIZWxwZXJzXG4gKiBAc3VtbWFyeSBJcyB0aGUgZ2l2ZW4gZGF0ZSB0aGUgbGFzdCBkYXkgb2YgYSBtb250aD9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIElzIHRoZSBnaXZlbiBkYXRlIHRoZSBsYXN0IGRheSBvZiBhIG1vbnRoP1xuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIGRhdGUgdG8gY2hlY2tcbiAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb2JqZWN0IHdpdGggb3B0aW9uc1xuICpcbiAqIEByZXR1cm5zIFRoZSBkYXRlIGlzIHRoZSBsYXN0IGRheSBvZiBhIG1vbnRoXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElzIDI4IEZlYnJ1YXJ5IDIwMTQgdGhlIGxhc3QgZGF5IG9mIGEgbW9udGg/XG4gKiBjb25zdCByZXN1bHQgPSBpc0xhc3REYXlPZk1vbnRoKG5ldyBEYXRlKDIwMTQsIDEsIDI4KSlcbiAqIC8vPT4gdHJ1ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNMYXN0RGF5T2ZNb250aChkYXRlLCBvcHRpb25zKSB7XG4gIGNvbnN0IF9kYXRlID0gdG9EYXRlKGRhdGUsIG9wdGlvbnM/LmluKTtcbiAgcmV0dXJuICtlbmRPZkRheShfZGF0ZSwgb3B0aW9ucykgPT09ICtlbmRPZk1vbnRoKF9kYXRlLCBvcHRpb25zKTtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBpc0xhc3REYXlPZk1vbnRoO1xuIiwiaW1wb3J0IHsgbm9ybWFsaXplRGF0ZXMgfSBmcm9tIFwiLi9fbGliL25vcm1hbGl6ZURhdGVzLmpzXCI7XG5pbXBvcnQgeyBzdGFydE9mV2VlayB9IGZyb20gXCIuL3N0YXJ0T2ZXZWVrLmpzXCI7XG5cbi8qKlxuICogVGhlIHtAbGluayBpc1NhbWVXZWVrfSBmdW5jdGlvbiBvcHRpb25zLlxuICovXG5cbi8qKlxuICogQG5hbWUgaXNTYW1lV2Vla1xuICogQGNhdGVnb3J5IFdlZWsgSGVscGVyc1xuICogQHN1bW1hcnkgQXJlIHRoZSBnaXZlbiBkYXRlcyBpbiB0aGUgc2FtZSB3ZWVrIChhbmQgbW9udGggYW5kIHllYXIpP1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQXJlIHRoZSBnaXZlbiBkYXRlcyBpbiB0aGUgc2FtZSB3ZWVrIChhbmQgbW9udGggYW5kIHllYXIpP1xuICpcbiAqIEBwYXJhbSBsYXRlckRhdGUgLSBUaGUgZmlyc3QgZGF0ZSB0byBjaGVja1xuICogQHBhcmFtIGVhcmxpZXJEYXRlIC0gVGhlIHNlY29uZCBkYXRlIHRvIGNoZWNrXG4gKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9iamVjdCB3aXRoIG9wdGlvbnNcbiAqXG4gKiBAcmV0dXJucyBUaGUgZGF0ZXMgYXJlIGluIHRoZSBzYW1lIHdlZWsgKGFuZCBtb250aCBhbmQgeWVhcilcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQXJlIDMxIEF1Z3VzdCAyMDE0IGFuZCA0IFNlcHRlbWJlciAyMDE0IGluIHRoZSBzYW1lIHdlZWs/XG4gKiBjb25zdCByZXN1bHQgPSBpc1NhbWVXZWVrKG5ldyBEYXRlKDIwMTQsIDcsIDMxKSwgbmV3IERhdGUoMjAxNCwgOCwgNCkpXG4gKiAvLz0+IHRydWVcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgd2VlayBzdGFydHMgd2l0aCBNb25kYXksXG4gKiAvLyBhcmUgMzEgQXVndXN0IDIwMTQgYW5kIDQgU2VwdGVtYmVyIDIwMTQgaW4gdGhlIHNhbWUgd2Vlaz9cbiAqIGNvbnN0IHJlc3VsdCA9IGlzU2FtZVdlZWsobmV3IERhdGUoMjAxNCwgNywgMzEpLCBuZXcgRGF0ZSgyMDE0LCA4LCA0KSwge1xuICogICB3ZWVrU3RhcnRzT246IDFcbiAqIH0pXG4gKiAvLz0+IGZhbHNlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEFyZSAxIEphbnVhcnkgMjAxNCBhbmQgMSBKYW51YXJ5IDIwMTUgaW4gdGhlIHNhbWUgd2Vlaz9cbiAqIGNvbnN0IHJlc3VsdCA9IGlzU2FtZVdlZWsobmV3IERhdGUoMjAxNCwgMCwgMSksIG5ldyBEYXRlKDIwMTUsIDAsIDEpKVxuICogLy89PiBmYWxzZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTYW1lV2VlayhsYXRlckRhdGUsIGVhcmxpZXJEYXRlLCBvcHRpb25zKSB7XG4gIGNvbnN0IFtsYXRlckRhdGVfLCBlYXJsaWVyRGF0ZV9dID0gbm9ybWFsaXplRGF0ZXMoXG4gICAgb3B0aW9ucz8uaW4sXG4gICAgbGF0ZXJEYXRlLFxuICAgIGVhcmxpZXJEYXRlLFxuICApO1xuICByZXR1cm4gKFxuICAgICtzdGFydE9mV2VlayhsYXRlckRhdGVfLCBvcHRpb25zKSA9PT0gK3N0YXJ0T2ZXZWVrKGVhcmxpZXJEYXRlXywgb3B0aW9ucylcbiAgKTtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBpc1NhbWVXZWVrO1xuIiwiZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkRm9ybWF0TG9uZ0ZuKGFyZ3MpIHtcbiAgcmV0dXJuIChvcHRpb25zID0ge30pID0+IHtcbiAgICAvLyBUT0RPOiBSZW1vdmUgU3RyaW5nKClcbiAgICBjb25zdCB3aWR0aCA9IG9wdGlvbnMud2lkdGggPyBTdHJpbmcob3B0aW9ucy53aWR0aCkgOiBhcmdzLmRlZmF1bHRXaWR0aDtcbiAgICBjb25zdCBmb3JtYXQgPSBhcmdzLmZvcm1hdHNbd2lkdGhdIHx8IGFyZ3MuZm9ybWF0c1thcmdzLmRlZmF1bHRXaWR0aF07XG4gICAgcmV0dXJuIGZvcm1hdDtcbiAgfTtcbn1cbiIsIi8qKlxuICogVGhlIGxvY2FsaXplIGZ1bmN0aW9uIGFyZ3VtZW50IGNhbGxiYWNrIHdoaWNoIGFsbG93cyB0byBjb252ZXJ0IHJhdyB2YWx1ZSB0b1xuICogdGhlIGFjdHVhbCB0eXBlLlxuICpcbiAqIEBwYXJhbSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBjb252ZXJ0XG4gKlxuICogQHJldHVybnMgVGhlIGNvbnZlcnRlZCB2YWx1ZVxuICovXG5cbi8qKlxuICogVGhlIG1hcCBvZiBsb2NhbGl6ZWQgdmFsdWVzIGZvciBlYWNoIHdpZHRoLlxuICovXG5cbi8qKlxuICogVGhlIGluZGV4IHR5cGUgb2YgdGhlIGxvY2FsZSB1bml0IHZhbHVlLiBJdCB0eXBlcyBjb252ZXJzaW9uIG9mIHVuaXRzIG9mXG4gKiB2YWx1ZXMgdGhhdCBkb24ndCBzdGFydCBhdCAwIChpLmUuIHF1YXJ0ZXJzKS5cbiAqL1xuXG4vKipcbiAqIENvbnZlcnRzIHRoZSB1bml0IHZhbHVlIHRvIHRoZSB0dXBsZSBvZiB2YWx1ZXMuXG4gKi9cblxuLyoqXG4gKiBUaGUgdHVwbGUgb2YgbG9jYWxpemVkIGVyYSB2YWx1ZXMuIFRoZSBmaXJzdCBlbGVtZW50IHJlcHJlc2VudHMgQkMsXG4gKiB0aGUgc2Vjb25kIGVsZW1lbnQgcmVwcmVzZW50cyBBRC5cbiAqL1xuXG4vKipcbiAqIFRoZSB0dXBsZSBvZiBsb2NhbGl6ZWQgcXVhcnRlciB2YWx1ZXMuIFRoZSBmaXJzdCBlbGVtZW50IHJlcHJlc2VudHMgUTEuXG4gKi9cblxuLyoqXG4gKiBUaGUgdHVwbGUgb2YgbG9jYWxpemVkIGRheSB2YWx1ZXMuIFRoZSBmaXJzdCBlbGVtZW50IHJlcHJlc2VudHMgU3VuZGF5LlxuICovXG5cbi8qKlxuICogVGhlIHR1cGxlIG9mIGxvY2FsaXplZCBtb250aCB2YWx1ZXMuIFRoZSBmaXJzdCBlbGVtZW50IHJlcHJlc2VudHMgSmFudWFyeS5cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRMb2NhbGl6ZUZuKGFyZ3MpIHtcbiAgcmV0dXJuICh2YWx1ZSwgb3B0aW9ucykgPT4ge1xuICAgIGNvbnN0IGNvbnRleHQgPSBvcHRpb25zPy5jb250ZXh0ID8gU3RyaW5nKG9wdGlvbnMuY29udGV4dCkgOiBcInN0YW5kYWxvbmVcIjtcblxuICAgIGxldCB2YWx1ZXNBcnJheTtcbiAgICBpZiAoY29udGV4dCA9PT0gXCJmb3JtYXR0aW5nXCIgJiYgYXJncy5mb3JtYXR0aW5nVmFsdWVzKSB7XG4gICAgICBjb25zdCBkZWZhdWx0V2lkdGggPSBhcmdzLmRlZmF1bHRGb3JtYXR0aW5nV2lkdGggfHwgYXJncy5kZWZhdWx0V2lkdGg7XG4gICAgICBjb25zdCB3aWR0aCA9IG9wdGlvbnM/LndpZHRoID8gU3RyaW5nKG9wdGlvbnMud2lkdGgpIDogZGVmYXVsdFdpZHRoO1xuXG4gICAgICB2YWx1ZXNBcnJheSA9XG4gICAgICAgIGFyZ3MuZm9ybWF0dGluZ1ZhbHVlc1t3aWR0aF0gfHwgYXJncy5mb3JtYXR0aW5nVmFsdWVzW2RlZmF1bHRXaWR0aF07XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGRlZmF1bHRXaWR0aCA9IGFyZ3MuZGVmYXVsdFdpZHRoO1xuICAgICAgY29uc3Qgd2lkdGggPSBvcHRpb25zPy53aWR0aCA/IFN0cmluZyhvcHRpb25zLndpZHRoKSA6IGFyZ3MuZGVmYXVsdFdpZHRoO1xuXG4gICAgICB2YWx1ZXNBcnJheSA9IGFyZ3MudmFsdWVzW3dpZHRoXSB8fCBhcmdzLnZhbHVlc1tkZWZhdWx0V2lkdGhdO1xuICAgIH1cbiAgICBjb25zdCBpbmRleCA9IGFyZ3MuYXJndW1lbnRDYWxsYmFjayA/IGFyZ3MuYXJndW1lbnRDYWxsYmFjayh2YWx1ZSkgOiB2YWx1ZTtcblxuICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgLSBGb3Igc29tZSByZWFzb24gVHlwZVNjcmlwdCBqdXN0IGRvbid0IHdhbnQgdG8gbWF0Y2ggaXQsIG5vIG1hdHRlciBob3cgaGFyZCB3ZSB0cnkuIEkgY2hhbGxlbmdlIHlvdSB0byB0cnkgdG8gcmVtb3ZlIGl0IVxuICAgIHJldHVybiB2YWx1ZXNBcnJheVtpbmRleF07XG4gIH07XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gYnVpbGRNYXRjaEZuKGFyZ3MpIHtcbiAgcmV0dXJuIChzdHJpbmcsIG9wdGlvbnMgPSB7fSkgPT4ge1xuICAgIGNvbnN0IHdpZHRoID0gb3B0aW9ucy53aWR0aDtcblxuICAgIGNvbnN0IG1hdGNoUGF0dGVybiA9XG4gICAgICAod2lkdGggJiYgYXJncy5tYXRjaFBhdHRlcm5zW3dpZHRoXSkgfHxcbiAgICAgIGFyZ3MubWF0Y2hQYXR0ZXJuc1thcmdzLmRlZmF1bHRNYXRjaFdpZHRoXTtcbiAgICBjb25zdCBtYXRjaFJlc3VsdCA9IHN0cmluZy5tYXRjaChtYXRjaFBhdHRlcm4pO1xuXG4gICAgaWYgKCFtYXRjaFJlc3VsdCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IG1hdGNoZWRTdHJpbmcgPSBtYXRjaFJlc3VsdFswXTtcblxuICAgIGNvbnN0IHBhcnNlUGF0dGVybnMgPVxuICAgICAgKHdpZHRoICYmIGFyZ3MucGFyc2VQYXR0ZXJuc1t3aWR0aF0pIHx8XG4gICAgICBhcmdzLnBhcnNlUGF0dGVybnNbYXJncy5kZWZhdWx0UGFyc2VXaWR0aF07XG5cbiAgICBjb25zdCBrZXkgPSBBcnJheS5pc0FycmF5KHBhcnNlUGF0dGVybnMpXG4gICAgICA/IGZpbmRJbmRleChwYXJzZVBhdHRlcm5zLCAocGF0dGVybikgPT4gcGF0dGVybi50ZXN0KG1hdGNoZWRTdHJpbmcpKVxuICAgICAgOiAvLyBbVE9ET10gLS0gSSBjaGFsbGVuZ2UgeW91IHRvIGZpeCB0aGUgdHlwZVxuICAgICAgICBmaW5kS2V5KHBhcnNlUGF0dGVybnMsIChwYXR0ZXJuKSA9PiBwYXR0ZXJuLnRlc3QobWF0Y2hlZFN0cmluZykpO1xuXG4gICAgbGV0IHZhbHVlO1xuXG4gICAgdmFsdWUgPSBhcmdzLnZhbHVlQ2FsbGJhY2sgPyBhcmdzLnZhbHVlQ2FsbGJhY2soa2V5KSA6IGtleTtcbiAgICB2YWx1ZSA9IG9wdGlvbnMudmFsdWVDYWxsYmFja1xuICAgICAgPyAvLyBbVE9ET10gLS0gSSBjaGFsbGVuZ2UgeW91IHRvIGZpeCB0aGUgdHlwZVxuICAgICAgICBvcHRpb25zLnZhbHVlQ2FsbGJhY2sodmFsdWUpXG4gICAgICA6IHZhbHVlO1xuXG4gICAgY29uc3QgcmVzdCA9IHN0cmluZy5zbGljZShtYXRjaGVkU3RyaW5nLmxlbmd0aCk7XG5cbiAgICByZXR1cm4geyB2YWx1ZSwgcmVzdCB9O1xuICB9O1xufVxuXG5mdW5jdGlvbiBmaW5kS2V5KG9iamVjdCwgcHJlZGljYXRlKSB7XG4gIGZvciAoY29uc3Qga2V5IGluIG9iamVjdCkge1xuICAgIGlmIChcbiAgICAgIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkgJiZcbiAgICAgIHByZWRpY2F0ZShvYmplY3Rba2V5XSlcbiAgICApIHtcbiAgICAgIHJldHVybiBrZXk7XG4gICAgfVxuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGZpbmRJbmRleChhcnJheSwgcHJlZGljYXRlKSB7XG4gIGZvciAobGV0IGtleSA9IDA7IGtleSA8IGFycmF5Lmxlbmd0aDsga2V5KyspIHtcbiAgICBpZiAocHJlZGljYXRlKGFycmF5W2tleV0pKSB7XG4gICAgICByZXR1cm4ga2V5O1xuICAgIH1cbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkTWF0Y2hQYXR0ZXJuRm4oYXJncykge1xuICByZXR1cm4gKHN0cmluZywgb3B0aW9ucyA9IHt9KSA9PiB7XG4gICAgY29uc3QgbWF0Y2hSZXN1bHQgPSBzdHJpbmcubWF0Y2goYXJncy5tYXRjaFBhdHRlcm4pO1xuICAgIGlmICghbWF0Y2hSZXN1bHQpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IG1hdGNoZWRTdHJpbmcgPSBtYXRjaFJlc3VsdFswXTtcblxuICAgIGNvbnN0IHBhcnNlUmVzdWx0ID0gc3RyaW5nLm1hdGNoKGFyZ3MucGFyc2VQYXR0ZXJuKTtcbiAgICBpZiAoIXBhcnNlUmVzdWx0KSByZXR1cm4gbnVsbDtcbiAgICBsZXQgdmFsdWUgPSBhcmdzLnZhbHVlQ2FsbGJhY2tcbiAgICAgID8gYXJncy52YWx1ZUNhbGxiYWNrKHBhcnNlUmVzdWx0WzBdKVxuICAgICAgOiBwYXJzZVJlc3VsdFswXTtcblxuICAgIC8vIFtUT0RPXSBJIGNoYWxsZW5nZSB5b3UgdG8gZml4IHRoZSB0eXBlXG4gICAgdmFsdWUgPSBvcHRpb25zLnZhbHVlQ2FsbGJhY2sgPyBvcHRpb25zLnZhbHVlQ2FsbGJhY2sodmFsdWUpIDogdmFsdWU7XG5cbiAgICBjb25zdCByZXN0ID0gc3RyaW5nLnNsaWNlKG1hdGNoZWRTdHJpbmcubGVuZ3RoKTtcblxuICAgIHJldHVybiB7IHZhbHVlLCByZXN0IH07XG4gIH07XG59XG4iLCJpbXBvcnQgeyBmb3JtYXREaXN0YW5jZSB9IGZyb20gXCIuL2VuLVVTL19saWIvZm9ybWF0RGlzdGFuY2UuanNcIjtcbmltcG9ydCB7IGZvcm1hdExvbmcgfSBmcm9tIFwiLi9lbi1VUy9fbGliL2Zvcm1hdExvbmcuanNcIjtcbmltcG9ydCB7IGZvcm1hdFJlbGF0aXZlIH0gZnJvbSBcIi4vZW4tVVMvX2xpYi9mb3JtYXRSZWxhdGl2ZS5qc1wiO1xuaW1wb3J0IHsgbG9jYWxpemUgfSBmcm9tIFwiLi9lbi1VUy9fbGliL2xvY2FsaXplLmpzXCI7XG5pbXBvcnQgeyBtYXRjaCB9IGZyb20gXCIuL2VuLVVTL19saWIvbWF0Y2guanNcIjtcblxuLyoqXG4gKiBAY2F0ZWdvcnkgTG9jYWxlc1xuICogQHN1bW1hcnkgRW5nbGlzaCBsb2NhbGUgKFVuaXRlZCBTdGF0ZXMpLlxuICogQGxhbmd1YWdlIEVuZ2xpc2hcbiAqIEBpc28tNjM5LTIgZW5nXG4gKiBAYXV0aG9yIFNhc2hhIEtvc3MgW0Brb3Nzbm9jb3JwXShodHRwczovL2dpdGh1Yi5jb20va29zc25vY29ycClcbiAqIEBhdXRob3IgTGVzaGEgS29zcyBbQGxlc2hha29zc10oaHR0cHM6Ly9naXRodWIuY29tL2xlc2hha29zcylcbiAqL1xuZXhwb3J0IGNvbnN0IGVuVVMgPSB7XG4gIGNvZGU6IFwiZW4tVVNcIixcbiAgZm9ybWF0RGlzdGFuY2U6IGZvcm1hdERpc3RhbmNlLFxuICBmb3JtYXRMb25nOiBmb3JtYXRMb25nLFxuICBmb3JtYXRSZWxhdGl2ZTogZm9ybWF0UmVsYXRpdmUsXG4gIGxvY2FsaXplOiBsb2NhbGl6ZSxcbiAgbWF0Y2g6IG1hdGNoLFxuICBvcHRpb25zOiB7XG4gICAgd2Vla1N0YXJ0c09uOiAwIC8qIFN1bmRheSAqLyxcbiAgICBmaXJzdFdlZWtDb250YWluc0RhdGU6IDEsXG4gIH0sXG59O1xuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IGVuVVM7XG4iLCJjb25zdCBmb3JtYXREaXN0YW5jZUxvY2FsZSA9IHtcbiAgbGVzc1RoYW5YU2Vjb25kczoge1xuICAgIG9uZTogXCJsZXNzIHRoYW4gYSBzZWNvbmRcIixcbiAgICBvdGhlcjogXCJsZXNzIHRoYW4ge3tjb3VudH19IHNlY29uZHNcIixcbiAgfSxcblxuICB4U2Vjb25kczoge1xuICAgIG9uZTogXCIxIHNlY29uZFwiLFxuICAgIG90aGVyOiBcInt7Y291bnR9fSBzZWNvbmRzXCIsXG4gIH0sXG5cbiAgaGFsZkFNaW51dGU6IFwiaGFsZiBhIG1pbnV0ZVwiLFxuXG4gIGxlc3NUaGFuWE1pbnV0ZXM6IHtcbiAgICBvbmU6IFwibGVzcyB0aGFuIGEgbWludXRlXCIsXG4gICAgb3RoZXI6IFwibGVzcyB0aGFuIHt7Y291bnR9fSBtaW51dGVzXCIsXG4gIH0sXG5cbiAgeE1pbnV0ZXM6IHtcbiAgICBvbmU6IFwiMSBtaW51dGVcIixcbiAgICBvdGhlcjogXCJ7e2NvdW50fX0gbWludXRlc1wiLFxuICB9LFxuXG4gIGFib3V0WEhvdXJzOiB7XG4gICAgb25lOiBcImFib3V0IDEgaG91clwiLFxuICAgIG90aGVyOiBcImFib3V0IHt7Y291bnR9fSBob3Vyc1wiLFxuICB9LFxuXG4gIHhIb3Vyczoge1xuICAgIG9uZTogXCIxIGhvdXJcIixcbiAgICBvdGhlcjogXCJ7e2NvdW50fX0gaG91cnNcIixcbiAgfSxcblxuICB4RGF5czoge1xuICAgIG9uZTogXCIxIGRheVwiLFxuICAgIG90aGVyOiBcInt7Y291bnR9fSBkYXlzXCIsXG4gIH0sXG5cbiAgYWJvdXRYV2Vla3M6IHtcbiAgICBvbmU6IFwiYWJvdXQgMSB3ZWVrXCIsXG4gICAgb3RoZXI6IFwiYWJvdXQge3tjb3VudH19IHdlZWtzXCIsXG4gIH0sXG5cbiAgeFdlZWtzOiB7XG4gICAgb25lOiBcIjEgd2Vla1wiLFxuICAgIG90aGVyOiBcInt7Y291bnR9fSB3ZWVrc1wiLFxuICB9LFxuXG4gIGFib3V0WE1vbnRoczoge1xuICAgIG9uZTogXCJhYm91dCAxIG1vbnRoXCIsXG4gICAgb3RoZXI6IFwiYWJvdXQge3tjb3VudH19IG1vbnRoc1wiLFxuICB9LFxuXG4gIHhNb250aHM6IHtcbiAgICBvbmU6IFwiMSBtb250aFwiLFxuICAgIG90aGVyOiBcInt7Y291bnR9fSBtb250aHNcIixcbiAgfSxcblxuICBhYm91dFhZZWFyczoge1xuICAgIG9uZTogXCJhYm91dCAxIHllYXJcIixcbiAgICBvdGhlcjogXCJhYm91dCB7e2NvdW50fX0geWVhcnNcIixcbiAgfSxcblxuICB4WWVhcnM6IHtcbiAgICBvbmU6IFwiMSB5ZWFyXCIsXG4gICAgb3RoZXI6IFwie3tjb3VudH19IHllYXJzXCIsXG4gIH0sXG5cbiAgb3ZlclhZZWFyczoge1xuICAgIG9uZTogXCJvdmVyIDEgeWVhclwiLFxuICAgIG90aGVyOiBcIm92ZXIge3tjb3VudH19IHllYXJzXCIsXG4gIH0sXG5cbiAgYWxtb3N0WFllYXJzOiB7XG4gICAgb25lOiBcImFsbW9zdCAxIHllYXJcIixcbiAgICBvdGhlcjogXCJhbG1vc3Qge3tjb3VudH19IHllYXJzXCIsXG4gIH0sXG59O1xuXG5leHBvcnQgY29uc3QgZm9ybWF0RGlzdGFuY2UgPSAodG9rZW4sIGNvdW50LCBvcHRpb25zKSA9PiB7XG4gIGxldCByZXN1bHQ7XG5cbiAgY29uc3QgdG9rZW5WYWx1ZSA9IGZvcm1hdERpc3RhbmNlTG9jYWxlW3Rva2VuXTtcbiAgaWYgKHR5cGVvZiB0b2tlblZhbHVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgcmVzdWx0ID0gdG9rZW5WYWx1ZTtcbiAgfSBlbHNlIGlmIChjb3VudCA9PT0gMSkge1xuICAgIHJlc3VsdCA9IHRva2VuVmFsdWUub25lO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9IHRva2VuVmFsdWUub3RoZXIucmVwbGFjZShcInt7Y291bnR9fVwiLCBjb3VudC50b1N0cmluZygpKTtcbiAgfVxuXG4gIGlmIChvcHRpb25zPy5hZGRTdWZmaXgpIHtcbiAgICBpZiAob3B0aW9ucy5jb21wYXJpc29uICYmIG9wdGlvbnMuY29tcGFyaXNvbiA+IDApIHtcbiAgICAgIHJldHVybiBcImluIFwiICsgcmVzdWx0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmVzdWx0ICsgXCIgYWdvXCI7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCJpbXBvcnQgeyBidWlsZEZvcm1hdExvbmdGbiB9IGZyb20gXCIuLi8uLi9fbGliL2J1aWxkRm9ybWF0TG9uZ0ZuLmpzXCI7XG5cbmNvbnN0IGRhdGVGb3JtYXRzID0ge1xuICBmdWxsOiBcIkVFRUUsIE1NTU0gZG8sIHlcIixcbiAgbG9uZzogXCJNTU1NIGRvLCB5XCIsXG4gIG1lZGl1bTogXCJNTU0gZCwgeVwiLFxuICBzaG9ydDogXCJNTS9kZC95eXl5XCIsXG59O1xuXG5jb25zdCB0aW1lRm9ybWF0cyA9IHtcbiAgZnVsbDogXCJoOm1tOnNzIGEgenp6elwiLFxuICBsb25nOiBcImg6bW06c3MgYSB6XCIsXG4gIG1lZGl1bTogXCJoOm1tOnNzIGFcIixcbiAgc2hvcnQ6IFwiaDptbSBhXCIsXG59O1xuXG5jb25zdCBkYXRlVGltZUZvcm1hdHMgPSB7XG4gIGZ1bGw6IFwie3tkYXRlfX0gJ2F0JyB7e3RpbWV9fVwiLFxuICBsb25nOiBcInt7ZGF0ZX19ICdhdCcge3t0aW1lfX1cIixcbiAgbWVkaXVtOiBcInt7ZGF0ZX19LCB7e3RpbWV9fVwiLFxuICBzaG9ydDogXCJ7e2RhdGV9fSwge3t0aW1lfX1cIixcbn07XG5cbmV4cG9ydCBjb25zdCBmb3JtYXRMb25nID0ge1xuICBkYXRlOiBidWlsZEZvcm1hdExvbmdGbih7XG4gICAgZm9ybWF0czogZGF0ZUZvcm1hdHMsXG4gICAgZGVmYXVsdFdpZHRoOiBcImZ1bGxcIixcbiAgfSksXG5cbiAgdGltZTogYnVpbGRGb3JtYXRMb25nRm4oe1xuICAgIGZvcm1hdHM6IHRpbWVGb3JtYXRzLFxuICAgIGRlZmF1bHRXaWR0aDogXCJmdWxsXCIsXG4gIH0pLFxuXG4gIGRhdGVUaW1lOiBidWlsZEZvcm1hdExvbmdGbih7XG4gICAgZm9ybWF0czogZGF0ZVRpbWVGb3JtYXRzLFxuICAgIGRlZmF1bHRXaWR0aDogXCJmdWxsXCIsXG4gIH0pLFxufTtcbiIsImNvbnN0IGZvcm1hdFJlbGF0aXZlTG9jYWxlID0ge1xuICBsYXN0V2VlazogXCInbGFzdCcgZWVlZSAnYXQnIHBcIixcbiAgeWVzdGVyZGF5OiBcIid5ZXN0ZXJkYXkgYXQnIHBcIixcbiAgdG9kYXk6IFwiJ3RvZGF5IGF0JyBwXCIsXG4gIHRvbW9ycm93OiBcIid0b21vcnJvdyBhdCcgcFwiLFxuICBuZXh0V2VlazogXCJlZWVlICdhdCcgcFwiLFxuICBvdGhlcjogXCJQXCIsXG59O1xuXG5leHBvcnQgY29uc3QgZm9ybWF0UmVsYXRpdmUgPSAodG9rZW4sIF9kYXRlLCBfYmFzZURhdGUsIF9vcHRpb25zKSA9PlxuICBmb3JtYXRSZWxhdGl2ZUxvY2FsZVt0b2tlbl07XG4iLCJpbXBvcnQgeyBidWlsZExvY2FsaXplRm4gfSBmcm9tIFwiLi4vLi4vX2xpYi9idWlsZExvY2FsaXplRm4uanNcIjtcblxuY29uc3QgZXJhVmFsdWVzID0ge1xuICBuYXJyb3c6IFtcIkJcIiwgXCJBXCJdLFxuICBhYmJyZXZpYXRlZDogW1wiQkNcIiwgXCJBRFwiXSxcbiAgd2lkZTogW1wiQmVmb3JlIENocmlzdFwiLCBcIkFubm8gRG9taW5pXCJdLFxufTtcblxuY29uc3QgcXVhcnRlclZhbHVlcyA9IHtcbiAgbmFycm93OiBbXCIxXCIsIFwiMlwiLCBcIjNcIiwgXCI0XCJdLFxuICBhYmJyZXZpYXRlZDogW1wiUTFcIiwgXCJRMlwiLCBcIlEzXCIsIFwiUTRcIl0sXG4gIHdpZGU6IFtcIjFzdCBxdWFydGVyXCIsIFwiMm5kIHF1YXJ0ZXJcIiwgXCIzcmQgcXVhcnRlclwiLCBcIjR0aCBxdWFydGVyXCJdLFxufTtcblxuLy8gTm90ZTogaW4gRW5nbGlzaCwgdGhlIG5hbWVzIG9mIGRheXMgb2YgdGhlIHdlZWsgYW5kIG1vbnRocyBhcmUgY2FwaXRhbGl6ZWQuXG4vLyBJZiB5b3UgYXJlIG1ha2luZyBhIG5ldyBsb2NhbGUgYmFzZWQgb24gdGhpcyBvbmUsIGNoZWNrIGlmIHRoZSBzYW1lIGlzIHRydWUgZm9yIHRoZSBsYW5ndWFnZSB5b3UncmUgd29ya2luZyBvbi5cbi8vIEdlbmVyYWxseSwgZm9ybWF0dGVkIGRhdGVzIHNob3VsZCBsb29rIGxpa2UgdGhleSBhcmUgaW4gdGhlIG1pZGRsZSBvZiBhIHNlbnRlbmNlLFxuLy8gZS5nLiBpbiBTcGFuaXNoIGxhbmd1YWdlIHRoZSB3ZWVrZGF5cyBhbmQgbW9udGhzIHNob3VsZCBiZSBpbiB0aGUgbG93ZXJjYXNlLlxuY29uc3QgbW9udGhWYWx1ZXMgPSB7XG4gIG5hcnJvdzogW1wiSlwiLCBcIkZcIiwgXCJNXCIsIFwiQVwiLCBcIk1cIiwgXCJKXCIsIFwiSlwiLCBcIkFcIiwgXCJTXCIsIFwiT1wiLCBcIk5cIiwgXCJEXCJdLFxuICBhYmJyZXZpYXRlZDogW1xuICAgIFwiSmFuXCIsXG4gICAgXCJGZWJcIixcbiAgICBcIk1hclwiLFxuICAgIFwiQXByXCIsXG4gICAgXCJNYXlcIixcbiAgICBcIkp1blwiLFxuICAgIFwiSnVsXCIsXG4gICAgXCJBdWdcIixcbiAgICBcIlNlcFwiLFxuICAgIFwiT2N0XCIsXG4gICAgXCJOb3ZcIixcbiAgICBcIkRlY1wiLFxuICBdLFxuXG4gIHdpZGU6IFtcbiAgICBcIkphbnVhcnlcIixcbiAgICBcIkZlYnJ1YXJ5XCIsXG4gICAgXCJNYXJjaFwiLFxuICAgIFwiQXByaWxcIixcbiAgICBcIk1heVwiLFxuICAgIFwiSnVuZVwiLFxuICAgIFwiSnVseVwiLFxuICAgIFwiQXVndXN0XCIsXG4gICAgXCJTZXB0ZW1iZXJcIixcbiAgICBcIk9jdG9iZXJcIixcbiAgICBcIk5vdmVtYmVyXCIsXG4gICAgXCJEZWNlbWJlclwiLFxuICBdLFxufTtcblxuY29uc3QgZGF5VmFsdWVzID0ge1xuICBuYXJyb3c6IFtcIlNcIiwgXCJNXCIsIFwiVFwiLCBcIldcIiwgXCJUXCIsIFwiRlwiLCBcIlNcIl0sXG4gIHNob3J0OiBbXCJTdVwiLCBcIk1vXCIsIFwiVHVcIiwgXCJXZVwiLCBcIlRoXCIsIFwiRnJcIiwgXCJTYVwiXSxcbiAgYWJicmV2aWF0ZWQ6IFtcIlN1blwiLCBcIk1vblwiLCBcIlR1ZVwiLCBcIldlZFwiLCBcIlRodVwiLCBcIkZyaVwiLCBcIlNhdFwiXSxcbiAgd2lkZTogW1xuICAgIFwiU3VuZGF5XCIsXG4gICAgXCJNb25kYXlcIixcbiAgICBcIlR1ZXNkYXlcIixcbiAgICBcIldlZG5lc2RheVwiLFxuICAgIFwiVGh1cnNkYXlcIixcbiAgICBcIkZyaWRheVwiLFxuICAgIFwiU2F0dXJkYXlcIixcbiAgXSxcbn07XG5cbmNvbnN0IGRheVBlcmlvZFZhbHVlcyA9IHtcbiAgbmFycm93OiB7XG4gICAgYW06IFwiYVwiLFxuICAgIHBtOiBcInBcIixcbiAgICBtaWRuaWdodDogXCJtaVwiLFxuICAgIG5vb246IFwiblwiLFxuICAgIG1vcm5pbmc6IFwibW9ybmluZ1wiLFxuICAgIGFmdGVybm9vbjogXCJhZnRlcm5vb25cIixcbiAgICBldmVuaW5nOiBcImV2ZW5pbmdcIixcbiAgICBuaWdodDogXCJuaWdodFwiLFxuICB9LFxuICBhYmJyZXZpYXRlZDoge1xuICAgIGFtOiBcIkFNXCIsXG4gICAgcG06IFwiUE1cIixcbiAgICBtaWRuaWdodDogXCJtaWRuaWdodFwiLFxuICAgIG5vb246IFwibm9vblwiLFxuICAgIG1vcm5pbmc6IFwibW9ybmluZ1wiLFxuICAgIGFmdGVybm9vbjogXCJhZnRlcm5vb25cIixcbiAgICBldmVuaW5nOiBcImV2ZW5pbmdcIixcbiAgICBuaWdodDogXCJuaWdodFwiLFxuICB9LFxuICB3aWRlOiB7XG4gICAgYW06IFwiYS5tLlwiLFxuICAgIHBtOiBcInAubS5cIixcbiAgICBtaWRuaWdodDogXCJtaWRuaWdodFwiLFxuICAgIG5vb246IFwibm9vblwiLFxuICAgIG1vcm5pbmc6IFwibW9ybmluZ1wiLFxuICAgIGFmdGVybm9vbjogXCJhZnRlcm5vb25cIixcbiAgICBldmVuaW5nOiBcImV2ZW5pbmdcIixcbiAgICBuaWdodDogXCJuaWdodFwiLFxuICB9LFxufTtcblxuY29uc3QgZm9ybWF0dGluZ0RheVBlcmlvZFZhbHVlcyA9IHtcbiAgbmFycm93OiB7XG4gICAgYW06IFwiYVwiLFxuICAgIHBtOiBcInBcIixcbiAgICBtaWRuaWdodDogXCJtaVwiLFxuICAgIG5vb246IFwiblwiLFxuICAgIG1vcm5pbmc6IFwiaW4gdGhlIG1vcm5pbmdcIixcbiAgICBhZnRlcm5vb246IFwiaW4gdGhlIGFmdGVybm9vblwiLFxuICAgIGV2ZW5pbmc6IFwiaW4gdGhlIGV2ZW5pbmdcIixcbiAgICBuaWdodDogXCJhdCBuaWdodFwiLFxuICB9LFxuICBhYmJyZXZpYXRlZDoge1xuICAgIGFtOiBcIkFNXCIsXG4gICAgcG06IFwiUE1cIixcbiAgICBtaWRuaWdodDogXCJtaWRuaWdodFwiLFxuICAgIG5vb246IFwibm9vblwiLFxuICAgIG1vcm5pbmc6IFwiaW4gdGhlIG1vcm5pbmdcIixcbiAgICBhZnRlcm5vb246IFwiaW4gdGhlIGFmdGVybm9vblwiLFxuICAgIGV2ZW5pbmc6IFwiaW4gdGhlIGV2ZW5pbmdcIixcbiAgICBuaWdodDogXCJhdCBuaWdodFwiLFxuICB9LFxuICB3aWRlOiB7XG4gICAgYW06IFwiYS5tLlwiLFxuICAgIHBtOiBcInAubS5cIixcbiAgICBtaWRuaWdodDogXCJtaWRuaWdodFwiLFxuICAgIG5vb246IFwibm9vblwiLFxuICAgIG1vcm5pbmc6IFwiaW4gdGhlIG1vcm5pbmdcIixcbiAgICBhZnRlcm5vb246IFwiaW4gdGhlIGFmdGVybm9vblwiLFxuICAgIGV2ZW5pbmc6IFwiaW4gdGhlIGV2ZW5pbmdcIixcbiAgICBuaWdodDogXCJhdCBuaWdodFwiLFxuICB9LFxufTtcblxuY29uc3Qgb3JkaW5hbE51bWJlciA9IChkaXJ0eU51bWJlciwgX29wdGlvbnMpID0+IHtcbiAgY29uc3QgbnVtYmVyID0gTnVtYmVyKGRpcnR5TnVtYmVyKTtcblxuICAvLyBJZiBvcmRpbmFsIG51bWJlcnMgZGVwZW5kIG9uIGNvbnRleHQsIGZvciBleGFtcGxlLFxuICAvLyBpZiB0aGV5IGFyZSBkaWZmZXJlbnQgZm9yIGRpZmZlcmVudCBncmFtbWF0aWNhbCBnZW5kZXJzLFxuICAvLyB1c2UgYG9wdGlvbnMudW5pdGAuXG4gIC8vXG4gIC8vIGB1bml0YCBjYW4gYmUgJ3llYXInLCAncXVhcnRlcicsICdtb250aCcsICd3ZWVrJywgJ2RhdGUnLCAnZGF5T2ZZZWFyJyxcbiAgLy8gJ2RheScsICdob3VyJywgJ21pbnV0ZScsICdzZWNvbmQnLlxuXG4gIGNvbnN0IHJlbTEwMCA9IG51bWJlciAlIDEwMDtcbiAgaWYgKHJlbTEwMCA+IDIwIHx8IHJlbTEwMCA8IDEwKSB7XG4gICAgc3dpdGNoIChyZW0xMDAgJSAxMCkge1xuICAgICAgY2FzZSAxOlxuICAgICAgICByZXR1cm4gbnVtYmVyICsgXCJzdFwiO1xuICAgICAgY2FzZSAyOlxuICAgICAgICByZXR1cm4gbnVtYmVyICsgXCJuZFwiO1xuICAgICAgY2FzZSAzOlxuICAgICAgICByZXR1cm4gbnVtYmVyICsgXCJyZFwiO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVtYmVyICsgXCJ0aFwiO1xufTtcblxuZXhwb3J0IGNvbnN0IGxvY2FsaXplID0ge1xuICBvcmRpbmFsTnVtYmVyLFxuXG4gIGVyYTogYnVpbGRMb2NhbGl6ZUZuKHtcbiAgICB2YWx1ZXM6IGVyYVZhbHVlcyxcbiAgICBkZWZhdWx0V2lkdGg6IFwid2lkZVwiLFxuICB9KSxcblxuICBxdWFydGVyOiBidWlsZExvY2FsaXplRm4oe1xuICAgIHZhbHVlczogcXVhcnRlclZhbHVlcyxcbiAgICBkZWZhdWx0V2lkdGg6IFwid2lkZVwiLFxuICAgIGFyZ3VtZW50Q2FsbGJhY2s6IChxdWFydGVyKSA9PiBxdWFydGVyIC0gMSxcbiAgfSksXG5cbiAgbW9udGg6IGJ1aWxkTG9jYWxpemVGbih7XG4gICAgdmFsdWVzOiBtb250aFZhbHVlcyxcbiAgICBkZWZhdWx0V2lkdGg6IFwid2lkZVwiLFxuICB9KSxcblxuICBkYXk6IGJ1aWxkTG9jYWxpemVGbih7XG4gICAgdmFsdWVzOiBkYXlWYWx1ZXMsXG4gICAgZGVmYXVsdFdpZHRoOiBcIndpZGVcIixcbiAgfSksXG5cbiAgZGF5UGVyaW9kOiBidWlsZExvY2FsaXplRm4oe1xuICAgIHZhbHVlczogZGF5UGVyaW9kVmFsdWVzLFxuICAgIGRlZmF1bHRXaWR0aDogXCJ3aWRlXCIsXG4gICAgZm9ybWF0dGluZ1ZhbHVlczogZm9ybWF0dGluZ0RheVBlcmlvZFZhbHVlcyxcbiAgICBkZWZhdWx0Rm9ybWF0dGluZ1dpZHRoOiBcIndpZGVcIixcbiAgfSksXG59O1xuIiwiaW1wb3J0IHsgYnVpbGRNYXRjaEZuIH0gZnJvbSBcIi4uLy4uL19saWIvYnVpbGRNYXRjaEZuLmpzXCI7XG5pbXBvcnQgeyBidWlsZE1hdGNoUGF0dGVybkZuIH0gZnJvbSBcIi4uLy4uL19saWIvYnVpbGRNYXRjaFBhdHRlcm5Gbi5qc1wiO1xuXG5jb25zdCBtYXRjaE9yZGluYWxOdW1iZXJQYXR0ZXJuID0gL14oXFxkKykodGh8c3R8bmR8cmQpPy9pO1xuY29uc3QgcGFyc2VPcmRpbmFsTnVtYmVyUGF0dGVybiA9IC9cXGQrL2k7XG5cbmNvbnN0IG1hdGNoRXJhUGF0dGVybnMgPSB7XG4gIG5hcnJvdzogL14oYnxhKS9pLFxuICBhYmJyZXZpYXRlZDogL14oYlxcLj9cXHM/Y1xcLj98YlxcLj9cXHM/Y1xcLj9cXHM/ZVxcLj98YVxcLj9cXHM/ZFxcLj98Y1xcLj9cXHM/ZVxcLj8pL2ksXG4gIHdpZGU6IC9eKGJlZm9yZSBjaHJpc3R8YmVmb3JlIGNvbW1vbiBlcmF8YW5ubyBkb21pbml8Y29tbW9uIGVyYSkvaSxcbn07XG5jb25zdCBwYXJzZUVyYVBhdHRlcm5zID0ge1xuICBhbnk6IFsvXmIvaSwgL14oYXxjKS9pXSxcbn07XG5cbmNvbnN0IG1hdGNoUXVhcnRlclBhdHRlcm5zID0ge1xuICBuYXJyb3c6IC9eWzEyMzRdL2ksXG4gIGFiYnJldmlhdGVkOiAvXnFbMTIzNF0vaSxcbiAgd2lkZTogL15bMTIzNF0odGh8c3R8bmR8cmQpPyBxdWFydGVyL2ksXG59O1xuY29uc3QgcGFyc2VRdWFydGVyUGF0dGVybnMgPSB7XG4gIGFueTogWy8xL2ksIC8yL2ksIC8zL2ksIC80L2ldLFxufTtcblxuY29uc3QgbWF0Y2hNb250aFBhdHRlcm5zID0ge1xuICBuYXJyb3c6IC9eW2pmbWFzb25kXS9pLFxuICBhYmJyZXZpYXRlZDogL14oamFufGZlYnxtYXJ8YXByfG1heXxqdW58anVsfGF1Z3xzZXB8b2N0fG5vdnxkZWMpL2ksXG4gIHdpZGU6IC9eKGphbnVhcnl8ZmVicnVhcnl8bWFyY2h8YXByaWx8bWF5fGp1bmV8anVseXxhdWd1c3R8c2VwdGVtYmVyfG9jdG9iZXJ8bm92ZW1iZXJ8ZGVjZW1iZXIpL2ksXG59O1xuY29uc3QgcGFyc2VNb250aFBhdHRlcm5zID0ge1xuICBuYXJyb3c6IFtcbiAgICAvXmovaSxcbiAgICAvXmYvaSxcbiAgICAvXm0vaSxcbiAgICAvXmEvaSxcbiAgICAvXm0vaSxcbiAgICAvXmovaSxcbiAgICAvXmovaSxcbiAgICAvXmEvaSxcbiAgICAvXnMvaSxcbiAgICAvXm8vaSxcbiAgICAvXm4vaSxcbiAgICAvXmQvaSxcbiAgXSxcblxuICBhbnk6IFtcbiAgICAvXmphL2ksXG4gICAgL15mL2ksXG4gICAgL15tYXIvaSxcbiAgICAvXmFwL2ksXG4gICAgL15tYXkvaSxcbiAgICAvXmp1bi9pLFxuICAgIC9eanVsL2ksXG4gICAgL15hdS9pLFxuICAgIC9ecy9pLFxuICAgIC9eby9pLFxuICAgIC9ebi9pLFxuICAgIC9eZC9pLFxuICBdLFxufTtcblxuY29uc3QgbWF0Y2hEYXlQYXR0ZXJucyA9IHtcbiAgbmFycm93OiAvXltzbXR3Zl0vaSxcbiAgc2hvcnQ6IC9eKHN1fG1vfHR1fHdlfHRofGZyfHNhKS9pLFxuICBhYmJyZXZpYXRlZDogL14oc3VufG1vbnx0dWV8d2VkfHRodXxmcml8c2F0KS9pLFxuICB3aWRlOiAvXihzdW5kYXl8bW9uZGF5fHR1ZXNkYXl8d2VkbmVzZGF5fHRodXJzZGF5fGZyaWRheXxzYXR1cmRheSkvaSxcbn07XG5jb25zdCBwYXJzZURheVBhdHRlcm5zID0ge1xuICBuYXJyb3c6IFsvXnMvaSwgL15tL2ksIC9edC9pLCAvXncvaSwgL150L2ksIC9eZi9pLCAvXnMvaV0sXG4gIGFueTogWy9ec3UvaSwgL15tL2ksIC9edHUvaSwgL153L2ksIC9edGgvaSwgL15mL2ksIC9ec2EvaV0sXG59O1xuXG5jb25zdCBtYXRjaERheVBlcmlvZFBhdHRlcm5zID0ge1xuICBuYXJyb3c6IC9eKGF8cHxtaXxufChpbiB0aGV8YXQpIChtb3JuaW5nfGFmdGVybm9vbnxldmVuaW5nfG5pZ2h0KSkvaSxcbiAgYW55OiAvXihbYXBdXFwuP1xccz9tXFwuP3xtaWRuaWdodHxub29ufChpbiB0aGV8YXQpIChtb3JuaW5nfGFmdGVybm9vbnxldmVuaW5nfG5pZ2h0KSkvaSxcbn07XG5jb25zdCBwYXJzZURheVBlcmlvZFBhdHRlcm5zID0ge1xuICBhbnk6IHtcbiAgICBhbTogL15hL2ksXG4gICAgcG06IC9ecC9pLFxuICAgIG1pZG5pZ2h0OiAvXm1pL2ksXG4gICAgbm9vbjogL15uby9pLFxuICAgIG1vcm5pbmc6IC9tb3JuaW5nL2ksXG4gICAgYWZ0ZXJub29uOiAvYWZ0ZXJub29uL2ksXG4gICAgZXZlbmluZzogL2V2ZW5pbmcvaSxcbiAgICBuaWdodDogL25pZ2h0L2ksXG4gIH0sXG59O1xuXG5leHBvcnQgY29uc3QgbWF0Y2ggPSB7XG4gIG9yZGluYWxOdW1iZXI6IGJ1aWxkTWF0Y2hQYXR0ZXJuRm4oe1xuICAgIG1hdGNoUGF0dGVybjogbWF0Y2hPcmRpbmFsTnVtYmVyUGF0dGVybixcbiAgICBwYXJzZVBhdHRlcm46IHBhcnNlT3JkaW5hbE51bWJlclBhdHRlcm4sXG4gICAgdmFsdWVDYWxsYmFjazogKHZhbHVlKSA9PiBwYXJzZUludCh2YWx1ZSwgMTApLFxuICB9KSxcblxuICBlcmE6IGJ1aWxkTWF0Y2hGbih7XG4gICAgbWF0Y2hQYXR0ZXJuczogbWF0Y2hFcmFQYXR0ZXJucyxcbiAgICBkZWZhdWx0TWF0Y2hXaWR0aDogXCJ3aWRlXCIsXG4gICAgcGFyc2VQYXR0ZXJuczogcGFyc2VFcmFQYXR0ZXJucyxcbiAgICBkZWZhdWx0UGFyc2VXaWR0aDogXCJhbnlcIixcbiAgfSksXG5cbiAgcXVhcnRlcjogYnVpbGRNYXRjaEZuKHtcbiAgICBtYXRjaFBhdHRlcm5zOiBtYXRjaFF1YXJ0ZXJQYXR0ZXJucyxcbiAgICBkZWZhdWx0TWF0Y2hXaWR0aDogXCJ3aWRlXCIsXG4gICAgcGFyc2VQYXR0ZXJuczogcGFyc2VRdWFydGVyUGF0dGVybnMsXG4gICAgZGVmYXVsdFBhcnNlV2lkdGg6IFwiYW55XCIsXG4gICAgdmFsdWVDYWxsYmFjazogKGluZGV4KSA9PiBpbmRleCArIDEsXG4gIH0pLFxuXG4gIG1vbnRoOiBidWlsZE1hdGNoRm4oe1xuICAgIG1hdGNoUGF0dGVybnM6IG1hdGNoTW9udGhQYXR0ZXJucyxcbiAgICBkZWZhdWx0TWF0Y2hXaWR0aDogXCJ3aWRlXCIsXG4gICAgcGFyc2VQYXR0ZXJuczogcGFyc2VNb250aFBhdHRlcm5zLFxuICAgIGRlZmF1bHRQYXJzZVdpZHRoOiBcImFueVwiLFxuICB9KSxcblxuICBkYXk6IGJ1aWxkTWF0Y2hGbih7XG4gICAgbWF0Y2hQYXR0ZXJuczogbWF0Y2hEYXlQYXR0ZXJucyxcbiAgICBkZWZhdWx0TWF0Y2hXaWR0aDogXCJ3aWRlXCIsXG4gICAgcGFyc2VQYXR0ZXJuczogcGFyc2VEYXlQYXR0ZXJucyxcbiAgICBkZWZhdWx0UGFyc2VXaWR0aDogXCJhbnlcIixcbiAgfSksXG5cbiAgZGF5UGVyaW9kOiBidWlsZE1hdGNoRm4oe1xuICAgIG1hdGNoUGF0dGVybnM6IG1hdGNoRGF5UGVyaW9kUGF0dGVybnMsXG4gICAgZGVmYXVsdE1hdGNoV2lkdGg6IFwiYW55XCIsXG4gICAgcGFyc2VQYXR0ZXJuczogcGFyc2VEYXlQZXJpb2RQYXR0ZXJucyxcbiAgICBkZWZhdWx0UGFyc2VXaWR0aDogXCJhbnlcIixcbiAgfSksXG59O1xuIiwiaW1wb3J0IHsgZm9ybWF0RGlzdGFuY2UgfSBmcm9tIFwiLi9ydS9fbGliL2Zvcm1hdERpc3RhbmNlLmpzXCI7XG5pbXBvcnQgeyBmb3JtYXRMb25nIH0gZnJvbSBcIi4vcnUvX2xpYi9mb3JtYXRMb25nLmpzXCI7XG5pbXBvcnQgeyBmb3JtYXRSZWxhdGl2ZSB9IGZyb20gXCIuL3J1L19saWIvZm9ybWF0UmVsYXRpdmUuanNcIjtcbmltcG9ydCB7IGxvY2FsaXplIH0gZnJvbSBcIi4vcnUvX2xpYi9sb2NhbGl6ZS5qc1wiO1xuaW1wb3J0IHsgbWF0Y2ggfSBmcm9tIFwiLi9ydS9fbGliL21hdGNoLmpzXCI7XG5cbi8qKlxuICogQGNhdGVnb3J5IExvY2FsZXNcbiAqIEBzdW1tYXJ5IFJ1c3NpYW4gbG9jYWxlLlxuICogQGxhbmd1YWdlIFJ1c3NpYW5cbiAqIEBpc28tNjM5LTIgcnVzXG4gKiBAYXV0aG9yIFNhc2hhIEtvc3MgW0Brb3Nzbm9jb3JwXShodHRwczovL2dpdGh1Yi5jb20va29zc25vY29ycClcbiAqIEBhdXRob3IgTGVzaGEgS29zcyBbQGxlc2hha29zc10oaHR0cHM6Ly9naXRodWIuY29tL2xlc2hha29zcylcbiAqL1xuZXhwb3J0IGNvbnN0IHJ1ID0ge1xuICBjb2RlOiBcInJ1XCIsXG4gIGZvcm1hdERpc3RhbmNlOiBmb3JtYXREaXN0YW5jZSxcbiAgZm9ybWF0TG9uZzogZm9ybWF0TG9uZyxcbiAgZm9ybWF0UmVsYXRpdmU6IGZvcm1hdFJlbGF0aXZlLFxuICBsb2NhbGl6ZTogbG9jYWxpemUsXG4gIG1hdGNoOiBtYXRjaCxcbiAgb3B0aW9uczoge1xuICAgIHdlZWtTdGFydHNPbjogMSAvKiBNb25kYXkgKi8sXG4gICAgZmlyc3RXZWVrQ29udGFpbnNEYXRlOiAxLFxuICB9LFxufTtcblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBydTtcbiIsImZ1bmN0aW9uIGRlY2xlbnNpb24oc2NoZW1lLCBjb3VudCkge1xuICAvLyBzY2hlbWUgZm9yIGNvdW50PTEgZXhpc3RzXG4gIGlmIChzY2hlbWUub25lICE9PSB1bmRlZmluZWQgJiYgY291bnQgPT09IDEpIHtcbiAgICByZXR1cm4gc2NoZW1lLm9uZTtcbiAgfVxuXG4gIGNvbnN0IHJlbTEwID0gY291bnQgJSAxMDtcbiAgY29uc3QgcmVtMTAwID0gY291bnQgJSAxMDA7XG5cbiAgLy8gMSwgMjEsIDMxLCAuLi5cbiAgaWYgKHJlbTEwID09PSAxICYmIHJlbTEwMCAhPT0gMTEpIHtcbiAgICByZXR1cm4gc2NoZW1lLnNpbmd1bGFyTm9taW5hdGl2ZS5yZXBsYWNlKFwie3tjb3VudH19XCIsIFN0cmluZyhjb3VudCkpO1xuXG4gICAgLy8gMiwgMywgNCwgMjIsIDIzLCAyNCwgMzIgLi4uXG4gIH0gZWxzZSBpZiAocmVtMTAgPj0gMiAmJiByZW0xMCA8PSA0ICYmIChyZW0xMDAgPCAxMCB8fCByZW0xMDAgPiAyMCkpIHtcbiAgICByZXR1cm4gc2NoZW1lLnNpbmd1bGFyR2VuaXRpdmUucmVwbGFjZShcInt7Y291bnR9fVwiLCBTdHJpbmcoY291bnQpKTtcblxuICAgIC8vIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgLi4uXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHNjaGVtZS5wbHVyYWxHZW5pdGl2ZS5yZXBsYWNlKFwie3tjb3VudH19XCIsIFN0cmluZyhjb3VudCkpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGJ1aWxkTG9jYWxpemVUb2tlbkZuKHNjaGVtZSkge1xuICByZXR1cm4gKGNvdW50LCBvcHRpb25zKSA9PiB7XG4gICAgaWYgKG9wdGlvbnM/LmFkZFN1ZmZpeCkge1xuICAgICAgaWYgKG9wdGlvbnMuY29tcGFyaXNvbiAmJiBvcHRpb25zLmNvbXBhcmlzb24gPiAwKSB7XG4gICAgICAgIGlmIChzY2hlbWUuZnV0dXJlKSB7XG4gICAgICAgICAgcmV0dXJuIGRlY2xlbnNpb24oc2NoZW1lLmZ1dHVyZSwgY291bnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBcItGH0LXRgNC10LcgXCIgKyBkZWNsZW5zaW9uKHNjaGVtZS5yZWd1bGFyLCBjb3VudCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChzY2hlbWUucGFzdCkge1xuICAgICAgICAgIHJldHVybiBkZWNsZW5zaW9uKHNjaGVtZS5wYXN0LCBjb3VudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGRlY2xlbnNpb24oc2NoZW1lLnJlZ3VsYXIsIGNvdW50KSArIFwiINC90LDQt9Cw0LRcIjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZGVjbGVuc2lvbihzY2hlbWUucmVndWxhciwgY291bnQpO1xuICAgIH1cbiAgfTtcbn1cblxuY29uc3QgZm9ybWF0RGlzdGFuY2VMb2NhbGUgPSB7XG4gIGxlc3NUaGFuWFNlY29uZHM6IGJ1aWxkTG9jYWxpemVUb2tlbkZuKHtcbiAgICByZWd1bGFyOiB7XG4gICAgICBvbmU6IFwi0LzQtdC90YzRiNC1INGB0LXQutGD0L3QtNGLXCIsXG4gICAgICBzaW5ndWxhck5vbWluYXRpdmU6IFwi0LzQtdC90YzRiNC1IHt7Y291bnR9fSDRgdC10LrRg9C90LTRi1wiLFxuICAgICAgc2luZ3VsYXJHZW5pdGl2ZTogXCLQvNC10L3RjNGI0LUge3tjb3VudH19INGB0LXQutGD0L3QtFwiLFxuICAgICAgcGx1cmFsR2VuaXRpdmU6IFwi0LzQtdC90YzRiNC1IHt7Y291bnR9fSDRgdC10LrRg9C90LRcIixcbiAgICB9LFxuICAgIGZ1dHVyZToge1xuICAgICAgb25lOiBcItC80LXQvdGM0YjQtSwg0YfQtdC8INGH0LXRgNC10Lcg0YHQtdC60YPQvdC00YNcIixcbiAgICAgIHNpbmd1bGFyTm9taW5hdGl2ZTogXCLQvNC10L3RjNGI0LUsINGH0LXQvCDRh9C10YDQtdC3IHt7Y291bnR9fSDRgdC10LrRg9C90LTRg1wiLFxuICAgICAgc2luZ3VsYXJHZW5pdGl2ZTogXCLQvNC10L3RjNGI0LUsINGH0LXQvCDRh9C10YDQtdC3IHt7Y291bnR9fSDRgdC10LrRg9C90LTRi1wiLFxuICAgICAgcGx1cmFsR2VuaXRpdmU6IFwi0LzQtdC90YzRiNC1LCDRh9C10Lwg0YfQtdGA0LXQtyB7e2NvdW50fX0g0YHQtdC60YPQvdC0XCIsXG4gICAgfSxcbiAgfSksXG5cbiAgeFNlY29uZHM6IGJ1aWxkTG9jYWxpemVUb2tlbkZuKHtcbiAgICByZWd1bGFyOiB7XG4gICAgICBzaW5ndWxhck5vbWluYXRpdmU6IFwie3tjb3VudH19INGB0LXQutGD0L3QtNCwXCIsXG4gICAgICBzaW5ndWxhckdlbml0aXZlOiBcInt7Y291bnR9fSDRgdC10LrRg9C90LTRi1wiLFxuICAgICAgcGx1cmFsR2VuaXRpdmU6IFwie3tjb3VudH19INGB0LXQutGD0L3QtFwiLFxuICAgIH0sXG4gICAgcGFzdDoge1xuICAgICAgc2luZ3VsYXJOb21pbmF0aXZlOiBcInt7Y291bnR9fSDRgdC10LrRg9C90LTRgyDQvdCw0LfQsNC0XCIsXG4gICAgICBzaW5ndWxhckdlbml0aXZlOiBcInt7Y291bnR9fSDRgdC10LrRg9C90LTRiyDQvdCw0LfQsNC0XCIsXG4gICAgICBwbHVyYWxHZW5pdGl2ZTogXCJ7e2NvdW50fX0g0YHQtdC60YPQvdC0INC90LDQt9Cw0LRcIixcbiAgICB9LFxuICAgIGZ1dHVyZToge1xuICAgICAgc2luZ3VsYXJOb21pbmF0aXZlOiBcItGH0LXRgNC10Lcge3tjb3VudH19INGB0LXQutGD0L3QtNGDXCIsXG4gICAgICBzaW5ndWxhckdlbml0aXZlOiBcItGH0LXRgNC10Lcge3tjb3VudH19INGB0LXQutGD0L3QtNGLXCIsXG4gICAgICBwbHVyYWxHZW5pdGl2ZTogXCLRh9C10YDQtdC3IHt7Y291bnR9fSDRgdC10LrRg9C90LRcIixcbiAgICB9LFxuICB9KSxcblxuICBoYWxmQU1pbnV0ZTogKF9jb3VudCwgb3B0aW9ucykgPT4ge1xuICAgIGlmIChvcHRpb25zPy5hZGRTdWZmaXgpIHtcbiAgICAgIGlmIChvcHRpb25zLmNvbXBhcmlzb24gJiYgb3B0aW9ucy5jb21wYXJpc29uID4gMCkge1xuICAgICAgICByZXR1cm4gXCLRh9C10YDQtdC3INC/0L7Qu9C80LjQvdGD0YLRi1wiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFwi0L/QvtC70LzQuNC90YPRgtGLINC90LDQt9Cw0LRcIjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gXCLQv9C+0LvQvNC40L3Rg9GC0YtcIjtcbiAgfSxcblxuICBsZXNzVGhhblhNaW51dGVzOiBidWlsZExvY2FsaXplVG9rZW5Gbih7XG4gICAgcmVndWxhcjoge1xuICAgICAgb25lOiBcItC80LXQvdGM0YjQtSDQvNC40L3Rg9GC0YtcIixcbiAgICAgIHNpbmd1bGFyTm9taW5hdGl2ZTogXCLQvNC10L3RjNGI0LUge3tjb3VudH19INC80LjQvdGD0YLRi1wiLFxuICAgICAgc2luZ3VsYXJHZW5pdGl2ZTogXCLQvNC10L3RjNGI0LUge3tjb3VudH19INC80LjQvdGD0YJcIixcbiAgICAgIHBsdXJhbEdlbml0aXZlOiBcItC80LXQvdGM0YjQtSB7e2NvdW50fX0g0LzQuNC90YPRglwiLFxuICAgIH0sXG4gICAgZnV0dXJlOiB7XG4gICAgICBvbmU6IFwi0LzQtdC90YzRiNC1LCDRh9C10Lwg0YfQtdGA0LXQtyDQvNC40L3Rg9GC0YNcIixcbiAgICAgIHNpbmd1bGFyTm9taW5hdGl2ZTogXCLQvNC10L3RjNGI0LUsINGH0LXQvCDRh9C10YDQtdC3IHt7Y291bnR9fSDQvNC40L3Rg9GC0YNcIixcbiAgICAgIHNpbmd1bGFyR2VuaXRpdmU6IFwi0LzQtdC90YzRiNC1LCDRh9C10Lwg0YfQtdGA0LXQtyB7e2NvdW50fX0g0LzQuNC90YPRgtGLXCIsXG4gICAgICBwbHVyYWxHZW5pdGl2ZTogXCLQvNC10L3RjNGI0LUsINGH0LXQvCDRh9C10YDQtdC3IHt7Y291bnR9fSDQvNC40L3Rg9GCXCIsXG4gICAgfSxcbiAgfSksXG5cbiAgeE1pbnV0ZXM6IGJ1aWxkTG9jYWxpemVUb2tlbkZuKHtcbiAgICByZWd1bGFyOiB7XG4gICAgICBzaW5ndWxhck5vbWluYXRpdmU6IFwie3tjb3VudH19INC80LjQvdGD0YLQsFwiLFxuICAgICAgc2luZ3VsYXJHZW5pdGl2ZTogXCJ7e2NvdW50fX0g0LzQuNC90YPRgtGLXCIsXG4gICAgICBwbHVyYWxHZW5pdGl2ZTogXCJ7e2NvdW50fX0g0LzQuNC90YPRglwiLFxuICAgIH0sXG4gICAgcGFzdDoge1xuICAgICAgc2luZ3VsYXJOb21pbmF0aXZlOiBcInt7Y291bnR9fSDQvNC40L3Rg9GC0YMg0L3QsNC30LDQtFwiLFxuICAgICAgc2luZ3VsYXJHZW5pdGl2ZTogXCJ7e2NvdW50fX0g0LzQuNC90YPRgtGLINC90LDQt9Cw0LRcIixcbiAgICAgIHBsdXJhbEdlbml0aXZlOiBcInt7Y291bnR9fSDQvNC40L3Rg9GCINC90LDQt9Cw0LRcIixcbiAgICB9LFxuICAgIGZ1dHVyZToge1xuICAgICAgc2luZ3VsYXJOb21pbmF0aXZlOiBcItGH0LXRgNC10Lcge3tjb3VudH19INC80LjQvdGD0YLRg1wiLFxuICAgICAgc2luZ3VsYXJHZW5pdGl2ZTogXCLRh9C10YDQtdC3IHt7Y291bnR9fSDQvNC40L3Rg9GC0YtcIixcbiAgICAgIHBsdXJhbEdlbml0aXZlOiBcItGH0LXRgNC10Lcge3tjb3VudH19INC80LjQvdGD0YJcIixcbiAgICB9LFxuICB9KSxcblxuICBhYm91dFhIb3VyczogYnVpbGRMb2NhbGl6ZVRva2VuRm4oe1xuICAgIHJlZ3VsYXI6IHtcbiAgICAgIHNpbmd1bGFyTm9taW5hdGl2ZTogXCLQvtC60L7Qu9C+IHt7Y291bnR9fSDRh9Cw0YHQsFwiLFxuICAgICAgc2luZ3VsYXJHZW5pdGl2ZTogXCLQvtC60L7Qu9C+IHt7Y291bnR9fSDRh9Cw0YHQvtCyXCIsXG4gICAgICBwbHVyYWxHZW5pdGl2ZTogXCLQvtC60L7Qu9C+IHt7Y291bnR9fSDRh9Cw0YHQvtCyXCIsXG4gICAgfSxcbiAgICBmdXR1cmU6IHtcbiAgICAgIHNpbmd1bGFyTm9taW5hdGl2ZTogXCLQv9GA0LjQsdC70LjQt9C40YLQtdC70YzQvdC+INGH0LXRgNC10Lcge3tjb3VudH19INGH0LDRgVwiLFxuICAgICAgc2luZ3VsYXJHZW5pdGl2ZTogXCLQv9GA0LjQsdC70LjQt9C40YLQtdC70YzQvdC+INGH0LXRgNC10Lcge3tjb3VudH19INGH0LDRgdCwXCIsXG4gICAgICBwbHVyYWxHZW5pdGl2ZTogXCLQv9GA0LjQsdC70LjQt9C40YLQtdC70YzQvdC+INGH0LXRgNC10Lcge3tjb3VudH19INGH0LDRgdC+0LJcIixcbiAgICB9LFxuICB9KSxcblxuICB4SG91cnM6IGJ1aWxkTG9jYWxpemVUb2tlbkZuKHtcbiAgICByZWd1bGFyOiB7XG4gICAgICBzaW5ndWxhck5vbWluYXRpdmU6IFwie3tjb3VudH19INGH0LDRgVwiLFxuICAgICAgc2luZ3VsYXJHZW5pdGl2ZTogXCJ7e2NvdW50fX0g0YfQsNGB0LBcIixcbiAgICAgIHBsdXJhbEdlbml0aXZlOiBcInt7Y291bnR9fSDRh9Cw0YHQvtCyXCIsXG4gICAgfSxcbiAgfSksXG5cbiAgeERheXM6IGJ1aWxkTG9jYWxpemVUb2tlbkZuKHtcbiAgICByZWd1bGFyOiB7XG4gICAgICBzaW5ndWxhck5vbWluYXRpdmU6IFwie3tjb3VudH19INC00LXQvdGMXCIsXG4gICAgICBzaW5ndWxhckdlbml0aXZlOiBcInt7Y291bnR9fSDQtNC90Y9cIixcbiAgICAgIHBsdXJhbEdlbml0aXZlOiBcInt7Y291bnR9fSDQtNC90LXQuVwiLFxuICAgIH0sXG4gIH0pLFxuXG4gIGFib3V0WFdlZWtzOiBidWlsZExvY2FsaXplVG9rZW5Gbih7XG4gICAgcmVndWxhcjoge1xuICAgICAgc2luZ3VsYXJOb21pbmF0aXZlOiBcItC+0LrQvtC70L4ge3tjb3VudH19INC90LXQtNC10LvQuFwiLFxuICAgICAgc2luZ3VsYXJHZW5pdGl2ZTogXCLQvtC60L7Qu9C+IHt7Y291bnR9fSDQvdC10LTQtdC70YxcIixcbiAgICAgIHBsdXJhbEdlbml0aXZlOiBcItC+0LrQvtC70L4ge3tjb3VudH19INC90LXQtNC10LvRjFwiLFxuICAgIH0sXG4gICAgZnV0dXJlOiB7XG4gICAgICBzaW5ndWxhck5vbWluYXRpdmU6IFwi0L/RgNC40LHQu9C40LfQuNGC0LXQu9GM0L3QviDRh9C10YDQtdC3IHt7Y291bnR9fSDQvdC10LTQtdC70Y5cIixcbiAgICAgIHNpbmd1bGFyR2VuaXRpdmU6IFwi0L/RgNC40LHQu9C40LfQuNGC0LXQu9GM0L3QviDRh9C10YDQtdC3IHt7Y291bnR9fSDQvdC10LTQtdC70LhcIixcbiAgICAgIHBsdXJhbEdlbml0aXZlOiBcItC/0YDQuNCx0LvQuNC30LjRgtC10LvRjNC90L4g0YfQtdGA0LXQtyB7e2NvdW50fX0g0L3QtdC00LXQu9GMXCIsXG4gICAgfSxcbiAgfSksXG5cbiAgeFdlZWtzOiBidWlsZExvY2FsaXplVG9rZW5Gbih7XG4gICAgcmVndWxhcjoge1xuICAgICAgc2luZ3VsYXJOb21pbmF0aXZlOiBcInt7Y291bnR9fSDQvdC10LTQtdC70Y9cIixcbiAgICAgIHNpbmd1bGFyR2VuaXRpdmU6IFwie3tjb3VudH19INC90LXQtNC10LvQuFwiLFxuICAgICAgcGx1cmFsR2VuaXRpdmU6IFwie3tjb3VudH19INC90LXQtNC10LvRjFwiLFxuICAgIH0sXG4gIH0pLFxuXG4gIGFib3V0WE1vbnRoczogYnVpbGRMb2NhbGl6ZVRva2VuRm4oe1xuICAgIHJlZ3VsYXI6IHtcbiAgICAgIHNpbmd1bGFyTm9taW5hdGl2ZTogXCLQvtC60L7Qu9C+IHt7Y291bnR9fSDQvNC10YHRj9GG0LBcIixcbiAgICAgIHNpbmd1bGFyR2VuaXRpdmU6IFwi0L7QutC+0LvQviB7e2NvdW50fX0g0LzQtdGB0Y/RhtC10LJcIixcbiAgICAgIHBsdXJhbEdlbml0aXZlOiBcItC+0LrQvtC70L4ge3tjb3VudH19INC80LXRgdGP0YbQtdCyXCIsXG4gICAgfSxcbiAgICBmdXR1cmU6IHtcbiAgICAgIHNpbmd1bGFyTm9taW5hdGl2ZTogXCLQv9GA0LjQsdC70LjQt9C40YLQtdC70YzQvdC+INGH0LXRgNC10Lcge3tjb3VudH19INC80LXRgdGP0YZcIixcbiAgICAgIHNpbmd1bGFyR2VuaXRpdmU6IFwi0L/RgNC40LHQu9C40LfQuNGC0LXQu9GM0L3QviDRh9C10YDQtdC3IHt7Y291bnR9fSDQvNC10YHRj9GG0LBcIixcbiAgICAgIHBsdXJhbEdlbml0aXZlOiBcItC/0YDQuNCx0LvQuNC30LjRgtC10LvRjNC90L4g0YfQtdGA0LXQtyB7e2NvdW50fX0g0LzQtdGB0Y/RhtC10LJcIixcbiAgICB9LFxuICB9KSxcblxuICB4TW9udGhzOiBidWlsZExvY2FsaXplVG9rZW5Gbih7XG4gICAgcmVndWxhcjoge1xuICAgICAgc2luZ3VsYXJOb21pbmF0aXZlOiBcInt7Y291bnR9fSDQvNC10YHRj9GGXCIsXG4gICAgICBzaW5ndWxhckdlbml0aXZlOiBcInt7Y291bnR9fSDQvNC10YHRj9GG0LBcIixcbiAgICAgIHBsdXJhbEdlbml0aXZlOiBcInt7Y291bnR9fSDQvNC10YHRj9GG0LXQslwiLFxuICAgIH0sXG4gIH0pLFxuXG4gIGFib3V0WFllYXJzOiBidWlsZExvY2FsaXplVG9rZW5Gbih7XG4gICAgcmVndWxhcjoge1xuICAgICAgc2luZ3VsYXJOb21pbmF0aXZlOiBcItC+0LrQvtC70L4ge3tjb3VudH19INCz0L7QtNCwXCIsXG4gICAgICBzaW5ndWxhckdlbml0aXZlOiBcItC+0LrQvtC70L4ge3tjb3VudH19INC70LXRglwiLFxuICAgICAgcGx1cmFsR2VuaXRpdmU6IFwi0L7QutC+0LvQviB7e2NvdW50fX0g0LvQtdGCXCIsXG4gICAgfSxcbiAgICBmdXR1cmU6IHtcbiAgICAgIHNpbmd1bGFyTm9taW5hdGl2ZTogXCLQv9GA0LjQsdC70LjQt9C40YLQtdC70YzQvdC+INGH0LXRgNC10Lcge3tjb3VudH19INCz0L7QtFwiLFxuICAgICAgc2luZ3VsYXJHZW5pdGl2ZTogXCLQv9GA0LjQsdC70LjQt9C40YLQtdC70YzQvdC+INGH0LXRgNC10Lcge3tjb3VudH19INCz0L7QtNCwXCIsXG4gICAgICBwbHVyYWxHZW5pdGl2ZTogXCLQv9GA0LjQsdC70LjQt9C40YLQtdC70YzQvdC+INGH0LXRgNC10Lcge3tjb3VudH19INC70LXRglwiLFxuICAgIH0sXG4gIH0pLFxuXG4gIHhZZWFyczogYnVpbGRMb2NhbGl6ZVRva2VuRm4oe1xuICAgIHJlZ3VsYXI6IHtcbiAgICAgIHNpbmd1bGFyTm9taW5hdGl2ZTogXCJ7e2NvdW50fX0g0LPQvtC0XCIsXG4gICAgICBzaW5ndWxhckdlbml0aXZlOiBcInt7Y291bnR9fSDQs9C+0LTQsFwiLFxuICAgICAgcGx1cmFsR2VuaXRpdmU6IFwie3tjb3VudH19INC70LXRglwiLFxuICAgIH0sXG4gIH0pLFxuXG4gIG92ZXJYWWVhcnM6IGJ1aWxkTG9jYWxpemVUb2tlbkZuKHtcbiAgICByZWd1bGFyOiB7XG4gICAgICBzaW5ndWxhck5vbWluYXRpdmU6IFwi0LHQvtC70YzRiNC1IHt7Y291bnR9fSDQs9C+0LTQsFwiLFxuICAgICAgc2luZ3VsYXJHZW5pdGl2ZTogXCLQsdC+0LvRjNGI0LUge3tjb3VudH19INC70LXRglwiLFxuICAgICAgcGx1cmFsR2VuaXRpdmU6IFwi0LHQvtC70YzRiNC1IHt7Y291bnR9fSDQu9C10YJcIixcbiAgICB9LFxuICAgIGZ1dHVyZToge1xuICAgICAgc2luZ3VsYXJOb21pbmF0aXZlOiBcItCx0L7Qu9GM0YjQtSwg0YfQtdC8INGH0LXRgNC10Lcge3tjb3VudH19INCz0L7QtFwiLFxuICAgICAgc2luZ3VsYXJHZW5pdGl2ZTogXCLQsdC+0LvRjNGI0LUsINGH0LXQvCDRh9C10YDQtdC3IHt7Y291bnR9fSDQs9C+0LTQsFwiLFxuICAgICAgcGx1cmFsR2VuaXRpdmU6IFwi0LHQvtC70YzRiNC1LCDRh9C10Lwg0YfQtdGA0LXQtyB7e2NvdW50fX0g0LvQtdGCXCIsXG4gICAgfSxcbiAgfSksXG5cbiAgYWxtb3N0WFllYXJzOiBidWlsZExvY2FsaXplVG9rZW5Gbih7XG4gICAgcmVndWxhcjoge1xuICAgICAgc2luZ3VsYXJOb21pbmF0aXZlOiBcItC/0L7Rh9GC0Lgge3tjb3VudH19INCz0L7QtFwiLFxuICAgICAgc2luZ3VsYXJHZW5pdGl2ZTogXCLQv9C+0YfRgtC4IHt7Y291bnR9fSDQs9C+0LTQsFwiLFxuICAgICAgcGx1cmFsR2VuaXRpdmU6IFwi0L/QvtGH0YLQuCB7e2NvdW50fX0g0LvQtdGCXCIsXG4gICAgfSxcbiAgICBmdXR1cmU6IHtcbiAgICAgIHNpbmd1bGFyTm9taW5hdGl2ZTogXCLQv9C+0YfRgtC4INGH0LXRgNC10Lcge3tjb3VudH19INCz0L7QtFwiLFxuICAgICAgc2luZ3VsYXJHZW5pdGl2ZTogXCLQv9C+0YfRgtC4INGH0LXRgNC10Lcge3tjb3VudH19INCz0L7QtNCwXCIsXG4gICAgICBwbHVyYWxHZW5pdGl2ZTogXCLQv9C+0YfRgtC4INGH0LXRgNC10Lcge3tjb3VudH19INC70LXRglwiLFxuICAgIH0sXG4gIH0pLFxufTtcblxuZXhwb3J0IGNvbnN0IGZvcm1hdERpc3RhbmNlID0gKHRva2VuLCBjb3VudCwgb3B0aW9ucykgPT4ge1xuICByZXR1cm4gZm9ybWF0RGlzdGFuY2VMb2NhbGVbdG9rZW5dKGNvdW50LCBvcHRpb25zKTtcbn07XG4iLCJpbXBvcnQgeyBidWlsZEZvcm1hdExvbmdGbiB9IGZyb20gXCIuLi8uLi9fbGliL2J1aWxkRm9ybWF0TG9uZ0ZuLmpzXCI7XG5cbmNvbnN0IGRhdGVGb3JtYXRzID0ge1xuICBmdWxsOiBcIkVFRUUsIGQgTU1NTSB5ICfQsy4nXCIsXG4gIGxvbmc6IFwiZCBNTU1NIHkgJ9CzLidcIixcbiAgbWVkaXVtOiBcImQgTU1NIHkgJ9CzLidcIixcbiAgc2hvcnQ6IFwiZGQuTU0ueVwiLFxufTtcblxuY29uc3QgdGltZUZvcm1hdHMgPSB7XG4gIGZ1bGw6IFwiSDptbTpzcyB6enp6XCIsXG4gIGxvbmc6IFwiSDptbTpzcyB6XCIsXG4gIG1lZGl1bTogXCJIOm1tOnNzXCIsXG4gIHNob3J0OiBcIkg6bW1cIixcbn07XG5cbmNvbnN0IGRhdGVUaW1lRm9ybWF0cyA9IHtcbiAgYW55OiBcInt7ZGF0ZX19LCB7e3RpbWV9fVwiLFxufTtcblxuZXhwb3J0IGNvbnN0IGZvcm1hdExvbmcgPSB7XG4gIGRhdGU6IGJ1aWxkRm9ybWF0TG9uZ0ZuKHtcbiAgICBmb3JtYXRzOiBkYXRlRm9ybWF0cyxcbiAgICBkZWZhdWx0V2lkdGg6IFwiZnVsbFwiLFxuICB9KSxcblxuICB0aW1lOiBidWlsZEZvcm1hdExvbmdGbih7XG4gICAgZm9ybWF0czogdGltZUZvcm1hdHMsXG4gICAgZGVmYXVsdFdpZHRoOiBcImZ1bGxcIixcbiAgfSksXG5cbiAgZGF0ZVRpbWU6IGJ1aWxkRm9ybWF0TG9uZ0ZuKHtcbiAgICBmb3JtYXRzOiBkYXRlVGltZUZvcm1hdHMsXG4gICAgZGVmYXVsdFdpZHRoOiBcImFueVwiLFxuICB9KSxcbn07XG4iLCJpbXBvcnQgeyBpc1NhbWVXZWVrIH0gZnJvbSBcIi4uLy4uLy4uL2lzU2FtZVdlZWsuanNcIjtcblxuY29uc3QgYWNjdXNhdGl2ZVdlZWtkYXlzID0gW1xuICBcItCy0L7RgdC60YDQtdGB0LXQvdGM0LVcIixcbiAgXCLQv9C+0L3QtdC00LXQu9GM0L3QuNC6XCIsXG4gIFwi0LLRgtC+0YDQvdC40LpcIixcbiAgXCLRgdGA0LXQtNGDXCIsXG4gIFwi0YfQtdGC0LLQtdGA0LNcIixcbiAgXCLQv9GP0YLQvdC40YbRg1wiLFxuICBcItGB0YPQsdCx0L7RgtGDXCIsXG5dO1xuXG5mdW5jdGlvbiBsYXN0V2VlayhkYXkpIHtcbiAgY29uc3Qgd2Vla2RheSA9IGFjY3VzYXRpdmVXZWVrZGF5c1tkYXldO1xuXG4gIHN3aXRjaCAoZGF5KSB7XG4gICAgY2FzZSAwOlxuICAgICAgcmV0dXJuIFwiJ9CyINC/0YDQvtGI0LvQvtC1IFwiICsgd2Vla2RheSArIFwiINCyJyBwXCI7XG4gICAgY2FzZSAxOlxuICAgIGNhc2UgMjpcbiAgICBjYXNlIDQ6XG4gICAgICByZXR1cm4gXCIn0LIg0L/RgNC+0YjQu9GL0LkgXCIgKyB3ZWVrZGF5ICsgXCIg0LInIHBcIjtcbiAgICBjYXNlIDM6XG4gICAgY2FzZSA1OlxuICAgIGNhc2UgNjpcbiAgICAgIHJldHVybiBcIifQsiDQv9GA0L7RiNC70YPRjiBcIiArIHdlZWtkYXkgKyBcIiDQsicgcFwiO1xuICB9XG59XG5cbmZ1bmN0aW9uIHRoaXNXZWVrKGRheSkge1xuICBjb25zdCB3ZWVrZGF5ID0gYWNjdXNhdGl2ZVdlZWtkYXlzW2RheV07XG5cbiAgaWYgKGRheSA9PT0gMiAvKiBUdWUgKi8pIHtcbiAgICByZXR1cm4gXCIn0LLQviBcIiArIHdlZWtkYXkgKyBcIiDQsicgcFwiO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBcIifQsiBcIiArIHdlZWtkYXkgKyBcIiDQsicgcFwiO1xuICB9XG59XG5cbmZ1bmN0aW9uIG5leHRXZWVrKGRheSkge1xuICBjb25zdCB3ZWVrZGF5ID0gYWNjdXNhdGl2ZVdlZWtkYXlzW2RheV07XG5cbiAgc3dpdGNoIChkYXkpIHtcbiAgICBjYXNlIDA6XG4gICAgICByZXR1cm4gXCIn0LIg0YHQu9C10LTRg9GO0YnQtdC1IFwiICsgd2Vla2RheSArIFwiINCyJyBwXCI7XG4gICAgY2FzZSAxOlxuICAgIGNhc2UgMjpcbiAgICBjYXNlIDQ6XG4gICAgICByZXR1cm4gXCIn0LIg0YHQu9C10LTRg9GO0YnQuNC5IFwiICsgd2Vla2RheSArIFwiINCyJyBwXCI7XG4gICAgY2FzZSAzOlxuICAgIGNhc2UgNTpcbiAgICBjYXNlIDY6XG4gICAgICByZXR1cm4gXCIn0LIg0YHQu9C10LTRg9GO0YnRg9GOIFwiICsgd2Vla2RheSArIFwiINCyJyBwXCI7XG4gIH1cbn1cblxuY29uc3QgZm9ybWF0UmVsYXRpdmVMb2NhbGUgPSB7XG4gIGxhc3RXZWVrOiAoZGF0ZSwgYmFzZURhdGUsIG9wdGlvbnMpID0+IHtcbiAgICBjb25zdCBkYXkgPSBkYXRlLmdldERheSgpO1xuICAgIGlmIChpc1NhbWVXZWVrKGRhdGUsIGJhc2VEYXRlLCBvcHRpb25zKSkge1xuICAgICAgcmV0dXJuIHRoaXNXZWVrKGRheSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBsYXN0V2VlayhkYXkpO1xuICAgIH1cbiAgfSxcbiAgeWVzdGVyZGF5OiBcIifQstGH0LXRgNCwINCyJyBwXCIsXG4gIHRvZGF5OiBcIifRgdC10LPQvtC00L3RjyDQsicgcFwiLFxuICB0b21vcnJvdzogXCIn0LfQsNCy0YLRgNCwINCyJyBwXCIsXG4gIG5leHRXZWVrOiAoZGF0ZSwgYmFzZURhdGUsIG9wdGlvbnMpID0+IHtcbiAgICBjb25zdCBkYXkgPSBkYXRlLmdldERheSgpO1xuICAgIGlmIChpc1NhbWVXZWVrKGRhdGUsIGJhc2VEYXRlLCBvcHRpb25zKSkge1xuICAgICAgcmV0dXJuIHRoaXNXZWVrKGRheSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXh0V2VlayhkYXkpO1xuICAgIH1cbiAgfSxcbiAgb3RoZXI6IFwiUFwiLFxufTtcblxuZXhwb3J0IGNvbnN0IGZvcm1hdFJlbGF0aXZlID0gKHRva2VuLCBkYXRlLCBiYXNlRGF0ZSwgb3B0aW9ucykgPT4ge1xuICBjb25zdCBmb3JtYXQgPSBmb3JtYXRSZWxhdGl2ZUxvY2FsZVt0b2tlbl07XG5cbiAgaWYgKHR5cGVvZiBmb3JtYXQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiBmb3JtYXQoZGF0ZSwgYmFzZURhdGUsIG9wdGlvbnMpO1xuICB9XG5cbiAgcmV0dXJuIGZvcm1hdDtcbn07XG4iLCJpbXBvcnQgeyBidWlsZExvY2FsaXplRm4gfSBmcm9tIFwiLi4vLi4vX2xpYi9idWlsZExvY2FsaXplRm4uanNcIjtcblxuY29uc3QgZXJhVmFsdWVzID0ge1xuICBuYXJyb3c6IFtcItC00L4g0L0u0Y0uXCIsIFwi0L0u0Y0uXCJdLFxuICBhYmJyZXZpYXRlZDogW1wi0LTQviDQvS4g0Y0uXCIsIFwi0L0uINGNLlwiXSxcbiAgd2lkZTogW1wi0LTQviDQvdCw0YjQtdC5INGN0YDRi1wiLCBcItC90LDRiNC10Lkg0Y3RgNGLXCJdLFxufTtcblxuY29uc3QgcXVhcnRlclZhbHVlcyA9IHtcbiAgbmFycm93OiBbXCIxXCIsIFwiMlwiLCBcIjNcIiwgXCI0XCJdLFxuICBhYmJyZXZpYXRlZDogW1wiMS3QuSDQutCyLlwiLCBcIjIt0Lkg0LrQsi5cIiwgXCIzLdC5INC60LIuXCIsIFwiNC3QuSDQutCyLlwiXSxcbiAgd2lkZTogW1wiMS3QuSDQutCy0LDRgNGC0LDQu1wiLCBcIjIt0Lkg0LrQstCw0YDRgtCw0LtcIiwgXCIzLdC5INC60LLQsNGA0YLQsNC7XCIsIFwiNC3QuSDQutCy0LDRgNGC0LDQu1wiXSxcbn07XG5cbmNvbnN0IG1vbnRoVmFsdWVzID0ge1xuICBuYXJyb3c6IFtcItCvXCIsIFwi0KRcIiwgXCLQnFwiLCBcItCQXCIsIFwi0JxcIiwgXCLQmFwiLCBcItCYXCIsIFwi0JBcIiwgXCLQoVwiLCBcItCeXCIsIFwi0J1cIiwgXCLQlFwiXSxcbiAgYWJicmV2aWF0ZWQ6IFtcbiAgICBcItGP0L3Qsi5cIixcbiAgICBcItGE0LXQsi5cIixcbiAgICBcItC80LDRgNGCXCIsXG4gICAgXCLQsNC/0YAuXCIsXG4gICAgXCLQvNCw0LlcIixcbiAgICBcItC40Y7QvdGMXCIsXG4gICAgXCLQuNGO0LvRjFwiLFxuICAgIFwi0LDQstCzLlwiLFxuICAgIFwi0YHQtdC90YIuXCIsXG4gICAgXCLQvtC60YIuXCIsXG4gICAgXCLQvdC+0Y/QsS5cIixcbiAgICBcItC00LXQui5cIixcbiAgXSxcblxuICB3aWRlOiBbXG4gICAgXCLRj9C90LLQsNGA0YxcIixcbiAgICBcItGE0LXQstGA0LDQu9GMXCIsXG4gICAgXCLQvNCw0YDRglwiLFxuICAgIFwi0LDQv9GA0LXQu9GMXCIsXG4gICAgXCLQvNCw0LlcIixcbiAgICBcItC40Y7QvdGMXCIsXG4gICAgXCLQuNGO0LvRjFwiLFxuICAgIFwi0LDQstCz0YPRgdGCXCIsXG4gICAgXCLRgdC10L3RgtGP0LHRgNGMXCIsXG4gICAgXCLQvtC60YLRj9Cx0YDRjFwiLFxuICAgIFwi0L3QvtGP0LHRgNGMXCIsXG4gICAgXCLQtNC10LrQsNCx0YDRjFwiLFxuICBdLFxufTtcblxuY29uc3QgZm9ybWF0dGluZ01vbnRoVmFsdWVzID0ge1xuICBuYXJyb3c6IFtcItCvXCIsIFwi0KRcIiwgXCLQnFwiLCBcItCQXCIsIFwi0JxcIiwgXCLQmFwiLCBcItCYXCIsIFwi0JBcIiwgXCLQoVwiLCBcItCeXCIsIFwi0J1cIiwgXCLQlFwiXSxcbiAgYWJicmV2aWF0ZWQ6IFtcbiAgICBcItGP0L3Qsi5cIixcbiAgICBcItGE0LXQsi5cIixcbiAgICBcItC80LDRgC5cIixcbiAgICBcItCw0L/RgC5cIixcbiAgICBcItC80LDRj1wiLFxuICAgIFwi0LjRjtC9LlwiLFxuICAgIFwi0LjRjtC7LlwiLFxuICAgIFwi0LDQstCzLlwiLFxuICAgIFwi0YHQtdC90YIuXCIsXG4gICAgXCLQvtC60YIuXCIsXG4gICAgXCLQvdC+0Y/QsS5cIixcbiAgICBcItC00LXQui5cIixcbiAgXSxcblxuICB3aWRlOiBbXG4gICAgXCLRj9C90LLQsNGA0Y9cIixcbiAgICBcItGE0LXQstGA0LDQu9GPXCIsXG4gICAgXCLQvNCw0YDRgtCwXCIsXG4gICAgXCLQsNC/0YDQtdC70Y9cIixcbiAgICBcItC80LDRj1wiLFxuICAgIFwi0LjRjtC90Y9cIixcbiAgICBcItC40Y7Qu9GPXCIsXG4gICAgXCLQsNCy0LPRg9GB0YLQsFwiLFxuICAgIFwi0YHQtdC90YLRj9Cx0YDRj1wiLFxuICAgIFwi0L7QutGC0Y/QsdGA0Y9cIixcbiAgICBcItC90L7Rj9Cx0YDRj1wiLFxuICAgIFwi0LTQtdC60LDQsdGA0Y9cIixcbiAgXSxcbn07XG5cbmNvbnN0IGRheVZhbHVlcyA9IHtcbiAgbmFycm93OiBbXCLQklwiLCBcItCfXCIsIFwi0JJcIiwgXCLQoVwiLCBcItCnXCIsIFwi0J9cIiwgXCLQoVwiXSxcbiAgc2hvcnQ6IFtcItCy0YFcIiwgXCLQv9C9XCIsIFwi0LLRglwiLCBcItGB0YBcIiwgXCLRh9GCXCIsIFwi0L/RglwiLCBcItGB0LFcIl0sXG4gIGFiYnJldmlhdGVkOiBbXCLQstGB0LpcIiwgXCLQv9C90LRcIiwgXCLQstGC0YBcIiwgXCLRgdGA0LRcIiwgXCLRh9GC0LJcIiwgXCLQv9GC0L1cIiwgXCLRgdGD0LFcIl0sXG4gIHdpZGU6IFtcbiAgICBcItCy0L7RgdC60YDQtdGB0LXQvdGM0LVcIixcbiAgICBcItC/0L7QvdC10LTQtdC70YzQvdC40LpcIixcbiAgICBcItCy0YLQvtGA0L3QuNC6XCIsXG4gICAgXCLRgdGA0LXQtNCwXCIsXG4gICAgXCLRh9C10YLQstC10YDQs1wiLFxuICAgIFwi0L/Rj9GC0L3QuNGG0LBcIixcbiAgICBcItGB0YPQsdCx0L7RgtCwXCIsXG4gIF0sXG59O1xuXG5jb25zdCBkYXlQZXJpb2RWYWx1ZXMgPSB7XG4gIG5hcnJvdzoge1xuICAgIGFtOiBcItCU0J9cIixcbiAgICBwbTogXCLQn9CfXCIsXG4gICAgbWlkbmlnaHQ6IFwi0L/QvtC70L0uXCIsXG4gICAgbm9vbjogXCLQv9C+0LvQtC5cIixcbiAgICBtb3JuaW5nOiBcItGD0YLRgNC+XCIsXG4gICAgYWZ0ZXJub29uOiBcItC00LXQvdGMXCIsXG4gICAgZXZlbmluZzogXCLQstC10YcuXCIsXG4gICAgbmlnaHQ6IFwi0L3QvtGH0YxcIixcbiAgfSxcbiAgYWJicmV2aWF0ZWQ6IHtcbiAgICBhbTogXCLQlNCfXCIsXG4gICAgcG06IFwi0J/Qn1wiLFxuICAgIG1pZG5pZ2h0OiBcItC/0L7Qu9C9LlwiLFxuICAgIG5vb246IFwi0L/QvtC70LQuXCIsXG4gICAgbW9ybmluZzogXCLRg9GC0YDQvlwiLFxuICAgIGFmdGVybm9vbjogXCLQtNC10L3RjFwiLFxuICAgIGV2ZW5pbmc6IFwi0LLQtdGHLlwiLFxuICAgIG5pZ2h0OiBcItC90L7Rh9GMXCIsXG4gIH0sXG4gIHdpZGU6IHtcbiAgICBhbTogXCLQlNCfXCIsXG4gICAgcG06IFwi0J/Qn1wiLFxuICAgIG1pZG5pZ2h0OiBcItC/0L7Qu9C90L7Rh9GMXCIsXG4gICAgbm9vbjogXCLQv9C+0LvQtNC10L3RjFwiLFxuICAgIG1vcm5pbmc6IFwi0YPRgtGA0L5cIixcbiAgICBhZnRlcm5vb246IFwi0LTQtdC90YxcIixcbiAgICBldmVuaW5nOiBcItCy0LXRh9C10YBcIixcbiAgICBuaWdodDogXCLQvdC+0YfRjFwiLFxuICB9LFxufTtcblxuY29uc3QgZm9ybWF0dGluZ0RheVBlcmlvZFZhbHVlcyA9IHtcbiAgbmFycm93OiB7XG4gICAgYW06IFwi0JTQn1wiLFxuICAgIHBtOiBcItCf0J9cIixcbiAgICBtaWRuaWdodDogXCLQv9C+0LvQvS5cIixcbiAgICBub29uOiBcItC/0L7Qu9C0LlwiLFxuICAgIG1vcm5pbmc6IFwi0YPRgtGA0LBcIixcbiAgICBhZnRlcm5vb246IFwi0LTQvdGPXCIsXG4gICAgZXZlbmluZzogXCLQstC10YcuXCIsXG4gICAgbmlnaHQ6IFwi0L3QvtGH0LhcIixcbiAgfSxcbiAgYWJicmV2aWF0ZWQ6IHtcbiAgICBhbTogXCLQlNCfXCIsXG4gICAgcG06IFwi0J/Qn1wiLFxuICAgIG1pZG5pZ2h0OiBcItC/0L7Qu9C9LlwiLFxuICAgIG5vb246IFwi0L/QvtC70LQuXCIsXG4gICAgbW9ybmluZzogXCLRg9GC0YDQsFwiLFxuICAgIGFmdGVybm9vbjogXCLQtNC90Y9cIixcbiAgICBldmVuaW5nOiBcItCy0LXRhy5cIixcbiAgICBuaWdodDogXCLQvdC+0YfQuFwiLFxuICB9LFxuICB3aWRlOiB7XG4gICAgYW06IFwi0JTQn1wiLFxuICAgIHBtOiBcItCf0J9cIixcbiAgICBtaWRuaWdodDogXCLQv9C+0LvQvdC+0YfRjFwiLFxuICAgIG5vb246IFwi0L/QvtC70LTQtdC90YxcIixcbiAgICBtb3JuaW5nOiBcItGD0YLRgNCwXCIsXG4gICAgYWZ0ZXJub29uOiBcItC00L3Rj1wiLFxuICAgIGV2ZW5pbmc6IFwi0LLQtdGH0LXRgNCwXCIsXG4gICAgbmlnaHQ6IFwi0L3QvtGH0LhcIixcbiAgfSxcbn07XG5cbmNvbnN0IG9yZGluYWxOdW1iZXIgPSAoZGlydHlOdW1iZXIsIG9wdGlvbnMpID0+IHtcbiAgY29uc3QgbnVtYmVyID0gTnVtYmVyKGRpcnR5TnVtYmVyKTtcbiAgY29uc3QgdW5pdCA9IG9wdGlvbnM/LnVuaXQ7XG5cbiAgbGV0IHN1ZmZpeDtcbiAgaWYgKHVuaXQgPT09IFwiZGF0ZVwiKSB7XG4gICAgc3VmZml4ID0gXCIt0LVcIjtcbiAgfSBlbHNlIGlmICh1bml0ID09PSBcIndlZWtcIiB8fCB1bml0ID09PSBcIm1pbnV0ZVwiIHx8IHVuaXQgPT09IFwic2Vjb25kXCIpIHtcbiAgICBzdWZmaXggPSBcIi3Rj1wiO1xuICB9IGVsc2Uge1xuICAgIHN1ZmZpeCA9IFwiLdC5XCI7XG4gIH1cblxuICByZXR1cm4gbnVtYmVyICsgc3VmZml4O1xufTtcblxuZXhwb3J0IGNvbnN0IGxvY2FsaXplID0ge1xuICBvcmRpbmFsTnVtYmVyLFxuXG4gIGVyYTogYnVpbGRMb2NhbGl6ZUZuKHtcbiAgICB2YWx1ZXM6IGVyYVZhbHVlcyxcbiAgICBkZWZhdWx0V2lkdGg6IFwid2lkZVwiLFxuICB9KSxcblxuICBxdWFydGVyOiBidWlsZExvY2FsaXplRm4oe1xuICAgIHZhbHVlczogcXVhcnRlclZhbHVlcyxcbiAgICBkZWZhdWx0V2lkdGg6IFwid2lkZVwiLFxuICAgIGFyZ3VtZW50Q2FsbGJhY2s6IChxdWFydGVyKSA9PiBxdWFydGVyIC0gMSxcbiAgfSksXG5cbiAgbW9udGg6IGJ1aWxkTG9jYWxpemVGbih7XG4gICAgdmFsdWVzOiBtb250aFZhbHVlcyxcbiAgICBkZWZhdWx0V2lkdGg6IFwid2lkZVwiLFxuICAgIGZvcm1hdHRpbmdWYWx1ZXM6IGZvcm1hdHRpbmdNb250aFZhbHVlcyxcbiAgICBkZWZhdWx0Rm9ybWF0dGluZ1dpZHRoOiBcIndpZGVcIixcbiAgfSksXG5cbiAgZGF5OiBidWlsZExvY2FsaXplRm4oe1xuICAgIHZhbHVlczogZGF5VmFsdWVzLFxuICAgIGRlZmF1bHRXaWR0aDogXCJ3aWRlXCIsXG4gIH0pLFxuXG4gIGRheVBlcmlvZDogYnVpbGRMb2NhbGl6ZUZuKHtcbiAgICB2YWx1ZXM6IGRheVBlcmlvZFZhbHVlcyxcbiAgICBkZWZhdWx0V2lkdGg6IFwiYW55XCIsXG4gICAgZm9ybWF0dGluZ1ZhbHVlczogZm9ybWF0dGluZ0RheVBlcmlvZFZhbHVlcyxcbiAgICBkZWZhdWx0Rm9ybWF0dGluZ1dpZHRoOiBcIndpZGVcIixcbiAgfSksXG59O1xuIiwiaW1wb3J0IHsgYnVpbGRNYXRjaEZuIH0gZnJvbSBcIi4uLy4uL19saWIvYnVpbGRNYXRjaEZuLmpzXCI7XG5pbXBvcnQgeyBidWlsZE1hdGNoUGF0dGVybkZuIH0gZnJvbSBcIi4uLy4uL19saWIvYnVpbGRNYXRjaFBhdHRlcm5Gbi5qc1wiO1xuXG5jb25zdCBtYXRjaE9yZGluYWxOdW1iZXJQYXR0ZXJuID0gL14oXFxkKykoLT8o0LV80Y980Ll80L7QtXzRjNC1fNCw0Y980YzRj3zRi9C5fNC+0Ll80LjQuXzRi9C5KSk/L2k7XG5jb25zdCBwYXJzZU9yZGluYWxOdW1iZXJQYXR0ZXJuID0gL1xcZCsvaTtcblxuY29uc3QgbWF0Y2hFcmFQYXR0ZXJucyA9IHtcbiAgbmFycm93OiAvXigo0LTQviApP9C9XFwuP1xccz/RjVxcLj8pL2ksXG4gIGFiYnJldmlhdGVkOiAvXigo0LTQviApP9C9XFwuP1xccz/RjVxcLj8pL2ksXG4gIHdpZGU6IC9eKNC00L4g0L3QsNGI0LXQuSDRjdGA0Yt80L3QsNGI0LXQuSDRjdGA0Yt80L3QsNGI0LAg0Y3RgNCwKS9pLFxufTtcbmNvbnN0IHBhcnNlRXJhUGF0dGVybnMgPSB7XG4gIGFueTogWy9e0LQvaSwgL17QvS9pXSxcbn07XG5cbmNvbnN0IG1hdGNoUXVhcnRlclBhdHRlcm5zID0ge1xuICBuYXJyb3c6IC9eWzEyMzRdL2ksXG4gIGFiYnJldmlhdGVkOiAvXlsxMjM0XSgtP1vRi9C+0LhdP9C5Pyk/INC60LIuPy9pLFxuICB3aWRlOiAvXlsxMjM0XSgtP1vRi9C+0LhdP9C5Pyk/INC60LLQsNGA0YLQsNC7L2ksXG59O1xuXG5jb25zdCBwYXJzZVF1YXJ0ZXJQYXR0ZXJucyA9IHtcbiAgYW55OiBbLzEvaSwgLzIvaSwgLzMvaSwgLzQvaV0sXG59O1xuXG5jb25zdCBtYXRjaE1vbnRoUGF0dGVybnMgPSB7XG4gIG5hcnJvdzogL15b0Y/RhNC80LDQuNGB0L7QvdC0XS9pLFxuICBhYmJyZXZpYXRlZDpcbiAgICAvXijRj9C90LJ80YTQtdCyfNC80LDRgNGCP3zQsNC/0YB80LzQsFvQudGPXXzQuNGO0L1b0YzRj10/fNC40Y7Qu1vRjNGPXT980LDQstCzfNGB0LXQvdGCP3zQvtC60YJ80L3QvtGP0LE/fNC00LXQuilcXC4/L2ksXG4gIHdpZGU6IC9eKNGP0L3QstCw0YBb0YzRj1180YTQtdCy0YDQsNC7W9GM0Y9dfNC80LDRgNGC0LA/fNCw0L/RgNC10Ltb0YzRj1180LzQsFvQudGPXXzQuNGO0L1b0YzRj1180LjRjtC7W9GM0Y9dfNCw0LLQs9GD0YHRgtCwP3zRgdC10L3RgtGP0LHRgFvRjNGPXXzQvtC60YLRj9Cx0YBb0YzRj1180L7QutGC0Y/QsdGAW9GM0Y9dfNC90L7Rj9Cx0YBb0YzRj1180LTQtdC60LDQsdGAW9GM0Y9dKS9pLFxufTtcblxuY29uc3QgcGFyc2VNb250aFBhdHRlcm5zID0ge1xuICBuYXJyb3c6IFtcbiAgICAvXtGPL2ksXG4gICAgL17RhC9pLFxuICAgIC9e0LwvaSxcbiAgICAvXtCwL2ksXG4gICAgL17QvC9pLFxuICAgIC9e0LgvaSxcbiAgICAvXtC4L2ksXG4gICAgL17QsC9pLFxuICAgIC9e0YEvaSxcbiAgICAvXtC+L2ksXG4gICAgL17QvS9pLFxuICAgIC9e0Y8vaSxcbiAgXSxcblxuICBhbnk6IFtcbiAgICAvXtGPL2ksXG4gICAgL17RhC9pLFxuICAgIC9e0LzQsNGAL2ksXG4gICAgL17QsNC/L2ksXG4gICAgL17QvNCwW9C50Y9dL2ksXG4gICAgL17QuNGO0L0vaSxcbiAgICAvXtC40Y7Quy9pLFxuICAgIC9e0LDQsi9pLFxuICAgIC9e0YEvaSxcbiAgICAvXtC+L2ksXG4gICAgL17QvS9pLFxuICAgIC9e0LQvaSxcbiAgXSxcbn07XG5cbmNvbnN0IG1hdGNoRGF5UGF0dGVybnMgPSB7XG4gIG5hcnJvdzogL15b0LLQv9GB0YddL2ksXG4gIHNob3J0OiAvXijQstGBfNCy0L580L/QvXzQv9C+fNCy0YJ80YHRgHzRh9GCfNGH0LV80L/RgnzQv9GPfNGB0LF80YHRgylcXC4/L2ksXG4gIGFiYnJldmlhdGVkOiAvXijQstGB0Lp80LLQvtGBfNC/0L3QtHzQv9C+0L180LLRgtGAfNCy0YLQvnzRgdGA0LR80YHRgNC1fNGH0YLQsnzRh9C10YJ80L/RgtC9fNC/0Y/RgnzRgdGD0LEpLj8vaSxcbiAgd2lkZTogL14o0LLQvtGB0LrRgNC10YHQtdC90Yxb0LXRj1180L/QvtC90LXQtNC10LvRjNC90LjQutCwP3zQstGC0L7RgNC90LjQutCwP3zRgdGA0LXQtFvQsNGLXXzRh9C10YLQstC10YDQs9CwP3zQv9GP0YLQvdC40YZb0LDRi1180YHRg9Cx0LHQvtGCW9Cw0YtdKS9pLFxufTtcblxuY29uc3QgcGFyc2VEYXlQYXR0ZXJucyA9IHtcbiAgbmFycm93OiBbL17Qsi9pLCAvXtC/L2ksIC9e0LIvaSwgL17RgS9pLCAvXtGHL2ksIC9e0L8vaSwgL17RgS9pXSxcbiAgYW55OiBbL17QslvQvtGBXS9pLCAvXtC/W9C+0L1dL2ksIC9e0LIvaSwgL17RgdGAL2ksIC9e0YcvaSwgL17Qv1vRj9GCXS9pLCAvXtGBW9GD0LFdL2ldLFxufTtcblxuY29uc3QgbWF0Y2hEYXlQZXJpb2RQYXR0ZXJucyA9IHtcbiAgbmFycm93OiAvXihb0LTQv13Qv3zQv9C+0LvQvVxcLj980L/QvtC70LRcXC4/fNGD0YLRgFvQvtCwXXzQtNC10L3RjHzQtNC90Y980LLQtdGHXFwuP3zQvdC+0Ydb0YzQuF0pL2ksXG4gIGFiYnJldmlhdGVkOiAvXihb0LTQv13Qv3zQv9C+0LvQvVxcLj980L/QvtC70LRcXC4/fNGD0YLRgFvQvtCwXXzQtNC10L3RjHzQtNC90Y980LLQtdGHXFwuP3zQvdC+0Ydb0YzQuF0pL2ksXG4gIHdpZGU6IC9eKFvQtNC/XdC/fNC/0L7Qu9C90L7Rh9GMfNC/0L7Qu9C00LXQvdGMfNGD0YLRgFvQvtCwXXzQtNC10L3RjHzQtNC90Y980LLQtdGH0LXRgNCwP3zQvdC+0Ydb0YzQuF0pL2ksXG59O1xuXG5jb25zdCBwYXJzZURheVBlcmlvZFBhdHRlcm5zID0ge1xuICBhbnk6IHtcbiAgICBhbTogL17QtNC/L2ksXG4gICAgcG06IC9e0L/Qvy9pLFxuICAgIG1pZG5pZ2h0OiAvXtC/0L7Qu9C9L2ksXG4gICAgbm9vbjogL17Qv9C+0LvQtC9pLFxuICAgIG1vcm5pbmc6IC9e0YMvaSxcbiAgICBhZnRlcm5vb246IC9e0LRb0LXQvV0vaSxcbiAgICBldmVuaW5nOiAvXtCyL2ksXG4gICAgbmlnaHQ6IC9e0L0vaSxcbiAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBtYXRjaCA9IHtcbiAgb3JkaW5hbE51bWJlcjogYnVpbGRNYXRjaFBhdHRlcm5Gbih7XG4gICAgbWF0Y2hQYXR0ZXJuOiBtYXRjaE9yZGluYWxOdW1iZXJQYXR0ZXJuLFxuICAgIHBhcnNlUGF0dGVybjogcGFyc2VPcmRpbmFsTnVtYmVyUGF0dGVybixcbiAgICB2YWx1ZUNhbGxiYWNrOiAodmFsdWUpID0+IHBhcnNlSW50KHZhbHVlLCAxMCksXG4gIH0pLFxuXG4gIGVyYTogYnVpbGRNYXRjaEZuKHtcbiAgICBtYXRjaFBhdHRlcm5zOiBtYXRjaEVyYVBhdHRlcm5zLFxuICAgIGRlZmF1bHRNYXRjaFdpZHRoOiBcIndpZGVcIixcbiAgICBwYXJzZVBhdHRlcm5zOiBwYXJzZUVyYVBhdHRlcm5zLFxuICAgIGRlZmF1bHRQYXJzZVdpZHRoOiBcImFueVwiLFxuICB9KSxcblxuICBxdWFydGVyOiBidWlsZE1hdGNoRm4oe1xuICAgIG1hdGNoUGF0dGVybnM6IG1hdGNoUXVhcnRlclBhdHRlcm5zLFxuICAgIGRlZmF1bHRNYXRjaFdpZHRoOiBcIndpZGVcIixcbiAgICBwYXJzZVBhdHRlcm5zOiBwYXJzZVF1YXJ0ZXJQYXR0ZXJucyxcbiAgICBkZWZhdWx0UGFyc2VXaWR0aDogXCJhbnlcIixcbiAgICB2YWx1ZUNhbGxiYWNrOiAoaW5kZXgpID0+IGluZGV4ICsgMSxcbiAgfSksXG5cbiAgbW9udGg6IGJ1aWxkTWF0Y2hGbih7XG4gICAgbWF0Y2hQYXR0ZXJuczogbWF0Y2hNb250aFBhdHRlcm5zLFxuICAgIGRlZmF1bHRNYXRjaFdpZHRoOiBcIndpZGVcIixcbiAgICBwYXJzZVBhdHRlcm5zOiBwYXJzZU1vbnRoUGF0dGVybnMsXG4gICAgZGVmYXVsdFBhcnNlV2lkdGg6IFwiYW55XCIsXG4gIH0pLFxuXG4gIGRheTogYnVpbGRNYXRjaEZuKHtcbiAgICBtYXRjaFBhdHRlcm5zOiBtYXRjaERheVBhdHRlcm5zLFxuICAgIGRlZmF1bHRNYXRjaFdpZHRoOiBcIndpZGVcIixcbiAgICBwYXJzZVBhdHRlcm5zOiBwYXJzZURheVBhdHRlcm5zLFxuICAgIGRlZmF1bHRQYXJzZVdpZHRoOiBcImFueVwiLFxuICB9KSxcblxuICBkYXlQZXJpb2Q6IGJ1aWxkTWF0Y2hGbih7XG4gICAgbWF0Y2hQYXR0ZXJuczogbWF0Y2hEYXlQZXJpb2RQYXR0ZXJucyxcbiAgICBkZWZhdWx0TWF0Y2hXaWR0aDogXCJ3aWRlXCIsXG4gICAgcGFyc2VQYXR0ZXJuczogcGFyc2VEYXlQZXJpb2RQYXR0ZXJucyxcbiAgICBkZWZhdWx0UGFyc2VXaWR0aDogXCJhbnlcIixcbiAgfSksXG59O1xuIiwiaW1wb3J0IHsgZ2V0RGVmYXVsdE9wdGlvbnMgfSBmcm9tIFwiLi9fbGliL2RlZmF1bHRPcHRpb25zLmpzXCI7XG5pbXBvcnQgeyB0b0RhdGUgfSBmcm9tIFwiLi90b0RhdGUuanNcIjtcblxuLyoqXG4gKiBUaGUge0BsaW5rIHN0YXJ0T2ZXZWVrfSBmdW5jdGlvbiBvcHRpb25zLlxuICovXG5cbi8qKlxuICogQG5hbWUgc3RhcnRPZldlZWtcbiAqIEBjYXRlZ29yeSBXZWVrIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgc3RhcnQgb2YgYSB3ZWVrIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgc3RhcnQgb2YgYSB3ZWVrIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqIFRoZSByZXN1bHQgd2lsbCBiZSBpbiB0aGUgbG9jYWwgdGltZXpvbmUuXG4gKlxuICogQHR5cGVQYXJhbSBEYXRlVHlwZSAtIFRoZSBgRGF0ZWAgdHlwZSwgdGhlIGZ1bmN0aW9uIG9wZXJhdGVzIG9uLiBHZXRzIGluZmVycmVkIGZyb20gcGFzc2VkIGFyZ3VtZW50cy4gQWxsb3dzIHRvIHVzZSBleHRlbnNpb25zIGxpa2UgW2BVVENEYXRlYF0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL3V0YykuXG4gKiBAdHlwZVBhcmFtIFJlc3VsdERhdGUgLSBUaGUgcmVzdWx0IGBEYXRlYCB0eXBlLCBpdCBpcyB0aGUgdHlwZSByZXR1cm5lZCBmcm9tIHRoZSBjb250ZXh0IGZ1bmN0aW9uIGlmIGl0IGlzIHBhc3NlZCwgb3IgaW5mZXJyZWQgZnJvbSB0aGUgYXJndW1lbnRzLlxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIG9yaWdpbmFsIGRhdGVcbiAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb2JqZWN0IHdpdGggb3B0aW9uc1xuICpcbiAqIEByZXR1cm5zIFRoZSBzdGFydCBvZiBhIHdlZWtcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gVGhlIHN0YXJ0IG9mIGEgd2VlayBmb3IgMiBTZXB0ZW1iZXIgMjAxNCAxMTo1NTowMDpcbiAqIGNvbnN0IHJlc3VsdCA9IHN0YXJ0T2ZXZWVrKG5ldyBEYXRlKDIwMTQsIDgsIDIsIDExLCA1NSwgMCkpXG4gKiAvLz0+IFN1biBBdWcgMzEgMjAxNCAwMDowMDowMFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJZiB0aGUgd2VlayBzdGFydHMgb24gTW9uZGF5LCB0aGUgc3RhcnQgb2YgdGhlIHdlZWsgZm9yIDIgU2VwdGVtYmVyIDIwMTQgMTE6NTU6MDA6XG4gKiBjb25zdCByZXN1bHQgPSBzdGFydE9mV2VlayhuZXcgRGF0ZSgyMDE0LCA4LCAyLCAxMSwgNTUsIDApLCB7IHdlZWtTdGFydHNPbjogMSB9KVxuICogLy89PiBNb24gU2VwIDAxIDIwMTQgMDA6MDA6MDBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0T2ZXZWVrKGRhdGUsIG9wdGlvbnMpIHtcbiAgY29uc3QgZGVmYXVsdE9wdGlvbnMgPSBnZXREZWZhdWx0T3B0aW9ucygpO1xuICBjb25zdCB3ZWVrU3RhcnRzT24gPVxuICAgIG9wdGlvbnM/LndlZWtTdGFydHNPbiA/P1xuICAgIG9wdGlvbnM/LmxvY2FsZT8ub3B0aW9ucz8ud2Vla1N0YXJ0c09uID8/XG4gICAgZGVmYXVsdE9wdGlvbnMud2Vla1N0YXJ0c09uID8/XG4gICAgZGVmYXVsdE9wdGlvbnMubG9jYWxlPy5vcHRpb25zPy53ZWVrU3RhcnRzT24gPz9cbiAgICAwO1xuXG4gIGNvbnN0IF9kYXRlID0gdG9EYXRlKGRhdGUsIG9wdGlvbnM/LmluKTtcbiAgY29uc3QgZGF5ID0gX2RhdGUuZ2V0RGF5KCk7XG4gIGNvbnN0IGRpZmYgPSAoZGF5IDwgd2Vla1N0YXJ0c09uID8gNyA6IDApICsgZGF5IC0gd2Vla1N0YXJ0c09uO1xuXG4gIF9kYXRlLnNldERhdGUoX2RhdGUuZ2V0RGF0ZSgpIC0gZGlmZik7XG4gIF9kYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICByZXR1cm4gX2RhdGU7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgc3RhcnRPZldlZWs7XG4iLCJpbXBvcnQgeyBjb25zdHJ1Y3RGcm9tIH0gZnJvbSBcIi4vY29uc3RydWN0RnJvbS5qc1wiO1xuXG4vKipcbiAqIEBuYW1lIHRvRGF0ZVxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBDb252ZXJ0IHRoZSBnaXZlbiBhcmd1bWVudCB0byBhbiBpbnN0YW5jZSBvZiBEYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQ29udmVydCB0aGUgZ2l2ZW4gYXJndW1lbnQgdG8gYW4gaW5zdGFuY2Ugb2YgRGF0ZS5cbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgYW4gaW5zdGFuY2Ugb2YgRGF0ZSwgdGhlIGZ1bmN0aW9uIHJldHVybnMgaXRzIGNsb25lLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBhIG51bWJlciwgaXQgaXMgdHJlYXRlZCBhcyBhIHRpbWVzdGFtcC5cbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgbm9uZSBvZiB0aGUgYWJvdmUsIHRoZSBmdW5jdGlvbiByZXR1cm5zIEludmFsaWQgRGF0ZS5cbiAqXG4gKiBTdGFydGluZyBmcm9tIHYzLjcuMCwgaXQgY2xvbmVzIGEgZGF0ZSB1c2luZyBgW1N5bWJvbC5mb3IoXCJjb25zdHJ1Y3REYXRlRnJvbVwiKV1gXG4gKiBlbmFibGluZyB0byB0cmFuc2ZlciBleHRyYSBwcm9wZXJ0aWVzIGZyb20gdGhlIHJlZmVyZW5jZSBkYXRlIHRvIHRoZSBuZXcgZGF0ZS5cbiAqIEl0J3MgdXNlZnVsIGZvciBleHRlbnNpb25zIGxpa2UgW2BUWkRhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdHopXG4gKiB0aGF0IGFjY2VwdCBhIHRpbWUgem9uZSBhcyBhIGNvbnN0cnVjdG9yIGFyZ3VtZW50LlxuICpcbiAqICoqTm90ZSoqOiAqYWxsKiBEYXRlIGFyZ3VtZW50cyBwYXNzZWQgdG8gYW55ICpkYXRlLWZucyogZnVuY3Rpb24gaXMgcHJvY2Vzc2VkIGJ5IGB0b0RhdGVgLlxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICogQHR5cGVQYXJhbSBSZXN1bHREYXRlIC0gVGhlIHJlc3VsdCBgRGF0ZWAgdHlwZSwgaXQgaXMgdGhlIHR5cGUgcmV0dXJuZWQgZnJvbSB0aGUgY29udGV4dCBmdW5jdGlvbiBpZiBpdCBpcyBwYXNzZWQsIG9yIGluZmVycmVkIGZyb20gdGhlIGFyZ3VtZW50cy5cbiAqXG4gKiBAcGFyYW0gYXJndW1lbnQgLSBUaGUgdmFsdWUgdG8gY29udmVydFxuICpcbiAqIEByZXR1cm5zIFRoZSBwYXJzZWQgZGF0ZSBpbiB0aGUgbG9jYWwgdGltZSB6b25lXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIENsb25lIHRoZSBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gdG9EYXRlKG5ldyBEYXRlKDIwMTQsIDEsIDExLCAxMSwgMzAsIDMwKSlcbiAqIC8vPT4gVHVlIEZlYiAxMSAyMDE0IDExOjMwOjMwXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIENvbnZlcnQgdGhlIHRpbWVzdGFtcCB0byBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gdG9EYXRlKDEzOTIwOTg0MzAwMDApXG4gKiAvLz0+IFR1ZSBGZWIgMTEgMjAxNCAxMTozMDozMFxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9EYXRlKGFyZ3VtZW50LCBjb250ZXh0KSB7XG4gIC8vIFtUT0RPXSBHZXQgcmlkIG9mIGB0b0RhdGVgIG9yIGBjb25zdHJ1Y3RGcm9tYD9cbiAgcmV0dXJuIGNvbnN0cnVjdEZyb20oY29udGV4dCB8fCBhcmd1bWVudCwgYXJndW1lbnQpO1xufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IHRvRGF0ZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLyog0KTQsNC50Lsg0YHQviDRgdC/0LjRgdC60L7QvCDRgdGC0YDQsNC90LjRhiDQv9GA0LjQu9C+0LbQtdC90LjRjyAqL1xuZXhwb3J0IGNvbnN0IFBPU1RTX1BBR0UgPSBcInBvc3RzXCI7XG5leHBvcnQgY29uc3QgVVNFUl9QT1NUU19QQUdFID0gXCJ1c2VyLXBvc3RzXCI7XG5leHBvcnQgY29uc3QgQVVUSF9QQUdFID0gXCJhdXRoXCI7XG5leHBvcnQgY29uc3QgQUREX1BPU1RTX1BBR0UgPSBcImFkZC1wb3N0XCI7XG5leHBvcnQgY29uc3QgTE9BRElOR19QQUdFID0gXCJsb2FkaW5nXCI7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZXMuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5vcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZXMuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vdWkta2l0LmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xub3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vdWkta2l0LmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQgJiYgZG9jdW1lbnQuY3VycmVudFNjcmlwdC50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdTQ1JJUFQnKVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHtcblx0XHRcdHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxO1xuXHRcdFx0d2hpbGUgKGkgPiAtMSAmJiAoIXNjcmlwdFVybCB8fCAhL15odHRwKHM/KTovLnRlc3Qoc2NyaXB0VXJsKSkpIHNjcmlwdFVybCA9IHNjcmlwdHNbaS0tXS5zcmM7XG5cdFx0fVxuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoL15ibG9iOi8sIFwiXCIpLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudC5iYXNlVVJJKSB8fCBzZWxmLmxvY2F0aW9uLmhyZWY7XG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbi8vIG5vIG9uIGNodW5rcyBsb2FkZWRcblxuLy8gbm8ganNvbnAgZnVuY3Rpb24iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=