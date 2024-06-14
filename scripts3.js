document.addEventListener('DOMContentLoaded', () => {
  renderPosts();
  addSamplePosts();
  document.getElementById('postForm').addEventListener('submit', addPost);
  document.getElementById('prevPage').addEventListener('click', prevPage);
  document.getElementById('nextPage').addEventListener('click', nextPage);
});

const addSamplePosts = () => {
  const samplePosts = [
    { title: "HI", content: "하이!" },
    { title: "오늘 날씨", content: "맑은가?" },
    { title: "안녕하세요", content: "안녕하세요" },
    { title: "기분이 어때?", content: "좋은가?" },
    { title: "책 리뷰", content: "음..." }
  ];

  const posts = loadPosts();
  samplePosts.forEach(post => {
    posts.push(post);
  });
  savePosts(posts);
};

const addPost = (event) => {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  if (title && content) {
    const newPost = { title, content };
    const posts = loadPosts();
    posts.push(newPost);
    savePosts(posts);
    renderPosts();
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
  } else {
    alert('Please fill out both fields.');
  }
};

const deletePost = (index) => {
  const posts = loadPosts();
  posts.splice(index, 1);
  savePosts(posts);
  renderPosts();
};

const savePosts = (posts) => {
  localStorage.setItem('posts', JSON.stringify(posts));
};

const loadPosts = () => {
  const posts = localStorage.getItem('posts');
  if (!posts) {
    return [];
  }
  return JSON.parse(posts);
};

let currentPage = 1;
const postsPerPage = 5;

const prevPage = () => {
  if (currentPage > 1) {
    currentPage--;
    renderPosts();
  }
};

const nextPage = () => {
  const posts = loadPosts();
  const totalPages = Math.ceil(posts.length / postsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderPosts();
  } else {
    alert("You're already on the last page.");
  }
};

const renderPosts = () => {
  const posts = loadPosts();
  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;
  const paginatedPosts = posts.slice(start, end);

  const postsContainer = document.getElementById('posts');
  postsContainer.innerHTML = '';
  paginatedPosts.forEach((post, index) => {
    const postElement = document.createElement('div');
    postElement.className = 'post';
    postElement.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.content}</p>
      <button class="btn btn-danger btn-sm" onclick="deletePost(${start + index})">Delete</button>
    `;
    postsContainer.appendChild(postElement);
  });

  const pageInfo = document.getElementById('pageInfo');
  pageInfo.textContent = `Page ${currentPage} of ${Math.ceil(posts.length / postsPerPage)}`;
  const prevPageButton = document.getElementById('prevPage');
  prevPageButton.disabled = currentPage === 1;
  const nextPageButton = document.getElementById('nextPage');
  nextPageButton.disabled = currentPage === Math.ceil(posts.length / postsPerPage);
};
