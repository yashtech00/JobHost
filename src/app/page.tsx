"use client";

import Appbar from "@/components/Appbar";
import { Button } from "@/components/ui/button";
import { Search, Briefcase, Building2, Users, ArrowRight, MapPin, DollarSign, Sparkles, FileText, MessageSquare, Brain, Rocket } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <Briefcase className="h-6 w-6 text-emerald-500" />,
    title: "Thousands of Jobs",
    description: "Access to countless opportunities across various industries",
  },
  {
    icon: <Building2 className="h-6 w-6 text-emerald-500" />,
    title: "Top Companies",
    description: "Partner with leading companies worldwide",
  },
  {
    icon: <Users className="h-6 w-6 text-emerald-500" />,
    title: "Professional Network",
    description: "Connect with industry professionals and grow your network",
  },
];

const featuredJobs = [
  {
    title: "Senior Full Stack Developer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    salary: "$120k - $180k",
    type: "Full-time",
    logo: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=128&h=128&fit=crop&auto=format",
  },
  {
    title: "Product Designer",
    company: "Design Masters",
    location: "Remote",
    salary: "$90k - $130k",
    type: "Full-time",
    logo: "https://images.unsplash.com/photo-1568122506284-94d186a8c5bd?w=128&h=128&fit=crop&auto=format",
  },
  {
    title: "Marketing Manager",
    company: "Growth Pioneers",
    location: "New York, NY",
    salary: "$85k - $120k",
    type: "Full-time",
    logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=128&h=128&fit=crop&auto=format",
  },
];

const aiTools = [
  {
    icon: <FileText className="h-8 w-8 text-emerald-500" />,
    title: "Resume Enhancement",
    description: "Get AI-powered suggestions to optimize your resume and stand out to employers",
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-emerald-500" />,
    title: "Interview Practice",
    description: "Practice with our AI interviewer and receive instant feedback on your responses",
  },
  {
    icon: <Brain className="h-8 w-8 text-emerald-500" />,
    title: "Skill Analysis",
    description: "AI analyzes your skills and suggests relevant job opportunities and learning paths",
  },
  {
    icon: <Rocket className="h-8 w-8 text-emerald-500" />,
    title: "Career Path Planning",
    description: "Get personalized career guidance and development recommendations",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-emerald-50">
      <Appbar/>
      {/* Hero Section */}
      <main className="flex-1">
        <div className="relative px-6 lg:px-8">
          <div className="mx-auto max-w-6xl py-20 sm:py-32">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Your skills tell your story better than words
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                We collaborate with companies to strengthen their tech teams and assist candidates in finding career opportunities.
              </p>
              
              {/* Search Bar */}
              <div className="mt-10 flex items-center justify-center">
                <Link href={{
                  pathname: '/auth',
                  query: {
                    authtype: 'signUp'
                  }
                }}>
                  <Button className="rounded-full bg-emerald-500 px-6 py-2 text-sm font-semibold text-white shadow-lg hover:bg-emerald-600">
                    Sign up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="rounded-xl border border-emerald-100 bg-white p-6 shadow-sm transition-all hover:border-emerald-200 hover:shadow-md"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Jobs Section */}
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900">Featured Jobs</h2>
            <p className="mt-4 text-gray-600">Discover our hand-picked opportunities from top companies</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featuredJobs.map((job, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl border border-emerald-100 bg-white p-6 shadow-sm transition-all hover:border-emerald-200 hover:shadow-md"
              >
                <div className="mb-4 flex items-center gap-4">
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{job.title}</h3>
                    <p className="text-sm text-gray-600">{job.company}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <DollarSign className="h-4 w-4" />
                    {job.salary}
                  </div>
                  <div className="mt-4">
                    <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-600">
                      {job.type}
                    </span>
                  </div>
                </div>
                <button className="mt-6 w-full rounded-lg border border-emerald-500 bg-white py-2 text-sm font-semibold text-emerald-500 transition-all hover:bg-emerald-500 hover:text-white">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <button className="rounded-full bg-emerald-500 px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-emerald-600">
              View All Jobs
            </button>
          </div>
        </div>

        {/* AI Assistant Section */}
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-12 flex flex-col items-center text-center">
            <div className="mb-6 inline-flex items-center rounded-full bg-emerald-100 px-4 py-2">
              <Sparkles className="mr-2 h-5 w-5 text-emerald-500" />
              <span className="text-sm font-medium text-emerald-600">AI-Powered Career Assistant</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Supercharge Your Job Search with AI</h2>
            <p className="mt-4 max-w-2xl text-gray-600">
              Let our advanced AI tools help you optimize your job search, prepare for interviews, and plan your career path
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {aiTools.map((tool, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl border border-emerald-100 bg-white p-8 shadow-sm transition-all hover:border-emerald-200 hover:shadow-md"
              >
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-emerald-50">
                  {tool.icon}
                </div>
                <h3 className="mb-3 text-xl font-semibold text-gray-900">{tool.title}</h3>
                <p className="mb-6 text-gray-600">{tool.description}</p>
                <button className="inline-flex items-center text-sm font-semibold text-emerald-500 transition-all group-hover:text-emerald-600">
                  Try Now <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl bg-emerald-500 p-8 shadow-lg">
            <div className="flex flex-col items-center md:flex-row md:justify-between">
              <div className="mb-6 text-center md:mb-0 md:text-left">
                <h3 className="text-xl font-bold text-white">Get Started with AI Assistant</h3>
                <p className="mt-2 text-emerald-50">Begin your enhanced job search experience today</p>
              </div>
              <button className="inline-flex items-center rounded-full bg-white px-6 py-3 font-semibold text-emerald-500 transition-all hover:bg-emerald-50">
                <Sparkles className="mr-2 h-5 w-5" />
                Launch AI Assistant
              </button>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 p-8 text-center shadow-lg">
            <h2 className="text-3xl font-bold text-white">
              Ready to Start Your Journey?
            </h2>
            <p className="mt-4 text-emerald-50">
              Join thousands of professionals who've found their dream jobs through
              our platform
            </p>
            <button className="mt-6 rounded-full bg-white px-8 py-3 font-semibold text-emerald-500 shadow-md transition-all hover:bg-emerald-50">
              Get Started
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center text-sm text-gray-600">
            © 2025 JobBoard. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}