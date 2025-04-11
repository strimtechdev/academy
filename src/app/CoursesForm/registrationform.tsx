"use client";

import type React from "react";
import { useState, type FormEvent } from "react";

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
}

export default function RegistrationForm({
  course,
  onSubmit,
  onClose,
  isLoading,
  error,
}: RegistrationFormProps) {
  const [formData, setFormData] = useState<{
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    state: string;
  }>({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    state: "",
  });

  const [validationError, setValidationError] = useState<string | null>(null);

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

    // Check if any field is empty
    const isEmpty = Object.values(formData).some(
      (value) => value.trim() === ""
    );

    if (isEmpty) {
      setValidationError("Please fill in all fields before submitting.");
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

    // If all validations pass, submit the form
    onSubmit({
      ...formData,
      courseId: course.title,
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <div className="max-h-screen overflow-y-auto">
        <DialogContent className="sm:max-w-[425px] p-6 flex flex-col max-h-[80vh] overflow-y-auto">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>Register for {course.title}</DialogTitle>
            <DialogDescription>
              Fill out the form below to register for this course. We&apos;ll
              send you a confirmation email.
            </DialogDescription>
          </DialogHeader>
          <div className="flex-grow my-4 pr-2">
            <form id="registration-form" onSubmit={handleSubmit}>
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
