import { ChatInterface } from "@/components/chat-interface";
import { CourseContent } from "@/components/course-content";

export default function CoursePage() {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 border-r">
        <CourseContent />
      </div>
      <div className="w-1/2">
        <ChatInterface />
      </div>
    </div>
  );
} 