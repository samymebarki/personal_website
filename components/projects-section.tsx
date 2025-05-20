import Image from "next/image"
import { ArrowRight } from "lucide-react"

interface Project {
  id: number
  title: string
  description: string
  image: string
  isNew?: boolean
  year: string
  category: string
}

interface ProjectsSectionProps {
  projects: Project[]
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section className="newspaper-section py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="newspaper-heading text-3xl md:text-4xl mb-2">Featured Works</h2>
          <div className="w-16 h-1 bg-black/80"></div>
        </div>

        <div className="newspaper-grid">
          {/* Main featured project */}
          <div className="newspaper-grid-span-8">
            <div className="relative">
              <Image
                src={projects[0].image || "/placeholder.svg"}
                alt={projects[0].title}
                width={800}
                height={500}
                className="w-full h-auto object-cover"
              />
              {projects[0].isNew && (
                <div className="absolute top-0 left-0 bg-black text-white px-3 py-1 text-sm uppercase tracking-wider">
                  New
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4">
                <div className="text-xs uppercase tracking-wider mb-1">
                  {projects[0].category} • {projects[0].year}
                </div>
                <h3 className="text-xl md:text-2xl font-bold">{projects[0].title}</h3>
              </div>
            </div>
            <div className="mt-4">
              <p className="newspaper-dropcap">{projects[0].description}</p>
              <div className="mt-4">
                <a
                  href="#"
                  className="inline-flex items-center text-sm border-b border-black pb-1"
                  data-cursor="pointer"
                >
                  Read full case study <ArrowRight size={16} className="ml-2" />
                </a>
              </div>
            </div>
          </div>

          {/* Secondary projects */}
          <div className="newspaper-grid-span-4">
            <div className="space-y-6">
              {projects.slice(1, 3).map((project) => (
                <div key={project.id} className="border-b border-black/10 pb-6 last:border-b-0">
                  <div className="relative mb-3">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={400}
                      height={250}
                      className="w-full h-auto object-cover"
                    />
                    {project.isNew && (
                      <div className="absolute top-0 left-0 bg-black text-white px-2 py-1 text-xs uppercase tracking-wider">
                        New
                      </div>
                    )}
                  </div>
                  <div className="text-xs uppercase tracking-wider mb-1">
                    {project.category} • {project.year}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                  <p className="text-sm">{project.description.substring(0, 100)}...</p>
                  <div className="mt-3">
                    <a
                      href="#"
                      className="inline-flex items-center text-xs border-b border-black pb-0.5"
                      data-cursor="pointer"
                    >
                      View project <ArrowRight size={12} className="ml-1" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional projects in newspaper columns */}
        <div className="mt-12">
          <h3 className="newspaper-subheading text-2xl mb-6">More Works</h3>
          <div className="newspaper-column newspaper-column-3">
            {projects.slice(3).map((project) => (
              <div key={project.id} className="mb-6 break-inside-avoid">
                <div className="relative mb-3">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={400}
                    height={250}
                    className="w-full h-auto object-cover"
                  />
                  {project.isNew && (
                    <div className="absolute top-0 left-0 bg-black text-white px-2 py-1 text-xs uppercase tracking-wider">
                      New
                    </div>
                  )}
                </div>
                <div className="text-xs uppercase tracking-wider mb-1">
                  {project.category} • {project.year}
                </div>
                <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                <p className="text-sm">{project.description.substring(0, 80)}...</p>
                <div className="mt-3">
                  <a
                    href="#"
                    className="inline-flex items-center text-xs border-b border-black pb-0.5"
                    data-cursor="pointer"
                  >
                    View project <ArrowRight size={12} className="ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
