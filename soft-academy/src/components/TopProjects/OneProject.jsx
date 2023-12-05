import { Link } from "react-router-dom"
import "./topProjects.css"
export const OneProject = ({
    title,
    description,
    team,
    youtube,
    imageUrl,
    techniques,
    website
}) => {

    console.log(`${youtube}`, "projects")

    function convertYouTubeUrlToEmbed(url) {
        return url.replace(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=/, 'https://www.youtube.com/embed/');
    }
    const youtubeUrl = `${youtube}`;
    const embedUrl = convertYouTubeUrlToEmbed(youtubeUrl);


    // https://www.youtube.com/watch?v=s2SZMWjoLx4
    // "https://www.youtube.com/embed/s2SZMWjoLx4"

    return (
        <>
            <section className="project-section">
                <section className="project-section-second">
                    <h2> {title}</h2>
                    <div className="divider-project"></div>
                    <div className="description-project">  {description} <Link to={youtube} target="_blank" >demo video</Link>.</div>
                    <div className="description-project" >Website: <Link to={website} target="_blank"> {website} </Link></div>
                    <div className="youtube-preview">
                        <iframe 
                        width="760"
                         height="280" 
                         src={embedUrl}
                            title="Solution Challenge Demo Day 2023"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen>

                        </iframe>
                    </div>
                    <div className="description-project-second">Built with: {techniques}</div>

                </section>
                <div className="image-container-project">
                    <img src={imageUrl} alt="Project Image" />
                    <p> {team}</p>

                </div>
            </section>



        </>
    )
}