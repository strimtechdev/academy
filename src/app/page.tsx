"use client";

import { useState } from "react";
import { Course, Registration } from "./CoursesForm/types";
import CourseCard from "./CoursesForm/coursescard";
import RegistrationForm from "./CoursesForm/registrationform";
import WhatsAppModal from "./CoursesForm/whatsappModal";

// Sample course data - replace with your actual data or API call
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
      "Learn HTML, CSS, JavaScript, and React",
      "Create stunning and responsive web pages",
      "Work on real-world projects with expert guidance",
    ],
    duration: "12 Weeks",
    fee: "NGN 50,000",
    bonus: "Paid internship and remote job training",
  },
  {
    id: "course-3",
    title: "BACKEND DEVELOPMENT TRAINING",
    description: "Learn to build powerful and secure web applications.",
    details: [
      "Master Node.js, Python, and Databases (SQL & NoSQL)",
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
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Registration failed. Please try again."
        );
      }

      // Registration successful
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

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Courses</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore our range of professional courses designed to help you advance
          your career and develop new skills.
        </p>
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
        />
      )}

      {showWhatsAppModal && (
        <WhatsAppModal onClose={handleCloseWhatsAppModal} />
      )}
    </div>
  );
}
