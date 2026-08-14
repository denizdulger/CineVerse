function parseJwtNode(token) {
  try {
    if (!token) return null;

    // JWT'nin orta kısmını (payload) alıyoruz
    const base64Url = token.split(".")[1];

    // Base64Url formatını standart Base64 formatına çeviriyoruz
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

    // Türkçe karakterleri koruyarak decode ediyoruz (Buffer yerine)
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("JWT çözülürken hata oluştu:", error);
    return null;
  }
}
export { parseJwtNode };
