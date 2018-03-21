const panelBody = document.getElementById('panel');
const postsList = document.querySelector('ul');
const comments = document.getElementById('comments');
const authorLink = document.getElementById('author-link');
const h2 = document.querySelector('h2');
const p = document.querySelector('p');
const span = document.querySelector('span');

fetch('https://jsonplaceholder.typicode.com/posts')
  .then((response) => { return response.json(); })
  .then((data) => {
    for (let i = 0; i < data.length; i += 1) {
      const { userId, title, body, id } = data[i];
      const listItem = document.createElement('li');
      const urlItem = document.createElement('a');

      urlItem.href = `#postId=${id}`;
      postsList.appendChild(listItem);
      listItem.appendChild(urlItem);
      urlItem.innerHTML = `${title}`;

      // Click to see post comments
      urlItem.onclick = () => {
        postsList.innerHTML = '';
        authorLink.href = `#userId=${userId}`;
        h2.innerHTML = `${title}`;
        p.innerHTML = `${body}`;
        span.innerHTML = `${userId}`;
        showComments(id);
      };
      // Click to see post of specific author
      authorLink.onclick = () => {
        panelBody.innerHTML = '';
        showAuthorPosts(userId);
      };
    }
  });

const showComments = (id) => {
  fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
    .then((response) => { return response.json(); })
    .then((json) => {
      for (let i = 0; i < json.length; i += 1) {
        const { name, body, email } = json[i];

        const commentsList = document.createElement('li');
        const commentsTitle = document.createElement('h3');
        const commentsBody = document.createElement('p');
        const commentsEmail = document.createElement('email');

        commentsTitle.innerHTML = `${name}`;
        commentsBody.innerHTML = `${body}`;
        commentsEmail.innerHTML = `${email}`;

        comments.appendChild(commentsList);
        commentsList.appendChild(commentsTitle);
        commentsList.appendChild(commentsBody);
        commentsList.appendChild(commentsEmail);
      }
    });
};

const showAuthorPosts = (userId) => {
  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then((response) => { return response.json(); })
    .then((res) => {
      for (let i = 0; i < res.length; i += 1) {
        const { title } = res[i];

        const ul = document.createElement('ul');
        const listAuthorPosts = document.createElement('li');
        listAuthorPosts.innerHTML = `${title}`;

        ul.appendChild(listAuthorPosts);
        panelBody.appendChild(ul);
      }
    });
};
