export const articles: Article[] = [];

export enum ArticleTag {
  Python = 'Python',
  CCpp = 'C/C++',
  Embedded = 'Embedded',
  Web = 'web'
}

export type Article = {
  title: string; // Article title to be displayed
  id: string; // Unique id used for article path
  tags?: ArticleTag[];
  description: string;
  date: Date;
};

export const addArticle = (article: Article) => {
  articles.push(article);
  return article;
};

export const NUMWORKS_PROGRAMMING = addArticle({
  title: 'Programming with a NumWorks calculator',
  id: 'numworks-programming',
  description: 'An introduction on programming with Python and C on a NumWorks calculator',
  tags: [ArticleTag.Python, ArticleTag.CCpp, ArticleTag.Embedded],
  date: new Date(2025, 5, 28)
});
