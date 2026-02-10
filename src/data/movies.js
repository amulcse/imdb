// All entries have real poster URLs from Wikipedia/Wikimedia. No placeholders.
export const movies = [
  { id: 1, title: 'Her', year: 2013, genre: 'Sci-Fi, Romance', overview: 'A lonely writer develops an unlikely relationship with an operating system.', poster: 'https://upload.wikimedia.org/wikipedia/en/4/44/Her2013Poster.jpg' },
  { id: 2, title: 'La La Land', year: 2016, genre: 'Musical, Romance', overview: 'A jazz pianist falls for an aspiring actress in Los Angeles.', poster: 'https://upload.wikimedia.org/wikipedia/en/a/ab/La_La_Land_%28film%29.png' },
  { id: 3, title: 'Call Me By Your Name', year: 2017, genre: 'Romance, Drama', overview: 'A romance blossoms between a 17-year-old and a graduate student in 1980s Italy.', poster: 'https://upload.wikimedia.org/wikipedia/en/c/c9/CallMeByYourName2017.png' },
  { id: 4, title: 'Brokeback Mountain', year: 2005, genre: 'Drama, Romance', overview: 'The complex relationship between two cowboys over decades.', poster: 'https://upload.wikimedia.org/wikipedia/en/a/a1/Brokeback_mountain.jpg' },
  { id: 5, title: 'Silver Linings Playbook', year: 2012, genre: 'Comedy, Romance', overview: 'A man with bipolar disorder forms a bond with a widow.', poster: 'https://upload.wikimedia.org/wikipedia/en/9/9a/Silver_Linings_Playbook_Poster.jpg' },
  { id: 6, title: 'Eternal Sunshine of the Spotless Mind', year: 2004, genre: 'Sci-Fi, Romance', overview: 'A couple erases each other from their memories.', poster: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Eternal_Sunshine_of_the_Spotless_Mind.png' },
  { id: 7, title: 'Casablanca', year: 1942, genre: 'Romance, Drama', overview: 'A nightclub owner must choose between love and virtue.', poster: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/CasablancaPoster-Gold.jpg' },
  { id: 8, title: '500 Days of Summer', year: 2009, genre: 'Comedy, Romance', overview: 'An offbeat romantic comedy about a man who falls in love with a woman who doesn\'t believe in love.', poster: 'https://upload.wikimedia.org/wikipedia/en/d/d1/Five_hundred_days_of_summer.jpg' },
  { id: 9, title: 'Midsommar', year: 2019, genre: 'Horror, Drama', overview: 'A couple travels to a Swedish festival that takes a dark turn.', poster: 'https://upload.wikimedia.org/wikipedia/en/4/47/Midsommar_%282019_film_poster%29.png' },
  { id: 10, title: 'Kill Bill: Vol. 1', year: 2003, genre: 'Action, Thriller', overview: 'A former assassin seeks revenge on her betrayers.', poster: 'https://upload.wikimedia.org/wikipedia/en/2/2c/Kill_Bill_Volume_1.png' },
  { id: 11, title: 'Lost in Translation', year: 2003, genre: 'Drama, Romance', overview: 'A faded movie star and a young woman form an unexpected bond in Tokyo.', poster: 'https://upload.wikimedia.org/wikipedia/en/4/4c/Lost_in_Translation_poster.jpg' },
  { id: 12, title: 'Amélie', year: 2001, genre: 'Comedy, Romance', overview: 'A shy waitress decides to change the lives of those around her for the better.', poster: 'https://upload.wikimedia.org/wikipedia/en/5/53/Amelie_poster.jpg' },
  { id: 13, title: 'Before Sunset', year: 2004, genre: 'Romance, Drama', overview: 'Jesse and Céline reunite nine years after their first meeting in Vienna.', poster: 'https://upload.wikimedia.org/wikipedia/en/d/d1/Before_Sunset_poster.jpg' },
  { id: 14, title: 'Forgetting Sarah Marshall', year: 2008, genre: 'Comedy, Romance', overview: 'A composer gets over his ex on a trip to Hawaii.', poster: 'https://upload.wikimedia.org/wikipedia/en/7/7c/Forgetting_sarah_marshall_ver2.jpg' },
];

export function getPosterUrl(movie) {
  return movie.poster || '';
}
