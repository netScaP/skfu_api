import { Application } from '../declarations';
import users from './users/users.service';
import companies from './companies/companies.service';
import cities from './cities/cities.service';
import students from './students/students.service';
import companyCity from './company-city/company-city.service';
import vacancies from './vacancies/vacancies.service';
import universities from './universities/universities.service';
import studentFeedbacks from './student-feedbacks/student-feedbacks.service';
import studentVacancy from './student-vacancy/student-vacancy.service';
import vacancyFeedbacks from './vacancy-feedbacks/vacancy-feedbacks.service';
import universityVacancy from './university-vacancy/university-vacancy.service';
import workers from './workers/workers.service';
import studentUniversity from './student-university/student-university.service';
import tags from './tags/tags.service';
import studentTag from './student-tag/student-tag.service';
import vacancyTag from './vacancy-tag/vacancy-tag.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(users);
  app.configure(companies);
  app.configure(cities);
  app.configure(students);
  app.configure(companyCity);
  app.configure(vacancies);
  app.configure(universities);
  app.configure(studentFeedbacks);
  app.configure(studentVacancy);
  app.configure(vacancyFeedbacks);
  app.configure(universityVacancy);
  app.configure(workers);
  app.configure(studentUniversity);
  app.configure(tags);
  app.configure(studentTag);
  app.configure(vacancyTag);
}
