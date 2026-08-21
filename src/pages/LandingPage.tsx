import {
  ArrowRight,
  FileText,
  Sparkles,
  WandSparkles,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

function LandingPage() {
  return (
    <div className="space-y-20 py-10">
      <section className="mx-auto max-w-3xl space-y-6 text-center">
        <div className="flex justify-center">
          <Sparkles className="h-8 w-8" />
        </div>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Transform product ideas into well-structured PRDs using AI.
        </h1>

        <p className="text-lg text-muted-foreground">
          Turn rough product ideas into clear requirements, user stories,
          acceptance criteria, risks, and more.
        </p>

        <div className="flex justify-center gap-3">
          <Button asChild>
            <Link to="/projects/new">
              Start Creating
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <Button variant="outline" asChild>
            <Link to="/projects">View Projects</Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <FileText className="h-6 w-6" />
            <CardTitle>Structured PRDs</CardTitle>
          </CardHeader>

          <CardContent>
            Convert product ideas into organized and readable requirement
            documents.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <WandSparkles className="h-6 w-6" />
            <CardTitle>AI Assisted</CardTitle>
          </CardHeader>

          <CardContent>
            Improve sections, clarify requirements, and generate stronger
            product documentation.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Sparkles className="h-6 w-6" />
            <CardTitle>Built for Product Work</CardTitle>
          </CardHeader>

          <CardContent>
            Keep goals, users, requirements, risks, and open questions in one
            focused workspace.
          </CardContent>
        </Card>
      </section>

      <section className="rounded-xl border p-8 text-center">
        <div className="mx-auto max-w-2xl space-y-4">
          <h2 className="text-2xl font-semibold">
            Ready to turn your idea into a PRD?
          </h2>

          <p className="text-muted-foreground">
            Start with a rough product idea and build a structured requirements
            document step by step.
          </p>

          <Button asChild>
            <Link to="/projects/new">
              Create Your First Project
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

export default LandingPage