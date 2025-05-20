export default function SkillsSection() {
  return (
    <section className="newspaper-section py-12 md:py-16 bg-[#1b1b19] text-white">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="newspaper-heading text-3xl md:text-4xl mb-2 text-white">Technical Expertise</h2>
          <div className="w-16 h-1 bg-white/90"></div>
        </div>

        <div className="newspaper-grid">
          <div className="newspaper-grid-span-4">
            <h3 className="newspaper-subheading text-xl mb-4 text-white">Programming Languages</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>JavaScript/TypeScript</span>
                <div className="w-24 h-1 bg-white/30">
                  <div className="h-full bg-white" style={{ width: "90%" }}></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Python</span>
                <div className="w-24 h-1 bg-white/30">
                  <div className="h-full bg-white" style={{ width: "85%" }}></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Java</span>
                <div className="w-24 h-1 bg-white/30">
                  <div className="h-full bg-white" style={{ width: "75%" }}></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>C/C++</span>
                <div className="w-24 h-1 bg-white/30">
                  <div className="h-full bg-white" style={{ width: "70%" }}></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>SQL</span>
                <div className="w-24 h-1 bg-white/30">
                  <div className="h-full bg-white" style={{ width: "80%" }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="newspaper-grid-span-4">
            <h3 className="newspaper-subheading text-xl mb-4 text-white">Frameworks & Libraries</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>React/Next.js</span>
                <div className="w-24 h-1 bg-white/30">
                  <div className="h-full bg-white" style={{ width: "95%" }}></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>TensorFlow/PyTorch</span>
                <div className="w-24 h-1 bg-white/30">
                  <div className="h-full bg-white" style={{ width: "80%" }}></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Node.js/Express</span>
                <div className="w-24 h-1 bg-white/30">
                  <div className="h-full bg-white" style={{ width: "85%" }}></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Django</span>
                <div className="w-24 h-1 bg-white/30">
                  <div className="h-full bg-white" style={{ width: "75%" }}></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Tailwind CSS</span>
                <div className="w-24 h-1 bg-white/30">
                  <div className="h-full bg-white" style={{ width: "90%" }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="newspaper-grid-span-4">
            <h3 className="newspaper-subheading text-xl mb-4 text-white">Design Tools</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Adobe Photoshop</span>
                <div className="w-24 h-1 bg-white/30">
                  <div className="h-full bg-white" style={{ width: "85%" }}></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Adobe Illustrator</span>
                <div className="w-24 h-1 bg-white/30">
                  <div className="h-full bg-white" style={{ width: "80%" }}></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Figma</span>
                <div className="w-24 h-1 bg-white/30">
                  <div className="h-full bg-white" style={{ width: "90%" }}></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Blender</span>
                <div className="w-24 h-1 bg-white/30">
                  <div className="h-full bg-white" style={{ width: "65%" }}></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>After Effects</span>
                <div className="w-24 h-1 bg-white/30">
                  <div className="h-full bg-white" style={{ width: "70%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 p-6 border border-white/20">
          <h3 className="newspaper-subheading text-xl mb-4 text-white">Areas of Interest</h3>
          <div className="newspaper-column">
            <p className="mb-4">
              My technical journey is guided by a fascination with the intersection of human creativity and
              computational intelligence. I'm particularly interested in how artificial intelligence can augment human
              capabilities rather than replace them, creating tools that extend our creative and analytical abilities.
            </p>
            <p className="mb-4">
              Currently, I'm exploring generative AI for design assistance, developing systems that can collaborate with
              designers to expand the possibility space of creative solutions. This work involves both technical
              challenges in machine learning and careful consideration of the human-AI interaction design.
            </p>
            <p>
              I'm also deeply interested in data visualization as a means of making complex information accessible and
              meaningful. By combining principles from cognitive psychology, graphic design, and computer science, I aim
              to create visualizations that not only inform but illuminate.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
