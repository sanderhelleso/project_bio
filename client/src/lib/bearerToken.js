
// return authorization header token recieved
// from localstorage, sat on valid login
export const bearerToken = () => {
    try {

        const serializedState = localStorage.getItem('state');
        if (!serializedState) return {};
        
        return { 
            Authorization: `Bearer ${JSON.parse(serializedState).user.token}` 
        };
    } 
    
    catch (error) { return {} };
}