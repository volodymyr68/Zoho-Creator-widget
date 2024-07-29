export const getQueryParams = async () => {
    return await ZOHO.CREATOR.UTIL.getQueryParams();
}

export const getInitParams = async () => {
    return await ZOHO.CREATOR.UTIL.getInitParams();
}

export const modalSuccess = (response) => {
    let model = document.getElementById("closeWidget");
    model.classList.remove("hidden");
    model.classList.add("active");
    model.textContent  = `Success. ${response}. Please close widget`;
}