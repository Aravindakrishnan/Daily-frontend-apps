const inputElem = document.querySelector("nav ul li input");
async function getGithubUserDetails(username){
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    return data;
}
const requestButton = document.getElementById("request-button");
requestButton.addEventListener("click",()=>{
    const username = document.getElementById("username");
    getGithubUserDetails(username.value).then(data=>{
        let repourl = `https://github.com/${username.value}?tab=repositories`
        if(data.message){
            alert("User not Found");
        }else{
            const avatar = document.getElementById("avatar");
            const profile = document.getElementById("profile-url");
            avatar.src = data.avatar_url;
            profile.href = data.html_url;
            var template = `
            <div class="img-container">
            <img src="${data.avatar_url}" alt="">
                 </div>
        <div class="details">
            <h2>${data.name}</h2>
            <h5>${data.login}</h5>
            <p>${data.bio}</p>
        </div>
        <div class="repo-details">
        <a href="${repourl}" target="_blank">Repos:${data.public_repos}</>
        <a href=${data.html_url} target="_blank">View Profile</a>
        </div>
            `;
            
            document.querySelector("section").innerHTML = template;
        }
    });
})
