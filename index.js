import "./styles.css";
import "./ui-kit.css";

import { getPosts, addPost, likePost, unlikePost } from "./api.js";
import { renderAddPostPageComponent } from "./components/add-post-page-component.js";
import { renderAuthPageComponent } from "./components/auth-page-component.js";
import { renderPostsPageComponent } from "./components/posts-page-component.js";
import { renderLoadingPageComponent } from "./components/loading-page-component.js";
import { renderUserPostsPageComponent } from "./components/user-posts-page-component.js";

import {
  ADD_POSTS_PAGE,
  AUTH_PAGE,
  LOADING_PAGE,
  POSTS_PAGE,
  USER_POSTS_PAGE,
} from "./routes.js";

import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
  saveUserToLocalStorage,
} from "./helpers.js";

export { POSTS_PAGE, ADD_POSTS_PAGE, AUTH_PAGE, LOADING_PAGE, USER_POSTS_PAGE };

export let user = getUserFromLocalStorage();
export let page = null;
export let posts = [];

// Получение токена
export const getToken = () => (user ? user.token : undefined);

// Выход
export const logout = () => {
  user = null;
  removeUserFromLocalStorage();
  goToPage(POSTS_PAGE);
};

//Функция синхронизации лайков
export async function toggleLike(postId) {
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
      await unlikePost({ postId, token: user.token });
      post.likes = post.likes.filter(l => l.id !== user._id);
    } else {
      await likePost({ postId, token: user.token });
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
export const goToPage = (newPage, data) => {
  if (
    [POSTS_PAGE, AUTH_PAGE, ADD_POSTS_PAGE, USER_POSTS_PAGE, LOADING_PAGE].includes(newPage)
  ) {
    if (newPage === ADD_POSTS_PAGE) {
      page = user ? ADD_POSTS_PAGE : AUTH_PAGE;
      return renderApp();
    }

    if (newPage === POSTS_PAGE) {
      page = LOADING_PAGE;
      renderApp();

      return getPosts({ token: getToken() })
        .then((newPosts) => {
          page = POSTS_PAGE;
          posts = newPosts;
          renderApp();
        })
        .catch((error) => {
          console.error(error);
          goToPage(POSTS_PAGE);
        });
    }

    if (newPage === USER_POSTS_PAGE) {
      console.log("Открываю страницу пользователя: ", data.userId);
      page = USER_POSTS_PAGE;
      const appEl = document.getElementById("app");
      return renderUserPostsPageComponent({ appEl, userId: data.userId });
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
    case LOADING_PAGE:
      renderLoadingPageComponent({ appEl, user, goToPage });
      break;

    case AUTH_PAGE:
      renderAuthPageComponent({
        appEl,
        setUser: (newUser) => {
          user = newUser;
          saveUserToLocalStorage(user);
          goToPage(POSTS_PAGE);
        },
        user,
        goToPage,
      });
      break;

    case ADD_POSTS_PAGE:
      renderAddPostPageComponent({
        appEl,
        onAddPostClick: async ({ description, imageUrl }) => {
          try {
            const post = await addPost({
              description,
              imageUrl,
              token: getToken(),
            });
            console.log("Пост добавлен:", post);
            goToPage(POSTS_PAGE);
          } catch (error) {
            console.error("Ошибка при добавлении поста", error);
            alert("Ошибка при добавлении поста");
          }
        },
      });
      break;

    case POSTS_PAGE:
      renderPostsPageComponent({ appEl });
      break;

    case USER_POSTS_PAGE:
      appEl.innerHTML = "Здесь будет страница фотографий пользователя";
      break;
  }
};

//Запуск приложения
goToPage(POSTS_PAGE);
