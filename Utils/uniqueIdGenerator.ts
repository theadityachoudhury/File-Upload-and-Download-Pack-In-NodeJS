function generateUniqueId() {
    const timestamp = new Date().getTime().toString(36);
    const randomString = Math.random().toString(36).substring(2, 8); // Adjust length as needed
    const uniqueId = timestamp + randomString;
    return uniqueId;
}

export default generateUniqueId;