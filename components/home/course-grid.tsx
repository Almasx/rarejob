import { predefinedTopics, courses } from '@/lib/mock-data';
import { CourseCard } from './course-card';

export function CourseGrid() {
  const availableIds = new Set(courses.map(c => c.id));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {predefinedTopics.map((topic) => (
        <CourseCard
          key={topic.id}
          id={topic.id}
          emoji={topic.emoji}
          title={topic.title}
          description={topic.description}
          hasContent={availableIds.has(topic.id)}
        />
      ))}
    </div>
  );
}
