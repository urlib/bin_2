// Functions
const choice = list => list[Math.floor(Math.random() * list.length)];
const key = (obj, fallback = undefined) => { const keys = Object.keys(obj); return keys.length ? choice(keys) : fallback; };
const value = (obj, fallback = undefined) => { const keys = Object.keys(obj); return keys.length ? obj[choice(keys)] : fallback; };
const getImgListUrl = () => {
    /**
     * @description
     * It is expected that this function is only used inside the package "32ae08ef", 
     * as we use its name to build url of "imageList.json". 
     */
    const url = import.meta.url;
    const cdnUrl = url.substr(0, url.indexOf('32ae08ef'));
    return `${cdnUrl}4a0ca042@${choice(fullVer)}/loadBackground/imageList.json`;
};
const setImg = (url, where) => {
    where.backgroundImage = `url(${url})`;
    where.backgroundAttachment = 'fixed';
    where.backgroundRepeat = 'no-repeat';
    where.backgroundPosition = 'center';
    where.backgroundSize = 'cover';
};
const createBlobUrl = (blob, url, cache) => {
    const blobUrl = URL.createObjectURL(blob);
    cache[url] = blobUrl;
    return blobUrl;
};

// Values
const zippedVer = {
    0: {
        0: [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
    }
};
const fullVer = (() => {
    const queue = [];
    const res = [];
    const recursion = obj => {
        /**
         * @description
         * We store version info in structures like Trie, 
         * so we need a function to decompress it.
         * I know that gzip / brotli can compress the file when CDN transfers it, 
         * but using pure JavaScript code to compress / decompress will be more interesting and challenging. 
         */

        if (typeof obj === 'object') {
            if (Array.isArray(obj)) {
                for (const val of obj) {
                    recursion(val);
                }
            } else {
                const keys = Object.keys(obj);
                for (const key of keys) {
                    queue.push(key);
                    recursion(obj[key]);
                    queue.pop();
                }
            }
        } else {
            queue.push(obj);
            res.push(queue.join('.'));
            queue.pop();
        }
    };
    recursion(zippedVer);
    console.log('calced');
    return res;
})();
const blankGif = 'data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
const isWebpSupported = (document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0);

export {
    choice, key, value, getImgListUrl, setImg, createBlobUrl, // Functions
    zippedVer, fullVer, blankGif, isWebpSupported // Values
}