import { forwardRef } from "react"
import Image from "next/image"
import { Github, Linkedin, Mail } from "lucide-react"

const AboutSection = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <section id="about" ref={ref} className="newspaper-section py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="newspaper-heading text-3xl md:text-4xl mb-2">About the Editor</h2>
          <div className="w-16 h-1 bg-black/80"></div>
        </div>

        <div className="newspaper-grid">
          <div className="newspaper-grid-span-4">
            <div className="relative overflow-hidden mb-4">
              <Image
                src="/images/samy-portrait.jpeg"
                alt="Samy Mebarki"
                width={500}
                height={600}
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-[#1b1b19]/70 text-white p-2 text-sm">
                Samy Mebarki, Editor-in-Chief
              </div>
            </div>

            <div className="border-t border-b border-black/10 py-4 mb-4">
              <h3 className="newspaper-subheading text-xl mb-2">Contact Information</h3>
              <p className="mb-2">hello@samymebarki.com</p>
              <p className="mb-4">Constantine, Algeria</p>

              <div className="flex gap-4">
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-black/20 hover:bg-black hover:text-white transition-colors"
                  data-cursor="pointer"
                >
                  <Github size={20} />
                  <span className="sr-only">GitHub</span>
                </a>
                <a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-black/20 hover:bg-black hover:text-white transition-colors"
                  data-cursor="pointer"
                >
                  <Linkedin size={20} />
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a
                  href="mailto:hello@samymebarki.com"
                  className="p-2 border border-black/20 hover:bg-black hover:text-white transition-colors"
                  data-cursor="pointer"
                >
                  <Mail size={20} />
                  <span className="sr-only">Email</span>
                </a>
              </div>
            </div>

            <div>
              <h3 className="newspaper-subheading text-xl mb-2">Education</h3>
              <div className="mb-3">
                <p className="font-medium">Master's Degree in Artificial Intelligence</p>
                <p className="text-sm opacity-70">University of Constantine • 2021-2023</p>
              </div>
              <div>
                <p className="font-medium">Bachelor's Degree in Software Engineering</p>
                <p className="text-sm opacity-70">University of Constantine • 2018-2021</p>
              </div>
            </div>
          </div>

          <div className="newspaper-grid-span-8">
            <div className="newspaper-column">
              <p className="newspaper-dropcap mb-4">
                At the intersection of technology and creativity stands Samy Mebarki, a 24-year-old software engineer
                and graphic designer from Constantine, Algeria. With a foundation in software engineering and a
                specialization in artificial intelligence, Samy brings a unique perspective to digital creation that
                combines technical expertise with artistic vision.
              </p>

              <p className="mb-4">
                His academic journey began with a Bachelor's degree in Software Engineering, where he developed a strong
                foundation in programming principles, algorithms, and system design. Driven by a fascination with the
                future of computing, he pursued a Master's degree in Artificial Intelligence, exploring the cutting edge
                of machine learning, neural networks, and data science.
              </p>

              <p className="mb-4">
                Beyond the world of code, Samy has cultivated a passion for graphic design, finding harmony between the
                logical precision of programming and the expressive freedom of visual creation. This dual expertise
                allows him to approach projects with both analytical rigor and creative intuition.
              </p>

              <p className="mb-4">
                "I believe the most innovative solutions emerge at the intersection of disciplines," says Mebarki. "When
                we combine the problem-solving mindset of engineering with the human-centered approach of design, we
                create experiences that are not only functional but meaningful."
              </p>

              <p className="mb-4">
                His work spans various domains, from developing intelligent systems that leverage machine learning to
                creating visually compelling interfaces that prioritize user experience. This versatility has enabled
                him to collaborate on diverse projects, each benefiting from his multifaceted skill set.
              </p>

              <p>
                When not immersed in code or design, Samy can be found exploring emerging technologies, contributing to
                open-source projects, or sketching new concepts that bridge the gap between computation and creativity.
              </p>
            </div>

            <div className="mt-8 p-4 bg-black/5">
              <h3 className="newspaper-subheading text-xl mb-4">Areas of Expertise</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="border border-black/20 p-3">
                  <h4 className="font-medium mb-1">Software Engineering</h4>
                  <p className="text-sm">Full-stack development, system architecture, and API design</p>
                </div>
                <div className="border border-black/20 p-3">
                  <h4 className="font-medium mb-1">Artificial Intelligence</h4>
                  <p className="text-sm">Machine learning models, neural networks, and data analysis</p>
                </div>
                <div className="border border-black/20 p-3">
                  <h4 className="font-medium mb-1">Graphic Design</h4>
                  <p className="text-sm">Visual identity, UI/UX design, and digital illustration</p>
                </div>
                <div className="border border-black/20 p-3">
                  <h4 className="font-medium mb-1">Web Development</h4>
                  <p className="text-sm">Modern frameworks, responsive design, and performance optimization</p>
                </div>
                <div className="border border-black/20 p-3">
                  <h4 className="font-medium mb-1">Data Visualization</h4>
                  <p className="text-sm">Interactive dashboards, infographics, and data storytelling</p>
                </div>
                <div className="border border-black/20 p-3">
                  <h4 className="font-medium mb-1">Creative Coding</h4>
                  <p className="text-sm">Generative art, interactive installations, and digital experiences</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

AboutSection.displayName = "AboutSection"

export default AboutSection
