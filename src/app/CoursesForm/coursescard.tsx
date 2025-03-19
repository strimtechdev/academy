"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  // CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Course } from "./types";
import { Button } from "@/components/ui/button";

interface CourseCardProps {
  course: Course;
  onSelect: () => void;
}

export default function CourseCard({ course, onSelect }: CourseCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-3xl">{course.title}</CardTitle>
        <h1>{course.description}</h1>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-2 mb-4">
          {course.details.map((detail, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2">•</span>
              <span>{detail}</span>
            </li>
          ))}
        </ul>
        <div className="space-y-2 mt-4">
          <div className="flex justify-between">
            <span className="font-medium">Duration:</span>
            <span>{course.duration}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Fee:</span>
            <Badge>{course.fee}</Badge>
          </div>
          <div className="mt-3">
            <span className="font-medium">Bonus:</span>
            <p className="text-sm text-muted-foreground mt-1">{course.bonus}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button onClick={onSelect} className="w-full">
          Register Now
        </Button>
      </CardFooter>
    </Card>
  );
}
