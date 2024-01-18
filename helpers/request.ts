import axios, { AxiosResponse } from "axios"

interface Props{
    endpoint: string,
    method: string,
    data: Object,
    onSuccess?: (response: AxiosResponse) => void,
    onFailed?: (error: any) => void
} 

export const  request =  async ({endpoint, method, data, onSuccess, onFailed}: Props) => {
    return await axios({
        method, 
        url: `/api/${endpoint}`,
        data,
        
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
        
        return error;
    })
}