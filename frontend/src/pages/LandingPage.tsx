import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import LandingHeader from "../components/Landing/LandingHeader";
import Hero from "../components/Landing/Hero";
import Section from "../components/Landing/Section";
import FAQs from "@/components/Landing/FAQs";
import Footer from "@/components/Landing/Footer";
import UserManualSection from "@/components/Landing/UserManualSection";
import JoinUsSection from "@/components/Landing/JoinUsSection";
import InformationCardsSection from "@/components/Landing/InformationCardsSection";
import SectionCarousel from "@/components/Landing/SectionCarousel";
import TestimonialsSection from "@/components/Landing/TestimonialsSection";

const LandingPage = () => {
  const introductionRef = useRef<HTMLDivElement>(null);
  const discoverRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const featureRef = useRef<HTMLDivElement>(null);
  const faqsRef = useRef<HTMLDivElement>(null);

  const refs = {
    introductionRef,
    discoverRef,
    aboutRef,
    featureRef,
    faqsRef,
  };

  const featureSections = [
    {
      title: "Upload Notes",
      description:
        "Break free from traditional note-taking limitations. Simply upload your handwritten, typed, or digital notes in any format - PDFs, images, text documents - and watch as NoteTube intelligently processes and transforms them into a comprehensive learning experience tailored just for you.",
      image: "/notes.png",
    },
    {
      title: "Get Related Videos",
      description:
        "Dive deeper into your learning with curated, intelligent video recommendations. Our AI analyzes your notes and finds the most relevant, high-quality educational content from across the web, ensuring you get targeted explanations that complement and enhance your existing study materials.",
      image: "./videos.png",
    },
    {
      title: "Use Generated Flashcards",
      description:
        "Supercharge your memory retention with AI-powered flashcards. NoteTube automatically generates smart, context-aware flashcards from your notes, presenting key concepts, definitions, and critical information in an interactive format that makes studying more engaging and efficient.",
      image: "./cards.png",
    },
  ];

  const SlideInSection = ({ children }: { children: React.ReactNode }) => {
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div className="[data-mode='light'] min-h-screen overflow-x-hidden bg-gray-50">
      <LandingHeader refs={refs} />
      <Hero />
      <SlideInSection>
        <section ref={featureRef} className="w-full shadow-2xl">
          <SectionCarousel duration={5000}>
            {featureSections.map((section, index) => (
              <Section
                key={index}
                title={section.title}
                description={section.description}
                reverse={index % 2 === 0}
                image={section.image}
              />
            ))}
          </SectionCarousel>
        </section>
      </SlideInSection>
      <SlideInSection>
        <div ref={discoverRef}>
          <InformationCardsSection />
        </div>
      </SlideInSection>
      <SlideInSection>
        <UserManualSection />
      </SlideInSection>
      <SlideInSection>
        <div ref={aboutRef}>
          <Section
            title="About Us"
            description="At NoteTube, we believe in revolutionizing the way students learn by integrating advanced AI technology. We transform scattered notes into structured, engaging study materials that are easy to comprehend and retain. Our mission is to enhance educational experiences by making studying more effective and enjoyable. With NoteTube, students can maximize their learning potential and achieve academic success."
            reverse={false}
            image="./bb6.svg"
          />
        </div>
      </SlideInSection>
      <SlideInSection>
        <TestimonialsSection />
      </SlideInSection>
      <SlideInSection>
        <div ref={faqsRef}>
          <FAQs />
        </div>
      </SlideInSection>
      <SlideInSection>
        <JoinUsSection />
      </SlideInSection>
      <Footer />
    </div>
  );
};

export default LandingPage;
