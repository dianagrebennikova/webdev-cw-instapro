const personalKey = "diana123test";
const apiBase = "https://wedev-api.sky.pro/api";
const baseHost = `${apiBase}/v1`;
const postsHost = `${baseHost}/${personalKey}/instapro`;
const userHost = "https://wedev-api.sky.pro/api/user";


//Получение постов
export function getPosts() {
  return fetch(postsHost, { method: "GET" })
    .then((response) => response.json())
    .then((data) => data.posts);
}

//Вход пользователя
export function loginUser({ login, password }) {
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
export function registerUser({ login, password, name }) {
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
export function uploadImage({ file }) {
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
export async function addPost({ description, imageUrl, token }) {
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
export function likePost({ postId, token }) {
  return fetch(`${postsHost}/${postId}/like`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
}

//Убрать лайк
export function unlikePost({ postId, token }) {
  return fetch(`${postsHost}/${postId}/dislike`, {  
    method: "POST",                                 
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
}

//Удалить пост
export async function deletePost({ postId, token }) {
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
export function getUserPosts({ userId, token }) {
  return fetch(`${postsHost}/user-posts/${userId}`, {
    method: "GET",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })
  .then((res) => res.json())
  .then((data) => data.posts);
}




