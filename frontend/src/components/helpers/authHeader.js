export default () => {
    return {
        "Authorization":"Token "+localStorage.getItem('Token')
    };
}