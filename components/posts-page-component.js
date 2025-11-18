import { USER_POSTS_PAGE, goToPage, posts as globalPosts, user, toggleLike } from "../index.js";
import { renderHeaderComponent } from "./header-component.js";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import { deletePost } from "../api.js";

import likeActiveIcon from "../assets/images/like-active.svg";
import likeNotActiveIcon from "../assets/images/like-not-active.svg";

export function renderPostsPageComponent({ appEl }) {
  const renderPosts = () => {
    const postsHtml = globalPosts
      .map(post => {
        const postDate = new Date(post.createdAt);

        // проверяем лайк во всех массивах
        const allPosts = [...globalPosts, ...(window.userPosts || [])];
        const postGlobal = allPosts.find(p => p.id === post.id);
        const isLiked = postGlobal?.likes.some(l => l.id === user?._id);
        const likeImage = isLiked ? likeActiveIcon : likeNotActiveIcon;

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
                post.user.id === user?._id
                  ? `<button class="delete-button" data-post-id="${post.id}">Удалить</button>`
                  : ""
              }
            </div>
            <p class="post-text">
              <span class="user-name">${post.user.name}</span>
              ${post.description}
            </p>
            <p class="post-date">
              ${formatDistanceToNow(postDate, { addSuffix: true, locale: ru })}
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

    renderHeaderComponent({ element: document.querySelector(".header-container") });

    // Переход на страницу пользователя
    document.querySelectorAll(".post-header").forEach(userEl => {
      userEl.addEventListener("click", () => {
        goToPage(USER_POSTS_PAGE, { userId: userEl.dataset.userId });
      });
    });

    // Лайки с анимацией
    document.querySelectorAll(".like-button").forEach(button => {
      button.addEventListener("click", async () => {
        const postId = button.dataset.postId;
        const imgEl = button.querySelector("img");
        const likesTextEl = button.nextElementSibling;

        try {
          const newLikesCount = await toggleLike(postId);

          const allPosts = [...globalPosts, ...(window.userPosts || [])];
          const post = allPosts.find(p => p.id === postId);
          const isLiked = post.likes.some(l => l.id === user._id);

          imgEl.src = isLiked ? likeActiveIcon : likeNotActiveIcon;

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
        const post = globalPosts[index];
        if (!confirm("Вы точно хотите удалить пост?")) return;

        try {
          await deletePost({ postId: post.id, token: user.token });
          globalPosts.splice(index, 1);
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
