export default blob => {
    const urlCreator = window.URL || window.webkitURL;
    return urlCreator.createObjectURL(blob);    
}