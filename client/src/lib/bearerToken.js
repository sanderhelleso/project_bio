
// return authorization header token recieved
// from localstorage, sat on valid login
export default () => {
    try {

        const serializedState = localStorage.getItem('state');
        if (!serializedState) return {};
        
        return { 
            Authorization: `Bearer ${JSON.parse(serializedState).user.token}` 
        };
    } 
    
    catch (error) { return {} };
}