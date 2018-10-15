import moment from 'moment';

// new code starts
export const fetchStories = (page) => {
    return fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
    .then(res => res.json())
    .then((data) => {
        let storyListPromises = data.slice(0 + (page - 1) * 12, page * 12).map((story)=>{
            return fetch(`https://hacker-news.firebaseio.com/v0/item/${story}.json?print=pretty`).then(r => r.json());
        });

        return Promise.all(storyListPromises)
    })
    .catch(err => console.log(err))
}

export const transformURL = (urlString) => {
   try {
       return (new URL(urlString)).hostname;
   } catch (err) {
       console.warn("failed to parse ", urlString)
       return urlString;
   }
}

export const transformTime = time => {
    return moment(time).fromNow();  
}
// new code ends
