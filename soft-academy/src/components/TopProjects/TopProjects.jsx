
import './topProjects.css'

export const TopProjects = () => {

    return (
        <>
            <section className="section-a">
                <div className="title-projects"><h2>Educational Ambitions: Selected Top Student Projects Demonstrating the Power of Learning and Development</h2></div>
                <div className="data-projects">
                    <div className="rights-projects">Dec 10, 2023</div>
                    <div className="separator"></div>
                    <div className="description-projects">Discover the brilliance of 'Educational Ambitions' through selected student projects. Unveil the impact of learning and development in innovative endeavors. From groundbreaking technologies to creative solutions, witness the power of ambitious students shaping the future of education.</div>
                </div>
                <div className="youtube-preview">
                    <iframe width="1080" height="520" src="https://www.youtube.com/embed/duP_AI2B2XM"
                        title="Solution Challenge Demo Day 2023"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen>

                    </iframe>
                </div>
                <div className="title-projects"><h3>The Future of Education: Top Students and Their Impressive Projects for 2023</h3></div>

                <section className="project-section">
                <section className="project-section-second">
                    <h2> Wonder Reader, BINUS University International, Indonesia:</h2>
                    <div className="divider-project"></div>
                    <div className="description-project"> Wonder Reader is a 3D-printed digital braille device that helps students who are blind and low-vision learn. The device allows teachers to send questions to the device through Bluetooth and receive answers from students by using the built-in braille keyboard. To learn more, watch the demo video. 1</div>
                   
                    <div className="description-project"> Built with: Google Cloud, Firebase, Flutter and Google Text-to-Speech API. 2</div>
                    
                    </section>
                    <div className="image-container-project">
                        <img src="https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Wonder_Reader_UGC_Philipus_Jason.width-1000.format-webp.webp" alt="Project Image" />
                        <p>Team Wonder Reader includes Philipus, Jason and Jason (and Aric, not pictured)</p>
                    </div>
                </section>
            </section>
        </>
    )

}