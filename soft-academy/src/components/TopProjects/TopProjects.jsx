
import { useEffect, useState } from 'react'
import './topProjects.css'
import { forumServiceFactory } from '../Services/forumService'
import { useService } from '../Hooks/useService'
import { OneProject } from './OneProject'

export const TopProjects = () => {
    const [projects, setProjects] = useState([])

    const forumService = useService(forumServiceFactory)

    useEffect(() => {
        const result = forumService.getAllProjects()
        .then(result => {
            setProjects(result)
        })
        .catch(error => {
            console.log(error.message || error)
        })
    }, [])




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
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen>

                    </iframe>
                </div>
                <div className="title-projects"><h3>The Future of Education: Top Students and Their Impressive Projects for 2023</h3></div>
                <section className="project-section-head">
               
              
                    {projects && projects.map(p => <OneProject key={p._id} {...p}/>)}
                </section>
        
            </section>

        </>
    )

}