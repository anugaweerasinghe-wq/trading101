import { useParams, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Quote, TrendingUp, Sparkles } from "lucide-react";
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

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-6xl">
          {/* Header */}
          <div className="mb-12 animate-fade-in">
            <Button
              variant="ghost"
              onClick={() => navigate("/learn")}
              className="mb-8 hover:bg-primary/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Lessons
            </Button>

            <div className="mb-8">
              <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-sm">
                {lesson.category}
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">{lesson.title}</h1>
              <p className="text-2xl text-muted-foreground leading-relaxed max-w-4xl">
                {lesson.description}
              </p>
            </div>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-0">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-muted-foreground">
                  Subtopic {currentSubtopic + 1} of {lesson.subtopics.length}
                </span>
                <span className="text-sm font-semibold">{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-3" />
            </Card>
          </div>

          {/* Subtopic Navigation */}
          <div className="flex gap-3 mb-12 overflow-x-auto pb-4 scrollbar-hide">
            {lesson.subtopics.map((subtopic, index) => (
              <Button
                key={index}
                variant={currentSubtopic === index ? "default" : "outline"}
                size="lg"
                onClick={() => setCurrentSubtopic(index)}
                className="flex-shrink-0 font-medium px-6"
              >
                {completedSubtopics.has(index) && (
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                )}
                {subtopic.title}
              </Button>
            ))}
          </div>

          {/* Content */}
          <Card className="p-12 md:p-16 mb-12 bg-card/30 backdrop-blur-xl border-0 shadow-2xl">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold">{currentTopic.title}</h2>
            </div>

            <div className="space-y-10 max-w-4xl">
              {currentTopic.content.map((section, index) => (
                <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                  {section.type === "text" && (
                    <p className="text-xl leading-relaxed text-foreground/80">
                      {section.data}
                    </p>
                  )}

                  {section.type === "heading" && (
                    <h3 className="text-3xl font-bold mt-12 mb-6">{section.data}</h3>
                  )}

                  {section.type === "list" && (
                    <ul className="space-y-4 ml-2">
                      {(section.data as string[]).map((item, i) => (
                        <li key={i} className="flex items-start gap-4 text-lg">
                          <div className="w-2 h-2 rounded-full bg-primary mt-3 flex-shrink-0" />
                          <span className="text-foreground/80">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.type === "image" && (
                    <div className="my-12 rounded-2xl overflow-hidden shadow-xl">
                      <img
                        src={section.data as string}
                        alt={section.alt || "Lesson visual"}
                        className="w-full h-auto"
                      />
                      {section.caption && (
                        <p className="text-base text-muted-foreground text-center mt-4">
                          {section.caption}
                        </p>
                      )}
                    </div>
                  )}

                  {section.type === "example" && (
                    <Card className="p-8 bg-primary/5 border-primary/20 backdrop-blur-sm">
                      <h4 className="font-bold text-2xl mb-4 flex items-center gap-3">
                        <span className="text-3xl">💡</span> Example
                      </h4>
                      <p className="text-lg text-foreground/80 leading-relaxed">{section.data}</p>
                    </Card>
                  )}

                  {section.type === "tip" && (
                    <Card className="p-8 bg-gradient-to-br from-accent/30 to-accent/10 border-accent/30 backdrop-blur-sm hover-lift">
                      <h4 className="font-bold text-2xl mb-4 flex items-center gap-3">
                        <Sparkles className="w-7 h-7 text-accent" /> Pro Tip
                      </h4>
                      <p className="text-lg text-foreground/80 leading-relaxed">{section.data}</p>
                    </Card>
                  )}

                  {section.type === "quote" && (
                    <Card className="p-10 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border-primary/30 backdrop-blur-xl hover-lift relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
                      <Quote className="w-12 h-12 text-primary/40 mb-6" />
                      <blockquote className="text-2xl md:text-3xl font-serif italic leading-relaxed mb-6 text-foreground">
                        "{section.data}"
                      </blockquote>
                      {section.author && (
                        <p className="text-lg text-primary font-semibold">— {section.author}</p>
                      )}
                    </Card>
                  )}

                  {section.type === "stat" && (
                    <Card className="p-10 bg-gradient-gold border-0 backdrop-blur-xl hover-lift relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative">
                        <TrendingUp className="w-10 h-10 text-primary mb-4 animate-pulse" />
                        <div className="text-5xl md:text-6xl font-bold text-gradient-gold mb-3">
                          {section.value}
                        </div>
                        <div className="text-xl font-semibold text-primary mb-4">
                          {section.label}
                        </div>
                        <p className="text-lg text-foreground/70 leading-relaxed">
                          {section.data}
                        </p>
                      </div>
                    </Card>
                  )}

                  {section.type === "highlight" && (
                    <Card className="p-8 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 border-0 backdrop-blur-sm hover-lift relative overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-primary to-accent" />
                      <p className="text-xl md:text-2xl font-semibold leading-relaxed text-foreground pl-6">
                        {section.data}
                      </p>
                    </Card>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="outline"
              onClick={() => setCurrentSubtopic(Math.max(0, currentSubtopic - 1))}
              disabled={currentSubtopic === 0}
              size="lg"
              className="px-8"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Previous
            </Button>

            <Button onClick={handleComplete} size="lg" className="px-8 text-lg">
              {currentSubtopic === lesson.subtopics.length - 1 ? "Take Quiz" : "Continue"}
              {currentSubtopic < lesson.subtopics.length - 1 && (
                <ArrowRight className="w-5 h-5 ml-2" />
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
