import React from 'react';
import { BookOpen, Calendar, HeartPulse, Users, Library, GraduationCap } from 'lucide-react';

const RESOURCES = [
  {
    title: 'Library Services',
    description: 'Access online databases, research guides, and book reservations',
    icon: Library,
    link: 'https://library.sheridancollege.ca'
  },
  {
    title: 'Academic Calendar',
    description: 'Important dates, deadlines, and academic schedules',
    icon: Calendar,
    link: 'https://www.sheridancollege.ca/calendar'
  },
  {
    title: 'Student Wellness',
    description: 'Mental health resources, counseling services, and wellness programs',
    icon: HeartPulse,
    link: 'https://www.sheridancollege.ca/student-life/health-and-wellness'
  },
  {
    title: 'Study Groups',
    description: 'Find or create study groups for your courses',
    icon: Users,
    link: '#'
  },
  {
    title: 'Academic Support',
    description: 'Tutoring services, writing help, and learning resources',
    icon: BookOpen,
    link: 'https://www.sheridancollege.ca/student-life/student-services'
  },
  {
    title: 'Career Resources',
    description: 'Job postings, resume building, and career counseling',
    icon: GraduationCap,
    link: 'https://careers.sheridancollege.ca'
  }
];

function Resources() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {RESOURCES.map((resource) => {
        const Icon = resource.icon;
        return (
          <a
            key={resource.title}
            href={resource.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <Icon className="w-8 h-8 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{resource.title}</h3>
                <p className="mt-1 text-gray-500">{resource.description}</p>
              </div>
            </div>
          </a>
        )
      })}
    </div>
  );
}

export default Resources;