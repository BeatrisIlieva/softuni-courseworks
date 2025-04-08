function solve(input) {
    const articles = {};
    const users = {};
    // [{article: id, user: id, title: text, content: text}, ...]
    const comments = [];

    const addArticleCommand = 'article ';
    const addUserCommand = 'user ';
    const addCommentCommand = ' posts on ';

    function checkCommandIsInText(text, command) {
        return text.includes(command);
    }

    let articlesCount = 1;
    let usersCount = 1;

    input.forEach((row) => {
        if (checkCommandIsInText(row, addArticleCommand)) {
            const [_, articleName] = row.split(addArticleCommand);
            articles[articleName] = articlesCount;

            articlesCount += 1;
        } else if (checkCommandIsInText(row, addUserCommand)) {
            const [_, userName] = row.split(addUserCommand);
            users[userName] = usersCount;

            usersCount += 1;
        } else if (checkCommandIsInText(row, addCommentCommand)) {
            const [metaInfo, commentInfo] = row.split(': ');

            const [userName, articleName] = metaInfo.split(addCommentCommand);
            const [commentTitle, commentContent] = commentInfo.split(', ');

            const userId = users[userName];
            const articleId = articles[articleName];

            if (userId && articleId) {
                comments.push({ articleId, userId, commentTitle, commentContent });
            }
        }
    });

    function findCommentsCountPerArticle(id) {
        return comments.filter((comment) => comment.articleId === id).length;
    }

    function findUsernameById(id) {
        return Object.entries(users).find(([userName, userId]) => {
            if (userId === id) {
                return userName;
            }
        });
    }
    const sortedArticlesByCommentsCount = () => {
        Object.entries(articles)
            .sort((a, b) => {
                return findCommentsCountPerArticle(b[1]) - findCommentsCountPerArticle(a[1]);
            })

            .map(([articleName, articleId]) => {
                console.log(`Comments on ${articleName}`);

                const articleComments = comments
                    .filter((comment) => comment.articleId === articleId)
                    .sort((a, b) => {
                        return findUsernameById(a.userId)[0].localeCompare(
                            findUsernameById(b.userId)[0]
                        );
                    });

                for (let articleComment of articleComments) {
                    const userId = articleComment.userId;
                    const userName = findUsernameById(userId)[0];

                    console.log(
                        `--- From user ${userName}: ${articleComment.commentTitle} - ${articleComment.commentContent}`
                    );
                }
            });
    };

    sortedArticlesByCommentsCount();
}

solve([
    'user aUser123',
    'someUser posts on someArticle: NoTitle, stupidComment',
    'article Books',
    'article Movies',
    'article Shopping',
    'user someUser',
    'user uSeR4',
    'user lastUser',
    'uSeR4 posts on Books: I like books, I do really like them',
    'uSeR4 posts on Movies: I also like movies, I really do',
    'someUser posts on Shopping: title, I go shopping every day',
    'someUser posts on Movies: Like, I also like movies very much',
]);
