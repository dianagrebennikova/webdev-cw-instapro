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
const apiBase = "https://wedev-api.sky.pro/api";
const baseHost = `${apiBase}/v1`;
const postsHost = `${baseHost}/${personalKey}/instapro`;
const userHost = "https://wedev-api.sky.pro/api/user";


//Получение постов
function getPosts() {
  return fetch(postsHost, { method: "GET" })
    .then((response) => response.json())
    .then((data) => data.posts);
}

//Вход пользователя
function loginUser({ login, password }) {
  console.log("Login data: ", { login, password });

  return fetch(`${userHost}/login`, {
    method: "POST",
    // Убираем headers полностью
    body: JSON.stringify({ login, password }),
  })
  .then(async (response) => {
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      console.error("Login failed:", data);
      throw new Error("Неверный логин или пароль");
    }

    return data; // { user: {...} }
  });
}

//Регистрация пользователя
function registerUser({ login, password, name }) {
  return fetch(userHost, {
    method: "POST",
    body: JSON.stringify({ login, password, name }),
  }).then(async (response) => {
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error("Такой пользователь уже существует");
      }
      throw new Error("Ошибка при регистрации");
    }

    return data; // { user: { ... } }
  });
}

//Загрузка изображения
function uploadImage({ file }) {
  const data = new FormData();
  data.append("file", file);

  return fetch("https://wedev-api.sky.pro/api/upload/image", {
    method: "POST",
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Ответ API при загрузке картинки:", data);
      return { fileUrl: data.fileUrl };
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
/* harmony import */ var _upload_image_component_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./upload-image-component.js */ "./components/upload-image-component.js");



function renderAddPostPageComponent({ appEl, onAddPostClick }) {
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
  (0,_upload_image_component_js__WEBPACK_IMPORTED_MODULE_1__.renderUploadImageComponent)({
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
    (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.goToPage)(_index_js__WEBPACK_IMPORTED_MODULE_0__.POSTS_PAGE);
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
    window.userPosts = userPosts; // для синхронизации

    const renderPosts = (postsArray) => {
      return postsArray
        .map(post => {
          const postDate = new Date(post.createdAt);

          const allPosts = [..._index_js__WEBPACK_IMPORTED_MODULE_0__.posts, ...(window.userPosts || [])];
          const postGlobal = allPosts.find(p => p.id === post.id);
          const isLiked = postGlobal?.likes.some(l => l.id === _index_js__WEBPACK_IMPORTED_MODULE_0__.user?._id);
          const likeImage = isLiked ? _assets_images_like_active_svg__WEBPACK_IMPORTED_MODULE_5__ : _assets_images_like_not_active_svg__WEBPACK_IMPORTED_MODULE_6__;

          return `
            <li class="post" data-post-id="${post.id}">
              <div class="post-header" data-user-id="${post.user.id}">
                <img src="${post.user.imageUrl}" class="posts-user-header__user-image">
                <p class="posts-user-header__user-name">${post.user.name}</p>
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

    // Отображаем страницу пользователя без кнопки "Назад"
    appEl.innerHTML = `
      <div class="page-container">
        <div class="header-container"></div>
        <ul class="posts">${renderPosts(userPosts)}</ul>
      </div>
    `;

    // Рендер шапки
    (0,_header_component_js__WEBPACK_IMPORTED_MODULE_1__.renderHeaderComponent)({ element: document.querySelector(".header-container") });

    // Клик по шапке поста, чтобы открыть посты пользователя
    document.querySelectorAll(".post-header").forEach(userEl => {
      userEl.addEventListener("click", () => {
        const clickedUserId = userEl.dataset.userId;
        if (window.currentUserPostsId === clickedUserId) return;
        window.currentUserPostsId = clickedUserId;
        (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.goToPage)(USER_POSTS_PAGE, { userId: clickedUserId });
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
.add-header-container{
  padding: 0 20px;
  margin-bottom: 8px;
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
`, "",{"version":3,"sources":["webpack://./styles.css"],"names":[],"mappings":"AAAA;EACE,eAAe;AACjB;AACA;EACE,eAAe;EACf,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,gCAAgC;EAChC,kBAAkB;EAClB,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;EACE,SAAS;EACT,eAAe;EACf,eAAe;EACf,YAAY;AACd;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,UAAU;EACV,YAAY;EACZ,6BAA6B;EAC7B,eAAe;EACf,iBAAiB;EACjB,gBAAgB;EAChB,eAAe;AACjB;;AAEA;EACE,YAAY;EACZ,iBAAiB;AACnB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,gBAAgB;EAChB,UAAU;EACV,SAAS;AACX;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,mBAAmB;EACnB,mBAAmB;EACnB,eAAe;AACjB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,kBAAkB;AACpB;;AAEA;EACE,kBAAkB;EAClB,mBAAmB;EACnB,aAAa;EACb,aAAa;EACb,uBAAuB;EACvB,yBAAyB;AAC3B;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,gBAAgB;EAChB,iBAAiB;AACnB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,mBAAmB;AACrB;;AAEA;EACE,YAAY;EACZ,6BAA6B;EAC7B,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,eAAe;AACjB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,eAAe;EACf,iBAAiB;EACjB,eAAe;AACjB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,mBAAmB;EACnB,mBAAmB;AACrB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,kBAAkB;AACpB;;AAEA;EACE,eAAe;EACf,iBAAiB;AACnB;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,iBAAiB;AACnB;;AAEA;EACE,yDAAggB;EAChgB,YAAY;EACZ,WAAW;AACb;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,WAAW;AACb;;AAEA;EACE,eAAe;EACf,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,SAAS;AACX;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,gBAAgB;EAChB,aAAa;EACb,sBAAsB;EACtB,SAAS;AACX;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,iBAAiB;EACjB,kBAAkB;EAClB,sBAAsB;EACtB,kBAAkB;AACpB;;AAEA;EACE,qBAAqB;EACrB,sBAAsB;EACtB,WAAW;EACX,kBAAkB;AACpB","sourcesContent":[".page-container {\n  padding: 0 20px;\n}\n.add-header-container{\n  padding: 0 20px;\n  margin-bottom: 8px;\n}\n\n.page-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  border-bottom: 1px solid #e0e0e0;\n  padding: 20px 16px;\n  margin-left: -20px;\n  margin-right: -20px;\n}\n\n.logo {\n  margin: 0;\n  font-size: 28px;\n  cursor: pointer;\n  width: 130px;\n}\n\n.header-container {\n  margin-bottom: 8px;\n}\n\n.header-button {\n  padding: 0;\n  border: none;\n  background-color: transparent;\n  font-size: 14px;\n  line-height: 18px;\n  font-weight: 500;\n  cursor: pointer;\n}\n\n.logout-button {\n  width: 130px;\n  text-align: right;\n}\n\n.posts {\n  display: flex;\n  flex-direction: column;\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n\n.post-header {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  margin-bottom: 10px;\n  cursor: pointer;\n}\n\n.post-header__user-image {\n  width: 40px;\n  height: 40px;\n  object-fit: cover;\n  border-radius: 40px;\n  margin-right: 10px;\n}\n\n.post-image-container {\n  margin-left: -20px;\n  margin-right: -20px;\n  height: 500px;\n  display: flex;\n  justify-content: center;\n  background-color: #e0e0e0;\n}\n\n.post-image {\n  width: 100%;\n  height: 100%;\n  max-width: 500px;\n  object-fit: cover;\n}\n\n.post-likes {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n}\n\n.like-button {\n  border: none;\n  background-color: transparent;\n  padding: 8px;\n  padding-left: 0px;\n  padding-bottom: 5px;\n  cursor: pointer;\n}\n\n.user-name {\n  font-weight: 500;\n}\n\n.post-text {\n  font-size: 14px;\n  line-height: 18px;\n  margin-top: 5px;\n}\n\n.post-date {\n  color: #8a8a8a;\n}\n\n.post + .post {\n  margin-top: 20px;\n}\n\n.posts-user-header {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  margin-bottom: 12px;\n}\n\n.posts-user-header__user-image {\n  width: 70px;\n  height: 70px;\n  object-fit: cover;\n  border-radius: 40px;\n  margin-right: 10px;\n}\n\n.posts-user-header__user-name {\n  font-size: 28px;\n  line-height: 35px;\n}\n\n.loading-page {\n  display: flex;\n  justify-content: center;\n  margin-top: 100px;\n}\n\n.add-post-sign {\n  background-image: url(\"data:image/svg+xml,%3Csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 122.88 122.88'%3E%3Ctitle%3Eadd%3C/title%3E%3Cpath d='M61.44,0A61.46,61.46,0,1,1,18,18,61.25,61.25,0,0,1,61.44,0ZM88.6,56.82v9.24a4,4,0,0,1-4,4H70V84.62a4,4,0,0,1-4,4H56.82a4,4,0,0,1-4-4V70H38.26a4,4,0,0,1-4-4V56.82a4,4,0,0,1,4-4H52.84V38.26a4,4,0,0,1,4-4h9.24a4,4,0,0,1,4,4V52.84H84.62a4,4,0,0,1,4,4Zm8.83-31.37a50.92,50.92,0,1,0,14.9,36,50.78,50.78,0,0,0-14.9-36Z'/%3E%3C/svg%3E\");\n  height: 30px;\n  width: 30px;\n}\n\n.form {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n}\n\n.form-title {\n  font-size: 28px;\n  line-height: 35px;\n  text-align: center;\n}\n\n.form-inputs {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n\n.form-error {\n  color: red;\n}\n\n.form-footer {\n  margin-top: 50px;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n\n.form-footer-title {\n  text-align: center;\n}\n\n.file-upload-image-conrainer {\n  display: flex;\n  align-items: center;\n}\n\n.file-upload-image {\n  width: 100px;\n  height: 100px;\n  object-fit: cover;\n  margin-right: 10px;\n  border: 1px solid gray;\n  border-radius: 5px;\n}\n\n.file-upload-label {\n  display: inline-block;\n  box-sizing: border-box;\n  width: 100%;\n  text-align: center;\n}\n"],"sourceRoot":""}]);
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
  display: block;
  padding: 10px 13px 13px;
  font-size: 18px;
  line-height: 22px;
  border-radius: 5px;
  background-color: #565eef;
  color: #ffffff;
  border: none;
}

.button--large:hover {
  background-color: #66b1ff;
}

.button--large:disabled {
  background-color: #a0cfff;
  cursor: not-allowed;
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

.posts-user-header__user-name {
  font-size: 28px;
  line-height: 35px;
}
.posts-user-header__user-image{
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 40px;
  margin-right: 10px;
}`, "",{"version":3,"sources":["webpack://./ui-kit.css"],"names":[],"mappings":"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","sourcesContent":["/* \n  Это стили Дизайн системы, сквозные стили для элементов интерфейса\n  всего приложения: шрифты, кнопки, инпуты и так далее\n*/\n\n@font-face {\n  font-family: \"StratosSkyeng\";\n  font-style: normal;\n  font-weight: 400;\n  font-display: swap;\n  src: url(\"./assets/fonts/stratosskyengweb-regular.woff2\") format(\"woff2\");\n}\n\n@font-face {\n  font-family: \"StratosSkyeng\";\n  font-style: normal;\n  font-weight: 500;\n  font-display: swap;\n  src: url(\"./assets/fonts/stratosskyengweb-medium.woff2\") format(\"woff2\");\n}\n\nhtml {\n  /* скрывает скролбары в firefox */\n  scrollbar-width: none;\n}\n\nbody {\n  margin: 0;\n  padding: 0;\n  font-family: StratosSkyeng;\n  overflow: auto;\n  font-size: 14px;\n  line-height: 18px;\n}\n\n/* скрывает скролбары в chrome */\nbody::-webkit-scrollbar {\n  display: none;\n}\n\np {\n  margin: 0;\n}\n\n.button,\n.secondary-button {\n  display: block;\n  padding: 10px 13px 13px;\n  font-size: 18px;\n  line-height: 22px;\n  border-radius: 5px;\n  background-color: #565eef;\n  color: #ffffff;\n  border: none;\n}\n\n.link-button {\n  display: inline;\n  border: 0;\n  padding: 0;\n  background: none;\n  color: #565eef;\n  cursor: pointer;\n}\n\n.button:hover {\n  background-color: #6d73ff;\n}\n\n.button[disabled=\"true\"],\n.secondary-button[disabled=\"true\"] {\n  background-color: #f4f5f6;\n  color: rgba(153, 153, 153, 0.6);\n  pointer-events: none;\n}\n\n.button:active {\n  background-color: #4f56ce;\n}\n\n.secondary-button {\n  background-color: #edecff;\n  color: #565eef;\n}\n\n.secondary-button:hover {\n  background-color: #f2eeff;\n}\n\n.secondary-button:active {\n  background-color: #d8d7ff;\n}\n\n.input {\n  height: 36px;\n  box-sizing: border-box;\n  padding: 15px;\n  font-size: 14px;\n  line-height: 18px;\n  color: rgb(4, 18, 27);\n  border: none;\n  border-radius: 5px;\n  background-color: #e8e8e8;\n}\n\n.input .-error {\n  background-color: #fff;\n}\n\n.input:focus {\n  background-color: #fff;\n}\n\n.textarea {\n  padding: 15px;\n  resize: none;\n  width: 100%;\n  height: 100px;\n}\n\nstrong {\n  font-weight: 500;\n}\n\n/** Анимация загрузки **/\n.loader {\n  display: inline-block;\n  position: relative;\n  width: 80px;\n  height: 80px;\n}\n.loader div {\n  display: inline-block;\n  position: absolute;\n  left: 8px;\n  width: 16px;\n  background: #000;\n  animation: loader 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;\n}\n.loader div:nth-child(1) {\n  left: 8px;\n  animation-delay: -0.24s;\n}\n.loader div:nth-child(2) {\n  left: 32px;\n  animation-delay: -0.12s;\n}\n.loader div:nth-child(3) {\n  left: 56px;\n  animation-delay: 0;\n}\n@keyframes loader {\n  0% {\n    top: 8px;\n    height: 64px;\n  }\n  50%,\n  100% {\n    top: 24px;\n    height: 32px;\n  }\n}\n\n.input--large {\n  height: 150px;               \n  padding: 12px 15px;          \n  margin-bottom: 15px;\n  width: 100%;\n  box-sizing: border-box;\n  border: 1px solid #ccc;     \n  border-radius: 8px;          \n  font-size: 16px;             \n  line-height: 1.5;\n  resize: vertical;             \n  transition: border-color 0.2s, box-shadow 0.2s;\n}\n\n.input--large:focus {\n  outline: none;\n  border-color: #409eff;       \n  box-shadow: 0 0 5px rgba(64, 158, 255, 0.5);\n  background-color: #fff;\n}\n\n\n.input--file {\n  display: block;\n  width: 100%;\n  padding: 12px 15px;\n  font-size: 14px;\n  line-height: 18px;\n  color: #04121b;\n  border: 1px solid #ccc;\n  border-radius: 8px;\n  background-color: #f5f5f5;\n  cursor: pointer;\n  transition: background-color 0.2s, border-color 0.2s;\n}\n\n.input--file:hover {\n  background-color: #e0e0e0;\n}\n\n.button--large {\n  display: block;\n  padding: 10px 13px 13px;\n  font-size: 18px;\n  line-height: 22px;\n  border-radius: 5px;\n  background-color: #565eef;\n  color: #ffffff;\n  border: none;\n}\n\n.button--large:hover {\n  background-color: #66b1ff;\n}\n\n.button--large:disabled {\n  background-color: #a0cfff;\n  cursor: not-allowed;\n}\n\n\n.delete-button {\n  margin-left: auto;\n  padding: 4px 8px;\n  background-color: #b7b6b6;\n  color: black;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 12px;\n}\n\n.delete-button:hover {\n  background-color: #ff7875;\n}\n\n.like-pulse {\n  transform: scale(1.3);\n  transition: transform 0.3s ease;\n}\n\n.heart-overlay {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 100px;\n  height: 100px;\n  background-image: url('./assets/images/like-active.svg');\n  background-size: contain;\n  background-repeat: no-repeat;\n  background-position: center;\n  transform: translate(-50%, -50%) scale(0);\n  opacity: 0;\n  pointer-events: none;\n  transition: transform 0.3s ease, opacity 0.3s ease;\n}\n\n.heart-overlay.show-heart {\n  transform: translate(-50%, -50%) scale(1.2);\n  opacity: 1;\n}\n@keyframes heart-pop {\n  0% {\n    transform: translate(-50%, -50%) scale(0.8);\n    opacity: 0.8;\n  }\n  50% {\n    transform: translate(-50%, -50%) scale(1.5);\n    opacity: 1;\n  }\n  100% {\n    transform: translate(-50%, -50%) scale(1);\n    opacity: 0;\n  }\n}\n\n.posts-user-header__user-name {\n  font-size: 28px;\n  line-height: 35px;\n}\n.posts-user-header__user-image{\n  width: 70px;\n  height: 70px;\n  object-fit: cover;\n  border-radius: 40px;\n  margin-right: 10px;\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCLG1DQUFtQztBQUM3RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPLDZFQUE2RSxVQUFVLE1BQU0sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLFVBQVUsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLFdBQVcsWUFBWSxhQUFhLFdBQVcsT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxVQUFVLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLFdB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QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsbUNBQW1DO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxPQUFPLCtFQUErRSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksV0FBVyxVQUFVLFlBQVksT0FBTyxZQUFZLE1BQU0sVUFBVSxNQUFNLEtBQUssVUFBVSxNQUFNLE1BQU0sVUFBVSxZQUFZLFdBQVcsWUFBWSxhQUFhLGFBQWEsV0FBVyxVQUFVLE1BQU0sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLFdBQVcsVUFBVSxPQUFPLEtBQUssWUFBWSxPQUFPLE1BQU0sWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsVUFBVSxZQUFZLGFBQWEsV0FBVyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLFVBQVUsTUFBTSxLQUFLLFlBQVksT0FBTyxZQUFZLE1BQU0sWUFBWSxhQUFhLFdBQVcsVUFBVSxLQUFLLEtBQUssWUFBWSxhQUFhLFdBQVcsVUFBVSxZQUFZLGFBQWEsTUFBTSxLQUFLLFVBQVUsWUFBWSxNQUFNLEtBQUssVUFBVSxZQUFZLE1BQU0sS0FBSyxVQUFVLFlBQVksTUFBTSxLQUFLLEtBQUssVUFBVSxVQUFVLEtBQUssTUFBTSxVQUFVLFVBQVUsS0FBSyxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxZQUFZLGFBQWEsYUFBYSxXQUFXLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLFFBQVEsS0FBSyxVQUFVLFVBQVUsWUFBWSxXQUFXLFlBQVksV0FBVyxZQUFZLGFBQWEsYUFBYSxXQUFXLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFlBQVksYUFBYSxhQUFhLFdBQVcsVUFBVSxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLFFBQVEsS0FBSyxZQUFZLGFBQWEsYUFBYSxXQUFXLFVBQVUsWUFBWSxXQUFXLFVBQVUsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxXQUFXLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLEtBQUssS0FBSyxLQUFLLFlBQVksV0FBVyxLQUFLLEtBQUssWUFBWSxXQUFXLEtBQUssS0FB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O0FDVmdFOztBQUVoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDs7QUFFQSxPQUFPLHdFQUFlO0FBQ3RCO0FBQ0E7QUFDQSxHQUFHOztBQUVILFdBQVcsd0VBQWU7QUFDMUI7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSCxTQUFTLHdFQUFlO0FBQ3hCO0FBQ0E7QUFDQSxHQUFHOztB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QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTs7QUFFTztBQUNQOztBQUVBLE9BQU8sd0VBQWU7QUFDdEI7QUFDQTtBQUNBLEdBQUc7O0FBRUgsV0FBVyx3RUFBZTtBQUMxQjtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVILFNBQVMsd0VBQWU7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVILE9BQU8sd0VBQWU7QUFDdEI7QUFDQTtBQUNBLEdBQUc7O0FBRUgsYUFBYSx3RUFBZTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7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V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDLEk7Ozs7O1dDUEQsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdELEU7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esa0M7Ozs7O1dDbEJBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQSxvQjs7Ozs7V0NyQkEsbUM7Ozs7O1VFQUE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJkZXYtY3ctaW5zdGFwcm8vLi9hcGkuanMiLCJ3ZWJwYWNrOi8vd2ViZGV2LWN3LWluc3RhcHJvLy4vY29tcG9uZW50cy9hZGQtcG9zdC1wYWdlLWNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly93ZWJkZXYtY3ctaW5zdGFwcm8vLi9jb21wb25lbnRzL2F1dGgtcGFnZS1jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vd2ViZGV2LWN3LWluc3RhcHJvLy4vY29tcG9uZW50cy9oZWFkZXItY29tcG9uZW50LmpzIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby8uL2NvbXBvbmVudHMvbG9hZGluZy1wYWdlLWNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly93ZWJkZXYtY3ctaW5zdGFwcm8vLi9jb21wb25lbnRzL3Bvc3RzLXBhZ2UtY29tcG9uZW50LmpzIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby8uL2NvbXBvbmVudHMvdXBsb2FkLWltYWdlLWNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly93ZWJkZXYtY3ctaW5zdGFwcm8vLi9jb21wb25lbnRzL3VzZXItcG9zdHMtcGFnZS1jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vd2ViZGV2LWN3LWluc3RhcHJvLy4vaGVscGVycy5qcyIsIndlYnBhY2s6Ly93ZWJkZXYtY3ctaW5zdGFwcm8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly93ZWJkZXYtY3ctaW5zdGFwcm8vLi9zdHlsZXMuY3NzIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby8uL3VpLWtpdC5jc3MiLCJ3ZWJwYWNrOi8vd2ViZGV2LWN3LWluc3RhcHJvLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly93ZWJkZXYtY3ctaW5zdGFwcm8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9fbGliL2RlZmF1bHRPcHRpb25zLmpzIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9fbGliL2dldFJvdW5kaW5nTWV0aG9kLmpzIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9fbGliL2dldFRpbWV6b25lT2Zmc2V0SW5NaWxsaXNlY29uZHMuanMiLCJ3ZWJwYWNrOi8vd2ViZGV2LWN3LWluc3RhcHJvLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL19saWIvbm9ybWFsaXplRGF0ZXMuanMiLCJ3ZWJwYWNrOi8vd2ViZGV2LWN3LWluc3RhcHJvLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2NvbXBhcmVBc2MuanMiLCJ3ZWJwYWNrOi8vd2ViZGV2LWN3LWluc3RhcHJvLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly93ZWJkZXYtY3ctaW5zdGFwcm8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvY29uc3RydWN0RnJvbS5qcyIsIndlYnBhY2s6Ly93ZWJkZXYtY3ctaW5zdGFwcm8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvY29uc3RydWN0Tm93LmpzIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9kaWZmZXJlbmNlSW5DYWxlbmRhck1vbnRocy5qcyIsIndlYnBhY2s6Ly93ZWJkZXYtY3ctaW5zdGFwcm8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZGlmZmVyZW5jZUluTWlsbGlzZWNvbmRzLmpzIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9kaWZmZXJlbmNlSW5Nb250aHMuanMiLCJ3ZWJwYWNrOi8vd2ViZGV2LWN3LWluc3RhcHJvLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2RpZmZlcmVuY2VJblNlY29uZHMuanMiLCJ3ZWJwYWNrOi8vd2ViZGV2LWN3LWluc3RhcHJvLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VuZE9mRGF5LmpzIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lbmRPZk1vbnRoLmpzIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9mb3JtYXREaXN0YW5jZS5qcyIsIndlYnBhY2s6Ly93ZWJkZXYtY3ctaW5zdGFwcm8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZm9ybWF0RGlzdGFuY2VUb05vdy5qcyIsIndlYnBhY2s6Ly93ZWJkZXYtY3ctaW5zdGFwcm8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvaXNMYXN0RGF5T2ZNb250aC5qcyIsIndlYnBhY2s6Ly93ZWJkZXYtY3ctaW5zdGFwcm8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvaXNTYW1lV2Vlay5qcyIsIndlYnBhY2s6Ly93ZWJkZXYtY3ctaW5zdGFwcm8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvbG9jYWxlL19saWIvYnVpbGRGb3JtYXRMb25nRm4uanMiLCJ3ZWJwYWNrOi8vd2ViZGV2LWN3LWluc3RhcHJvLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2xvY2FsZS9fbGliL2J1aWxkTG9jYWxpemVGbi5qcyIsIndlYnBhY2s6Ly93ZWJkZXYtY3ctaW5zdGFwcm8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvbG9jYWxlL19saWIvYnVpbGRNYXRjaEZuLmpzIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sb2NhbGUvX2xpYi9idWlsZE1hdGNoUGF0dGVybkZuLmpzIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sb2NhbGUvZW4tVVMuanMiLCJ3ZWJwYWNrOi8vd2ViZGV2LWN3LWluc3RhcHJvLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2xvY2FsZS9lbi1VUy9fbGliL2Zvcm1hdERpc3RhbmNlLmpzIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sb2NhbGUvZW4tVVMvX2xpYi9mb3JtYXRMb25nLmpzIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sb2NhbGUvZW4tVVMvX2xpYi9mb3JtYXRSZWxhdGl2ZS5qcyIsIndlYnBhY2s6Ly93ZWJkZXYtY3ctaW5zdGFwcm8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvbG9jYWxlL2VuLVVTL19saWIvbG9jYWxpemUuanMiLCJ3ZWJwYWNrOi8vd2ViZGV2LWN3LWluc3RhcHJvLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2xvY2FsZS9lbi1VUy9fbGliL21hdGNoLmpzIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sb2NhbGUvcnUuanMiLCJ3ZWJwYWNrOi8vd2ViZGV2LWN3LWluc3RhcHJvLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2xvY2FsZS9ydS9fbGliL2Zvcm1hdERpc3RhbmNlLmpzIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sb2NhbGUvcnUvX2xpYi9mb3JtYXRMb25nLmpzIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sb2NhbGUvcnUvX2xpYi9mb3JtYXRSZWxhdGl2ZS5qcyIsIndlYnBhY2s6Ly93ZWJkZXYtY3ctaW5zdGFwcm8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvbG9jYWxlL3J1L19saWIvbG9jYWxpemUuanMiLCJ3ZWJwYWNrOi8vd2ViZGV2LWN3LWluc3RhcHJvLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2xvY2FsZS9ydS9fbGliL21hdGNoLmpzIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9zdGFydE9mV2Vlay5qcyIsIndlYnBhY2s6Ly93ZWJkZXYtY3ctaW5zdGFwcm8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvdG9EYXRlLmpzIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly93ZWJkZXYtY3ctaW5zdGFwcm8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly93ZWJkZXYtY3ctaW5zdGFwcm8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vd2ViZGV2LWN3LWluc3RhcHJvLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vd2ViZGV2LWN3LWluc3RhcHJvLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vd2ViZGV2LWN3LWluc3RhcHJvLy4vcm91dGVzLmpzIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby8uL3N0eWxlcy5jc3M/MTcwZiIsIndlYnBhY2s6Ly93ZWJkZXYtY3ctaW5zdGFwcm8vLi91aS1raXQuY3NzPzJhOTYiLCJ3ZWJwYWNrOi8vd2ViZGV2LWN3LWluc3RhcHJvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly93ZWJkZXYtY3ctaW5zdGFwcm8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly93ZWJkZXYtY3ctaW5zdGFwcm8vd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vd2ViZGV2LWN3LWluc3RhcHJvL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly93ZWJkZXYtY3ctaW5zdGFwcm8vd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly93ZWJkZXYtY3ctaW5zdGFwcm8vd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3dlYmRldi1jdy1pbnN0YXByby93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgcGVyc29uYWxLZXkgPSBcImRpYW5hMTIzdGVzdFwiO1xuY29uc3QgYXBpQmFzZSA9IFwiaHR0cHM6Ly93ZWRldi1hcGkuc2t5LnByby9hcGlcIjtcbmNvbnN0IGJhc2VIb3N0ID0gYCR7YXBpQmFzZX0vdjFgO1xuY29uc3QgcG9zdHNIb3N0ID0gYCR7YmFzZUhvc3R9LyR7cGVyc29uYWxLZXl9L2luc3RhcHJvYDtcbmNvbnN0IHVzZXJIb3N0ID0gXCJodHRwczovL3dlZGV2LWFwaS5za3kucHJvL2FwaS91c2VyXCI7XG5cblxuLy/Qn9C+0LvRg9GH0LXQvdC40LUg0L/QvtGB0YLQvtCyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UG9zdHMoKSB7XG4gIHJldHVybiBmZXRjaChwb3N0c0hvc3QsIHsgbWV0aG9kOiBcIkdFVFwiIH0pXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgLnRoZW4oKGRhdGEpID0+IGRhdGEucG9zdHMpO1xufVxuXG4vL9CS0YXQvtC0INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRj1xuZXhwb3J0IGZ1bmN0aW9uIGxvZ2luVXNlcih7IGxvZ2luLCBwYXNzd29yZCB9KSB7XG4gIGNvbnNvbGUubG9nKFwiTG9naW4gZGF0YTogXCIsIHsgbG9naW4sIHBhc3N3b3JkIH0pO1xuXG4gIHJldHVybiBmZXRjaChgJHt1c2VySG9zdH0vbG9naW5gLCB7XG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAvLyDQo9Cx0LjRgNCw0LXQvCBoZWFkZXJzINC/0L7Qu9C90L7RgdGC0YzRjlxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgbG9naW4sIHBhc3N3b3JkIH0pLFxuICB9KVxuICAudGhlbihhc3luYyAocmVzcG9uc2UpID0+IHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpLmNhdGNoKCgpID0+IG51bGwpO1xuXG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgY29uc29sZS5lcnJvcihcIkxvZ2luIGZhaWxlZDpcIiwgZGF0YSk7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCLQndC10LLQtdGA0L3Ri9C5INC70L7Qs9C40L0g0LjQu9C4INC/0LDRgNC+0LvRjFwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTsgLy8geyB1c2VyOiB7Li4ufSB9XG4gIH0pO1xufVxuXG4vL9Cg0LXQs9C40YHRgtGA0LDRhtC40Y8g0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GPXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJVc2VyKHsgbG9naW4sIHBhc3N3b3JkLCBuYW1lIH0pIHtcbiAgcmV0dXJuIGZldGNoKHVzZXJIb3N0LCB7XG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGxvZ2luLCBwYXNzd29yZCwgbmFtZSB9KSxcbiAgfSkudGhlbihhc3luYyAocmVzcG9uc2UpID0+IHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpLmNhdGNoKCgpID0+IG51bGwpO1xuXG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcItCi0LDQutC+0Lkg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GMINGD0LbQtSDRgdGD0YnQtdGB0YLQstGD0LXRglwiKTtcbiAgICAgIH1cbiAgICAgIHRocm93IG5ldyBFcnJvcihcItCe0YjQuNCx0LrQsCDQv9GA0Lgg0YDQtdCz0LjRgdGC0YDQsNGG0LjQuFwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTsgLy8geyB1c2VyOiB7IC4uLiB9IH1cbiAgfSk7XG59XG5cbi8v0JfQsNCz0YDRg9C30LrQsCDQuNC30L7QsdGA0LDQttC10L3QuNGPXG5leHBvcnQgZnVuY3Rpb24gdXBsb2FkSW1hZ2UoeyBmaWxlIH0pIHtcbiAgY29uc3QgZGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICBkYXRhLmFwcGVuZChcImZpbGVcIiwgZmlsZSk7XG5cbiAgcmV0dXJuIGZldGNoKFwiaHR0cHM6Ly93ZWRldi1hcGkuc2t5LnByby9hcGkvdXBsb2FkL2ltYWdlXCIsIHtcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIGJvZHk6IGRhdGEsXG4gIH0pXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwi0J7RgtCy0LXRgiBBUEkg0L/RgNC4INC30LDQs9GA0YPQt9C60LUg0LrQsNGA0YLQuNC90LrQuDpcIiwgZGF0YSk7XG4gICAgICByZXR1cm4geyBmaWxlVXJsOiBkYXRhLmZpbGVVcmwgfTtcbiAgICB9KTtcbn1cblxuXG5cbi8v0JTQvtCx0LDQstC70LXQvdC40LUg0L/QvtGB0YLQsFxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFBvc3QoeyBkZXNjcmlwdGlvbiwgaW1hZ2VVcmwsIHRva2VuIH0pIHtcbiAgY29uc3QgYm9keSA9IHsgZGVzY3JpcHRpb24sIGltYWdlVXJsIH07XG5cbiAgY29uc29sZS5sb2coXCLwn5OmINCk0L7RgNC80LjRgNGD0LXQvCBKU09OINC00LvRjyDQtNC+0LHQsNCy0LvQtdC90LjRjyDQv9C+0YHRgtCwOlwiLCBib2R5KTtcblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHBvc3RzSG9zdCwge1xuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgaGVhZGVyczoge1xuICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3Rva2VufWAsXG4gICAgfSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShib2R5KSxcbiAgfSk7XG5cbiAgY29uc3QgdGV4dCA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgY29uc29sZS5sb2coXCLwn5OpINCe0YLQstC10YIg0YHQtdGA0LLQtdGA0LA6XCIsIHRleHQpO1xuXG4gIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICBjb25zb2xlLmVycm9yKFwi4p2MINCe0YjQuNCx0LrQsCDQv9GA0Lgg0LTQvtCx0LDQstC70LXQvdC40Lgg0L/QvtGB0YLQsDpcIiwgdGV4dCk7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwi0J7RiNC40LHQutCwINC/0YDQuCDQtNC+0LHQsNCy0LvQtdC90LjQuCDQv9C+0YHRgtCwXCIpO1xuICB9XG5cbiAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UodGV4dCk7XG4gIGNvbnNvbGUubG9nKFwi4pyFIFBhcnNlZCByZXNwb25zZTpcIiwgZGF0YSk7XG4gIHJldHVybiBkYXRhO1xufVxuXG4vL9Cf0L7RgdGC0LDQstC40YLRjCDQu9Cw0LnQulxuZXhwb3J0IGZ1bmN0aW9uIGxpa2VQb3N0KHsgcG9zdElkLCB0b2tlbiB9KSB7XG4gIHJldHVybiBmZXRjaChgJHtwb3N0c0hvc3R9LyR7cG9zdElkfS9saWtlYCwge1xuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgaGVhZGVyczoge1xuICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3Rva2VufWAsXG4gICAgfSxcbiAgfSkudGhlbigocmVzKSA9PiByZXMuanNvbigpKTtcbn1cblxuLy/Qo9Cx0YDQsNGC0Ywg0LvQsNC50LpcbmV4cG9ydCBmdW5jdGlvbiB1bmxpa2VQb3N0KHsgcG9zdElkLCB0b2tlbiB9KSB7XG4gIHJldHVybiBmZXRjaChgJHtwb3N0c0hvc3R9LyR7cG9zdElkfS9kaXNsaWtlYCwgeyAgXG4gICAgbWV0aG9kOiBcIlBPU1RcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICBoZWFkZXJzOiB7XG4gICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dG9rZW59YCxcbiAgICB9LFxuICB9KS50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpO1xufVxuXG4vL9Cj0LTQsNC70LjRgtGMINC/0L7RgdGCXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlUG9zdCh7IHBvc3RJZCwgdG9rZW4gfSkge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke3Bvc3RzSG9zdH0vJHtwb3N0SWR9YCwge1xuICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICBoZWFkZXJzOiB7IEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gIH0sXG4gIH0pO1xuXG4gIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cbiAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgIGNvbnNvbGUuZXJyb3IoXCLQntGI0LjQsdC60LAg0L/RgNC4INGD0LTQsNC70LXQvdC40Lgg0L/QvtGB0YLQsDpcIiwgZGF0YSk7XG4gICAgdGhyb3cgbmV3IEVycm9yKGRhdGEubWVzc2FnZSB8fCBcItCe0YjQuNCx0LrQsCDQv9GA0Lgg0YPQtNCw0LvQtdC90LjQuCDQv9C+0YHRgtCwXCIpO1xuICB9XG5cbiAgcmV0dXJuIGRhdGE7XG59XG4vL9Cf0L7Qu9GD0YfQuNGC0Ywg0L/QvtGB0YLRiyDQutC+0L3QutGA0LXRgtC90L7Qs9C+INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRj1xuZXhwb3J0IGZ1bmN0aW9uIGdldFVzZXJQb3N0cyh7IHVzZXJJZCwgdG9rZW4gfSkge1xuICByZXR1cm4gZmV0Y2goYCR7cG9zdHNIb3N0fS91c2VyLXBvc3RzLyR7dXNlcklkfWAsIHtcbiAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgaGVhZGVyczogdG9rZW4gPyB7IEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gIH0gOiB7fSxcbiAgfSlcbiAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcbiAgLnRoZW4oKGRhdGEpID0+IGRhdGEucG9zdHMpO1xufVxuXG5cblxuXG4iLCJpbXBvcnQgeyBnZXRUb2tlbiwgZ29Ub1BhZ2UsIFBPU1RTX1BBR0UgfSBmcm9tIFwiLi4vaW5kZXguanNcIjtcbmltcG9ydCB7IHJlbmRlclVwbG9hZEltYWdlQ29tcG9uZW50IH0gZnJvbSBcIi4vdXBsb2FkLWltYWdlLWNvbXBvbmVudC5qc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyQWRkUG9zdFBhZ2VDb21wb25lbnQoeyBhcHBFbCwgb25BZGRQb3N0Q2xpY2sgfSkge1xuICBhcHBFbC5pbm5lckhUTUwgPSBgXG4gICAgPGRpdiBjbGFzcz1cImFkZC1oZWFkZXItY29udGFpbmVyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwicGFnZS1oZWFkZXJcIj5cbiAgICAgICAgPGgxIGNsYXNzPVwibG9nb1wiPmluc3RhcHJvPC9oMT5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImhlYWRlci1idXR0b24gYWRkLW9yLWxvZ2luLWJ1dHRvblwiPlxuICAgICAgICAgIDxkaXYgdGl0bGU9XCLQlNC+0LHQsNCy0LjRgtGMINC/0L7RgdGCXCIgY2xhc3M9XCJhZGQtcG9zdC1zaWduXCI+PC9kaXY+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIHRpdGxlPVwiRGlhbmFcIiBjbGFzcz1cImhlYWRlci1idXR0b24gbG9nb3V0LWJ1dHRvblwiPtCS0YvQudGC0Lg8L2J1dHRvbj4gIFxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInBhZ2UtY29udGFpbmVyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiZm9ybVwiPlxuICAgICAgICA8aDMgY2xhc3M9XCJmb3JtLXRpdGxlXCI+0JTQvtCx0LDQstC40YLRjCDQv9C+0YHRgjwvaDM+XG4gICAgICAgIDxmb3JtIGlkPVwiYWRkLXBvc3QtZm9ybVwiIGNsYXNzPVwiZm9ybS1pbnB1dHNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidXBsb2FkLWltYWdlLWNvbnRhaW5lclwiPjwvZGl2PlxuICAgICAgICAgIFxuICAgICAgICAgIDxsYWJlbD5cbiAgICAgICAgICAgINCe0L/QuNGI0LjRgtC1INGE0L7RgtC+0LPRgNCw0YTQuNGOOlxuICAgICAgICAgICAgPHRleHRhcmVhIGlkPVwiZGVzY3JpcHRpb24taW5wdXRcIiBjbGFzcz1cImlucHV0IHRleHRhcmVhXCIgcm93cz1cIjRcIiBcIiByZXF1aXJlZD48L3RleHRhcmVhPlxuICAgICAgICAgIDwvbGFiZWw+XG5cbiAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImJ1dHRvbiBidXR0b24tLWxhcmdlXCIgaWQ9XCJhZGQtYnV0dG9uXCI+0JTQvtCx0LDQstC40YLRjDwvYnV0dG9uPlxuICAgICAgICA8L2Zvcm0+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYDtcblxuICAvLyDQoNC10L3QtNC10YDQuNC8INC60L7QvNC/0L7QvdC10L3RgiDQt9Cw0LPRgNGD0LfQutC4INC40LfQvtCx0YDQsNC20LXQvdC40Y9cbiAgbGV0IGN1cnJlbnRJbWFnZVVybCA9IFwiXCI7XG4gIGNvbnN0IHVwbG9hZENvbnRhaW5lciA9IGFwcEVsLnF1ZXJ5U2VsZWN0b3IoXCIudXBsb2FkLWltYWdlLWNvbnRhaW5lclwiKTtcbiAgcmVuZGVyVXBsb2FkSW1hZ2VDb21wb25lbnQoe1xuICAgIGVsZW1lbnQ6IHVwbG9hZENvbnRhaW5lcixcbiAgICBvbkltYWdlVXJsQ2hhbmdlOiAodXJsKSA9PiB7XG4gICAgICBjdXJyZW50SW1hZ2VVcmwgPSB1cmw7XG4gICAgfSxcbiAgfSk7XG5cbiAgLy8g0J7QsdGA0LDQsdC+0YLQutCwINC+0YLQv9GA0LDQstC60Lgg0YTQvtGA0LzRi1xuICBjb25zdCBmb3JtRWwgPSBhcHBFbC5xdWVyeVNlbGVjdG9yKFwiI2FkZC1wb3N0LWZvcm1cIik7XG4gIGZvcm1FbC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGFzeW5jIChldmVudCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVzY3JpcHRpb24taW5wdXRcIikudmFsdWUudHJpbSgpO1xuXG4gICAgaWYgKCFkZXNjcmlwdGlvbikge1xuICAgICAgYWxlcnQoXCLQntC/0LjRgdCw0L3QuNC1INC90LUg0LzQvtC20LXRgiDQsdGL0YLRjCDQv9GD0YHRgtGL0LxcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFjdXJyZW50SW1hZ2VVcmwpIHtcbiAgICAgIGFsZXJ0KFwi0JLRi9Cx0LXRgNC40YLQtSDRhNC+0YLQviDQtNC70Y8g0LfQsNCz0YDRg9C30LrQuFwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyDQn9C10YDQtdC00LDQtdC8INC00LDQvdC90YvQtSDQsiDQutC+0LvQsdGN0LosINGH0YLQvtCx0YsgaW5kZXguanMg0LTQvtCx0LDQstC40Lsg0L/QvtGB0YJcbiAgICBvbkFkZFBvc3RDbGljayAmJiBvbkFkZFBvc3RDbGljayh7IGRlc2NyaXB0aW9uLCBpbWFnZVVybDogY3VycmVudEltYWdlVXJsIH0pO1xuICB9KTtcblxuICAvLyDQn9C10YDQtdGF0L7QtCDQvdCwINCz0LvQsNCy0L3Rg9GOINGB0YLRgNCw0L3QuNGG0YMg0L/RgNC4INC60LvQuNC60LUg0L3QsCDQu9C+0LPQvtGC0LjQv1xuICBjb25zdCBsb2dvRWwgPSBhcHBFbC5xdWVyeVNlbGVjdG9yKFwiLmxvZ29cIik7XG4gIGxvZ29FbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGdvVG9QYWdlKFBPU1RTX1BBR0UpO1xuICB9KTtcbn1cbiIsImltcG9ydCB7IGxvZ2luVXNlciwgcmVnaXN0ZXJVc2VyIH0gZnJvbSBcIi4uL2FwaS5qc1wiO1xuaW1wb3J0IHsgcmVuZGVySGVhZGVyQ29tcG9uZW50IH0gZnJvbSBcIi4vaGVhZGVyLWNvbXBvbmVudC5qc1wiO1xuaW1wb3J0IHsgcmVuZGVyVXBsb2FkSW1hZ2VDb21wb25lbnQgfSBmcm9tIFwiLi91cGxvYWQtaW1hZ2UtY29tcG9uZW50LmpzXCI7XG5cbi8qKlxuICog0JrQvtC80L/QvtC90LXQvdGCINGB0YLRgNCw0L3QuNGG0Ysg0LDQstGC0L7RgNC40LfQsNGG0LjQuC5cbiAqINCt0YLQvtGCINC60L7QvNC/0L7QvdC10L3RgiDQv9GA0LXQtNC+0YHRgtCw0LLQu9GP0LXRgiDQv9C+0LvRjNC30L7QstCw0YLQtdC70Y4g0LjQvdGC0LXRgNGE0LXQudGBINC00LvRjyDQstGF0L7QtNCwINCyINGB0LjRgdGC0LXQvNGDINC40LvQuCDRgNC10LPQuNGB0YLRgNCw0YbQuNC4LlxuICog0KTQvtGA0LzQsCDQv9C10YDQtdC60LvRjtGH0LDQtdGC0YHRjyDQvNC10LbQtNGDINGA0LXQttC40LzQsNC80LggXCLQktGF0L7QtFwiINC4IFwi0KDQtdCz0LjRgdGC0YDQsNGG0LjRj1wiLlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHBhcmFtcy5hcHBFbCAtINCa0L7RgNC90LXQstC+0Lkg0Y3Qu9C10LzQtdC90YIg0L/RgNC40LvQvtC20LXQvdC40Y8sINCyINC60L7RgtC+0YDRi9C5INCx0YPQtNC10YIg0YDQtdC90LTQtdGA0LjRgtGM0YHRjyDRgdGC0YDQsNC90LjRhtCwLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcGFyYW1zLnNldFVzZXIgLSDQpNGD0L3QutGG0LjRjywg0LLRi9C30YvQstCw0LXQvNCw0Y8g0L/RgNC4INGD0YHQv9C10YjQvdC+0Lkg0LDQstGC0L7RgNC40LfQsNGG0LjQuCDQuNC70Lgg0YDQtdCz0LjRgdGC0YDQsNGG0LjQuC5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg0J/RgNC40L3QuNC80LDQtdGCINC+0LHRitC10LrRgiDQv9C+0LvRjNC30L7QstCw0YLQtdC70Y8g0LIg0LrQsNGH0LXRgdGC0LLQtSDQsNGA0LPRg9C80LXQvdGC0LAuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJBdXRoUGFnZUNvbXBvbmVudCh7IGFwcEVsLCBzZXRVc2VyIH0pIHtcbiAgLyoqXG4gICAqINCk0LvQsNCzLCDRg9C60LDQt9GL0LLQsNGO0YnQuNC5INGC0LXQutGD0YnQuNC5INGA0LXQttC40Lwg0YTQvtGA0LzRiy5cbiAgICog0JXRgdC70LggYHRydWVgLCDRhNC+0YDQvNCwINC90LDRhdC+0LTQuNGC0YHRjyDQsiDRgNC10LbQuNC80LUg0LLRhdC+0LTQsC4g0JXRgdC70LggYGZhbHNlYCwg0LIg0YDQtdC20LjQvNC1INGA0LXQs9C40YHRgtGA0LDRhtC40LguXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKi9cbiAgbGV0IGlzTG9naW5Nb2RlID0gdHJ1ZTtcblxuICAvKipcbiAgICogVVJMINC40LfQvtCx0YDQsNC20LXQvdC40Y8sINC30LDQs9GA0YPQttC10L3QvdC+0LPQviDQv9C+0LvRjNC30L7QstCw0YLQtdC70LXQvCDQv9GA0Lgg0YDQtdCz0LjRgdGC0YDQsNGG0LjQuC5cbiAgICog0JjRgdC/0L7Qu9GM0LfRg9C10YLRgdGPINGC0L7Qu9GM0LrQviDQsiDRgNC10LbQuNC80LUg0YDQtdCz0LjRgdGC0YDQsNGG0LjQuC5cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIGxldCBpbWFnZVVybCA9IFwiXCI7XG5cbiAgLyoqXG4gICAqINCg0LXQvdC00LXRgNC40YIg0YTQvtGA0LzRgyDQsNCy0YLQvtGA0LjQt9Cw0YbQuNC4INC40LvQuCDRgNC10LPQuNGB0YLRgNCw0YbQuNC4LlxuICAgKiDQkiDQt9Cw0LLQuNGB0LjQvNC+0YHRgtC4INC+0YIg0LfQvdCw0YfQtdC90LjRjyBgaXNMb2dpbk1vZGVgINC+0YLQvtCx0YDQsNC20LDQtdGCINGB0L7QvtGC0LLQtdGC0YHRgtCy0YPRjtGJ0LjQuSDQuNC90YLQtdGA0YTQtdC50YEuXG4gICAqL1xuICBjb25zdCByZW5kZXJGb3JtID0gKCkgPT4ge1xuICAgIGNvbnN0IGFwcEh0bWwgPSBgXG4gICAgICA8ZGl2IGNsYXNzPVwicGFnZS1jb250YWluZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLWNvbnRhaW5lclwiPjwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtXCI+XG4gICAgICAgICAgICAgIDxoMyBjbGFzcz1cImZvcm0tdGl0bGVcIj5cbiAgICAgICAgICAgICAgICAke1xuICAgICAgICAgICAgICAgICAgaXNMb2dpbk1vZGVcbiAgICAgICAgICAgICAgICAgICAgPyBcItCS0YXQvtC0INCyJm5ic3A7SW5zdGFwcm9cIlxuICAgICAgICAgICAgICAgICAgICA6IFwi0KDQtdCz0LjRgdGC0YDQsNGG0LjRjyDQsiZuYnNwO0luc3RhcHJvXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWlucHV0c1wiPlxuICAgICAgICAgICAgICAgICAgJHtcbiAgICAgICAgICAgICAgICAgICAgIWlzTG9naW5Nb2RlXG4gICAgICAgICAgICAgICAgICAgICAgPyBgXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVwbG9hZC1pbWFnZS1jb250YWluZXJcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cIm5hbWUtaW5wdXRcIiBjbGFzcz1cImlucHV0XCIgcGxhY2Vob2xkZXI9XCLQmNC80Y9cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIGBcbiAgICAgICAgICAgICAgICAgICAgICA6IFwiXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwibG9naW4taW5wdXRcIiBjbGFzcz1cImlucHV0XCIgcGxhY2Vob2xkZXI9XCLQm9C+0LPQuNC9XCIgLz5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicGFzc3dvcmRcIiBpZD1cInBhc3N3b3JkLWlucHV0XCIgY2xhc3M9XCJpbnB1dFwiIHBsYWNlaG9sZGVyPVwi0J/QsNGA0L7Qu9GMXCIgLz5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWVycm9yXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uXCIgaWQ9XCJsb2dpbi1idXR0b25cIj4ke1xuICAgICAgICAgICAgICAgICAgICBpc0xvZ2luTW9kZSA/IFwi0JLQvtC50YLQuFwiIDogXCLQl9Cw0YDQtdCz0LjRgdGC0YDQuNGA0L7QstCw0YLRjNGB0Y9cIlxuICAgICAgICAgICAgICAgICAgfTwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZm9vdGVyXCI+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJmb3JtLWZvb3Rlci10aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgJHtpc0xvZ2luTW9kZSA/IFwi0J3QtdGCINCw0LrQutCw0YPQvdGC0LA/XCIgOiBcItCj0LbQtSDQtdGB0YLRjCDQsNC60LrQsNGD0L3Rgj9cIn1cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJsaW5rLWJ1dHRvblwiIGlkPVwidG9nZ2xlLWJ1dHRvblwiPlxuICAgICAgICAgICAgICAgICAgICAke2lzTG9naW5Nb2RlID8gXCLQl9Cw0YDQtdCz0LjRgdGC0YDQuNGA0L7QstCw0YLRjNGB0Y8uXCIgOiBcItCS0L7QudGC0LguXCJ9XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+ICAgIFxuICAgIGA7XG5cbiAgICBhcHBFbC5pbm5lckhUTUwgPSBhcHBIdG1sO1xuXG4gICAgLyoqXG4gICAgICog0KPRgdGC0LDQvdCw0LLQu9C40LLQsNC10YIg0YHQvtC+0LHRidC10L3QuNC1INC+0LEg0L7RiNC40LHQutC1INCyINGE0L7RgNC80LUuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSDQotC10LrRgdGCINGB0L7QvtCx0YnQtdC90LjRjyDQvtCxINC+0YjQuNCx0LrQtS5cbiAgICAgKi9cbiAgICBjb25zdCBzZXRFcnJvciA9IChtZXNzYWdlKSA9PiB7XG4gICAgICBhcHBFbC5xdWVyeVNlbGVjdG9yKFwiLmZvcm0tZXJyb3JcIikudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xuICAgIH07XG5cbiAgICAvLyDQoNC10L3QtNC10YDQuNC8INC30LDQs9C+0LvQvtCy0L7QuiDRgdGC0YDQsNC90LjRhtGLXG4gICAgcmVuZGVySGVhZGVyQ29tcG9uZW50KHtcbiAgICAgIGVsZW1lbnQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVhZGVyLWNvbnRhaW5lclwiKSxcbiAgICB9KTtcblxuICAgIC8vINCV0YHQu9C4INGA0LXQttC40Lwg0YDQtdCz0LjRgdGC0YDQsNGG0LjQuCwg0YDQtdC90LTQtdGA0LjQvCDQutC+0LzQv9C+0L3QtdC90YIg0LfQsNCz0YDRg9C30LrQuCDQuNC30L7QsdGA0LDQttC10L3QuNGPXG4gICAgY29uc3QgdXBsb2FkSW1hZ2VDb250YWluZXIgPSBhcHBFbC5xdWVyeVNlbGVjdG9yKFwiLnVwbG9hZC1pbWFnZS1jb250YWluZXJcIik7XG4gICAgaWYgKHVwbG9hZEltYWdlQ29udGFpbmVyKSB7XG4gICAgICByZW5kZXJVcGxvYWRJbWFnZUNvbXBvbmVudCh7XG4gICAgICAgIGVsZW1lbnQ6IHVwbG9hZEltYWdlQ29udGFpbmVyLFxuICAgICAgICBvbkltYWdlVXJsQ2hhbmdlKG5ld0ltYWdlVXJsKSB7XG4gICAgICAgICAgaW1hZ2VVcmwgPSBuZXdJbWFnZVVybDtcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vINCe0LHRgNCw0LHQvtGC0LrQsCDQutC70LjQutCwINC90LAg0LrQvdC+0L/QutGDINCy0YXQvtC00LAv0YDQtdCz0LjRgdGC0YDQsNGG0LjQuFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9naW4tYnV0dG9uXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBzZXRFcnJvcihcIlwiKTtcblxuICAgICAgaWYgKGlzTG9naW5Nb2RlKSB7XG4gICAgICAgIC8vINCe0LHRgNCw0LHQvtGC0LrQsCDQstGF0L7QtNCwXG4gICAgICAgIGNvbnN0IGxvZ2luID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dpbi1pbnB1dFwiKS52YWx1ZTtcbiAgICAgICAgY29uc3QgcGFzc3dvcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBhc3N3b3JkLWlucHV0XCIpLnZhbHVlO1xuXG4gICAgICAgIGlmICghbG9naW4pIHtcbiAgICAgICAgICBhbGVydChcItCS0LLQtdC00LjRgtC1INC70L7Qs9C40L1cIik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFwYXNzd29yZCkge1xuICAgICAgICAgIGFsZXJ0KFwi0JLQstC10LTQuNGC0LUg0L/QsNGA0L7Qu9GMXCIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxvZ2luVXNlcih7IGxvZ2luLCBwYXNzd29yZCB9KVxuICAgICAgICAgIC50aGVuKCh1c2VyKSA9PiB7XG4gICAgICAgICAgICBzZXRVc2VyKHVzZXIudXNlcik7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oZXJyb3IpO1xuICAgICAgICAgICAgc2V0RXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyDQntCx0YDQsNCx0L7RgtC60LAg0YDQtdCz0LjRgdGC0YDQsNGG0LjQuFxuICAgICAgICBjb25zdCBsb2dpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9naW4taW5wdXRcIikudmFsdWU7XG4gICAgICAgIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hbWUtaW5wdXRcIikudmFsdWU7XG4gICAgICAgIGNvbnN0IHBhc3N3b3JkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwYXNzd29yZC1pbnB1dFwiKS52YWx1ZTtcblxuICAgICAgICBpZiAoIW5hbWUpIHtcbiAgICAgICAgICBhbGVydChcItCS0LLQtdC00LjRgtC1INC40LzRj1wiKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWxvZ2luKSB7XG4gICAgICAgICAgYWxlcnQoXCLQktCy0LXQtNC40YLQtSDQu9C+0LPQuNC9XCIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghcGFzc3dvcmQpIHtcbiAgICAgICAgICBhbGVydChcItCS0LLQtdC00LjRgtC1INC/0LDRgNC+0LvRjFwiKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWltYWdlVXJsKSB7XG4gICAgICAgICAgYWxlcnQoXCLQndC1INCy0YvQsdGA0LDQvdCwINGE0L7RgtC+0LPRgNCw0YTQuNGPXCIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZ2lzdGVyVXNlcih7IGxvZ2luLCBwYXNzd29yZCwgbmFtZSwgaW1hZ2VVcmwgfSlcbiAgICAgICAgICAudGhlbigodXNlcikgPT4ge1xuICAgICAgICAgICAgc2V0VXNlcih1c2VyLnVzZXIpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGVycm9yKTtcbiAgICAgICAgICAgIHNldEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8g0J7QsdGA0LDQsdC+0YLQutCwINC/0LXRgNC10LrQu9GO0YfQtdC90LjRjyDRgNC10LbQuNC80LAgKNCy0YXQvtC0IOKGlCDRgNC10LPQuNGB0YLRgNCw0YbQuNGPKVxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9nZ2xlLWJ1dHRvblwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgaXNMb2dpbk1vZGUgPSAhaXNMb2dpbk1vZGU7XG4gICAgICByZW5kZXJGb3JtKCk7IC8vINCf0LXRgNC10YDQuNGB0L7QstGL0LLQsNC10Lwg0YTQvtGA0LzRgyDRgSDQvdC+0LLRi9C8INGA0LXQttC40LzQvtC8XG4gICAgfSk7XG4gIH07XG5cbiAgLy8g0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0YTQvtGA0LzRi1xuICByZW5kZXJGb3JtKCk7XG59XG4iLCJpbXBvcnQgeyBnb1RvUGFnZSwgbG9nb3V0LCB1c2VyIH0gZnJvbSBcIi4uL2luZGV4LmpzXCI7XG5pbXBvcnQgeyBBRERfUE9TVFNfUEFHRSwgQVVUSF9QQUdFLCBQT1NUU19QQUdFIH0gZnJvbSBcIi4uL3JvdXRlcy5qc1wiO1xuXG4vKipcbiAqINCa0L7QvNC/0L7QvdC10L3RgiDQt9Cw0LPQvtC70L7QstC60LAg0YHRgtGA0LDQvdC40YbRiy5cbiAqINCt0YLQvtGCINC60L7QvNC/0L7QvdC10L3RgiDQvtGC0L7QsdGA0LDQttCw0LXRgiDRiNCw0L/QutGDINGB0YLRgNCw0L3QuNGG0Ysg0YEg0LvQvtCz0L7RgtC40L/QvtC8LCDQutC90L7Qv9C60L7QuSDQtNC+0LHQsNCy0LvQtdC90LjRjyDQv9C+0YHRgtC+0LIv0LLRhdC+0LTQsCDQuCDQutC90L7Qv9C60L7QuSDQstGL0YXQvtC00LAgKNC10YHQu9C4INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjCDQsNCy0YLQvtGA0LjQt9C+0LLQsNC9KS5cbiAqIFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcGFyYW1zLmVsZW1lbnQgLSBIVE1MLdGN0LvQtdC80LXQvdGCLCDQsiDQutC+0YLQvtGA0YvQuSDQsdGD0LTQtdGCINGA0LXQvdC00LXRgNC40YLRjNGB0Y8g0LfQsNCz0L7Qu9C+0LLQvtC6LlxuICogQHJldHVybnMge0hUTUxFbGVtZW50fSDQktC+0LfQstGA0LDRidCw0LXRgiDRjdC70LXQvNC10L3RgiDQt9Cw0LPQvtC70L7QstC60LAg0L/QvtGB0LvQtSDRgNC10L3QtNC10YDQuNC90LPQsC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckhlYWRlckNvbXBvbmVudCh7IGVsZW1lbnQgfSkge1xuICAvKipcbiAgICog0KDQtdC90LTQtdGA0LjRgiDRgdC+0LTQtdGA0LbQuNC80L7QtSDQt9Cw0LPQvtC70L7QstC60LAuXG4gICAqL1xuICBlbGVtZW50LmlubmVySFRNTCA9IGBcbiAgPGRpdiBjbGFzcz1cInBhZ2UtaGVhZGVyXCI+XG4gICAgICA8aDEgY2xhc3M9XCJsb2dvXCI+aW5zdGFwcm88L2gxPlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImhlYWRlci1idXR0b24gYWRkLW9yLWxvZ2luLWJ1dHRvblwiPlxuICAgICAgJHtcbiAgICAgICAgdXNlclxuICAgICAgICAgID8gYDxkaXYgdGl0bGU9XCLQlNC+0LHQsNCy0LjRgtGMINC/0L7RgdGCXCIgY2xhc3M9XCJhZGQtcG9zdC1zaWduXCI+PC9kaXY+YFxuICAgICAgICAgIDogXCLQktC+0LnRgtC4XCJcbiAgICAgIH1cbiAgICAgIDwvYnV0dG9uPlxuICAgICAgJHtcbiAgICAgICAgdXNlclxuICAgICAgICAgID8gYDxidXR0b24gdGl0bGU9XCIke3VzZXIubmFtZX1cIiBjbGFzcz1cImhlYWRlci1idXR0b24gbG9nb3V0LWJ1dHRvblwiPtCS0YvQudGC0Lg8L2J1dHRvbj5gXG4gICAgICAgICAgOiBcIlwiXG4gICAgICB9ICBcbiAgPC9kaXY+XG4gIGA7XG5cbiAgLyoqXG4gICAqINCe0LHRgNCw0LHQvtGC0YfQuNC6INC60LvQuNC60LAg0L/QviDQutC90L7Qv9C60LUgXCLQlNC+0LHQsNCy0LjRgtGMINC/0L7RgdGCXCIvXCLQktC+0LnRgtC4XCIuXG4gICAqINCV0YHQu9C4INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjCDQsNCy0YLQvtGA0LjQt9C+0LLQsNC9LCDQv9C10YDQtdC90LDQv9GA0LDQstC70Y/QtdGCINC90LAg0YHRgtGA0LDQvdC40YbRgyDQtNC+0LHQsNCy0LvQtdC90LjRjyDQv9C+0YHRgtC+0LIuXG4gICAqINCV0YHQu9C4INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjCDQvdC1INCw0LLRgtC+0YDQuNC30L7QstCw0L0sINC/0LXRgNC10L3QsNC/0YDQsNCy0LvRj9C10YIg0L3QsCDRgdGC0YDQsNC90LjRhtGDINCw0LLRgtC+0YDQuNC30LDRhtC40LguXG4gICAqL1xuICBlbGVtZW50XG4gICAgLnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLW9yLWxvZ2luLWJ1dHRvblwiKVxuICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgZ29Ub1BhZ2UoQUREX1BPU1RTX1BBR0UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ29Ub1BhZ2UoQVVUSF9QQUdFKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAvKipcbiAgICog0J7QsdGA0LDQsdC+0YLRh9C40Log0LrQu9C40LrQsCDQv9C+INC70L7Qs9C+0YLQuNC/0YMuXG4gICAqINCf0LXRgNC10L3QsNC/0YDQsNCy0LvRj9C10YIg0L3QsCDRgdGC0YDQsNC90LjRhtGDINGBINC/0L7RgdGC0LDQvNC4LlxuICAgKi9cbiAgZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmxvZ29cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBnb1RvUGFnZShQT1NUU19QQUdFKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqINCe0LHRgNCw0LHQvtGC0YfQuNC6INC60LvQuNC60LAg0L/QviDQutC90L7Qv9C60LUgXCLQktGL0LnRgtC4XCIuXG4gICAqINCV0YHQu9C4INC60L3QvtC/0LrQsCDRgdGD0YnQtdGB0YLQstGD0LXRgiAo0YIu0LUuINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjCDQsNCy0YLQvtGA0LjQt9C+0LLQsNC9KSwg0LLRi9C30YvQstCw0LXRgiDRhNGD0L3QutGG0LjRjiBgbG9nb3V0YC5cbiAgICovXG4gIGVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5sb2dvdXQtYnV0dG9uXCIpPy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbG9nb3V0KTtcblxuICByZXR1cm4gZWxlbWVudDtcbn1cbiIsImltcG9ydCB7IHJlbmRlckhlYWRlckNvbXBvbmVudCB9IGZyb20gXCIuL2hlYWRlci1jb21wb25lbnQuanNcIjtcblxuLyoqXG4gKiDQmtC+0LzQv9C+0L3QtdC90YIg0YHRgtGA0LDQvdC40YbRiyDQt9Cw0LPRgNGD0LfQutC4LlxuICog0K3RgtC+0YIg0LrQvtC80L/QvtC90LXQvdGCINC+0YLQvtCx0YDQsNC20LDQtdGCINGB0YLRgNCw0L3QuNGG0YMg0YEg0LjQvdC00LjQutCw0YLQvtGA0L7QvCDQt9Cw0LPRgNGD0LfQutC4INC4INC30LDQs9C+0LvQvtCy0LrQvtC8LlxuICog0JjRgdC/0L7Qu9GM0LfRg9C10YLRgdGPINC00LvRjyDQvtGC0L7QsdGA0LDQttC10L3QuNGPINC/0YDQvtC80LXQttGD0YLQvtGH0L3QvtCz0L4g0YHQvtGB0YLQvtGP0L3QuNGPLCDQv9C+0LrQsCDQstGL0L/QvtC70L3Rj9C10YLRgdGPINC30LDQs9GA0YPQt9C60LAg0LTQsNC90L3Ri9GFINC40LvQuCDQtNGA0YPQs9C+0Lkg0L/RgNC+0YbQtdGB0YEuXG4gKiBcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHBhcmFtcy5hcHBFbCAtINCa0L7RgNC90LXQstC+0Lkg0Y3Qu9C10LzQtdC90YIg0L/RgNC40LvQvtC20LXQvdC40Y8sINCyINC60L7RgtC+0YDRi9C5INCx0YPQtNC10YIg0YDQtdC90LTQtdGA0LjRgtGM0YHRjyDRgdGC0YDQsNC90LjRhtCwINC30LDQs9GA0YPQt9C60LguXG4gKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zLnVzZXIgLSDQntCx0YrQtdC60YIg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GPLCDRgdC+0LTQtdGA0LbQsNGJ0LjQuSDQtNCw0L3QvdGL0LUg0L4g0YLQtdC60YPRidC10Lwg0LDQstGC0L7RgNC40LfQvtCy0LDQvdC90L7QvCDQv9C+0LvRjNC30L7QstCw0YLQtdC70LUgKNC10YHQu9C4INC+0L0g0LXRgdGC0YwpLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcGFyYW1zLmdvVG9QYWdlIC0g0KTRg9C90LrRhtC40Y8g0LTQu9GPINC90LDQstC40LPQsNGG0LjQuCDQv9C+INGB0YLRgNCw0L3QuNGG0LDQvC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckxvYWRpbmdQYWdlQ29tcG9uZW50KHsgYXBwRWwsIHVzZXIsIGdvVG9QYWdlIH0pIHtcbiAgLyoqXG4gICAqIEhUTUwt0YDQsNC30LzQtdGC0LrQsCDRgdGC0YDQsNC90LjRhtGLINC30LDQs9GA0YPQt9C60LguXG4gICAqINCh0L7QtNC10YDQttC40YIg0LrQvtC90YLQtdC50L3QtdGAINC30LDQs9C+0LvQvtCy0LrQsCDQuCDQuNC90LTQuNC60LDRgtC+0YAg0LfQsNCz0YDRg9C30LrQuC5cbiAgICovXG4gIGNvbnN0IGFwcEh0bWwgPSBgXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYWdlLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXItY29udGFpbmVyXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxvYWRpbmctcGFnZVwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxvYWRlclwiPjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5gO1xuXG4gIC8vINCj0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdC8INGA0LDQt9C80LXRgtC60YMg0LIg0LrQvtGA0L3QtdCy0L7QuSDRjdC70LXQvNC10L3RgiDQv9GA0LjQu9C+0LbQtdC90LjRj1xuICBhcHBFbC5pbm5lckhUTUwgPSBhcHBIdG1sO1xuXG4gIC8qKlxuICAgKiDQoNC10L3QtNC10YDQuNC90LMg0LfQsNCz0L7Qu9C+0LLQutCwINGBINC40YHQv9C+0LvRjNC30L7QstCw0L3QuNC10Lwg0LrQvtC80L/QvtC90LXQvdGC0LAgYHJlbmRlckhlYWRlckNvbXBvbmVudGAuXG4gICAqINCf0LXRgNC10LTQsNGO0YLRgdGPINC00LDQvdC90YvQtSDQv9C+0LvRjNC30L7QstCw0YLQtdC70Y8g0Lgg0YTRg9C90LrRhtC40Y8g0L3QsNCy0LjQs9Cw0YbQuNC4LlxuICAgKi9cbiAgcmVuZGVySGVhZGVyQ29tcG9uZW50KHtcbiAgICB1c2VyLFxuICAgIGVsZW1lbnQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVhZGVyLWNvbnRhaW5lclwiKSxcbiAgICBnb1RvUGFnZSxcbiAgfSk7XG59XG4iLCJpbXBvcnQgeyBVU0VSX1BPU1RTX1BBR0UsIGdvVG9QYWdlLCBwb3N0cyBhcyBnbG9iYWxQb3N0cywgdXNlciwgdG9nZ2xlTGlrZSB9IGZyb20gXCIuLi9pbmRleC5qc1wiO1xuaW1wb3J0IHsgcmVuZGVySGVhZGVyQ29tcG9uZW50IH0gZnJvbSBcIi4vaGVhZGVyLWNvbXBvbmVudC5qc1wiO1xuaW1wb3J0IHsgZm9ybWF0RGlzdGFuY2VUb05vdyB9IGZyb20gXCJkYXRlLWZuc1wiO1xuaW1wb3J0IHsgcnUgfSBmcm9tIFwiZGF0ZS1mbnMvbG9jYWxlXCI7XG5pbXBvcnQgeyBkZWxldGVQb3N0IH0gZnJvbSBcIi4uL2FwaS5qc1wiO1xuXG5pbXBvcnQgbGlrZUFjdGl2ZUljb24gZnJvbSBcIi4uL2Fzc2V0cy9pbWFnZXMvbGlrZS1hY3RpdmUuc3ZnXCI7XG5pbXBvcnQgbGlrZU5vdEFjdGl2ZUljb24gZnJvbSBcIi4uL2Fzc2V0cy9pbWFnZXMvbGlrZS1ub3QtYWN0aXZlLnN2Z1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyUG9zdHNQYWdlQ29tcG9uZW50KHsgYXBwRWwgfSkge1xuICBjb25zdCByZW5kZXJQb3N0cyA9ICgpID0+IHtcbiAgICBjb25zdCBwb3N0c0h0bWwgPSBnbG9iYWxQb3N0c1xuICAgICAgLm1hcChwb3N0ID0+IHtcbiAgICAgICAgY29uc3QgcG9zdERhdGUgPSBuZXcgRGF0ZShwb3N0LmNyZWF0ZWRBdCk7XG5cbiAgICAgICAgLy8g0L/RgNC+0LLQtdGA0Y/QtdC8INC70LDQudC6INCy0L4g0LLRgdC10YUg0LzQsNGB0YHQuNCy0LDRhVxuICAgICAgICBjb25zdCBhbGxQb3N0cyA9IFsuLi5nbG9iYWxQb3N0cywgLi4uKHdpbmRvdy51c2VyUG9zdHMgfHwgW10pXTtcbiAgICAgICAgY29uc3QgcG9zdEdsb2JhbCA9IGFsbFBvc3RzLmZpbmQocCA9PiBwLmlkID09PSBwb3N0LmlkKTtcbiAgICAgICAgY29uc3QgaXNMaWtlZCA9IHBvc3RHbG9iYWw/Lmxpa2VzLnNvbWUobCA9PiBsLmlkID09PSB1c2VyPy5faWQpO1xuICAgICAgICBjb25zdCBsaWtlSW1hZ2UgPSBpc0xpa2VkID8gbGlrZUFjdGl2ZUljb24gOiBsaWtlTm90QWN0aXZlSWNvbjtcblxuICAgICAgICByZXR1cm4gYFxuICAgICAgICAgIDxsaSBjbGFzcz1cInBvc3RcIiBkYXRhLXBvc3QtaWQ9XCIke3Bvc3QuaWR9XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicG9zdC1oZWFkZXJcIiBkYXRhLXVzZXItaWQ9XCIke3Bvc3QudXNlci5pZH1cIj5cbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIke3Bvc3QudXNlci5pbWFnZVVybH1cIiBjbGFzcz1cInBvc3QtaGVhZGVyX191c2VyLWltYWdlXCI+XG4gICAgICAgICAgICAgIDxwIGNsYXNzPVwicG9zdC1oZWFkZXJfX3VzZXItbmFtZVwiPiR7cG9zdC51c2VyLm5hbWV9PC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicG9zdC1pbWFnZS1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgPGltZyBjbGFzcz1cInBvc3QtaW1hZ2VcIiBzcmM9XCIke3Bvc3QuaW1hZ2VVcmx9XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoZWFydC1vdmVybGF5XCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwb3N0LWxpa2VzXCI+XG4gICAgICAgICAgICAgIDxidXR0b24gZGF0YS1wb3N0LWlkPVwiJHtwb3N0LmlkfVwiIGNsYXNzPVwibGlrZS1idXR0b25cIj5cbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7bGlrZUltYWdlfVwiPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPHAgY2xhc3M9XCJwb3N0LWxpa2VzLXRleHRcIj5cbiAgICAgICAgICAgICAgICDQndGA0LDQstC40YLRgdGPOiA8c3Ryb25nPiR7cG9zdC5saWtlcy5sZW5ndGh9PC9zdHJvbmc+XG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgJHtcbiAgICAgICAgICAgICAgICBwb3N0LnVzZXIuaWQgPT09IHVzZXI/Ll9pZFxuICAgICAgICAgICAgICAgICAgPyBgPGJ1dHRvbiBjbGFzcz1cImRlbGV0ZS1idXR0b25cIiBkYXRhLXBvc3QtaWQ9XCIke3Bvc3QuaWR9XCI+0KPQtNCw0LvQuNGC0Yw8L2J1dHRvbj5gXG4gICAgICAgICAgICAgICAgICA6IFwiXCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8cCBjbGFzcz1cInBvc3QtdGV4dFwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVzZXItbmFtZVwiPiR7cG9zdC51c2VyLm5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAke3Bvc3QuZGVzY3JpcHRpb259XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8cCBjbGFzcz1cInBvc3QtZGF0ZVwiPlxuICAgICAgICAgICAgICAke2Zvcm1hdERpc3RhbmNlVG9Ob3cocG9zdERhdGUsIHsgYWRkU3VmZml4OiB0cnVlLCBsb2NhbGU6IHJ1IH0pfVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgIGA7XG4gICAgICB9KVxuICAgICAgLmpvaW4oXCJcIik7XG5cbiAgICBhcHBFbC5pbm5lckhUTUwgPSBgXG4gICAgICA8ZGl2IGNsYXNzPVwicGFnZS1jb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImhlYWRlci1jb250YWluZXJcIj48L2Rpdj5cbiAgICAgICAgPHVsIGNsYXNzPVwicG9zdHNcIj4ke3Bvc3RzSHRtbH08L3VsPlxuICAgICAgPC9kaXY+XG4gICAgYDtcblxuICAgIHJlbmRlckhlYWRlckNvbXBvbmVudCh7IGVsZW1lbnQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVhZGVyLWNvbnRhaW5lclwiKSB9KTtcblxuICAgIC8vINCf0LXRgNC10YXQvtC0INC90LAg0YHRgtGA0LDQvdC40YbRgyDQv9C+0LvRjNC30L7QstCw0YLQtdC70Y9cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBvc3QtaGVhZGVyXCIpLmZvckVhY2godXNlckVsID0+IHtcbiAgICAgIHVzZXJFbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBnb1RvUGFnZShVU0VSX1BPU1RTX1BBR0UsIHsgdXNlcklkOiB1c2VyRWwuZGF0YXNldC51c2VySWQgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vINCb0LDQudC60Lgg0YEg0LDQvdC40LzQsNGG0LjQtdC5XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5saWtlLWJ1dHRvblwiKS5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgcG9zdElkID0gYnV0dG9uLmRhdGFzZXQucG9zdElkO1xuICAgICAgICBjb25zdCBpbWdFbCA9IGJ1dHRvbi5xdWVyeVNlbGVjdG9yKFwiaW1nXCIpO1xuICAgICAgICBjb25zdCBsaWtlc1RleHRFbCA9IGJ1dHRvbi5uZXh0RWxlbWVudFNpYmxpbmc7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBuZXdMaWtlc0NvdW50ID0gYXdhaXQgdG9nZ2xlTGlrZShwb3N0SWQpO1xuXG4gICAgICAgICAgY29uc3QgYWxsUG9zdHMgPSBbLi4uZ2xvYmFsUG9zdHMsIC4uLih3aW5kb3cudXNlclBvc3RzIHx8IFtdKV07XG4gICAgICAgICAgY29uc3QgcG9zdCA9IGFsbFBvc3RzLmZpbmQocCA9PiBwLmlkID09PSBwb3N0SWQpO1xuICAgICAgICAgIGNvbnN0IGlzTGlrZWQgPSBwb3N0Lmxpa2VzLnNvbWUobCA9PiBsLmlkID09PSB1c2VyLl9pZCk7XG5cbiAgICAgICAgICBpbWdFbC5zcmMgPSBpc0xpa2VkID8gbGlrZUFjdGl2ZUljb24gOiBsaWtlTm90QWN0aXZlSWNvbjtcblxuICAgICAgICAgIGNvbnN0IG92ZXJsYXkgPSBidXR0b24uY2xvc2VzdChcIi5wb3N0XCIpLnF1ZXJ5U2VsZWN0b3IoXCIuaGVhcnQtb3ZlcmxheVwiKTtcbiAgICAgICAgICBpZiAoaXNMaWtlZCkge1xuICAgICAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QuYWRkKFwic2hvdy1oZWFydFwiKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gb3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKFwic2hvdy1oZWFydFwiKSwgODAwKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsaWtlc1RleHRFbC5xdWVyeVNlbGVjdG9yKFwic3Ryb25nXCIpLnRleHRDb250ZW50ID0gbmV3TGlrZXNDb3VudDtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyDQo9C00LDQu9C10L3QuNC1INC/0L7RgdGC0L7QslxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZGVsZXRlLWJ1dHRvblwiKS5mb3JFYWNoKChidXR0b24sIGluZGV4KSA9PiB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgcG9zdCA9IGdsb2JhbFBvc3RzW2luZGV4XTtcbiAgICAgICAgaWYgKCFjb25maXJtKFwi0JLRiyDRgtC+0YfQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDQv9C+0YHRgj9cIikpIHJldHVybjtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIGF3YWl0IGRlbGV0ZVBvc3QoeyBwb3N0SWQ6IHBvc3QuaWQsIHRva2VuOiB1c2VyLnRva2VuIH0pO1xuICAgICAgICAgIGdsb2JhbFBvc3RzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgYnV0dG9uLmNsb3Nlc3QoXCJsaS5wb3N0XCIpLnJlbW92ZSgpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLQntGI0LjQsdC60LAg0L/RgNC4INGD0LTQsNC70LXQvdC40Lgg0L/QvtGB0YLQsDpcIiwgZXJyb3IpO1xuICAgICAgICAgIGFsZXJ0KFwi0J3QtSDRg9C00LDQu9C+0YHRjCDRg9C00LDQu9C40YLRjCDQv9C+0YHRglwiKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmVuZGVyUG9zdHMoKTtcbn1cbiIsImltcG9ydCB7IHVwbG9hZEltYWdlIH0gZnJvbSBcIi4uL2FwaS5qc1wiO1xuXG4vKipcbiAqINCa0L7QvNC/0L7QvdC10L3RgiDQt9Cw0LPRgNGD0LfQutC4INC40LfQvtCx0YDQsNC20LXQvdC40Y8uXG4gKiDQrdGC0L7RgiDQutC+0LzQv9C+0L3QtdC90YIg0L/QvtC30LLQvtC70Y/QtdGCINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjiDQt9Cw0LPRgNGD0LbQsNGC0Ywg0LjQt9C+0LHRgNCw0LbQtdC90LjQtSDQuCDQvtGC0L7QsdGA0LDQttCw0YLRjCDQtdCz0L4g0L/RgNC10LLRjNGOLlxuICog0JXRgdC70Lgg0LjQt9C+0LHRgNCw0LbQtdC90LjQtSDRg9C20LUg0LfQsNCz0YDRg9C20LXQvdC+LCDQv9C+0LvRjNC30L7QstCw0YLQtdC70Ywg0LzQvtC20LXRgiDQt9Cw0LzQtdC90LjRgtGMINC10LPQvi5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBwYXJhbXMuZWxlbWVudCAtIEhUTUwt0Y3Qu9C10LzQtdC90YIsINCyINC60L7RgtC+0YDRi9C5INCx0YPQtNC10YIg0YDQtdC90LTQtdGA0LjRgtGM0YHRjyDQutC+0LzQv9C+0L3QtdC90YIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwYXJhbXMub25JbWFnZVVybENoYW5nZSAtINCk0YPQvdC60YbQuNGPLCDQstGL0LfRi9Cy0LDQtdC80LDRjyDQv9GA0Lgg0LjQt9C80LXQvdC10L3QuNC4IFVSTCDQuNC30L7QsdGA0LDQttC10L3QuNGPLlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgINCf0YDQuNC90LjQvNCw0LXRgiDQvtC00LjQvSDQsNGA0LPRg9C80LXQvdGCIC0g0L3QvtCy0YvQuSBVUkwg0LjQt9C+0LHRgNCw0LbQtdC90LjRjyDQuNC70Lgg0L/Rg9GB0YLRg9GOINGB0YLRgNC+0LrRgy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclVwbG9hZEltYWdlQ29tcG9uZW50KHsgZWxlbWVudCwgb25JbWFnZVVybENoYW5nZSB9KSB7XG4gIC8qKlxuICAgKiBVUkwg0YLQtdC60YPRidC10LPQviDQuNC30L7QsdGA0LDQttC10L3QuNGPLlxuICAgKiDQmNC30L3QsNGH0LDQu9GM0L3QviDQv9GD0YHRgiwg0L/QvtC60LAg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GMINC90LUg0LfQsNCz0YDRg9C30LjRgiDQuNC30L7QsdGA0LDQttC10L3QuNC1LlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgbGV0IGltYWdlVXJsID0gXCJcIjtcblxuICAvKipcbiAgICog0KTRg9C90LrRhtC40Y8g0YDQtdC90LTQtdGA0LjQvdCz0LAg0LrQvtC80L/QvtC90LXQvdGC0LAuXG4gICAqINCe0YLQvtCx0YDQsNC20LDQtdGCINC40L3RgtC10YDRhNC10LnRgSDQutC+0LzQv9C+0L3QtdC90YLQsCDQsiDQt9Cw0LLQuNGB0LjQvNC+0YHRgtC4INC+0YIg0YHQvtGB0YLQvtGP0L3QuNGPOiBcbiAgICog0LvQuNCx0L4g0YTQvtGA0LzQsCDQstGL0LHQvtGA0LAg0YTQsNC50LvQsCwg0LvQuNCx0L4g0L/RgNC10LLRjNGOINC30LDQs9GA0YPQttC10L3QvdC+0LPQviDQuNC30L7QsdGA0LDQttC10L3QuNGPINGBINC60L3QvtC/0LrQvtC5INC30LDQvNC10L3Riy5cbiAgICovXG4gIGNvbnN0IHJlbmRlciA9ICgpID0+IHtcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJ1cGxvYWQtaW1hZ2VcIj5cbiAgICAgICAgJHtcbiAgICAgICAgICBpbWFnZVVybFxuICAgICAgICAgICAgPyBgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmlsZS11cGxvYWQtaW1hZ2UtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJmaWxlLXVwbG9hZC1pbWFnZVwiIHNyYz1cIiR7aW1hZ2VVcmx9XCIgYWx0PVwi0JfQsNCz0YDRg9C20LXQvdC90L7QtSDQuNC30L7QsdGA0LDQttC10L3QuNC1XCI+XG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJmaWxlLXVwbG9hZC1yZW1vdmUtYnV0dG9uIGJ1dHRvblwiPtCX0LDQvNC10L3QuNGC0Ywg0YTQvtGC0L48L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgYFxuICAgICAgICAgICAgOiBgXG4gICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJmaWxlLXVwbG9hZC1sYWJlbCBzZWNvbmRhcnktYnV0dG9uXCI+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIHR5cGU9XCJmaWxlXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cImZpbGUtdXBsb2FkLWlucHV0XCJcbiAgICAgICAgICAgICAgICBzdHlsZT1cImRpc3BsYXk6bm9uZVwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgINCS0YvQsdC10YDQuNGC0LUg0YTQvtGC0L5cbiAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgYFxuICAgICAgICB9XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuXG4gICAgLy8g0J7QsdGA0LDQsdC+0YLRh9C40Log0LLRi9Cx0L7RgNCwINGE0LDQudC70LBcbiAgICBjb25zdCBmaWxlSW5wdXRFbGVtZW50ID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmZpbGUtdXBsb2FkLWlucHV0XCIpO1xuICAgIGZpbGVJbnB1dEVsZW1lbnQ/LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgZmlsZSA9IGZpbGVJbnB1dEVsZW1lbnQuZmlsZXNbMF07XG4gICAgICBpZiAoZmlsZSkge1xuICAgICAgICBjb25zdCBsYWJlbEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5maWxlLXVwbG9hZC1sYWJlbFwiKTtcbiAgICAgICAgbGFiZWxFbC5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCB0cnVlKTtcbiAgICAgICAgbGFiZWxFbC50ZXh0Q29udGVudCA9IFwi0JfQsNCz0YDRg9C20LDRjiDRhNCw0LnQuy4uLlwiO1xuICAgICAgICBcbiAgICAgICAgLy8g0JfQsNCz0YDRg9C20LDQtdC8INC40LfQvtCx0YDQsNC20LXQvdC40LUg0YEg0L/QvtC80L7RidGM0Y4gQVBJXG4gICAgICAgIHVwbG9hZEltYWdlKHsgZmlsZSB9KS50aGVuKCh7IGZpbGVVcmwgfSkgPT4ge1xuICAgICAgICAgIGltYWdlVXJsID0gZmlsZVVybDsgLy8g0KHQvtGF0YDQsNC90Y/QtdC8IFVSTCDQt9Cw0LPRgNGD0LbQtdC90L3QvtCz0L4g0LjQt9C+0LHRgNCw0LbQtdC90LjRj1xuICAgICAgICAgIG9uSW1hZ2VVcmxDaGFuZ2UoaW1hZ2VVcmwpOyAvLyDQo9Cy0LXQtNC+0LzQu9GP0LXQvCDQviDQuNC30LzQtdC90LXQvdC40LggVVJMINC40LfQvtCx0YDQsNC20LXQvdC40Y9cbiAgICAgICAgICByZW5kZXIoKTsgLy8g0J/QtdGA0LXRgNC40YHQvtCy0YvQstCw0LXQvCDQutC+0LzQv9C+0L3QtdC90YIg0YEg0L3QvtCy0YvQvCDRgdC+0YHRgtC+0Y/QvdC40LXQvFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vINCe0LHRgNCw0LHQvtGC0YfQuNC6INGD0LTQsNC70LXQvdC40Y8g0LjQt9C+0LHRgNCw0LbQtdC90LjRj1xuICAgIGVsZW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLmZpbGUtdXBsb2FkLXJlbW92ZS1idXR0b25cIilcbiAgICAgID8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgaW1hZ2VVcmwgPSBcIlwiOyAvLyDQodCx0YDQsNGB0YvQstCw0LXQvCBVUkwg0LjQt9C+0LHRgNCw0LbQtdC90LjRj1xuICAgICAgICBvbkltYWdlVXJsQ2hhbmdlKGltYWdlVXJsKTsgLy8g0KPQstC10LTQvtC80LvRj9C10Lwg0L7QsSDQuNC30LzQtdC90LXQvdC40LggVVJMINC40LfQvtCx0YDQsNC20LXQvdC40Y9cbiAgICAgICAgcmVuZGVyKCk7IC8vINCf0LXRgNC10YDQuNGB0L7QstGL0LLQsNC10Lwg0LrQvtC80L/QvtC90LXQvdGCXG4gICAgICB9KTtcbiAgfTtcblxuICAvLyDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDQutC+0LzQv9C+0L3QtdC90YLQsFxuICByZW5kZXIoKTtcbn1cbiIsImltcG9ydCB7IGdvVG9QYWdlLCB1c2VyLCBQT1NUU19QQUdFLCB0b2dnbGVMaWtlLCBwb3N0cyBhcyBnbG9iYWxQb3N0cyB9IGZyb20gXCIuLi9pbmRleC5qc1wiO1xuaW1wb3J0IHsgcmVuZGVySGVhZGVyQ29tcG9uZW50IH0gZnJvbSBcIi4vaGVhZGVyLWNvbXBvbmVudC5qc1wiO1xuaW1wb3J0IHsgZm9ybWF0RGlzdGFuY2VUb05vdyB9IGZyb20gXCJkYXRlLWZuc1wiO1xuaW1wb3J0IHsgcnUgfSBmcm9tIFwiZGF0ZS1mbnMvbG9jYWxlXCI7XG5pbXBvcnQgeyBkZWxldGVQb3N0LCBnZXRVc2VyUG9zdHMgfSBmcm9tIFwiLi4vYXBpLmpzXCI7XG5cbmltcG9ydCBsaWtlQWN0aXZlSWNvbiBmcm9tIFwiLi4vYXNzZXRzL2ltYWdlcy9saWtlLWFjdGl2ZS5zdmdcIjtcbmltcG9ydCBsaWtlTm90QWN0aXZlSWNvbiBmcm9tIFwiLi4vYXNzZXRzL2ltYWdlcy9saWtlLW5vdC1hY3RpdmUuc3ZnXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW5kZXJVc2VyUG9zdHNQYWdlQ29tcG9uZW50KHsgYXBwRWwsIHVzZXJJZCB9KSB7XG4gIGFwcEVsLmlubmVySFRNTCA9IFwiPHA+0JfQsNCz0YDRg9C30LrQsCDQv9C+0YHRgtC+0LIuLi48L3A+XCI7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCB1c2VyUG9zdHMgPSBhd2FpdCBnZXRVc2VyUG9zdHMoeyB1c2VySWQgfSk7XG4gICAgd2luZG93LnVzZXJQb3N0cyA9IHVzZXJQb3N0czsgLy8g0LTQu9GPINGB0LjQvdGF0YDQvtC90LjQt9Cw0YbQuNC4XG5cbiAgICBjb25zdCByZW5kZXJQb3N0cyA9IChwb3N0c0FycmF5KSA9PiB7XG4gICAgICByZXR1cm4gcG9zdHNBcnJheVxuICAgICAgICAubWFwKHBvc3QgPT4ge1xuICAgICAgICAgIGNvbnN0IHBvc3REYXRlID0gbmV3IERhdGUocG9zdC5jcmVhdGVkQXQpO1xuXG4gICAgICAgICAgY29uc3QgYWxsUG9zdHMgPSBbLi4uZ2xvYmFsUG9zdHMsIC4uLih3aW5kb3cudXNlclBvc3RzIHx8IFtdKV07XG4gICAgICAgICAgY29uc3QgcG9zdEdsb2JhbCA9IGFsbFBvc3RzLmZpbmQocCA9PiBwLmlkID09PSBwb3N0LmlkKTtcbiAgICAgICAgICBjb25zdCBpc0xpa2VkID0gcG9zdEdsb2JhbD8ubGlrZXMuc29tZShsID0+IGwuaWQgPT09IHVzZXI/Ll9pZCk7XG4gICAgICAgICAgY29uc3QgbGlrZUltYWdlID0gaXNMaWtlZCA/IGxpa2VBY3RpdmVJY29uIDogbGlrZU5vdEFjdGl2ZUljb247XG5cbiAgICAgICAgICByZXR1cm4gYFxuICAgICAgICAgICAgPGxpIGNsYXNzPVwicG9zdFwiIGRhdGEtcG9zdC1pZD1cIiR7cG9zdC5pZH1cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBvc3QtaGVhZGVyXCIgZGF0YS11c2VyLWlkPVwiJHtwb3N0LnVzZXIuaWR9XCI+XG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCIke3Bvc3QudXNlci5pbWFnZVVybH1cIiBjbGFzcz1cInBvc3RzLXVzZXItaGVhZGVyX191c2VyLWltYWdlXCI+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJwb3N0cy11c2VyLWhlYWRlcl9fdXNlci1uYW1lXCI+JHtwb3N0LnVzZXIubmFtZX08L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicG9zdC1pbWFnZS1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwicG9zdC1pbWFnZVwiIHNyYz1cIiR7cG9zdC5pbWFnZVVybH1cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGVhcnQtb3ZlcmxheVwiPjwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBvc3QtbGlrZXNcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtcG9zdC1pZD1cIiR7cG9zdC5pZH1cIiBjbGFzcz1cImxpa2UtYnV0dG9uXCI+XG4gICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7bGlrZUltYWdlfVwiPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicG9zdC1saWtlcy10ZXh0XCI+XG4gICAgICAgICAgICAgICAgICDQndGA0LDQstC40YLRgdGPOiA8c3Ryb25nPiR7cG9zdC5saWtlcy5sZW5ndGh9PC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICR7XG4gICAgICAgICAgICAgICAgICBwb3N0LnVzZXIuaWQgPT09IHVzZXI/Ll9pZFxuICAgICAgICAgICAgICAgICAgICA/IGA8YnV0dG9uIGNsYXNzPVwiZGVsZXRlLWJ1dHRvblwiIGRhdGEtcG9zdC1pZD1cIiR7cG9zdC5pZH1cIj7Qo9C00LDQu9C40YLRjDwvYnV0dG9uPmBcbiAgICAgICAgICAgICAgICAgICAgOiBcIlwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHAgY2xhc3M9XCJwb3N0LXRleHRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVzZXItbmFtZVwiPiR7cG9zdC51c2VyLm5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICR7cG9zdC5kZXNjcmlwdGlvbn1cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICA8cCBjbGFzcz1cInBvc3QtZGF0ZVwiPlxuICAgICAgICAgICAgICAgICR7Zm9ybWF0RGlzdGFuY2VUb05vdyhwb3N0RGF0ZSwgeyBhZGRTdWZmaXg6IHRydWUsIGxvY2FsZTogcnUgfSl9XG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgYDtcbiAgICAgICAgfSlcbiAgICAgICAgLmpvaW4oXCJcIik7XG4gICAgfTtcblxuICAgIC8vINCe0YLQvtCx0YDQsNC20LDQtdC8INGB0YLRgNCw0L3QuNGG0YMg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GPINCx0LXQtyDQutC90L7Qv9C60LggXCLQndCw0LfQsNC0XCJcbiAgICBhcHBFbC5pbm5lckhUTUwgPSBgXG4gICAgICA8ZGl2IGNsYXNzPVwicGFnZS1jb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImhlYWRlci1jb250YWluZXJcIj48L2Rpdj5cbiAgICAgICAgPHVsIGNsYXNzPVwicG9zdHNcIj4ke3JlbmRlclBvc3RzKHVzZXJQb3N0cyl9PC91bD5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG5cbiAgICAvLyDQoNC10L3QtNC10YAg0YjQsNC/0LrQuFxuICAgIHJlbmRlckhlYWRlckNvbXBvbmVudCh7IGVsZW1lbnQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVhZGVyLWNvbnRhaW5lclwiKSB9KTtcblxuICAgIC8vINCa0LvQuNC6INC/0L4g0YjQsNC/0LrQtSDQv9C+0YHRgtCwLCDRh9GC0L7QsdGLINC+0YLQutGA0YvRgtGMINC/0L7RgdGC0Ysg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GPXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wb3N0LWhlYWRlclwiKS5mb3JFYWNoKHVzZXJFbCA9PiB7XG4gICAgICB1c2VyRWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgY29uc3QgY2xpY2tlZFVzZXJJZCA9IHVzZXJFbC5kYXRhc2V0LnVzZXJJZDtcbiAgICAgICAgaWYgKHdpbmRvdy5jdXJyZW50VXNlclBvc3RzSWQgPT09IGNsaWNrZWRVc2VySWQpIHJldHVybjtcbiAgICAgICAgd2luZG93LmN1cnJlbnRVc2VyUG9zdHNJZCA9IGNsaWNrZWRVc2VySWQ7XG4gICAgICAgIGdvVG9QYWdlKFVTRVJfUE9TVFNfUEFHRSwgeyB1c2VySWQ6IGNsaWNrZWRVc2VySWQgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vINCb0LDQudC60Lgg0YEg0LDQvdC40LzQsNGG0LjQtdC5XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5saWtlLWJ1dHRvblwiKS5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgcG9zdElkID0gYnV0dG9uLmRhdGFzZXQucG9zdElkO1xuICAgICAgICBjb25zdCBpbWdFbCA9IGJ1dHRvbi5xdWVyeVNlbGVjdG9yKFwiaW1nXCIpO1xuICAgICAgICBjb25zdCBsaWtlc1RleHRFbCA9IGJ1dHRvbi5uZXh0RWxlbWVudFNpYmxpbmc7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBuZXdMaWtlc0NvdW50ID0gYXdhaXQgdG9nZ2xlTGlrZShwb3N0SWQpO1xuICAgICAgICAgIGNvbnN0IGFsbFBvc3RzID0gWy4uLmdsb2JhbFBvc3RzLCAuLi4od2luZG93LnVzZXJQb3N0cyB8fCBbXSldO1xuICAgICAgICAgIGNvbnN0IHBvc3QgPSBhbGxQb3N0cy5maW5kKHAgPT4gcC5pZCA9PT0gcG9zdElkKTtcbiAgICAgICAgICBjb25zdCBpc0xpa2VkID0gcG9zdC5saWtlcy5zb21lKGwgPT4gbC5pZCA9PT0gdXNlci5faWQpO1xuXG4gICAgICAgICAgaW1nRWwuc3JjID0gaXNMaWtlZCA/IGxpa2VBY3RpdmVJY29uIDogbGlrZU5vdEFjdGl2ZUljb247XG5cbiAgICAgICAgICBjb25zdCBvdmVybGF5ID0gYnV0dG9uLmNsb3Nlc3QoXCIucG9zdFwiKS5xdWVyeVNlbGVjdG9yKFwiLmhlYXJ0LW92ZXJsYXlcIik7XG4gICAgICAgICAgaWYgKGlzTGlrZWQpIHtcbiAgICAgICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LmFkZChcInNob3ctaGVhcnRcIik7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IG92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZShcInNob3ctaGVhcnRcIiksIDgwMCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGlrZXNUZXh0RWwucXVlcnlTZWxlY3RvcihcInN0cm9uZ1wiKS50ZXh0Q29udGVudCA9IG5ld0xpa2VzQ291bnQ7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8g0KPQtNCw0LvQtdC90LjQtSDQv9C+0YHRgtC+0LJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmRlbGV0ZS1idXR0b25cIikuZm9yRWFjaCgoYnV0dG9uLCBpbmRleCkgPT4ge1xuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHBvc3QgPSB1c2VyUG9zdHNbaW5kZXhdO1xuICAgICAgICBpZiAoIWNvbmZpcm0oXCLQktGLINGC0L7Rh9C90L4g0YXQvtGC0LjRgtC1INGD0LTQsNC70LjRgtGMINC/0L7RgdGCP1wiKSkgcmV0dXJuO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYXdhaXQgZGVsZXRlUG9zdCh7IHBvc3RJZDogcG9zdC5pZCwgdG9rZW46IHVzZXIudG9rZW4gfSk7XG4gICAgICAgICAgdXNlclBvc3RzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgd2luZG93LnVzZXJQb3N0cyA9IHVzZXJQb3N0cztcbiAgICAgICAgICBidXR0b24uY2xvc2VzdChcImxpLnBvc3RcIikucmVtb3ZlKCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcItCe0YjQuNCx0LrQsCDQv9GA0Lgg0YPQtNCw0LvQtdC90LjQuCDQv9C+0YHRgtCwOlwiLCBlcnJvcik7XG4gICAgICAgICAgYWxlcnQoXCLQndC1INGD0LTQsNC70L7RgdGMINGD0LTQsNC70LjRgtGMINC/0L7RgdGCXCIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHdpbmRvdy5jdXJyZW50VXNlclBvc3RzSWQgPSB1c2VySWQ7XG5cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwi0J7RiNC40LHQutCwINC/0YDQuCDQt9Cw0LPRgNGD0LfQutC1INC/0L7RgdGC0L7QsiDQv9C+0LvRjNC30L7QstCw0YLQtdC70Y86XCIsIGVycm9yKTtcbiAgICBhcHBFbC5pbm5lckhUTUwgPSBcIjxwPtCd0LUg0YPQtNCw0LvQvtGB0Ywg0LfQsNCz0YDRg9C30LjRgtGMINC/0L7RgdGC0Ysg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GPPC9wPlwiO1xuICB9XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gc2F2ZVVzZXJUb0xvY2FsU3RvcmFnZSh1c2VyKSB7XG4gIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInVzZXJcIiwgSlNPTi5zdHJpbmdpZnkodXNlcikpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXNlckZyb21Mb2NhbFN0b3JhZ2UodXNlcikge1xuICB0cnkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInVzZXJcIikpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVVc2VyRnJvbUxvY2FsU3RvcmFnZSh1c2VyKSB7XG4gIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcInVzZXJcIik7XG59XG4iLCJpbXBvcnQgXCIuL3N0eWxlcy5jc3NcIjtcbmltcG9ydCBcIi4vdWkta2l0LmNzc1wiO1xuXG5pbXBvcnQgeyBnZXRQb3N0cywgYWRkUG9zdCwgbGlrZVBvc3QsIHVubGlrZVBvc3QgfSBmcm9tIFwiLi9hcGkuanNcIjtcbmltcG9ydCB7IHJlbmRlckFkZFBvc3RQYWdlQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9hZGQtcG9zdC1wYWdlLWNvbXBvbmVudC5qc1wiO1xuaW1wb3J0IHsgcmVuZGVyQXV0aFBhZ2VDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL2F1dGgtcGFnZS1jb21wb25lbnQuanNcIjtcbmltcG9ydCB7IHJlbmRlclBvc3RzUGFnZUNvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvcG9zdHMtcGFnZS1jb21wb25lbnQuanNcIjtcbmltcG9ydCB7IHJlbmRlckxvYWRpbmdQYWdlQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9sb2FkaW5nLXBhZ2UtY29tcG9uZW50LmpzXCI7XG5pbXBvcnQgeyByZW5kZXJVc2VyUG9zdHNQYWdlQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy91c2VyLXBvc3RzLXBhZ2UtY29tcG9uZW50LmpzXCI7XG5cbmltcG9ydCB7XG4gIEFERF9QT1NUU19QQUdFLFxuICBBVVRIX1BBR0UsXG4gIExPQURJTkdfUEFHRSxcbiAgUE9TVFNfUEFHRSxcbiAgVVNFUl9QT1NUU19QQUdFLFxufSBmcm9tIFwiLi9yb3V0ZXMuanNcIjtcblxuaW1wb3J0IHtcbiAgZ2V0VXNlckZyb21Mb2NhbFN0b3JhZ2UsXG4gIHJlbW92ZVVzZXJGcm9tTG9jYWxTdG9yYWdlLFxuICBzYXZlVXNlclRvTG9jYWxTdG9yYWdlLFxufSBmcm9tIFwiLi9oZWxwZXJzLmpzXCI7XG5cbmV4cG9ydCB7IFBPU1RTX1BBR0UsIEFERF9QT1NUU19QQUdFLCBBVVRIX1BBR0UsIExPQURJTkdfUEFHRSwgVVNFUl9QT1NUU19QQUdFIH07XG5cbmV4cG9ydCBsZXQgdXNlciA9IGdldFVzZXJGcm9tTG9jYWxTdG9yYWdlKCk7XG5leHBvcnQgbGV0IHBhZ2UgPSBudWxsO1xuZXhwb3J0IGxldCBwb3N0cyA9IFtdO1xuXG4vLyDQn9C+0LvRg9GH0LXQvdC40LUg0YLQvtC60LXQvdCwXG5leHBvcnQgY29uc3QgZ2V0VG9rZW4gPSAoKSA9PiAodXNlciA/IHVzZXIudG9rZW4gOiB1bmRlZmluZWQpO1xuXG4vLyDQktGL0YXQvtC0XG5leHBvcnQgY29uc3QgbG9nb3V0ID0gKCkgPT4ge1xuICB1c2VyID0gbnVsbDtcbiAgcmVtb3ZlVXNlckZyb21Mb2NhbFN0b3JhZ2UoKTtcbiAgZ29Ub1BhZ2UoUE9TVFNfUEFHRSk7XG59O1xuXG4vL9Ck0YPQvdC60YbQuNGPINGB0LjQvdGF0YDQvtC90LjQt9Cw0YbQuNC4INC70LDQudC60L7QslxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHRvZ2dsZUxpa2UocG9zdElkKSB7XG4gIGlmICghdXNlcikge1xuICAgIGFsZXJ0KFwi0JLQvtC50LTQuNGC0LUsINGH0YLQvtCx0Ysg0YHRgtCw0LLQuNGC0Ywg0LvQsNC50LrQuFwiKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyDQmNGJ0LXQvCDQv9C+0YHRgiDQstC+INCy0YHQtdGFINC80LDRgdGB0LjQstCw0YVcbiAgY29uc3QgYXJyYXlzID0gW3Bvc3RzLCB3aW5kb3cudXNlclBvc3RzIHx8IFtdXTtcbiAgbGV0IHBvc3Q7XG4gIGZvciAoY29uc3QgYXJyIG9mIGFycmF5cykge1xuICAgIHBvc3QgPSBhcnIuZmluZCgocCkgPT4gcC5pZCA9PT0gcG9zdElkKTtcbiAgICBpZiAocG9zdCkgYnJlYWs7XG4gIH1cblxuICBpZiAoIXBvc3QpIHtcbiAgICBjb25zb2xlLmVycm9yKFwi0J/QvtGB0YIg0L3QtSDQvdCw0LnQtNC10L1cIiwgcG9zdElkKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBpc0xpa2VkID0gcG9zdC5saWtlcy5zb21lKChsKSA9PiBsLmlkID09PSB1c2VyLl9pZCk7XG5cbiAgdHJ5IHtcbiAgICBpZiAoaXNMaWtlZCkge1xuICAgICAgYXdhaXQgdW5saWtlUG9zdCh7IHBvc3RJZCwgdG9rZW46IHVzZXIudG9rZW4gfSk7XG4gICAgICBwb3N0Lmxpa2VzID0gcG9zdC5saWtlcy5maWx0ZXIobCA9PiBsLmlkICE9PSB1c2VyLl9pZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF3YWl0IGxpa2VQb3N0KHsgcG9zdElkLCB0b2tlbjogdXNlci50b2tlbiB9KTtcbiAgICAgIHBvc3QubGlrZXMucHVzaCh7IGlkOiB1c2VyLl9pZCwgbmFtZTogdXNlci5uYW1lIH0pO1xuICAgIH1cblxuICAgIC8v0KHQuNC90YXRgNC+0L3QuNC30LjRgNGD0LXQvCDQu9Cw0LnQutC4INCy0L4g0LLRgdC10YUg0LzQsNGB0YHQuNCy0LDRhVxuICAgIGFycmF5cy5mb3JFYWNoKGFyciA9PiB7XG4gICAgICBjb25zdCBwID0gYXJyLmZpbmQocCA9PiBwLmlkID09PSBwb3N0SWQpO1xuICAgICAgaWYgKHApIHAubGlrZXMgPSBwb3N0Lmxpa2VzO1xuICAgIH0pO1xuXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcItCe0YjQuNCx0LrQsCDQu9Cw0LnQutCwXCIsIGVycm9yKTtcbiAgICBhbGVydChcItCd0LUg0YPQtNCw0LvQvtGB0Ywg0L/QvtGB0YLQsNCy0LjRgtGML9GD0LHRgNCw0YLRjCDQu9Cw0LnQulwiKTtcbiAgICByZXR1cm47XG4gIH1cblxuICByZXR1cm4gcG9zdC5saWtlcy5sZW5ndGg7XG59XG5cblxuLy/Qn9C10YDQtdGF0L7QtCDQvdCwINGB0YLRgNCw0L3QuNGG0YtcbmV4cG9ydCBjb25zdCBnb1RvUGFnZSA9IChuZXdQYWdlLCBkYXRhKSA9PiB7XG4gIGlmIChcbiAgICBbUE9TVFNfUEFHRSwgQVVUSF9QQUdFLCBBRERfUE9TVFNfUEFHRSwgVVNFUl9QT1NUU19QQUdFLCBMT0FESU5HX1BBR0VdLmluY2x1ZGVzKG5ld1BhZ2UpXG4gICkge1xuICAgIGlmIChuZXdQYWdlID09PSBBRERfUE9TVFNfUEFHRSkge1xuICAgICAgcGFnZSA9IHVzZXIgPyBBRERfUE9TVFNfUEFHRSA6IEFVVEhfUEFHRTtcbiAgICAgIHJldHVybiByZW5kZXJBcHAoKTtcbiAgICB9XG5cbiAgICBpZiAobmV3UGFnZSA9PT0gUE9TVFNfUEFHRSkge1xuICAgICAgcGFnZSA9IExPQURJTkdfUEFHRTtcbiAgICAgIHJlbmRlckFwcCgpO1xuXG4gICAgICByZXR1cm4gZ2V0UG9zdHMoeyB0b2tlbjogZ2V0VG9rZW4oKSB9KVxuICAgICAgICAudGhlbigobmV3UG9zdHMpID0+IHtcbiAgICAgICAgICBwYWdlID0gUE9TVFNfUEFHRTtcbiAgICAgICAgICBwb3N0cyA9IG5ld1Bvc3RzO1xuICAgICAgICAgIHJlbmRlckFwcCgpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgZ29Ub1BhZ2UoUE9TVFNfUEFHRSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChuZXdQYWdlID09PSBVU0VSX1BPU1RTX1BBR0UpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwi0J7RgtC60YDRi9Cy0LDRjiDRgdGC0YDQsNC90LjRhtGDINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjzogXCIsIGRhdGEudXNlcklkKTtcbiAgICAgIHBhZ2UgPSBVU0VSX1BPU1RTX1BBR0U7XG4gICAgICBjb25zdCBhcHBFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXBwXCIpO1xuICAgICAgcmV0dXJuIHJlbmRlclVzZXJQb3N0c1BhZ2VDb21wb25lbnQoeyBhcHBFbCwgdXNlcklkOiBkYXRhLnVzZXJJZCB9KTtcbiAgICB9XG5cbiAgICBwYWdlID0gbmV3UGFnZTtcbiAgICByZW5kZXJBcHAoKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB0aHJvdyBuZXcgRXJyb3IoXCLRgdGC0YDQsNC90LjRhtGLINC90LUg0YHRg9GJ0LXRgdGC0LLRg9C10YJcIik7XG59O1xuXG4vLyDQoNC10L3QtNC10YAg0L/RgNC40LvQvtC20LXQvdC40Y9cbmNvbnN0IHJlbmRlckFwcCA9ICgpID0+IHtcbiAgY29uc3QgYXBwRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFwcFwiKTtcblxuICBzd2l0Y2ggKHBhZ2UpIHtcbiAgICBjYXNlIExPQURJTkdfUEFHRTpcbiAgICAgIHJlbmRlckxvYWRpbmdQYWdlQ29tcG9uZW50KHsgYXBwRWwsIHVzZXIsIGdvVG9QYWdlIH0pO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIEFVVEhfUEFHRTpcbiAgICAgIHJlbmRlckF1dGhQYWdlQ29tcG9uZW50KHtcbiAgICAgICAgYXBwRWwsXG4gICAgICAgIHNldFVzZXI6IChuZXdVc2VyKSA9PiB7XG4gICAgICAgICAgdXNlciA9IG5ld1VzZXI7XG4gICAgICAgICAgc2F2ZVVzZXJUb0xvY2FsU3RvcmFnZSh1c2VyKTtcbiAgICAgICAgICBnb1RvUGFnZShQT1NUU19QQUdFKTtcbiAgICAgICAgfSxcbiAgICAgICAgdXNlcixcbiAgICAgICAgZ29Ub1BhZ2UsXG4gICAgICB9KTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBBRERfUE9TVFNfUEFHRTpcbiAgICAgIHJlbmRlckFkZFBvc3RQYWdlQ29tcG9uZW50KHtcbiAgICAgICAgYXBwRWwsXG4gICAgICAgIG9uQWRkUG9zdENsaWNrOiBhc3luYyAoeyBkZXNjcmlwdGlvbiwgaW1hZ2VVcmwgfSkgPT4ge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBwb3N0ID0gYXdhaXQgYWRkUG9zdCh7XG4gICAgICAgICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICBpbWFnZVVybCxcbiAgICAgICAgICAgICAgdG9rZW46IGdldFRva2VuKCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi0J/QvtGB0YIg0LTQvtCx0LDQstC70LXQvTpcIiwgcG9zdCk7XG4gICAgICAgICAgICBnb1RvUGFnZShQT1NUU19QQUdFKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcItCe0YjQuNCx0LrQsCDQv9GA0Lgg0LTQvtCx0LDQstC70LXQvdC40Lgg0L/QvtGB0YLQsFwiLCBlcnJvcik7XG4gICAgICAgICAgICBhbGVydChcItCe0YjQuNCx0LrQsCDQv9GA0Lgg0LTQvtCx0LDQstC70LXQvdC40Lgg0L/QvtGB0YLQsFwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBQT1NUU19QQUdFOlxuICAgICAgcmVuZGVyUG9zdHNQYWdlQ29tcG9uZW50KHsgYXBwRWwgfSk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgVVNFUl9QT1NUU19QQUdFOlxuICAgICAgYXBwRWwuaW5uZXJIVE1MID0gXCLQl9C00LXRgdGMINCx0YPQtNC10YIg0YHRgtGA0LDQvdC40YbQsCDRhNC+0YLQvtCz0YDQsNGE0LjQuSDQv9C+0LvRjNC30L7QstCw0YLQtdC70Y9cIjtcbiAgICAgIGJyZWFrO1xuICB9XG59O1xuXG4vL9CX0LDQv9GD0YHQuiDQv9GA0LjQu9C+0LbQtdC90LjRj1xuZ29Ub1BhZ2UoUE9TVFNfUEFHRSk7XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiZGF0YTppbWFnZS9zdmcreG1sLCUzQ3N2ZyBpZD0lMjdMYXllcl8xJTI3IGRhdGEtbmFtZT0lMjdMYXllciAxJTI3IHhtbG5zPSUyN2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJTI3IHZpZXdCb3g9JTI3MCAwIDEyMi44OCAxMjIuODglMjclM0UlM0N0aXRsZSUzRWFkZCUzQy90aXRsZSUzRSUzQ3BhdGggZD0lMjdNNjEuNDQsMEE2MS40Niw2MS40NiwwLDEsMSwxOCwxOCw2MS4yNSw2MS4yNSwwLDAsMSw2MS40NCwwWk04OC42LDU2LjgydjkuMjRhNCw0LDAsMCwxLTQsNEg3MFY4NC42MmE0LDQsMCwwLDEtNCw0SDU2LjgyYTQsNCwwLDAsMS00LTRWNzBIMzguMjZhNCw0LDAsMCwxLTQtNFY1Ni44MmE0LDQsMCwwLDEsNC00SDUyLjg0VjM4LjI2YTQsNCwwLDAsMSw0LTRoOS4yNGE0LDQsMCwwLDEsNCw0VjUyLjg0SDg0LjYyYTQsNCwwLDAsMSw0LDRabTguODMtMzEuMzdhNTAuOTIsNTAuOTIsMCwxLDAsMTQuOSwzNiw1MC43OCw1MC43OCwwLDAsMC0xNC45LTM2WiUyNy8lM0UlM0Mvc3ZnJTNFXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAucGFnZS1jb250YWluZXIge1xuICBwYWRkaW5nOiAwIDIwcHg7XG59XG4uYWRkLWhlYWRlci1jb250YWluZXJ7XG4gIHBhZGRpbmc6IDAgMjBweDtcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xufVxuXG4ucGFnZS1oZWFkZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZTBlMGUwO1xuICBwYWRkaW5nOiAyMHB4IDE2cHg7XG4gIG1hcmdpbi1sZWZ0OiAtMjBweDtcbiAgbWFyZ2luLXJpZ2h0OiAtMjBweDtcbn1cblxuLmxvZ28ge1xuICBtYXJnaW46IDA7XG4gIGZvbnQtc2l6ZTogMjhweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB3aWR0aDogMTMwcHg7XG59XG5cbi5oZWFkZXItY29udGFpbmVyIHtcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xufVxuXG4uaGVhZGVyLWJ1dHRvbiB7XG4gIHBhZGRpbmc6IDA7XG4gIGJvcmRlcjogbm9uZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgbGluZS1oZWlnaHQ6IDE4cHg7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmxvZ291dC1idXR0b24ge1xuICB3aWR0aDogMTMwcHg7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xufVxuXG4ucG9zdHMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBsaXN0LXN0eWxlOiBub25lO1xuICBwYWRkaW5nOiAwO1xuICBtYXJnaW46IDA7XG59XG5cbi5wb3N0LWhlYWRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLnBvc3QtaGVhZGVyX191c2VyLWltYWdlIHtcbiAgd2lkdGg6IDQwcHg7XG4gIGhlaWdodDogNDBweDtcbiAgb2JqZWN0LWZpdDogY292ZXI7XG4gIGJvcmRlci1yYWRpdXM6IDQwcHg7XG4gIG1hcmdpbi1yaWdodDogMTBweDtcbn1cblxuLnBvc3QtaW1hZ2UtY29udGFpbmVyIHtcbiAgbWFyZ2luLWxlZnQ6IC0yMHB4O1xuICBtYXJnaW4tcmlnaHQ6IC0yMHB4O1xuICBoZWlnaHQ6IDUwMHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2UwZTBlMDtcbn1cblxuLnBvc3QtaW1hZ2Uge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBtYXgtd2lkdGg6IDUwMHB4O1xuICBvYmplY3QtZml0OiBjb3Zlcjtcbn1cblxuLnBvc3QtbGlrZXMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4ubGlrZS1idXR0b24ge1xuICBib3JkZXI6IG5vbmU7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICBwYWRkaW5nOiA4cHg7XG4gIHBhZGRpbmctbGVmdDogMHB4O1xuICBwYWRkaW5nLWJvdHRvbTogNXB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi51c2VyLW5hbWUge1xuICBmb250LXdlaWdodDogNTAwO1xufVxuXG4ucG9zdC10ZXh0IHtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBsaW5lLWhlaWdodDogMThweDtcbiAgbWFyZ2luLXRvcDogNXB4O1xufVxuXG4ucG9zdC1kYXRlIHtcbiAgY29sb3I6ICM4YThhOGE7XG59XG5cbi5wb3N0ICsgLnBvc3Qge1xuICBtYXJnaW4tdG9wOiAyMHB4O1xufVxuXG4ucG9zdHMtdXNlci1oZWFkZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBtYXJnaW4tYm90dG9tOiAxMnB4O1xufVxuXG4ucG9zdHMtdXNlci1oZWFkZXJfX3VzZXItaW1hZ2Uge1xuICB3aWR0aDogNzBweDtcbiAgaGVpZ2h0OiA3MHB4O1xuICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgYm9yZGVyLXJhZGl1czogNDBweDtcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xufVxuXG4ucG9zdHMtdXNlci1oZWFkZXJfX3VzZXItbmFtZSB7XG4gIGZvbnQtc2l6ZTogMjhweDtcbiAgbGluZS1oZWlnaHQ6IDM1cHg7XG59XG5cbi5sb2FkaW5nLXBhZ2Uge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgbWFyZ2luLXRvcDogMTAwcHg7XG59XG5cbi5hZGQtcG9zdC1zaWduIHtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fX30pO1xuICBoZWlnaHQ6IDMwcHg7XG4gIHdpZHRoOiAzMHB4O1xufVxuXG4uZm9ybSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4uZm9ybS10aXRsZSB7XG4gIGZvbnQtc2l6ZTogMjhweDtcbiAgbGluZS1oZWlnaHQ6IDM1cHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmZvcm0taW5wdXRzIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiAxMHB4O1xufVxuXG4uZm9ybS1lcnJvciB7XG4gIGNvbG9yOiByZWQ7XG59XG5cbi5mb3JtLWZvb3RlciB7XG4gIG1hcmdpbi10b3A6IDUwcHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogMTBweDtcbn1cblxuLmZvcm0tZm9vdGVyLXRpdGxlIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uZmlsZS11cGxvYWQtaW1hZ2UtY29ucmFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLmZpbGUtdXBsb2FkLWltYWdlIHtcbiAgd2lkdGg6IDEwMHB4O1xuICBoZWlnaHQ6IDEwMHB4O1xuICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCBncmF5O1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG59XG5cbi5maWxlLXVwbG9hZC1sYWJlbCB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgd2lkdGg6IDEwMCU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3R5bGVzLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLGVBQWU7QUFDakI7QUFDQTtFQUNFLGVBQWU7RUFDZixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLG1CQUFtQjtFQUNuQixnQ0FBZ0M7RUFDaEMsa0JBQWtCO0VBQ2xCLGtCQUFrQjtFQUNsQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxTQUFTO0VBQ1QsZUFBZTtFQUNmLGVBQWU7RUFDZixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsWUFBWTtFQUNaLDZCQUE2QjtFQUM3QixlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLGdCQUFnQjtFQUNoQixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsZ0JBQWdCO0VBQ2hCLFVBQVU7RUFDVixTQUFTO0FBQ1g7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLG1CQUFtQjtFQUNuQixtQkFBbUI7RUFDbkIsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0VBQ1osaUJBQWlCO0VBQ2pCLG1CQUFtQjtFQUNuQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsbUJBQW1CO0VBQ25CLGFBQWE7RUFDYixhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0VBQ1osZ0JBQWdCO0VBQ2hCLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLDZCQUE2QjtFQUM3QixZQUFZO0VBQ1osaUJBQWlCO0VBQ2pCLG1CQUFtQjtFQUNuQixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGlCQUFpQjtFQUNqQixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsbUJBQW1CO0VBQ25CLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0VBQ1osaUJBQWlCO0VBQ2pCLG1CQUFtQjtFQUNuQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSx5REFBZ2dCO0VBQ2hnQixZQUFZO0VBQ1osV0FBVztBQUNiOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsU0FBUztBQUNYOztBQUVBO0VBQ0UsVUFBVTtBQUNaOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsU0FBUztBQUNYOztBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixhQUFhO0VBQ2IsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQixzQkFBc0I7RUFDdEIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLHNCQUFzQjtFQUN0QixXQUFXO0VBQ1gsa0JBQWtCO0FBQ3BCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi5wYWdlLWNvbnRhaW5lciB7XFxuICBwYWRkaW5nOiAwIDIwcHg7XFxufVxcbi5hZGQtaGVhZGVyLWNvbnRhaW5lcntcXG4gIHBhZGRpbmc6IDAgMjBweDtcXG4gIG1hcmdpbi1ib3R0b206IDhweDtcXG59XFxuXFxuLnBhZ2UtaGVhZGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlMGUwZTA7XFxuICBwYWRkaW5nOiAyMHB4IDE2cHg7XFxuICBtYXJnaW4tbGVmdDogLTIwcHg7XFxuICBtYXJnaW4tcmlnaHQ6IC0yMHB4O1xcbn1cXG5cXG4ubG9nbyB7XFxuICBtYXJnaW46IDA7XFxuICBmb250LXNpemU6IDI4cHg7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICB3aWR0aDogMTMwcHg7XFxufVxcblxcbi5oZWFkZXItY29udGFpbmVyIHtcXG4gIG1hcmdpbi1ib3R0b206IDhweDtcXG59XFxuXFxuLmhlYWRlci1idXR0b24ge1xcbiAgcGFkZGluZzogMDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgbGluZS1oZWlnaHQ6IDE4cHg7XFxuICBmb250LXdlaWdodDogNTAwO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4ubG9nb3V0LWJ1dHRvbiB7XFxuICB3aWR0aDogMTMwcHg7XFxuICB0ZXh0LWFsaWduOiByaWdodDtcXG59XFxuXFxuLnBvc3RzIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgbGlzdC1zdHlsZTogbm9uZTtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbi5wb3N0LWhlYWRlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4ucG9zdC1oZWFkZXJfX3VzZXItaW1hZ2Uge1xcbiAgd2lkdGg6IDQwcHg7XFxuICBoZWlnaHQ6IDQwcHg7XFxuICBvYmplY3QtZml0OiBjb3ZlcjtcXG4gIGJvcmRlci1yYWRpdXM6IDQwcHg7XFxuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XFxufVxcblxcbi5wb3N0LWltYWdlLWNvbnRhaW5lciB7XFxuICBtYXJnaW4tbGVmdDogLTIwcHg7XFxuICBtYXJnaW4tcmlnaHQ6IC0yMHB4O1xcbiAgaGVpZ2h0OiA1MDBweDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlMGUwZTA7XFxufVxcblxcbi5wb3N0LWltYWdlIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgbWF4LXdpZHRoOiA1MDBweDtcXG4gIG9iamVjdC1maXQ6IGNvdmVyO1xcbn1cXG5cXG4ucG9zdC1saWtlcyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5saWtlLWJ1dHRvbiB7XFxuICBib3JkZXI6IG5vbmU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gIHBhZGRpbmc6IDhweDtcXG4gIHBhZGRpbmctbGVmdDogMHB4O1xcbiAgcGFkZGluZy1ib3R0b206IDVweDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLnVzZXItbmFtZSB7XFxuICBmb250LXdlaWdodDogNTAwO1xcbn1cXG5cXG4ucG9zdC10ZXh0IHtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIGxpbmUtaGVpZ2h0OiAxOHB4O1xcbiAgbWFyZ2luLXRvcDogNXB4O1xcbn1cXG5cXG4ucG9zdC1kYXRlIHtcXG4gIGNvbG9yOiAjOGE4YThhO1xcbn1cXG5cXG4ucG9zdCArIC5wb3N0IHtcXG4gIG1hcmdpbi10b3A6IDIwcHg7XFxufVxcblxcbi5wb3N0cy11c2VyLWhlYWRlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBtYXJnaW4tYm90dG9tOiAxMnB4O1xcbn1cXG5cXG4ucG9zdHMtdXNlci1oZWFkZXJfX3VzZXItaW1hZ2Uge1xcbiAgd2lkdGg6IDcwcHg7XFxuICBoZWlnaHQ6IDcwcHg7XFxuICBvYmplY3QtZml0OiBjb3ZlcjtcXG4gIGJvcmRlci1yYWRpdXM6IDQwcHg7XFxuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XFxufVxcblxcbi5wb3N0cy11c2VyLWhlYWRlcl9fdXNlci1uYW1lIHtcXG4gIGZvbnQtc2l6ZTogMjhweDtcXG4gIGxpbmUtaGVpZ2h0OiAzNXB4O1xcbn1cXG5cXG4ubG9hZGluZy1wYWdlIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIG1hcmdpbi10b3A6IDEwMHB4O1xcbn1cXG5cXG4uYWRkLXBvc3Qtc2lnbiB7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXFxcImRhdGE6aW1hZ2Uvc3ZnK3htbCwlM0NzdmcgaWQ9J0xheWVyXzEnIGRhdGEtbmFtZT0nTGF5ZXIgMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB2aWV3Qm94PScwIDAgMTIyLjg4IDEyMi44OCclM0UlM0N0aXRsZSUzRWFkZCUzQy90aXRsZSUzRSUzQ3BhdGggZD0nTTYxLjQ0LDBBNjEuNDYsNjEuNDYsMCwxLDEsMTgsMTgsNjEuMjUsNjEuMjUsMCwwLDEsNjEuNDQsMFpNODguNiw1Ni44MnY5LjI0YTQsNCwwLDAsMS00LDRINzBWODQuNjJhNCw0LDAsMCwxLTQsNEg1Ni44MmE0LDQsMCwwLDEtNC00VjcwSDM4LjI2YTQsNCwwLDAsMS00LTRWNTYuODJhNCw0LDAsMCwxLDQtNEg1Mi44NFYzOC4yNmE0LDQsMCwwLDEsNC00aDkuMjRhNCw0LDAsMCwxLDQsNFY1Mi44NEg4NC42MmE0LDQsMCwwLDEsNCw0Wm04LjgzLTMxLjM3YTUwLjkyLDUwLjkyLDAsMSwwLDE0LjksMzYsNTAuNzgsNTAuNzgsMCwwLDAtMTQuOS0zNlonLyUzRSUzQy9zdmclM0VcXFwiKTtcXG4gIGhlaWdodDogMzBweDtcXG4gIHdpZHRoOiAzMHB4O1xcbn1cXG5cXG4uZm9ybSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG5cXG4uZm9ybS10aXRsZSB7XFxuICBmb250LXNpemU6IDI4cHg7XFxuICBsaW5lLWhlaWdodDogMzVweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLmZvcm0taW5wdXRzIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZ2FwOiAxMHB4O1xcbn1cXG5cXG4uZm9ybS1lcnJvciB7XFxuICBjb2xvcjogcmVkO1xcbn1cXG5cXG4uZm9ybS1mb290ZXIge1xcbiAgbWFyZ2luLXRvcDogNTBweDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZ2FwOiAxMHB4O1xcbn1cXG5cXG4uZm9ybS1mb290ZXItdGl0bGUge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4uZmlsZS11cGxvYWQtaW1hZ2UtY29ucmFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uZmlsZS11cGxvYWQtaW1hZ2Uge1xcbiAgd2lkdGg6IDEwMHB4O1xcbiAgaGVpZ2h0OiAxMDBweDtcXG4gIG9iamVjdC1maXQ6IGNvdmVyO1xcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xcbiAgYm9yZGVyOiAxcHggc29saWQgZ3JheTtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG59XFxuXFxuLmZpbGUtdXBsb2FkLWxhYmVsIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICB3aWR0aDogMTAwJTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuL2Fzc2V0cy9mb250cy9zdHJhdG9zc2t5ZW5nd2ViLXJlZ3VsYXIud29mZjJcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyA9IG5ldyBVUkwoXCIuL2Fzc2V0cy9mb250cy9zdHJhdG9zc2t5ZW5nd2ViLW1lZGl1bS53b2ZmMlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fID0gbmV3IFVSTChcIi4vYXNzZXRzL2ltYWdlcy9saWtlLWFjdGl2ZS5zdmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgLyogXG4gINCt0YLQviDRgdGC0LjQu9C4INCU0LjQt9Cw0LnQvSDRgdC40YHRgtC10LzRiywg0YHQutCy0L7Qt9C90YvQtSDRgdGC0LjQu9C4INC00LvRjyDRjdC70LXQvNC10L3RgtC+0LIg0LjQvdGC0LXRgNGE0LXQudGB0LBcbiAg0LLRgdC10LPQviDQv9GA0LjQu9C+0LbQtdC90LjRjzog0YjRgNC40YTRgtGLLCDQutC90L7Qv9C60LgsINC40L3Qv9GD0YLRiyDQuCDRgtCw0Log0LTQsNC70LXQtVxuKi9cblxuQGZvbnQtZmFjZSB7XG4gIGZvbnQtZmFtaWx5OiBcIlN0cmF0b3NTa3llbmdcIjtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXdlaWdodDogNDAwO1xuICBmb250LWRpc3BsYXk6IHN3YXA7XG4gIHNyYzogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fX30pIGZvcm1hdChcIndvZmYyXCIpO1xufVxuXG5AZm9udC1mYWNlIHtcbiAgZm9udC1mYW1pbHk6IFwiU3RyYXRvc1NreWVuZ1wiO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGZvbnQtZGlzcGxheTogc3dhcDtcbiAgc3JjOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19ffSkgZm9ybWF0KFwid29mZjJcIik7XG59XG5cbmh0bWwge1xuICAvKiDRgdC60YDRi9Cy0LDQtdGCINGB0LrRgNC+0LvQsdCw0YDRiyDQsiBmaXJlZm94ICovXG4gIHNjcm9sbGJhci13aWR0aDogbm9uZTtcbn1cblxuYm9keSB7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMDtcbiAgZm9udC1mYW1pbHk6IFN0cmF0b3NTa3llbmc7XG4gIG92ZXJmbG93OiBhdXRvO1xuICBmb250LXNpemU6IDE0cHg7XG4gIGxpbmUtaGVpZ2h0OiAxOHB4O1xufVxuXG4vKiDRgdC60YDRi9Cy0LDQtdGCINGB0LrRgNC+0LvQsdCw0YDRiyDQsiBjaHJvbWUgKi9cbmJvZHk6Oi13ZWJraXQtc2Nyb2xsYmFyIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxucCB7XG4gIG1hcmdpbjogMDtcbn1cblxuLmJ1dHRvbixcbi5zZWNvbmRhcnktYnV0dG9uIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHBhZGRpbmc6IDEwcHggMTNweCAxM3B4O1xuICBmb250LXNpemU6IDE4cHg7XG4gIGxpbmUtaGVpZ2h0OiAyMnB4O1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICM1NjVlZWY7XG4gIGNvbG9yOiAjZmZmZmZmO1xuICBib3JkZXI6IG5vbmU7XG59XG5cbi5saW5rLWJ1dHRvbiB7XG4gIGRpc3BsYXk6IGlubGluZTtcbiAgYm9yZGVyOiAwO1xuICBwYWRkaW5nOiAwO1xuICBiYWNrZ3JvdW5kOiBub25lO1xuICBjb2xvcjogIzU2NWVlZjtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uYnV0dG9uOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzZkNzNmZjtcbn1cblxuLmJ1dHRvbltkaXNhYmxlZD1cInRydWVcIl0sXG4uc2Vjb25kYXJ5LWJ1dHRvbltkaXNhYmxlZD1cInRydWVcIl0ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjRmNWY2O1xuICBjb2xvcjogcmdiYSgxNTMsIDE1MywgMTUzLCAwLjYpO1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbn1cblxuLmJ1dHRvbjphY3RpdmUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNGY1NmNlO1xufVxuXG4uc2Vjb25kYXJ5LWJ1dHRvbiB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlZGVjZmY7XG4gIGNvbG9yOiAjNTY1ZWVmO1xufVxuXG4uc2Vjb25kYXJ5LWJ1dHRvbjpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmMmVlZmY7XG59XG5cbi5zZWNvbmRhcnktYnV0dG9uOmFjdGl2ZSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNkOGQ3ZmY7XG59XG5cbi5pbnB1dCB7XG4gIGhlaWdodDogMzZweDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgcGFkZGluZzogMTVweDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBsaW5lLWhlaWdodDogMThweDtcbiAgY29sb3I6IHJnYig0LCAxOCwgMjcpO1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U4ZThlODtcbn1cblxuLmlucHV0IC4tZXJyb3Ige1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xufVxuXG4uaW5wdXQ6Zm9jdXMge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xufVxuXG4udGV4dGFyZWEge1xuICBwYWRkaW5nOiAxNXB4O1xuICByZXNpemU6IG5vbmU7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMHB4O1xufVxuXG5zdHJvbmcge1xuICBmb250LXdlaWdodDogNTAwO1xufVxuXG4vKiog0JDQvdC40LzQsNGG0LjRjyDQt9Cw0LPRgNGD0LfQutC4ICoqL1xuLmxvYWRlciB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB3aWR0aDogODBweDtcbiAgaGVpZ2h0OiA4MHB4O1xufVxuLmxvYWRlciBkaXYge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogOHB4O1xuICB3aWR0aDogMTZweDtcbiAgYmFja2dyb3VuZDogIzAwMDtcbiAgYW5pbWF0aW9uOiBsb2FkZXIgMS4ycyBjdWJpYy1iZXppZXIoMCwgMC41LCAwLjUsIDEpIGluZmluaXRlO1xufVxuLmxvYWRlciBkaXY6bnRoLWNoaWxkKDEpIHtcbiAgbGVmdDogOHB4O1xuICBhbmltYXRpb24tZGVsYXk6IC0wLjI0cztcbn1cbi5sb2FkZXIgZGl2Om50aC1jaGlsZCgyKSB7XG4gIGxlZnQ6IDMycHg7XG4gIGFuaW1hdGlvbi1kZWxheTogLTAuMTJzO1xufVxuLmxvYWRlciBkaXY6bnRoLWNoaWxkKDMpIHtcbiAgbGVmdDogNTZweDtcbiAgYW5pbWF0aW9uLWRlbGF5OiAwO1xufVxuQGtleWZyYW1lcyBsb2FkZXIge1xuICAwJSB7XG4gICAgdG9wOiA4cHg7XG4gICAgaGVpZ2h0OiA2NHB4O1xuICB9XG4gIDUwJSxcbiAgMTAwJSB7XG4gICAgdG9wOiAyNHB4O1xuICAgIGhlaWdodDogMzJweDtcbiAgfVxufVxuXG4uaW5wdXQtLWxhcmdlIHtcbiAgaGVpZ2h0OiAxNTBweDsgICAgICAgICAgICAgICBcbiAgcGFkZGluZzogMTJweCAxNXB4OyAgICAgICAgICBcbiAgbWFyZ2luLWJvdHRvbTogMTVweDtcbiAgd2lkdGg6IDEwMCU7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7ICAgICBcbiAgYm9yZGVyLXJhZGl1czogOHB4OyAgICAgICAgICBcbiAgZm9udC1zaXplOiAxNnB4OyAgICAgICAgICAgICBcbiAgbGluZS1oZWlnaHQ6IDEuNTtcbiAgcmVzaXplOiB2ZXJ0aWNhbDsgICAgICAgICAgICAgXG4gIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciAwLjJzLCBib3gtc2hhZG93IDAuMnM7XG59XG5cbi5pbnB1dC0tbGFyZ2U6Zm9jdXMge1xuICBvdXRsaW5lOiBub25lO1xuICBib3JkZXItY29sb3I6ICM0MDllZmY7ICAgICAgIFxuICBib3gtc2hhZG93OiAwIDAgNXB4IHJnYmEoNjQsIDE1OCwgMjU1LCAwLjUpO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xufVxuXG5cbi5pbnB1dC0tZmlsZSB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogMTAwJTtcbiAgcGFkZGluZzogMTJweCAxNXB4O1xuICBmb250LXNpemU6IDE0cHg7XG4gIGxpbmUtaGVpZ2h0OiAxOHB4O1xuICBjb2xvcjogIzA0MTIxYjtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4ycywgYm9yZGVyLWNvbG9yIDAuMnM7XG59XG5cbi5pbnB1dC0tZmlsZTpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlMGUwZTA7XG59XG5cbi5idXR0b24tLWxhcmdlIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHBhZGRpbmc6IDEwcHggMTNweCAxM3B4O1xuICBmb250LXNpemU6IDE4cHg7XG4gIGxpbmUtaGVpZ2h0OiAyMnB4O1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICM1NjVlZWY7XG4gIGNvbG9yOiAjZmZmZmZmO1xuICBib3JkZXI6IG5vbmU7XG59XG5cbi5idXR0b24tLWxhcmdlOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzY2YjFmZjtcbn1cblxuLmJ1dHRvbi0tbGFyZ2U6ZGlzYWJsZWQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYTBjZmZmO1xuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xufVxuXG5cbi5kZWxldGUtYnV0dG9uIHtcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gIHBhZGRpbmc6IDRweCA4cHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNiN2I2YjY7XG4gIGNvbG9yOiBibGFjaztcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZm9udC1zaXplOiAxMnB4O1xufVxuXG4uZGVsZXRlLWJ1dHRvbjpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZjc4NzU7XG59XG5cbi5saWtlLXB1bHNlIHtcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjMpO1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlO1xufVxuXG4uaGVhcnQtb3ZlcmxheSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiA1MCU7XG4gIGxlZnQ6IDUwJTtcbiAgd2lkdGg6IDEwMHB4O1xuICBoZWlnaHQ6IDEwMHB4O1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8yX19ffSk7XG4gIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKSBzY2FsZSgwKTtcbiAgb3BhY2l0eTogMDtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2UsIG9wYWNpdHkgMC4zcyBlYXNlO1xufVxuXG4uaGVhcnQtb3ZlcmxheS5zaG93LWhlYXJ0IHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSkgc2NhbGUoMS4yKTtcbiAgb3BhY2l0eTogMTtcbn1cbkBrZXlmcmFtZXMgaGVhcnQtcG9wIHtcbiAgMCUge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpIHNjYWxlKDAuOCk7XG4gICAgb3BhY2l0eTogMC44O1xuICB9XG4gIDUwJSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSkgc2NhbGUoMS41KTtcbiAgICBvcGFjaXR5OiAxO1xuICB9XG4gIDEwMCUge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpIHNjYWxlKDEpO1xuICAgIG9wYWNpdHk6IDA7XG4gIH1cbn1cblxuLnBvc3RzLXVzZXItaGVhZGVyX191c2VyLW5hbWUge1xuICBmb250LXNpemU6IDI4cHg7XG4gIGxpbmUtaGVpZ2h0OiAzNXB4O1xufVxuLnBvc3RzLXVzZXItaGVhZGVyX191c2VyLWltYWdle1xuICB3aWR0aDogNzBweDtcbiAgaGVpZ2h0OiA3MHB4O1xuICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgYm9yZGVyLXJhZGl1czogNDBweDtcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vdWkta2l0LmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTs7O0NBR0M7O0FBRUQ7RUFDRSw0QkFBNEI7RUFDNUIsa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixrQkFBa0I7RUFDbEIsNERBQXlFO0FBQzNFOztBQUVBO0VBQ0UsNEJBQTRC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QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsK0JBQStCO0FBQ2pDOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFFBQVE7RUFDUixTQUFTO0VBQ1QsWUFBWTtFQUNaLGFBQWE7RUFDYix5REFBd0Q7RUFDeEQsd0JBQXdCO0VBQ3hCLDRCQUE0QjtFQUM1QiwyQkFBMkI7RUFDM0IseUNBQXlDO0VBQ3pDLFVBQVU7RUFDVixvQkFBb0I7RUFDcEIsa0RBQWtEO0FBQ3BEOztBQUVBO0VBQ0UsMkNBQTJDO0VBQzNDLFVBQVU7QUFDWjtBQUNBO0VBQ0U7SUFDRSwyQ0FBMkM7SUFDM0MsWUFBWTtFQUNkO0VBQ0E7SUFDRSwyQ0FBMkM7SUFDM0MsVUFBVTtFQUNaO0VBQ0E7SUFDRSx5Q0FBeUM7SUFDekMsVUFBVTtFQUNaO0FBQ0Y7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsaUJBQWlCO0FBQ25CO0FBQ0E7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLGlCQUFpQjtFQUNqQixtQkFBbUI7RUFDbkIsa0JBQWtCO0FBQ3BCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qIFxcbiAg0K3RgtC+INGB0YLQuNC70Lgg0JTQuNC30LDQudC9INGB0LjRgdGC0LXQvNGLLCDRgdC60LLQvtC30L3Ri9C1INGB0YLQuNC70Lgg0LTQu9GPINGN0LvQtdC80LXQvdGC0L7QsiDQuNC90YLQtdGA0YTQtdC50YHQsFxcbiAg0LLRgdC10LPQviDQv9GA0LjQu9C+0LbQtdC90LjRjzog0YjRgNC40YTRgtGLLCDQutC90L7Qv9C60LgsINC40L3Qv9GD0YLRiyDQuCDRgtCw0Log0LTQsNC70LXQtVxcbiovXFxuXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogXFxcIlN0cmF0b3NTa3llbmdcXFwiO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGZvbnQtZGlzcGxheTogc3dhcDtcXG4gIHNyYzogdXJsKFxcXCIuL2Fzc2V0cy9mb250cy9zdHJhdG9zc2t5ZW5nd2ViLXJlZ3VsYXIud29mZjJcXFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIik7XFxufVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJTdHJhdG9zU2t5ZW5nXFxcIjtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICBmb250LWRpc3BsYXk6IHN3YXA7XFxuICBzcmM6IHVybChcXFwiLi9hc3NldHMvZm9udHMvc3RyYXRvc3NreWVuZ3dlYi1tZWRpdW0ud29mZjJcXFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIik7XFxufVxcblxcbmh0bWwge1xcbiAgLyog0YHQutGA0YvQstCw0LXRgiDRgdC60YDQvtC70LHQsNGA0Ysg0LIgZmlyZWZveCAqL1xcbiAgc2Nyb2xsYmFyLXdpZHRoOiBub25lO1xcbn1cXG5cXG5ib2R5IHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBmb250LWZhbWlseTogU3RyYXRvc1NreWVuZztcXG4gIG92ZXJmbG93OiBhdXRvO1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgbGluZS1oZWlnaHQ6IDE4cHg7XFxufVxcblxcbi8qINGB0LrRgNGL0LLQsNC10YIg0YHQutGA0L7Qu9Cx0LDRgNGLINCyIGNocm9tZSAqL1xcbmJvZHk6Oi13ZWJraXQtc2Nyb2xsYmFyIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbnAge1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG4uYnV0dG9uLFxcbi5zZWNvbmRhcnktYnV0dG9uIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgcGFkZGluZzogMTBweCAxM3B4IDEzcHg7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICBsaW5lLWhlaWdodDogMjJweDtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM1NjVlZWY7XFxuICBjb2xvcjogI2ZmZmZmZjtcXG4gIGJvcmRlcjogbm9uZTtcXG59XFxuXFxuLmxpbmstYnV0dG9uIHtcXG4gIGRpc3BsYXk6IGlubGluZTtcXG4gIGJvcmRlcjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBiYWNrZ3JvdW5kOiBub25lO1xcbiAgY29sb3I6ICM1NjVlZWY7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5idXR0b246aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzZkNzNmZjtcXG59XFxuXFxuLmJ1dHRvbltkaXNhYmxlZD1cXFwidHJ1ZVxcXCJdLFxcbi5zZWNvbmRhcnktYnV0dG9uW2Rpc2FibGVkPVxcXCJ0cnVlXFxcIl0ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y0ZjVmNjtcXG4gIGNvbG9yOiByZ2JhKDE1MywgMTUzLCAxNTMsIDAuNik7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG59XFxuXFxuLmJ1dHRvbjphY3RpdmUge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzRmNTZjZTtcXG59XFxuXFxuLnNlY29uZGFyeS1idXR0b24ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VkZWNmZjtcXG4gIGNvbG9yOiAjNTY1ZWVmO1xcbn1cXG5cXG4uc2Vjb25kYXJ5LWJ1dHRvbjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjJlZWZmO1xcbn1cXG5cXG4uc2Vjb25kYXJ5LWJ1dHRvbjphY3RpdmUge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Q4ZDdmZjtcXG59XFxuXFxuLmlucHV0IHtcXG4gIGhlaWdodDogMzZweDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBwYWRkaW5nOiAxNXB4O1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgbGluZS1oZWlnaHQ6IDE4cHg7XFxuICBjb2xvcjogcmdiKDQsIDE4LCAyNyk7XFxuICBib3JkZXI6IG5vbmU7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZThlOGU4O1xcbn1cXG5cXG4uaW5wdXQgLi1lcnJvciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbn1cXG5cXG4uaW5wdXQ6Zm9jdXMge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG59XFxuXFxuLnRleHRhcmVhIHtcXG4gIHBhZGRpbmc6IDE1cHg7XFxuICByZXNpemU6IG5vbmU7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwcHg7XFxufVxcblxcbnN0cm9uZyB7XFxuICBmb250LXdlaWdodDogNTAwO1xcbn1cXG5cXG4vKiog0JDQvdC40LzQsNGG0LjRjyDQt9Cw0LPRgNGD0LfQutC4ICoqL1xcbi5sb2FkZXIge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgd2lkdGg6IDgwcHg7XFxuICBoZWlnaHQ6IDgwcHg7XFxufVxcbi5sb2FkZXIgZGl2IHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDhweDtcXG4gIHdpZHRoOiAxNnB4O1xcbiAgYmFja2dyb3VuZDogIzAwMDtcXG4gIGFuaW1hdGlvbjogbG9hZGVyIDEuMnMgY3ViaWMtYmV6aWVyKDAsIDAuNSwgMC41LCAxKSBpbmZpbml0ZTtcXG59XFxuLmxvYWRlciBkaXY6bnRoLWNoaWxkKDEpIHtcXG4gIGxlZnQ6IDhweDtcXG4gIGFuaW1hdGlvbi1kZWxheTogLTAuMjRzO1xcbn1cXG4ubG9hZGVyIGRpdjpudGgtY2hpbGQoMikge1xcbiAgbGVmdDogMzJweDtcXG4gIGFuaW1hdGlvbi1kZWxheTogLTAuMTJzO1xcbn1cXG4ubG9hZGVyIGRpdjpudGgtY2hpbGQoMykge1xcbiAgbGVmdDogNTZweDtcXG4gIGFuaW1hdGlvbi1kZWxheTogMDtcXG59XFxuQGtleWZyYW1lcyBsb2FkZXIge1xcbiAgMCUge1xcbiAgICB0b3A6IDhweDtcXG4gICAgaGVpZ2h0OiA2NHB4O1xcbiAgfVxcbiAgNTAlLFxcbiAgMTAwJSB7XFxuICAgIHRvcDogMjRweDtcXG4gICAgaGVpZ2h0OiAzMnB4O1xcbiAgfVxcbn1cXG5cXG4uaW5wdXQtLWxhcmdlIHtcXG4gIGhlaWdodDogMTUwcHg7ICAgICAgICAgICAgICAgXFxuICBwYWRkaW5nOiAxMnB4IDE1cHg7ICAgICAgICAgIFxcbiAgbWFyZ2luLWJvdHRvbTogMTVweDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7ICAgICBcXG4gIGJvcmRlci1yYWRpdXM6IDhweDsgICAgICAgICAgXFxuICBmb250LXNpemU6IDE2cHg7ICAgICAgICAgICAgIFxcbiAgbGluZS1oZWlnaHQ6IDEuNTtcXG4gIHJlc2l6ZTogdmVydGljYWw7ICAgICAgICAgICAgIFxcbiAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIDAuMnMsIGJveC1zaGFkb3cgMC4ycztcXG59XFxuXFxuLmlucHV0LS1sYXJnZTpmb2N1cyB7XFxuICBvdXRsaW5lOiBub25lO1xcbiAgYm9yZGVyLWNvbG9yOiAjNDA5ZWZmOyAgICAgICBcXG4gIGJveC1zaGFkb3c6IDAgMCA1cHggcmdiYSg2NCwgMTU4LCAyNTUsIDAuNSk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbn1cXG5cXG5cXG4uaW5wdXQtLWZpbGUge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICB3aWR0aDogMTAwJTtcXG4gIHBhZGRpbmc6IDEycHggMTVweDtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIGxpbmUtaGVpZ2h0OiAxOHB4O1xcbiAgY29sb3I6ICMwNDEyMWI7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y1ZjVmNTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4ycywgYm9yZGVyLWNvbG9yIDAuMnM7XFxufVxcblxcbi5pbnB1dC0tZmlsZTpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTBlMGUwO1xcbn1cXG5cXG4uYnV0dG9uLS1sYXJnZSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHBhZGRpbmc6IDEwcHggMTNweCAxM3B4O1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgbGluZS1oZWlnaHQ6IDIycHg7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTY1ZWVmO1xcbiAgY29sb3I6ICNmZmZmZmY7XFxuICBib3JkZXI6IG5vbmU7XFxufVxcblxcbi5idXR0b24tLWxhcmdlOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM2NmIxZmY7XFxufVxcblxcbi5idXR0b24tLWxhcmdlOmRpc2FibGVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNhMGNmZmY7XFxuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xcbn1cXG5cXG5cXG4uZGVsZXRlLWJ1dHRvbiB7XFxuICBtYXJnaW4tbGVmdDogYXV0bztcXG4gIHBhZGRpbmc6IDRweCA4cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYjdiNmI2O1xcbiAgY29sb3I6IGJsYWNrO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgZm9udC1zaXplOiAxMnB4O1xcbn1cXG5cXG4uZGVsZXRlLWJ1dHRvbjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmY3ODc1O1xcbn1cXG5cXG4ubGlrZS1wdWxzZSB7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDEuMyk7XFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlO1xcbn1cXG5cXG4uaGVhcnQtb3ZlcmxheSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDUwJTtcXG4gIGxlZnQ6IDUwJTtcXG4gIHdpZHRoOiAxMDBweDtcXG4gIGhlaWdodDogMTAwcHg7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy4vYXNzZXRzL2ltYWdlcy9saWtlLWFjdGl2ZS5zdmcnKTtcXG4gIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcXG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKSBzY2FsZSgwKTtcXG4gIG9wYWNpdHk6IDA7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2UsIG9wYWNpdHkgMC4zcyBlYXNlO1xcbn1cXG5cXG4uaGVhcnQtb3ZlcmxheS5zaG93LWhlYXJ0IHtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpIHNjYWxlKDEuMik7XFxuICBvcGFjaXR5OiAxO1xcbn1cXG5Aa2V5ZnJhbWVzIGhlYXJ0LXBvcCB7XFxuICAwJSB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpIHNjYWxlKDAuOCk7XFxuICAgIG9wYWNpdHk6IDAuODtcXG4gIH1cXG4gIDUwJSB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpIHNjYWxlKDEuNSk7XFxuICAgIG9wYWNpdHk6IDE7XFxuICB9XFxuICAxMDAlIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSkgc2NhbGUoMSk7XFxuICAgIG9wYWNpdHk6IDA7XFxuICB9XFxufVxcblxcbi5wb3N0cy11c2VyLWhlYWRlcl9fdXNlci1uYW1lIHtcXG4gIGZvbnQtc2l6ZTogMjhweDtcXG4gIGxpbmUtaGVpZ2h0OiAzNXB4O1xcbn1cXG4ucG9zdHMtdXNlci1oZWFkZXJfX3VzZXItaW1hZ2V7XFxuICB3aWR0aDogNzBweDtcXG4gIGhlaWdodDogNzBweDtcXG4gIG9iamVjdC1maXQ6IGNvdmVyO1xcbiAgYm9yZGVyLXJhZGl1czogNDBweDtcXG4gIG1hcmdpbi1yaWdodDogMTBweDtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTtcblxuICAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfVxuXG4gIC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwibGV0IGRlZmF1bHRPcHRpb25zID0ge307XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREZWZhdWx0T3B0aW9ucygpIHtcbiAgcmV0dXJuIGRlZmF1bHRPcHRpb25zO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0RGVmYXVsdE9wdGlvbnMobmV3T3B0aW9ucykge1xuICBkZWZhdWx0T3B0aW9ucyA9IG5ld09wdGlvbnM7XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gZ2V0Um91bmRpbmdNZXRob2QobWV0aG9kKSB7XG4gIHJldHVybiAobnVtYmVyKSA9PiB7XG4gICAgY29uc3Qgcm91bmQgPSBtZXRob2QgPyBNYXRoW21ldGhvZF0gOiBNYXRoLnRydW5jO1xuICAgIGNvbnN0IHJlc3VsdCA9IHJvdW5kKG51bWJlcik7XG4gICAgLy8gUHJldmVudCBuZWdhdGl2ZSB6ZXJvXG4gICAgcmV0dXJuIHJlc3VsdCA9PT0gMCA/IDAgOiByZXN1bHQ7XG4gIH07XG59XG4iLCJpbXBvcnQgeyB0b0RhdGUgfSBmcm9tIFwiLi4vdG9EYXRlLmpzXCI7XG5cbi8qKlxuICogR29vZ2xlIENocm9tZSBhcyBvZiA2Ny4wLjMzOTYuODcgaW50cm9kdWNlZCB0aW1lem9uZXMgd2l0aCBvZmZzZXQgdGhhdCBpbmNsdWRlcyBzZWNvbmRzLlxuICogVGhleSB1c3VhbGx5IGFwcGVhciBmb3IgZGF0ZXMgdGhhdCBkZW5vdGUgdGltZSBiZWZvcmUgdGhlIHRpbWV6b25lcyB3ZXJlIGludHJvZHVjZWRcbiAqIChlLmcuIGZvciAnRXVyb3BlL1ByYWd1ZScgdGltZXpvbmUgdGhlIG9mZnNldCBpcyBHTVQrMDA6NTc6NDQgYmVmb3JlIDEgT2N0b2JlciAxODkxXG4gKiBhbmQgR01UKzAxOjAwOjAwIGFmdGVyIHRoYXQgZGF0ZSlcbiAqXG4gKiBEYXRlI2dldFRpbWV6b25lT2Zmc2V0IHJldHVybnMgdGhlIG9mZnNldCBpbiBtaW51dGVzIGFuZCB3b3VsZCByZXR1cm4gNTcgZm9yIHRoZSBleGFtcGxlIGFib3ZlLFxuICogd2hpY2ggd291bGQgbGVhZCB0byBpbmNvcnJlY3QgY2FsY3VsYXRpb25zLlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgdGltZXpvbmUgb2Zmc2V0IGluIG1pbGxpc2Vjb25kcyB0aGF0IHRha2VzIHNlY29uZHMgaW4gYWNjb3VudC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFRpbWV6b25lT2Zmc2V0SW5NaWxsaXNlY29uZHMoZGF0ZSkge1xuICBjb25zdCBfZGF0ZSA9IHRvRGF0ZShkYXRlKTtcbiAgY29uc3QgdXRjRGF0ZSA9IG5ldyBEYXRlKFxuICAgIERhdGUuVVRDKFxuICAgICAgX2RhdGUuZ2V0RnVsbFllYXIoKSxcbiAgICAgIF9kYXRlLmdldE1vbnRoKCksXG4gICAgICBfZGF0ZS5nZXREYXRlKCksXG4gICAgICBfZGF0ZS5nZXRIb3VycygpLFxuICAgICAgX2RhdGUuZ2V0TWludXRlcygpLFxuICAgICAgX2RhdGUuZ2V0U2Vjb25kcygpLFxuICAgICAgX2RhdGUuZ2V0TWlsbGlzZWNvbmRzKCksXG4gICAgKSxcbiAgKTtcbiAgdXRjRGF0ZS5zZXRVVENGdWxsWWVhcihfZGF0ZS5nZXRGdWxsWWVhcigpKTtcbiAgcmV0dXJuICtkYXRlIC0gK3V0Y0RhdGU7XG59XG4iLCJpbXBvcnQgeyBjb25zdHJ1Y3RGcm9tIH0gZnJvbSBcIi4uL2NvbnN0cnVjdEZyb20uanNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZURhdGVzKGNvbnRleHQsIC4uLmRhdGVzKSB7XG4gIGNvbnN0IG5vcm1hbGl6ZSA9IGNvbnN0cnVjdEZyb20uYmluZChcbiAgICBudWxsLFxuICAgIGNvbnRleHQgfHwgZGF0ZXMuZmluZCgoZGF0ZSkgPT4gdHlwZW9mIGRhdGUgPT09IFwib2JqZWN0XCIpLFxuICApO1xuICByZXR1cm4gZGF0ZXMubWFwKG5vcm1hbGl6ZSk7XG59XG4iLCJpbXBvcnQgeyB0b0RhdGUgfSBmcm9tIFwiLi90b0RhdGUuanNcIjtcblxuLyoqXG4gKiBAbmFtZSBjb21wYXJlQXNjXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IENvbXBhcmUgdGhlIHR3byBkYXRlcyBhbmQgcmV0dXJuIC0xLCAwIG9yIDEuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDb21wYXJlIHRoZSB0d28gZGF0ZXMgYW5kIHJldHVybiAxIGlmIHRoZSBmaXJzdCBkYXRlIGlzIGFmdGVyIHRoZSBzZWNvbmQsXG4gKiAtMSBpZiB0aGUgZmlyc3QgZGF0ZSBpcyBiZWZvcmUgdGhlIHNlY29uZCBvciAwIGlmIGRhdGVzIGFyZSBlcXVhbC5cbiAqXG4gKiBAcGFyYW0gZGF0ZUxlZnQgLSBUaGUgZmlyc3QgZGF0ZSB0byBjb21wYXJlXG4gKiBAcGFyYW0gZGF0ZVJpZ2h0IC0gVGhlIHNlY29uZCBkYXRlIHRvIGNvbXBhcmVcbiAqXG4gKiBAcmV0dXJucyBUaGUgcmVzdWx0IG9mIHRoZSBjb21wYXJpc29uXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIENvbXBhcmUgMTEgRmVicnVhcnkgMTk4NyBhbmQgMTAgSnVseSAxOTg5OlxuICogY29uc3QgcmVzdWx0ID0gY29tcGFyZUFzYyhuZXcgRGF0ZSgxOTg3LCAxLCAxMSksIG5ldyBEYXRlKDE5ODksIDYsIDEwKSlcbiAqIC8vPT4gLTFcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU29ydCB0aGUgYXJyYXkgb2YgZGF0ZXM6XG4gKiBjb25zdCByZXN1bHQgPSBbXG4gKiAgIG5ldyBEYXRlKDE5OTUsIDYsIDIpLFxuICogICBuZXcgRGF0ZSgxOTg3LCAxLCAxMSksXG4gKiAgIG5ldyBEYXRlKDE5ODksIDYsIDEwKVxuICogXS5zb3J0KGNvbXBhcmVBc2MpXG4gKiAvLz0+IFtcbiAqIC8vICAgV2VkIEZlYiAxMSAxOTg3IDAwOjAwOjAwLFxuICogLy8gICBNb24gSnVsIDEwIDE5ODkgMDA6MDA6MDAsXG4gKiAvLyAgIFN1biBKdWwgMDIgMTk5NSAwMDowMDowMFxuICogLy8gXVxuICovXG5leHBvcnQgZnVuY3Rpb24gY29tcGFyZUFzYyhkYXRlTGVmdCwgZGF0ZVJpZ2h0KSB7XG4gIGNvbnN0IGRpZmYgPSArdG9EYXRlKGRhdGVMZWZ0KSAtICt0b0RhdGUoZGF0ZVJpZ2h0KTtcblxuICBpZiAoZGlmZiA8IDApIHJldHVybiAtMTtcbiAgZWxzZSBpZiAoZGlmZiA+IDApIHJldHVybiAxO1xuXG4gIC8vIFJldHVybiAwIGlmIGRpZmYgaXMgMDsgcmV0dXJuIE5hTiBpZiBkaWZmIGlzIE5hTlxuICByZXR1cm4gZGlmZjtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBjb21wYXJlQXNjO1xuIiwiLyoqXG4gKiBAbW9kdWxlIGNvbnN0YW50c1xuICogQHN1bW1hcnkgVXNlZnVsIGNvbnN0YW50c1xuICogQGRlc2NyaXB0aW9uXG4gKiBDb2xsZWN0aW9uIG9mIHVzZWZ1bCBkYXRlIGNvbnN0YW50cy5cbiAqXG4gKiBUaGUgY29uc3RhbnRzIGNvdWxkIGJlIGltcG9ydGVkIGZyb20gYGRhdGUtZm5zL2NvbnN0YW50c2A6XG4gKlxuICogYGBgdHNcbiAqIGltcG9ydCB7IG1heFRpbWUsIG1pblRpbWUgfSBmcm9tIFwiLi9jb25zdGFudHMvZGF0ZS1mbnMvY29uc3RhbnRzXCI7XG4gKlxuICogZnVuY3Rpb24gaXNBbGxvd2VkVGltZSh0aW1lKSB7XG4gKiAgIHJldHVybiB0aW1lIDw9IG1heFRpbWUgJiYgdGltZSA+PSBtaW5UaW1lO1xuICogfVxuICogYGBgXG4gKi9cblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIGRheXNJbldlZWtcbiAqIEBzdW1tYXJ5IERheXMgaW4gMSB3ZWVrLlxuICovXG5leHBvcnQgY29uc3QgZGF5c0luV2VlayA9IDc7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBkYXlzSW5ZZWFyXG4gKiBAc3VtbWFyeSBEYXlzIGluIDEgeWVhci5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEhvdyBtYW55IGRheXMgaW4gYSB5ZWFyLlxuICpcbiAqIE9uZSB5ZWFycyBlcXVhbHMgMzY1LjI0MjUgZGF5cyBhY2NvcmRpbmcgdG8gdGhlIGZvcm11bGE6XG4gKlxuICogPiBMZWFwIHllYXIgb2NjdXJzIGV2ZXJ5IDQgeWVhcnMsIGV4Y2VwdCBmb3IgeWVhcnMgdGhhdCBhcmUgZGl2aXNpYmxlIGJ5IDEwMCBhbmQgbm90IGRpdmlzaWJsZSBieSA0MDAuXG4gKiA+IDEgbWVhbiB5ZWFyID0gKDM2NSsxLzQtMS8xMDArMS80MDApIGRheXMgPSAzNjUuMjQyNSBkYXlzXG4gKi9cbmV4cG9ydCBjb25zdCBkYXlzSW5ZZWFyID0gMzY1LjI0MjU7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBtYXhUaW1lXG4gKiBAc3VtbWFyeSBNYXhpbXVtIGFsbG93ZWQgdGltZS5cbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0IHsgbWF4VGltZSB9IGZyb20gXCIuL2NvbnN0YW50cy9kYXRlLWZucy9jb25zdGFudHNcIjtcbiAqXG4gKiBjb25zdCBpc1ZhbGlkID0gODY0MDAwMDAwMDAwMDAwMSA8PSBtYXhUaW1lO1xuICogLy89PiBmYWxzZVxuICpcbiAqIG5ldyBEYXRlKDg2NDAwMDAwMDAwMDAwMDEpO1xuICogLy89PiBJbnZhbGlkIERhdGVcbiAqL1xuZXhwb3J0IGNvbnN0IG1heFRpbWUgPSBNYXRoLnBvdygxMCwgOCkgKiAyNCAqIDYwICogNjAgKiAxMDAwO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgbWluVGltZVxuICogQHN1bW1hcnkgTWluaW11bSBhbGxvd2VkIHRpbWUuXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCB7IG1pblRpbWUgfSBmcm9tIFwiLi9jb25zdGFudHMvZGF0ZS1mbnMvY29uc3RhbnRzXCI7XG4gKlxuICogY29uc3QgaXNWYWxpZCA9IC04NjQwMDAwMDAwMDAwMDAxID49IG1pblRpbWU7XG4gKiAvLz0+IGZhbHNlXG4gKlxuICogbmV3IERhdGUoLTg2NDAwMDAwMDAwMDAwMDEpXG4gKiAvLz0+IEludmFsaWQgRGF0ZVxuICovXG5leHBvcnQgY29uc3QgbWluVGltZSA9IC1tYXhUaW1lO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgbWlsbGlzZWNvbmRzSW5XZWVrXG4gKiBAc3VtbWFyeSBNaWxsaXNlY29uZHMgaW4gMSB3ZWVrLlxuICovXG5leHBvcnQgY29uc3QgbWlsbGlzZWNvbmRzSW5XZWVrID0gNjA0ODAwMDAwO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgbWlsbGlzZWNvbmRzSW5EYXlcbiAqIEBzdW1tYXJ5IE1pbGxpc2Vjb25kcyBpbiAxIGRheS5cbiAqL1xuZXhwb3J0IGNvbnN0IG1pbGxpc2Vjb25kc0luRGF5ID0gODY0MDAwMDA7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBtaWxsaXNlY29uZHNJbk1pbnV0ZVxuICogQHN1bW1hcnkgTWlsbGlzZWNvbmRzIGluIDEgbWludXRlXG4gKi9cbmV4cG9ydCBjb25zdCBtaWxsaXNlY29uZHNJbk1pbnV0ZSA9IDYwMDAwO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgbWlsbGlzZWNvbmRzSW5Ib3VyXG4gKiBAc3VtbWFyeSBNaWxsaXNlY29uZHMgaW4gMSBob3VyXG4gKi9cbmV4cG9ydCBjb25zdCBtaWxsaXNlY29uZHNJbkhvdXIgPSAzNjAwMDAwO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgbWlsbGlzZWNvbmRzSW5TZWNvbmRcbiAqIEBzdW1tYXJ5IE1pbGxpc2Vjb25kcyBpbiAxIHNlY29uZFxuICovXG5leHBvcnQgY29uc3QgbWlsbGlzZWNvbmRzSW5TZWNvbmQgPSAxMDAwO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgbWludXRlc0luWWVhclxuICogQHN1bW1hcnkgTWludXRlcyBpbiAxIHllYXIuXG4gKi9cbmV4cG9ydCBjb25zdCBtaW51dGVzSW5ZZWFyID0gNTI1NjAwO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgbWludXRlc0luTW9udGhcbiAqIEBzdW1tYXJ5IE1pbnV0ZXMgaW4gMSBtb250aC5cbiAqL1xuZXhwb3J0IGNvbnN0IG1pbnV0ZXNJbk1vbnRoID0gNDMyMDA7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBtaW51dGVzSW5EYXlcbiAqIEBzdW1tYXJ5IE1pbnV0ZXMgaW4gMSBkYXkuXG4gKi9cbmV4cG9ydCBjb25zdCBtaW51dGVzSW5EYXkgPSAxNDQwO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgbWludXRlc0luSG91clxuICogQHN1bW1hcnkgTWludXRlcyBpbiAxIGhvdXIuXG4gKi9cbmV4cG9ydCBjb25zdCBtaW51dGVzSW5Ib3VyID0gNjA7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBtb250aHNJblF1YXJ0ZXJcbiAqIEBzdW1tYXJ5IE1vbnRocyBpbiAxIHF1YXJ0ZXIuXG4gKi9cbmV4cG9ydCBjb25zdCBtb250aHNJblF1YXJ0ZXIgPSAzO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgbW9udGhzSW5ZZWFyXG4gKiBAc3VtbWFyeSBNb250aHMgaW4gMSB5ZWFyLlxuICovXG5leHBvcnQgY29uc3QgbW9udGhzSW5ZZWFyID0gMTI7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBxdWFydGVyc0luWWVhclxuICogQHN1bW1hcnkgUXVhcnRlcnMgaW4gMSB5ZWFyXG4gKi9cbmV4cG9ydCBjb25zdCBxdWFydGVyc0luWWVhciA9IDQ7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBzZWNvbmRzSW5Ib3VyXG4gKiBAc3VtbWFyeSBTZWNvbmRzIGluIDEgaG91ci5cbiAqL1xuZXhwb3J0IGNvbnN0IHNlY29uZHNJbkhvdXIgPSAzNjAwO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgc2Vjb25kc0luTWludXRlXG4gKiBAc3VtbWFyeSBTZWNvbmRzIGluIDEgbWludXRlLlxuICovXG5leHBvcnQgY29uc3Qgc2Vjb25kc0luTWludXRlID0gNjA7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBzZWNvbmRzSW5EYXlcbiAqIEBzdW1tYXJ5IFNlY29uZHMgaW4gMSBkYXkuXG4gKi9cbmV4cG9ydCBjb25zdCBzZWNvbmRzSW5EYXkgPSBzZWNvbmRzSW5Ib3VyICogMjQ7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBzZWNvbmRzSW5XZWVrXG4gKiBAc3VtbWFyeSBTZWNvbmRzIGluIDEgd2Vlay5cbiAqL1xuZXhwb3J0IGNvbnN0IHNlY29uZHNJbldlZWsgPSBzZWNvbmRzSW5EYXkgKiA3O1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgc2Vjb25kc0luWWVhclxuICogQHN1bW1hcnkgU2Vjb25kcyBpbiAxIHllYXIuXG4gKi9cbmV4cG9ydCBjb25zdCBzZWNvbmRzSW5ZZWFyID0gc2Vjb25kc0luRGF5ICogZGF5c0luWWVhcjtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIHNlY29uZHNJbk1vbnRoXG4gKiBAc3VtbWFyeSBTZWNvbmRzIGluIDEgbW9udGhcbiAqL1xuZXhwb3J0IGNvbnN0IHNlY29uZHNJbk1vbnRoID0gc2Vjb25kc0luWWVhciAvIDEyO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgc2Vjb25kc0luUXVhcnRlclxuICogQHN1bW1hcnkgU2Vjb25kcyBpbiAxIHF1YXJ0ZXIuXG4gKi9cbmV4cG9ydCBjb25zdCBzZWNvbmRzSW5RdWFydGVyID0gc2Vjb25kc0luTW9udGggKiAzO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgY29uc3RydWN0RnJvbVN5bWJvbFxuICogQHN1bW1hcnkgU3ltYm9sIGVuYWJsaW5nIERhdGUgZXh0ZW5zaW9ucyB0byBpbmhlcml0IHByb3BlcnRpZXMgZnJvbSB0aGUgcmVmZXJlbmNlIGRhdGUuXG4gKlxuICogVGhlIHN5bWJvbCBpcyB1c2VkIHRvIGVuYWJsZSB0aGUgYGNvbnN0cnVjdEZyb21gIGZ1bmN0aW9uIHRvIGNvbnN0cnVjdCBhIGRhdGVcbiAqIHVzaW5nIGEgcmVmZXJlbmNlIGRhdGUgYW5kIGEgdmFsdWUuIEl0IGFsbG93cyB0byB0cmFuc2ZlciBleHRyYSBwcm9wZXJ0aWVzXG4gKiBmcm9tIHRoZSByZWZlcmVuY2UgZGF0ZSB0byB0aGUgbmV3IGRhdGUuIEl0J3MgdXNlZnVsIGZvciBleHRlbnNpb25zIGxpa2VcbiAqIFtgVFpEYXRlYF0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL3R6KSB0aGF0IGFjY2VwdCBhIHRpbWUgem9uZSBhc1xuICogYSBjb25zdHJ1Y3RvciBhcmd1bWVudC5cbiAqL1xuZXhwb3J0IGNvbnN0IGNvbnN0cnVjdEZyb21TeW1ib2wgPSBTeW1ib2wuZm9yKFwiY29uc3RydWN0RGF0ZUZyb21cIik7XG4iLCJpbXBvcnQgeyBjb25zdHJ1Y3RGcm9tU3ltYm9sIH0gZnJvbSBcIi4vY29uc3RhbnRzLmpzXCI7XG5cbi8qKlxuICogQG5hbWUgY29uc3RydWN0RnJvbVxuICogQGNhdGVnb3J5IEdlbmVyaWMgSGVscGVyc1xuICogQHN1bW1hcnkgQ29uc3RydWN0cyBhIGRhdGUgdXNpbmcgdGhlIHJlZmVyZW5jZSBkYXRlIGFuZCB0aGUgdmFsdWVcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFRoZSBmdW5jdGlvbiBjb25zdHJ1Y3RzIGEgbmV3IGRhdGUgdXNpbmcgdGhlIGNvbnN0cnVjdG9yIGZyb20gdGhlIHJlZmVyZW5jZVxuICogZGF0ZSBhbmQgdGhlIGdpdmVuIHZhbHVlLiBJdCBoZWxwcyB0byBidWlsZCBnZW5lcmljIGZ1bmN0aW9ucyB0aGF0IGFjY2VwdFxuICogZGF0ZSBleHRlbnNpb25zLlxuICpcbiAqIEl0IGRlZmF1bHRzIHRvIGBEYXRlYCBpZiB0aGUgcGFzc2VkIHJlZmVyZW5jZSBkYXRlIGlzIGEgbnVtYmVyIG9yIGEgc3RyaW5nLlxuICpcbiAqIFN0YXJ0aW5nIGZyb20gdjMuNy4wLCBpdCBhbGxvd3MgdG8gY29uc3RydWN0IGEgZGF0ZSB1c2luZyBgW1N5bWJvbC5mb3IoXCJjb25zdHJ1Y3REYXRlRnJvbVwiKV1gXG4gKiBlbmFibGluZyB0byB0cmFuc2ZlciBleHRyYSBwcm9wZXJ0aWVzIGZyb20gdGhlIHJlZmVyZW5jZSBkYXRlIHRvIHRoZSBuZXcgZGF0ZS5cbiAqIEl0J3MgdXNlZnVsIGZvciBleHRlbnNpb25zIGxpa2UgW2BUWkRhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdHopXG4gKiB0aGF0IGFjY2VwdCBhIHRpbWUgem9uZSBhcyBhIGNvbnN0cnVjdG9yIGFyZ3VtZW50LlxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIHJlZmVyZW5jZSBkYXRlIHRvIHRha2UgY29uc3RydWN0b3IgZnJvbVxuICogQHBhcmFtIHZhbHVlIC0gVGhlIHZhbHVlIHRvIGNyZWF0ZSB0aGUgZGF0ZVxuICpcbiAqIEByZXR1cm5zIERhdGUgaW5pdGlhbGl6ZWQgdXNpbmcgdGhlIGdpdmVuIGRhdGUgYW5kIHZhbHVlXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCB7IGNvbnN0cnVjdEZyb20gfSBmcm9tIFwiLi9jb25zdHJ1Y3RGcm9tL2RhdGUtZm5zXCI7XG4gKlxuICogLy8gQSBmdW5jdGlvbiB0aGF0IGNsb25lcyBhIGRhdGUgcHJlc2VydmluZyB0aGUgb3JpZ2luYWwgdHlwZVxuICogZnVuY3Rpb24gY2xvbmVEYXRlPERhdGVUeXBlIGV4dGVuZHMgRGF0ZT4oZGF0ZTogRGF0ZVR5cGUpOiBEYXRlVHlwZSB7XG4gKiAgIHJldHVybiBjb25zdHJ1Y3RGcm9tKFxuICogICAgIGRhdGUsIC8vIFVzZSBjb25zdHJ1Y3RvciBmcm9tIHRoZSBnaXZlbiBkYXRlXG4gKiAgICAgZGF0ZS5nZXRUaW1lKCkgLy8gVXNlIHRoZSBkYXRlIHZhbHVlIHRvIGNyZWF0ZSBhIG5ldyBkYXRlXG4gKiAgICk7XG4gKiB9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb25zdHJ1Y3RGcm9tKGRhdGUsIHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgZGF0ZSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gZGF0ZSh2YWx1ZSk7XG5cbiAgaWYgKGRhdGUgJiYgdHlwZW9mIGRhdGUgPT09IFwib2JqZWN0XCIgJiYgY29uc3RydWN0RnJvbVN5bWJvbCBpbiBkYXRlKVxuICAgIHJldHVybiBkYXRlW2NvbnN0cnVjdEZyb21TeW1ib2xdKHZhbHVlKTtcblxuICBpZiAoZGF0ZSBpbnN0YW5jZW9mIERhdGUpIHJldHVybiBuZXcgZGF0ZS5jb25zdHJ1Y3Rvcih2YWx1ZSk7XG5cbiAgcmV0dXJuIG5ldyBEYXRlKHZhbHVlKTtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBjb25zdHJ1Y3RGcm9tO1xuIiwiaW1wb3J0IHsgY29uc3RydWN0RnJvbSB9IGZyb20gXCIuL2NvbnN0cnVjdEZyb20uanNcIjtcblxuLyoqXG4gKiBAbmFtZSBjb25zdHJ1Y3ROb3dcbiAqIEBjYXRlZ29yeSBHZW5lcmljIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IENvbnN0cnVjdHMgYSBuZXcgY3VycmVudCBkYXRlIHVzaW5nIHRoZSBwYXNzZWQgdmFsdWUgY29uc3RydWN0b3IuXG4gKiBAcHVyZSBmYWxzZVxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogVGhlIGZ1bmN0aW9uIGNvbnN0cnVjdHMgYSBuZXcgY3VycmVudCBkYXRlIHVzaW5nIHRoZSBjb25zdHJ1Y3RvciBmcm9tXG4gKiB0aGUgcmVmZXJlbmNlIGRhdGUuIEl0IGhlbHBzIHRvIGJ1aWxkIGdlbmVyaWMgZnVuY3Rpb25zIHRoYXQgYWNjZXB0IGRhdGVcbiAqIGV4dGVuc2lvbnMgYW5kIHVzZSB0aGUgY3VycmVudCBkYXRlLlxuICpcbiAqIEl0IGRlZmF1bHRzIHRvIGBEYXRlYCBpZiB0aGUgcGFzc2VkIHJlZmVyZW5jZSBkYXRlIGlzIGEgbnVtYmVyIG9yIGEgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIHJlZmVyZW5jZSBkYXRlIHRvIHRha2UgY29uc3RydWN0b3IgZnJvbVxuICpcbiAqIEByZXR1cm5zIEN1cnJlbnQgZGF0ZSBpbml0aWFsaXplZCB1c2luZyB0aGUgZ2l2ZW4gZGF0ZSBjb25zdHJ1Y3RvclxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgeyBjb25zdHJ1Y3ROb3csIGlzU2FtZURheSB9IGZyb20gJ2RhdGUtZm5zJ1xuICpcbiAqIGZ1bmN0aW9uIGlzVG9kYXk8RGF0ZVR5cGUgZXh0ZW5kcyBEYXRlPihcbiAqICAgZGF0ZTogRGF0ZUFyZzxEYXRlVHlwZT4sXG4gKiApOiBib29sZWFuIHtcbiAqICAgLy8gSWYgd2Ugd2VyZSB0byB1c2UgYG5ldyBEYXRlKClgIGRpcmVjdGx5LCB0aGUgZnVuY3Rpb24gd291bGQgIGJlaGF2ZVxuICogICAvLyBkaWZmZXJlbnRseSBpbiBkaWZmZXJlbnQgdGltZXpvbmVzIGFuZCByZXR1cm4gZmFsc2UgZm9yIHRoZSBzYW1lIGRhdGUuXG4gKiAgIHJldHVybiBpc1NhbWVEYXkoZGF0ZSwgY29uc3RydWN0Tm93KGRhdGUpKTtcbiAqIH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnN0cnVjdE5vdyhkYXRlKSB7XG4gIHJldHVybiBjb25zdHJ1Y3RGcm9tKGRhdGUsIERhdGUubm93KCkpO1xufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IGNvbnN0cnVjdE5vdztcbiIsImltcG9ydCB7IG5vcm1hbGl6ZURhdGVzIH0gZnJvbSBcIi4vX2xpYi9ub3JtYWxpemVEYXRlcy5qc1wiO1xuXG4vKipcbiAqIFRoZSB7QGxpbmsgZGlmZmVyZW5jZUluQ2FsZW5kYXJNb250aHN9IGZ1bmN0aW9uIG9wdGlvbnMuXG4gKi9cblxuLyoqXG4gKiBAbmFtZSBkaWZmZXJlbmNlSW5DYWxlbmRhck1vbnRoc1xuICogQGNhdGVnb3J5IE1vbnRoIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgbnVtYmVyIG9mIGNhbGVuZGFyIG1vbnRocyBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcy5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEdldCB0aGUgbnVtYmVyIG9mIGNhbGVuZGFyIG1vbnRocyBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcy5cbiAqXG4gKiBAcGFyYW0gbGF0ZXJEYXRlIC0gVGhlIGxhdGVyIGRhdGVcbiAqIEBwYXJhbSBlYXJsaWVyRGF0ZSAtIFRoZSBlYXJsaWVyIGRhdGVcbiAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb2JqZWN0IHdpdGggb3B0aW9uc1xuICpcbiAqIEByZXR1cm5zIFRoZSBudW1iZXIgb2YgY2FsZW5kYXIgbW9udGhzXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEhvdyBtYW55IGNhbGVuZGFyIG1vbnRocyBhcmUgYmV0d2VlbiAzMSBKYW51YXJ5IDIwMTQgYW5kIDEgU2VwdGVtYmVyIDIwMTQ/XG4gKiBjb25zdCByZXN1bHQgPSBkaWZmZXJlbmNlSW5DYWxlbmRhck1vbnRocyhcbiAqICAgbmV3IERhdGUoMjAxNCwgOCwgMSksXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDAsIDMxKVxuICogKVxuICogLy89PiA4XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkaWZmZXJlbmNlSW5DYWxlbmRhck1vbnRocyhsYXRlckRhdGUsIGVhcmxpZXJEYXRlLCBvcHRpb25zKSB7XG4gIGNvbnN0IFtsYXRlckRhdGVfLCBlYXJsaWVyRGF0ZV9dID0gbm9ybWFsaXplRGF0ZXMoXG4gICAgb3B0aW9ucz8uaW4sXG4gICAgbGF0ZXJEYXRlLFxuICAgIGVhcmxpZXJEYXRlLFxuICApO1xuXG4gIGNvbnN0IHllYXJzRGlmZiA9IGxhdGVyRGF0ZV8uZ2V0RnVsbFllYXIoKSAtIGVhcmxpZXJEYXRlXy5nZXRGdWxsWWVhcigpO1xuICBjb25zdCBtb250aHNEaWZmID0gbGF0ZXJEYXRlXy5nZXRNb250aCgpIC0gZWFybGllckRhdGVfLmdldE1vbnRoKCk7XG5cbiAgcmV0dXJuIHllYXJzRGlmZiAqIDEyICsgbW9udGhzRGlmZjtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBkaWZmZXJlbmNlSW5DYWxlbmRhck1vbnRocztcbiIsImltcG9ydCB7IHRvRGF0ZSB9IGZyb20gXCIuL3RvRGF0ZS5qc1wiO1xuXG4vKipcbiAqIEBuYW1lIGRpZmZlcmVuY2VJbk1pbGxpc2Vjb25kc1xuICogQGNhdGVnb3J5IE1pbGxpc2Vjb25kIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcy5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEdldCB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcy5cbiAqXG4gKiBAcGFyYW0gbGF0ZXJEYXRlIC0gVGhlIGxhdGVyIGRhdGVcbiAqIEBwYXJhbSBlYXJsaWVyRGF0ZSAtIFRoZSBlYXJsaWVyIGRhdGVcbiAqXG4gKiBAcmV0dXJucyBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kc1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBIb3cgbWFueSBtaWxsaXNlY29uZHMgYXJlIGJldHdlZW5cbiAqIC8vIDIgSnVseSAyMDE0IDEyOjMwOjIwLjYwMCBhbmQgMiBKdWx5IDIwMTQgMTI6MzA6MjEuNzAwP1xuICogY29uc3QgcmVzdWx0ID0gZGlmZmVyZW5jZUluTWlsbGlzZWNvbmRzKFxuICogICBuZXcgRGF0ZSgyMDE0LCA2LCAyLCAxMiwgMzAsIDIxLCA3MDApLFxuICogICBuZXcgRGF0ZSgyMDE0LCA2LCAyLCAxMiwgMzAsIDIwLCA2MDApXG4gKiApXG4gKiAvLz0+IDExMDBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpZmZlcmVuY2VJbk1pbGxpc2Vjb25kcyhsYXRlckRhdGUsIGVhcmxpZXJEYXRlKSB7XG4gIHJldHVybiArdG9EYXRlKGxhdGVyRGF0ZSkgLSArdG9EYXRlKGVhcmxpZXJEYXRlKTtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBkaWZmZXJlbmNlSW5NaWxsaXNlY29uZHM7XG4iLCJpbXBvcnQgeyBub3JtYWxpemVEYXRlcyB9IGZyb20gXCIuL19saWIvbm9ybWFsaXplRGF0ZXMuanNcIjtcbmltcG9ydCB7IGNvbXBhcmVBc2MgfSBmcm9tIFwiLi9jb21wYXJlQXNjLmpzXCI7XG5pbXBvcnQgeyBkaWZmZXJlbmNlSW5DYWxlbmRhck1vbnRocyB9IGZyb20gXCIuL2RpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzLmpzXCI7XG5pbXBvcnQgeyBpc0xhc3REYXlPZk1vbnRoIH0gZnJvbSBcIi4vaXNMYXN0RGF5T2ZNb250aC5qc1wiO1xuXG4vKipcbiAqIFRoZSB7QGxpbmsgZGlmZmVyZW5jZUluTW9udGhzfSBmdW5jdGlvbiBvcHRpb25zLlxuICovXG5cbi8qKlxuICogQG5hbWUgZGlmZmVyZW5jZUluTW9udGhzXG4gKiBAY2F0ZWdvcnkgTW9udGggSGVscGVyc1xuICogQHN1bW1hcnkgR2V0IHRoZSBudW1iZXIgb2YgZnVsbCBtb250aHMgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZXMuXG4gKlxuICogQHBhcmFtIGxhdGVyRGF0ZSAtIFRoZSBsYXRlciBkYXRlXG4gKiBAcGFyYW0gZWFybGllckRhdGUgLSBUaGUgZWFybGllciBkYXRlXG4gKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9iamVjdCB3aXRoIG9wdGlvbnNcbiAqXG4gKiBAcmV0dXJucyBUaGUgbnVtYmVyIG9mIGZ1bGwgbW9udGhzXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEhvdyBtYW55IGZ1bGwgbW9udGhzIGFyZSBiZXR3ZWVuIDMxIEphbnVhcnkgMjAxNCBhbmQgMSBTZXB0ZW1iZXIgMjAxND9cbiAqIGNvbnN0IHJlc3VsdCA9IGRpZmZlcmVuY2VJbk1vbnRocyhuZXcgRGF0ZSgyMDE0LCA4LCAxKSwgbmV3IERhdGUoMjAxNCwgMCwgMzEpKVxuICogLy89PiA3XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkaWZmZXJlbmNlSW5Nb250aHMobGF0ZXJEYXRlLCBlYXJsaWVyRGF0ZSwgb3B0aW9ucykge1xuICBjb25zdCBbbGF0ZXJEYXRlXywgd29ya2luZ0xhdGVyRGF0ZSwgZWFybGllckRhdGVfXSA9IG5vcm1hbGl6ZURhdGVzKFxuICAgIG9wdGlvbnM/LmluLFxuICAgIGxhdGVyRGF0ZSxcbiAgICBsYXRlckRhdGUsXG4gICAgZWFybGllckRhdGUsXG4gICk7XG5cbiAgY29uc3Qgc2lnbiA9IGNvbXBhcmVBc2Mod29ya2luZ0xhdGVyRGF0ZSwgZWFybGllckRhdGVfKTtcbiAgY29uc3QgZGlmZmVyZW5jZSA9IE1hdGguYWJzKFxuICAgIGRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzKHdvcmtpbmdMYXRlckRhdGUsIGVhcmxpZXJEYXRlXyksXG4gICk7XG5cbiAgaWYgKGRpZmZlcmVuY2UgPCAxKSByZXR1cm4gMDtcblxuICBpZiAod29ya2luZ0xhdGVyRGF0ZS5nZXRNb250aCgpID09PSAxICYmIHdvcmtpbmdMYXRlckRhdGUuZ2V0RGF0ZSgpID4gMjcpXG4gICAgd29ya2luZ0xhdGVyRGF0ZS5zZXREYXRlKDMwKTtcblxuICB3b3JraW5nTGF0ZXJEYXRlLnNldE1vbnRoKHdvcmtpbmdMYXRlckRhdGUuZ2V0TW9udGgoKSAtIHNpZ24gKiBkaWZmZXJlbmNlKTtcblxuICBsZXQgaXNMYXN0TW9udGhOb3RGdWxsID0gY29tcGFyZUFzYyh3b3JraW5nTGF0ZXJEYXRlLCBlYXJsaWVyRGF0ZV8pID09PSAtc2lnbjtcblxuICBpZiAoXG4gICAgaXNMYXN0RGF5T2ZNb250aChsYXRlckRhdGVfKSAmJlxuICAgIGRpZmZlcmVuY2UgPT09IDEgJiZcbiAgICBjb21wYXJlQXNjKGxhdGVyRGF0ZV8sIGVhcmxpZXJEYXRlXykgPT09IDFcbiAgKSB7XG4gICAgaXNMYXN0TW9udGhOb3RGdWxsID0gZmFsc2U7XG4gIH1cblxuICBjb25zdCByZXN1bHQgPSBzaWduICogKGRpZmZlcmVuY2UgLSAraXNMYXN0TW9udGhOb3RGdWxsKTtcbiAgcmV0dXJuIHJlc3VsdCA9PT0gMCA/IDAgOiByZXN1bHQ7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgZGlmZmVyZW5jZUluTW9udGhzO1xuIiwiaW1wb3J0IHsgZ2V0Um91bmRpbmdNZXRob2QgfSBmcm9tIFwiLi9fbGliL2dldFJvdW5kaW5nTWV0aG9kLmpzXCI7XG5pbXBvcnQgeyBkaWZmZXJlbmNlSW5NaWxsaXNlY29uZHMgfSBmcm9tIFwiLi9kaWZmZXJlbmNlSW5NaWxsaXNlY29uZHMuanNcIjtcblxuLyoqXG4gKiBUaGUge0BsaW5rIGRpZmZlcmVuY2VJblNlY29uZHN9IGZ1bmN0aW9uIG9wdGlvbnMuXG4gKi9cblxuLyoqXG4gKiBAbmFtZSBkaWZmZXJlbmNlSW5TZWNvbmRzXG4gKiBAY2F0ZWdvcnkgU2Vjb25kIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgbnVtYmVyIG9mIHNlY29uZHMgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZXMuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBHZXQgdGhlIG51bWJlciBvZiBzZWNvbmRzIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzLlxuICpcbiAqIEBwYXJhbSBsYXRlckRhdGUgLSBUaGUgbGF0ZXIgZGF0ZVxuICogQHBhcmFtIGVhcmxpZXJEYXRlIC0gVGhlIGVhcmxpZXIgZGF0ZVxuICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvYmplY3Qgd2l0aCBvcHRpb25zLlxuICpcbiAqIEByZXR1cm5zIFRoZSBudW1iZXIgb2Ygc2Vjb25kc1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBIb3cgbWFueSBzZWNvbmRzIGFyZSBiZXR3ZWVuXG4gKiAvLyAyIEp1bHkgMjAxNCAxMjozMDowNy45OTkgYW5kIDIgSnVseSAyMDE0IDEyOjMwOjIwLjAwMD9cbiAqIGNvbnN0IHJlc3VsdCA9IGRpZmZlcmVuY2VJblNlY29uZHMoXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDYsIDIsIDEyLCAzMCwgMjAsIDApLFxuICogICBuZXcgRGF0ZSgyMDE0LCA2LCAyLCAxMiwgMzAsIDcsIDk5OSlcbiAqIClcbiAqIC8vPT4gMTJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpZmZlcmVuY2VJblNlY29uZHMobGF0ZXJEYXRlLCBlYXJsaWVyRGF0ZSwgb3B0aW9ucykge1xuICBjb25zdCBkaWZmID0gZGlmZmVyZW5jZUluTWlsbGlzZWNvbmRzKGxhdGVyRGF0ZSwgZWFybGllckRhdGUpIC8gMTAwMDtcbiAgcmV0dXJuIGdldFJvdW5kaW5nTWV0aG9kKG9wdGlvbnM/LnJvdW5kaW5nTWV0aG9kKShkaWZmKTtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBkaWZmZXJlbmNlSW5TZWNvbmRzO1xuIiwiaW1wb3J0IHsgdG9EYXRlIH0gZnJvbSBcIi4vdG9EYXRlLmpzXCI7XG5cbi8qKlxuICogVGhlIHtAbGluayBlbmRPZkRheX0gZnVuY3Rpb24gb3B0aW9ucy5cbiAqL1xuXG4vKipcbiAqIEBuYW1lIGVuZE9mRGF5XG4gKiBAY2F0ZWdvcnkgRGF5IEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgZW5kIG9mIGEgZGF5IGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgZW5kIG9mIGEgZGF5IGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqIFRoZSByZXN1bHQgd2lsbCBiZSBpbiB0aGUgbG9jYWwgdGltZXpvbmUuXG4gKlxuICogQHR5cGVQYXJhbSBEYXRlVHlwZSAtIFRoZSBgRGF0ZWAgdHlwZSwgdGhlIGZ1bmN0aW9uIG9wZXJhdGVzIG9uLiBHZXRzIGluZmVycmVkIGZyb20gcGFzc2VkIGFyZ3VtZW50cy4gQWxsb3dzIHRvIHVzZSBleHRlbnNpb25zIGxpa2UgW2BVVENEYXRlYF0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL3V0YykuXG4gKiBAdHlwZVBhcmFtIFJlc3VsdERhdGUgLSBUaGUgcmVzdWx0IGBEYXRlYCB0eXBlLCBpdCBpcyB0aGUgdHlwZSByZXR1cm5lZCBmcm9tIHRoZSBjb250ZXh0IGZ1bmN0aW9uIGlmIGl0IGlzIHBhc3NlZCwgb3IgaW5mZXJyZWQgZnJvbSB0aGUgYXJndW1lbnRzLlxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIG9yaWdpbmFsIGRhdGVcbiAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb2JqZWN0IHdpdGggb3B0aW9uc1xuICpcbiAqIEByZXR1cm5zIFRoZSBlbmQgb2YgYSBkYXlcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gVGhlIGVuZCBvZiBhIGRheSBmb3IgMiBTZXB0ZW1iZXIgMjAxNCAxMTo1NTowMDpcbiAqIGNvbnN0IHJlc3VsdCA9IGVuZE9mRGF5KG5ldyBEYXRlKDIwMTQsIDgsIDIsIDExLCA1NSwgMCkpXG4gKiAvLz0+IFR1ZSBTZXAgMDIgMjAxNCAyMzo1OTo1OS45OTlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVuZE9mRGF5KGRhdGUsIG9wdGlvbnMpIHtcbiAgY29uc3QgX2RhdGUgPSB0b0RhdGUoZGF0ZSwgb3B0aW9ucz8uaW4pO1xuICBfZGF0ZS5zZXRIb3VycygyMywgNTksIDU5LCA5OTkpO1xuICByZXR1cm4gX2RhdGU7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgZW5kT2ZEYXk7XG4iLCJpbXBvcnQgeyB0b0RhdGUgfSBmcm9tIFwiLi90b0RhdGUuanNcIjtcblxuLyoqXG4gKiBUaGUge0BsaW5rIGVuZE9mTW9udGh9IGZ1bmN0aW9uIG9wdGlvbnMuXG4gKi9cblxuLyoqXG4gKiBAbmFtZSBlbmRPZk1vbnRoXG4gKiBAY2F0ZWdvcnkgTW9udGggSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIHRoZSBlbmQgb2YgYSBtb250aCBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIGVuZCBvZiBhIG1vbnRoIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqIFRoZSByZXN1bHQgd2lsbCBiZSBpbiB0aGUgbG9jYWwgdGltZXpvbmUuXG4gKlxuICogQHR5cGVQYXJhbSBEYXRlVHlwZSAtIFRoZSBgRGF0ZWAgdHlwZSwgdGhlIGZ1bmN0aW9uIG9wZXJhdGVzIG9uLiBHZXRzIGluZmVycmVkIGZyb20gcGFzc2VkIGFyZ3VtZW50cy4gQWxsb3dzIHRvIHVzZSBleHRlbnNpb25zIGxpa2UgW2BVVENEYXRlYF0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL3V0YykuXG4gKiBAdHlwZVBhcmFtIFJlc3VsdERhdGUgLSBUaGUgcmVzdWx0IGBEYXRlYCB0eXBlLCBpdCBpcyB0aGUgdHlwZSByZXR1cm5lZCBmcm9tIHRoZSBjb250ZXh0IGZ1bmN0aW9uIGlmIGl0IGlzIHBhc3NlZCwgb3IgaW5mZXJyZWQgZnJvbSB0aGUgYXJndW1lbnRzLlxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIG9yaWdpbmFsIGRhdGVcbiAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb2JqZWN0IHdpdGggb3B0aW9uc1xuICpcbiAqIEByZXR1cm5zIFRoZSBlbmQgb2YgYSBtb250aFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBUaGUgZW5kIG9mIGEgbW9udGggZm9yIDIgU2VwdGVtYmVyIDIwMTQgMTE6NTU6MDA6XG4gKiBjb25zdCByZXN1bHQgPSBlbmRPZk1vbnRoKG5ldyBEYXRlKDIwMTQsIDgsIDIsIDExLCA1NSwgMCkpXG4gKiAvLz0+IFR1ZSBTZXAgMzAgMjAxNCAyMzo1OTo1OS45OTlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVuZE9mTW9udGgoZGF0ZSwgb3B0aW9ucykge1xuICBjb25zdCBfZGF0ZSA9IHRvRGF0ZShkYXRlLCBvcHRpb25zPy5pbik7XG4gIGNvbnN0IG1vbnRoID0gX2RhdGUuZ2V0TW9udGgoKTtcbiAgX2RhdGUuc2V0RnVsbFllYXIoX2RhdGUuZ2V0RnVsbFllYXIoKSwgbW9udGggKyAxLCAwKTtcbiAgX2RhdGUuc2V0SG91cnMoMjMsIDU5LCA1OSwgOTk5KTtcbiAgcmV0dXJuIF9kYXRlO1xufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IGVuZE9mTW9udGg7XG4iLCJpbXBvcnQgeyBkZWZhdWx0TG9jYWxlIH0gZnJvbSBcIi4vX2xpYi9kZWZhdWx0TG9jYWxlLmpzXCI7XG5pbXBvcnQgeyBnZXREZWZhdWx0T3B0aW9ucyB9IGZyb20gXCIuL19saWIvZGVmYXVsdE9wdGlvbnMuanNcIjtcbmltcG9ydCB7IGdldFRpbWV6b25lT2Zmc2V0SW5NaWxsaXNlY29uZHMgfSBmcm9tIFwiLi9fbGliL2dldFRpbWV6b25lT2Zmc2V0SW5NaWxsaXNlY29uZHMuanNcIjtcbmltcG9ydCB7IG5vcm1hbGl6ZURhdGVzIH0gZnJvbSBcIi4vX2xpYi9ub3JtYWxpemVEYXRlcy5qc1wiO1xuaW1wb3J0IHsgY29tcGFyZUFzYyB9IGZyb20gXCIuL2NvbXBhcmVBc2MuanNcIjtcbmltcG9ydCB7IG1pbnV0ZXNJbkRheSwgbWludXRlc0luTW9udGggfSBmcm9tIFwiLi9jb25zdGFudHMuanNcIjtcbmltcG9ydCB7IGRpZmZlcmVuY2VJbk1vbnRocyB9IGZyb20gXCIuL2RpZmZlcmVuY2VJbk1vbnRocy5qc1wiO1xuaW1wb3J0IHsgZGlmZmVyZW5jZUluU2Vjb25kcyB9IGZyb20gXCIuL2RpZmZlcmVuY2VJblNlY29uZHMuanNcIjtcblxuLyoqXG4gKiBUaGUge0BsaW5rIGZvcm1hdERpc3RhbmNlfSBmdW5jdGlvbiBvcHRpb25zLlxuICovXG5cbi8qKlxuICogQG5hbWUgZm9ybWF0RGlzdGFuY2VcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcyBpbiB3b3Jkcy5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZXMgaW4gd29yZHMuXG4gKlxuICogfCBEaXN0YW5jZSBiZXR3ZWVuIGRhdGVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFJlc3VsdCAgICAgICAgICAgICAgfFxuICogfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18LS0tLS0tLS0tLS0tLS0tLS0tLS0tfFxuICogfCAwIC4uLiAzMCBzZWNzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGxlc3MgdGhhbiBhIG1pbnV0ZSAgfFxuICogfCAzMCBzZWNzIC4uLiAxIG1pbiAzMCBzZWNzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDEgbWludXRlICAgICAgICAgICAgfFxuICogfCAxIG1pbiAzMCBzZWNzIC4uLiA0NCBtaW5zIDMwIHNlY3MgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFsyLi40NF0gbWludXRlcyAgICAgfFxuICogfCA0NCBtaW5zIC4uLiAzMCBzZWNzIC4uLiA4OSBtaW5zIDMwIHNlY3MgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGFib3V0IDEgaG91ciAgICAgICAgfFxuICogfCA4OSBtaW5zIDMwIHNlY3MgLi4uIDIzIGhycyA1OSBtaW5zIDMwIHNlY3MgICAgICAgICAgICAgICAgICAgICAgICB8IGFib3V0IFsyLi4yNF0gaG91cnMgfFxuICogfCAyMyBocnMgNTkgbWlucyAzMCBzZWNzIC4uLiA0MSBocnMgNTkgbWlucyAzMCBzZWNzICAgICAgICAgICAgICAgICB8IDEgZGF5ICAgICAgICAgICAgICAgfFxuICogfCA0MSBocnMgNTkgbWlucyAzMCBzZWNzIC4uLiAyOSBkYXlzIDIzIGhycyA1OSBtaW5zIDMwIHNlY3MgICAgICAgICB8IFsyLi4zMF0gZGF5cyAgICAgICAgfFxuICogfCAyOSBkYXlzIDIzIGhycyA1OSBtaW5zIDMwIHNlY3MgLi4uIDQ0IGRheXMgMjMgaHJzIDU5IG1pbnMgMzAgc2VjcyB8IGFib3V0IDEgbW9udGggICAgICAgfFxuICogfCA0NCBkYXlzIDIzIGhycyA1OSBtaW5zIDMwIHNlY3MgLi4uIDU5IGRheXMgMjMgaHJzIDU5IG1pbnMgMzAgc2VjcyB8IGFib3V0IDIgbW9udGhzICAgICAgfFxuICogfCA1OSBkYXlzIDIzIGhycyA1OSBtaW5zIDMwIHNlY3MgLi4uIDEgeXIgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFsyLi4xMl0gbW9udGhzICAgICAgfFxuICogfCAxIHlyIC4uLiAxIHlyIDMgbW9udGhzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGFib3V0IDEgeWVhciAgICAgICAgfFxuICogfCAxIHlyIDMgbW9udGhzIC4uLiAxIHlyIDkgbW9udGggcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IG92ZXIgMSB5ZWFyICAgICAgICAgfFxuICogfCAxIHlyIDkgbW9udGhzIC4uLiAyIHlycyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGFsbW9zdCAyIHllYXJzICAgICAgfFxuICogfCBOIHlycyAuLi4gTiB5cnMgMyBtb250aHMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGFib3V0IE4geWVhcnMgICAgICAgfFxuICogfCBOIHlycyAzIG1vbnRocyAuLi4gTiB5cnMgOSBtb250aHMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IG92ZXIgTiB5ZWFycyAgICAgICAgfFxuICogfCBOIHlycyA5IG1vbnRocyAuLi4gTisxIHlycyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGFsbW9zdCBOKzEgeWVhcnMgICAgfFxuICpcbiAqIFdpdGggYG9wdGlvbnMuaW5jbHVkZVNlY29uZHMgPT0gdHJ1ZWA6XG4gKiB8IERpc3RhbmNlIGJldHdlZW4gZGF0ZXMgfCBSZXN1bHQgICAgICAgICAgICAgICB8XG4gKiB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS18XG4gKiB8IDAgc2VjcyAuLi4gNSBzZWNzICAgICAgfCBsZXNzIHRoYW4gNSBzZWNvbmRzICB8XG4gKiB8IDUgc2VjcyAuLi4gMTAgc2VjcyAgICAgfCBsZXNzIHRoYW4gMTAgc2Vjb25kcyB8XG4gKiB8IDEwIHNlY3MgLi4uIDIwIHNlY3MgICAgfCBsZXNzIHRoYW4gMjAgc2Vjb25kcyB8XG4gKiB8IDIwIHNlY3MgLi4uIDQwIHNlY3MgICAgfCBoYWxmIGEgbWludXRlICAgICAgICB8XG4gKiB8IDQwIHNlY3MgLi4uIDYwIHNlY3MgICAgfCBsZXNzIHRoYW4gYSBtaW51dGUgICB8XG4gKiB8IDYwIHNlY3MgLi4uIDkwIHNlY3MgICAgfCAxIG1pbnV0ZSAgICAgICAgICAgICB8XG4gKlxuICogQHBhcmFtIGxhdGVyRGF0ZSAtIFRoZSBkYXRlXG4gKiBAcGFyYW0gZWFybGllckRhdGUgLSBUaGUgZGF0ZSB0byBjb21wYXJlIHdpdGhcbiAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb2JqZWN0IHdpdGggb3B0aW9uc1xuICpcbiAqIEByZXR1cm5zIFRoZSBkaXN0YW5jZSBpbiB3b3Jkc1xuICpcbiAqIEB0aHJvd3MgYGRhdGVgIG11c3Qgbm90IGJlIEludmFsaWQgRGF0ZVxuICogQHRocm93cyBgYmFzZURhdGVgIG11c3Qgbm90IGJlIEludmFsaWQgRGF0ZVxuICogQHRocm93cyBgb3B0aW9ucy5sb2NhbGVgIG11c3QgY29udGFpbiBgZm9ybWF0RGlzdGFuY2VgIHByb3BlcnR5XG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFdoYXQgaXMgdGhlIGRpc3RhbmNlIGJldHdlZW4gMiBKdWx5IDIwMTQgYW5kIDEgSmFudWFyeSAyMDE1P1xuICogY29uc3QgcmVzdWx0ID0gZm9ybWF0RGlzdGFuY2UobmV3IERhdGUoMjAxNCwgNiwgMiksIG5ldyBEYXRlKDIwMTUsIDAsIDEpKVxuICogLy89PiAnNiBtb250aHMnXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFdoYXQgaXMgdGhlIGRpc3RhbmNlIGJldHdlZW4gMSBKYW51YXJ5IDIwMTUgMDA6MDA6MTVcbiAqIC8vIGFuZCAxIEphbnVhcnkgMjAxNSAwMDowMDowMCwgaW5jbHVkaW5nIHNlY29uZHM/XG4gKiBjb25zdCByZXN1bHQgPSBmb3JtYXREaXN0YW5jZShcbiAqICAgbmV3IERhdGUoMjAxNSwgMCwgMSwgMCwgMCwgMTUpLFxuICogICBuZXcgRGF0ZSgyMDE1LCAwLCAxLCAwLCAwLCAwKSxcbiAqICAgeyBpbmNsdWRlU2Vjb25kczogdHJ1ZSB9XG4gKiApXG4gKiAvLz0+ICdsZXNzIHRoYW4gMjAgc2Vjb25kcydcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hhdCBpcyB0aGUgZGlzdGFuY2UgZnJvbSAxIEphbnVhcnkgMjAxNlxuICogLy8gdG8gMSBKYW51YXJ5IDIwMTUsIHdpdGggYSBzdWZmaXg/XG4gKiBjb25zdCByZXN1bHQgPSBmb3JtYXREaXN0YW5jZShuZXcgRGF0ZSgyMDE1LCAwLCAxKSwgbmV3IERhdGUoMjAxNiwgMCwgMSksIHtcbiAqICAgYWRkU3VmZml4OiB0cnVlXG4gKiB9KVxuICogLy89PiAnYWJvdXQgMSB5ZWFyIGFnbydcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hhdCBpcyB0aGUgZGlzdGFuY2UgYmV0d2VlbiAxIEF1Z3VzdCAyMDE2IGFuZCAxIEphbnVhcnkgMjAxNSBpbiBFc3BlcmFudG8/XG4gKiBpbXBvcnQgeyBlb0xvY2FsZSB9IGZyb20gJ2RhdGUtZm5zL2xvY2FsZS9lbydcbiAqIGNvbnN0IHJlc3VsdCA9IGZvcm1hdERpc3RhbmNlKG5ldyBEYXRlKDIwMTYsIDcsIDEpLCBuZXcgRGF0ZSgyMDE1LCAwLCAxKSwge1xuICogICBsb2NhbGU6IGVvTG9jYWxlXG4gKiB9KVxuICogLy89PiAncGxpIG9sIDEgamFybydcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdERpc3RhbmNlKGxhdGVyRGF0ZSwgZWFybGllckRhdGUsIG9wdGlvbnMpIHtcbiAgY29uc3QgZGVmYXVsdE9wdGlvbnMgPSBnZXREZWZhdWx0T3B0aW9ucygpO1xuICBjb25zdCBsb2NhbGUgPSBvcHRpb25zPy5sb2NhbGUgPz8gZGVmYXVsdE9wdGlvbnMubG9jYWxlID8/IGRlZmF1bHRMb2NhbGU7XG4gIGNvbnN0IG1pbnV0ZXNJbkFsbW9zdFR3b0RheXMgPSAyNTIwO1xuXG4gIGNvbnN0IGNvbXBhcmlzb24gPSBjb21wYXJlQXNjKGxhdGVyRGF0ZSwgZWFybGllckRhdGUpO1xuXG4gIGlmIChpc05hTihjb21wYXJpc29uKSkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJJbnZhbGlkIHRpbWUgdmFsdWVcIik7XG5cbiAgY29uc3QgbG9jYWxpemVPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucywge1xuICAgIGFkZFN1ZmZpeDogb3B0aW9ucz8uYWRkU3VmZml4LFxuICAgIGNvbXBhcmlzb246IGNvbXBhcmlzb24sXG4gIH0pO1xuXG4gIGNvbnN0IFtsYXRlckRhdGVfLCBlYXJsaWVyRGF0ZV9dID0gbm9ybWFsaXplRGF0ZXMoXG4gICAgb3B0aW9ucz8uaW4sXG4gICAgLi4uKGNvbXBhcmlzb24gPiAwID8gW2VhcmxpZXJEYXRlLCBsYXRlckRhdGVdIDogW2xhdGVyRGF0ZSwgZWFybGllckRhdGVdKSxcbiAgKTtcblxuICBjb25zdCBzZWNvbmRzID0gZGlmZmVyZW5jZUluU2Vjb25kcyhlYXJsaWVyRGF0ZV8sIGxhdGVyRGF0ZV8pO1xuICBjb25zdCBvZmZzZXRJblNlY29uZHMgPVxuICAgIChnZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzKGVhcmxpZXJEYXRlXykgLVxuICAgICAgZ2V0VGltZXpvbmVPZmZzZXRJbk1pbGxpc2Vjb25kcyhsYXRlckRhdGVfKSkgL1xuICAgIDEwMDA7XG4gIGNvbnN0IG1pbnV0ZXMgPSBNYXRoLnJvdW5kKChzZWNvbmRzIC0gb2Zmc2V0SW5TZWNvbmRzKSAvIDYwKTtcbiAgbGV0IG1vbnRocztcblxuICAvLyAwIHVwIHRvIDIgbWluc1xuICBpZiAobWludXRlcyA8IDIpIHtcbiAgICBpZiAob3B0aW9ucz8uaW5jbHVkZVNlY29uZHMpIHtcbiAgICAgIGlmIChzZWNvbmRzIDwgNSkge1xuICAgICAgICByZXR1cm4gbG9jYWxlLmZvcm1hdERpc3RhbmNlKFwibGVzc1RoYW5YU2Vjb25kc1wiLCA1LCBsb2NhbGl6ZU9wdGlvbnMpO1xuICAgICAgfSBlbHNlIGlmIChzZWNvbmRzIDwgMTApIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsZS5mb3JtYXREaXN0YW5jZShcImxlc3NUaGFuWFNlY29uZHNcIiwgMTAsIGxvY2FsaXplT3B0aW9ucyk7XG4gICAgICB9IGVsc2UgaWYgKHNlY29uZHMgPCAyMCkge1xuICAgICAgICByZXR1cm4gbG9jYWxlLmZvcm1hdERpc3RhbmNlKFwibGVzc1RoYW5YU2Vjb25kc1wiLCAyMCwgbG9jYWxpemVPcHRpb25zKTtcbiAgICAgIH0gZWxzZSBpZiAoc2Vjb25kcyA8IDQwKSB7XG4gICAgICAgIHJldHVybiBsb2NhbGUuZm9ybWF0RGlzdGFuY2UoXCJoYWxmQU1pbnV0ZVwiLCAwLCBsb2NhbGl6ZU9wdGlvbnMpO1xuICAgICAgfSBlbHNlIGlmIChzZWNvbmRzIDwgNjApIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsZS5mb3JtYXREaXN0YW5jZShcImxlc3NUaGFuWE1pbnV0ZXNcIiwgMSwgbG9jYWxpemVPcHRpb25zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBsb2NhbGUuZm9ybWF0RGlzdGFuY2UoXCJ4TWludXRlc1wiLCAxLCBsb2NhbGl6ZU9wdGlvbnMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAobWludXRlcyA9PT0gMCkge1xuICAgICAgICByZXR1cm4gbG9jYWxlLmZvcm1hdERpc3RhbmNlKFwibGVzc1RoYW5YTWludXRlc1wiLCAxLCBsb2NhbGl6ZU9wdGlvbnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsZS5mb3JtYXREaXN0YW5jZShcInhNaW51dGVzXCIsIG1pbnV0ZXMsIGxvY2FsaXplT3B0aW9ucyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gMiBtaW5zIHVwIHRvIDAuNzUgaHJzXG4gIH0gZWxzZSBpZiAobWludXRlcyA8IDQ1KSB7XG4gICAgcmV0dXJuIGxvY2FsZS5mb3JtYXREaXN0YW5jZShcInhNaW51dGVzXCIsIG1pbnV0ZXMsIGxvY2FsaXplT3B0aW9ucyk7XG5cbiAgICAvLyAwLjc1IGhycyB1cCB0byAxLjUgaHJzXG4gIH0gZWxzZSBpZiAobWludXRlcyA8IDkwKSB7XG4gICAgcmV0dXJuIGxvY2FsZS5mb3JtYXREaXN0YW5jZShcImFib3V0WEhvdXJzXCIsIDEsIGxvY2FsaXplT3B0aW9ucyk7XG5cbiAgICAvLyAxLjUgaHJzIHVwIHRvIDI0IGhyc1xuICB9IGVsc2UgaWYgKG1pbnV0ZXMgPCBtaW51dGVzSW5EYXkpIHtcbiAgICBjb25zdCBob3VycyA9IE1hdGgucm91bmQobWludXRlcyAvIDYwKTtcbiAgICByZXR1cm4gbG9jYWxlLmZvcm1hdERpc3RhbmNlKFwiYWJvdXRYSG91cnNcIiwgaG91cnMsIGxvY2FsaXplT3B0aW9ucyk7XG5cbiAgICAvLyAxIGRheSB1cCB0byAxLjc1IGRheXNcbiAgfSBlbHNlIGlmIChtaW51dGVzIDwgbWludXRlc0luQWxtb3N0VHdvRGF5cykge1xuICAgIHJldHVybiBsb2NhbGUuZm9ybWF0RGlzdGFuY2UoXCJ4RGF5c1wiLCAxLCBsb2NhbGl6ZU9wdGlvbnMpO1xuXG4gICAgLy8gMS43NSBkYXlzIHVwIHRvIDMwIGRheXNcbiAgfSBlbHNlIGlmIChtaW51dGVzIDwgbWludXRlc0luTW9udGgpIHtcbiAgICBjb25zdCBkYXlzID0gTWF0aC5yb3VuZChtaW51dGVzIC8gbWludXRlc0luRGF5KTtcbiAgICByZXR1cm4gbG9jYWxlLmZvcm1hdERpc3RhbmNlKFwieERheXNcIiwgZGF5cywgbG9jYWxpemVPcHRpb25zKTtcblxuICAgIC8vIDEgbW9udGggdXAgdG8gMiBtb250aHNcbiAgfSBlbHNlIGlmIChtaW51dGVzIDwgbWludXRlc0luTW9udGggKiAyKSB7XG4gICAgbW9udGhzID0gTWF0aC5yb3VuZChtaW51dGVzIC8gbWludXRlc0luTW9udGgpO1xuICAgIHJldHVybiBsb2NhbGUuZm9ybWF0RGlzdGFuY2UoXCJhYm91dFhNb250aHNcIiwgbW9udGhzLCBsb2NhbGl6ZU9wdGlvbnMpO1xuICB9XG5cbiAgbW9udGhzID0gZGlmZmVyZW5jZUluTW9udGhzKGVhcmxpZXJEYXRlXywgbGF0ZXJEYXRlXyk7XG5cbiAgLy8gMiBtb250aHMgdXAgdG8gMTIgbW9udGhzXG4gIGlmIChtb250aHMgPCAxMikge1xuICAgIGNvbnN0IG5lYXJlc3RNb250aCA9IE1hdGgucm91bmQobWludXRlcyAvIG1pbnV0ZXNJbk1vbnRoKTtcbiAgICByZXR1cm4gbG9jYWxlLmZvcm1hdERpc3RhbmNlKFwieE1vbnRoc1wiLCBuZWFyZXN0TW9udGgsIGxvY2FsaXplT3B0aW9ucyk7XG5cbiAgICAvLyAxIHllYXIgdXAgdG8gbWF4IERhdGVcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBtb250aHNTaW5jZVN0YXJ0T2ZZZWFyID0gbW9udGhzICUgMTI7XG4gICAgY29uc3QgeWVhcnMgPSBNYXRoLnRydW5jKG1vbnRocyAvIDEyKTtcblxuICAgIC8vIE4geWVhcnMgdXAgdG8gMSB5ZWFycyAzIG1vbnRoc1xuICAgIGlmIChtb250aHNTaW5jZVN0YXJ0T2ZZZWFyIDwgMykge1xuICAgICAgcmV0dXJuIGxvY2FsZS5mb3JtYXREaXN0YW5jZShcImFib3V0WFllYXJzXCIsIHllYXJzLCBsb2NhbGl6ZU9wdGlvbnMpO1xuXG4gICAgICAvLyBOIHllYXJzIDMgbW9udGhzIHVwIHRvIE4geWVhcnMgOSBtb250aHNcbiAgICB9IGVsc2UgaWYgKG1vbnRoc1NpbmNlU3RhcnRPZlllYXIgPCA5KSB7XG4gICAgICByZXR1cm4gbG9jYWxlLmZvcm1hdERpc3RhbmNlKFwib3ZlclhZZWFyc1wiLCB5ZWFycywgbG9jYWxpemVPcHRpb25zKTtcblxuICAgICAgLy8gTiB5ZWFycyA5IG1vbnRocyB1cCB0byBOIHllYXIgMTIgbW9udGhzXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBsb2NhbGUuZm9ybWF0RGlzdGFuY2UoXCJhbG1vc3RYWWVhcnNcIiwgeWVhcnMgKyAxLCBsb2NhbGl6ZU9wdGlvbnMpO1xuICAgIH1cbiAgfVxufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IGZvcm1hdERpc3RhbmNlO1xuIiwiaW1wb3J0IHsgY29uc3RydWN0Tm93IH0gZnJvbSBcIi4vY29uc3RydWN0Tm93LmpzXCI7XG5cbmltcG9ydCB7IGZvcm1hdERpc3RhbmNlIH0gZnJvbSBcIi4vZm9ybWF0RGlzdGFuY2UuanNcIjtcblxuLyoqXG4gKiBUaGUge0BsaW5rIGZvcm1hdERpc3RhbmNlVG9Ob3d9IGZ1bmN0aW9uIG9wdGlvbnMuXG4gKi9cblxuLyoqXG4gKiBAbmFtZSBmb3JtYXREaXN0YW5jZVRvTm93XG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZSBhbmQgbm93IGluIHdvcmRzLlxuICogQHB1cmUgZmFsc2VcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZSBhbmQgbm93IGluIHdvcmRzLlxuICpcbiAqIHwgRGlzdGFuY2UgdG8gbm93ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBSZXN1bHQgICAgICAgICAgICAgIHxcbiAqIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfC0tLS0tLS0tLS0tLS0tLS0tLS0tLXxcbiAqIHwgMCAuLi4gMzAgc2VjcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBsZXNzIHRoYW4gYSBtaW51dGUgIHxcbiAqIHwgMzAgc2VjcyAuLi4gMSBtaW4gMzAgc2VjcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAxIG1pbnV0ZSAgICAgICAgICAgIHxcbiAqIHwgMSBtaW4gMzAgc2VjcyAuLi4gNDQgbWlucyAzMCBzZWNzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBbMi4uNDRdIG1pbnV0ZXMgICAgIHxcbiAqIHwgNDQgbWlucyAuLi4gMzAgc2VjcyAuLi4gODkgbWlucyAzMCBzZWNzICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBhYm91dCAxIGhvdXIgICAgICAgIHxcbiAqIHwgODkgbWlucyAzMCBzZWNzIC4uLiAyMyBocnMgNTkgbWlucyAzMCBzZWNzICAgICAgICAgICAgICAgICAgICAgICAgfCBhYm91dCBbMi4uMjRdIGhvdXJzIHxcbiAqIHwgMjMgaHJzIDU5IG1pbnMgMzAgc2VjcyAuLi4gNDEgaHJzIDU5IG1pbnMgMzAgc2VjcyAgICAgICAgICAgICAgICAgfCAxIGRheSAgICAgICAgICAgICAgIHxcbiAqIHwgNDEgaHJzIDU5IG1pbnMgMzAgc2VjcyAuLi4gMjkgZGF5cyAyMyBocnMgNTkgbWlucyAzMCBzZWNzICAgICAgICAgfCBbMi4uMzBdIGRheXMgICAgICAgIHxcbiAqIHwgMjkgZGF5cyAyMyBocnMgNTkgbWlucyAzMCBzZWNzIC4uLiA0NCBkYXlzIDIzIGhycyA1OSBtaW5zIDMwIHNlY3MgfCBhYm91dCAxIG1vbnRoICAgICAgIHxcbiAqIHwgNDQgZGF5cyAyMyBocnMgNTkgbWlucyAzMCBzZWNzIC4uLiA1OSBkYXlzIDIzIGhycyA1OSBtaW5zIDMwIHNlY3MgfCBhYm91dCAyIG1vbnRocyAgICAgIHxcbiAqIHwgNTkgZGF5cyAyMyBocnMgNTkgbWlucyAzMCBzZWNzIC4uLiAxIHlyICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBbMi4uMTJdIG1vbnRocyAgICAgIHxcbiAqIHwgMSB5ciAuLi4gMSB5ciAzIG1vbnRocyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBhYm91dCAxIHllYXIgICAgICAgIHxcbiAqIHwgMSB5ciAzIG1vbnRocyAuLi4gMSB5ciA5IG1vbnRoIHMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBvdmVyIDEgeWVhciAgICAgICAgIHxcbiAqIHwgMSB5ciA5IG1vbnRocyAuLi4gMiB5cnMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBhbG1vc3QgMiB5ZWFycyAgICAgIHxcbiAqIHwgTiB5cnMgLi4uIE4geXJzIDMgbW9udGhzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBhYm91dCBOIHllYXJzICAgICAgIHxcbiAqIHwgTiB5cnMgMyBtb250aHMgLi4uIE4geXJzIDkgbW9udGhzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBvdmVyIE4geWVhcnMgICAgICAgIHxcbiAqIHwgTiB5cnMgOSBtb250aHMgLi4uIE4rMSB5cnMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBhbG1vc3QgTisxIHllYXJzICAgIHxcbiAqXG4gKiBXaXRoIGBvcHRpb25zLmluY2x1ZGVTZWNvbmRzID09IHRydWVgOlxuICogfCBEaXN0YW5jZSB0byBub3cgICAgIHwgUmVzdWx0ICAgICAgICAgICAgICAgfFxuICogfC0tLS0tLS0tLS0tLS0tLS0tLS0tLXwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tfFxuICogfCAwIHNlY3MgLi4uIDUgc2VjcyAgIHwgbGVzcyB0aGFuIDUgc2Vjb25kcyAgfFxuICogfCA1IHNlY3MgLi4uIDEwIHNlY3MgIHwgbGVzcyB0aGFuIDEwIHNlY29uZHMgfFxuICogfCAxMCBzZWNzIC4uLiAyMCBzZWNzIHwgbGVzcyB0aGFuIDIwIHNlY29uZHMgfFxuICogfCAyMCBzZWNzIC4uLiA0MCBzZWNzIHwgaGFsZiBhIG1pbnV0ZSAgICAgICAgfFxuICogfCA0MCBzZWNzIC4uLiA2MCBzZWNzIHwgbGVzcyB0aGFuIGEgbWludXRlICAgfFxuICogfCA2MCBzZWNzIC4uLiA5MCBzZWNzIHwgMSBtaW51dGUgICAgICAgICAgICAgfFxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIGdpdmVuIGRhdGVcbiAqIEBwYXJhbSBvcHRpb25zIC0gVGhlIG9iamVjdCB3aXRoIG9wdGlvbnNcbiAqXG4gKiBAcmV0dXJucyBUaGUgZGlzdGFuY2UgaW4gd29yZHNcbiAqXG4gKiBAdGhyb3dzIGBkYXRlYCBtdXN0IG5vdCBiZSBJbnZhbGlkIERhdGVcbiAqIEB0aHJvd3MgYG9wdGlvbnMubG9jYWxlYCBtdXN0IGNvbnRhaW4gYGZvcm1hdERpc3RhbmNlYCBwcm9wZXJ0eVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJZiB0b2RheSBpcyAxIEphbnVhcnkgMjAxNSwgd2hhdCBpcyB0aGUgZGlzdGFuY2UgdG8gMiBKdWx5IDIwMTQ/XG4gKiBjb25zdCByZXN1bHQgPSBmb3JtYXREaXN0YW5jZVRvTm93KFxuICogICBuZXcgRGF0ZSgyMDE0LCA2LCAyKVxuICogKVxuICogLy89PiAnNiBtb250aHMnXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElmIG5vdyBpcyAxIEphbnVhcnkgMjAxNSAwMDowMDowMCxcbiAqIC8vIHdoYXQgaXMgdGhlIGRpc3RhbmNlIHRvIDEgSmFudWFyeSAyMDE1IDAwOjAwOjE1LCBpbmNsdWRpbmcgc2Vjb25kcz9cbiAqIGNvbnN0IHJlc3VsdCA9IGZvcm1hdERpc3RhbmNlVG9Ob3coXG4gKiAgIG5ldyBEYXRlKDIwMTUsIDAsIDEsIDAsIDAsIDE1KSxcbiAqICAge2luY2x1ZGVTZWNvbmRzOiB0cnVlfVxuICogKVxuICogLy89PiAnbGVzcyB0aGFuIDIwIHNlY29uZHMnXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElmIHRvZGF5IGlzIDEgSmFudWFyeSAyMDE1LFxuICogLy8gd2hhdCBpcyB0aGUgZGlzdGFuY2UgdG8gMSBKYW51YXJ5IDIwMTYsIHdpdGggYSBzdWZmaXg/XG4gKiBjb25zdCByZXN1bHQgPSBmb3JtYXREaXN0YW5jZVRvTm93KFxuICogICBuZXcgRGF0ZSgyMDE2LCAwLCAxKSxcbiAqICAge2FkZFN1ZmZpeDogdHJ1ZX1cbiAqIClcbiAqIC8vPT4gJ2luIGFib3V0IDEgeWVhcidcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgdG9kYXkgaXMgMSBKYW51YXJ5IDIwMTUsXG4gKiAvLyB3aGF0IGlzIHRoZSBkaXN0YW5jZSB0byAxIEF1Z3VzdCAyMDE2IGluIEVzcGVyYW50bz9cbiAqIGNvbnN0IGVvTG9jYWxlID0gcmVxdWlyZSgnZGF0ZS1mbnMvbG9jYWxlL2VvJylcbiAqIGNvbnN0IHJlc3VsdCA9IGZvcm1hdERpc3RhbmNlVG9Ob3coXG4gKiAgIG5ldyBEYXRlKDIwMTYsIDcsIDEpLFxuICogICB7bG9jYWxlOiBlb0xvY2FsZX1cbiAqIClcbiAqIC8vPT4gJ3BsaSBvbCAxIGphcm8nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXREaXN0YW5jZVRvTm93KGRhdGUsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIGZvcm1hdERpc3RhbmNlKGRhdGUsIGNvbnN0cnVjdE5vdyhkYXRlKSwgb3B0aW9ucyk7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgZm9ybWF0RGlzdGFuY2VUb05vdztcbiIsImltcG9ydCB7IGVuZE9mRGF5IH0gZnJvbSBcIi4vZW5kT2ZEYXkuanNcIjtcbmltcG9ydCB7IGVuZE9mTW9udGggfSBmcm9tIFwiLi9lbmRPZk1vbnRoLmpzXCI7XG5pbXBvcnQgeyB0b0RhdGUgfSBmcm9tIFwiLi90b0RhdGUuanNcIjtcblxuLyoqXG4gKiBAbmFtZSBpc0xhc3REYXlPZk1vbnRoXG4gKiBAY2F0ZWdvcnkgTW9udGggSGVscGVyc1xuICogQHN1bW1hcnkgSXMgdGhlIGdpdmVuIGRhdGUgdGhlIGxhc3QgZGF5IG9mIGEgbW9udGg/XG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBJcyB0aGUgZ2l2ZW4gZGF0ZSB0aGUgbGFzdCBkYXkgb2YgYSBtb250aD9cbiAqXG4gKiBAcGFyYW0gZGF0ZSAtIFRoZSBkYXRlIHRvIGNoZWNrXG4gKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9iamVjdCB3aXRoIG9wdGlvbnNcbiAqXG4gKiBAcmV0dXJucyBUaGUgZGF0ZSBpcyB0aGUgbGFzdCBkYXkgb2YgYSBtb250aFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJcyAyOCBGZWJydWFyeSAyMDE0IHRoZSBsYXN0IGRheSBvZiBhIG1vbnRoP1xuICogY29uc3QgcmVzdWx0ID0gaXNMYXN0RGF5T2ZNb250aChuZXcgRGF0ZSgyMDE0LCAxLCAyOCkpXG4gKiAvLz0+IHRydWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTGFzdERheU9mTW9udGgoZGF0ZSwgb3B0aW9ucykge1xuICBjb25zdCBfZGF0ZSA9IHRvRGF0ZShkYXRlLCBvcHRpb25zPy5pbik7XG4gIHJldHVybiArZW5kT2ZEYXkoX2RhdGUsIG9wdGlvbnMpID09PSArZW5kT2ZNb250aChfZGF0ZSwgb3B0aW9ucyk7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgaXNMYXN0RGF5T2ZNb250aDtcbiIsImltcG9ydCB7IG5vcm1hbGl6ZURhdGVzIH0gZnJvbSBcIi4vX2xpYi9ub3JtYWxpemVEYXRlcy5qc1wiO1xuaW1wb3J0IHsgc3RhcnRPZldlZWsgfSBmcm9tIFwiLi9zdGFydE9mV2Vlay5qc1wiO1xuXG4vKipcbiAqIFRoZSB7QGxpbmsgaXNTYW1lV2Vla30gZnVuY3Rpb24gb3B0aW9ucy5cbiAqL1xuXG4vKipcbiAqIEBuYW1lIGlzU2FtZVdlZWtcbiAqIEBjYXRlZ29yeSBXZWVrIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEFyZSB0aGUgZ2l2ZW4gZGF0ZXMgaW4gdGhlIHNhbWUgd2VlayAoYW5kIG1vbnRoIGFuZCB5ZWFyKT9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEFyZSB0aGUgZ2l2ZW4gZGF0ZXMgaW4gdGhlIHNhbWUgd2VlayAoYW5kIG1vbnRoIGFuZCB5ZWFyKT9cbiAqXG4gKiBAcGFyYW0gbGF0ZXJEYXRlIC0gVGhlIGZpcnN0IGRhdGUgdG8gY2hlY2tcbiAqIEBwYXJhbSBlYXJsaWVyRGF0ZSAtIFRoZSBzZWNvbmQgZGF0ZSB0byBjaGVja1xuICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvYmplY3Qgd2l0aCBvcHRpb25zXG4gKlxuICogQHJldHVybnMgVGhlIGRhdGVzIGFyZSBpbiB0aGUgc2FtZSB3ZWVrIChhbmQgbW9udGggYW5kIHllYXIpXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEFyZSAzMSBBdWd1c3QgMjAxNCBhbmQgNCBTZXB0ZW1iZXIgMjAxNCBpbiB0aGUgc2FtZSB3ZWVrP1xuICogY29uc3QgcmVzdWx0ID0gaXNTYW1lV2VlayhuZXcgRGF0ZSgyMDE0LCA3LCAzMSksIG5ldyBEYXRlKDIwMTQsIDgsIDQpKVxuICogLy89PiB0cnVlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElmIHdlZWsgc3RhcnRzIHdpdGggTW9uZGF5LFxuICogLy8gYXJlIDMxIEF1Z3VzdCAyMDE0IGFuZCA0IFNlcHRlbWJlciAyMDE0IGluIHRoZSBzYW1lIHdlZWs/XG4gKiBjb25zdCByZXN1bHQgPSBpc1NhbWVXZWVrKG5ldyBEYXRlKDIwMTQsIDcsIDMxKSwgbmV3IERhdGUoMjAxNCwgOCwgNCksIHtcbiAqICAgd2Vla1N0YXJ0c09uOiAxXG4gKiB9KVxuICogLy89PiBmYWxzZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBBcmUgMSBKYW51YXJ5IDIwMTQgYW5kIDEgSmFudWFyeSAyMDE1IGluIHRoZSBzYW1lIHdlZWs/XG4gKiBjb25zdCByZXN1bHQgPSBpc1NhbWVXZWVrKG5ldyBEYXRlKDIwMTQsIDAsIDEpLCBuZXcgRGF0ZSgyMDE1LCAwLCAxKSlcbiAqIC8vPT4gZmFsc2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU2FtZVdlZWsobGF0ZXJEYXRlLCBlYXJsaWVyRGF0ZSwgb3B0aW9ucykge1xuICBjb25zdCBbbGF0ZXJEYXRlXywgZWFybGllckRhdGVfXSA9IG5vcm1hbGl6ZURhdGVzKFxuICAgIG9wdGlvbnM/LmluLFxuICAgIGxhdGVyRGF0ZSxcbiAgICBlYXJsaWVyRGF0ZSxcbiAgKTtcbiAgcmV0dXJuIChcbiAgICArc3RhcnRPZldlZWsobGF0ZXJEYXRlXywgb3B0aW9ucykgPT09ICtzdGFydE9mV2VlayhlYXJsaWVyRGF0ZV8sIG9wdGlvbnMpXG4gICk7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgaXNTYW1lV2VlaztcbiIsImV4cG9ydCBmdW5jdGlvbiBidWlsZEZvcm1hdExvbmdGbihhcmdzKSB7XG4gIHJldHVybiAob3B0aW9ucyA9IHt9KSA9PiB7XG4gICAgLy8gVE9ETzogUmVtb3ZlIFN0cmluZygpXG4gICAgY29uc3Qgd2lkdGggPSBvcHRpb25zLndpZHRoID8gU3RyaW5nKG9wdGlvbnMud2lkdGgpIDogYXJncy5kZWZhdWx0V2lkdGg7XG4gICAgY29uc3QgZm9ybWF0ID0gYXJncy5mb3JtYXRzW3dpZHRoXSB8fCBhcmdzLmZvcm1hdHNbYXJncy5kZWZhdWx0V2lkdGhdO1xuICAgIHJldHVybiBmb3JtYXQ7XG4gIH07XG59XG4iLCIvKipcbiAqIFRoZSBsb2NhbGl6ZSBmdW5jdGlvbiBhcmd1bWVudCBjYWxsYmFjayB3aGljaCBhbGxvd3MgdG8gY29udmVydCByYXcgdmFsdWUgdG9cbiAqIHRoZSBhY3R1YWwgdHlwZS5cbiAqXG4gKiBAcGFyYW0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gY29udmVydFxuICpcbiAqIEByZXR1cm5zIFRoZSBjb252ZXJ0ZWQgdmFsdWVcbiAqL1xuXG4vKipcbiAqIFRoZSBtYXAgb2YgbG9jYWxpemVkIHZhbHVlcyBmb3IgZWFjaCB3aWR0aC5cbiAqL1xuXG4vKipcbiAqIFRoZSBpbmRleCB0eXBlIG9mIHRoZSBsb2NhbGUgdW5pdCB2YWx1ZS4gSXQgdHlwZXMgY29udmVyc2lvbiBvZiB1bml0cyBvZlxuICogdmFsdWVzIHRoYXQgZG9uJ3Qgc3RhcnQgYXQgMCAoaS5lLiBxdWFydGVycykuXG4gKi9cblxuLyoqXG4gKiBDb252ZXJ0cyB0aGUgdW5pdCB2YWx1ZSB0byB0aGUgdHVwbGUgb2YgdmFsdWVzLlxuICovXG5cbi8qKlxuICogVGhlIHR1cGxlIG9mIGxvY2FsaXplZCBlcmEgdmFsdWVzLiBUaGUgZmlyc3QgZWxlbWVudCByZXByZXNlbnRzIEJDLFxuICogdGhlIHNlY29uZCBlbGVtZW50IHJlcHJlc2VudHMgQUQuXG4gKi9cblxuLyoqXG4gKiBUaGUgdHVwbGUgb2YgbG9jYWxpemVkIHF1YXJ0ZXIgdmFsdWVzLiBUaGUgZmlyc3QgZWxlbWVudCByZXByZXNlbnRzIFExLlxuICovXG5cbi8qKlxuICogVGhlIHR1cGxlIG9mIGxvY2FsaXplZCBkYXkgdmFsdWVzLiBUaGUgZmlyc3QgZWxlbWVudCByZXByZXNlbnRzIFN1bmRheS5cbiAqL1xuXG4vKipcbiAqIFRoZSB0dXBsZSBvZiBsb2NhbGl6ZWQgbW9udGggdmFsdWVzLiBUaGUgZmlyc3QgZWxlbWVudCByZXByZXNlbnRzIEphbnVhcnkuXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkTG9jYWxpemVGbihhcmdzKSB7XG4gIHJldHVybiAodmFsdWUsIG9wdGlvbnMpID0+IHtcbiAgICBjb25zdCBjb250ZXh0ID0gb3B0aW9ucz8uY29udGV4dCA/IFN0cmluZyhvcHRpb25zLmNvbnRleHQpIDogXCJzdGFuZGFsb25lXCI7XG5cbiAgICBsZXQgdmFsdWVzQXJyYXk7XG4gICAgaWYgKGNvbnRleHQgPT09IFwiZm9ybWF0dGluZ1wiICYmIGFyZ3MuZm9ybWF0dGluZ1ZhbHVlcykge1xuICAgICAgY29uc3QgZGVmYXVsdFdpZHRoID0gYXJncy5kZWZhdWx0Rm9ybWF0dGluZ1dpZHRoIHx8IGFyZ3MuZGVmYXVsdFdpZHRoO1xuICAgICAgY29uc3Qgd2lkdGggPSBvcHRpb25zPy53aWR0aCA/IFN0cmluZyhvcHRpb25zLndpZHRoKSA6IGRlZmF1bHRXaWR0aDtcblxuICAgICAgdmFsdWVzQXJyYXkgPVxuICAgICAgICBhcmdzLmZvcm1hdHRpbmdWYWx1ZXNbd2lkdGhdIHx8IGFyZ3MuZm9ybWF0dGluZ1ZhbHVlc1tkZWZhdWx0V2lkdGhdO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkZWZhdWx0V2lkdGggPSBhcmdzLmRlZmF1bHRXaWR0aDtcbiAgICAgIGNvbnN0IHdpZHRoID0gb3B0aW9ucz8ud2lkdGggPyBTdHJpbmcob3B0aW9ucy53aWR0aCkgOiBhcmdzLmRlZmF1bHRXaWR0aDtcblxuICAgICAgdmFsdWVzQXJyYXkgPSBhcmdzLnZhbHVlc1t3aWR0aF0gfHwgYXJncy52YWx1ZXNbZGVmYXVsdFdpZHRoXTtcbiAgICB9XG4gICAgY29uc3QgaW5kZXggPSBhcmdzLmFyZ3VtZW50Q2FsbGJhY2sgPyBhcmdzLmFyZ3VtZW50Q2FsbGJhY2sodmFsdWUpIDogdmFsdWU7XG5cbiAgICAvLyBAdHMtZXhwZWN0LWVycm9yIC0gRm9yIHNvbWUgcmVhc29uIFR5cGVTY3JpcHQganVzdCBkb24ndCB3YW50IHRvIG1hdGNoIGl0LCBubyBtYXR0ZXIgaG93IGhhcmQgd2UgdHJ5LiBJIGNoYWxsZW5nZSB5b3UgdG8gdHJ5IHRvIHJlbW92ZSBpdCFcbiAgICByZXR1cm4gdmFsdWVzQXJyYXlbaW5kZXhdO1xuICB9O1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkTWF0Y2hGbihhcmdzKSB7XG4gIHJldHVybiAoc3RyaW5nLCBvcHRpb25zID0ge30pID0+IHtcbiAgICBjb25zdCB3aWR0aCA9IG9wdGlvbnMud2lkdGg7XG5cbiAgICBjb25zdCBtYXRjaFBhdHRlcm4gPVxuICAgICAgKHdpZHRoICYmIGFyZ3MubWF0Y2hQYXR0ZXJuc1t3aWR0aF0pIHx8XG4gICAgICBhcmdzLm1hdGNoUGF0dGVybnNbYXJncy5kZWZhdWx0TWF0Y2hXaWR0aF07XG4gICAgY29uc3QgbWF0Y2hSZXN1bHQgPSBzdHJpbmcubWF0Y2gobWF0Y2hQYXR0ZXJuKTtcblxuICAgIGlmICghbWF0Y2hSZXN1bHQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBtYXRjaGVkU3RyaW5nID0gbWF0Y2hSZXN1bHRbMF07XG5cbiAgICBjb25zdCBwYXJzZVBhdHRlcm5zID1cbiAgICAgICh3aWR0aCAmJiBhcmdzLnBhcnNlUGF0dGVybnNbd2lkdGhdKSB8fFxuICAgICAgYXJncy5wYXJzZVBhdHRlcm5zW2FyZ3MuZGVmYXVsdFBhcnNlV2lkdGhdO1xuXG4gICAgY29uc3Qga2V5ID0gQXJyYXkuaXNBcnJheShwYXJzZVBhdHRlcm5zKVxuICAgICAgPyBmaW5kSW5kZXgocGFyc2VQYXR0ZXJucywgKHBhdHRlcm4pID0+IHBhdHRlcm4udGVzdChtYXRjaGVkU3RyaW5nKSlcbiAgICAgIDogLy8gW1RPRE9dIC0tIEkgY2hhbGxlbmdlIHlvdSB0byBmaXggdGhlIHR5cGVcbiAgICAgICAgZmluZEtleShwYXJzZVBhdHRlcm5zLCAocGF0dGVybikgPT4gcGF0dGVybi50ZXN0KG1hdGNoZWRTdHJpbmcpKTtcblxuICAgIGxldCB2YWx1ZTtcblxuICAgIHZhbHVlID0gYXJncy52YWx1ZUNhbGxiYWNrID8gYXJncy52YWx1ZUNhbGxiYWNrKGtleSkgOiBrZXk7XG4gICAgdmFsdWUgPSBvcHRpb25zLnZhbHVlQ2FsbGJhY2tcbiAgICAgID8gLy8gW1RPRE9dIC0tIEkgY2hhbGxlbmdlIHlvdSB0byBmaXggdGhlIHR5cGVcbiAgICAgICAgb3B0aW9ucy52YWx1ZUNhbGxiYWNrKHZhbHVlKVxuICAgICAgOiB2YWx1ZTtcblxuICAgIGNvbnN0IHJlc3QgPSBzdHJpbmcuc2xpY2UobWF0Y2hlZFN0cmluZy5sZW5ndGgpO1xuXG4gICAgcmV0dXJuIHsgdmFsdWUsIHJlc3QgfTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gZmluZEtleShvYmplY3QsIHByZWRpY2F0ZSkge1xuICBmb3IgKGNvbnN0IGtleSBpbiBvYmplY3QpIHtcbiAgICBpZiAoXG4gICAgICBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpICYmXG4gICAgICBwcmVkaWNhdGUob2JqZWN0W2tleV0pXG4gICAgKSB7XG4gICAgICByZXR1cm4ga2V5O1xuICAgIH1cbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBmaW5kSW5kZXgoYXJyYXksIHByZWRpY2F0ZSkge1xuICBmb3IgKGxldCBrZXkgPSAwOyBrZXkgPCBhcnJheS5sZW5ndGg7IGtleSsrKSB7XG4gICAgaWYgKHByZWRpY2F0ZShhcnJheVtrZXldKSkge1xuICAgICAgcmV0dXJuIGtleTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBidWlsZE1hdGNoUGF0dGVybkZuKGFyZ3MpIHtcbiAgcmV0dXJuIChzdHJpbmcsIG9wdGlvbnMgPSB7fSkgPT4ge1xuICAgIGNvbnN0IG1hdGNoUmVzdWx0ID0gc3RyaW5nLm1hdGNoKGFyZ3MubWF0Y2hQYXR0ZXJuKTtcbiAgICBpZiAoIW1hdGNoUmVzdWx0KSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCBtYXRjaGVkU3RyaW5nID0gbWF0Y2hSZXN1bHRbMF07XG5cbiAgICBjb25zdCBwYXJzZVJlc3VsdCA9IHN0cmluZy5tYXRjaChhcmdzLnBhcnNlUGF0dGVybik7XG4gICAgaWYgKCFwYXJzZVJlc3VsdCkgcmV0dXJuIG51bGw7XG4gICAgbGV0IHZhbHVlID0gYXJncy52YWx1ZUNhbGxiYWNrXG4gICAgICA/IGFyZ3MudmFsdWVDYWxsYmFjayhwYXJzZVJlc3VsdFswXSlcbiAgICAgIDogcGFyc2VSZXN1bHRbMF07XG5cbiAgICAvLyBbVE9ET10gSSBjaGFsbGVuZ2UgeW91IHRvIGZpeCB0aGUgdHlwZVxuICAgIHZhbHVlID0gb3B0aW9ucy52YWx1ZUNhbGxiYWNrID8gb3B0aW9ucy52YWx1ZUNhbGxiYWNrKHZhbHVlKSA6IHZhbHVlO1xuXG4gICAgY29uc3QgcmVzdCA9IHN0cmluZy5zbGljZShtYXRjaGVkU3RyaW5nLmxlbmd0aCk7XG5cbiAgICByZXR1cm4geyB2YWx1ZSwgcmVzdCB9O1xuICB9O1xufVxuIiwiaW1wb3J0IHsgZm9ybWF0RGlzdGFuY2UgfSBmcm9tIFwiLi9lbi1VUy9fbGliL2Zvcm1hdERpc3RhbmNlLmpzXCI7XG5pbXBvcnQgeyBmb3JtYXRMb25nIH0gZnJvbSBcIi4vZW4tVVMvX2xpYi9mb3JtYXRMb25nLmpzXCI7XG5pbXBvcnQgeyBmb3JtYXRSZWxhdGl2ZSB9IGZyb20gXCIuL2VuLVVTL19saWIvZm9ybWF0UmVsYXRpdmUuanNcIjtcbmltcG9ydCB7IGxvY2FsaXplIH0gZnJvbSBcIi4vZW4tVVMvX2xpYi9sb2NhbGl6ZS5qc1wiO1xuaW1wb3J0IHsgbWF0Y2ggfSBmcm9tIFwiLi9lbi1VUy9fbGliL21hdGNoLmpzXCI7XG5cbi8qKlxuICogQGNhdGVnb3J5IExvY2FsZXNcbiAqIEBzdW1tYXJ5IEVuZ2xpc2ggbG9jYWxlIChVbml0ZWQgU3RhdGVzKS5cbiAqIEBsYW5ndWFnZSBFbmdsaXNoXG4gKiBAaXNvLTYzOS0yIGVuZ1xuICogQGF1dGhvciBTYXNoYSBLb3NzIFtAa29zc25vY29ycF0oaHR0cHM6Ly9naXRodWIuY29tL2tvc3Nub2NvcnApXG4gKiBAYXV0aG9yIExlc2hhIEtvc3MgW0BsZXNoYWtvc3NdKGh0dHBzOi8vZ2l0aHViLmNvbS9sZXNoYWtvc3MpXG4gKi9cbmV4cG9ydCBjb25zdCBlblVTID0ge1xuICBjb2RlOiBcImVuLVVTXCIsXG4gIGZvcm1hdERpc3RhbmNlOiBmb3JtYXREaXN0YW5jZSxcbiAgZm9ybWF0TG9uZzogZm9ybWF0TG9uZyxcbiAgZm9ybWF0UmVsYXRpdmU6IGZvcm1hdFJlbGF0aXZlLFxuICBsb2NhbGl6ZTogbG9jYWxpemUsXG4gIG1hdGNoOiBtYXRjaCxcbiAgb3B0aW9uczoge1xuICAgIHdlZWtTdGFydHNPbjogMCAvKiBTdW5kYXkgKi8sXG4gICAgZmlyc3RXZWVrQ29udGFpbnNEYXRlOiAxLFxuICB9LFxufTtcblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBlblVTO1xuIiwiY29uc3QgZm9ybWF0RGlzdGFuY2VMb2NhbGUgPSB7XG4gIGxlc3NUaGFuWFNlY29uZHM6IHtcbiAgICBvbmU6IFwibGVzcyB0aGFuIGEgc2Vjb25kXCIsXG4gICAgb3RoZXI6IFwibGVzcyB0aGFuIHt7Y291bnR9fSBzZWNvbmRzXCIsXG4gIH0sXG5cbiAgeFNlY29uZHM6IHtcbiAgICBvbmU6IFwiMSBzZWNvbmRcIixcbiAgICBvdGhlcjogXCJ7e2NvdW50fX0gc2Vjb25kc1wiLFxuICB9LFxuXG4gIGhhbGZBTWludXRlOiBcImhhbGYgYSBtaW51dGVcIixcblxuICBsZXNzVGhhblhNaW51dGVzOiB7XG4gICAgb25lOiBcImxlc3MgdGhhbiBhIG1pbnV0ZVwiLFxuICAgIG90aGVyOiBcImxlc3MgdGhhbiB7e2NvdW50fX0gbWludXRlc1wiLFxuICB9LFxuXG4gIHhNaW51dGVzOiB7XG4gICAgb25lOiBcIjEgbWludXRlXCIsXG4gICAgb3RoZXI6IFwie3tjb3VudH19IG1pbnV0ZXNcIixcbiAgfSxcblxuICBhYm91dFhIb3Vyczoge1xuICAgIG9uZTogXCJhYm91dCAxIGhvdXJcIixcbiAgICBvdGhlcjogXCJhYm91dCB7e2NvdW50fX0gaG91cnNcIixcbiAgfSxcblxuICB4SG91cnM6IHtcbiAgICBvbmU6IFwiMSBob3VyXCIsXG4gICAgb3RoZXI6IFwie3tjb3VudH19IGhvdXJzXCIsXG4gIH0sXG5cbiAgeERheXM6IHtcbiAgICBvbmU6IFwiMSBkYXlcIixcbiAgICBvdGhlcjogXCJ7e2NvdW50fX0gZGF5c1wiLFxuICB9LFxuXG4gIGFib3V0WFdlZWtzOiB7XG4gICAgb25lOiBcImFib3V0IDEgd2Vla1wiLFxuICAgIG90aGVyOiBcImFib3V0IHt7Y291bnR9fSB3ZWVrc1wiLFxuICB9LFxuXG4gIHhXZWVrczoge1xuICAgIG9uZTogXCIxIHdlZWtcIixcbiAgICBvdGhlcjogXCJ7e2NvdW50fX0gd2Vla3NcIixcbiAgfSxcblxuICBhYm91dFhNb250aHM6IHtcbiAgICBvbmU6IFwiYWJvdXQgMSBtb250aFwiLFxuICAgIG90aGVyOiBcImFib3V0IHt7Y291bnR9fSBtb250aHNcIixcbiAgfSxcblxuICB4TW9udGhzOiB7XG4gICAgb25lOiBcIjEgbW9udGhcIixcbiAgICBvdGhlcjogXCJ7e2NvdW50fX0gbW9udGhzXCIsXG4gIH0sXG5cbiAgYWJvdXRYWWVhcnM6IHtcbiAgICBvbmU6IFwiYWJvdXQgMSB5ZWFyXCIsXG4gICAgb3RoZXI6IFwiYWJvdXQge3tjb3VudH19IHllYXJzXCIsXG4gIH0sXG5cbiAgeFllYXJzOiB7XG4gICAgb25lOiBcIjEgeWVhclwiLFxuICAgIG90aGVyOiBcInt7Y291bnR9fSB5ZWFyc1wiLFxuICB9LFxuXG4gIG92ZXJYWWVhcnM6IHtcbiAgICBvbmU6IFwib3ZlciAxIHllYXJcIixcbiAgICBvdGhlcjogXCJvdmVyIHt7Y291bnR9fSB5ZWFyc1wiLFxuICB9LFxuXG4gIGFsbW9zdFhZZWFyczoge1xuICAgIG9uZTogXCJhbG1vc3QgMSB5ZWFyXCIsXG4gICAgb3RoZXI6IFwiYWxtb3N0IHt7Y291bnR9fSB5ZWFyc1wiLFxuICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IGZvcm1hdERpc3RhbmNlID0gKHRva2VuLCBjb3VudCwgb3B0aW9ucykgPT4ge1xuICBsZXQgcmVzdWx0O1xuXG4gIGNvbnN0IHRva2VuVmFsdWUgPSBmb3JtYXREaXN0YW5jZUxvY2FsZVt0b2tlbl07XG4gIGlmICh0eXBlb2YgdG9rZW5WYWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuICAgIHJlc3VsdCA9IHRva2VuVmFsdWU7XG4gIH0gZWxzZSBpZiAoY291bnQgPT09IDEpIHtcbiAgICByZXN1bHQgPSB0b2tlblZhbHVlLm9uZTtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgPSB0b2tlblZhbHVlLm90aGVyLnJlcGxhY2UoXCJ7e2NvdW50fX1cIiwgY291bnQudG9TdHJpbmcoKSk7XG4gIH1cblxuICBpZiAob3B0aW9ucz8uYWRkU3VmZml4KSB7XG4gICAgaWYgKG9wdGlvbnMuY29tcGFyaXNvbiAmJiBvcHRpb25zLmNvbXBhcmlzb24gPiAwKSB7XG4gICAgICByZXR1cm4gXCJpbiBcIiArIHJlc3VsdDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHJlc3VsdCArIFwiIGFnb1wiO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwiaW1wb3J0IHsgYnVpbGRGb3JtYXRMb25nRm4gfSBmcm9tIFwiLi4vLi4vX2xpYi9idWlsZEZvcm1hdExvbmdGbi5qc1wiO1xuXG5jb25zdCBkYXRlRm9ybWF0cyA9IHtcbiAgZnVsbDogXCJFRUVFLCBNTU1NIGRvLCB5XCIsXG4gIGxvbmc6IFwiTU1NTSBkbywgeVwiLFxuICBtZWRpdW06IFwiTU1NIGQsIHlcIixcbiAgc2hvcnQ6IFwiTU0vZGQveXl5eVwiLFxufTtcblxuY29uc3QgdGltZUZvcm1hdHMgPSB7XG4gIGZ1bGw6IFwiaDptbTpzcyBhIHp6enpcIixcbiAgbG9uZzogXCJoOm1tOnNzIGEgelwiLFxuICBtZWRpdW06IFwiaDptbTpzcyBhXCIsXG4gIHNob3J0OiBcImg6bW0gYVwiLFxufTtcblxuY29uc3QgZGF0ZVRpbWVGb3JtYXRzID0ge1xuICBmdWxsOiBcInt7ZGF0ZX19ICdhdCcge3t0aW1lfX1cIixcbiAgbG9uZzogXCJ7e2RhdGV9fSAnYXQnIHt7dGltZX19XCIsXG4gIG1lZGl1bTogXCJ7e2RhdGV9fSwge3t0aW1lfX1cIixcbiAgc2hvcnQ6IFwie3tkYXRlfX0sIHt7dGltZX19XCIsXG59O1xuXG5leHBvcnQgY29uc3QgZm9ybWF0TG9uZyA9IHtcbiAgZGF0ZTogYnVpbGRGb3JtYXRMb25nRm4oe1xuICAgIGZvcm1hdHM6IGRhdGVGb3JtYXRzLFxuICAgIGRlZmF1bHRXaWR0aDogXCJmdWxsXCIsXG4gIH0pLFxuXG4gIHRpbWU6IGJ1aWxkRm9ybWF0TG9uZ0ZuKHtcbiAgICBmb3JtYXRzOiB0aW1lRm9ybWF0cyxcbiAgICBkZWZhdWx0V2lkdGg6IFwiZnVsbFwiLFxuICB9KSxcblxuICBkYXRlVGltZTogYnVpbGRGb3JtYXRMb25nRm4oe1xuICAgIGZvcm1hdHM6IGRhdGVUaW1lRm9ybWF0cyxcbiAgICBkZWZhdWx0V2lkdGg6IFwiZnVsbFwiLFxuICB9KSxcbn07XG4iLCJjb25zdCBmb3JtYXRSZWxhdGl2ZUxvY2FsZSA9IHtcbiAgbGFzdFdlZWs6IFwiJ2xhc3QnIGVlZWUgJ2F0JyBwXCIsXG4gIHllc3RlcmRheTogXCIneWVzdGVyZGF5IGF0JyBwXCIsXG4gIHRvZGF5OiBcIid0b2RheSBhdCcgcFwiLFxuICB0b21vcnJvdzogXCIndG9tb3Jyb3cgYXQnIHBcIixcbiAgbmV4dFdlZWs6IFwiZWVlZSAnYXQnIHBcIixcbiAgb3RoZXI6IFwiUFwiLFxufTtcblxuZXhwb3J0IGNvbnN0IGZvcm1hdFJlbGF0aXZlID0gKHRva2VuLCBfZGF0ZSwgX2Jhc2VEYXRlLCBfb3B0aW9ucykgPT5cbiAgZm9ybWF0UmVsYXRpdmVMb2NhbGVbdG9rZW5dO1xuIiwiaW1wb3J0IHsgYnVpbGRMb2NhbGl6ZUZuIH0gZnJvbSBcIi4uLy4uL19saWIvYnVpbGRMb2NhbGl6ZUZuLmpzXCI7XG5cbmNvbnN0IGVyYVZhbHVlcyA9IHtcbiAgbmFycm93OiBbXCJCXCIsIFwiQVwiXSxcbiAgYWJicmV2aWF0ZWQ6IFtcIkJDXCIsIFwiQURcIl0sXG4gIHdpZGU6IFtcIkJlZm9yZSBDaHJpc3RcIiwgXCJBbm5vIERvbWluaVwiXSxcbn07XG5cbmNvbnN0IHF1YXJ0ZXJWYWx1ZXMgPSB7XG4gIG5hcnJvdzogW1wiMVwiLCBcIjJcIiwgXCIzXCIsIFwiNFwiXSxcbiAgYWJicmV2aWF0ZWQ6IFtcIlExXCIsIFwiUTJcIiwgXCJRM1wiLCBcIlE0XCJdLFxuICB3aWRlOiBbXCIxc3QgcXVhcnRlclwiLCBcIjJuZCBxdWFydGVyXCIsIFwiM3JkIHF1YXJ0ZXJcIiwgXCI0dGggcXVhcnRlclwiXSxcbn07XG5cbi8vIE5vdGU6IGluIEVuZ2xpc2gsIHRoZSBuYW1lcyBvZiBkYXlzIG9mIHRoZSB3ZWVrIGFuZCBtb250aHMgYXJlIGNhcGl0YWxpemVkLlxuLy8gSWYgeW91IGFyZSBtYWtpbmcgYSBuZXcgbG9jYWxlIGJhc2VkIG9uIHRoaXMgb25lLCBjaGVjayBpZiB0aGUgc2FtZSBpcyB0cnVlIGZvciB0aGUgbGFuZ3VhZ2UgeW91J3JlIHdvcmtpbmcgb24uXG4vLyBHZW5lcmFsbHksIGZvcm1hdHRlZCBkYXRlcyBzaG91bGQgbG9vayBsaWtlIHRoZXkgYXJlIGluIHRoZSBtaWRkbGUgb2YgYSBzZW50ZW5jZSxcbi8vIGUuZy4gaW4gU3BhbmlzaCBsYW5ndWFnZSB0aGUgd2Vla2RheXMgYW5kIG1vbnRocyBzaG91bGQgYmUgaW4gdGhlIGxvd2VyY2FzZS5cbmNvbnN0IG1vbnRoVmFsdWVzID0ge1xuICBuYXJyb3c6IFtcIkpcIiwgXCJGXCIsIFwiTVwiLCBcIkFcIiwgXCJNXCIsIFwiSlwiLCBcIkpcIiwgXCJBXCIsIFwiU1wiLCBcIk9cIiwgXCJOXCIsIFwiRFwiXSxcbiAgYWJicmV2aWF0ZWQ6IFtcbiAgICBcIkphblwiLFxuICAgIFwiRmViXCIsXG4gICAgXCJNYXJcIixcbiAgICBcIkFwclwiLFxuICAgIFwiTWF5XCIsXG4gICAgXCJKdW5cIixcbiAgICBcIkp1bFwiLFxuICAgIFwiQXVnXCIsXG4gICAgXCJTZXBcIixcbiAgICBcIk9jdFwiLFxuICAgIFwiTm92XCIsXG4gICAgXCJEZWNcIixcbiAgXSxcblxuICB3aWRlOiBbXG4gICAgXCJKYW51YXJ5XCIsXG4gICAgXCJGZWJydWFyeVwiLFxuICAgIFwiTWFyY2hcIixcbiAgICBcIkFwcmlsXCIsXG4gICAgXCJNYXlcIixcbiAgICBcIkp1bmVcIixcbiAgICBcIkp1bHlcIixcbiAgICBcIkF1Z3VzdFwiLFxuICAgIFwiU2VwdGVtYmVyXCIsXG4gICAgXCJPY3RvYmVyXCIsXG4gICAgXCJOb3ZlbWJlclwiLFxuICAgIFwiRGVjZW1iZXJcIixcbiAgXSxcbn07XG5cbmNvbnN0IGRheVZhbHVlcyA9IHtcbiAgbmFycm93OiBbXCJTXCIsIFwiTVwiLCBcIlRcIiwgXCJXXCIsIFwiVFwiLCBcIkZcIiwgXCJTXCJdLFxuICBzaG9ydDogW1wiU3VcIiwgXCJNb1wiLCBcIlR1XCIsIFwiV2VcIiwgXCJUaFwiLCBcIkZyXCIsIFwiU2FcIl0sXG4gIGFiYnJldmlhdGVkOiBbXCJTdW5cIiwgXCJNb25cIiwgXCJUdWVcIiwgXCJXZWRcIiwgXCJUaHVcIiwgXCJGcmlcIiwgXCJTYXRcIl0sXG4gIHdpZGU6IFtcbiAgICBcIlN1bmRheVwiLFxuICAgIFwiTW9uZGF5XCIsXG4gICAgXCJUdWVzZGF5XCIsXG4gICAgXCJXZWRuZXNkYXlcIixcbiAgICBcIlRodXJzZGF5XCIsXG4gICAgXCJGcmlkYXlcIixcbiAgICBcIlNhdHVyZGF5XCIsXG4gIF0sXG59O1xuXG5jb25zdCBkYXlQZXJpb2RWYWx1ZXMgPSB7XG4gIG5hcnJvdzoge1xuICAgIGFtOiBcImFcIixcbiAgICBwbTogXCJwXCIsXG4gICAgbWlkbmlnaHQ6IFwibWlcIixcbiAgICBub29uOiBcIm5cIixcbiAgICBtb3JuaW5nOiBcIm1vcm5pbmdcIixcbiAgICBhZnRlcm5vb246IFwiYWZ0ZXJub29uXCIsXG4gICAgZXZlbmluZzogXCJldmVuaW5nXCIsXG4gICAgbmlnaHQ6IFwibmlnaHRcIixcbiAgfSxcbiAgYWJicmV2aWF0ZWQ6IHtcbiAgICBhbTogXCJBTVwiLFxuICAgIHBtOiBcIlBNXCIsXG4gICAgbWlkbmlnaHQ6IFwibWlkbmlnaHRcIixcbiAgICBub29uOiBcIm5vb25cIixcbiAgICBtb3JuaW5nOiBcIm1vcm5pbmdcIixcbiAgICBhZnRlcm5vb246IFwiYWZ0ZXJub29uXCIsXG4gICAgZXZlbmluZzogXCJldmVuaW5nXCIsXG4gICAgbmlnaHQ6IFwibmlnaHRcIixcbiAgfSxcbiAgd2lkZToge1xuICAgIGFtOiBcImEubS5cIixcbiAgICBwbTogXCJwLm0uXCIsXG4gICAgbWlkbmlnaHQ6IFwibWlkbmlnaHRcIixcbiAgICBub29uOiBcIm5vb25cIixcbiAgICBtb3JuaW5nOiBcIm1vcm5pbmdcIixcbiAgICBhZnRlcm5vb246IFwiYWZ0ZXJub29uXCIsXG4gICAgZXZlbmluZzogXCJldmVuaW5nXCIsXG4gICAgbmlnaHQ6IFwibmlnaHRcIixcbiAgfSxcbn07XG5cbmNvbnN0IGZvcm1hdHRpbmdEYXlQZXJpb2RWYWx1ZXMgPSB7XG4gIG5hcnJvdzoge1xuICAgIGFtOiBcImFcIixcbiAgICBwbTogXCJwXCIsXG4gICAgbWlkbmlnaHQ6IFwibWlcIixcbiAgICBub29uOiBcIm5cIixcbiAgICBtb3JuaW5nOiBcImluIHRoZSBtb3JuaW5nXCIsXG4gICAgYWZ0ZXJub29uOiBcImluIHRoZSBhZnRlcm5vb25cIixcbiAgICBldmVuaW5nOiBcImluIHRoZSBldmVuaW5nXCIsXG4gICAgbmlnaHQ6IFwiYXQgbmlnaHRcIixcbiAgfSxcbiAgYWJicmV2aWF0ZWQ6IHtcbiAgICBhbTogXCJBTVwiLFxuICAgIHBtOiBcIlBNXCIsXG4gICAgbWlkbmlnaHQ6IFwibWlkbmlnaHRcIixcbiAgICBub29uOiBcIm5vb25cIixcbiAgICBtb3JuaW5nOiBcImluIHRoZSBtb3JuaW5nXCIsXG4gICAgYWZ0ZXJub29uOiBcImluIHRoZSBhZnRlcm5vb25cIixcbiAgICBldmVuaW5nOiBcImluIHRoZSBldmVuaW5nXCIsXG4gICAgbmlnaHQ6IFwiYXQgbmlnaHRcIixcbiAgfSxcbiAgd2lkZToge1xuICAgIGFtOiBcImEubS5cIixcbiAgICBwbTogXCJwLm0uXCIsXG4gICAgbWlkbmlnaHQ6IFwibWlkbmlnaHRcIixcbiAgICBub29uOiBcIm5vb25cIixcbiAgICBtb3JuaW5nOiBcImluIHRoZSBtb3JuaW5nXCIsXG4gICAgYWZ0ZXJub29uOiBcImluIHRoZSBhZnRlcm5vb25cIixcbiAgICBldmVuaW5nOiBcImluIHRoZSBldmVuaW5nXCIsXG4gICAgbmlnaHQ6IFwiYXQgbmlnaHRcIixcbiAgfSxcbn07XG5cbmNvbnN0IG9yZGluYWxOdW1iZXIgPSAoZGlydHlOdW1iZXIsIF9vcHRpb25zKSA9PiB7XG4gIGNvbnN0IG51bWJlciA9IE51bWJlcihkaXJ0eU51bWJlcik7XG5cbiAgLy8gSWYgb3JkaW5hbCBudW1iZXJzIGRlcGVuZCBvbiBjb250ZXh0LCBmb3IgZXhhbXBsZSxcbiAgLy8gaWYgdGhleSBhcmUgZGlmZmVyZW50IGZvciBkaWZmZXJlbnQgZ3JhbW1hdGljYWwgZ2VuZGVycyxcbiAgLy8gdXNlIGBvcHRpb25zLnVuaXRgLlxuICAvL1xuICAvLyBgdW5pdGAgY2FuIGJlICd5ZWFyJywgJ3F1YXJ0ZXInLCAnbW9udGgnLCAnd2VlaycsICdkYXRlJywgJ2RheU9mWWVhcicsXG4gIC8vICdkYXknLCAnaG91cicsICdtaW51dGUnLCAnc2Vjb25kJy5cblxuICBjb25zdCByZW0xMDAgPSBudW1iZXIgJSAxMDA7XG4gIGlmIChyZW0xMDAgPiAyMCB8fCByZW0xMDAgPCAxMCkge1xuICAgIHN3aXRjaCAocmVtMTAwICUgMTApIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgcmV0dXJuIG51bWJlciArIFwic3RcIjtcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgcmV0dXJuIG51bWJlciArIFwibmRcIjtcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgcmV0dXJuIG51bWJlciArIFwicmRcIjtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bWJlciArIFwidGhcIjtcbn07XG5cbmV4cG9ydCBjb25zdCBsb2NhbGl6ZSA9IHtcbiAgb3JkaW5hbE51bWJlcixcblxuICBlcmE6IGJ1aWxkTG9jYWxpemVGbih7XG4gICAgdmFsdWVzOiBlcmFWYWx1ZXMsXG4gICAgZGVmYXVsdFdpZHRoOiBcIndpZGVcIixcbiAgfSksXG5cbiAgcXVhcnRlcjogYnVpbGRMb2NhbGl6ZUZuKHtcbiAgICB2YWx1ZXM6IHF1YXJ0ZXJWYWx1ZXMsXG4gICAgZGVmYXVsdFdpZHRoOiBcIndpZGVcIixcbiAgICBhcmd1bWVudENhbGxiYWNrOiAocXVhcnRlcikgPT4gcXVhcnRlciAtIDEsXG4gIH0pLFxuXG4gIG1vbnRoOiBidWlsZExvY2FsaXplRm4oe1xuICAgIHZhbHVlczogbW9udGhWYWx1ZXMsXG4gICAgZGVmYXVsdFdpZHRoOiBcIndpZGVcIixcbiAgfSksXG5cbiAgZGF5OiBidWlsZExvY2FsaXplRm4oe1xuICAgIHZhbHVlczogZGF5VmFsdWVzLFxuICAgIGRlZmF1bHRXaWR0aDogXCJ3aWRlXCIsXG4gIH0pLFxuXG4gIGRheVBlcmlvZDogYnVpbGRMb2NhbGl6ZUZuKHtcbiAgICB2YWx1ZXM6IGRheVBlcmlvZFZhbHVlcyxcbiAgICBkZWZhdWx0V2lkdGg6IFwid2lkZVwiLFxuICAgIGZvcm1hdHRpbmdWYWx1ZXM6IGZvcm1hdHRpbmdEYXlQZXJpb2RWYWx1ZXMsXG4gICAgZGVmYXVsdEZvcm1hdHRpbmdXaWR0aDogXCJ3aWRlXCIsXG4gIH0pLFxufTtcbiIsImltcG9ydCB7IGJ1aWxkTWF0Y2hGbiB9IGZyb20gXCIuLi8uLi9fbGliL2J1aWxkTWF0Y2hGbi5qc1wiO1xuaW1wb3J0IHsgYnVpbGRNYXRjaFBhdHRlcm5GbiB9IGZyb20gXCIuLi8uLi9fbGliL2J1aWxkTWF0Y2hQYXR0ZXJuRm4uanNcIjtcblxuY29uc3QgbWF0Y2hPcmRpbmFsTnVtYmVyUGF0dGVybiA9IC9eKFxcZCspKHRofHN0fG5kfHJkKT8vaTtcbmNvbnN0IHBhcnNlT3JkaW5hbE51bWJlclBhdHRlcm4gPSAvXFxkKy9pO1xuXG5jb25zdCBtYXRjaEVyYVBhdHRlcm5zID0ge1xuICBuYXJyb3c6IC9eKGJ8YSkvaSxcbiAgYWJicmV2aWF0ZWQ6IC9eKGJcXC4/XFxzP2NcXC4/fGJcXC4/XFxzP2NcXC4/XFxzP2VcXC4/fGFcXC4/XFxzP2RcXC4/fGNcXC4/XFxzP2VcXC4/KS9pLFxuICB3aWRlOiAvXihiZWZvcmUgY2hyaXN0fGJlZm9yZSBjb21tb24gZXJhfGFubm8gZG9taW5pfGNvbW1vbiBlcmEpL2ksXG59O1xuY29uc3QgcGFyc2VFcmFQYXR0ZXJucyA9IHtcbiAgYW55OiBbL15iL2ksIC9eKGF8YykvaV0sXG59O1xuXG5jb25zdCBtYXRjaFF1YXJ0ZXJQYXR0ZXJucyA9IHtcbiAgbmFycm93OiAvXlsxMjM0XS9pLFxuICBhYmJyZXZpYXRlZDogL15xWzEyMzRdL2ksXG4gIHdpZGU6IC9eWzEyMzRdKHRofHN0fG5kfHJkKT8gcXVhcnRlci9pLFxufTtcbmNvbnN0IHBhcnNlUXVhcnRlclBhdHRlcm5zID0ge1xuICBhbnk6IFsvMS9pLCAvMi9pLCAvMy9pLCAvNC9pXSxcbn07XG5cbmNvbnN0IG1hdGNoTW9udGhQYXR0ZXJucyA9IHtcbiAgbmFycm93OiAvXltqZm1hc29uZF0vaSxcbiAgYWJicmV2aWF0ZWQ6IC9eKGphbnxmZWJ8bWFyfGFwcnxtYXl8anVufGp1bHxhdWd8c2VwfG9jdHxub3Z8ZGVjKS9pLFxuICB3aWRlOiAvXihqYW51YXJ5fGZlYnJ1YXJ5fG1hcmNofGFwcmlsfG1heXxqdW5lfGp1bHl8YXVndXN0fHNlcHRlbWJlcnxvY3RvYmVyfG5vdmVtYmVyfGRlY2VtYmVyKS9pLFxufTtcbmNvbnN0IHBhcnNlTW9udGhQYXR0ZXJucyA9IHtcbiAgbmFycm93OiBbXG4gICAgL15qL2ksXG4gICAgL15mL2ksXG4gICAgL15tL2ksXG4gICAgL15hL2ksXG4gICAgL15tL2ksXG4gICAgL15qL2ksXG4gICAgL15qL2ksXG4gICAgL15hL2ksXG4gICAgL15zL2ksXG4gICAgL15vL2ksXG4gICAgL15uL2ksXG4gICAgL15kL2ksXG4gIF0sXG5cbiAgYW55OiBbXG4gICAgL15qYS9pLFxuICAgIC9eZi9pLFxuICAgIC9ebWFyL2ksXG4gICAgL15hcC9pLFxuICAgIC9ebWF5L2ksXG4gICAgL15qdW4vaSxcbiAgICAvXmp1bC9pLFxuICAgIC9eYXUvaSxcbiAgICAvXnMvaSxcbiAgICAvXm8vaSxcbiAgICAvXm4vaSxcbiAgICAvXmQvaSxcbiAgXSxcbn07XG5cbmNvbnN0IG1hdGNoRGF5UGF0dGVybnMgPSB7XG4gIG5hcnJvdzogL15bc210d2ZdL2ksXG4gIHNob3J0OiAvXihzdXxtb3x0dXx3ZXx0aHxmcnxzYSkvaSxcbiAgYWJicmV2aWF0ZWQ6IC9eKHN1bnxtb258dHVlfHdlZHx0aHV8ZnJpfHNhdCkvaSxcbiAgd2lkZTogL14oc3VuZGF5fG1vbmRheXx0dWVzZGF5fHdlZG5lc2RheXx0aHVyc2RheXxmcmlkYXl8c2F0dXJkYXkpL2ksXG59O1xuY29uc3QgcGFyc2VEYXlQYXR0ZXJucyA9IHtcbiAgbmFycm93OiBbL15zL2ksIC9ebS9pLCAvXnQvaSwgL153L2ksIC9edC9pLCAvXmYvaSwgL15zL2ldLFxuICBhbnk6IFsvXnN1L2ksIC9ebS9pLCAvXnR1L2ksIC9edy9pLCAvXnRoL2ksIC9eZi9pLCAvXnNhL2ldLFxufTtcblxuY29uc3QgbWF0Y2hEYXlQZXJpb2RQYXR0ZXJucyA9IHtcbiAgbmFycm93OiAvXihhfHB8bWl8bnwoaW4gdGhlfGF0KSAobW9ybmluZ3xhZnRlcm5vb258ZXZlbmluZ3xuaWdodCkpL2ksXG4gIGFueTogL14oW2FwXVxcLj9cXHM/bVxcLj98bWlkbmlnaHR8bm9vbnwoaW4gdGhlfGF0KSAobW9ybmluZ3xhZnRlcm5vb258ZXZlbmluZ3xuaWdodCkpL2ksXG59O1xuY29uc3QgcGFyc2VEYXlQZXJpb2RQYXR0ZXJucyA9IHtcbiAgYW55OiB7XG4gICAgYW06IC9eYS9pLFxuICAgIHBtOiAvXnAvaSxcbiAgICBtaWRuaWdodDogL15taS9pLFxuICAgIG5vb246IC9ebm8vaSxcbiAgICBtb3JuaW5nOiAvbW9ybmluZy9pLFxuICAgIGFmdGVybm9vbjogL2FmdGVybm9vbi9pLFxuICAgIGV2ZW5pbmc6IC9ldmVuaW5nL2ksXG4gICAgbmlnaHQ6IC9uaWdodC9pLFxuICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IG1hdGNoID0ge1xuICBvcmRpbmFsTnVtYmVyOiBidWlsZE1hdGNoUGF0dGVybkZuKHtcbiAgICBtYXRjaFBhdHRlcm46IG1hdGNoT3JkaW5hbE51bWJlclBhdHRlcm4sXG4gICAgcGFyc2VQYXR0ZXJuOiBwYXJzZU9yZGluYWxOdW1iZXJQYXR0ZXJuLFxuICAgIHZhbHVlQ2FsbGJhY2s6ICh2YWx1ZSkgPT4gcGFyc2VJbnQodmFsdWUsIDEwKSxcbiAgfSksXG5cbiAgZXJhOiBidWlsZE1hdGNoRm4oe1xuICAgIG1hdGNoUGF0dGVybnM6IG1hdGNoRXJhUGF0dGVybnMsXG4gICAgZGVmYXVsdE1hdGNoV2lkdGg6IFwid2lkZVwiLFxuICAgIHBhcnNlUGF0dGVybnM6IHBhcnNlRXJhUGF0dGVybnMsXG4gICAgZGVmYXVsdFBhcnNlV2lkdGg6IFwiYW55XCIsXG4gIH0pLFxuXG4gIHF1YXJ0ZXI6IGJ1aWxkTWF0Y2hGbih7XG4gICAgbWF0Y2hQYXR0ZXJuczogbWF0Y2hRdWFydGVyUGF0dGVybnMsXG4gICAgZGVmYXVsdE1hdGNoV2lkdGg6IFwid2lkZVwiLFxuICAgIHBhcnNlUGF0dGVybnM6IHBhcnNlUXVhcnRlclBhdHRlcm5zLFxuICAgIGRlZmF1bHRQYXJzZVdpZHRoOiBcImFueVwiLFxuICAgIHZhbHVlQ2FsbGJhY2s6IChpbmRleCkgPT4gaW5kZXggKyAxLFxuICB9KSxcblxuICBtb250aDogYnVpbGRNYXRjaEZuKHtcbiAgICBtYXRjaFBhdHRlcm5zOiBtYXRjaE1vbnRoUGF0dGVybnMsXG4gICAgZGVmYXVsdE1hdGNoV2lkdGg6IFwid2lkZVwiLFxuICAgIHBhcnNlUGF0dGVybnM6IHBhcnNlTW9udGhQYXR0ZXJucyxcbiAgICBkZWZhdWx0UGFyc2VXaWR0aDogXCJhbnlcIixcbiAgfSksXG5cbiAgZGF5OiBidWlsZE1hdGNoRm4oe1xuICAgIG1hdGNoUGF0dGVybnM6IG1hdGNoRGF5UGF0dGVybnMsXG4gICAgZGVmYXVsdE1hdGNoV2lkdGg6IFwid2lkZVwiLFxuICAgIHBhcnNlUGF0dGVybnM6IHBhcnNlRGF5UGF0dGVybnMsXG4gICAgZGVmYXVsdFBhcnNlV2lkdGg6IFwiYW55XCIsXG4gIH0pLFxuXG4gIGRheVBlcmlvZDogYnVpbGRNYXRjaEZuKHtcbiAgICBtYXRjaFBhdHRlcm5zOiBtYXRjaERheVBlcmlvZFBhdHRlcm5zLFxuICAgIGRlZmF1bHRNYXRjaFdpZHRoOiBcImFueVwiLFxuICAgIHBhcnNlUGF0dGVybnM6IHBhcnNlRGF5UGVyaW9kUGF0dGVybnMsXG4gICAgZGVmYXVsdFBhcnNlV2lkdGg6IFwiYW55XCIsXG4gIH0pLFxufTtcbiIsImltcG9ydCB7IGZvcm1hdERpc3RhbmNlIH0gZnJvbSBcIi4vcnUvX2xpYi9mb3JtYXREaXN0YW5jZS5qc1wiO1xuaW1wb3J0IHsgZm9ybWF0TG9uZyB9IGZyb20gXCIuL3J1L19saWIvZm9ybWF0TG9uZy5qc1wiO1xuaW1wb3J0IHsgZm9ybWF0UmVsYXRpdmUgfSBmcm9tIFwiLi9ydS9fbGliL2Zvcm1hdFJlbGF0aXZlLmpzXCI7XG5pbXBvcnQgeyBsb2NhbGl6ZSB9IGZyb20gXCIuL3J1L19saWIvbG9jYWxpemUuanNcIjtcbmltcG9ydCB7IG1hdGNoIH0gZnJvbSBcIi4vcnUvX2xpYi9tYXRjaC5qc1wiO1xuXG4vKipcbiAqIEBjYXRlZ29yeSBMb2NhbGVzXG4gKiBAc3VtbWFyeSBSdXNzaWFuIGxvY2FsZS5cbiAqIEBsYW5ndWFnZSBSdXNzaWFuXG4gKiBAaXNvLTYzOS0yIHJ1c1xuICogQGF1dGhvciBTYXNoYSBLb3NzIFtAa29zc25vY29ycF0oaHR0cHM6Ly9naXRodWIuY29tL2tvc3Nub2NvcnApXG4gKiBAYXV0aG9yIExlc2hhIEtvc3MgW0BsZXNoYWtvc3NdKGh0dHBzOi8vZ2l0aHViLmNvbS9sZXNoYWtvc3MpXG4gKi9cbmV4cG9ydCBjb25zdCBydSA9IHtcbiAgY29kZTogXCJydVwiLFxuICBmb3JtYXREaXN0YW5jZTogZm9ybWF0RGlzdGFuY2UsXG4gIGZvcm1hdExvbmc6IGZvcm1hdExvbmcsXG4gIGZvcm1hdFJlbGF0aXZlOiBmb3JtYXRSZWxhdGl2ZSxcbiAgbG9jYWxpemU6IGxvY2FsaXplLFxuICBtYXRjaDogbWF0Y2gsXG4gIG9wdGlvbnM6IHtcbiAgICB3ZWVrU3RhcnRzT246IDEgLyogTW9uZGF5ICovLFxuICAgIGZpcnN0V2Vla0NvbnRhaW5zRGF0ZTogMSxcbiAgfSxcbn07XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgcnU7XG4iLCJmdW5jdGlvbiBkZWNsZW5zaW9uKHNjaGVtZSwgY291bnQpIHtcbiAgLy8gc2NoZW1lIGZvciBjb3VudD0xIGV4aXN0c1xuICBpZiAoc2NoZW1lLm9uZSAhPT0gdW5kZWZpbmVkICYmIGNvdW50ID09PSAxKSB7XG4gICAgcmV0dXJuIHNjaGVtZS5vbmU7XG4gIH1cblxuICBjb25zdCByZW0xMCA9IGNvdW50ICUgMTA7XG4gIGNvbnN0IHJlbTEwMCA9IGNvdW50ICUgMTAwO1xuXG4gIC8vIDEsIDIxLCAzMSwgLi4uXG4gIGlmIChyZW0xMCA9PT0gMSAmJiByZW0xMDAgIT09IDExKSB7XG4gICAgcmV0dXJuIHNjaGVtZS5zaW5ndWxhck5vbWluYXRpdmUucmVwbGFjZShcInt7Y291bnR9fVwiLCBTdHJpbmcoY291bnQpKTtcblxuICAgIC8vIDIsIDMsIDQsIDIyLCAyMywgMjQsIDMyIC4uLlxuICB9IGVsc2UgaWYgKHJlbTEwID49IDIgJiYgcmVtMTAgPD0gNCAmJiAocmVtMTAwIDwgMTAgfHwgcmVtMTAwID4gMjApKSB7XG4gICAgcmV0dXJuIHNjaGVtZS5zaW5ndWxhckdlbml0aXZlLnJlcGxhY2UoXCJ7e2NvdW50fX1cIiwgU3RyaW5nKGNvdW50KSk7XG5cbiAgICAvLyA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIC4uLlxuICB9IGVsc2Uge1xuICAgIHJldHVybiBzY2hlbWUucGx1cmFsR2VuaXRpdmUucmVwbGFjZShcInt7Y291bnR9fVwiLCBTdHJpbmcoY291bnQpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBidWlsZExvY2FsaXplVG9rZW5GbihzY2hlbWUpIHtcbiAgcmV0dXJuIChjb3VudCwgb3B0aW9ucykgPT4ge1xuICAgIGlmIChvcHRpb25zPy5hZGRTdWZmaXgpIHtcbiAgICAgIGlmIChvcHRpb25zLmNvbXBhcmlzb24gJiYgb3B0aW9ucy5jb21wYXJpc29uID4gMCkge1xuICAgICAgICBpZiAoc2NoZW1lLmZ1dHVyZSkge1xuICAgICAgICAgIHJldHVybiBkZWNsZW5zaW9uKHNjaGVtZS5mdXR1cmUsIGNvdW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gXCLRh9C10YDQtdC3IFwiICsgZGVjbGVuc2lvbihzY2hlbWUucmVndWxhciwgY291bnQpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoc2NoZW1lLnBhc3QpIHtcbiAgICAgICAgICByZXR1cm4gZGVjbGVuc2lvbihzY2hlbWUucGFzdCwgY291bnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBkZWNsZW5zaW9uKHNjaGVtZS5yZWd1bGFyLCBjb3VudCkgKyBcIiDQvdCw0LfQsNC0XCI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGRlY2xlbnNpb24oc2NoZW1lLnJlZ3VsYXIsIGNvdW50KTtcbiAgICB9XG4gIH07XG59XG5cbmNvbnN0IGZvcm1hdERpc3RhbmNlTG9jYWxlID0ge1xuICBsZXNzVGhhblhTZWNvbmRzOiBidWlsZExvY2FsaXplVG9rZW5Gbih7XG4gICAgcmVndWxhcjoge1xuICAgICAgb25lOiBcItC80LXQvdGM0YjQtSDRgdC10LrRg9C90LTRi1wiLFxuICAgICAgc2luZ3VsYXJOb21pbmF0aXZlOiBcItC80LXQvdGM0YjQtSB7e2NvdW50fX0g0YHQtdC60YPQvdC00YtcIixcbiAgICAgIHNpbmd1bGFyR2VuaXRpdmU6IFwi0LzQtdC90YzRiNC1IHt7Y291bnR9fSDRgdC10LrRg9C90LRcIixcbiAgICAgIHBsdXJhbEdlbml0aXZlOiBcItC80LXQvdGM0YjQtSB7e2NvdW50fX0g0YHQtdC60YPQvdC0XCIsXG4gICAgfSxcbiAgICBmdXR1cmU6IHtcbiAgICAgIG9uZTogXCLQvNC10L3RjNGI0LUsINGH0LXQvCDRh9C10YDQtdC3INGB0LXQutGD0L3QtNGDXCIsXG4gICAgICBzaW5ndWxhck5vbWluYXRpdmU6IFwi0LzQtdC90YzRiNC1LCDRh9C10Lwg0YfQtdGA0LXQtyB7e2NvdW50fX0g0YHQtdC60YPQvdC00YNcIixcbiAgICAgIHNpbmd1bGFyR2VuaXRpdmU6IFwi0LzQtdC90YzRiNC1LCDRh9C10Lwg0YfQtdGA0LXQtyB7e2NvdW50fX0g0YHQtdC60YPQvdC00YtcIixcbiAgICAgIHBsdXJhbEdlbml0aXZlOiBcItC80LXQvdGM0YjQtSwg0YfQtdC8INGH0LXRgNC10Lcge3tjb3VudH19INGB0LXQutGD0L3QtFwiLFxuICAgIH0sXG4gIH0pLFxuXG4gIHhTZWNvbmRzOiBidWlsZExvY2FsaXplVG9rZW5Gbih7XG4gICAgcmVndWxhcjoge1xuICAgICAgc2luZ3VsYXJOb21pbmF0aXZlOiBcInt7Y291bnR9fSDRgdC10LrRg9C90LTQsFwiLFxuICAgICAgc2luZ3VsYXJHZW5pdGl2ZTogXCJ7e2NvdW50fX0g0YHQtdC60YPQvdC00YtcIixcbiAgICAgIHBsdXJhbEdlbml0aXZlOiBcInt7Y291bnR9fSDRgdC10LrRg9C90LRcIixcbiAgICB9LFxuICAgIHBhc3Q6IHtcbiAgICAgIHNpbmd1bGFyTm9taW5hdGl2ZTogXCJ7e2NvdW50fX0g0YHQtdC60YPQvdC00YMg0L3QsNC30LDQtFwiLFxuICAgICAgc2luZ3VsYXJHZW5pdGl2ZTogXCJ7e2NvdW50fX0g0YHQtdC60YPQvdC00Ysg0L3QsNC30LDQtFwiLFxuICAgICAgcGx1cmFsR2VuaXRpdmU6IFwie3tjb3VudH19INGB0LXQutGD0L3QtCDQvdCw0LfQsNC0XCIsXG4gICAgfSxcbiAgICBmdXR1cmU6IHtcbiAgICAgIHNpbmd1bGFyTm9taW5hdGl2ZTogXCLRh9C10YDQtdC3IHt7Y291bnR9fSDRgdC10LrRg9C90LTRg1wiLFxuICAgICAgc2luZ3VsYXJHZW5pdGl2ZTogXCLRh9C10YDQtdC3IHt7Y291bnR9fSDRgdC10LrRg9C90LTRi1wiLFxuICAgICAgcGx1cmFsR2VuaXRpdmU6IFwi0YfQtdGA0LXQtyB7e2NvdW50fX0g0YHQtdC60YPQvdC0XCIsXG4gICAgfSxcbiAgfSksXG5cbiAgaGFsZkFNaW51dGU6IChfY291bnQsIG9wdGlvbnMpID0+IHtcbiAgICBpZiAob3B0aW9ucz8uYWRkU3VmZml4KSB7XG4gICAgICBpZiAob3B0aW9ucy5jb21wYXJpc29uICYmIG9wdGlvbnMuY29tcGFyaXNvbiA+IDApIHtcbiAgICAgICAgcmV0dXJuIFwi0YfQtdGA0LXQtyDQv9C+0LvQvNC40L3Rg9GC0YtcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBcItC/0L7Qu9C80LjQvdGD0YLRiyDQvdCw0LfQsNC0XCI7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFwi0L/QvtC70LzQuNC90YPRgtGLXCI7XG4gIH0sXG5cbiAgbGVzc1RoYW5YTWludXRlczogYnVpbGRMb2NhbGl6ZVRva2VuRm4oe1xuICAgIHJlZ3VsYXI6IHtcbiAgICAgIG9uZTogXCLQvNC10L3RjNGI0LUg0LzQuNC90YPRgtGLXCIsXG4gICAgICBzaW5ndWxhck5vbWluYXRpdmU6IFwi0LzQtdC90YzRiNC1IHt7Y291bnR9fSDQvNC40L3Rg9GC0YtcIixcbiAgICAgIHNpbmd1bGFyR2VuaXRpdmU6IFwi0LzQtdC90YzRiNC1IHt7Y291bnR9fSDQvNC40L3Rg9GCXCIsXG4gICAgICBwbHVyYWxHZW5pdGl2ZTogXCLQvNC10L3RjNGI0LUge3tjb3VudH19INC80LjQvdGD0YJcIixcbiAgICB9LFxuICAgIGZ1dHVyZToge1xuICAgICAgb25lOiBcItC80LXQvdGM0YjQtSwg0YfQtdC8INGH0LXRgNC10Lcg0LzQuNC90YPRgtGDXCIsXG4gICAgICBzaW5ndWxhck5vbWluYXRpdmU6IFwi0LzQtdC90YzRiNC1LCDRh9C10Lwg0YfQtdGA0LXQtyB7e2NvdW50fX0g0LzQuNC90YPRgtGDXCIsXG4gICAgICBzaW5ndWxhckdlbml0aXZlOiBcItC80LXQvdGM0YjQtSwg0YfQtdC8INGH0LXRgNC10Lcge3tjb3VudH19INC80LjQvdGD0YLRi1wiLFxuICAgICAgcGx1cmFsR2VuaXRpdmU6IFwi0LzQtdC90YzRiNC1LCDRh9C10Lwg0YfQtdGA0LXQtyB7e2NvdW50fX0g0LzQuNC90YPRglwiLFxuICAgIH0sXG4gIH0pLFxuXG4gIHhNaW51dGVzOiBidWlsZExvY2FsaXplVG9rZW5Gbih7XG4gICAgcmVndWxhcjoge1xuICAgICAgc2luZ3VsYXJOb21pbmF0aXZlOiBcInt7Y291bnR9fSDQvNC40L3Rg9GC0LBcIixcbiAgICAgIHNpbmd1bGFyR2VuaXRpdmU6IFwie3tjb3VudH19INC80LjQvdGD0YLRi1wiLFxuICAgICAgcGx1cmFsR2VuaXRpdmU6IFwie3tjb3VudH19INC80LjQvdGD0YJcIixcbiAgICB9LFxuICAgIHBhc3Q6IHtcbiAgICAgIHNpbmd1bGFyTm9taW5hdGl2ZTogXCJ7e2NvdW50fX0g0LzQuNC90YPRgtGDINC90LDQt9Cw0LRcIixcbiAgICAgIHNpbmd1bGFyR2VuaXRpdmU6IFwie3tjb3VudH19INC80LjQvdGD0YLRiyDQvdCw0LfQsNC0XCIsXG4gICAgICBwbHVyYWxHZW5pdGl2ZTogXCJ7e2NvdW50fX0g0LzQuNC90YPRgiDQvdCw0LfQsNC0XCIsXG4gICAgfSxcbiAgICBmdXR1cmU6IHtcbiAgICAgIHNpbmd1bGFyTm9taW5hdGl2ZTogXCLRh9C10YDQtdC3IHt7Y291bnR9fSDQvNC40L3Rg9GC0YNcIixcbiAgICAgIHNpbmd1bGFyR2VuaXRpdmU6IFwi0YfQtdGA0LXQtyB7e2NvdW50fX0g0LzQuNC90YPRgtGLXCIsXG4gICAgICBwbHVyYWxHZW5pdGl2ZTogXCLRh9C10YDQtdC3IHt7Y291bnR9fSDQvNC40L3Rg9GCXCIsXG4gICAgfSxcbiAgfSksXG5cbiAgYWJvdXRYSG91cnM6IGJ1aWxkTG9jYWxpemVUb2tlbkZuKHtcbiAgICByZWd1bGFyOiB7XG4gICAgICBzaW5ndWxhck5vbWluYXRpdmU6IFwi0L7QutC+0LvQviB7e2NvdW50fX0g0YfQsNGB0LBcIixcbiAgICAgIHNpbmd1bGFyR2VuaXRpdmU6IFwi0L7QutC+0LvQviB7e2NvdW50fX0g0YfQsNGB0L7QslwiLFxuICAgICAgcGx1cmFsR2VuaXRpdmU6IFwi0L7QutC+0LvQviB7e2NvdW50fX0g0YfQsNGB0L7QslwiLFxuICAgIH0sXG4gICAgZnV0dXJlOiB7XG4gICAgICBzaW5ndWxhck5vbWluYXRpdmU6IFwi0L/RgNC40LHQu9C40LfQuNGC0LXQu9GM0L3QviDRh9C10YDQtdC3IHt7Y291bnR9fSDRh9Cw0YFcIixcbiAgICAgIHNpbmd1bGFyR2VuaXRpdmU6IFwi0L/RgNC40LHQu9C40LfQuNGC0LXQu9GM0L3QviDRh9C10YDQtdC3IHt7Y291bnR9fSDRh9Cw0YHQsFwiLFxuICAgICAgcGx1cmFsR2VuaXRpdmU6IFwi0L/RgNC40LHQu9C40LfQuNGC0LXQu9GM0L3QviDRh9C10YDQtdC3IHt7Y291bnR9fSDRh9Cw0YHQvtCyXCIsXG4gICAgfSxcbiAgfSksXG5cbiAgeEhvdXJzOiBidWlsZExvY2FsaXplVG9rZW5Gbih7XG4gICAgcmVndWxhcjoge1xuICAgICAgc2luZ3VsYXJOb21pbmF0aXZlOiBcInt7Y291bnR9fSDRh9Cw0YFcIixcbiAgICAgIHNpbmd1bGFyR2VuaXRpdmU6IFwie3tjb3VudH19INGH0LDRgdCwXCIsXG4gICAgICBwbHVyYWxHZW5pdGl2ZTogXCJ7e2NvdW50fX0g0YfQsNGB0L7QslwiLFxuICAgIH0sXG4gIH0pLFxuXG4gIHhEYXlzOiBidWlsZExvY2FsaXplVG9rZW5Gbih7XG4gICAgcmVndWxhcjoge1xuICAgICAgc2luZ3VsYXJOb21pbmF0aXZlOiBcInt7Y291bnR9fSDQtNC10L3RjFwiLFxuICAgICAgc2luZ3VsYXJHZW5pdGl2ZTogXCJ7e2NvdW50fX0g0LTQvdGPXCIsXG4gICAgICBwbHVyYWxHZW5pdGl2ZTogXCJ7e2NvdW50fX0g0LTQvdC10LlcIixcbiAgICB9LFxuICB9KSxcblxuICBhYm91dFhXZWVrczogYnVpbGRMb2NhbGl6ZVRva2VuRm4oe1xuICAgIHJlZ3VsYXI6IHtcbiAgICAgIHNpbmd1bGFyTm9taW5hdGl2ZTogXCLQvtC60L7Qu9C+IHt7Y291bnR9fSDQvdC10LTQtdC70LhcIixcbiAgICAgIHNpbmd1bGFyR2VuaXRpdmU6IFwi0L7QutC+0LvQviB7e2NvdW50fX0g0L3QtdC00LXQu9GMXCIsXG4gICAgICBwbHVyYWxHZW5pdGl2ZTogXCLQvtC60L7Qu9C+IHt7Y291bnR9fSDQvdC10LTQtdC70YxcIixcbiAgICB9LFxuICAgIGZ1dHVyZToge1xuICAgICAgc2luZ3VsYXJOb21pbmF0aXZlOiBcItC/0YDQuNCx0LvQuNC30LjRgtC10LvRjNC90L4g0YfQtdGA0LXQtyB7e2NvdW50fX0g0L3QtdC00LXQu9GOXCIsXG4gICAgICBzaW5ndWxhckdlbml0aXZlOiBcItC/0YDQuNCx0LvQuNC30LjRgtC10LvRjNC90L4g0YfQtdGA0LXQtyB7e2NvdW50fX0g0L3QtdC00LXQu9C4XCIsXG4gICAgICBwbHVyYWxHZW5pdGl2ZTogXCLQv9GA0LjQsdC70LjQt9C40YLQtdC70YzQvdC+INGH0LXRgNC10Lcge3tjb3VudH19INC90LXQtNC10LvRjFwiLFxuICAgIH0sXG4gIH0pLFxuXG4gIHhXZWVrczogYnVpbGRMb2NhbGl6ZVRva2VuRm4oe1xuICAgIHJlZ3VsYXI6IHtcbiAgICAgIHNpbmd1bGFyTm9taW5hdGl2ZTogXCJ7e2NvdW50fX0g0L3QtdC00LXQu9GPXCIsXG4gICAgICBzaW5ndWxhckdlbml0aXZlOiBcInt7Y291bnR9fSDQvdC10LTQtdC70LhcIixcbiAgICAgIHBsdXJhbEdlbml0aXZlOiBcInt7Y291bnR9fSDQvdC10LTQtdC70YxcIixcbiAgICB9LFxuICB9KSxcblxuICBhYm91dFhNb250aHM6IGJ1aWxkTG9jYWxpemVUb2tlbkZuKHtcbiAgICByZWd1bGFyOiB7XG4gICAgICBzaW5ndWxhck5vbWluYXRpdmU6IFwi0L7QutC+0LvQviB7e2NvdW50fX0g0LzQtdGB0Y/RhtCwXCIsXG4gICAgICBzaW5ndWxhckdlbml0aXZlOiBcItC+0LrQvtC70L4ge3tjb3VudH19INC80LXRgdGP0YbQtdCyXCIsXG4gICAgICBwbHVyYWxHZW5pdGl2ZTogXCLQvtC60L7Qu9C+IHt7Y291bnR9fSDQvNC10YHRj9GG0LXQslwiLFxuICAgIH0sXG4gICAgZnV0dXJlOiB7XG4gICAgICBzaW5ndWxhck5vbWluYXRpdmU6IFwi0L/RgNC40LHQu9C40LfQuNGC0LXQu9GM0L3QviDRh9C10YDQtdC3IHt7Y291bnR9fSDQvNC10YHRj9GGXCIsXG4gICAgICBzaW5ndWxhckdlbml0aXZlOiBcItC/0YDQuNCx0LvQuNC30LjRgtC10LvRjNC90L4g0YfQtdGA0LXQtyB7e2NvdW50fX0g0LzQtdGB0Y/RhtCwXCIsXG4gICAgICBwbHVyYWxHZW5pdGl2ZTogXCLQv9GA0LjQsdC70LjQt9C40YLQtdC70YzQvdC+INGH0LXRgNC10Lcge3tjb3VudH19INC80LXRgdGP0YbQtdCyXCIsXG4gICAgfSxcbiAgfSksXG5cbiAgeE1vbnRoczogYnVpbGRMb2NhbGl6ZVRva2VuRm4oe1xuICAgIHJlZ3VsYXI6IHtcbiAgICAgIHNpbmd1bGFyTm9taW5hdGl2ZTogXCJ7e2NvdW50fX0g0LzQtdGB0Y/RhlwiLFxuICAgICAgc2luZ3VsYXJHZW5pdGl2ZTogXCJ7e2NvdW50fX0g0LzQtdGB0Y/RhtCwXCIsXG4gICAgICBwbHVyYWxHZW5pdGl2ZTogXCJ7e2NvdW50fX0g0LzQtdGB0Y/RhtC10LJcIixcbiAgICB9LFxuICB9KSxcblxuICBhYm91dFhZZWFyczogYnVpbGRMb2NhbGl6ZVRva2VuRm4oe1xuICAgIHJlZ3VsYXI6IHtcbiAgICAgIHNpbmd1bGFyTm9taW5hdGl2ZTogXCLQvtC60L7Qu9C+IHt7Y291bnR9fSDQs9C+0LTQsFwiLFxuICAgICAgc2luZ3VsYXJHZW5pdGl2ZTogXCLQvtC60L7Qu9C+IHt7Y291bnR9fSDQu9C10YJcIixcbiAgICAgIHBsdXJhbEdlbml0aXZlOiBcItC+0LrQvtC70L4ge3tjb3VudH19INC70LXRglwiLFxuICAgIH0sXG4gICAgZnV0dXJlOiB7XG4gICAgICBzaW5ndWxhck5vbWluYXRpdmU6IFwi0L/RgNC40LHQu9C40LfQuNGC0LXQu9GM0L3QviDRh9C10YDQtdC3IHt7Y291bnR9fSDQs9C+0LRcIixcbiAgICAgIHNpbmd1bGFyR2VuaXRpdmU6IFwi0L/RgNC40LHQu9C40LfQuNGC0LXQu9GM0L3QviDRh9C10YDQtdC3IHt7Y291bnR9fSDQs9C+0LTQsFwiLFxuICAgICAgcGx1cmFsR2VuaXRpdmU6IFwi0L/RgNC40LHQu9C40LfQuNGC0LXQu9GM0L3QviDRh9C10YDQtdC3IHt7Y291bnR9fSDQu9C10YJcIixcbiAgICB9LFxuICB9KSxcblxuICB4WWVhcnM6IGJ1aWxkTG9jYWxpemVUb2tlbkZuKHtcbiAgICByZWd1bGFyOiB7XG4gICAgICBzaW5ndWxhck5vbWluYXRpdmU6IFwie3tjb3VudH19INCz0L7QtFwiLFxuICAgICAgc2luZ3VsYXJHZW5pdGl2ZTogXCJ7e2NvdW50fX0g0LPQvtC00LBcIixcbiAgICAgIHBsdXJhbEdlbml0aXZlOiBcInt7Y291bnR9fSDQu9C10YJcIixcbiAgICB9LFxuICB9KSxcblxuICBvdmVyWFllYXJzOiBidWlsZExvY2FsaXplVG9rZW5Gbih7XG4gICAgcmVndWxhcjoge1xuICAgICAgc2luZ3VsYXJOb21pbmF0aXZlOiBcItCx0L7Qu9GM0YjQtSB7e2NvdW50fX0g0LPQvtC00LBcIixcbiAgICAgIHNpbmd1bGFyR2VuaXRpdmU6IFwi0LHQvtC70YzRiNC1IHt7Y291bnR9fSDQu9C10YJcIixcbiAgICAgIHBsdXJhbEdlbml0aXZlOiBcItCx0L7Qu9GM0YjQtSB7e2NvdW50fX0g0LvQtdGCXCIsXG4gICAgfSxcbiAgICBmdXR1cmU6IHtcbiAgICAgIHNpbmd1bGFyTm9taW5hdGl2ZTogXCLQsdC+0LvRjNGI0LUsINGH0LXQvCDRh9C10YDQtdC3IHt7Y291bnR9fSDQs9C+0LRcIixcbiAgICAgIHNpbmd1bGFyR2VuaXRpdmU6IFwi0LHQvtC70YzRiNC1LCDRh9C10Lwg0YfQtdGA0LXQtyB7e2NvdW50fX0g0LPQvtC00LBcIixcbiAgICAgIHBsdXJhbEdlbml0aXZlOiBcItCx0L7Qu9GM0YjQtSwg0YfQtdC8INGH0LXRgNC10Lcge3tjb3VudH19INC70LXRglwiLFxuICAgIH0sXG4gIH0pLFxuXG4gIGFsbW9zdFhZZWFyczogYnVpbGRMb2NhbGl6ZVRva2VuRm4oe1xuICAgIHJlZ3VsYXI6IHtcbiAgICAgIHNpbmd1bGFyTm9taW5hdGl2ZTogXCLQv9C+0YfRgtC4IHt7Y291bnR9fSDQs9C+0LRcIixcbiAgICAgIHNpbmd1bGFyR2VuaXRpdmU6IFwi0L/QvtGH0YLQuCB7e2NvdW50fX0g0LPQvtC00LBcIixcbiAgICAgIHBsdXJhbEdlbml0aXZlOiBcItC/0L7Rh9GC0Lgge3tjb3VudH19INC70LXRglwiLFxuICAgIH0sXG4gICAgZnV0dXJlOiB7XG4gICAgICBzaW5ndWxhck5vbWluYXRpdmU6IFwi0L/QvtGH0YLQuCDRh9C10YDQtdC3IHt7Y291bnR9fSDQs9C+0LRcIixcbiAgICAgIHNpbmd1bGFyR2VuaXRpdmU6IFwi0L/QvtGH0YLQuCDRh9C10YDQtdC3IHt7Y291bnR9fSDQs9C+0LTQsFwiLFxuICAgICAgcGx1cmFsR2VuaXRpdmU6IFwi0L/QvtGH0YLQuCDRh9C10YDQtdC3IHt7Y291bnR9fSDQu9C10YJcIixcbiAgICB9LFxuICB9KSxcbn07XG5cbmV4cG9ydCBjb25zdCBmb3JtYXREaXN0YW5jZSA9ICh0b2tlbiwgY291bnQsIG9wdGlvbnMpID0+IHtcbiAgcmV0dXJuIGZvcm1hdERpc3RhbmNlTG9jYWxlW3Rva2VuXShjb3VudCwgb3B0aW9ucyk7XG59O1xuIiwiaW1wb3J0IHsgYnVpbGRGb3JtYXRMb25nRm4gfSBmcm9tIFwiLi4vLi4vX2xpYi9idWlsZEZvcm1hdExvbmdGbi5qc1wiO1xuXG5jb25zdCBkYXRlRm9ybWF0cyA9IHtcbiAgZnVsbDogXCJFRUVFLCBkIE1NTU0geSAn0LMuJ1wiLFxuICBsb25nOiBcImQgTU1NTSB5ICfQsy4nXCIsXG4gIG1lZGl1bTogXCJkIE1NTSB5ICfQsy4nXCIsXG4gIHNob3J0OiBcImRkLk1NLnlcIixcbn07XG5cbmNvbnN0IHRpbWVGb3JtYXRzID0ge1xuICBmdWxsOiBcIkg6bW06c3Mgenp6elwiLFxuICBsb25nOiBcIkg6bW06c3MgelwiLFxuICBtZWRpdW06IFwiSDptbTpzc1wiLFxuICBzaG9ydDogXCJIOm1tXCIsXG59O1xuXG5jb25zdCBkYXRlVGltZUZvcm1hdHMgPSB7XG4gIGFueTogXCJ7e2RhdGV9fSwge3t0aW1lfX1cIixcbn07XG5cbmV4cG9ydCBjb25zdCBmb3JtYXRMb25nID0ge1xuICBkYXRlOiBidWlsZEZvcm1hdExvbmdGbih7XG4gICAgZm9ybWF0czogZGF0ZUZvcm1hdHMsXG4gICAgZGVmYXVsdFdpZHRoOiBcImZ1bGxcIixcbiAgfSksXG5cbiAgdGltZTogYnVpbGRGb3JtYXRMb25nRm4oe1xuICAgIGZvcm1hdHM6IHRpbWVGb3JtYXRzLFxuICAgIGRlZmF1bHRXaWR0aDogXCJmdWxsXCIsXG4gIH0pLFxuXG4gIGRhdGVUaW1lOiBidWlsZEZvcm1hdExvbmdGbih7XG4gICAgZm9ybWF0czogZGF0ZVRpbWVGb3JtYXRzLFxuICAgIGRlZmF1bHRXaWR0aDogXCJhbnlcIixcbiAgfSksXG59O1xuIiwiaW1wb3J0IHsgaXNTYW1lV2VlayB9IGZyb20gXCIuLi8uLi8uLi9pc1NhbWVXZWVrLmpzXCI7XG5cbmNvbnN0IGFjY3VzYXRpdmVXZWVrZGF5cyA9IFtcbiAgXCLQstC+0YHQutGA0LXRgdC10L3RjNC1XCIsXG4gIFwi0L/QvtC90LXQtNC10LvRjNC90LjQulwiLFxuICBcItCy0YLQvtGA0L3QuNC6XCIsXG4gIFwi0YHRgNC10LTRg1wiLFxuICBcItGH0LXRgtCy0LXRgNCzXCIsXG4gIFwi0L/Rj9GC0L3QuNGG0YNcIixcbiAgXCLRgdGD0LHQsdC+0YLRg1wiLFxuXTtcblxuZnVuY3Rpb24gbGFzdFdlZWsoZGF5KSB7XG4gIGNvbnN0IHdlZWtkYXkgPSBhY2N1c2F0aXZlV2Vla2RheXNbZGF5XTtcblxuICBzd2l0Y2ggKGRheSkge1xuICAgIGNhc2UgMDpcbiAgICAgIHJldHVybiBcIifQsiDQv9GA0L7RiNC70L7QtSBcIiArIHdlZWtkYXkgKyBcIiDQsicgcFwiO1xuICAgIGNhc2UgMTpcbiAgICBjYXNlIDI6XG4gICAgY2FzZSA0OlxuICAgICAgcmV0dXJuIFwiJ9CyINC/0YDQvtGI0LvRi9C5IFwiICsgd2Vla2RheSArIFwiINCyJyBwXCI7XG4gICAgY2FzZSAzOlxuICAgIGNhc2UgNTpcbiAgICBjYXNlIDY6XG4gICAgICByZXR1cm4gXCIn0LIg0L/RgNC+0YjQu9GD0Y4gXCIgKyB3ZWVrZGF5ICsgXCIg0LInIHBcIjtcbiAgfVxufVxuXG5mdW5jdGlvbiB0aGlzV2VlayhkYXkpIHtcbiAgY29uc3Qgd2Vla2RheSA9IGFjY3VzYXRpdmVXZWVrZGF5c1tkYXldO1xuXG4gIGlmIChkYXkgPT09IDIgLyogVHVlICovKSB7XG4gICAgcmV0dXJuIFwiJ9Cy0L4gXCIgKyB3ZWVrZGF5ICsgXCIg0LInIHBcIjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gXCIn0LIgXCIgKyB3ZWVrZGF5ICsgXCIg0LInIHBcIjtcbiAgfVxufVxuXG5mdW5jdGlvbiBuZXh0V2VlayhkYXkpIHtcbiAgY29uc3Qgd2Vla2RheSA9IGFjY3VzYXRpdmVXZWVrZGF5c1tkYXldO1xuXG4gIHN3aXRjaCAoZGF5KSB7XG4gICAgY2FzZSAwOlxuICAgICAgcmV0dXJuIFwiJ9CyINGB0LvQtdC00YPRjtGJ0LXQtSBcIiArIHdlZWtkYXkgKyBcIiDQsicgcFwiO1xuICAgIGNhc2UgMTpcbiAgICBjYXNlIDI6XG4gICAgY2FzZSA0OlxuICAgICAgcmV0dXJuIFwiJ9CyINGB0LvQtdC00YPRjtGJ0LjQuSBcIiArIHdlZWtkYXkgKyBcIiDQsicgcFwiO1xuICAgIGNhc2UgMzpcbiAgICBjYXNlIDU6XG4gICAgY2FzZSA2OlxuICAgICAgcmV0dXJuIFwiJ9CyINGB0LvQtdC00YPRjtGJ0YPRjiBcIiArIHdlZWtkYXkgKyBcIiDQsicgcFwiO1xuICB9XG59XG5cbmNvbnN0IGZvcm1hdFJlbGF0aXZlTG9jYWxlID0ge1xuICBsYXN0V2VlazogKGRhdGUsIGJhc2VEYXRlLCBvcHRpb25zKSA9PiB7XG4gICAgY29uc3QgZGF5ID0gZGF0ZS5nZXREYXkoKTtcbiAgICBpZiAoaXNTYW1lV2VlayhkYXRlLCBiYXNlRGF0ZSwgb3B0aW9ucykpIHtcbiAgICAgIHJldHVybiB0aGlzV2VlayhkYXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbGFzdFdlZWsoZGF5KTtcbiAgICB9XG4gIH0sXG4gIHllc3RlcmRheTogXCIn0LLRh9C10YDQsCDQsicgcFwiLFxuICB0b2RheTogXCIn0YHQtdCz0L7QtNC90Y8g0LInIHBcIixcbiAgdG9tb3Jyb3c6IFwiJ9C30LDQstGC0YDQsCDQsicgcFwiLFxuICBuZXh0V2VlazogKGRhdGUsIGJhc2VEYXRlLCBvcHRpb25zKSA9PiB7XG4gICAgY29uc3QgZGF5ID0gZGF0ZS5nZXREYXkoKTtcbiAgICBpZiAoaXNTYW1lV2VlayhkYXRlLCBiYXNlRGF0ZSwgb3B0aW9ucykpIHtcbiAgICAgIHJldHVybiB0aGlzV2VlayhkYXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV4dFdlZWsoZGF5KTtcbiAgICB9XG4gIH0sXG4gIG90aGVyOiBcIlBcIixcbn07XG5cbmV4cG9ydCBjb25zdCBmb3JtYXRSZWxhdGl2ZSA9ICh0b2tlbiwgZGF0ZSwgYmFzZURhdGUsIG9wdGlvbnMpID0+IHtcbiAgY29uc3QgZm9ybWF0ID0gZm9ybWF0UmVsYXRpdmVMb2NhbGVbdG9rZW5dO1xuXG4gIGlmICh0eXBlb2YgZm9ybWF0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICByZXR1cm4gZm9ybWF0KGRhdGUsIGJhc2VEYXRlLCBvcHRpb25zKTtcbiAgfVxuXG4gIHJldHVybiBmb3JtYXQ7XG59O1xuIiwiaW1wb3J0IHsgYnVpbGRMb2NhbGl6ZUZuIH0gZnJvbSBcIi4uLy4uL19saWIvYnVpbGRMb2NhbGl6ZUZuLmpzXCI7XG5cbmNvbnN0IGVyYVZhbHVlcyA9IHtcbiAgbmFycm93OiBbXCLQtNC+INC9LtGNLlwiLCBcItC9LtGNLlwiXSxcbiAgYWJicmV2aWF0ZWQ6IFtcItC00L4g0L0uINGNLlwiLCBcItC9LiDRjS5cIl0sXG4gIHdpZGU6IFtcItC00L4g0L3QsNGI0LXQuSDRjdGA0YtcIiwgXCLQvdCw0YjQtdC5INGN0YDRi1wiXSxcbn07XG5cbmNvbnN0IHF1YXJ0ZXJWYWx1ZXMgPSB7XG4gIG5hcnJvdzogW1wiMVwiLCBcIjJcIiwgXCIzXCIsIFwiNFwiXSxcbiAgYWJicmV2aWF0ZWQ6IFtcIjEt0Lkg0LrQsi5cIiwgXCIyLdC5INC60LIuXCIsIFwiMy3QuSDQutCyLlwiLCBcIjQt0Lkg0LrQsi5cIl0sXG4gIHdpZGU6IFtcIjEt0Lkg0LrQstCw0YDRgtCw0LtcIiwgXCIyLdC5INC60LLQsNGA0YLQsNC7XCIsIFwiMy3QuSDQutCy0LDRgNGC0LDQu1wiLCBcIjQt0Lkg0LrQstCw0YDRgtCw0LtcIl0sXG59O1xuXG5jb25zdCBtb250aFZhbHVlcyA9IHtcbiAgbmFycm93OiBbXCLQr1wiLCBcItCkXCIsIFwi0JxcIiwgXCLQkFwiLCBcItCcXCIsIFwi0JhcIiwgXCLQmFwiLCBcItCQXCIsIFwi0KFcIiwgXCLQnlwiLCBcItCdXCIsIFwi0JRcIl0sXG4gIGFiYnJldmlhdGVkOiBbXG4gICAgXCLRj9C90LIuXCIsXG4gICAgXCLRhNC10LIuXCIsXG4gICAgXCLQvNCw0YDRglwiLFxuICAgIFwi0LDQv9GALlwiLFxuICAgIFwi0LzQsNC5XCIsXG4gICAgXCLQuNGO0L3RjFwiLFxuICAgIFwi0LjRjtC70YxcIixcbiAgICBcItCw0LLQsy5cIixcbiAgICBcItGB0LXQvdGCLlwiLFxuICAgIFwi0L7QutGCLlwiLFxuICAgIFwi0L3QvtGP0LEuXCIsXG4gICAgXCLQtNC10LouXCIsXG4gIF0sXG5cbiAgd2lkZTogW1xuICAgIFwi0Y/QvdCy0LDRgNGMXCIsXG4gICAgXCLRhNC10LLRgNCw0LvRjFwiLFxuICAgIFwi0LzQsNGA0YJcIixcbiAgICBcItCw0L/RgNC10LvRjFwiLFxuICAgIFwi0LzQsNC5XCIsXG4gICAgXCLQuNGO0L3RjFwiLFxuICAgIFwi0LjRjtC70YxcIixcbiAgICBcItCw0LLQs9GD0YHRglwiLFxuICAgIFwi0YHQtdC90YLRj9Cx0YDRjFwiLFxuICAgIFwi0L7QutGC0Y/QsdGA0YxcIixcbiAgICBcItC90L7Rj9Cx0YDRjFwiLFxuICAgIFwi0LTQtdC60LDQsdGA0YxcIixcbiAgXSxcbn07XG5cbmNvbnN0IGZvcm1hdHRpbmdNb250aFZhbHVlcyA9IHtcbiAgbmFycm93OiBbXCLQr1wiLCBcItCkXCIsIFwi0JxcIiwgXCLQkFwiLCBcItCcXCIsIFwi0JhcIiwgXCLQmFwiLCBcItCQXCIsIFwi0KFcIiwgXCLQnlwiLCBcItCdXCIsIFwi0JRcIl0sXG4gIGFiYnJldmlhdGVkOiBbXG4gICAgXCLRj9C90LIuXCIsXG4gICAgXCLRhNC10LIuXCIsXG4gICAgXCLQvNCw0YAuXCIsXG4gICAgXCLQsNC/0YAuXCIsXG4gICAgXCLQvNCw0Y9cIixcbiAgICBcItC40Y7QvS5cIixcbiAgICBcItC40Y7Quy5cIixcbiAgICBcItCw0LLQsy5cIixcbiAgICBcItGB0LXQvdGCLlwiLFxuICAgIFwi0L7QutGCLlwiLFxuICAgIFwi0L3QvtGP0LEuXCIsXG4gICAgXCLQtNC10LouXCIsXG4gIF0sXG5cbiAgd2lkZTogW1xuICAgIFwi0Y/QvdCy0LDRgNGPXCIsXG4gICAgXCLRhNC10LLRgNCw0LvRj1wiLFxuICAgIFwi0LzQsNGA0YLQsFwiLFxuICAgIFwi0LDQv9GA0LXQu9GPXCIsXG4gICAgXCLQvNCw0Y9cIixcbiAgICBcItC40Y7QvdGPXCIsXG4gICAgXCLQuNGO0LvRj1wiLFxuICAgIFwi0LDQstCz0YPRgdGC0LBcIixcbiAgICBcItGB0LXQvdGC0Y/QsdGA0Y9cIixcbiAgICBcItC+0LrRgtGP0LHRgNGPXCIsXG4gICAgXCLQvdC+0Y/QsdGA0Y9cIixcbiAgICBcItC00LXQutCw0LHRgNGPXCIsXG4gIF0sXG59O1xuXG5jb25zdCBkYXlWYWx1ZXMgPSB7XG4gIG5hcnJvdzogW1wi0JJcIiwgXCLQn1wiLCBcItCSXCIsIFwi0KFcIiwgXCLQp1wiLCBcItCfXCIsIFwi0KFcIl0sXG4gIHNob3J0OiBbXCLQstGBXCIsIFwi0L/QvVwiLCBcItCy0YJcIiwgXCLRgdGAXCIsIFwi0YfRglwiLCBcItC/0YJcIiwgXCLRgdCxXCJdLFxuICBhYmJyZXZpYXRlZDogW1wi0LLRgdC6XCIsIFwi0L/QvdC0XCIsIFwi0LLRgtGAXCIsIFwi0YHRgNC0XCIsIFwi0YfRgtCyXCIsIFwi0L/RgtC9XCIsIFwi0YHRg9CxXCJdLFxuICB3aWRlOiBbXG4gICAgXCLQstC+0YHQutGA0LXRgdC10L3RjNC1XCIsXG4gICAgXCLQv9C+0L3QtdC00LXQu9GM0L3QuNC6XCIsXG4gICAgXCLQstGC0L7RgNC90LjQulwiLFxuICAgIFwi0YHRgNC10LTQsFwiLFxuICAgIFwi0YfQtdGC0LLQtdGA0LNcIixcbiAgICBcItC/0Y/RgtC90LjRhtCwXCIsXG4gICAgXCLRgdGD0LHQsdC+0YLQsFwiLFxuICBdLFxufTtcblxuY29uc3QgZGF5UGVyaW9kVmFsdWVzID0ge1xuICBuYXJyb3c6IHtcbiAgICBhbTogXCLQlNCfXCIsXG4gICAgcG06IFwi0J/Qn1wiLFxuICAgIG1pZG5pZ2h0OiBcItC/0L7Qu9C9LlwiLFxuICAgIG5vb246IFwi0L/QvtC70LQuXCIsXG4gICAgbW9ybmluZzogXCLRg9GC0YDQvlwiLFxuICAgIGFmdGVybm9vbjogXCLQtNC10L3RjFwiLFxuICAgIGV2ZW5pbmc6IFwi0LLQtdGHLlwiLFxuICAgIG5pZ2h0OiBcItC90L7Rh9GMXCIsXG4gIH0sXG4gIGFiYnJldmlhdGVkOiB7XG4gICAgYW06IFwi0JTQn1wiLFxuICAgIHBtOiBcItCf0J9cIixcbiAgICBtaWRuaWdodDogXCLQv9C+0LvQvS5cIixcbiAgICBub29uOiBcItC/0L7Qu9C0LlwiLFxuICAgIG1vcm5pbmc6IFwi0YPRgtGA0L5cIixcbiAgICBhZnRlcm5vb246IFwi0LTQtdC90YxcIixcbiAgICBldmVuaW5nOiBcItCy0LXRhy5cIixcbiAgICBuaWdodDogXCLQvdC+0YfRjFwiLFxuICB9LFxuICB3aWRlOiB7XG4gICAgYW06IFwi0JTQn1wiLFxuICAgIHBtOiBcItCf0J9cIixcbiAgICBtaWRuaWdodDogXCLQv9C+0LvQvdC+0YfRjFwiLFxuICAgIG5vb246IFwi0L/QvtC70LTQtdC90YxcIixcbiAgICBtb3JuaW5nOiBcItGD0YLRgNC+XCIsXG4gICAgYWZ0ZXJub29uOiBcItC00LXQvdGMXCIsXG4gICAgZXZlbmluZzogXCLQstC10YfQtdGAXCIsXG4gICAgbmlnaHQ6IFwi0L3QvtGH0YxcIixcbiAgfSxcbn07XG5cbmNvbnN0IGZvcm1hdHRpbmdEYXlQZXJpb2RWYWx1ZXMgPSB7XG4gIG5hcnJvdzoge1xuICAgIGFtOiBcItCU0J9cIixcbiAgICBwbTogXCLQn9CfXCIsXG4gICAgbWlkbmlnaHQ6IFwi0L/QvtC70L0uXCIsXG4gICAgbm9vbjogXCLQv9C+0LvQtC5cIixcbiAgICBtb3JuaW5nOiBcItGD0YLRgNCwXCIsXG4gICAgYWZ0ZXJub29uOiBcItC00L3Rj1wiLFxuICAgIGV2ZW5pbmc6IFwi0LLQtdGHLlwiLFxuICAgIG5pZ2h0OiBcItC90L7Rh9C4XCIsXG4gIH0sXG4gIGFiYnJldmlhdGVkOiB7XG4gICAgYW06IFwi0JTQn1wiLFxuICAgIHBtOiBcItCf0J9cIixcbiAgICBtaWRuaWdodDogXCLQv9C+0LvQvS5cIixcbiAgICBub29uOiBcItC/0L7Qu9C0LlwiLFxuICAgIG1vcm5pbmc6IFwi0YPRgtGA0LBcIixcbiAgICBhZnRlcm5vb246IFwi0LTQvdGPXCIsXG4gICAgZXZlbmluZzogXCLQstC10YcuXCIsXG4gICAgbmlnaHQ6IFwi0L3QvtGH0LhcIixcbiAgfSxcbiAgd2lkZToge1xuICAgIGFtOiBcItCU0J9cIixcbiAgICBwbTogXCLQn9CfXCIsXG4gICAgbWlkbmlnaHQ6IFwi0L/QvtC70L3QvtGH0YxcIixcbiAgICBub29uOiBcItC/0L7Qu9C00LXQvdGMXCIsXG4gICAgbW9ybmluZzogXCLRg9GC0YDQsFwiLFxuICAgIGFmdGVybm9vbjogXCLQtNC90Y9cIixcbiAgICBldmVuaW5nOiBcItCy0LXRh9C10YDQsFwiLFxuICAgIG5pZ2h0OiBcItC90L7Rh9C4XCIsXG4gIH0sXG59O1xuXG5jb25zdCBvcmRpbmFsTnVtYmVyID0gKGRpcnR5TnVtYmVyLCBvcHRpb25zKSA9PiB7XG4gIGNvbnN0IG51bWJlciA9IE51bWJlcihkaXJ0eU51bWJlcik7XG4gIGNvbnN0IHVuaXQgPSBvcHRpb25zPy51bml0O1xuXG4gIGxldCBzdWZmaXg7XG4gIGlmICh1bml0ID09PSBcImRhdGVcIikge1xuICAgIHN1ZmZpeCA9IFwiLdC1XCI7XG4gIH0gZWxzZSBpZiAodW5pdCA9PT0gXCJ3ZWVrXCIgfHwgdW5pdCA9PT0gXCJtaW51dGVcIiB8fCB1bml0ID09PSBcInNlY29uZFwiKSB7XG4gICAgc3VmZml4ID0gXCIt0Y9cIjtcbiAgfSBlbHNlIHtcbiAgICBzdWZmaXggPSBcIi3QuVwiO1xuICB9XG5cbiAgcmV0dXJuIG51bWJlciArIHN1ZmZpeDtcbn07XG5cbmV4cG9ydCBjb25zdCBsb2NhbGl6ZSA9IHtcbiAgb3JkaW5hbE51bWJlcixcblxuICBlcmE6IGJ1aWxkTG9jYWxpemVGbih7XG4gICAgdmFsdWVzOiBlcmFWYWx1ZXMsXG4gICAgZGVmYXVsdFdpZHRoOiBcIndpZGVcIixcbiAgfSksXG5cbiAgcXVhcnRlcjogYnVpbGRMb2NhbGl6ZUZuKHtcbiAgICB2YWx1ZXM6IHF1YXJ0ZXJWYWx1ZXMsXG4gICAgZGVmYXVsdFdpZHRoOiBcIndpZGVcIixcbiAgICBhcmd1bWVudENhbGxiYWNrOiAocXVhcnRlcikgPT4gcXVhcnRlciAtIDEsXG4gIH0pLFxuXG4gIG1vbnRoOiBidWlsZExvY2FsaXplRm4oe1xuICAgIHZhbHVlczogbW9udGhWYWx1ZXMsXG4gICAgZGVmYXVsdFdpZHRoOiBcIndpZGVcIixcbiAgICBmb3JtYXR0aW5nVmFsdWVzOiBmb3JtYXR0aW5nTW9udGhWYWx1ZXMsXG4gICAgZGVmYXVsdEZvcm1hdHRpbmdXaWR0aDogXCJ3aWRlXCIsXG4gIH0pLFxuXG4gIGRheTogYnVpbGRMb2NhbGl6ZUZuKHtcbiAgICB2YWx1ZXM6IGRheVZhbHVlcyxcbiAgICBkZWZhdWx0V2lkdGg6IFwid2lkZVwiLFxuICB9KSxcblxuICBkYXlQZXJpb2Q6IGJ1aWxkTG9jYWxpemVGbih7XG4gICAgdmFsdWVzOiBkYXlQZXJpb2RWYWx1ZXMsXG4gICAgZGVmYXVsdFdpZHRoOiBcImFueVwiLFxuICAgIGZvcm1hdHRpbmdWYWx1ZXM6IGZvcm1hdHRpbmdEYXlQZXJpb2RWYWx1ZXMsXG4gICAgZGVmYXVsdEZvcm1hdHRpbmdXaWR0aDogXCJ3aWRlXCIsXG4gIH0pLFxufTtcbiIsImltcG9ydCB7IGJ1aWxkTWF0Y2hGbiB9IGZyb20gXCIuLi8uLi9fbGliL2J1aWxkTWF0Y2hGbi5qc1wiO1xuaW1wb3J0IHsgYnVpbGRNYXRjaFBhdHRlcm5GbiB9IGZyb20gXCIuLi8uLi9fbGliL2J1aWxkTWF0Y2hQYXR0ZXJuRm4uanNcIjtcblxuY29uc3QgbWF0Y2hPcmRpbmFsTnVtYmVyUGF0dGVybiA9IC9eKFxcZCspKC0/KNC1fNGPfNC5fNC+0LV80YzQtXzQsNGPfNGM0Y980YvQuXzQvtC5fNC40Ll80YvQuSkpPy9pO1xuY29uc3QgcGFyc2VPcmRpbmFsTnVtYmVyUGF0dGVybiA9IC9cXGQrL2k7XG5cbmNvbnN0IG1hdGNoRXJhUGF0dGVybnMgPSB7XG4gIG5hcnJvdzogL14oKNC00L4gKT/QvVxcLj9cXHM/0Y1cXC4/KS9pLFxuICBhYmJyZXZpYXRlZDogL14oKNC00L4gKT/QvVxcLj9cXHM/0Y1cXC4/KS9pLFxuICB3aWRlOiAvXijQtNC+INC90LDRiNC10Lkg0Y3RgNGLfNC90LDRiNC10Lkg0Y3RgNGLfNC90LDRiNCwINGN0YDQsCkvaSxcbn07XG5jb25zdCBwYXJzZUVyYVBhdHRlcm5zID0ge1xuICBhbnk6IFsvXtC0L2ksIC9e0L0vaV0sXG59O1xuXG5jb25zdCBtYXRjaFF1YXJ0ZXJQYXR0ZXJucyA9IHtcbiAgbmFycm93OiAvXlsxMjM0XS9pLFxuICBhYmJyZXZpYXRlZDogL15bMTIzNF0oLT9b0YvQvtC4XT/QuT8pPyDQutCyLj8vaSxcbiAgd2lkZTogL15bMTIzNF0oLT9b0YvQvtC4XT/QuT8pPyDQutCy0LDRgNGC0LDQuy9pLFxufTtcblxuY29uc3QgcGFyc2VRdWFydGVyUGF0dGVybnMgPSB7XG4gIGFueTogWy8xL2ksIC8yL2ksIC8zL2ksIC80L2ldLFxufTtcblxuY29uc3QgbWF0Y2hNb250aFBhdHRlcm5zID0ge1xuICBuYXJyb3c6IC9eW9GP0YTQvNCw0LjRgdC+0L3QtF0vaSxcbiAgYWJicmV2aWF0ZWQ6XG4gICAgL14o0Y/QvdCyfNGE0LXQsnzQvNCw0YDRgj980LDQv9GAfNC80LBb0LnRj1180LjRjtC9W9GM0Y9dP3zQuNGO0Ltb0YzRj10/fNCw0LLQs3zRgdC10L3Rgj980L7QutGCfNC90L7Rj9CxP3zQtNC10LopXFwuPy9pLFxuICB3aWRlOiAvXijRj9C90LLQsNGAW9GM0Y9dfNGE0LXQstGA0LDQu1vRjNGPXXzQvNCw0YDRgtCwP3zQsNC/0YDQtdC7W9GM0Y9dfNC80LBb0LnRj1180LjRjtC9W9GM0Y9dfNC40Y7Qu1vRjNGPXXzQsNCy0LPRg9GB0YLQsD980YHQtdC90YLRj9Cx0YBb0YzRj1180L7QutGC0Y/QsdGAW9GM0Y9dfNC+0LrRgtGP0LHRgFvRjNGPXXzQvdC+0Y/QsdGAW9GM0Y9dfNC00LXQutCw0LHRgFvRjNGPXSkvaSxcbn07XG5cbmNvbnN0IHBhcnNlTW9udGhQYXR0ZXJucyA9IHtcbiAgbmFycm93OiBbXG4gICAgL17Rjy9pLFxuICAgIC9e0YQvaSxcbiAgICAvXtC8L2ksXG4gICAgL17QsC9pLFxuICAgIC9e0LwvaSxcbiAgICAvXtC4L2ksXG4gICAgL17QuC9pLFxuICAgIC9e0LAvaSxcbiAgICAvXtGBL2ksXG4gICAgL17Qvi9pLFxuICAgIC9e0L0vaSxcbiAgICAvXtGPL2ksXG4gIF0sXG5cbiAgYW55OiBbXG4gICAgL17Rjy9pLFxuICAgIC9e0YQvaSxcbiAgICAvXtC80LDRgC9pLFxuICAgIC9e0LDQvy9pLFxuICAgIC9e0LzQsFvQudGPXS9pLFxuICAgIC9e0LjRjtC9L2ksXG4gICAgL17QuNGO0LsvaSxcbiAgICAvXtCw0LIvaSxcbiAgICAvXtGBL2ksXG4gICAgL17Qvi9pLFxuICAgIC9e0L0vaSxcbiAgICAvXtC0L2ksXG4gIF0sXG59O1xuXG5jb25zdCBtYXRjaERheVBhdHRlcm5zID0ge1xuICBuYXJyb3c6IC9eW9Cy0L/RgdGHXS9pLFxuICBzaG9ydDogL14o0LLRgXzQstC+fNC/0L180L/QvnzQstGCfNGB0YB80YfRgnzRh9C1fNC/0YJ80L/Rj3zRgdCxfNGB0YMpXFwuPy9pLFxuICBhYmJyZXZpYXRlZDogL14o0LLRgdC6fNCy0L7RgXzQv9C90LR80L/QvtC9fNCy0YLRgHzQstGC0L580YHRgNC0fNGB0YDQtXzRh9GC0LJ80YfQtdGCfNC/0YLQvXzQv9GP0YJ80YHRg9CxKS4/L2ksXG4gIHdpZGU6IC9eKNCy0L7RgdC60YDQtdGB0LXQvdGMW9C10Y9dfNC/0L7QvdC10LTQtdC70YzQvdC40LrQsD980LLRgtC+0YDQvdC40LrQsD980YHRgNC10LRb0LDRi1180YfQtdGC0LLQtdGA0LPQsD980L/Rj9GC0L3QuNGGW9Cw0YtdfNGB0YPQsdCx0L7RglvQsNGLXSkvaSxcbn07XG5cbmNvbnN0IHBhcnNlRGF5UGF0dGVybnMgPSB7XG4gIG5hcnJvdzogWy9e0LIvaSwgL17Qvy9pLCAvXtCyL2ksIC9e0YEvaSwgL17Rhy9pLCAvXtC/L2ksIC9e0YEvaV0sXG4gIGFueTogWy9e0LJb0L7RgV0vaSwgL17Qv1vQvtC9XS9pLCAvXtCyL2ksIC9e0YHRgC9pLCAvXtGHL2ksIC9e0L9b0Y/Rgl0vaSwgL17RgVvRg9CxXS9pXSxcbn07XG5cbmNvbnN0IG1hdGNoRGF5UGVyaW9kUGF0dGVybnMgPSB7XG4gIG5hcnJvdzogL14oW9C00L9d0L980L/QvtC70L1cXC4/fNC/0L7Qu9C0XFwuP3zRg9GC0YBb0L7QsF180LTQtdC90Yx80LTQvdGPfNCy0LXRh1xcLj980L3QvtGHW9GM0LhdKS9pLFxuICBhYmJyZXZpYXRlZDogL14oW9C00L9d0L980L/QvtC70L1cXC4/fNC/0L7Qu9C0XFwuP3zRg9GC0YBb0L7QsF180LTQtdC90Yx80LTQvdGPfNCy0LXRh1xcLj980L3QvtGHW9GM0LhdKS9pLFxuICB3aWRlOiAvXihb0LTQv13Qv3zQv9C+0LvQvdC+0YfRjHzQv9C+0LvQtNC10L3RjHzRg9GC0YBb0L7QsF180LTQtdC90Yx80LTQvdGPfNCy0LXRh9C10YDQsD980L3QvtGHW9GM0LhdKS9pLFxufTtcblxuY29uc3QgcGFyc2VEYXlQZXJpb2RQYXR0ZXJucyA9IHtcbiAgYW55OiB7XG4gICAgYW06IC9e0LTQvy9pLFxuICAgIHBtOiAvXtC/0L8vaSxcbiAgICBtaWRuaWdodDogL17Qv9C+0LvQvS9pLFxuICAgIG5vb246IC9e0L/QvtC70LQvaSxcbiAgICBtb3JuaW5nOiAvXtGDL2ksXG4gICAgYWZ0ZXJub29uOiAvXtC0W9C10L1dL2ksXG4gICAgZXZlbmluZzogL17Qsi9pLFxuICAgIG5pZ2h0OiAvXtC9L2ksXG4gIH0sXG59O1xuXG5leHBvcnQgY29uc3QgbWF0Y2ggPSB7XG4gIG9yZGluYWxOdW1iZXI6IGJ1aWxkTWF0Y2hQYXR0ZXJuRm4oe1xuICAgIG1hdGNoUGF0dGVybjogbWF0Y2hPcmRpbmFsTnVtYmVyUGF0dGVybixcbiAgICBwYXJzZVBhdHRlcm46IHBhcnNlT3JkaW5hbE51bWJlclBhdHRlcm4sXG4gICAgdmFsdWVDYWxsYmFjazogKHZhbHVlKSA9PiBwYXJzZUludCh2YWx1ZSwgMTApLFxuICB9KSxcblxuICBlcmE6IGJ1aWxkTWF0Y2hGbih7XG4gICAgbWF0Y2hQYXR0ZXJuczogbWF0Y2hFcmFQYXR0ZXJucyxcbiAgICBkZWZhdWx0TWF0Y2hXaWR0aDogXCJ3aWRlXCIsXG4gICAgcGFyc2VQYXR0ZXJuczogcGFyc2VFcmFQYXR0ZXJucyxcbiAgICBkZWZhdWx0UGFyc2VXaWR0aDogXCJhbnlcIixcbiAgfSksXG5cbiAgcXVhcnRlcjogYnVpbGRNYXRjaEZuKHtcbiAgICBtYXRjaFBhdHRlcm5zOiBtYXRjaFF1YXJ0ZXJQYXR0ZXJucyxcbiAgICBkZWZhdWx0TWF0Y2hXaWR0aDogXCJ3aWRlXCIsXG4gICAgcGFyc2VQYXR0ZXJuczogcGFyc2VRdWFydGVyUGF0dGVybnMsXG4gICAgZGVmYXVsdFBhcnNlV2lkdGg6IFwiYW55XCIsXG4gICAgdmFsdWVDYWxsYmFjazogKGluZGV4KSA9PiBpbmRleCArIDEsXG4gIH0pLFxuXG4gIG1vbnRoOiBidWlsZE1hdGNoRm4oe1xuICAgIG1hdGNoUGF0dGVybnM6IG1hdGNoTW9udGhQYXR0ZXJucyxcbiAgICBkZWZhdWx0TWF0Y2hXaWR0aDogXCJ3aWRlXCIsXG4gICAgcGFyc2VQYXR0ZXJuczogcGFyc2VNb250aFBhdHRlcm5zLFxuICAgIGRlZmF1bHRQYXJzZVdpZHRoOiBcImFueVwiLFxuICB9KSxcblxuICBkYXk6IGJ1aWxkTWF0Y2hGbih7XG4gICAgbWF0Y2hQYXR0ZXJuczogbWF0Y2hEYXlQYXR0ZXJucyxcbiAgICBkZWZhdWx0TWF0Y2hXaWR0aDogXCJ3aWRlXCIsXG4gICAgcGFyc2VQYXR0ZXJuczogcGFyc2VEYXlQYXR0ZXJucyxcbiAgICBkZWZhdWx0UGFyc2VXaWR0aDogXCJhbnlcIixcbiAgfSksXG5cbiAgZGF5UGVyaW9kOiBidWlsZE1hdGNoRm4oe1xuICAgIG1hdGNoUGF0dGVybnM6IG1hdGNoRGF5UGVyaW9kUGF0dGVybnMsXG4gICAgZGVmYXVsdE1hdGNoV2lkdGg6IFwid2lkZVwiLFxuICAgIHBhcnNlUGF0dGVybnM6IHBhcnNlRGF5UGVyaW9kUGF0dGVybnMsXG4gICAgZGVmYXVsdFBhcnNlV2lkdGg6IFwiYW55XCIsXG4gIH0pLFxufTtcbiIsImltcG9ydCB7IGdldERlZmF1bHRPcHRpb25zIH0gZnJvbSBcIi4vX2xpYi9kZWZhdWx0T3B0aW9ucy5qc1wiO1xuaW1wb3J0IHsgdG9EYXRlIH0gZnJvbSBcIi4vdG9EYXRlLmpzXCI7XG5cbi8qKlxuICogVGhlIHtAbGluayBzdGFydE9mV2Vla30gZnVuY3Rpb24gb3B0aW9ucy5cbiAqL1xuXG4vKipcbiAqIEBuYW1lIHN0YXJ0T2ZXZWVrXG4gKiBAY2F0ZWdvcnkgV2VlayBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIHN0YXJ0IG9mIGEgd2VlayBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIHN0YXJ0IG9mIGEgd2VlayBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKiBUaGUgcmVzdWx0IHdpbGwgYmUgaW4gdGhlIGxvY2FsIHRpbWV6b25lLlxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICogQHR5cGVQYXJhbSBSZXN1bHREYXRlIC0gVGhlIHJlc3VsdCBgRGF0ZWAgdHlwZSwgaXQgaXMgdGhlIHR5cGUgcmV0dXJuZWQgZnJvbSB0aGUgY29udGV4dCBmdW5jdGlvbiBpZiBpdCBpcyBwYXNzZWQsIG9yIGluZmVycmVkIGZyb20gdGhlIGFyZ3VtZW50cy5cbiAqXG4gKiBAcGFyYW0gZGF0ZSAtIFRoZSBvcmlnaW5hbCBkYXRlXG4gKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9iamVjdCB3aXRoIG9wdGlvbnNcbiAqXG4gKiBAcmV0dXJucyBUaGUgc3RhcnQgb2YgYSB3ZWVrXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFRoZSBzdGFydCBvZiBhIHdlZWsgZm9yIDIgU2VwdGVtYmVyIDIwMTQgMTE6NTU6MDA6XG4gKiBjb25zdCByZXN1bHQgPSBzdGFydE9mV2VlayhuZXcgRGF0ZSgyMDE0LCA4LCAyLCAxMSwgNTUsIDApKVxuICogLy89PiBTdW4gQXVnIDMxIDIwMTQgMDA6MDA6MDBcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgdGhlIHdlZWsgc3RhcnRzIG9uIE1vbmRheSwgdGhlIHN0YXJ0IG9mIHRoZSB3ZWVrIGZvciAyIFNlcHRlbWJlciAyMDE0IDExOjU1OjAwOlxuICogY29uc3QgcmVzdWx0ID0gc3RhcnRPZldlZWsobmV3IERhdGUoMjAxNCwgOCwgMiwgMTEsIDU1LCAwKSwgeyB3ZWVrU3RhcnRzT246IDEgfSlcbiAqIC8vPT4gTW9uIFNlcCAwMSAyMDE0IDAwOjAwOjAwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdGFydE9mV2VlayhkYXRlLCBvcHRpb25zKSB7XG4gIGNvbnN0IGRlZmF1bHRPcHRpb25zID0gZ2V0RGVmYXVsdE9wdGlvbnMoKTtcbiAgY29uc3Qgd2Vla1N0YXJ0c09uID1cbiAgICBvcHRpb25zPy53ZWVrU3RhcnRzT24gPz9cbiAgICBvcHRpb25zPy5sb2NhbGU/Lm9wdGlvbnM/LndlZWtTdGFydHNPbiA/P1xuICAgIGRlZmF1bHRPcHRpb25zLndlZWtTdGFydHNPbiA/P1xuICAgIGRlZmF1bHRPcHRpb25zLmxvY2FsZT8ub3B0aW9ucz8ud2Vla1N0YXJ0c09uID8/XG4gICAgMDtcblxuICBjb25zdCBfZGF0ZSA9IHRvRGF0ZShkYXRlLCBvcHRpb25zPy5pbik7XG4gIGNvbnN0IGRheSA9IF9kYXRlLmdldERheSgpO1xuICBjb25zdCBkaWZmID0gKGRheSA8IHdlZWtTdGFydHNPbiA/IDcgOiAwKSArIGRheSAtIHdlZWtTdGFydHNPbjtcblxuICBfZGF0ZS5zZXREYXRlKF9kYXRlLmdldERhdGUoKSAtIGRpZmYpO1xuICBfZGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgcmV0dXJuIF9kYXRlO1xufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IHN0YXJ0T2ZXZWVrO1xuIiwiaW1wb3J0IHsgY29uc3RydWN0RnJvbSB9IGZyb20gXCIuL2NvbnN0cnVjdEZyb20uanNcIjtcblxuLyoqXG4gKiBAbmFtZSB0b0RhdGVcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgQ29udmVydCB0aGUgZ2l2ZW4gYXJndW1lbnQgdG8gYW4gaW5zdGFuY2Ugb2YgRGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIENvbnZlcnQgdGhlIGdpdmVuIGFyZ3VtZW50IHRvIGFuIGluc3RhbmNlIG9mIERhdGUuXG4gKlxuICogSWYgdGhlIGFyZ3VtZW50IGlzIGFuIGluc3RhbmNlIG9mIERhdGUsIHRoZSBmdW5jdGlvbiByZXR1cm5zIGl0cyBjbG9uZS5cbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgYSBudW1iZXIsIGl0IGlzIHRyZWF0ZWQgYXMgYSB0aW1lc3RhbXAuXG4gKlxuICogSWYgdGhlIGFyZ3VtZW50IGlzIG5vbmUgb2YgdGhlIGFib3ZlLCB0aGUgZnVuY3Rpb24gcmV0dXJucyBJbnZhbGlkIERhdGUuXG4gKlxuICogU3RhcnRpbmcgZnJvbSB2My43LjAsIGl0IGNsb25lcyBhIGRhdGUgdXNpbmcgYFtTeW1ib2wuZm9yKFwiY29uc3RydWN0RGF0ZUZyb21cIildYFxuICogZW5hYmxpbmcgdG8gdHJhbnNmZXIgZXh0cmEgcHJvcGVydGllcyBmcm9tIHRoZSByZWZlcmVuY2UgZGF0ZSB0byB0aGUgbmV3IGRhdGUuXG4gKiBJdCdzIHVzZWZ1bCBmb3IgZXh0ZW5zaW9ucyBsaWtlIFtgVFpEYXRlYF0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL3R6KVxuICogdGhhdCBhY2NlcHQgYSB0aW1lIHpvbmUgYXMgYSBjb25zdHJ1Y3RvciBhcmd1bWVudC5cbiAqXG4gKiAqKk5vdGUqKjogKmFsbCogRGF0ZSBhcmd1bWVudHMgcGFzc2VkIHRvIGFueSAqZGF0ZS1mbnMqIGZ1bmN0aW9uIGlzIHByb2Nlc3NlZCBieSBgdG9EYXRlYC5cbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqIEB0eXBlUGFyYW0gUmVzdWx0RGF0ZSAtIFRoZSByZXN1bHQgYERhdGVgIHR5cGUsIGl0IGlzIHRoZSB0eXBlIHJldHVybmVkIGZyb20gdGhlIGNvbnRleHQgZnVuY3Rpb24gaWYgaXQgaXMgcGFzc2VkLCBvciBpbmZlcnJlZCBmcm9tIHRoZSBhcmd1bWVudHMuXG4gKlxuICogQHBhcmFtIGFyZ3VtZW50IC0gVGhlIHZhbHVlIHRvIGNvbnZlcnRcbiAqXG4gKiBAcmV0dXJucyBUaGUgcGFyc2VkIGRhdGUgaW4gdGhlIGxvY2FsIHRpbWUgem9uZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDbG9uZSB0aGUgZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IHRvRGF0ZShuZXcgRGF0ZSgyMDE0LCAxLCAxMSwgMTEsIDMwLCAzMCkpXG4gKiAvLz0+IFR1ZSBGZWIgMTEgMjAxNCAxMTozMDozMFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDb252ZXJ0IHRoZSB0aW1lc3RhbXAgdG8gZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IHRvRGF0ZSgxMzkyMDk4NDMwMDAwKVxuICogLy89PiBUdWUgRmViIDExIDIwMTQgMTE6MzA6MzBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvRGF0ZShhcmd1bWVudCwgY29udGV4dCkge1xuICAvLyBbVE9ET10gR2V0IHJpZCBvZiBgdG9EYXRlYCBvciBgY29uc3RydWN0RnJvbWA/XG4gIHJldHVybiBjb25zdHJ1Y3RGcm9tKGNvbnRleHQgfHwgYXJndW1lbnQsIGFyZ3VtZW50KTtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCB0b0RhdGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8qINCk0LDQudC7INGB0L4g0YHQv9C40YHQutC+0Lwg0YHRgtGA0LDQvdC40YYg0L/RgNC40LvQvtC20LXQvdC40Y8gKi9cbmV4cG9ydCBjb25zdCBQT1NUU19QQUdFID0gXCJwb3N0c1wiO1xuZXhwb3J0IGNvbnN0IFVTRVJfUE9TVFNfUEFHRSA9IFwidXNlci1wb3N0c1wiO1xuZXhwb3J0IGNvbnN0IEFVVEhfUEFHRSA9IFwiYXV0aFwiO1xuZXhwb3J0IGNvbnN0IEFERF9QT1NUU19QQUdFID0gXCJhZGQtcG9zdFwiO1xuZXhwb3J0IGNvbnN0IExPQURJTkdfUEFHRSA9IFwibG9hZGluZ1wiO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGVzLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xub3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGVzLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3VpLWtpdC5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcbm9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3VpLWtpdC5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0ICYmIGRvY3VtZW50LmN1cnJlbnRTY3JpcHQudGFnTmFtZS50b1VwcGVyQ2FzZSgpID09PSAnU0NSSVBUJylcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgaSA9IHNjcmlwdHMubGVuZ3RoIC0gMTtcblx0XHRcdHdoaWxlIChpID4gLTEgJiYgKCFzY3JpcHRVcmwgfHwgIS9eaHR0cChzPyk6Ly50ZXN0KHNjcmlwdFVybCkpKSBzY3JpcHRVcmwgPSBzY3JpcHRzW2ktLV0uc3JjO1xuXHRcdH1cblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC9eYmxvYjovLCBcIlwiKS5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5iID0gKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgZG9jdW1lbnQuYmFzZVVSSSkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIG5vIGpzb25wIGZ1bmN0aW9uIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL2luZGV4LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9