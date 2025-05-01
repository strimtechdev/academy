"use client";

import { useState, useEffect } from "react";
import { Course, Registration } from "./types";
import CourseCard from "./coursescard";
import RegistrationForm from "./registrationform";
import WhatsAppModal from "./whatsappModal";
import { useSearchParams } from "next/navigation";

const courses: Course[] = [
  {
    id: "course-1",
    title: "UI/UX DESIGN TRAINING",
    description:
      "Start your journey in tech by learning how to design user-friendly and visually appealing websites and apps.",
    details: [
      "Master Wireframing, Prototyping, and User Research",
      "Learn Figma, Adobe XD, and more",
      "Work on real-world projects",
    ],
    duration: "10 Weeks",
    fee: "NGN 50,000",
    bonus: "Paid internship and job hunting guide",
  },
  {
    id: "course-2",
    title: "FRONTEND DEVELOPMENT TRAINING",
    description: "Build interactive websites and applications from scratch.",
    details: [
      "Learn HTML, CSS, JavaScript",
      "Create stunning and responsive web pages",
      "Work on real-world projects with expert guidance",
    ],
    duration: "12 Weeks",
    fee: "NGN 50,000",
    bonus: "Paid internship and remote job training",
  },
  {
    id: "course-3",
    title: "FULLSTACK / BACKEND DEVELOPMENT TRAINING",
    description:
      "Learn to build powerful and secure web applications from scratch.",
    details: [
      "Master PHP, phpMyAdmin and Database (MYSQL)",
      "Understand API development and authentication",
      "Develop backend systems used in modern applications",
    ],
    duration: "12 Weeks",
    fee: "NGN 50,000",
    bonus: "Paid internship and job search strategy",
  },
  {
    id: "course-4",
    title: "DATA ANALYTICS TRAINING",
    description: "Learn how to analyze and interpret data for business growth.",
    details: [
      "Master Excel, SQL, Power BI, and Python",
      "Gain insights from data and make informed decisions",
      "Work on practical projects and case studies",
    ],
    duration: "12 Weeks",
    fee: "NGN 75,000",
    bonus: "Internship and remote job training",
  },
  {
    id: "course-5",
    title: "CYBERSECURITY TRAINING",
    description:
      "Start a career in tech by learning how to protect businesses from cyber threats.",
    details: [
      "Learn Ethical Hacking, Network Security, and Cloud Security",
      "Get hands-on experience with security tools and challenges",
      "Develop skills to secure systems and prevent cyber attacks",
    ],
    duration: "12 Weeks",
    fee: "NGN 75,000",
    bonus: "Internship and cybersecurity career coaching",
  },
  {
    id: "course-6",
    title: "VIRTUAL ASSISTANT TRAINING",
    description:
      "Work remotely and build a successful career as a virtual assistant.",
    details: [
      "Learn Admin Support, Email, and Calendar Management",
      "Master productivity tools and automation",
      "Gain skills to manage clients and grow your career",
    ],
    duration: "6 Weeks",
    fee: "NGN 50,000",
    bonus: "Internship and job search guide",
  },
  {
    id: "course-7",
    title: "DIGITAL MARKETING TRAINING",
    description: "Learn how to market businesses and brands online.",
    details: [
      "Master SEO, Google & Facebook Ads, and Social Media Marketing",
      "Create successful online campaigns",
      "Develop strategies to grow businesses in the digital space",
    ],
    duration: "8 Weeks",
    fee: "NGN 50,000",
    bonus: "Internship and freelancing training",
  },
  {
    id: "course-8",
    title: "PROJECT MANAGEMENT TRAINING",
    description: "Learn the essential skills to manage projects effectively.",
    details: [
      "Master Agile, Scrum, Kanban, and Waterfall methodologies",
      "Understand project planning, execution, and risk management",
      "Work on practical case studies and real-world projects",
    ],
    duration: "8 Weeks",
    fee: "NGN 50,000",
    bonus: "Internship and remote work training",
  },
];

export default function CoursesPage() {
  const searchParams = useSearchParams();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [referrer, setReferrer] = useState<string>("");

  useEffect(() => {
    // Get referrer from URL parameters
    const ref = searchParams.get("ref");
    if (ref) {
      setReferrer(ref);
      // Save referrer to localStorage to persist it
      localStorage.setItem("referrer", ref);
    } else {
      // Try to get from localStorage if not in URL
      const storedRef = localStorage.getItem("referrer");
      if (storedRef) {
        setReferrer(storedRef);
      }
    }
  }, [searchParams]);

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    setShowRegistrationForm(true);
  };

  const handleRegistrationSubmit = async (data: Registration) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://admin.studysmart.pro/academy/enroll",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            courseTitle: selectedCourse?.title, // Change this from courseId to courseTitle
            ref: (data.ref || referrer || "").toString(), // Ensure it's always a string
          }),
        }
      );
      // Force the ref to be a string, never null

      console.log("Response from server:", data);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Registration failed. Please try again."
        );
      }

      setShowRegistrationForm(false);
      setShowWhatsAppModal(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseRegistrationForm = () => {
    setShowRegistrationForm(false);
    setSelectedCourse(null);
    setError(null);
  };

  const handleCloseWhatsAppModal = () => {
    setShowWhatsAppModal(false);
  };

  const ReferrerBanner = () => {
    if (!referrer) return null;

    return (
      <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-6 text-center">
        <p className="text-blue-700">
          You were referred by:{" "}
          <span className="font-semibold">{referrer}</span>
        </p>
      </div>
    );
  };

  return (
    <div className="max-content py-12 px-4 ">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Courses</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore our range of professional courses designed to help you advance
          your career and develop new skills.
        </p>
        <ReferrerBanner />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onSelect={() => handleCourseSelect(course)}
          />
        ))}
      </div>

      {showRegistrationForm && selectedCourse && (
        <RegistrationForm
          course={selectedCourse}
          onSubmit={handleRegistrationSubmit}
          onClose={handleCloseRegistrationForm}
          isLoading={isLoading}
          error={error}
          referrer={referrer} // This will always be a string now
        />
      )}

      {showWhatsAppModal && (
        <WhatsAppModal onClose={handleCloseWhatsAppModal} />
      )}
    </div>
  );
}
