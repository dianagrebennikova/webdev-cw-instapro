import { likePost, unlikePost } from "./api.js";
import likeActiveIcon from "./assets/images/like-active.svg";
import likeNotActiveIcon from "./assets/images/like-not-active.svg";

/**
 * Общий обработчик лайков.
 * @param {object} params
 * @param {string} params.postId
 * @param {object} params.user
 * @param {Array[]} params.postsArrays - массивы постов для синхронизации
 * @param {HTMLElement} params.button - кнопка лайка
 */
export async function handleLike({ postId, user, postsArrays, button }) {
  if (!user) {
    alert("Войдите, чтобы ставить лайки");
    return;
  }

  const imgEl = button.querySelector("img");
  const likesTextEl = button.nextElementSibling;

  // ищем пост во всех переданных массивах
  let post;
  for (const arr of postsArrays) {
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
      post.likes = post.likes.filter((l) => l.id !== user._id);
    } else {
      await likePost({ postId, token: user.token });
      post.likes.push({ id: user._id, name: user.name });
    }

    imgEl.src = post.likes.some((l) => l.id === user._id)
      ? likeActiveIcon
      : likeNotActiveIcon;

    likesTextEl.querySelector("strong").textContent = post.likes.length;
  } catch (error) {
    console.error("Ошибка лайка", error);
    alert("Не удалось поставить/убрать лайк");
  }
}
