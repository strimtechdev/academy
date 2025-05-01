"use client";

import type React from "react";
import { useRef, useState, type FormEvent } from "react";

import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { Course, Registration } from "./types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RegistrationFormProps {
  course: Course;
  onSubmit: (data: Registration) => void;
  onClose: () => void;
  isLoading: boolean;
  error: string | null;
  referrer?: string | null;
  courseId?: string;
}

export default function RegistrationForm({
  course,
  onSubmit,
  onClose,
  isLoading,
  error,
  referrer,
}: RegistrationFormProps) {
  // Initialize form data with referrer as empty string if null
  const [formData, setFormData] = useState<{
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    state: string;
    courseId: string;
    ref: string;
  }>({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    state: "",
    courseId: course.title,
    ref: referrer || "",
  });

  const [validationError, setValidationError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when user starts typing
    if (validationError) {
      setValidationError(null);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Check if any required field is empty
    const isRequiredFieldEmpty = [
      "firstname",
      "lastname",
      "email",
      "phoneNumber",
      "state",
    ].some((field) => !formData[field as keyof typeof formData]);

    if (isRequiredFieldEmpty) {
      setValidationError(
        "Please fill in all required fields before submitting."
      );
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setValidationError("Please enter a valid email address.");
      return;
    }

    // Validate phone number (basic validation)
    const phoneRegex = /^\d{10,15}$/;
    if (!phoneRegex.test(formData.phoneNumber.replace(/[^0-9]/g, ""))) {
      setValidationError("Please enter a valid phone number.");
      return;
    }

    // If all validations pass, submit the form with referrer as string
    onSubmit({
      ...formData,
      courseId: course.title,
      ref: referrer || "",
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <div className="max-h-screen overflow-y-auto">
        <DialogContent className="sm:max-w-[425px] p-6 flex flex-col max-h-[80vh] overflow-y-auto z-50">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>Register for {course.title}</DialogTitle>
            <DialogDescription>
              Fill out the form below to register for this course. We&apos;ll
              send you a confirmation email.
            </DialogDescription>
          </DialogHeader>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded mb-4">
              {error}
            </div>
          )}

          {referrer && (
            <div className="bg-blue-50 border border-blue-200 text-blue-700 p-3 rounded mb-4">
              Referred by: {referrer}
            </div>
          )}
          <div className="flex-grow my-4 pr-2">
            <form id="registration-form" ref={formRef} onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstname">First Name</Label>
                  <Input
                    id="firstname"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastname">Last Name</Label>
                  <Input
                    id="lastname"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="state">State of Residence</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    placeholder="Where you live"
                  />
                </div>
                <div className="mt-2">
                  <p className="text-sm font-medium">Course Details:</p>
                  <p className="text-sm mt-1">Fee: {course.fee}</p>
                  <p className="text-sm">Duration: {course.duration}</p>
                </div>
                {(error || validationError) && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      {error || validationError}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </form>
          </div>
          <DialogFooter className="flex-shrink-0 border-t pt-4 mt-auto">
            <div className="flex flex-col w-full gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                className="cursor-pointer"
                type="submit"
                disabled={isLoading}
                form="registration-form"
              >
                {isLoading ? "Submitting..." : "Register"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </div>
    </Dialog>
  );
}
