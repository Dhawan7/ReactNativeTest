// Network Request Service 
export const getApi = (config) => {
    
    console.log(config)
    return new Promise((resolve,reject)=>{

        return fetch(config.url,
        {
            method: config.type,
            body: config.data,
            headers:config.headers
        })
        .then(async(response) => {
            
            console.log('resp',response.status)
            if(response.status !=200 && response.status !=201) {
                resolve(false)
                return ;
            }    
            let json = await response.json()
            resolve(json);  
        })
        .catch((error) => {
            console.log(error)
            resolve(false);
        });
    })
    
}

