import axios from "axios"

interface Props{
    endpoint: string,
    method: string,
    data: Object,
    headers?: any,
    onSuccess?: (response: any) => void,
    onFailed?: (error: any) => void
} 

export const  request =  async ({endpoint, method, data, onSuccess, onFailed}: Props) => {
    return await axios({
        method, 
        url: `/api/${endpoint}`,
        data,
        baseURL: 'http://localhost:3000'
    }).then((response) => {
        if(onSuccess){
            onSuccess(response);
        }

        return response.data;
    }, (error) => {
        if(onFailed){
            onFailed(error)
        }
        
        return error;
    }).catch((error) => {
        if(onFailed){
            onFailed(error)
        }
        let errMsg = error.errors ? error.errors.map((err: any) => err.toString()).join(', ') : error.toString();
        throw new Error(errMsg);
    })
}

export const fetchRequest = async ({endpoint, method, data, onSuccess, onFailed, headers}: Props) => {
    try{
        return await fetch(`http://localhost:3000/api/${endpoint}`, { 
        headers: {
            ...headers,
            'Content-Type': 'application/json; charset=utf8',
        },
        method,
        body: JSON.stringify(data),
        cache: 'no-cache',
        })
        .then((response) => {
            return response.json();
        }).then((data) => {
            if(onSuccess){
                return onSuccess(data);
            }
            return data;
        })

    }catch(error){
        if(onFailed){
            return onFailed(error);
        }
        return error;
    }

}