import config from "./index.js"
async function init() {
    let videos = await fetchVideos();
    console.log(videos);
    let len = videos.length;
    for (let i = 0; i < len; i++) {
        let key = videos[i];
        if (key.hasOwnProperty("image_id") && key.image_id != "") {
            addvideoToDOM(
                key.video_ID,
                key.title,
                key.contentType,
                key.genre,
                key.image_id
            );
        } else {
            addvideoToDOM(
                key.video_ID,
                key.title,
                key.contentType,
                key.genre,
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAOVBMVEW7u7vz8/O4uLi8vLzy8vLe3t7m5ubZ2dn29vbv7+/5+fm1tbW/v7/g4ODr6+vU1NTKysrOzs7FxcW1L4+vAAAD+UlEQVR4nO3bi27iMBAFUHvsJBPbJCH//7E7Yx4bKKG0m4hhdc9KK7UU5Itf4xCcAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADYQyAXdkLBhXfHE6E42okjCwnljR67nYyjDJC3ozIk3ksaDPQhjey9Z/1vaxy9Hw10YsMcY79PPs+H9yekg5emcLs9CRh9YyBhw577ifLmpugj20gY+fCL59Vd9NnjdJDJ3ejf/b51W9CE0o6fv9XSbnrS+HBN+O49sfbhL8ZSoFICUVl93GVLCX++4tHc9uz7Ma//ieWEUk+6Wlauto2apHuBly19rWwJuoZZTajZcqhz83Hzcw1Yd72eVgLYTijLRJdkC1lpPc2neJF9TOPKCxtPSLP8NrXz42lW198aUf+tJLCdkFx7GoNNyTon7xpJw7I6mx+/sOmEFKZzJZ68rJZUz7LLx+OiUE/T4xc2nTDkyyDsmfuZ7g+y1H96H+bu0kdy7JCqfM63W0Jufbwm7D9vLZVqJcbol93UyUhdDFRZh3x9D3qth/LHrTSBDqm/ORHLD2NebO0ke8kpIGsXflxC7SF/04deD1jzoq+I9NwsY1hn6UpRYzahNHi4y3fa91Jb/naiy1PrtS51awHtJnR5XLtmk7qQy+UaqNQ7pVyLHj0q3lWxZhOSe3LNRs8S5z7T4+HlVBm0Vr/vS7sJO74fo4vRykM5T8d6wj+3neZO6rtP6cMS1xPqA+lwmo7LPPIcbj6kD3WnWO/CirnT6VcuLQ96WNSRPZJ0L7nLxmkyoS6R/GSQnjuS+ylf11DS3UWvR8bUH09l+nmiWkwoBenA8cte8WUyRjlXLWbuoFd/pUaIvi35On5tJpSd4q5ge6TXodqcR2PQ3UWfos9bTkebCd236RZGIl10bg4a0psjnUKZTJib1z+gkWcNR9ki8t3uwn6Y5NWKzYQlvf4JjdbmLPOu+HjztsgslV/XNdVeQmp/8CEb12TctXw3cTUidzJLzSUkml7Ptwj6QN1QbF3V14Th5vrSP+GeU5udtT7MY/q+7S+LDVnrQwob5qsfHFqbh0/PFL9gL+G87b0K9vqQzrXXf5yw85uOUpMJN4WESIiESIiESPhxCbWIHL+9jPg6faEmW0vYbXgXbYx1WBhLOKXtSm+WN+vojCV0dNz0hvZjLsbuawsbfyXBUcmtnYSep7xtQKH3CBtK6De/y/vQ1utwVhLGPb5sUTefg4G7oMfUR13fNycv2icD37fQ78z4PbpQdoxk4jszEnHP7z29O52rNwFvvoz+XU/fnQ4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4GP9AeMaRV6pmy05AAAAAElFTkSuQmCC"
            );
        }
    }
}

async function fetchVideos() {
    try {
        return await fetch(config.backendEndpoint + "/videocatalog").then(
            (response) => response.json()
        );
    } catch (err) {
        return null;
    }
}

function addvideoToDOM(id, title, contenttype, genre, image) {
    let container = document.createElement("div");
    container.className =
        "col-12 col-sm-6 col-lg-3 mb-4 d-flex align-content-stretch flex-wrap";
    container.id = "cardid";

    let HTML = `
            <a id=${id} href="stream/stream.html?id=${id}&title=${title}&type=${contenttype}&genre=${genre}" class="tile">\
              <div class="tile-text ">\
                <h5>${title}</h5>\
                <p>${contenttype}</p>\
              </div>  
              <img src="${image}" width="1159px" height="1500px" class = "img-fluid">\
              \
            </a>
    `;
    container.innerHTML = HTML;
    document.getElementById("data").appendChild(container);
}
export { init, fetchVideos, addvideoToDOM };
