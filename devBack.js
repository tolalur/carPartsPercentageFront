const request = require('request-promise');
const re1 = 'https://webapi.autodoc.ru/api/manufacturers/35BD219DUK?showAll=false'
const re = 'https://webapi.autodoc.ru/api/sparepart/header?partNumber=%2235BD219DUK%22&manufacturerId=4092'
exports.req = async () => {
    try {
        const a = await request(re1);
        console.log('a :', JSON.parse(a)[0], a.length);
    } catch(e) {
        console.log('e :', e);
    }
    
};
