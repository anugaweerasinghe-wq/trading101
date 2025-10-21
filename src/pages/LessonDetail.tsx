import { useParams, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, BookOpen, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { lessonData } from "@/lib/lessonData";
import { Quiz } from "@/components/Quiz";

export default function LessonDetail() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [currentSubtopic, setCurrentSubtopic] = useState(0);
  const [completedSubtopics, setCompletedSubtopics] = useState<Set<number>>(new Set());
  const [showQuiz, setShowQuiz] = useState(false);

  const lesson = lessonData.find((l) => l.id === Number(lessonId));

  if (!lesson) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24 pb-12">
          <div className="container mx-auto px-6">
            <h1 className="text-3xl font-bold">Lesson not found</h1>
          </div>
        </main>
      </div>
    );
  }

  const progress = (completedSubtopics.size / lesson.subtopics.length) * 100;
  const currentTopic = lesson.subtopics[currentSubtopic];

  const handleComplete = () => {
    const newCompleted = new Set(completedSubtopics);
    newCompleted.add(currentSubtopic);
    setCompletedSubtopics(newCompleted);

    if (currentSubtopic < lesson.subtopics.length - 1) {
      setCurrentSubtopic(currentSubtopic + 1);
    } else {
      setShowQuiz(true);
    }
  };

  const handleQuizComplete = (score: number) => {
    console.log("Quiz completed with score:", score);
    navigate("/learn");
  };

  if (showQuiz) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24 pb-12">
          <div className="container mx-auto px-6 max-w-4xl">
            <Quiz lesson={lesson} onComplete={handleQuizComplete} />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6 max-w-5xl">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate("/learn")}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Lessons
            </Button>

            <div className="flex items-start justify-between mb-6">
              <div>
                <Badge variant="outline" className="mb-2">
                  {lesson.category}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">{lesson.title}</h1>
                <p className="text-xl text-muted-foreground">{lesson.description}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Subtopic {currentSubtopic + 1} of {lesson.subtopics.length}
                </span>
                <span className="text-muted-foreground">{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>

          {/* Subtopic Navigation */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {lesson.subtopics.map((subtopic, index) => (
              <Button
                key={index}
                variant={currentSubtopic === index ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentSubtopic(index)}
                className="flex-shrink-0"
              >
                {completedSubtopics.has(index) && (
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                )}
                {subtopic.title}
              </Button>
            ))}
          </div>

          {/* Content */}
          <Card className="p-8 md:p-12 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-3xl font-bold">{currentTopic.title}</h2>
            </div>

            <div className="space-y-8">
              {currentTopic.content.map((section, index) => (
                <div key={index}>
                  {section.type === "text" && (
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      {section.data}
                    </p>
                  )}

                  {section.type === "heading" && (
                    <h3 className="text-2xl font-bold mt-8 mb-4">{section.data}</h3>
                  )}

                  {section.type === "list" && (
                    <ul className="space-y-3 ml-6">
                      {(section.data as string[]).map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-lg">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.type === "image" && (
                    <div className="my-8 rounded-lg overflow-hidden">
                      <img
                        src={section.data as string}
                        alt={section.alt || "Lesson visual"}
                        className="w-full h-auto"
                      />
                      {section.caption && (
                        <p className="text-sm text-muted-foreground text-center mt-2">
                          {section.caption}
                        </p>
                      )}
                    </div>
                  )}

                  {section.type === "example" && (
                    <Card className="p-6 bg-primary/5 border-primary/20">
                      <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                        <span className="text-primary">💡</span> Example
                      </h4>
                      <p className="text-muted-foreground">{section.data}</p>
                    </Card>
                  )}

                  {section.type === "tip" && (
                    <Card className="p-6 bg-accent/50 border-accent">
                      <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                        <span>✨</span> Pro Tip
                      </h4>
                      <p className="text-muted-foreground">{section.data}</p>
                    </Card>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentSubtopic(Math.max(0, currentSubtopic - 1))}
              disabled={currentSubtopic === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <Button onClick={handleComplete} size="lg">
              {currentSubtopic === lesson.subtopics.length - 1 ? "Take Quiz" : "Next Subtopic"}
              {currentSubtopic < lesson.subtopics.length - 1 && (
                <CheckCircle2 className="w-4 h-4 ml-2" />
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
