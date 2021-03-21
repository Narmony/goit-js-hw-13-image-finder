const API_KEY = '20752837-5cf2428c2df3b00b35cf66bdb';
const BASE_URL = 'https://pixabay.com/api';

export default class ImagesApiService{
    constructor() {
        this.searchQuery = '';
        this.page = 1;
     }

    // fetchImages() { 
    //     const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;

    //    return fetch(url)
    //        .then(response => {
    //            if (!response.ok) {
    //                return
    //            }
    //         return response.json()
    //        })
    //        .then(({ hits }) => {
                
    //             this.incrementPage();
                
    //            return hits;
    //         })
        
    // }

        async fetchImages() { 
        const response = await  fetch(`${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`);
        
            return response.json()
                .then(data => { 
            //          if (data.hits.length === 0) {
            //              console.log('error')
            //              return;
            // }
            this.incrementPage();
            return data.hits})
        
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}

 