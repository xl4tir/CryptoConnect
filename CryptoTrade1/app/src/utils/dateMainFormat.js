export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = (now - date) / 1000;
    const diffInMinutes = diffInSeconds / 60;
    const diffInHours = diffInMinutes / 60;
    const diffInDays = diffInHours / 24;
    const diffInYears = now.getFullYear() - date.getFullYear();

    if (diffInSeconds < 60) {
        return `${Math.floor(diffInSeconds)} seconds ago`;
    } else if (diffInMinutes < 60) {
        return `${Math.floor(diffInMinutes)} minutes ago`;
    } else if (diffInHours < 24) {
        return `${Math.floor(diffInHours)} hours ago`;
    } else if (diffInDays < 2) {
        return 'yesterday';
    } else if (diffInDays < 365) {
        return `${date.toLocaleString('default', { month: 'long' }).slice(0, 5)} ${date.getDate()}`;
    } else if (diffInYears === 1) {
        return `${date.toLocaleString('default', { month: 'long' }).slice(0, 5)} ${date.getDate()}, ${date.getFullYear()}`;
    } else {
        return `${diffInYears} years ago`;
    }
};
